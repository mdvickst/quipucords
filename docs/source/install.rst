Installing Quipucords
=====================
Quipucords is delivered in two parts, a command line tool as an RPM package and a server as a container image. The following instructions describe how to install the parts of Quipucords.

Installing the Quipucords Command Line Tool
-------------------------------------------
qpc, the command line tool that is installed by RPM, is available for `download <https://copr.fedorainfracloud.org/coprs/chambridge/qpc/>`_ from the Fedora COPR build and repository system.

1. Enable the EPEL repo for the server. You can find the appropriate architecture and version on the `EPEL wiki <https://fedoraproject.org/wiki/EPEL>`_.

  - For Red Hat Enterprise Linux 7, enter the following command::

      # rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm

  - For Red Hat Enterprise Linux 6, enter the following command::

      # rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-6.noarch.rpm

2. Download the appropriate RPM for qpc. 


  - For Red Hat Enterprise Linux 7, enter the following command::

      # wget https://copr-be.cloud.fedoraproject.org/results/chambridge/qpc/epel-7-x86_64/00726243-qpc/qpc-0.0.1-1.git.490.809bffc.el7.centos.noarch.rpm 

  - For Red Hat Enterprise Linux 6, enter the following command::

      # wget https://copr-be.cloud.fedoraproject.org/results/chambridge/qpc/epel-6-x86_64/00726243-qpc/qpc-0.0.1-1.git.490.809bffc.el6.noarch.rpm

3. Install the qpc beta package:

  - For Red Hat Enterprise Linux 7, enter the following command::

      # yum -y install qpc-0.0.1-1.git.490.809bffc.el7.centos.noarch.rpm 

  - For Red Hat Enterprise Linux 6, enter the following command::

      # yum -y install qpc-0.0.1-1.git.490.809bffc.el6.noarch.rpm

Installing the Quipucords Server Requirement and Container Image
----------------------------------------------------------------
The Quipucords server is delivered as a container image that runs on your server. First you must install and start the necessary prerequisite, Docker, to run the container. Then you can obtain and install the Quipucords server container image.

Installing the Docker Prerequisite
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The instructions for installing Docker vary according to your system configuration.

Installing Docker on Red Hat Enterprise Linux 7
"""""""""""""""""""""""""""""""""""""""""""""""

Installing from a package
~~~~~~~~~~~~~~~~~~~~~~~~~
1. Go to https://download.docker.com/linux/centos/7/x86_64/stable/Packages/. For the Docker version that you want to install, download the RPM package to the intended installation system.

2. Make sure that you are logged in as a user with ``sudo`` or ``root`` privileges.

3. Download the latest Docker package from the link in step 1::
 
    # wget https://download.docker.com/linux/centos/7/x86_64/stable/Packages/docker-ce-17.03.0.ce-1.el7.centos.x86_64.rpm

3. Install Docker, changing the path in the following example to the path where you downloaded the Docker package::

    # sudo yum install -y --setopt=obsoletes=0  docker-ce-17.03.0.ce-1.el7.centos.x86_64.rpm docker-ce-selinux-17.03.2.ce-1.el7.centos.noarch

Starting Docker on Red Hat Enterprise Linux 7
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
After you install Docker, you must start it and verify that it is running.

1. Start Docker::

    # sudo systemctl start docker

2. Verify that Docker is installed correctly. To do this step, run the hello-world image::

    # sudo docker run hello-world

After you complete the steps to install Docker for Red Hat Enterprise Linux 7 or later, continue with the Quipucords server installation steps in `Installing the Quipucords Server Container Image`_.

Installing Docker on Red Hat Enterprise Linux 6.6 or later
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
To install Docker on Red Hat Enterprise Linux 6.6 or later, you must have kernel 2.6.32-431 or later installed.

To check the current kernel release, open a terminal session and use the ``uname`` command to display the kernel release information, as shown in the following example::

    # uname -r

The output of this command is similar to the following example::

  2.6.32-573.el6.x86_64

**TIP:** After you confirm that you have at least the minimum required kernel release, it is recommended that you fully update your system. Having a fully patched system can help you avoid kernel bugs that have already been fixed on the latest kernel packages.

When your system meets the minimum required kernel release, you can use the following steps to install Docker:

1. Make sure that you are logged in as a user with ``sudo`` or ``root`` privileges.

2. Download the Docker RPM package to the current directory::

    # curl -k -O -sSL https://yum.dockerproject.org/repo/main/centos/6/Packages/docker-engine-1.7.1-1.el6.x86_64.rpm

3. Install the Docker package with yum::

    # sudo yum localinstall --nogpgcheck docker-engine-1.7.1-1.el6.x86_64.rpm

Starting Docker on Red Hat Enterprise Linux 6.6 or later
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
After you install Docker, you must start it and verify that it is running.

1. Start the Docker daemon::

    # sudo service docker start

2. Verify that Docker is installed correctly. To do this step, run the hello-world image::

    # sudo docker run hello-world

This command displays output similar to the following truncated example. The first section of the output contains a message about the installation status::

    Unable to find image 'hello-world:latest' locally
    latest: Pulling from hello-world
    a8219747be10: Pull complete
    91c95931e552: Already exists
    hello-world:latest: The image you are pulling has been verified. Important: image verification is a tech preview feature and should not be relied on to provide security.
    Digest: sha256:aa03e5d0d5553b4c3473e89c8619cf79df368babd18681cf5daeb82aab55838d
    Status: Downloaded newer image for hello-world:latest
    Hello from Docker.
    This message shows that your installation appears to be working correctly.

    ...


3. To ensure that Docker starts when you start your system, enter the following command::

    # sudo chkconfig docker on

After you complete the steps to install Docker for Red Hat Enterprise Linux 6.6 or later, you can continue with the steps to obtain the Quipucords server container image.

Installing the Quipucords Server Container Image
------------------------------------------------
After Docker is installed, you can obtain and install the container image that enables the use of the Quipucords server.

1. Download the server container image by entering the following command::

    #  wget https://github.com/mdvickst/quipucords/archive/master.zip


2. Unzip the download with the following command::

    #  unzip master.zip 

3. Change the working dirctory to the quipucord-master directory ::

    #  cd quipucords-master/

4. Build the quipucords server container ::

    #  sudo docker -D build . -t quipucords:latest

5. Verify the image within the local Docker registry by entering the following command::

    #  sudo docker images

The output appears similar to the following example::

  REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
  quipucords              latest               a4c93a143080        3 days ago          969MB
 

`Continue <https://github.com/mdvickst/quipucords/blob/master/docs/source/getting_started.rst>`_

