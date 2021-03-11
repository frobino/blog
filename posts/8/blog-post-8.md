---
title: Trace compass user experience.
description: Summary of highlights from the tracevizlab course.
date: 2021-03-08
tags:
- TRACECOMPASS
layout: "layouts/post.njk"
---

# Trace compass user experience

## Vocabulary

**Analysis**: an analysis can be defined as a function of events, or function of other analyses, that transforms the trace's data into something meaningful.
Typically, analyses will focus on some aspects of a system, look at subsets of events and store results in on-disk data structures made for this purpose (*State System*).
Depending on the events contained in the trace, not all analyses may be available for all traces.

**State System**: it is like a database that stores the states of different elements through time.
The best way to describe the state system is with its direct visual representation: the time graph view.

**Data provider**: is a way to describe the data to display (the elements and the states).
An easy way to define a data provider is simply to provide the paths in the *State System* of the elements to display. E.g.:
```
var map = new java.util.HashMap();
map.put(ENTRY_PATH, '*');
provider = createTimeGraphProvider(analysis, map);
```

Then, to open a view, one simply needs to send the provider to the openTimeGraphView method:
```
openTimeGraphView(provider);
```
NOTE: data providers are an "upgraded" version of the old "view builders"

**Views**: are then used to display the analysis results to the user in an easily understandable way.

## How to interpret views:

Kernel Resources view:
- shows the state of every CPU (resource) in the system during the trace
- gives an overview of what is happening in the system

Kernel Control Flow view:
- shows the state of every thread (and process) in the system during the trace
- yellow on a line means that the thread is blocked

Use **Legend** to understand meaning of colors of bars.

## View types:

In trace compass we find mainly 3 types:
- Chart/Graph
- Table
- (Tree)Viewer

TC views are documented [here](http://archive.eclipse.org/tracecompass/doc/org.eclipse.tracecompass.doc.dev/View-Tutorial.html#TMF_Built-in_Views_and_Viewers), but I am not sure it is complete (e.g. pie charts missing?).

Below some examples.

**X-Y-Chart** (e.g. used by **CPU Usage view**, **Memory Usage view**, **I/O Disk Usage view**):
- org.eclipse.tracecompass.tmf.ui.viewers.xycharts: Common base classes for X-Y-Chart viewers based on SWTChart
- org.eclipse.tracecompass.tmf.ui.viewers.xycharts.barcharts: Base classes for bar charts
- org.eclipse.tracecompass.tmf.ui.viewers.xycharts.linecharts: Base classes for line charts

![X-Y-Chart example](https://github.com/tuxology/tracevizlab/blob/master/labs/101-analyze-system-trace-in-tracecompass/screenshots/traceCompassCpuUsage.png)

**Time Graph View** (e.g. used by **Kernel Resource view**, **Flame Chart**, **Flame graph**):
- org.eclipse.tracecompass.tmf.ui.widgets.timegraph: Base classes for time graphs e.g. Gantt-charts

![Time Graph View](https://github.com/tuxology/tracevizlab/blob/master/labs/101-analyze-system-trace-in-tracecompass/screenshots/fullTimeScale.png)

**Density Graph** (e.g. used by **Kernel Histogram view**? or **System Call Density**? or **Function Durations Distribution**):
- org.eclipse.tracecompass.analysis.timing.ui.views.segmentstore.density: Base classes for Density Graphs

**Tree Viewer**:
- org.eclipse.tracecompass.tmf.ui.viewers.tree: Base classes for TMF specific tree viewers

**Scatter Chart** (e.g. used by **Kernel System Call Latency vs Time**):
- org.eclipse.tracecompass.tmf.ui.views.tmfChartView.java: Common base classes for X-Y-Chart viewers based on SWTChart
- org.eclipse.tracecompass.analysis.timing.ui.views.segmentstore.scatter: Base classes for Scatter Charts

![Scatter Chart](https://github.com/tuxology/tracevizlab/blob/master/labs/101-analyze-system-trace-in-tracecompass/screenshots/traceCompassLatencyViews.png)

**Latency Table** (e.g. used by **Kernel System Call Latency**):
- org.eclipse.tracecompass.analysis.timing.ui.views.segmentstore.table: Base classes for Latency Tables

![Latency Table](https://github.com/tuxology/tracevizlab/blob/master/labs/101-analyze-system-trace-in-tracecompass/screenshots/traceCompassLatencyViews.png)

**Statistics Table** (e.g. used by **System Call Latency Statistics**, or **Function Duration Statistics**?):
- org.eclipse.tracecompass.analysis.timing.ui.views.segmentstore.statistics: Base classes for Statistics Tables

![Statistics Table](https://github.com/tuxology/tracevizlab/blob/master/labs/101-analyze-system-trace-in-tracecompass/screenshots/traceCompassLatencyViews.png)

**Pie Chart** ??

They should be compared with the ones presented at [datavizproject](https://datavizproject.com/). List which ones are missing, and eventually implement
for the new Theia interface.

## Possible extensions:

GPU support using CUPTI:
- [Nvidia perf analysis tools](https://developer.nvidia.com/performance-analysis-tools)
- **Visual Profiler** and **nvprof** will be [deprecated](https://docs.nvidia.com/cuda/profiler-users-guide/index.html#migrating-to-nsight-tools).
  It is recommended to use next-generation tools:
  - **NVIDIA Nsight Systems** for GPU and CPU sampling and tracing
  - **NVIDIA Nsight Compute** for GPU kernel profiling
- [NVIDIA Tools Extension (NVTX)](https://docs.nvidia.com/gameworks/index.html#gameworkslibrary/nvtx/nvidia_tools_extension_library_nvtx.htm):
  a C-based Application Programming Interface (API) for annotating events, code ranges, and resources in your applications.
  **NVTX** is used for annotating events, code ranges, and resources in the application. It doesn’t provide timing or the GPU trace information. NVTX is used in conjunction with the other Profiling tools like Visual Profiler, Nsight Systems, NSight Visual Studio Edition to capture and visualize annotation and ranges.
- **CUPTI** enables the creation of profiling and tracing tools that target CUDA applications.
  Using CUPTI APIs, one can develop profiling tools that give insight into the CPU and GPU behavior of CUDA applications.
  NVIDIA profiling tools nvprof, NVVP and Nsight Systems are layered on top of the CUPTI to capture the CUDA API trace, GPU activity trace, GPU Performance counters and metrics, PC Sampling, Unified Memory profiling, NVLink stats, OpenACC profiling etc etc

So, it seems that we want to add support for CUPTI in Trace Compass.