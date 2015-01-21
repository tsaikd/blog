---
title: Qos 測試結果
date: 2007-07-10
categories:
- KDBlog
tags:
- Linux
---
剛剛在機器上測試了一下 Qos 的效果

* 環境

```
$ uname -rmsp
Linux 2.6.20-gentoo-r8 x86_64 AMD Athlon(tm) 64 X2 Dual Core Processor 3800+
```

* 測試軟體
	* rtorrent
	* amuled

* 測試方式一

```
# tc class show dev ppp0
class htb 10:10 parent 10:1 prio 0 rate 8000bit ceil 256000bit burst 1610b cburst 1920b
class htb 10:1 root rate 256000bit ceil 256000bit burst 1920b cburst 1920b

...(略)

class htb 10:60 parent 10:1 prio 0 rate 8bit ceil 256000bit burst 1600b cburst 1920b
class htb 10:70 parent 10:1 prio 7 rate 8bit ceil 256000bit burst 1600b cburst 1920b

...(略)

---

# iptables -t mangle -vnL POSTROUTING

...(略)

    0     0 MARK       tcp  --  *      *       0.0.0.0/0            0.0.0.0/0           tcp spt:4662 MARK set 0x3c
    0     0 MARK       udp  --  *      *       0.0.0.0/0            0.0.0.0/0           udp spt:4665 MARK set 0x3c
    0     0 MARK       udp  --  *      *       0.0.0.0/0            0.0.0.0/0           udp spt:4672 MARK set 0x3c
    0     0 MARK       tcp  --  *      *       0.0.0.0/0            0.0.0.0/0           tcp spt:6890 MARK set 0x46

...(略)

```

把 amule 的 priority 設為 0

把 rtorrent 的 priority 設為 7

* 結果一

amule 的速度經過一段時間後在 15 KBytes/s 左右穩定下來

rtorrent 的速度經過一段時間後在 10 KBytes/s 左右穩定下來


---

* 測試方式二

```
# tc class show dev ppp0
class htb 10:10 parent 10:1 prio 0 rate 8000bit ceil 256000bit burst 1610b cburst 1920b
class htb 10:1 root rate 256000bit ceil 256000bit burst 1920b cburst 1920b

...(略)

class htb 10:60 parent 10:1 prio 7 rate 8bit ceil 256000bit burst 1600b cburst 1920b
class htb 10:70 parent 10:1 prio 0 rate 8bit ceil 256000bit burst 1600b cburst 1920b

...(略)

---

# iptables -t mangle -vnL POSTROUTING

...(略)

    0     0 MARK       tcp  --  *      *       0.0.0.0/0            0.0.0.0/0           tcp spt:4662 MARK set 0x3c
    0     0 MARK       udp  --  *      *       0.0.0.0/0            0.0.0.0/0           udp spt:4665 MARK set 0x3c
    0     0 MARK       udp  --  *      *       0.0.0.0/0            0.0.0.0/0           udp spt:4672 MARK set 0x3c
    0     0 MARK       tcp  --  *      *       0.0.0.0/0            0.0.0.0/0           tcp spt:6890 MARK set 0x46

...(略)

```

把 amule 的 priority 設為 7

把 rtorrent 的 priority 設為 0

* 結果二

amule 的速度經過一段時間後在 10 KBytes/s 左右穩定下來

rtorrent 的速度經過一段時間後在 15 KBytes/s 左右穩定下來


---

結論:

Qos 的 priority 效果不彰

最高的 0 跟最低的 7 在實際上其實只有差一點

更不要說其他的 1~6 的中間值了...@_@

還是說 htb 的特色就是這樣??

還是我的設定有問題...@_@

