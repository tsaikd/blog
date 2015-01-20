---
title: sudoers
date: 2009-09-12
categories:
- KDBlog
tags:
- 主機
---
很久沒重裝 Linux 了

有些東西要是不記下來總是會一忘再忘...=.=

sudo 要弄成不需密碼的時候就是要

<quote header="/etc/sudoers">

tsaikd  ALL=NOPASSWD: ALL

</quote>

這個看一下文件裡的範例照抄就可以

但是有個重點在 Ubuntu 預設的文件範例中好像沒提到

就是這種 NOPASSWD 的設定一定要放在"最後面"

