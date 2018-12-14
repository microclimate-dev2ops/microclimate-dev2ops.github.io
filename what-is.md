---
layout: about
title: What is Microclimate?
description: What is Microclimate?
keywords: IDE, why, what, container, development, dev, devops, docker, editor, ide, fast, pipeline, rapid
duration: 1 minute
permalink: about
---

## What is Microclimate

Microclimate is a Dockerized, end-to-end development environment that enables agile development and delivery of microservices, hybrid, and Docker containerized apps in Java, Node.js, and Swift. It can also [be extended](addingdevelopmentlanguages) to support development in any language of your choice. Example extensions are provided for Go and Python applications. Microclimate offers services and tools to help you create and modernize applications in one seamless experience. You can use Microclimate for every step of the process, from writing and testing code locally to building and deployment with a pipeline.

Teams are increasingly turning to continuous delivery, microservices, DevOps, and containers as the foundation for application architectures to enable faster innovation and business agility. To achieve agility and stability, use a microservices architecture to develop and deliver modern, lightweight, and composable workloads across public, private, and hybrid application environments.

Microclimate users benefit from the following microservices capabilities:
- Decomposing large applications into small pieces
- Providing loosely coupled, composable modules
- Enabling easily scalable development
- Improving fault isolation
- Developing and deploying each service independently
- Eliminating any long-term commitment to a technology

For those who want to maximize the pace and benefits of continuous delivery, Microclimate serves as the enabling technology for the entire software delivery lifecycle.

Learn more about:

* [Why use Microclimate?](#why-use-microclimate)
  - [Containers](#containers)
  - [IDE](#ide)
  - [Iterative development](#iterative-development)
* [What are the business benefits of using Microclimate?](#the-business-benefits-of-using-microclimate)
  - [Service-oriented and scalable](#service-oriented-and-scalable)
  - [Unified development environment](#unified-development-environment)
  - [Built using the latest standards](#built-using-the-latest-standards)
  - [End-to-end Docker deployment](#end-to-end-docker-deployment)
  - [Fast, flexible development](#fast-and-flexible-development)
  - [Multiple IDE options](#ide)
* [What is IBM Cloud Private?](#ibm-cloud-private)
* [GDPR Guidelines](#gdpr-guidelines)
* [What to do next](#what-to-do-next)

## Why use Microclimate?

Local installations of Microclimate provide the following advantages:
- Simplified containerized development
- Built-in support to load test your services
- Built-in microservice templates

You can access more benefits with a Kubernetes deployment of Microclimate:
- A seamless and configurable end-to-end environment from development to deployment
- Cluster computing advantages, including cluster storage for local or non-committed code
- Ease of deployment, such as specifying the last success on a branch or on a specific build
- Built-in logging

By default, Microclimate comes with Theia IDE as well as application monitoring tools and an HTTP load testing utility, each preinstalled and preconfigured for your service.

## Containers

If you're deploying to containers, why not start your development there, too? Use Microclimate to create your microservices and automate your application build from day one.

Check out some of the benefits of developing inside a container:
- You have a cleaner environment when all the application components exist in the Docker container.
- If you're using versioned Docker images for your build environment, you can know and reproduce exactly what Docker built.
- You can avoid issues with local settings and installers for multiple tools.
- Set up a new machine with the `docker pull` command.

## IDE

The powerful Theia IDE is included in the box. We've extended its capabilities by putting some [language servers](http://langserver.org) in the image, including our very own [XML Language Support](https://marketplace.visualstudio.com/items?itemName=IBM.XMLLanguageSupport).

Don't want to use a web-based IDE? No problem - that's why we've taken care to make your project ready for rapid development in any editor. Microclimate also provides plug-ins for both [Eclipse](mdteclipseoverview) and [Visual Studio Code](mdt-vsc-overview), which integrate Microclimate features directly into your IDE. For more information, see [Working with Microclimate from your editor](settingownide).

## Iterative Development

Every Microclimate project is set up to react to changes immediately, regardless of language, Docker, or your IDE. Use the Microclimate automated build environment for rapid iteration with real-time performance insights, intelligent feedback, diagnostic services, and an integrated DevOps pipeline.

## The business benefits of using Microclimate

#### Service-oriented and scalable
Offers development tools that enable you to create applications by using a service-oriented, scalable approach. The cloud-native application can capitalize on the benefits derived from a cloud platform, allowing your enterprise to easily add capacity and manage the cost of the service.

#### Unified development environment
Delivers the tools, flexibility and cross platform ability to help you improve application development. An open, cloud-based development environment can drive innovation and offer a faster, unified development experience.

#### Built using the latest standards
Provides productivity tools with cross platform, multiple runtime support that are lightweight, open and built using the latest standards.

#### End-to-end Docker deployment
Enables you to create microservices and automated builds in Docker from the beginning. Eliminate the need to recreate problems that only happen on one machine, or differences when switching to containers in production. The environment is also built using Docker, enabling you to run it locally or host it on the cloud platform for use over the web. You can bypass issues with local settings or installers for multiple tools.

#### Fast and flexible development
Enables you to generate microservices in Java, Node.js, Swift and, [by extension](addingdevelopmentlanguages), any language of your choice, including Go and Python. Edit and see your changes as you go. When coding is complete, you can check it in and the pipeline automatically builds and deploys to Kubernetes. Save time with application monitoring tools and an HTTP load-driver to start. Each is preinstalled and preconfigured, and you can add more tools as needed.

## IBM Cloud Private
IBM Cloud Private provides an integrated IaaS and PaaS environment that can be deployed on premise, behind firewalls, and managed and controlled by any user that the enterprise determines. For containerized applications, IBM Cloud Private offers a Kubernetes-based container orchestrator, a private image repository, along with security, event management, a management console, and monitoring frameworks.

For more details, see the latest [IBM Cloud Private](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0.2/kc_welcome_containers.html) release and [IBM developerWorks:IBM Cloud Private](https://www.ibm.com/developerworks/community/wikis/home?lang=en#!/wiki/W1559b1be149d_43b0_881e_9783f38faaff).

## GDPR Guidelines
For more information about Microclimate and GDPR, see [Microclimate considerations for GDPR readiness](gdpr-deployment-guidelines).

## What to do next
[Get started](gettingstarted), see [what's new in Microclimate](news), or return to [Documentation](documentation).
