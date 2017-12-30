/*
===================================================================
Copyright UAB Dinamenta. http://www.dhtmlx.com
This code is obfuscated and not allowed for any purposes except
using on sites which belongs to UAB Dinamenta.

Please contact sales@dhtmlx.com to obtain necessary
license for usage of dhtmlx components.
===================================================================
 */

if (typeof(window.dhx) == "undefined") {
	window.dhx = window.dhx4 = {
		version : "5.0",
		skin : null,
		skinDetect : function (a) {
			return {
				10 : "dhx_skyblue",
				20 : "dhx_web",
				30 : "dhx_terrace",
				40 : "material"
			}
			[this.readFromCss(a + "_skin_detect")] || null
		},
		readFromCss : function (c, d, e) {
			var b = document.createElement("DIV");
			b.className = c;
			if (document.body.firstChild != null) {
				document.body.insertBefore(b, document.body.firstChild)
			} else {
				document.body.appendChild(b)
			}
			if (typeof(e) == "string") {
				b.innerHTML = e
			}
			var a = b[d || "offsetWidth"];
			b.parentNode.removeChild(b);
			b = null;
			return a
		},
		lastId : 1,
		newId : function () {
			return this.lastId++
		},
		zim : {
			data : {},
			step : 5,
			first : function () {
				return 100
			},
			last : function () {
				var c = this.first();
				for (var b in this.data) {
					c = Math.max(c, this.data[b])
				}
				return c
			},
			reserve : function (a) {
				this.data[a] = this.last() + this.step;
				return this.data[a]
			},
			clear : function (a) {
				if (this.data[a] != null) {
					this.data[a] = null;
					delete this.data[a]
				}
			}
		},
		s2b : function (a) {
			if (typeof(a) == "string") {
				a = a.toLowerCase()
			}
			return (a == true || a == 1 || a == "true" || a == "1" || a == "yes" || a == "y" || a == "on")
		},
		s2j : function (s) {
			var obj = null;
			dhx4.temp = null;
			try {
				eval("dhx4.temp=" + s)
			} catch (e) {
				dhx4.temp = null
			}
			obj = dhx4.temp;
			dhx4.temp = null;
			return obj
		},
		absLeft : function (a) {
			if (typeof(a) == "string") {
				a = document.getElementById(a)
			}
			return this.getOffset(a).left
		},
		absTop : function (a) {
			if (typeof(a) == "string") {
				a = document.getElementById(a)
			}
			return this.getOffset(a).top
		},
		_aOfs : function (a) {
			var c = 0,
			b = 0;
			while (a) {
				c = c + parseInt(a.offsetTop);
				b = b + parseInt(a.offsetLeft);
				a = a.offsetParent
			}
			return {
				top : c,
				left : b
			}
		},
		_aOfsRect : function (d) {
			var g = d.getBoundingClientRect();
			var h = document.body;
			var b = document.documentElement;
			var a = window.pageYOffset || b.scrollTop || h.scrollTop;
			var e = window.pageXOffset || b.scrollLeft || h.scrollLeft;
			var f = b.clientTop || h.clientTop || 0;
			var i = b.clientLeft || h.clientLeft || 0;
			var j = g.top + a - f;
			var c = g.left + e - i;
			return {
				top : Math.round(j),
				left : Math.round(c)
			}
		},
		getOffset : function (a) {
			if (a.getBoundingClientRect) {
				return this._aOfsRect(a)
			} else {
				return this._aOfs(a)
			}
		},
		_isObj : function (a) {
			return (a != null && typeof(a) == "object" && typeof(a.length) == "undefined")
		},
		_copyObj : function (d) {
			if (this._isObj(d)) {
				var c = {};
				for (var b in d) {
					if (typeof(d[b]) == "object" && d[b] != null) {
						c[b] = this._copyObj(d[b])
					} else {
						c[b] = d[b]
					}
				}
			} else {
				var c = [];
				for (var b = 0; b < d.length; b++) {
					if (typeof(d[b]) == "object" && d[b] != null) {
						c[b] = this._copyObj(d[b])
					} else {
						c[b] = d[b]
					}
				}
			}
			return c
		},
		screenDim : function () {
			var a = (navigator.userAgent.indexOf("MSIE") >= 0);
			var b = {};
			b.left = document.body.scrollLeft;
			b.right = b.left + (window.innerWidth || document.body.clientWidth);
			b.top = Math.max((a ? document.documentElement : document.getElementsByTagName("html")[0]).scrollTop, document.body.scrollTop);
			b.bottom = b.top + (a ? Math.max(document.documentElement.clientHeight || 0, document.documentElement.offsetHeight || 0) : window.innerHeight);
			return b
		},
		selectTextRange : function (d, g, b) {
			d = (typeof(d) == "string" ? document.getElementById(d) : d);
			var a = d.value.length;
			g = Math.max(Math.min(g, a), 0);
			b = Math.min(b, a);
			if (d.setSelectionRange) {
				try {
					d.setSelectionRange(g, b)
				} catch (f) {}
			} else {
				if (d.createTextRange) {
					var c = d.createTextRange();
					c.moveStart("character", g);
					c.moveEnd("character", b - a);
					try {
						c.select()
					} catch (f) {}
				}
			}
		},
		transData : null,
		transDetect : function () {
			if (this.transData == null) {
				this.transData = {
					transProp : false,
					transEv : null
				};
				var c = {
					MozTransition : "transitionend",
					WebkitTransition : "webkitTransitionEnd",
					OTransition : "oTransitionEnd",
					msTransition : "transitionend",
					transition : "transitionend"
				};
				for (var b in c) {
					if (this.transData.transProp == false && document.documentElement.style[b] != null) {
						this.transData.transProp = b;
						this.transData.transEv = c[b]
					}
				}
				c = null
			}
			return this.transData
		},
		_xmlNodeValue : function (a) {
			var c = "";
			for (var b = 0; b < a.childNodes.length; b++) {
				c += (a.childNodes[b].nodeValue != null ? a.childNodes[b].nodeValue.toString().replace(/^[\n\r\s]{0,}/, "").replace(/[\n\r\s]{0,}$/, "") : "")
			}
			return c
		}
	};
	window.dhx4.isIE = (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0);
	window.dhx4.isIE6 = (window.XMLHttpRequest == null && navigator.userAgent.indexOf("MSIE") >= 0);
	window.dhx4.isIE7 = (navigator.userAgent.indexOf("MSIE 7.0") >= 0 && navigator.userAgent.indexOf("Trident") < 0);
	window.dhx4.isIE8 = (navigator.userAgent.indexOf("MSIE 8.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0);
	window.dhx4.isIE9 = (navigator.userAgent.indexOf("MSIE 9.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0);
	window.dhx4.isIE10 = (navigator.userAgent.indexOf("MSIE 10.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0 && window.navigator.pointerEnabled != true);
	window.dhx4.isIE11 = (navigator.userAgent.indexOf("Trident") >= 0 && window.navigator.pointerEnabled == true);
	window.dhx4.isEdge = (navigator.userAgent.indexOf("Edge") >= 0);
	window.dhx4.isOpera = (navigator.userAgent.indexOf("Opera") >= 0);
	window.dhx4.isChrome = (navigator.userAgent.indexOf("Chrome") >= 0) && !window.dhx4.isEdge;
	window.dhx4.isKHTML = (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent.indexOf("Konqueror") >= 0) && !window.dhx4.isEdge;
	window.dhx4.isFF = (navigator.userAgent.indexOf("Firefox") >= 0);
	window.dhx4.isIPad = (navigator.userAgent.search(/iPad/gi) >= 0);
	window.dhx4.dnd = {
		evs : {},
		p_en : ((window.dhx4.isIE || window.dhx4.isEdge) && (window.navigator.pointerEnabled || window.navigator.msPointerEnabled)),
		_mTouch : function (a) {
			return (window.dhx4.isIE10 && a.pointerType == a.MSPOINTER_TYPE_MOUSE || window.dhx4.isIE11 && a.pointerType == "mouse" || window.dhx4.isEdge && a.pointerType == "mouse")
		},
		_touchOn : function (a) {
			if (a == null) {
				a = document.body
			}
			a.style.touchAction = a.style.msTouchAction = "";
			a = null
		},
		_touchOff : function (a) {
			if (a == null) {
				a = document.body
			}
			a.style.touchAction = a.style.msTouchAction = "none";
			a = null
		}
	};
	if (window.navigator.pointerEnabled == true) {
		window.dhx4.dnd.evs = {
			start : "pointerdown",
			move : "pointermove",
			end : "pointerup"
		}
	} else {
		if (window.navigator.msPointerEnabled == true) {
			window.dhx4.dnd.evs = {
				start : "MSPointerDown",
				move : "MSPointerMove",
				end : "MSPointerUp"
			}
		} else {
			if (typeof(window.addEventListener) != "undefined") {
				window.dhx4.dnd.evs = {
					start : "touchstart",
					move : "touchmove",
					end : "touchend"
				}
			}
		}
	}
}
if (typeof(window.dhx4.template) == "undefined") {
	window.dhx4.trim = function (a) {
		return String(a).replace(/^\s{1,}/, "").replace(/\s{1,}$/, "")
	};
	window.dhx4.template = function (b, c, a) {
		return b.replace(/#([a-z0-9_-]{1,})(\|([^#]*))?#/gi, function () {
			var g = arguments[1];
			var f = window.dhx4.trim(arguments[3]);
			var h = null;
			var e = [c[g]];
			if (f.length > 0) {
				f = f.split(":");
				var d = [];
				for (var i = 0; i < f.length; i++) {
					if (i > 0 && d[d.length - 1].match(/\\$/) != null) {
						d[d.length - 1] = d[d.length - 1].replace(/\\$/, "") + ":" + f[i]
					} else {
						d.push(f[i])
					}
				}
				h = d[0];
				for (var i = 1; i < d.length; i++) {
					e.push(d[i])
				}
			}
			if (typeof(h) == "string" && typeof(window.dhx4.template[h]) == "function") {
				return window.dhx4.template[h].apply(window.dhx4.template, e)
			}
			if (g.length > 0 && typeof(c[g]) != "undefined") {
				if (a == true) {
					return window.dhx4.trim(c[g])
				}
				return String(c[g])
			}
			return ""
		})
	};
	window.dhx4.template.date = function (a, b) {
		if (a != null) {
			if (a instanceof Date) {
				return window.dhx4.date2str(a, b)
			} else {
				a = a.toString();
				if (a.match(/^\d*$/) != null) {
					return window.dhx4.date2str(new Date(parseInt(a)), b)
				}
				return a
			}
		}
		return ""
	};
	window.dhx4.template.maxlength = function (b, a) {
		return String(b).substr(0, a)
	};
	window.dhx4.template.number_format = function (d, e, c, a) {
		var b = window.dhx4.template._parseFmt(e, c, a);
		if (b == false) {
			return d
		}
		return window.dhx4.template._getFmtValue(d, b)
	};
	window.dhx4.template.lowercase = function (a) {
		if (typeof(a) == "undefined" || a == null) {
			a = ""
		}
		return String(a).toLowerCase()
	};
	window.dhx4.template.uppercase = function (a) {
		if (typeof(a) == "undefined" || a == null) {
			a = ""
		}
		return String(a).toUpperCase()
	};
	window.dhx4.template._parseFmt = function (h, c, a) {
		var d = h.match(/^([^\.\,0-9]*)([0\.\,]*)([^\.\,0-9]*)/);
		if (d == null || d.length != 4) {
			return false
		}
		var b = {
			i_len : false,
			i_sep : (typeof(c) == "string" ? c : ","),
			d_len : false,
			d_sep : (typeof(a) == "string" ? a : "."),
			s_bef : (typeof(d[1]) == "string" ? d[1] : ""),
			s_aft : (typeof(d[3]) == "string" ? d[3] : "")
		};
		var g = d[2].split(".");
		if (g[1] != null) {
			b.d_len = g[1].length
		}
		var e = g[0].split(",");
		if (e.length > 1) {
			b.i_len = e[e.length - 1].length
		}
		return b
	};
	window.dhx4.template._getFmtValue = function (value, fmt) {
		var r = String(value).match(/^(-)?([0-9]{1,})(\.([0-9]{1,}))?$/);
		if (r != null && r.length == 5) {
			var v0 = "";
			if (r[1] != null) {
				v0 += r[1]
			}
			v0 += fmt.s_bef;
			if (fmt.i_len !== false) {
				var i = 0;
				var v1 = "";
				for (var q = r[2].length - 1; q >= 0; q--) {
					v1 = "" + r[2].charAt(q) + v1;
					if (++i == fmt.i_len && q > 0) {
						v1 = fmt.i_sep + v1;
						i = 0
					}
				}
				v0 += v1
			} else {
				v0 += r[2]
			}
			if (fmt.d_len !== false) {
				if (r[4] == null) {
					r[4] = ""
				}
				while (r[4].length < fmt.d_len) {
					r[4] += "0"
				}
				eval("dhx4.temp = new RegExp(/\\d{" + fmt.d_len + "}/);");
				var t1 = (r[4]).match(dhx4.temp);
				if (t1 != null) {
					v0 += fmt.d_sep + t1
				}
				dhx4.temp = t1 = null
			}
			v0 += fmt.s_aft;
			return v0
		}
		return value
	}
}
if (typeof(window.dhx4.ajax) == "undefined") {
	window.dhx4.ajax = {
		cache : false,
		method : "get",
		parse : function (a) {
			if (typeof a !== "string") {
				return a
			}
			a = a.replace(/^[\s]+/, "");
			if (window.DOMParser && !dhx4.isIE) {
				var b = (new window.DOMParser()).parseFromString(a, "text/xml")
			} else {
				if (window.ActiveXObject !== window.undefined) {
					var b = new window.ActiveXObject("Microsoft.XMLDOM");
					b.async = "false";
					b.loadXML(a)
				}
			}
			return b
		},
		xmltop : function (a, d, c) {
			if (typeof d.status == "undefined" || d.status < 400) {
				xml = (!d.responseXML) ? dhx4.ajax.parse(d.responseText || d) : (d.responseXML || d);
				if (xml && xml.documentElement !== null) {
					try {
						if (!xml.getElementsByTagName("parsererror").length) {
							return xml.getElementsByTagName(a)[0]
						}
					} catch (b) {}
				}
			}
			if (c !== -1) {
				dhx4.callEvent("onLoadXMLError", ["Incorrect XML", arguments[1], c])
			}
			return document.createElement("DIV")
		},
		xpath : function (c, a) {
			if (!a.nodeName) {
				a = a.responseXML || a
			}
			if (dhx4.isIE) {
				try {
					return a.selectNodes(c) || []
				} catch (f) {
					return []
				}
			} else {
				var d = [];
				var g;
				var b = (a.ownerDocument || a).evaluate(c, a, null, XPathResult.ANY_TYPE, null);
				while (g = b.iterateNext()) {
					d.push(g)
				}
				return d
			}
		},
		query : function (a) {
			dhx4.ajax._call((a.method || "GET"), a.url, a.data || "", (a.async || true), a.callback, null, a.headers)
		},
		get : function (a, b) {
			return this._call("GET", a, null, true, b)
		},
		getSync : function (a) {
			return this._call("GET", a, null, false)
		},
		put : function (b, a, c) {
			return this._call("PUT", b, a, true, c)
		},
		del : function (b, a, c) {
			return this._call("DELETE", b, a, true, c)
		},
		post : function (b, a, c) {
			if (arguments.length == 1) {
				a = ""
			} else {
				if (arguments.length == 2 && (typeof(a) == "function" || typeof(window[a]) == "function")) {
					c = a;
					a = ""
				} else {
					a = String(a)
				}
			}
			return this._call("POST", b, a, true, c)
		},
		postSync : function (b, a) {
			a = (a == null ? "" : String(a));
			return this._call("POST", b, a, false)
		},
		getLong : function (a, b) {
			this._call("GET", a, null, true, b, {
				url : a
			})
		},
		postLong : function (b, a, c) {
			if (arguments.length == 2 && (typeof(a) == "function" || typeof(window[a]))) {
				c = a;
				a = ""
			}
			this._call("POST", b, a, true, c, {
				url : b,
				postData : a
			})
		},
		_call : function (a, b, c, e, g, j, d) {
			var i = (window.XMLHttpRequest && !dhx4.isIE ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
			var f = (navigator.userAgent.match(/AppleWebKit/) != null && navigator.userAgent.match(/Qt/) != null && navigator.userAgent.match(/Safari/) != null);
			if (e == true) {
				i.onreadystatechange = function () {
					if ((i.readyState == 4) || (f == true && i.readyState == 3)) {
						if (i.status != 200 || i.responseText == "") {
							if (!dhx4.callEvent("onAjaxError", [{
											xmlDoc : i,
											filePath : b,
											async : e
										}
									])) {
								return
							}
						}
						window.setTimeout(function () {
							if (typeof(g) == "function") {
								g.apply(window, [{
											xmlDoc : i,
											filePath : b,
											async : e
										}
									])
							}
							if (j != null) {
								if (typeof(j.postData) != "undefined") {
									dhx4.ajax.postLong(j.url, j.postData, g)
								} else {
									dhx4.ajax.getLong(j.url, g)
								}
							}
							g = null;
							i = null
						}, 1)
					}
				}
			}
			if (a == "GET") {
				b += this._dhxr(b)
			}
			i.open(a, b, e);
			if (d != null) {
				for (var h in d) {
					i.setRequestHeader(h, d[h])
				}
			} else {
				if (a == "POST" || a == "PUT" || a == "DELETE") {
					i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
				} else {
					if (a == "GET") {
						c = null
					}
				}
			}
			i.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			i.send(c);
			if (e != true) {
				if ((i.readyState == 4) || (f == true && i.readyState == 3)) {
					if (i.status != 200 || i.responseText == "") {
						dhx4.callEvent("onAjaxError", [{
									xmlDoc : i,
									filePath : b,
									async : e
								}
							])
					}
				}
			}
			return {
				xmlDoc : i,
				filePath : b,
				async : e
			}
		},
		_dhxr : function (a, b) {
			if (this.cache != true) {
				if (a.match(/^[\?\&]$/) == null) {
					a = (a.indexOf("?") >= 0 ? "&" : "?")
				}
				if (typeof(b) == "undefined") {
					b = true
				}
				return a + "dhxr" + new Date().getTime() + (b == true ? "=1" : "")
			}
			return ""
		}
	}
}
if (typeof(window.dhx4._enableDataLoading) == "undefined") {
	window.dhx4._enableDataLoading = function (g, c, f, e, h) {
		if (h == "clear") {
			for (var b in g._dhxdataload) {
				g._dhxdataload[b] = null;
				delete g._dhxdataload[b]
			}
			g._loadData = null;
			g._dhxdataload = null;
			g.load = null;
			g.loadStruct = null;
			g = null;
			return
		}
		g._dhxdataload = {
			initObj : c,
			xmlToJson : f,
			xmlRootTag : e,
			onBeforeXLS : null
		};
		g._loadData = function (n, o, q) {
			if (arguments.length == 2) {
				q = o;
				o = null
			}
			var m = null;
			if (arguments.length == 3) {
				q = arguments[2]
			}
			if (typeof(n) == "string") {
				var l = n.replace(/^\s{1,}/, "").replace(/\s{1,}$/, "");
				var u = new RegExp("^<" + this._dhxdataload.xmlRootTag);
				if (u.test(l.replace(/^<\?xml[^\?]*\?>\s*/, ""))) {
					m = dhx4.ajax.parse(n);
					if (m != null) {
						m = this[this._dhxdataload.xmlToJson].apply(this, [m])
					}
				}
				if (m == null && (l.match(/^[\s\S]*{[.\s\S]*}[\s\S]*$/) != null || l.match(/^[\s\S]*\[[.\s\S]*\][\s\S]*$/) != null)) {
					m = dhx4.s2j(l)
				}
				if (m == null) {
					this.callEvent("onXLS", []);
					var j = [];
					if (typeof(this._dhxdataload.onBeforeXLS) == "function") {
						var l = this._dhxdataload.onBeforeXLS.apply(this, [n]);
						if (l != null && typeof(l) == "object") {
							if (l.url != null) {
								n = l.url
							}
							if (l.params != null) {
								for (var r in l.params) {
									j.push(r + "=" + encodeURIComponent(l.params[r]))
								}
							}
						}
					}
					var s = this;
					var i = function (a) {
						var k = null;
						if ((a.xmlDoc.getResponseHeader("Content-Type") || "").search(/xml/gi) >= 0 || (a.xmlDoc.responseText.replace(/^\s{1,}/, "")).match(/^</) != null) {
							k = s[s._dhxdataload.xmlToJson].apply(s, [a.xmlDoc.responseXML])
						} else {
							k = dhx4.s2j(a.xmlDoc.responseText)
						}
						if (k != null) {
							s[s._dhxdataload.initObj].apply(s, [k, n])
						}
						s.callEvent("onXLE", []);
						if (q != null) {
							if (typeof(q) == "function") {
								q.apply(s, [])
							} else {
								if (typeof(window[q]) == "function") {
									window[q].apply(s, [])
								}
							}
						}
						i = q = null;
						k = a = s = null
					};
					j = j.join("&") + (typeof(o) == "string" ? "&" + o : "");
					if (dhx4.ajax.method == "post") {
						dhx4.ajax.post(n, j, i)
					} else {
						if (dhx4.ajax.method == "get") {
							dhx4.ajax.get(n + (j.length > 0 ? (n.indexOf("?") > 0 ? "&" : "?") + j : ""), i)
						}
					}
					return
				}
			} else {
				if (typeof(n.documentElement) == "object" || (typeof(n.tagName) != "undefined" && typeof(n.getElementsByTagName) != "undefined" && n.getElementsByTagName(this._dhxdataload.xmlRootTag).length > 0)) {
					m = this[this._dhxdataload.xmlToJson].apply(this, [n])
				} else {
					m = window.dhx4._copyObj(n)
				}
			}
			if (m != null) {
				this[this._dhxdataload.initObj].apply(this, [m])
			}
			if (q != null) {
				if (typeof(q) == "function") {
					q.apply(this, [])
				} else {
					if (typeof(window[q]) == "function") {
						window[q].apply(this, [])
					}
				}
				q = null
			}
		};
		if (h != null) {
			var d = {
				struct : "loadStruct",
				data : "load"
			};
			for (var b in h) {
				if (h[b] == true) {
					g[d[b]] = function () {
						return this._loadData.apply(this, arguments)
					}
				}
			}
		}
		g = null
	}
}
if (typeof(window.dhx4._eventable) == "undefined") {
	window.dhx4._eventable = function (a, b) {
		if (b == "clear") {
			a.detachAllEvents();
			a.dhxevs = null;
			a.attachEvent = null;
			a.detachEvent = null;
			a.checkEvent = null;
			a.callEvent = null;
			a.detachAllEvents = null;
			a = null;
			return
		}
		a.dhxevs = {
			data : {}
		};
		a.attachEvent = function (c, e) {
			c = String(c).toLowerCase();
			if (!this.dhxevs.data[c]) {
				this.dhxevs.data[c] = {}
			}
			var d = window.dhx4.newId();
			this.dhxevs.data[c][d] = e;
			return d
		};
		a.detachEvent = function (f) {
			for (var d in this.dhxevs.data) {
				var e = 0;
				for (var c in this.dhxevs.data[d]) {
					if (c == f) {
						this.dhxevs.data[d][c] = null;
						delete this.dhxevs.data[d][c]
					} else {
						e++
					}
				}
				if (e == 0) {
					this.dhxevs.data[d] = null;
					delete this.dhxevs.data[d]
				}
			}
		};
		a.checkEvent = function (c) {
			c = String(c).toLowerCase();
			return (this.dhxevs.data[c] != null)
		};
		a.callEvent = function (d, f) {
			d = String(d).toLowerCase();
			if (this.dhxevs.data[d] == null) {
				return true
			}
			var e = true;
			for (var c in this.dhxevs.data[d]) {
				e = this.dhxevs.data[d][c].apply(this, f) && e
			}
			return e
		};
		a.detachAllEvents = function () {
			for (var d in this.dhxevs.data) {
				for (var c in this.dhxevs.data[d]) {
					this.dhxevs.data[d][c] = null;
					delete this.dhxevs.data[d][c]
				}
				this.dhxevs.data[d] = null;
				delete this.dhxevs.data[d]
			}
		};
		a = null
	};
	dhx4._eventable(dhx4)
}
function dhtmlXVaultObject(j) {
	var h = this;
	this.conf = {
		version : "2.5",
		skin : (j.skin || window.dhx4.skin || (typeof(dhtmlx) != "undefined" ? dhtmlx.skin : null) || window.dhx4.skinDetect("dhxvault") || "material"),
		param_name : (typeof(j.paramName) != "undefined" ? j.paramName : "file"),
		engine : null,
		list : "list_default",
		url : j.uploadUrl || "",
		download_url : (j.downloadUrl || ""),
		multiple_files : (typeof(j.multiple) != "undefined" ? j.multiple == true : true),
		swf_file : j.swfPath || "",
		swf_url : j.swfUrl || "",
		swf_logs : j.swfLogs || "no",
		sl_xap : j.slXap,
		sl_url : j.slUrl,
		sl_logs : j.slLogs,
		enabled : true,
		auto_start : (typeof(j.autoStart) != "undefined" ? j.autoStart == true : true),
		auto_remove : (typeof(j.autoRemove) != "undefined" ? j.autoRemove == true : false),
		files_added : 0,
		uploaded_count : 0,
		files_limit : (typeof(j.filesLimit) != "undefined" ? j.filesLimit : 0),
		max_file_size : parseInt(j.maxFileSize) || 0,
		buttons : {
			upload : (typeof(j.buttonUpload) != "undefined" ? (j.buttonUpload == true) : false),
			clear : (typeof(j.buttonClear) != "undefined" ? (j.buttonClear == true) : true)
		},
		ofs : {
			dhx_skyblue : 5,
			dhx_web : 7,
			dhx_terrace : 10,
			bootstrap : 10,
			material : 7
		},
		uploaded_state : {},
		uploaded_files : {},
		progress_mode : "percent",
		icon_def : "",
		icons : {}
	};
	this.list = new this[this.conf.list]();
	this.conf.icon_def = this.icon_def;
	for (var l in this.icons) {
		for (var b = 0; b < this.icons[l].length; b++) {
			this.conf.icons[this.icons[l][b]] = l
		}
	}
	if (typeof(j.mode) == "string" && typeof(this[j.mode]) == "function") {
		this.conf.engine = j.mode
	} else {
		this.conf.engine = "html4";
		var g = null;
		if (typeof(window.FormData) != "undefined" && typeof(window.XMLHttpRequest) != "undefined") {
			g = new XMLHttpRequest();
			if (typeof(g.upload) == "undefined") {
				g = null
			}
		}
		if (g != null) {
			this.conf.engine = "html5"
		} else {
			if (typeof(window.swfobject) != "undefined" || g === false) {
				var g = swfobject.getFlashPlayerVersion();
				if (g.major >= 10) {
					this.conf.engine = "flash"
				}
			} else {
				this.conf.sl_v = this.getSLVersion();
				if (this.conf.sl_v) {
					this.conf.engine = "sl"
				}
			}
		}
		g = null
	}
	var c = (typeof(j.parent) != "undefined" ? j.parent : j.container);
	c = (typeof(c) == "string" ? document.getElementById(c) : c);
	j.parent = j.container = null;
	if (c._attach_mode == true) {
		this.base = c
	} else {
		this.base = document.createElement("DIV");
		c.appendChild(this.base)
	}
	this.base.className += " dhx_vault_" + this.conf.skin;
	if (c._no_border == true) {
		this.base.style.border = "0px solid white"
	}
	c = j = null;
	this.p_controls = document.createElement("DIV");
	this.p_controls.className = "dhx_vault_controls";
	this.base.appendChild(this.p_controls);
	this.p_controls.onselectstart = function (a) {
		a = a || event;
		if (a.preventDefault) {
			a.preventDefault()
		} else {
			a.returnValue = false
		}
		return false
	};
	this.p_files = document.createElement("DIV");
	this.p_files.className = "dhx_vault_files";
	this.base.appendChild(this.p_files);
	this.p_files.ondragstart = function (k) {
		k = k || event;
		var a = k.target || k.srcElement;
		if (a.tagName != null && a.tagName.toLowerCase() == "a") {
			if (k.preventDefault) {
				k.preventDefault()
			} else {
				k.returnValue = false
			}
			return false
		}
	};
	this._doOnFilesClick = function (m) {
		m = m || event;
		var a = m.target || m.srcElement;
		var k = null;
		while (a != h.p_files && k == null) {
			if (k == null && a != null && a._action != null) {
				k = a._action
			} else {
				a = a.parentNode
			}
		}
		if (k == null) {
			return
		}
		if (k.data == "delete_file" && h.conf.enabled == true) {
			h._removeFileFromQueue(k.id)
		}
		if (k.data == "download_file" && h.conf.enabled == true) {
			h._doDownloadFile(k.id)
		}
		k = null
	};
	if (typeof(window.addEventListener) == "function") {
		this.p_files.addEventListener("click", this._doOnFilesClick, false)
	} else {
		this.p_files.attachEvent("onclick", this._doOnFilesClick)
	}
	this.file_data = {};
	this._initToolbar = function () {
		this.b_opts = {
			browse : {
				str : "btnAdd",
				onclick : null
			},
			upload : {
				str : "btnUpload",
				onclick : function () {
					if (!h.conf.enabled) {
						return
					}
					if (!h.conf.uploading) {
						h._uploadStart()
					}
				}
			},
			cancel : {
				str : "btnCancel",
				onclick : function () {
					if (!h.conf.enabled) {
						return
					}
					h._uploadStop();
					h._switchButton(false)
				}
			},
			clear : {
				str : "btnClean",
				onclick : function () {
					if (!h.conf.enabled) {
						return
					}
					h.clear()
				},
				css : "float:right!important;"
			}
		};
		this.buttons = {};
		for (var e in this.b_opts) {
			var m = document.createElement("DIV");
			m.innerHTML = "<div class='dhxvault_button_icon dhx_vault_icon_" + e + "'></div><div class='dhxvault_button_text'>" + this.strings[this.b_opts[e].str] + "</div>";
			if (this.b_opts[e].css != null) {
				m.style.cssText += this.b_opts[e].css
			}
			m.className = "dhx_vault_button";
			m._css = m.className;
			m._onclick = this.b_opts[e].onclick;
			m.onmouseover = function () {
				if (h.conf.enabled != true) {
					return
				}
				if (this._hover == true) {
					return
				}
				this._hover = true;
				this.className = this._css + " dhx_vault_button" + this._css_p + "_hover"
			};
			m.onmouseout = function () {
				if (h.conf.enabled != true) {
					return
				}
				if (this._hover != true) {
					return
				}
				this._hover = false;
				this.className = this._css
			};
			m.onmousedown = function () {
				if (h.conf.enabled != true) {
					return
				}
				if (this._hover != true) {
					return
				}
				this._pressed = true;
				this.className = this._css + " dhx_vault_button" + this._css_p + "_pressed"
			};
			m.onmouseup = function (a) {
				if (h.conf.enabled != true) {
					return
				}
				if (this._pressed != true) {
					return
				}
				this._pressed = false;
				this.className = this._css + (this._hover ? " dhx_vault_button" + this._css_p + "_hover" : "");
				if (this._onclick != null) {
					this._onclick()
				}
			};
			if (this.b_opts[e].tooltip) {
				m.title = this.b_opts[e].tooltip
			}
			this.p_controls.appendChild(m);
			this.buttons[e] = m;
			m = null;
			if (e == "upload" || e == "clear") {
				this.buttons[e].style.display = (this.conf.buttons[e] == true ? "" : "none")
			}
			this.b_opts[e].onclick = null;
			this.b_opts[e] = null;
			delete this.b_opts[e]
		}
		this.b_opts = null;
		delete this.b_opts;
		this.buttons.cancel.style.display = "none"
	};
	this._beforeAddFileToList = function (e, k, a) {
		return (this.callEvent("onBeforeFileAdd", [{
						id : null,
						name : e,
						size : k,
						lastModifiedDate : a,
						serverName : null,
						uploaded : false,
						error : false
					}
				]) === true)
	};
	this._addFileToList = function (r, k, m, q, e) {
		var o = this.getFileExtension(k);
		var n = (o.length > 0 ? (this.conf.icons[o.toLowerCase()] || this.conf.icon_def) : this.conf.icon_def);
		var a = false;
		if (q == "added" && typeof(m) == "number" && m > 0 && this.conf.max_file_size > 0 && m > this.conf.max_file_size) {
			q = this.file_data[r].state = "size_exceeded";
			a = true
		}
		this.list.addFileItem(r, this.p_files);
		this.list.renderFileRecord(r, {
			name : k,
			icon : n,
			size : m,
			readableSize : this.readableSize(m || 0),
			state : q,
			progress : e
		});
		if (q == "size_exceeded") {
			this.list.updateFileState(r, {
				state : q,
				str_size_exceeded : window.dhx4.template(this.strings.size_exceeded, {
					size : this.readableSize(this.conf.max_file_size)
				})
			})
		}
		this.callEvent("onFileAdd", [{
					id : r,
					name : k,
					size : m,
					lastModifiedDate : this.file_data[r].file.lastModifiedDate || null,
					serverName : null,
					uploaded : false,
					error : a
				}
			])
	};
	this._removeFileFromList = function (a) {
		this.list.removeFileRecord(a);
		if (this.conf.uploaded_files[a] != null) {
			this.conf.uploaded_files[a] = null;
			delete this.conf.uploaded_files[a]
		}
		if (this.conf.uploaded_state[a] != null) {
			this.conf.uploaded_state[a] = null;
			delete this.conf.uploaded_state[a]
		}
	};
	this._updateFileInList = function (k, e, a) {
		if (this.list.isFileItemExist(k) == false) {
			return
		}
		if (e == "uploading" && this.conf.progress_mode == "eta" && this._etaStart != null) {
			this._etaStart(k)
		}
		this._updateProgress(k, e, a)
	};
	this._updateProgress = function (o, n, e) {
		if (n == "added") {
			this.list.updateFileState(o, {
				state : n
			});
			if (this.conf.progress_mode == "eta" && this._etaEnd != null) {
				this._etaEnd(o)
			}
			return
		}
		if (n == "fail") {
			this.list.updateFileState(o, {
				state : n,
				str_error : this.strings.error
			});
			if (this.conf.progress_mode == "eta" && this._etaEnd != null) {
				this._etaEnd(o)
			}
			return
		}
		if (n == "uploaded") {
			if (this.conf.progress_mode == "eta" && this._etaEnd != null) {
				this._etaEnd(o)
			}
			var m = this.strings.done;
			var a = (this.conf.engine != "html4" ? {}
				 : {
				name : this.file_data[o].name,
				size : this.file_data[o].size,
				readableSize : this.readableSize(this.file_data[o].size || 0)
			});
			window.setTimeout(function () {
				if (h == null) {
					return
				}
				h.list.updateFileState(o, {
					state : "uploaded",
					str_done : m
				});
				a.download = (h.conf.download_url.length > 0);
				h.list.updateFileNameSize(o, a)
			}, 100);
			return
		}
		if (n == "uploading") {
			if ((e < 100 && this.conf.progress_type == "loader") || this.file_data[o].custom == true) {
				this.list.updateFileState(o, {
					state : "uploading_html4"
				})
			} else {
				if (this.conf.progress_mode == "eta") {
					var k = (this._etaCheck != null ? this._etaCheck(o, e) : null);
					this.list.updateFileState(o, {
						state : "uploading",
						progress : e,
						eta : (k == null ? null : "eta: " + k)
					})
				} else {
					if (this.conf.progress_mode == "percent") {
						this.list.updateFileState(o, {
							state : "uploading",
							progress : e,
							eta : e + "%"
						})
					}
				}
			}
		}
	};
	this._removeFilesByState = function (k) {
		for (var e in this.file_data) {
			if (k === true || this.file_data[e].state == k) {
				this._removeFileFromQueue(e)
			}
		}
	};
	this._switchButton = function (n) {
		if (n == true) {
			if (this.conf.buttons.upload == true) {
				this.buttons.upload.style.display = "none";
				this.buttons.cancel.style.display = ""
			}
		} else {
			var k = this.conf.uploaded_count;
			var m = [];
			for (var e in this.conf.uploaded_state) {
				m.push({
					id : e,
					name : this._fileName,
					size : (this.file_data[e] != null ? this.file_data[e].size : null),
					lastModifiedDate : (this.file_data[e] != null ? (this.file_data[e].file.lastModifiedDate || null) : null),
					serverName : (this.conf.uploaded_files[e] ? this.conf.uploaded_files[e].serverName : null),
					uploaded : this.conf.uploaded_state[e],
					error : !this.conf.uploaded_state[e]
				})
			}
			if (this.conf.buttons.upload == true) {
				this.buttons.upload.style.display = "";
				this.buttons.cancel.style.display = "none"
			}
			this.conf.uploaded_count = 0;
			this.conf.uploaded_state = {};
			if (k > 0) {
				this.callEvent("onUploadComplete", [m])
			}
		}
	};
	this._uploadStart = function () {
		this._switchButton(true);
		if (!this.conf.uploading) {
			for (var e in this.file_data) {
				if (this.file_data[e].state == "fail") {
					this.file_data[e].state = "added";
					this._updateFileInList(e, "added", 0)
				}
			}
		}
		this.conf.uploading = true;
		var k = false;
		for (var e in this.file_data) {
			if (!k && [this.file_data[e].state] == "added") {
				k = true;
				this.file_data[e].state = "uploading";
				this._updateFileInList(e, "uploading", 0);
				this._doUploadFile(e)
			}
		}
		if (!k) {
			this.conf.uploading = false;
			this._switchButton(false)
		}
	};
	this._onUploadSuccess = function (n, m, k, a) {
		if (typeof(k) != "undefined" && this.conf.engine == "flash") {
			var e = window.dhx4.s2j(k.data);
			if (e != null && e.state == true && e.name != null) {
				m = e.name;
				if (e.extra != null) {
					a = e.extra
				}
			} else {
				this._onUploadFail(n, (e != null && e.extra != null ? e.extra : null));
				return
			}
		}
		this.conf.uploaded_count++;
		this.conf.uploaded_files[n] = {
			realName : this.file_data[n].name,
			serverName : m
		};
		this.file_data[n].state = "uploaded";
		this.conf.uploaded_state[n] = true;
		this._updateFileInList(n, "uploaded", 100);
		this.callEvent("onUploadFile", [{
					id : n,
					name : this.file_data[n].name,
					size : this.file_data[n].size,
					lastModifiedDate : this.file_data[n].file.lastModifiedDate || null,
					serverName : m,
					uploaded : true,
					error : false
				}, a]);
		if (this.conf.auto_remove) {
			this._removeFileFromQueue(n)
		}
		if (this.conf.uploading) {
			this._uploadStart()
		}
	};
	this._onUploadFail = function (e, a) {
		this.file_data[e].state = "fail";
		this._updateFileInList(e, "fail", 0);
		this.conf.uploaded_state[e] = false;
		this.callEvent("onUploadFail", [{
					id : e,
					name : this.file_data[e].name,
					size : this.file_data[e].size,
					lastModifiedDate : this.file_data[e].file.lastModifiedDate || null,
					serverName : null,
					uploaded : false,
					error : true
				}, a]);
		if (this.conf.uploading) {
			this._uploadStart()
		}
	};
	this._onUploadAbort = function (a) {
		this.conf.uploading = false;
		this.file_data[a].state = "added";
		this._updateFileInList(a, "added", 0);
		this.callEvent("onUploadCancel", [{
					id : a,
					name : this.file_data[a].name,
					size : this.file_data[a].size,
					lastModifiedDate : this.file_data[a].file.lastModifiedDate,
					serverName : null,
					uploaded : false,
					error : false
				}
			])
	};
	this.unload = function () {
		this.callEvent = function () {
			return true
		};
		if (typeof(window.addEventListener) == "function") {
			this.p_files.removeEventListener("click", this._doOnFilesClick, false)
		} else {
			this.p_files.detachEvent("onclick", this._doOnFilesClick)
		}
		this._removeFilesByState(true);
		this.conf.uploaded_files = null;
		this.file_data = null;
		this._unloadEngine();
		this.list.unload();
		this.list = null;
		this.icons = null;
		for (var e in this.buttons) {
			this.buttons[e].onclick = null;
			this.buttons[e].onmouseover = null;
			this.buttons[e].onmouseout = null;
			this.buttons[e].onmousedown = null;
			this.buttons[e].onmouseup = null;
			this.buttons[e]._onclick = null;
			this.buttons[e].parentNode.removeChild(this.buttons[e]);
			this.buttons[e] = null;
			delete this.buttons[e]
		}
		this.buttons = null;
		this.p_controls.onselectstart = null;
		this.p_controls.parentNode.removeChild(this.p_controls);
		this.p_controls = null;
		this.p_files.ondragstart = null;
		this.p_files.parentNode.removeChild(this.p_files);
		this.p_files = null;
		window.dhx4._eventable(this, "clear");
		this.callEvent = null;
		for (var e in this.conf) {
			this.conf[e] = null;
			delete this.conf[e]
		}
		this.conf = null;
		this.strings = null;
		for (var e in this) {
			if (typeof(this[e]) == "function") {
				this[e] = null
			}
		}
		if (this.base._attach_mode != true) {
			this.base.parentNode.removeChild(this.base)
		}
		this.base = null;
		h = e = null
	};
	var i = new this[this.conf.engine]();
	for (var l in i) {
		this[l] = i[l];
		i[l] = null
	}
	l = i = p = null;
	this._initToolbar();
	this._initEngine();
	this.setSkin(this.conf.skin);
	window.dhx4._eventable(this);
	this.attachEvent("onFileAdd", function () {
		this.conf.files_added++
	});
	this.attachEvent("onBeforeFileAdd", function () {
		if (this.conf.files_limit == 0) {
			return true
		}
		return (this.conf.files_added < this.conf.files_limit)
	});
	if (window.dhx4.isIE7 || navigator.userAgent.indexOf("MSIE 7.0") >= 0) {
		var f = this;
		window.setTimeout(function () {
			f.setSizes();
			f = null
		}, 1)
	}
	var d = function (e) {
		var a = window.dhx4.s2j(e.xmlDoc.responseText);
		if (a != null && a.maxFileSize != null && h.conf.max_file_size == 0) {
			h.conf.max_file_size = (parseInt(a.maxFileSize) || 0)
		}
		a = e = d = null
	};
	if (window.dhx4.ajax.method == "post") {
		window.dhx4.ajax.post(this.conf.url, "mode=conf", d)
	} else {
		window.dhx4.ajax.get(this.conf.url + (this.conf.url.indexOf("?") > 0 ? "&" : "?") + "mode=conf", d)
	}
	return this
}
dhtmlXVaultObject.prototype.readableSize = function (d) {
	var c = false;
	var a = ["b", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb"];
	for (var e = 0; e < a.length; e++) {
		if (d > 1024) {
			d = d / 1024
		} else {
			if (c === false) {
				c = e
			}
		}
	}
	if (c === false) {
		c = a.length - 1
	}
	return Math.round(d * 100) / 100 + " " + a[c]
};
dhtmlXVaultObject.prototype.icon_def = "icon_def";
dhtmlXVaultObject.prototype.icons = {
	icon_image : ["jpg", "jpeg", "gif", "png", "bmp", "tiff", "pcx", "svg", "ico"],
	icon_psd : ["psd"],
	icon_video : ["avi", "mpg", "mpeg", "rm", "move", "mov", "mkv", "flv", "f4v", "mp4", "3gp"],
	icon_audio : ["wav", "aiff", "au", "mp3", "aac", "wma", "ogg", "flac", "ape", "wv", "m4a", "mid", "midi"],
	icon_arch : ["rar", "zip", "tar", "tgz", "arj", "gzip", "bzip2", "7z", "ace", "apk", "deb"],
	icon_text : ["txt", "nfo", "djvu", "xml"],
	icon_html : ["htm", "html"],
	icon_doc : ["doc", "docx", "rtf", "odt"],
	icon_xls : ["xls", "xlsx"],
	icon_pdf : ["pdf", "ps"],
	icon_exe : ["exe"],
	icon_dmg : ["dmg"]
};
dhtmlXVaultObject.prototype.upload = function () {
	if (!this.conf.uploading) {
		this._uploadStart()
	}
};
dhtmlXVaultObject.prototype.setAutoStart = function (a) {
	this.conf.auto_start = (a == true)
};
dhtmlXVaultObject.prototype.setAutoRemove = function (a) {
	this.conf.auto_remove = (a == true)
};
dhtmlXVaultObject.prototype.setURL = function (a) {
	this.conf.url = a
};
dhtmlXVaultObject.prototype.setDownloadURL = function (c) {
	this.conf.download_url = c || "";
	for (var b in this.conf.uploaded_files) {
		this.list.updateFileNameSize(b, {
			download : (this.conf.download_url.length > 0)
		})
	}
};
dhtmlXVaultObject.prototype._buildDownloadUrl = function (b) {
	var a = null;
	if (this.conf.download_url.length > 0 && this.conf.uploaded_files[b] != null) {
		var a = String(this.conf.download_url).replace(/\{serverName\}/g, encodeURIComponent(this.conf.uploaded_files[b].serverName));
		a += window.dhx4.ajax._dhxr(a)
	}
	return a
};
dhtmlXVaultObject.prototype._doDownloadFile = function (b) {
	if (!this._dframe) {
		this._dframe = document.createElement("IFRAME");
		this._dframe.className = "dhxvault_dframe";
		this._dframe.border = this._dframe.frameBorder = 0;
		this.conf.df_name = this._dframe.name = "dhxvault_dframe_" + window.dhx4.newId();
		document.body.appendChild(this._dframe)
	}
	var a = document.createElement("FORM");
	a.method = "POST";
	a.target = this.conf.df_name;
	a.action = this._buildDownloadUrl(b);
	document.body.appendChild(a);
	a.submit();
	window.setTimeout(function () {
		document.body.removeChild(a);
		a = null
	}, 1)
};
dhtmlXVaultObject.prototype.enable = function () {
	if (this.conf.enabled == true) {
		return
	}
	this.conf.enabled = true;
	this.base.className = String(this.base.className).replace(/\s{0,}dhx_vault_dis/gi, "");
	if (this.conf.engine == "flash") {
		document.getElementById(this.conf.swf_obj_id).style.display = ""
	}
};
dhtmlXVaultObject.prototype.disable = function () {
	if (this.conf.enabled != true) {
		return
	}
	this.conf.enabled = false;
	this.base.className += " dhx_vault_dis";
	if (this.conf.engine == "flash") {
		document.getElementById(this.conf.swf_obj_id).style.display = "none"
	}
};
dhtmlXVaultObject.prototype.setWidth = function (a) {
	if (this.base._attach_mode == true) {
		return
	}
	this.base.parentNode.style.width = a + "px";
	this.setSizes()
};
dhtmlXVaultObject.prototype.setHeight = function (a) {
	if (this.base._attach_mode == true) {
		return
	}
	this.base.parentNode.style.height = a + "px";
	this.setSizes()
};
dhtmlXVaultObject.prototype.setFilesLimit = function (a) {
	this.conf.files_added = 0;
	this.conf.files_limit = a
};
dhtmlXVaultObject.prototype.getStatus = function () {
	var c = 0;
	for (var b in this.file_data) {
		if (this.file_data[b].state != "uploaded") {
			return -1
		}
		c = 1
	}
	return c
};
dhtmlXVaultObject.prototype.getData = function () {
	var c = [];
	for (var b in this.conf.uploaded_files) {
		c.push({
			id : b,
			name : this.file_data[b].name,
			size : this.file_data[b].size,
			serverName : this.conf.uploaded_files[b].serverName,
			uploaded : true,
			error : false
		})
	}
	return c
};
dhtmlXVaultObject.prototype.clear = function () {
	if (this.callEvent("onBeforeClear", []) !== true) {
		return
	}
	if (this.conf.uploading) {
		this._uploadStop()
	}
	this._switchButton(false);
	this._removeFilesByState(true);
	this.callEvent("onClear", [])
};
dhtmlXVaultObject.prototype.setSkin = function (c) {
	if (c != this.conf.skin) {
		this.base.className = String(this.base.className).replace(new RegExp("s{0,}dhx_vault_" + this.conf.skin), " dhx_vault_" + c);
		this.conf.skin = c
	}
	this._updateBttonsSkin();
	var b = this.conf.ofs[this.conf.skin];
	this.buttons.browse.style.marginLeft = b + "px";
	this.buttons.upload.style.marginLeft = (c == "dhx_terrace" ? "-1px" : b + "px");
	this.buttons.cancel.style.marginLeft = this.buttons.upload.style.marginLeft;
	this.buttons.clear.style.marginRight = b + "px";
	var a = "";
	if (c == "dhx_terrace") {
		a = (this.conf.buttons.upload == true) ? "0px" : "3px"
	}
	this.buttons.browse.style.borderTopRightRadius = a;
	this.buttons.browse.style.borderBottomRightRadius = a;
	this.buttons.upload.style.borderTopLeftRadius = a;
	this.buttons.upload.style.borderBottomLeftRadius = a;
	this.buttons.cancel.style.borderTopLeftRadius = this.buttons.upload.style.borderTopLeftRadius;
	this.buttons.cancel.style.borderBottomLeftRadius = this.buttons.upload.style.borderBottomLeftRadius;
	this.setSizes()
};
dhtmlXVaultObject.prototype._updateBttonsSkin = function () {
	for (var b in this.buttons) {
		var c = "dhx_vault_button";
		var d = "";
		if (this.buttonCss != null && this.buttonCss[this.conf.skin] != null && this.buttonCss[this.conf.skin][b] != null) {
			d = this.buttonCss[this.conf.skin][b];
			c += d
		}
		this.buttons[b]._css = this.buttons[b].className = c;
		this.buttons[b]._css_p = d
	}
};
dhtmlXVaultObject.prototype.setSizes = function () {
	var a = this.base.offsetWidth - (this.base.clientWidth || this.base.scrollWidth);
	var b = this.base.offsetHeight - this.base.clientHeight;
	if (this.base._attach_mode != true) {
		this.base.style.width = Math.max(0, this.base.parentNode.clientWidth - a) + "px";
		this.base.style.height = Math.max(0, this.base.parentNode.clientHeight - b) + "px"
	}
	var c = this.conf.ofs[this.conf.skin];
	this.p_files.style.top = this.p_controls.offsetHeight + "px";
	this.p_files.style.left = c + "px";
	if (!this.conf.ofs_f) {
		this.p_files.style.width = "100px";
		this.p_files.style.height = "100px";
		this.conf.ofs_f = {
			w : this.p_files.offsetWidth - this.p_files.clientWidth,
			h : this.p_files.offsetHeight - this.p_files.clientHeight
		}
	}
	this.p_files.style.width = Math.max(this.base.clientWidth - c * 2 - this.conf.ofs_f.w, 0) + "px";
	this.p_files.style.height = Math.max(this.base.clientHeight - this.p_controls.offsetHeight - c - this.conf.ofs_f.h, 0) + "px";
	if (typeof(this.callEvent) == "function") {
		this.callEvent("_onSetSizes", [])
	}
};
dhtmlXVaultObject.prototype.getFileExtension = function (b) {
	var c = "";
	var a = String(b).match(/\.([^\.\s]*)$/i);
	if (a != null) {
		c = a[1]
	}
	return c
};
dhtmlXVaultObject.prototype.strings = {
	done : "Done",
	error : "Error",
	size_exceeded : "Filesize exceeded (max #size#)",
	btnAdd : "Add files",
	btnUpload : "Upload",
	btnClean : "Clear all",
	btnCancel : "Cancel"
};
dhtmlXVaultObject.prototype.setStrings = function (e) {
	for (var b in e) {
		this.strings[b] = e[b]
	}
	for (var b in this.file_data) {
		var d = this.file_data[b].state;
		if (d == "uploaded" || d == "fail" || d == "size_exceeded") {
			this.list.updateFileState(b, {
				state : d,
				str_error : this.strings.error,
				str_done : this.strings.done,
				str_size_exceeded : window.dhx4.template(this.strings.size_exceeded, {
					size : this.readableSize(this.conf.max_file_size)
				})
			})
		}
		if (d == "uploaded") {
			this.list.updateFileNameSize(b, {
				download : (this.conf.download_url.length > 0)
			})
		}
	}
	var c = {
		browse : "btnAdd",
		upload : "btnUpload",
		clear : "btnClean",
		cancel : "btnCancel"
	};
	for (var b in c) {
		this.buttons[b].childNodes[1].innerHTML = this.strings[c[b]]
	}
};
dhtmlXVaultObject.prototype.setMaxFileSize = function (a) {
	this.conf.max_file_size = (parseInt(a) || 0)
};
dhtmlXVaultObject.prototype.getMaxFileSize = function () {
	return this.conf.max_file_size
};
dhtmlXVaultObject.prototype.html5 = function () {};
dhtmlXVaultObject.prototype.html5.prototype = {
	_initEngine : function () {
		var c = this;
		this.buttons.browse.onclick = function () {
			if (c.conf.enabled) {
				c.f.click()
			}
		};
		this.conf.progress_type = "percentage";
		this.conf.dnd_enabled = true;
		var a = window.navigator.userAgent;
		var b = true;
		if (a.match(/Windows/gi) != null && a.match(/AppleWebKit/gi) != null && a.match(/Safari/gi) != null) {
			if (a.match(/Version\/5\.1\.5/gi)) {
				this.conf.multiple_files = false
			}
			if (a.match(/Version\/5\.1[^\.\d{1,}]/gi)) {
				this.conf.dnd_enabled = false
			}
			if (a.match(/Version\/5\.1\.1/gi)) {
				this.conf.multiple_files = false;
				this.conf.dnd_enabled = false
			}
			if (a.match(/Version\/5\.1\.2/gi)) {
				this.conf.dnd_enabled = false
			}
			if (a.match(/Version\/5\.1\.7/gi)) {
				this.conf.multiple_files = false
			}
		}
		this._addFileInput();
		if (this.conf.dnd_enabled && this._initDND != null) {
			this._initDND()
		}
	},
	_addFileInput : function () {
		if (this.f != null) {
			this.f.onchange = null;
			this.f.parentNode.removeChild(this.f);
			this.f = null
		}
		var a = this;
		this.f = document.createElement("INPUT");
		this.f.type = "file";
		if (this.conf.multiple_files) {
			this.f.multiple = "1"
		}
		this.f.className = "dhx_vault_input";
		this.p_controls.appendChild(this.f);
		this.f.onchange = function () {
			a._parseFilesInInput(this.files);
			if (window.dhx4.isOpera || window.dhx4.isIE10) {
				a._addFileInput()
			} else {
				this.value = ""
			}
		}
	},
	_doUploadFile : function (c) {
		if (this.file_data[c].custom == true) {
			this._cfUploadStart(c);
			return
		}
		var b = this;
		if (!this.loader) {
			this.loader = new XMLHttpRequest();
			this.loader.upload.onprogress = function (d) {
				if (b.file_data[this._idd].state == "uploading") {
					b._updateFileInList(this._idd, "uploading", Math.round(d.loaded * 100 / d.total))
				}
			};
			this.loader.onload = function (f) {
				var d = window.dhx4.s2j(this.responseText);
				if (d != null && typeof(d) == "object" && typeof(d.state) != "undefined" && d.state == true) {
					b._onUploadSuccess(this.upload._idd, d.name, null, d.extra)
				} else {
					b._onUploadFail(this.upload._idd, (d != null && d.extra != null ? d.extra : null))
				}
				d = null
			};
			this.loader.onerror = function (d) {
				b._onUploadFail(this.upload._idd)
			};
			this.loader.onabort = function (d) {
				b._onUploadAbort(this.upload._idd)
			}
		}
		this.loader.upload._idd = c;
		var a = new FormData();
		a.append("mode", "html5");
		if (this.file_data[c].size == 0 && (navigator.userAgent.indexOf("MSIE") > 0 || navigator.userAgent.indexOf("Trident") > 0)) {
			a.append("file_name", String(this.file_data[c].name));
			a.append("zero_size", "1")
		} else {
			a.append(this.conf.param_name, this.file_data[c].file)
		}
		if (window.dhx4.ajax.cache != true) {
			a.append("dhxr" + new Date().getTime(), "1")
		}
		this.loader.open("POST", this.conf.url, true);
		this.loader.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		this.loader.send(a)
	},
	_uploadStop : function () {
		if (!this.conf.uploading) {
			return
		}
		if (this.cf_loader_id != null) {
			this._cfUploadStop()
		} else {
			if (this.loader != null) {
				this.loader.abort()
			}
		}
	},
	_parseFilesInInput : function (b) {
		for (var a = 0; a < b.length; a++) {
			this._addFileToQueue(b[a])
		}
	},
	_addFileToQueue : function (a) {
		if (!this._beforeAddFileToList(a.name, a.size, a.lastModifiedDate)) {
			return
		}
		var b = (a._idd || window.dhx4.newId());
		this.file_data[b] = {
			file : a,
			name : a.name,
			size : a.size,
			state : "added"
		};
		this._addFileToList(b, a.name, a.size, "added", 0);
		if (this.conf.auto_start && !this.conf.uploading) {
			this._uploadStart(true)
		}
	},
	_removeFileFromQueue : function (e) {
		if (!this.file_data[e]) {
			return
		}
		var c = this.file_data[e].name;
		var d = (this.conf.uploaded_files != null && this.conf.uploaded_files[e] != null ? this.conf.uploaded_files[e].serverName : null);
		var b = {
			id : Number(e),
			name : c,
			size : this.file_data[e].size,
			serverName : d,
			uploaded : (this.file_data[e].state == "uploaded"),
			error : (this.file_data[e].state == "fail")
		};
		if (this.callEvent("onBeforeFileRemove", [b]) !== true) {
			return
		}
		var a = false;
		if (this.cf_loader_id != null || (this.conf.uploading && this.loader != null && e == this.loader.upload._idd && this.file_data[e].state == "uploading")) {
			this._uploadStop();
			a = true
		}
		this.file_data[e].file = null;
		this.file_data[e].name = null;
		this.file_data[e].size = null;
		this.file_data[e].state = null;
		this.file_data[e] = null;
		delete this.file_data[e];
		this._removeFileFromList(e);
		this.callEvent("onFileRemove", [b]);
		if (a) {
			this._uploadStart()
		}
	},
	_unloadEngine : function () {
		this.buttons.browse.onclick = null;
		if (this.conf.dnd_enabled && this._unloadDND != null) {
			this._unloadDND()
		}
		this.f.onchange = null;
		this.f.parentNode.removeChild(this.f);
		this.f = null;
		if (this.loader) {
			this.loader.upload.onprogress = null;
			this.loader.onload = null;
			this.loader.onerror = null;
			this.loader.onabort = null;
			this.loader.upload._idd = null;
			this.loader = null
		}
		this._initEngine = null;
		this._doUploadFile = null;
		this._uploadStop = null;
		this._parseFilesInInput = null;
		this._addFileToQueue = null;
		this._removeFileFromQueue = null;
		this._unloadEngine = null
	}
};
dhtmlXVaultObject.prototype.html4 = function () {};
dhtmlXVaultObject.prototype.html4.prototype = {
	_initEngine : function () {
		this._addForm();
		this.conf.progress_type = "loader";
		if (window.dhx4.isIE6 || window.dhx4.isIE7) {
			this.buttons.browse.style.filter = ""
		}
	},
	_addForm : function () {
		var a = this;
		if (!this.k) {
			this.k = document.createElement("DIV");
			this.k.className = "dhx_vault_file_form_cont";
			this.buttons.browse.appendChild(this.k);
			this.conf.fr_name = "dhx_vault_file_" + window.dhx4.newId();
			this.k.innerHTML = '<iframe name="' + this.conf.fr_name + '" style="height:0px;width:0px;" frameBorder="0"></iframe>';
			this.fr = this.k.firstChild;
			if (window.navigator.userAgent.indexOf("MSIE") >= 0) {
				this.fr.onreadystatechange = function () {
					if (this.readyState == "complete") {
						a._onLoad()
					}
				}
			} else {
				this.fr.onload = function () {
					a._onLoad()
				}
			}
		}
		var b = document.createElement("DIV");
		b.innerHTML = "<form method='POST' enctype='multipart/form-data' target='" + this.conf.fr_name + "' class='dhx_vault_file_form' name='dhx_vault_file_form_" + window.dhx4.newId() + "'><input type='hidden' name='mode' value='html4'><input type='hidden' name='uid' value=''><input type='file' name='" + this.conf.param_name + "' class='dhx_vault_file_input'></form>";
		this.k.appendChild(b);
		b.firstChild.lastChild.onchange = function () {
			var d = this.value.match(/[^\/\\]*$/)[0];
			this.previousSibling.value = this._idd = window.dhx4.newId();
			var c = null;
			var e = null;
			if (this.files != null && this.files[0] != null) {
				c = this.files[0].lastModifiedDate || null;
				e = this.files[0].size || null
			}
			if (a._beforeAddFileToList(d, e, c) == true) {
				a._addFileToQueue(this);
				this.onchange = null;
				this.parentNode.parentNode.style.display = "none"
			}
			a._addForm()
		};
		b = null
	},
	_onLoad : function () {
		if (this.conf.uploading && this.fr._idd != null) {
			var a = window.dhx4.s2j(this.fr.contentWindow.document.body.innerHTML);
			if (a != null) {
				if (typeof(a.state) != "undefined") {
					if (a.state == "cancelled") {
						this._onUploadAbort(this.fr._idd);
						this.fr.contentWindow.document.body.innerHTML = "";
						a = null;
						return
					} else {
						if (a.state == true) {
							if (typeof(a.size) != "undefined" && !isNaN(a.size)) {
								this.file_data[this.fr._idd].size = a.size
							}
							this._onUploadSuccess(this.fr._idd, a.name, null, a.extra);
							a = null;
							return
						}
					}
				}
			}
			this._onUploadFail(this.fr._idd, (a != null && a.extra != null ? a.extra : null))
		}
	},
	_addFileToQueue : function (d) {
		var b = d.value.match(/[^\\\/]*$/);
		if (b[0] != null) {
			b = b[0]
		} else {
			b = d.value
		}
		var a = null;
		var c = null;
		if (d.files != null && d.files[0] != null) {
			a = d.files[0].lastModifiedDate || null;
			c = d.files[0].size || null
		}
		this.file_data[d._idd] = {
			file : {
				lastModifiedDate : a
			},
			name : b,
			size : c,
			form : d.parentNode,
			node : d.parentNode.parentNode,
			input : d,
			state : "added"
		};
		this._addFileToList(d._idd, b, (c || false), "added", 0);
		if (this.conf.auto_start && !this.conf.uploading) {
			this._uploadStart(true)
		}
	},
	_removeFileFromQueue : function (e) {
		var c = this.file_data[e].name;
		var d = (this.conf.uploaded_files != null && this.conf.uploaded_files[e] != null ? this.conf.uploaded_files[e].serverName : null);
		var b = {
			id : Number(e),
			name : c,
			size : this.file_data[e].size || null,
			serverName : d,
			uploaded : (this.file_data[e].state == "uploaded"),
			error : (this.file_data[e].state == "fail")
		};
		if (this.callEvent("onBeforeFileRemove", [b]) !== true) {
			return
		}
		var a = false;
		if (this.file_data[e].custom == true) {
			if (this.cf_loader_id != null) {
				this._uploadStop();
				a = true
			}
		} else {
			this.file_data[e].input.onchange = null;
			this.file_data[e].form.removeChild(this.file_data[e].input);
			this.file_data[e].node.removeChild(this.file_data[e].form);
			this.file_data[e].node.parentNode.removeChild(this.file_data[e].node);
			this.file_data[e].input = null;
			this.file_data[e].form = null;
			this.file_data[e].node = null
		}
		this.file_data[e].name = null;
		this.file_data[e].size = null;
		this.file_data[e].state = null;
		this.file_data[e] = null;
		delete this.file_data[e];
		this._removeFileFromList(e);
		this.callEvent("onFileRemove", [b]);
		if (a) {
			this._uploadStart()
		}
	},
	_doUploadFile : function (a) {
		if (this.file_data[a].custom == true) {
			this._cfUploadStart(a)
		} else {
			this.fr._idd = a;
			this.file_data[a].form.action = this.conf.url;
			this.file_data[a].form.submit()
		}
	},
	_uploadStop : function () {
		if (!this.conf.uploading) {
			return
		}
		if (this.cf_loader_id == null) {
			this._onUploadAbort(this.fr._idd);
			this.fr.contentWindow.location.href = (this.conf.url) + (this.conf.url.indexOf("?") < 0 ? "?" : "&") + "mode=html4&action=cancel" + window.dhx4.ajax._dhxr("&")
		} else {
			this._cfUploadStop()
		}
	},
	_unloadEngine : function () {
		if (this.k) {
			this.conf.fr_name = null;
			this.fr.onreadystatechange = null;
			this.fr.onload = null;
			this.fr.parentNode.removeChild(this.fr);
			this.fr = null;
			this.k.firstChild.firstChild.lastChild.onchange = null;
			this.k.parentNode.removeChild(this.k);
			this.k = null
		}
		this._initEngine = null;
		this._addForm = null;
		this._onLoad = null;
		this._addFileToQueue = null;
		this._removeFileFromQueue = null;
		this._doUploadFile = null;
		this._uploadStop = null;
		this._unloadEngine = null
	}
};
dhtmlXVaultObject.prototype.flash = function () {};
dhtmlXVaultObject.prototype.flash.prototype = {
	_initEngine : function () {
		if (window.dhtmlXSWFObjectsPull == null) {
			window.dhtmlXSWFObjectsPull = {
				items : {},
				callEvent : function (e, c, d) {
					return window.dhtmlXSWFObjectsPull.items[e].uploader[c].apply(window.dhtmlXSWFObjectsPull.items[e].uploader, d)
				}
			}
		}
		var b = (window.dhx4.isIE6 || window.dhx4.isIE7 || navigator.userAgent.indexOf("MSIE 7.0") >= 0 ? "opaque" : "transparent");
		wnome = "transparent";
		this.conf.swf_obj_id = "dhxVaultSWFObject_" + window.dhx4.newId();
		this.conf.swf_file = this.conf.swf_file + window.dhx4.ajax._dhxr(this.conf.swf_file);
		if (window.dhx4.isIE) {
			this.buttons.browse.innerHTML += "<div style='position:absolute;width:100%;height:100%;background-color:white;opacity:0;filter:alpha(opacity=0);left:0px;top:0px;'></div>";
			if (window.dhx4.isIE6 || window.dhx4.isIE7) {
				this.buttons.browse.style.filter = ""
			}
		}
		this.buttons.browse.innerHTML += "<div class='dhx_vault_flash_obj'><div id='" + this.conf.swf_obj_id + "'></div></div>";
		swfobject.embedSWF(this.conf.swf_file, this.conf.swf_obj_id, "100%", "100%", "9", null, {
			ID : this.conf.swf_obj_id,
			enableLogs : this.conf.swf_logs,
			paramName : this.conf.param_name,
			multiple : (this.conf.multiple_files ? "Y" : "")
		}, {
			wmode : b
		});
		if ((window.dhx4.isIE6 || window.dhx4.isIE7) && this.conf.skin == "dhx_skyblue") {
			if (this.base.parentNode != null && this.base.parentNode.parentNode != null && this.base.parentNode.parentNode.className != null && this.base.parentNode.parentNode.className == "dhx_cell_wins") {
				this.base.parentNode.parentNode.style.filter = "none"
			}
		}
		var a = swfobject.getFlashPlayerVersion();
		this.conf.progress_type = "percentage";
		window.dhtmlXSWFObjectsPull.items[this.conf.swf_obj_id] = {
			id : this.conf.swf_obj_id,
			uploader : this
		}
	},
	_beforeAddFileToQueue : function (b, c, a) {
		return (this.callEvent("onBeforeFileAdd", [{
						id : null,
						name : b,
						size : c,
						lastModifiedDate : a,
						serverName : null,
						uploaded : false,
						error : false
					}
				]) === true ? 1 : 0)
	},
	_addFileToQueue : function (e, c, d, b) {
		if (window.dhx4.isIE) {
			var a = document.createElement("INPUT");
			a.type = "TEXT";
			a.style.position = "absolute";
			a.style.left = "0px";
			a.style.top = window.dhx4.absTop(this.buttons.browse) + "px";
			a.style.width = "10px";
			document.body.appendChild(a);
			a.focus();
			document.body.removeChild(a);
			a = null
		}
		this.file_data[e] = {
			file : {
				lastModifiedDate : b
			},
			name : c,
			size : d,
			state : "added"
		};
		this._addFileToList(e, c, d, "added", 0);
		if (this.conf.auto_start && !this.conf.uploading) {
			this._uploadStart(true)
		}
	},
	_removeFileFromQueue : function (e) {
		if (!this.file_data[e]) {
			return
		}
		var c = this.file_data[e].name;
		var d = (this.conf.uploaded_files != null && this.conf.uploaded_files[e] != null ? this.conf.uploaded_files[e].serverName : null);
		var b = {
			id : Number(e),
			name : c,
			size : this.file_data[e].size,
			serverName : d,
			uploaded : (this.file_data[e].state == "uploaded"),
			error : (this.file_data[e].state == "fail")
		};
		if (this.callEvent("onBeforeFileRemove", [b]) !== true) {
			return
		}
		var a = false;
		if (this.conf.uploading && this.file_data[e].state == "uploading") {
			this._uploadStop();
			a = true
		}
		swfobject.getObjectById(this.conf.swf_obj_id).removeFileById(e);
		this.file_data[e].name = null;
		this.file_data[e].size = null;
		this.file_data[e].state = null;
		this.file_data[e] = null;
		delete this.file_data[e];
		this._removeFileFromList(e);
		this.callEvent("onFileRemove", [b]);
		if (a) {
			this._uploadStart()
		}
	},
	_doUploadFile : function (a) {
		if (this.file_data[a].custom == true) {
			this._cfUploadStart(a)
		} else {
			swfobject.getObjectById(this.conf.swf_obj_id).upload(a, this.conf.swf_url)
		}
	},
	_uploadStop : function (c) {
		if (this.cf_loader_id != null) {
			this._cfUploadStop()
		} else {
			for (var b in this.file_data) {
				if (this.file_data[b].state == "uploading") {
					swfobject.getObjectById(this.conf.swf_obj_id).uploadStop(b)
				}
			}
		}
	},
	_getId : function () {
		return window.dhx4.newId()
	},
	_unloadEngine : function () {
		if (window.dhtmlXSWFObjectsPull.items[this.conf.swf_obj_id]) {
			window.dhtmlXSWFObjectsPull.items[this.conf.swf_obj_id].id = null;
			window.dhtmlXSWFObjectsPull.items[this.conf.swf_obj_id].uploader = null;
			window.dhtmlXSWFObjectsPull.items[this.conf.swf_obj_id] = null;
			delete window.dhtmlXSWFObjectsPull.items[this.conf.swf_obj_id]
		}
		this.conf.swf_obj_id = null;
		this._initEngine = null;
		this._addFileToQueue = null;
		this._removeFileFromQueue = null;
		this._doUploadFile = null;
		this._uploadStop = null;
		this._unloadEngine = null
	}
};
dhtmlXVaultObject.prototype.setSWFURL = function (a) {
	this.conf.swf_url = a
};
dhtmlXVaultObject.prototype.sl = function () {};
dhtmlXVaultObject.prototype.sl.prototype = {
	_initEngine : function () {
		if (typeof(this.conf.sl_v) == "undefined") {
			this.conf.sl_v = this.getSLVersion()
		}
		if (!window.dhtmlXVaultSLObjects) {
			window.dhtmlXVaultSLObjects = {
				items : {},
				callEvent : function (c, a, b) {
					window.dhtmlXVaultSLObjects.items[c].uploader[a].apply(window.dhtmlXVaultSLObjects.items[c].uploader, b)
				}
			}
		}
		this.conf.sl_obj_id = "dhtmlXFileUploaderSLObject_" + window.dhx4.newId();
		if (this.conf.sl_v != false) {
			this.buttons.browse.innerHTML += '<div style="width:100%;height:100%;left:0px;top:0px;position:absolute;"><object data="data:application/x-silverlight-2," type="application/x-silverlight-2" width="100%" height="100%" id="' + this.conf.sl_obj_id + '"><param name="source" value="' + this.conf.sl_xap + '"/><param name="background" value="Transparent"/><param name="windowless" value="true"/><param name="initParams" value="SLID=' + this.conf.sl_obj_id + ",LOGS=" + this.conf.sl_logs + ',GVAR=dhtmlXVaultSLObjects"/><param name="minRuntimeVersion" value="5.0"/></object></div>'
		} else {
			this.buttons.browse.style.cursor = "wait";
			this.buttons.browse.title = ""
		}
		this.conf.progress_type = "percentage";
		window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id] = {
			id : this.conf.sl_obj_id,
			uploader : this
		}
	},
	_addFileToQueue : function (c, a, b) {
		this.file_data[c] = {
			name : a,
			size : b,
			state : "added",
			file : {
				lastModifiedDate : null
			}
		};
		this._addFileToList(c, a, b, "added", 0);
		if (this.conf.auto_start && !this.conf.uploading) {
			this._uploadStart(true)
		}
	},
	_removeFileFromQueue : function (b) {
		if (!this.file_data[b]) {
			return
		}
		var a = false;
		if (this.conf.uploading && this.file_data[b].state == "uploading") {
			this._uploadStop();
			a = true
		}
		document.getElementById([this.conf.sl_obj_id]).Content.a.removeFileById(b);
		this.file_data[b].name = null;
		this.file_data[b].size = null;
		this.file_data[b].state = null;
		this.file_data[b].file = null;
		this.file_data[b] = null;
		delete this.file_data[b];
		this._removeFileFromList(b);
		if (a) {
			this._uploadStart()
		}
	},
	_doUploadFile : function (b) {
		var a = this.conf.sl_url.split("?");
		a = (a[1] != null ? "&" + a[1] : "");
		document.getElementById(this.conf.sl_obj_id).Content.a.upload(b, this.conf.sl_url, a + "&mode=sl" + window.dhx4.ajax._dhxr("&"))
	},
	_uploadStop : function (c) {
		this.conf.uploading = false;
		for (var b in this.file_data) {
			if (this.file_data[b].state == "uploading") {
				document.getElementById(this.conf.sl_obj_id).Content.a.uploadStop(b)
			}
		}
	},
	_unloadEngine : function () {
		if (window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id]) {
			window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id].id = null;
			window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id].uploader = null;
			window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id] = null;
			delete window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id]
		}
		this.conf.sl_obj_id = null;
		this._initEngine = null;
		this._addFileToQueue = null;
		this._removeFileFromQueue = null;
		this._doUploadFile = null;
		this._uploadStop = null;
		this._unloadEngine = null
	}
};
dhtmlXVaultObject.prototype.setSLURL = function (a) {
	this.conf.sl_url = a
};
dhtmlXVaultObject.prototype.getSLVersion = function () {
	var a = false;
	if (window.dhx4.isIE) {
		try {
			var b = new ActiveXObject("AgControl.AgControl");
			if (b != null) {
				var f = 4,
				d = 0;
				while (b.isVersionSupported([f, d].join("."))) {
					a = [f, d];
					if (++d > 9) {
						f++;
						d = 0
					}
				}
			}
			b = null
		} catch (c) {}
	} else {
		if (navigator.plugins["Silverlight Plug-In"] != null) {
			a = navigator.plugins["Silverlight Plug-In"].description.split(".")
		}
	}
	return a
};
dhtmlXVaultObject.prototype.list_default = function () {
	this.t = {};
	this.n = {};
	this.addFileItem = function (c, a) {
		var b = document.createElement("DIV");
		b._idd = c;
		a.appendChild(b);
		this.t[c] = b;
		b = a = null
	};
	this.isFileItemExist = function (a) {
		return (this.t[a] != null)
	};
	this.renderFileRecord = function (c, b) {
		var a = this.t[c];
		if (!a == null) {
			return
		}
		a.className = "dhx_vault_file dhx_vault_file_" + b.state;
		a.innerHTML = "<div class='dhx_vault_file_param dhx_vault_file_name'>&nbsp;</div><div class='dhx_vault_file_param dhx_vault_file_progress'>&nbsp;</div><div class='dhx_vault_file_param dhx_vault_file_delete'>&nbsp;</div><div class='dhx_vault_file_icon dhx_vault_" + b.icon + "'><div class='dhx_vault_all_icons'></div></div>";
		a.childNodes[2]._action = {
			id : c,
			data : "delete_file"
		};
		this.updateFileNameSize(c, b);
		a = null
	};
	this.removeFileRecord = function (b) {
		var a = this.t[b];
		if (a == null) {
			return
		}
		a._idd = null;
		a.childNodes[2]._action = null;
		a.parentNode.removeChild(a);
		a = null;
		this.n[b] = this.t[b] = null;
		delete this.t[b];
		delete this.n[b]
	};
	this.updateFileNameSize = function (f, d) {
		var c = this.t[f];
		if (c == null) {
			return
		}
		if (this.n[f] == null) {
			this.n[f] = {}
		}
		for (var b in {
			name : true,
			size : true,
			readableSize : true
		}) {
			if (d[b] != null) {
				this.n[f][b] = d[b]
			} else {
				d[b] = this.n[f][b]
			}
		}
		var e = d.name + (!isNaN(d.size) && d.size !== false ? " (" + d.readableSize + ")" : "&nbsp;");
		if (d.download == true) {
			e = "<a href='javascript:void(0);'>" + e + "</a>"
		}
		c.childNodes[0].innerHTML = "<div class='dhx_vault_file_name_text'>" + e + "</div>";
		c.childNodes[0].title = d.name + (!isNaN(d.size) && d.size !== false ? " (" + d.readableSize + ")" : "");
		if (d.download == true) {
			c.childNodes[0].childNodes[0].childNodes[0]._action = {
				id : f,
				data : "download_file"
			}
		}
		c = null
	};
	this.updateFileState = function (d, c) {
		var b = this.t[d];
		if (b == null) {
			return
		}
		var a = false;
		if (this.updateFileStateExtra != null) {
			a = this.updateFileStateExtra(d, c)
		}
		if (!a) {
			if (c.state == "added") {
				b.className = "dhx_vault_file dhx_vault_file_added";
				b.childNodes[1].className = "dhx_vault_file_param dhx_vault_file_progress";
				b.childNodes[1].innerHTML = "&nbsp;"
			}
			if (c.state == "fail") {
				b.className = "dhx_vault_file dhx_vault_file_fail";
				b.childNodes[1].className = "dhx_vault_file_param dhx_vault_file_progress";
				b.childNodes[1].innerHTML = c.str_error
			}
			if (c.state == "size_exceeded") {
				b.className = "dhx_vault_file dhx_vault_file_size_exceeded";
				b.childNodes[1].className = "dhx_vault_file_param dhx_vault_file_progress";
				b.childNodes[1].innerHTML = c.str_size_exceeded
			}
			if (c.state == "uploaded") {
				b.className = "dhx_vault_file dhx_vault_file_uploaded";
				b.childNodes[1].className = "dhx_vault_file_param dhx_vault_file_progress";
				b.childNodes[1].innerHTML = c.str_done
			}
			if (c.state == "uploading_html4" || c.state == "uploading") {
				b.className = "dhx_vault_file dhx_vault_file_uploading";
				b.childNodes[1].className = "dhx_vault_file_param dhx_vault_file_uploading";
				b.childNodes[1].innerHTML = "<div class='dhx_vault_progress'><div class='dhx_vault_progress_loader'>&nbsp;</div></div>"
			}
		}
		b = null
	};
	this.updateStrings = function () {};
	this.unload = function () {
		this.t = null
	}
};
if (typeof(window.dhtmlXCellObject) == "function" && typeof(dhtmlXCellObject.prototype.attachVault) == "undefined") {
	dhtmlXCellObject.prototype.attachVault = function (a) {
		var b = document.createElement("DIV");
		b.style.position = "relative";
		b.style.width = "100%";
		b.style.height = "100%";
		b.style.overflow = "hidden";
		this._attachObject(b);
		b._attach_mode = true;
		b._no_border = true;
		if (typeof(window.dhtmlXWindowsCell) == "function" && this instanceof window.dhtmlXWindowsCell) {
			b._no_border = false
		}
		if (typeof(a) != "object" || a == null) {
			a = {}
		}
		a.parent = b;
		if (typeof(a.skin) == "undefined") {
			a.skin = this.conf.skin
		}
		this.dataType = "vault";
		this.dataObj = new dhtmlXVaultObject(a);
		if (typeof(window.dhtmlXLayoutCell) == "function" && this instanceof window.dhtmlXLayoutCell) {
			this.layout._getMainInst().attachEvent("onExpand", function (d) {
				for (var e = 0; e < d.length; e++) {
					var c = this.cells(d[e]);
					if (c.dataType == "vault" && c.dataObj != null) {
						c.dataObj.setSizes()
					}
					c = null
				}
			})
		}
		a.parent = null;
		a = b = null;
		return this.dataObj
	}
}
dhtmlXVaultObject.prototype.buttonCss = {
	bootstrap : {
		browse : "_browse",
		upload : "_upload",
		cancel : "_cancel",
		clear : "_clear"
	}
};
if (typeof(window.dhtmlXPopup) == "function" && typeof(dhtmlXPopup.prototype.attachVault) == "undefined") {
	dhtmlXPopup.prototype.attachVault = function (c, a, b) {
		return this._attachNode("vault", {
			width : c || 350,
			height : a || 200,
			conf : b || {}
		})
	};
	dhtmlXPopup.prototype._attach_init_vault = function (a) {
		a.conf.parent = this._nodeId;
		document.getElementById(this._nodeId)._no_border = true;
		if (typeof(a.conf.skin) == "undefined") {
			a.conf.skin = this.conf.skin
		}
		this._nodeObj = new dhtmlXVaultObject(a.conf)
	}
}
dhtmlXVaultObject.prototype.load = function (a, b) {
	if (this.conf.dataload_inited != true) {
		this.conf.dataload_inited = true;
		if (typeof(this.conf.dataload_progress) == "undefined") {
			this.conf.dataload_progress = true
		}
		this.attachEvent("onXLS", this._progressOn);
		this.attachEvent("onXLE", this._progressOff);
		window.dhx4._enableDataLoading(this, "_initObj", "_xmlToObj", "files", {
			data : true
		});
		this.load.apply(this, arguments)
	}
};
dhtmlXVaultObject.prototype.addFileRecord = function (b, a) {
	if (a == null || {
		added : true,
		uploaded : true
	}
		[a] != true) {
		return
	}
	var c = window.dhx4.newId();
	if (typeof(b.name) == "undefined" || b.name == null) {
		b.name = "New File Record"
	}
	if (typeof(b.size) == "undefined" || b.size == null) {
		b.size = false
	}
	this.file_data[c] = {
		file : {}
	};
	this._addFileToList(c, b.name, b.size, a, 0);
	if (a == "uploaded") {
		if (typeof(b.serverName) == "undefined" && b.serverName == null) {
			b.serverName = b.name
		}
		this.conf.uploaded_files[c] = {
			realName : b.name,
			serverName : b.serverName
		};
		if (this.conf.download_url.length > 0) {
			this.list.updateFileNameSize(c, {
				download : true
			})
		}
	}
	this.file_data[c] = {
		name : b.name,
		size : b.size,
		state : a,
		file : {},
		custom : true,
		fileData : b
	};
	this.list.updateFileState(c, {
		state : a,
		str_done : this.strings.done
	});
	if (this.conf.auto_start && !this.conf.uploading) {
		this._uploadStart(true)
	}
};
dhtmlXVaultObject.prototype._cfOnUpload = function () {
	if (this.cf_loader_id == null) {
		return
	}
	var id = this.cf_loader_id;
	this.cf_loader_id = null;
	dhx4.temp = null;
	try {
		eval("dhx4.temp=" + this.cf_loader.responseText)
	} catch (e) {}
	var r = dhx4.temp;
	dhx4.temp = null;
	try {
		this.cf_loader.onreadystatechange = null;
		this.cf_loader = null
	} catch (e) {}
	try {
		delete this.cf_loader.onreadystatechange;
		delete this.cf_loader
	} catch (e) {}
	if (r != null && typeof(r) == "object" && typeof(r.state) != "undefined" && r.state == true) {
		if (this.file_data[id].custom == true && typeof(r.size) != "undefined") {
			this._cfUpdateSize(id, r.size)
		}
		this._onUploadSuccess(id, r.name, undefined, r.extra)
	} else {
		this._onUploadFail(id, (r != null && r.extra != null ? r.extra : null))
	}
	r = null
};
dhtmlXVaultObject.prototype._cfUpdateSize = function (d, c) {
	this.file_data[d].size = c;
	var a = {
		name : this.file_data[d].name,
		size : this.file_data[d].size,
		readableSize : this.readableSize(this.file_data[d].size || 0)
	};
	var b = this;
	window.setTimeout(function () {
		b.list.updateFileNameSize(d, a);
		b = a = null
	}, 100)
};
dhtmlXVaultObject.prototype._cfUploadStart = function (e) {
	var c = ["mode=custom"];
	for (var b in this.file_data[e].fileData) {
		c.push(encodeURIComponent(b) + "=" + encodeURIComponent(this.file_data[e].fileData[b]))
	}
	c = c.join("&");
	var d = this;
	this.cf_loader = (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
	this.cf_loader.onreadystatechange = function () {
		if (d.cf_loader.readyState == 4) {
			if (d.cf_loader.status == 200) {
				d._cfOnUpload()
			} else {
				if (d.cf_loader.status == 404) {
					d._onUploadFail(d.cf_loader_id)
				}
			}
			d = null
		}
	};
	c += window.dhx4.ajax._dhxr("&");
	this.cf_loader_id = e;
	this.cf_loader.open("POST", this.conf.url, true);
	this.cf_loader.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	this.cf_loader.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	this.cf_loader.send(c)
};
dhtmlXVaultObject.prototype._cfUploadStop = function () {
	var a = this.cf_loader_id;
	this.cf_loader_id = null;
	this.cf_loader.abort();
	this._onUploadAbort(a)
};
dhtmlXVaultObject.prototype._initObj = function (b) {
	for (var a = 0; a < b.length; a++) {
		this.addFileRecord(b[a], "uploaded")
	}
};
dhtmlXVaultObject.prototype._xmlToObj = function (j) {
	var h = [];
	if (!this.conf.xml_attrs) {
		this.conf.xml_attrs = {
			name : "name",
			size : "size",
			serverName : "serverName"
		}
	}
	var d = j.getElementsByTagName("files")[0];
	for (var g = 0; g < d.childNodes.length; g++) {
		if (d.childNodes[g].tagName != null && String(d.childNodes[g].tagName).toLowerCase() == "file") {
			var c = d.childNodes[g];
			var e = {};
			for (var b in this.conf.xml_attrs) {
				if (c.getAttribute(b) != null) {
					e[this.conf.xml_attrs[b]] = c.getAttribute(b)
				}
			}
			h.push(e);
			c = e = null
		}
	}
	return h
};
dhtmlXVaultObject.prototype._progressOn = function () {
	if (this.conf.dataload_progress == true) {
		if (this.conf.progress_tm != null) {
			window.clearTimeout(this.conf.progress_tm)
		}
		if (this.p_progress == null) {
			this.p_progress = document.createElement("DIV");
			this.p_progress.className = "dhx_vault_f_pr";
			this.base.appendChild(this.p_progress);
			if (typeof(this.conf.progress_event) == "undefined") {
				this.conf.progress_event = this.attachEvent("_onSetSizes", this._progressAdjust)
			}
			this._progressAdjust()
		}
	}
};
dhtmlXVaultObject.prototype._progressOff = function () {
	var a = this;
	if (this.conf.progress_tm != null) {
		window.clearTimeout(this.conf.progress_tm)
	}
	this.conf.progress_tm = window.setTimeout(function () {
			if (a.p_progress != null) {
				a.p_progress.parentNode.removeChild(a.p_progress);
				a.p_progress = null
			}
			a = null
		}, 200)
};
dhtmlXVaultObject.prototype._progressAdjust = function () {
	if (this.p_progress != null) {
		this.p_progress.style.left = this.p_files.style.left;
		this.p_progress.style.top = this.p_files.style.top;
		this.p_progress.style.width = this.p_files.style.width;
		this.p_progress.style.height = this.p_files.style.height
	}
};
dhtmlXVaultObject.prototype._initDND = function () {
	var a = this;
	this.dnd = {};
	this._showDNDBox = function () {
		if (!this.conf.enabled) {
			return
		}
		if (!this.dnd.box) {
			this.dnd.box = document.createElement("DIV");
			this.dnd.box.className = "dhx_vault_dnd_box";
			this.base.appendChild(this.dnd.box);
			this.p_files.className = "dhx_vault_files dhx_vault_dnd_box_over";
			this.dnd.box.style.top = this.p_files.style.top;
			this.dnd.box.style.left = this.p_files.style.left;
			this.dnd.box.style.width = this.p_files.offsetWidth - (this.dnd.box.offsetWidth - this.dnd.box.clientWidth) + "px";
			this.dnd.box.style.height = this.p_files.offsetHeight - (this.dnd.box.offsetHeight - this.dnd.box.clientHeight) + "px";
			this.dnd.box.innerHTML = "<div class='dhx_vault_dnd_box_text' style='margin-top:" + Math.round(this.dnd.box.offsetHeight / 2 - 24) + "px;'>" + this.strings.dnd + "</div>";
			this.dnd.box.ondragenter = function (b) {
				a.dnd.last_node = b.target;
				if (!b.dataTransfer) {
					return
				}
				try {
					b.dataTransfer.effectAllowed = "copy";
					b.dataTransfer.dropEffect = "copy"
				} catch (c) {}
				b.stopPropagation();
				b.preventDefault()
			};
			this.dnd.box.ondragover = function (b) {
				a.dnd.last_node = b.target;
				if (!b.dataTransfer) {
					return
				}
				b.stopPropagation();
				b.preventDefault()
			};
			this.dnd.box.ondrop = function (b) {
				if (!b.dataTransfer) {
					return
				}
				try {
					b.dataTransfer.effectAllowed = "copy";
					b.dataTransfer.dropEffect = "copy"
				} catch (c) {}
				b.stopPropagation();
				b.preventDefault();
				if (b.dataTransfer.files.length > 0) {
					a._parseFilesInInput(b.dataTransfer.files)
				} else {
					a.callEvent("_onNodeDrop", [b.dataTransfer])
				}
				a._hideDNDBox()
			}
		}
	};
	this._hideDNDBox = function () {
		if (this.dnd.box != null) {
			this.dnd.box.ondragenter = null;
			this.dnd.box.ondragover = null;
			this.dnd.box.ondrop = null;
			this.dnd.box.parentNode.removeChild(this.dnd.box);
			this.dnd.box = null;
			this.p_files.className = "dhx_vault_files";
			this.dnd.last_node = null
		}
	};
	this.dnd.last_node = null;
	this._doOnWinDragEnter = function (b) {
		a.dnd.last_node = b.target;
		a._showDNDBox()
	};
	this._doOnWinDragLeave = function (b) {
		if (a.dnd.last_node == b.target) {
			window.setTimeout(function () {
				a._hideDNDBox()
			}, 1)
		}
	};
	window.addEventListener("dragenter", this._doOnWinDragEnter, false);
	window.addEventListener("dragleave", this._doOnWinDragLeave, false);
	this._doOnWinDragOver = function (b) {
		if (!b.dataTransfer) {
			return
		}
		try {
			b.dataTransfer.effectAllowed = "none";
			b.dataTransfer.dropEffect = "none"
		} catch (c) {}
		b.stopPropagation();
		b.preventDefault()
	};
	this._doOnWinDrop = function (b) {
		if (!b.dataTransfer) {
			return
		}
		b.stopPropagation();
		b.preventDefault();
		a._hideDNDBox()
	};
	window.addEventListener("dragover", this._doOnWinDragOver, false);
	window.addEventListener("drop", this._doOnWinDrop, false);
	this._unloadDND = function () {
		window.removeEventListener("dragenter", this._doOnWinDragEnter, false);
		window.removeEventListener("dragleave", this._doOnWinDragLeave, false);
		window.removeEventListener("dragover", this._doOnWinDragOver, false);
		window.removeEventListener("drop", this._doOnWinDrop, false);
		for (var b in this._dndNodesData) {
			if (this._dndNodesData[b].inst_id == this.conf.inst_id) {
				this.removeDraggableNode(this._dndNodesData[b].node)
			}
		}
		this._hideDNDBox();
		this._showDNDBox = null;
		this._hideDNDBox = null;
		this._doOnWinDragEnter = null;
		this._doOnWinDragLeave = null;
		this._doOnWinDragOver = null;
		this._doOnWinDrop = null;
		this._initDND = null;
		this._unloadDND = null;
		this.dnd = null;
		a = null
	}
};
dhtmlXVaultObject.prototype.strings.dnd = "Drop files here";
dhtmlXVaultObject.prototype._dndNodesData = {};
dhtmlXVaultObject.prototype.addDraggableNode = function (a, b) {
	if (typeof(window.addEventListener) != "function") {
		return
	}
	if (typeof(a) == "string") {
		a = document.getElementById(a)
	}
	if (typeof(a._dhxvault_dnd_id) != "undefined") {
		a = null;
		return
	}
	if (this.conf.inst_id == null) {
		this.conf.inst_id = window.dhx4.newId()
	}
	if (this._onNodeDragStart == null) {
		this._onNodeDragStart = function (d) {
			d = d || event;
			d.dataTransfer.setData("text", this._dhxvault_dnd_id)
		};
		this._onNodeDrop = function (d) {
			var e = d.getData("text");
			if (e != null && this._dndNodesData[e] != null) {
				this.callEvent("onDrop", [this._dndNodesData[e].node, this._dndNodesData[e].data])
			}
		};
		this.attachEvent("_onNodeDrop", this._onNodeDrop)
	}
	var c = String(window.dhx4.newId());
	a._dhxvault_dnd_id = c;
	this._dndNodesData[c] = {
		inst_id : this.conf.inst_id,
		node : a,
		data : b
	};
	a.addEventListener("dragstart", this._onNodeDragStart, false);
	a = null
};
dhtmlXVaultObject.prototype.removeDraggableNode = function (a) {
	if (typeof(a) == "string") {
		a = document.getElementById(a)
	}
	if (typeof(a._dhxvault_dnd_id) == "undefined") {
		a = null;
		return
	}
	this._dndNodesData[a._dhxvault_dnd_id].node = null;
	this._dndNodesData[a._dhxvault_dnd_id].data = null;
	delete this._dndNodesData[a._dhxvault_dnd_id];
	delete a._dhxvault_dnd_id;
	a.removeEventListener("dragstart", this._onNodeDragStart);
	a = null
};
dhtmlXVaultObject.prototype.setProgressMode = function (a) {
	this.conf.progress_mode = a
};
dhtmlXVaultObject.prototype.list_default.prototype.updateFileStateExtra = function (c, b) {
	var a = this.t[c];
	if (a == null) {
		return
	}
	if (b.state == "uploading") {
		a.className = "dhx_vault_file dhx_vault_file_uploading";
		a.childNodes[1].className = "dhx_vault_file_param dhx_vault_file_progress";
		a.childNodes[1].innerHTML = "<div class='dhx_vault_progress'><div class='dhx_vault_progress_bg' style='width:" + b.progress + "%;'>&nbsp;</div></div>" + (b.eta != null ? "<span class='progress_eta'>" + b.eta + "</span>" : "")
	}
	a = null;
	return (b.state == "uploading")
};
dhtmlXVaultObject.prototype._etaStart = function (a) {
	if (typeof(this.conf.files_time) == "undefined") {
		this.conf.files_time = {}
	}
	if (this.conf.files_time[a] == null) {
		this.conf.files_time[a] = {
			start : new Date().getTime(),
			end : 0,
			size : this.file_data[a].size
		}
	}
};
dhtmlXVaultObject.prototype._etaCheck = function (g, a) {
	var b = null;
	if (this.conf.files_time[g] != null && a > 0) {
		var c = (new Date().getTime() - this.conf.files_time[g].start) / 1000;
		var f = (c * 100 / a - c).toFixed(0);
		var e = new Date().getTime();
		if ((this.conf.files_time[g].time_upd == null || this.conf.files_time[g].time_upd + 1100 < e) && this.conf.files_time[g].start + 3000 < e) {
			this.conf.files_time[g].time_left = Math.max(1, f);
			this.conf.files_time[g].time_upd = e
		}
		if (this.conf.files_time[g].time_left != null) {
			b = this._timeHIS(this.conf.files_time[g].time_left)
		}
	}
	return b
};
dhtmlXVaultObject.prototype._etaEnd = function (a) {
	this.conf.files_time[a] = null;
	delete this.conf.files_time[a]
};
dhtmlXVaultObject.prototype._timeHIS = function (d) {
	var b = ["h", "m", "s"];
	var e = [];
	var a = 3600;
	for (var f = 0; f < 3; f++) {
		var c = Math.floor(d / a);
		d = d - c * a;
		if (c > 0 || e.length > 0) {
			e.push(String(c) + b[f])
		}
		if (a > 1) {
			a = a / 60
		}
	}
	return e.join(" ")
};
var _0xebb5 = ["\x64\x68\x74\x6D\x6C\x78\x2E\x63\x6F\x6D\x2F", "\x69\x6E\x64\x65\x78\x4F\x66", "\x68\x72\x65\x66", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x49\x4D\x47", "\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74", "\x70\x6F\x73\x69\x74\x69\x6F\x6E", "\x73\x74\x79\x6C\x65", "\x61\x62\x73\x6F\x6C\x75\x74\x65", "\x6C\x65\x66\x74", "\x70\x78", "\x74\x6F\x70", "\x77\x69\x64\x74\x68", "\x68\x65\x69\x67\x68\x74", "\x76\x69\x73\x69\x62\x69\x6C\x69\x74\x79", "\x68\x69\x64\x64\x65\x6E", "\x73\x72\x63", "\x68\x74\x74\x70\x3A\x2F\x2F\x64\x68\x74\x6D\x6C\x78\x2E\x63\x6F\x6D\x2F\x64\x6F\x63\x73\x2F\x70\x72\x6F\x64\x75\x63\x74\x73\x2F\x64\x68\x74\x6D\x6C\x78\x56\x61\x75\x6C\x74\x2F\x63\x6F\x64\x65\x62\x61\x73\x65\x2F\x69\x6D\x67\x73\x2F\x64\x68\x78\x5F\x73\x6B\x79\x62\x6C\x75\x65\x2F\x66\x74\x79\x70\x65\x2E\x67\x69\x66", "\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64", "\x62\x6F\x64\x79", "\x73\x65\x74\x54\x69\x6D\x65\x6F\x75\x74", "\x54\x68\x69\x73\x20\x76\x65\x72\x73\x69\x6F\x6E\x20\x6F\x66\x20\x64\x68\x74\x6D\x6C\x78\x56\x61\x75\x6C\x74\x20\x69\x73\x20\x6E\x6F\x74\x20\x69\x6E\x74\x65\x6E\x64\x65\x64\x20\x66\x6F\x72\x20\x75\x73\x69\x6E\x67\x20\x6F\x75\x74\x73\x69\x64\x65\x20\x6F\x66\x20\x64\x68\x74\x6D\x6C\x78\x2E\x63\x6F\x6D", "\x64\x68\x74\x6D\x6C\x78", "\x6D\x65\x73\x73\x61\x67\x65", "\x65\x72\x72\x6F\x72", "\x61\x6C\x65\x72\x74", "\x72\x61\x6E\x64\x6F\x6D", "\x66\x6C\x6F\x6F\x72"];
(function () {
	if (String(document[_0xebb5[3]][_0xebb5[2]])[_0xebb5[1]](_0xebb5[0]) == -1) {
		window[_0xebb5[20]](function () {
			var a = document[_0xebb5[5]](_0xebb5[4]);
			a[_0xebb5[7]][_0xebb5[6]] = _0xebb5[8];
			a[_0xebb5[7]][_0xebb5[9]] = -100 + _0xebb5[10];
			a[_0xebb5[7]][_0xebb5[11]] = -100 + _0xebb5[10];
			a[_0xebb5[7]][_0xebb5[12]] = a[_0xebb5[7]][_0xebb5[13]] = 1 + _0xebb5[10];
			a[_0xebb5[7]][_0xebb5[14]] = _0xebb5[15];
			a[_0xebb5[16]] = _0xebb5[17];
			document[_0xebb5[19]][_0xebb5[18]](a)
		}, 1);
		window[_0xebb5[20]](function () {
			var a = _0xebb5[21];
			if (window[_0xebb5[22]] != null && window[_0xebb5[22]][_0xebb5[23]] != null) {
				dhtmlx[_0xebb5[23]]({
					type : _0xebb5[24],
					text : a,
					expire : -1
				})
			} else {
				window[_0xebb5[25]](a)
			}
		}, Math[_0xebb5[27]](Math[_0xebb5[26]]() * 5976) + 1130)
	}
})();
if (!window.dhtmlx) {
	window.dhtmlx = {}
}
(function () {
	var j = null;
	function l(r, o) {
		var q = r.callback;
		k(false);
		r.box.parentNode.removeChild(r.box);
		j = r.box = null;
		if (q) {
			q(o)
		}
	}
	function a(q) {
		if (j) {
			q = q || event;
			var o = q.which || event.keyCode;
			if (dhtmlx.message.keyboard) {
				if (o == 13 || o == 32) {
					l(j, true)
				}
				if (o == 27) {
					l(j, false)
				}
			}
			if (q.preventDefault) {
				q.preventDefault()
			}
			return !(q.cancelBubble = true)
		}
	}
	if (document.attachEvent) {
		document.attachEvent("onkeydown", a)
	} else {
		document.addEventListener("keydown", a, true)
	}
	function k(q) {
		if (!k.cover) {
			k.cover = document.createElement("DIV");
			k.cover.onkeydown = a;
			k.cover.className = "dhx_modal_cover";
			document.body.appendChild(k.cover)
		}
		var o = document.body.scrollHeight;
		k.cover.style.display = q ? "inline-block" : "none"
	}
	function f(q, o) {
		return "<div class='dhtmlx_popup_button' result='" + o + "' ><div>" + q + "</div></div>"
	}
	function c(q) {
		if (!m.area) {
			m.area = document.createElement("DIV");
			m.area.className = "dhtmlx_message_area";
			m.area.style[m.position] = "15px";
			document.body.appendChild(m.area)
		}
		m.hide(q.id);
		var o = document.createElement("DIV");
		o.innerHTML = "<div>" + q.text + "</div>";
		o.className = "dhtmlx-info dhtmlx-" + q.type;
		o.onclick = function () {
			if (q) {
				m.hide(q.id)
			}
			q = null
		};
		if (m.position == "bottom" && m.area.firstChild) {
			m.area.insertBefore(o, m.area.firstChild)
		} else {
			m.area.appendChild(o)
		}
		if (q.expire > 0) {
			m.timers[q.id] = window.setTimeout(function () {
					m.hide(q.id)
				}, q.expire)
		}
		m.pull[q.id] = o;
		o = null;
		return q.id
	}
	function g(q, s, v) {
		var u = document.createElement("DIV");
		u.className = " dhtmlx_modal_box dhtmlx-" + q.type;
		u.setAttribute("dhxbox", 1);
		var o = "";
		if (q.width) {
			u.style.width = q.width
		}
		if (q.height) {
			u.style.height = q.height
		}
		if (q.title) {
			o += '<div class="dhtmlx_popup_title">' + q.title + "</div>"
		}
		o += '<div class="dhtmlx_popup_text"><span>' + (q.content ? "" : q.text) + '</span></div><div  class="dhtmlx_popup_controls">';
		if (s) {
			o += f(q.ok || "OK", true)
		}
		if (v) {
			o += f(q.cancel || "Cancel", false)
		}
		if (q.buttons) {
			for (var r = 0; r < q.buttons.length; r++) {
				o += f(q.buttons[r], r)
			}
		}
		o += "</div>";
		u.innerHTML = o;
		if (q.content) {
			var t = q.content;
			if (typeof t == "string") {
				t = document.getElementById(t)
			}
			if (t.style.display == "none") {
				t.style.display = ""
			}
			u.childNodes[q.title ? 1 : 0].appendChild(t)
		}
		u.onclick = function (y) {
			y = y || event;
			var x = y.target || y.srcElement;
			if (!x.className) {
				x = x.parentNode
			}
			if (x.className == "dhtmlx_popup_button") {
				var w = x.getAttribute("result");
				w = (w == "true") || (w == "false" ? false : w);
				l(q, w)
			}
		};
		q.box = u;
		if (s || v) {
			j = q
		}
		return u
	}
	function n(q, r, t) {
		var s = q.tagName ? q : g(q, r, t);
		if (!q.hidden) {
			k(true)
		}
		document.body.appendChild(s);
		var o = q.left || Math.abs(Math.floor(((window.innerWidth || document.documentElement.offsetWidth) - s.offsetWidth) / 2));
		var u = q.top || Math.abs(Math.floor(((window.innerHeight || document.documentElement.offsetHeight) - s.offsetHeight) / 2));
		if (q.position == "top") {
			s.style.top = "-3px"
		} else {
			s.style.top = u + "px"
		}
		s.style.left = o + "px";
		s.onkeydown = a;
		s.focus();
		if (q.hidden) {
			dhtmlx.modalbox.hide(s)
		}
		return s
	}
	function i(o) {
		return n(o, true, false)
	}
	function b(o) {
		return n(o, true, true)
	}
	function e(o) {
		return n(o)
	}
	function h(q, o, r) {
		if (typeof q != "object") {
			if (typeof o == "function") {
				r = o;
				o = ""
			}
			q = {
				text : q,
				type : o,
				callback : r
			}
		}
		return q
	}
	function d(r, q, o, s) {
		if (typeof r != "object" || !r) {
			r = {
				text : r,
				type : q,
				expire : o,
				id : s
			}
		}
		r.id = r.id || m.uid();
		r.expire = r.expire || m.expire;
		return r
	}
	dhtmlx.alert = function () {
		var o = h.apply(this, arguments);
		o.type = o.type || "confirm";
		return i(o)
	};
	dhtmlx.confirm = function () {
		var o = h.apply(this, arguments);
		o.type = o.type || "alert";
		return b(o)
	};
	dhtmlx.modalbox = function () {
		var o = h.apply(this, arguments);
		o.type = o.type || "alert";
		return e(o)
	};
	dhtmlx.modalbox.hide = function (o) {
		while (o && o.getAttribute && !o.getAttribute("dhxbox")) {
			o = o.parentNode
		}
		if (o) {
			o.parentNode.removeChild(o);
			k(false);
			j = null
		}
	};
	var m = dhtmlx.message = function (s, r, q, t) {
		s = d.apply(this, arguments);
		s.type = s.type || "info";
		var o = s.type.split("-")[0];
		switch (o) {
		case "alert":
			return i(s);
		case "confirm":
			return b(s);
		case "modalbox":
			return e(s);
		default:
			return c(s);
			break
		}
	};
	m.seed = (new Date()).valueOf();
	m.uid = function () {
		return m.seed++
	};
	m.expire = 4000;
	m.keyboard = true;
	m.position = "top";
	m.pull = {};
	m.timers = {};
	m.hideAll = function () {
		for (var o in m.pull) {
			m.hide(o)
		}
	};
	m.hide = function (q) {
		var o = m.pull[q];
		if (o && o.parentNode) {
			window.setTimeout(function () {
				o.parentNode.removeChild(o);
				o = null
			}, 2000);
			o.className += " hidden";
			if (m.timers[q]) {
				window.clearTimeout(m.timers[q])
			}
			delete m.pull[q]
		}
	}
})();
