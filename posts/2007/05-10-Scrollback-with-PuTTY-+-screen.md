---
title: Scrollback with PuTTY + screen
date: 2007-05-10
categories:
- KDBlog
tags:
- Linux
---
Enable scrollback with PuTTY+screen



紀錄一下設定方式

---

<quote header="停用 PuTTY 的 alternate screen">

Terminal / Features / Disable switching to alternate terminal screen

</quote>

---

<quote header="停用 screen 的 alternate screen">

加一行 termcapinfo xterm ti@:te@ 到 screenrc

</quote>

