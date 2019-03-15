---
layout: docs
title: Uninstalling Microclimate on Windows
description: Uninstalling Microclimate on Windows
keywords: uninstall, remove, delete, windows, cli, uninstall on Windows
duration: 1 minute
permalink: uninstallwindows
type: document
category: How-tos and Guides
order: 2
parent: uninstall
---

# Uninstalling Microclimate on Windows

To uninstall Microclimate on Windows:

1. Stop Microclimate. This stops the Docker containers:
```bash
mcdev stop
```
2. Delete the Microclimate Docker images:
```bash
mcdev delete
```
3. If you plan to [reinstall Microclimate](installlocally) after you uninstall it, such as to update to a newer version, copy your `microclimate-workspace` directory to avoid losing your existing projects. When you're ready to install again, paste the copied directory into the new installation directory before you run the `cli\install.ps1` command for the new installation.
4. Delete the Microclimate directory and its subdirectories:
```bash
rmdir  <microclimate directory> /S
```
5. Delete the `.idc` directory from the `microclimate-workspace` directory.
