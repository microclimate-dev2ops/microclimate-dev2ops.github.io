---
layout: document
title: Using a pipeline
description: Using a pipeline
keywords: pipeline, configure, config, webhook, github, gitlab, git, Jenkins, travis
duration: 1 minute
permalink: usingapipeline
type: document
---
You can use a pipeline to build the application and Docker image from source in a Git repository, publish the image to a Docker registry, run tests, and deploy your application to a Kubernetes-based cluster. By [configuring webhooks](./configurewebhooks) on your Git repository, your pipeline can be automatically triggered based on certain Git repository events, such as on pushes to the branch or on the creation of pull requests.

## Prerequisites

Jenkins provides the pipeline capability only when Microclimate is deployed onto IBM Cloud Private by way of the Microclimate Helm chart. The installation instructions for the chart include specifying the Docker registry that the pipeline uses for images, any credentials required to access that registry, and the namespace that the pipeline uses to deploy applications to. Unlike an individual's Microclimate development workspace, pipeline instances are shared among all users of the Microclimate installation.

## Creating a build pipeline

Follow these steps to create a pipeline:

1. Connect to Microclimate. Select a project or create a new one.
2. Then, click **Pipeline**.
3. Click **Create pipeline**. Enter the pipeline name and the HTTP(S) clone URL of your Git repository. Ensure that you include the `.git` suffix. If you previously imported the repository, this URL might be the same as the one that you used on the import, or it might be the URL of the upstream repository from which you forked.
4. If needed, provide the credentials required to clone the repository. Credentials might be a user ID and password or a personal access token. For more information, see [Creating a personal access token in GitHub](./creatingpat) and [Creating a personal access token in GitLab](./creatingpatgitlab).

`Note`: When provided, credentials might be reused by any user that has access to the Microclimate instance. They typically represent a shared build identity that is used by the team.

At this point, a multi-branch pipeline job is automatically configured in Jenkins. In the Git repository specified by the pipeline, Jenkins sets up a child job to build any branch with a Jenkinsfile. The default Jenkinsfile generated for projects by Microclimate builds the application and Docker image and publishes the image to the Docker registry and namespace specified on the Microclimate Helm chart. The image name is specified in the Jenkinsfile, and the image tag is the short form of the Git commit ID.

Click **Open pipeline** to access the newly created Jenkins pipeline. If necessary, log in with the same identity used to authenticate against IBM Cloud Private.

## Deploying applications

After you set up a pipeline to build the application and Docker image, you can deploy applications:

1. Click the **Add deployment** button.
2. Select one of two options to deploy the application with the Helm chart that is defined in the Git repository of the application.
  * Select **Last successful build for branch** to automatically deploy the latest successful build from a specific branch. When a new build for that branch completes successfully, the deployed build is automatically upgraded with the new build.
  * Select **Custom selected build** to deploy a specific build of the application.

In both cases, the default behavior is to deploy to the target namespace that was specified when Microclimate was installed on the IBM Cloud Private cluster to which Microclimate is deployed.

A specific build can also be targeted for deployment to a cluster that is running in the IBM Cloud Kubernetes Service (IKS).

These two scenarios can be combined. For example, a branch can be automatically deployed to a testing environment in IBM Cloud Private and then manually promoted to a cluster in IKS. For more information, see [Deploying to IBM Cloud Kubernetes Service (IKS)](./deployingiks).

* Optional: To verify Java projects built with Maven, the pipeline first installs into a test namespace. To prevent the installation into the test namespace, set the `test` value to `false` in your Jenkinsfile.

## Overriding chart values

When you add deployments, you can specify chart override values in the `/overrides/overrides.yaml` and `/overrides/<target-namespace>_overrides.yaml` files.

Create these files in your Git repository on the branch for which you are creating a deployment. Replace the `<target-namespace>` variable with the name of the namespace into which your application is deployed. The version of the files that is used is the version that exists at the specific commit level that is deployed.

The `overrides.yaml` file is applied to all deployments, but the `<target-namespace>_overrides.yaml` file affects only deployments in the matching namespace. Including these files in the Git repository indicates that you want Microclimate to apply the override.

The settings take effect in the following order:
* The lowest priority file is the `overrides.yaml` file.
* The highest priority file is the relevant `<target-namespace>_overrides.yaml` file.

Any entries that are found in the relevant `<target-namespace>_overrides.yaml` file are used in preference to similar entries in the `overrides.yaml` file.

You cannot override the image repository and tag, which are handled by Microclimate and cannot be modified.

## Pipeline deployment limitation

Helm charts can contain resources with names that aren't scoped by the Helm release, such as the Kubernetes services in Helm charts generated by Microclimate. These Helm charts can be deployed only once to any particular cluster namespace. Because the current release of Microclimate supports deploying only to a single namespace per cluster, multiple deployments are possible only when targeting more than one cluster.

`Note`: Deleting the deployment for a specific build also deletes the corresponding Helm release, allowing another deployment to be made to the same namespace.

## Deleting a project before deleting a pipeline

Deleting a project does not delete the pipeline. Pipelines are shared by projects that target the same Git repository. If you want to delete the pipeline, you must do so before you delete the project. If you accidentally delete a project before you delete a pipeline, you can reimport the project, delete the pipeline, and then delete the project.
