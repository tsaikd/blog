---
title: Ubuntu 10.04 x64 server 改網卡代號
date: 2010-12-30
tags:
- KDBlog
- Linux
---
有換過網卡的話

網卡的代號會一直往上加

ex: eth0 eth1 eth2 ... etc

把 /etc/udev/rules.d/70-persistent-net.rules 裡面的內容改掉就可以避免這種現象

也可以清空讓系統自己重建

