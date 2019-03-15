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

**Note:** The Git command line interface (CLI) is available in the Theia editor and can be used normally with any Git provider. If you use GitHub or GitHub Enterprise, you can also create remote repositories with the UI, as shown in the following instructions. 

Complete the following steps to commit a project with the **Create Git repository** button:
- **Note:** This button automatically creates the repository for you. You do not have to create an empty repository beforehand. If the repository with the same name exists, creating the Git repository fails because it doesn't commit to an existing repository.

1. [Create a personal access token for GitHub](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).
2. Go to the project **Overview** tab, click `Create Git repository`, and fill out the fields.
    - You can push your project either to your own repository or to organizations where you are a member.
      - For a repository in GitHub, enter `github.com` in the **Git URL** field.
      - For a repository in GitHub Enterprise, enter `github.<your domain>.com` in the **Git URL** field.
      - The `https://`, `ssh://`, or `git@` prefixes are not required.
    - Enter the project name for the **Name** field.
    - **Note:** If you are pushing to your own repository, you do not need to specify the user name in the URL. The name is automatically determined by using the personal access token and the project name.
3. Click **Create**. After the changes are synced and pushed, you can view the new repository in GitHub in the web browser.

Alternatively, you can commit a project with the **Terminal** view:

1. [Create a personal access token for GitHub](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).
2. [Create a new repository in GitHub](https://help.github.com/articles/creating-a-new-repository/). Give the new repository the same name as the Microclimate project. To avoid errors, do not initialize the new repository with a README, license, or `.gitignore` file.
3. Copy the URL for the new repository in GitHub. Use the HTTPS URL rather than SSH.
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

**Note:** The **Delete** button on the **Overview** tab deletes the Microclimate project but doesn't delete the Git repository.

## Need help?
If you encounter problems with committing a new project to a Git repository, check the [Troubleshooting page](troubleshooting#committing-a-new-project-to-github).
