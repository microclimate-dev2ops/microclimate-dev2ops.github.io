---
layout: document
title: Installing Microclimate into a non-default namespace
description: Installing Microclimate into a non-default namespace
keywords: configure, config, namespace, install
duration: 10 minutes
permalink: installndnamespace
type: document
---

## Installing Microclimate into a non-default namespace

Microclimate can be installed into a non-default namespace. Example commands and snippets are provided as it's something requiring more than a basic understanding of Kubernetes. There's also plenty of scope for customizing the install.

Follow this procedure. For information about each step, refer to the detailed explanations.

1.  Optionally, create the namespace you want to use for Microclimate. Note that deployed applications continue to be in the namespace as specified by the `jenkins.Pipeline.TargetNamespace` parameter when configuring the chart.
2. Create the service accounts for DevOps and Jenkins, and for Microclimate Portal and File Watcher.
3. Create secrets.
4. Patch the service accounts.
5. Create the roles and bindings that the service accounts will use.
6. Install the chart with additional configuration options.
7. Validate your install.

## (Optional): Creating the namespace
If you do not have a namespace to deploy into, for example, one set up by your cluster administrator, create one with the `kubectl create namespace <anything>` command. For example:

`kubectl create namespace ns2`

In this topic, a worked example is provided using `ns2` as the namespace name.

## Creating service accounts
To create the service account that is used for the DevOps component and for Jenkins, issue the following command:

`kubectl create serviceaccount ns2-devops-sa --namespace ns2`

Responsibilities of this service account include:
- Running the Jenkins, DevOps pods
- Interacting with projects, by using the custom resource definitions that are returned with the `kubectl get project` command
- Deploying projects, using the pipeline into Jenkins

Then, to create the service account that is used for Microclimate's Portal and File Watcher, issue this command:

`kubectl create serviceaccount ns2-micro-sa --namespace ns2`

Responsibilities of this service account include:
- Running the editor, file-watcher, portal pods
- Managing authentication between the user's browser and the Microclimate application
- Interacting with projects in the Microclimate workspace, so not through Jenkins
- Interacting with deployments set up and used by File Watcher

## Creating secrets
Create the secrets for Docker registry and Helm. Create the secrets in the same namespace as the Devops service account by appending `--namespace ns2` to your secret creation commands.

### Docker registry secrets
Create secrets for the Microclimate Docker registry and, if applicable, your own Docker repository.

#### Creating the Microclimate Docker registry secrets
To create the Microclimate Docker registry secrets, use the following example command:

`kubectl create secret docker-registry microclimate-registry-secret \
  --docker-server mycluster.icp:8500 \
  --docker-username dockeruser \
  --docker-password dockerpass \
  --docker-email dockeremail \
  --namespace ns2`

#### Creating secrets for using your own Docker image repository
If you are using your own Docker image repository, use the following example command:

`kubectl create secret docker-registry artifactory \
  --docker-server artifactoryserver \
  --docker-username artifactoryusername \
  --docker-email artifactoryemail \
  --docker-password artifactorycredentials \
  --namespace ns2`

### Helm secret
To create the Helm secret, use the following example command:
`kubectl create secret generic microclimate-helm-secret \  
  --from-file=cert.pem=.helm/cert.pem \
  --from-file=ca.pem=.helm/ca.pem \
  --from-file=key.pem=.helm/key.pem \
  --namespace ns2`

## Patching the DevOps and File Watcher service accounts
Enable pipeline deployments by patching the DevOps and File Watcher service accounts to pick up the secrets that you have created. For example:

`kubectl patch serviceaccount ns2-devops-sa -p '{"imagePullSecrets": [{"name": "microclimate-registry-secret"}, {"name": "microclimate-helm-secret"}, {"name": "anyothersecret..."} ]}' --namespace ns2`

and

`kubectl patch serviceaccount ns2-micro-sa -p '{"imagePullSecrets": [{"name": "microclimate-registry-secret"}, {"name": "microclimate-helm-secret"}, {"name": "anyothersecret..."} ]}' --namespace ns2`

## Creating the roles and bindings
To create the roles and bindings, use the provided `devops.yaml` and `micro.yaml` snippets. These snippets can be customized for your own production use. For more details and examples, see the Kubernetes documentation page [Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/).

To use the example files, run the following two commands:

`kubectl apply -f devops.yaml`

`kubectl apply -f micro.yaml`

where `devops.yaml` and `micro.yaml` are defined as follows.

Example `devops.yaml`:

