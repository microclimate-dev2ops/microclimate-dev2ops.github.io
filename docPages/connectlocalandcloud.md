---
layout: document
title: Connecting the local and IBM Cloud Private installations
description: Connecting local and IBM Cloud Private installations
keywords: local, IBM Cloud Private
duration: 1 minute
auto_ids: true
permalink: connectlocalandcloud
category: How-tos and Guides
---
Connect the local installation to the IBM Cloud Private installation so that your local Microclimate can have full access to the build pipeline. You can work on your local Microclimate installation projects and work with pipelines within the same portal.

## Prerequisites
Install both the local and IBM Cloud Private versions of Microclimate.

### Local installation
- **Installation:** Download from the Microclimate website.
- **Usage:** Run Microclimate in your local environment with local tools.
- **Pipeline:** Check your changes into Git and build with a DevOps pipeline on the cloud.

### IBM Cloud Private installation
- **Installation:** Install from the IBM Cloud catalog.
- **Usage:** Access a fully hosted environment with a DevOps pipeline.
- **Pipeline:** Access the build pipeline directly through the cloud.

## Connecting the local and IBM Cloud Private installations
1. Start your local Microclimate installation.
2. Click the **Remote connection** icon.
3. Enter the remote workspace URL and your credentials.
4. Click the **Connect** button. Your local Microclimate installation can now access pipelines from the IBM Cloud Private installation.
