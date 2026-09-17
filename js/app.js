(() => {
    var Ms = Object.defineProperty,
        _s = Object.defineProperties,
        As = Object.getOwnPropertyDescriptors,
        qi = Object.getOwnPropertySymbols,
        ws = Object.prototype.hasOwnProperty,
        ks = Object.prototype.propertyIsEnumerable,
        Wi = t => {
            throw TypeError(t)
        },
        Ee = Math.pow,
        ni = (t, e, i) => e in t ? Ms(t, e, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: i
        }) : t[e] = i,
        xe = (t, e) => {
            for (var i in e || (e = {})) ws.call(e, i) && ni(t, i, e[i]);
            if (qi)
                for (var i of qi(e)) ks.call(e, i) && ni(t, i, e[i]);
            return t
        },
        ht = (t, e) => _s(t, As(e)),
        O = (t, e, i) => ni(t, "symbol" != typeof e ? e + "" : e, i),
        oi = (t, e, i) => e.has(t) || Wi("Cannot " + i),
        ie = (t, e, i) => (oi(t, e, "read from private field"), i ? i.call(t) : e.get(t)),
        fe = (t, e, i) => e.has(t) ? Wi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i),
        ae = (t, e, i, r) => (oi(t, e, "write to private field"), r ? r.call(t, i) : e.set(t, i), i),
        H = (t, e, i) => (oi(t, e, "access private method"), i),
        Ot = (t, e, i) => new Promise((r, s) => {
            var a = t => {
                    try {
                        o(i.next(t))
                    } catch (t) {
                        s(t)
                    }
                },
                n = t => {
                    try {
                        o(i.throw(t))
                    } catch (t) {
                        s(t)
                    }
                },
                o = t => t.done ? r(t.value) : Promise.resolve(t.value).then(a, n);
            o((i = i.apply(t, e)).next())
        }),
        Ds = "1.3.8";

    function Ui(t, e, i) {
        return Math.max(t, Math.min(e, i))
    }

    function Is(t, e, i) {
        return (1 - i) * t + i * e
    }

    function Fs(t, e, i, r) {
        return Is(t, e, 1 - Math.exp(-i * r))
    }

    function Ls(t, e) {
        return (t % e + e) % e
    }
    var Os = class {
        constructor() {
            O(this, "isRunning", !1), O(this, "value", 0), O(this, "from", 0), O(this, "to", 0), O(this, "currentTime", 0), O(this, "lerp"), O(this, "duration"), O(this, "easing"), O(this, "onUpdate")
        }
        advance(t) {
            var e;
            if (!this.isRunning) return;
            let i = !1;
            if (this.duration && this.easing) {
                this.currentTime += t;
                let e = Ui(0, this.currentTime / this.duration, 1);
                i = e >= 1;
                let r = i ? 1 : this.easing(e);
                this.value = this.from + (this.to - this.from) * r
            } else this.lerp ? (this.value = Fs(this.value, this.to, 60 * this.lerp, t), Math.round(this.value) === this.to && (this.value = this.to, i = !0)) : (this.value = this.to, i = !0);
            i && this.stop(), null == (e = this.onUpdate) || e.call(this, this.value, i)
        }
        stop() {
            this.isRunning = !1
        }
        fromTo(t, e, {
            lerp: i,
            duration: r,
            easing: s,
            onStart: a,
            onUpdate: n
        }) {
            this.from = this.value = t, this.to = e, this.lerp = i, this.duration = r, this.easing = s, this.currentTime = 0, this.isRunning = !0, null == a || a(), this.onUpdate = n
        }
    };

    function zs(t, e) {
        let i;
        return function(...r) {
            let s = this;
            clearTimeout(i), i = setTimeout(() => {
                i = void 0, t.apply(s, r)
            }, e)
        }
    }
    var Vs = class {
            constructor(t, e, {
                autoResize: i = !0,
                debounce: r = 250
            } = {}) {
                O(this, "width", 0), O(this, "height", 0), O(this, "scrollHeight", 0), O(this, "scrollWidth", 0), O(this, "debouncedResize"), O(this, "wrapperResizeObserver"), O(this, "contentResizeObserver"), O(this, "resize", () => {
                    this.onWrapperResize(), this.onContentResize()
                }), O(this, "onWrapperResize", () => {
                    this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight)
                }), O(this, "onContentResize", () => {
                    this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth)
                }), this.wrapper = t, this.content = e, i && (this.debouncedResize = zs(this.resize, r), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize, !1) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize()
            }
            destroy() {
                var t, e;
                null == (t = this.wrapperResizeObserver) || t.disconnect(), null == (e = this.contentResizeObserver) || e.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize, !1)
            }
            get limit() {
                return {
                    x: this.scrollWidth - this.width,
                    y: this.scrollHeight - this.height
                }
            }
        },
        Ki = class {
            constructor() {
                O(this, "events", {})
            }
            emit(t, ...e) {
                var i;
                let r = this.events[t] || [];
                for (let t = 0, s = r.length; t < s; t++) null == (i = r[t]) || i.call(r, ...e)
            }
            on(t, e) {
                var i;
                return null != (i = this.events[t]) && i.push(e) || (this.events[t] = [e]), () => {
                    var i;
                    this.events[t] = null == (i = this.events[t]) ? void 0 : i.filter(t => e !== t)
                }
            }
            off(t, e) {
                var i;
                this.events[t] = null == (i = this.events[t]) ? void 0 : i.filter(t => e !== t)
            }
            destroy() {
                this.events = {}
            }
        },
        Xi = 100 / 6,
        Fe = {
            passive: !1
        },
        Bs = class {
            constructor(t, e = {
                wheelMultiplier: 1,
                touchMultiplier: 1
            }) {
                O(this, "touchStart", {
                    x: 0,
                    y: 0
                }), O(this, "lastDelta", {
                    x: 0,
                    y: 0
                }), O(this, "window", {
                    width: 0,
                    height: 0
                }), O(this, "emitter", new Ki), O(this, "onTouchStart", t => {
                    let {
                        clientX: e,
                        clientY: i
                    } = t.targetTouches ? t.targetTouches[0] : t;
                    this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = {
                        x: 0,
                        y: 0
                    }, this.emitter.emit("scroll", {
                        deltaX: 0,
                        deltaY: 0,
                        event: t
                    })
                }), O(this, "onTouchMove", t => {
                    let {
                        clientX: e,
                        clientY: i
                    } = t.targetTouches ? t.targetTouches[0] : t, r = -(e - this.touchStart.x) * this.options.touchMultiplier, s = -(i - this.touchStart.y) * this.options.touchMultiplier;
                    this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = {
                        x: r,
                        y: s
                    }, this.emitter.emit("scroll", {
                        deltaX: r,
                        deltaY: s,
                        event: t
                    })
                }), O(this, "onTouchEnd", t => {
                    this.emitter.emit("scroll", {
                        deltaX: this.lastDelta.x,
                        deltaY: this.lastDelta.y,
                        event: t
                    })
                }), O(this, "onWheel", t => {
                    let {
                        deltaX: e,
                        deltaY: i,
                        deltaMode: r
                    } = t;
                    e *= 1 === r ? Xi : 2 === r ? this.window.width : 1, i *= 1 === r ? Xi : 2 === r ? this.window.height : 1, e *= this.options.wheelMultiplier, i *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
                        deltaX: e,
                        deltaY: i,
                        event: t
                    })
                }), O(this, "onWindowResize", () => {
                    this.window = {
                        width: window.innerWidth,
                        height: window.innerHeight
                    }
                }), this.element = t, this.options = e, window.addEventListener("resize", this.onWindowResize, !1), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, Fe), this.element.addEventListener("touchstart", this.onTouchStart, Fe), this.element.addEventListener("touchmove", this.onTouchMove, Fe), this.element.addEventListener("touchend", this.onTouchEnd, Fe)
            }
            on(t, e) {
                return this.emitter.on(t, e)
            }
            destroy() {
                this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize, !1), this.element.removeEventListener("wheel", this.onWheel, Fe), this.element.removeEventListener("touchstart", this.onTouchStart, Fe), this.element.removeEventListener("touchmove", this.onTouchMove, Fe), this.element.removeEventListener("touchend", this.onTouchEnd, Fe)
            }
        },
        Yi = t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        Zi = class {
            constructor({
                wrapper: t = window,
                content: e = document.documentElement,
                eventsTarget: i = t,
                smoothWheel: r = !0,
                syncTouch: s = !1,
                syncTouchLerp: a = .075,
                touchInertiaExponent: n = 1.7,
                duration: o,
                easing: l,
                lerp: h = .1,
                infinite: p = !1,
                orientation: c = "vertical",
                gestureOrientation: d = "vertical",
                touchMultiplier: u = 1,
                wheelMultiplier: f = 1,
                autoResize: m = !0,
                prevent: g,
                virtualScroll: y,
                overscroll: v = !0,
                autoRaf: b = !1,
                anchors: S = !1,
                autoToggle: w = !1,
                allowNestedScroll: E = !1,
                __experimental__naiveDimensions: x = !1
            } = {}) {
                O(this, "_isScrolling", !1), O(this, "_isStopped", !1), O(this, "_isLocked", !1), O(this, "_preventNextNativeScrollEvent", !1), O(this, "_resetVelocityTimeout", null), O(this, "__rafID", null), O(this, "isTouching"), O(this, "time", 0), O(this, "userData", {}), O(this, "lastVelocity", 0), O(this, "velocity", 0), O(this, "direction", 0), O(this, "options"), O(this, "targetScroll"), O(this, "animatedScroll"), O(this, "animate", new Os), O(this, "emitter", new Ki), O(this, "dimensions"), O(this, "virtualScroll"), O(this, "onScrollEnd", t => {
                    t instanceof CustomEvent || ("smooth" === this.isScrolling || !1 === this.isScrolling) && t.stopPropagation()
                }), O(this, "dispatchScrollendEvent", () => {
                    this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
                        bubbles: this.options.wrapper === window,
                        detail: {
                            lenisScrollEnd: !0
                        }
                    }))
                }), O(this, "onTransitionEnd", t => {
                    if (t.propertyName.includes("overflow")) {
                        let t = this.isHorizontal ? "overflow-x" : "overflow-y",
                            e = getComputedStyle(this.rootElement)[t];
                        ["hidden", "clip"].includes(e) ? this.internalStop() : this.internalStart()
                    }
                }), O(this, "onClick", t => {
                    let e = t.composedPath().find(t => {
                        var e, i, r;
                        return t instanceof HTMLAnchorElement && ((null == (e = t.getAttribute("href")) ? void 0 : e.startsWith("#")) || (null == (i = t.getAttribute("href")) ? void 0 : i.startsWith("/#")) || (null == (r = t.getAttribute("href")) ? void 0 : r.startsWith("./#")))
                    });
                    if (e) {
                        let t = e.getAttribute("href");
                        if (t) {
                            let e = "object" == typeof this.options.anchors && this.options.anchors ? this.options.anchors : void 0,
                                i = `#${t.split("#")[1]}`;
                            ["#", "/#", "./#", "#top", "/#top", "./#top"].includes(t) && (i = 0), this.scrollTo(i, e)
                        }
                    }
                }), O(this, "onPointerDown", t => {
                    1 === t.button && this.reset()
                }), O(this, "onVirtualScroll", t => {
                    if ("function" == typeof this.options.virtualScroll && !1 === this.options.virtualScroll(t)) return;
                    let {
                        deltaX: e,
                        deltaY: i,
                        event: r
                    } = t;
                    if (this.emitter.emit("virtual-scroll", {
                            deltaX: e,
                            deltaY: i,
                            event: r
                        }), r.ctrlKey || r.lenisStopPropagation) return;
                    let s = r.type.includes("touch"),
                        a = r.type.includes("wheel");
                    this.isTouching = "touchstart" === r.type || "touchmove" === r.type;
                    let n = 0 === e && 0 === i;
                    if (this.options.syncTouch && s && "touchstart" === r.type && n && !this.isStopped && !this.isLocked) return void this.reset();
                    let o = "vertical" === this.options.gestureOrientation && 0 === i || "horizontal" === this.options.gestureOrientation && 0 === e;
                    if (n || o) return;
                    let l = r.composedPath();
                    l = l.slice(0, l.indexOf(this.rootElement));
                    let h = this.options.prevent;
                    if (l.find(t => {
                            var r, n, o;
                            return t instanceof HTMLElement && ("function" == typeof h && (null == h ? void 0 : h(t)) || (null == (r = t.hasAttribute) ? void 0 : r.call(t, "data-lenis-prevent")) || s && (null == (n = t.hasAttribute) ? void 0 : n.call(t, "data-lenis-prevent-touch")) || a && (null == (o = t.hasAttribute) ? void 0 : o.call(t, "data-lenis-prevent-wheel")) || this.options.allowNestedScroll && this.checkNestedScroll(t, {
                                deltaX: e,
                                deltaY: i
                            }))
                        })) return;
                    if (this.isStopped || this.isLocked) return void(r.cancelable && r.preventDefault());
                    if (!(this.options.syncTouch && s || this.options.smoothWheel && a)) return this.isScrolling = "native", this.animate.stop(), void(r.lenisStopPropagation = !0);
                    let p = i;
                    "both" === this.options.gestureOrientation ? p = Math.abs(i) > Math.abs(e) ? i : e : "horizontal" === this.options.gestureOrientation && (p = e), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && (this.animatedScroll > 0 && this.animatedScroll < this.limit || 0 === this.animatedScroll && i > 0 || this.animatedScroll === this.limit && i < 0)) && (r.lenisStopPropagation = !0), r.cancelable && r.preventDefault();
                    let c = s && this.options.syncTouch,
                        d = s && "touchend" === r.type;
                    d && (p = Math.sign(this.velocity) * Math.pow(Math.abs(this.velocity), this.options.touchInertiaExponent)), this.scrollTo(this.targetScroll + p, xe({
                        programmatic: !1
                    }, c ? {
                        lerp: d ? this.options.syncTouchLerp : 1
                    } : {
                        lerp: this.options.lerp,
                        duration: this.options.duration,
                        easing: this.options.easing
                    }))
                }), O(this, "onNativeScroll", () => {
                    if (null !== this._resetVelocityTimeout && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this._preventNextNativeScrollEvent) this._preventNextNativeScrollEvent = !1;
                    else if (!1 === this.isScrolling || "native" === this.isScrolling) {
                        let t = this.animatedScroll;
                        this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - t, this.direction = Math.sign(this.animatedScroll - t), this.isStopped || (this.isScrolling = "native"), this.emit(), 0 !== this.velocity && (this._resetVelocityTimeout = setTimeout(() => {
                            this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = !1, this.emit()
                        }, 400))
                    }
                }), O(this, "raf", t => {
                    let e = t - (this.time || t);
                    this.time = t, this.animate.advance(.001 * e), this.options.autoRaf && (this.__rafID = requestAnimationFrame(this.raf))
                }), window.lenisVersion = Ds, (!t || t === document.documentElement) && (t = window), "number" == typeof o && "function" != typeof l ? l = Yi : "function" == typeof l && "number" != typeof o && (o = 1), this.options = {
                    wrapper: t,
                    content: e,
                    eventsTarget: i,
                    smoothWheel: r,
                    syncTouch: s,
                    syncTouchLerp: a,
                    touchInertiaExponent: n,
                    duration: o,
                    easing: l,
                    lerp: h,
                    infinite: p,
                    gestureOrientation: d,
                    orientation: c,
                    touchMultiplier: u,
                    wheelMultiplier: f,
                    autoResize: m,
                    prevent: g,
                    virtualScroll: y,
                    overscroll: v,
                    autoRaf: b,
                    anchors: S,
                    autoToggle: w,
                    allowNestedScroll: E,
                    __experimental__naiveDimensions: x
                }, this.dimensions = new Vs(t, e, {
                    autoResize: m
                }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll, !1), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, {
                    capture: !0
                }), this.options.anchors && this.options.wrapper === window && this.options.wrapper.addEventListener("click", this.onClick, !1), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown, !1), this.virtualScroll = new Bs(i, {
                    touchMultiplier: u,
                    wheelMultiplier: f
                }), this.virtualScroll.on("scroll", this.onVirtualScroll), this.options.autoToggle && this.rootElement.addEventListener("transitionend", this.onTransitionEnd, {
                    passive: !0
                }), this.options.autoRaf && (this.__rafID = requestAnimationFrame(this.raf))
            }
            destroy() {
                this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, !1), this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, {
                    capture: !0
                }), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown, !1), this.options.anchors && this.options.wrapper === window && this.options.wrapper.removeEventListener("click", this.onClick, !1), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName(), this.__rafID && cancelAnimationFrame(this.__rafID)
            }
            on(t, e) {
                return this.emitter.on(t, e)
            }
            off(t, e) {
                return this.emitter.off(t, e)
            }
            setScroll(t) {
                this.isHorizontal ? this.options.wrapper.scrollTo({
                    left: t,
                    behavior: "instant"
                }) : this.options.wrapper.scrollTo({
                    top: t,
                    behavior: "instant"
                })
            }
            resize() {
                this.dimensions.resize(), this.animatedScroll = this.targetScroll = this.actualScroll, this.emit()
            }
            emit() {
                this.emitter.emit("scroll", this)
            }
            reset() {
                this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop()
            }
            start() {
                if (this.isStopped) {
                    if (this.options.autoToggle) return void this.rootElement.style.removeProperty("overflow");
                    this.internalStart()
                }
            }
            internalStart() {
                this.isStopped && (this.reset(), this.isStopped = !1, this.emit())
            }
            stop() {
                if (!this.isStopped) {
                    if (this.options.autoToggle) return void this.rootElement.style.setProperty("overflow", "clip");
                    this.internalStop()
                }
            }
            internalStop() {
                this.isStopped || (this.reset(), this.isStopped = !0, this.emit())
            }
            scrollTo(t, {
                offset: e = 0,
                immediate: i = !1,
                lock: r = !1,
                duration: s = this.options.duration,
                easing: a = this.options.easing,
                lerp: n = this.options.lerp,
                onStart: o,
                onComplete: l,
                force: h = !1,
                programmatic: p = !0,
                userData: c
            } = {}) {
                if (!this.isStopped && !this.isLocked || h) {
                    if ("string" == typeof t && ["top", "left", "start"].includes(t)) t = 0;
                    else if ("string" == typeof t && ["bottom", "right", "end"].includes(t)) t = this.limit;
                    else {
                        let i;
                        if ("string" == typeof t ? i = document.querySelector(t) : t instanceof HTMLElement && null != t && t.nodeType && (i = t), i) {
                            if (this.options.wrapper !== window) {
                                let t = this.rootElement.getBoundingClientRect();
                                e -= this.isHorizontal ? t.left : t.top
                            }
                            let r = i.getBoundingClientRect();
                            t = (this.isHorizontal ? r.left : r.top) + this.animatedScroll
                        }
                    }
                    if ("number" == typeof t) {
                        if (t += e, t = Math.round(t), this.options.infinite) {
                            if (p) {
                                this.targetScroll = this.animatedScroll = this.scroll;
                                let e = t - this.animatedScroll;
                                e > this.limit / 2 ? t -= this.limit : e < -this.limit / 2 && (t += this.limit)
                            }
                        } else t = Ui(0, t, this.limit);
                        if (t === this.targetScroll) return null == o || o(this), void(null == l || l(this));
                        if (this.userData = null != c ? c : {}, i) return this.animatedScroll = this.targetScroll = t, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), null == l || l(this), this.userData = {}, void requestAnimationFrame(() => {
                            this.dispatchScrollendEvent()
                        });
                        p || (this.targetScroll = t), "number" == typeof s && "function" != typeof a ? a = Yi : "function" == typeof a && "number" != typeof s && (s = 1), this.animate.fromTo(this.animatedScroll, t, {
                            duration: s,
                            easing: a,
                            lerp: n,
                            onStart: () => {
                                r && (this.isLocked = !0), this.isScrolling = "smooth", null == o || o(this)
                            },
                            onUpdate: (t, e) => {
                                this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = t - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t, this.setScroll(this.scroll), p && (this.targetScroll = t), e || this.emit(), e && (this.reset(), this.emit(), null == l || l(this), this.userData = {}, requestAnimationFrame(() => {
                                    this.dispatchScrollendEvent()
                                }), this.preventNextNativeScrollEvent())
                            }
                        })
                    }
                }
            }
            preventNextNativeScrollEvent() {
                this._preventNextNativeScrollEvent = !0, requestAnimationFrame(() => {
                    this._preventNextNativeScrollEvent = !1
                })
            }
            checkNestedScroll(t, {
                deltaX: e,
                deltaY: i
            }) {
                var r, s;
                let a, n, o, l, h, p, c, d, u, f, m, g, y, v, b = Date.now(),
                    S = null != (r = t._lenis) ? r : t._lenis = {},
                    w = this.options.gestureOrientation;
                if (b - (null != (s = S.time) ? s : 0) > 2e3) {
                    S.time = Date.now();
                    let e = window.getComputedStyle(t);
                    S.computedStyle = e;
                    let i = e.overflowX,
                        r = e.overflowY;
                    if (a = ["auto", "overlay", "scroll"].includes(i), n = ["auto", "overlay", "scroll"].includes(r), S.hasOverflowX = a, S.hasOverflowY = n, !a && !n || "vertical" === w && !n || "horizontal" === w && !a) return !1;
                    h = t.scrollWidth, p = t.scrollHeight, c = t.clientWidth, d = t.clientHeight, o = h > c, l = p > d, S.isScrollableX = o, S.isScrollableY = l, S.scrollWidth = h, S.scrollHeight = p, S.clientWidth = c, S.clientHeight = d
                } else o = S.isScrollableX, l = S.isScrollableY, a = S.hasOverflowX, n = S.hasOverflowY, h = S.scrollWidth, p = S.scrollHeight, c = S.clientWidth, d = S.clientHeight;
                if (!((a || n) && (o || l) && ("vertical" !== w || n && l) && ("horizontal" !== w || a && o))) return !1;
                if ("horizontal" === w) u = "x";
                else if ("vertical" === w) u = "y";
                else {
                    0 !== e && a && o && (u = "x"), 0 !== i && n && l && (u = "y")
                }
                if (!u) return !1;
                if ("x" === u) f = t.scrollLeft, m = h - c, g = e, y = a, v = o;
                else {
                    if ("y" !== u) return !1;
                    f = t.scrollTop, m = p - d, g = i, y = n, v = l
                }
                return (g > 0 ? f < m : f > 0) && y && v
            }
            get rootElement() {
                return this.options.wrapper === window ? document.documentElement : this.options.wrapper
            }
            get limit() {
                return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"]
            }
            get isHorizontal() {
                return "horizontal" === this.options.orientation
            }
            get actualScroll() {
                var t, e;
                let i = this.options.wrapper;
                return this.isHorizontal ? null != (t = i.scrollX) ? t : i.scrollLeft : null != (e = i.scrollY) ? e : i.scrollTop
            }
            get scroll() {
                return this.options.infinite ? Ls(this.animatedScroll, this.limit) : this.animatedScroll
            }
            get progress() {
                return 0 === this.limit ? 1 : this.scroll / this.limit
            }
            get isScrolling() {
                return this._isScrolling
            }
            set isScrolling(t) {
                this._isScrolling !== t && (this._isScrolling = t, this.updateClassName())
            }
            get isStopped() {
                return this._isStopped
            }
            set isStopped(t) {
                this._isStopped !== t && (this._isStopped = t, this.updateClassName())
            }
            get isLocked() {
                return this._isLocked
            }
            set isLocked(t) {
                this._isLocked !== t && (this._isLocked = t, this.updateClassName())
            }
            get isSmooth() {
                return "smooth" === this.isScrolling
            }
            get className() {
                let t = "lenis";
                return this.options.autoToggle && (t += " lenis-autoToggle"), this.isStopped && (t += " lenis-stopped"), this.isLocked && (t += " lenis-locked"), this.isScrolling && (t += " lenis-scrolling"), "smooth" === this.isScrolling && (t += " lenis-smooth"), t
            }
            updateClassName() {
                this.cleanUpClassName(), this.rootElement.className = `${this.rootElement.className} ${this.className}`.trim()
            }
            cleanUpClassName() {
                this.rootElement.className = this.rootElement.className.replace(/lenis(-\w+)?/g, "").trim()
            }
        };

    var ho = "fonts-loaded",
        kt,
        co = "M0,0 L0.076,0.5737 L0.1187,0.8382 L0.1419,0.9463 L0.1654,1.0292 L0.1897,1.0886 L0.2153,1.1258 L0.2297,1.137 L0.2448,1.1424 L0.261,1.1423 L0.2786,1.1366 L0.3101,1.1165 L0.3862,1.0507 L0.4257,1.0219 L0.4699,0.9995 L0.5163,0.9872 L0.5877,0.9842 L0.8126,1.0011 L1,1",
        po = "M0,0 L0.017,0.029 L0.036,0.113 L0.111,0.604 L0.15,0.809 L0.191,0.949 L0.213,0.995 L0.236,1.026 L0.262,1.044 L0.293,1.049 L0.435,1.01 L0.512,1 L1,1";

    if (typeof CustomEase !== 'undefined') {
        CustomEase.create("smooth-ease", "0.32, 0.72, 0, 1");
        CustomEase.create("elastic-ease-out", co);
        CustomEase.create("elastic-ease-out-soft", po);
    }
    if (typeof gsap !== 'undefined') {
        gsap.defaults({
            ease: "smooth-ease"
        });
    }

    function uo() {
        kt = new Zi({
            lerp: .18,
            autoRaf: !0
        });
    }

    function go() {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        if (typeof gsap === 'undefined') return;
        let t = gsap.utils.clamp(-30, 30),
            e = gsap.utils.clamp(-8, 8);
        document.querySelectorAll("[data-inertia]").forEach(i => {
            let r = 0, s = 0, a = 0, n = 0, o = null;
            i.addEventListener("mousemove", ev => {
                o || (o = requestAnimationFrame(() => {
                    a = ev.clientX - r, n = ev.clientY - s, r = ev.clientX, s = ev.clientY, o = null;
                }));
            });
            i.querySelectorAll("[data-inertia-item]").forEach(item => {
                item.addEventListener("mouseenter", ev => {
                    let child = item.querySelector("[data-inertia-item-child]");
                    if (!child) return;
                    let { left: l, top: top, width: w, height: h } = child.getBoundingClientRect(),
                        cx = l + w / 2, cy = top + h / 2,
                        ux = ev.clientX - cx, uy = ev.clientY - cy,
                        m = (ux * n - uy * a) / (Math.hypot(ux, uy) || 1),
                        gx = t(a * 1.5 + (ux / w) * 15),
                        gy = t(n * 1.5 + (uy / h) * 15),
                        gv = e(m * 0.5 + (ux / w) * 6);
                    gsap.to(child, {
                        x: gx,
                        y: gy,
                        rotation: gv,
                        duration: 0.6,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                });
                item.addEventListener("mouseleave", () => {
                    let child = item.querySelector("[data-inertia-item-child]");
                    if (!child) return;
                    gsap.to(child, {
                        x: 0,
                        y: 0,
                        rotation: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                });
            });
        });
    }

    function vo() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        document.querySelectorAll("[data-marquee]").forEach(t => {
            let e = t.querySelector("[data-marquee-svg] textPath");
            if (!e) return;
            gsap.timeline({
                scrollTrigger: {
                    trigger: t,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: !0
                }
            }).fromTo(e, {
                attr: {
                    startOffset: "-30%"
                }
            }, {
                attr: {
                    startOffset: "-60%"
                },
                ease: "none",
                duration: 1
            });
        });
    }

    window.addEventListener("load", () => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.clearScrollMemory("manual");
        }
        if (history.scrollRestoration) {
            history.scrollRestoration = "manual";
        }
        uo();
        go();
        vo();
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(function() {
                document.documentElement.classList.add(ho);
            });
        } else {
            document.documentElement.classList.add(ho);
        }
        (() => {
            let t = window.matchMedia("(prefers-reduced-motion)");
            t.addEventListener("change", () => window.location.reload());
        })();
        (() => {
            let t = window.matchMedia("(min-width: 992px)");
            t.addEventListener("change", () => window.location.reload());
        })();
        (() => {
            let t = window.matchMedia("(orientation: portrait)");
            t.addEventListener("change", () => window.location.reload());
        })();
    });
})();
