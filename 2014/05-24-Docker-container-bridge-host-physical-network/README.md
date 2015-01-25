---
title: Docker container bridge host physical network
date: 2014-05-24
tags:
- Docker
- Network
---

想把 docker 拿來當 vm 用的話，有一個問題就是目前 docker 要做 port forwarding 還是有點麻煩，
比較好的辦法應該是 container 有自己的獨立 IP ，這樣的話就可以不用管 port 的問題了。

https://github.com/jpetazzo/pipework

把上面這個 project clone 到 docker host，這個 project 的主要功能是在幫助設定 container 的網路，
詳細的內容請參考網頁。

http://noyaudolive.net/2012/05/09/lxc-and-macvlan-host-to-guest-connection/

另外會遇到 host ping 不到 container 的情況，建議用上面這個辦法解決。

# 實驗環境
* Gateway 192.168.1.1
* Netmask 255.255.255.0
* Docker host 192.168.1.10 eth0
* Docker container 192.168.1.50

# Docker host
```bash
vmid="$(docker run -i -t -d --net none ubuntu:14.04 /bin/bash)"
pipework eth0 -i eth0 "${vmid}" 192.168.1.50/24@192.168.1.1
```
* pipework 第一個 eth0 是指 host 的網卡代號
* pipework 第二個 eth0 是指 container 的網卡代號，因為 --net none 把網卡拿掉，
  所以 container 網卡代號從 eth0 開始
