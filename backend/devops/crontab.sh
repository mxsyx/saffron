# 间隔4小采集数据
30 1 * * * /bin/node --experimental-modules /opt/saffron/backend/collection/main.mjs 6
30 5 * * * /bin/node --experimental-modules /opt/saffron/backend/collection/main.mjs 5
30 9 * * * /bin/node --experimental-modules /opt/saffron/backend/collection/main.mjs 4
30 13 * * * /bin/node --experimental-modules /opt/saffron/backend/collection/main.mjs 3
30 17 * * * /bin/node --experimental-modules /opt/saffron/backend/collection/main.mjs 2
30 21 * * * /bin/node --experimental-modules /opt/saffron/backend/collection/main.mjs 1

# 重启Aria2c服务
0 1 * * * /usr/sbin/service aria2c start
0 23 * * * /usr/sbin/service aria2c stop

# 备份数据库
30 23 * * * /bin/bash /opt/saffron/backend/devops/backup.sh
