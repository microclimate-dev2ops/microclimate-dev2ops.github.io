---
layout: docs
title: Getting started with Microclimate Developer Tools for Eclipse
description: Getting started with Microclimate Developer Tools for Eclipse
keywords: introducing, introduction, overview, what is, tools, eclipse, getting started, Microclimate Developer Tools for Eclipse, work within Eclipse
duration: 1 minute
permalink: mdteclipsegettingstarted
type: document
order: 5
parent: mdteclipseoverview
---

# Getting started with Microclimate Developer Tools for Eclipse

Microclimate Developer Tools for Eclipse enables you to develop and debug your Microclimate projects from within Eclipse (debug is only supported for Microprofile/Java EE, Spring, and Node.js projects).

The following steps give you an overview of using Microclimate Developer Tools for Eclipse. For more detailed instructions, start with [Installing Microclimate Developer Tools for Eclipse](mdteclipseinstall):

1. Install and start a local Microclimate instance. [Microclimate version 18.12 or later](https://microclimate-dev2ops.github.io/installlocally) is required.

2. Create new projects or import existing projects into Microclimate using the Microclimate UI. Microclimate Developer Tools do not support project creation or import.

3. On an installation of [Eclipse IDE for Enterprise Java Developers version 4.8 (Photon) or later](https://www.eclipse.org/downloads/packages/release/), install Microclimate Developer Tools from the [Eclipse Marketplace Microclimate Developer Tools website](https://marketplace.eclipse.org/content/microclimate-developer-tools).

4. To create a new connection, from the **File** menu select **New** > **Other** > **Microclimate** > **New Microclimate Connection**:
   ![Create a connection](./dist/images/mdt-eclipse-connection.png)

5. In the **Microclimate Explorer** view, import the project you want to work with into the Eclipse workspace:
   ![Import your Microclimate project](./dist/images/mdt-eclipse-importproject.png)

6. Work with your Microclimate project from within Eclipse including:
    - Editing
    - Debugging
    - Opening the application in a browser
    - Viewing the logs
    - Opening a shell into the application container
    - And more
    ![Work with your Microclimate project](./dist/images/mdt-eclipse-actions.png)