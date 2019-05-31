---
layout: news
title: News
description: Latest news
keywords: GA, release, version, history
duration: 20 seconds
permalink: news
order: 9
linkname: May Release Updates
parent: May 2019
---

# May updates

## Codewind technical preview

*Friday 17 May 2019*

Welcome to a technical preview of Eclipse Codewind, an evolution of Microclimate!  For more information, see [Introducing Eclipse Codewind](codewindtechpreview).

## Microclimate

*Friday 31 May 2019*

#### The following list shows updates for the Microclimate 19.05 release:
- New multiple log files. Previously, only one build or app log would be displayed even if more than one existed. You can now view multiple log files. When a log is changed, an `Update` notice is displayed and a `*` appears beside the log. For more information, see [Using the project view](projectview).
- When creating a template, you can now add your own language in addition to the ones provided. For more information, see [Working with templates](workingwithtemplates).
- To view the application health endpoint information, hover over the build status. For more information, see [Checking the application and build statuses](checkingstatuses).
- New chart parameter `global.icpTarget` for when you are installing Microclimate into IBM Cloud Private. For more information, see [Installing in IBM Cloud Private](installonicp).
- Liberty project type label changed from `Java with Liberty` to `Java with MicroProfile`
- Port label changed from `port` to `Application port`
- Support for IBM Cloud Private 3.2

### Microclimate Developer Tools for Eclipse
- New guide for Playing Rogue Cloud using Microclimate Eclipse tools. For more information, see [Play Rogue Cloud using Microclimate Eclipse Tools](https://github.com/microclimate-dev2ops/rogue-cloud/blob/master/docs/Developing-Eclipse-on-Microclimate.md).
- Project logs update:
  - More logs are added for most project types.
  - You can now view Docker build logs for all project types.
- You can now create new Microclimate projects from within Eclipse. Right click on the connection in the **Microclimate Explorer** view and select `New Project`. Fill in a project name and select from the list of available templates. Click `Finish` and the new project is displayed in the Microclimate Explorer view. If you select the option to import the project into Eclipse, you also see the project in the **Project Explorer** view.

![Create new Microclimate projects](dist/images/news-1905/create-new-projects-eclipse.png "Create new Microclimate projects from within Eclipse")

![Create a new Microclimate project](dist/images/news-1905/create-new-microclimate-project-eclipse.png "Create a new Microclimate project")

- Full set of log files now available. Right click on your project in the **Microclimate Explorer** view and select `Show Log Files` to see the full set of log files that can be opened in the **Console** view. You can show all log files or select log files individually.

![Full set of log files](dist/images/news-1905/full-logs-eclipse.png "Full set of log files within Eclipse")

- Show **Console** view on content change. If you want to be notified of changes to a log file, open it in the **Console** view and click on the `Show on Content Change` button. The view displays any time new content is added to the log file.

![Show console view on content change](dist/images/news-1905/show-console-view-eclipse.png "Show console view on content change")

### Microclimate Developer Tools for Visual Studio Code
- New guide for Playing Rogue Cloud using Microclimate Visual Studio Code tools. For more information, see [Play Rogue Cloud using Microclimate Visual Studio Code Tools](https://github.com/microclimate-dev2ops/rogue-cloud/blob/master/docs/Developing-VisualStudioCode-on-Microclimate.md).
- You can now create new Microclimate projects from within VS Code.
- Project logs update:
  - More logs are added for most project types.
  - You can now view Docker build logs for all project types.
- You can now edit the internal application port, internal debug port, and application endpoint project settings in the **Project Overview** page.
