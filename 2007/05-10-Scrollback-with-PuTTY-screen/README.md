---
title: Scrollback with PuTTY + screen
date: 2007-05-10
tags:
- KDBlog
- Linux
---
Enable scrollback with PuTTY+screen



紀錄一下設定方式

---

* 停用 PuTTY 的 alternate screen

```
Terminal / Features / Disable switching to alternate terminal screen
```

---

* 停用 screen 的 alternate screen

加一行 `termcapinfo xterm ti@:te@` 到 screenrc