---
layout: docs
title: Uninstalling Microclimate in IBM Cloud Private
description: Uninstalling Microclimate in IBM Cloud Private
keywords: uninstall, IBM Cloud Private, remove, delete, helm
duration: 1 minute
permalink: uninstallicp
type: document
category: How-tos and Guides
parent: Uninstalling Microclimate
---

# Uninstalling Microclimate in IBM Cloud Private

To uninstall Microclimate in IBM Cloud Private:

1. Open a terminal session.
2. Configure the Kubernetes client API to point to your IBM Cloud Private instance. In the IBM Cloud Private admin GUI, click the account symbol and go to **Configure Client**. Copy the provided commands and paste them into your local terminal.
3. Run the following command:
```bash
helm delete ibm-microclimate --purge --tls
```
