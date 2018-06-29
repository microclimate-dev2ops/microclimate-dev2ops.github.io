---
layout: document
title: Known issues and limitations
description: Known issues and limitations
keywords: issues, workaround, memory, IBM Cloud Private
duration: 1 minute
permalink: knownissues
type: document
---
# General issues

## Webhooks not triggering Jenkins builds
Webhooks that have SSL validation configured might fail to trigger Jenkins jobs due to the presence of a self-signed certificate on the Jenkins kubernetes ingress definition. 

Webhooks only currently work if the owner or organisation name contains lower case characters. Webhook status is reported as a success but you must either wait until the branch is scanned for changes (it is checked every fifteen minutes), or kick off the Jenkins build manually.

**Workaround:** Disable SSL validation on your webhook in GitLab or GitHub. If you require SSL validation, replace any Microclimate Jenkins TLS self-signed certificate with a CA signed certificate.  The process of replacing the Microclimate Jenkins TLS certificate can be found in the readme of the Helm chart. For GitLab, you have the additional option of configuring GitLab to accept the custom certificate, see the GitLab documentation for details.

You must ensure that the owner or organisation name only contains lower case characters.

## Errors during project deletion for projects that take longer to delete
For certain projects that take longer to delete, you might see an error stating that the project could not be deleted, and an error message stating to try again later. Often the project has been deleted, but needs a refresh to show that it's gone.

**Workaround:** Wait for a short period of time, and then refresh the browser.

## Old projects fail to update, but new projects can be created
If the microclimate-file-watcher container restarts, it loses any tracking information it has on existing projects, which means any updates are undetected.

**Workaround:**
Restart Microclimate so that it can reinitialize the tracking for any existing projects.
* Local: `~/mcdev stop` followed by `~/mcdev start`.  
* ICP: Microclimate 1805 and earlier, restart the Microclimate pod: `kubectl delete pod <microclimate pod>`.
* ICP: Microclimate 1806, and later, the file-watcher container runs in a separate pod, so both the file-watcher pod and Microclimate pod need to be deleted: `kubectl delete pod <microclimate pod> <microclimate-file-watcher pod>`.

## HTTPS URLs won't launch in Microclimate
When launching applications from the Open Application view in Microclimate, HTTPS URLs within the application fail to open. For example, the links on the home page of a newly generated Swift application reference HTTPS URLs. This problem happens only for HTTPS URLs, HTTP URLs work properly.

**Workaround:** Open HTTPS URLs using a new browser tab.

## Theia container leaking memory
If left up and running, over time, the Theia container in Microclimate leaks memory. The Theia team is aware of this, and are currently pursuing a fix for this issue. https://github.com/theia-ide/theia/issues/1284

**Workaround** In Microclimate, reloading the Theia editor releases the memory.

## Theia stops working when second window opened
If a second Theia window is opened for the same Microclimate instance, the first Theia window stops working and you cannot edit files, open files, or expand folders. The Theia team is aware of this, and are currently pursuing a fix for this issue. https://github.com/theia-ide/theia/issues/1930.

**Workaround** Microclimate is not yet enabled for multiple users and must be used in a single window by a single user.  

## New projects sometimes don't show in Theia's hierarchy view
Sometimes when a new project is created, it doesn't show up in Theia's hierarchy view.

**Workaround** Refresh the Microclimate page in the browser.

## Application Monitoring unavailable after Project Import
If an application has been imported via GIT/File, it is possible that when selecting App Monitor the dashboard is not displayed and results in a 'Cannot GET /appmetrics-dash/'. This is because the application was not created by Microclimate or previously had AppMetrics integration.  

**Workaround**
Further details on enabling applications within the AppMetrics can be found on the project pages https://github.com/RuntimeTools/ (appmetrics,javametrics, swiftmetrics).

## Application stays in starting state
If there is a problem with the application and it fails to start, it might stay in starting state.

**Workaround**
Check the application logs to find out why the application did not start, then make changes to the application to fix the problem.  If automatic build is enabled a new build starts, otherwise start a new build manually by clicking the **Build** button.

