---
title: Bash 不能輸入中文
date: 2009-09-26
tags:
- KDBlog
- 主機
---
不知道從什麼時候開始

我用 pietty 連回主機的時候就不能在 shell 那邊輸入中文了

連複製貼上都不行

---

狀況總結:

1. 使用 pietty 連到 Ubuntu 8.04 server

2. LANG=zh_TW.utf8

3. ls 可以看到中文檔名

4. 沒辦法在 shell 輸入中文

5. 可以在 vi 裡面輸入中文

6. bash --norc 之後可以輸入中文

7. bash --norc ; source /etc/profile ; source ~/.bashrc 可以輸入中文

8. 把 .bashrc 中的 LANG=C 移掉 可以輸入中文

9. 把 .bashrc 中的 LANG=C 放到最後面 可以輸入中文

10.把 .bashrc 中的 LANG=C 放到 bind 指令前面 不能輸入中文

---

抓到兇手了!!

在 bind 指令前不能用 LANG=C

---

在 google 上找的大部份都是在說要設定 putty 的 encoding 或字型之類的

跟我的狀況不一樣...Orz

