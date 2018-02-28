---
layout: document
title: Persistent storage in ICP
description: Persistent storage in ICP
duration: 1 minute
permalink: persistent
type: document
---

When you run microclimate in local Docker containers, your workspace for generated projects is created as a local directory when you use the CLI to start microclimate. This workspace persists when you stop and re-start microclimate.

When you run microclimate in IBM Cloud Private (ICP), the workspace is created in the microclimate pod, and is deleted when the pod is deleted. IBM Private Cloud does not provide persistent storage by default, but you can define a persistent storage volume in ICP for storing your generated project code. IBM Cloud Private supports a variety of persistence storage types, for a full list see [https://v1-8.docs.kubernetes.io/docs/concepts/storage/persistent-volumes/#persistent-volumes](https://v1-8.docs.kubernetes.io/docs/concepts/storage/persistent-volumes/#persistent-volumes)

## Setting up persistence storage for microclimate in ICP

When you test microclimate you can use the **hostPath** storage type to persist your workspace:

1. Create a directory on your IBM Cloud Private host machine, with 777 permissions, eg ``/home/rnchamberlain/workspace``
2. Configure the Kubernetes client API to point to your ICP instance: in the ICP admin GUI, click the account symbol in the top right and go to Configure Client, copy the provided commands and paste them into your local terminal.
3. Create a persistent volume specification on ICP to link to the directory you created above. You can do this by using the ICP admin console:


	1. Open Platform -> Storage -> CreatePersistentVolume
	2. On the configuration panel set Name = 'microclimate', Capacity = 5, Storage type = 'Host path'
	3. On the Parameters tab, add a parameter with Key = 'path' and Value = the full path to the directory you created in step 1

4. An alternative to step 3. Create a volume.yaml file that contains the specification below, changing the **hostPath** path value to the directory that you created in step 1.  Run ``kubectl create -f volume.yaml`` to install the PersistentVolume.

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
        path: /home/rnchamberlain/workspace
     ```

5. Unzip the download file, open a terminal session and change the directory into the microclimate directory.
6. Run the following command:
```bash
helm install --name microclimate --set persistence.enabled=true chart/microclimate
```

You can check on the ICP admin console **Storage** page that the microclimate **PersistenceVolumeClaim** is bound to the **PersistentVolume** that you created in step 2 or step 3. When you create projects in microclimate you should see their files appear in the directory on the ICP host machine.

For information on configuration options see the [Helm chart README](./helmchart). For development build instructions and how to run with a local build of the Microclimate docker images see [Microclimate-Development](./microclimatedev).

## Further information

[https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0/manage_cluster/cluster_storage.html](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0/manage_cluster/cluster_storage.html)

[https://www.ibm.com/developerworks/community/blogs/fe25b4ef-ea6a-4d86-a629-6f87ccf4649e/entry/Working_with_storage?lang=en](https://www.ibm.com/developerworks/community/blogs/fe25b4ef-ea6a-4d86-a629-6f87ccf4649e/entry/Working_with_storage?lang=en)
