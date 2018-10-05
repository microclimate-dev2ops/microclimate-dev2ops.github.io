---
layout: docs
title: Eclipse
description: Setting up your own IDE - Eclipse
keywords: eclipse, application, edit, ide, vsc, visual studio code, intellij, text editor, editor
duration: 1 minute
permalink: settingownideeclipse
type: document
order: 110
parent: settingownide
---

## Eclipse

If you want a better development experience for Microprofile/Java EE projects, including debug support, check out [Microclimate Developer Tools for Eclipse](mdteclipseoverview).

1. Download and unzip [Oxygen.1a JEE package](http://www.eclipse.org/downloads/packages/release/Oxygen/1A).
2. Select ``File->Import...->General->Projects from Folder or Archive``.
3. Select the root of the project directory as the Import source, for example, for a project named ``myjavamicroservices1``, select the directory ``microclimate-workspace/myjavamicroservices1`` and then click ``Finish``.
4. You can now edit the application, for example, ``src/main/java/application/rest/v1/HealthEndpoint.java``. When you have finished editing, save your changes. Microclimate auto-detects your changes and rebuilds and redeploys the updated app. Refresh your browser to see the results.
