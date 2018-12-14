---
layout: docs
title: Debugging Microclimate Projects
description: How to debug a Microclimate project
keywords: restart, run, debug, attach, tools, eclipse
duration: 1 minute
permalink: mdteclipsedebugproject
type: document
order: 50
parent: mdteclipseoverview
---

## Debugging Microclimate projects

Microclimate Developer Tools for Eclipse supports debugging Microprofile/JEE and Spring projects.

### Prerequisites
1. If you have not done so already, import your project into Eclipse to make the source available to debug.
- Right-click your project in the **Microclimate Explorer** view.
- Select **Import Project**.
2. If you need to debug any initialization code, set breakpoints in this code now. You can also set breakpoints in your application code at this time.

### Debugging
1. To restart your application in debug mode, right-click on the project in the **Miroclimate Explorer** view and select **Restart in Debug Mode**. This menu item is only available for Microclimate/Java EE and Spring applications.
2. If you did not import your project into Eclipse you are prompted to do so now. Select one of the following:
- **Yes**: To import your project into Eclipse and make the source available for debugging.
- **No**: To continue restarting in debug mode without importing your project. There might be no source available for debugging if you choose this option.
- **Cancel**: To cancel restarting your application in debug mode.
3. Wait for the project state to change to **Debugging** or for the debugger to stop at a breakpoint if you are debugging initialization code. If you have hit a breakpoint in initialization code, skip to step 6.
4. If you have not done so already, set up any breakpoints that you need in your application.
5. Reload your application in the browser or, if you have not already opened it, right-click on the project in the **Microclimate Explorer** view and select **Open Application**.
6. Eclipse prompts you to switch to the **Debug** perspective when a breakpoint is hit or you can switch manually by clicking **Window** > **Perspective** > **Open Perspective** > **Debug**. All of the Java debug capabilities provided by Eclipse including various breakpoint types, the **Variables** and **Expression** views, and hot code replace are available to you.
7. You can reload your application multiple times to isolate the problem. However, if you are debugging initialization code, you must restart your project in debug mode to stop in this code again.
8. When you have finished debugging, you can switch back to run mode. Right-click on your project in the **Miroclimate Explorer** view and select **Restart in Run Mode**.

### Attaching to a project in debug mode

If you restarted your application in debug mode from the Microclimate UI, or you detached from the debugger, or you restarted Eclipse, you can attach the debugger without restarting again: 

1. Make sure to do any of the setup you need such as importing your project into Eclipse and setting breakpoints. For more information, see [Prerequisites](#prerequisites).
2. Right click on your project in the **Microclimate Explorer** view and select **Attach Debugger**. The **Attach Debugger** menu item is only available for Microclimate/Java EE or Spring applications in debug mode if a debugger is not already attached.

[Next: Troubleshooting Microclimate Developer Tools](mdteclipsetroubleshooting)

[Back to Microclimate Developer Tools overview](mdteclipseoverview)
