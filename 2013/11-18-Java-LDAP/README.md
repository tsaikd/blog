---
title: Java LDAP Notes
date: 2013-11-18
description:
categories:
- Blog
tags:
- Java
- LDAP
---

``` java

	/**
	 * AD LDAP 登入認證
	 *
	 * @param ldap_url like ldap://x.x.x.x:389/DC=mydomain,DC=com
	 * @param account like mydomain\\username
	 * @param password
	 * @return String[] array 0 :0 success,1 fail,2 LDAP connect fail,3 unknow
	 */
	public String[] LDAP_AUTH_AD(String ldap_url, String account, String password) {
		String[] returnStr = new String[2];
		Hashtable<String, String> env = new Hashtable<String, String>();
		env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
		env.put(Context.PROVIDER_URL, ldap_url);
		env.put(Context.SECURITY_PRINCIPAL, account);
		env.put(Context.SECURITY_CREDENTIALS, password);

		LdapContext ctx = null;
		try {
			ctx = new InitialLdapContext(env, null);
			/* // search
			 * String searchUser = "USERNAME";
			 * SearchControls constraints = new SearchControls();
			 * constraints.setSearchScope(SearchControls.SUBTREE_SCOPE);
			 * String[] attrIDs = {"distinguishedName", "sn", "givenname", "mail", "telephonenumber"};
			 * constraints.setReturningAttributes(attrIDs);
			 * String searchFilter = String.format("(&(objectClass=user)(sAMAccountName=%1$s))", searchUser);
			 * NamingEnumeration answer = ctx.search("", searchFilter, constraints);
			 * if (answer.hasMore()) {
			 *		Attributes attrs = ((SearchResult) answer.next()).getAttributes();
			 *		System.out.println(attrs);
			 * }
			 */
			returnStr[0] = "0";
			returnStr[1] = "";
		} catch (javax.naming.AuthenticationException e) {
			// invalid user account
			returnStr[0] = "1";
			returnStr[1] = e.toString(true);
		} catch (javax.naming.CommunicationException e) {
			// Can't connect to ldap server!
			returnStr[0] = "2";
			returnStr[1] = e.toString(true);
		} catch (Exception e) {
			// unexcepted error
			e.printStackTrace();
			returnStr[0] = "3";
			returnStr[1] = e.toString();
		}
		if (ctx != null) {
			try {
				ctx.close();
			} catch (NamingException e) {
				e.printStackTrace();
			}
		}
		return returnStr;
	}

```

# 參考
* http://polinwei.blogspot.tw/2009/03/java-ldap-ad.html
* http://blog.csdn.net/sand_ant/article/details/11739791
