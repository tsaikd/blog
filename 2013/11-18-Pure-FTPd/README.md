---
title: Pure-FTPd Notes
date: 2013-11-18
description:
categories:
- Blog
tags:
- Ubuntu 12.04
- Pure-FTPd
---

# 安裝
```
apt-get install pure-ftpd
```

# 開帳號
```
pure-pw useradd FTP_USER -u UBUNTU_USER -d /home/UBUNTU_USER -m
```

# 設定 /etc/pure-ftpd/conf
```
cd /etc/pure-ftpd/conf
echo yes > ChrootEveryone
echo yes > DontResolve
echo 1 > TLS
```

# 產生 TLS key
```
openssl req -x509 -nodes -newkey rsa:1024 -days 3650 -keyout /etc/ssl/private/pure-ftpd.pem -out /etc/ssl/private/pure-ftpd.pem
chmod 600 /etc/ssl/private/pure-ftpd.pem
```

# 重開 service
```
service pure-ftpd restart
```

# 參考
* https://vistb.net/2012/05/build-ftp-server-using-pureftp-in-ubuntu/
* http://forum.ubuntu.org.cn/viewtopic.php?f=54&t=387751
