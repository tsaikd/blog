---
title: Apache2 mod_deflate
date: 2007-03-22
categories:
- KDBlog
tags:
- 主機
---
最近在寫 KDBlog 時用了 Firefox 的一個 extension -- Web Developer

裡面有個功能是 View Speed Report

我把我的 KDBlog 送過去檢查才知道我的 apache 其實沒有開啟壓縮的功能

---

一開始 google 的結果是要用 mod_gzip 這個 apache module

然後我用 emerge mod_gzip 的結果竟然要裝 apache-1.x

---

我覺得奇怪，再去問 google

原來 apache2 有另一個內建功能是 mod_deflate

功能也是即時壓縮

根據"啟用 Apache2 的 mod_deflate 來壓縮網頁提高傳輸效能"這篇文章

其實用內建的 mod_deflate 就好了

所以我也樂得不用多裝個 mod_gzip

馬上在 vhost 裡加上一些設定

<quote><![CDATA[

<ifmodule mod_deflate.c>

DeflateCompressionLevel 9

AddOutputFilterByType DEFLATE text/html text/plain text/xml application/x-httpd-php

AddOutputFilter DEFLATE js css

</ifmodule>

]]></quote>

---

重開 apache 之後

馬上把 KDBlog 送去 View Speed Report 看看結果

從原來的 16K -> 5K !!

真棒...^_^

