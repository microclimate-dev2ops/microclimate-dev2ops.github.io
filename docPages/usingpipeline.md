---
layout: document
title: Using a pipeline
description: Using a pipeline
keywords: pipeline, configure, config, webhook, github, gitlab, git, Jenkins, travis
duration: 1 minute
permalink: usingpipeline
type: document
---

## Using a pipeline

Use a pipeline to build the application and Docker image, publish the image to a Docker registry, run tests, and deploy your application.

To create a pipeline:
1. Click ```Pipeline```.
2. Specify the clone URL of your Git repository, and ensure you include the `.git` suffix. If you previously imported the repository, this is likely to be the same URL you used on the import.
3. If needed, check the ```Authentication required``` checkbox and enter the relevant credential details.  If you want to use a personal access token, you can enter this in the password field, but you still need to provide a username. To create a personal access token in GitHub, see [Creating a personal access token in GitHub](./creatingpat).
4. In the ```Deploy branch``` field, specify the branch in your Git repository that you want to automatically deploy (defaults to master).
5. The ```Auto-build``` switch enables or disables the Jenkins build. When switched off, Jenkins ignores any triggers from web hooks and does not have a ```Build Now``` option.

The Jenkins pipeline that is created can be accessed by clicking ```Open pipeline```. Log in by using the credentials specified when the Microclimate Helm chart was installed (admin/admin by default), or by using the IBM Cloud Private credential when Microclimate is installed in IBM Cloud Private.

## Configuring the pipeline

The pipeline pushes the Docker image to the Docker registry specified in the `jenkins.Pipeline.Registry.Url` Helm chart value. This URL should include the port and the registry namespace. For example, in IBM Cloud Private use `mycluster.icp:8500/default`. If the registry is secured, then the name of a Kubernetes `docker-registry` secret should be specified by using `jenkins.Pipeline.Registry.Secret`.

The pipeline deploys the built application to the namespace specified in the `jenkins.Pipeline.TargetNamespace` Helm chart value (defaults to `microclimate-pipeline-deployments`). Note: The pipeline is using its own Helm Tiller instance to deploy the application so the Helm release does not appear in the IBM Cloud Private dashboard.

## Configuring web hooks

By configuring web hooks on your Git repository, your pipeline can be automatically triggered based on certain events, for example, on pushes to the branch or on creation of pull requests. Note: You do not need the web hook for the initial build. You need the webhook to trigger subsequent builds when changes are pushed to repositories in the organization, or when new repositories are added.

### GitLab

Microclimate can be configured to automatically create web hooks for repositories in GitLab. When installing the Microclimate Helm Chart, specify the `gitlab.url` and `gitlab.apiToken` options. Web hooks are then automatically created for repositories that start with the given URL.

GitLab can be deployed to a Kubernetes cluster by using the [Helm chart](https://docs.gitlab.com/ce/install/kubernetes/gitlab_omnibus.html).

## GitHub

To create web hooks in GitHub:

1. From your repository in GitHub, click ```Settings```, ```Webhooks```, and then click ```Add webhook```.
2. Enter the Payload URL: ```JENKINS_URL/git/notifyCommit?url=GITHUB_URL```, replacing ```JENKINS_URL``` with the base URL of your Jenkins deployment and ```GITHUB_URL``` with the URL of the GitHub repository. For example, ```http://jenkins.1.2.3.4.nip.io/git/notifyCommit?url=https://github.com/microclimate-demo/node.git```.
3. Select the ```Let me select individual events``` option.
4. From the list of events that are displayed, select ```Pull requests``` and ```Pushes```.
5. Click ```Add webhook```.
