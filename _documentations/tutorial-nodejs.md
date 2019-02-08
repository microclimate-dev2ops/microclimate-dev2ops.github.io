---
layout: document
title: Microclimate for Node.js developers
description: Microclimate for Node.js developers
keywords: Node.js, tutorial, deployment, development, IBM Cloud Private, cloud, deploy to IBM Cloud Private, Jenkins, DevOps
duration: 15 minutes
permalink: tutorial-nodejs
---

If you've never used Microclimate with Node.js before, you've come to the right page. This tutorial guides you through the steps to deploy with Microclimate for the first time.

## Prerequisites
* Install an [IBM Cloud Private](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0/installing/installing.html) instance.
* [Install](https://github.com/IBM/charts/blob/master/stable/ibm-microclimate/README.md) Microclimate on IBM Cloud Private.

1. [Import](importingaproject) a project or [create](creatingaproject) a new one.
  * You can use the [IBM Cloud Private Node.js sample code](https://github.com/ibm-developer/icp-nodejs-sample).
2. Point to a repo.
3. [Check](checkingstatuses) the app monitor and build logs.
4. Make [code changes](edityourcode).
5. Share your project by creating a [pipeline](usingapipeline) and then deploying to [IBM Cloud Private](https://github.com/IBM/charts/blob/master/stable/ibm-microclimate/README.md) or [IBM Cloud Kubernetes Service](configiks).
6. Create your deployment with the last successful build on a branch. Watch Jenkins build until you receive an indication of a successful finish. DevOps creates a release, which points to what you just built.
7. Visit the web application on IBM Cloud Private.
