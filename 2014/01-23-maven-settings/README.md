---
title: Maven settings notes
date: 2014-01-23
description:
categories:
- Blog
tags:
- Maven
- Nexus
- Java
---

### 設定 Local Nexus 來快取 central 的套件
* ~/.settings.xml

> ```
<settings>
    <mirrors>
        <mirror>
            <id>nexus</id>
            <name>Local Nexus</name>
            <url>http://localhost:8080/nexus-2.7.1-01/content/groups/public/</url>
            <mirrorOf>central</mirrorOf>
        </mirror>
    </mirrors>
</settings>
```
