---
layout: docs
title: Committing a new project to GitHub
description: Committing a project to GitHub
keywords: getting started, commit, remote, repository, terminal, root directory, new project, git remote, git push
duration: 1 minute
permalink: committingaprojecttogithub
type: document
order: 10
parent: usingmicroclimate
---

# Committing a new project to GitHub

**Note:** These examples show committing a project to GitHub and GitHub Enterprise. However, Microclimate also works with other providers that host Git repositories, such as GitLab and Bitbucket.

To commit a project created in Microclimate to GitHub:

1. [Create a personal access token for GitHub](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).
2. [Create a new repository in GitHub](https://help.github.com/articles/creating-a-new-repository/). Give the new repository the same name as the Microclimate project. To avoid errors, do not initialize the new repository with a README, license, or .gitignore file.
3. Copy the URL for the new repository in GitHub. Use the https URL rather than SSH.

Use the `Create Git repository` button to commit a project:

4. Go to the project **Overview** tab, click `Create Git repository`, and fill out the fields.
    - You can push your project either to your own profile or to organizations where you are a member.
      - For a repository in GitHub, enter `github.com` in the **Git URL** field.
      - For a repository in GitHub Enterprise, enter `github.<your domain>.com` in the **Git URL** field.
    - Enter the project name for the **Name** field.   
5. Click **Create**. After the changes are synced and pushed, you can view the new repository in GitHub in the web browser.

**Note:** The **Delete** button on the **Overview** tab deletes the Microclimate project but doesn't delete the Git repository.

Alternatively, you can commit a project with the **Terminal** view:

4. Open a **Terminal** view in the Microclimate editor by clicking **File**>**Open New Terminal**. Ensure that the terminal is open to the root directory of the project.
5. In the terminal, add the repository URL as the remote repository for the project by entering the following command, replacing `remote-repository-URL` with the URL copied in step 3.
```bash
$ git remote add origin remote-repository-URL
```
6. Push the contents of project to the remote repository by entering the following command:
```bash
$ git push -u origin master
```
Enter your GitHub username when prompted. When prompted for your password, enter the personal access token created in step 1.

## Need help?
If you encounter problems with committing a new project to a Git repository, check the [Troubleshooting page](troubleshooting#committing-a-new-project-to-github).
