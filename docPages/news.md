---
layout: document
title: News
description: Latest news
keywords: GA, beta, release, version, history
duration: 20 seconds
permalink: news
---
## July release has lifted off!

*Friday , 20 July, 2018*

Following a month of the team working hard preparing for launch, the countdown is complete, and we've lifted off with another fine release of Microclimate for you to enjoy. New this month:

- You can name your Helm chart anything you like because Helm chart names no longer need to match the project name.
- Newly created projects are now set up to dynamically pull in the latest available JDK service release to pick up patches and security fixes.
- Shutdown of projects is more efficient when you close or log off Microclimate.
- A new validation step on project import generates any missing files which means a better experience getting your imported projects working in Microclimate.
- A new tutorial about [Adding a new endpoint to an application in Microclimate](https://microclimate-dev2ops.github.io/addendpoint).
- More information to help you if you get stuck, see our new  [Troubleshooting](./troubleshooting) section.
- Under the covers we've been refining the code, fixing a few things, and making Microclimate even easier for you to use.

As ever, we encourage you to pick up this latest update. We continue to drop code into Microclimate to add more value and improve on the overall quality and development experience. We would also really like to hear from you about any key function you would like to see that we might have not delivered yet, so swing by our [Community](./community) page and share your thoughts and ideas!

## June release a go-go!

*Friday, 29 June, 2018*

Summer is here, the temperature outside is definitely rising, and we're on the up as we release another fresh version of Microclimate. With this release, we've added a bunch of new features, and we've also continued the good work under the covers improving Microclimate's foundations.

- You can now install Microclimate into a non-default namespace.

- For the pipeline, you can deploy to the IBM Cloud Kubernetes Service (IKS), and create deployments from specific builds of a given project.

- We've created multi-user support in IBM Cloud Private, which means that different users can log in to Microclimate and have different workspaces.

- For a better user experience and to save those finite computing resources, you can now enable and disable automatic builds, and you can also enable and disable entire projects. Disabling a project basically puts your application on a shelf, and allows us to remove all the overhead required to manage that particular application container while you aren't working on it.

- We've improved the build and application status so you can see at a glance what's going on.

- Finally, last but definitely not least, we've improved project validation on import. Wow!

As always, we encourage you to pick up this latest update. We continue to drop code into Microclimate to add more value and improve on the overall quality and development experience. We would also really like to hear from you about any key function you would like to see that we might have not delivered yet, so swing by our [Community](./community) page and share your thoughts and ideas!

## May release live!

*Friday, May 25th, 2018*

These months are flying by, and as such so are our Microclimate releases. While this release might not have as many externally visible changes (aka shiny new things), we have done some significant work under the covers to shore up our foundation and prep things for future features.

That being said there are a few things we would like to call out with this release. We have improved on our IBM Cloud Private (ICP) integration story, and now apps that are deployed from Microclimate by way of our devops pipeline show up in the ICP dashboard. Also in our integration with Theia, we have dropped in a new feature that enables you to choose whether or not you want to see all your projects in the IDE (original behavior), or only the currently selected one. The choice can be made via the Preferences page.

As always, we encourage you to pick up this latest update. We continue to drop code into Microclimate to add more value and improve on the overall quality and development experience while using Microclimate. We also would love to hear from you about any key function you would like to see that we might have not delivered yet, so swing by our [Community](./community) page and share your ideas!

## April release available now!

*Monday, April 30th, 2018*

We are getting our groove on, and have put out another monthly release for you. This one has a few new features, but more importantly we have been doing some work behind the scenes to make our code more robust and clean.

One of the key features we added was the ability to use Microclimate running locally on your machine to create a pipeline running on ICP that can deploy your app. In addition we added ANSI format support for log files so that we can leverage colors and effects.

![Colors and effects](../images/colorsandeffects.png){: .fullwidth }

We continue to work away on new features we think will make your life easier. But if there are things we are missing out on, please feel free to hit our [Community](./community) page so you can let us know!


## Releasing Microclimate again, no more betas!

*Friday, March 30th, 2018*

Two short weeks, and it's already time for another Microclimate release! This time there's not much in the way of new function to report as we've spent the time doing some housekeeping, fit and finish, and squashing bugs. Some of us were even lucky enough to join our coming out party at the IBM Think conference (https://www.ibm.com/events/think/) and picked up some snazzy Microclimate laptop stickers and t-shirts. However, based on how far we've come in this release - and more importantly, the progress we're making - we've decided to remove our 'beta' tag. Woo hoo! 4 characters less to type each release!

As a recap, here are some of the things we can do!
- Install locally or on IBM Cloud Private
- Create applications in Java, Node, and Swift
- Applications run in Docker from day one to remove production differences
- Integrated Theia editor with git support, or use your own editor
- Rapid iterative dev - save a change and see it live in seconds!
- Test performance early with app metrics and load testing
- Production pipeline built on Jenkins

## Get ready to kick the tires on another Microclimate beta refresh!

*Sunday, March 18th, 2018*

We have another beta refresh with some additional features for you to check out. We did a refresh on our UI, making things leaner and cleaner, and in the process swapped in Theia as our new browser based IDE. In that shiny new UI,  you will also notice we started adding support for importing existing projects from a Git server (we have even included GitLab if you need it), a local directory, or an archive. For those of you running Microclimate on IBM Cloud Private, you now have the ability to create a devops pipeline that enables you to automatically deploy your projects from Git to IBM Cloud Private. To learn more about these new features, watch the <a href="#" data-video="videos/think-beta.mp4"  class='showVideo'>Import and devops pipeline video</a>.

We also upped the fun factor by highlighting Rogue Cloud this time around. If you like games, are interested in Microservice development, and would like to use Microclimate to marry those two things together, make your way over to our [Rogue Cloud](./roguecloud) page for the details on how to get up and running.

And remember, our virtual door is always open if you want to chat. We make it easy for you to make contact. Just visit [Community](./community) page to get connected!

## Microclimate beta refresh now available

*Friday, February 16th, 2018*

We are trying to get into a bit of a rhythm here, so we've put out a refresh of our first Microclimate beta. Whilst there might not be any big features being delivered in this particular refresh, we did make some changes to improve our fit and finish, and dropped our overall container footprint significantly as well. Our plan is to incrementally add features and function, so look for further updates from us as we turn out drivers. Head on over to our [Getting Started](./gettingstarted) page for instructions on how to move to the new refresh.

Remember, if you want to influence what enhancements you would like to see, or open up a bug, please visit our [Community](./community) page to find different ways to interact with us. GitHub, Slack, or StackOverflow....we've got you covered!
