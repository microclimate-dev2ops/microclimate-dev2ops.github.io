---
layout: document
title: Setting up your own IDE to use with Microclimate
description: Setting up your own IDE to use with Microclimate
keywords: eclipse. application, edit, ide, vsc, visual studio code, intellj, text editor, editor
duration: 1 minute
permalink: howToIDE
type: document
category: How-tos and Guides
parent: Installing Microclimate locally
---

## Using Eclipse

1. Download and unzip [Oxygen.1a JEE package](http://www.eclipse.org/downloads/packages/release/Oxygen/1A).
2. Select ``File->Import...->General->Projects from Folder or Archive``.
3. Select the root of the project directory as the Import source, for example, for a project named ``myjavamicroservices1``, select the directory ``microclimate-workspace/myjavamicroservices1`` and then click ``Finish``.
4. You can now edit the application, for example, ``src/main/java/application/rest/v1/HealthEndpoint.java``. When you have finished editing, save your changes. Microclimate auto-detects your changes and rebuilds and redeploys the updated app. Refresh your browser to see the results.

## Using Visual Studio Code

1. Download and install [Visual Studio Code](https://code.visualstudio.com/download).
2. Install the following extensions from the Visual Studio Marketplace by using the Extensions page:
   * Java Extension Pack
3. Select ``File->Add Folder to Workspace...``.
4. Select the root of the project directory, for example, for a project named ``myjavamicroservices1``, select the directory ``microclimate-workspace/myjavamicroservices1`` and then click ``Add``.
5. You can now edit the application, for example,  ``src/main/java/application/rest/v1/HealthEndpoint.java``. When you have finished editing, save your changes. Microclimate auto-detects your changes and rebuilds and redeploys the updated app. Refresh your browser to see the results.

## IntelliJ IDEA

1. Download and install [IntelliJ IDEA](https://www.jetbrains.com/idea/download/).
2. Enable the ``Maven Integration`` plugin if not already enabled under the Plugins section in the Preferences.
3. Select ``File->Open...``.
4. Select the root of the project directory, for example, for a project named ``myjavamicroservices1``, select the directory ``microclimate-workspace/myjavamicroservices1`` and then click ``Open``.
5. You can now edit the application, for example,  ``src/main/java/application/rest/v1/HealthEndpoint.java``. If a java file is open and there is a message saying 'Module SDK is not defined', click the link ``Setup SDK`` to configure the SDK.
6. After you modify a file, save your changes. Microclimate auto-detects your changes and rebuilds and redeploys the updated app. Refresh your browser to see the results.


## General text editors

Microclimate can also pick up application changes by using most of the general text editors.
1. Edit the source files under the root of the created project directory.
2. Save your changes. Microclimate auto-detects your changes and rebuilds and redeploys the updated app. Refresh your browser to see the results.
