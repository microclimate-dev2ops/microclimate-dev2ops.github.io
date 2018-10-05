---
layout: docs
title: IntelliJ IDEA
description: Setting up your own IDE - IntelliJ IDEA
keywords: eclipse, application, edit, ide, vsc, visual studio code, intellij, text editor, editor
duration: 1 minute
permalink: settingownideintellij
type: document
order: 140
parent: settingownide
---

## IntelliJ IDEA

1. Download and install [IntelliJ IDEA](https://www.jetbrains.com/idea/download/).
2. Enable the ``Maven Integration`` plugin if not already enabled under the Plugins section in the Preferences.
3. Select ``File->Open...``.
4. Select the root of the project directory, for example, for a project named ``myjavamicroservices1``, select the directory ``microclimate-workspace/myjavamicroservices1`` and then click ``Open``.
5. You can now edit the application, for example,  ``src/main/java/application/rest/v1/HealthEndpoint.java``. If a Java file is open and there is a message saying 'Module SDK is not defined', click the link ``Setup SDK`` to configure the SDK.
6. After you modify a file, save your changes. Microclimate auto-detects your changes and rebuilds and redeploys the updated app. Refresh your browser to see the results.
