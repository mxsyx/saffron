#!/bin/sh
# Author: Mxysx <zsimline@163.com>

DAEMON=/bin/node
CONFIG=/opt/saffron/backend/service/api.mjs

. /lib/lsb/init-functions

dns2tcpd_start()
{
	start-stop-daemon --start --exec $DAEMON -- -f "$CONFIG" || return 2
	return 0
}

dns2tcpd_stop()
{
	start-stop-daemon --stop -u $USER --exec $DAEMON -- || return 2
	return 0
}

case "$1" in
start)
	log_daemon_msg "Starting dns2tcp" "dns2tcpd"
	dns2tcpd_start
	;;
stop)
	log_daemon_msg "Stopping dns2tcp" "dns2tcpd"
	dns2tcpd_stop
	;;

reload|force-reload|restart)
	log_daemon_msg "Restarting dns2tcp" "dns2tcpd"
	dns2tcpd_stop
	dns2tcpd_start
	;;
*)
	echo "Usage: $0 {start|stop|reload|restart}"
	exit 3
	;;
esac
