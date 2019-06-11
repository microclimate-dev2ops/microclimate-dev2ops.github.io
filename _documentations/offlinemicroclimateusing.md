---
layout: docs
title: Using Microclimate offline
description: Using Microclimate offline
keywords: offline, using, microclimate, images, network, file, system, nfs, persistent, volumes, pv, cluster, image, policy, cip, yaml, helm, chart, gitlab, jenkins, library, repository, local, install, installation, cluster image policy
duration: 1 minute
permalink: offlinemicroclimateusing
type: document
order: 31
parent: root
---

# Offline Microclimate DevOps pipelines

You can configure your Microclimate environment to use DevOps pipelines in an offline environment, such as behind a firewall. The following project types are currently the only types that have offline support:
 - Generic Docker (Python and Go)
 - Java Liberty
 - Node.js

**Note:** Only the Microclimate DevOps pipelines function offline. The Microclimate portal features are not supported.

## Offline environment architecture
The following chart diagrams the normal online Microclimate configuration and the offline Microclimate configuration.

![Image of offline configuration](dist/images/offline-diagram.png)

To achieve an offline configuration, transfer the public components used by Microclimate to private locations. The following components need to be transferred:

1. Git repositories
- A public GitHub repository stores the Microclimate Jenkins library.
- Git repositories store the source code for each project for which you create a pipeline.
- **Example private replacement:** Deploy GitLab privately on your IBM Cloud Private cluster.

2. Docker registry or Docker Hub
- These hosting services store the images used by Microclimate and the Microclimate Jenkins library, which is stored on `ibmcom` and other public Docker repositories.
- **Example private replacement:** Use `mycluster.icp`, a private Docker registry built in to IBM Cloud Private.

3. Project dependencies
- Dependencies, such as Maven, npm, and images on Docker Hub, are used to build your projects.
- **Example private replacement:** Use `mycluster.icp` to store images, and use Nexus deployed privately on your IBM Cloud Private cluster to store Maven and npm resources.

The following steps explain how to configure an offline environment using the **example private replacements** in the preceding list. You do not need to use these particular replacements in your own configuration. You can use other private replacements that serve the necessary functions as described in the list.

For example, if you already have GitHub working behind your firewall, you do not need to install a GitLab chart on your cluster because the cluster can use your existing GitHub to store the Microclimate Jenkins library and to store the source code for each project for which you create a pipeline.

<hr>

## Configuring your offline environment

