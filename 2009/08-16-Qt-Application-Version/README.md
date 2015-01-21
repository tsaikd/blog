---
title: Qt Application Version
date: 2009-08-16
categories:
- KDBlog
tags:
- Qt
- 程式
---
要在 Qt on windows 的程式上加入版本訊息其實是可以的

我在 Google 上好像都找不到相關的文章

只好自己從 Qt 的原始碼去找答案了

---

Qt 小幫手裡面有說明如何把 ICON 加到 Application 上

不過就是沒有說到版本訊息的部份

---

最後在 QTDIR/src/gui/QtGuid_resource.rc 找到答案

---

* QTDIR/src/gui/QtGuid_resource.rc

```
# if defined(UNDER_CE)
#  include &lt;winbase.h&gt;
# else
#  include &lt;winver.h&gt;
# endif

VS_VERSION_INFO VERSIONINFO
	FILEVERSION 4,5,2,0
	PRODUCTVERSION 4,5,2,0
	FILEFLAGSMASK 0x3fL
#ifdef _DEBUG
	FILEFLAGS VS_FF_DEBUG
#else
	FILEFLAGS 0x0L
#endif
	FILEOS VOS__WINDOWS32
	FILETYPE VFT_DLL
	FILESUBTYPE 0x0L
	BEGIN
		BLOCK "StringFileInfo"
		BEGIN
			BLOCK "040904B0"
			BEGIN
				VALUE "CompanyName", "Nokia Corporation and/or its subsidiary(-ies)\0"
				VALUE "FileDescription", "C++ application development framework.\0"
				VALUE "FileVersion", "4.5.2.0\0"
				VALUE "LegalCopyright", "Copyright (C) 2009 Nokia Corporation and/or its subsidiary(-ies)\0"
				VALUE "OriginalFilename", "QtGuid4.dll\0"
				VALUE "ProductName", "Qt4\0"
			END
		END
	END
/* End of Version info */
```

---

再把這個資源檔加進 pro 就好了

```
RC_FILE = MyApp.rc
```

---

不過我比較喜歡把一些訊息統整起來

所以又另外寫一個 config.h 來放程式的名稱、版本、圖示

* config.h

```
#ifndef _MYAPP_CONFIG_H
#define _MYAPP_CONFIG_H

#define PROJNAME	"MyApp"
#define PROJVER		"1.0.0.0"
#define PROJVERC	1,0,0,0

#define ICONPATH	"../icon/MyApp.ico"

#endif//_MYAPP_CONFIG_H

```

* myapp.rc

```
# if defined(UNDER_CE)
#  include &lt;winbase.h&gt;
# else
#  include &lt;winver.h&gt;
# endif

# include "config.h"

IDI_ICON1		ICON	DISCARDABLE			ICONPATH
VS_VERSION_INFO VERSIONINFO
	FILEVERSION PROJVERC
	PRODUCTVERSION PROJVERC
	FILEFLAGSMASK 0x3fL
#ifdef _DEBUG
	FILEFLAGS VS_FF_DEBUG
#else
	FILEFLAGS 0x0L
#endif
	FILEOS VOS__WINDOWS32
	FILETYPE VFT_DLL
	FILESUBTYPE 0x0L
	BEGIN
		BLOCK "StringFileInfo"
		BEGIN
			BLOCK "040904B0"
			BEGIN
				VALUE "CompanyName", "KD\0"
				VALUE "FileDescription", "MyApp Qt Application\0"
				VALUE "FileVersion", PROJVER
				VALUE "LegalCopyright", "Copyright (C) 2009 by tsaikd\0"
				VALUE "ProductVersion", PROJVER
				VALUE "ProductName", PROJNAME
			END
		END
	END
/* End of Version info */
```

---

然後在 main() 裡面加上這些 code

* main.cpp

```
int main(int argc, char* argv[])

{

	...

	app.setApplicationName(qAppName());

	app.setApplicationVersion(PROJVER);

	...

}
```

---

在主要的視窗 widget 加上這些 code

```
	setWindowTitle(QString("%1 %2").arg(qAppName()).arg(qApp->applicationVersion()));
```

---

如果有 trayicon 的話, 可以加上這些 code

```
	tray.setToolTip(windowTitle());
```
