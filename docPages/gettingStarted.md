---
layout: document
title: Getting started
description: Getting started
duration: 1 minute
auto_ids: true
permalink: gettingstarted
---

<a href="./download/microclimate.zip" class="download-link" style="color: white;">Download</a>


Quickly build and deploy micro-services in the blink of an eye

![platforms](https://img.shields.io/badge/runtime-Java%20%7C%20Swift%20%7C%20Node-yellow.svg)

* [Local deployment](#local-microclimate-deployment)
* [IBM Cloud Private deployment](#ibm-cloud-private-deployment)



## Local microclimate deployment

#### Prerequisites
* [Docker](https://www.docker.com/get-docker) **v17.06 minimum**
* Linux only: follow post-installation steps to
  * [Run docker as a non-root user](https://docs.docker.com/engine/installation/linux/linux-postinstall/)
  * [Update docker-compose](https://docs.docker.com/compose/install/)
* Windows only: 
  * We strongly recommend that you do not run using Experimental Features enabled (which is enabled by default in Docker) when running Windows 10. To turn it off, go to Docker->Settings->Daemon and de-select **Experimental Features**.

#### Install and run


1. Unzip the downloaded file.

2. Install the microclimate command line interface (mcdev).


##### Linux/MacOS  
Non-sudo installation (Run as ~/mcdev or manually add to path)
```
cd cli
./install.sh
cd ..
```
Sudo user installation (install as root and to `/usr/local/bin` automatically putting it on your path)
```
cd cli
sudo ./install.sh
cd ..
```
NOTE: You won't be able to run `mcdev` commands from inside the cli directory due to the file name conflict. To run commands change to another directory.
##### For Windows, PowerShell (.ps1)
In a PowerShell session run
```
cli\install.ps1
```
3. Run the following command to start and open microclimate.
```
mcdev start -o
```


### Stopping

1. To stop Microclimate just run the command:
```
mcdev stop
```
This will stop and remove your Microclimate Docker containers.




## IBM Cloud Private deployment

#### Prerequisites
* [Docker](https://www.docker.com/get-docker)
* [Kubectl (Kubernetes Command Line Tool)](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

#### Installing Microclimate

Microclimate uses Helm, the package manager for Kubernetes, to provide installation in Kubernetes environments including IBM Cloud Private. For more information about Helm see [https://docs.helm.sh/using_helm/](https://docs.helm.sh/using_helm/).

- Configure the Kubernetes client API to point to your ICP instance: in the ICP admin GUI, click the account symbol in the top right and go to Configure Client, copy the provided commands and paste them into your local terminal.

- Run the `helm install` command to deploy Microclimate into your ICP instance. This will create Deployment and Service definitions in ICP and pull the Microclimate docker images from https://hub.docker.com/.
```bash
helm install --name microclimate chart/microclimate
```

To uninstall Microclimate from ICP run the following command:
```bash
helm delete microclimate --purge
```

The [Helm chart README](https://github.ibm.com/dev-ex/microclimate/blob/master/chart/microclimate/README.md) provides further information on using persistence storage and other for more configuration options. For build instructions and running with a local build of the Microclimate docker images see: [Microclimate-Development](https://github.ibm.com/dev-ex/microclimate/wiki/Microclimate-Development)
