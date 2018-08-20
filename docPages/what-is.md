---
layout: document
title: What is Microclimate?
description: What is Microclimate?
keywords: IDE, why, what, container, development, dev, devops, docker, editor, ide, fast, pipeline, rapid
duration: 1 minute
permalink: about
---
The past few years have seen an explosion of technologies, but many developers still use the same single-language Integrated Development Environment (IDE), debugger, and local tools that they used years ago. It's high time to upgrade!

Microclimate is a Dockerized, end-to-end development environment that enables agile development of microservices in Java, Node, and Swift. Microclimate offers services and tools to help you create and modernize applications in one seamless experience. You can use Microclimate for every step of the process, from writing and testing code locally to building and deployment with a pipeline.

By default, Microclimate comes with Theia IDE as well as application monitoring tools and an HTTP load testing utility, each preinstalled and preconfigured for your service.

## Why use Microclimate?

Local installations of Microclimate provide the following advantages:
- Simplified containerized development
- Built-in support to load test your services with JMeter
- Built-in microservice templates

You can access more benefits with a Kubernetes deployment of Microclimate:
- A seamless and configurable end-to-end environment from development to deployment
- Cluster computing advantages, including cluster storage for local or noncommitted code
- Ease of deployment, such as specifying the last success on a branch or on a specific build
- Built-in logging

## Containers

If you're deploying to containers, why not start your development there, too? Use Microclimate to create your microservices and automated build in Docker from day one.

Check out some of the benefits of developing inside a container:
- You have a cleaner environment when all the application components exist in the Docker container.
- If you're using versioned Docker images for your build environment, you can know and reproduce exactly what Docker built.
- You can avoid issues with local settings and installers for multiple tools.
- You have less machine setup. Simply use the Docker pull command to begin.

## IDE

The powerful Theia IDE is included in the box. We've extended its capabilities by putting some [language servers](http://langserver.org) in the image, including our very own [XML Language Support](https://marketplace.visualstudio.com/items?itemName=IBM.XMLLanguageSupport).

Don't want to use a web-based IDE? No problem - that's why we've taken care to set up your project for rapid development in any popular IDE, including Eclipse, Visual Studio Code, Orion, and Atom IDE. Point your IDE at the project, and it's ready to go! For more information, see [Setting up your own IDE to use with Microclimate](./setting-own-ide).

## Iterative development

Every Microclimate project is set up to react to changes immediately, regardless of language, Docker, or your IDE. Use the Microclimate automated build environment for rapid iteration with real-time performance insights, intelligent feedback, diagnostic services, and an integrated DevOps pipeline.
