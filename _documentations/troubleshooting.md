---
layout: docs
title: Troubleshooting
description: Troubleshooting Microclimate
keywords: troubleshooting, issues, workaround, IBM Cloud Private, logs, common problems, Mac, Windows, Linux, Theia, Docker, help
duration: 1 minute
permalink: troubleshooting
type: document
order: 60
parent: root
---
<!-- NOTE: The '***' before each level one title adds a line to the final output, which helps this topic to be more readable and easier to consume. -->

# Troubleshooting
Microclimate is made of many components to provide a unique development experience. Consider how these components work together as you attempt to isolate the problem by using the information in the following sections.
* [Troubleshooting basics](#troubleshooting-basics)
* [Installing Microclimate locally](#installing-microclimate-locally)
* [Setting up your own IDE to use with Microclimate](#setting-up-your-own-ide-to-use-with-microclimate)
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
* [Connecting Microclimate installation options](#connecting-microclimate-installation-options)
* [Disabling development on specific projects](#disabling-development-on-specific-projects)
* [Uninstalling Microclimate](#uninstalling-microclimate)

<!-- Provide an upfront link to where users can go if they can't figure out how to troubleshoot the problems. Avoid telling them to call IBM support, but you can link to the support website. -->

### Need help?
If you need help, or if you experience a problem that is not listed, please contact us. You can open an issue in our [GitHub repository](https://github.com/microclimate-dev2ops/microclimate-dev2ops.github.io) or see our [community page](./community) for more information.

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

## Logging communication in the portal UI.

1. To activate the logging, visit the Microclimate portal UI. Add the `debug` parameter to the URL, for example, `localhost:9090?debug`, to clear the local storage and start the logging.
2. To view the JSON data that you receive from the portal, open the browser debug console.
3. In Microclimate, click the **Preferences** button. All the log data appears in the console.
4. To save the log into a file, visit the project list page with the `save` parameter, for example, `localhost:9090?save`. All entries in the log are saved in a file.
5. To clear the log, again visit the UI with the `debug` parameter to clear the data and start the log, or enter the `?clear` parameter to clear the log and stop logging.

## Install a logging infrastructure on IBM Cloud Private
If your IBM Cloud Private applications are not working correctly or if you suspect that something might be going wrong, install a logging infrastructure to query the logs. For more information, see [Installing Kibana and filtering Microclimate logs in IBM Cloud Private](installkibanafilter).

## Restart or reinstall Microclimate
Restart Microclimate with the `~/mcdev stop` command followed by the `~/mcdev start` command.

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

**Workaround** To get Docker working correctly, you can restart Docker, prune images, or clean up old images.

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

<!--
Action/Topic : Installing Microclimate locally
Issue type: bug/info
Issue link:
18.10:
-->
## Cannot create container for service because drive has not been shared
Cannot create container for service `microclimate-portal`: Drive has not been shared.

**Workaround:** Ensure that your local disk drive is enabled for sharing in Docker. Open `Docker`->`Settings`->`Shared Drives` and select the drive on which you installed Microclimate. Restart Microclimate with the `mcdev start` command.

<!--
Action/Topic: Installing Microclimate locally
Issue type: bug/info
Issue link:
18.10:
-->
## Standard init Linux exec format error
Linux reports `standard_init_linux.go:195`: exec user process caused "exec format error".

Microclimate Docker images are available for x86-64 architectures only. On other Linux architectures, Microclimate fails to start and places this error message in the Microclimate Docker container logs.

<!--
Action/Topic: Installing Microclimate locally
Issue type: bug/info
Issue link:
18.10:
-->
## Docker container crashes unexpectedly
Your Docker container might crash unexpectedly.

**Workaround** For tips about how to debug a crashed container image, see the Medium.com article, [5 ways to debug an exploding Docker container](https://medium.com/@pimterry/5-ways-to-debug-an-exploding-docker-container-4f729e2c0aa8).

***
# Setting up your own IDE to use with Microclimate

<!--
Action/Topic: Setting up your own IDE to use with Microclimate
Issue type: bug
Issue link: https://github.ibm.com/dev-ex/iterative-dev/issues/111
18.10: Still an issue
-->
## Editing project files using an external IDE editor does not deploy changes to the server
Changes to project files using an external IDE/editor are not reflected on the running application.

**Workaround:** Edit the same files in the Microclimate Theia editor to build and deploy the changes to the server.

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

**Workaround** Check your internet access.

The Docker runtime on your local machine might not be functioning correctly.

**Workaround** Restart Docker.

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

**Workaround** Reconfigure the add-ons with valid IP addresses.

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

**Workaround** Install Microclimate 18.11 or a subsequent version. If you have an existing Microclimate Liberty application, edit your `Dockerfile-build` file and declare the `ENV HOME /home/default` environment variable. Then, replace all occurrences of `/root` and `/opt` with `$HOME`.

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

**Workaround** If you see the following messages, the imported project is likely not a valid Microclimate project.
```
build-log requested, no build log found for project <project name>
build-log requested, no build log found for project <project name>
build-log requested, no build log found for project <project name>
build-log requested, no build log found for project <project name>
No containerId for running project <project name>
```

For more information about valid Microclimate projects, see [Imported projects and supported project types](importedprojects).

<!--
Action/Topic: Deleting a project
Issue type: bug/info
Issue links: https://github.ibm.com/dev-ex/portal-ui/issues/359
landing-pages https://github.ibm.com/dev-ex/landing-pages/issues/638
18.11:
-->

## Importing a project with the same name as a recently deleted project fails
This can happen when deleting a project fails and leaves files in a target directory. When you delete the project, and then try to import the project again, you see failure to import the project together with an error message that tells you that the target directory is not empty.  

**Workaround** Manually delete the files and retry the import.  

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

**Workaround:**
You can access Microclimate by replacing the internal IP portion of the Microclimate URL with the external IBM Cloud Private cluster IP address. Obtain the external IP address with the `kubectl cluster-info` command. The recommended permanent solution is to specify the `proxy_access_ip` when configuring IBM Cloud Private in an OpenStack environment. For more information, see [Cluster configuration settings](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/installing/config_yaml.html).

***
# Understanding Application Metrics

<!--
Action/Topic: Understanding application metrics
18.10: Still an issue (Toby)
-->
## Application Monitoring unavailable after Project Import
After importing an application, when you click `App Monitor`, the dashboard is not displayed and results in a `Cannot GET /appmetrics-dash/` error. If this error appears, the application was not created by Microclimate or previously had AppMetrics integration.

**Workaround**
Enable AppMetrics for your application. You can enable AppMetrics for [Node.js](https://developer.ibm.com/node/monitoring-post-mortem/application-metrics-node-js/), [Swift](https://developer.ibm.com/swift/monitoring-diagnostics/application-metrics-for-swift/), and [SpringBoot](https://github.com/RuntimeTools/javametrics#spring-boot) projects.

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

**Workaround** Configure the Maven `pom.xml` file and the Liberty server configuration files, for example, the `server.xml` file, to specify port 9080 for the application. Also ensure the `Dockerfile-build` has an `EXPOSE 9080` instruction line to ensure the port is accessible from the application container.

<!--
Action/Topic: Importing projects and supported project types and/or Checking the application and build statuses
Issue type: bug/info
Issue link:
18.10:
Platform: IBM Cloud Private
-->
## Swift projects fail to build on IBM Cloud Private
If your IBM Cloud Private cluster has a Docker version earlier than 17.05, Swift projects fail to build.

**Workaround** Upgrade Docker to the latest Docker Community Edition (CE) image. For more information, see [Docker guides](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1).

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

**Workaround** Upgrade Docker to the latest Docker Community Edition (CE) image. For more information, see [Docker guides](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1).

To see the latest Docker versions that are supported by IBM Cloud Private, see [Supported Docker versions](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0.3/supported_system_config/supported_docker.html).

<!--
Action/Topic: Checking the application and build statuses
Issue type: bug/info
Issue link:
18.10:
-->
## Project build fails with Docker build failed message
The project build can fail if the Docker image build fails. The Docker build logs are not currently exposed in the UI.

**Workaround** To see if the Docker image build failed, look at the Docker build output by checking the `microclimate-file-watcher` container logs.
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

**Workaround** Check the application logs to find out why the application did not start. Then, make changes to the application to fix the problem. If automatic build is enabled, a new build starts. Otherwise, start a new build manually by clicking the **Build** button.

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

**Workaround** Stop and start Microclimate with the following commands:
```
~/mcdev stop
~/mcdev start
```

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

**Workaround** In Microclimate, reload the Theia editor to release memory.

<!--
Action/Topic: Editing your project
Issue type: bug/info
Issue link:
18.10:
-->
## New projects sometimes do not show in Theia hierarchy view
Sometimes when a new project is created, it doesn't show up in the Theia hierarchy view.

**Workaround** In Microclimate, refresh the page in the browser.

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

**Workaround** The Jenkins job is created asynchronously. Periodically refresh this page in the browser until the job is created, and the page returns successfully.

<!--
Action/Topic: Using a pipeline
Issue type: bug/info
Issue link:
18.10:
Platform: IBM Cloud Private
-->
## Broken pipeline links
You might encounter a broken link if you try to access a newly created pipeline.

**Workaround** Wait a moment before trying to access the page again. If the link does not become available, delete and recreate the pipeline.

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
Your Helm secret certificate has expired if you are unable to deploy applications to the IBM Cloud Private tiller, your deployed applications are not appearing in Helm releases, you see errors in the DevOps logs, or nothing gets deployed through the pipeline. On IBM Cloud Private 2.1.0.3, the certificate lasts for 90 days.

**Workaround** Regenerate the `microclimate-helm-secret` with the following procedure:

1. Log in. For example:
```
bx pr login -a https://mycluster.icp:8443
```

2. Regenerate the secret.
```
kubectl create secret generic microclimate-helm-secret --from-file=cert.pem=<user path>/.helm/cert.pem --from-file=ca.pem=<user path>/.helm/ca.pem --from-file=key.pem=<user path>/.helm/key.pem
```

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

**Workaround** In your local Microclimate instance, check that the URL you use to connect to the IBM Cloud Private instance is of a similar format to the following URL and not the IBM Cloud Private console URL.
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

**Workaround** Enter the `helm delete --purge microclimate --tls --no-hooks` command to remove any leftover jobs or elements.
* Check that the `kubectl get jobs` command returns empty.
* Delete lingering Persistent Volume Claims if they appear when you run the `kubectl get pvc` command.
* Check that the Persistent Volumes were deleted with the `kubectl get pv` command.
