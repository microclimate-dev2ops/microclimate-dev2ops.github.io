---
layout: document
title: How to set up your own IDE for use with Microclimate
description: How-to set up your own IDE for use with Microclimate
duration: 1 minute
permalink: ide
type: document
---

## Using Eclipse

1. Download and unzip [Oxygen.1a JEE package](https://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/oxygen1a)
2. Select ``File->Import...->General->Projects from Folder or Archive``
3. Select the root of the project directory as the Import source, e.g. for a project named ``myjavamicroservices1``, select the directory ``microclimate-workspace/myjavamicroservices1`` and click ``Finish``.
4. You can now edit the application, e.g. ``src/main/java/application/rest/v1/HealthEndpoint.java``, save the changes. The changes will be picked up by the server after the build in microclimate has been completed. You can reload the browser to see the result.

## Using Visual Studio Code

1. Download and install [Visual Studio Code](https://code.visualstudio.com/download)
2. Install the following extensions from the Visual Studio Marketplace using the Extensions page:
   * Java Extension Pack
3. Select ``File->Add Folder to Workspace...``
4. Select the root of the project directory, e.g. for a project named ``myjavamicroservices1``, select the directory ``microclimate-workspace/myjavamicroservices1`` and click ``Add``.
5. You can now edit the application, e.g. ``src/main/java/application/rest/v1/HealthEndpoint.java``, save the changes. The changes will be picked up by the server after the build in microclimate has been completed. You can reload the browser to see the result.

## Intellj IDEA

1. Download and install [Intellj IDEA](https://www.jetbrains.com/idea/download/)
2. Enable ``Maven Integration`` plugin if not already enabled under the Plugins section in the Preferences.
3. Select ``File->Open...``
4. Select the root of the project directory, e.g. for a project named ``myjavamicroservices1``, select the directory ``microclimate-workspace/myjavamicroservices1`` and click ``Open``.
5. You can now edit the application, e.g. ``src/main/java/application/rest/v1/HealthEndpoint.java``. If a java file has been opened and there is a message on Module SDK is not defined, click the link ``Setup SDK`` to configure the SDK.
6. After modifying a file, save the changes. The changes will be picked up by the server after the build in microclimate has been completed. You can reload the browser to see the result.


## General text editors

Microclimate also can pick up application changes using most of the general text editors.
1. Edit the source files under the root of the created project directory.
2. Save the file. The changes will be picked up by the server after the build in microclimate has been completed. You can reload the browser to see the result.

