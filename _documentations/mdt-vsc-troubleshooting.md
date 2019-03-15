---
layout: docs
title: "Troubleshooting: Tools for VS Code"
description: "Troubleshooting: Tools for VS Code"
keywords: tools, vscode, visual, studio, code, faq, trouble, troubleshoot, problem, bug, Microclimate Developer Tools for VS Code troubleshooting, extension logs, stuck, project status, No ESLint warnings or errors for Node.js projects, debug
duration: 1 minute
permalink: mdt-vsc-troubleshooting
type: document
order: 9
parent: mdt-vsc-overview
---

# Troubleshooting: Microclimate Developer Tools for VS Code

If you experience a problem that is not addressed on this page or on the [Microclimate troubleshooting page](troubleshooting#working-with-microclimate-from-your-editor), open an issue on the [Tools for VS Code GitHub repository](https://github.com/microclimate-dev2ops/microclimate-vscode-tools/issues).
<br>
You can also post questions in the Microclimate [public Slack workspace](https://slack-invite-ibm-cloud-tech.mybluemix.net/).

***

### **Finding the extension logs**

If you report an issue, you will be asked to upload your logs.

1. In VS Code, open **Help** > **Toggle Developer Tools**.
2. Go to the **Console** tab.
3. Enter `microclimate-tools.log` in the **Filter** box:
![Log location](dist/images/mdt-vsc/logs-location.png)
4. Upload the contents of the log file with your issue report.

***

### **Build succeeded, but project is stuck in the Stopped state**
If your project fails to start, check the application logs for anything that might indicate the failure.
If your application does not have problems, you can [check the Microclimate logs](troubleshooting#check-the-logs).
If the error persists, you can reset the project by [disabling and re-enabling](mdt-vsc-commands-project#enable-or-disable-project) the project.

### **Project status does not match web interface**
Run the [refresh connection command](mdt-vsc-commands-connection#refresh-connection). If the issue persists, you might need to [restart Microclimate](clicommands).

### **No ESLint warnings or errors for Node.js projects**
Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and follow the instructions to activate the extension.

### Unknown configuration setting `microclimate.connections`
This setting is deprecated and no longer used. You can safely delete it from your settings.

***

## **Debug**
### **Liberty project remains in the Starting - Debug state**
Liberty servers started in **Debug** mode do not start until the debugger attaches. Run the [attach debugger command](mdt-vsc-commands-restart-and-debug#attach-debugger), and the server starts. You can check the application logs to see if the server is starting.
### **Debugger attach fails with the message "Configured debug type "java" is not supported"**
Install and enable the [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack).
### **Debugger fails to attach after restarting project into Debug mode**
Run the [attach debugger command](mdt-vsc-commands-restart-and-debug#attach-debugger) again. If the issue persists after a few attempts, restart the project in **Debug** mode a second time.