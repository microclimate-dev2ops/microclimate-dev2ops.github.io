---
layout: document
title: Uninstalling Microclimate on Windows
description: Uninstalling Microclimate on Windows
keywords: uninstall, remove, delete, windows, cli
duration: 1 minute
permalink: uninstallwindows
type: document
category: How-tos and Guides
parent: Uninstalling Microclimate
---

To uninstall Microclimate on Windows:

1. Stop Microclimate. This stops the Docker containers:
```bash
mcdev stop
```
2. Delete the Microclimate Docker images:
```bash
mcdev delete
```
3. Delete the Microclimate directory and its subdirectories:
```bash
rmdir  <microclimate directory> /S
```
4. Delete the .idc directory from the microclimate-workspace directory.
