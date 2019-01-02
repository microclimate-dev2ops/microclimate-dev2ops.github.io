---
layout: docs
title: Adding development languages and sample projects
description: Adding development languages and sample projects
keywords: template, project, projects, develop, development, language, languages, build, custom, layout, sample
duration: 1 minute
permalink: addingdevelopmentlanguages
type: document
order: 5
parent: usingmicroclimate
---

## Adding development languages and sample projects

Beginning with Microclimate Version 18.09, you can add more development languages and sample projects by adding Microclimate extensions, called templates. These templates appear as new language and project types within the Microclimate user interface. You can code and develop in languages of your choice and provide sample projects that are suited to your environment.

## Requirements
- You need your sample project code, either on your local disk or in a GitHub repository.
- The sample must include a Dockerfile, and you must be able to build it and run it in Docker.

## Creating a template
Microclimate templates are stored in the `microclimate-workspace/.extensions` directory. Templates for Python and Go languages and for additional Java and Node.js sample projects are already included in Microclimate. You can refer to those as examples.

1. To make your own template, create a `microclimate.yaml` file to provide the specification for your sample project. See the [format specification of the microclimate.yaml file](#format-specification-of-the-microclimateyaml-file) along with the example.

2. Your `microclimate.yaml` file needs to be placed in a new directory within the `microclimate-workspace/.extensions` directory.
  * The directory name must match the value you provide for the `extensionID` field in your `microclimate.yaml` file.
  * If you are providing sample project code from your local disk rather than in a GitHub repository, include the project code in the same directory. In the `microclimate.yaml` file, set the `localpath` value with a period.

3. If you are running Microclimate in IBM Cloud Private, you can use the kubectl CLI to upload your template as shown in the following example: `kubectl cp <your template directory> <namespace>/<ibm-microclimate pod>:microclimate-workspace/.extensions`
  * **Note:** The `extensions` directory in the root of the filesystem for the `ibm-microclimate` pod contains only the templates supplied by Microclimate. Place your new template in the `microclimate-workspace/.extensions` directory as previously described.

4. If you are running in a local installation, restart Microclimate. If you are running in IBM Cloud Private, restart the `ibm-microclimate` pod. After you restart, your template appears as a selectable project type when you create a new project.

## Format specification of the microclimate.yaml file

```
extensionId: <string identifier, matching the directory name you are using for the template>
buildType: docker
language: <project language, for example, Java>
creationType: template
info:
  provider: <name of provider>
  version: x.x.x
userInterface:
    label: <text to display on the UI>
    description: <description of what the template does>
template:
  giturl: <link to the GitHub project, if your source code is in GitHub>
  gitbranch: <GitHub branch>
  localpath: <relative path to your project sample code (such as "."), if your source code is not in GitHub>
application:
  port: <the HTTP port that the application opens>
  contextroot: <the HTTP route that the application responds on, default is "/">
```

For example, the following code shows the `microclimate.yaml` file for the Go language template supplied in the `microclimate-workspace/.extensions/templateGoExample` directory:
```
extensionId: templateGoExample
buildType: docker
language: go
creationType: template
info:
  provider: IBM
  version: 0.0.1
userInterface:
    label: Go sample template
    description: Sample microservice for simple Go app
template:
  giturl: https://github.com/microclimate-dev2ops/microclimateGoTemplate
  gitbranch: master
  localpath:
application:
  port: 8000
```

## Limitations
Monitoring is unavailable for projects created from a template.
