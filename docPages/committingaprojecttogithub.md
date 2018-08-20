---
layout: document
title: Committing a project to GitHub
description: Committing a project to GitHub
keywords: getting started, install, setup, command line, import, pipeline, update, samples, help, theia
duration: 1 minute
permalink: committingaprojecttogithub
type: document
---

To commit a project created in Microclimate to GitHub:

1. Create a personal access token for GitHub by following [these instructions](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).

2. Create a new repository in GitHub by following [these instructions](https://help.github.com/articles/creating-a-new-repository/). Give the new repository the same name as the Microclimate project. To avoid errors, do not initialize the new repository with a readme, license, or .gitignore file.

3. Copy the URL for the new GitHub repository. Use the https URL rather than SSH.

4. Open a Terminal view in the Microclimate editor by clicking **File > Open New Terminal**. Ensure that the terminal is open to the root directory of the project.

5. In the terminal, add the GitHub repository as the remote repository for the project by entering the following command, replacing remote-repository-URL with the URL copied in step 3.
```bash
$ git remote add origin remote-repository-URL
```
6. Push the contents of project to the remote repository by entering the following command:
```bash
$ git push -u origin master
```
Enter your GitHub username when prompted. When prompted for your password, enter the personal access token created in step 1.
