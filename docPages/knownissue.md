---
layout: document
title: Known issues
description: Known issues
duration: 1 minute
permalink: issues
type: document
---

## Windows: cli\install.ps1 cannot be loaded, the file is not digitally signed

The default security settings on Windows 10 and Windows Server 2016 do not allow downloaded PowerShell scripts to run.

**Workaround:** Right-click on the microclimate.zip file and open the file Properties menu. On the General tab, tick the Unblock box beside the "This file came from another computer" message. Unzip the file again and retry the cli\install.ps1 script.

## Swift apps don't rebuild or redeploy

Swift support in Microclimate is not fully implemented for the initial Beta release and currently if you edit the application it will not rebuild or redeploy like Java and Node.js applications.

**Workaround:** After making a change to a Swift application, you must issue an 'mcdev stop' and 'mcdev start' to have the changes built and redeployed.

## HTTPS links won't launch in Microclimate

When testing out the user application from the Open Application view in Microclimate UI, HTTPS links within the application will fail to be opened, e.g. the links on the home page on a created Swift application. This problem only happens for HTTPS links while HTTP links will work properly. To workaround this problem, open HTTPS links on a new browser tab.

## Unable to delete a project whose container isn't running

For the beta, we had to restrict project deletion in the Microclimate UI to only those that are within a running container.

**Workaround:** Navigate to the microclimate-workspace directory, delete the project folder, and refresh the Microclimate UI.

## Windows: Dockerfile edit does not start the Liberty server after a container refresh

On making a Dockerfile change in Windows, the Liberty server is not started after a container refresh.

**Workaround:** A pom.xml edit or a Microclimate(mcdev) restart, restarts the Liberty Server.
