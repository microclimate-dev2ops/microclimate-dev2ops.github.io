---
layout: document
title: Troubleshooting
description: Troubleshooting Microclimate
keywords: troubleshooting, issues, workaround, IBM Cloud Private
duration: 1 minute
permalink: troubleshooting
type: document
---
# Troubleshooting
When troubleshooting, keep in mind that Microclimate is made up of many components to provide you with a unique development experience. Consider how these components work together as you attempt to isolate the problem by using the information in the following sections.

* [Solving common problems](#solving-common-problems)
* [Solving problems in IBM Cloud Private](#solving-problems-in-ibm-cloud-private)
* [Solving problems on Windows](#solving-problems-on-windows)
* [Solving problems on Linux](#solving-problems-on-linux)
* [Solving problems with Theia](#solving-problems-with-theia)
* [Solving problems with Docker](#solving-problems-with-docker)

<!-- Provide an up-front link to where users can go if they can't figure out how to troubleshoot the problems. Avoid telling them to call IBM support, but you can link to the support website. -->

#### Need help?
If you need help, or if you experience a problem that is not listed, the quickest way to get answers to questions about Microclimate is to reach out to us. For more information, see our [community page](./community).

# Solving common problems
The following list describes common problems that might affect Microclimate.

- [Microclimate does not support Microsoft Edge](#microclimate-does-not-support-microsoft-edge)
- [Webhooks not triggering Jenkins builds](#webhooks-not-triggering-jenkins-builds)
- [Project deletion takes a long time and fails with errors](#project-deletion-takes-a-long-time-and-fails-with-errors)
- [Old projects fail to update, but new projects can be created](#old-projects-fail-to-update-but-new-projects-can-be-created)
- [HTTPS URLs do not launch in Microclimate](#https-urls-do-not-launch-in-microclimate)
- [Application Monitoring unavailable after Project Import](#application-monitoring-unavailable-after-project-import)
- [Application stays in starting state](#application-stays-in-starting-state)
- [Turning off auto build has no effect for Node.js projects when you run Microclimate locally](#turning-off-auto-build-has-no-effect-for-node-js-projects-when-you-run-microclimate-locally)
- [Node.js generator not working on localhost Microclimate](#node-js-generator-not-working-on-localhost-microclimate)
- [Node.js app with addons selected fails to start](#node-js-app-with-addons-selected-fails-to-start)
- [Imported project never builds or starts](#imported-project-never-builds-or-starts)
- [Fan running at one hundred percent](#fan-running-at-one-hundred-percent)
- [Code changes not updated in Git](#code-changes-not-updated-in-git)
- [Node project is not built intermittently](#node-project-is-not-built-intermittently)

## Microclimate does not support Microsoft Edge
Microclimate does not support Microsoft Edge.

**Workaround:** Use a different web browser.

## Webhooks not triggering Jenkins builds
Webhooks that have SSL validation configured might fail to trigger Jenkins jobs due to the presence of a self-signed certificate on the Jenkins kubernetes ingress definition.

Webhooks only currently work if the owner or organisation name contains lower case characters. Webhook status is reported as a success but you must either wait until the branch is scanned for changes (it is checked every fifteen minutes), or kick off the Jenkins build manually.

**Workaround:** Disable SSL validation on your webhook in GitLab or GitHub. If you require SSL validation, replace any Microclimate Jenkins TLS self-signed certificate with a CA signed certificate.  The process of replacing the Microclimate Jenkins TLS certificate can be found in the readme of the Helm chart. For GitLab, you have the additional option of configuring GitLab to accept the custom certificate, see the GitLab documentation for details.

You must ensure that the owner or organisation name only contains lower case characters.

## Project deletion takes a long time and fails with errors
If a project deletion takes a long time and then fails with an error stating that the project could not be deleted, the project might have actually been deleted successfully.

**Workaround:** Wait for a short period of time, and then refresh the browser.

## Old projects fail to update, but new projects can be created
If the microclimate-file-watcher container restarts, it loses any tracking information it has on existing projects, which means updates to project files might go undetected.

**Workaround:**
Restart Microclimate so that it can reinitialize the tracking for any existing projects.
* Local: `~/mcdev stop` followed by `~/mcdev start`.  
* ICP: Microclimate 1805 and earlier, restart the Microclimate pod: `kubectl delete pod <microclimate pod>`.
* ICP: Microclimate 1806, and later, the file-watcher container runs in a separate pod, so both the file-watcher pod and Microclimate pod need to be deleted: `kubectl delete pod <microclimate pod> <microclimate-file-watcher pod>`.

## HTTPS URLs do not launch in Microclimate
When launching applications from the Open Application view in Microclimate, HTTPS URLs within the application fail to open. For example, the links on the home page of a newly generated Swift application reference HTTPS URLs. This problem happens only for HTTPS URLs, HTTP URLs work properly.

**Workaround:** Open HTTPS URLs using a new browser tab.

## Application Monitoring unavailable after Project Import
If an application has been imported via GIT/File, it is possible that when selecting App Monitor the dashboard is not displayed and results in a 'Cannot GET /appmetrics-dash/'. This is because the application was not created by Microclimate or previously had AppMetrics integration.  

**Workaround**
Further details on enabling applications within the AppMetrics can be found on the project pages https://github.com/RuntimeTools/ (appmetrics,javametrics, swiftmetrics).

## Application stays in starting state
If there is a problem with the application and it fails to start, it might stay in starting state.

**Workaround**
Check the application logs to find out why the application did not start, then make changes to the application to fix the problem.  If automatic build is enabled a new build starts, otherwise start a new build manually by clicking the **Build** button.

## Turning off auto build has no effect for Node js projects when you run Microclimate locally
If you turn off ```auto build``` for a Node.js project when you run Microclimate locally, it has no effect. Any changes you make to your code automatically start a build, or do a restart, even though ```auto build``` is disabled.

## Node js generator not working on localhost Microclimate
Several different reasons can cause the Node.js generator to fail to start. View the logs to find out why:

```
docker logs microclimate-file-watcher
```

The Node.js container generated by Microclimate might not be able to access the internet, blocking npm from running.

**Workaround** Check your internet access.

The Docker runtime on your local machine might not be functioning correctly.

**Workaround** Restart Docker.

## Node js app with addons selected fails to start
The Node.js app with add-ons selected, for example, Mongo and Redis, fails to start. Some of the add-ons can cause the Node.js app build to fail because they try to dial non-existing IP addresses out of the box. For example:

``Error: Redis connection to hostname.dblayer.com:11111 failed - connect javascript:;ECONNREFUSED 52.90.100.35:11111) out of the box.```

**Workaround** Reconfigure the add-ons with valid IP addresses.

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

For more information about valid Microclimate projects, see [Importing Projects](https://microclimate-dev2ops.github.io/projectimport).

## Fan running at one hundred percent
When you are using Microclimate, your computer fan might run at 100% for prolonged periods. To see why this might be happening, issue the following command:

```
docker logs microclimate-file-watcher
```

**Workaround** If you just issued the ``mcdev start`` command, Microclimate might be actively building or restarting projects. When Microclimate completes building and restarting projects, the fan resumes running at its more optimal level.

If the fan does not stop running at 100%, you might have imported an invalid project. For more information, see [Imported project never builds or starts](#imported-project-never-builds-or-starts).

Your computer fan might run at 100% if you are actively working more than five projects. To resolve this problem, you can disable development on specific projects. For more information, see Disable development on specific projects in [Using Microclimate](./usingmicroclimate).

## Code changes not updated in Git
The changes you make to your code do not get reflected in the `Edit Code` view in Git.

**Workaround** Change the Git repo you are pointing to in the Theia editor. Alternatively, you can disable the `Show all projects` setting at the https://microclimate.<icp-proxy.xip.io>/?preferences=true) URL.

This solution works on localhost. However, it might not work in IBM Cloud Private.

## Node project is not built intermittently
If you build projects in successive order (java, node, swift, spring), sometimes the node project does not build.

**Workaround** Disable and enable the project, and then rebuild by clicking the **Build** button.

# Solving problems in IBM Cloud Private
If your IBM Cloud Private applications are not working correctly or if you suspect that something might be going wrong, a good way of finding out what the issues are is to install a logging infrastructure to query the logs. For more information, see [Installing Kibana and filtering Microclimate logs in IBM Cloud Private](./installkibanafilter).

The following list describes common problems that might affect Microclimate in IBM Cloud Private.

- [Projects fail to automatically build](#projects-fail-to-automatically-build)
- [Projects fail to build after File-Watcher restart](#projects-fail-to-build-after-file-watcher-restart)
- [Imported Microprofile project does not start in IBM Cloud Private](#imported-microprofile-project-does-not-start-in-ibm-cloud-private)
- [Changing the Theia preference to show all projects might not be persisted](#changing-the-theia-preference-to-show-all-projects-might-not-be-persisted)
- [Microclimate Node port is an internal IP address and is not accessible](#microclimate-node-port-is-an-internal-ip-address-and-is-not-accessible)
- [Pods remain stuck in terminating state on IBM Cloud Private 2012 and earlier](#pods-remain-stuck-in-terminating-state-on-ibm-cloud-private-2012-and-earlier)
- [Jenkins fails to mount persistent volume](#jenkins-fails-to-mount-persistent-volume)
- [Swift projects fail to build on IBM Cloud Private](#swift-projects-fail-to-build-on-ibm-cloud-private)
- [Pipeline deployments intermittently hang](#pipeline-deployments-intermittently-hang)
- [Open pipeline results in 404 Not Found](#open-pipeline-results-in-404-not-found)
- [Jenkins executors do not become available](#jenkins-executors-do-not-become-available)
- [Microclimate on localhost not connecting to remote Microclimate in IBM Cloud Private](#microclimate-on-localhost-not-connecting-to-remote-microclimate-in-ibm-cloud-private)
- [Swift generator not working in IBM Cloud Private](#swift-generator-not-working-in-ibm-cloud-private)
- [Expired Microclimate Helm secret certificate](#expired-microclimate-helm-secret-certificate)

## Projects fail to automatically build
After several days of heavy use, inotify might fail to start in Microclimate's microclimate-file-watcher container, with `Couldn’t initialize inotify` messages displayed in the microclimate-file-watcher logs. After this error, file updates to running projects are not detected.

**Workaround:**
This is a known issue with inotify on Kubernetes, see [https://github.com/kubernetes/kubernetes/issues/10421](https://github.com/kubernetes/kubernetes/issues/10421). You can click the Build button to kick off a manual build. Alternatively, you can reboot the IBM Cloud Private cluster. After the reboot, inotify works properly, and automatic builds work again.

## Projects fail to build after File-Watcher restart
If there are several projects in Microclimate's workspace, Microclimate might fail to build them if the File-Watcher container is restarted. This is due to the default resource constraints specified in the Microclimate helm chart.

**Workaround:**
Increase the amount of RAM and CPU available to the File-watcher container in the Microclimate chart to values of your choosing. Then upgrade your existing Helm release. You can update the resource values and upgrade the Microclimate chart installation from the Helm CLI using the following instructions.

#### Helm CLI

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

## Imported Microprofile project does not start in IBM Cloud Private

After following the [project import instructions](./projectimport) to import a Microprofile project, the project does not start. If a port other than 9080 is configured the project state cannot be determined.

**Workaround**
Configure the Maven pom.xml file and the Liberty server configuration files, for example, the server.xml file, to specify port 9080 for the application. Also ensure the Dockerfile-build has an 'EXPOSE 9080' instruction line to ensure the port is accessible from the application container.

## Changing the Theia preference to show all projects might not be persisted
When clicking on the gear icon and accessing the Preferences page, changing the Theia option to show all projects and clicking on "Save" might not persist the preference.

**Workaround:**
Check that a directory named ".config" exists in the Microclimate workspace. If the directory is missing, create it. Restart Microclimate and the preference persistence should work.

## Microclimate Node port is an internal IP address and is not accessible
For IBM Cloud Private clusters built on OpenStack environments, with floating IP addresses, the Microclimate portal Node port that appears in the Helm installation notes and on the IBM Cloud Private Services view might have an IP address that is internal to the IBM Cloud Private cluster. This IP address is not accessible in the user's browser.

**Workaround:**
You can access Microclimate by replacing the internal IP portion of the Microclimate URL with the external IBM Cloud Private cluster IP address. The external IP address can be obtained using the `kubectl cluster-info` command. The recommended permanent solution is to specify the `proxy_access_ip` when configuring IBM Cloud Private in an OpenStack environment. For more information, see https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/installing/config_yaml.html.

## Pods remain stuck in terminating state on IBM Cloud Private 2012 and earlier
If a pod that uses a GlusterFS PersistentVolume for storage is stuck in the Terminating state after you try to delete it, you must manually delete the pod. This is a known issue in IBM Cloud Private 2.0.1.2 and earlier, see https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0.1/getting_started/known_issues.html.

**Workaround:** Upgrade to IBM Cloud Private 2.1.0.3 or run the following command:
`kubectl -n <namespace> delete pods --grace-period=0 --force <pod_name>`

## Jenkins fails to mount persistent volume
If Jenkins is configured to use an existing persistent volume of less that 7GB it fails to mount that volume. By default an 8GB persistent volume is used.

**Workaround:**
Check the persistent volume size, and either increase its size to at least 7 GB, or use the default persistent volume.

## Swift projects fail to build on IBM Cloud Private
If your IBM Cloud Private cluster has a docker version below 17.05, Swift projects fail to build.

**Workaround**
Update the version of docker on your cluster to 17.05 or above.

## Pipeline deployments intermittently hang
Jenkins agents intermittently hang during pipeline deployments.

**Workaround**
Check the version of IBM Cloud Private. You might experience this problem if you are using version IBM Cloud Private 2.1.0.2 or earlier. Upgrade to IBM Cloud Private 2.1.0.3 which has fixes related to storage.

## Open pipeline results in 404 Not Found
Immediately after creating a new pipeline, clicking *Open pipeline* might result in a "404 Not found" page after logging into Jenkins.

**Workaround**
The Jenkins job is created asynchronously. Periodically refresh this page in the browser until the job has been created and the page returns successfully.

## Jenkins executors do not become available
Intermittently, Jenkins slaves are unable to be launched, and so builds do not happen.

**Workaround**
Remove the container cap in Jenkins, which defaults to 10. In Jenkins, from the *Jenkins* button, click on the dropdown to expand the menu, click *Manage Jenkins > Configure System*, then find the *Container Cap* parameter. Remove the value, leaving it blank so it gives unlimited containers.

## Microclimate on localhost not connecting to remote Microclimate in IBM Cloud Private
Make sure you deploy your Microclimate to IBM Cloud Private.

**Workaround** In your local Microclimate instance, check that the URL you use to connect to the IBM Cloud Private instance is of a similar format to the following URL and not the IBM Cloud Private console URL.

`https://microclimate.<ICP proxy>.xip.io/`

If this URL returns a `500 Internal Server Error` message, check your Microclimate version. You must have at least Microclimate 18.05 to make a connection to Microclimate in IBM Cloud Private 2.1.0.3.

Microclimate 18.05 (ibm-charts/ibm-microclimate/1.2.1) on IBM Cloud Private 2.1.0.3 does not use user and password authentication for the remote connection. For example, enter `admin/admin`.

To view the logs, use the following command:
```
docker logs -f microclimate-portal
```

## Swift generator not working in IBM Cloud Private
Look at the `icp-mc.log` file by issuing the following command:
```
kubectl logs <microclimate-instance> microclimate-file-watcher > icp-mc.log
```

If the Swift container is failing to build, the Swift generators are building multi-stage Dockerfiles that are not compatible with IBM Cloud Private.

**Workaround** Install the latest Docker Community Edition (CE) image. For more information, see [Docker guides](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1).

To see the latest Docker versions that are supported by IBM Cloud Private, see [Supported Docker versions](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0.3/supported_system_config/supported_docker.html).

## Expired Microclimate Helm secret certificate
Your Microclimate Helm secret certificate might expire.

**Workaround** Regenerate the microclimate-helm-secret by following this procedure:

1. Log in. For example:
```
bx pr login -a https://mycluster.icp:8443
```

2. Regenerate the secret.
```
kubectl create secret generic microclimate-helm-secret --from-file=cert.pem=<user path>/.helm/cert.pem --from-file=ca.pem=<user path>/.helm/ca.pem --from-file=key.pem=<user path>/.helm/key.pem
```
# Solving problems on Windows
The following list describes common problems that might affect Microclimate on Windows.

- [cli\install.ps1 cannot be loaded, the file is not digitally signed](#install-file-cannot-be-loaded-because-the-file-is-not-digitally-signed)
- [Cannot create container for service microclimate-portal: Drive has not been shared](#cannot-create-container-for-service-because-drive-has-not-been-shared)
- [An error occurred while attempting to store the license status](#an-error-occurred-while-attempting-to-store-the-license-status)
- [Editing project files using an external IDE editor does not deploy changes to the server](#editing-project-files-using-an-external-ide-editor-does-not-deploy-changes-to-the-server)
- [Projects created never start after installing Microclimate](#projects-created-never-start-after-installing-microclimate)

## Install file cannot be loaded because the file is not digitally signed

The cli\install.ps1 file cannot be loaded, the file is not digitally signed.

The default security settings on Windows 10 and Windows Server 2016 do not allow downloaded PowerShell scripts to run.

**Workaround:** Right-click on the microclimate.zip file and open the file Properties menu. On the General tab, tick the Unblock box beside the "This file came from another computer" message. Unzip the file again and retry the `cli\install.ps1` script.

## Cannot create container for service because drive has not been shared

Cannot create container for service microclimate-portal: Drive has not been shared

**Workaround:** Ensure that your local disk drive is enabled for sharing in Docker: open Docker->Settings->Shared Drives, and select the drive that you installed Microclimate on. Restart Microclimate by using the `mcdev start` command.

## An error occurred while attempting to store the license status

When you start Microclimate, this message might be issued when you accept the Microclimate license.

**Workaround:** Ensure that your local disk drive is enabled for sharing in Docker: open Docker->Settings->Shared Drives, then restart Docker for Windows.

## Editing project files using an external IDE editor does not deploy changes to the server

Changes to project files using an external IDE/editor are not reflected on the running application.

**Workaround:** Editing the same files in the Microclimate Theia editor builds and deploys the changes to the server.

## Projects created never start after installing Microclimate

Intermittently on Windows after an install of Microclimate, projects can be created but they never start up (remain in Starting). There is an issue with Docker for Windows where, although it shows a volume is mounted, it does not allow any writing to the volume. A good indicator this is the issue is to verify there is no microclimate-workspace directory created within the directory you ran the Microclimate install from.

**Workaround:** There can be many reasons for this issue to crop up, and therefore many possible workarounds. First, confirm there is a shared drive selected by opening up the Docker->Settings->Shared Drives. If there is one selected, unselect it, hit Apply, and then retry creating projects. If that does not correct the issue and you are using an ID for that shared drive that is not your current user, ensure that the ID being used does not have a password expired that requires a password reset. Finally, if all else fails it might require removing Microclimate (mcdev delete), ensuring Docker for Windows shows a mounted drive selected, and then restarting Microclimate (mcdev start).

# Solving problems on Linux
The following list describes common problems that might affect Microclimate on Linux.

- [Standard init Linux exec format error](#standard-init-linux-exec-format-error)

## Standard init Linux exec format error

Linux reports standard_init_linux.go:195: exec user process caused "exec format error".

Microclimate Docker images are available for x86-64 architectures only. On other Linux architectures, Microclimate fails to start, and places this error message in the Microclimate Docker container logs.

# Solving problems with Theia
The following list describes common problems that might affect Theia.

- [Theia container leaking memory](#theia-container-leaking-memory)
- [Theia stops working when second window opened](#theia-stops-working-when-second-window-opened)
- [New projects sometimes do not show in Theia's hierarchy view](#new-projects-sometimes-do-not-show-in-theia-hierarchy-view)

## Theia container leaking memory
If left up and running, over time, the Theia container in Microclimate leaks memory. The Theia team is aware of this, and are currently pursuing a fix for this issue. https://github.com/theia-ide/theia/issues/1284

**Workaround** In Microclimate, reloading the Theia editor releases the memory.

## Theia stops working when second window opened
If a second Theia window is opened for the same Microclimate instance, the first Theia window stops working and you cannot edit files, open files, or expand folders. The Theia team is aware of this, and are currently pursuing a fix for this issue. https://github.com/theia-ide/theia/issues/1930.

**Workaround** Switch to the most recently opened tab or window.  

## New projects sometimes do not show in Theia hierarchy view
Sometimes when a new project is created, it doesn't show up in Theia's hierarchy view.

**Workaround** Refresh the Microclimate page in the browser.

# Solving problems with Docker
The following list describes common problems that might affect Docker.

- [Project build fails with Docker build failed message](#project-build-fails-with-docker-build-failed-message)
- [Docker not functioning correctly](#docker-not-functioning-correctly)
- [Docker container crashes unexpectedly](#docker-container-crashes-unexpectedly)

## Project build fails with Docker build failed message
The project build can fail if the Docker image build fails. The docker build logs are not currently exposed in the UI.

**Workaround**
To see if the Docker image build failed, look at the docker build output by checking the microclimate-file-watcher container logs.
* Local: ```docker logs <container id of microclimate-file-watcher>```
* ICP: ```kubectl logs <microclimate-pod> --container=microclimate-file-watcher```

## Docker not functioning correctly
Docker doesn't function correctly.

**Workaround** To get Docker working correctly, you can restart Docker, prune images, or clean up old images.

To restart Docker, right click the Docker symbol in your taskbar and select `Restart`.

To prune Docker images, use the following Docker command:
```
docker system prune -a
```

For more information about removing old Docker images, including old, dangling, and stopped container images, see the [stackoverflow article](https://stackoverflow.com/questions/45142528/docker-what-is-a-dangling-image-and-what-is-an-unused-image).

## Docker container crashes unexpectedly
Your Docker container might crash unexpectedly.

**Workaround** See [this article](https://medium.com/@pimterry/5-ways-to-debug-an-exploding-docker-container-4f729e2c0aa8) for some useful tips about how to debug a crashed container image.
