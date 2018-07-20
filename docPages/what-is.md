---
layout: document
title: What is Microclimate?
description: What is Microclimate?
keywords: IDE, why, what, container, devbelopment, dev, devops, docker, editor, ide, fast, pipeline, rapid
duration: 1 minute
permalink: about
---

Microclimate is a Docker-ized, end-to-end development environment. You can generate microservices in Java, Node, and Swift, edit them, and see your changes on the fly. When you're happy with the code, check it in and the pipeline automatically builds and deploys to Kubernetes.

The past few years have seen an explosion of technologies - Microservices, Docker, Polyglot... the list goes on. But lots of developers are still using the same single-language Integrated Development Environment (IDE), debugger, and local tools, that they were using years ago. It's high time to upgrade!

And we're not just another friendly IDE! We've included application monitoring tools and an HTTP load-driver to start, and plan to include other tools over time. Each of these is pre-installed and pre-configured for your service so you can just switch tabs and go - no hunting for other tools or trying to set them up when you run into problems.


## Containers

If you're deploying to containers, why not start your development there too? Microclimate enables you to create your microservices and automated build in Docker from day one. No more time spent trying to recreate problems that happen only on one machine, or differences when switching to containers in production.

The environment is built by using Docker too - so you can run it locally, or host it on your cloud platform and use it over the web. Likewise, no more issues with local settings or installers for multiple tools.


## IDE

We’ve included the powerful Theia IDE in the box, and extended it's capabilities by including some [language servers](http://langserver.org) in the image,  including our very own [XML Language Support](https://marketplace.visualstudio.com/items?itemName=IBM.XMLLanguageSupport).

Don't want to use a web-based IDE? No problem - that's why we've taken care to setup your project for rapid development in any popular IDE, including Eclipse, Visual Studio Code, Orion, Atom IDE, or Theia. Just point your IDE at the project, it's ready to go! For more information, see [Setting up your own IDE to use with Microclimate](./setting-own-ide).


## Iterative Development

We're developers too, so being able to iterate rapidly is very important to us. That's why we've setup every project to react to changes immediately, regardless of language, Docker, or which IDE you use.
