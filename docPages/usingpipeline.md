---
layout: document
title: Using a pipeline
description: Using a pipeline
keywords: pipeline, configure, config, webhook, github, gitlab, git, Jenkins, travis
duration: 1 minute
permalink: usingpipeline
type: document
---

You can use a pipeline to build the application and Docker image from source that is checked into a Git repository, publish the image to a Docker registry, run tests, and deploy your application. By [configuring webhooks](./configurewebhooks) on your Git repository, your pipeline can be automatically triggered based on certain Git repository events, for example, on pushes to the branch or, on the creation of pull requests.

## Prerequisites

The pipeline capability is provided by a Jenkins instance that is created when Microclimate is deployed on to IBM Cloud Private by way of the Microclimate Helm chart. The installation instructions for the chart include specifying the Docker registry that the pipeline uses for images, any credentials required to access that registry, and the namespace that the pipeline uses to deploy applications to. Note: Unlike an individual's Microclimate development workspace, pipeline instances are shared between all users of the Microclimate install.

It is still possible to create pipelines through Microclimate running on a local machine but it must first be connected to a Microclimate install running on IBM Cloud Private. Click the ```Connect``` button and enter the URL of the remote Microclimate instance, along with the credentials required to access it.

## Creating a build pipeline

To create a pipeline:
1. Ensure you are connected to Microclimate. Then, click ```Pipeline```.
2. Specify the HTTP(S) clone URL of your Git repository, and ensure that you include the `.git` suffix. If you previously imported the repository, this might be the same URL that you used on the import, or it might be the URL of the upstream repository from which you have forked if this is the code that you want to build.
3. If needed, provide the credentials required to clone the repository. These might be a user ID and password, or personal access token. To create a personal access token in GitHub, see [Creating a personal access token in GitHub](./creatingpat), for GitLab, see [Creating a personal access token in GitLab](./creatingpatgitlab). Note: When provided, credentials might be reused by any user that has access to the Microclimate instance. Typically, they should therefore represent a shared build identity used by the team.

At this point, a multi-branch pipeline job is automatically configured in Jenkins which scans the Git repository for branches containing a Jenkinsfile and sets up child jobs to build them. The default Jenkinsfile generated for projects created with Microclimate builds the application and Docker image, and publishes the image to the Docker registry and namespace specified on the Microclimate Helm chart. The image name is specified in the Jenkinsfile and the image tag is the short form of the Git commit ID.

The Jenkins pipeline that is created can be accessed by clicking ```Open pipeline```. Log in by using the identity that was used to authenticate against IBM Cloud Private.

## Deploying applications

Having set up a pipeline to build the application and Docker image, there are two options to deploy the application by using the Helm chart provided in the application's Git repository:

1. Automatically deploy the latest successful build from a given branch, and when a new build for that branch completes successfully, update the Helm release automatically.
2. Deploy a specific build of the application.

In both cases, the default behavior is to deploy to the target namespace that was specified when Microclimate was installed  on the IBM Cloud Private cluster to which Microclimate is deployed. In the latter case, a specific build can also be targeted for deployment to a cluster that is running in the IBM Cloud Kubernetes Service (IKS). These two scenarios can be combined. For example, a branch could be automatically deployed to a testing environment in IBM Cloud Private, and then manually promoted to a cluster in IKS.

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

## Pipeline deployment limitation

Helm charts that contain resources whose names aren't scoped by the Helm release (for example, the Kubernetes services in Helm charts generated by Microclimate) can only be deployed once to any given cluster namespace. As the current release of Microclimate only supports deploying to a single namespace per cluster, multiple deployments are only possible when targeting more than one cluster.

```Note```: Deleting the deployment for a specific build also deletes the corresponding Helm release allowing another deployment to be made to the same namespace. When deleting the deployment for the last successful build on a branch, the Helm release is not currently cleaned up, and must be deleted manually.
 
## Deleting a project before deleting a pipeline

Deleting a project does not delete the pipeline. Pipelines are shared by projects that target the same Git repository. If you want to delete the pipeline, you must do so before you delete the project. If you accidentally delete a project before you delete a pipeline, you can reimport the project, delete the pipeline, and then delete the project.
