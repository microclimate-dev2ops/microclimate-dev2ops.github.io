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

**Workaround:** Disable SSL validation on your webhook in GitLab or GitHub. If you require SSL validation, replace any Microclimate Jenkins TLS self-signed certificate with a CA signed certificate.  The process of replacing the Microclimate Jenkins TLS certificate can be found in the readme of the Helm chart. For GitLab, you have the additional option of configuring GitLab to accept the custom certificate, see the GitLab documentation for details.

## Errors during project deletion for projects that take longer to delete
For certain projects that take longer to delete, you might see an error stating that the project could not be deleted, and an error message stating to try again later. Often the project has been deleted, but needs a refresh to show that it's gone.

**Workaround:** Wait for a short period of time, and then refresh the browser.

## HTTPS URLs won't launch in Microclimate
When launching applications from the Open Application view in Microclimate, HTTPS URLs within the application fail to open. For example, the links on the home page of a newly generated Swift application reference HTTPS URLs. This problem happens only for HTTPS URLs, HTTP URLs work properly.

**Workaround:** Open HTTPS URLs using a new browser tab.

## Theia container leaking memory
If left up and running, over time, the Theia container in Microclimate leaks memory. The Theia team is aware of this, and are currently pursuing a fix for this issue. https://github.com/theia-ide/theia/issues/1284

**Workaround** In Microclimate, reloading the Theia editor releases the memory.

## Theia stops working when second window opened
If a second Theia window is opened for the same micrcoclimate instance the first Theia window will stop working and you cannot edit files, open files, or expand folders. The Theia team is aware of this, and are currently pursuing a fix for this issue. https://github.com/theia-ide/theia/issues/1930.

**Workaround** Micrclimate is not yet enabled for multiple users and must be used in a single window by a single user.  

## New projects sometimes don't show in Theia's hierarchy view
Sometimes when a new project is created, it doesn't show up in Theia's hierarchy view.

**Workaround** Refresh the Microclimate page in the browser.

## Application Monitoring unavailable after Project Import
If an application has been imported via GIT/File, it is possible that when selecting App Monitor the dashboard is not displayed and results in a 'Cannot GET /appmetrics-dash/'. This is because the application was not created by Microclimate or previously had AppMetrics integration.  

**Workaround**
Further details on enabling applications within the AppMetrics can be found on the project pages https://github.com/RuntimeTools/ (appmetrics,javametrics, swiftmetrics).

# IBM Cloud Private


## Projects fail to update
After several days of heavy use, inotify may fail to start in Microclimate's microclimate-file-watcher container, with "Couldn’t initialize inotify" messages displayed in the microclimate-file-watcher logs. After this error, updates to other running projects are not detected.

**Workaround:**
This is a known issue with inotify on Kubernetes (see https://github.com/kubernetes/kubernetes/issues/10421). To fix this, reboot the IBM Cloud Private cluster. After the reboot, inotify works properly, and projects can be updated.

## Changing the Theia preference to show all projects may not be persisted
When clicking on the gear icon in the upper-right corner of the screen and accessing the preferences page, changing the Theia option to show all projects and clicking on "Save" may not persist the preference.

**Workaround:**
Check that a directory named ".config" exists in the microclimate workspace. If the directory is missing, create it. After that, restart Microclimate and the preference persistence should work.

## Microclimate Node port is an internal IP address and is not accessible
For IBM Cloud Private clusters built on OpenStack environments, with floating IP addresses, the Microclimate portal Node port that appears in the helm installation notes and on the IBM Cloud Private Services view might have an IP address that is internal to the IBM Cloud Private cluster. This IP address is not accessible in the user's browser.

**Workaround:**
You can access Microclimate by replacing the internal IP portion of the Microclimate URL with the external IBM Cloud Private cluster IP address. The external IP address can be obtained using the `kubectl cluster-info` command. The recommended permanent solution is to specify the `proxy_access_ip` when configuring IBM Cloud Private in an OpenStack environment. For more information, see https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/installing/config_yaml.html.

## Pods remain stuck in terminating state on IBM Cloud Private 2.0.1.2 and earlier
If a pod that uses a GlusterFS PersistentVolume for storage is stuck in the Terminating state after you try to delete it, you must manually delete the pod. This is a known issue in IBM Cloud Private https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0.1/getting_started/known_issues.html

**Workaround:** Upgrade to IBM Cloud Private 2.1.0.3 or run the following command:
`kubectl -n <namespace> delete pods --grace-period=0 --force <pod_name>`

## Jenkins fails to mount persistent volume.  
If Jenkins is configured to use an existing persistent volume of less that 7GB it will fail to mount that volume. By default an 8GB persistent volume is used.

**Workaround:**
Check the persistent volume size, and either increase its size to at least 7 GB, or use the default persistent volume.

## Node.JS Service Enablement Does not work on IBM Cloud Private 
On Microclimate 18.05, Node projects created with an IBM Cloud service enablement will fail to deploy on IBM Cloud Private due to required secrets that are missing. 

**Workaround:**
To use IBM Cloud service enablement with a Node project, for each service required, create the required secret and patch it into your service account beforehand. See the following table to see what secrets are required for each service enablement. 

| Service        | Secret                     | 
| ---------------|:--------------------------:|
| Alert          | bind-alert-name            |
| AppId          | binding-auth-name          |
| Cloudant       | binding-cloudant-name      |
| MongoDB        | binding-my-mongodb         |
| Object Storage | binding-object-storage-name|
| Postgres       | binding-my-postgresql      |
| Push           | binding-push-name          |
| Redis          | binding-my-redis           |
| Watson SDK     | binding-conversation-name  |

Each secret must have a key named "binding". The value corresponding to "binding" will depend on the type of service selected.

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
