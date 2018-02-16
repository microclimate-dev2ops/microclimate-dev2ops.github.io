---
layout: document
title: Getting started
description: Getting started
duration: 1 minute
auto_ids: true
permalink: gettingstarted
---

<a href="./download/microclimate-18.02-beta.zip" class="download-link trackdownload" id="zipDownload" style="color: white;">Download</a>


Quickly build and deploy micro-services in the blink of an eye

![platforms](https://img.shields.io/badge/runtime-Java%20%7C%20Swift%20%7C%20Node-yellow.svg)

* [Local deployment](#local-microclimate-deployment)
* [IBM Cloud Private deployment](#ibm-cloud-private-deployment)



## Local microclimate deployment

#### Prerequisites
* [Docker](https://www.docker.com/get-docker) **v17.06 minimum**
* Linux: 
  * Supported architecture: x86-64 only
  * Follow post-installation steps to [run docker as a non-root user](https://docs.docker.com/engine/installation/linux/linux-postinstall/)
  * [Update docker-compose](https://docs.docker.com/compose/install/)
* Windows:
  * Windows 10 or Windows Server 2016
  * [Docker for Windows](https://www.docker.com/docker-windows)
  * We strongly recommend that you do not run using Experimental Features enabled (which is enabled by default in Docker) when running Windows 10. To turn it off, go to Docker->Settings->Daemon and de-select **Experimental Features**.

#### Updating Microclimate
To update Microlimate:
1. Uninstall the previous version.
2. Delete the .idc directory from the microclimate-workspace directory.
3. Install the new version.  

#### Install and run on Linux or MacOS
1. Unzip the download file, open a terminal session and change directory into the microclimate directory.
2. Install the Microclimate CLI. This will install the mcdev command as a link in your HOME directory:
```
cd cli
./install.sh
cd ..
```
3. Start Microclimate. This will download docker images and open Microclimate in your default browser:
```
~/mcdev start -o
```

#### Uninstall on Linux or Mac/OS
1. Stop Microclimate. This stops the docker containers.
```
~/mcdev stop
```
2. Delete the microclimate docker images:
```bash
~/mcdev delete
```
3. Uninstall the Microclimate CLI. From the microclimate directory:
```
cd cli
sudo ./uninstall.sh
cd ../..
```
4. Delete the microclimate directory and its subdirectories
```
rm -rf <microclimate directory>
```
5. Delete the .idc directory from the microclimate-workspace directory.

#### Install and run on Windows
1. Open the file properties menu for the download file. Tick the Unblock box on the General tab then click OK.
2. Unzip the download file, open a PowerShell session and change directory into the microclimate directory.
3. Install the Microclimate CLI. This will add the mcdev command to your PATH:
```bash
cli\install.ps1
```
4. Start Microclimate. This will download docker images and open Microclimate in your default browser:
```bash
mcdev start -o
```

#### Uninstall on Windows
1. Stop Microclimate. This stops the docker containers.
```bash
mcdev stop
```
2. Delete the microclimate docker images:
```bash
mcdev delete
```
3. Delete the microclimate directory and its subdirectories:
```bash
rmdir  <microclimate directory> /S
```
4. Delete the .idc directory from the microclimate-workspace directory.


#### Microclimate CLI
```bash
Usage:  mcdev COMMAND

Commands:
  start             Pull Microclimate docker images and start Microclimate
  open              Open Microclimate in your browser
  stop              Stop Microclimate docker containers
  update            Update Microclimate docker images
  delete            Delete all Microclimate images

```
For full installation and usage details see [Microclimate CLI](./cli).


## IBM Cloud Private deployment

#### Prerequisites
* [Docker](https://www.docker.com/get-docker)
* [Kubectl (Kubernetes Command Line Tool)](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

Microclimate uses Helm, the package manager for Kubernetes, to provide installation in Kubernetes environments including IBM Cloud Private. For more information about Helm see [https://docs.helm.sh/using_helm/](https://docs.helm.sh/using_helm/).

#### Installing Microclimate with a persistent workspace

- Follow the instructions in [Persistent storage in ICP](./persistent) to set up a persistent workspace for your Microclimate projects and install and run Microclimate.

####  Installing Microclimate without a persistent workspace

1. Unzip the download file, open a terminal session and change directory into the microclimate directory.
2. Configure the Kubernetes client API to point to your ICP instance: in the ICP admin GUI, click the account symbol in the top right and go to Configure Client, copy the provided commands and paste them into your local terminal.
3. Run the following command. Note that your projects will be deleted when the ICP pod is restarted.
```bash
helm install --name microclimate chart/microclimate
```

For information on using persistence storage and other configuration options see [Persistent storage in ICP](./persistent) and the [Helm chart README](./helmchart). For development build instructions and running with a local build of the Microclimate docker images see [Microclimate-Development](./microclimatedev).

#### Uninstalling Microclimate

1. Open a terminal session.
2. Configure the Kubernetes client API to point to your ICP instance: in the ICP admin GUI, click the account symbol in the top right and go to Configure Client, copy the provided commands and paste them into your local terminal.
3. Run the following command:  
```bash
helm delete microclimate --purge
```

