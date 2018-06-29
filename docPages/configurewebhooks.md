---
layout: document
title: Configuring webhooks
description: Configuring webhooks
keywords: pipeline, configure, config, webhook, github, gitlab, git, Jenkins, travis
duration: 1 minute
permalink: configurewebhooks
type: document
---

You can configure webhooks on your Git repository so that your pipeline is automatically triggered based on certain Git repository events. For example, on pushes to the branch or, on the creation of pull requests. You do not need the webhook for the initial build, and branch indexing occurs every 15 minutes regardless of the webhook being present.

### GitLab

GitLab can be deployed to a Kubernetes cluster by using the [Helm chart](https://docs.gitlab.com/ce/install/kubernetes/gitlab_omnibus.html).

Microclimate automatically attempts to create webhooks for repositories in GitLab and does not succeed if you do not provide a valid personal access token on the pipeline credentials. For GitLab, the automatically created webhook, if successfully made, is configured to trigger whenever a push event occurs and whenever a merge request event occurs. SSL validation is currently disabled by default for the automatically created webhook, this is because MicroClimate uses a self-signed certificate.  Note: This certificate can be changed and you can manually modify the webhook to have SSL validation enabled should you want to. See [known issues](./knownissues) for more details.

If the webhook is not automatically added on your repository, follow these steps to manually create a webhook.

To create webhooks in GitLab:

1. From your repository in GitLabb, click ```Settings```, ```Integrations```.
2. Enter the URL: ```JENKINS_URL/git/notifyCommit?url=GITHUB_URL```, replacing ```JENKINS_URL``` with the base URL of your Jenkins deployment and ```GITHUB_URL``` with the URL of the GitHub repository. For example, ```http://jenkins.1.2.3.4.nip.io/git/notifyCommit?url=https://gitlab.mycompany.com/microclimate-demo/node.git```.
3. From the list of trigger events that are displayed, select ```Push events``` and ```Merge Request event```.
4. Uncheck the ```Enable SSL Verification``` check box unless you have taken actions to enable SSL verification to work successfully. See [known issues](./knownissues) for more details.
5. Click ```Add webhook```.

To edit a webhook, perhaps to add additional triggers:

1. From your repository in GitLab, click ```Settings```, ```Integrations```
2. Scroll down to see the list of configured webhooks and then click the ```Edit``` button next to the specific webhook you want to edit.
2. Modify the webhook settings as required.
3. Click ```Save changes```.

### GitHub

Microclimate automatically attempts to create webhooks for repositories in GitHub and does not succeed if you do not provide a valid personal access token on the pipeline credentials. These credentials can be user name and password or personal access token. For GitHub, the automatically created webhook, if successfully made, is configured to trigger whenever a push event occurs and whenever a pull request event occurs. SSL validation is currently disabled by default for the automatically created webhook, this is because MicroClimate uses a self-signed certificate.  Note: This certificate can be changed and you can manually modify the webhook to have SSL validation enabled should you want to. See [known issues](./knownissues) for more details.

If the webhook is not automatically added on your repository, follow these steps to manually create a webhook:

To create webhooks in GitHub:

1. From your repository in GitHub, click ```Settings```, ```Webhooks```, and then click ```Add webhook```.
2. Enter the Payload URL: ```JENKINS_URL/git/notifyCommit?url=GITHUB_URL```, replacing ```JENKINS_URL``` with the base URL of your Jenkins deployment and ```GITHUB_URL``` with the URL of the GitHub repository. For example, ```http://jenkins.1.2.3.4.nip.io/git/notifyCommit?url=https://github.com/microclimate-demo/node.git```.
3. Click the ```Disable SSL Verification``` button unless you have taken actions to enable SSL verification to work successfully. See [known issues](./knownissues) for more details.
4. Select the ```Let me select individual events``` option.
5. From the list of events that are displayed, select ```Pull requests``` and ```Pushes```.
6. Click ```Add webhook```.

To edit a webhook, perhaps to add additional triggers:

1. From your repository in GitHub, click ```Settings```, ```Webhooks```, and then click the ```Edit``` button next to the specific webhook you want to edit.
2. Modify the webhook settings as required.
3. Click ```Update webhook```.
