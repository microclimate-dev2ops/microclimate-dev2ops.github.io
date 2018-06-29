---
layout: document
title: Microclimate considerations for GDPR readiness
description: Microclimate considerations for GDPR readiness
keywords: introducing, GDPR
duration: 1 minute
permalink: gdpr-deployment-guidelines
type: document
category: How-tos and Guides
parent: Introducing Microclimate
---

# Microclimate considerations for GDPR readiness

___________________________________________________________________________________________________
### For PID(s): n/a

## Notice:

This document is intended to help you in your preparations for GDPR readiness. It provides information about features of Microclimate that you can configure, and aspects of the product’s use, that you should consider to help your organization with GDPR readiness. This information is not an exhaustive list, due to the many ways that clients can choose and configure features, and the variety of ways that the product can be used in itself and with third-party applications and systems.

__Clients are responsible for ensuring their own compliance with various laws and regulations, including the European Union General Data Protection Regulation. Clients are solely responsible for obtaining advice of competent legal counsel as to the identification and interpretation of any relevant laws and regulations that may affect the clients’ business and any actions the clients may need to take to comply with such laws and regulations.__

__The products, services, and other capabilities described herein are not suitable for all client situations and may have restricted availability. IBM does not provide legal, accounting, or auditing advice or represent or warrant that its services or products will ensure that clients are in compliance with
any law or regulation.__

___________________________________________________________________________________________________
### Table of Contents
1. GDPR
2. Product Configuration for GDPR
3. Data Life Cycle
4. Data Collection
5. Data Storage
6. Data Access
7. Data Processing
8. Data Deletion
9. Data Monitoring
10. Responding to Data Subject Rights

___________________________________________________________________________________________________
### GDPR

General Data Protection Regulation (GDPR) has been adopted by the European Union ("EU") and applies from May 25, 2018.

#### Why is GDPR important?

GDPR establishes a stronger data protection regulatory framework for processing of personal data of individuals.  GDPR brings:

* New and enhanced rights for individuals
* Widened definition of personal data
* New obligations for processors
* Potential for significant financial penalties for non-compliance
* Compulsory data breach notification

#### Read more about GDPR

* EU GDPR Information Portal: [https://www.eugdpr.org/](https://www.eugdpr.org/)
* ibm.com/GDPR website [http://ibm.com/GDPR](http://ibm.com/GDPR)

___________________________________________________________________________________________________
### Product Configuration - considerations for GDPR Readiness

Microclimate itself is not configurable in a manner which affects how the tool collects or transfers Git repository access credentials or source code. Consideration should be given to the environment where Microclimate is installed. Microclimate creates workspaces in which source code and Git repository access credentials might be stored. It is recommended the storage devices on which Microclimate's workspaces are located should be encrypted.

___________________________________________________________________________________________________
### Data Life Cycle
When a Microclimate user imports an existing Git repository project or creates a project pipeline, the Git repository access credentials are collected by Microclimate for use in these operations. The credentials are retained for the life of the project or pipeline. For imported projects, the Git client stores the information in unencrypted Git system files. For pipeline projects, the credentials are stored as a Kubernetes secret and encrypted in Jenkins. When the user deletes the project or pipeline, the credentials are discarded.

___________________________________________________________________________________________________
### Data Storage
For projects imported from a Git repository, Microclimate requires that the user provide Git repository access credentials.  These credentials are then passed to a Git client for project cloning. Git system files stored in the project directory under the .git directory retain the credentials in clear text. For this reason, it is strongly advised that the storage device where the workspace resides is encrypted. This is applicable to both the single user installation model on to a stand alone workstation, or the multi-user installation model when Microclimate is installed on to IBM Cloud Private.  

The Git repository credentials used for project pipelines are stored in a Kubernetes secret by Microclimate and are encrypted by the Jenkins build engine.

___________________________________________________________________________________________________
### Data Access
Only users with read permission for the storage device where the Microclimate workspace is located can access the Git system files where sensitive technical data might be stored. For a single user installation this means anyone that has read access of the user's storage device on which the Microclimate workspace is located. For a multi-user installation on IBM Cloud Private, anyone with read access of the persistent volume on which the Microclimate workspace is located has access. Care should be taken to limit access to the storage device where the Microclimate workspace is located. It is strongly advised that encryption is used on the device.

___________________________________________________________________________________________________
### Data Processing
For single user installations, data in transit between the browser and Microclimate is unencrypted. For this installation type, Microclimate only allows localhost connections.  For multi-user installations on IBM Cloud Private, data transported between the browser and the IBM Cloud Private proxy is encrypted using the Transfer Layer Security (TLS) protocol. Transport between Microclimate processes located in the IBM Cloud Private cluster is unencrypted.  

For IBM Cloud Private installations, the certificates used for TLS encryption can be customized. For more information, see the [IBM Cloud Private Installation details](https://github.com/IBM/charts/blob/master/stable/ibm-microclimate/README.md).

___________________________________________________________________________________________________
### Data Deletion
Microclimate project data is stored in the Microclimate workspace. When the user creates or imports a project, a new project directory is created in the workspace. If the user decides the project is no longer needed, a delete option is available. When a project is deleted all project files are removed from the workspace. The same is true for a project pipeline. When a pipeline is no longer needed, deleting the pipeline removes all data about the pipeline.

___________________________________________________________________________________________________
### Data Monitoring
Currently there are no data monitoring facilities in Microclimate.

___________________________________________________________________________________________________
### Responding to Data Subject Rights
Microclimate is a software development productivity tool and as such is not designed to provide granular management of sensitive technical data gathered during normal software development activities.  If there is a need to delete any data gathered for a Microclimate project or pipeline, deleting the project or pipeline will delete any stored sensitive technical data.
