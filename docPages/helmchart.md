---
layout: document
title: Helm chart
description: Helm chart
duration: 1 minute
permalink: helmchart
type: document
---

This is a chart used to deploy Microclimate to IBM Cloud Private or Kubernetes

## Prerequisites
1. An active IBM Cloud Private or Kubernetes cluster (including minikube)
2. [Kubectl (Kubernetes Command Line Tool)](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
3. Unzipped Microclimate download file.
4. Terminal session in the microclimate directory with the Kubernetes client API to pointing to your ICP instance. 
    - In the ICP admin GUI, click the account symbol in the top right and go to Configure Client, copy the provided commands and paste them into your local terminal.

## Installing the Chart

To install the chart with the release name `microclimate`:

```bash
$ helm install --name microclimate <path_to_this_chart>
```

The command deploys Microclimate on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Verifying the Chart

Once the helm install has completed successfully, enter the commands provided at the end of the installation to open your Microclimate instance

## Uninstalling the Chart

To uninstall/delete the `microclimate` deployment:

```bash
$ helm delete microclimate --purge
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

### Configuring Microclimate persistent storage

The default Microclimate deployment uses a local workspace for your generated project code. This will be deleted if the microclimate pod in ICP is deleted. You can define a persistent storage volume in ICP for saving the generated project code. See the following information on creating a persistent storage volume:

[https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0/manage_cluster/cluster_storage.html](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0/manage_cluster/cluster_storage.html)

[https://www.ibm.com/developerworks/community/blogs/fe25b4ef-ea6a-4d86-a629-6f87ccf4649e/entry/Working_with_storage]([https://www.ibm.com/developerworks/community/blogs/fe25b4ef-ea6a-4d86-a629-6f87ccf4649e/entry/Working_with_storage)

The `helm install` command allows you to configure Microclimate to use a persistent storage volume, for example:
```bash
helm install --name microclimate --set persistence.enabled=true chart/microclimate
```
You can also specify `persistence.size` and `persistence.class` values to connect Microclimate to your persistent volume.

### Configuration parameters

The following tables lists the configurable parameters of the Microclimate chart and their default values. These are defined in the included values.yaml file and can either be changed within this file or by setting them at installation time use the `--set` option.

| Parameter                  | Description                                     | Default                                                    |
| -----------------------    | ---------------------------------------------   | ---------------------------------------------------------- |
| `image.repo.orion`         | Image repository for orion                      | `ibmcom/microclimate-orion` |
| `image.repo.filewatcher`   | Image repository for file-watcher               | `ibmcom/microclimate-file-watcher` |
| `image.repo.portal`        | Image repository for portal                     | `ibmcom/microclimate-portal` |
| `image.tag`                | Image tag                                       | `latest`                                                         |
| `image.imagePullPolicy`         | Image pull policy                               | `Always`    |
| `persistence.enabled`      | Use persistent storage for microclimate workspace | `false` |
| `persistence.size`         | Storage size allowed for microclimate workspace   | `1Gi` |
| `persistence.class`        | Storage class name for microclimate workspace     | `""` |