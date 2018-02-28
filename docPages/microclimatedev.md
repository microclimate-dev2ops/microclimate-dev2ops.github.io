---
layout: document
title: Microclimate-Development
description: Microclimate-Development
duration: 1 minute
permalink: microclimatedev
type: document
---

This page provides additional instructions for microclimate developers. The microclimate user documentation is provided in the getting started page [here](./gettingstarted)

## Local Docker (no Kubernetes)

```sh
git clone https://github.ibm.com/dev-ex/microclimate

cd microclimate

./run.sh
```

This builds all the Docker images that are needed and starts the Docker containers by using a docker-compose file. If you subsequently run the script it updates the Docker images, removes existing microclimate Docker containers, and creates new containers by using the updated images.

```sh
./stop.sh [ options ]
```

This stops and removes your microclimate Docker containers. Options are:

```sh
-i, --image: also deletes the microclimate docker images
-a, --all: stops and removes all docker containers, not just microclimate
-h, --help: show the help
```

Alternatively, use these commands to manage local Docker images:

```sh
docker ps
docker images
docker rmi [-f] image_name
```


## Docker in IBM Cloud Private/Kubernetes

First follow the the getting started page [here](./gettingstarted) for prerequisites and steps for using an existing ICP instance or creating a local one by using Vagrant.

To allow you to push locally built images to the ICP instance, follow these additional steps:

### Add your remote cluster IP to your local hosts file

1. Open */etc/hosts* on your local machine with your chosen text editor
2. Add an entry that  contains your ICP master IP with your cluster name (e.g. ``192.168.27.100 mycluster.icp``)

### Set insecure Docker registry

Your local instance of Docker needs to be made aware of the Docker image registry on ICP. Using the Docker GUI:

1. Open your Docker preferences, navigate to the *Daemon* tab and add mycluster.icp:8500 to the list of insecure registries.
2. Click *Apply & Restart*

Alternatively, this can be done manually by creating the file ``/etc/docker/docker.json`` and adding the following json snippet:
```sh
{
  "insecure-registries" : [
    "mycluster.icp:8500"
  ]
}
```

### Copy the Docker certificate

Next, you need to get the Docker certificate from the environment that your ICP is running in, and copy it to your local machine:

1. On the machine that your ICP instance is running on, copy the Docker certificate locally by using:
	``vagrant ssh -- "sudo cat /etc/docker/certs.d/mycluster.icp:8500/ca.crt" > /tmp/ca.crt``
2. Copy the certificate file you have copied to /etc/docker/certs.d/mycluster.icp:8500/ca.crt on your local machine, you might need to create the directory first with:
	``mkdir -p /etc/docker/certs.d/mycluster.icp:8500/``
3. On MacOS, you need to register that the certificate is trusted by using the following:
	``sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain /etc/docker/certs.d/mycluster.icp:8500/ca.crt``.
``
4. Restart Docker to register these changes.  
5. Use ``docker login mycluster.icp:8500`` to test that this has worked, the login should be successful, the default username/password is admin/admin.

Note: With Vagrant, the certificate changes if you have to destroy and recreate the machine so this step needs to be repeated in that situation.

### Building and deploying Microclimate

Configure the Kubernetes client API to point to your ICP instance: in the ICP admin GUI, click the account symbol in the top right and go to Configure client, copy the provided commands and paste them into your local terminal.

With the above steps completed, you can use run_icp.sh script to build and deploy microclimate. The script will build, tag and push the microclimate images and create the deployment and service in ICP.

Alternatively, you can build the microclimate images by using the normal (local docker) run.sh script, manually tag and push images to ICP, then use the Helm chart to just do the deployment. Follow the additional steps below if you want to manually tag and push images and deploy by using Helm.

The deployment might take 2-3 minutes to process after the script completes the first time around. The progress of the deployment can be viewed by opening Workloads->Deployment->microclimate->pod in the ICP admin GUI. When each of the containers in the pod have the 'RUNNING' status, microclimate can be opened by following the second URL printed when the script completes.

### Additional steps to use Helm:

Tag and push images to the ICP registry, for example:
```sh
docker tag microclimate-portal mycluster.icp:8500/default/microclimate-portal
docker push mycluster.icp:8500/default/microclimate-portal
```
Edit the Helm values file for local images, for example replace:

```sh
portal: sys-mcs-docker-local.artifactory.swg-devops.com/microclimate-portal
```

with

```sh
portal: mycluster.icp:8500/default/microclimate-portal
```

then

```sh
run helm install --name microclimate chart/microclimate
```
as usual

### Local Kubernetes (minikube - might also work for ICP)
[First time]:

```sh
> brew install kubernetes-helm
> helm init
```

### To run the latest build from artifactory:

Configure minikube with a secret to pull from repository:

```sh
kubectl create secret docker-registry artifactory --docker-server=sys-mcs-docker-local.artifactory.swg-devops.com --docker-username=<user name> --docker-password=<password> --docker-email=<email address>
```

Start minikube:
```sh
> minikube start
```

Install by using Helm:

```sh
> helm install /Users/hhellyer/work/consumability/microclimate.git/chart/microclimate/
```

Clean up:

```sh
> kubectl delete services,deployments microclimate
```

### To run with locally built images from your current branch:

Make sure you've deleted any existing instance:

```sh
> kubectl delete services,deployments microclimate
```

Set docker context to be inside minikube:

```sh
> eval $(minikube docker-env)
```

1. If you can set the docker context in the same way for ICP these instructions should work with ICP.
2. You can run docker images to confirm you see the images inside kubernetes rather than on your local machine. Use one terminal configured for minikube and one with the default settings and they should be different.

Run the build script:

```sh
> script/build.sh
```

Change the helm chart to use only the copies that already exist in kubernetes docker: (We might be able to parameterise the files and have a dev flag to enable this.)

Replace values.yaml with the following code

```sh
#*******************************************************************************
# Licensed Materials - Property of IBM
# "Restricted Materials of IBM"
#
# Copyright IBM Corp. 2017 All Rights Reserved
#
# US Government Users Restricted Rights - Use, duplication or disclosure
# restricted by GSA ADP Schedule Contract with IBM Corp.
#*******************************************************************************

image:
  repo:
    theia: microclimate-theia
    orion: microclimate-orion
    filewatcher: microclimate-file-watcher
    portal: microclimate-portal

  tag: latest
  imagePullPolicy: IfNotPresent
  imagePullSecret: artifactory

persistence:
  enabled: false
  size: 1Gi
  class: ""
```

Run helm install:

```sh
> helm install chart/microclimate/
```

Optional

To add a persistent volume to minikube so the microclimate workspace survives restarting:

(See [https://kubernetes.io/docs/getting-started-guides/minikube/#persistent-volumes](https://kubernetes.io/docs/getting-started-guides/minikube/#persistent-volumes) for background.)

Create a directory inside the minikube vm under /data.

```sh
> minikube ssh
> cd /data
> mkdir microclimate
> chmod a+rwx microclimate
```

Create a persistent volume in kubernetes:

```sh
> kubectl create -f volume.yaml
```

Contents of volume.yaml:

```sh
apiVersion: v1
kind: PersistentVolume
metadata:
  name: microclimate
spec:
  accessModes:
    - ReadWriteOnce
  capacity:
    storage: 5Gi
  hostPath:
    path: /data/microclimate
 ```

Enable persistence when you deploy microclimate:

```sh
> helm install --name microclimate --set persistence.enabled=true chart/microclimate
```
