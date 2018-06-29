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
2. Select where you want to import your project from. Options are from a remote Git repository, a local project folder, or a project archive on your machine.
3. Click **Next**.
4. Enter the name and any required information depending on the option you choose in the previous step, then click **Next**.
5. The project is validated. One of the following occurs:
* The project matched one of the supported project types, so it is auto-detected and you can click **Import**. 
* The project type could not be determined or isn't the right type for your project, then you must select a project type.
* Validation reports that the project is missing required files. You can select the option to generate the missing files or continue with the import. Note: The generated files are likely to be needed to configure your project before you can get the project running.

For more information about importing projects and supported project types, see [Importing projects in Microclimate](./projectimport).

## Build status

The build status shows the current stage of your application in the build lifecycle: **Unknown**, **In Progress**, **Success**, or **Failed**.
1. When you create or import your application the state is **Unknown**.
2. When your application starts building, the state changes to **In Progress**.
3. If your application's build succeeds, the state changes to **Success**.
4. If your application's build fails, the state changes to **Failed**, with an additional error message to describe the type and cause of failure, such as Maven build, or Docker build.
5. Whenever you make a change to your application and a build is kicked off, the state changes back to **In Progress**.

## Application status

The application status shows the current state of your application: **Stopped**, **Starting**, **Running**, or **Stopping**.
1. When you create or import your application the state is **Stopped**.
2. When your application has finished building, and the build is successful, the state changes to **Starting**.
3. After the application starts the state becomes **Running**.  Now you can open your application.
4. If you make a change to your application that requires a build or restart then the application state is initially **Stopping**.  The application then goes through the **Stopped**, **Starting**, **Running** sequence again.
5. If your application goes into the **Stopped** state unexpectedly or stays in **Starting** state longer than expected, check the application logs to see if something went wrong.

## Edit your code
You can use your own editor to edit and test your code. For more information, see [Setting up your own IDE to use with Microclimate](./setting-own-ide). Or, you can use the editor that is shipped with Microclimate by following these instructions.

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

## Disabling development on specific projects
Every active project in Microclimate has a number of resources allocated to it. If you have created a large number of projects, and want to save resources or avoid high CPU usage when you restart Microclimate, you can disable development on a specific project. Disabling project development means that the project will not be built until project development is re-enabled.

To disable project development on a project:
1. From the Projects page, click the project you want to disable.
2. Click **Disable project**.
3. Confirm that you want to disable the project.

To enable a project you have disabled, click the project, click **Enable project**, and then confirm that you want to enable the project. This restarts the application and build containers.
