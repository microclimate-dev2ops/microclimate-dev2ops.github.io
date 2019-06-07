---
layout: docs
title: Troubleshooting
description: Troubleshooting Microclimate
keywords: troubleshooting, issues, workaround, IBM Cloud Private, logs, common problems, Mac, Windows, Linux, Theia, Docker, help, open a new issue, contact us, help, check the logs
duration: 1 minute
permalink: troubleshooting
type: document
order: 60
parent: root
---
<!-- NOTE: The '***' before each level one title adds a line to the final output, which helps this topic to be more readable and easier to consume. -->

# Troubleshooting

The following sections contain workarounds for issues that you might encounter when you use Microclimate. If you don't see your issue here, please check our [GitHub repository](https://github.com/microclimate-dev2ops/microclimate-dev2ops.github.io/issues). If you still don't see your issue, you can open a new issue in the repository or contact us through one of the channels on our [community page](./community).

* [Troubleshooting basics](#troubleshooting-basics)
* [Installing Microclimate locally](#installing-microclimate-locally)
* [Installing on IBM Cloud Private](#installing-on-ibm-cloud-private)
* [Working with Microclimate from your editor](#working-with-microclimate-from-your-editor)
* [Using Microclimate](#using-microclimate)
* [Creating a new project](#creating-a-new-project)
* [Importing a project](#importing-a-project)
* [Using the project view](#using-the-project-view)
* [Understanding Application Metrics](#understanding-application-metrics)
* [Checking the application and build statuses](#checking-the-application-and-build-statuses)
* [Editing your project](#editing-your-project)
* [Committing a new project to GitHub](#committing-a-new-project-to-github)
* [Using a pipeline](#using-a-pipeline)
* [Configuring Microclimate to deploy applications to the IBM Cloud Kubernetes Service](#configuring-microclimate-to-deploy-applications-to-the-ibm-cloud-kubernetes-service)
* [Configuring Microclimate on IBM Cloud Private using NFS to store project data](#configuring-microclimate-on-ibm-cloud-private-using-nfs-to-store-project-data)
* [Connecting Microclimate installation options](#connecting-microclimate-installation-options)
* [Disabling development on specific projects](#disabling-development-on-specific-projects)
* [Uninstalling Microclimate](#uninstalling-microclimate)

<!-- Provide an upfront link to where users can go if they can't figure out how to troubleshoot the problems. Avoid telling them to call IBM support, but you can link to the support website. -->

***
# Troubleshooting basics

## Check the logs
The first step in many troubleshooting scenarios is to check the logs.

If you are running Microclimate locally, use this command to access the logs:
`docker logs <container>`

If you are running Microclimate in IBM Cloud Private, run the `./must-gather.sh` script to gather installation information, including logs. The results are saved to a file in the current directory. For more information and to download this script, see [Microclimate serviceability](https://github.com/microclimate-dev2ops/serviceability/).

Useful logs:
* The `microclimate-file-watcher` container logs show build and deployment errors.
* The `microclimate-portal` and `microclimate-file-watcher` logs show project creation and deletion errors.

The build and application logs for each application are also available through the UI on their own respective tabs.

## Logging communication in the portal UI

1. To activate the logging, visit the Microclimate portal UI. Add the `debug` parameter to the URL, for example, `localhost:9090?debug`, to clear the local storage and start the logging.
2. To view the JSON data that you receive from the portal, open the browser debug console.
3. In Microclimate, click the **Preferences** button. All the log data appears in the console.
4. To save the log into a file, visit the project list page with the `save` parameter, for example, `localhost:9090?save`. All entries in the log are saved in a file.
5. To clear the log, again visit the UI with the `debug` parameter to clear the data and start the log, or enter the `?clear` parameter to clear the log and stop logging.

## Install a logging infrastructure on IBM Cloud Private
If your IBM Cloud Private applications are not working correctly or if you suspect that something might be going wrong, install a logging infrastructure to query the logs. For more information, see [Installing Kibana and filtering Microclimate logs in IBM Cloud Private](installkibanafilter).

## Restart or reinstall Microclimate
If you run Microclimate locally, restart Microclimate with the `~/mcdev stop` command followed by the `~/mcdev start` command.

If you run Microclimate in IBM Cloud Private, click the user icon on the Microclimate screen to log out of and shut down your session. Then, log back in to Microclimate. To restart the Microclimate portal, run the `kubectl get pods` command to find the name of the Microclimate portal pod. Then, run `kubectl delete pods microclimate-ibm-microclimate-<xxxxx>-<xxxx>` to restart it.

If you then try the following proposed solutions and still encounter problems, one or more of the components in your Microclimate installation might be out of date, corrupted, or has stopped working for another reason. In these situations, [update Microclimate](./updating).

***
# Installing Microclimate locally

<!--
Action/Topic: Installing Microclimate locally
Issue type: bug/info
Issue link:
18.10:
-->
## Microclimate does not start
Microclimate might not start because Docker isn't functioning correctly.

**Workaround:** To get Docker working correctly, you can restart Docker, prune images, or clean up old images.

To restart Docker, right-click the Docker symbol in your taskbar and select `Restart`.

To prune Docker images, use the `docker system prune -a` Docker command.

For more information about removing Docker images, including old, dangling, and stopped container images, see the Stack Overflow article, [Docker: What is a dangling image and what is an unused image?](https://stackoverflow.com/questions/45142528/docker-what-is-a-dangling-image-and-what-is-an-unused-image).

<!--
Action/Topic: Installing Microclimate locally
Issue type: bug/info
Issue link:
18.10: Still present
-->
## Install file cannot be loaded because the file is not digitally signed
The `cli\install.ps1` file cannot be loaded, the file is not digitally signed.

The default security settings on Windows 10 and Windows Server 2016 do not allow downloaded PowerShell scripts to run.

**Workaround:** Right-click on the `microclimate.zip` file and open the file **Properties** menu. On the **General** tab, tick the **Unblock** box for the message, "This file came from another computer." Extract the file again and retry the `cli\install.ps1` script.

Alternatively, run `Set-ExecutionPolicy -ExecutionPolicy Unrestricted` in PowerShell to allow unsigned scripts to run.

<!--
Action/Topic : Installing Microclimate locally
Issue type: bug/info
Issue link:
18.10:
-->
## Cannot create container for service because drive has not been shared
Cannot create container for service `microclimate-portal`: Drive has not been shared.

**Workaround:** Ensure that your local disk drive is enabled for sharing in Docker. Open **Docker** -> **Settings** -> **Shared Drives** and select the drive on which you installed Microclimate. Restart Microclimate with the `mcdev start` command.

<!--
Action/Topic : Installing Microclimate locally
Issue type: bug/info
Issue link:
18.10:
-->
## Docker Shared Drive not accepting OS credentials for Windows
When using OS authentication setups (for example, AzureAD), Docker Shared Drive might not accept your OS credentials.

**Workaround:** Create a new user account.
1. Navigate to **Settings** -> **Accounts** -> **Family & other people** -> **Add someone else to this PC** -> **I don't have this person's sign-in information** -> **Add a user without a Microsoft account**.
2. Create the new account with the same username but without the prefix (for example, if your AzureAD account is `AzureAD/BobSmith`, your new local account should be `BobSmith`). Use the same password as your other account.
3. Select your new local account and click **Change account type**. Select the dropdown menu and select **Administrator**. Share the drive again in Docker.

<!--
Action/Topic: Installing Microclimate locally
Issue type: bug/info
Issue link:
18.10:
-->
## Docker container crashes unexpectedly
Your Docker container might crash unexpectedly.

**Workaround:** For tips about how to debug a crashed container image, see the Medium.com article, [5 ways to debug an exploding Docker container](https://medium.com/@pimterry/5-ways-to-debug-an-exploding-docker-container-4f729e2c0aa8).

***
# Installing on IBM Cloud Private

<!--
Action/Topic: Installing on IBM Cloud Private
Issue type: info
Issue link: none
19.02: Still an issue
-->
## Microclimate pod does not show up on IBM Cloud Private 3.1.0
If Microclimate was installed on IBM Cloud Private 3.1.0 without the `global.useSecurityContext` flag set to `false`, the Microclimate pod might not start.

**Workaround:** Reinstall Microclimate with `global.useSecurityContext` set to `false`.

***
# Working with Microclimate from your editor

<!--
Action/Topic: Setting up your own IDE to use with Microclimate
Issue type: bug
Issue link: https://github.ibm.com/dev-ex/iterative-dev/issues/111
18.12: Still an issue
-->
## Auto-build is enabled, but project is not rebuilt on file change

Auto-build does not work on Windows. Docker for Windows does not allow Microclimate to automatically detect file changes on shared volumes. For more information, see [this issue](https://github.com/docker/for-win/issues/56). You must use one of the following workarounds.

### **Workarounds for all platforms:**
- Request a manual project build through either of the [IDE plugins](settingownide) or through the **Build** button on the **Overview** page.
- Make your changes in the Microclimate Theia editor. Theia edits the files directly in the Docker container of the project, working around any Docker volume issues.

### **Fixes for non-Windows platforms:**
- Restart Microclimate.
- Stop Microclimate, then run [`docker system prune -a`](https://docs.docker.com/engine/reference/commandline/system_prune/).
  - **Warning**: This command deletes all stopped containers, networks, images, and caches.
- If the issue persists despite trying the previous fixes, stop Microclimate and then do a factory reset of your Docker installation.
  - **Warning**: The factory reset deletes all Docker containers, images, and settings. Use this extreme option only if all other options did not work.

<!--
Action/Topic: Repeated redirects and you cannot log in to portal when accessing dashboard
Issue type: bug
Issue link: https://github.ibm.com/dev-ex/landing-pages/issues/1093
19.05: New issue
-->
## Repeated browser redirects and you cannot log in to Microclimate Portal
Microclimate is completely inaccessible, you experience repeated browser redirects, and you cannot log in.

**Workaround:** Set the `global.icpTarget` parameter to the version of IBM Cloud Private into which you are installing Microclimate. To do this, either set it in an overrides file, or set it on the Helm command line at Helm install time by adding the `--set global.icpTarget=312` command.

***
# Using Microclimate

<!--
Action/Topic: Using Microclimate
Issue type: bug/info
Issue link:
18.10:
-->
## An error occurred while attempting to store the license status
When you start Microclimate on Windows, this message might be issued when you accept the Microclimate license.

**Workaround:** Ensure that your local disk drive is enabled for sharing in Docker. Open `Docker`->`Settings`->`Shared Drives`. Then, restart Docker for Windows.

***
# Creating a new project

<!--
Action/Topic: Creating a new project
Issue type: bug/info
Issue link:
18.10:
-->
## Node.js generator fails to start
The Node.js generator might fail to start for several different reasons.
View the logs to find out why:
```
docker logs microclimate-file-watcher
```

The Node.js container that is generated by Microclimate might not be able to access the internet, blocking npm from running.

**Workaround:** Check your internet access.

The Docker runtime on your local machine might not be functioning correctly.

**Workaround:** Restart Docker.

<!--
Action/Topic: Creating a new project
Issue type: bug/info
Issue link:
18.10: Still an issue
-->
## Node.js app with addons selected fails to start
The Node.js app with add-ons selected, for example, Mongo and Redis, fails to start. Some of the add-ons can cause the Node.js app build to fail because they try to dial nonexistent IP addresses out of the box. For example:
```
Error: Redis connection to hostname.dblayer.com:11111 failed - connect javascript:;ECONNREFUSED 52.90.100.35:11111) out of the box.
```

**Workaround:** Reconfigure the add-ons with valid IP addresses.

<!--
Action/Topic: Creating a new project and/or Checking the application and build statuses
Issue type: bug/info
Issue link:
18.10:
-->
## Projects created never start after installing Microclimate
Intermittently, after installing Microclimate on Windows, projects can be created, but they never start and instead remain in the **Starting** state. A Docker issue for Windows exists where, although it shows a volume is mounted, it does not allow any writing to the volume. To check if this issue is present, verify that a `microclimate-workspace` directory doesn't exist within the directory from which you ran the Microclimate installation.

**Workaround:** This issue can appear for many reasons, so you have many possible workarounds. First, open the `Docker`->`Settings`->`Shared Drives` directory to confirm that you have a shared drive. If you have one selected, unselect it, click **Apply**, and then try creating projects again. If you're still noticing the problem, and you're using an ID for the shared drive that is not your current user, check that the ID being used doesn't have an expired password that requires a password reset. Reset the password if necessary. If resetting the password doesn't solve the problem, you can remove Microclimate with the `mcdev delete` command, ensuring Docker for Windows shows a mounted drive selected, and then restart Microclimate with the `mcdev start` command.

<!--
Action/Topic: WebSphere Liberty Docker image now runs as non-root
Issue type: info
Issue link: dev-ex/iterative-dev#634
18.10: Fixed
-->
## Microclimate Liberty projects are broken
Liberty projects in Microclimate releases prior to Version 18.11 fail on the application build because the `websphere-liberty` Docker image currently runs as a non-root user.

**Workaround:** Install Microclimate 18.11 or a subsequent version. If you have an existing Microclimate Liberty application, edit your `Dockerfile-build` file and declare the `ENV HOME /home/default` environment variable. Then, replace all occurrences of `/root` and `/opt` with `$HOME`.

You also need to update your Dockerfile by adding the following code after the `COPY` command and before the `RUN` command:
```
USER root
RUN chmod g+w /config/apps
USER 1001
```

If you enabled application metrics in your application, edit your Dockerfile.
Remove the following line:
```
RUN /opt/ibm/wlp/usr/extension/liberty_dc/bin/config_liberty_dc.sh -silent /opt/ibm/wlp/usr/extension/liberty_dc/bin/silent_config_liberty_dc.txt
```
Then, replace it with the following environment variable:
```
ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/lib:/opt/ibm/wlp/usr/extension/liberty_dc/toolkit/lib/lx8266 \ JVM_ARGS="$JVM_ARGS -agentlib:am_ibm_16=defaultServer -Xbootclasspath/p:/opt/ibm/wlp/usr/extension/liberty_dc/toolkit/lib/bcm-bootstrap.jar -Xverbosegclog:/logs/gc.log,1,10000 -verbosegc -Djava.security.policy=/opt/ibm/wlp/usr/extension/liberty_dc/itcamdc/etc/datacollector.policy -Dliberty.home=/opt/ibm/wlp"
 ```

For more information about Liberty non-root support, see the `websphere-liberty` [official repository](https://hub.docker.com/_/websphere-liberty/).

<!--
Action/Topic: Swift projects fail to build on ppc64le
Issue type: info
Issue link: https://github.ibm.com/dev-ex/platform-pLinux/issues/7
18.10:
-->
## Swift projects fail to build on Linux® on Power® (ppc64le)
Swift project are not supported on Linux® on Power® (ppc64le) and will fail to build.

<!--
Action/Topic: Creating a Microprofile type project.
Issue type: bug/info
Issue link: https://github.ibm.com/dev-ex/iterative-dev/issues/1091
19.05: Info added in 19.05.
-->
## Microprofile projects do not start
When creating a Microprofile project through the create wizard, the projects do not go to the `Started` state because of the missing `unzip` tool.

**Workaround:** The issue occurs when the Microprofile project template does not have unzip installed for the project container. You will need to install unzip during the project's Docker builds. This can be done by adding the line `RUN if [ -z $(which unzip) ]; then apt update; apt install -y unzip; fi` to the project Dockerfile.

# Importing a project

<!--
Action/Topic: Importing a project.
Issue type: bug/info
Issue link:
18.10:
-->
## Imported project never builds or starts
To view the status of the imported project, enter the following command:
```
docker logs microclimate-file-watcher
```

**Workaround:** If you see the following messages, the imported project is likely not a valid Microclimate project.
```
build-log requested, no build log found for project <project name>
build-log requested, no build log found for project <project name>
build-log requested, no build log found for project <project name>
build-log requested, no build log found for project <project name>
No containerId for running project <project name>
```

For more information about valid Microclimate projects, see [Imported projects and supported project types](importedprojects).

<!--
Action/Topic: Importing a project.
Issue type: bug/info
Issue link: https://github.ibm.com/dev-ex/iterative-dev/issues/1066
19.03: Info added in 19.03.
-->
## Cannot restart a Node.js project in debug mode
A 19.02 or earlier Node.js project that was generated by Microclimate fails to restart in debug mode.

**Workaround:** This issue occurs when an application is based on a 19.02 or earlier Node.js template. To upgrade your Node.js application with Microclimate, update the old [`package.json`](https://github.com/microclimate-dev2ops/nodeExpressTemplate/blob/master/package.json) file with the new values from the newly generated `package.json` file. The updated Node.js template includes the `nodemon` utility as a development dependency. Copy the `start`, `debug`, `debug:brk`, `debug:legacy`, `test`, and `dev` scripts that are included with the new template project to your older project and upgrade the Node.js engine version.

***
# Using the project view

<!--
Action/Topic: Using the project view
Issue type: bug/info
Issue link:
18.10:
Platform: IBM Cloud Private
-->
## Microclimate Node.js port is an internal IP address and is not accessible
For IBM Cloud Private clusters that are built on OpenStack environments with floating IP addresses, the Microclimate portal Node.js port that appears in the Helm installation notes and on the IBM Cloud Private Services view might have an IP address that is internal to the IBM Cloud Private cluster. This IP address is not accessible in your browser.

**Workaround:** You can access Microclimate by replacing the internal IP portion of the Microclimate URL with the external IBM Cloud Private cluster IP address. Obtain the external IP address with the `kubectl cluster-info` command. The recommended permanent solution is to specify the `proxy_access_ip` when configuring IBM Cloud Private in an OpenStack environment. For more information, see [Cluster configuration settings](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/installing/config_yaml.html).

***
# Understanding Application Metrics

<!--
Action/Topic: Understanding application metrics
18.10: Still an issue (Toby)
-->
## Application Monitoring unavailable after Project Import
After importing an application, when you click `App Monitor`, the dashboard is not displayed and results in a `Cannot GET /appmetrics-dash/` error. If this error appears, the application was not created by Microclimate or previously had AppMetrics integration.

**Workaround:** Enable AppMetrics for your application. You can enable AppMetrics for [Node.js](https://developer.ibm.com/node/monitoring-post-mortem/application-metrics-node-js/), [Swift](https://developer.ibm.com/swift/monitoring-diagnostics/application-metrics-for-swift/), and [SpringBoot](https://github.com/RuntimeTools/javametrics#spring-boot) projects.

<!--
Action/Topic: Understanding application metrics
Issue type: info
Issue link: https://github.ibm.com/dev-ex/landing-pages/issues/923
19.03: Info added in 19.03.
-->
## Profiling markers do not appear
If you have the Microclimate Language Server for Node.js Profiling extension enabled and have run a load test, profiling markers still might not appear. Ensure that your project and load run conform to the following requirements to use profiling:
- Your project exists in Theia or VS Code. Profiling is available only in Theia and VS Code.
- Your project is a Node.js project that was created through Microclimate.
- Your project has `Run Load` executed on it.
- The load run successfully completed. Profiling data is written to the `load-test/<datestamp>/profiling.json` file in your Microclimate project only on a successfully completed load run. If the load run was cancelled, it won't be written to the workspace.
- The load run ran for a minimum of 45 seconds to gather enough profiling data to generate the `profiling.json` file.
- If a function runs quickly, in less than 5 milliseconds with the default configuration, then the function might not run during any of the samples, so it might not be included in the profiling data for that load run.
- Profiling is not disabled. To enable profiling, access the profiling in one of the following ways:
  - Right-click in the editor and select `Toggle Profiling`.
  - Open the command palette with `cmd+shift+p` on a Mac or `ctrl+shift+p` on Windows. Then, select `Microclimate: Profiling: Toggle Profiling`.
  - Toggle the `Microprofile Profiling: Show Profiling` setting in the extensions settings.

**Workaround:** Review the preceding list and ensure that your project conforms to all of the items in the list.

***
# Checking the application and build statuses

<!--
Action/Topic: Checking the application and build statuses
Issue type: bug
Issue link: https://github.ibm.com/dev-ex/iterative-dev/issues/459
18.10: Still an issue
-->
## Microprofile project gets updated twice upon file change
If you modify files in Microprofile projects, sometimes the project gets double updates. You might see the application status changed from **Running** to **Stopped** twice. If you notice this status change, the default polling rate, which is 500 ms, is too short for the application monitor.

**Workaround:** Increase the polling rate in the `server.xml` file to 1000 ms or longer.
```
<applicationMonitor pollingRate="1000ms" />
```

<!--
Action/Topic: Checking the application and build statuses
Issue type: bug
Issue link: https://github.ibm.com/dev-ex/iterative-dev/issues/459
18.10: Still an issue (Jag)
Platform: IBM Cloud Private
-->
## All projects fail to build
If several projects exist in the Microclimate workspace, Microclimate might fail to build them if the file-watcher container is restarted. The builds fail because of the default resource constraints that are specified in the Microclimate Helm chart.

**Workaround:** Increase the amount of RAM and CPU available to the file-watcher container in the Microclimate chart to values of your choosing. Then, upgrade your existing Helm release. You can update the resource values and upgrade the Microclimate chart installation from the Helm CLI with the following instructions.

### Helm CLI

  `helm repo add ibm-charts-public https://raw.githubusercontent.com/IBM/charts/master/repo/stable`

  `helm upgrade microclimate -f overrides.yaml ibm-charts-public/ibm-microclimate --reuse-values --tls`

  A sample `overrides.yaml` file can contain these values:

```
  filewatcher:
    resources:
      requests:
        memory: 1Gi
        cpu: 1000m
      limits:
        memory: 4Gi
        cpu: 2000m
```

Delete both the file-watcher and portal pods after the upgrade to have them recreated:

```
   kubectl get pods
   kubectl delete pods admin-microclimate-editorfilewatcher-<xxxxx> microclimate-ibm-microclimate-<xxxxx>
```

These commands upgrade the Microclimate file-watcher container with the resources it needs to build and deploy more projects into IBM Cloud Private.

<!--
Action/Topic: Importing project and/or Checking the application and build statuses
Issue type: bug/info
Issue link:
18.10:
Platform: IBM Cloud Private
-->
## Imported Microprofile project does not start in IBM Cloud Private
After following the [project import instructions](projectview) to import a Microprofile project, the project does not start. If a port other than 9080 is configured, the project state cannot be determined.

**Workaround:** Configure the Maven `pom.xml` file and the Liberty server configuration files, for example, the `server.xml` file, to specify port 9080 for the application. Also ensure the `Dockerfile-build` has an `EXPOSE 9080` instruction line to ensure the port is accessible from the application container.

<!--
Action/Topic: Importing projects and supported project types and/or Checking the application and build statuses
Issue type: bug/info
Issue link:
18.10:
Platform: IBM Cloud Private
-->
## Swift projects fail to build on IBM Cloud Private
If your IBM Cloud Private cluster has a Docker version earlier than 17.05, Swift projects fail to build.

**Workaround:** Upgrade Docker to the latest Docker Community Edition (CE) image. For more information, see [Docker guides](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1).

<!--
Action/Topic: Importing projects and supported project types and/or Checking the application and build statuses
Issue type: bug/info
Issue link:
18.10:
-->
## Swift container failing to build
Look at the `icp-mc.log` file with the following command:
```
kubectl logs <microclimate-instance> microclimate-file-watcher > icp-mc.log
```

If the Swift container is failing to build, the Swift generators are building multi-stage Dockerfiles that are not compatible with IBM Cloud Private.

**Workaround:** Upgrade Docker to the latest Docker Community Edition (CE) image. For more information, see [Docker guides](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1).

To see the latest Docker versions that are supported by IBM Cloud Private, see [Supported Docker versions](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0.3/supported_system_config/supported_docker.html).

<!--
Action/Topic: Checking the application and build statuses
Issue type: bug/info
Issue link:
18.10:
-->
## Project build fails with Docker build failed message
The project build can fail if the Docker image build fails. The Docker build logs are not currently exposed in the UI.

**Workaround:** To see if the Docker image build failed, look at the Docker build output by checking the `microclimate-file-watcher` container logs.
* Local: `docker logs <container id of microclimate-file-watcher>`
* IBM Cloud Private: `kubectl logs <microclimate-pod> --container=microclimate-file-watcher`

<!--
Action/Topic: Checking the application and build statuses
Issue type: bug ?
Issue link: https://github.ibm.com/dev-ex/portal-ui/issues/353
18.10: Still an issue
-->
## Application stays in starting state
If a problem occurs with the application and it fails to start, it might stay in starting state.

**Workaround:** Check the application logs to find out why the application did not start. Then, make changes to the application to fix the problem. If automatic build is enabled, a new build starts. Otherwise, start a new build manually by clicking the **Build** button.

<!--
Action/Topic:
Issue type: bug ?
Issue link: https://github.ibm.com/dev-ex/iterative-dev/issues/947
19.03: Issue forecast to be fixed for 19.04
-->
## Java projects not restarting after cluster restart
After a cluster restart, your Java projects are not restarting automatically.

**Workaround:** Click on your Java project, and then go to the Overview page. Click **Disable project**, and then click **Enable project**. This successfully restarts your Java project.

***
# Editing your project

<!--
Action/Topic: Editing your project
Issue type: bug/info
Issue link:
18.10:
-->
## Edit code view does not show

Sometimes the **Edit code** view doesn't display correctly. When you click the **Edit code** tab, you see only an empty space where the code editor should be.

**Workaround:** Stop and start Microclimate with the following commands:
```
~/mcdev stop
~/mcdev start
```

<!--
Action/Topic: Editing your project
Issue type: bug/info
Issue link: https://github.ibm.com/dev-ex/iterative-dev/issues/1116
19.05: Still an issue
-->
## Error message appears when an `.mc-settings` file is created or modified
You might receive `settings update failed` events if you create or enable a project that is not debuggable and create or modify the `.mc-settings` file:
```
error:"BAD_REQUEST: The project does not support debug mode."
```

**Workaround:** The `.mc-settings` file for a project does not support debug mode or projects on IBM Cloud Private. Remove the `internalDebugPort` field in the `.mc-settings` file to avoid the error.

<!--
Action/Topic: Editing your project
Issue type: bug
Issue link: https://github.ibm.com/dev-ex/theia/issues/3
18.10: Still an issue
-->
## Theia editor might not work correctly in Microsoft Edge
Theia, the open source code editor used by Microclimate, currently has limited support for Microsoft Edge. The Theia team is aware of the issue and is working to fix it. All other functionality in Microclimate is fully supported in Microsoft Edge, including performance, pipeline, and so on.

**Workaround:** Use a different web browser.

<!--
Action/Topic: Editing your project
Issue type: bug
Issue link: https://github.ibm.com/dev-ex/theia/issues/1
18.10: Still an issue
-->
## Theia container leaking memory
If allowed to stay up and running, over time, the Theia container in Microclimate leaks memory. The Theia team is aware of this issue and is currently pursuing a fix. For more information, see [Virtual memory usage continuously grows](https://github.com/theia-ide/theia/issues/1284).

**Workaround:** In Microclimate, reload the Theia editor to release memory.

<!--
Action/Topic: Editing your project
Issue type: bug/info
Issue link:
18.10:
-->
## New projects sometimes do not show in Theia hierarchy view
Sometimes when a new project is created, it doesn't show up in the Theia hierarchy view.

**Workaround:** In Microclimate, refresh the page in the browser.

***
# Committing a new project to GitHub

<!--
Action/Topic: Committing a new project to GitHub
Issue type: bug
Issue link: https://github.ibm.com/dev-ex/theia/issues/21
18.10: still an issue
-->
## Code changes not updated in Git
The changes you make to your code do not get reflected in the `Edit Code` view in Git.

**Workaround:** Change the Git repo you are pointing to in the Theia editor. Alternatively, you can disable the `Show all projects` setting at the `https://microclimate.<icp-proxy.xip.io>/?preferences=true` URL.

***
# Using a pipeline

<!--
Action/Topic: Using a pipeline
Issue type: bug
Issue link: https://github.ibm.com/dev-ex/devops-planning/issues/541
19.02: still an issue
Platform: IBM Cloud Private
-->
## The Jenkins build fails for a Git repository URL that includes a user name and password or API token
When creating a pipeline, the Jenkins build fails if the **Git repository** field is filled with a project URL with the format `https://USERNAME:API_TOKEN@github.com/USERNAME/PROJECT.git`, where `USERNAME` is your username, and `API_TOKEN` is your password or API token.

**Workaround:** Fill the **Git repository** field with your project URL, but don't include your user name and password or API token. For example, instead of using `https://USERNAME:API_TOKEN@github.com/USERNAME/PROJECT.git` for the URL, use `https://github.com/USERNAME/PROJECT.git` instead. Find this URL in your project repository in the **Clone with HTTPS** option. If your project is in a private repository, you can create credentials in Microclimate by using your API token or your user name and password.

<!--
Action/Topic: Using a pipeline: Configuring webhooks
Status updates:
18.10: Updated to reflect new certificate use (Aki)
-->
## Webhooks not triggering Jenkins builds
Webhooks that are automatically created by Microclimate are configured so that SSL validation is disabled. If you manually create a webhook or modify an existing webhook to use SSL validation, the webhook might fail to trigger Jenkins jobs because IBM Cloud Private signs a certificate on the Jenkins Kubernetes ingress definition.

**Workaround:** If you need SSL validation on your webhooks, obtain and use a certificate authority (CA) signed certificate with your Microclimate installation.

You might also be able to import the self-signed certificate into your client trustStore if you host your own Git repository. In this situation, contact your Git administrator. For reference, see ["Troubleshooting SSL errors" on the GitHub Enterprise documentation](https://help.github.com/enterprise/2.15/admin/guides/installation/troubleshooting-ssl-errors) and ["SSL Configuration" on the GitLab documentation](https://docs.gitlab.com/omnibus/settings/ssl.html).

<!--
Action/Topic: Using a pipeline
Issue type: bug/info
Issue link:
18.10:
Platform: IBM Cloud Private
-->
## Jenkins fails to mount persistent volume
If Jenkins is configured to use an existing persistent volume of less that 7 GB, it fails to mount that volume. By default an 8 GB persistent volume is used.

**Workaround:** Check the persistent volume size. Either increase the size to at least 7 GB or use the default persistent volume.

<!--
Action/Topic: Using a pipeline
Issue type: bug
Issue link: https://github.ibm.com/dev-ex/devops-planning/issues/288
18.10: still an issue
Platform: IBM Cloud Private
-->
## Open pipeline results in 404 Not Found
Immediately after creating a new pipeline, clicking **Open pipeline** might result in a `404 Not found` page after logging into Jenkins.

**Workaround:** The Jenkins job is created asynchronously. Periodically refresh this page in the browser until the job is created, and the page returns successfully.

<!--
Action/Topic: Using a pipeline
Issue type: bug/info
Issue link:
18.10:
Platform: IBM Cloud Private
-->
## Broken pipeline links
You might encounter a broken link if you try to access a newly created pipeline.

**Workaround:** Wait a moment before trying to access the page again. If the link does not become available, delete and recreate the pipeline.

***
# Configuring Microclimate to deploy applications to the IBM Cloud Kubernetes Service

<!--
Action/Topic: Configuring Microclimate to deploy applications to the IBM Cloud Kubernetes Service
Issue type: bug/info
Issue link:
18.10:
Platform: IBM Cloud Private
-->
## Unable to deploy applications or deployed applications not appearing
Your Helm secret certificate might have expired if you are unable to deploy applications to the IBM Cloud Private tiller, your deployed applications are not appearing in Helm releases, you see errors in the DevOps logs, or nothing gets deployed through the pipeline. On IBM Cloud Private 2.1.0.3, the certificate lasts for 90 days. If the certificate didn't expire, the cluster configuration secret might not have been created correctly.

**Workaround:** If the Helm secret certificate expired, regenerate the `microclimate-helm-secret` with the following procedure:

1. Log in. For example:
```
bx pr login -a https://mycluster.icp:8443
```

2. Regenerate the secret.
```
kubectl create secret generic microclimate-helm-secret --from-file=cert.pem=<user path>/.helm/cert.pem --from-file=ca.pem=<user path>/.helm/ca.pem --from-file=key.pem=<user path>/.helm/key.pem
```

**Workaround:** If the cluster configuration secret wasn't created correctly, re-create the cluster configuration. During the re-creation, the following remarks help to correctly create the secret:
```
kubectl create secret generic <secret_name> \
  --from-file=kube-config.yml=<yaml_file>.yml \
  --from-file=<certificate_file>.pem
```
1. View the contents of the `<yaml_file>.yml` and ensure that only one cluster is defined in the file.
2. Ensure that the argument contains `yml` instead of `yaml`. This example shows the correct format of the argument: `--from-file=kube-config.yml=<yaml_file>.yml`

***
# Configuring Microclimate on IBM Cloud Private using NFS to store project data

<!--
Action/Topic: Configuring Microclimate on IBM Cloud Private using NFS to store project data
Issue type: bug/info
Issue link: https://github.ibm.com/dev-ex/landing-pages/issues/736
19.02
Platform: IBM Cloud Private
-->
Microclimate Portal is able to run generators and create files but the logs for the portal container show that it is then unable to `chown` them to root. Jenkins does not start.

**Workaround:**  Add the `no_root_squash` flag to `/etc/exports` and then reload the NFS configuration on the NFS server. After updating the `/etc/exports` file, restart the NFS server.

***
# Connecting Microclimate installation options

<!--
Action/Topic: Connecting Microclimate installation options
Issue type: bug/info
Issue link:
18.10: Still an issue: Update for ICP 3.1
Platform: IBM Cloud Private
-->
## Microclimate on localhost not connecting to remote Microclimate in IBM Cloud Private
Make sure you deploy Microclimate to IBM Cloud Private.

**Workaround:** In your local Microclimate instance, check that the URL you use to connect to the IBM Cloud Private instance is of a similar format to the following URL and not the IBM Cloud Private console URL.
`https://microclimate.<ICP proxy>.nip.io/`

If this URL returns a `500 Internal Server Error` message, check to make sure that you have the correct Microclimate version to connect to Microclimate in IBM Cloud Private.
* For IBM Cloud Private 3.1.0, you need Microclimate 18.09 or later.
* For IBM Cloud Private 2.1.0.3, you need Microclimate 18.05 to 18.08.

Microclimate 18.05 (ibm-charts/ibm-microclimate/1.2.1) on IBM Cloud Private 2.1.0.3 does not use user and password authentication for the remote connection. For example, enter `admin/admin`.

To view the logs, use the following command:
```
docker logs -f microclimate-portal
```

***
# Disabling development on specific projects

<!--
Action/Topic: Disabling development on specific projects
Issue type: bug/info
Issue link:
18.10:
-->
## Turning off auto build has no effect for Node.js projects when you run Microclimate locally
If you turn off `auto build` for a Node.js project when you run Microclimate locally, it has no effect. Changes you make to your code automatically start or restart a build even though `auto build` is disabled.

***
# Uninstalling Microclimate

<!--
Action/Topic: Uninstalling Microclimate creates hanging delete jobs
Issue type: bug/info
Issue link: https://github.ibm.com/dev-ex/microclimate/issues/2163
18.10:
-->
## Uninstalling Microclimate creates hanging delete jobs
If you enter the `helm delete --purge microclimate --tls` command to uninstall Microclimate on IBM Cloud Private, you might see the following error:
```
{USER}:~# helm delete --purge microclimate --tls
Error: Job failed: BackoffLimitExceeded
```

**Workaround:** Enter the `helm delete --purge microclimate --tls --no-hooks` command to remove any leftover jobs or elements.
* Check that the `kubectl get jobs` command returns empty.
* Delete lingering Persistent Volume Claims if they appear when you run the `kubectl get pvc` command.
* Check that the Persistent Volumes were deleted with the `kubectl get pv` command.
