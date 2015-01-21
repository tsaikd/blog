---
title: 主機復活了
date: 2007-07-25
categories:
- KDBlog
tags:
- 主機
---
[主機的硬碟掛掉了](../07-22-主機的硬碟掛掉了)

花了三天時間

終於把主機弄的差不多了

---

這次終於狠下心把所有的資料都放在安全的 RAID1 跟 RAID5 上面了 

RAID1 上主要是放 /boot 的東西

在三顆硬碟上都放一份...(好像有點太安全了...XD)

RAID5 上就是放其他的東西了

這次連 / 都掛在 LVM 上面了

還花了不少時間去找資料

---

根據 Gentoo Wiki 上的 HOWTO Install Gentoo on an LVM2 root partition

我是用 lvm2create_initrd 這隻 script 來完成的

不過原來的 script 在 AMD64 上有些問題

在那篇文章裡也有提到

所以我又做了一個 patch 去修正這個問題

還順便把啟動磁碟鎮列的部份改成自動偵測

過程中出了不少狀況...T_T

不過總算都解決了...^_^

---

* 指令範例

```
# ./lvm2create_initrd.sh -M gentoo -c /etc/lvm/lvm.conf -R /etc/mdadm.conf
```

---

MIRROR: lvm2create_initrd.sh (原始檔案)

MIRROR: lvm2create_initrd_kd.sh (patch 過後的檔案)

---

經過好友 JackieKu 的說明

在 patch 中又加上了 fsck 的部份

