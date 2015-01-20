---
title: GateIn Skin Trick
date: 2013-12-23
description:
categories:
- Blog
tags:
- GateIn
- Java
---

# 建立新的 Skin
1. 直接 copy gatein-sample-skin
2. 改 web.xml

	這邊的名字一定要跟放到 tomcat 上的 project name 一樣，我花了好幾個小時 trace code 才知道有這個限制...>"<

	```
		<display-name>My-skin</display-name>
	```
3. 改 gatein-resources.xml

	這邊的名字是顯示在 GateIn 管理介面上的名字
```
	<skin-name>MySkin</skin-name>
```

4. 客製化 /skin/Stylesheet.css
