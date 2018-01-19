---
layout: document
title: How to set up your own IDE for use with Microclimate
description: How-to set up your own IDE for use with Microclimate
duration: 1 minute
permalink: ide
---

## Using Eclipse

1. Download and unzip [Oxygen.1a JEE package](https://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/oxygen1a)
2. Select ``File->Import...->General->Projects`` from ``Folder`` or ``Archive``
3. Select the root of the project directory as the Import source, e.g. for a project named ``myjavamicroservices1``, select the directory ``microclimate-workspace/myjavamicroservices1`` and click ``Finish``.
4. You can now edit the application, e.g. ``src/main/java/application/rest/v1/HealthEndpoint.java``, save the changes. The changes will be picked up by the server and you can reload the browser to see the result.

## Using Visual Studio Code

1. Download and install [Visual Studio Code](https://code.visualstudio.com/download)
2. Install the following extensions from the Visual Studio Marketplace using the Extensions page:
   * Language Support for Java(TM) by Red Hat (0.2.0)  
   * Java Extension Pack (0.14.0)  
   * Debugger for Java (optional)
3. Select ``File->Add Folder to Workspace...``
4. Select the root of the project directory, e.g. for a project named ``myjavamicroservices1``, select the directory ``microclimate-workspace/myjavamicroservices1`` and click ``Add``.
5. You can now edit the application, e.g. ``src/main/java/application/rest/v1/HealthEndpoint.java``, save the changes. The changes will be picked up by the server and you can reload the browser to see the result.

## Intellj IDEA

1. Download and install [Intellj IDEA](https://www.jetbrains.com/idea/download/)
2. Enable ``Maven Integration`` plugin if not already enabled under the Plugins section in the Preferences.
3. Select ``File->Open...``
4. Select the pom.xml file at the root of the root of the project directory, e.g. for a project named ``myjavamicroservices1``, select the directory ``microclimate-workspace/myjavamicroservices1/pom.xml`` and click ``Open``.
5. When being prompted on the Open Project dialog, choose ``Open as Project``.
6. If a java file has been opened and there is a message on Project SDK is not defined, click the link ``Setup SDK`` to configure the SDK.
7. You can now edit the application, e.g. ``src/main/java/application/rest/v1/HealthEndpoint.java``, save the changes. The changes will be picked up by the server and you can reload the browser to see the result.
