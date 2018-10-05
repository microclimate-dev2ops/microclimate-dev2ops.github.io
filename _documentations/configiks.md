---
layout: docs
title: Configuring Microclimate to deploy applications to the IBM Cloud Kubernetes Service
description: Configuring Microclimate to deploy applications to the IBM Cloud Kubernetes Service
keywords: pipeline, configure, config, Jenkins, Docker, IBM Cloud Container Registry, Helm, deploy, Kubernetes, secret, cluster, configuration, clusters
duration: 1 minute
permalink: configiks
type: document
order: 4
parent: usingapipeline
---

## Configuring Microclimate to deploy applications to the IBM Cloud Kubernetes Service

## Prerequisites
Decide to deploy to the IBM Cloud Kubernetes Service before you install Microclimate. When you install Microclimate, specify a Docker registry location on the `jenkins.Pipeline.Registry.URL` property. Both Microclimate and the IBM Cloud Kubernetes Service need to access this registry. The following instructions assume the use of IBM Cloud Container Registry.

## Deploying to the IBM Cloud Kubernetes Service
To deploy to the IBM Cloud Kubernetes Service, the Microclimate Helm chart must be configured so that pipelines push images to a registry that is accessible by both IBM Cloud Private and the IBM Cloud Kubernetes Service, for example, the IBM Cloud Container Registry. For the IBM Cloud Container Registry, the Docker registry URL should be in the format `registry.<region>.bluemix.net/<my_namespace>`.

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

The <my_namespace> variable refers to the namespace you should have created when you set up the IBM Cloud Container Registry for usage.

You must create this secret in the same namespace on IBM Cloud Private where Microclimate is installed. Add `--namespace <Microclimate namespace>` or configure your kubectl client so that all commands automatically run against a specified namespace. After you complete these steps, you have a secret on IBM Cloud Private in the Microclimate namespace, and the secret refers to an IBM Cloud Container Registry location.

The default service account in the IBM Cloud Kubernetes Service namespace to which applications are deployed must be configured to have at least read access to this registry. The IBM Cloud Kubernetes Service cluster must also have Helm initialized without TLS authentication. For example:

```
helm init
```

Microclimate has been tested with Helm versions 2.7.2, 2.8.2, and 2.9.1. Make sure that the version of Helm for your deployment environment, the IBM Cloud Kubernetes Service in this case, matches the version of Helm on IBM Cloud Private, specifically in the Tiller namespace that you used when you installed Microclimate. The namespace is typically `kube-system`.

For example, if you use IBM Cloud Private 3.1 and plan to deploy your applications into the IBM Cloud Kubernetes Service, enter the `helm init` command with Helm 2.9.1, which is the version of Helm that runs inside of IBM Cloud Private.

Access to the IBM Cloud Kubernetes Service cluster is provided to Microclimate by defining a secret containing the cluster configuration. The cluster configuration can be retrieved from the IBM Cloud Kubernetes Service by using the IBM Cloud Kubernetes Service command line plugin and entering the following command:

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

Use `--namespace` again or configure your kubectl client so that the previous commands are performed in the same namespace where Microclimate is installed.

The secret name can be any valid Kubernetes resource name. When you select a build to deploy in the Microclimate UI, this name is available to select from a drop-down menu. You can configure multiple IBM Cloud Kubernetes Service clusters in this way.
