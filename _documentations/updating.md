---
layout: docs
title: Updating Microclimate
description: Update Microclimate
keywords: update, refresh, uninstall, install, upgrade, path, fix, image
duration: 1 minute
permalink: updating
type: document
order: 70
parent: root
---

## Updating Microclimate

## Updating to a new version of Microclimate

**Note:** If you installed IBM Cloud Private 3.1, please update to the latest image of Microclimate Version 18.09. Previous versions of Microclimate aren't compatible with IBM Cloud Private 3.1.

If you need to install the latest version, follow these steps to update Microclimate:
1. Uninstall the previous version. For more information, see [Uninstalling Microclimate](uninstall).
2. Install the new version. For more information, see [Installing Microclimate locally](installlocally) or [Installing Microclimate in IBM Cloud Private](https://github.com/IBM/charts/blob/master/stable/ibm-microclimate/README.md).

**Note:** Uninstalling Microclimate does not mean that you lose your existing projects. The projects remain in your `microclimate-workspace` directory.

## Updating images for Microclimate Version 18.09

From time to time, updates to existing Microclimate images roll out for fixes that are especially important. If you installed Microclimate Version 18.09, please update to the latest images.

The following list shows the updated images that are tagged with `1809`:
* `microclimate-beacon`
* `microclimate-file-watcher`
* `microclimate-loadrunner`
* `microclimate-portal`
* `microclimate-theia`

Whichever type of installation that you run, you can uninstall and reinstall Microclimate to get the latest images. However, you can also update the images in place.

#### Updating local installations of Microclimate

Before you run the update, you can check to see if you have the latest images:
1. Run the `docker images` command to list the image IDs.
2. Run the `docker image inspect <IMAGE ID>` command. For the 18.09 image, the image ID is the ID of the `ibmcom/microclimate-portal:1809` image.
3. Look in the output for `"org.label-schema.build-date": "2018-09-14T15:18:02+0000"`.
    1. If the date matches the one in this step, you have the earlier version of Microclimate 18.09, and you should upgrade.
    2. If the date is later than the date shown, you have the latest version and do not need to upgrade.

To update a local installation of Microclimate 18.09, complete the following steps:
1. Stop microclimate with the `~/mcdev stop` command.
2. Run the upgrade with the `~/mcdev update` command. This command pulls the newer images if they are not already installed.
3. Restart Microclimate with the `~/mcdev start` command.

#### Updating IBM Cloud Private installations of Microclimate

Before you run the update and delete pods, you can check to see if you have the latest images:
1. Log in to a worker node on your IBM Cloud Private cluster.
2. Run the `docker images` command to list the image IDs.
3. Run the `docker image inspect <IMAGE ID>` command. For the 18.09 image, the image ID is the ID of the `ibmcom/microclimate-portal:1809` image.
4. Look in the output for `"org.label-schema.build-date": "2018-09-14T15:18:02+0000"`.
    1. If the date matches the one in this step, you have an earlier version of Microclimate 18.09, and you should upgrade.
    2. If the date is later than the date shown, you have the latest version and do not need to upgrade.

To update an IBM Cloud Private installation of Microclimate 18.09, complete the following steps:
1. Run the `kubectl get pods` command on the console of the boot node of your IBM Cloud Private cluster.
2. Delete each of the Microclimate pods with the `kubectl delete pod <pod name>` command. If you delete a pod, the associated image is updated.
