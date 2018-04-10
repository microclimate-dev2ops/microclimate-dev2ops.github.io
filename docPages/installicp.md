---
layout: document
title: Installing Microclimate in IBM Cloud Private (ICP)
description: Installing Microclimate in IBM Cloud Private (ICP)
keywords: ICP, cluster, prerequisites, docker, install, storage, chart, uninstall, Configuration
duration: 1 minute
auto_ids: true
permalink: installicp
type: document
---

## Prerequisites

* An IBM Cloud Private (ICP) cluster
* Download the Microclimate zip file, see [Getting started](./gettingstarted)

## Installing the Microclimate Helm Chart

**IMPORTANT** - before installing the Microclimate Helm Chart you must first:
  1. Create a docker registry secret for Microclimate.
  2. Patch the docker registry secret into your ICP service account.
  3. Provide persistent storage volumes for the Microclimate workspace and the Microclimate DevOps pipeline.

#### Create a docker-registry secret
```
kubectl create secret docker-registry microclimate-icp-secret --docker-server=mycluster.icp:8500 --docker-username=<account-name> --docker-password=<account-password> --docker-email=<account-email>
```
The username and password for the secret must be the login credentials for a user that has access to the namespace used in the registry URL. By default, that namespace is ```default``` to which the ```admin``` user has access, but this might vary according to your ICP setup.

For example, to create a secret with the default admin account:
```
kubectl create secret docker-registry microclimate-icp-secret --docker-server=mycluster.icp:8500 --docker-username=admin --docker-password=admin --docker-email=admin@admin.com
```

#### Patch the docker-registry secret into your ICP service account
After you create a secret, it needs to be patched to the service account by using the following command. ICP comes with a service account called "default".

```
kubectl patch serviceaccount <svc-account-name> -p '{"imagePullSecrets": [{"name": "microclimate-icp-secret"}]}'
```

Note: If there are other secrets that need to be associated to this service account, they should be included in the `imagePullSecrets` array in the command above, for example: `... '{"imagePullSecrets": [{"name": "microclimate-icp-secret"}, {"name": "secret-1"}, ...., {"name": "secret-n"} ]}'`

#### Provide persistent storage volumes

Microclimate requires two persistent storage volumes. One volume is needed for the Microclimate workspace, it is used for generated and imported code projects. The other is needed for the Microclimate DevOps pipeline, and is used to store Jenkins build data and logs.

When using your own PersistentVolumeClaim, you must specify the name for your workspace as <workspacename>-ibm-microclimate, for example, `workspace-ibm-microclimate`. If you do not use this naming convention, your project is created but will not start.

The PersistentVolumeClaim definition for the Microclimate workspace has a default size of 2 GB. This should be configured, by using the `persistence.size` option (see below), to scale with the number and size of projects expected to be created in Microclimate. As a rough guide, a generated Java project requires approximately 128 MB, a generated Swift project approximately 100 MB and a generated Node.js project approximately 1 MB. The Microclimate DevOps pipeline has a fixed PersistentVolumeClaim size of 8 GB.

Dynamic Provisioning is also enabled by default and uses the default storage class set up in the given IBM Cloud Private instance. A different storage class can be used by editing the `persistence.storageClassName` option (see below).

For more information about creating Persistent Volumes and enabling Dynamic Provisioning in ICP, visit the following pages :

[Cluster Storage](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0.1/manage_cluster/cluster_storage.html)

