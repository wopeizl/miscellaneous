docker ps -a|grep -v grep|grep -v COMMAND|awk '{print $1}'|xargs docker stop
docker ps -a|grep -v grep|grep -v COMMAND|awk '{print $1}'|xargs docker rm

