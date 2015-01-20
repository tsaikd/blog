---
title: gitweb
date: 2009-09-12
categories:
- KDBlog
tags:
- 主機
---
之前參考 Ku 的做法

在 gitweb.conf 裡面重寫 git_get_project_url_list 去改變 gitweb 裡面 URL 的欄位

剛剛看到 &lt;a href="http://ask.metafilter.com/120273/Getting-redirects-to-work-in-Apache-for-Gitweb"&gt;Getting redirects to work in Apache for Gitweb&lt;/a&gt;

裡面是用 @git_base_url_list = ('git://my.domain.com');

這個應該才是比較正統的做法

---

另外剛剛那個網頁提到把 git 的網址改成比較好看的樣式

我試了一下

感覺只有改到 project 那層的目錄

進去之後的網址還是一樣醜

所以就算了

---

所以就把之前那種 hack 的寫法改掉了

<quote header="gitweb.cgi">

$projectroot = "/var/www/www.tsaikd.org/htdocs/git";

$git_temp = "/tmp";

$home_text = "indextext.html";

$projects_list = $projectroot;

$stylesheet = $home_link."/gitweb.css";

$logo = $home_link."/git-logo.png";

$favicon = $home_link."/git-favicon.png";

$feature{'snapshot'}{'default'} = ["tbz2", "zip"];

#sub git_get_project_url_list {

#	my $project = shift;

##	$project =~ s:/::g;

#	return ("http://www.tsaikd.org/git/$project/");

#}

@git_base_url_list = ("http://www.tsaikd.org/git", "tsaikd:");

#$feature{'pathinfo'}{'default'} = [1];

#$my_uri = $home_link."/gitweb.cgi";

</quote>

<quote header=".htaccess">

DirectoryIndex gitweb.cgi

AddHandler cgi-script .cgi

&lt;Files gitweb.cgi&gt;

    Options +ExecCGI

&lt;/Files&gt;

---

RewriteEngine On

RewriteBase /git/

RewriteCond %{REQUEST_FILENAME} !-f

RewriteCond %{REQUEST_FILENAME} !-d

RewriteRule ^.* /gitweb.cgi/$0 [L,PT]

</quote>

