---
title: Highcharts Notes
date: 2013-11-13
tags:
- Javascript
- Highcharts
---

* 隱藏 Highcharts Trade Mark
```
{
	credits: {
		enabled: false
	}
}
```

* 用 Javascript 觸發 point click 事件
```
chart.series[0].data[0].firePointEvent("click");
```