1. [Install the GitLab Helm chart](#1-install-the-gitlab-helm-chart)
2. [Install the Nexus Helm chart](#2-install-the-nexus-helm-chart)
3. [Store the Microclimate Jenkins library offline](#3-store-the-microclimate-jenkins-library-offline)
4. [Store Microclimate offline](#4-store-microclimate-offline)
5. [Install Microclimate](#5-install-microclimate)
6. [Use Microclimate](#6-use-microclimate)

## Prerequisites
- Microclimate needs to use `ibmcom:1903` or later images. The option to disable SSL validation is not available in earlier versions of Microclimate.
- Install IBM Cloud Private Version 3.0.0 or later.
- Install a provider to create Persistent Volumes (PVs). The following instructions use the Network File System (NFS). For more information, see [Application Storage](https://www.ibm.com/support/knowledgecenter/SSBS6K_3.1.2/manage_cluster/application_storage.htm).
- Install, configure, and initialize the IBM Cloud Private CLI (`cloudctl`), the Kubernetes CLI (`kubectl`), and the Helm CLI (`helm`).
  - Download `cloudctl`, `kubectl`, and `helm` from your cluster at the `https://<MASTER_IP>:8443/console/tools/cli` URL.
  - Run the following command in your command line window: `cloudctl login -a https://<MASTER_IP>:8443 --skip-ssl-validation`. Follow the `cloudctl` prompts, and `cloudctl` populates your `~/.helm/cert.pem` and `~/.helm/key.pem` key pair.

<hr>

## 1. Install the GitLab Helm chart
Skip this step if you already have a private Git registry.

This example uses the GitLab Helm chart to install GitLab on your IBM Cloud Private cluster, but you can use any private Git registry for this step. Also, these instructions are for a cluster that is still online and has access to public resources.

For the GitLab documentation on installing the Helm chart, see [GitLab Helm Chart](https://docs.gitlab.com/ee/install/kubernetes/gitlab_chart.html).
<br>
#### 1. Create a namespace for the GitLab deployment.
Do not use the `default` namespace for your deployments.
```
kubectl create namespace gitlab
```
<br>
#### 2. Define a ClusterImagePolicy for GitLab.
```
cat << GITLAB_CIP > gitlab_cip.yaml
apiVersion: securityenforcement.admission.cloud.ibm.com/v1beta1
kind: ClusterImagePolicy
metadata:
  name: gitlab-cluster-image-policy
spec:
  repositories:
  - name: registry.gitlab.com/gitlab-org/*
  - name: quay.io/jetstack/cert-manager-controller:*
  - name: docker.io/gitlab/gitlab/*
  - name: quay.io/kubernetes-ingress-controller/nginx-ingress-controller:*
  - name: k8s.gcr.io/defaultbackend:*
  - name: docker.io/wrouesnel/postgres_exporter:*
  - name: docker.io/prom/prometheus:*'
  - name: docker.io/jimmidyson/configmap-reload:*
  - name: docker.io/oliver006/redis_exporter:*
  - name: docker.io/registry:*
GITLAB_CIP
kubectl apply -n gitlab -f gitlab_cip.yaml
```
<br>
#### 3. Define a ClusterRole for GitLab.
```
cat << GITLAB_CR > gitlab_cr.yaml
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: gitlab-binding
  namespace: gitlab
subjects:
- kind: Group
  name: system:serviceaccounts:gitlab
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: ibm-anyuid-hostpath-clusterrole
  apiGroup: rbac.authorization.k8s.io
GITLAB_CR
kubectl apply -n gitlab -f gitlab_cr.yaml
```
<br>
#### 4. Install the Helm chart.
After your Helm CLI is configured, run the following commands to pull the GitLab Helm chart and to install the community edition of the chart with `cert-manager` disabled:
```
helm repo add gitlab https://charts.gitlab.io/
helm repo update
helm install --name gitlab gitlab/gitlab --tls --namespace=gitlab \
  --set global.edition=ce \
  --set global.ingress.enabled=true \
  --set nginx-ingress.enabled=false \
  --set certmanager.install=false \
  --set global.ingress.configureCertmanager=false \
  --set gitlab-runner.install=false \
  --set global.hosts.https=true \
  --set global.hosts.externalIP=<PROXY_IP> \
  --set global.hosts.domain=<PROXY_IP>.nip.io \
  --set global.ingress.class= \
  --set prometheus.install=false \
  --set gitlab.sidekiq.minReplicas=1 \
  --set gitlab.sidekiq.maxReplicas=1 \
  --set registry.minReplicas=1 \
  --set registry.maxReplicas=1 \
  --set gitlab.unicorn.minReplicas=1 \
  --set gitlab.unicorn.maxReplicas=1 \
  --set gitlab.gitlab-shell.minReplicas=1 \
  --set gitlab.gitlab-shell.maxReplicas=1
```
<br>
#### 5. Create PVs.
Create PVs for the GitLab deployment to become healthy.

**Note:** The PVs are created after the deployment so that the smaller Persistent Volume Claims (PVCs) don't consume the larger PVs that you define later.

1. From your NFS server node, create four new directories, `gitlab-minio`, `gitlab-postgresql`, `gitlab-redis`, and `gitlab-gitaly`, with the following command:
      ```
      DIRS=(
        'gitlab-minio'
        'gitlab-postgresql'
        'gitlab-redis'
        'gitlab-gitaly'
      )
      for DIR in ${DIRS[@]}; do
        mkdir /nfs/shared/${DIR}
        chmod 777 /nfs/shared/${DIR}
        chown nobody:nogroup /nfs/shared/${DIR}
      done
      ```
  Each directory must have `777` permissions and `nobody:nogroup` ownership.

    Verify that your NFS directories are properly configured.
    - `ssh` into each of your NFS nodes.
    - Create a test file in each NFS directory.
    - Verify that the file is readable from each node.
    - Delete the file. Then, verify that the file is deleted from each node.

    Run the following code in each NFS node to verify that the Network File System is working correctly.

    - Create the test files:
      ```
      for DIR in ${DIRS[@]}; do
        echo $(hostname) > /nfs/shared/${DIR}/$(hostname)
      done
      ```

    - Delete the test files:
      ```
      for DIR in ${DIRS[@]}; do
        rm /nfs/shared/${DIR}/$(hostname)
      done
      ```

2. Save the following `.yaml` file.
 - Replace the `<SERVER_IP>` template value with the appropriate IP address value.
 - If your mount directory has a different name, also modify the `nfs.path` value.
 - Increase the PV sizes according to your needs.
      ```
        apiVersion: v1
        kind: PersistentVolume
        metadata:
          name: gitlab-minio
          labels:
            app: minio
        spec:
          capacity:
            storage: 10Gi
          accessModes:
            - ReadWriteOnce
          persistentVolumeReclaimPolicy: Recycle
          nfs:
            path: /nfs/shared/gitlab-minio
            server: <SERVER_IP>
        ---
        apiVersion: v1
        kind: PersistentVolume
        metadata:
          name: gitlab-postgresql
        spec:
          capacity:
            storage: 8Gi
          accessModes:
            - ReadWriteOnce
          persistentVolumeReclaimPolicy: Recycle
          nfs:
            path: /nfs/shared/gitlab-postgresql
            server: <SERVER_IP>
        ---
        apiVersion: v1
        kind: PersistentVolume
        metadata:
          name: gitlab-redis
          labels:
            app: redis
        spec:
          capacity:
            storage: 5Gi
          accessModes:
            - ReadWriteOnce
          persistentVolumeReclaimPolicy: Recycle
          nfs:
            path: /nfs/shared/gitlab-redis
            server: <SERVER_IP>
        ---
        apiVersion: v1
        kind: PersistentVolume
        metadata:
          name: gitlab-gitaly
          labels:
            app: gitaly
        spec:
          capacity:
            storage: 50Gi
          accessModes:
            - ReadWriteOnce
          persistentVolumeReclaimPolicy: Recycle
          nfs:
            path: /nfs/shared/gitlab-gitaly
            server: <SERVER_IP>
      ```
3. Use the `kubectl apply -f <FILE>` command to apply the PVs.
<br>
#### 6. Log in to GitLab.
1. After all the GitLab pods are running, which can take approximately 5 to 10 minutes depending on the computing power of your cluster, log in to GitLab from this address: `https://gitlab.<PROXY_IP>.nip.io`.
2. Either create a new user or log in with the user name `root`.
  - Get the `root` password with the `kubectl get secret gitlab-gitlab-initial-root-password -n gitlab -ojsonpath={.data.password} | base64 --decode ; echo` command. You can change the password after you are logged in.

<hr>

## 2. Install the Nexus Helm chart
Skip this step if you already have a private registry for storing Maven or npm resources. You can also skip this step if you do not need to store private Maven or npm resources. Nexus is not required for generic Docker projects. This example uses Nexus to store Maven and npm resources, but you can use any private registry for this step.
<br>
#### 1. Create a namespace for the Nexus deployment.
Do not use the `default` namespace for your deployments.
```
kubectl create namespace nexus
```

Configure `cloudctl` against the Nexus namespace.
```
cloudctl login -a https://<MASTER_IP>:8443 -n nexus --skip-ssl-validation
```
<br>
#### 2. Define a ClusterImagePolicy for Nexus.
```
cat << NEXUS_CIP > nexus_cip.yaml
apiVersion: securityenforcement.admission.cloud.ibm.com/v1beta1
kind: ClusterImagePolicy
metadata:
  name: nexus-cluster-image-policy
spec:
  repositories:
  - name: quay.io/travelaudience/docker-nexus:*
  - name: quay.io/travelaudience/docker-nexus-proxy:*
  - name: quay.io/travelaudience/docker-nexus-backup:*
NEXUS_CIP
kubectl apply -n nexus -f nexus_cip.yaml
```
<br>
#### 3. Define a ClusterRole for Nexus.
```
cat << NEXUS_CR > nexus_cr.yaml
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: nexus-binding
  namespace: nexus
subjects:
- kind: Group
  name: system:serviceaccounts:nexus
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: ibm-anyuid-hostpath-clusterrole
  apiGroup: rbac.authorization.k8s.io
NEXUS_CR
kubectl apply -n nexus -f nexus_cr.yaml
```
<br>
#### 4. Create PVs for Nexus.
Create PVs for the Nexus deployment to become healthy.

1. Create a `nexus` directory on your NFS server node. Give the directory full permissions. You can use the following command:
```
mkdir /nfs/shared/nexus
chmod 777 /nfs/shared/nexus
chown nobody:nogroup /nfs/shared/nexus
```

2. Save the following `.yaml` file.
 - Replace the `<SERVER_IP>` template value with the appropriate IP address value.
 - If your mount directory has a different name, also modify the `nfs.path` value.
 - Increase the PV sizes according to your needs.
      ```
      apiVersion: v1
      kind: PersistentVolume
      metadata:
        name: nexus
        labels:
          app: nexus
      spec:
        capacity:
          storage: 8Gi
        accessModes:
          - ReadWriteOnce
        persistentVolumeReclaimPolicy: Recycle
        nfs:
          path: /nfs/shared/nexus
          server: <SERVER_IP>
      ```

3. Use the `kubectl apply -f <FILE>` command to apply the PV.

<br>
#### 5. Install the Helm chart.
```
DOCKER_HOST_NAME="docker.$PROXY_IP.nip.io"
NEXUS_HOST_NAME="nexus.$PROXY_IP.nip.io"
helm install --name nexus stable/sonatype-nexus --tls --namespace="nexus" \
 --set nexusProxy.env.nexusDockerHost=$DOCKER_HOST_NAME \
 --set nexusProxy.env.nexusHttpHost=$NEXUS_HOST_NAME \
 --set ingress.enabled="true"
 --set ingress.tls.enabled="false"
```

<hr>

## 3. Store the Microclimate Jenkins library offline
<br>
#### 1. Use GitLab, your private Git registry, to create a clone of the Microclimate Jenkins library.
You can find the Microclimate Jenkins library at [microclimate-dev2ops/jenkins-library](https://github.com/microclimate-dev2ops/jenkins-library).
1. Click **Projects**>**Your Projects**. Then, click **New Project**>**Import Project**.
2. Select the **Repo by URL** option.
3. In the **Git repository URL** field, enter the URL, `https://github.com/microclimate-dev2ops/jenkins-library`.
4. Select the **Visibility Level** of **Public**.
5. Fill in the remaining fields according to your preferences, and click **Create project**.
6. Keep track of the GitLab project URL because you will use the URL of this newly created repository to override the default Jenkins library URL when you install Microclimate.
<br>
#### 2. Move public images offline.
The Microclimate Jenkins library uses some public images that you need to store offline. Complete the following steps to pull the images and push them to your private Docker registry, `mycluster.icp`:
1. Create the namespace into which you will install Microclimate. This example uses the name `microclimate` for the namespace, but you can give the namespace a different name:
```
kubectl create namespace microclimate
```
2. Pull the required images, and push them into the `mycluster.icp` Docker registry in the `microclimate` namespace:
```
NAMESPACE=microclimate
IMAGES=(
  'maven:3.6.0-jdk-8-alpine'
  'docker:18.06.1-ce'
  'ibmcom/microclimate-utils:1901'
  'ibmcom/microclimate-k8s-helm:v2.9.1'
)
for IMAGE in "${IMAGES[@]}";do
  docker pull "${IMAGE}"
  IMAGE_TAG=$(echo "${IMAGE}" | sed 's/^.*\///')
  docker tag "${IMAGE}" "mycluster.icp:8500/${NAMESPACE}/${IMAGE_TAG}"
  docker push "mycluster.icp:8500/${NAMESPACE}/${IMAGE_TAG}"
done
```
<br>
#### 3. Point the Microclimate Jenkins library to the private images.
1. Modify the [`microserviceBuilderPipeline.groovy`](https://github.com/microclimate-dev2ops/jenkins-library/blob/master/vars/microserviceBuilderPipeline.groovy) file in your private clone of the Microclimate Jenkins library.
2. Replace the public images `maven:3.6.0-jdk-8-alpine`, `docker:18.06.1-ce`, `ibmcom/microclimate-utils:1901`, and `ibmcom/microclimate-k8s-helm:v2.9.1` with your private images. The updated lines should resemble the following code:
```
def maven = (config.mavenImage == null) ? 'mycluster.icp:8500/microclimate/maven:3.6.0-jdk-8-alpine' : config.mavenImage
def docker = (config.dockerImage == null) ? 'mycluster.icp:8500/microclimate/docker:18.06.1-ce' : config.dockerImage
def kubectl = (config.kubectlImage == null) ? 'mycluster.icp:8500/microclimate/microclimate-utils:1901' : config.kubectlImage
def helm = (config.helmImage == null) ? 'mycluster.icp:8500/microclimate/microclimate-k8s-helm:v2.9.1' : config.helmImage
```

<hr>

## 4. Store Microclimate offline
The default Microclimate Helm chart references public resources that you need to move offline. You can store the Microclimate chart and its dependencies offline in one of two ways. The first option is to download the Microclimate Helm chart and store the images that it uses in your private Docker registry at `mycluster.icp`. The second option is to use the IBM Cloud Private `cloudctl` tool to archive Microclimate and its dependencies.
<br>
#### Option 1: Download the Microclimate Helm chart and store its images in `mycluster.icp`.
**Note:** This option installs Microclimate against a local chart file, not a Helm registry. Installations are run from the terminal rather than the catalog UI.
1. Download the `ibm-microclimate` Helm chart from one of the following places:
  - [Current release](https://github.com/IBM/charts/tree/master/stable/ibm-microclimate)
  - [Previous releases](https://github.com/IBM/charts/tree/master/repo/stable)

2. Store the following images in your `mycluster.icp` private Docker registry:<br>
**Note:** To push to the private registry from outside the cluster, see [Configuring authentication for the Docker CLI](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_3.1.2/manage_images/configuring_docker_cli.html).
 ```
ibmcom/microclimate-theia
ibmcom/microclimate-file-watcher
ibmcom/microclimate-portal
ibmcom/microclimate-devops
ibmcom/microclimate-beacon
ibmcom/microclimate-utils
ibmcom/microclimate-loadrunner
ibmcom/microclimate-atrium
ibmcom/microclimate-utils
ibmcom/microclimate-jenkins
ibmcom/mb-jenkins-slave
ibmcom/microclimate-bats
```
Run the following code to store the images in `mycluster.icp` in the `microclimate` namespace:
```
NAMESPACE=microclimate
IMAGES=(
  'ibmcom/microclimate-theia'
  'ibmcom/microclimate-file-watcher'
  'ibmcom/microclimate-portal'
  'ibmcom/microclimate-devops'
  'ibmcom/microclimate-beacon'
  'ibmcom/microclimate-utils'
  'ibmcom/microclimate-loadrunner'
  'ibmcom/microclimate-atrium'
  'ibmcom/microclimate-utils'
  'ibmcom/microclimate-jenkins'
  'ibmcom/mb-jenkins-slave'
  'ibmcom/microclimate-bats'
)
for IMAGE in "${IMAGES[@]}";do
  docker pull "${IMAGE}"
  IMAGE_TAG=$(echo "${IMAGE}" | sed 's/^.*\///')
  docker tag "${IMAGE}" "mycluster.icp:8500/${NAMESPACE}/${IMAGE_TAG}"
  docker push "mycluster.icp:8500/${NAMESPACE}/${IMAGE_TAG}"
done
```

3. When you install the Helm chart in the [next step](#5-install-microclimate), use the following code to override the images that you stored in your `mycluster.icp` private Docker registry:
```
theia:
  repository: mycluster.icp:8500/microclimate/microclimate-theia
  tag: 1903
filewatcher:
  repository: mycluster.icp:8500/microclimate/microclimate-file-watcher
  tag: 1903
portal:
  repository: mycluster.icp:8500/microclimate/microclimate-portal
  tag: 1903
devops:
  repository: mycluster.icp:8500/microclimate/microclimate-devops
  tag: 1903
beacon:
  repository: mycluster.icp:8500/microclimate/microclimate-beacon
  tag: 1903
utils:
  repository: mycluster.icp:8500/microclimate/microclimate-utils
  tag: 1903
loadrunner:
  repository: mycluster.icp:8500/microclimate/microclimate-loadrunner
  tag: 1903
atrium:
  repository: mycluster.icp:8500/microclimate/microclimate-atrium
  tag: 1903
kubectl:
  repository: mycluster.icp:8500/microclimate/microclimate-utils
  tag: 1903
curl:
  repository: mycluster.icp:8500/microclimate/microclimate-utils
  tag: 1903
jenkins:
  Master:
       Image: mycluster.icp:8500/microclimate/microclimate-jenkins
       ImageTag: 1903
  Agent:
       Image: mycluster.icp:8500/microclimate/mb-jenkins-slave
       ImageTag: 3.27
```

<br>
#### Option 2: Archive Microclimate.
The default IBM Cloud Private catalog references public endpoints and is not visible while offline. So, archiving the Microclimate chart is necessary for offline installations through the catalog. Archiving the Microclimate chart stores the Microclimate chart on your cluster, stores all necessary images on your cluster, and overrides the chart's default images with the images stored on your cluster.

1. Create the manifest file for the Microclimate Helm chart with the version that you want.
- For details about the format of this file, see [Adding featured applications to clusters without Internet connectivity](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_3.1.1/app_center/add_package_offline.html).
- Ensure that the information page is specified for the target IBM Cloud Private version.

2. The `cloudctl` utility takes the `manifest.yml` file you generated previously and creates an archive that contains all of the image dependencies for the chart. To create the archive, run the following command:
```
cloudctl catalog create-archive -s manifest.yaml -a <ARCHIVE_NAME>
```

3. Log in to the IBM Cloud Private console and the `mycluster.icp` local Docker registry. Use the following commands as a template:
```
cloudctl login -a https://<MASTER_IP>:8443 --skip-ssl-validation
docker login mycluster.icp:8500
```

4. Pass the previously created archive file to `cloudctl`. After running the following command, the modified chart will be available to install from within the IBM Cloud Private catalog:
```
cloudctl catalog load-archive --archive <ARCHIVE_NAME>
```

**Note:** These `cloudctl` commands might be slow depending on how big the images are and if multiple architectures were specified.

<hr>

## 5. Install Microclimate
See [charts/stable/ibm-microclimate/README.md](https://github.com/IBM/charts/blob/master/stable/ibm-microclimate/README.md) to view the standard instructions for installing Microclimate. To install Microclimate offline, complete the following steps along with the standard instructions:
<br>
#### 1. Use the following commands to create and patch a secret for `mycluster.icp:8500` in the `services` namespace.
```
kubectl create secret docker-registry microclimate-registry-secret --docker-server=mycluster.icp:8500 --docker-username=admin --docker-password=admin --docker-email=admin@admin.com --namespace services`
`kubectl patch serviceaccount default --namespace services --type=json --patch "[{ \"op\": \"add\", \"path\": \"/imagePullSecrets/0\", \"value\": {\"name\": \"microclimate-registry-secret\"} }]"
```
<br>
#### 2. Override the default Microclimate Jenkins library with your private copy of the Microclimate Jenkins library.
Add the following flag to your Helm install command:
```
--set jenkins.Pipeline.Template.RepositoryUrl="<GITLAB_JENKINS_LIBRARY_REPO>"
```
Replace `<GITLAB_JENKINS_LIBRARY_REPO>` with the URL of your private copy of the Microclimate Jenkins library, which was created in [step 3](#3-store-the-microclimate-jenkins-library-offline).
<br>
#### 3. Disable SSL verification within Microclimate.
Add the following flag to your Helm install command:
```
--set global.gitOption="--global http.sslVerify false"
```
<br>
#### Example Helm install command:
```
helm install --name microclimate --namespace microclimate \
  --set global.rbac.serviceAccountName=micro-sa \
  --set jenkins.rbac.serviceAccountName=pipeline-sa \
  --set global.ingressDomain=<ICP_PROXY>.nip.io \
  --set jenkins.Pipeline.Template.RepositoryUrl="https://gitlab.<ICP_PROXY>.nip.io/root/jenkins-library.git" \
  --set global.gitOption="--global http.sslVerify false" \
  ibm-charts/ibm-microclimate --tls
```

<hr>

## 6. Use Microclimate
You can now disconnect your cluster from the internet and use Microclimate DevOps pipelines offline.
