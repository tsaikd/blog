---
title: phpVirtualbox config notes
date: 2014-02-08
description:
categories:
- Blog
tags:
- Virtualbox
- PHP
- Apache2
- Ubuntu
---

phpvirtualbox 要裝起來需要修改一些設定, 這邊稍微紀錄一下

## ubuntu virtualbox 安裝過程

* vi /etc/apt/sources.list.d/virtualbox.list

	```
deb http://download.virtualbox.org/virtualbox/debian precise contrib
```

* apt-get update && apt-get install virtualbox-4.3

* 下載 virtualbox extension pack, 這樣才能透過網頁來看 VM 的 console
	* https://www.virtualbox.org/wiki/Downloads

* vboxmanage extpack install Oracle_VM_VirtualBox_Extension_Pack-*.vbox-extpack

* vi /etc/default/virtualbox
	* 這是為了要開啟 vboxweb-service
	* vbox 改成要使用哪個系統 user 來開啟 virtualbox

	```
VBOXWEB_USER=vbox
VBOXWEB_HOST=0.0.0.0
```

* update-rc.d vboxweb-service defaults
	* 開機自動啟動

## phpvirtualbox 安裝過程

* 先裝好 apache2 + php5 的環境

* 下載跟 virtualbox 相容的版本
	* http://sourceforge.net/projects/phpvirtualbox/files/

* 解壓縮之後丟進 /var/www

* 設定 config.conf
	* username 要設定成啟動 virtualbox 的那個系統 user
	* password 要設定成上面那個 user 的登入密碼, 目前還不知道為啥要設定這個密碼, 所以為了保險起見, 不要用原本常用的帳號或是 root, 開一個新帳號叫 vbox 吧
	* location 要設定成 http://VIRTUALBOXIP:18083/
		* 那個 VIRTUALBOXIP 就是裝 virtualbox 的 host 的 IP

* service apache2 restart

## phpvirtualbox docker 包

我直接做了一個 docker 的 image , 懶得慢慢裝的直接弄這套 docker script 來跑吧...^_^

https://github.com/tsaikd/docker

記得還是要設定 config.sh 裡的參數

