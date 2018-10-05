---
layout: docs
title: Installing Microclimate locally
description: Installing Microclimate locally
keywords: linux, macos, windows, install, mcdev
duration: 1 minute
auto_ids: true
permalink: installlocally
type: document
order: 20
parent: root
---

## Installing Microclimate locally

## Download the Microclimate zip file.

<a href="{{ site.downloadlink }}" class="download-link trackdownload" id="zipDownload">Download Microclimate 2018_M19_I</a>

## Installing and starting Microclimate locally on your machine

* [Installing on Linux or MacOS](#installing-on-linux-or-macos)
* [Installing on Windows](#installing-on-windows)

## Installing on Linux or MacOS

### Prerequisites
* The downloaded Microclimate zip file
* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/get-docker) **v17.06 minimum**
* Supported architecture: x86-64 only
* On Linux, follow the post-installation steps to [run docker as a non-root user](https://docs.docker.com/engine/installation/linux/linux-postinstall/)
* [Install Docker-Compose](https://docs.docker.com/compose/install/)
* You must be connected to the Internet to perform this task. Microclimate downloads additional software for creating and configuring your environment.

### Installing and running on Linux or MacOS
1. Unzip the download file, open a terminal session, and change directory into the Microclimate directory.
2. Install the Microclimate CLI. This installs the `mcdev` command as a link in your HOME directory:
```
cd cli
./install.sh
cd ..
```
3. Start Microclimate. This downloads Docker images and opens Microclimate in your default browser. The time it takes to do this might vary and depends on the speed of your Internet connection.
```
~/mcdev start -o
```

## Installing on Windows

### Prerequisites
* Supported Windows versions are Windows 10 and Windows Server 2016.
* [Git](https://git-scm.com/)
* Install [Docker for Windows](https://www.docker.com/docker-windows).
* Enable your local disk drive for sharing in Docker. Open the **Docker Settings** window, click the **Shared Drives** tab, and select the drive on which you are installing Microclimate.
* Use the default Linux containers setting. From the **Docker for Windows** menu, you can toggle between the Linux or Windows daemon. If your settings have been changed from the default, select **Switch to Linux containers...** to use Linux containers. Microclimate runs only on Linux containers.
* Disable Docker Experimental features. Open the **Docker Settings** window, click the **Daemon** tab, and clear the **Experimental features** check box.

### Installing and running on Windows
1. Open the file properties menu for the downloaded file. Tick the **Unblock** box on the **General** tab, and then click **OK**.
2. Unzip the downloaded file, open a PowerShell session, and navigate to the Microclimate directory.
3. Install the Microclimate CLI, which adds the `mcdev` command to your PATH:
```bash
cli\install.ps1
```
4. Start Microclimate. This command downloads Docker images and opens Microclimate in your default browser:
```bash
mcdev start -o
```

## What next
After you have installed Microclimate and accepted the [license agreement](license), you can then follow a [tutorial](tutorials-and-samples), [deploy a sample](tutorials-and-samples), [create a new project](creatingaproject), or [import a project](importingaproject).
