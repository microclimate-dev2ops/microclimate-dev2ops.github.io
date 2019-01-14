---
layout: docs
title: Debugging Microclimate projects from your IDE
description: Debugging Microclimate projects from your IDE
keywords: debug, using, working with, your, own, ide, eclipse, application, project, vsc, visual studio code, vscode, intellij
duration: 1 minute
permalink: debuggingprojects
type: document
order: 150
parent: settingownide
---

# Debugging Microclimate projects from your IDE

With a local installation of Microclimate, you can restart your project in debug mode and then use your own IDE to start debugging.

Microprofile/Java EE, Spring, and Node.js projects can be restarted in debug mode. Visual Studio Code (VS Code) with the Microclimate tools extension installed supports debugging all three project types. The Eclipse plug-in supports debugging Microprofile/Java EE and Spring projects.

- You can debug with one of the Microclimate provided plug-ins for Eclipse or VS Code. Plug-ins make debugging easier. Without them, you have to create the debug configuration yourself, update the debug port each time it changes, and manually request when to attach the debugger. With either of these plug-ins, you can restart your project in debug mode within the IDE, and the debugger attaches automatically.
- If you don't want to use the plug-ins, go to the **Overview** page for your project, switch **Debug Mode** to **On**, and wait for your project to restart. After the project restarts, retrieve the **Debug Port** from the **Overview** page and then refer to the documentation for your IDE on how to attach the debugger. 

See the following pages for more information:
- Microclimate Developer Tools for Eclipse
  - [Overview](mdteclipseoverview)
  - [Debugging Microclimate projects](mdteclipsedebugproject)
- Microclimate Developer Tools for VS Code
  - [Overview](mdt-vsc-overview)
  - [Debugging Microclimate projects](mdt-vsc-commands-restart-and-debug)
