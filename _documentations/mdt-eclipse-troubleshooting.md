---
layout: docs
title: Troubleshooting Microclimate Developer Tools
description: How to troubleshoot Microclimate Developer Tools
keywords: troubleshooting, issues, workaround, common problems, help, tools, eclipse
duration: 1 minute
permalink: mdteclipsetroubleshooting
type: document
order: 60
parent: mdteclipseoverview
---

# Troubleshooting Microclimate Developer Tools

When troubleshooting, check the project in Microclimate to make sure the status is what you expect.  If not, refer to [Microclimate troubleshooting](troubleshooting).  For Microclimate Developer Tools specific problem solving tips, see the following information.

* [Check the logs](#check-the-logs)
* [Solving common problems](#solving-common-problems)

---
## Check the logs
The logs are found in your Eclipse workspace under .metadata/.log.

---
# Solving common problems
The following list describes common problems that might affect Microclimate Developer Tools.

- [Test connection fails](#test-connection-fails)
- [Open application fails](#open-application-fails)
- [Debugger fails to connect](#debugger-fails-to-connect)
- [Application stuck in Starting state](#application-stuck-in-starting-state)
- [Application does not rebuild after making a change](#application-does-not-rebuild-after-making-a-change)
- [Connection is not showing the correct project list](#connection-is-not-showing-the-correct-project-list)
- [Application is not showing the correct status](#application-is-not-showing-the-correct-status)

## Test connection fails
If the test connection fails when you are creating a new Microclimate connection, check that Microclimate is up and running.  If it is not, see [Microclimate troubleshooting](troubleshooting).

## Open application fails
If the application fails to load in the browser check the following:
1. Check that the application is running and you can open the application successfully in Microclimate.  For more information see [Using the project view](projectview).  If you cannot open the application in Microclimate, see [Microclimate troubleshooting](troubleshooting).
2. The default browser in Eclipse might not be able to handle the content of your application.  Try using a different browser by clicking on **Window** > **Web Browser**.  Select a browser from the list and try to open the application again.

## Debugger fails to connect
If the debugger fails to connect, you might need to increase the connection timeout:
1. Open the Eclipse preferences and select **Microclimate**.
2. Increase the debug connection timeout value and click **Apply and Close**.

## Application stuck in Starting state
The application might be waiting for the debugger to connect. You can resolve this by right-clicking on the project in the **Microclimate Explorer** view and selecting **Attach Debugger**.  If the problem occurred because the debugger failed to connect when restarting in debug mode, make sure to increase the debug connection timeout in the Microclimate preferences before trying to debug again. For more information see [Debugger fails to connect](#debugger-fails-to-connect).

If the debugger is connected but stopped on a ClassNotFoundException, click on the run button to get past the exception. You might need to click run several times as the exception occurs more than once. To avoid stopping on the exception in the future, open the Eclipse preferences and navigate to **Java** > **Debug**. Uncheck **Suspend execution on uncaught exceptions** and click **Apply and Close**.

If the application is not waiting for the debugger to connect, try restarting the application again. If this does not work, use the Microclimate UI to disable the application and then re-enable it.

## Application does not rebuild after making a change
To start a build manually, right click on the Microclimate server in the **Servers** view and select **Start Build**.  For more information see [Building Microclimate projects](mdteclipsebuildproject).

## Connection is not showing the correct project list
Try refreshing the connection by right-clicking on it in the **Microclimate Explorer** view and selecting **Refresh**. If this does not solve the problem, there could be an issue with Microclimate itself, see [Microclimate troubleshooting](troubleshooting).

## Application is not showing the correct status
Try refreshing the application by right-clicking on it in the **Microclimate Explorer** view and selecting **Refresh**. If this does not solve the problem, there could be an issue with Microclimate itself, see [Microclimate troubleshooting](troubleshooting).

[Next: Uninistalling Microclimate Developer Tools](mdteclipseuninstall)

[Back to Microclimate Developer Tools overview](mdteclipseoverview)
