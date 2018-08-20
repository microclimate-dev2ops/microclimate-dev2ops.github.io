---
layout: document
title: Managing projects
description: Managing projects
keywords: project, view, list, using, coding, run, apply, import, create, edit, log, monitor
duration: 1 minute
permalink: managingprojects
type: document
---

## Project list

After you create or import a project into Microclimate, you can view, administer, and modify it. In your Microclimate workspace, click the **Projects** tab to view the list of all of your projects and their statuses.

To view details about a project, click the project name. You can also click the shortcut menu alongside a project name for the same options. To delete a project, click the `Delete project` option on the shortcut menu.

## Project view

The project view page has three parts:
* [Page header](#page-header)
* [Menu](#menu)
* [Main workspace](#main-workspace)

### Page header

The page header contains the following information:
* Project name
* Project status
* Build status
* A `Build` button to manually rebuild your projects

### Project view menu

At the side of the page is a menu:

![Image of menu](./images/projectmenu.png)

From this menu, you have six options:

1. Overview. Provides you with project information including language, location of you project, status, and whether the project is set to automatically build on modification.

2. Edit code. After creating your project, Microclimate has already built your project and started it. Use the Theia editor to modify your code, and to redeploy it.

3. Open app. Supply the context root, and then open your application.

4. App logs. Log files for your application.

5. App monitor. Use to monitor your application.

6. Pipeline. Use a pipeline to automatically detect changes in your application, and to rebuild and redeploy it. For more information, see [Using a pipeline](./usingapipeline).

### Project view main workspace

The main workspace provides a summary of your project including language, location, and status.

By default, your project automatically builds when you save your project files. Use the `Auto build` switch located on this page to control automatic building of your project.

Use the `Disable project` button to disable project development. For more information, see [Disabling development on specific projects](./disabledevelopmentonprojects).
