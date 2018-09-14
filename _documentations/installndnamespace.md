---
layout: docs
title: Installing Microclimate into a non-default namespace
description: Installing Microclimate into a non-default namespace
keywords: configure, config, namespace, install, installation, secrets, Docker registry secrets, Helm secret, service accounts, chart
duration: 10 minutes
permalink: installndnamespace
type: document
parent: linkinstallionicp
order: 1
---

Microclimate can be installed into a non-default namespace. Example commands and snippets are provided here as it's something that requires more than a basic understanding of Kubernetes. There's also plenty of scope for customizing the install.

Follow this procedure, and for more information about each step you can refer to the detailed explanations.

1.  Optionally, create the namespace that you want to use for Microclimate. Be aware that deployed applications continue to be in the namespace as specified by the `jenkins.Pipeline.TargetNamespace` parameter when you configure the chart.
2. Create secrets.
3. Install the chart with additional configuration options.
4. Validate your install.

## (Optional): Creating the namespace
If you do not have a namespace to deploy into, for example, one set up by your cluster administrator, create one with the `kubectl create namespace <anything>` command. For example:

`kubectl create namespace ns2`

In this topic, a worked example is provided by using `ns2` as the namespace name.

## Creating secrets
Create the secrets for Docker registry and Helm. Create the secrets in the same namespace as the Devops service account by appending `--namespace ns2` to your secret creation commands.

### Docker registry secrets
Create secrets for the Microclimate Docker registry and, if applicable, your own Docker repository.

#### Creating the Microclimate Docker registry secrets
To create the Microclimate Docker registry secrets, use the following example command:

`kubectl create secret docker-registry microclimate-registry-secret --docker-server mycluster.icp:8500 --docker-username dockeruser --docker-password dockerpass --docker-email dockeremail --namespace ns2`

#### Creating secrets to use with your own Docker image repository
If you are using your own Docker image repository, use the following example command:

`kubectl create secret docker-registry artifactory --docker-server artifactoryserver --docker-username artifactoryusername --docker-email artifactoryemail --docker-password artifactorycredentials --namespace ns2`

#### Creating the Helm secret

Before you install the Helm secret, install the IBM Cloud Private command-line interface (CLI), `cloudctl`, and log on to the cluster by running the `cloudctl login` command:

```
icpmaster=<ICP master IP address>
curl -O https://$icpmaster:8443/api/cli/cloudctl-linux-amd64 --insecure
chmod +x cloudctl-linux-amd64
cp ./cloudctl-linux-amd64 /usr/local/bin/cloudctl
cloudctl login -a https://$icpmaster:8443 --skip-ssl-validation
```

For more information, see [IBM Cloud CLI Installer](https://console.bluemix.net/docs/cli/reference/bluemix_cli/all_versions.html#ibm-cloud-cli-installer-all-versions). This login command downloads the `cert.pem`, `ca.pem`, and `key.pem` files in the `$HELM_HOME` directory.

Next, create the Helm secret with the following example command:

`kubectl create secret generic microclimate-helm-secret --from-file=cert.pem=$HELM_HOME/cert.pem --from-file=ca.pem=$HELM_HOME/ca.pem --from-file=key.pem=$HELM_HOME/key.pem --namespace ns2`

## Install the chart
You must specify two additional options when you install into a non-default namespace.

For Microclimate's Portal and File Watcher, set `global.rbac.serviceAccountName` to reference the service-account that you would like to be created for Portal/File Watcher, for example, `ns2-micro-sa` in the example command at the end of this section.

For DevOps and Jenkins, set `jenkins.rbac.serviceAccountName`, again referencing the service account that you would like to be created for DevOps and Jenkins, for example, `ns2-devops-sa` in the example command at the end of this section.

An example of installing from the command line is as follows:

`helm install --name microclimate --namespace ns2 --set global.rbac.serviceAccountName=ns2-micro-sa,jenkins.rbac.serviceAccountName=ns2-devops-sa,hostName=microclimate.${INGRESS_IP}.nip.io,jenkins.Master.HostName=jenkins.${INGRESS_IP}.nip.io ibm-charts/ibm-microclimate`

The Helm install automatically creates the service-accounts that you specified, `global.rbac.serviceAccountName` and `jenkins.rbac.serviceAccountName`. It then patches those accounts with the `microclimate-registry-secret` that was created earlier and then creates the necessary ClusterRoles and ClusterRoleBindings for each service account.

If additional ImagePullSecrets are required for Microclimate, make sure to set the value `global.additionalImagePullSecrets` to a YAML array of ImagePullSecrets created in your namespace, prior to installation.

## Validate your install
Kubernetes resources that are created by Microclimate, such as pods and persistent volumes, sit in the specified namespace so any `kubectl` commands you use must also include the `--namespace <namespacename>` option.

1. Check that projects can be created and imported.
Create or import a project through the Microclimate UI. The project's information is stored in the persistent volume that sits in the same namespace as your deployed Microclimate instance.

2. Check that the DevOps endpoint can be accessed.
Issue the following command `kubectl port-forward <DevOps pod name> 9191:9191>`, and then access `localhost:9191/projects` in your web browser. You must not see any "forbidden" messages reported. If you do, check that the service account is being used, as reported in the pod information, and that the role and binding have been correctly created and applied with the appropriate permissions.

You can also expose the Microclimate Devops deployment by issuing the following command:

`kubectl expose deployment <your-release-name>-ibm-microclimate-devops --type=NodePort --name <your release name>-devops-svc --namespace <namespacename>`

This creates a new Kubernetes service that you can access in your web browser by visiting the Devops endpoint and accessing the `https://<proxy node IP address>:<Devops NodePort>/v1/projects` endpoint.

Note: This endpoint should be unexposed immediately afterwards and should be used for validation purposes only.

3. Check that the service account is picked up by Jenkins when interacting with projects as part of a pipeline.
Create a pipeline and then start a build. Check the logs for `serviceAccountName` in a build or use the Jenkins UI. In the Jenkins UI, click on ```Manage Jenkins```, and then click on ```Configure System``` where the Jenkins environment variables are listed and can be configured. The variable `SERVICE_ACCOUNT_NAME` must be set to the DevOps or Jenkins service account name, which in this example is `ns2-devops-sa`.
