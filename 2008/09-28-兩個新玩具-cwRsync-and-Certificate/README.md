---
title: 兩個新玩具 - cwRsync and Certificate
date: 2008-09-28
tags:
- KDBlog
- 資安
---
這兩天搞了兩個新玩具....

第一個是 windows 上的 rsync -- cwRsync

第二個是 Certification (數位憑證)

---

cwRsync 很像是用 cygwin 去弄出來的

會弄到這個東西是因為我在審美女圖的時候

都要先從我的 server 上把圖抓到本機

挑好之後再傳回到 server

本來我在家裡的時候

server 就用 100M ethernet 連到電腦

所以就直接用網芳(samba)的方式去抓圖

不過現在到外面工作了

網路真的是....(好你個 hinet 3.5G)

之前的做法是用 filezilla sftp 連回主機抓檔案

不過 filezilla 不能把抓到的檔案從遠端自動砍掉

(像是移動檔案的方式)

後來突然想到好像可以用 rsync 這個東西很像可以支援

就去找到了 cwRsync

花了一個多小時左右把環境弄好了

包括設定讓 ssh 不用密碼之類的

---

不過在測試的時候發現了一個奇怪的現象

就是在上傳的時候(下面的數字只是代表傳送檔案的先後次序)

client 那邊已經顯示到 sending 010.jpg

server 那邊用 ls 去看卻只有傳了 002.jpg

也就是說上傳時檔案顯示不同步??

按 Ctrl+C 取消之後

server 那邊還是沒動靜

再重傳一次 client 還是說要從 003.jpg 開始傳

不過還好在全部傳完之後

檔案沒有被吃掉

不過這個現象令我不解

又花了幾個小時去找資料卻沒什麼發現

試了一堆 option 也沒用

最後只好不理他了

---

再來是數位憑證的部份

最近老闆要我去 study 一下相關的東西

準備有個小專案要做

因為之前在弄 apache + SSL 的時候都沒有仔細去了解

所以就趁這個機會好好的研究一下

之前大學時修密碼學就大概知道對稱加密跟不對稱加密的一些東西

數位憑證就是用不對稱加密去搞一堆有的沒的

我在想應該可以把個人憑證當然進去網站的鑰匙

這樣就可以省下打密碼的動作了(我是個懶人...haha)

在看了一堆文章之後

慢慢理出一點頭緒

要達成我的目標(不是老闆要我弄的方向...XD)

要弄出一個 CA 來幫自己做 Certification

Server 上也要用那個 CA 來幫 Server 做 Certification

(之前的 gentoo apache server 應該是自己 sign 自己產生 Certification)

---

建立一個新的 CA

# cd /etc/ssl/

# openssl genrsa -out ca.key 2048

# chmod 400 ca.key

# vi openssl.cnf

	[ usr_cert ]

		nsCaRevocationUrl = http://www.tsaikd.org/ca.crl

# ./misc/CA.sh -newca

	Enter: ca.key

# openssl req -new -x509 -nodes -key ca.key -out ca.crt

# cd demoCA/

# ln -sf ../ca.crt cacert.pem

# cd private/

# ln -sf ../../ca.key cakey.pem

# cd ../..

# echo "00" > demoCA/crlnumber

# openssl ca -gencrl -out capem.crl -crldays 7 -crlexts crl_ext

# openssl crl -in capem.crl -outform DER -out cader.crl

---

最後兩行是產生一個 CRL(Certificate Revocation List)

---

再來就是幫自己跟 server 建立 Certification 了

---

設一下變數方便下面使用

# export NAME=kdnbxp

---

產生 RSA key

# openssl genrsa -out $NAME.key 1024

# chmod 400 $NAME.key

---

產生 CSR (Certificate Signing Request)

# openssl req -new -nodes -key $NAME.key -out $NAME.csr

-nodes 就是不用密碼保護

要是設密碼的話

每次加解密都要輸入一次

超麻煩

---

輸入的資訊有兩個要注意的

*Organization Name: 要跟 CA 的相同才能通過認證

*Common Name: 如果是幫 apache 認證的話, 這個要設成 domain, 不能亂設

---

用 CA 進行認證

# openssl ca -in $NAME.csr -out $NAME.crt

---

如果是幫 apache 認證的話

做到這邊就完成了 openssl 的部份

之後就是到 apache 設定檔做事了

---

把認證結果跟 key 轉成 pkcs12 的格式方便攜帶

# openssl pkcs12 -export -in $NAME.crt -inkey $NAME.key -out $NAME.p12

# chmod 400 $NAME.p12

---

要註銷某個 Certificate 的話

openssl ca -revoke $NAME.crt

openssl ca -gencrl -out capem.crl -crldays 7 -crlexts crl_ext

openssl crl -in capem.crl -outform DER -out cader.crl

---

其實我上面那些東西網路上一狗票的文章

真正讓我花大量的時間的是在弄瀏覽器的部份

回到我的目標: 就是用數位憑證來取代輸入密碼

在看了一堆文章之後

找到了幾個關鍵點

在 apache 的設定部份

VirtualHost

	SSLEngine on

	SSLCertificateFile /etc/apache2/ssl/server.crt

	SSLCertificateKeyFile /etc/apache2/ssl/server.key

	SSLCACertificateFile /etc/ssl/ca.crt

	SSLCARevocationFile /etc/ssl/capem.crl

	SSLVerifyClient none

---

.htaccess 的設定

SSLVerifyClient require

SSLOptions +FakeBasicAuth +StrictRequire

SSLRequireSSL

SSLRequire %{SSL_CLIENT_S_DN_CN} eq "tsaikd-nb-xp"

# 上面那行是設定只有 tsaikd-nb-xp 這個人才能通行

---

這樣似乎就能達到我的要求

不過理想的狀況應該是如果沒有憑證的話可以用輸入密碼的方式瀏覽網頁

有憑證的話就不用輸入密碼

這樣才方便啊

不過搞了好幾個小時都沒有進展

最後只好放棄了

---

另外還有一個地方讓我花了很多時間

最後也是沒有結果的

就是 CRL 的部份

一開始是輸出成 PEM 格式的 CRL

但是 Firefox 不吃

只好換成 DER 格式的給它吃

但是匯入了 CRL 之後

Firefox 就不能用那個數位憑證了

(不管有沒有被註銷)

---

IE 的情況是不管有沒有 CRL

數位憑證都可以用

就是說 CRL 是個廢柴...=.=

兩大瀏覽器都搞不定

不知道是支援度不夠還是我的 CRL 產生的方式有問題

