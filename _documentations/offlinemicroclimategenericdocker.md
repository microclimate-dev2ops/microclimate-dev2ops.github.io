---
layout: docs
title: Building a generic Docker project with offline Microclimate
description: Building a generic Docker project with offline Microclimate
keywords: offline, docker, project, build, building, nexus, websphere, github, yaml, file, chart, helm, install, installation, delete, repository, maven, tool, jar, image, download, downloads, microclimate, values.yaml, helm install, Maven, Nexus
duration: 1 minute
permalink: offlinemicroclimategenericdocker
type: document
order: 1
parent: offlinemicroclimateusing
---

# Building a generic Docker project pipeline with offline Microclimate
After you configure your Microclimate environment to use DevOps pipelines in an offline environment, you can create an offline generic Docker project pipeline.

**Note:** Nexus is not required for generic Docker pipelines, and it is not used in this example. However, if you have Nexus installed and it makes your work easier, you can use Nexus how you see fit.

## 1. Store the Python project in your offline Git repository, GitLab
1. In GitLab, create a new empty project repository.
2. In Microclimate, create a new Python project and use the `Python hello world template`.
3. Open the project and navigate to the **Edit code** tab. Find the terminal window in the code editor.
  - If the terminal window is not open in the code editor, open it with **View**>**Toggle Bottom Panel**.
4. In the terminal window of the code editor, follow the instructions in your newly created GitLab repository to push the Python project to the repository, as shown in the example:
```
git remote add origin https://gitlab.<PROXY_IP>.nip.io/root/<PROJECT_NAME>.git
git push -u origin master
```
  - If you get an error about SSL certificates, enter `git config --global http.sslVerify false` and rerun the `git push -u origin master` command.

## 2. Store all necessary public resources in `mycluster.icp`
Because Microclimate is offline, it can't access any public resources, so you must move all of the necessary public resources to a private registry.

The following code shows the Python project Dockerfile:
```
FROM python:3.4-alpine
ADD . /code
WORKDIR /code
RUN pip install flask
CMD ["python", "app.py"]
EXPOSE 5000
```

The Dockerfile uses two public resources:
- `FROM python:3.4-alpine`
- `RUN pip install flask`

To store both of these public resources offline, create a new base image stored in `mycluster.icp` for your Python project Dockerfile to use.

1. In an online environment, create a new Dockerfile with the following contents:
```
FROM python:3.4-alpine
RUN pip install flask
```
2. Next, in the online environment, build the Dockerfile with the following command:
```
docker build -t pythonoffline:3.4-alpine .
```
3. Then, move the new Docker image you just built into your offline environment. You can use the Docker `save` and `load` commands to transport the image as a `.tar` file.
4. In your offline environment, use the following commands to store the image in `mycluster.icp` within the namespace that your Microclimate chart is deployed to:
```
NAMESPACE='microclimate'
docker tag "pythonoffline:3.4-alpine mycluster.icp:8500/${NAMESPACE}/pythonoffline:3.4-alpine"
docker push "mycluster.icp:8500/${NAMESPACE}/pythonoffline:3.4-alpine"
```

Now your new base image is stored offline and contains the two public resources needed to build your Python project.

## 3. Override the project Dockerfile to replace the public resources with the private resources
Now that you stored the public resources in your private `mycluster.icp` registry, modify the Python project Dockerfile to use these private resources instead of the public ones.

Make the following changes to your Python project Dockerfile:
- **Note:** If you did not deploy the Microclimate chart into the `microclimate` namespace, replace `microclimate` in the following code with the namespace of your Microclimate deployment.
- Replace the base image with `mycluster.icp:8500/microclimate/python:3.4-alpine`.
- Delete the line `RUN pip install flask`.

The new Dockerfile matches the following code:
```
FROM mycluster.icp:8500/microclimate/python:3.4-alpine
ADD . /code
WORKDIR /code
CMD ["python", "app.py"]
EXPOSE 5000
```

This new Dockerfile uses only private resources, so you can build it offline.

## 4. Deploy your Microclimate DevOps pipeline
Create an offline DevOps pipeline for your Python project the same way that you would create a pipeline for an online project. When your project builds, it now pulls its resources from the private `mycluster.icp` registry instead of the previous public sources.
