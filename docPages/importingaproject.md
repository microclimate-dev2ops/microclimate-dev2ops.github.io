---
layout: document
title: Importing Projects
description: Documents
keywords: import, projects, dockerfile, github, deploy, status
duration: 1 minute
permalink: importingaproject
type: document
---

To import a project into your Microclimate workspace:
1. Click the **Import project** button on the Welcome page. If you have already created or imported a project, in the Microclimate header, click **Projects**, and then click **Import project**.
2. Select the location from which you want to import your project. You can choose from a remote Git repository, a local project folder, or a project archive on your machine. If you use a remote Git repository, paste the HTTPS clone of the Git link into the text field.
3. Click **Next**.
4. Enter the name and any required information depending on the option you choose in the previous step, then click **Next**.
5. The project is validated. One of the following occurs:
* The project matched one of the supported project types, so it is auto-detected and you can click **Import**.
* The project type could not be determined or isn't the correct type for your project, and you must select a project type.
* Validation reports that the project is missing required files. You can select the option to generate the missing files or continue with the import. **Note:** The generated files are likely to be needed to configure your project before you can get the project running.

For more information about imported projects and supported project types, see [Imported projects and supported project types](./importedprojects).
