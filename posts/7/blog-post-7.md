---
title: CI/CD with git, jenkins, gerrit, docker
description: Document CI/CD approaches using git.
date: 2021-03-08
tags:
- GIT
- GERRIT
- JENKINS
- DOCKER
layout: "layouts/post.njk"
---

Summary of "how-to" for setting up a CI/CD environment. 

## Jenkins

### How to setup Jenkins

TODO (include docker).
Currently hosted [here](https://sites.google.com/site/francescosblogg/blog/gerritandjenkinstutorial).

### How to configure Jenkins master - slave

Jenkins supports a “distributed builds” architecture, also called
“master-agent mode” or “master-slave architecture”:
* **master**: is the Jenkins server responsible for managing the build
  environment and providing GUI and API for the user
* **slave** (a.k.a. **agent**): is a separate machine set up to
  actually execute the jobs

The master/slave architecture comes in handy when you need to have several
different environments to test your builds or when the master runs out
of resources.
See [Distributed Builds Architecture](https://www.jenkins.io/doc/book/scaling/architecting-for-scale/) for more details.

In order to setup an master/slave configuration, the slave needs to run
an agent program to establish a bi-directional connection with the master.
There are different types of connections that can be used between
master and slave:
* SSH
* JNPL-TCP

Here we will describe how to configure a SSH connector.
This guide assumes that there is a SSH server already installed
on the slave machine.
Steps to configure SSH connector

1. Click on Manage Jenkins in the left corner on the Jenkins dashboard.
2. Click on Manage Nodes.
3. Click on New Node and enter the name of the node (typically the host name)
   in the corresponding field. Click on the Permanent Agent radio button
   and press OK.
4. Enter the required information.
   * In the Remote root directory field insert the absolute path to
     the directory you want to be used by the agent as its working directory.
   * Typical values are “C:\Jenkins” for agents running on a Windows machine
     and ”/home/Jenkins” or “var/Jenkins” on Linux machines.
   * In the Host field enter the IP address of the slave machine.
     Select the Launch agents via SSH option from he Launch method
     dropdown list and Manually trusted key Verification Strategy from
     the Host Key Verification Strategy dropdown list.
   * After you have inserted the required information as described
     press on the Add button and click on Jenkins.
5. Enter the SSH username and password needed to connect to SSH server
   running on the slave machine and then press on the Add button.
6. From the Credentials dropdown list select the item you just created
   and press the Save button.

Once a slave is configured, we can configure Jenkins jobs to execute
on a specific slave by means of Labels.

1. In the Jenkins job, select the configuration parameter
   "Restrict where this project can be run"
2. Specify the Label that matches the slave(s) on which the job can run

In case of use of a Jenkinsfile, the following can be used:
``` text
pipeline {
    agent {
        label 'mylabel' /* Only use agents labeled as compatible. */
    }
    ...
    stages{...}
...
}
```

### How to use Jenkinsfiles

A continuous delivery (CD) pipeline is an automated expression
of your process for getting software from version control right through to your users and customers.
Every change to your software (committed in source control) goes through
steps (build, test execution, etc.) on its way to being released.

A Jenkins Pipeline is written into a text file (called a **Jenkinsfile**)
which in turn can be committed to a project’s source control repository.
[See here](https://www.jenkins.io/doc/book/pipeline/jenkinsfile/)
how to create and use a Jenkinsfile.

Common structure of a Jenkinsfile:
``` text
pipeline {
    /*
     * [optional] configure agent/slave
     */
    agent {
        label 'mylabel' /* Only use agents labeled as compatible. */
    }

    /* 
     * Each stage is used as an independent part of the build.
     * If any stage has compilation errors or failed tests, the build fails.
     */
    stages {

            stage('build') {
                agent { dockerfile { filename 'Dockerfile.bare' } }
                steps {
                    dir('src') {
                        catchError(stageResult: 'FAILURE') {
                            script {
                                tee('build.log') {
                                    sh 'make'
                                }
                            }
                            recordIssues enabledForFailure: true, failOnError:  false, healthy: 1,
                                tools: [gcc(id: 'build', name: 'Build',
                                    pattern: 'build.log')]
                            archiveArtifacts artifacts: 'build_directory/*.bin, build_directory/*.map,build_directory/*.elf'
                        }                        
                    }
                }
            }
            ...
    }

    post {
        always {
            step([$class: 'Mailer', sendToIndividuals: true,
               recipients: emailextrecipients([culprits(), requestor()])])
            deleteDir() // Save much disk space. Adds around 150% cloning time.
        }
    }
}
```

### Configure Jenkins to provide Verified result to Gerrit project

See [instructions here](https://plugins.jenkins.io/gerrit-trigger/).

Special attention should be given to the *Gerrit project* section.
Configure correctly *Type*, *Pattern* and *Branches*.
For *Branches*, make sure to use the proper notation or **.

## Gerrit

### Configure Gerrit project with Verified label from Jenkins job

Checkout the special config branch of the project:
``` git
git fetch origin refs/meta/config:config
git checkout config
```
Here one should see the file project.config.
Add the following text to the end of this file: 
``` text
[label "Verified"]
    function = MaxWithBlock
    value = -1 Fails
    value =  0 No score
    value = +1 Verified
```
Commit and push the config back to the server:
``` git
git add project.config
git commit -m "Added Verified label"
git push origin HEAD:refs/meta/config
```
Continue by allowing Non-Interactive Users (and Administrators) to give the label Verified:
- Go to Project - your project
- Select Access
- Click on Edit
- Click on Add Reference
- Click on Add Permission and select a label in the drop-down list, and type a Group Name, then click Add

## Submodules

Add a submodule to your project:
``` git
git submodule add https://github.com/Microsoft/vcpkg
git add .gitmodules vcpkg/
git commit -m "added submodule"
```

The strucuture of a .gitmodules file is similar to:
``` text
[submodule "sub/subproject"]
	path = sub/subproject
	url = ../subproject
```
or
``` text
[submodule "analyses/org.eclipse.tracecompass.incubator.validator.core/requirement_converter"]
	path = analyses/org.eclipse.tracecompass.incubator.validator.core/requirement_converter
	url = https://gitlab.com/trace-validation/requirement-converter.git
[submodule "analyses/org.eclipse.tracecompass.incubator.validator.core/trace_validator"]
	path = analyses/org.eclipse.tracecompass.incubator.validator.core/trace_validator
```

Clone a project with submodules:
``` git
git clone /url/to/repo/with/submodules
git submodule init
git submodule update
```

## Git lfs and Artifactory

[TODO](https://help.sonatype.com/repomanager3/formats/git-lfs-repositories)

## Docker

Build an image from Dockerfile:
``` bash
cd <folder containing Dockerfile + cross compiler for powerpc>
docker build --build-arg win_user=frobino -t myimage:0.1 .
```

Configure and start container for the 1st time:
``` bash
docker run --name frobino-container -v /home/frobino/git_wa:/mnt/git_wa --user frobino -it myimage:0.1 /bin/bash
```

Start container:
``` bash
docker start frobino-container
```

Exec command in container
``` bash
docker exec frobino-container -it /bin/bash
```

Stop container:
``` bash
docker stop frobino-container
```

Remove image
``` bash
docker rmi imagename
```

Remove container
``` bash
docker rm containername
```

List containers:
``` bash
docker ps -a
```

Example of Dockerfile:
``` bash
# Initially tested with debian:testing.
# To switch between testing and buster change the "sed" commands into "testing" or "buster"
FROM debian:buster
MAINTAINER frobino@kth.se

# Setup proxy if needed:
# ENV HTTP_PROXY "http://webproxy.xxx.net:8080"
# ENV HTTPS_PROXY "webproxy.xxx.net:8080"
# ENV http_proxy "http://webproxy.xxx.net:8080"
# ENV NO_PROXY "localhost,127.0.0.1"

# add non-free repos
RUN sed -i "s#deb http://deb.debian.org/debian buster main#deb http://deb.debian.org/debian testing main contrib non-free#g" /etc/apt/sources.list
RUN sed -i "s#deb http://security.debian.org/debian-security buster/updates main##g" /etc/apt/sources.list
RUN sed -i "s#deb http://deb.debian.org/debian buster-updates main#deb http://deb.debian.org/debian testing-updates main contrib non-free#g" /etc/apt/sources.list
# RUN cat /etc/apt/sources.list

RUN apt-get update --allow-releaseinfo-change && apt-get install -y \
    git \
    gcc \
    gcc-multilib
    # How to install specific version:
    # libcunit1-dev=1.3.*

RUN dpkg --add-architecture i386
RUN apt-get update && apt-get install -y \
    wine32

# TODO: find a better way to install waf (e.g. host on Nexus)

# RUN mkdir -p /home/Tools/waf-2.0.19 \
#     && curl -x webproxy.bt.bombardier.net:8080 -O https://waf.io/waf-2.0.19 \
#     && mv waf-2.0.19 /home/Tools/waf-2.0.19 && cp /home/Tools/waf-2.0.19/waf-2.0.19 /home/Tools/waf-2.0.19/waf \
#     && chmod -R 777 /home/Tools/waf-2.0.19

RUN mkdir -p /home/Tools/waf-2.0.14 \
    && wget --no-check-certificate https://sites.google.com/site/francescosblogg/blog/wafbuildsystem/waf-2.0.14 \
    && mv waf-2.0.14 /home/Tools/waf-2.0.14 && cp /home/Tools/waf-2.0.14/waf-2.0.14 /home/Tools/waf-2.0.14/waf \
    && chmod -R 777 /home/Tools/waf-2.0.14

# TODO: find a better way to install ppc compiler (e.g. host on Nexus)
# /media/sf_C_DRIVE/git_wa/Tool_gcc_ppc_linux-$win_user/Tool_gcc_pcc_linux/powerpc-unknown-elf.tar.gz

COPY powerpc-unknown-elf-gcc4.9.4.tar.gz /home/Tools/
RUN tar xvf /home/Tools/powerpc-unknown-elf-gcc4.9.4.tar.gz --directory /home/Tools \
    && chmod -R 777 /home/Tools/powerpc-unknown-elf

# Use parameter passed with the --build-arg flag:
# Add windows username as generic parameter when starting the container
ARG win_user=default_value
ENV env_var_name=$win_user

## Setup env variables ##

# $ docker build --build-arg win_user=a_value # [...]
ENV USERNAME=$win_user
ENV PATH=$PATH:/home/Tools/waf-2.0.14

## CREATE $win_user USER ##

# Create the home directory for the new app user.
RUN mkdir -p /home/$win_user &&\
    chmod -R 777 /home/$win_user

# Create an $win_user user so our programs doesn't run as root.
RUN groupadd -r $win_user &&\
    useradd -r -g $win_user -d /home/$win_user -s /sbin/nologin -c "Docker image user" $win_user

# Set the home directory to our app user's home.
ENV HOME=/home/$win_user
ENV WINEARCH=win32
ENV WINEPREFIX=/home/$win_user/.wine

# The following is only to show how to add aliases:
# RUN echo 'alias powerpc-unknown-gnu-gcc=powerpc-linux-gnu-gcc' >> /home/$win_user/.bashrc
# RUN echo 'alias powerpc-unknown-gnu-ar=powerpc-linux-gnu-ar' >> /home/$win_user/.bashrc
# RUN echo 'alias powerpc-unknown-gnu-ld=powerpc-linux-gnu-ld' >> /home/$win_user/.bashrc

RUN chown -R $win_user:$win_user /home/$win_user

CMD [“echo”,”Image created”]
```