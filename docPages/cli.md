---
layout: document
title: Microclimate CLI
description: Microclimate CLI
duration: 1 minute
permalink: cli
---

Installing the Microclimate CLI allows you to run Microclimate from anywhere on your computer. Your Microclimate projects will be created in your home directory. Normally ``$HOME/microclimate-workspace``.

## Setup

Run the install script found in the cli directory (``microclimate/cli``). You can either run this as sudo or as a non-root user. 
  
  **Effects**:
  
  ``sudo ./install.sh``: Installs mcdev to your ``/usr/local/bin`` directory, automatically adding it to the path.
    
  ``./install.sh``: Installs mcdev to ``~/mcdev``. You can either run Microclimate using ``~/mcdev`` start or add mcdev to your path manually (Instructions given at the end of the install script).
  
  ```sh
  cd cli &&
  ./install.sh &&
  cd ..
  ```

NOTE: You won't be able to run ``mcdev`` commands from inside the cli directory due to the file name conflict. To run commands change to another directory.

## Usage

```sh
mcdev COMMAND [options]
```

Commands:

1. [start](#start)
2. [stop](#stop)
3. [open](#open)
4. [update](#update)
5. [healthcheck](#health-check)

Run ``mcdev COMMAND --help`` for more information on a command.

### Start

Start Microclimate

```sh
mcdev start [OPTIONS]
```

**Options**

```sh
1. -o, --open: Open Microclimate in your default browser after it has started.
2. -u, --update: Update Microclimate to its latest version before starting.
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

**Note**: This will look for the port that 'microclimate-portal' is on and open it.

### Update

Update Microclimate by pulling the newest images down from the repository.

```sh
mcdev update
```

### Health check

Run a check through your system to ensure that microclimate-workspace, the config directory and your git username and email are set up correctly. Also prints the current amount of projects in your workspace.

```sh
mcdev healthcheck
```
