---
layout: document
title: Known issues and limitations
description: Known issues and limitations
duration: 1 minute
permalink: knownissues
type: document
---
# General issues

## Errors during project deletion for projects that take longer to delete
For certain projects that take longer to delete, you might see an error stating that the project could not be deleted, and an error message stating to try again later. Often the project has been deleted, but needs a refresh to show that it's gone.

**Workaround:** Wait for a short period of time, and then refresh the browser.

## HTTPS URLs won't launch in Microclimate
When launching applications from the Open Application view in Microclimate, HTTPS URLs within the application fail to open. For example, the links on the home page of a newly generated Swift application reference HTTPS URLs. This problem happens only for HTTPS URLs, HTTP URLs work properly.

**Workaround:** Open HTTPS URLs using a new browser tab.

## Java Applications do not start after running mcdev delete
If a java application is created and `mcdev` delete is then used to remove Microclimate, java applications no longer start when Microclimate is restarted.

**Workaround** Stop Microclimate, delete the `.idc` directory from the microclimate-workspace directory, and then start Microclimate.

## Theia container leaking memory
If left up and running, over time, the Theia container in Microclimate leaks memory. The Theia team is aware of this, and are currently pursuing a fix for this issue. https://github.com/theia-ide/theia/issues/1284

**Workaround** In Microclimate, reloading the Theia editor releases the memory.

## Application Monitoring unavailable after Project Import
If an application has been imported via GIT/File, it is possible that when selecting App Monitor the dashboard is not displayed and results in a 'Cannot GET /appmetrics-dash/'. This is because the application was not created by Microclimate or previously had AppMetrics integration.  

**Workaround**
Further details on enabling applications within the AppMetrics can be found on the project pages https://github.com/RuntimeTools/ (appmetrics,javametrics, swiftmetrics).

# IBM Cloud Private (ICP)

## Helm releases deployed by Microclimate do not appear in the IBM Cloud Private dashboard
Microclimate must be deployed in to the default namespace. Microclimate deploys its own Helm Tiller in to that namespace. As a consequence, Helm releases deployed by Microclimate do not appear in the IBM Cloud Private dashboard. The Microclimate Helm Tiller and portal do not currently have access control and consequently Microclimate should not be deployed in to a production environment.

## Projects fail to update
After several days of heavy use, inotify may fail to start in Microclimate's microclimate-file-watcher container, with "Couldn’t initialize inotify" messages displayed in the microclimate-file-watcher logs. After this error, updates to other running projects are not detected.

