---
layout: document
title: Known issues and limitations
description: Known issues and limitations
duration: 1 minute
permalink: knownissues
type: document
---
# General

## Errors during project deletion for projects that take longer to delete
For certain projects that take longer to delete, you may see an error stating the project could not be deleted and an error stating to try again later. Often the project has actually been deleted, and will reflect so after a refresh.

**Workaround:** Wait for a short period of time, and then refresh the brower.

## HTTPS links won't launch in Microclimate
When you test the user application from the Open Application view in Microclimate UI, HTTPS links within the application fail to open, for example, the links on the home page on a created Swift application. This problem happens only for HTTPS links, HTTP links work properly. 

**Workaround:** Open HTTPS links on a new browser tab.

## Java Application does not start after running mcdev delete
If a java application is created and mcdev delete is then used to delete the Microclimate Docker images the java application no longer starts when Microclimate is restarted.

**Workaround** Stop Microclimate, delete the .idc directory from the microclimate-workspace directory, and then start Microclimate.

## Theia container leaking memory
If left up and running over time, the Theia container in Microclimate will leak memory. The Theia team is aware of this, and currently pursuing a fix for this issue. https://github.com/theia-ide/theia/issues/1284

**Workaround** Within Microclimate, reloading the Theia editor will release the memory.

## Application Monitoring unavailable after Project Import
If an application has been imported via GIT/File, it is possible that when selecting App Monitor the dashboard will not be dispayed and result in a 'Cannot GET /appmetrics-dash/'.  This is because the application was not created by Microclimate or previously had AppMetrics integration.  

**Workaround**
Further details on enabling applications within the AppMetrics can be found on the project pages https://github.com/RuntimeTools/  (appmetrics,javametrics,swiftmetrics)

# IBM Cloud Private (ICP)

## App Logs view empty in ICP
The current beta does not support the App Logs view withing the Microclimate UI when running in ICP. You can still view the application logs with the following workaround.

**Workaround:** 
List all pods deployed into ICP using the kubectl client, and identify your pod id from the output 
Command: `kubectl get pods`
Get the logs for your pod id 
command: `kubectl logs <<insert your pod id here>>

## Generated Swift projects require a Dockerfile change to be deployed with the Microclimate pipeline
For the Beta, generated Swift projects cannot trivially be deployed through the Microclimate pipeline to ICP. This is because the generated project assumes you will be building the application yourself locally, and doesn't include the Jenkinsfile. 

To get around this you can modify the `Dockerfile` in your source repository that the pipeline will use so that it instead is based on `ibmcom/swift-ubuntu` (this contains the Swift binary to build your project). You also need to include `RUN cd /swift-project && swift build` after the `COPY` to swift-project command, and finally you'll need to add `CMD [ "sh", "-c", "cd /swift-project && .build/x86_64-unknown-linux/debug/project-name" ]` to actually run the Swift project once it's built. 

An example Swift project that can be deployed with the Microclimate pipeline has been provided [on Github](https://github.com/a-roberts/adamswift). You will also need to include the `Jenkinsfile` whereby `image` is what you'd like your release to be named (this can be anything) and `CHART_FOLDER` is the location of the Helm chart (e.g. `chart/project-name`).

## Pods remain stuck in terminating state
If a pod that uses a GlusterFS PersistentVolume for storage is stuck in the Terminating state after you try to delete it, you must manually delete the pod. This is a known issue in ICP https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0.1/getting_started/known_issues.html

**Workaround:** Run the following command:
`kubectl -n <namespace> delete pods --grace-period=0 --force <pod_name>`

## Locked out of GitLab
When using our GitLab as source code repository, it is possible to lock yourself out of GitLab due to rack-attack being enabled in GitLab. This happens if you sepecify incorrect credentials on a pipeline accessing GitLab - after a number of failed logins, GitLab will block access to the Jenkins IP. 

**Workaround:** Wait for one minute before attempting again with correct credentials. Note that Rack Attack can be disabled by using `kubectl exec -it <your Gitlab pod name> /bin/bash` to launch a Bash shell where Gitlab is running, before then modifying `/etc/gitlab/gitlab.rb` and adding the following:

```
gitlab_rails['rack_attack_git_basic_auth'] = {
   'enabled' => false,
}
```

You can retrieve the Gitlab pod name by running `kubectl get pods | grep -i gitlab`, assuming you have [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) downloaded, is executable and is configured to point to your Kubernetes cluster where Microclimate is installed.

## Dockerfile edit does not start the Liberty server after a container refresh
On making a Dockerfile change in a ICP 2.1.0.2 Cluster, the Liberty server is not started after a container refresh.

**Workaround:** A pom.xml edit, restarts the Liberty Server.

# Linux

## standard_init_linux.go:195: exec user process caused "exec format error"
Microclimate Docker images are available for x86-64 architectures only. On other Linux architectures, Microclimate fails to start, and places this error message in the Microclimate Docker container logs.

# Windows

## Microclimate beta does not support Microsoft Edge.
For the beta, Microclimate is not supported in Microsoft Edge. 

**Workaround:** Use a different web browser.

## cli\install.ps1 cannot be loaded, the file is not digitally signed
The default security settings on Windows 10 and Windows Server 2016 do not allow downloaded PowerShell scripts to run.

**Workaround:** Right-click on the microclimate.zip file and open the file Properties menu. On the General tab, tick the Unblock box beside the "This file came from another computer" message. Unzip the file again and retry the cli\install.ps1 script.

## Dockerfile edit does not start the Liberty server after a container refresh
On making a Dockerfile change in Windows, the Liberty server is not started after a container refresh.

**Workaround:** A pom.xml edit or a Microclimate(mcdev) restart, restarts the Liberty Server.

## Editing project files by using an external IDE/editor does not deploy changes to the server
When you make changes to project files by using an external IDE/editor, the changes are not deployed to the server.

**Workaround:** Editing the same files in the Microclimate Theia editor, builds and deploys the changes to the server.

