#!/bin/sh
# Author: Mxysx <zsimline@163.com>

NODEPATH=/bin/node
SCRIPT=/opt/saffron/backend/service/api.mjs

test -x $NODEPATH || exit 0

. /lib/lsb/init-functions

saffron_start()
{
	start-stop-daemon --start --background --exec $NODEPATH -- --experimental-modules "$SCRIPT" || return 2
	return 0
}

saffron_stop()
{
	start-stop-daemon --stop --exec $NODEPATH -- --experimental-modules "$SCRIPT" || return 2
	return 0
}

case "$1" in
start)
	log_daemon_msg "Starting saffron" "saffron"
	saffron_start
	;;
stop)
	log_daemon_msg "Stopping saffron" "saffron"
	saffron_stop
	;;
status)
	status_of_proc "$NODEPATH" && exit 0
	;;
restart)
	log_daemon_msg "Restarting saffron" "saffron"
	saffron_stop
	saffron_start
	;;
*)
	echo "Usage: $0 {start|stop|status|restart}"
	exit 0
	;;
esac

