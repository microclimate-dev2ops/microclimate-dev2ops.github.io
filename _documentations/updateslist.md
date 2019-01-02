---
layout: docs
title: Microclimate versions with updates
description: List of Microclimate versions that have updates
keywords: update, refresh, upgrade, fix, image
duration: 1 minute
permalink: updateslist
type: document
order: 1
parent: updating
---

## Microclimate versions with updates
If you installed any of these versions of Microclimate, please [update to the latest images](updating).

## Microclimate Version 18.12

* The following list shows the updated images that are tagged with `1812`. Use the image that is correct for your operating system:
  * `ibmcom/microclimate-portal-ppc64le`
  * `ibmcom/microclimate-atrium-ppc64le`
  * `ibmcom/microclimate-beacon-ppc64le`
  * `ibmcom/microclimate-file-watcher-ppc64le`
  * `ibmcom/microclimate-loadrunner-ppc64le`
  * `ibmcom/microclimate-portal-ppc64le`
  * `ibmcom/microclimate-theia-ppc64le`
  * `ibmcom/microclimate-portal-amd64`
  * `ibmcom/microclimate-atrium-amd64`
  * `ibmcom/microclimate-beacon-amd64`
  * `ibmcom/microclimate-file-watcher-amd64`
  * `ibmcom/microclimate-loadrunner-amd64`
  * `ibmcom/microclimate-portal-amd64`
  * `ibmcom/microclimate-theia-amd64`
* To see if you need an update, use grep to run the `docker inspect ibmcom/microclimate-portal-amd64:1812 | grep org.label-schema.build-date` command. If you see a date of `2018-12-12T21:06:45+0000` in the output, update the images.

## Microclimate Version 18.09

* The following list shows the updated images that are tagged with `1809`:
  * `microclimate-beacon`
  * `microclimate-file-watcher`
  * `microclimate-loadrunner`
  * `microclimate-portal`
  * `microclimate-theia`
* The image ID is `ibmcom/microclimate-portal:1809`. To see if you need an update, use grep to run the `docker inspect ibmcom/microclimate-portal:1809 | grep org.label-schema.build-date` command. If you see `2018-09-14T15:18:02+0000` or earlier, your image needs an update.
