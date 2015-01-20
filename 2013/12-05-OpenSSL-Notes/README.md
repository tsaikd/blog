---
title: OpenSSL Notes
date: 2013-12-05
description:
categories:
- Blog
tags:
- openssl
- CA
- Https
- Java
- keytool
---

# 無 CA 產生 SSL 憑證
```
openssl genrsa -out server.key 512
openssl req -new -x509 -days 3650 -key server.key -out server.crt
```

# 建立 CA
1. 修改 /etc/ssl/openssl.cnf

2. 建立目錄結構

	```
	md demoCA demoCA/newcerts demoCA/private
	touch demoCA/index.txt
	echo 01 > demoCA/serial
	```

3. 產生 CA 私鑰

	```
	openssl genrsa -out demoCA/private/cakey.pem 4096
	```

4. 自行簽發 CA 證書

	```
	openssl req -new -x509 -days 3650 -key demoCA/private/cakey.pem -out demoCA/cacert.pem
	```

# 用 CA 簽發 Server 證書
1. 在 Server 上
	1. 產生 Server 私鑰
	
		```
		openssl genrsa -out serverkey.pem 1024
		```

	2. 產生 Server 證書請求

		```
		openssl req -new -key serverkey.pem -out serverreq.pem
		```

2. 在 CA 上簽發證書

	```
	openssl ca -days 365 -in serverreq.pem -out servercert.pem
	```

# 轉換證書格式

```
openssl pkcs12 -export -in servercert.pem -inkey serverkey.pem -out servercert.p12
```

# 導入 java keystore

```
keytool -importkeystore -srckeystore servercert.p12 -srcstoretype PKCS12 -destkeystore .keystore
```

# 參考
* [基于 OpenSSL 的 CA 建立及证书签发](http://rhythm-zju.blog.163.com/blog/static/310042008015115718637/)
* [importing an existing x509 certificate and private key in Java keystore to use in ActiveMQ ssl context](http://stackoverflow.com/questions/906402/importing-an-existing-x509-certificate-and-private-key-in-java-keystore-to-use-i)
* [Java keytool 基本指令介紹](http://cooking-java.blogspot.tw/2010/01/java-keytool.html)
