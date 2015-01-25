---
title: gitweb for chromium user script
date: 2009-12-05
tags:
- KDBlog
- Qt
- 程式
---
因為新版的 chromium 不能吃傳統的 greasemonkey 的 user script

它會把 user script 都轉成 extension 才能用

這點有機車到

而且我都把我的 user script 用 git 去管理

這樣一來我要更新就麻煩了....

比較好的辦法是把所有的 user script 都轉成 chromium 的 extension

不過這樣子感覺好麻煩

只好退而求其次

讓 chromium 可以吃 gitweb 的網頁

patch gitweb.cgi 如下

* diff gitweb.cgi.old gitweb.cgi

```
--- gitweb.cgi.old  2009-12-05 22:39:01.000000000 +0800
+++ gitweb.cgi  2009-12-05 22:07:16.000000000 +0800
@@ -1006,6 +1006,12 @@ sub href {
            }
        }
    }
+   if (defined $params{"file_name"}
+       &amp;&amp; $params{"file_name"} =~ /\.user\.js$/
+       &amp;&amp; defined $params{"action"}
+       &amp;&amp; $params{"action"} eq "blob_plain") {
+       $href .= $params{"file_name"};
+   }
    $href .= "?" . join(';', @result) if scalar @result;
    return $href;
```

---

apache .htaccess 的設定也要先設好 rewrite rule 才能用

* /git/.htaccess

```
RewriteEngine On

RewriteBase /git/

RewriteCond %{REQUEST_FILENAME} !-f

RewriteCond %{REQUEST_FILENAME} !-d

RewriteRule ^.* gitweb.cgi/$0 [L,PT]
```
