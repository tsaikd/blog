---
title: 用 curl 抓檔案
date: 2007-07-03
categories:
- KDBlog
tags:
- Linux
---
一般抓檔案是用 wget

不過 wget 好像只能用 PROTOCOL_proxy 的方式使用 proxy

有時候要透過 socks V5 之類的 tunnel 來抓的話就不行了

只好改用 curl

---

紀錄一下好用的參數

	--socks host[:port]

		設定 socks proxy 的 ip 跟 port

---

	-C offset

		設定續傳的位置

		用 -C - 的話 curl 會自動偵測

		一般都會讓他自動偵測吧...Orz

---

	-o file

		指定輸出的檔案名稱

		因為 curl 預設是輸出到 stdout 上

		所以要指定一下

	-O

		自動抓檔名

		如果可以用 -O 的話....應該不會用 -o 吧...^_^