```
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  name: cr-devops
rules:
- apiGroups: ["extensions", ""]
  resources: ["ingresses", "ingresses/status"]
  verbs: ["delete", "create", "patch", "get", "list", "update", "watch"]

- apiGroups: [""]
  resources: ["namespaces"]
  verbs: ["delete", "create", "patch", "get", "list"]

- apiGroups: [""]
  resources: ["pods", "pods/portforward", "pods/log", "pods/exec"]
  verbs: ["get", "list", "create", "delete", "watch"]

- apiGroups: ["mc.ibm.com"]
  resources: ["projects", "releases"]
  verbs: ["get", "list", "create", "delete", "watch"]

- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "list", "create", "watch"]

- apiGroups: [""]
  resources: ["serviceaccounts"]
  verbs: ["get", "patch"]

- apiGroups: [""]
  resources: ["services"]
  verbs: ["get", "list"]

- apiGroups: [""]
  resources: ["nodes"]
  verbs: ["get", "list"]

- apiGroups: ["apiextensions.k8s.io"]
  resources: ["customresourcedefinitions"]
  verbs: ["get", "list", "create", "delete"]

---

apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: crb-devops
roleRef:
  kind: ClusterRole
  name: cr-devops
  apiGroup: rbac.authorization.k8s.io
subjects:
- kind: ServiceAccount
  name: ns2-devops-sa
  namespace: ns2
```

Example `micro.yaml`:

```
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  name: cr-micro
rules:
- apiGroups: [""]
  resources: ["namespaces"]
  verbs: ["delete", "create", "patch", "get", "list"]

- apiGroups: [""]
  resources: ["pods", "pods/portforward", "pods/log", "pods/exec"]
  verbs: ["get", "list", "create", "delete", "watch"]

- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "list", "create"]

- apiGroups: [""]
  resources: ["serviceaccounts"]
  verbs: ["get", "patch"]

- apiGroups: [""]
  resources: ["services"]
  verbs: ["get", "list", "create", "delete"]

- apiGroups: [""]
  resources: ["nodes"]
  verbs: ["get", "list"]

- apiGroups: [""]
  resources: ["configmaps"]
  verbs: ["get", "list"]

- apiGroups: ["extensions"]
  resources: ["ingresses"]
  verbs: ["get", "patch"]

- apiGroups: ["apps", "extensions"]
  resources: ["deployments"]
  verbs: ["get", "list", "create", "update", "delete"]

- apiGroups: ["extensions"]
  resources: ["replicasets"]
  verbs: ["get", "list", "update", "delete"]

---

apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: crb-micro
roleRef:
  kind: ClusterRole
  name: cr-micro
  apiGroup: rbac.authorization.k8s.io
subjects:
- kind: ServiceAccount
  name: ns2-micro-sa
  namespace: ns2
```

## Installing the chart
You must specify two additional options when installing into a non-default namespace.

For Microclimate's Portal and File Watcher, set `global.rbac.serviceAccountName` to reference the already created service account, for example, `ns2-micro-sa` in the example command at the end of this section.

For DevOps and Jenkins, set `jenkins.rbac.serviceAccountName`, again referencing the already created service account but this time for DevOps and Jenkins, for example, `ns2-devops-sa` in the example command at the end of this section.

Configure the `jenkins.Pipeline.Registry.Url` as the namespace corresponding to your Docker registry namespace. In the following example, you cannot push to the default Docker registry in a non-default namespace because the pod will not have pull permissions. As a result, you must set  `jenkins.Pipeline.Registry.Url=mycluster.icp:8500/ns2`

An example of installing from the command line is as follows:

`helm install --name microclimate --namespace ns2 --set global.rbac.serviceAccountName=ns2-micro-sa,jenkins.rbac.serviceAccountName=ns2-devops-sa,hostName=microclimate.${INGRESS_IP}.nip.io,jenkins.Pipeline.Registry.Url=mycluster.icp:8500/ns2,jenkins.Master.HostName=jenkins.${INGRESS_IP}.nip.io ibm-charts/ibm-microclimate`

## Validation
Kubernetes resources created by Microclimate, such as pods and persistent volumes, sit in the specified namespace so any `kubectl` commands you use must also include the `--namespace <namespacename>` option.

1. Check that projects can be created and imported.
Create or import a project through the Microclimate UI. The project's information is stored in the persistent volume that sits in the same namespace as your deployed Microclimate instance.

2. Check that the DevOps endpoint can be accessed.
Issue the following command `kubectl port-forward <DevOps pod name> 9191:9191>`, and then access `localhost:9191/projects` in your web browser. You must not see any "forbidden" messages reported. If you do, check that the service account is being used (as reported in the pod information), and that the role and binding have been correctly created and applied with appropriate permissions.

You can also expose the Microclimate Devops deployment by issuing the following command:

`kubectl expose deployment <your-release-name>-ibm-microclimate-devops --type=NodePort --name <your release name>-devops-svc --namespace <namespacename>`

This creates a new Kubernetes service that you can access in your web browser by visiting the Devops endpoint and accessing the https://<proxy node IP address>:<Devops NodePort>/v1/projects endpoint.

Note that this endpoint should be unexposed immediately afterwards and should only be used for validation purposes.

3. Check that the service account is picked up by Jenkins when interacting with projects as part of a pipeline.
Create a pipeline and then kick off a build. Check the logs for `serviceAccountName` at the top of a build, or use the Jenkins UI. In the Jenkins UI, click on ```Manage Jenkins```, and then click on ```Configure System``` where Jenkins environment variables are listed and can be configured. The variable `SERVICE_ACCOUNT_NAME` must be set to the DevOps/Jenkins service account name, which in this example is `ns2-devops-sa`.
