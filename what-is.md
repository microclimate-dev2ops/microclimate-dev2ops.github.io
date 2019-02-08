---
layout: about
title: What is Microclimate?
description: What is Microclimate?
keywords: IDE, why, what, container, development, dev, devops, docker, editor, ide, fast, pipeline, rapid
duration: 1 minute
permalink: about
---

<div class="grid-container">
    <div class="grid-x">
        <div class="cell large-5">
            <h2>What is Microclimate?</h2>
            <p>Microclimate is a Dockerized, end-to-end development environment that enables agile development and delivery of microservices, hybrid, and Docker containerized apps in Java, Node.js, and Swift. Microclimate offers services and tools to help you create and modernize applications in one seamless experience. You can use Microclimate for every step of the process, from writing and testing code locally to building and deployment with a pipeline.</p>
            <p>Teams are increasingly turning to continuous delivery, microservices, DevOps, and containers as the foundation for application architectures to enable faster innovation and business agility. To achieve agility and stability, use a microservices architecture to develop and deliver modern, lightweight, and composable workloads across public, private, and hybrid application environments.</p>
        </div>
        <div class="cell large-4 large-offset-3">
            <img src="dist/images/waterfall-cube.svg" alt="" class="waterfall-cube">
        </div>
    </div>
</div>

<div class="grid-x">
    <div class="cell large-offset-1 large-10">
        <p class="pullquote">For those who want to maximize the pace and benefits of continuous delivery, Microclimate serves as the enabling technology for the entire software delivery lifecycle.</p>
    </div>
</div>

<div class="grid-container">
    <div class="grid-x">
        <div class="cell large-12">
            <div class="callout-box">
                <div class="callout-box_header">Microclimate users benefit from the following microservices capabilities:</div>
                <ul style="list-style-type:none">
                    <li>Decomposing large applications into small pieces</li>
                    <li>Providing loosely coupled, composable modules</li>
                    <li>Enabling easily scalable development</li>
                    <li>Improving fault isolation</li>
                    <li>Developing and deploying each service independently</li>
                    <li>Eliminating any long-term commitment to a technology</li>
                </ul> 
            </div>
        </div>
    </div>
</div>

