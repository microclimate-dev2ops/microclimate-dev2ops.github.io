---
layout: docs
title: Creating a personal access token in GitLab
description: Microclimate Documents
keywords: Jenkins, pipeline, microservice, microservices, project, projects, tokens
duration: 1 minute
permalink: creatingpatgitlab
type: document
order: 3
parent: usingapipeline
---

To create a personal access token for Jenkins to access the microservice projects in GitLab:

   1. In a web browser, log in to GitLab with the user account that Jenkins needs to access GitLab. Typically, this is a system or build identity, but can be your personal account for testing purposes.
   2. Access your personal settings by clicking on your user icon, and then click **Settings**.
   3. Click **Access Tokens**.
   4. Give the Token a name that describes the purpose of the token.
   6. Add the `api` scope.
   7. Click **Create personal access token**, and leave the window open.
   8. **Important:** Copy and save your token. You have access only once to the GitLab personal access token.
