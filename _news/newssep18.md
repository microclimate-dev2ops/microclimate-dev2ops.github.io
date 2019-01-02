---
layout: news
title: News
description: Latest news
keywords: GA, release, version, history
duration: 20 seconds
permalink: newssep18
order: 8
linkname: September 2018
---

## September updates
## Microclimate 18.09

*Friday 14 September 2018*

If you've been following Microclimate thus far, you've probably noticed that the website has been redesigned! It includes a new logo, a search bar, and a table of contents that displays on all of the **Docs** pages. You can even share the **News** pages on social media with the **Tweet** button for Twitter and the **Share** button for Facebook.

The following list showcases updates for the Microclimate 18.09 release:
- Microclimate supports IBM Cloud Private 3.1. For more information about staying up to date, see [Important](#important).
- You can [add more development languages to Microclimate](addingdevelopmentlanguages). After you add the languages, they appear with Java, Node.js, and Swift when you create a new project.
- The [Acme Air sample application](acmeair) runs in Microclimate with the Java Liberty runtime.
- Installation into a non-default namespace for Microclimate on IBM Cloud Private is simpler. The `Role` and `ClusterRole` bindings are now created automatically.
- You can add additional `imagePullSecrets` with the IBM Cloud Private catalog.
- An improved iterative development model for Spring projects is added, and code updates are faster.
- Internal communications are secure with HTTPS.
- Project deletion is asynchronous, so the loading screen doesn't stall while Microclimate deletes a project.
- The number of concurrent builds are limited to prevent performance degradation when too many builds start at once. The default limit is three.
- You can create more than one pipeline that automatically deploys the last good build to a specified environment.
- You can specify a namespace for a deployment to the local cluster.
- You can override the name that is provided to the Helm release that is associated with a deployment.
- You can deploy different branches to different namespaces, and you are presented with a list of branches as found in the target Git repository.
- Deleting a deployment also deletes the deployed application.
- The **Validate** page is added in the **Overview** page, and you can see validation during project development.
- IBM Cloud Private installations of Microclimate now support logging out.

The Microclimate team hopes you install and enjoy the latest update. If you would like to provide feedback, visit the [Community](community) page and share your thoughts and ideas!

## Important
- If you installed IBM Cloud Private 3.1, please update to Microclimate Version 18.09. Previous versions of Microclimate aren't compatible with IBM Cloud Private 3.1.
- Also, if you previously installed Microclimate Version 18.09, you might not have the latest image, which adds bug fixes. To check if you already have the fixes or if you still need to install them, see [Updating to a new version of Microclimate](updating).
  - If you haven’t installed Microclimate yet, you will automatically get the fixes when you do.
