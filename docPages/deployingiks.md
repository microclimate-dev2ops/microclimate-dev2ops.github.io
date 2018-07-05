---
layout: document
title: Deploying to IBM Cloud Kubernetes Service (IKS)
description: Deploying to IBM Cloud Kubernetes Service (IKS)
keywords: pipeline, configure, config, webhook, github, gitlab, git, Jenkins, travis, Kubernetes, IKS
duration: 1 minute
permalink: deployingiks
type: document
---

### Deploying to IBM Cloud Kubernetes Service (IKS)

To deploy to IKS, the Microclimate Helm chart must be configured so that pipelines push images to a registry that is accessible by both IBM Cloud Private and IKS, for example, the IBM Cloud Container Registry. For the IBM Cloud Container Registry, the Docker registry URL should be in the format `registry.<region>.bluemix.net/<my_namespace>`.

To access the registry, Microclimate needs a non-expiring token with read-write access. This can be created by using the IBM Cloud Container Registry command line plugin as follows:

```
ibmcloud cr token-add --description "Microclimate token" --non-expiring --readwrite
```

The Docker registry secret for Microclimate should specify this token as the password, and a username of `token`. For example:

```
kubectl create secret docker-registry microclimate-registry-secret \
  --docker-server=registry.<region>.bluemix.net/<my_namespace> \
  --docker-username=token \
  --docker-password=<token_value> \
  --docker-email=null
```

The default service account in the IKS namespace to which applications are deployed must be configured to have at least read access to this registry. The IKS cluster must also have Helm initialized without TLS authentication. For example:

```
helm init
```

Microclimate has been tested with Helm versions 2.7.2 and 2.8.2.

Access to the IKS cluster is provided to Microclimate by defining a secret containing the cluster configuration. The cluster configuration can be retrieved from IKS by using the IKS command line plugin and the following command:

```
ibmcloud cs cluster-config <cluster_name>
```

This exports a YAML file that contains the configuration and a corresponding certificate. Do **not** export the `KUBECONFIG` environment variable as instructed by the command output as this may result in additional cluster configuration being added to the file. Change to the directory that contains these two files and then issue the following command to create a secret in the namespace that contains Microclimate, labelled to indicate that it contains a cluster configuration:

```
kubectl create secret generic <secret_name> \
  --from-file=kube-config.yml=<yaml_file>.yml \
  --from-file=<certificate_file>.pem
kubectl label secret <secret_name> microclimate-type=cluster-config
```

The secret name can be any valid Kubernetes resource name. When you select a build to deploy in the Microclimate UI, this name is available to select from a drop-down menu. You can configure multiple IKS clusters in this way.
