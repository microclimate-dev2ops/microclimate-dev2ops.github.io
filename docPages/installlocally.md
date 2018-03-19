---
layout: document
title: Installing Microclimate locally
description: Installing Microclimate locally
duration: 1 minute
auto_ids: true
permalink: installlocally
type: document
---

## Before you start
* Download the Microclimate zip file, see [Getting started](./gettingstarted).

## Installing Microclimate locally on your machine.

* [Installing on Linux or MacOS](#installing-on-linux-or-macos)
* [Installing on Windows](#installing-on-windows)

## Installing on Linux or MacOS

### Before you start
* Download the Microclimate zip file, see [Getting started](./gettingStarted).

### Prerequisites
* [Docker](https://www.docker.com/get-docker) **v17.06 minimum**
* Supported architecture: x86-64 only
* On Linux, follow the post-installation steps to [run docker as a non-root user](https://docs.docker.com/engine/installation/linux/linux-postinstall/)
* [Install Docker-Compose](https://docs.docker.com/compose/install/)

### Installing and running on Linux or MacOS
1. Unzip the download file, open a terminal session, and change directory into the Microclimate directory.
2. Install the Microclimate CLI. This installs the `mcdev` command as a link in your HOME directory:
```
cd cli
./install.sh
cd ..
```
3. Start Microclimate. This downloads Docker images and opens Microclimate in your default browser:
```
~/mcdev start -o
```

## Installing on Windows

### Before you start
* Download the Microclimate zip file, see [Getting started](./gettingStarted).

### Prerequisites
* Windows 10 or Windows Server 2016
* [Docker for Windows](https://www.docker.com/docker-windows)
* On Windows 10, we strongly recommend that you do not run using Experimental Features which is enabled by default in Docker. To turn it off, go to Docker->Settings->Daemon and de-select **Experimental Features**.

### Installing and running on Windows
1. Open the file properties menu for the download file. Tick the Unblock box on the General tab, and then click OK.
2. Unzip the download file, open a PowerShell session, and change directory into the Microclimate directory.
3. Install the Microclimate CLI. This adds the `mcdev` command to your PATH:
```bash
cli\install.ps1
```
4. Start Microclimate. This downloads Docker images and opens Microclimate in your default browser:
```bash
mcdev start -o
```

## What next
After you have installed Microclimate, you can deploy a [sample](./samples) or deploy your own code.
