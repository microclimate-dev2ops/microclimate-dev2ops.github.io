---
layout: docs
title: Debugging a Microclimate project
description: How to debug a Microclimate project
keywords: debug, tools, eclipse
duration: 1 minute
permalink: mdteclipsedebugproject
type: document
order: 50
parent: mdteclipseoverview
---

## Debugging a Microclimate project

To debug your Microclimate project in Eclipse:

1. Restart the Microclimate server in debug mode. To do this, right-click on the server in the **Servers** view and select **Restart in Debug**.
2. Wait for the server state to change to **Debugging**.
3. Set any required breakpoints.
4. Reload your application in the browser or if you have not already opened it, right-click on the server in the **Servers** view and select **Open Application**.
5. Eclipse prompts you to switch to the **Debug** perspective when a breakpoint is hit or you can switch manually by clicking **Window** > **Perspective** > **Open Perspective** > **Debug**. All of the Java debug capabilities provided by Eclipse including various breakpoint types, the **Variables** and **Expression** views, and hot code replace are available to you.
6. When you have finished debugging, you can switch back to run mode. Right-click on the Microclimate server in the **Servers** view and select **Restart**.

[Next: Building a Microclimate project](mdteclipsebuildproject)

[Back to Microclimate Developer Tools overview](mdteclipseoverview)
