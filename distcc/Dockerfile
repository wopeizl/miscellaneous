FROM ubuntu:16.04

# Add custom china source
ADD sources.list /etc/apt/

RUN apt update
RUN apt install -y distcc ccache gcc g++ make cmake git python python-pip python-dev wget unzip unrar tar bzip2 gzip  patchelf
RUN apt install -y net-tools 
RUN pip install --upgrade pip
RUN pip install numpy wheel protobuf
RUN apt install -y telnet avahi-daemon avahi-utils sed
ENV DISTCC_VERBOSE=1
ENV DISTCCD_OPTS="--port 3632 --log-level notice --log-file /var/log/distccd.log -N 15 --allow 0.0.0.0:0"
ENV PATH="/usr/lib/ccache:/usr/lib/distcc:${PATH}"

# Update symlinks
RUN /usr/sbin/update-ccache-symlinks
# Prepend ccache into the PATH
RUN echo 'export PATH="/usr/lib/ccache:$PATH"' | tee -a ~/.bashrc
RUN mkdir -p /root/.distcc && echo 192.168.65.3:3632 >> /root/.distcc/hosts

RUN sed -ri 's/STARTDISTCC="false"/STARTDISTCC="true"/g' /etc/default/distcc
RUN sed -ri 's/LISTENER="127.0.0.1"/LISTENER="0.0.0.0"/g' /etc/default/distcc
RUN sed -ri 's?ALLOWEDNETS="127.0.0.1"?ALLOWEDNETS="0.0.0.0/0"?g' /etc/default/distcc

RUN touch /opt/startup.sh 
RUN echo '#!/bin/bash' | tee -a /opt/startup.sh
RUN echo 'sh /etc/init.d/distcc start' | tee -a /opt/startup.sh
RUN echo '/bin/bash' | tee -a /opt/startup.sh
RUN chmod a+x /opt/startup.sh
ENTRYPOINT ["/opt/startup.sh"]

EXPOSE 3632
EXPOSE 3633
EXPOSE 3634

WORKDIR /data/me/build
