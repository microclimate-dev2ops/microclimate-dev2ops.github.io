---
layout: docs
title: Building an npm project with offline Microclimate
description: Building an npm project with offline Microclimate
keywords: offline, node.js, npm, project, build, building, nexus, github, gitlab, yaml, file, chart, helm, install, installation, delete, repository, tool, image, download, downloads, microclimate, values.yaml, Nexus
duration: 4 minutes
permalink: offlinemicroclimatenode
type: document
order: 3
parent: offlinemicroclimateusing
---

# Building an npm project with offline Microclimate
If you already have Nexus set up in-cluster or otherwise, you can skip to [Modify the Node.js Dockerfile](#modify-the-nodejs-dockerfile).

## Set the npm repository
In the offline Microclimate setup, Nexus was provisioned in-cluster to store dependencies, which can handle a variety of project and file types. In the case of npm projects, the `package.json` dependencies need to be resolved and stored by a hosted npm repository on the Nexus instance.

**Note:** Nexus has concepts of **blob stores** and **repositories**. A repository is mounted to a blob store. The repository pulls its dependencies and files from the blob store. You can pull from individual repositories or unify them into a group. With a group, you can access the union of their storage for dependency management. Generally, have one blob store per repository.

## Create blob stores and reposities for npm

1. Log in to Microclimate with the default username and password. Use `admin` for the username and `admin123` for the password. Click the **Server adminstration and configuration** button in the toolbar. From this repository administration page view, all necessary resources can be created.
2. Create a new blob store and name it `npm-dependencies`. Next, create a repository with the same name that will use this blob store.
- To resolve dependencies entirely offline, create an npm hosted repository. 
- To allow for online or proxied access, create an npm proxy repository.

3. Follow the same process to create another blob store named `npm-group`. As the name implies, this repository is an npm group repository. When creating the group repository, add the `npm-dependencies` repository as a member.

## Enable npm authorization
**Note:** If you are using an npm proxy repository, you can skip to [Modify the Node.js Dockerfile](#modify-the-nodejs-dockerfile).

1. From the dashboard, click the **Server adminstration and configuration** button in the toolbar. In the `Security` section, click the `Realms` element.
2. Add the `npm Bearer Token Realm` and then save. Now Nexus can accept publish requests from npm to store dependencies.

## Populate the npm hosted repository
**Note:** If you are using an npm proxy repository, you can skip to [Modify the Node.js Dockerfile](#modify-the-nodejs-dockerfile).

1. Log in to the Nexus repository with the following command:
```
npm login --registry=https://nexus.<PROXY_IP>.nip.io/repository/npm-group/
```

2. From within a particular dependency directory, publish to Nexus. By default, `npm publish` is configured to pull from the [public registry](https://registry.npmjs.org). Modify `npm publish` to point to the internal Nexus with one of the following options:
* Specify the `--registry=<NPM_REGISTRY>` flag to the publish command.

* Specify a `publishConfig` in the `package.json` file:
  ```
  "publishConfig" : {
  "registry" : "<NPM_REGISTRY>"
  }
  ```
* Create an `.npmrc` file with the necessary fields:
  ```
  registry=<NPM_REGISTRY>
  _auth=<AUTH> # _auth can be obtained as follows: echo -n <NEXUS_USER>:<Nexus_PASS> | openssl base64
  email=<EMAIL>
  ```
* Use the CLI to populate the local `.npmrc` config file. Use the following command to set the registry:
  ```
  npm config set registry <NPM_REGISTRY>
  ```

## Modify the Node.js Dockerfile
The Node.js template project Dockerfile consists of the following code:
```
FROM node:8-stretch

WORKDIR "/app"

# Install app dependencies
COPY package.json /app/
RUN apt-get update \
 && apt-get dist-upgrade -y \
 && apt-get clean \
 && echo 'Finished installing dependencies'
RUN cd /app; npm install --production

COPY . /app

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000
CMD ["npm", "start"]
```

The first `FROM` layer specifies against Docker Hub, which is a public endpoint that is not available to an offline cluster. However, you can tag the image and push it into the internal registry.

Some `apt-get` commands need internal cluster and network resolution, or they fail in an offline scenario. To prevent failure, go to a system that has network access and then create and push the following intermediate image to the internal Docker registry:
```
cat << DOCKERFILE > Dockerfile
FROM node:8-stretch

WORKDIR "/app"

# Install app dependencies
RUN apt-get update \
 && apt-get dist-upgrade -y \
 && apt-get clean \
 && echo 'Finished installing dependencies'
DOCKERFILE
docker build . –t \ mycluster.icp:8500/default/node
docker push mycluster.icp:8500/default/node
```

Next, use the following code to replace the Dockerfile within the project repo:
```
FROM mycluster.icp:8500/default/node
COPY package.json /app/
RUN cd /app; npm config set strict-ssl false; \
npm install --production

COPY . /app

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000
CMD ["npm", "start"]

```
This new Dockerfile is configured for any npm project where the `package.json` dependencies are resolved through Nexus.

## Modify the Node.js Jenkinsfile
If the default image values in the `user-configurable options` section of the Jenkins Pipeline Groovy file have not been modified to specify offline images, provide overrides within the Jenkinsfile in the project repository.

The following example Jenkinsfile overrides all of the images used within the Jenkins Pipeline:
```
#!groovy

@Library('MicroserviceBuilder') _
microserviceBuilderPipeline {
  image = 'microclimatenodetemplate'
  kubectlImage = 'mycluster.icp:8500/microclimate/microclimate-utils'
  dockerImage = 'mycluster.icp:8500/microclimate/docker'
  mavenImage = 'mycluster.icp:8500/microclimate/maven'
  helmImage = 'mycluster.icp:8500/microclimate/microclimate-helm'
}
```

## Develop your npm project
Your npm project is now ready to be developed with offline Microclimate.
