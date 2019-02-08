---
layout: docs
title: "Getting started: Tools for VS Code"
description: "Getting started: Tools for VS Code"
keywords: introducing, introduction, overview, tools, get, getting, start, started, vscode, visual, studio, code, Microclimate Developer Tools for VS Code getting started, VS Code Marketplace, VS Code Extensions view, VS Code workspace
duration: 1 minute
permalink: mdt-vsc-getting-started
type: document
order: 5
parent: mdt-vsc-overview
---

# Getting started: Microclimate Developer Tools for VS Code

1. Install [VS Code Version 1.27 or later](https://code.visualstudio.com/download) and [local Microclimate Version 18.12 or later](https://microclimate-dev2ops.github.io/installlocally).
2. Install Microclimate Developer Tools for VS Code from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=IBM.microclimate-tools), or by searching for `Microclimate` in the [VS Code Extensions view](https://code.visualstudio.com/docs/editor/extension-gallery#_browse-for-extensions).
    - If you're going to work on Java projects, also install the [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack).
3. Open the Microclimate view in the [Explorer view group](https://code.visualstudio.com/docs/getstarted/userinterface), or enter `Focus on Microclimate` into the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette).
    - If you do not see the Microclimate view in either the Explorer or the Command Palette, the extension did not install correctly.
4. Connect to your local Microclimate instance. Right-click anywhere in the view and select **New Default Local Microclimate Connection**. You can also run this command from the Command Palette.<br>
![New connection context menu](dist/images/mdt-vsc/new-connection.png)<br>
    - If your Microclimate instance is not running on port 9090, use the non-default **New Microclimate Connection** command.
    - For more information on working with connections, see [Connection commands](mdt-vsc-commands-connection).
5. When the connection succeeds, a list of your Microclimate projects appears in the Microclimate view. The project and build states update in sync with Microclimate.<br>
![Microclimate tree](dist/images/mdt-vsc/mc-tree.png)
6. Open your `microclimate-workspace` or a project within the workspace as your VS Code workspace. The tools offer to open the workspace for you if it's not open already.

You are now ready to use the tools. Right-click a project in the Microclimate tree or enter `Microclimate` into the Command Palette to look at the features available.

***

[Next: Tutorial](mdt-vsc-tutorial) to see a walkthrough.

[Next: Commands overview](mdt-vsc-commands-overview) to see a breakdown of the features.

[Back to the VS Code tools overview](mdt-vsc-overview)
