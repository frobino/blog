---
title: Javascript project setup
description: How to quickly setup a Javascript project
date: 2021-04-06
tags:
- Javascript
layout: "layouts/post.njk"
---

How to quickly setup a Javascript project.

## Package managers

The 2 mainly used: **npm** and **yarn**

### npm

Usually installed by default with **nvm**.

### yarn

Install:
``` bash
npm i -g corepack
```

## Build systems

Monorepo is a software development strategy in which a single repository contains code
for multiple projects with shared dependencies.
The repositories are structured into sub repositories, usually located under the */packages* folder.
Subrepositories/components can be published to npmjs registries or similar.
See for example the base component in theia-trace-extension project.

**lerna**, **yarn-workspace**

## Builder (build tools)

Put togheter different tools/libs and give you a quick-start setup: **vite**, **webpack**.

### vite

``` bash
yarn create vite <projectName> --template react
cd <projectName>
yarn # to install packages
yarn dev # to run and access app
```

### webpack

See theia-trace-extension (or timeline-chart)

## Backend project (pure js, no html)

``` bash
mkdir <projectFolder>
cd <projectFolder>
npm init
# Add needed packages
npm install express --save
# Create index.js main file and add code.
# E.g.:
# console.log('Hello world');
touch index.js
echo "console.log('Hello world')" > index.js
# Run the code
node index.js
```

See examples at [js-tutorials][js-tutorials].

How to debug:
```
npm start --inspect command
```

or:
```
node --inspect index.js
```

Then use a browser to connect to the proposed link.

## Frontend project (js and html)

[js-tutorials]: https://github.com/frobino/js_tutorial
