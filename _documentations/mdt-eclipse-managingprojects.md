---
layout: docs
title: Managing Microclimate Projects
description: How to work with your Microclimate projects in Eclipse
keywords: run, open, import, show, restart, edit, build, logs, tools, eclipse, Microclimate Explorer view in Eclipse, project actions, attach, build, disable, enable, validate, refresh
duration: 1 minute
permalink: mdteclipsemanagingprojects
type: document
order: 30
parent: mdteclipseoverview
---

# Managing Microclimate projects

You can work with your Microclimate projects from the **Microclimate Explorer** view in Eclipse. If the view is not showing, open it as follows:

- From the **Window** menu select **Show View** > **Other**.
- Start typing **Microclimate** in the filter field or locate and expand the **Microclimate** entry in the list.
- Select **Microclimate Explorer** and click **Open**.

If the view is empty, you need to create a new Microclimate connection: [Managing Microclimate connections](mdteclipsemanagingconnections).

When you have a connection, you can expand it in the view to see your projects. Each project shows the application status and the build status. A context menu on each project enables you to open your application in a browser, view application and build logs, restart in debug mode, and much more. The first thing you might want to do is import your project into the Eclipse workspace so you can start editing files. This also makes your source available for debugging. If there are no projects showing for your connection, create new projects or import existing projects into Microclimate using the Microclimate UI. The tools do not support project creation or import.

## Project actions

The following actions are available by right clicking on the project in the **Microclimate Explorer** view. Most actions are only available if the project is enabled.

Some actions open the default Eclipse browser. If you find that the default Eclipse browser cannot handle the content, change the default browser by navigating to **Window** > **Web Browser** and selecting a different browser from the list.

- **Open Application**: Opens the application in the default Eclipse browser. This action is only available when the application is running or debugging.
- **Open Project Overview**: Opens the Microclimate UI in the default Eclipse browser at the project overview page. Use this to access features and information that is not currently available in Eclipse such as enabling or disabling projects and the time of the last build.
- **Open Container Shell**: Opens a shell into your application container. This action is only available when the container is active.
- **Open Application Monitor**: Opens the application monitor in the default Eclipse browser. Use this to monitor the activity and health of your application. This action is only available when the application is running or debugging.
- **Import Project**: Imports your project into the Eclipse workspace.
- **Show Application Log**: Opens the application log in the Eclipse **Console** view. This is a toggle action, select again to remove the log from the **Console** view.
- **Show Build Log**: Opens the build log in the Eclipse **Console** view. Not all project types have a build log. This is a toggle action, select again to remove the log from the **Console** view.
- **Restart in Run Mode**: Restarts the application in run mode.
- **Restart in Debug Mode**: Restarts the application in debug mode and attaches the debugger. Only Microprofile/Java EE and Spring projects can be debugged. For more information, see [Debugging Microclimate projects](mdteclipsedebugproject).
- **Attach Debugger**: If you detached the debugger accidentally or restarted Eclipse, use this to re-attach the debugger to an application in debug mode. For more information, see [Debugging Microclimate projects](mdteclipsedebugproject).
- **Build**: Initiate a build of your project. This action is not available if a build is already running. For more information, see [Building Microclimate projects](mdteclipsebuildproject).
- **Disable Auto Build**: Use this to disable automatic builds if you are making a lot of changes and don't want builds to be triggered until you are done. This action is only available when auto build is enabled.
- **Enable Auto Build**: Use this to re-enable automatic builds whenever a change is made. This action is only available when auto build is disabled.
- **Validate**: Initiate validation. This action is only available when auto build is disabled to allow you to perform validation without running a build. Otherwise, validation is run automatically as part of a build. Any problems that are found during validation are shown in the **Markers** view in Eclipse under the **Microclimate Problems** heading. Check for quick fixes on the marker to help you resolve the problem.
- **Refresh**: If the project gets out of sync, use this option to refresh it. To refresh all projects, right click on the connection in the **Microclimate Explorer** view and select **Refresh**.


[Next: Building Microclimate projects](mdteclipsebuildproject)

[Back to Microclimate Developer Tools overview](mdteclipseoverview)
