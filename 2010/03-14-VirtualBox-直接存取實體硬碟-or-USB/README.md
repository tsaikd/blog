---
title: VirtualBox 直接存取實體硬碟 or USB
date: 2010-03-14
categories:
- KDBlog
tags:
- 資訊
---
&lt;a href="http://www.wkiyo.cn/article.asp?id=603"&gt;VirtualBox直接使用物理硬盤&lt;/a&gt;



每次用過之後都忘了....

直接寫進 Blog 算了...=.=

---

<quote header="linux">

# VBoxManage internalcommands createrawvmdk -filename ~/winxp.vmdk -rawdisk /dev/sda -partitions 1

</quote>

---

<quote header="windows">

VBoxManage internalcommands createrawvmdk -filename  D:\VMHD\disk_C.vmdk -rawdisk \\.\PhysicalDrive0 -partitions 5

</quote>

