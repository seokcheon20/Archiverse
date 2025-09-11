---
title: Remark42 Comments
tags:
  - cloud
  - difficulty-advanced
  - webdev
  - seedling
date: 2023-08-23
---
I recently added [Remark42](https://remark42.com/) for comments. It's still a work in progress, and I plan to update quite a few things about it in future since it was pretty untested when I found the plugin for it.
## Backend
I run the service from Docker on [[Projects/my-cloud|my cloud]], exposed at a subdirectory of this domain. Fun fact, the exact reason that I proxy through my cloud to the GH Pages hosting for this site is so that I can do stuff like this and throw related services on subdirectories. 

I really enjoy how easy it is to bring-up my backend nowadays because everything is a docker container.

One downside is that the email notifications aren't automatic, you have to subscribe even if you're logged in with email already. I might contribute to make this more obvious (adding a confirmation dialog etc) or even automatic.
## Frontend
A [Transformer Plugin](https://quartz.jzhao.xyz/advanced/making-plugins#transformers) for Quartz was on their Discord server that adds the necessary scripts to the page, and I put the comment element on the footer of the page. 

Now works with SPA mode! Creator also updated the plugin to reload on theme change even without an event fired which is sick.

At present, you can choose to leave an anonymous comment or link it to your GitHub account. Alternatively, you can use email confirmation for notifications when someone replies to your comments!
## Todo
- Style the comment box to align with the styles on the site. Unsure if it would require reworking the plugin or just remark42.