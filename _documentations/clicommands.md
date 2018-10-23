---
layout: docs
title: Running Microclimate CLI commands
description: How to run Microclimate from the command line
keywords: command line, cli, command, start, stop, update, open, delete, options, operation, devops, healthcheck
duration: 1 minute
permalink: clicommands
type: document
order: 1
parent: usingmicroclimate
---

## Entering Microclimate CLI commands
Enter the Microclimate CLI commands with `mcdev COMMAND [options]`.

Run the `mcdev COMMAND --help` command for more information on a command.

Choose from the following commands:
* [start](#start)
* [stop](#stop)
* [open](#open)
* [update](#update)
* [healthcheck](#health-check)
* [delete](#delete)

### Start
Start Microclimate.
```
mcdev start [OPTIONS]
```
Options
* `-o, --open`: Open Microclimate in your default browser after it starts.
* `-u, --update`: Update Microclimate to the latest version before starting.

### Stop
Stop Microclimate.
```
mcdev stop
```

### Open
Open Microclimate in your default browser.
```
mcdev open
```
**Note:** This command looks for the port that `microclimate-portal` is on and opens it.

### Update
Refresh your current version of Microclimate by pulling the newest images. This command does not upgrade Microclimate to a newer version, but it refreshes the existing version if a patch to your currently installed version is available.
```
mcdev update
```

### Health check
Run a check through your system to ensure that `microclimate-workspace`, the config directory, and your Git username and email are set correctly. This command also prints the current amount of projects in your workspace.
```
mcdev healthcheck
```

### Delete
Delete all Microclimate images on your machine.
```
mcdev delete
```
