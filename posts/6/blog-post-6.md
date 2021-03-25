---
title: Git workflows
description: Document different git workflows.
date: 2021-03-02
tags:
- GIT
layout: "layouts/post.njk"
---

A concise description of different workflows using git.

## [Github pull | Gitlab merge] request model

A very good post describing concisely the model can be found
[here](https://www.gun.io/blog/how-to-github-fork-branch-and-pull-request).

Summary:
- fork the repo of the project you want to contribute to;
- clone the forked repo:
  ``` git
  git clone **your ssh/git url**
  ```
- add the original remote to be "tracked", so that our forked
  repo can follow the development of the original project:
  ``` git
  git remote add --track master upstream git://github.com/upstreamname/projectname.git
  git fetch upstream
  git merge upstream/master
  ```
- create out feature branch:
  ``` git
  git checkout newfeature
  ```
- Work on the feature branch!
- Submit a pull request:
  ``` git
  git push origin newfeature
  ```
  Then go to Github / Gitlab and create the pull request;
- Whenever you commit and push more things to that branch of your code,
  they will be included in that pull request until it is closed.

The link at the beginning of this post was found when searching
[how to update forked repo](https://stackoverflow.com/questions/7244321/how-do-i-update-a-github-forked-repository).

## Git and Gerrit

Usually less need of branches, use gerrit as branches:
``` git
git push origin HEAD:refs/for/master
```

## Gitflow

See [description here](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).