---
title: NetBeans Config Notes
date: 2013-11-24
description:
categories:
- Blog
tags:
- NetBeans
- IDE
- Java
---

# UTF-8
* netbeans/etc/netbeans.conf
	* netbeans_default_options

```
-J-Dfile.encoding=UTF-8
```

# 慣用參數設定
* Start Page
	* Show On Startup = false
* Options
	* Editor
		* Formatting
			* Expand Tabs to Spaces = false
			* Tab Size = 4
			* Right Margin = 128
			* Continuation Indentation Size = 4
		* On Save
			* Language = All Languages
				* Reformat = All Lines
				* Remove Trailing Whitespace From = All Lines
			* Language = Java
				* Remove Unused Imports = true
				* Organize Imports = true
	* Keymap
		* Show Code Completion Popup = Alt+SLASH

# 參考
* http://blog.tenyi.com/2012/04/netbeans-utf-8.html
