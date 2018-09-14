---
layout: docs
title: Checking the application and build statuses
description: Checking the application and build statuses
keywords: using, run, monitor, getting started,  builds, changes, status, state, help, troubleshooting, stopped, starting, unknown, failed, logs, app, error, message, messages
duration: 1 minute
permalink: checkingstatuses
type: document
parent: usingmicroclimate
order: 6
---

Builds automatically begin when Microclimate detects changes. If a build fails, navigate to the **Build logs** tab for more information.

## Application status

The application status shows the current state of your application.

* Starting the application
  * When you start Microclimate, it starts all the applications unless you have disabled them.
  * To enable a project that has been disabled, navigate to the *Overview* tab and click the *Enable project* button to start the application and build containers.
* Stopping an application
  * When you stop Microclimate, its applications also stop.
  * To disable a project, navigate to the *Overview* tab and click the *Disable project* button to stop the application and build containers to save resources.

Troubleshooting the application status
* If your application goes into the **Stopped** state unexpectedly or stays in the **Starting** state longer than expected, check the application logs to see whether something went wrong. Problems with the application build or server configuration can make the application fail to start and create errors in the **Build logs** or **App logs** views.
* Even without errors, the **Stopped** state can occur if the context root of the application is unreachable.

## Build status

The build status shows the current stage of your application in the build lifecycle.

* When you create or import your application, the state is **Unknown**.
* If your build fails, view the build logs. Click the **Build failed** message. In the build logs, you can view error messages that describe the type and cause of failure.
