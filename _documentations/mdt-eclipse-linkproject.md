---
layout: docs
title: Linking to a Microclimate project
description: How to link an Eclipse project to a Microclimate project
keywords: link, connect, tools, eclipse
duration: 1 minute
permalink: mdteclipselinkproject
type: document
order: 20
parent: mdteclipseoverview
---

## Linking an Eclipse project to a Microclimate project

Linking a project in Eclipse to a Microclimate project enables you to develop your project from within Eclipse.  Only Microprofile/Java EE projects can be linked.

1. In Microclimate, make sure your project is created and *Running*.
2. Import your Microclimate project into eclipse as an existing Maven project:
    - From the **File** menu click **Import** > **Maven** > **Existing Maven Projects** and then click **Next**
    - For **Root Directory** enter your Microclimate workspace location and click **Enter**
    - Select the Microprofile/Java EE project or projects that you want to import and click **Finish**
3. Link your imported project to its corresponding Microclimate project:
    - Right-click on the imported project in the **Explorer** view and select **Microclimate** > **Link to Microclimate Project**
    - If the **Create a Microclimate Connection** page is opened (it is not opened if a connection already exists):
        - Fill in the Microclimate **Hostname** (localhost only is supported) and **Port** (usually 9090)
        - Click **Test Connection** and then click **Next**
    - On the **Link** page, the Microclimate project that matches your Eclipse project should already be selected so click **Finish**
    - A Microclimate server is created in the **Servers** view for your project.  This is your link between Eclipse and Microclimate.  The server shows the application status and the build status if a build is in progress.

[Next: Running a Microclimate project](mdteclipserunproject)

[Back to Microclimate Developer Tools overview](mdteclipseoverview)
