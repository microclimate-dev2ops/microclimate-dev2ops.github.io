---
layout: docs
title: Customizing projects with project settings
description: Documents
keywords: project, projects, settings, internalAppPort, internalDebugPort, contextRoot, healthCheck, watchedFiles.includeFiles, watchedFiles.excludeFiles, mavenProfiles, mavenProperties
duration: 1 minute
permalink: projectsettings
type: document
parent: checkingstatuses
order: 0
---

# Customizing projects with project settings

You can customize projects with Microclimate 19.05. The project settings options that are available are based on the type of project. Customize projects either through the Microclimate UI, the Visual Studio Code Microclimate extension, the Eclipse Microclimate plug-in, or through the `.mc-settings` project settings file that is located in the application project directory.

Use the following options to customize your projects from the `.mc-settings` file:

**internalAppPort**: Customize the internal application port of the project. To switch to a new internal application port, ensure that the new port is exposed either from the Dockerfile or through the project Helm charts.

**internalDebugPort**: Customize the internal debug port of the project. If the project is in debug mode, this option restarts the project with the new internal debug port. This option is available only for projects with debug capabilities.

**contextRoot**: Customize the context root of the project application.

**healthCheck**: Add a custom project endpoint for the project health check. Microclimate uses this setting to determine the application status of the project. The `healthCheck` setting takes priority over the `contextRoot` setting for pinging the project to get the application status.

**watchedFiles.includeFiles**: Customize the list of files for Microclimate to watch. The list of files is passed to the Microclimate `inotifywait` tool.

**watchedFiles.excludeFiles**: Customize the list of files for Microclimate to ignore. The list of files is passed to the Microclimate `inotifywait` tool.

**mavenProfiles**: Customize the list of Maven profiles available for a Maven build. This option is available only for Maven projects.

**mavenProperties**: Customize the list of Maven Environment and Properties variables available for a Maven build. The properties appear in the form `“key=value”`. This option is available only for Maven projects.
