---
layout: docs
title: Troubleshooting
description: Troubleshooting Microclimate
keywords: troubleshooting, issues, workaround, IBM Cloud Private, logs, common problems, Mac, Windows, Linux, Theia, Docker, help
duration: 1 minute
permalink: troubleshooting
type: document
order: 6
parent: root
---
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

#### Need help?
If you need help, or if you experience a problem that is not listed, the quickest way to get answers to questions about Microclimate is to reach out to us. For more information, see our [community page](./community).

## Check the logs
The first step in many troubleshooting scenarios is to check the logs:

If you are running Microclimate locally, use this command to access the logs:
`docker logs <container>`

If you are running Microclimate in IBM Cloud Private, use this command to access the logs:
`kubectl logs <pod> -c <container>`

Useful logs:
* microclimate-file-watcher container logs for build/deployment errors
* microclimate-portal and microclimate-file-watcher for project creation & deletion errors

The build and application logs for each application are also available through the UI, on their own respective tabs.

## Solving common problems
The following list describes common problems that might affect Microclimate.

- [Webhooks not triggering Jenkins builds](#webhooks-not-triggering-jenkins-builds)
- [Project deletion takes a long time and fails with errors](#project-deletion-takes-a-long-time-and-fails-with-errors)
- [Old projects fail to update, but new projects can be created](#old-projects-fail-to-update-but-new-projects-can-be-created)
- [HTTPS URLs do not launch in Microclimate](#https-urls-do-not-launch-in-microclimate)
- [Application Monitoring unavailable after Project Import](#application-monitoring-unavailable-after-project-import)
- [Application stays in starting state](#application-stays-in-starting-state)
- [Turning off auto build has no effect for Node.js projects when you run Microclimate locally](#turning-off-auto-build-has-no-effect-for-nodejs-projects-when-you-run-microclimate-locally)
- [Node.js generator fails to start](#nodejs-generator-fails-to-start)
- [Node.js app with addons selected fails to start](#nodejs-app-with-addons-selected-fails-to-start)
- [Imported project never builds or starts](#imported-project-never-builds-or-starts)
- [Project does not build if you override the project type to Docker during the import](#project-does-not-build-if-you-override-the-project-type-to-docker-during-the-import)
- [High CPU usage](#high-cpu-usage)
- [Code changes not updated in Git](#code-changes-not-updated-in-git)
- [Node.js project is not built intermittently](#nodejs-project-is-not-built-intermittently)
- [Theia editor might not work correctly in Microsoft Edge](#theia-editor-might-not-work-correctly-in-microsoft-edge)
- [Projects not displaying after deleting the .projects directory](#projects-do-not-display-after-you-delete-the-projects-directory)
- [Microprofile project gets updated twice upon file change](#microprofile-project-gets-updated-twice-upon-file-change)
- [No build information after restarting a portal container](#No-build-information-after-restarting-a-portal-container)

### Webhooks not triggering Jenkins builds
Webhooks that have SSL validation configured might fail to trigger Jenkins jobs due to the presence of a self-signed certificate on the Jenkins kubernetes ingress definition.

Webhooks only currently work if the owner or organisation name contains lower case characters. Webhook status is reported as a success but you must either wait until the branch is scanned for changes (it is checked every fifteen minutes), or kick off the Jenkins build manually.

**Workaround:** Disable SSL validation on your webhook in GitLab or GitHub. If you require SSL validation, replace any Microclimate Jenkins TLS self-signed certificate with a CA signed certificate.  The process of replacing the Microclimate Jenkins TLS certificate can be found in the readme of the Helm chart. For GitLab, you have the additional option of configuring GitLab to accept the custom certificate, see the GitLab documentation for details.

You must ensure that the owner or organisation name only contains lower case characters.

### Project deletion takes a long time and fails with errors
If a project deletion takes a long time and then fails with an error stating that the project could not be deleted, the project might have actually been deleted successfully.

**Workaround:** Wait for a short period of time, and then refresh the browser.

### Old projects fail to update, but new projects can be created
If the microclimate-file-watcher container restarts, it loses any tracking information it has on existing projects, which means updates to project files might go undetected.

**Workaround:**
Restart Microclimate so that it can reinitialize the tracking for any existing projects.
* Local: `~/mcdev stop` followed by `~/mcdev start`.
* IBM Cloud Private: Microclimate 1805 and earlier, restart the Microclimate pod: `kubectl delete pod <microclimate pod>`.
* IBM Cloud Private: Microclimate 1806, and later, the file-watcher container runs in a separate pod, so both the file-watcher pod and Microclimate pod need to be deleted: `kubectl delete pod <microclimate pod> <microclimate-file-watcher pod>`.

### HTTPS URLs do not launch in Microclimate
When launching applications from the Open Application view in Microclimate, HTTPS URLs within the application fail to open. For example, the links on the home page of a newly generated Swift application reference HTTPS URLs. This problem happens only for HTTPS URLs, HTTP URLs work properly.

**Workaround:** Open HTTPS URLs using a new browser tab.

### Application Monitoring unavailable after Project Import
After importing an application, when you click `App Monitor`, the dashboard is not displayed and results in a 'Cannot GET /appmetrics-dash/'' error. This is because the application was not created by Microclimate or previously had AppMetrics integration.

**Workaround**
Enable AppMetrics for your application. You can enable AppMetrics for [Node.js](https://developer.ibm.com/node/monitoring-post-mortem/application-metrics-nodejs/), [Swift](https://developer.ibm.com/swift/monitoring-diagnostics/application-metrics-for-swift/), and [SpringBoot](https://github.com/RuntimeTools/javametrics#spring-boot) projects.

### Application stays in starting state
If there is a problem with the application and it fails to start, it might stay in starting state.

**Workaround**
Check the application logs to find out why the application did not start, then make changes to the application to fix the problem.  If automatic build is enabled a new build starts, otherwise start a new build manually by clicking the **Build** button.

### Turning off auto build has no effect for Node.js projects when you run Microclimate locally
If you turn off ```auto build``` for a Node.js project when you run Microclimate locally, it has no effect. Any changes you make to your code automatically start a build, or do a restart, even though ```auto build``` is disabled.

### Node.js generator fails to start
Several different reasons can cause the Node.js generator to fail to start. View the logs to find out why:

```
docker logs microclimate-file-watcher
```

The Node.js container generated by Microclimate might not be able to access the internet, blocking npm from running.

**Workaround** Check your internet access.

The Docker runtime on your local machine might not be functioning correctly.

**Workaround** Restart Docker.

### Node.js app with addons selected fails to start
The Node.js app with add-ons selected, for example, Mongo and Redis, fails to start. Some of the add-ons can cause the Node.js app build to fail because they try to dial non-existing IP addresses out of the box. For example:

``Error: Redis connection to hostname.dblayer.com:11111 failed - connect javascript:;ECONNREFUSED 52.90.100.35:11111) out of the box.```

**Workaround** Reconfigure the add-ons with valid IP addresses.

### Imported project never builds or starts
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

### Project does not build if you override the project type to Docker during the import
The project might not build if you import a Node.js project and choose to override the project type to `docker` during the import.

**Workaround:** Allow Microclimate to select the project type.

### High CPU usage
When you are using Microclimate, your CPU usage might be higher than usual for prolonged periods. To see why this might be happening, issue the following command:

```
docker logs microclimate-file-watcher
```

**Workaround:** If you just issued the ``mcdev start`` command, Microclimate might be actively building or restarting projects. When Microclimate completes building and restarting projects, your CPU usage resumes to its more optimal level.

If your CPU usage remains high, you might have imported an invalid project. For more information, see [Imported project never builds or starts](#imported-project-never-builds-or-starts).

Your CPU usage might also be high if you are actively working more than five projects. To resolve this problem, you can disable development on specific projects. For more information, see Disable development on specific projects in [Using Microclimate](usingmicroclimate).

### Code changes not updated in Git
The changes you make to your code do not get reflected in the `Edit Code` view in Git.

**Workaround:** Change the Git repo you are pointing to in the Theia editor. Alternatively, you can disable the `Show all projects` setting at the `https://microclimate.<icp-proxy.xip.io>/?preferences=true` URL.

### Node.js project is not built intermittently
If you build projects in successive order (Java, Node.js, Swift, Spring), sometimes the Node.js project does not build.

**Workaround:** Disable and enable the project, and then rebuild by clicking the **Build** button.

### Theia editor might not work correctly in Microsoft Edge
Theia, the open source code editor used by Microclimate, has limited support for Microsoft Edge at this time. Theia are aware of the issue and are working to fix it. All other functionality in Microclimate is fully supported in Microsoft Edge, including performance, pipeline, and so on.

**Workaround:** Use a different web browser.

### Projects do not display after you delete the .projects directory
If your `.projects` directory is deleted, Microclimate no longer displays your projects on the dashboard. Your projects are still in the `microclimate-workspace` directory, but are no longer visible to Microclimate.

**Workaround:** Stop Microclimate by using the `mcdev stop` command from the terminal. Rename your `microclimate-workspace` directory to, for example, `workspace-backup`. Start Microclimate again with the `mcdev start` command. Re-import your projects into Microclimate by clicking the **Import project** button on the Projects dashboard, select **Local Project** and navigate to your `workspace-backup` directory. For each of the projects in the `workspace-backup` directory, re-import them by following the normal import process until all projects are re-imported.

### Microprofile project gets updated twice upon file change
If you modify files in Microprofile projects, sometimes the project gets double updates. You might see the application status changed from Running to Stopped twice. This is because the default PollingRate, which is 500ms, is too short for the application monitor.

**Workaround:** Increase the PollingRate in server.xml to 1000ms, or longer.
```
<applicationMonitor pollingRate="1000ms" />
```

### No build information after restarting a portal container
You might see **No build information** as the project status and **Running** as the application status for a docker project. These statuses can remain indefinitely. This problem can occur when you create or import four project types, build and run them, and then kill a portal pod and refresh the Microclimate portal, which terminates and starts the file watcher and editor.

**Workaround:** Click `Build` to build the project manually.

## Solving problems in IBM Cloud Private
If your IBM Cloud Private applications are not working correctly or if you suspect that something might be going wrong, a good way of finding out what the issues are is to install a logging infrastructure to query the logs. For more information, see [Installing Kibana and filtering Microclimate logs in IBM Cloud Private](installkibanafilter).

The following list describes common problems that might affect Microclimate in IBM Cloud Private.

- [Projects fail to automatically build](#projects-fail-to-automatically-build)
- [All projects fail to build](#all-projects-fail-to-build)
- [Imported Microprofile project does not start in IBM Cloud Private](#imported-microprofile-project-does-not-start-in-ibm-cloud-private)
- [Changing the Theia preference to show all projects might not be persisted](#changing-the-theia-preference-to-show-all-projects-might-not-be-persisted)
- [Microclimate Node.js port is an internal IP address and is not accessible](#microclimate-nodejs-port-is-an-internal-ip-address-and-is-not-accessible)
- [Pods remain stuck in terminating state on IBM Cloud Private 2.1.0.2 and earlier](#pods-remain-stuck-in-terminating-state-on-ibm-cloud-private-2102-and-earlier)
- [Jenkins fails to mount persistent volume](#jenkins-fails-to-mount-persistent-volume)
- [Swift projects fail to build on IBM Cloud Private](#swift-projects-fail-to-build-on-ibm-cloud-private)
- [Pipeline deployments intermittently hang](#pipeline-deployments-intermittently-hang)
- [Open pipeline results in 404 Not Found](#open-pipeline-results-in-404-not-found)
- [Jenkins executors do not become available](#jenkins-executors-do-not-become-available)
- [Microclimate on localhost not connecting to remote Microclimate in IBM Cloud Private](#microclimate-on-localhost-not-connecting-to-remote-microclimate-in-ibm-cloud-private)
- [Swift container failing to build](#swift-container-failing-to-build)
- [Unable to deploy applications or deployed applications not appearing](#unable-to-deploy-applications-or-deployed-applications-not-appearing)
- [Broken pipeline links](#broken-pipeline-links)
- [Microclimate installation fails and cannot be uninstalled](#microclimate-installation-fails-and-cannot-be-uninstalled)

### Projects fail to automatically build
After several days of heavy use, inotify might fail to start in Microclimate's microclimate-file-watcher container, with `Couldn’t initialize inotify` messages displayed in the microclimate-file-watcher logs. After this error, file updates to running projects are not detected.

**Workaround:**
This is a known issue with inotify on Kubernetes, see [inotify resources exhausted:possible leak in cAdvisor](https://github.com/kubernetes/kubernetes/issues/10421). You can click the Build button to kick off a manual build. Alternatively, you can reboot the IBM Cloud Private cluster. After the reboot, inotify works properly, and automatic builds work again.

### All projects fail to build
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

### Imported Microprofile project does not start in IBM Cloud Private

After following the [project import instructions](projectview) to import a Microprofile project, the project does not start. If a port other than 9080 is configured the project state cannot be determined.

**Workaround**
Configure the Maven pom.xml file and the Liberty server configuration files, for example, the server.xml file, to specify port 9080 for the application. Also ensure the Dockerfile-build has an 'EXPOSE 9080' instruction line to ensure the port is accessible from the application container.

### Changing the Theia preference to show all projects might not be persisted
When clicking on the gear icon and accessing the Preferences page, changing the Theia option to show all projects and clicking on "Save" might not persist the preference.

**Workaround:**
Check that a directory named ".config" exists in the Microclimate workspace. If the directory is missing, create it using, for example, Theia. Restart Microclimate and the preference is persisted.

### Microclimate Node.js port is an internal IP address and is not accessible
For IBM Cloud Private clusters built on OpenStack environments, with floating IP addresses, the Microclimate portal Node.js port that appears in the Helm installation notes and on the IBM Cloud Private Services view might have an IP address that is internal to the IBM Cloud Private cluster. This IP address is not accessible in the user's browser.

**Workaround:**
You can access Microclimate by replacing the internal IP portion of the Microclimate URL with the external IBM Cloud Private cluster IP address. The external IP address can be obtained using the `kubectl cluster-info` command. The recommended permanent solution is to specify the `proxy_access_ip` when configuring IBM Cloud Private in an OpenStack environment. For more information, see [Cluster configuration settings](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/installing/config_yaml.html).

### Pods remain stuck in terminating state on IBM Cloud Private 2.1.0.2 and earlier
If a pod that uses a GlusterFS PersistentVolume for storage is stuck in the Terminating state after you try to delete it, you must manually delete the pod. This is a known issue in IBM Cloud Private 2.1.0.2 and earlier, see [Cloud Private Known Issues](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0.1/getting_started/known_issues.html).

**Workaround:** Upgrade to IBM Cloud Private 2.1.0.3 or run the following command:
`kubectl -n <namespace> delete pods --grace-period=0 --force <pod_name>`

### Jenkins fails to mount persistent volume
If Jenkins is configured to use an existing persistent volume of less that 7GB it fails to mount that volume. By default an 8GB persistent volume is used.

**Workaround:**
Check the persistent volume size, and either increase its size to at least 7 GB, or use the default persistent volume.

### Swift projects fail to build on IBM Cloud Private
If your IBM Cloud Private cluster has a docker version below 17.05, Swift projects fail to build.

**Workaround** Upgrade Docker to the latest Docker Community Edition (CE) image. For more information, see [Docker guides](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1).

### Pipeline deployments intermittently hang
Jenkins agents intermittently hang during pipeline deployments.

**Workaround**
Check the version of IBM Cloud Private. You might experience this problem if you are using version IBM Cloud Private 2.1.0.2 or earlier. Upgrade to IBM Cloud Private 2.1.0.3 which has fixes related to storage.

### Open pipeline results in 404 Not Found
Immediately after creating a new pipeline, clicking *Open pipeline* might result in a "404 Not found" page after logging into Jenkins.

**Workaround**
The Jenkins job is created asynchronously. Periodically refresh this page in the browser until the job has been created and the page returns successfully.

### Jenkins executors do not become available
Intermittently, Jenkins slaves are unable to be launched, and so builds do not happen.

**Workaround**
Adjust the container cap in Jenkins, which defaults to 50. In Jenkins, from the *Jenkins* button, click on the dropdown to expand the menu, click *Manage Jenkins > Configure System*, then find the *Container Cap* parameter. Adjust the value according to your needs.

### Microclimate on localhost not connecting to remote Microclimate in IBM Cloud Private
Make sure you deploy your Microclimate to IBM Cloud Private.

**Workaround** In your local Microclimate instance, check that the URL you use to connect to the IBM Cloud Private instance is of a similar format to the following URL and not the IBM Cloud Private console URL.

`https://microclimate.<ICP proxy>.nip.io/`

If this URL returns a `500 Internal Server Error` message, check your Microclimate version. You must have at least Microclimate 18.05 to make a connection to Microclimate in IBM Cloud Private 2.1.0.3.

Microclimate 18.05 (ibm-charts/ibm-microclimate/1.2.1) on IBM Cloud Private 2.1.0.3 does not use user and password authentication for the remote connection. For example, enter `admin/admin`.

To view the logs, use the following command:
```
docker logs -f microclimate-portal
```

### Swift container failing to build
Look at the `icp-mc.log` file by issuing the following command:
```
kubectl logs <microclimate-instance> microclimate-file-watcher > icp-mc.log
```

If the Swift container is failing to build, the Swift generators are building multi-stage Dockerfiles that are not compatible with IBM Cloud Private.

**Workaround** Upgrade Docker to the latest Docker Community Edition (CE) image. For more information, see [Docker guides](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1).

To see the latest Docker versions that are supported by IBM Cloud Private, see [Supported Docker versions](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0.3/supported_system_config/supported_docker.html).

### Unable to deploy applications or deployed applications not appearing
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

### Broken pipeline links

You might encounter a broken link if you try to access a newly created pipeline.

**Workaround** Wait a moment before trying to access the page again. If the link does not become available, delete and recreate the pipeline.

### Microclimate installation fails and cannot be uninstalled
The Microclimate Helm chart creates service accounts, cluster roles, and cluster role bindings when you install into a non-default namespace. The installation process requires several Kubernetes jobs to complete. These jobs rely on service accounts and cluster roles that already exist.

If you need to create these roles manually, first replace any Helm functions, such as `{{ "{{ .Release.Namespace " }}}}`, with the namespace in which you want to create the role. Then, create the roles with the provided role files in the `templates` folder of the Helm chart.

You can use the `kubectl create -f <role file>` command to create the resources first. Configure the created service accounts to use these roles.

You can delete jobs that are failing or hanging just like you can delete other Kubernetes resources. For example, you can use the `kubectl delete job <Microclimate release name>-user-clean-up` and `kubectl delete job <Microclimate release name>-ibm-microclimate-delete-job` commands.

Enter these commands while the Helm deletion of the release is in progress so that the Helm delete command completes.

## Solving problems on Mac
The following list describes common problems that might affect Microclimate on Mac.

- [Edit code view does not show](#edit-code-view-does-not-show)

### Edit code view does not show

Sometimes the **Edit code** view doesn't display correctly. When you click the **Edit code** tab, you see only an empty space where the code editor should be.

**Workaround** Stop and start Microclimate with the following commands:
```
~/mcdev stop
~/mcdev start
```

## Solving problems on Windows
The following list describes common problems that might affect Microclimate on Windows.

- [cli\install.ps1 cannot be loaded, the file is not digitally signed](#install-file-cannot-be-loaded-because-the-file-is-not-digitally-signed)
- [Cannot create container for service microclimate-portal: Drive has not been shared](#cannot-create-container-for-service-because-drive-has-not-been-shared)
- [An error occurred while attempting to store the license status](#an-error-occurred-while-attempting-to-store-the-license-status)
- [Editing project files using an external IDE editor does not deploy changes to the server](#editing-project-files-using-an-external-ide-editor-does-not-deploy-changes-to-the-server)
- [Projects created never start after installing Microclimate](#projects-created-never-start-after-installing-microclimate)

### Install file cannot be loaded because the file is not digitally signed

The cli\install.ps1 file cannot be loaded, the file is not digitally signed.

The default security settings on Windows 10 and Windows Server 2016 do not allow downloaded PowerShell scripts to run.

**Workaround:** Right-click on the microclimate.zip file and open the file Properties menu. On the General tab, tick the Unblock box beside the "This file came from another computer" message. Unzip the file again and retry the `cli\install.ps1` script.

### Cannot create container for service because drive has not been shared

Cannot create container for service microclimate-portal: Drive has not been shared

**Workaround:** Ensure that your local disk drive is enabled for sharing in Docker: open Docker->Settings->Shared Drives, and select the drive that you installed Microclimate on. Restart Microclimate by using the `mcdev start` command.

### An error occurred while attempting to store the license status

When you start Microclimate, this message might be issued when you accept the Microclimate license.

**Workaround:** Ensure that your local disk drive is enabled for sharing in Docker: open Docker->Settings->Shared Drives, then restart Docker for Windows.

### Editing project files using an external IDE editor does not deploy changes to the server

Changes to project files using an external IDE/editor are not reflected on the running application.

**Workaround:** Editing the same files in the Microclimate Theia editor builds and deploys the changes to the server.

### Projects created never start after installing Microclimate

Intermittently on Windows after an install of Microclimate, projects can be created but they never start up (remain in Starting). There is an issue with Docker for Windows where, although it shows a volume is mounted, it does not allow any writing to the volume. A good indicator this is the issue is to verify there is no microclimate-workspace directory created within the directory you ran the Microclimate install from.

**Workaround:** There can be many reasons for this issue to crop up, and therefore many possible workarounds. First, confirm there is a shared drive selected by opening up the Docker->Settings->Shared Drives. If there is one selected, unselect it, hit Apply, and then retry creating projects. If that does not correct the issue and you are using an ID for that shared drive that is not your current user, ensure that the ID being used does not have a password expired that requires a password reset. Finally, if all else fails it might require removing Microclimate (mcdev delete), ensuring Docker for Windows shows a mounted drive selected, and then restarting Microclimate (mcdev start).

## Solving problems on Linux
The following list describes common problems that might affect Microclimate on Linux.

- [Standard init Linux exec format error](#standard-init-linux-exec-format-error)

### Standard init Linux exec format error

Linux reports standard_init_linux.go:195: exec user process caused "exec format error".

Microclimate Docker images are available for x86-64 architectures only. On other Linux architectures, Microclimate fails to start, and places this error message in the Microclimate Docker container logs.

## Solving problems with Theia
The following list describes common problems that might affect Theia.

- [Theia container leaking memory](#theia-container-leaking-memory)
- [New projects sometimes do not show in Theia's hierarchy view](#new-projects-sometimes-do-not-show-in-theia-hierarchy-view)

### Theia container leaking memory
If left up and running, over time, the Theia container in Microclimate leaks memory. The Theia team is aware of this, and are currently pursuing a fix for this issue. For more information, see [Virtual memory usage continuously grows](https://github.com/theia-ide/theia/issues/1284).

**Workaround** In Microclimate, reload the Theia editor to release memory.

### New projects sometimes do not show in Theia hierarchy view
Sometimes when a new project is created, it doesn't show up in Theia's hierarchy view.

**Workaround** In Microclimate, refresh the page in the browser.

## Solving problems with Docker
The following list describes common problems that might affect Docker.

- [Microclimate does not start](#microclimate-does-not-start)
- [Project build fails with Docker build failed message](#project-build-fails-with-docker-build-failed-message)
- [Docker container crashes unexpectedly](#docker-container-crashes-unexpectedly)

For more information, see [Docker guides](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1).

### Microclimate does not start
Microclimate not starting might be because Docker isn't functioning correctly.

**Workaround** To get Docker working correctly, you can restart Docker, prune images, or clean up old images.

To restart Docker, right click the Docker symbol in your taskbar and select `Restart`.

To prune Docker images, use the following Docker command:
```
docker system prune -a
```

For more information about removing old Docker images, including old, dangling, and stopped container images, see the [stackoverflow article: 'Docker: What is a dangling image and what is an unused image?'](https://stackoverflow.com/questions/45142528/docker-what-is-a-dangling-image-and-what-is-an-unused-image).

### Project build fails with Docker build failed message
The project build can fail if the Docker image build fails. The docker build logs are not currently exposed in the UI.

**Workaround**
To see if the Docker image build failed, look at the docker build output by checking the microclimate-file-watcher container logs.
* Local: ```docker logs <container id of microclimate-file-watcher>```
* IBM Cloud Private: ```kubectl logs <microclimate-pod> --container=microclimate-file-watcher```

### Docker container crashes unexpectedly
Your Docker container might crash unexpectedly.

**Workaround** For some useful tips about how to debug a crashed container image, see the [medium.com article: '5 ways to debug an exploding Docker container'](https://medium.com/@pimterry/5-ways-to-debug-an-exploding-docker-container-4f729e2c0aa8).

## If all else fails
If all else fails, you've tried fixing your Microclimate installation and have not been successful, it might be that one or more of the components in your installation is out of date, corrupted, or has stopped working for some unknown reason.

**Workaround** Reach out to us on Slack to have a chat or to raise a bug, we'd love to hear from you. For more information, see our [Community](community) page. Another option is to reinstall Microclimate, for which see [Updating Microclimate](./update).
