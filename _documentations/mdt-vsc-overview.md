---
layout: docs
title: "Microclimate Developer Tools for VS Code"
description: "Microclimate Developer Tools for VS Code"
keywords: introducing, introduction, overview, what is, tools, vscode, visual, studio, code, java, microprofile, spring, node, nodejs, node.js, javascript, Microclimate Developer Tools for VS Code, tools, view, debug, integrate, open a shell session, toggle auto build, manually build, scope VS Code workspace, disable, enable, delete
duration: 1 minute
permalink: mdt-vsc-overview
type: document
order: 2
parent: settingownide
---

# Microclimate Developer Tools for Visual Studio Code

<details>
<summary style="cursor: pointer;"><img src="dist/images/icon-video.svg" alt="Microclimate video icon" class="inline" width="40px"/> Watch the video for developing and debugging applications with Microclimate Developer Tools for VS Code.</summary>
{% include docs-video.html src="https://ibm.box.com/shared/static/tjcpshqlf5c9ts03m3n43fdv3ulatled.mp4" description="Developing and debugging applications with Microclimate Developer Tools for VS Code" %}
</details><br>

You can use [Microclimate Developer Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=IBM.microclimate-tools) to develop your Microclimate projects from within VS Code. Use the tools to access Microclimate features in the comfort of your IDE.

Write code, track application and build statuses, view project logs, and run your application, taking advantage of Microclimate features for [iterative development](https://microclimate-dev2ops.github.io/about#iterative-development). These features are supported for all Microclimate projects. In addition, the tools provide an easy workflow for debugging your Microprofile, Spring, and Node.js applications within the application Docker container.

**Note:** The tools work with only a local installation of Microclimate Version 18.12 or later. Microclimate versions that run on [IBM Cloud Private](https://microclimate-dev2ops.github.io/about#ibm-cloud-private) are not supported. However, you can push projects that you developed with the tools to a Git repository and then deploy them to IBM Cloud Private with the [Microclimate pipeline](usingapipeline).

The VS Code tools [are open source](https://github.com/microclimate-dev2ops/microclimate-vscode-tools). You can browse the code, open issues, and contribute.

## **[Features](mdt-vsc-commands-overview)**

- View all projects in Microclimate, including application and build statuses.
- Debug Microprofile, Spring, and Node.js Microclimate projects.
- View application and build logs in the VS Code **Output** view.
- View project information, similar to the Microclimate **Overview** page.
- Integrate Microclimate validation errors into the VS Code **Problems** view.
- Open a shell session into a Microclimate application container.
- Toggle project auto build and manually initiate project builds.
- Scope your VS Code workspace to a Microclimate project or to your `microclimate-workspace`.
- Disable, enable, and delete projects.