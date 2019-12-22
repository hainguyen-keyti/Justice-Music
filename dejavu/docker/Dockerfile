FROM centos:7

# Install PIP
RUN yum -y install epel-release && yum clean all
RUN yum -y install python python-pip && yum clean all

# FFMPEG Repos
RUN rpm --import http://li.nux.ro/download/nux/RPM-GPG-KEY-nux.ro
RUN rpm -Uvh http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm

RUN yum -y install numpy scipy portaudio-devel gcc MySQL-python tkinter ffmpeg git

RUN pip install flask
RUN pip install pathlib
RUN pip install PyAudio
RUN pip install pydub
RUN python -m pip install -U pip setuptools
RUN python -m pip install matplotlib


WORKDIR /dejavu

CMD ["bash", "-l"]
