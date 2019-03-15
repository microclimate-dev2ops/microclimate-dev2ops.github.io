---
layout: docs
title: Building a Liberty project with offline Microclimate
description: Building a Liberty project with offline Microclimate
keywords: offline, liberty, project, build, building, nexus, websphere, github, yaml, file, chart, helm, install, installation, delete, repository, maven, tool, jar, image, download, downloads, microclimate, values.yaml, helm install, Maven, Nexus
duration: 1 minute
permalink: offlinemicroclimateliberty
type: document
order: 2
parent: offlinemicroclimateusing
---

# Building a Liberty project with offline Microclimate

## 1. Configure the Nexus repository
1. Access the Nexus repository from `http://httpname.proxy-ip.nip.io`.
2. Create blob storage to host proxied artifacts.
- Go to `Adminstration/Blob Stores`.
- Click **Create new Blob** and name the blob as proxied.
- Click **Create Blob** to complete the process.
3. Configure `maven-central` to use this blob storage.
- Go to `Adminstration/Repositories`.
- Click **create new repository**.
- Choose the **maven2(proxy)** recipe. The name of the repository is `maven-central`. The proxy remote storage is set to `https://repo1.maven.org/maven2`, and `proxied` is chosen as the blob storage.
4. After you create the `maven-central` repository, add it to the `maven-public` group.
- Go to the `maven-public` repo.
- From **Group**, select the `maven-central` repository.
- Add the `maven-central` repository to the list of members.

## 2. Set the Liberty hosted repository
1. To transfer all the artifacts that the Liberty project requires, use the Maven Repository Provisioner tool. Install the Maven Repository Provisioner from the [Maven website](http://repo1.maven.org/maven2/com/simpligility/maven/maven-repository-provisioner/).
  - **Note:** The Maven Repository Provisioner requires Java 8 or later.
2. Choose the latest `*-jar-with-dependencies.jar` file from the versions available.
3. To invoke the tool, use the following command:
```
java - jar  * -jar-with-dependencies.jar
     -a "group:artifact[:extension][:classifier]:v"
     -t “nexus repo location“
     -u user
     -p pswd
     -s "source-repo"
```
4. Push either a `.pom` file or a `.jar` file.
  - To push a `pom` file, use `java -jar maven-repository-provisioner-1.3.1-jar-with-dependencies.jar -a "com.thoughtworks.xstream:xstream-parent:pom:1.4.4" -t "http://containernew.9.42.75.22.nip.io/repository/maven-releases/" -u user -p pwd -s "https://repo.maven.apache.org/maven2/"`.
  - To push a `.jar` file, use `java -jar maven-repository-provisioner-1.3.1-jar-with-dependencies.jar -a "org.apache.maven.reporting:maven-reporting-api:jar:2.2.1" -t "http://containernew.9.42.75.22.nip.io/repository/maven-releases/" -u user -p pwd -s "https://repo.maven.apache.org/maven2/"`.

## 3. Build a new Maven image to use the Nexus repository for downloads
1. Create a new Dockerfile with the following commands:
```
FROM maven:3.6.0-jdk-8
RUN mkdir -p ~/.m2 &&  echo "<?xml version='1.0' encoding='UTF-8'?><settings><servers><server><id>nexus</id><username>name</username><password>password</password></server></servers><mirrors><mirror><id>nexus</id><mirrorOf>*</mirrorOf><url><nexus-container>/repository/maven-public/</url></mirror></mirrors></settings>" > ~/.m2/settings.xml
```
2. Build the Maven image with the following command:
**Note:** If you did not deploy the Microclimate chart into the `microclimate` namespace, then replace `microclimate` with the namespace of your Microclimate deployment.
```
docker build -t mycluster.icp:8500/microclimate/maven-offline:v1
```
3. Push the image to `mycluster.icp` with the following command:
```
docker push mycluster.icp:8500/microclimate/maven-offline:v1
```
4. Modify the [`microserviceBuilderPipeline.groovy`](https://github.com/microclimate-dev2ops/jenkins-library/blob/master/vars/microserviceBuilderPipeline.groovy) file in your private clone of the Microclimate Jenkins library to point to your new private Maven image instead of `maven:3.6.0-jdk-8-alpine`. The updated line resembles the following code:
```
def maven = (config.mavenImage == null) ? 'mycluster.icp:8500/microclimate/maven-offline:v1' : config.mavenImage
```

**Note:** If you want to build a new version of the Maven offline image, tag it with a new version, for example, `v2`. Then, push the image to `mycluster.icp` and update your private clone of the Microclimate Jenkins library.

## 4. Modify the Dockerfile and .pom file of the project

1. Change the Dockerfile.
 - Modify the image name to pull from the local Docker registry.
 - Add the `COPY /target/liberty/wlp /opt/ibm/wlp` line prior to the `USER root` line in the Dockerfile. See the following sample Dockerfile for the correct location of the line:
   ```
   FROM mycluster.icp:8500/default/liberty:latest
   LABEL maintainer="IBM Java Engineering at IBM Cloud"
   COPY /target/liberty/wlp /opt/ibm/wlp
   COPY /target/liberty/wlp/usr/servers/defaultServer /config/
   #COPY /target/liberty/wlp/usr/shared/resources /config/resources/
   COPY /src/main/liberty/config/jvmbx.options /config/jvm.options
   USER root
   RUN chmod g+w /config/apps
   USER 1001
   #RUN installUtility install --acceptLicense defaultServer
   ARG LICENSE_JAR_URL
   RUN \
   if [ $LICENSE_JAR_URL ]; then
   wget $LICENSE_JAR_URL -O /tmp/license.jar
   && java -jar /tmp/license.jar -acceptLicense /opt/ibm
   && rm /tmp/license.jar;
   fi
   ```
 - Remove the line `RUN installUtility install --acceptLicense defaultServer` from the Dockerfile.

2. Add the following code anywhere in the dependency management section of the `.pom` file:
   ```
   <dependencyManagement>
     <dependencies>
       <dependency>
         <groupId>io.openliberty.features</groupId>
         <artifactId>features-bom</artifactId>
         <version>18.0.0.2</version>
         <type>pom</type>
         <scope>import</scope>
       </dependency>
     </dependencies>
   </dependencyManagement>
   ```

3. Update the Liberty Maven plug-in version to 2.5 and add the following code to the configuration section of the Maven plug-in:
   ```
   <groupId>io.openliberty</groupId>
   <artifactId>openliberty-kernel</artifactId>
   <version>18.0.0.3</version>
   ```

## 5. Install Microclimate
1. Modify the `microservicebuilder` Groovy file and update the Maven image.
2. Modify the IBM Cloud Private chart to use this new Groovy file with an updated image.

## 6. Use Microclimate
You can now use Microclimate like a regular online installation.
