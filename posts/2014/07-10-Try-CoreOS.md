---
title: Try CoreOS
date: 2014-07-10
description:
categories:
- Blog
tags:
- CoreOS
- Docker
---

[CoreOS]: https://coreos.com/
[Ubuntu]: http://www.ubuntu.com/
[SystemRescueCD]: http://www.sysresccd.org/
[Installing CoreOS to Disk]: https://coreos.com/docs/running-coreos/bare-metal/installing-to-disk/
[coreos-install]: https://raw.githubusercontent.com/coreos/init/master/bin/coreos-install
[Cloud-Config]: https://coreos.com/docs/cluster-management/setup/cloudinit-cloud-config/
[squid]: http://www.squid-cache.org/
[kdocker-web]: https://github.com/tsaikd/kdocker-web

新玩具 [CoreOS] ，設計理念跟 [Ubuntu] 差蠻多的，
光是安裝就花了不少時間在試，記錄一下奇怪的雷。
幾個重點先說一下：

1. [Cloud-Config] 最前面的 `#cloud-config` 不能省
2. [Cloud-Config] 請按照官方文件上面的範例寫，不要畫蛇添足
3. [Cloud-Config] 會放在 /var/lib/coreos-install/user_data ，文件上說每次開機都會跑，但是 user 已經存在的話就不會再加一次

下面是安裝過程，已經有簡化一些了還是落落長，最後設定請直接 END

------------------------------------------------------------

# 先開個 VM 試試 (一號機)

在 [Installing CoreOS to Disk]
看到有趣的安裝 script ，
用 [SystemRescueCD] 開機之後，
抓 [coreos-install] 下來，
執行 ```coreos-install -d /dev/sda``` ，
然後他會下載一百多 MB 的檔案來裝到硬碟，
一切順利，重開機，登入，預設帳密是啥？

嗯～～看來是要用 [Cloud-Config] 來初始化個人設定，該重裝了～～
感覺好像會重裝很多次，每次都要下載一百多 MB 好像有點浪費頻寬，
[squid] 該你出場了！

------------------------------------------------------------

# 重開 VM 進 [SystemRescueCD] 環境 (二號機)

設定 http_proxy ，
抓 [coreos-install] 下來，
寫 cloud-config.yaml

```
ssh_authorized_keys:
  - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0g+ZTxC7weoIJLUafOgrm+h...
```

```
coreos-install -d /dev/sda -c cloud-config.yaml
```

重開之後，用 SSH 登不進去？ ... WTF ...
是不是要直接加帳號才對？

------------------------------------------------------------

# 重開 VM 進 [SystemRescueCD] 環境 (三號機)

設定 http_proxy ，
抓 [coreos-install] 下來，
寫 cloud-config.yaml

```
users:
  - name: elroy
    passwd: $6$5s2u6/jR$un0AvWnqilcgaNB3Mkxd5yYv6mTlWfOoCYHZmfi3LDKVltj.E8XNKEcwWm...
    groups:
      - sudo
      - docker
    ssh-authorized-keys:
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0g+ZTxC7weoIJLUafOgrm+h...
```

```
coreos-install -d /dev/sda -c cloud-config.yaml
```

怎麼又從 internet 下載一百多 MB 的檔案...
[squid] 是壞掉了嗎？
開始檢查 [squid] 設定，

```
refresh_pattern -i \.(rpm|cab|deb|exe|msi|msu|zip|tar|xz|bz|bz2|lzma|gz|tgz|rar|bin|7z|doc?|xls?|ppt?|pdf|nth|psd|sis)$ 10080 90% 43200 override-expire override-lastmod reload-into-ims ignore-no-cache ignore-private
```

應該 OK 啊！
試一下 ``` wget http://free.nchc.org.tw/ubuntu/ls-lR.gz ``` ，
沒問題啊，搗鼓半小時後放棄 [squid] 方案，
直接改 [coreos-install] 比較快，
把

* [coreos-install]
* http://beta.release.core-os.net/amd64-usr/current/coreos_production_image.bin.bz2
* http://beta.release.core-os.net/amd64-usr/current/coreos_production_image.bin.bz2.sig

放到區網的 Web Site ，
修改 [coreos-install] ，
噢，剛剛好像有試裝一次 [CoreOS] ，都還沒看成果就跑題了，該重開機了。

SSH 登不進去，密碼也登不進去，這 [CoreOS] 也太渣了吧！
那個設定檔怎麼好像不太整齊， user 下面的子項目怎麼只有 name 前面有 `-`

------------------------------------------------------------

# 重開 VM 進 [SystemRescueCD] 環境 (四號機)

