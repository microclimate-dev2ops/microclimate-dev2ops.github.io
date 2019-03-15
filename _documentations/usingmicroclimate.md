---
layout: docs
title: Using Microclimate
description: Using Microclimate
keywords: coding, run, apply, import, create, edit, video, projects, introduction, user interface, working with projects, deploying projects, own IDE, performance testing, disabling development, creating a pipeline
duration: 1 minute
permalink: usingmicroclimate
type: document
order: 30
parent: root
---

# Using Microclimate

After you install Microclimate and use it for the first time, accept the [license agreement](license). You can then begin to work with projects.

## Working with projects

<details>
<summary style="cursor: pointer;"><img src="dist/images/icon-video.svg" alt="Microclimate video icon" class="inline" width="40px"/> Watch the video introduction to the Microclimate user interface in Microclimate Version 18.08.</summary>
{% include docs-video.html src="https://ibm.box.com/shared/static/0m1lp5kqpb3ylu90qi708ie8belk2san.mp4" description="Introduction to the Microclimate user interface in Microclimate Version 18.08" %}
</details><br>

You can use Microclimate to [create a new project](creatingaproject) or [import an existing one](importingaproject). Projects appear in the [project list](projectview). You can [check the application status and build status](checkingstatuses) of your application.

You can then [edit your code](edityourcode) by using the Theia development environment, or you can choose a [development environment of your own](settingownide). Now, when you make a change to your project, Microclimate detects the change and automatically rebuilds and redeploys the updated project for testing. You can also [performance test your project](performancetesting).

If you have many projects on the go at the same time, you can focus resources on those you are currently developing by [disabling development on others](disabledevelopmentonprojects).

## Deploying projects

Finally, when your project is ready to deploy, you can use Microclimate to [create a pipeline](usingapipeline). Having created a pipeline, you can then deploy to IBM Cloud Private, or you can [configure Microclimate to deploy applications to the IBM Cloud Kubernetes Service](configiks).

## What next
Develop a project of your own, or explore Microclimate with [tutorials and samples](tutorials-and-samples).

## Need help?
If you encounter problems with using Microclimate, check the [Troubleshooting page](troubleshooting#using-microclimate).
