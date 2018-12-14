---
layout: docs
title: Installing Microclimate locally
description: Installing Microclimate locally
keywords: linux, macos, windows, install, mcdev, power, ppc64le
duration: 1 minute
auto_ids: true
permalink: installlocally
type: document
order: 10
parent: root
---

## Installing Microclimate locally

## Download the Microclimate compressed file.

<a href="{{ site.downloadlink }}" class="download-link trackdownload" id="zipDownload">Download Microclimate 18.12</a>

## Installing and starting Microclimate locally on your machine

* [Installing on Linux or MacOS](#installing-on-linux-or-macos)
* [Installing on Windows](#installing-on-windows)

## Installing on Linux or MacOS

You can install the Microclimate Command Line Interface (CLI) to run Microclimate from anywhere on your computer.

### Prerequisites
* Linux or MacOS, on x86_64 architecture only
* The downloaded Microclimate compressed file
* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/get-docker) **Version 17.06 minimum**
* [Docker Compose](https://docs.docker.com/compose/install/).
* On Linux, follow the post-installation steps to [run Docker as a non-root user](https://docs.docker.com/engine/installation/linux/linux-postinstall/).
* You must be connected to the internet to perform this task. Microclimate downloads software for creating and configuring your environment.

### Installing and running on Linux or MacOS
1. Extract the downloaded file, open a terminal session, and log in as either as a root or non-root user.
2. Change the directory to the Microclimate directory.
3. Navigate to the top directory of the downloaded and extracted file. The installation script is in the `<compressed-file-name>/cli/install.sh` file.
4. Run the installation script.
```
cd cli
./install.sh
cd ..
```
* This script installs the `mcdev` command as a link in your `HOME` directory, which is normally `$HOME/microclimate-workspace`.
* The `./install.sh` command installs `mcdev` to your `/usr/local/bin` directory, automatically adding it to the path.
5. Start Microclimate with the `~/mcdev start` command or by manually adding `mcdev` to your path. Instructions are included at the end of the installation script. The command downloads Docker images and opens Microclimate in your default browser. Completion time can vary and depends on the speed of your internet connection.
```
~/mcdev start -o
```
6. After you complete the CLI installation, you can enter [CLI commands](clicommands).

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
2. Extract the downloaded file, open a PowerShell session, and navigate to the Microclimate directory.
3. If you're updating from an earlier version of Microclimate to a newer version of Microclimate, you might have copied the `microclimate-workspace` directory from the earlier version to avoid losing your projects. If you copied the directory, paste it into the new installation directory.
4. Install the Microclimate CLI, which adds the `mcdev` command to your PATH:
```bash
cli\install.ps1
```
5. Start Microclimate. This command downloads Docker images and opens Microclimate in your default browser:
```bash
mcdev start -o
```
6. After you complete the CLI installation, you can enter [CLI commands](clicommands).

## What next
After you install Microclimate and accept the [license agreement](license), you can start [using Microclimate to work with projects](usingmicroclimate).

## Need help?
If you encounter problems with installing Microclimate locally, check the [Troubleshooting page](troubleshooting#installing-microclimate-locally).
