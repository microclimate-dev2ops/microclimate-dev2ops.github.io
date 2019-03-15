---
layout: news
title: New and noteworthy for Microclimate 19.03
description: New and noteworthy for Microclimate 19.03
keywords: Microclimate Developer Tools, Git, IBM Cloud Private, templates, pipeline, noteworthy, private, offline, install
duration: 3 minutes
permalink: new-for-1903
order: 6
parent: March 2019
linkname: New and noteworthy for Microclimate 19.03
---

## New and noteworthy for Microclimate 19.03

Microclimate 19.03 is now [available for download](gettingstarted) and was released on March 15, 2019. Read on to learn more about what's new in this month's Microclimate release.

## Creating a new template from an existing project or importing a template from public Git

Microclimate includes built-in support for many different languages and runtimes, including Java (both Microprofile and Spring), Node.js, Swift, Go, and Python. It also includes an extensible template system that you can use to bring your own additional languages, runtimes, and patterns into the Microclimate development environment.

With this release, you can now create a new template from an existing Microclimate project, or you can import an existing template directly from a Git repository. Of course, you can still manually define a template as you could with previous releases.

You can use an existing local project as the basis for a new template:

<a href="dist/images/news-1903/news-1903-create-template-existing-local-project.png"><img src="dist/images/news-1903/news-1903-create-template-existing-local-project.png" alt="Screenshot that shows the form used to create a template from an existing project" width="379"/></a>
- The language or runtime of the project is used to determine how the new template is built.

You can also import from a public Git repository URL:

<a href="dist/images/news-1903/news-1903-create-template-from-public-git-repo.png"><img src="dist/images/news-1903/news-1903-create-template-from-public-git-repo.png" alt="Screenshot that shows importing a template from a public Git repository" width="416"/></a>
- You can see how existing Go, Python, and Lagom templates are defined by looking at the templates hosted on the [Microclimate GitHub repository](https://github.com/microclimate-dev2ops/).


Templates that you define appear in the **Templates** view as well as in the new project wizard:

<a href="dist/images/news-1903/news-1903-create-a-new-template-main.png"><img src="dist/images/news-1903/news-1903-create-a-new-template-main.png" alt="Screenshot that shows the new template in the Templates view" width="600"/></a>
- Use this new feature to define a template application. You might call this template a pattern exemplar application because it contains the dependencies, configuration, and settings that are specific to your individual development use case, and then it quickly builds new projects by using this user-defined project. By hosting this template on a public Git repository, you can also share this template with other team members.

More information on [working with templates in Microclimate is available on our website](workingwithtemplates).


## Using the DevOps pipeline in an offline configuration

Microclimate 19.03 supports building applications offline, such as behind a restrictive firewall, from within the Microclimate DevOps pipeline. In this configuration, the DevOps pipeline does (by design) not have access to any external internet resources, such as public GitHub and GitLab, Maven Central, npm, and Docker Hub. Many common public development repositories are unavailable in this configuration.

<a href="dist/images/news-1903/news-1903-offline-diagram.png"><img src="dist/images/news-1903/news-1903-offline-diagram.png" alt="Chart of how the various traditionally online services like Git and Maven need to be hosted offline on IBM Cloud Private" width="600"/></a>

These resources that are traditionally acquired from the public internet must instead be hosted privately within a fully self-contained, user-managed environment hosted within IBM Cloud Private. For example, you might host source code on your cluster by using a private GitLab instance, use the IBM Cloud Private internal container image registry to host Docker images, and use a private Nexus instance to host your Node.js or Java application dependencies.

After you [configure your offline environment architecture](offlinemicroclimateusing), the next steps depend on which type of application you want to build:

- For Liberty or Node.js applications, first provision a private in-cluster [Nexus repository](https://github.com/helm/charts/tree/master/stable/sonatype-nexus), which runs alongside your Microclimate instance. Nexus maintains your application's Node.js (npm/package.json) and Java (Maven) dependencies locally to the cluster so that the build process does not need to access the internet to build or deploy your application.

- For [building Node.js applications offline](offlinemicroclimatenode), configure the blob stores and repositories of Nexus, populate the Nexus repository with the dependencies of your Node application, and modify the Node.js Dockerfile and Jenkinsfile. Then, your npm project is ready to be deployed offline with the Microclimate DevOps pipeline.

- For [Liberty applications](offlinemicroclimateliberty), configure your Nexus repository, transfer the artifacts required to build your application to this repository, publish a new Maven image that uses your Nexus repository, modify your Dockerfile, tweak the Groovy installation file, and then install and use the DevOps pipeline.

- For [building generic Docker applications](offlinemicroclimategenericdocker), Nexus is not required. The offline DevOps documentation demonstrates how to build a Python project: store your Python code in an offline Git repository, move any required Docker images (Python and Flask plus dependencies) into an offline Docker image that is stored in the IBM Cloud Private Docker registry, update the project Dockerfile to use the IBM Cloud Private registry rather than the public registry, and then deploy your application by using the DevOps pipeline.

**Note:** Offline support is available only from the DevOps pipeline functionality of Microclimate. For more information, see [Using Microclimate offline](offlinemicroclimateusing).

## Improvements to the IBM Cloud Private installation, DevOps pipeline deployment status in the UI, and Git project creation

- As first discussed in [What's New and noteworthy in Microclimate 18.12/19.01](new-for-1812-1901), the most recent releases of Microclimate reduce the complexity of installing Microclimate to IBM Cloud Private. This work has continued with this release, and now Microclimate automatically detects missing Kubernetes secrets in addition to detecting missing persistent storage, which was previously introduced in 18.12:

    <a href="dist/images/news-1903/news-1903-atrium-warning.png"><img src="dist/images/news-1903/news-1903-atrium-warning.png" alt="Screenshot of the error messages displayed by Microclimate when Kubernetes secrets or persistence storage volumes are missing" width="600"/></a>

- Besides the reduction of complexity, the Helm installation process for this release doesn't include any other changes, and Microclimate continues to support IBM Cloud Private 3.1.2 and 3.1.1.

- When you use the DevOps pipeline, the status of completed Jenkins deployments is automatically reflected in the pipeline view of Microclimate:

    <a href="dist/images/news-1903/news-1903-deployment-successful.png"><img src="dist/images/news-1903/news-1903-deployment-successful.png" alt="Screenshot of the new deployment status bar inside the deployment view"/></a>

- You can now create new GitHub repositories directly from the Microclimate new project wizard. The repository contents are based on the generated Microclimate project:

    <a href="dist/images/news-1903/news-1903-create-project-in-Git.png"><img src="dist/images/news-1903/news-1903-create-project-in-Git.png" alt="Screenshot of form fields for creating a new project in Git" width="600"/></a>


## Take the latest Microclimate for a spin

Microclimate is available for [download from the website](https://microclimate-dev2ops.github.io/) or from the [IBM Helm catalog](https://github.com/IBM/charts/tree/master/stable/ibm-microclimate).
