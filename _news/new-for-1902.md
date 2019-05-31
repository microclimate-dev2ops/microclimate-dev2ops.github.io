---
layout: news
title: New and noteworthy for Microclimate 19.02
description: New and noteworthy for Microclimate 19.02
keywords: Microclimate Developer Tools, Git, repositories, release, releases, Visual Studio Code, Eclipse, IBM Cloud Private, Linux, Helm, chart, certificate, cloud pak, security, containers, sampling, profiling, performance, theia, debugging, templates, restart server, pipeline
duration: 1 minute
permalink: new-for-1902
order: 4
parent: February 2019
linkname: New and noteworthy for Microclimate 19.02
---

# New and noteworthy for Microclimate 19.02

Microclimate 19.02 is now [available for download](https://microclimate-dev2ops.github.io/gettingstarted#doc) and was released on February 8th, 2019. Read on to learn more about what's new in this month's Microclimate release.

## Microclimate is now available as an IBM Cloud Pak

After lots of hard work over the last several months, Microclimate is now officially recognized as an IBM Cloud Pak. What is an IBM Cloud Pak? IBM uses IBM Cloud Paks as a way to designate software as trusted, enterprise-grade, and fully integrated with or supported by the IBM Cloud platforms. IBM Cloud Paks are packaged as easily consumable deployment units through the IBM Helm catalog and are deployable as Helm charts to the IBM Cloud platform, including IBM Cloud Private.

![Microclimate with Cloud Pak icon in catalog](dist/images/news-1902/news-1902-ibm-cloud-pak-mc.png "Microclimate with Cloud Pak icon in catalog")

The official Cloud Pak page states that Cloud Paks "accelerate time to production and improve enterprise readiness." Cloud Paks also provide answers to these questions:

- **Q:** Are your software containers secure?
- **A:** Yes, they are! Microclimate scans and remediates container image vulnerabilities, uses the minimum required privileges, documents the required privileges of its containers, and provides monthly updates.

- **Q:** How easy is your software to deploy?
- **A:** Along with other Cloud Paks, Microclimate is available directly from the IBM Helm catalog either by web console or CLI. The [Helm chart docs](https://github.com/IBM/charts/blob/master/stable/ibm-microclimate/README.md) include detailed instructions on installation.

- **Q:** Is your software fully compatible with the IBM Cloud platform that I am using, and is it available for the latest version of this platform?
- **A:** Yes, Microclimate is available for the most recent versions of IBM Cloud Private, and each chart lists the supported versions. Likewise, we aim to ship day-and-date with new IBM Cloud Private releases.

- **Q:** Can I use the IBM Cloud Private platform services with your software?
- **A:** Applications developed in Microclimate on IBM Cloud Private are deployed as Kubernetes applications through Helm charts. Therefore, both Microclimate applications and Microclimate itself are fully integrated with IBM Cloud Private services, such as logging, monitoring, accessing the console web UI, and more.

- **Q:** Have you containerized the specific software I am looking for, and is it fully supported in this configuration?
- **A:** Microclimate itself allows cloud-native development of WebSphere Liberty, Node.js, Swift, Spring, and more, and Cloud Paks exist for WebSphere Application Server, IBM Db2 Advanced Enterprise Server, IBM MQ Advanced, IBM WebSphere Commerce, IBM Event Streams, IBM Transformation Advisor, and more.

Although previous versions of Microclimate hit most if not all of these bullet points, it is nice to officially join the Cloud Pak ecosystem. But don't worry if you already use Microclimate. Availability as a Cloud Pak doesn't change how you use or install the product. If you already have a favored way of installing Microclimate, whether by the local .zip file download, by IBM Cloud Private Helm CLI, or through the IBM Cloud Private Web console, you can continue to install as you have before.

## Annotation of "hot" methods using integrated Node.js sample-based profiling

From its very first release, Microclimate has included integrated load testing and performance monitoring, including monitoring of CPU usage, memory/heap usage, HTTP incoming/outgoing requests, response times per endpoint, and flame graphs. You can find the data in the **Monitor** tab of the Microclimate browser UI, but wouldn't it be cool if the Microclimate UI called out "hot" methods in the code editor itself?

With the latest release of Microclimate, you can see methods that are identified as computationally intensive when you edit your code. The browser-based code editor annotates directly alongside the offending method's source code:

![Profiling tool tip on a hot method](dist/images/news-1902/news-1902-perf-profiling-annotations.png "Profiling tool tip on a hot method")

Microclimate uses sample-based profiling, which regularly and frequently polls the application from the JavaScript virtual machine (VM) to determine which methods are executing. Microclimate identifies the source code that occupies the most time. Microclimate then identifies this code in the UI for further investigation.

To try out this feature, first kick off a load test and then wait for it to complete. Next, open the source code that you suspect is computationally expensive, and you will now see a method annotation identifying the relative performance of these methods. More information on these features is available in our documentation at [Editing your project](edityourcode).


## Node.js debugging in Microclimate Developer Tools for Eclipse

New versions of [Microclimate Developer Tools for Eclipse](https://microclimate-dev2ops.github.io/mdteclipseinstall) and [Visual Studio Code (VS Code)](https://microclimate-dev2ops.github.io/mdt-vsc-getting-started) also shipped with this Microclimate release. In addition to bug fixes for [Microclimate Developer Tools for VS Code](https://github.com/microclimate-dev2ops/microclimate-vscode-tools/blob/master/CHANGELOG.md) and [Developer Tools for Eclipse](https://github.com/microclimate-dev2ops/microclimate-eclipse-tools/blob/master/CHANGELOG.md), the Microclimate Eclipse Tools can be used to start a debug session for Node.js projects with the session hosted in a Chromium-based browser:

<a href="dist/images/news-1902/news-1902-eclipse-node-debug-ui.png"><img src="dist/images/news-1902/news-1902-eclipse-node-debug-ui.png" alt="Screenshot of Eclipse debug menu item, which opens Chromium Node debug UI" width="900"/></a>

Node.js debugging was first delivered in the January Microclimate VS Code extension, and now we have reached feature parity between the two versions. You can use the development environment in which you are most comfortable while still taking advantage of everything Microclimate has to offer.

## New videos for Microclimate Developer Tools, the DevOps pipeline, and deploying to the IBM Cloud Kubernetes Service (IKS)

If a picture is worth one thousand words, then what is a video worth? 😄 Along with updated videos on the home page, the following new videos are available for your viewing pleasure:
- [Microclimate Developer Tools for Eclipse](https://microclimate-dev2ops.github.io/mdteclipseoverview#doc)
- [Microclimate Developer Tools for Visual Studio Code](https://microclimate-dev2ops.github.io/mdt-vsc-overview#doc)
- [Creating a pipeline](https://microclimate-dev2ops.github.io/usingapipeline#doc)
- [Deploying to the IBM Cloud Kubernetes Service](https://microclimate-dev2ops.github.io/configiks#doc)

These videos are a great place to start if you're first diving into the Microclimate Developer Tools, the DevOps pipeline, or targeting IKS from Microclimate.

## UI improvements and support for IBM Cloud Private V3.1.2

To round things off this month, this release includes IBM Cloud Private V3.1.2 support and a few nice quality-of-life improvements:
- Microclimate 19.02 includes support for IBM Cloud Private Version 3.1.2 and 3.1.1 and is available from the IBM Cloud Helm catalog as `ibm-microclimate` 1.11.0.
  - Note: If you’re installing Microclimate V19.02 (V1.11.0) on IBM Cloud Private V3.1.0, set `global.useSecurityContext=false` when [installing the Microclimate chart](https://microclimate-dev2ops.github.io/troubleshooting#microclimate-pod-does-not-show-up-on-ibm-cloud-private-310).

- The DevOps pipeline web UI is redesigned to improve user friendliness and workflow:
    <a href="dist/images/news-1902/news-1902-new-pipeline-ui.png"><img src="dist/images/news-1902/news-1902-new-pipeline-ui.png" alt="Screenshot of redesigned DevOps pipeline UI" width="600"/></a>

- Templates, which you can use to add more development languages and sample projects to Microclimate, can now be deleted through the web UI:

  ![Screenshot of Delete Template menu item](dist/images/news-1902/news-1902-delete-template.png "Screenshot of Delete Template menu item")

- You can now restart an application by clicking the **Restart Server** button from the information page of a project. Note that as of V19.02, this feature is in local Microclimate only.

  ![Restart server button](dist/images/news-1902/news-1902-Restart-Server.png "Restart server button")

- Eclipse Theia, the browser-based code editor of Microclimate, [is updated to version 0.3.18](https://github.com/theia-ide/theia/blob/master/CHANGELOG.md).

## Check out Microclimate for yourself

Microclimate is available for [download from our website](https://microclimate-dev2ops.github.io/) or from the [IBM Helm catalog](https://github.com/IBM/charts).
