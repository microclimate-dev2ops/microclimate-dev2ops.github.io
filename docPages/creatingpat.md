---
layout: document
title: Creating a personal access token in GitHub
description: Microclimate Documents
keywords: install, setup, jenkins, pipeline, help
duration: 1 minute
permalink: creatingpat
type: document
---

To create a personal access token for Jenkins to access the microservice projects in GitHub:

   1. In a web browser, log in to GitHub or GitHub Enterprise with the user account that Jenkins needs to access GitHub. Typically, this is a system or build identity, but can be your personal account for testing purposes.
   2. Access your personal settings by clicking on your user icon, and then click **Settings**.
   3. For public GitHub, click **Developer settings > Personal access tokens**. For GitHub Enterprise, click **Personal access tokens**.
   4. Click **Generate new token**.
   5. In the Token description field, describe the purpose of the token.
   6. Add the `repo:status`, `public_repo`, `admin:repo_hook`, `admin:org_hook` scopes. Note that for private repos, you must ensure that the repo is selected, and not just the sub options `status` and `public_repo`.
   7. Click **Generate token**, but leave the window open.
   8. **Important:** Copy and save your token. You have access only once to the GitHub personal access token.
