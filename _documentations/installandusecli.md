---
layout: docs
title: Installing the Microclimate CLI
description: How to setup and run microclimate from command line
keywords: install, command line, cli, command, start, stop, update, open, delete, options, operation, devops, healthcheck
duration: 1 minute
permalink: installandusecli
type: document
order: 1
parent: installlocally
---

## Installing the Microclimate CLI

Installing the Microclimate Command Line Interface (CLI) enables you to run Microclimate from anywhere on your computer. These instructions are not valid on Windows.

Your Microclimate projects are created in your home directory, normally `$HOME/microclimate-workspace`.

## Setup
Run the install script found in the `cli` directory.
<!-- Run the install script found in the `cli` directory ([microclimate/cli](https://github.ibm.com/dev-ex/microclimate/tree/master/cli)). -->
You can either run this as sudo or as a non-root user.
Effects:
* `sudo ./install.sh`: Installs mcdev to your `/usr/local/bin` directory, automatically adding it to the path.
* `./install.sh`: Installs mcdev to `~/mcdev`. You can either run Microclimate by using `~/mcdev start` or by adding mcdev to your path manually. Instructions are given at the end of the install script.

The following commands assume you have navigated to the top directory of the downloaded and unzipped zip file. The install script is in ```<zip-file-name>/cli/install.sh```.

```
cd cli &&
./install.sh &&
cd ..
```

NOTES:
* You might see a BAD_CREDENTIAL error:
```
Pulling microclimate-[image-name] (sys-mcs-docker-local.artifactory.swg-devops.com/[image-name])...
ERROR: Get https://sys-mcs-docker-local.artifactory.swg-devops.com/v2/[image-name]/manifests/2018_M3: unauthorized: BAD_CREDENTIAL
```
To resolve the error, ensure you're correctly logged in to the Artifactory Docker image repository with the following command:
```bash
# Use your IBM intranet credentials
docker login sys-mcs-docker-local.artifactory.swg-devops.com
```

## Using the Microclimate CLI
```
mcdev COMMAND [options]
```

Commands:
* [start](#start)
* [stop](#stop)
* [open](#open)
* [update](#update)
* [healthcheck](#health-check)
* [delete](#delete)

Run `mcdev COMMAND --help` for more information on a command.

### Start
Start Microclimate.
```
mcdev start [OPTIONS]
```
Options
* `-o, --open`: Open Microclimate in your default browser after it has started.
* `-u, --update`: Update Microclimate to its latest version before starting.

### Stop
Stop Microclimate
```
mcdev stop
```

### Open
Open Microclimate in your default browser.
```
mcdev open
```
Note: This will look for the port that 'microclimate-portal' is on and open it.

### Update
Update Microclimate by pulling the newest images down from the repository.
```
mcdev update
```

### Health check
Run a check through your system to ensure that microclimate-workspace, the config directory and your git username and email are set up correctly. Also prints the current amount of projects in your workspace.
```
mcdev healthcheck
```

### Delete
Delete all Microclimate images on your machine.
```
mcdev delete
```