<div class="feature-deep-dive">
    <div class="grid-x">
        <div class="cell large-12">
            <div class="header">Microclimate Deep Dive</div>
        </div>
    </div>
    <div class="grid-x">
        <div class="cell large-12">
            <ul class="tabs" data-tabs id="deep-dive" data-deep-link="true">
                <li class="tabs-title is-active">
                    <a href="#why-microclimate" aria-selected="true" class="tabs-link">
                        Why Microclimate
                    </a>
                </li>
                <li class="tabs-title">
                    <a data-tabs-target="containers"  href="#containers" class="tabs-link">
                        Containers
                    </a>
                </li>
                <li class="tabs-title">
                    <a data-tabs-target="IDE" href="#IDE" class="tabs-link">
                        IDE
                    </a>
                </li>
                <li class="tabs-title">
                    <a data-tabs-target="iterative-development" href="#iterative-development" class="tabs-link">
                        Iterative Development
                    </a>
                </li>
                <li class="tabs-title">
                    <a data-tabs-target="ICP" href="#ICP" class="tabs-link">
                        IBM Cloud Private
                    </a>
                </li>
            </ul>
        </div>
        <div class="tabs-content" data-tabs-content="deep-dive">
            <div class="tabs-panel is-active" id="why-microclimate">
                <div class="grid-x">
                    <div class="cell large-7">
                        <h4>Local installations of Microclimate provide the following advantages:</h4>
                        <ul>
                            <li>Simplified containerized development</li>
                            <li>Built-in support to load test your services</li>
                            <li>Built-in microservice templates</li>
                        </ul>
                        <h4>You can access more benefits with a Kubernetes deployment of Microclimate:</h4>
                        <ul>
                            <li>A seamless and configurable end-to-end environment from development to deployment</li>
                            <li>Cluster computing advantages, including cluster storage for local or non-committed code</li>
                            <li>Ease of deployment, such as specifying the last success on a branch or on a specific build</li>
                            <li>Built-in logging</li>
                        </ul>
                        <h4>GDPR Guidelines</h4>
                        <ul>
                            <li>For more information about Microclimate and GDPR, see <a href="gdpr-deployment-guidelines">Microclimate considerations for GDPR readiness</a>.</li>
                        </ul>
                        <p>By default, Microclimate comes with Theia IDE as well as application monitoring tools and an HTTP load testing utility, each preinstalled and preconfigured for your service.</p>
                    </div>
                    <div class="cell large-offset-1 large-4">
                        <img src="dist/images/mc-containerized.svg" width="399" alt="containerized image" height="463">
                    </div>
                </div>
            </div>
            <div class="tabs-panel" id="containers">
                <div class="grid-x">
                    <div class="cell large-7">
                        <p>If you're deploying to containers, why not start your development there, too? Use Microclimate to create your microservices and automated build in Docker from day one.</p>
                        <h4>Check out some of the benefits of developing inside a container:</h4>
                        <ul>
                            <li>You have a cleaner environment when all the application components exist in the Docker container.</li>
                            <li>If you're using versioned Docker images for your build environment, you can know and reproduce exactly what Docker built.</li>
                            <li>You can avoid issues with local settings and installers for multiple tools.</li>
                            <li>You have less machine setup. Simply use the Docker pull command to begin.</li>
                        </ul>
                    </div>
                    <div class="cell large-offset-1 large-4">
                        <img src="dist/images/containers.svg" width="311" height="470">
                    </div>
                </div>
            </div>
            <div class="tabs-panel" id="IDE">
                <div class="grid-x">
                    <div class="cell large-6">
                        <p>The powerful Theia IDE is included in the box. We've extended its capabilities by putting some <a href="http://langserver.org">language servers</a> in the image, including our very own <a href="https://marketplace.visualstudio.com/items?itemName=IBM.XMLLanguageSupport">XML Language Support</a>.</p>
                        <p>Don't want to use a web-based IDE? No problem - that's why we've taken care to set up your project for rapid development in any popular IDE, including Eclipse, Visual Studio Code, Orion, and Atom IDE. Point your IDE at the project, and it's ready to go! For more information, see the <a href="mdt-overview">Microclimate Developer Tools overview</a>.</p>
                    </div>
                    <div class="cell large-offset-1 large-5">
                        <img src="dist/images/command-center.svg" width="572" height="357">
                    </div>
                </div>
            </div>
            <div class="tabs-panel" id="iterative-development">
                <div class="grid-x">
                    <div class="cell large-6">
                        <p>Every Microclimate project is set up to react to changes immediately, regardless of language, Docker, or your IDE. Use the Microclimate automated build environment for rapid iteration with real-time performance insights, intelligent feedback, diagnostic services, and an integrated DevOps pipeline.</p>
                    </div>
                    <div class="cell large-offset-1 large-5">
                        <img src="dist/images/code-blur-blue.svg" width="460" height="361">
                    </div>
                </div>
            </div>
            <div class="tabs-panel" id="ICP">
                <div class="grid-x">
                    <div class="cell large-6">
                        <p>IBM Cloud Private provides an integrated IaaS and PaaS environment that can be deployed on premise, behind firewalls, and managed and controlled by any user that the enterprise determines. For containerized applications, IBM Cloud Private offers a Kubernetes-based container orchestrator, a private image repository, along with security, event management, a management console, and monitoring frameworks.</p>
                        <p>For more details, see the latest <a href="https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0.2/kc_welcome_containers.html">IBM Cloud Private</a> release and <a href="https://www.ibm.com/developerworks/community/wikis/home?lang=en#!/wiki/W1559b1be149d_43b0_881e_9783f38faaff">IBM developerWorks:IBM Cloud Private</a>.</p>
                    </div>
                    <div class="cell large-offset-1 large-5">
                        <img src="dist/images/logo-ICP.svg" width="370" height="328">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="features-benefits">
    <div class="grid-container">
        <div class="grid-x">
            <div class="cell large-12">
                <div class="header">The business benefits of using Microclimate</div>
            </div>
        </div>
    </div>
    <div class="grid-container">
        <div class="grid-x grid-margin-x" data-equalizer>
            <div class="cell small-12 medium-6 large-4">
                <div class="card" data-equalizer-watch>
                    <div class="card_content">
                        <div class="grid-x">
                            <div class="cell small-offset-4 small-4 medium-offset-5">
                                <div class="card_number">1</div>
                            </div>
                            <div class="cell small-12">
                                <div class="card_title">Service-oriented and scalable</div>
                            </div>
                        </div>
                        <!-- <hr>
                        <p>Offers development tools that enable you to create applications by using a service-oriented, scalable approach. The cloud-native application can capitalize on the benefits derived from a cloud platform, allowing your enterprise to easily add capacity and manage the cost of the service.</p> -->
                    </div>
                </div>
            </div>
            <div class="cell small-12 medium-6 large-4">
                <div class="card" data-equalizer-watch>
                    <div class="card_content">
                        <div class="grid-x">
                            <div class="cell small-offset-4 small-4">
                                <div class="card_number">2</div>
                            </div>
                            <div class="cell small-12">
                                <div class="card_title">Unified development environment</div>
                            </div>
                        </div>
                        <!-- <hr>
                        <p>Delivers the tools, flexibility and cross platform ability to help you improve application development. An open, cloud-based development environment can drive innovation and offer a faster, unified development experience.</p> -->
                    </div>
                </div>
            </div>
            <div class="cell small-12 medium-6 large-4">
                <div class="card" data-equalizer-watch>
                    <div class="card_content">
                        <div class="grid-x">
                            <div class="cell small-offset-4 small-4">
                                <div class="card_number">3</div>
                            </div>
                            <div class="cell small-12">
                                <div class="card_title">Built using the latest standards</div>
                            </div>
                        </div>
                        <!-- <hr>
                        <p>Provides productivity tools with cross platform, multiple runtime support that are lightweight, open and built using the latest standards.</p> -->
                    </div>
                </div>
            </div>
            <div class="cell small-12 medium-6 large-4">
                <div class="card" data-equalizer-watch>
                    <div class="card_content">
                        <div class="grid-x">
                            <div class="cell small-offset-4 small-4">
                                <div class="card_number">4</div>
                            </div>
                            <div class="cell small-12">
                                <div class="card_title">End-to-end Docker deployment</div>
                            </div>
                        </div>
                        <!-- <hr>
                        <p>Enables you to create microservices and automated builds in Docker from the beginning. Eliminate the need to recreate problems that only happen on one machine, or differences when switching to containers in production. The environment is also built using Docker, enabling you to run it locally or host it on the cloud platform for use over the web. You can bypass issues with local settings or installers for multiple tools.</p> -->
                    </div>
                </div>
            </div>
            <div class="cell small-12 medium-6 large-4">
                <div class="card" data-equalizer-watch>
                    <div class="card_content">
                        <div class="grid-x">
                            <div class="cell small-offset-4 small-4">
                                <div class="card_number">5</div>
                            </div>
                            <div class="cell small-12">
                                <div class="card_title">Fast and flexible development</div>
                            </div>
                        </div>
                        <!-- <hr>
                        <p>Enables you to generate microservices in Java, Node.js and Swift; edit and see your changes as you go. When coding is complete, you can check it in and the pipeline automatically builds and deploys to Kubernetes. Save time with application monitoring tools and an HTTP load-driver to start. Each is preinstalled and preconfigured, and you can add more tools as needed.</p> -->
                    </div>
                </div>
            </div>
            <div class="cell small-12 medium-6 large-4">
                <div class="card" data-equalizer-watch>
                    <div class="card_content">
                        <div class="grid-x">
                            <div class="cell small-offset-4 small-4">
                                <div class="card_number">6</div>
                            </div>
                            <div class="cell small-12">
                                <div class="card_title">Multiple IDE options</div>
                            </div>
                        </div>
                        <!-- <hr>
                        <p>Includes Theia IDE in the box. Microclimate can also leverage popular IDEs including Eclipse, Visual Studio Code, Orion, and Atom IDE, for more information, see <a href="settingownide">Setting up your own IDE to use with Microclimate</a>.</p> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- ## GDPR Guidelines
For more information about Microclimate and GDPR, see [Microclimate considerations for GDPR readiness](gdpr-deployment-guidelines).

## What to do next
[Get started](gettingstarted), see [what's new in Microclimate](news), or return to [Documentation](documentation). -->