```
users:
  - name: elroy
  - passwd: $6$5s2u6/jR$un0AvWnqilcgaNB3Mkxd5yYv6mTlWfOoCYHZmfi3LDKVltj.E8XNKEcwWm...
  - groups:
      - sudo
      - docker
  - ssh-authorized-keys:
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0g+ZTxC7weoIJLUafOgrm+h...
```

SSH 登不進去，密碼也登不進去，
應該是哪裡出了問題，會不會是我的設定檔他根本不吃！

------------------------------------------------------------

# 重開 VM 進 [SystemRescueCD] 環境 (五號機)

```
hostname: coreos-test
users:
  - name: elroy
  - passwd: $6$5s2u6/jR$un0AvWnqilcgaNB3Mkxd5yYv6mTlWfOoCYHZmfi3LDKVltj.E8XNKEcwWm...
  - groups:
      - sudo
      - docker
  - ssh-authorized-keys:
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0g+ZTxC7weoIJLUafOgrm+h...
```

果然連 hostname 都沒吃到，重新多看幾次文件，每個範例好像前面都有加 ```#cloud-config```

------------------------------------------------------------

# 重開 VM 進 [SystemRescueCD] 環境 (六號機)

```
#cloud-config

hostname: coreos-test
users:
  - name: elroy
  - passwd: $6$5s2u6/jR$un0AvWnqilcgaNB3Mkxd5yYv6mTlWfOoCYHZmfi3LDKVltj.E8XNKEcwWm...
  - groups:
      - sudo
      - docker
  - ssh-authorized-keys:
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0g+ZTxC7weoIJLUafOgrm+h...
```

這次 hostname 有吃到了，
不過還是登不進去啊！
等等文件上有說

```
The ssh_authorized_keys parameter adds public SSH keys which will be authorized for the core user.
```

------------------------------------------------------------

# 重開 VM 進 [SystemRescueCD] 環境 (七號機)

```
#cloud-config

hostname: coreos-test
ssh-authorized-keys:
  - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0g+ZTxC7weoIJLUafOgrm+h...
users:
  - name: elroy
  - passwd: $6$5s2u6/jR$un0AvWnqilcgaNB3Mkxd5yYv6mTlWfOoCYHZmfi3LDKVltj.E8XNKEcwWm...
  - groups:
      - sudo
      - docker
  - ssh-authorized-keys:
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0g+ZTxC7weoIJLUafOgrm+h...
```

SSH core 這個 user 終於進去了！
不過新建的 user 還是不行。
等等，我剛剛好像有把設定檔的格式加了幾個 `-`

------------------------------------------------------------

# 重開 VM 進 [SystemRescueCD] 環境 (八號機)

```
#cloud-config

hostname: coreos-test
ssh-authorized-keys:
  - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0g+ZTxC7weoIJLUafOgrm+h...
users:
  - name: elroy
    passwd: $6$5s2u6/jR$un0AvWnqilcgaNB3Mkxd5yYv6mTlWfOoCYHZmfi3LDKVltj.E8XNKEcwWm...
    groups:
      - sudo
      - docker
    ssh-authorized-keys:
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0g+ZTxC7weoIJLUafOgrm+h...
```

終於進去了！接下來就是要把 [kdocker-web] 接上去了。

------------------------------------------------------------

# 重開 VM 進 [SystemRescueCD] 環境 (九號機)

```
#cloud-config

hostname: coreos-test
ssh-authorized-keys:
  - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0g+ZTxC7weoIJLUafOgrm+h...
users:
  - name: elroy
    passwd: $6$5s2u6/jR$un0AvWnqilcgaNB3Mkxd5yYv6mTlWfOoCYHZmfi3LDKVltj.E8XNKEcwWm...
    groups:
      - sudo
      - docker
    ssh-authorized-keys:
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0g+ZTxC7weoIJLUafOgrm+h...
coreos:
  units:
    - name: docker.service
      command: restart
      content: |
        [Unit]
        Description=Docker Application Container Engine
        Documentation=http://docs.docker.io

        [Service]
        Environment="TMPDIR=/var/tmp/"
        ExecStartPre=/bin/mount --make-rprivate /
        # Run docker but don't have docker automatically restart
        # containers. This is a job for systemd and unit files.
        ExecStart=/usr/bin/docker -d -s=btrfs -r=false -H fd:// --api-enable-cors=true

        [Install]
        WantedBy=multi-user.target
    - name: docker-tcp.socket
      command: start
      content: |
        [Unit]
        Description=Docker Socket for the API

        [Socket]
        ListenStream=4243
        Service=docker.service
        BindIPv6Only=both

        [Install]
        WantedBy=sockets.target
    - name: enable-docker-tcp.service
      command: start
      content: |
        [Unit]
        Description=Enable the Docker Socket for the API

        [Service]
        Type=oneshot
        ExecStart=/usr/bin/systemctl enable docker-tcp.socket
```

大功告成！