## Turning off auto build has no effect for Node.js projects when you run Microclimate locally
If you turn off ```auto build``` for a Node.js project when you run Microclimate locally, it has no effect. Any changes you make to your code automatically start a build, or do a restart, even though ```auto build``` is disabled.

# IBM Cloud Private

## Projects fail to update
After several days of heavy use, inotify might fail to start in Microclimate's microclimate-file-watcher container, with "Couldn’t initialize inotify" messages displayed in the microclimate-file-watcher logs. After this error, updates to other running projects are not detected.

**Workaround:**
This is a known issue with inotify on Kubernetes (see https://github.com/kubernetes/kubernetes/issues/10421). To fix this, reboot the IBM Cloud Private cluster. After the reboot, inotify works properly, and projects can be updated.

## Imported Microprofile project doesn't start in IBM Cloud Private

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

## Pods remain stuck in terminating state on IBM Cloud Private 2.0.1.2 and earlier
If a pod that uses a GlusterFS PersistentVolume for storage is stuck in the Terminating state after you try to delete it, you must manually delete the pod. This is a known issue in IBM Cloud Private https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0.1/getting_started/known_issues.html

**Workaround:** Upgrade to IBM Cloud Private 2.1.0.3 or run the following command:
`kubectl -n <namespace> delete pods --grace-period=0 --force <pod_name>`

## Jenkins fails to mount persistent volume.  
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

# Linux

## standard_init_linux.go:195: exec user process caused "exec format error"
Microclimate Docker images are available for x86-64 architectures only. On other Linux architectures, Microclimate fails to start, and places this error message in the Microclimate Docker container logs.

# Windows

## Microclimate does not support Microsoft Edge.
Microclimate does not support Microsoft Edge.

**Workaround:** Use a different web browser.

## cli\install.ps1 cannot be loaded, the file is not digitally signed
The default security settings on Windows 10 and Windows Server 2016 do not allow downloaded PowerShell scripts to run.

**Workaround:** Right-click on the microclimate.zip file and open the file Properties menu. On the General tab, tick the Unblock box beside the "This file came from another computer" message. Unzip the file again and retry the `cli\install.ps1` script.

## Cannot create container for service microclimate-portal: Drive has not been shared

**Workaround:** Ensure that your local disk drive is enabled for sharing in Docker: open Docker->Settings->Shared Drives, and select the drive that you installed Microclimate on. Restart Microclimate by using the `mcdev start` command.

## An error occurred while attempting to store the license status
When you start Microclimate, this message might be issued when you accept the Microclimate license.

**Workaround:** Ensure that your local disk drive is enabled for sharing in Docker: open Docker->Settings->Shared Drives, then restart Docker for Windows.

## Editing project files by using an external IDE/editor does not deploy changes to the server
Changes to project files using an external IDE/editor are not reflected on the running application.

**Workaround:** Editing the same files in the Microclimate Theia editor builds and deploys the changes to the server.

## Projects created never start after install of Microclimate
Intermittently on Windows after an install of Microclimate, projects can be created but they never start up (remain in Starting). There is an issue with Docker for Windows where, although it shows a volume is mounted, it does not allow any writing to the volume. A good indicator this is the issue is to verify there is no microclimate-workspace directory created within the directory you ran the Microclimate install from. 

**Workaround:** There can be many reasons for this issue to crop up, and therefore many possible workarounds. First, confirm there is a shared drive selected by opening up the Docker->Settings->Shared Drives. If there is one selected, unselect it, hit Apply, and then retry creating projects. If that does not correct the issue and you are using an ID for that shared drive that is not your current user, ensure that the ID being used does not have a password expired that requires a password reset. Finally, if all else fails it may require removing Microclimate (mcdev delete), ensuring Docker for Windows shows a mounted drive selected, and then restarting Microclimate (mcdev start).

# Iterative development

The project name must match the chart folder name in order for the filewatcher pod to be able to function correctly. Project names are restricted to contain characters a to z and numbers 0 to 9.

**Workaround:** Create project names with the same name as the chart, ensuring the chart folder is named so it meets the restrictions of the naming convention.
