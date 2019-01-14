---
layout: docs
title: "Connection commands: Tools for VS Code"
description: "Connection commands: Tools for VS Code"
keywords: tools, vscode, visual, studio, code, commands, connection
duration: 1 minute
permalink: mdt-vsc-commands-connection
type: document
order: 5
parent: mdt-vsc-commands-overview
---

# Connection Commands: Microclimate Developer Tools for VS Code

## See also:
- [Commands overview](mdt-vsc-commands-overview)
- [Project commands](mdt-vsc-commands-project)
- [Restart and debug](mdt-vsc-commands-restart-and-debug)

***

Right-click the background of the Microclimate view to access the new connection commands. Right-click an existing connection to access the other connection commands. All commands are available in the Command Palette.

The tools support only local instances of Microclimate, so only one connection at a time is necessary.

## Commands

### **New default local Microclimate connection**
Connect to a local Microclimate instance at the default location of `localhost:9090`. The default connection should be all you need, but if you changed your Microclimate port, see **New Microclimate connection**.

### **New Microclimate connection**
Prompt for the connection port and connect to Microclimate at `localhost:<port>`.

### **Open folder as workspace**
Open the `microclimate-workspace` as the VS Code workspace folder. If you want the folder to open in a new window, set `window.openFoldersInNewWindow` to `true`.

### **Open in browser**
Open the Microclimate home page in the system browser.

### **Open create project page**
Open the Microclimate **New project** page in the system browser.

### **Open import project page**
Open the Microclimate **Import project** page in the system browser.

### **Refresh connection**
Run this command if anything in the tools appears to be out of sync with Microclimate.

### **Remove connection**
Remove a connection. If you don't have any connections, only a few of the extension features are available.

***

[Next: Project commands](mdt-vsc-commands-project)

[Back to the commands overview](mdt-vsc-commands-overview)

[Back to the VS Code tools overview](mdt-vsc-overview)

[Troubleshooting](mdt-vsc-troubleshooting)
