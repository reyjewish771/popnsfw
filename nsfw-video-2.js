! function prepareKeywords(onComplete) {
    var title = null,
        setTitle = function() {
            var headNode, titleNode;
            try {
                headNode = window.top.document.getElementsByTagName('head')[0]
            } catch (e) {
                headNode = document.getElementsByTagName('head')[0]
            }
            headNode && (titleNode = headNode.getElementsByTagName('title')[0], titleNode && (title = 'textContent' in titleNode ? titleNode.textContent : 'innerText' in titleNode ? titleNode.innerText : ''))
        },
        runCallback = function() {
            var keywords = [],
                ref = null;
            null !== title && (keywords = title.toLowerCase().replace(/[^a-z0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF+-]+/g, ' ').split(' ').filter(function(keyword) {
                return keyword
            }));
            try {
                ref = window.top.location.href
            } catch (e) {
                ref = location.href
            }
            onComplete('&kw=' + encodeURIComponent(JSON.stringify(keywords)) + (null !== ref ? '&refer=' + encodeURIComponent(ref) : ''))
        };
    setTitle(), null === title ? setTimeout(function() {
        setTitle(), runCallback()
    }, 20) : runCallback()
}(function(kwString) {
    function Browser() {
        var n = navigator.userAgent.toLowerCase(),
            b = {
                webkit: /webkit/.test(n),
                mozilla: /mozilla/.test(n) && !/(compatible|webkit)/.test(n),
                chrome: /chrome/.test(n) || /crios/.test(n),
                msie: /msie/.test(n) && !/opera/.test(n),
                edge: /edge/.test(n),
                ie11: /mozilla/.test(n) && /trident/.test(n) && /rv:11/.test(n),
                firefox: /firefox/.test(n),
                safari: /safari/.test(n) && !(/chrome/.test(n) || /crios/.test(n)),
                opera: /opera/.test(n),
                opr: /opr/.test(n),
                ya: /yabrowser/.test(n),
                fb: /fbav/.test(n),
                ucbrowser: /ubrowser/.test(n) || /ucbrowser/.test(n),
                android: /android/i.test(n),
                puf: /puffin/i.test(n),
                ios: /iphone|ipad|ipod/i.test(n),
                ios9: (/os 9/.test(n) || /os 10/.test(n)) && /like mac os x/.test(n),
                blackberry: /blackberry|bb/i.test(n),
                winphone: /windows\sphone/i.test(n),
                new_webview: /Mobile/i.test(n),
                isMobile: /Android|BlackBerry|iPhone|iPad|iPod|Opera\sMini|IEMobile/i.test(n),
                ucversion: parseInt((n.match(/.+(?:ubrowser|ucbrowser)[\/: ]([\d.]+)/) || [])[1]),
                wversion: parseInt((n.match(/.+(?:windows nt)[\/: ]([\d.]+)/) || [])[1])
            };
        b.version = b.safari ? (n.match(/.+(?:ri)[\/: ]([\d.]+)/) || [])[1] : (n.match(/.+(?:ox|me|ra|ie)[\/: ]([\d.]+)/) || [])[1], b.mac = /mac os/.test(n) && !b.ios && parseInt(b.version) >= 48;
        var _parent = self;
        try {
            _parent = top != self && 'string' == typeof top.document.location.toString() ? top : self
        } catch (e) {}
        return b._parent = _parent, b.screen = {
            GetWindowHeight: function() {
                var a = 0;
                return "number" == typeof b._parent.window.innerHeight ? a = b._parent.window.innerHeight : b._parent.document.documentElement && b._parent.document.documentElement.clientHeight ? a = b._parent.document.documentElement.clientHeight : b._parent.document.body && b._parent.document.body.clientHeight && (a = b._parent.document.body.clientHeight), a
            },
            GetWindowWidth: function() {
                var a = 0;
                return "number" == typeof b._parent.window.innerWidth ? a = b._parent.window.innerWidth : b._parent.document.documentElement && b._parent.document.documentElement.clientWidth ? a = b._parent.document.documentElement.clientWidth : b._parent.document.body && b._parent.document.body.clientWidth && (a = b._parent.document.body.clientWidth), a
            },
            GetWindowTop: function() {
                return void 0 !== b._parent.window.screenTop ? b._parent.window.screenTop : b._parent.window.screenY
            },
            GetWindowLeft: function() {
                return void 0 !== b._parent.window.screenLeft ? b._parent.window.screenLeft : b._parent.window.screenX
            }
        }, b
    }

    function Popunder() {
        return {
            popunderCondition: function() {
                return options.template ? 1 == options.template ? options.timing.period >= 0 && (cookies.getCookie(cookies.ppu_total_count) - 0 < options.max_per_page || !options.max_per_page) && (!options.timing.period || (cookies.getCookie(cookies.ppu_sub) - 0 + 1 <= options.timing.max && system.shown < options.timing.max || !options.timing.max) && !(cookies.getCookie(cookies.ppu_delay) - 0) && !(cookies.getCookie(cookies.ppu_idelay) - 0) && Array.isArray(options.show_on) && (options.show_on.indexOf(0) >= 0 || options.show_on.indexOf(system.showOnCounter) >= 0)) : !(!(options.timing.period >= 0) || options.timing.period && (!(cookies.getCookie(cookies.ppu_sub) - 0 + 1 <= options.timing.max && system.shown < options.timing.max) && options.timing.max || cookies.getCookie(cookies.ppu_delay) - 0 || cookies.getCookie(cookies.ppu_idelay) - 0)) : options.timing.period >= 0 && (!options.timing.period || !(Array.isArray(options.clicks) && options.clicks.indexOf(0) < 0 && options.clicks.indexOf(cookies.getCookie(cookies.ppu_clicks) - 0 + 1) < 0))
            },
            clicks: function(e) {
                system.swipeEvent || (options.template || (system.clickedUrl = null), common().inXP(e.target) && system.popunder.popunderCondition() && ('a' !== e.target.tagName.toLowerCase() || (options.template ? options.ftg : options.ftg && !system.brs.chrome) ? system.clickedUrl = common().isLink(e.target) : (system.clickedUrl = null, system.brs.android && !options.ftg && system.popunder.stopEventPropagation(e)), system.popunder.init(e)), options.template || system.popunder.setCookieCount())
            },
            iosClicks: function(e) {
                common().inXP(e.target) && 'a' === e.target.tagName.toLowerCase() && !system.swipeEvent && system.popunder.popunderCondition() && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, system.popunder.stopEventPropagation(e))
            },
            swipe: function(e) {
                !system.swipeEvent && common().inXP(e.target) && system.popunder.popunderCondition() && ('a' !== e.target.tagName.toLowerCase() || options.ftg ? system.clickedUrl = common().isLink(e.target) : (system.clickedUrl = null, system.brs.android && !options.ftg && system.popunder.stopEventPropagation(e)), system.popunder.init(e)), options.template || system.popunder.setCookieCount()
            },
            addMobileEventListener: function(eventHandler, event1, event2, useCapt) {
                options.swipe !== !0 || system.brs.ios9 && system.brs.safari && !options.mself ? (document.addEventListener('touchstart', function(e) {
                    system.swipeEvent = 0
                }), document.addEventListener('touchmove', function(e) {
                    system.swipeEvent = 1
                }), document.addEventListener(event2, eventHandler, useCapt)) : (document.addEventListener(event1, eventHandler, useCapt), system.brs.android && system.brs.chrome && (system.swipeEvent = 0, document.addEventListener('touchmove', eventHandler, useCapt)))
            },
            setCookieCount: function() {
                system.clickCounter++, cookies.setCookie(cookies.ppu_clicks, system.clickCounter, cookies.getCookie(cookies.ppu_exp) - 0 - (new Date).getTime())
            },
            blur: function() {
                try {
                    if (system.window.blur(), window != window.top ? window.top.focus() : system.window.opener.window.focus(), system.brs.msie || window.self.window.blur(), window.focus(), system.brs.safari)
                        if (system.brs.mac) {
                            var J = window.open("about:blank");
                            J.focus(), J.close()
                        } else setTimeout('window.focus();', 500);
                    system.brs.firefox && this.openCloseWindow()
                } catch (e) {}
            },
            openCloseWindow: function() {
                system.window.open('about:blank').close()
            },
            openWindowA: function(e, u) {
                var clickEvent = document.createEvent('MouseEvents'),
                    j = document.createElement("a");
                j.href = u ? u : options.self ? system.brs._parent.window.location.href : options.url, j.target = "_blank", clickEvent.initMouseEvent("click", !0, !0, window, !system.brs.firefox || 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), j.dispatchEvent(clickEvent), options.ftg && !system.brs.chrome && (e && e.target && e.target.click ? e.target.click() : this.mobileClick(e))
            },
            openWindowIFrame: function(a, b, c, d) {
                "" !== b && null != b || (b = "new_popup_window_" + (new Date).getTime());
                var e = window.document.createElement("iframe");
                e.style.display = "none", d.body.appendChild(e);
                var k = e.contentWindow.document,
                    n = "newWin_" + (new Date).getTime(),
                    m = k.createElement("script");
                m.type = "text/javascript", m.text = ['window.top = null; window.frameElement = null;', 'var newWin = window.open(\'' + a.replace(/\'/g, '\\\'') + '\', \'' + b + '\', \'' + c + '\');', 'window.parent.' + n + ' = newWin;', 'window.parent = null;newWin.opener = null;'].join(''), k.body.appendChild(m), d.body.removeChild(e)
            },
            openWindowOnDesktop: function(evt) {
                system.window = window.open(options.self ? system.brs._parent.window.location.href : options.url, system.brs.opr && system.brs.wversion >= 10 ? '' : 'window_' + Math.ceil(1e5 * Math.random())), evt && options.ftg && !system.brs.chrome && evt.target.click()
            },
            openWindowOnMobile: function(evt) {
                system.window = window.open(options.mself ? system.brs._parent.window.location.href : options.url, 'window_' + Math.ceil(1e5 * Math.random()))
            },
            openWindowOnDesktopWithOptions: function(evt) {
                system.window = system.brs._parent.window.open(options.self ? system.brs._parent.window.location.href : options.url, 'window_' + Math.ceil(1e5 * Math.random()), system.brs.chrome && options.wp || options.self ? '' : system.options), system.brs.firefox || system.brs.safari || this.generateClick(evt)
            },
            windowOpenerNull: function() {
                if (system.window) try {
                    system.window.opener = null
                } catch (e) {}
            },
            locationAssignMobile: function() {
                options.mself ? system.brs._parent.window.location.assign(options.url) : system.clickedUrl && system.brs._parent.window.location.assign(system.clickedUrl)
            },
            locationAssign: function() {
                options.self ? system.brs._parent.window.location.assign(options.url) : system.clickedUrl && system.brs._parent.window.location.assign(system.clickedUrl)
            },
            generateClick: function(e) {
                !options.ftg || system.brs.chrome || system.brs.android && system.brs.safari && !system.brs.chrome && !system.brs.new_webview || common().isLink(e.target) || (e.target.click && !system.brs.isMobile ? e.target.click() : this.mobileClick(e))
            },
            mobileClick: function(e) {
                var cl;
                cl = !e.touches || system.brs.ios && system.brs.safari ? 'click' : system.brs.android && system.brs.firefox ? 'touchstart' : system.brs.android && system.brs.safari ? 'touchstart' : system.brs.android && system.brs.chrome ? 'click' : 'touchend';
                var z = e.target,
                    clickEvent = document.createEvent('MouseEvents');
                clickEvent.initEvent(cl, !0, !0), z.dispatchEvent(clickEvent)
            },
            stopEventPropagation: function(evt) {
                options.ftg || (evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = !0, evt.stopImmediatePropagation())
            },
            focusEventListener: function(f) {
                system.brs.mac || clearInterval(system.interval), system.popunder.focusAchieved(f)
            },
            focusAchieved: function(a) {
                system.postWindowPopCalled || (system.postWindowPopCalled = !0, system.popunder.postWindowPop(a), system.brs._parent.window.removeEventListener("focus", system.popunder.focusEventListener))
            },
            postWindowPop: function(d) {
                system._handle.setAttribute("data", "data:application/pdf;base64,JVBERi0xLjANCjEgMCBvYmo8PC9QYWdlcyAyIDAgUj4+ZW5kb2JqIDIgMCBvYmo8PC9LaWRzWzMgMCBSXS9Db3VudCAxPj5lbmRvYmogMyAwIG9iajw8L01lZGlhQm94WzAgMCAzIDNdPj5lbmRvYmoNCnRyYWlsZXI8PC9Sb290IDEgMCBSPj4="), setTimeout(function() {
                    system._handle.parentNode.parentNode.removeChild(system._handle.parentNode)
                }, 20), system._handle.focus();
                var g = system.brs.screen.GetWindowLeft() + system.brs.screen.GetWindowWidth() / 2 - 1024 / 2,
                    p = system.brs.screen.GetWindowTop() + system.brs.screen.GetWindowHeight() / 2 - 768 / 2;
                try {
                    system.window.moveTo(g, p), system.window.resizeTo(options.fs ? screen.width : options.dimensions.width, options.fs ? screen.height : options.dimensions.height), system.window.location = options.url
                } catch (b) {}
                system.popunder.locationAssign(), system.clickedUrl = null
            },
            init: function(evt) {
                function mp() {
                    return !options.self && !options.wp && system.brs.chrome && !system.brs.ya && !system.brs.edge && system.brs.version && system.brs.version.split(".")[0] && parseInt(system.brs.version.split(".")[0]) >= 41 && !!navigator.mimeTypes["application/pdf"]
                }

                function d(g) {
                    var p = document.createElement("div");
                    p.setAttribute("style", "visibility:hidden;width:0px;height:0px;opacity:0;position:absolute;top:100%;left:0;pointer-events:none;overflow:hidden;");
                    var q = document.createElement("object");
                    return q.setAttribute("data", options.pdf), p.appendChild(q), window.document.body && window.document.body.appendChild(p), q
                }

                function executePop(evt) {
                    system.chromePopTarget = evt.target || evt.srcElement;
                    var o = Math.floor(1e3 * Math.random() + 1).toString();
                    try {
                        system.window = system.brs._parent.window.open("about:blank", o, "directories=0,toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=1,height=1,screenX=19999,screenY=19999"), system.window.document.write("<html><head><script>window.a={};window.a.b=function(){window.resizeTo(1,0);window.moveTo(19999,19999);};window.a.b();window.open('', '_self');</script></head><body></body></html>"), !system.brs.mac && system.popunder.windowOpenerNull()
                    } catch (c) {}
                    system.interval = null, system._handle = d(w), system.brs.mac || (system.interval = setInterval(function() {
                        if (system.brs._parent.window.document.hasFocus()) return clearInterval(system.interval), void system.popunder.focusAchieved(system.chromePopTarget)
                    }, 20)), system.brs._parent.window.addEventListener("focus", system.popunder.focusEventListener), setTimeout(function() {
                        system.brs.mac || clearInterval(system.interval), system.popunder.focusAchieved(system.chromePopTarget)
                    }, 3e3)
                }
                if (options.self && system.popunder.stopEventPropagation(evt), system.clickedUrl && (evt.preventDefault ? evt.preventDefault() : evt.returnValue = !1), system.shown++, options.template && (1 == options.template && cookies.setCookie(cookies.ppu_total_count, cookies.getCookie(cookies.ppu_total_count) - 0 + 1, 1e3 * options.timing.period), cookies.setCookie(cookies.ppu_sub, cookies.getCookie(cookies.ppu_sub) - 0 + 1, 1e3 * options.timing.period), cookies.setCookie(cookies.ppu_delay, 1, options.timing.delay ? 1e3 * options.timing.delay : -1)), system.brs.chrome && !(system.brs.ios || system.brs.android || system.brs.blackberry || system.brs.winphone || system.brs.ucbrowser)) {
                    if (mp()) {
                        system.postWindowPopCalled = !1, executePop(evt);
                        var w = ""
                    } else system.opn() ? system.popunder.openWindowOnDesktop(evt) : system.popunder.openWindowA(evt), system.popunder.windowOpenerNull(), system.popunder.locationAssign(), system.clickedUrl = null;
                    return !0
                }
                if (system.brs.android || system.brs.blackberry || system.brs.winphone)
                    if (!options.mself && options.ftg || (evt.preventDefault ? evt.preventDefault() : evt.returnValue = !1), system.popunder.stopEventPropagation(evt), system.brs.fb) system.window = window.open(options.url), system.popunder.windowOpenerNull();
                    else if (system.brs.winphone) location.assign(options.url);
                else {
                    try {
                        system.opn() ? system.popunder.openWindowOnMobile(evt) : system.popunder.openWindowA(evt)
                    } catch (err) {}
                    system.popunder.generateClick(evt), system.popunder.windowOpenerNull(), system.popunder.locationAssignMobile()
                } else system.brs.ios ? (!options.mself && options.ftg || (evt.preventDefault ? evt.preventDefault() : evt.returnValue = !1), system.popunder.stopEventPropagation(evt), system.brs.ucbrowser ? ('undefined' != typeof evt && (evt.preventDefault ? evt.preventDefault() : evt.returnValue = !1), system.popunder.openWindowIFrame(system.brs.ucversion >= 10 && options.mself ? system.brs._parent.window.location.href : options.url, "", "", window.document), system.popunder.locationAssignMobile()) : (system.brs.fb ? (system.window = window.open(options.url), system.popunder.windowOpenerNull()) : (system.popunder.openWindowIFrame(options.mself ? system.brs._parent.window.location.href : options.url, "", "", window.document), system.window = !1, system.popunder.locationAssignMobile()), system.popunder.generateClick(evt))) : (!options.self && options.ftg || (evt.preventDefault ? evt.preventDefault() : evt.returnValue = !1), options.ftg || (evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = !0), system.opn() ? system.brs.opr || system.brs.ucbrowser ? system.popunder.openWindowOnDesktop(evt) : system.popunder.openWindowOnDesktopWithOptions(evt) : system.popunder.openWindowA(evt), system.popunder.locationAssign(), system.window && (options.self || system.popunder.blur(), system.popunder.windowOpenerNull()), system.window = !1);
                system.clickedUrl = null
            }
        }
    }
    var options = {
            dimensions: {
                height: 760,
                width: 1e3
            },
            hardcore: 0,
            template: ['clicks', 'pages', 'simple'].indexOf('simple'),
            timing: {
                delay: 30,
                init_delay: 0,
                max: 6,
                period: 1 * 60 * 60
            },
            show_on: [0],
            max_per_page: 1,
            clicks: [0],
            url: 'https://custodycraveretard.com/watch?key=70f1d0d918d0dd1374a6cff26208bced' + kwString + '&scrWidth=' + screen.width + '&scrHeight=' + screen.height + '&tz=' + (new Date).getTimezoneOffset() / -60,
            key: '70f1d0d918d0dd1374a6cff26208bced',
            self: false,
            mself: false,
            pdf: 'https://cdn15.acloudimages.com/36/template/pu1473410272.pdf',
            fs: !0,
            wp: false,
            include: [],
            exclude: [],
            ftg: !0,
            swipe: true,
            overlay: false
        },
        system = {
            popunder: new Popunder,
            brs: new Browser,
            clickedUrl: null,
            _handle: null,
            options: 'toolbar=no,directories=no,scrollbars=yes,location=yes,statusbar=yes,menubar=no,resizable=1,width=' + (options.fs ? window.screen.availWidth : options.dimensions.width) + ',height=' + (options.fs ? window.screen.availHeight : options.dimensions.height) + ',left=' + (options.fs ? '0' : Math.round((screen.width - options.dimensions.width) / 2)) + ',top=' + (options.fs ? '0' : Math.round((screen.height - options.dimensions.height) / 2)),
            shown: 0,
            window: !1,
            clickCounter: 0,
            showOnCounter: 0,
            opn: function() {
                return common().isNative(window.open)
            },
            pvarr: function() {
                return common().getArr(options.include)
            },
            pearr: function() {
                return common().getArr(options.exclude)
            },
            swipeEvent: 0,
            interval: null,
            chromePopTarget: null,
            postWindowPopCalled: !1,
            overlayName: 'pt' + Math.random().toString(36).substr(10)
        },
        ver = '16.11.86.1';
    Array.isArray || (Array.isArray = function(obj) {
        return "[object Array]" === Object.prototype.toString.call(obj)
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(find, i) {
        void 0 === i && (i = 0), i < 0 && (i += this.length), i < 0 && (i = 0);
        for (var n = this.length; i < n; i++)
            if (i in this && this[i] === find) return i;
        return -1
    });
    var cookies = {
            ppu_main: 'ppu_main_' + options.key,
            ppu_exp: 'ppu_exp_' + options.key,
            ppu_clicks: 'ppu_clicks_' + options.key,
            ppu_show_on: 'ppu_show_on_' + options.key,
            ppu_sub: 'ppu_sub_' + options.key,
            ppu_delay: 'ppu_delay_' + options.key,
            ppu_idelay: 'ppu_idelay_' + options.key,
            ppu_total_count: 'total_count_' + options.key,
            init: function(options) {
                !options.template && options.clicks && (this.getCookie(this.ppu_exp) || this.setCookie(this.ppu_clicks, 0, -1), system.clickCounter = this.getCookie(this.ppu_clicks) - 0), 1 == options.template && (options.show_on && (system.showOnCounter = this.getCookie(this.ppu_show_on) - 0 + 1, this.getCookie(this.ppu_exp) ? this.setCookie(this.ppu_show_on, system.showOnCounter, this.getCookie(this.ppu_exp) - 0 - (new Date).getTime()) : this.setCookie(this.ppu_show_on, system.showOnCounter, 1e3 * options.timing.period)), this.setCookie(this.ppu_delay, 0, -1), this.setCookie(this.ppu_total_count, 0, -1)), options.template && !options.timing.period && this.setCookie(this.ppu_sub, 0, -1)
            },
            setCookie: function(name, value, interval) {
                return window != window.top ? this.setStorage(name, value + (interval ? '; expires=' + new Date((new Date).getTime() + interval).toUTCString() : '')) : document.cookie = name + '=' + value + ';' + (interval ? ' expires=' + new Date((new Date).getTime() + interval).toUTCString() + ';' : '') + ' path=/', !0
            },
            getCookie: function(name) {
                if (window != window.top) {
                    for (var cookies = this.localStorage(name).toString().split('; '), i = 0; i < cookies.length; i++)
                        if ('expires' == cookies[i].split('=')[0]) return Date.parse(cookies[i].split('=')[1]) < Date.now() ? (this.storageDelete(name), !1) : cookies[0]
                } else
                    for (var cookies = document.cookie.toString().split('; '), i = 0; i < cookies.length; i++)
                        if (cookies[i].split('=')[0] == name) return cookies[i].split('=')[1]; return !1
            },
            setStorage: function(itemName, itemValue) {
                if (this.supportsLocalStorage()) {
                    if (window.localStorage) return window.localStorage.setItem(itemName, itemValue), !0;
                    try {
                        var storage = document.body;
                        return storage.addBehavior("#default#userData"), storage.setAttribute(itemName, itemValue), storage.save('auth'), !0
                    } catch (e) {
                        return !1
                    }
                }
            },
            localStorage: function(itemName) {
                if (window.localStorage) {
                    var itemValue = window.localStorage.getItem(itemName);
                    return !!itemValue && itemValue
                }
                var storage = document.body;
                try {
                    storage.addBehavior("#default#userData"), storage.load('auth');
                    var itemValue = storage.getAttribute(itemName);
                    return !!itemValue && itemValue
                } catch (e) {
                    return !1
                }
            },
            storageDelete: function(itemName) {
                if (window.localStorage && window.localStorage.removeItem(itemName)) return !0;
                var storage = document.body;
                try {
                    return storage.addBehavior("#default#userData"), storage.load('auth'), storage.removeAttribute(itemName), !0
                } catch (e) {
                    return !1
                }
            },
            supportsLocalStorage: function() {
                try {
                    return localStorage.setItem("storageSupport", 1), localStorage.removeItem("storageSupport"), "localStorage" in window && null !== window.localStorage
                } catch (a) {
                    return a.code === DOMException.QUOTA_EXCEEDED_ERR && 0 === localStorage.length, !1
                }
            }
        },
        common = function() {
            return {
                isNative: function(fn) {
                    return /\{\s*\[native code\]\s*\}/.test('' + fn)
                },
                findUpTag: function(element, tag) {
                    for (; element.parentNode;)
                        if (element = element.parentNode, element.tagName === tag) return element;
                    return null
                },
                isDescendant: function(parent, child) {
                    for (var node = child.parentNode; null != node;) {
                        if (node == parent) return !0;
                        node = node.parentNode
                    }
                    return !1
                },
                getQuery: function(query) {
                    return Array.prototype.slice.call(document.querySelectorAll(query))
                },
                getArr: function(arr) {
                    var res = [];
                    if (arr.length)
                        for (var i = 0; i < arr.length; i++) {
                            var h = this.getQuery(arr[i]);
                            res = h.length ? res.concat(h) : res
                        }
                    return res
                },
                inXP: function(trg) {
                    var desci = 0,
                        desce = 0;
                    if (system.pvarr().length)
                        for (var i = 0; i < system.pvarr().length; i++) this.isDescendant(system.pvarr()[i], trg) && desci++;
                    if (system.pearr().length)
                        for (i = 0; i < system.pearr().length; i++) this.isDescendant(system.pearr()[i], trg) && desce++;
                    return trg.className.indexOf('dtnoppu') == -1 && (0 == options.include.length || !!system.pvarr().length && (system.pvarr().indexOf(trg) >= 0 || desci > 0)) && (0 == system.pearr().length || !!system.pearr().length && system.pearr().indexOf(trg) < 0 && 0 == desce)
                },
                isLink: function(trg) {
                    var parentA = this.findUpTag(trg, 'A');
                    return 'a' === trg.tagName.toLowerCase() && trg.href.toString().indexOf("#") == -1 && trg.href.indexOf("javascript:") == -1 || parentA && parentA.href.toString().indexOf("#") == -1 && parentA.href.indexOf("javascript:") == -1 ? trg.href ? trg.href : parentA.href : null
                }
            }
        },
        scripts = document.getElementsByTagName('script'),
        script = scripts[scripts.length - 1],
        domain = script.getAttribute('data-domain');
    if (domain && options.url.indexOf("//") > -1) {
        var url = options.url.split('/');
        url[2] = domain, options.url = url.join("/")
    }
    if (cookies.init(options), document.addEventListener) system.brs.ios || system.brs.android || system.brs.blackberry || system.brs.winphone ? (system.brs.android && system.brs.chrome ? system.popunder.addMobileEventListener(system.popunder.clicks, "mousemove", "touchend") : system.brs.android && system.brs.safari && !system.brs.chrome && !system.brs.new_webview ? system.popunder.addMobileEventListener(system.popunder.clicks, "touchstart", "touchend") : system.brs.android && system.brs.firefox || system.brs.ios9 || system.brs.android && system.brs.safari && !system.brs.chrome ? system.popunder.addMobileEventListener(system.popunder.clicks, "touchend", "touchend") : 'ontouchstart' in document.documentElement ? system.popunder.addMobileEventListener(system.popunder.clicks, "touchstart", "touchend") : document.addEventListener("click", system.popunder.clicks), system.brs.ios && system.popunder.addMobileEventListener(system.popunder.iosClicks, "touchstart", "touchend"), system.brs.chrome || system.brs.ios9 || (system.brs.ios || system.brs.android && system.brs.firefox ? system.popunder.addMobileEventListener(system.popunder.swipe, "mousemove", "mousemove", !1) : system.popunder.addMobileEventListener(system.popunder.swipe, "touchmove", "touchmove", !1))) : document.addEventListener(system.brs.chrome ? 'mousedown' : 'click', function(e) {
        system.clickedUrl = null, common().inXP(e.target) && system.popunder.popunderCondition() && (system.clickedUrl = common().isLink(e.target), system.popunder.init(e)), options.template || system.popunder.setCookieCount()
    }, !0);
    else if (document.attachEvent) document.attachEvent('onclick', function(e) {
        system.clickedUrl = null;
        var trg = system.brs.msie ? e.srcElement : e.target ? e.target : '';
        common().inXP(trg) && system.popunder.popunderCondition() && (system.clickedUrl = common().isLink(e.target), system.popunder.init(e)), options.template || system.popunder.setCookieCount()
    });
    else var bodyReady = setInterval(function() {
        'undefined' != typeof document.body && document.body && (document.body.onclick = function(e) {
            system.clickedUrl = null;
            var trg = system.brs.msie ? e.srcElement : e.target ? e.target : '';
            common().inXP(trg) && system.popunder.popunderCondition() && (system.clickedUrl = common().isLink(e.target), system.popunder.init(e)), options.template || system.popunder.setCookieCount()
        }, clearInterval(bodyReady))
    }, 10);
    options.hardcore && (window.onbeforeunload = function() {
        if (!system.shown) return system.shown++, setTimeout(function() {
            window.location.href = options.url
        }, 10), ''
    }), setInterval(function() {
        if (options.template ? (cookies.getCookie(cookies.ppu_main) || (cookies.setCookie(cookies.ppu_main, 1, 1e3 * options.timing.period), 1 == options.template && cookies.setCookie(cookies.ppu_exp, (new Date).getTime() + 1e3 * options.timing.period, 1e3 * (0 == options.timing.period ? -1 : options.timing.period)), cookies.setCookie(cookies.ppu_delay, 0, -1), cookies.setCookie(cookies.ppu_idelay, 1, 1e3 * options.timing.init_delay), cookies.setCookie(cookies.ppu_sub, 0, -1), cookies.setCookie(cookies.ppu_total_count, 0, -1)), !options.timing.period && system.shown < options.timing.max && (cookies.setCookie(cookies.ppu_sub, 0, -1), cookies.setCookie(cookies.ppu_delay, 0, -1)), options.timing.init_delay || cookies.setCookie(cookies.ppu_idelay, 0, -1)) : cookies.getCookie(cookies.ppu_exp) || (cookies.setCookie(cookies.ppu_clicks, 0, -1), system.clickCounter = 0, cookies.setCookie(cookies.ppu_exp, (new Date).getTime() + 1e3 * options.timing.period, 1e3 * (0 == options.timing.period ? -1 : options.timing.period))), options.overlay) {
            var b = document.getElementsByClassName(system.overlayName).length ? document.getElementsByClassName(system.overlayName)[0] : document.createElement("div");
            system.popunder.popunderCondition() ? (b.className = system.overlayName, b.style.height = "100%", b.style.width = "100%", b.style.position = "fixed", b.style.top = "0", b.style.left = "0", b.style.zIndex = "3000", b.style.backgroundImage = "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)", document.getElementsByClassName(system.overlayName).length || document.body.appendChild(b)) : document.getElementsByClassName(system.overlayName).length > 0 && b.parentNode.removeChild(b)
        }
    }, 500)
});