[Working with storage](https://www.ibm.com/developerworks/community/blogs/fe25b4ef-ea6a-4d86-a629-6f87ccf4649e/entry/Working_with_storage)

[Dynamic Provisioning](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0.1/installing/storage_class_all.html)

For testing purposes, on an ICP cluster with a single worker node, you can use the HostPath storage type to provide persistent storage, see
[Setting up persistent storage for Microclimate](./persistent)

#### Install Microclimate

`helm install --name microclimate stable/ibm-microclimate`

This command deploys Microclimate into ICP with default options. The [configuration](#configuration) section lists the options that can be configured during the  installation.

## Verifying the Chart
When the helm install has completed successfully, enter the commands provided at the end of the installation to open your Microclimate instance.

## Uninstalling the Chart

To uninstall Microclimate from ICP:

```bash
$ helm delete microclimate --purge
```

The command removes all the Kubernetes components that are associated with the chart and deletes the release.

## Configuration

Microclimate provides a number of configuration options to customise its installation. The table below shows a list of configurable parameters.

If you are installing in IBM Cloud Private, then these can be configured through the Configuration page when you install Microclimate from the ICP catalog.

If you are installing by using the Helm package manager for Kubernetes then values can be set by using one or more `--set` arguments when you do a  `helm install`. For example, to increase the size of the persistent storage allocation for the Microclimate workspace from the default value of 2Gi to 5Gi, you can use the following:

`helm install --name microclimate --set persistence.size=5Gi stable/ibm-microclimate`

#### Configuration parameters

| Parameter                  | Description                                     | Default                                                    |
| -----------------------    | ---------------------------------------------   | ---------------------------------------------------------- |
| `theia.repository`         | Image repository for theia                      | `ibmcom/microclimate-theia` |
| `theia.tag`                | Tag for theia image                             | `latest` |
| `filewatcher.repository`   | Image repository for file-watcher               | `ibmcom/microclimate-file-watcher` |
| `filewatcher.tag`          | Tag for file-watcher image                      | `latest` |
| `portal.repository`        | Image repository for portal                     | `ibmcom/microclimate-portal` |
| `portal.tag`               | Tag for portal image                            | `latest`|
| `imagePullPolicy`          | Image pull policy used for all images           | `Always`    |
| `persistence.enabled`      | Use persistent storage for microclimate workspace | `true` |
| `persistence.existingClaimName`  | Name of an existing PVC to be used for the Microclimate workspace - this should be left blank if using Dynamic Provisioning or if you want Microclimate to use it's own PVC | `""` |
| `persistence.useDynamicProvisioning`      | Use dynamic provisioning | `true` |
| `persistence.size`         | Storage size allowed for microclimate workspace   | `2Gi` |
| `persistence.storageClassName`        | Storage class name for microclimate workspace     | `""` |
| `jenkins.Master.HostName`      | Host name used for Ingress for the Jenkins component of Microclimate | `jenkins.192.168.99.100.nip.io` |
| `jenkins.Persistence.existingClaim`  | Name of an existing PVC to be used for Jenkins - this should be left blank if using Dynamic Provisioning or if you want Microclimate to use it's own PVC | `""` |
| `gitlab.url`        | Optionally, the URL of a Gitlab instance | `""` |
| `gitlab.apiToken`        | Optionally, an API token for the Gitlab instance specified in `gitlab.url` | `""` |


#### Resource requests and limits
Each Microclimate container has a set of default requests and limits for CPU and Memory usage. These are set at recommended values but can be configured to suit the needs of your IBM Cloud Private instance. Resource limits can be configured for each of the Microclimate `theia`, `filewatcher`, and `portal` containers by using the options below:

| Parameter                  | Description                                     | Default                                                    |
| -----------------------    | ---------------------------------------------   | ---------------------------------------------------------- |
| `<containerName>.resources.cpuRequest`         | CPU Request size for a given container  | View the ICP configuration page for Microclimate, or the `values.yaml` file to view default values for each container|
| `<containerName>.resources.cpuLimit`         | CPU Limit size for a given container  | View the ICP configuration page for Microclimate, or the `values.yaml` file to view default values for each container|
| `<containerName>.resources.memRequest`         | Memory Request size for a given container  | View the ICP configuration page for Microclimate, or the `values.yaml` file to view default values for each container|
| `<containerName>.resources.memLimit`         | Memory Limit size for a given container  | View the ICP configuration page for Microclimate, or the `values.yaml` file to view default values for each container|


#### Configuration for the Microclimate DevOps Pipeline
A note on domain names; the use of `<IP>.nip.io` is a convenience for those who don't have a domain name assigned to the Kubernetes cluster.

If you don't have a real domain name associated with your Kubernetes cluster, it's useful to override the Ingress locations so you can access the services.

You can set a command line variable, for example, `INGRESS_IP` with `export INGRESS_IP=$(minikube ip)` or with the IP address of your IBM Cloud Private proxy node.

You can determine the proxy IP address by using the IBM Cloud Private web interface.

You can install the chart with overrides for Ingress with:

`helm install --name microclimate --set jenkins.Master.HostName=jenkins.${INGRESS_IP}.nip.io .`

The Jenkins pod takes a while to start as it is installing plugins. This means that the DevOps pod might restart several times while it is waiting for Jenkins to start.

## What next
After you have installed Microclimate, you can deploy a [sample](./samples) or deploy your own code.
