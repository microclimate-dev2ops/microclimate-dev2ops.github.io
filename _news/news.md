---
layout: news
title: News
description: Latest news
keywords: GA, release, version, history
duration: 20 seconds
permalink: news
order: 11
linkname: December 2018
---

## December updates
## Microclimate 18.12

*Friday 14 December 2018*

#### The following list shows updates for the Microclimate 18.12 release:
- [Microclimate Developer Tools for Eclipse](mdteclipseoverview) and the new [Microclimate Developer Tools for Visual Studio Code](mdt-vsc-overview) are now open source. For more information about these plug-ins, see [the features list](#the-following-list-shows-new-features-for-microclimate-developer-tools-for-eclipse-and-the-new-microclimate-developer-tools-for-visual-studio-code).

- Support for Linux® on Power® PC (ppc64le) with the following limitations:
   - Java Microprofile projects that are created by using generators currently have a known limitation. A resolution is in progress.
   - Swift language support currently is not available on the Power PC platform.

- Improved installation in IBM Cloud Private. The installation process now auto-detects when required parameters for installing into IBM Cloud Private are missing and highlights these to you.

- New `Cancel load` facility when viewing application metrics, enabling you to stop loading application metrics for a selected project. For more information, see [Performance testing your project](performancetesting).

- Improved GitHub integration, enabling you to more easily commit your project to a GitHub repository.

- Removed the Node.js template to improve your experience when creating Node.js projects.

- For clarity, the `mcdev update` command has been renamed to `mcdev refresh`, for more information, see [Entering Microclimate CLI commands](clicommands) and [Updating Microclimate](updating).

#### The following list shows new features for Microclimate Developer Tools for Eclipse and the new Microclimate Developer Tools for Visual Studio Code:
- View all projects in Microclimate, including application and build statuses.

- Debug Microprofile and Spring Microclimate projects.
  - The VS Code tools also support Node.js debug.

- View application and build logs in the VS Code **Output** view or the Eclipse **Console** view.

- View project information, similar to the Microclimate **Overview** page.

- Integrate Microclimate validation errors into the VS Code **Problems** view or the Eclipse **Markers** view.

- Open a shell session into a Microclimate application container.

- Toggle project auto build and manually initiate project builds.

- Disable and enable projects.
