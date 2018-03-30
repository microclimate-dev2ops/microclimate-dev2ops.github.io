---
layout: document
title: Importing Projects
description: Documents
duration: 1 minute
permalink: projectimport
type: document
---

## Importing projects in Microclimate

Microclimate projects can be imported from Github, a local directory, or an archive. Some additional project guidelines need to be followed in order for projects to build and deploy in Microclimate.

### Microprofile projects
Microprofile Dockerfiles should not attempt to copy build artifacts because the build is run within the application container to ensure a smooth transition between development and production environments. Doing so causes the container build to fail.

### Helm charts
When you import a Microclimate project to be deployed on IBM Cloud Private, the chart name must be the same as the project name in order for Microclimate to detect its status.
