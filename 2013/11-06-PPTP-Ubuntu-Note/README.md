---
title: PPTP Ubuntu Note
date: 2013-11-06
tags:
- Ubuntu
- pptp
---

## 總結
```bash
apt-get install pptpd -y
echo "localip 192.168.99.1" >> /etc/pptpd.conf
echo "remoteip 192.168.99.100-150" >> /etc/pptpd.conf
echo "ms-dns 8.8.8.8" >> /etc/ppp/pptpd-options
echo "ms-dns 8.8.4.4" >> /etc/ppp/pptpd-options
echo "USERNAME * PASSWORD *" >> /etc/ppp/chap-secrets
service pptpd restart
echo "net.ipv4.ip_forward=1" >> /etc/sysctl.conf
sysctl -p
iptables -t nat -I POSTROUTING -o eth0 -s 192.168.99.0/24 -j MASQUERADE
iptables -A FORWARD -s 192.168.99.0/24 -p tcp -m tcp --tcp-flags SYN,RST SYN -j TCPMSS --set-mss 1316
```

## 安裝套件
```bash
apt-get install pptpd -y
```

## 設定 IP 區段

* /etc/pptpd.conf

```
localip 192.168.99.1
remoteip 192.168.99.100-150
```

## 設定 DNS

* /etc/ppp/pptpd-options

```
ms-dns 8.8.8.8
ms-dns 8.8.4.4
```

## 設定帳號

* /etc/ppp/chap-secrets

```
USERNAME * PASSWORD *
```

## 重跑 Service

```bash
service pptpd restart
```

## 設定 IP forwarding

* /etc/sysctl.conf

```
net.ipv4.ip_forward=1
```

* bash

```
sysctl -p
```

## 設定防火牆

* MTU 設成 1316 如果還不通, 繼續往下調吧, 一開始連線有問題可以先把 MTU 設成 1200

```bash
iptables -t nat -I POSTROUTING -o eth0 -s 192.168.99.0/24 -j MASQUERADE
iptables -A FORWARD -s 192.168.99.0/24 -p tcp -m tcp --tcp-flags SYN,RST SYN -j TCPMSS --set-mss 1316
```

## 參考
* http://jesin.tk/setup-pptp-vpn-server-debian-ubuntu/
* http://disp.cc/b/11-GJv
