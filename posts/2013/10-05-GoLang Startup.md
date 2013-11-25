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

3. IDE (Eclipse) (其實LiteIDE比較好用)
	1. 下載 http://www.eclipse.org/downloads/
	2. 裝 plugin [goclipse][]
		[Update Site](http://goclipse.googlecode.com/svn/trunk/goclipse-update-site/)
	3. 設定 Preferences

4. 另一個 IDE (LiteIDE)
	1. 下載 https://code.google.com/p/golangide/
	2. 設定環境變數, 不然自動補全的功能會失效
		1. GOARCH=amd64
		2. GOOS=windows
		3. GOROOT=C:\Go\
		4. GOPATH=C:\GoPath\

5. 開個 test go project

	```
	package main

	import (
		"fmt"
	)

	func main() {
		fmt.Println("golang")
	}
	```

6. 大功告成!!

不過用 gdb 來 debug 頗難用

還是只好盡量寫小 function + unit test 吧...@_@

---

剛剛突然發現 [liteide][] 還可以拿來寫 [markdown][] 耶!!

---

參考資料
=======
* https://github.com/astaxie/build-web-application-with-golang/blob/master/ebook/preface.md
* https://github.com/why404/gobook
* https://code.google.com/p/go-wiki/wiki/Projects
* http://golang.cat-v.org/pure-go-libs
* https://github.com/shaoshing/train

---

Memory Buffer
=============
支援 io.Reader, io.Writer

```go
b := new(bytes.Buffer)
```

---

Byte array to string
====================
```go
// var b []byte
string(b[0:])
```

---

Time to solr date format
========================
```go
time.Now().In(time.UTC).Format("2006-01-02T15:04:05.000Z")
```

---

Goroutine Example
=================
```go
import (
	"fmt"
	"runtime"
	"time"
)

func Test_Goroutine() {
	// 假設有這些資料需要處理
	list := []int{5, 4, 3, 2, 1}

	// worker 的數量設成 CPU 的數量好像比較有效率?
	workernum := runtime.NumCPU()

	// in, out 的 channel 可以換成要處理的 struct, 這邊用 string 來當示範
	in, out := make(chan string, workernum), make(chan string, workernum)
	for i := 0; i < workernum; i++ {
		// 這個匿名函數就是真正要做事的地方
		go func() {
			// 一直從 in channel 抓資料來處理
			for data := range in {
				// 睡個一秒鐘來模擬做事 XD
				time.Sleep(1000 * time.Millisecond)
				// 資料處理完了送出去
				out <- data
			}
		}()
	}

	// 開一個 goroutine 來把要處理的資料放進 in channel
	go func() {
		for _, data := range list {
			in <- fmt.Sprint(data)
		}
		// 資料都塞進 channel 了, 可以關掉了, 不關好像也沒關係?
		close(in)
	}()

	// 等所有的資料處理完再結束
	for _ = range list {
		<-out
	}
}
```