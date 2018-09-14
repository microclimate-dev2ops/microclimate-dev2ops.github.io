---
layout: docs
title: Setting up your own IDE to use with Microclimate
description: Setting up your own IDE to use with Microclimate
keywords: eclipse, application, edit, ide, vsc, visual studio code, intellij, text editor, editor
duration: 1 minute
permalink: settingownide
type: document
order: 2
parent: installlocally
---

Microclimate includes the powerful Theia IDE in the box, with extended capabilities including some [language servers](http://langserver.org) in the image, including our very own [XML Language Support](https://marketplace.visualstudio.com/items?itemName=IBM.XMLLanguageSupport).

If you do not want to use Theia, you can choose your own IDE including Eclipse, Visual Studio Code, Orion, or Atom IDE. To Microclimate, using your own IDE is just the same as using Theia - File Watcher continues to monitor your files for changes.
**Note:** These options are applicable to a local installation of Microclimate only.

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
5. You can now edit the application, for example,  ``src/main/java/application/rest/v1/HealthEndpoint.java``. If a Java file is open and there is a message saying 'Module SDK is not defined', click the link ``Setup SDK`` to configure the SDK.
6. After you modify a file, save your changes. Microclimate auto-detects your changes and rebuilds and redeploys the updated app. Refresh your browser to see the results.

## General text editors

Microclimate can also pick up application changes by using most of the general text editors.
1. Edit the source files under the root of the created project directory.
2. Save your changes. Microclimate auto-detects your changes and rebuilds and redeploys the updated app. Refresh your browser to see the results.
