---
layout: docs
title: Adding development languages
description: Adding startup templates
keywords: template, project, projects, develop, development, language, languages, build, custom, layout,
duration: 1 minute
permalink: addingdevelopmentlanguages
type: document
order: 4
parent: usingmicroclimate
---

Beginning with Microclimate Version 18.09, you can add more development languages in addition to Java, Node.js, and Swift by importing language startup templates. These templates appear as project types directly from within the Microclimate interface. You can code and develop in languages of your choice as well as build projects based on custom project layouts that are suited to your environment.

## Requirements
- Your code exists in a GitHub repository.
- Your code builds with Docker by using a Dockerfile.

## Creating a template
To create your own template, create a `<name>.yaml` file with the details of the template. Place this file in a new directory within your existing `microclimate-workspace/.extensions` directory.

Include the following code in the `.yaml` file:

```
yaml
extensionId: <string identifier>
buildType: docker
language: <For example, Go>
creationType: template
info:
  provider: <name of provider>
  version: x.x.x
userInterface:
    label: <text to display on the UI>
    description: <description of what the template does>
template:
  giturl: <link to the GitHub project>
  gitbranch: <branch to build>
  localpath: <leave blank>
```

For example, you can create the following `templateGoExample.yaml` file and store it as `microclimate-workspace/.extensions/templateGoExample/templateGoExample.yaml`:
```
yaml
extensionId: templateGoExample
buildType: docker
language: go
creationType: template
info:
  provider: IBM
  version: 0.0.1
userInterface:
    label: Go sample template
    description: Sample microservice for simple go app
template:
  giturl: https://github.com/microclimate-dev2ops/microclimateGoTemplate
  gitbranch: master
  localpath:
```

After you restart Microclimate, your template appears as a selectable project type when you create a new project.

## Limitations
Monitoring is unavailable for projects created from a template.
