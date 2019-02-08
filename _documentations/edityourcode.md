---
layout: docs
title: Editing your project
description: Edit your code
keywords: getting started, setting up, projects, update, help, Theia, test, edit, Theia editor, using own IDE, empty page, refresh, credentials, default editor, Node.js profiling support, code highlighting, JavaScript file
duration: 1 minute
permalink: edityourcode
type: document
order: 8
parent: usingmicroclimate
---

# Editing your project

Microclimate is shipped with the Theia editor by default. You can use your own editor to edit and test your code, for more information, see [Setting up your own IDE to use with Microclimate](settingownide).

To use either the default Theia editor, or your own IDE if you have configured it, follow these instructions:
1. [Create](creatingaproject) or [import](importingaproject) a project.
2. In the Microclimate header, click **Projects**, and then click the project name of the project you want to edit. The **Project** view appears. For more information, see [Using the project view](projectview).
3. Click the `Edit` button to edit your project. Your choice of editor appears.

If you're working in an IBM Cloud Private installation of Microclimate and see an empty page, the IBM Cloud Private session might have timed out. Refresh the webpage. If you are redirected to the IBM Cloud Private login page, enter your credentials again. When you log in, you can resume editing.

## Using the Theia editor
Theia is the default editor within Microclimate. For more information, see [https://www.theia-ide.org/](https://www.theia-ide.org/).

### Node.js Profiling Data Support
In Theia, you can use the Microclimate Node.js Profiling Language Server to provide code highlighting. Code highlighting displays the relative time spent in JavaScript functions based on profiling data gathered through [Microclimate load testing](performancetesting). Profiling support is only available for Node.js projects, created through Microclimate, and then profiled.

To display code highlighting:
1. Open a project created with Microclimate and profiled using the [performance testing](performancetesting) feature of Microclimate. This creates profiling data in a `load-test/<datestamp>/profiling.json` file in your Microclimate project.
2. In the **Editor** view, open a JavaScript file. The Editor highlights any lines which were found in the profiling data, and annotates them to show how often they were seen and where they were called from.

## Need help?
If you encounter problems with editing your project, check the [Troubleshooting page](troubleshooting#editing-your-project).
