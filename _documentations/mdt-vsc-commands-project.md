---
layout: docs
title: "Project commands: Tools for VS Code"
description: "Project commands: Tools for VS Code"
keywords: tools, vscode, visual, studio, code, commands, project
duration: 1 minute
permalink: mdt-vsc-commands-project
type: document
order: 5
parent: mdt-vsc-commands-overview
---

# Project commands: Microclimate Developer Tools for VS Code

## See also:
- [Commands overview](mdt-vsc-commands-overview)
- [Connection commands](mdt-vsc-commands-connection)
- [Restart and debug](mdt-vsc-commands-restart-and-debug)

***

Right-click a project in the Microclimate view to see most project commands. All commands are available in the Command Palette.

## Commands

### **Open in browser**
Open the project application root endpoint in the system browser. The project must be in the `Running` or `Debugging` state, or the application server won't be available.<br>
This command is equivalent to the **Open app** page in Microclimate.

### **Open application monitor**
Open the Microclimate **App Monitor** page for this project in the system browser.

### **Open folder as workspace**
Open the project as your VS Code workspace folder. This command is useful if you want to work on just one project at a time per window.<br>
If you want the folder to open in a new window, set `window.openFoldersInNewWindow` to `true`.

### **Show project overview**
Open an editor tab that displays all of the Microclimate information for the project. This is similar to the Microclimate **Overview** page. From this page, you can build, disable, or delete the project, and you can change the project auto build setting.<br>
This page is the only place in the extension where you can delete a project. If you delete a project, you remove it from both Microclimate and from your file system.

### **Build**
Manually request an application build for this project. If the project has auto build enabled, this command should not be necessary because builds are triggered automatically with a code change. This command is also available in the project info page.<br>
This command is equivalent to clicking the **Build** button in the Microclimate **Overview** page.

### **Toggle auto build**
Enable or disable auto build for the project. This command is also available in the project info page.<br>
This command is equivalent to clicking the **Auto Build** toggle in the Microclimate **Overview** page.

### **Validate**
Validate that this project is a valid Microclimate project. Any errors appear in the VS Code **Problems** view. Validation is run automatically as part of a build, whether auto build is enabled or not.<br>
The Validate command is shown in the context menu only for projects that have auto build disabled.

### **Open container shell**
Open a shell, either `bash` or `sh`, in the project application container with `docker exec`. The project must have a container running. The VS Code integrated terminal needs access to your `PATH` environment variable so that it can run `docker`.

### **Enable or disable project**
Enable or disable the project. This command is also available in the project info page.<br>
This command is equivalent to clicking the **Enable/Disable project** button in the Microclimate **Overview** page.

## Logs

### **Show application log**
Open a channel in the **Output** view that contains the project application logs. The application logs are updated every 20 seconds.<br>
To remove the output channel, use the **Hide logs** command.<br>
The output is equivalent to the **App logs** page in Microclimate.

### **Show build log**
Open a channel in the **Output** view that contains the project build logs. The build logs are updated every 5 seconds.<br>
To remove the output channel, use the **Hide logs** command.<br>
The output is equivalent to the **Build logs** page in Microclimate.

### **Hide logs**
This command presents a list of Microclimate project logs that are currently open in the **Output** view. Select the logs you want to hide from that view.

### **Show logs when they change**
If you want VS Code to bring your logs to the front when they have new output, you can set the following options:
- Set `microclimate.openLogsOnChange.app` for application logs. This option is disabled by default.
- Set `microclimate.openLogsOnChange.build` for build logs. This option is enabled by default.

***

[Next: Restart and debug](mdt-vsc-commands-restart-and-debug)

[Back to the commands overview](mdt-vsc-commands-overview)

[Back to the VS Code tools overview](mdt-vsc-overview)

[Troubleshooting](mdt-vsc-troubleshooting)
