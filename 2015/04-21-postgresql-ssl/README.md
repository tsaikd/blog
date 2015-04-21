---
title: PostgreSQL Docker SSL Config
date: 2015-04-21
tags:
- PostgreSQL
- SSL
- DB
---

[Docker]: https://www.docker.com/
[PostgreSQL]: http://www.postgresql.org/
[Postgres Docker]: https://registry.hub.docker.com/_/postgres/
[Docker Compose]: https://github.com/docker/compose
[pgAdmin]: http://www.pgadmin.org/

[Docker][] 官方有提供 [Postgres Docker][] ，還蠻方便的。
先用 [Docker Compose][] 初始化 [PostgreSQL][] ，
這樣會先產生一些預設的設定檔。

* docker-compose.yml

```yml
postgresql:
  image: postgres:9.4.1
  environment:
    - POSTGRES_USER=alice
    - POSTGRES_PASSWORD=change.password
  ports:
    - 5432:5432
  volumes:
    - postgresql/data:/var/lib/postgresql/data
```
接下來就用 openssl 產生 SSL 的相關檔案。

```bash
openssl genrsa -out server.key 4096
openssl req -new -key server.key -out server.csr
openssl x509 -req -days 3650 -in server.csr -signkey server.key -out server.crt
```

這邊要注意一點， key size 不能設太小，我本來想說測試的時候先設定個 512 來試，
沒想到這邊雷了我好久....

* 產生的 server.crt server.key 丟到 postgresql/data

* postgresql/data/postgresql.conf

```
ssl = on
```

* postgresql/data/pg_hba.conf

```patch
-host all all 0.0.0.0/0 md5
+hostssl all all 0.0.0.0/0 md5
```

* 重開 [Postgres Docker][]，搞定收工

* 可以用 [pgAdmin][] 測試連線，看看是不是有用 SSL 連線了
