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

Installing the Microclimate CLI enables you to run Microclimate from anywhere on your computer. Your Microclimate projects are created in your home directory. Normally ``$HOME/microclimate-workspace``.

## Setup

Run the install script found in the cli directory (``microclimate/cli``). You can either run this as a sudo or a non-root user.

  **Effects**:

  ``sudo ./install.sh``: Installs mcdev to your ``/usr/local/bin`` directory, automatically adding it to the path.

  ``./install.sh``: Installs mcdev to ``~/mcdev``. You can either run Microclimate using ``~/mcdev`` start or add mcdev to your path manually. Instructions are given at the end of the install script.

  ```sh
  cd cli &&
  ./install.sh &&
  cd ..
  ```

NOTE: You cannot run ``mcdev`` commands from inside the cli directory due to the file name conflict. To run commands, change to another directory.

## Usage

```sh
mcdev COMMAND [options]
```

Commands:

1. [start](#start)
2. [stop](#stop)
3. [open](#open)
4. [update](#update)
5. [delete](#delete)

For more information about a command, run ``mcdev COMMAND --help``.

### Start

Start Microclimate. This downloads Docker images if necessary.

```sh
mcdev start [OPTIONS]
```

**Options**

```sh
1. -o, --open: Open Microclimate in your default browser after it has started.
2. -u, --update: Update Microclimate to the latest version before starting.
```

### Stop

Stop Microclimate

```sh
mcdev stop
```


### Open

Open Microclimate in your default browser.

```sh
mcdev open
```

**Note**: This looks for the port that 'microclimate-portal' is on and opens it.

### Update

Update Microclimate by pulling the newest images down from the repository. Note: Updates are to the current version only. For more information about updating Microclimate, see [Updating Microclimate](./update).

```sh
mcdev update
```

### Delete

Delete all Microclimate Docker images.  

```sh
mcdev delete
```
