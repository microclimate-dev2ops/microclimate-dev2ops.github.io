---
layout: document
title: Installing the Microclimate CLI
description: How to setup and run microclimate from command line
keywords: install, command line, cli, command, start, stop, update, open, delete, options, operation, devops
duration: 1 minute
permalink: cli
type: document
category: How-tos and Guides
parent: Installing Microclimate locally
---
# Microclimate CLI
Installing the Microclimate CLI allows you to run Microclimate from anywhere on your computer.
Your Microclimate projects will be created in your home directory. Normally `$HOME/microclimate-workspace`.

## Setup
Run the install script found in the `cli` directory ([microclimate/cli](https://github.ibm.com/dev-ex/microclimate/tree/master/cli)).
You can either run this as sudo or as a non-root user.
Effects:
* `sudo ./install.sh`: Installs mcdev to your `/usr/local/bin` directory, automatically adding it to the path.
* `./install.sh`: Installs mcdev to `~/mcdev`. You can either run Microclimate using `~/mcdev start` or add mcdev to your path manually (Instructions given at the end of the install script).
```
cd cli &&
./install.sh &&
cd ..
```
NOTES:
* You won't be able to run `mcdev` commands from inside the cli directory due to the file name conflict. To run commands change to another directory.
* If you see a BAD_CREDENTIAL error such as below:
```
Pulling microclimate-[image-name] (sys-mcs-docker-local.artifactory.swg-devops.com/[image-name])...
ERROR: Get https://sys-mcs-docker-local.artifactory.swg-devops.com/v2/[image-name]/manifests/2018_M3: unauthorized: BAD_CREDENTIAL
```
Ensure you're correctly logged into the Artifactory Docker image repository by running:
```bash
# Use your IBM intranet credentials
docker login sys-mcs-docker-local.artifactory.swg-devops.com
```



## Usage
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
