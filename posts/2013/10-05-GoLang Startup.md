---
title: GoLang Startup
date: 2013-10-05
description:
categories:
- Blog
tags:
- golang
- eclipse
- liteide
- markdown
---

[golang]: http://golang.org/
[github]: https://github.com/
[goclipse]: https://code.google.com/p/goclipse/
[liteide]: https://code.google.com/p/golangide/
[markdown]: http://markdown.tw/
[windows下用eclipse+goclipse插件+gdb搭建go語言開發調試環境]: http://rongmayisheng.com/post/windows%E4%B8%8B%E7%94%A8eclipsegoclipse%E6%8F%92%E4%BB%B6gdb%E6%90%AD%E5%BB%BAgo%E8%AF%AD%E8%A8%80%E5%BC%80%E5%8F%91%E8%B0%83%E8%AF%95%E7%8E%AF%E5%A2%83

最近看上了 [golang][] 的速度跟整合 [github][] 的模式

要來學一下 [golang][] 了

1. Compiler and Runtime
	https://code.google.com/p/go/downloads/list

2. Debugger
	參考 [windows下用eclipse+goclipse插件+gdb搭建go語言開發調試環境][]

	直接抓 [liteide Download](http://code.google.com/p/golangide/downloads/list) 來用裡面內建的 gdb

3. IDE (Eclipse)
	1. 下載 http://www.eclipse.org/downloads/
	2. 裝 plugin [goclipse][]
		[Update Site](http://goclipse.googlecode.com/svn/trunk/goclipse-update-site/)
	3. 設定 Preferences

4. 開個 test go project

	```
	package main

	import (
		"fmt"
	)

	func main() {
		fmt.Println("golang")
	}
	```

5. 大功告成!!

不過用 gdb 來 debug 頗難用

還是只好盡量寫小 function + unit test 吧...@_@

---

剛剛突然發現 [liteide][] 還可以拿來寫 [markdown][] 耶!!
