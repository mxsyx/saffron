#!/bin/sh
# Author: Mxysx <zsimline@163.com>

DAEMON=/usr/bin/aria2c
CONFIGFILE=/etc/aria2c.conf

test -x $DAEMON || exit 0

. /lib/lsb/init-functions

aria2c_start()
{
	start-stop-daemon --start --background --exec $DAEMON -- --conf-path="$CONFIGFILE" || return 2
	return 0
}

aria2c_stop()
{
	start-stop-daemon --stop --exec $DAEMON -- --conf-path="$CONFIGFILE" || return 2
	return 0
}

case "$1" in
start)
	log_daemon_msg "Starting aria2c" "aria2c"
	aria2c_start
	;;
stop)
	log_daemon_msg "Stopping aria2c" "aria2c"
	aria2c_stop
	;;
status)
	status_of_proc "$DAEMON" && exit 0
	;;
restart)
	log_daemon_msg "Restarting aria2c" "aria2c"
	aria2c_stop
	aria2c_start
	;;
*)
	echo "Usage: $0 {start|stop|status|restart}"
	exit 0
	;;
esac
