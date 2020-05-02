---
title: This is my first post.
description: This is a post on my blog showing basic functionalities.
date: 2018-05-01
tags: BLOG SETUP
layout: "layouts/post.njk"
---
This is a paragraph of text.

## Section Header

How to insert a picture:

![A picture of Lena](../images/lena.png)

How to include text with highlight on lines 2-3 using the syntax highlight plugin:

``` text/2-3
// this is a command
function myCommand() {
	let counter = 0;
	counter++;
}

// Test with a line break above this line.
console.log('Test');
```

How to include js code with different highlights on lines 2/4 using the syntax highlight plugin:

``` js/2/4
// this is a command
function myCommand() {
	let counter = 0;

	counter++;

}

// Test with a line break above this line.
console.log('Test');
```

Linking using inline html:

<a href="{{ '/posts/2/blog-post-2/' | url }}">Second post</a>

