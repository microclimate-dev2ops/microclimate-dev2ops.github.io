---
layout: document
title: Using Microclimate
description: Using Microclimate
keywords: Using, coding, run, apply, import, create, edit, log, monitor
duration: 1 minute
permalink: usingmicroclimate
type: document
---

## Installing Microclimate

`Note`: Before you install Microclimate, decide whether you want to deploy to IBM Cloud Kubernetes Service (IKS) and then take the necessary steps to enable deployment. For more information, see the **Prerequisites** in [Deploying to IBM Cloud Kubernetes Service](./deployingiks).

You can install Microclimate locally or into IBM Cloud Private. If you want to develop applications on your computer, you can [install Microclimate locally](./installlocally). If you want to take advantage of IBM Cloud Private, which provides a common and consistent platform for you to rapidly innovate while retaining the flexibility to use public clouds and services, you can [install Microclimate in IBM Cloud Private](https://github.com/IBM/charts/blob/master/stable/ibm-microclimate/README.md).

## Working with projects

Having chosen the type of installation that best suits your requirements and having installed Microclimate, you can use Microclimate to [create a new project](./creatingaproject) or [import an existing one](./importingaproject). Projects appear in the [project list](./managingprojects). You can [check the application status and build status](./checkingstatuses) of your application.

You can then [edit your code](./edityourcode) by using the Theia development environment, or you can choose a [development environment of your own](./settingownide). Now, when you make a change to your project, Microclimate detects the change and automatically rebuilds and redeploys the updated project for testing. You can also easily [test the performance of your developing project by using jmeter](./performancetesting).

If you have many projects on the go at the same time, you can focus resources on those you are currently developing by [disabling development on others](./disabledevelopmentonprojects).

## Deploying projects

Finally, when your project is ready to deploy, you can use Microclimate to [create a pipeline](./usingapipeline). Having created a pipeline, you can then deploy to IBM Cloud Private, or you can [deploy to the IBM Cloud Kubernetes Service](./deployingiks).

## What next
After you have installed Microclimate and accepted the [license agreement](./license), you can then follow a [tutorial](./tutorials-and-samples), [deploy a sample](./tutorials-and-samples), [create a new project](./creatingaproject), or [import a project](./importingaproject).