**Workaround:**
This is a known issue with inotify on Kubernetes (see https://github.com/kubernetes/kubernetes/issues/10421). To fix this, reboot the ICP cluster. After the reboot, inotify works properly, and projects can be updated.

## Microclimate Node port is an internal IP address and is not accessible
For ICP clusters built on OpenStack environments, with floating IP addresses, the Microclimate portal Node port that appears in the helm installation notes and on the ICP Services view might have an IP address that is internal to the ICP cluster. This IP address is not accessible in the user's browser.

**Workaround:**
You can access Microclimate by replacing the internal IP portion of the Microclimate URL with the external ICP cluster IP address. The external IP address can be obtained using the `kubectl cluster-info` command. The recommended permanent solution is to specify the `proxy_access_ip` when configuring ICP in an OpenStack environment. For more information, see https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/installing/config_yaml.html.

## Swift build logs are empty in ICP
Swift build logs are currently not visible in the Build logs view when Microclimate is running in ICP.

## Microclimate becomes unresponsive during project deletion
Microclimate may occasionally become unresponsive during project deletion.

**Workaround**
Refresh the webpage and the UI will become responsive once again. The project will have also been deleted.

## Imported projects fail to start on ICP
When you import a project to Microclimate on ICP, if the project name doesn't match the Helm chart name defined in the project, then the project will fail to start.

**Workaround**
During project import, change the project name to match the Helm chart name.

## Generated Swift projects require a Dockerfile change to be deployed with the Microclimate pipeline
For the Beta, generated Swift projects cannot easily be deployed through the Microclimate pipeline to ICP. This is because the generated project assumes you are building the application yourself locally, and doesn't include the Jenkinsfile.

To get around this you can modify the `Dockerfile` in your source repository that the pipeline uses so that it is based on `ibmcom/swift-ubuntu`, this contains the Swift binary to build your project. You also need to include `RUN cd /swift-project && swift build` after the `COPY` to swift-project command, and finally you'll need to add `CMD [ "sh", "-c", "cd /swift-project && .build/x86_64-unknown-linux/debug/project-name" ]` to actually run the Swift project when it's built.

An example Swift project that can be deployed with the Microclimate pipeline has been provided [on Github](https://github.com/a-roberts/adamswift). You also need to include the `Jenkinsfile` where `image` is what you'd like your release to be named, this can be anything, and `CHART_FOLDER` is the location of the Helm chart, for example, `chart/project-name`.

## Pods remain stuck in terminating state
If a pod that uses a GlusterFS PersistentVolume for storage is stuck in the Terminating state after you try to delete it, you must manually delete the pod. This is a known issue in ICP https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0.1/getting_started/known_issues.html

**Workaround:** Run the following command:
`kubectl -n <namespace> delete pods --grace-period=0 --force <pod_name>`

## Locked out of GitLab
When you use our GitLab as a source code repository, it is possible to lock yourself out of GitLab due to rack-attack being enabled in GitLab. This happens if you specify incorrect credentials on a pipeline accessing GitLab, after a number of failed logins, GitLab blocks access to the Jenkins IP.

**Workaround:** Wait for one minute before attempting again with correct credentials. Note: Rack Attack can be disabled by using `kubectl exec -it <your Gitlab pod name> /bin/bash` to launch a Bash shell where Gitlab is running, you then modify `/etc/gitlab/gitlab.rb` and add the following:

```
gitlab_rails['rack_attack_git_basic_auth'] = {
   'enabled' => false,
}
```

You can retrieve the Gitlab pod name by running `kubectl get pods | grep -i gitlab`, assuming you have [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) downloaded, it's executable, and is configured to point to your Kubernetes cluster where Microclimate is installed.

## Dockerfile edit does not start the Liberty server after a container refresh
On making a Dockerfile change in a ICP 2.1.0.2 Cluster, the Liberty server is not started after a container refresh.

**Workaround:** The pom.xml can be edited, with any trivial change, to trigger a restart of the Liberty Server.

# Linux

## standard_init_linux.go:195: exec user process caused "exec format error"
Microclimate Docker images are available for x86-64 architectures only. On other Linux architectures, Microclimate fails to start, and places this error message in the Microclimate Docker container logs.

# Windows

## Microclimate beta does not support Microsoft Edge.
For the beta, Microclimate does not support Microsoft Edge.

**Workaround:** Use a different web browser.

## cli\install.ps1 cannot be loaded, the file is not digitally signed
The default security settings on Windows 10 and Windows Server 2016 do not allow downloaded PowerShell scripts to run.

**Workaround:** Right-click on the microclimate.zip file and open the file Properties menu. On the General tab, tick the Unblock box beside the "This file came from another computer" message. Unzip the file again and retry the `cli\install.ps1` script.

## Cannot create container for service microclimate-portal: Drive has not been shared

**Workaround:** Ensure that your local disk drive is enabled for sharing in Docker: open Docker->Settings->Shared Drives, and select the drive that you installed Microclimate on. Restart Microclimate by using the `mcdev start` command.

## An error occurred while attempting to store the license status
When you start Microclimate, this message might be issued when you accept the Microclimate license.

**Workaround:** Ensure that your local disk drive is enabled for sharing in Docker: open Docker->Settings->Shared Drives, then restart Docker for Windows. This can often be a glitch in Docker for Windows. Going into the same Shared Drives settings and deselecting the shared drive->Apply->reset credentials->selecting the shared drive again will resolve the issue.

## An application is not accessible after a Dockerfile edit on Windows
On Windows, after making a Dockerfile change, the Liberty server is not started.

**Workaround:** A pom.xml edit or running the `mcdev` restart command, restarts the Liberty Server.

## Editing project files by using an external IDE/editor does not deploy changes to the server
Changes to project files using an external IDE/editor are not reflected on the running application.

**Workaround:** Editing the same files in the Microclimate Theia editor builds and deploys the changes to the server.
