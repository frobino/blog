---
title: Setup Java project
description: How to quickly setup a Java project
date: 2021-04-06
tags:
- Java
- Maven
layout: "layouts/post.njk"
---

How to quickly setup a Java project.

## Maven build system

See quick intro [here](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html).

``` bash
mvn archetype:generate -DgroupId=com.mycompany.app -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
mvn package
java -cp target/my-app-1.0-SNAPSHOT.jar com.mycompany.app.App
```

## Maven Phases

- **validate**: validate the project is correct and all necessary information is available
- **compile**: compile the source code of the project
- **test**: test the compiled source code using a suitable unit testing framework. These tests should not require the code be packaged or deployed
- **package**: take the compiled code and package it in its distributable format, such as a JAR.
- **integration-test**: process and deploy the package if necessary into an environment where integration tests can be run
- **verify**: run any checks to verify the package is valid and meets quality criteria
- **install**: install the package into the local repository, for use as a dependency in other projects locally
- **deploy**: done in an integration or release environment, copies the final package to the remote repository for sharing with other developers and projects.

There are two other Maven lifecycles of note beyond the default list above. They are

- **clean**: cleans up artifacts created by prior builds
- **site**: generates site documentation for this project

# Unit test (mvn test):
- surefire + reports

# Integration test (mvn verify):
- failsafe plugin (to be added) + reports
- uses *IT* pattern but can be configured

How to [write integration test for a webapp](https://www.baeldung.com/maven-integration-test), [gist](https://github.com/eugenp/tutorials/blob/master/maven-modules/maven-integration-test/src/integration-test/java/com/baeldung/maven/it/RestITCase.java)