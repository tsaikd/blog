---
title: git rebase 使用心得
date: 2009-10-17
categories:
- KDBlog
tags:
- 程式
---
最近在公司裡遇到一個 case 剛好可以讓我練習進階的 git 用法

情況是這樣的:

我們的 team 正在開發某個產品(保密...XD)

因為正在開發

所以有很多功能都還沒做好

同事甲說想要測試一下整合會不會有問題

不過我有個功能開發到一半 (branch A)

而且還要一段不短的時間才能結束

所以就決定先做跟同事甲之間的整合部份

於是....

回到 branch master 開一個新的 branch B

然後寫程式....

寫好了之後就是測試啦....

然後當然是一堆問題

繼續修 bug

這時候 branch B 就離 branch master 很遠了

最後終於把 branch B 結束了

然後我要回到 branch A 繼續長期抗戰

不過我的 branch B 的東西要整合進 branch A 啊

這時候一般人的做法可能是用 merge 的方式把 branch B merge 到 branch A

不過一用 merge 的話就會產生難看的 commit message &amp; 亂七八糟的 merge tree

可能是因為我都有在看 git history tree

所以比較在意整個 history 的美觀....XD

---

這個時候就是 rebase 派上用場的好機會了

```
$ git rebase --onto branchB master branchA
```

一行指令搞定!!

branchA 就會接在 branchB 的後面了

然後把 branchB 砍掉, master 設到 branchB 的位置就大功告成了!!

---

稍微解釋一下 rebase 的參數

因為我一開始看 document 的時候也搞不太懂

* man git-rebase

```
SYNOPSIS
           git rebase [-i | --interactive] [-v | --verbose] [-m | --merge]
                   [-s <strategy> | --strategy=<strategy>]
                   [-C<n>] [ --whitespace=<option>] [-p | --preserve-merges]
                   [--onto <newbase>] <upstream> [<branch>]
           git rebase --continue | --skip | --abort
```

簡單來說就是 git rebase --onto "新的基準點" "從這個點" "到這個點"

要是沒有衝突的話就會把 "從這個點" "到這個點" 的 patches 放到 "新的基準點" 上面

有衝突的話還是不要亂搞....乖乖的 git rebase --abort 吧....XD
