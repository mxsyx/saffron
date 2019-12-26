#!/bin/bash

today=`date +%Y%m%d`

mysqldump -h127.0.0.1 -uroot -p201920 saffron > /opt/backup/database/saffron.$today.sql
