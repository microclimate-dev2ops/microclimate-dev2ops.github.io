---
layout: document
title: Uninstalling Microclimate in ICP
description: Documents
duration: 1 minute
permalink: uninstallicp
type: document
---

## Uninstalling Microclimate in ICP

To uninstall Microclimate in ICP:

1. Open a terminal session.
2. Configure the Kubernetes client API to point to your ICP instance: In the ICP admin GUI, click the account symbol in the top right and go to Configure Client, copy the provided commands and paste them into your local terminal.
3. Run the following command:
```bash
helm delete ibm-microclimate --purge
```
