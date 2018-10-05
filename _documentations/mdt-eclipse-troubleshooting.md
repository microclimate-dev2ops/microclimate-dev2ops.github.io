---
layout: docs
title: Troubleshooting Microclimate Developer Tools
description: How to troubleshoot Microclimate Developer Tools
keywords: troubleshooting, issues, workaround, common problems, help, tools, eclipse
duration: 1 minute
permalink: mdteclipsetroubleshooting
type: document
order: 80
parent: mdteclipseoverview
---

## Troubleshooting Microclimate Developer Tools

When troubleshooting, check the project in Microclimate to make sure the status is what you expect.  If not, refer to [Microclimate troubleshooting](troubleshooting).  For Microclimate Developer Tools specific problem solving tips, see the following information.

* [Check the logs](#check-the-logs)
* [Solving common problems](#solving-common-problems)

## Check the logs
The logs are found in your Eclipse workspace under .metadata/.log.

## Solving common problems
The following list describes common problems that might affect Microclimate Developer Tools.

- [Test connection fails](#test-connection-fails)
- [Project link fails because project not running](#project-link-fails-because-project-not-running)
- [Project link fails because wrong project location](#project-link-fails-because-wrong-project-location)
- [Open application fails](#open-application-fails)
- [Debugger fails to connect](#debugger-fails-to-connect)
- [Application stuck in Starting state](#application-stuck-in-starting-state)
- [Application does not rebuild after making a change](#application-does-not-rebuild-after-making-a-change)

### Test connection fails
If the test connection fails when you create a new Microclimate connection, check that Microclimate is up and running.  If it is not, see [Microclimate troubleshooting](troubleshooting).

### Project link fails because project not running
If the project does not link because the Microclimate project is not running, try the following:
1. Wait for the Microclimate project to be in **Running** state.  If the project does not go to **Running** state, see [Microclimate troubleshooting](troubleshooting).
2. When the project is **Running** in Microclimate, click the **Refresh** button on the **Link** wizard page to refresh the project details.
3. Create the link by clicking **Finish**.

### Project link fails because wrong project location
If the project does not link because there is no Microclimate project matching the Eclipse location, check that the Eclipse project is located in your Microclimate workspace:
1. The error message in the wizard shows the Eclipse project location.  Check that it is in your Microclimate workspace.
2. If the project is not in your Microclimate workspace, delete the project from Eclipse without deleting the contents, and try to import it again.

### Open application fails
If the application fails to load in the browser check the following:
1. Check that the application is running and you can open the application successfully in Microclimate.  For more information see [Using the project view](projectview).  If you cannot open the application in Microclimate, see [Microclimate troubleshooting](troubleshooting).
2. The default browser in Eclipse might not be able to handle the content of your application.  Try using a different browser by clicking on **Window** > **Web Browser**.  Select a browser from the list and try to open the application again.

### Debugger fails to connect
If the debugger fails to connect, you might need to increase the connection timeout:
1. Open the Eclipse preferences and select **Microclimate**.
2. Increase the debug connection timeout value and click **Apply and Close**.

### Application stuck in Starting state
The application might be waiting for the debugger to connect.  You can resolve this by disabling and then re-enabling the project in Microclimate.  If the problem occurred because the debugger failed to connect, make sure to increase the debug connection timeout in the Microclimate preferences before trying to debug again.  For more information see [Debugger fails to connect](#debugger-fails-to-connect).

### Application does not rebuild after making a change
To start a build manually, right click on the Microclimate server in the **Servers** view and select **Start Build**.  For more information see [Build a Microclimate Project](mdteclipsebuildproject).

[Back to Microclimate Developer Tools overview](mdteclipseoverview)
