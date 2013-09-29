---
title: mdadm -- 指令備忘
date: 2007-07-25
categories:
- KDBlog
tags:
- Linux
---
<quote header="自動偵測所有磁碟陣列">

# mdadm -Es > /tmp/mdtmp

# mdadm -Asc /tmp/mdtmp

# rm -f /tmp/mdtmp

</quote>

<quote header="更改磁碟陣列編號 (ex: /dev/md6 -> /dev/md7)">

# mdadm -S /dev/md6

# mdadm -A -U super-minor -m 6 /dev/md7

</quote>

<quote header="清除磁碟陣列資料 (ex: /dev/hda7)">

# mdadm --zero-superblock /dev/hda7

</quote>

