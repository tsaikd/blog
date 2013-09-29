---
title: 我的 samba 見鬼了
date: 2007-06-26
categories:
- KDBlog
tags:
- Linux
---
因為用 gentoo 的關係

所有的更新都從 portage 上弄的

我的小 NB 不想再存一次 portage 的資料

所以用 samba 做遠端存取

之前就有點怪怪的

在 NB 上會多出一些本來沒有的檔案

可是在 server 上又看不到

不過一開始還沒啥影響

今天我在更新 kdbashlib 的時候

剛好也要更新 NB 上的 portage 版本

然後就發現一個神奇的現象

---

server 上的 samba 分享設定

<quote>

[portage]

	path = /usr/portage

	...

	...

</quote>

NB 上用 cifs 去 mount //server/portage -> /usr/portage

<quote>

$ ls /usr/portage

app-accessibility/  dev-python/        media-libs/       sci-misc/

app-admin/          dev-ruby/          media-plugins/    sci-physics/

app-antivirus/      dev-scheme/        media-radio/      sci-visualization/

app-arch/           dev-tcltk/         media-sound/      scripts/

...

...

</quote>

<quote>

$ ls /usr/portage/sys-apps/portage/

app-accessibility/  dev-python/        media-libs/       sci-misc/

app-admin/          dev-ruby/          media-plugins/    sci-physics/

app-antivirus/      dev-scheme/        media-radio/      sci-visualization/

app-arch/           dev-tcltk/         media-sound/      scripts/

...

...

</quote>

<quote>

$ ls /usr/portage/sys-apps/portage/sys-apps/portage

ChangeLog     portage-2.0.51.22-r3.ebuild  portage-2.1.2.9.ebuild

files/        portage-2.1.1-r2.ebuild      portage-2.1.3_rc4.ebuild

Manifest      portage-2.1.2.2.ebuild       portage-2.1.3_rc5.ebuild

metadata.xml  portage-2.1.2.7.ebuild

</quote>

---

怎麼會有 "/usr/portage/sys-apps/portage/sys-apps/portage" 這種東西啊...@_@

然後我把 server 上的分享名稱改掉

<quote>

[port]

	path = /usr/portage

	...

	...

</quote>

NB 上用 cifs 去 mount //server/port -> /usr/portage

一切都正常了....

這是 bug 乎??

---

--

<quote>

 $ eix -e samba

[I] net-fs/samba

     Available versions:  3.0.24 3.0.24-r3

     Installed versions:  3.0.24-r3(06:23:40 PM 06/02/2007)(acl -async -automount -caps -cups -doc -examples -fam -kerberos kernel_linux -ldap -linguas_ja -linguas_pl -oav pam python -quotas readline -selinux -swat -syslog -winbind)

     Homepage:            http://www.samba.org/ http://www.openantivirus.org/projects.php

     Description:         SAMBA is a suite of SMB and CIFS client/server programs for UNIX

</quote>

