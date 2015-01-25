---
title: PHP ssmtp gmail
date: 2007-05-12
tags:
- KDBlog
- 主機
---
設定 ssmtp 可以使用 gmail

* /etc/ssmtp/ssmtp.conf

```
root=帳號@gmail.com
mailhub=smtp.gmail.com:587
rewriteDomain=
hostname=帳號@gmail.com
FromLineOverride=YES
UseSTARTTLS=YES
AuthUser=帳號
AuthPass=密碼
```

有設定 aliases 的話就可以用 console 下的 mail 指令來寄信了

* /etc/ssmtp/revaliases (optional)

```
root:帳號@gmail.com:smtp.gmail.com:587
主機帳號:帳號@gmail.com:smtp.gmail.com:587
```

* /etc/php/apache2-php5/php.ini

```
sendmail_path = /usr/sbin/ssmtp -t
```

重新啟動 apache 後就可以用 php 的 mail() 來寄信了

