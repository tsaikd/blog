---
title: phpVirtualbox
date: 2014-02-08
description:
categories:
- Blog
tags:
- Virtualbox
- PHP
- Apache2
- Ubuntu
- ZFS
- Docker
---

過年期間買了新的 PC 內裝(CPU, 主機板, 記憶體)

最近終於決定 OS 的架構了

* Ubuntu 12.04 x64
* ZFS
* Virtualbox
* Docker

> ![]({{urls.media}}/2014/02-08-phpvirtualbox/01.png)

32G RAM 的 PC ....hehehe

> ![]({{urls.media}}/2014/02-08-phpvirtualbox/02.png)

Ubuntu 選 LTS 版, 必免頻繁 Upgrade 的問題

> ![]({{urls.media}}/2014/02-08-phpvirtualbox/03.png)

> ![]({{urls.media}}/2014/02-08-phpvirtualbox/04.png)

ZFS, 實驗性質, 看看大量使用會不會有什麼鬼問題, 不過 ZFS 在 Ubuntu 感覺還是有點雷, 用預設的 properties 會狂吃記憶體, 傳檔案竟然會吃到 2x G, 目前把所有的硬碟 cache 選項關掉, 把壓縮關掉, 看起來還正常一點...>_<

> ![]({{urls.media}}/2014/02-08-phpvirtualbox/05.png)

> ![]({{urls.media}}/2014/02-08-phpvirtualbox/06.png)

Docker, 去年年底才知道的好東西, linux base 的 vm 之後都可以轉到 docker 跑了, 不過之前用的 shipyard 管理界面在改版之後變得有點討厭, 限定要用 shipyard agent 才能管理 docker, 目前只好回到 console 去管理了, 看看有沒有時間弄個簡易的 web 管理界面好了...

> ![]({{urls.media}}/2014/02-08-phpvirtualbox/07.png)

> ![]({{urls.media}}/2014/02-08-phpvirtualbox/08.png)

> ![]({{urls.media}}/2014/02-08-phpvirtualbox/09.png)

> ![]({{urls.media}}/2014/02-08-phpvirtualbox/10.png)

> ![]({{urls.media}}/2014/02-08-phpvirtualbox/11.png)

> ![]({{urls.media}}/2014/02-08-phpvirtualbox/12.png)

> ![]({{urls.media}}/2014/02-08-phpvirtualbox/13.png)

> ![]({{urls.media}}/2014/02-08-phpvirtualbox/14.png)

> ![]({{urls.media}}/2014/02-08-phpvirtualbox/15.png)

> ![]({{urls.media}}/2014/02-08-phpvirtualbox/16.png)

> ![]({{urls.media}}/2014/02-08-phpvirtualbox/17.png)

Virtualbox, 本來想試用 KVM + openstack 的, 但是搞了半天還是搞不定, 只好回到 virtualbox 了, 重點是, 發現了一個叫 phpvirtualbox 的 project, 可以不用裝 GUI 來看 virtualbox 的設定界面了, 大推!!
