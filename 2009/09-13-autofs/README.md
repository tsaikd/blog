---
title: autofs
date: 2009-09-13
tags:
- KDBlog
- 主機
---
用到的時候才會自動掛載磁碟

這個其實還真的很方便

不會拖到開機的速度

用起來也很無痛(不過設定的時候就很痛了...=.=)

趕快做筆記

---

PS: 其實之前在公司就研究了很久了

所以現在在家裡搞就快多了...XD

---

## 安裝套件

```
apt-get install autofs
```

### 要掛載 samba 的話就要裝 smbfs

```
apt-get install smbfs
```

## 設定

* /etc/auto.master

```
/autofs /etc/auto.mnt --timeout=60
```

* /etc/auto.mnt
	* 掛載 samba
	* /root/pw/smb 是掛載時要用到的 username & password

```
my_smb_share	-fstype=cifs,credentials=/root/pw/smb,uid=tsaikd,gid=tsaikd,file_mode=0600,dir_mode=0700	://192.168.1.1/my_smb_share
```

> * 如果要掛的是隱藏的分享記得要加跳脫字元 '\'

```
my_smb_hidden	-fstype=cifs,credentials=/root/pw/smb,uid=tsaikd,gid=tsaikd,file_mode=0600,dir_mode=0700	://192.168.1.1/my_smb_hidden\$
```

## 掛載 LVM

因為我很懶...甘脆一次把 LVM 裡的目錄全部放進去...haha

```
* -fstype=reiserfs,notail,noatime :/dev/vg/&
```

之後要用的話就設一堆 symlink 吧

* 顯示目錄的內容

```
cd ~/
ln -s /autofs/my_smb_share
ls -l my_smb_share
```
