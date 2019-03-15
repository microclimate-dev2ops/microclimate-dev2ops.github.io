---
layout: docs
title: Uninstalling Microclimate on Linux or Mac/OS
description: Uninstalling Microclimate on Linux or MacOS
keywords: uninstall, delete, remove, linux, macos, cli, uninstall on Linux or MacOS
duration: 1 minute
permalink: uninstalllinuxmac
type: document
category: How-tos and Guides
order: 1
parent: uninstall
---

# Uninstalling Microclimate on Linux or Mac/OS

To uninstall Microclimate on Linux or MacOS:

1. Stop Microclimate. This stops the Docker containers:
```
~/mcdev stop
```
2. Delete the Microclimate Docker images:
```bash
~/mcdev delete
```
3. Uninstall the Microclimate CLI. From the Microclimate directory:
```
cd cli
sudo ./uninstall.sh
cd ../..
```
4. Delete the Microclimate directory and its subdirectories:
```
rm -rf <microclimate directory>
```
5. Delete the .idc directory from the microclimate-workspace directory.
