---
title: Apache SSL Subversion
date: 2008-08-23
categories:
- KDBlog
tags:
- Linux
---
剛剛把 KD server 上的 apache 弄出 ssl 了

之前其實也有試著弄出 ssl

只不過之前在網路上找到的文章都只是針對非 vhost 的 apache

想說應該是一步一步慢慢解決

結果總是弄不好

---

今天想到說應該要找看看能不能一次解決的

結果在 Gentoo Wiki Apache_Modules_mod_ssl

這篇找到了基本的設定

另外有一個 HOWTO SSL Enabled, Name Based Virtual Hosts with Apache

這篇就是在解決我的問題

---

不過我照他的方式弄了之後

感覺 SSL 有起來

不過就是連不上

Apache Log 上有這樣的訊息

<quote>"\x80O\x01\x03" 200 1953</quote>

---

又搞了半天才發現是之前設定的東西忘了清掉

Apache 又呆呆的不告訴我一下...T_T

上面那個東西的原因就是 Apache 在 443 這個 ssl 的 protocol 輸出一般純文字

所有就連不起來了

---

之後又遇到

<quote>... public_html/.htaccess: Options not allowed here</quote>

又 Google 半天孤不出東西

最後才發現是 Gentoo 的 SSL_DEFAULT_VHOST 設定在搞鬼

把他弄掉之後就 OK 啦!!

---

總結一下 Apache SSL Subversion VirtualHost 的設定備忘

---

<quote header="/etc/make.conf">

USE="sni" # 這是要啟用 SSL with vhost 的 flag

</quote>

---

<quote header="/etc/conf.d/apache">

# 把該死的 DEFAULT_VHOST 跟 SSL_DEFAULT_VHOST 刪掉

APACHE2_OPTS="-D SSL -D DAV"

</quote>

---

建立 SSL 的驗證檔

<quote header="bash">

# 變成 root 好做事

$ sudo su

# 到 apache 的目錄去

$ cd /etc/apache2/ssl/

# 產生 rsa key: 想更安全一點就把 1024 調大吧

$ openssl genrsa -out server.key 1024

$ openssl rsa -in server.key -out server.pem

# 這裡下一步要填一些資料

$ openssl req -new -key server.pem -out server.csr

# 產生驗證檔

# 要是不加有效日期參數(-days 3650)的話, 預設是 30 天

$ openssl x509 -req -days 3650 -in server.csr -signkey server.pem -out server.crt

</quote>

---

Apache 的 vhost 設定檔檔名自己取吧

編號越小越早被 Apache 讀進去

<quote header="/etc/apache/vhost.d/10_tsaikd.conf">

Listen 80

Listen 443

NameVirtualHost *:80

NameVirtualHost *:443

ServerName 127.0.0.1 # 這個是讓 Apache 啟動變快的東西...

---

&lt;VirtualHost *:80&gt;

	ServerAdmin "tsaikd@gmail.com"

	ServerName "www.tsaikd.org"

	DocumentRoot "/var/www/www.tsaikd.org/htdocs"

	&lt;Directory "/var/www/www.tsaikd.org/htdocs"&gt;

		AllowOverride All

		Order allow,deny

		Allow from all

	&lt;/Directory&gt;

&lt;/VirtualHost *:80&gt;

---

&lt;VirtualHost *:443&gt;

	SSLEngine on

	SSLCertificateFile /etc/apache2/ssl/server.crt

	SSLCertificateKeyFile /etc/apache2/ssl/server.key

---

	ServerAdmin "tsaikd@gmail.com"

	ServerName "www.tsaikd.org"

	DocumentRoot "/var/www/www.tsaikd.org/htdocs"

	&lt;Directory "/var/www/www.tsaikd.org/htdocs"&gt;

		AllowOverride All

		Order allow,deny

		Allow from all

	&lt;/Directory&gt;

&lt;/VirtualHost *:80&gt;

</quote>

---

<quote header="/etc/apache/vhost.d/20_svn.conf">

LoadModule authz_svn_module modules/mod_authz_svn.so

&lt;VirtualHost *:80&gt;

	ServerAdmin "tsaikd@gmail.com"

	ServerName "svn.tsaikd.org"

	DocumentRoot "/var/www/svn.tsaikd.org/htdocs"

	&lt;Directory "/var/www/svn.tsaikd.org/htdocs"&gt;

		AllowOverride All

		Order allow,deny

		Allow from all

	&lt;/Directory&gt;

	# 我的 svn 是放在 "/home/svn"

	&lt;Directory "/home/svn"&gt;

		Options Indexes FollowSymLinks MultiViews

	&lt;/Directory&gt;

	&lt;Location /gentoo&gt;

		DAV svn

		Options Indexes FollowSymLinks MultiViews

		SVNParentPath /home/svn/gentoo

		SVNListParentPath on

		SetOutputFilter DEFLATE # 這個是設定用 gzip 方式輸出

		AuthType Basic

		AuthName "Subversion repository"

		AuthUserFile /etc/apache2/htpasswd

		&lt;LimitExcept GET PROPFIND OPTIONS REPORT&gt; # 要有帳密才能改 svn 的資料

			Require user tsaikd

		&lt;/LimitExcept&gt;

	&lt;/Location&gt;

&lt;/VirtualHost *:80&gt;

&lt;VirtualHost *:443&gt;

	SSLEngine on

	# 如果要用不同的驗證檔也可以

	SSLCertificateFile /etc/apache2/ssl/server.crt

	SSLCertificateKeyFile /etc/apache2/ssl/server.key

---

	ServerAdmin "tsaikd@gmail.com"

	ServerName "svn.tsaikd.org"

	DocumentRoot "/var/www/svn.tsaikd.org/htdocs"

	&lt;Directory "/var/www/svn.tsaikd.org/htdocs"&gt;

		AllowOverride All

		Order allow,deny

		Allow from all

	&lt;/Directory&gt;

	# 我的 svn 是放在 "/home/svn"

	&lt;Directory "/home/svn"&gt;

		Options Indexes FollowSymLinks MultiViews

	&lt;/Directory&gt;

	&lt;Location /gentoo&gt;

		DAV svn

		Options Indexes FollowSymLinks MultiViews

		SVNParentPath /home/svn/gentoo

		SVNListParentPath on

		SetOutputFilter DEFLATE # 這個是設定用 gzip 方式輸出

		AuthType Basic

		AuthName "Subversion repository"

		AuthUserFile /etc/apache2/htpasswd

		&lt;LimitExcept GET PROPFIND OPTIONS REPORT&gt; # 要有帳密才能改 svn 的資料

			Require user tsaikd

		&lt;/LimitExcept&gt;

	&lt;/Location&gt;

&lt;/VirtualHost *:443&gt;

</quote>

