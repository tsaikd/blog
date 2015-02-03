---
title: Hack Hugo to GitHub compatiable
date: 2015-02-03
tags:
- golang
- hugo
- github
---

[Hugo]: http://gohugo.io/
[GitHub]: https://github.com/
[gor]: https://github.com/wendal/gor/
[我的 GitHub Hugo]: https://github.com/tsaikd/hugo
[Markdown]: http://markdown.tw/
[Sitemap]: http://www.sitemaps.org/zh_TW/protocol.html

在很久之前的文章([練習用 markdown 的形式來寫 blog](../../2013/09-28-try-markdown-style-blog))
裡面有提到用 [gor][] 來產生靜態的 Blog 網站，不過最近有個叫 [Hugo][] 的東西看起來好像比較
威猛一點，就花了一些時間試看看，雖然最後有達到基本的需求，不過中間花了不少時間在 Hack [Hugo][]
`>"<` ，紀錄一下修改的過程跟一些我自己想要的額外效果給大家參考。

因為 [Hugo][] 的改版還蠻快的，而且我不是很喜歡 git merge 的樹狀結構長的很醜，所以就附上
相關的 Patch 檔案，如果是直接看[我的 GitHub Hugo][] 的話，那個 commit hash 是會一直變動的唷！

* [檢查副檔名改成全用小寫檢查](check-ext.patch)
	* 因為有時後會遇到副檔名大小寫混用的情況，統一用小寫檢查比較方便。
* [直接複製檔案到發布目錄](direct-handler.patch)
	* [Hugo][] 遇到不認識的副檔名會報錯，加個 handler 讓他把一些檔案直接丟到發布目錄裡面，
	其實在 [Hugo][] 的官方說明文件是要用一個 asset 的目錄去放奇奇怪怪的檔案的，但是我覺得
	如果可以跟 [Markdown][] 文件放在一起的話，還是比較方便，因為這樣就可以用相對路徑了。
* [新增 ModTime 資訊](add-modtime.patch)
	* [Hugo][] 原本產生 [Sitemap][] 的時間欄位是用文件內容提供的 `date` 欄位，但是我覺
	得應該要用，檔案系統上面的 modtime 資訊會比較好。
* [處理 GitHub 的 README.md](relative-link.patch)
	* 把 README.md 變成 index.html
* [批量修改相依性程式碼](add-hack-tool.patch)
	* 因為有 Hack 一些程式碼，所以相依性的設定要一併修改，檔案很多，跑 script 比較快。

---

這樣改完之後有幾個特點：

* 目錄結構可以跟 GitHub 上一樣，舉例來說，目錄名稱是 URL 的一部分， README.md 就是 index.html
	* content
	  * 2015
	    * 02-03-hack-hugo-to-github-compatiable
		  * README.md
		  * check-ext.patch
		  * direct-handler.patch
		  * ...
* 從 GitHub 上面看也不會很奇怪
	* https://github.com/tsaikd/blog/tree/blog/2015/02-03-hack-hugo-to-github-compatiable
* Sitemap 更新時間依照檔案的修改時間
