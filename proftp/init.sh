#!/bin/sh

CURPATH=`cd $(dirname $0);pwd`

authmsg=$(id)

#uid=506(quanjing)
suid=$(echo $authmsg|awk -F' ' '{print $1}')
#gid=505(map)
sgid=$(echo $authmsg|awk -F' ' '{print $2}')

uid=$(echo $suid | awk -F'=' '{print $2}' | awk -F'(' '{print $1}')
gid=$(echo $sgid | awk -F'=' '{print $2}' | awk -F'(' '{print $1}')

uname=$(echo $suid | awk -F'(' '{print $2}' | awk -F')' '{print $1}')
gname=$(echo $sgid | awk -F'(' '{print $2}' | awk -F')' '{print $1}')


echo "uid $uid uname $uname gid $gid gname $gname";

proconf="$CURPATH/etc/proftpd.conf"

## 替换配置文件
function editconf()
{
	opt="$1"
	#sed -i "s/^.$opt[[:space:]]*.*/$opt     $2/" $proconf 
	sed -i "s#^\s*[#]*\s*$opt\s.*#$opt      $2#" $proconf
	#echo "sed -i \"s/^\s*[#]*\s*$opt\s*.*/$opt $2/\" $proconf"
}

editconf "User"   "$uname"
editconf "Group"  "$gname"

editconf "DefaultRoot"  "$HOME"

editconf "AuthUserFile"        "$CURPATH/var/ftpd.passwd"
editconf "AuthGroupFile"       "$CURPATH/var/ftpd.group"
editconf "UserAlias"           "anonymous ftp $uname"

# 处理UID
bin/ftpasswd --home $HOME --name $uname --group $gname --shell /bin/bash --file $CURPATH/var/ftpd.group --uid $uid --gid $gid
bin/ftpasswd --home $HOME --name $uname --passwd $uname --shell /bin/bash --file $CURPATH/var/ftpd.passwd --uid $uid --gid $gid
