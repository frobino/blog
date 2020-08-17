---
title: This is my third post.
description: This is a post on my blog.
date: 2018-07-04
tags:
- BLOG SETUP
- JS
layout: "layouts/post.njk"
---
The following 2 paragraphs are initiated to write "Hello World!" and "Hello Sweden!".
However, an embedded js script is able to pick the 1st paragraph and change it to "Hello Sweden!".

<p id="01">Hello World!</p>
<p id="02">Hello Sweden!</p>

<!-- Simple script modifying content of paragraph 02 -->
<script src="../scripts/simplejs.js"></script>

The following chart is generated using the external (npm) package chartjs.

<canvas id="myChart" width="400" height="400"></canvas>
<!-- Include "locally" chart js dependencies
<link rel="stylesheet" href="/assets/Chart.min.css">
<script src="/assets/Chart.min.js"></script> -->
<!-- Include "remotely" chart js dependencies -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3"></script>
<!-- Script creating chart using chart js library -->
<script src="../scripts/charttest.js"></script>
