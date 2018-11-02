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
<!-- NOTE: The '***' before each level one title adds a line to the final output which helps this topic to be more readable and easier to consume -->

# Troubleshooting
When troubleshooting, keep in mind that Microclimate is made up of many components to provide you with a unique development experience. Consider how these components work together as you attempt to isolate the problem by using the information in the following sections.

* [Check the logs](#check-the-logs)
* [Solving common problems](#solving-common-problems)
* [Solving problems in IBM Cloud Private](#solving-problems-in-ibm-cloud-private)
* [Solving problems on Mac](#solving-problems-on-mac)
* [Solving problems on Windows](#solving-problems-on-windows)
* [Solving problems on Linux](#solving-problems-on-linux)
* [Solving problems with Theia](#solving-problems-with-theia)
* [Solving problems with Docker](#solving-problems-with-docker)
* [If all else fails](#if-all-else-fails)

<!-- Provide an up-front link to where users can go if they can't figure out how to troubleshoot the problems. Avoid telling them to call IBM support, but you can link to the support website. -->

### Need help?
If you need help, or if you experience a problem that is not listed, the quickest way to get answers to questions about Microclimate is to reach out to us. For more information, see our [community page](./community).

***
# Check the logs
The first step in many troubleshooting scenarios is to check the logs.

If you are running Microclimate locally, use this command to access the logs:
`docker logs <container>`

If you are running Microclimate in IBM Cloud Private, a quick way to gather installation information, including logs is to run the `./must-gather.sh` script. The results are saved to a file in the current directory. For more information and to download this script, see [Microclimate serviceability](https://github.com/microclimate-dev2ops/serviceability/).    

Useful logs:
* microclimate-file-watcher container logs for build/deployment errors
* microclimate-portal and microclimate-file-watcher for project creation & deletion errors

The build and application logs for each application are also available through the UI, on their own respective tabs.

***
# Solving common problems
The following list describes common problems that might affect Microclimate.

- [Webhooks not triggering Jenkins builds](#webhooks-not-triggering-jenkins-builds)
- [Application Monitoring unavailable after Project Import](#application-monitoring-unavailable-after-project-import)
- [Application stays in starting state](#application-stays-in-starting-state)
- [Turning off auto build has no effect for Node.js projects when you run Microclimate locally](#turning-off-auto-build-has-no-effect-for-nodejs-projects-when-you-run-microclimate-locally)
- [Node.js generator fails to start](#nodejs-generator-fails-to-start)
- [Node.js app with addons selected fails to start](#nodejs-app-with-addons-selected-fails-to-start)
- [Imported project never builds or starts](#imported-project-never-builds-or-starts)
- [Code changes not updated in Git](#code-changes-not-updated-in-git)
- [Theia editor might not work correctly in Microsoft Edge](#theia-editor-might-not-work-correctly-in-microsoft-edge)
- [Microprofile project gets updated twice upon file change](#microprofile-project-gets-updated-twice-upon-file-change)

<!-- 
Issue type : bug/info
Issue link: 
18.10 : Updated to reflect new certificate use (Aki)
-->

## Webhooks not triggering Jenkins builds
Webhooks that have SSL validation configured might fail to trigger Jenkins jobs due to the presence of the certificate signed by IBM Cloud Private on the Jenkins Kubernetes ingress definition.

Webhooks only currently work if the owner or organisation name contains lowercase characters. Webhook status is reported as a success but you must either wait until the branch is scanned for changes (it is checked every fifteen minutes), or kick off the Jenkins build manually.

**Workaround:** Disable SSL validation on your webhook in GitLab or GitHub. If you require SSL validation, add an IBM Cloud Private certificate authority into the client trust store. Refer to Microclimate documentation for information on how to get an IBM Cloud Private Certificate authority. You can also configure GitLab to accept the custom certificate. See the GitLab documentation for details.

You must ensure that the owner or organisation name only contains lowercase characters.

<!--
Issue type: bug/info
Issue link: 
18.10: Still an issue (Toby)
-->
## Application Monitoring unavailable after Project Import
After importing an application, when you click `App Monitor`, the dashboard is not displayed and results in a 'Cannot GET /appmetrics-dash/'' error. This is because the application was not created by Microclimate or previously had AppMetrics integration.

**Workaround**
Enable AppMetrics for your application. You can enable AppMetrics for [Node.js](https://developer.ibm.com/node/monitoring-post-mortem/application-metrics-node-js/), [Swift](https://developer.ibm.com/swift/monitoring-diagnostics/application-metrics-for-swift/), and [SpringBoot](https://github.com/RuntimeTools/javametrics#spring-boot) projects.

<!--
Issue type: bug
Issue link: https://github.ibm.com/dev-ex/portal-ui/issues/353
18.10: Still an issue
-->
## Application stays in starting state
If there is a problem with the application and it fails to start, it might stay in starting state.

**Workaround**
Check the application logs to find out why the application did not start, then make changes to the application to fix the problem.  If automatic build is enabled a new build starts, otherwise start a new build manually by clicking the **Build** button.

<!--
Issue type: bug/info
Issue link: 
18.10: 
-->
## Turning off auto build has no effect for Node.js projects when you run Microclimate locally
If you turn off ```auto build``` for a Node.js project when you run Microclimate locally, it has no effect. Any changes you make to your code automatically start a build, or do a restart, even though ```auto build``` is disabled.

<!--
Issue type: bug/info
Issue link: 
18.10: 
-->
## Node.js generator fails to start
Several different reasons can cause the Node.js generator to fail to start. View the logs to find out why:

```
docker logs microclimate-file-watcher
```

The Node.js container generated by Microclimate might not be able to access the internet, blocking npm from running.

**Workaround** Check your internet access.

The Docker runtime on your local machine might not be functioning correctly.

**Workaround** Restart Docker.

<!--
Issue type: bug/info
Issue link: 
18.10: Still an issue
-->
## Node.js app with addons selected fails to start
The Node.js app with add-ons selected, for example, Mongo and Redis, fails to start. Some of the add-ons can cause the Node.js app build to fail because they try to dial non-existing IP addresses out of the box. For example:

``Error: Redis connection to hostname.dblayer.com:11111 failed - connect javascript:;ECONNREFUSED 52.90.100.35:11111) out of the box.```

**Workaround** Reconfigure the add-ons with valid IP addresses.

<!--
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
Issue type: bug
Issue link: https://github.ibm.com/dev-ex/theia/issues/21
18.10: still an issue
-->
## Code changes not updated in Git
The changes you make to your code do not get reflected in the `Edit Code` view in Git.

**Workaround:** Change the Git repo you are pointing to in the Theia editor. Alternatively, you can disable the `Show all projects` setting at the `https://microclimate.<icp-proxy.xip.io>/?preferences=true` URL.


<!-- 
Issue type: bug
Issue link: https://github.ibm.com/dev-ex/theia/issues/3 
18.10: Still an issue
-->
## Theia editor might not work correctly in Microsoft Edge
Theia, the open source code editor used by Microclimate, has limited support for Microsoft Edge at this time. Theia are aware of the issue and are working to fix it. All other functionality in Microclimate is fully supported in Microsoft Edge, including performance, pipeline, and so on.

**Workaround:** Use a different web browser.

<!--
Issue type: bug
Issue link: https://github.ibm.com/dev-ex/iterative-dev/issues/459
18.10: Still an issue
-->
## Microprofile project gets updated twice upon file change
If you modify files in Microprofile projects, sometimes the project gets double updates. You might see the application status changed from Running to Stopped twice. This is because the default PollingRate, which is 500ms, is too short for the application monitor.

**Workaround:** Increase the PollingRate in server.xml to 1000ms, or longer.
```
<applicationMonitor pollingRate="1000ms" />
```

***
# Solving problems in IBM Cloud Private
If your IBM Cloud Private applications are not working correctly or if you suspect that something might be going wrong, a good way of finding out what the issues are is to install a logging infrastructure to query the logs. For more information, see [Installing Kibana and filtering Microclimate logs in IBM Cloud Private](installkibanafilter).

The following list describes common problems that might affect Microclimate in IBM Cloud Private.

- [All projects fail to build](#all-projects-fail-to-build)
- [Imported Microprofile project does not start in IBM Cloud Private](#imported-microprofile-project-does-not-start-in-ibm-cloud-private)
- [Microclimate Node.js port is an internal IP address and is not accessible](#microclimate-nodejs-port-is-an-internal-ip-address-and-is-not-accessible)
- [Jenkins fails to mount persistent volume](#jenkins-fails-to-mount-persistent-volume)
- [Swift projects fail to build on IBM Cloud Private](#swift-projects-fail-to-build-on-ibm-cloud-private)
- [Open pipeline results in 404 Not Found](#open-pipeline-results-in-404-not-found)
- [Microclimate on localhost not connecting to remote Microclimate in IBM Cloud Private](#microclimate-on-localhost-not-connecting-to-remote-microclimate-in-ibm-cloud-private)
- [Swift container failing to build](#swift-container-failing-to-build)
- [Unable to deploy applications or deployed applications not appearing](#unable-to-deploy-applications-or-deployed-applications-not-appearing)
- [Broken pipeline links](#broken-pipeline-links)


<!--
Issue type: bug
Issue link: https://github.ibm.com/dev-ex/iterative-dev/issues/459
18.10: Still an issue (Jag)
-->
## All projects fail to build
If there are several projects in Microclimate's workspace, Microclimate might fail to build them if the File-Watcher container is restarted. This is due to the default resource constraints specified in the Microclimate helm chart.

**Workaround:**
Increase the amount of RAM and CPU available to the File-watcher container in the Microclimate chart to values of your choosing. Then upgrade your existing Helm release. You can update the resource values and upgrade the Microclimate chart installation from the Helm CLI using the following instructions.

<!--
Issue type: bug/info
Issue link:
18.10:
-->
### Helm CLI

  `helm repo add ibm-charts-public https://raw.githubusercontent.com/IBM/charts/master/repo/stable`

  `helm upgrade microclimate -f overrides.yaml ibm-charts-public/ibm-microclimate --reuse-values --tls`

  A sample overrides.yaml file can contain these values:

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

Delete both the filewatcher and portal pods after the upgrade to have them recreated:

```
   kubectl get pods
   kubectl delete pods admin-microclimate-editorfilewatcher-<xxxxx> microclimate-ibm-microclimate-<xxxxx>
```

This upgrades the Microclimate file-watcher container with the resources it needs to build and deploy more projects into IBM Cloud Private.

<!--
Issue type: bug/info
Issue link:
18.10:
-->
## Imported Microprofile project does not start in IBM Cloud Private
After following the [project import instructions](projectview) to import a Microprofile project, the project does not start. If a port other than 9080 is configured the project state cannot be determined.

**Workaround**
Configure the Maven pom.xml file and the Liberty server configuration files, for example, the server.xml file, to specify port 9080 for the application. Also ensure the Dockerfile-build has an 'EXPOSE 9080' instruction line to ensure the port is accessible from the application container.

<!--
Issue type: bug/info
Issue link:
18.10:
-->
## Microclimate Node.js port is an internal IP address and is not accessible
For IBM Cloud Private clusters built on OpenStack environments, with floating IP addresses, the Microclimate portal Node.js port that appears in the Helm installation notes and on the IBM Cloud Private Services view might have an IP address that is internal to the IBM Cloud Private cluster. This IP address is not accessible in the user's browser.

**Workaround:**
You can access Microclimate by replacing the internal IP portion of the Microclimate URL with the external IBM Cloud Private cluster IP address. The external IP address can be obtained using the `kubectl cluster-info` command. The recommended permanent solution is to specify the `proxy_access_ip` when configuring IBM Cloud Private in an OpenStack environment. For more information, see [Cluster configuration settings](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/installing/config_yaml.html).

<!--
Issue type: bug/info
Issue link:
18.10: 
-->
## Jenkins fails to mount persistent volume
If Jenkins is configured to use an existing persistent volume of less that 7GB it fails to mount that volume. By default an 8GB persistent volume is used.

**Workaround:**
Check the persistent volume size, and either increase its size to at least 7 GB, or use the default persistent volume.

<!--
Issue type: bug/info
Issue link:
18.10:
-->
## Swift projects fail to build on IBM Cloud Private
If your IBM Cloud Private cluster has a docker version earlier than 17.05, Swift projects fail to build.

**Workaround** Upgrade Docker to the latest Docker Community Edition (CE) image. For more information, see [Docker guides](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1).


<!-- Issue type: bug
Issue link: https://github.ibm.com/dev-ex/devops-planning/issues/288
18.10: still an issue
-->
## Open pipeline results in 404 Not Found
Immediately after creating a new pipeline, clicking *Open pipeline* might result in a "404 Not found" page after logging into Jenkins.

**Workaround**
The Jenkins job is created asynchronously. Periodically refresh this page in the browser until the job has been created and the page returns successfully.

<!--
Issue type: bug/info
Issue link:
18.10: Still an issue: Update for ICP 3.1
-->
## Microclimate on localhost not connecting to remote Microclimate in IBM Cloud Private
Make sure you deploy your Microclimate to IBM Cloud Private.

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
<!--
Issue type: bug/info
Issue link:
18.10: 
-->
## Swift container failing to build
Look at the `icp-mc.log` file by issuing the following command:
```
kubectl logs <microclimate-instance> microclimate-file-watcher > icp-mc.log
```

If the Swift container is failing to build, the Swift generators are building multi-stage Dockerfiles that are not compatible with IBM Cloud Private.

**Workaround** Upgrade Docker to the latest Docker Community Edition (CE) image. For more information, see [Docker guides](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1).

To see the latest Docker versions that are supported by IBM Cloud Private, see [Supported Docker versions](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0.3/supported_system_config/supported_docker.html).

<!--
Issue type: bug/info
Issue link:
18.10: 
-->
## Unable to deploy applications or deployed applications not appearing
If you are unable to deploy applications to IBM Cloud Private's tiller, your deployed applications are not appearing in Helm releases, you see errors in the Devops logs, or nothing gets deployed through the pipeline, your Helm secret certificate has expired. On IBM Cloud Private 2.1.0.3, the certificate lasts for 90 days.

**Workaround** Regenerate the microclimate-helm-secret by following this procedure:

1. Log in. For example:
```
bx pr login -a https://mycluster.icp:8443
```

2. Regenerate the secret.
```
kubectl create secret generic microclimate-helm-secret --from-file=cert.pem=<user path>/.helm/cert.pem --from-file=ca.pem=<user path>/.helm/ca.pem --from-file=key.pem=<user path>/.helm/key.pem
```
<!--
Issue type: bug/info
Issue link:
18.10: 
-->
## Broken pipeline links
You might encounter a broken link if you try to access a newly created pipeline.

**Workaround** Wait a moment before trying to access the page again. If the link does not become available, delete and recreate the pipeline.


***
# Solving problems on Mac
The following list describes common problems that might affect Microclimate on Mac.

- [Edit code view does not show](#edit-code-view-does-not-show)

<!--
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

***
# Solving problems on Windows
The following list describes common problems that might affect Microclimate on Windows.

- [cli\install.ps1 cannot be loaded, the file is not digitally signed](#install-file-cannot-be-loaded-because-the-file-is-not-digitally-signed)
- [Cannot create container for service microclimate-portal: Drive has not been shared](#cannot-create-container-for-service-because-drive-has-not-been-shared)
- [An error occurred while attempting to store the license status](#an-error-occurred-while-attempting-to-store-the-license-status)
- [Editing project files using an external IDE editor does not deploy changes to the server](#editing-project-files-using-an-external-ide-editor-does-not-deploy-changes-to-the-server)
- [Projects created never start after installing Microclimate](#projects-created-never-start-after-installing-microclimate)

<!--
Issue type: bug/info
Issue link:
18.10: Still present
-->
## Install file cannot be loaded because the file is not digitally signed
The cli\install.ps1 file cannot be loaded, the file is not digitally signed.

The default security settings on Windows 10 and Windows Server 2016 do not allow downloaded PowerShell scripts to run.

**Workaround:** Right-click on the microclimate.zip file and open the file Properties menu. On the General tab, tick the Unblock box for the message, "This file came from another computer." Unzip the file again and retry the `cli\install.ps1` script.

<!--
Issue type: bug/info
Issue link:
18.10: 
-->
## Cannot create container for service because drive has not been shared
Cannot create container for service microclimate-portal: Drive has not been shared

**Workaround:** Ensure that your local disk drive is enabled for sharing in Docker: open Docker->Settings->Shared Drives, and select the drive that you installed Microclimate on. Restart Microclimate by using the `mcdev start` command.

<!--
Issue type: bug/info
Issue link:
18.10: 
-->
## An error occurred while attempting to store the license status
When you start Microclimate, this message might be issued when you accept the Microclimate license.

**Workaround:** Ensure that your local disk drive is enabled for sharing in Docker: open Docker->Settings->Shared Drives, then restart Docker for Windows.

<!-- 
Issue type: bug
Issue link: https://github.ibm.com/dev-ex/iterative-dev/issues/111
18.10: Still an issue
-->
## Editing project files using an external IDE editor does not deploy changes to the server
Changes to project files using an external IDE/editor are not reflected on the running application.

**Workaround:** Editing the same files in the Microclimate Theia editor builds and deploys the changes to the server.

<!--
Issue type: bug/info
Issue link:
18.10: 
-->
## Projects created never start after installing Microclimate
Intermittently on Windows after an install of Microclimate, projects can be created but they never start up (remain in Starting). There is an issue with Docker for Windows where, although it shows a volume is mounted, it does not allow any writing to the volume. A good indicator this is the issue is to verify there is no microclimate-workspace directory created within the directory you ran the Microclimate install from.

**Workaround:** There can be many reasons for this issue to crop up, and therefore many possible workarounds. First, confirm there is a shared drive selected by opening up the Docker->Settings->Shared Drives. If there is one selected, unselect it, hit Apply, and then retry creating projects. If that does not correct the issue and you are using an ID for that shared drive that is not your current user, ensure that the ID being used does not have a password expired that requires a password reset. Finally, if all else fails it might require removing Microclimate (mcdev delete), ensuring Docker for Windows shows a mounted drive selected, and then restarting Microclimate (mcdev start).

***
# Solving problems on Linux
The following list describes common problems that might affect Microclimate on Linux.

- [Standard init Linux exec format error](#standard-init-linux-exec-format-error)

<!--
Issue type: bug/info
Issue link:
18.10: 
-->
## Standard init Linux exec format error
Linux reports standard_init_linux.go:195: exec user process caused "exec format error".

Microclimate Docker images are available for x86-64 architectures only. On other Linux architectures, Microclimate fails to start, and places this error message in the Microclimate Docker container logs.

***
# Solving problems with Theia
The following list describes common problems that might affect Theia.

- [Theia container leaking memory](#theia-container-leaking-memory)
- [New projects sometimes do not show in Theia's hierarchy view](#new-projects-sometimes-do-not-show-in-theia-hierarchy-view)

<!-- 
Issue type: bug
Issue link: https://github.ibm.com/dev-ex/theia/issues/1 
18.10: Still an issue
-->
## Theia container leaking memory
If allowed to stay up and running, over time, the Theia container in Microclimate leaks memory. The Theia team is aware of this, and are currently pursuing a fix for this issue. For more information, see [Virtual memory usage continuously grows](https://github.com/theia-ide/theia/issues/1284).

**Workaround** In Microclimate, reload the Theia editor to release memory.

<!--
Issue type: bug/info
Issue link:
18.10: 
-->
## New projects sometimes do not show in Theia hierarchy view
Sometimes when a new project is created, it doesn't show up in Theia's hierarchy view.

**Workaround** In Microclimate, refresh the page in the browser.

***
# Solving problems with Docker
The following list describes common problems that might affect Docker.

- [Microclimate does not start](#microclimate-does-not-start)
- [Project build fails with Docker build failed message](#project-build-fails-with-docker-build-failed-message)
- [Docker container crashes unexpectedly](#docker-container-crashes-unexpectedly)

For more information, see [Docker guides](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1).

<!--
Issue type: bug/info
Issue link:
18.10: 
-->
## Microclimate does not start
Microclimate not starting might be because Docker isn't functioning correctly.

**Workaround** To get Docker working correctly, you can restart Docker, prune images, or clean up old images.

To restart Docker, right-click the Docker symbol in your taskbar and select `Restart`.

To prune Docker images, use the following Docker command:
```
docker system prune -a
```

For more information about removing old Docker images, including old, dangling, and stopped container images, see the [stackoverflow article: 'Docker: What is a dangling image and what is an unused image?'](https://stackoverflow.com/questions/45142528/docker-what-is-a-dangling-image-and-what-is-an-unused-image).

<!--
Issue type: bug/info
Issue link:
18.10: 
-->
## Project build fails with Docker build failed message
The project build can fail if the Docker image build fails. The docker build logs are not currently exposed in the UI.

**Workaround**
To see if the Docker image build failed, look at the docker build output by checking the microclimate-file-watcher container logs.
* Local: ```docker logs <container id of microclimate-file-watcher>```
* IBM Cloud Private: ```kubectl logs <microclimate-pod> --container=microclimate-file-watcher```

<!--
Issue type: bug/info
Issue link:
18.10: 
-->
## Docker container crashes unexpectedly
Your Docker container might crash unexpectedly.

**Workaround** For some useful tips about how to debug a crashed container image, see the [medium.com article: '5 ways to debug an exploding Docker container'](https://medium.com/@pimterry/5-ways-to-debug-an-exploding-docker-container-4f729e2c0aa8).

***
# If all else fails
If all else fails, you've tried fixing your Microclimate installation and have not been successful, it might be that one or more of the components in your installation is out of date, corrupted, or has stopped working for some unknown reason.

**Workaround** Reach out to us on Slack to have a chat or to raise a bug, we'd love to hear from you. For more information, see our [Community](community) page. Another option is to reinstall Microclimate, for which see [Updating Microclimate](./updating).
