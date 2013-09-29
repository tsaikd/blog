---
title: 網路流量監控 -- ntop
date: 2007-05-13
categories:
- KDBlog
tags:
- Linux
---
在 Bandwidth Monitoring Tools For Linux 看到很多不同的監控軟體

之前雖然有在用 MRTG , 不過在重灌之後就沒有裝了

而已 MRTG 的設定還有點麻煩

所以就找個比較容易使用的東西來取代 MRTG

我選中的就是 "ntop"

---

由於目前最新版的 ntop-3.2-r3 還在 ~amd64

所以先把 keyword 設好

emerge 完了之後

要先設定管理密碼<quote>ntop --set-admin-password</quote>

然後再改一下 /etc/conf.d/ntop 就可以用了

<quote header="/etc/conf.d/ntop">

NTOP_OPTS="-u ntop -P /var/lib/ntop --interface eth0,eth1"

</quote>

---

ps:

預設的 http port 是 3000

/var/lib/ntop 的 owner 要是 ntop:ntop

