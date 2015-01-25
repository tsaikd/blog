---
title: Consul 採到雷
date: 2014-09-14
tags:
- Docker
- Consul
- LMDB
- ZFS
- Ubuntu
---

[consul]: http://www.consul.io/
[LMDB]: http://symas.com/mdb/
[ZFS]: http://zfsonlinux.org/

今天試用 [consul][] ，
看網路上的文件好像還蠻好裝的，
沒想到還是遇到神奇的雷，
目前懷疑是跟 [ZFS][] 有關。

## 環境
```
$ uname -rsvmo
Linux 3.13.0-35-generic #62-Ubuntu SMP Fri Aug 15 01:58:42 UTC 2014 x86_64 GNU/Linux
$ docker -v
Docker version 1.2.0, build fa7b24f
```

[consul][] 版本是 v0.4.0

## 現象
```
$ docker run progrium/consul -server -bootstrap
==> WARNING: Bootstrap mode enabled! Do not enable unless necessary
==> WARNING: It is highly recommended to set GOMAXPROCS higher than 1
==> Starting Consul agent...
==> Error starting agent: Failed to start Consul server: Failed to start Raft: index id error: Function not implemented
```

啟動 [consul][] 就爆炸了....>_<

google 不到什麼有用的資料，
只好自己 trace code 了...Orz

追了大半天，
發現問題出在 [consul][] call [LMDB][] (Lightning Memory-Mapped Database) 的時候會死掉。
目前懷疑跟 [ZFS][] 不支援 AIO 有關，
因為 MySQL 跑在 [ZFS][] 上也有[災情](https://answers.launchpad.net/ubuntu/+question/249586)。

## 解法
```
$ docker run -v /tmp progrium/consul -server -bootstrap
==> WARNING: Bootstrap mode enabled! Do not enable unless necessary
==> WARNING: It is highly recommended to set GOMAXPROCS higher than 1
==> Starting Consul agent...
==> Starting Consul agent RPC...
==> Consul agent running!
         Node name: '300bcce55b48'
        Datacenter: 'dc1'
            Server: true (bootstrap: true)
       Client Addr: 0.0.0.0 (HTTP: 8500, DNS: 53, RPC: 8400)
      Cluster Addr: 172.17.0.82 (LAN: 8301, WAN: 8302)
    Gossip encrypt: false, RPC-TLS: false, TLS-Incoming: false
```

* 為什麼要掛 /tmp ？

這應該是 [consul][] 的問題了，
他在啟動的時候會跑去 /tmp 建 [LMDB][] ，
即使你有設定 -data-dir 也一樣。
(雷~~~~)
