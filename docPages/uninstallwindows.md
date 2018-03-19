---
layout: document
title: Uninstalling Microclimate on Windows
description: Documents
duration: 1 minute
permalink: uninstallwindows
type: document
---

## Uninstalling on Windows

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
