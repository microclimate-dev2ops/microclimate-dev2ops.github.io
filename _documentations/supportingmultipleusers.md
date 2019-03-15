---
layout: docs
title: Support for multiple users
description: Support for multiple users
keywords: users, projects, IBM Cloud Private, LDAP, supporting multiple users, user management, access management, IBM Cloud Private, LDAP, Portal, Devops, Jenkins, login, deployment, pod, container, Microclimate editor, Microclimate File Watcher, persistent storage, Lightweight Directory Access Protocol configuration, resource requirements in IBM Cloud Private
duration: 5 minutes
permalink: supportingmultipleusers
type: document
parent: installonicp
order: 1
---

# Support for multiple users

Microclimate provides support for multiple users in a single Microclimate deployment in IBM Cloud Private. User management is provided by the access management facilities in IBM Cloud Private, for more information, see [Managing access to your platform](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0.3/user_management/admin.html). IBM Cloud Private in turn supports connection to a wide range of directory services using Lightweight Directory Access Protocol (LDAP) to support user authentication. This topic describes how support for multiple users in Microclimate works, and provides information on how to configure the resources required to support multiple users in IBM Cloud Private.

When Microclimate is installed in IBM Cloud Private, Kubernetes deployments are created for three Microclimate components: Portal, Devops, and Jenkins. Each of these three deployments starts a single pod and container in IBM Cloud Private. Microclimate users connect to the Microclimate portal by way of the Kubernetes ingress URL that is created during the installation. When you start a Microclimate session, you are presented with the IBM Cloud Private login panel where you are prompted for your user ID and password. On successful login, you are redirected to the initial Microclimate screen.

When you log in to Microclimate for the first time, the following resources are created for you in IBM Cloud Private:

1. A deployment, pod and container running an instance of the Microclimate Editor.
2. A deployment, pod and container running an instance of the Microclimate File Watcher.
3. A folder within the Microclimate workspace in persistent storage, providing disk space for your projects.

You can then create, import, and edit projects in your own Microclimate environment.

The user icon on the Microclimate screen header shows your user ID, and enables you to log off. When you log off you have the option to shutdown your projects, editor, and file watcher. Closing your browser also logs you off. You are presented with the IBM Cloud Private login panel the next time you access Microclimate.

## Lightweight Directory Access Protocol (LDAP) configuration

IBM Cloud Private supports connection of Lightweight Directory Access Protocol (LDAP) directory services to provide user ID administration. User IDs defined in the connected directory service are then available to applications such as Microclimate that are running in IBM Cloud Private. For detailed information on connecting an LDAP directory service to your IBM Cloud Private instance, see [Configuring LDAP connection](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0.3/user_management/configure_ldap.html).

Note: IBM Cloud Private also provides a built-in user ID, 'admin', that you can use to log in and run Microclimate without configuring an LDAP connection.

## Resource requirements in IBM Cloud Private

The Microclimate installation instructions for IBM Cloud Private provide information on the expected resource usage of the components of Microclimate, for more information, see
[Installing Microclimate in IBM Cloud Private](https://github.com/IBM/charts/blob/master/stable/ibm-microclimate/README.md). When supporting multiple users in Microclimate, additional resources are needed for the pods and containers for each user. Memory usage is typically 100Mb for the Microclimate Editor and 500Mb for the Microclimate File Watcher.

Microclimate uses a single Kubernetes persistent volume and persistent volume claim to provide storage for generated and imported projects for all users of the Microclimate instance. The size of the persistent volume claim for the Microclimate project workspace must take into account the number of expected users. To increase the default size of the persistent volume claim for the Microclimate project workspace, see the instructions in [Installing Microclimate in IBM Cloud Private](https://github.com/IBM/charts/blob/master/stable/ibm-microclimate/README.md).
