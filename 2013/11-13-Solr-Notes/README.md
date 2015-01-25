---
title: Solr Notes
date: 2013-11-13
tags:
- Solr
---

* jsonp with jquery
```
jQuery.ajax({
  url: mySolrUrl,
  data: myQueryParameters,
  success: mySuccessCallback,
  dataType: "jsonp",
  jsonp: "json.wrf""
});
```

* custom field name
```
fl=price:price_pl
```

## 參考
* http://solr.pl/en/2011/11/22/solr-4-0-new-fl-parameter-functionalities-first-look/
* http://xplus3.net/2010/09/21/solr-and-jsonp/
