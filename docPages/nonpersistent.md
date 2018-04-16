---
layout: document
title: Install and run using nonpersistent storage in IBM Cloud Private
description: Install and run using nonpersistent storage in IBM Cloud Private
keywords: docker, kubernetes, command, bash, helm, install, run
duration: 1 minute
auto_ids: true
permalink: nonpersistent
type: document
---

## Prerequisites
* [Docker](https://www.docker.com/get-docker)
* [Kubectl (Kubernetes Command Line Tool)](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

Microclimate uses Helm, the package manager for Kubernetes, to provide installation in Kubernetes environments including IBM Cloud Private. For more information about Helm see [https://docs.helm.sh/using_helm/](https://docs.helm.sh/using_helm/).

## Installing Microclimate
1. Unzip the download file, open a terminal session and change directory into the microclimate directory.
2. Configure the Kubernetes client API to point to your IBM Cloud Private instance. To do this, in the IBM Cloud Private admin GUI, click the account symbol in the top right and go to Configure Client, copy the provided commands and paste them into your local terminal.
3. Grant your IBM Cloud Private instance access to Artifactory:
```bash
kubectl create secret docker-registry artifactory --docker-server=sys-mcs-docker-local.artifactory.swg-devops.com --docker-username=<your-intranet-id> --docker-password=<your-intranet-pwd> --docker-email=<your-email>
kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "artifactory"}]}'
```
4. Run the `helm install` command to deploy Microclimate into your IBM Cloud Private instance. This creates Deployment and Service definitions in IBM Cloud Private and pulls the Microclimate Docker images from https://hub.docker.com/
```bash
helm install --name microclimate chart/microclimate
```
5. Open the Microclimate Helm release via the IBM Cloud Private admin GUI, then open the service definition, and then click on the Microclimate portal URL.
