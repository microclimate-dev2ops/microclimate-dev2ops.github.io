---
layout: document
title: Setting up persistent storage for Microclimate in ICP 2.1.0.1
description: Setting up persistent storage for Microclimate in ICP 2.1.0.1
duration: 1 minute
permalink: persistent
type: document
---

## Example configuration for Microclimate persistent storage

To install and run Microclimate in IBM Cloud Private (ICP), two persistent storage volumes are required. One persistent volume is needed for the Microclimate workspace, it is used for generated and imported code projects. The other is needed for the Microclimate DevOps pipeline, and is used to store Jenkins build data and logs.

If you are trying out Microclimate in ICP, you can use the HostPath storage type to provide persistent storage. Note that the HostPath storage type can be used only in a cluster with a single worker node, HostPath is not supported in a cluster with multiple worker nodes. For information about other persistent storage types, see:
https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0.1/manage_cluster/create_volume.html

1. Create two directories, with 777 permissions, on the host machine running your IBM Cloud Private worker node. For example:
  ```bash
    mkdir -m 777 /home/<yourusername>/workspace
    mkdir -m 777 /home/<yourusername>/pipeline
  ```
2. Configure the Kubernetes client API to point to your ICP instance: in the ICP console UI, click on the admin pull-down in the top right corner and open Configure Client, copy the provided commands and paste them into your local terminal.
3. Create persistent volume specifications on ICP to link to the directories you created above.  You can create the persistent volume specifications using the ICP console:

	1. Open Platform -> Storage -> CreatePersistentVolume
	2. On the configuration panel set Name = 'microclimate-workspace', Capacity = 2 Gi, Storage type = 'Host path', Reclaim policy = Retain
	3. On the Parameters tab, add a parameter with Key = 'path' and Value = the full path to the workspace directory you created in step 1
Repeat this procedure for the second persistent volume, using `Name = 'microclimate-pipeline', Capacity = 8 Gi` and the full path to the pipeline directory you created in step 1.

4. As an alternative to step 3, you can create `volume.yaml` files that contain the persistent volume specifications, and  run ``kubectl create -f volume.yaml`` to install them in ICP. For example, for the Microclimate workspace volume:

    ```sh
    apiVersion: v1
    kind: PersistentVolume
    metadata:
      name: microclimate-workspace
    spec:
      accessModes:
        - ReadWriteOnce
  	persistentVolumeReclaimPolicy: Retain
      capacity:
        storage: 2Gi
      hostPath:
        path: /home/yourusername/workspace
     ```

When you install Microclimate, you can check on the ICP console Storage page that the Microclimate PersistenceVolumeClaims are bound to the PersistentVolumes that you created. When you create or import projects in Microclimate you will see their files appear in the workspace directory that you created on the host machine for the ICP worker node.

## Further information

Managing your platform storage:
[https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0.1/manage_cluster/cluster_storage.html](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0.1/manage_cluster/cluster_storage.html)

Working with your storage:
[https://www.ibm.com/developerworks/community/blogs/fe25b4ef-ea6a-4d86-a629-6f87ccf4649e/entry/Working_with_storage?lang=en](https://www.ibm.com/developerworks/community/blogs/fe25b4ef-ea6a-4d86-a629-6f87ccf4649e/entry/Working_with_storage?lang=en)
