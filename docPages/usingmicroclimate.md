---
layout: document
title: Using Microclimate
description: Using Microclimate
keywords: Using, coding, run, apply, import, create, edit, log, monitor
duration: 1 minute
permalink: usingmicroclimate
type: document
---

## Using Microclimate

To use Microclimate, you must first accept the License Agreement.

You are then prompted with two options:
1. [New project](#create-a-new-project). This creates a new project in your Microclimate workspace.
2. [Import project](#import-a-project). This option enables you to import an existing project into your Microclimate workspace.

Having created your project, Microclimate prompts you to either:
1. [Edit your code](#edit-your-code)
2. Return to the [project list](#project-list).

## Create a new project

To create a new project in your Microclimate workspace:
1. Click **New project**.
2. Select your language. Options available are Java, Node.js, and Swift.
3. Name your project in lowercase letters and numbers.
4. Depending on your choice of language, you are prompted for additional information, if required.
5. Click **Create**. This step creates your project in your Microclimate workspace.

## Import a project

To import a project into your Microclimate workspace:
1. Click **Import project**.
2. Select from where you want to import your project. Options are from a GitHub repository, or from a local project folder or project archive on your machine.
3. Click **Next**.
4. Enter the required information depending on the choice you made in the previous step, and then click Import. This step creates your project in your Microclimate workspace.

For more information, see [Importing projects in Microclimate](./projectimport).

## Edit your code
You see six options:

1. Edit code. After creating your project, Microclimate has already built your project and started it. Use the Theia editor to modify your code, and to redeploy it.

2. Build logs. Clicking this option shows your build logs. This button also flashes when the system is building your application.

3. Open app. Supply the context root, and then open your application.

4. App logs. Log files for your application.

5. App monitor. Use to monitor your application.

6. Pipeline.  Use a pipeline to automatically detect changes in your application, and to rebuild and redeploy it. For more information, see [Using a pipeline](./usingpipeline).

## Test your code

To test your application, click **Run load**, which uses [JMeter](https://jmeter.apache.org/) to load test functional behavior. On project generation, a basic test plan is created. You can edit this test plan or use your own. You can then go to the dashboard (App monitor), to see the application traffic.

## Commit a project created in Microclimate to GitHub

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

## Project list
The Projects page contains a listing of all the projects in your Microclimate workspace. You can access a shortcut menu alongside each project name by clicking the three vertical dots. From the shortcut menu, you can:
* Edit code
* View the build logs
* Open the application
* View the application logs
* Monitor the application
* Delete the project
