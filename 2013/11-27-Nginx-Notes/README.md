---
title: Nginx Config Notes
date: 2013-11-27
tags:
- Nginx
- SSL
- Http
- Https
- Spdy
- Reverse Proxy
---

# 產生 SSL 憑證
```
openssl genrsa -out server.key 512
openssl req -new -key server.key -out server.csr
openssl x509 -req -days 3650 -in server.csr -signkey server.key -out server.crt
```

# SSL + Spdy
```
server {
	listen 443 ssl spdy;
	ssl_certificate server.crt;
	ssl_certificate_key server.key;
}
```

# Reverse proxy
```
server {
	location /WebApp- {
		rewrite ^/WebApp-[^/]*/(.*)$ /WebApp/$1 redirect;
	}

	location = /WebApp {
		rewrite ^ /WebApp/ redirect;
	}

	location /WebApp/ {
		set $ver 1.0-SNAPSHOT-20131127-1412;
		rewrite ^/WebApp/(.*)$ /WebApp-$ver/$1 break;
		proxy_cookie_path      /WebApp-$ver /WebApp;
		proxy_pass http://tomcat:8080/WebApp-$ver/$1$is_args$args;
		include proxy_params;
		add_header WebApp-Version $ver;
	}
}
```

```
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_http_version 1.1;
```
