---
layout: docs
title: Installing Kibana and filtering logs in IBM Cloud Private
description: Installing Kibana and filtering logs in IBM Cloud Private
keywords: troubleshooting, issues, workaround, logs, Elasticsearch, ELK Stack
duration: 3 minutes
permalink: installkibanafilter
type: document
parent: linkinstallionicp
order: 3
---

# Installing Kibana and filtering logs in IBM Cloud Private

To see what's going on with your IBM Cloud Private applications, view the log files.

The following procedure shows you how to install Kibana and Elasticsearch to view and filter the Microclimate log files; your choice of logging infrastructure might be different.

To install Kibana and filter Microclimate log files in IBM Cloud Private:

1. Install the logging infrastructure.
2. Build a query to filter the logs.

## Install the logging infrastructure by using Kibana and ELK Stack

1. Go to `Catalog` in the IBM Cloud Private dashboard.

2. Search for "kibana", and install the `ibm-icplogging-kibana` chart. This must be installed in the same namespace as the `ibm-icplogging` deployment.

3. Go to `http://<ICP_proxy_ip>:32601/app/kibana` to see the Kibana dashboard.

## Build a query to filter the logs

Using Elasticsearch, build a query similar to the following example:

```
 {
   "query": {
     "bool": {
       "must": [
         {
           "match": {
             "kubernetes.pod": "microclimate"
           }
         }
       ],
       "filter": [
         { "term": { "log": "info" }}
       ]
     }
   }
 }
 ```

This query filters the logs, providing logs from only microclimate pods (with the ```"match": {"kubernetes.pod": "microclimate"}``` section), and filters the logs from those microclimate pods to only provide logs tagged as info (with the ``` "filter": [{ "term": { "log": "info" }}]``` section).

To get more than one type of log, change the filter stanza to ```"filter": [{ "terms": { "log": ["info", "error"] }}]```, putting every log term you want to match into the ```"log":``` section, as in the following example. Log levels you can filter by are `info`, `error`, `fatal`, and `debug`.

```
 {
   "query": {
     "bool": {
       "must": [
         {
           "match": {
             "kubernetes.pod": "microclimate"
           }
         }
       ],
       "filter": [
         { "terms": { "log": ["info", "error"] }}
       ]
     }
   }
 }
 ```
