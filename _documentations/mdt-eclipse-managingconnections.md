---
layout: docs
title: Managing Microclimate connections
description: How to manage connections to Microclimate instances
keywords: create, connect, delete, remove, manage, disconnect, tools, eclipse, opening the Microclimate UI for a connection, creating a new Microclimate project, importing a project into Microclimate, refreshing a connection, deleting a connection, managing connections using Eclipse preferences, creating, connecting, deleting, removing, refreshing, managing, disconnecting
duration: 1 minute
permalink: mdteclipsemanagingconnections
type: document
order: 20
parent: mdteclipseoverview
---

# Managing Microclimate connections

Creating a connection in Eclipse to Microclimate enables you to view and work with your Microclimate projects from within Eclipse. Connections can only be created for a local Microclimate instance. For more information on managing connections, see the following:

* [Creating a connection](#creating-a-connection)
* [Opening the Microclimate UI for a connection](#opening-the-microclimate-ui-for-a-connection)
* [Creating a new Microclimate project](#creating-a-new-microclimate-project)
* [Importing a project into Microclimate](#importing-a-project-into-microclimate)
* [Refreshing a connection](#refreshing-a-connection)
* [Deleting a connection](#deleting-a-connection)
* [Managing connections using Eclipse preferences](#managing-connections-using-eclipse-preferences)

## Creating a connection

1. Make sure that your local Microclimate instance is up and running.
2. Create a connection to your local Microclimate:
    - From the **File** menu select **New** > **Other**.
	- Start typing **Microclimate** in the filter field or locate and expand the **Microclimate** entry in the list.
	- Select **New Microclimate Connection** and click **Next**.
    - Fill in the Microclimate **Hostname** (localhost only is supported) and **Port** (usually 9090).
    - Click **Test Connection** and then click **Finish**.

The connection is created and the **Microclimate Explorer** view will be opened in Eclipse with the new connection expanded to show your projects. If the **Microclimate Explorer** view is not showing then open it as follows:

- From the **Window** menu select **Show View** > **Other**.
- Start typing **Microclimate** in the filter field or locate and expand the **Microclimate** entry in the list.
- Select **Microclimate Explorer** and click **Open**.

## Opening the Microclimate UI for a connection

For some actions such as creating and deleting projects, you need to use the Microclimate UI. To open the Microclimate UI in the default Eclipse browser:

1. Right click on the connection in the **Microclimate Explorer** view and select **Open Microclimate UI**.
2. If the browser does not support the Microclimate content, change the default browser to another one by navigating to **Window** > **Web Browser** and select from the list of available browsers. Repeat step 1 again.

## Creating a new Microclimate project

You can open the Microclimate UI for a connection directly on the new project page:

1. Right-click the connection in the **Microclimate Explorer** view and select **Open New Project Page**. For versions earlier than 19.01, select **Create New Project**.
2. If the browser does not support the Microclimate content, change the default browser. Go to **Window**>**Web Browser** and select from the list of available browsers. Repeat the previous step.

## Importing a project into Microclimate

In Version 19.01 and later, you can open the Microclimate UI for a connection directly from the import project page:

1. Right-click the connection in the **Microclimate Explorer** view and select **Open Import Project Page**.
2. If the browser does not support the Microclimate content, change the default browser. Go to **Window**>**Web Browser** and select from the list of available browsers. Repeat the previous step.

## Refreshing a connection

If for some reason the connection information becomes out of date, you can refresh the connection. Refreshing the connection refreshes the information for the connection and all of its projects.

To refresh a connection, right click on the connection in the **Microclimate Explorer** view and click **Refresh**.

## Deleting a connection

Delete a Microclimate connection when you no longer need it.

1. Right click on the connection in the **Microclimate Explorer** view and select **Remove Connection**. The connection is removed from the view.
2. You can create a new connection directly from the **Microclimate Explorer** view by right clicking in the view and selecting **New Microclimate Connection** or by clicking the Microclimate icon in the toolbar.

## Managing connections using Eclipse preferences

Microclimate connections can also be managed through Eclipse preferences.

### Opening the Microclimate Connections preference page

1. Navigate to the Eclipse preferences.
2. Start typing **Microclimate** in the filter field or locate and expand the **Microclimate** entry in the list.
3. Select **Microclimate Connections**.

### Creating a connection

1. Click on the **Add** button to create a new connection.
2. Fill in the Microclimate **Hostname** (localhost only is supported) and **Port** (usually 9090).
3. Click **Test Connection** and then click **Finish**.

### Deleting a connection

To delete a connection, select the connection and click the **Remove** button.
