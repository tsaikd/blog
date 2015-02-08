---
title: SSH Agent Forward in Mac OS X Yosemite
date: 2015-02-08
tags:
- Mac
- Yosemite
- ssh
---

[Ubuntu]: http://www.ubuntu.com/

在原生的 [Ubuntu][] ssh agent forward 只要多加一個參數就可以搞定了，沒想到在我的 MBA 上
面搞了好久才搞定。在 Google 上面找了一堆參考資料，但是大多都不完整，還有找到要用 brew 裝新
的 openssh 的解法，不過其實也沒那麼麻煩，就弄個指令，加上修改個檔案而已。

* 先把你的 private key 存到系統裡面

```
ssh-add -K ~/.ssh/id_rsa
```

* 修改 bashrc

```
eval $(ssh-agent)
function _cleanup_ssh_agent {
	echo "Killing SSH-Agent"
	kill -9 $SSH_AGENT_PID
}
trap _cleanup_ssh_agent EXIT
```

* 開新的 terminal 的時候就可以用 agent forward 啦
