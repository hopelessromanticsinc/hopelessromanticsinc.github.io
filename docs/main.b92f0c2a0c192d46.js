"use strict";
(self.webpackChunkHopelessRomanticsInc =
  self.webpackChunkHopelessRomanticsInc || []).push([
  [179],
  {
    81: () => {
      function ue(e) {
        return "function" == typeof e;
      }
      function Vr(e) {
        const t = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (t.prototype = Object.create(Error.prototype)),
          (t.prototype.constructor = t),
          t
        );
      }
      const di = Vr(
        (e) =>
          function (t) {
            e(this),
              (this.message = t
                ? `${t.length} errors occurred during unsubscription:\n${t.map((r, i) => `${i + 1}) ${r.toString()}`).join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = t);
          },
      );
      function Br(e, n) {
        if (e) {
          const t = e.indexOf(n);
          0 <= t && e.splice(t, 1);
        }
      }
      class lt {
        constructor(n) {
          (this.initialTeardown = n),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let n;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: t } = this;
            if (t)
              if (((this._parentage = null), Array.isArray(t)))
                for (const o of t) o.remove(this);
              else t.remove(this);
            const { initialTeardown: r } = this;
            if (ue(r))
              try {
                r();
              } catch (o) {
                n = o instanceof di ? o.errors : [o];
              }
            const { _finalizers: i } = this;
            if (i) {
              this._finalizers = null;
              for (const o of i)
                try {
                  vr(o);
                } catch (s) {
                  (n = n ?? []),
                    s instanceof di ? (n = [...n, ...s.errors]) : n.push(s);
                }
            }
            if (n) throw new di(n);
          }
        }
        add(n) {
          var t;
          if (n && n !== this)
            if (this.closed) vr(n);
            else {
              if (n instanceof lt) {
                if (n.closed || n._hasParent(this)) return;
                n._addParent(this);
              }
              (this._finalizers =
                null !== (t = this._finalizers) && void 0 !== t ? t : []).push(
                n,
              );
            }
        }
        _hasParent(n) {
          const { _parentage: t } = this;
          return t === n || (Array.isArray(t) && t.includes(n));
        }
        _addParent(n) {
          const { _parentage: t } = this;
          this._parentage = Array.isArray(t) ? (t.push(n), t) : t ? [t, n] : n;
        }
        _removeParent(n) {
          const { _parentage: t } = this;
          t === n ? (this._parentage = null) : Array.isArray(t) && Br(t, n);
        }
        remove(n) {
          const { _finalizers: t } = this;
          t && Br(t, n), n instanceof lt && n._removeParent(this);
        }
      }
      lt.EMPTY = (() => {
        const e = new lt();
        return (e.closed = !0), e;
      })();
      const ms = lt.EMPTY;
      function al(e) {
        return (
          e instanceof lt ||
          (e && "closed" in e && ue(e.remove) && ue(e.add) && ue(e.unsubscribe))
        );
      }
      function vr(e) {
        ue(e) ? e() : e.unsubscribe();
      }
      const Hr = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Yi = {
          setTimeout(e, n, ...t) {
            const { delegate: r } = Yi;
            return r?.setTimeout
              ? r.setTimeout(e, n, ...t)
              : setTimeout(e, n, ...t);
          },
          clearTimeout(e) {
            const { delegate: n } = Yi;
            return (n?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Qu(e) {
        Yi.setTimeout(() => {
          const { onUnhandledError: n } = Hr;
          if (!n) throw e;
          n(e);
        });
      }
      function jr() {}
      const Xu = _s("C", void 0, void 0);
      function _s(e, n, t) {
        return { kind: e, value: n, error: t };
      }
      let yr = null;
      function ir(e) {
        if (Hr.useDeprecatedSynchronousErrorHandling) {
          const n = !yr;
          if ((n && (yr = { errorThrown: !1, error: null }), e(), n)) {
            const { errorThrown: t, error: r } = yr;
            if (((yr = null), t)) throw r;
          }
        } else e();
      }
      class Ji extends lt {
        constructor(n) {
          super(),
            (this.isStopped = !1),
            n
              ? ((this.destination = n), al(n) && n.add(this))
              : (this.destination = ys);
        }
        static create(n, t, r) {
          return new $r(n, t, r);
        }
        next(n) {
          this.isStopped
            ? vs(
                (function td(e) {
                  return _s("N", e, void 0);
                })(n),
                this,
              )
            : this._next(n);
        }
        error(n) {
          this.isStopped
            ? vs(
                (function ed(e) {
                  return _s("E", void 0, e);
                })(n),
                this,
              )
            : ((this.isStopped = !0), this._error(n));
        }
        complete() {
          this.isStopped
            ? vs(Xu, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(n) {
          this.destination.next(n);
        }
        _error(n) {
          try {
            this.destination.error(n);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const ll = Function.prototype.bind;
      function Zi(e, n) {
        return ll.call(e, n);
      }
      class cl {
        constructor(n) {
          this.partialObserver = n;
        }
        next(n) {
          const { partialObserver: t } = this;
          if (t.next)
            try {
              t.next(n);
            } catch (r) {
              hn(r);
            }
        }
        error(n) {
          const { partialObserver: t } = this;
          if (t.error)
            try {
              t.error(n);
            } catch (r) {
              hn(r);
            }
          else hn(n);
        }
        complete() {
          const { partialObserver: n } = this;
          if (n.complete)
            try {
              n.complete();
            } catch (t) {
              hn(t);
            }
        }
      }
      class $r extends Ji {
        constructor(n, t, r) {
          let i;
          if ((super(), ue(n) || !n))
            i = {
              next: n ?? void 0,
              error: t ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let o;
            this && Hr.useDeprecatedNextContext
              ? ((o = Object.create(n)),
                (o.unsubscribe = () => this.unsubscribe()),
                (i = {
                  next: n.next && Zi(n.next, o),
                  error: n.error && Zi(n.error, o),
                  complete: n.complete && Zi(n.complete, o),
                }))
              : (i = n);
          }
          this.destination = new cl(i);
        }
      }
      function hn(e) {
        Hr.useDeprecatedSynchronousErrorHandling
          ? (function nd(e) {
              Hr.useDeprecatedSynchronousErrorHandling &&
                yr &&
                ((yr.errorThrown = !0), (yr.error = e));
            })(e)
          : Qu(e);
      }
      function vs(e, n) {
        const { onStoppedNotification: t } = Hr;
        t && Yi.setTimeout(() => t(e, n));
      }
      const ys = {
          closed: !0,
          next: jr,
          error: function ul(e) {
            throw e;
          },
          complete: jr,
        },
        bs =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Un(e) {
        return e;
      }
      function fl(e) {
        return 0 === e.length
          ? Un
          : 1 === e.length
            ? e[0]
            : function (t) {
                return e.reduce((r, i) => i(r), t);
              };
      }
      let Ce = (() => {
        class e {
          constructor(t) {
            t && (this._subscribe = t);
          }
          lift(t) {
            const r = new e();
            return (r.source = this), (r.operator = t), r;
          }
          subscribe(t, r, i) {
            const o = (function id(e) {
              return (
                (e && e instanceof Ji) ||
                ((function rd(e) {
                  return e && ue(e.next) && ue(e.error) && ue(e.complete);
                })(e) &&
                  al(e))
              );
            })(t)
              ? t
              : new $r(t, r, i);
            return (
              ir(() => {
                const { operator: s, source: a } = this;
                o.add(
                  s
                    ? s.call(o, a)
                    : a
                      ? this._subscribe(o)
                      : this._trySubscribe(o),
                );
              }),
              o
            );
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (r) {
              t.error(r);
            }
          }
          forEach(t, r) {
            return new (r = hl(r))((i, o) => {
              const s = new $r({
                next: (a) => {
                  try {
                    t(a);
                  } catch (l) {
                    o(l), s.unsubscribe();
                  }
                },
                error: o,
                complete: i,
              });
              this.subscribe(s);
            });
          }
          _subscribe(t) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(t);
          }
          [bs]() {
            return this;
          }
          pipe(...t) {
            return fl(t)(this);
          }
          toPromise(t) {
            return new (t = hl(t))((r, i) => {
              let o;
              this.subscribe(
                (s) => (o = s),
                (s) => i(s),
                () => r(o),
              );
            });
          }
        }
        return (e.create = (n) => new e(n)), e;
      })();
      function hl(e) {
        var n;
        return null !== (n = e ?? Hr.Promise) && void 0 !== n ? n : Promise;
      }
      const od = Vr(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          },
      );
      let Me = (() => {
        class e extends Ce {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(t) {
            const r = new pl(this, this);
            return (r.operator = t), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new od();
          }
          next(t) {
            ir(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(t);
              }
            });
          }
          error(t) {
            ir(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = t);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(t);
              }
            });
          }
          complete() {
            ir(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: t } = this;
                for (; t.length; ) t.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var t;
            return (
              (null === (t = this.observers) || void 0 === t
                ? void 0
                : t.length) > 0
            );
          }
          _trySubscribe(t) {
            return this._throwIfClosed(), super._trySubscribe(t);
          }
          _subscribe(t) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(t),
              this._innerSubscribe(t)
            );
          }
          _innerSubscribe(t) {
            const { hasError: r, isStopped: i, observers: o } = this;
            return r || i
              ? ms
              : ((this.currentObservers = null),
                o.push(t),
                new lt(() => {
                  (this.currentObservers = null), Br(o, t);
                }));
          }
          _checkFinalizedStatuses(t) {
            const { hasError: r, thrownError: i, isStopped: o } = this;
            r ? t.error(i) : o && t.complete();
          }
          asObservable() {
            const t = new Ce();
            return (t.source = this), t;
          }
        }
        return (e.create = (n, t) => new pl(n, t)), e;
      })();
      class pl extends Me {
        constructor(n, t) {
          super(), (this.destination = n), (this.source = t);
        }
        next(n) {
          var t, r;
          null ===
            (r =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.next) ||
            void 0 === r ||
            r.call(t, n);
        }
        error(n) {
          var t, r;
          null ===
            (r =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.error) ||
            void 0 === r ||
            r.call(t, n);
        }
        complete() {
          var n, t;
          null ===
            (t =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.complete) ||
            void 0 === t ||
            t.call(n);
        }
        _subscribe(n) {
          var t, r;
          return null !==
            (r =
              null === (t = this.source) || void 0 === t
                ? void 0
                : t.subscribe(n)) && void 0 !== r
            ? r
            : ms;
        }
      }
      function Ds(e) {
        return ue(e?.lift);
      }
      function We(e) {
        return (n) => {
          if (Ds(n))
            return n.lift(function (t) {
              try {
                return e(t, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Re(e, n, t, r, i) {
        return new sd(e, n, t, r, i);
      }
      class sd extends Ji {
        constructor(n, t, r, i, o, s) {
          super(n),
            (this.onFinalize = o),
            (this.shouldUnsubscribe = s),
            (this._next = t
              ? function (a) {
                  try {
                    t(a);
                  } catch (l) {
                    n.error(l);
                  }
                }
              : super._next),
            (this._error = i
              ? function (a) {
                  try {
                    i(a);
                  } catch (l) {
                    n.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    n.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var n;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: t } = this;
            super.unsubscribe(),
              !t &&
                (null === (n = this.onFinalize) ||
                  void 0 === n ||
                  n.call(this));
          }
        }
      }
      function Y(e, n) {
        return We((t, r) => {
          let i = 0;
          t.subscribe(
            Re(r, (o) => {
              r.next(e.call(n, o, i++));
            }),
          );
        });
      }
      function qt(e) {
        return this instanceof qt ? ((this.v = e), this) : new qt(e);
      }
      function Xi(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var t,
          n = e[Symbol.asyncIterator];
        return n
          ? n.call(e)
          : ((e = (function H(e) {
              var n = "function" == typeof Symbol && Symbol.iterator,
                t = n && e[n],
                r = 0;
              if (t) return t.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                n
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined.",
              );
            })(e)),
            (t = {}),
            r("next"),
            r("throw"),
            r("return"),
            (t[Symbol.asyncIterator] = function () {
              return this;
            }),
            t);
        function r(o) {
          t[o] =
            e[o] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function i(o, s, a, l) {
                  Promise.resolve(l).then(function (c) {
                    o({ value: c, done: a });
                  }, s);
                })(a, l, (s = e[o](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const fd = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function om(e) {
        return ue(e?.then);
      }
      function sm(e) {
        return ue(e[bs]);
      }
      function am(e) {
        return Symbol.asyncIterator && ue(e?.[Symbol.asyncIterator]);
      }
      function lm(e) {
        return new TypeError(
          `You provided ${null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`,
        );
      }
      const cm = (function SS() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function um(e) {
        return ue(e?.[cm]);
      }
      function dm(e) {
        return (function Ur(e, n, t) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var i,
            r = t.apply(e, n || []),
            o = [];
          return (
            (i = {}),
            s("next"),
            s("throw"),
            s("return"),
            (i[Symbol.asyncIterator] = function () {
              return this;
            }),
            i
          );
          function s(f) {
            r[f] &&
              (i[f] = function (h) {
                return new Promise(function (p, m) {
                  o.push([f, h, p, m]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function l(f) {
                f.value instanceof qt
                  ? Promise.resolve(f.value.v).then(c, u)
                  : d(o[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(o[0][3], p);
            }
          }
          function c(f) {
            a("next", f);
          }
          function u(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), o.shift(), o.length && a(o[0][0], o[0][1]);
          }
        })(this, arguments, function* () {
          const t = e.getReader();
          try {
            for (;;) {
              const { value: r, done: i } = yield qt(t.read());
              if (i) return yield qt(void 0);
              yield yield qt(r);
            }
          } finally {
            t.releaseLock();
          }
        });
      }
      function fm(e) {
        return ue(e?.getReader);
      }
      function _t(e) {
        if (e instanceof Ce) return e;
        if (null != e) {
          if (sm(e))
            return (function TS(e) {
              return new Ce((n) => {
                const t = e[bs]();
                if (ue(t.subscribe)) return t.subscribe(n);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable",
                );
              });
            })(e);
          if (fd(e))
            return (function MS(e) {
              return new Ce((n) => {
                for (let t = 0; t < e.length && !n.closed; t++) n.next(e[t]);
                n.complete();
              });
            })(e);
          if (om(e))
            return (function NS(e) {
              return new Ce((n) => {
                e.then(
                  (t) => {
                    n.closed || (n.next(t), n.complete());
                  },
                  (t) => n.error(t),
                ).then(null, Qu);
              });
            })(e);
          if (am(e)) return hm(e);
          if (um(e))
            return (function IS(e) {
              return new Ce((n) => {
                for (const t of e) if ((n.next(t), n.closed)) return;
                n.complete();
              });
            })(e);
          if (fm(e))
            return (function OS(e) {
              return hm(dm(e));
            })(e);
        }
        throw lm(e);
      }
      function hm(e) {
        return new Ce((n) => {
          (function AS(e, n) {
            var t, r, i, o;
            return (function _(e, n, t, r) {
              return new (t || (t = Promise))(function (o, s) {
                function a(u) {
                  try {
                    c(r.next(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(u) {
                  try {
                    c(r.throw(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function c(u) {
                  u.done
                    ? o(u.value)
                    : (function i(o) {
                        return o instanceof t
                          ? o
                          : new t(function (s) {
                              s(o);
                            });
                      })(u.value).then(a, l);
                }
                c((r = r.apply(e, n || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (t = Xi(e); !(r = yield t.next()).done; )
                  if ((n.next(r.value), n.closed)) return;
              } catch (s) {
                i = { error: s };
              } finally {
                try {
                  r && !r.done && (o = t.return) && (yield o.call(t));
                } finally {
                  if (i) throw i.error;
                }
              }
              n.complete();
            });
          })(e, n).catch((t) => n.error(t));
        });
      }
      function br(e, n, t, r = 0, i = !1) {
        const o = n.schedule(function () {
          t(), i ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(o), !i)) return o;
      }
      function vt(e, n, t = 1 / 0) {
        return ue(n)
          ? vt((r, i) => Y((o, s) => n(r, o, i, s))(_t(e(r, i))), t)
          : ("number" == typeof n && (t = n),
            We((r, i) =>
              (function RS(e, n, t, r, i, o, s, a) {
                const l = [];
                let c = 0,
                  u = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !c && n.complete();
                  },
                  h = (m) => (c < r ? p(m) : l.push(m)),
                  p = (m) => {
                    o && n.next(m), c++;
                    let v = !1;
                    _t(t(m, u++)).subscribe(
                      Re(
                        n,
                        (b) => {
                          i?.(b), o ? h(b) : n.next(b);
                        },
                        () => {
                          v = !0;
                        },
                        void 0,
                        () => {
                          if (v)
                            try {
                              for (c--; l.length && c < r; ) {
                                const b = l.shift();
                                s ? br(n, s, () => p(b)) : p(b);
                              }
                              f();
                            } catch (b) {
                              n.error(b);
                            }
                        },
                      ),
                    );
                  };
                return (
                  e.subscribe(
                    Re(n, h, () => {
                      (d = !0), f();
                    }),
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, i, e, t),
            ));
      }
      function to(e = 1 / 0) {
        return vt(Un, e);
      }
      const In = new Ce((e) => e.complete());
      function pm(e) {
        return e && ue(e.schedule);
      }
      function hd(e) {
        return e[e.length - 1];
      }
      function vl(e) {
        return ue(hd(e)) ? e.pop() : void 0;
      }
      function Cs(e) {
        return pm(hd(e)) ? e.pop() : void 0;
      }
      function gm(e, n = 0) {
        return We((t, r) => {
          t.subscribe(
            Re(
              r,
              (i) => br(r, e, () => r.next(i), n),
              () => br(r, e, () => r.complete(), n),
              (i) => br(r, e, () => r.error(i), n),
            ),
          );
        });
      }
      function mm(e, n = 0) {
        return We((t, r) => {
          r.add(e.schedule(() => t.subscribe(r), n));
        });
      }
      function _m(e, n) {
        if (!e) throw new Error("Iterable cannot be null");
        return new Ce((t) => {
          br(t, n, () => {
            const r = e[Symbol.asyncIterator]();
            br(
              t,
              n,
              () => {
                r.next().then((i) => {
                  i.done ? t.complete() : t.next(i.value);
                });
              },
              0,
              !0,
            );
          });
        });
      }
      function dt(e, n) {
        return n
          ? (function HS(e, n) {
              if (null != e) {
                if (sm(e))
                  return (function FS(e, n) {
                    return _t(e).pipe(mm(n), gm(n));
                  })(e, n);
                if (fd(e))
                  return (function LS(e, n) {
                    return new Ce((t) => {
                      let r = 0;
                      return n.schedule(function () {
                        r === e.length
                          ? t.complete()
                          : (t.next(e[r++]), t.closed || this.schedule());
                      });
                    });
                  })(e, n);
                if (om(e))
                  return (function kS(e, n) {
                    return _t(e).pipe(mm(n), gm(n));
                  })(e, n);
                if (am(e)) return _m(e, n);
                if (um(e))
                  return (function VS(e, n) {
                    return new Ce((t) => {
                      let r;
                      return (
                        br(t, n, () => {
                          (r = e[cm]()),
                            br(
                              t,
                              n,
                              () => {
                                let i, o;
                                try {
                                  ({ value: i, done: o } = r.next());
                                } catch (s) {
                                  return void t.error(s);
                                }
                                o ? t.complete() : t.next(i);
                              },
                              0,
                              !0,
                            );
                        }),
                        () => ue(r?.return) && r.return()
                      );
                    });
                  })(e, n);
                if (fm(e))
                  return (function BS(e, n) {
                    return _m(dm(e), n);
                  })(e, n);
              }
              throw lm(e);
            })(e, n)
          : _t(e);
      }
      function vm(...e) {
        const n = Cs(e),
          t = (function xS(e, n) {
            return "number" == typeof hd(e) ? e.pop() : n;
          })(e, 1 / 0),
          r = e;
        return r.length ? (1 === r.length ? _t(r[0]) : to(t)(dt(r, n))) : In;
      }
      function pd(e, n, ...t) {
        if (!0 === n) return void e();
        if (!1 === n) return;
        const r = new $r({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return _t(n(...t)).subscribe(r);
      }
      function Pe(e) {
        for (let n in e) if (e[n] === Pe) return n;
        throw Error("Could not find renamed property on target object.");
      }
      function ke(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(ke).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const n = e.toString();
        if (null == n) return "" + n;
        const t = n.indexOf("\n");
        return -1 === t ? n : n.substring(0, t);
      }
      function md(e, n) {
        return null == e || "" === e
          ? null === n
            ? ""
            : n
          : null == n || "" === n
            ? e
            : e + " " + n;
      }
      const $S = Pe({ __forward_ref__: Pe });
      function ee(e) {
        return (
          (e.__forward_ref__ = ee),
          (e.toString = function () {
            return ke(this());
          }),
          e
        );
      }
      function J(e) {
        return _d(e) ? e() : e;
      }
      function _d(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty($S) &&
          e.__forward_ref__ === ee
        );
      }
      function vd(e) {
        return e && !!e.ɵproviders;
      }
      class A extends Error {
        constructor(n, t) {
          super(yl(n, t)), (this.code = n);
        }
      }
      function yl(e, n) {
        return `NG0${Math.abs(e)}${n ? ": " + n.trim() : ""}`;
      }
      function te(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function bl(e, n) {
        throw new A(-201, !1);
      }
      function Ee(e, n, t, r) {
        throw new Error(
          `ASSERTION ERROR: ${e}` +
            (null == r ? "" : ` [Expected=> ${t} ${r} ${n} <=Actual]`),
        );
      }
      function P(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function Ae(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Dl(e) {
        return bm(e, Cl) || bm(e, Cm);
      }
      function bm(e, n) {
        return e.hasOwnProperty(n) ? e[n] : null;
      }
      function Dm(e) {
        return e && (e.hasOwnProperty(yd) || e.hasOwnProperty(ZS))
          ? e[yd]
          : null;
      }
      const Cl = Pe({ ɵprov: Pe }),
        yd = Pe({ ɵinj: Pe }),
        Cm = Pe({ ngInjectableDef: Pe }),
        ZS = Pe({ ngInjectorDef: Pe });
      var Z = (() => (
        ((Z = Z || {})[(Z.Default = 0)] = "Default"),
        (Z[(Z.Host = 1)] = "Host"),
        (Z[(Z.Self = 2)] = "Self"),
        (Z[(Z.SkipSelf = 4)] = "SkipSelf"),
        (Z[(Z.Optional = 8)] = "Optional"),
        Z
      ))();
      let bd;
      function An(e) {
        const n = bd;
        return (bd = e), n;
      }
      function wm(e, n, t) {
        const r = Dl(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : t & Z.Optional
            ? null
            : void 0 !== n
              ? n
              : void bl(ke(e));
      }
      const Ue = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        ws = {},
        Dd = "__NG_DI_FLAG__",
        wl = "ngTempTokenPath",
        QS = "ngTokenPath",
        XS = /\n/gm,
        eT = "\u0275",
        Em = "__source";
      let Es;
      function no(e) {
        const n = Es;
        return (Es = e), n;
      }
      function tT(e, n = Z.Default) {
        if (void 0 === Es) throw new A(-203, !1);
        return null === Es
          ? wm(e, void 0, n)
          : Es.get(e, n & Z.Optional ? null : void 0, n);
      }
      function k(e, n = Z.Default) {
        return (
          (function KS() {
            return bd;
          })() || tT
        )(J(e), n);
      }
      function X(e, n = Z.Default) {
        return k(e, El(n));
      }
      function El(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function Cd(e) {
        const n = [];
        for (let t = 0; t < e.length; t++) {
          const r = J(e[t]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new A(900, !1);
            let i,
              o = Z.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                l = nT(a);
              "number" == typeof l
                ? -1 === l
                  ? (i = a.token)
                  : (o |= l)
                : (i = a);
            }
            n.push(k(i, o));
          } else n.push(k(r));
        }
        return n;
      }
      function Ss(e, n) {
        return (e[Dd] = n), (e.prototype[Dd] = n), e;
      }
      function nT(e) {
        return e[Dd];
      }
      function Dr(e) {
        return { toString: e }.toString();
      }
      var or = (() => (
          ((or = or || {})[(or.OnPush = 0)] = "OnPush"),
          (or[(or.Default = 1)] = "Default"),
          or
        ))(),
        sr = (() => {
          return (
            ((e = sr || (sr = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            sr
          );
          var e;
        })();
      const Cr = {},
        De = [],
        Sl = Pe({ ɵcmp: Pe }),
        wd = Pe({ ɵdir: Pe }),
        Ed = Pe({ ɵpipe: Pe }),
        Tm = Pe({ ɵmod: Pe }),
        wr = Pe({ ɵfac: Pe }),
        Ts = Pe({ __NG_ELEMENT_ID__: Pe });
      let oT = 0;
      function Le(e) {
        return Dr(() => {
          const n = Nm(e),
            t = {
              ...n,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === or.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (n.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              data: e.data || {},
              encapsulation: e.encapsulation || sr.Emulated,
              id: "c" + oT++,
              styles: e.styles || De,
              _: null,
              schemas: e.schemas || null,
              tView: null,
            };
          Im(t);
          const r = e.dependencies;
          return (t.directiveDefs = Tl(r, !1)), (t.pipeDefs = Tl(r, !0)), t;
        });
      }
      function aT(e) {
        return Se(e) || Ht(e);
      }
      function lT(e) {
        return null !== e;
      }
      function xe(e) {
        return Dr(() => ({
          type: e.type,
          bootstrap: e.bootstrap || De,
          declarations: e.declarations || De,
          imports: e.imports || De,
          exports: e.exports || De,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Mm(e, n) {
        if (null == e) return Cr;
        const t = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let i = e[r],
              o = i;
            Array.isArray(i) && ((o = i[1]), (i = i[0])),
              (t[i] = r),
              n && (n[i] = o);
          }
        return t;
      }
      function x(e) {
        return Dr(() => {
          const n = Nm(e);
          return Im(n), n;
        });
      }
      function tn(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          standalone: !0 === e.standalone,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function Se(e) {
        return e[Sl] || null;
      }
      function Ht(e) {
        return e[wd] || null;
      }
      function nn(e) {
        return e[Ed] || null;
      }
      function mn(e, n) {
        const t = e[Tm] || null;
        if (!t && !0 === n)
          throw new Error(`Type ${ke(e)} does not have '\u0275mod' property.`);
        return t;
      }
      function Nm(e) {
        const n = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: n,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          selectors: e.selectors || De,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Mm(e.inputs, n),
          outputs: Mm(e.outputs),
        };
      }
      function Im(e) {
        e.features?.forEach((n) => n(e));
      }
      function Tl(e, n) {
        if (!e) return null;
        const t = n ? nn : aT;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => t(r)).filter(lT);
      }
      const Er = 0,
        B = 1,
        se = 2,
        Qe = 3,
        Gn = 4,
        hi = 5,
        jt = 6,
        io = 7,
        ot = 8,
        Ml = 9,
        Nl = 10,
        le = 11,
        Sd = 12,
        Ms = 13,
        Om = 14,
        oo = 15,
        $t = 16,
        Ns = 17,
        so = 18,
        ar = 19,
        Is = 20,
        Am = 21,
        Ge = 22,
        Td = 1,
        Rm = 2,
        Il = 7,
        Ol = 8,
        ao = 9,
        Yt = 10;
      function _n(e) {
        return Array.isArray(e) && "object" == typeof e[Td];
      }
      function zn(e) {
        return Array.isArray(e) && !0 === e[Td];
      }
      function Md(e) {
        return 0 != (4 & e.flags);
      }
      function Os(e) {
        return e.componentOffset > -1;
      }
      function Al(e) {
        return 1 == (1 & e.flags);
      }
      function Wn(e) {
        return !!e.template;
      }
      function uT(e) {
        return 0 != (256 & e[se]);
      }
      function pi(e, n) {
        return e.hasOwnProperty(wr) ? e[wr] : null;
      }
      class hT {
        constructor(n, t, r) {
          (this.previousValue = n),
            (this.currentValue = t),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Xe() {
        return Fm;
      }
      function Fm(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = gT), pT;
      }
      function pT() {
        const e = Lm(this),
          n = e?.current;
        if (n) {
          const t = e.previous;
          if (t === Cr) e.previous = n;
          else for (let r in n) t[r] = n[r];
          (e.current = null), this.ngOnChanges(n);
        }
      }
      function gT(e, n, t, r) {
        const i = this.declaredInputs[t],
          o =
            Lm(e) ||
            (function mT(e, n) {
              return (e[km] = n);
            })(e, { previous: Cr, current: null }),
          s = o.current || (o.current = {}),
          a = o.previous,
          l = a[i];
        (s[i] = new hT(l && l.currentValue, n, a === Cr)), (e[r] = n);
      }
      Xe.ngInherit = !0;
      const km = "__ngSimpleChanges__";
      function Lm(e) {
        return e[km] || null;
      }
      const Rn = function (e, n, t) {};
      function At(e) {
        for (; Array.isArray(e); ) e = e[Er];
        return e;
      }
      function Rl(e, n) {
        return At(n[e]);
      }
      function vn(e, n) {
        return At(n[e.index]);
      }
      function Hm(e, n) {
        return e.data[n];
      }
      function lo(e, n) {
        return e[n];
      }
      function rn(e, n) {
        const t = n[e];
        return _n(t) ? t : t[Er];
      }
      function Pl(e) {
        return 64 == (64 & e[se]);
      }
      function zr(e, n) {
        return null == n ? null : e[n];
      }
      function jm(e) {
        e[so] = 0;
      }
      function Id(e, n) {
        e[hi] += n;
        let t = e,
          r = e[Qe];
        for (
          ;
          null !== r && ((1 === n && 1 === t[hi]) || (-1 === n && 0 === t[hi]));

        )
          (r[hi] += n), (t = r), (r = r[Qe]);
      }
      const ne = { lFrame: Km(null), bindingsEnabled: !0 };
      function Um() {
        return ne.bindingsEnabled;
      }
      function S() {
        return ne.lFrame.lView;
      }
      function pe() {
        return ne.lFrame.tView;
      }
      function ge(e) {
        return (ne.lFrame.contextLView = e), e[ot];
      }
      function me(e) {
        return (ne.lFrame.contextLView = null), e;
      }
      function Rt() {
        let e = Gm();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function Gm() {
        return ne.lFrame.currentTNode;
      }
      function As() {
        const e = ne.lFrame,
          n = e.currentTNode;
        return e.isParent ? n : n.parent;
      }
      function lr(e, n) {
        const t = ne.lFrame;
        (t.currentTNode = e), (t.isParent = n);
      }
      function Od() {
        return ne.lFrame.isParent;
      }
      function Ad() {
        ne.lFrame.isParent = !1;
      }
      function Jt() {
        const e = ne.lFrame;
        let n = e.bindingRootIndex;
        return (
          -1 === n && (n = e.bindingRootIndex = e.tView.bindingStartIndex), n
        );
      }
      function Sr() {
        return ne.lFrame.bindingIndex;
      }
      function co() {
        return ne.lFrame.bindingIndex++;
      }
      function Tr(e) {
        const n = ne.lFrame,
          t = n.bindingIndex;
        return (n.bindingIndex = n.bindingIndex + e), t;
      }
      function qm(e) {
        ne.lFrame.inI18n = e;
      }
      function IT(e, n) {
        const t = ne.lFrame;
        (t.bindingIndex = t.bindingRootIndex = e), Rd(n);
      }
      function Rd(e) {
        ne.lFrame.currentDirectiveIndex = e;
      }
      function Ym() {
        return ne.lFrame.currentQueryIndex;
      }
      function xd(e) {
        ne.lFrame.currentQueryIndex = e;
      }
      function AT(e) {
        const n = e[B];
        return 2 === n.type ? n.declTNode : 1 === n.type ? e[jt] : null;
      }
      function Jm(e, n, t) {
        if (t & Z.SkipSelf) {
          let i = n,
            o = e;
          for (
            ;
            !((i = i.parent),
            null !== i ||
              t & Z.Host ||
              ((i = AT(o)), null === i || ((o = o[oo]), 10 & i.type)));

          );
          if (null === i) return !1;
          (n = i), (e = o);
        }
        const r = (ne.lFrame = Zm());
        return (r.currentTNode = n), (r.lView = e), !0;
      }
      function Fd(e) {
        const n = Zm(),
          t = e[B];
        (ne.lFrame = n),
          (n.currentTNode = t.firstChild),
          (n.lView = e),
          (n.tView = t),
          (n.contextLView = e),
          (n.bindingIndex = t.bindingStartIndex),
          (n.inI18n = !1);
      }
      function Zm() {
        const e = ne.lFrame,
          n = null === e ? null : e.child;
        return null === n ? Km(e) : n;
      }
      function Km(e) {
        const n = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = n), n;
      }
      function Qm() {
        const e = ne.lFrame;
        return (
          (ne.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Xm = Qm;
      function kd() {
        const e = Qm();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Zt() {
        return ne.lFrame.selectedIndex;
      }
      function gi(e) {
        ne.lFrame.selectedIndex = e;
      }
      function Je() {
        const e = ne.lFrame;
        return Hm(e.tView, e.selectedIndex);
      }
      function xl(e, n) {
        for (let t = n.directiveStart, r = n.directiveEnd; t < r; t++) {
          const o = e.data[t].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: c,
              ngOnDestroy: u,
            } = o;
          s && (e.contentHooks ?? (e.contentHooks = [])).push(-t, s),
            a &&
              ((e.contentHooks ?? (e.contentHooks = [])).push(t, a),
              (e.contentCheckHooks ?? (e.contentCheckHooks = [])).push(t, a)),
            l && (e.viewHooks ?? (e.viewHooks = [])).push(-t, l),
            c &&
              ((e.viewHooks ?? (e.viewHooks = [])).push(t, c),
              (e.viewCheckHooks ?? (e.viewCheckHooks = [])).push(t, c)),
            null != u && (e.destroyHooks ?? (e.destroyHooks = [])).push(t, u);
        }
      }
      function Fl(e, n, t) {
        e_(e, n, 3, t);
      }
      function kl(e, n, t, r) {
        (3 & e[se]) === t && e_(e, n, t, r);
      }
      function Ld(e, n) {
        let t = e[se];
        (3 & t) === n && ((t &= 2047), (t += 1), (e[se] = t));
      }
      function e_(e, n, t, r) {
        const o = r ?? -1,
          s = n.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & e[so] : 0; l < s; l++)
          if ("number" == typeof n[l + 1]) {
            if (((a = n[l]), null != r && a >= r)) break;
          } else
            n[l] < 0 && (e[so] += 65536),
              (a < o || -1 == o) &&
                (HT(e, t, n, l), (e[so] = (4294901760 & e[so]) + l + 2)),
              l++;
      }
      function HT(e, n, t, r) {
        const i = t[r] < 0,
          o = t[r + 1],
          a = e[i ? -t[r] : t[r]];
        if (i) {
          if (e[se] >> 11 < e[so] >> 16 && (3 & e[se]) === n) {
            (e[se] += 2048), Rn(4, a, o);
            try {
              o.call(a);
            } finally {
              Rn(5, a, o);
            }
          }
        } else {
          Rn(4, a, o);
          try {
            o.call(a);
          } finally {
            Rn(5, a, o);
          }
        }
      }
      const uo = -1;
      class Rs {
        constructor(n, t, r) {
          (this.factory = n),
            (this.resolving = !1),
            (this.canSeeViewProviders = t),
            (this.injectImpl = r);
        }
      }
      function Bd(e, n, t) {
        let r = 0;
        for (; r < t.length; ) {
          const i = t[r];
          if ("number" == typeof i) {
            if (0 !== i) break;
            r++;
            const o = t[r++],
              s = t[r++],
              a = t[r++];
            e.setAttribute(n, s, a, o);
          } else {
            const o = i,
              s = t[++r];
            n_(o) ? e.setProperty(n, o, s) : e.setAttribute(n, o, s), r++;
          }
        }
        return r;
      }
      function t_(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function n_(e) {
        return 64 === e.charCodeAt(0);
      }
      function Ps(e, n) {
        if (null !== n && 0 !== n.length)
          if (null === e || 0 === e.length) e = n.slice();
          else {
            let t = -1;
            for (let r = 0; r < n.length; r++) {
              const i = n[r];
              "number" == typeof i
                ? (t = i)
                : 0 === t ||
                  r_(e, t, i, null, -1 === t || 2 === t ? n[++r] : null);
            }
          }
        return e;
      }
      function r_(e, n, t, r, i) {
        let o = 0,
          s = e.length;
        if (-1 === n) s = -1;
        else
          for (; o < e.length; ) {
            const a = e[o++];
            if ("number" == typeof a) {
              if (a === n) {
                s = -1;
                break;
              }
              if (a > n) {
                s = o - 1;
                break;
              }
            }
          }
        for (; o < e.length; ) {
          const a = e[o];
          if ("number" == typeof a) break;
          if (a === t) {
            if (null === r) return void (null !== i && (e[o + 1] = i));
            if (r === e[o + 1]) return void (e[o + 2] = i);
          }
          o++, null !== r && o++, null !== i && o++;
        }
        -1 !== s && (e.splice(s, 0, n), (o = s + 1)),
          e.splice(o++, 0, t),
          null !== r && e.splice(o++, 0, r),
          null !== i && e.splice(o++, 0, i);
      }
      function i_(e) {
        return e !== uo;
      }
      function Ll(e) {
        return 32767 & e;
      }
      function Vl(e, n) {
        let t = (function GT(e) {
            return e >> 16;
          })(e),
          r = n;
        for (; t > 0; ) (r = r[oo]), t--;
        return r;
      }
      let Hd = !0;
      function Bl(e) {
        const n = Hd;
        return (Hd = e), n;
      }
      const o_ = 255,
        s_ = 5;
      let zT = 0;
      const cr = {};
      function Hl(e, n) {
        const t = a_(e, n);
        if (-1 !== t) return t;
        const r = n[B];
        r.firstCreatePass &&
          ((e.injectorIndex = n.length),
          jd(r.data, e),
          jd(n, null),
          jd(r.blueprint, null));
        const i = $d(e, n),
          o = e.injectorIndex;
        if (i_(i)) {
          const s = Ll(i),
            a = Vl(i, n),
            l = a[B].data;
          for (let c = 0; c < 8; c++) n[o + c] = a[s + c] | l[s + c];
        }
        return (n[o + 8] = i), o;
      }
      function jd(e, n) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, n);
      }
      function a_(e, n) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === n[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function $d(e, n) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let t = 0,
          r = null,
          i = n;
        for (; null !== i; ) {
          if (((r = p_(i)), null === r)) return uo;
          if ((t++, (i = i[oo]), -1 !== r.injectorIndex))
            return r.injectorIndex | (t << 16);
        }
        return uo;
      }
      function Ud(e, n, t) {
        !(function WT(e, n, t) {
          let r;
          "string" == typeof t
            ? (r = t.charCodeAt(0) || 0)
            : t.hasOwnProperty(Ts) && (r = t[Ts]),
            null == r && (r = t[Ts] = zT++);
          const i = r & o_;
          n.data[e + (i >> s_)] |= 1 << i;
        })(e, n, t);
      }
      function l_(e, n, t) {
        if (t & Z.Optional || void 0 !== e) return e;
        bl();
      }
      function c_(e, n, t, r) {
        if (
          (t & Z.Optional && void 0 === r && (r = null),
          !(t & (Z.Self | Z.Host)))
        ) {
          const i = e[Ml],
            o = An(void 0);
          try {
            return i ? i.get(n, r, t & Z.Optional) : wm(n, r, t & Z.Optional);
          } finally {
            An(o);
          }
        }
        return l_(r, 0, t);
      }
      function u_(e, n, t, r = Z.Default, i) {
        if (null !== e) {
          if (1024 & n[se]) {
            const s = (function KT(e, n, t, r, i) {
              let o = e,
                s = n;
              for (
                ;
                null !== o && null !== s && 1024 & s[se] && !(256 & s[se]);

              ) {
                const a = d_(o, s, t, r | Z.Self, cr);
                if (a !== cr) return a;
                let l = o.parent;
                if (!l) {
                  const c = s[Am];
                  if (c) {
                    const u = c.get(t, cr, r);
                    if (u !== cr) return u;
                  }
                  (l = p_(s)), (s = s[oo]);
                }
                o = l;
              }
              return i;
            })(e, n, t, r, cr);
            if (s !== cr) return s;
          }
          const o = d_(e, n, t, r, cr);
          if (o !== cr) return o;
        }
        return c_(n, t, r, i);
      }
      function d_(e, n, t, r, i) {
        const o = (function JT(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const n = e.hasOwnProperty(Ts) ? e[Ts] : void 0;
          return "number" == typeof n ? (n >= 0 ? n & o_ : ZT) : n;
        })(t);
        if ("function" == typeof o) {
          if (!Jm(n, e, r)) return r & Z.Host ? l_(i, 0, r) : c_(n, t, r, i);
          try {
            const s = o(r);
            if (null != s || r & Z.Optional) return s;
            bl();
          } finally {
            Xm();
          }
        } else if ("number" == typeof o) {
          let s = null,
            a = a_(e, n),
            l = uo,
            c = r & Z.Host ? n[$t][jt] : null;
          for (
            (-1 === a || r & Z.SkipSelf) &&
            ((l = -1 === a ? $d(e, n) : n[a + 8]),
            l !== uo && h_(r, !1)
              ? ((s = n[B]), (a = Ll(l)), (n = Vl(l, n)))
              : (a = -1));
            -1 !== a;

          ) {
            const u = n[B];
            if (f_(o, a, u.data)) {
              const d = YT(a, n, t, s, r, c);
              if (d !== cr) return d;
            }
            (l = n[a + 8]),
              l !== uo && h_(r, n[B].data[a + 8] === c) && f_(o, a, n)
                ? ((s = u), (a = Ll(l)), (n = Vl(l, n)))
                : (a = -1);
          }
        }
        return i;
      }
      function YT(e, n, t, r, i, o) {
        const s = n[B],
          a = s.data[e + 8],
          u = jl(
            a,
            s,
            t,
            null == r ? Os(a) && Hd : r != s && 0 != (3 & a.type),
            i & Z.Host && o === a,
          );
        return null !== u ? mi(n, s, u, a) : cr;
      }
      function jl(e, n, t, r, i) {
        const o = e.providerIndexes,
          s = n.data,
          a = 1048575 & o,
          l = e.directiveStart,
          u = o >> 20,
          f = i ? a + u : e.directiveEnd;
        for (let h = r ? a : a + u; h < f; h++) {
          const p = s[h];
          if ((h < l && t === p) || (h >= l && p.type === t)) return h;
        }
        if (i) {
          const h = s[l];
          if (h && Wn(h) && h.type === t) return l;
        }
        return null;
      }
      function mi(e, n, t, r) {
        let i = e[t];
        const o = n.data;
        if (
          (function jT(e) {
            return e instanceof Rs;
          })(i)
        ) {
          const s = i;
          s.resolving &&
            (function US(e, n) {
              const t = n ? `. Dependency path: ${n.join(" > ")} > ${e}` : "";
              throw new A(
                -200,
                `Circular dependency in DI detected for ${e}${t}`,
              );
            })(
              (function we(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                      null != e &&
                      "function" == typeof e.type
                    ? e.type.name || e.type.toString()
                    : te(e);
              })(o[t]),
            );
          const a = Bl(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? An(s.injectImpl) : null;
          Jm(e, r, Z.Default);
          try {
            (i = e[t] = s.factory(void 0, o, e, r)),
              n.firstCreatePass &&
                t >= r.directiveStart &&
                (function BT(e, n, t) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: i,
                    ngDoCheck: o,
                  } = n.type.prototype;
                  if (r) {
                    const s = Fm(n);
                    (t.preOrderHooks ?? (t.preOrderHooks = [])).push(e, s),
                      (
                        t.preOrderCheckHooks ?? (t.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  i &&
                    (t.preOrderHooks ?? (t.preOrderHooks = [])).push(0 - e, i),
                    o &&
                      ((t.preOrderHooks ?? (t.preOrderHooks = [])).push(e, o),
                      (
                        t.preOrderCheckHooks ?? (t.preOrderCheckHooks = [])
                      ).push(e, o));
                })(t, o[t], n);
          } finally {
            null !== l && An(l), Bl(a), (s.resolving = !1), Xm();
          }
        }
        return i;
      }
      function f_(e, n, t) {
        return !!(t[n + (e >> s_)] & (1 << e));
      }
      function h_(e, n) {
        return !(e & Z.Self || (e & Z.Host && n));
      }
      class fo {
        constructor(n, t) {
          (this._tNode = n), (this._lView = t);
        }
        get(n, t, r) {
          return u_(this._tNode, this._lView, n, El(r), t);
        }
      }
      function ZT() {
        return new fo(Rt(), S());
      }
      function et(e) {
        return Dr(() => {
          const n = e.prototype.constructor,
            t = n[wr] || Gd(n),
            r = Object.prototype;
          let i = Object.getPrototypeOf(e.prototype).constructor;
          for (; i && i !== r; ) {
            const o = i[wr] || Gd(i);
            if (o && o !== t) return o;
            i = Object.getPrototypeOf(i);
          }
          return (o) => new o();
        });
      }
      function Gd(e) {
        return _d(e)
          ? () => {
              const n = Gd(J(e));
              return n && n();
            }
          : pi(e);
      }
      function p_(e) {
        const n = e[B],
          t = n.type;
        return 2 === t ? n.declTNode : 1 === t ? e[jt] : null;
      }
      function Wr(e) {
        return (function qT(e, n) {
          if ("class" === n) return e.classes;
          if ("style" === n) return e.styles;
          const t = e.attrs;
          if (t) {
            const r = t.length;
            let i = 0;
            for (; i < r; ) {
              const o = t[i];
              if (t_(o)) break;
              if (0 === o) i += 2;
              else if ("number" == typeof o)
                for (i++; i < r && "string" == typeof t[i]; ) i++;
              else {
                if (o === n) return t[i + 1];
                i += 2;
              }
            }
          }
          return null;
        })(Rt(), e);
      }
      const po = "__parameters__";
      function mo(e, n, t) {
        return Dr(() => {
          const r = (function zd(e) {
            return function (...t) {
              if (e) {
                const r = e(...t);
                for (const i in r) this[i] = r[i];
              }
            };
          })(n);
          function i(...o) {
            if (this instanceof i) return r.apply(this, o), this;
            const s = new i(...o);
            return (a.annotation = s), a;
            function a(l, c, u) {
              const d = l.hasOwnProperty(po)
                ? l[po]
                : Object.defineProperty(l, po, { value: [] })[po];
              for (; d.length <= u; ) d.push(null);
              return (d[u] = d[u] || []).push(s), l;
            }
          }
          return (
            t && (i.prototype = Object.create(t.prototype)),
            (i.prototype.ngMetadataName = e),
            (i.annotationCls = i),
            i
          );
        });
      }
      class $ {
        constructor(n, t) {
          (this._desc = n),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ɵprov = P({
                  token: this,
                  providedIn: t.providedIn || "root",
                  factory: t.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function _i(e, n) {
        e.forEach((t) => (Array.isArray(t) ? _i(t, n) : n(t)));
      }
      function m_(e, n, t) {
        n >= e.length ? e.push(t) : e.splice(n, 0, t);
      }
      function $l(e, n) {
        return n >= e.length - 1 ? e.pop() : e.splice(n, 1)[0];
      }
      function ks(e, n) {
        const t = [];
        for (let r = 0; r < e; r++) t.push(n);
        return t;
      }
      function yn(e, n, t) {
        let r = _o(e, n);
        return (
          r >= 0
            ? (e[1 | r] = t)
            : ((r = ~r),
              (function tM(e, n, t, r) {
                let i = e.length;
                if (i == n) e.push(t, r);
                else if (1 === i) e.push(r, e[0]), (e[0] = t);
                else {
                  for (i--, e.push(e[i - 1], e[i]); i > n; )
                    (e[i] = e[i - 2]), i--;
                  (e[n] = t), (e[n + 1] = r);
                }
              })(e, r, n, t)),
          r
        );
      }
      function qd(e, n) {
        const t = _o(e, n);
        if (t >= 0) return e[1 | t];
      }
      function _o(e, n) {
        return (function __(e, n, t) {
          let r = 0,
            i = e.length >> t;
          for (; i !== r; ) {
            const o = r + ((i - r) >> 1),
              s = e[o << t];
            if (n === s) return o << t;
            s > n ? (i = o) : (r = o + 1);
          }
          return ~(i << t);
        })(e, n, 1);
      }
      const Ls = Ss(mo("Optional"), 8),
        Vs = Ss(mo("SkipSelf"), 4);
      var on = (() => (
        ((on = on || {})[(on.Important = 1)] = "Important"),
        (on[(on.DashCase = 2)] = "DashCase"),
        on
      ))();
      const bM = /^>|^->|<!--|-->|--!>|<!-$/g,
        DM = /(<|>)/,
        CM = "\u200b$1\u200b";
      const Xd = new Map();
      let wM = 0;
      const tf = "__ngContext__";
      function Ut(e, n) {
        _n(n)
          ? ((e[tf] = n[Is]),
            (function SM(e) {
              Xd.set(e[Is], e);
            })(n))
          : (e[tf] = n);
      }
      let nf;
      function rf(e, n) {
        return nf(e, n);
      }
      function $s(e) {
        const n = e[Qe];
        return zn(n) ? n[Qe] : n;
      }
      function sf(e) {
        return L_(e[Ms]);
      }
      function af(e) {
        return L_(e[Gn]);
      }
      function L_(e) {
        for (; null !== e && !zn(e); ) e = e[Gn];
        return e;
      }
      function yo(e, n, t, r, i) {
        if (null != r) {
          let o,
            s = !1;
          zn(r) ? (o = r) : _n(r) && ((s = !0), (r = r[Er]));
          const a = At(r);
          0 === e && null !== t
            ? null == i
              ? U_(n, t, a)
              : vi(n, t, a, i || null, !0)
            : 1 === e && null !== t
              ? vi(n, t, a, i || null, !0)
              : 2 === e
                ? pf(n, a, s)
                : 3 === e && n.destroyNode(a),
            null != o &&
              (function YM(e, n, t, r, i) {
                const o = t[Il];
                o !== At(t) && yo(n, e, r, o, i);
                for (let a = Yt; a < t.length; a++) {
                  const l = t[a];
                  Us(l[B], l, e, n, r, o);
                }
              })(n, e, o, t, i);
        }
      }
      function lf(e, n) {
        return e.createText(n);
      }
      function V_(e, n, t) {
        e.setValue(n, t);
      }
      function kM(e, n) {
        return e.createComment(
          (function I_(e) {
            return e.replace(bM, (n) => n.replace(DM, CM));
          })(n),
        );
      }
      function cf(e, n, t) {
        return e.createElement(n, t);
      }
      function B_(e, n) {
        const t = e[ao],
          r = t.indexOf(n),
          i = n[Qe];
        512 & n[se] && ((n[se] &= -513), Id(i, -1)), t.splice(r, 1);
      }
      function uf(e, n) {
        if (e.length <= Yt) return;
        const t = Yt + n,
          r = e[t];
        if (r) {
          const i = r[Ns];
          null !== i && i !== e && B_(i, r), n > 0 && (e[t - 1][Gn] = r[Gn]);
          const o = $l(e, Yt + n);
          !(function LM(e, n) {
            Us(e, n, n[le], 2, null, null), (n[Er] = null), (n[jt] = null);
          })(r[B], r);
          const s = o[ar];
          null !== s && s.detachView(o[B]),
            (r[Qe] = null),
            (r[Gn] = null),
            (r[se] &= -65);
        }
        return r;
      }
      function H_(e, n) {
        if (!(128 & n[se])) {
          const t = n[le];
          t.destroyNode && Us(e, n, t, 3, null, null),
            (function HM(e) {
              let n = e[Ms];
              if (!n) return df(e[B], e);
              for (; n; ) {
                let t = null;
                if (_n(n)) t = n[Ms];
                else {
                  const r = n[Yt];
                  r && (t = r);
                }
                if (!t) {
                  for (; n && !n[Gn] && n !== e; )
                    _n(n) && df(n[B], n), (n = n[Qe]);
                  null === n && (n = e), _n(n) && df(n[B], n), (t = n && n[Gn]);
                }
                n = t;
              }
            })(n);
        }
      }
      function df(e, n) {
        if (!(128 & n[se])) {
          (n[se] &= -65),
            (n[se] |= 128),
            (function GM(e, n) {
              let t;
              if (null != e && null != (t = e.destroyHooks))
                for (let r = 0; r < t.length; r += 2) {
                  const i = n[t[r]];
                  if (!(i instanceof Rs)) {
                    const o = t[r + 1];
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = i[o[s]],
                          l = o[s + 1];
                        Rn(4, a, l);
                        try {
                          l.call(a);
                        } finally {
                          Rn(5, a, l);
                        }
                      }
                    else {
                      Rn(4, i, o);
                      try {
                        o.call(i);
                      } finally {
                        Rn(5, i, o);
                      }
                    }
                  }
                }
            })(e, n),
            (function UM(e, n) {
              const t = e.cleanup,
                r = n[io];
              let i = -1;
              if (null !== t)
                for (let o = 0; o < t.length - 1; o += 2)
                  if ("string" == typeof t[o]) {
                    const s = t[o + 3];
                    s >= 0 ? r[(i = s)]() : r[(i = -s)].unsubscribe(), (o += 2);
                  } else {
                    const s = r[(i = t[o + 1])];
                    t[o].call(s);
                  }
              if (null !== r) {
                for (let o = i + 1; o < r.length; o++) (0, r[o])();
                n[io] = null;
              }
            })(e, n),
            1 === n[B].type && n[le].destroy();
          const t = n[Ns];
          if (null !== t && zn(n[Qe])) {
            t !== n[Qe] && B_(t, n);
            const r = n[ar];
            null !== r && r.detachView(e);
          }
          !(function TM(e) {
            Xd.delete(e[Is]);
          })(n);
        }
      }
      function j_(e, n, t) {
        return $_(e, n.parent, t);
      }
      function $_(e, n, t) {
        let r = n;
        for (; null !== r && 40 & r.type; ) r = (n = r).parent;
        if (null === r) return t[Er];
        {
          const { componentOffset: i } = r;
          if (i > -1) {
            const { encapsulation: o } = e.data[r.directiveStart + i];
            if (o === sr.None || o === sr.Emulated) return null;
          }
          return vn(r, t);
        }
      }
      function vi(e, n, t, r, i) {
        e.insertBefore(n, t, r, i);
      }
      function U_(e, n, t) {
        e.appendChild(n, t);
      }
      function G_(e, n, t, r, i) {
        null !== r ? vi(e, n, t, r, i) : U_(e, n, t);
      }
      function Wl(e, n) {
        return e.parentNode(n);
      }
      function z_(e, n, t) {
        return q_(e, n, t);
      }
      function W_(e, n, t) {
        return 40 & e.type ? vn(e, t) : null;
      }
      let ff,
        Jl,
        _f,
        q_ = W_;
      function Y_(e, n) {
        (q_ = e), (ff = n);
      }
      function ql(e, n, t, r) {
        const i = j_(e, r, n),
          o = n[le],
          a = z_(r.parent || n[jt], r, n);
        if (null != i)
          if (Array.isArray(t))
            for (let l = 0; l < t.length; l++) G_(o, i, t[l], a, !1);
          else G_(o, i, t, a, !1);
        void 0 !== ff && ff(o, r, n, t, i);
      }
      function Yl(e, n) {
        if (null !== n) {
          const t = n.type;
          if (3 & t) return vn(n, e);
          if (4 & t) return hf(-1, e[n.index]);
          if (8 & t) {
            const r = n.child;
            if (null !== r) return Yl(e, r);
            {
              const i = e[n.index];
              return zn(i) ? hf(-1, i) : At(i);
            }
          }
          if (32 & t) return rf(n, e)() || At(e[n.index]);
          {
            const r = J_(e, n);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Yl($s(e[$t]), r)
              : Yl(e, n.next);
          }
        }
        return null;
      }
      function J_(e, n) {
        return null !== n ? e[$t][jt].projection[n.projection] : null;
      }
      function hf(e, n) {
        const t = Yt + e + 1;
        if (t < n.length) {
          const r = n[t],
            i = r[B].firstChild;
          if (null !== i) return Yl(r, i);
        }
        return n[Il];
      }
      function pf(e, n, t) {
        const r = Wl(e, n);
        r &&
          (function zM(e, n, t, r) {
            e.removeChild(n, t, r);
          })(e, r, n, t);
      }
      function gf(e, n, t, r, i, o, s) {
        for (; null != t; ) {
          const a = r[t.index],
            l = t.type;
          if (
            (s && 0 === n && (a && Ut(At(a), r), (t.flags |= 2)),
            32 != (32 & t.flags))
          )
            if (8 & l) gf(e, n, t.child, r, i, o, !1), yo(n, e, i, a, o);
            else if (32 & l) {
              const c = rf(t, r);
              let u;
              for (; (u = c()); ) yo(n, e, i, u, o);
              yo(n, e, i, a, o);
            } else 16 & l ? Z_(e, n, r, t, i, o) : yo(n, e, i, a, o);
          t = s ? t.projectionNext : t.next;
        }
      }
      function Us(e, n, t, r, i, o) {
        gf(t, r, e.firstChild, n, i, o, !1);
      }
      function Z_(e, n, t, r, i, o) {
        const s = t[$t],
          l = s[jt].projection[r.projection];
        if (Array.isArray(l))
          for (let c = 0; c < l.length; c++) yo(n, e, i, l[c], o);
        else gf(e, n, l, s[Qe], i, o, !0);
      }
      function K_(e, n, t) {
        "" === t
          ? e.removeAttribute(n, "class")
          : e.setAttribute(n, "class", t);
      }
      function Q_(e, n, t) {
        const { mergedAttrs: r, classes: i, styles: o } = t;
        null !== r && Bd(e, n, r),
          null !== i && K_(e, n, i),
          null !== o &&
            (function ZM(e, n, t) {
              e.setAttribute(n, "style", t);
            })(e, n, o);
      }
      function bo(e) {
        return (
          (function mf() {
            if (void 0 === Jl && ((Jl = null), Ue.trustedTypes))
              try {
                Jl = Ue.trustedTypes.createPolicy("angular", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return Jl;
          })()?.createHTML(e) || e
        );
      }
      class rv {
        constructor(n) {
          this.changingThisBreaksApplicationSecurity = n;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      function qr(e) {
        return e instanceof rv ? e.changingThisBreaksApplicationSecurity : e;
      }
      class aN {
        constructor(n) {
          this.inertDocumentHelper = n;
        }
        getInertBodyElement(n) {
          n = "<body><remove></remove>" + n;
          try {
            const t = new window.DOMParser().parseFromString(
              bo(n),
              "text/html",
            ).body;
            return null === t
              ? this.inertDocumentHelper.getInertBodyElement(n)
              : (t.removeChild(t.firstChild), t);
          } catch {
            return null;
          }
        }
      }
      class lN {
        constructor(n) {
          (this.defaultDoc = n),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                "sanitization-inert",
              ));
        }
        getInertBodyElement(n) {
          const t = this.inertDocument.createElement("template");
          return (t.innerHTML = bo(n)), t;
        }
      }
      const uN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      function yf(e) {
        return (e = String(e)).match(uN) ? e : "unsafe:" + e;
      }
      function Mr(e) {
        const n = {};
        for (const t of e.split(",")) n[t] = !0;
        return n;
      }
      function zs(...e) {
        const n = {};
        for (const t of e)
          for (const r in t) t.hasOwnProperty(r) && (n[r] = !0);
        return n;
      }
      const ov = Mr("area,br,col,hr,img,wbr"),
        sv = Mr("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        av = Mr("rp,rt"),
        bf = zs(
          ov,
          zs(
            sv,
            Mr(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul",
            ),
          ),
          zs(
            av,
            Mr(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video",
            ),
          ),
          zs(av, sv),
        ),
        Df = Mr("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        lv = zs(
          Df,
          Mr(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width",
          ),
          Mr(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext",
          ),
        );
      const Ql = new $("ENVIRONMENT_INITIALIZER"),
        hv = new $("INJECTOR", -1),
        pv = new $("INJECTOR_DEF_TYPES");
      class gv {
        get(n, t = ws) {
          if (t === ws) {
            const r = new Error(`NullInjectorError: No provider for ${ke(n)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return t;
        }
      }
      function EN(...e) {
        return { ɵproviders: mv(0, e), ɵfromNgModule: !0 };
      }
      function mv(e, ...n) {
        const t = [],
          r = new Set();
        let i;
        return (
          _i(n, (o) => {
            const s = o;
            wf(s, t, [], r) && (i || (i = []), i.push(s));
          }),
          void 0 !== i && _v(i, t),
          t
        );
      }
      function _v(e, n) {
        for (let t = 0; t < e.length; t++) {
          const { providers: i } = e[t];
          Ef(i, (o) => {
            n.push(o);
          });
        }
      }
      function wf(e, n, t, r) {
        if (!(e = J(e))) return !1;
        let i = null,
          o = Dm(e);
        const s = !o && Se(e);
        if (o || s) {
          if (s && !s.standalone) return !1;
          i = e;
        } else {
          const l = e.ngModule;
          if (((o = Dm(l)), !o)) return !1;
          i = l;
        }
        const a = r.has(i);
        if (s) {
          if (a) return !1;
          if ((r.add(i), s.dependencies)) {
            const l =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const c of l) wf(c, n, t, r);
          }
        } else {
          if (!o) return !1;
          {
            if (null != o.imports && !a) {
              let c;
              r.add(i);
              try {
                _i(o.imports, (u) => {
                  wf(u, n, t, r) && (c || (c = []), c.push(u));
                });
              } finally {
              }
              void 0 !== c && _v(c, n);
            }
            if (!a) {
              const c = pi(i) || (() => new i());
              n.push(
                { provide: i, useFactory: c, deps: De },
                { provide: pv, useValue: i, multi: !0 },
                { provide: Ql, useValue: () => k(i), multi: !0 },
              );
            }
            const l = o.providers;
            null == l ||
              a ||
              Ef(l, (u) => {
                n.push(u);
              });
          }
        }
        return i !== e && void 0 !== e.providers;
      }
      function Ef(e, n) {
        for (let t of e)
          vd(t) && (t = t.ɵproviders), Array.isArray(t) ? Ef(t, n) : n(t);
      }
      const SN = Pe({ provide: String, useValue: Pe });
      function Sf(e) {
        return null !== e && "object" == typeof e && SN in e;
      }
      function yi(e) {
        return "function" == typeof e;
      }
      const Tf = new $("Set Injector scope."),
        Xl = {},
        MN = {};
      let Mf;
      function ec() {
        return void 0 === Mf && (Mf = new gv()), Mf;
      }
      class xn {}
      class bv extends xn {
        get destroyed() {
          return this._destroyed;
        }
        constructor(n, t, r, i) {
          super(),
            (this.parent = t),
            (this.source = r),
            (this.scopes = i),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            If(n, (s) => this.processProvider(s)),
            this.records.set(hv, Do(void 0, this)),
            i.has("environment") && this.records.set(xn, Do(void 0, this));
          const o = this.records.get(Tf);
          null != o && "string" == typeof o.value && this.scopes.add(o.value),
            (this.injectorDefTypes = new Set(this.get(pv.multi, De, Z.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            for (const n of this._onDestroyHooks) n();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(n) {
          this._onDestroyHooks.push(n);
        }
        runInContext(n) {
          this.assertNotDestroyed();
          const t = no(this),
            r = An(void 0);
          try {
            return n();
          } finally {
            no(t), An(r);
          }
        }
        get(n, t = ws, r = Z.Default) {
          this.assertNotDestroyed(), (r = El(r));
          const i = no(this),
            o = An(void 0);
          try {
            if (!(r & Z.SkipSelf)) {
              let a = this.records.get(n);
              if (void 0 === a) {
                const l =
                  (function RN(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof $)
                    );
                  })(n) && Dl(n);
                (a = l && this.injectableDefInScope(l) ? Do(Nf(n), Xl) : null),
                  this.records.set(n, a);
              }
              if (null != a) return this.hydrate(n, a);
            }
            return (r & Z.Self ? ec() : this.parent).get(
              n,
              (t = r & Z.Optional && t === ws ? null : t),
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[wl] = s[wl] || []).unshift(ke(n)), i)) throw s;
              return (function rT(e, n, t, r) {
                const i = e[wl];
                throw (
                  (n[Em] && i.unshift(n[Em]),
                  (e.message = (function iT(e, n, t, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && e.charAt(1) == eT
                        ? e.slice(2)
                        : e;
                    let i = ke(n);
                    if (Array.isArray(n)) i = n.map(ke).join(" -> ");
                    else if ("object" == typeof n) {
                      let o = [];
                      for (let s in n)
                        if (n.hasOwnProperty(s)) {
                          let a = n[s];
                          o.push(
                            s +
                              ":" +
                              ("string" == typeof a
                                ? JSON.stringify(a)
                                : ke(a)),
                          );
                        }
                      i = `{${o.join(", ")}}`;
                    }
                    return `${t}${r ? "(" + r + ")" : ""}[${i}]: ${e.replace(XS, "\n  ")}`;
                  })("\n" + e.message, i, t, r)),
                  (e[QS] = i),
                  (e[wl] = null),
                  e)
                );
              })(s, n, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            An(o), no(i);
          }
        }
        resolveInjectorInitializers() {
          const n = no(this),
            t = An(void 0);
          try {
            const r = this.get(Ql.multi, De, Z.Self);
            for (const i of r) i();
          } finally {
            no(n), An(t);
          }
        }
        toString() {
          const n = [],
            t = this.records;
          for (const r of t.keys()) n.push(ke(r));
          return `R3Injector[${n.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new A(205, !1);
        }
        processProvider(n) {
          let t = yi((n = J(n))) ? n : J(n && n.provide);
          const r = (function IN(e) {
            return Sf(e) ? Do(void 0, e.useValue) : Do(Dv(e), Xl);
          })(n);
          if (yi(n) || !0 !== n.multi) this.records.get(t);
          else {
            let i = this.records.get(t);
            i ||
              ((i = Do(void 0, Xl, !0)),
              (i.factory = () => Cd(i.multi)),
              this.records.set(t, i)),
              (t = n),
              i.multi.push(n);
          }
          this.records.set(t, r);
        }
        hydrate(n, t) {
          return (
            t.value === Xl && ((t.value = MN), (t.value = t.factory())),
            "object" == typeof t.value &&
              t.value &&
              (function AN(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(t.value) &&
              this._ngOnDestroyHooks.add(t.value),
            t.value
          );
        }
        injectableDefInScope(n) {
          if (!n.providedIn) return !1;
          const t = J(n.providedIn);
          return "string" == typeof t
            ? "any" === t || this.scopes.has(t)
            : this.injectorDefTypes.has(t);
        }
      }
      function Nf(e) {
        const n = Dl(e),
          t = null !== n ? n.factory : pi(e);
        if (null !== t) return t;
        if (e instanceof $) throw new A(204, !1);
        if (e instanceof Function)
          return (function NN(e) {
            const n = e.length;
            if (n > 0) throw (ks(n, "?"), new A(204, !1));
            const t = (function JS(e) {
              return (e && (e[Cl] || e[Cm])) || null;
            })(e);
            return null !== t ? () => t.factory(e) : () => new e();
          })(e);
        throw new A(204, !1);
      }
      function Dv(e, n, t) {
        let r;
        if (yi(e)) {
          const i = J(e);
          return pi(i) || Nf(i);
        }
        if (Sf(e)) r = () => J(e.useValue);
        else if (
          (function yv(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...Cd(e.deps || []));
        else if (
          (function vv(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => k(J(e.useExisting));
        else {
          const i = J(e && (e.useClass || e.provide));
          if (
            !(function ON(e) {
              return !!e.deps;
            })(e)
          )
            return pi(i) || Nf(i);
          r = () => new i(...Cd(e.deps));
        }
        return r;
      }
      function Do(e, n, t = !1) {
        return { factory: e, value: n, multi: t ? [] : void 0 };
      }
      function If(e, n) {
        for (const t of e)
          Array.isArray(t) ? If(t, n) : t && vd(t) ? If(t.ɵproviders, n) : n(t);
      }
      class PN {}
      class Cv {}
      class FN {
        resolveComponentFactory(n) {
          throw (function xN(e) {
            const n = Error(
              `No component factory found for ${ke(e)}. Did you add it to @NgModule.entryComponents?`,
            );
            return (n.ngComponent = e), n;
          })(n);
        }
      }
      let qs = (() => {
        class e {}
        return (e.NULL = new FN()), e;
      })();
      function kN() {
        return Co(Rt(), S());
      }
      function Co(e, n) {
        return new _e(vn(e, n));
      }
      let _e = (() => {
        class e {
          constructor(t) {
            this.nativeElement = t;
          }
        }
        return (e.__NG_ELEMENT_ID__ = kN), e;
      })();
      function LN(e) {
        return e instanceof _e ? e.nativeElement : e;
      }
      class Of {}
      let an = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function VN() {
                const e = S(),
                  t = rn(Rt().index, e);
                return (_n(t) ? t : e)[le];
              })()),
            e
          );
        })(),
        BN = (() => {
          class e {}
          return (
            (e.ɵprov = P({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class Ys {
        constructor(n) {
          (this.full = n),
            (this.major = n.split(".")[0]),
            (this.minor = n.split(".")[1]),
            (this.patch = n.split(".").slice(2).join("."));
        }
      }
      const HN = new Ys("15.2.10"),
        Af = {},
        Rf = "ngOriginalError";
      function Pf(e) {
        return e[Rf];
      }
      class wo {
        constructor() {
          this._console = console;
        }
        handleError(n) {
          const t = this._findOriginalError(n);
          this._console.error("ERROR", n),
            t && this._console.error("ORIGINAL ERROR", t);
        }
        _findOriginalError(n) {
          let t = n && Pf(n);
          for (; t && Pf(t); ) t = Pf(t);
          return t || null;
        }
      }
      function Nr(e) {
        return e instanceof Function ? e() : e;
      }
      function Sv(e, n, t) {
        let r = e.length;
        for (;;) {
          const i = e.indexOf(n, t);
          if (-1 === i) return i;
          if (0 === i || e.charCodeAt(i - 1) <= 32) {
            const o = n.length;
            if (i + o === r || e.charCodeAt(i + o) <= 32) return i;
          }
          t = i + 1;
        }
      }
      const Tv = "ng-template";
      function KN(e, n, t) {
        let r = 0,
          i = !0;
        for (; r < e.length; ) {
          let o = e[r++];
          if ("string" == typeof o && i) {
            const s = e[r++];
            if (t && "class" === o && -1 !== Sv(s.toLowerCase(), n, 0))
              return !0;
          } else {
            if (1 === o) {
              for (; r < e.length && "string" == typeof (o = e[r++]); )
                if (o.toLowerCase() === n) return !0;
              return !1;
            }
            "number" == typeof o && (i = !1);
          }
        }
        return !1;
      }
      function Mv(e) {
        return 4 === e.type && e.value !== Tv;
      }
      function QN(e, n, t) {
        return n === (4 !== e.type || t ? e.value : Tv);
      }
      function XN(e, n, t) {
        let r = 4;
        const i = e.attrs || [],
          o = (function nI(e) {
            for (let n = 0; n < e.length; n++) if (t_(e[n])) return n;
            return e.length;
          })(i);
        let s = !1;
        for (let a = 0; a < n.length; a++) {
          const l = n[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !QN(e, l, t)) || ("" === l && 1 === n.length))
                ) {
                  if (qn(r)) return !1;
                  s = !0;
                }
              } else {
                const c = 8 & r ? l : n[++a];
                if (8 & r && null !== e.attrs) {
                  if (!KN(e.attrs, c, t)) {
                    if (qn(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = eI(8 & r ? "class" : l, i, Mv(e), t);
                if (-1 === d) {
                  if (qn(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== c) {
                  let f;
                  f = d > o ? "" : i[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Sv(h, c, 0)) || (2 & r && c !== f)) {
                    if (qn(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !qn(r) && !qn(l)) return !1;
            if (s && qn(l)) continue;
            (s = !1), (r = l | (1 & r));
          }
        }
        return qn(r) || s;
      }
      function qn(e) {
        return 0 == (1 & e);
      }
      function eI(e, n, t, r) {
        if (null === n) return -1;
        let i = 0;
        if (r || !t) {
          let o = !1;
          for (; i < n.length; ) {
            const s = n[i];
            if (s === e) return i;
            if (3 === s || 6 === s) o = !0;
            else {
              if (1 === s || 2 === s) {
                let a = n[++i];
                for (; "string" == typeof a; ) a = n[++i];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                i += 4;
                continue;
              }
            }
            i += o ? 1 : 2;
          }
          return -1;
        }
        return (function rI(e, n) {
          let t = e.indexOf(4);
          if (t > -1)
            for (t++; t < e.length; ) {
              const r = e[t];
              if ("number" == typeof r) return -1;
              if (r === n) return t;
              t++;
            }
          return -1;
        })(n, e);
      }
      function Nv(e, n, t = !1) {
        for (let r = 0; r < n.length; r++) if (XN(e, n[r], t)) return !0;
        return !1;
      }
      function iI(e, n) {
        e: for (let t = 0; t < n.length; t++) {
          const r = n[t];
          if (e.length === r.length) {
            for (let i = 0; i < e.length; i++) if (e[i] !== r[i]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function Iv(e, n) {
        return e ? ":not(" + n.trim() + ")" : n;
      }
      function oI(e) {
        let n = e[0],
          t = 1,
          r = 2,
          i = "",
          o = !1;
        for (; t < e.length; ) {
          let s = e[t];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++t];
              i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (i += "." + s) : 4 & r && (i += " " + s);
          else
            "" !== i && !qn(s) && ((n += Iv(o, i)), (i = "")),
              (r = s),
              (o = o || !qn(r));
          t++;
        }
        return "" !== i && (n += Iv(o, i)), n;
      }
      const re = {};
      function N(e) {
        Ov(pe(), S(), Zt() + e, !1);
      }
      function Ov(e, n, t, r) {
        if (!r)
          if (3 == (3 & n[se])) {
            const o = e.preOrderCheckHooks;
            null !== o && Fl(n, o, t);
          } else {
            const o = e.preOrderHooks;
            null !== o && kl(n, o, 0, t);
          }
        gi(t);
      }
      function xv(e, n = null, t = null, r) {
        const i = Fv(e, n, t, r);
        return i.resolveInjectorInitializers(), i;
      }
      function Fv(e, n = null, t = null, r, i = new Set()) {
        const o = [t || De, EN(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : ke(e))),
          new bv(o, n || ec(), r || null, i)
        );
      }
      let ln = (() => {
        class e {
          static create(t, r) {
            if (Array.isArray(t)) return xv({ name: "" }, r, t, "");
            {
              const i = t.name ?? "";
              return xv({ name: i }, t.parent, t.providers, i);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = ws),
          (e.NULL = new gv()),
          (e.ɵprov = P({ token: e, providedIn: "any", factory: () => k(hv) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function g(e, n = Z.Default) {
        const t = S();
        return null === t ? k(e, n) : u_(Rt(), t, J(e), n);
      }
      function Uv(e, n) {
        const t = e.contentQueries;
        if (null !== t)
          for (let r = 0; r < t.length; r += 2) {
            const o = t[r + 1];
            if (-1 !== o) {
              const s = e.data[o];
              xd(t[r]), s.contentQueries(2, n[o], o);
            }
          }
      }
      function nc(e, n, t, r, i, o, s, a, l, c, u) {
        const d = n.blueprint.slice();
        return (
          (d[Er] = i),
          (d[se] = 76 | r),
          (null !== u || (e && 1024 & e[se])) && (d[se] |= 1024),
          jm(d),
          (d[Qe] = d[oo] = e),
          (d[ot] = t),
          (d[Nl] = s || (e && e[Nl])),
          (d[le] = a || (e && e[le])),
          (d[Sd] = l || (e && e[Sd]) || null),
          (d[Ml] = c || (e && e[Ml]) || null),
          (d[jt] = o),
          (d[Is] = (function EM() {
            return wM++;
          })()),
          (d[Am] = u),
          (d[$t] = 2 == n.type ? e[$t] : d),
          d
        );
      }
      function To(e, n, t, r, i) {
        let o = e.data[n];
        if (null === o)
          (o = Vf(e, n, t, r, i)),
            (function NT() {
              return ne.lFrame.inI18n;
            })() && (o.flags |= 32);
        else if (64 & o.type) {
          (o.type = t), (o.value = r), (o.attrs = i);
          const s = As();
          o.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return lr(o, !0), o;
      }
      function Vf(e, n, t, r, i) {
        const o = Gm(),
          s = Od(),
          l = (e.data[n] = (function AI(e, n, t, r, i, o) {
            return {
              type: t,
              index: r,
              insertBeforeIndex: null,
              injectorIndex: n ? n.injectorIndex : -1,
              directiveStart: -1,
              directiveEnd: -1,
              directiveStylingLast: -1,
              componentOffset: -1,
              propertyBindings: null,
              flags: 0,
              providerIndexes: 0,
              value: i,
              attrs: o,
              mergedAttrs: null,
              localNames: null,
              initialInputs: void 0,
              inputs: null,
              outputs: null,
              tView: null,
              next: null,
              prev: null,
              projectionNext: null,
              child: null,
              parent: n,
              projection: null,
              styles: null,
              stylesWithoutHost: null,
              residualStyles: void 0,
              classes: null,
              classesWithoutHost: null,
              residualClasses: void 0,
              classBindings: 0,
              styleBindings: 0,
            };
          })(0, s ? o : o && o.parent, t, n, r, i));
        return (
          null === e.firstChild && (e.firstChild = l),
          null !== o &&
            (s
              ? null == o.child && null !== l.parent && (o.child = l)
              : null === o.next && ((o.next = l), (l.prev = o))),
          l
        );
      }
      function Js(e, n, t, r) {
        if (0 === t) return -1;
        const i = n.length;
        for (let o = 0; o < t; o++)
          n.push(r), e.blueprint.push(r), e.data.push(null);
        return i;
      }
      function Bf(e, n, t) {
        Fd(n);
        try {
          const r = e.viewQuery;
          null !== r && Yf(1, r, t);
          const i = e.template;
          null !== i && Gv(e, n, i, 1, t),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Uv(e, n),
            e.staticViewQueries && Yf(2, e.viewQuery, t);
          const o = e.components;
          null !== o &&
            (function NI(e, n) {
              for (let t = 0; t < n.length; t++) KI(e, n[t]);
            })(n, o);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (n[se] &= -5), kd();
        }
      }
      function rc(e, n, t, r) {
        const i = n[se];
        if (128 != (128 & i)) {
          Fd(n);
          try {
            jm(n),
              (function Wm(e) {
                return (ne.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== t && Gv(e, n, t, 2, r);
            const s = 3 == (3 & i);
            if (s) {
              const c = e.preOrderCheckHooks;
              null !== c && Fl(n, c, null);
            } else {
              const c = e.preOrderHooks;
              null !== c && kl(n, c, 0, null), Ld(n, 0);
            }
            if (
              ((function JI(e) {
                for (let n = sf(e); null !== n; n = af(n)) {
                  if (!n[Rm]) continue;
                  const t = n[ao];
                  for (let r = 0; r < t.length; r++) {
                    const i = t[r];
                    512 & i[se] || Id(i[Qe], 1), (i[se] |= 512);
                  }
                }
              })(n),
              (function YI(e) {
                for (let n = sf(e); null !== n; n = af(n))
                  for (let t = Yt; t < n.length; t++) {
                    const r = n[t],
                      i = r[B];
                    Pl(r) && rc(i, r, i.template, r[ot]);
                  }
              })(n),
              null !== e.contentQueries && Uv(e, n),
              s)
            ) {
              const c = e.contentCheckHooks;
              null !== c && Fl(n, c);
            } else {
              const c = e.contentHooks;
              null !== c && kl(n, c, 1), Ld(n, 1);
            }
            !(function TI(e, n) {
              const t = e.hostBindingOpCodes;
              if (null !== t)
                try {
                  for (let r = 0; r < t.length; r++) {
                    const i = t[r];
                    if (i < 0) gi(~i);
                    else {
                      const o = i,
                        s = t[++r],
                        a = t[++r];
                      IT(s, o), a(2, n[o]);
                    }
                  }
                } finally {
                  gi(-1);
                }
            })(e, n);
            const a = e.components;
            null !== a &&
              (function MI(e, n) {
                for (let t = 0; t < n.length; t++) ZI(e, n[t]);
              })(n, a);
            const l = e.viewQuery;
            if ((null !== l && Yf(2, l, r), s)) {
              const c = e.viewCheckHooks;
              null !== c && Fl(n, c);
            } else {
              const c = e.viewHooks;
              null !== c && kl(n, c, 2), Ld(n, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (n[se] &= -41),
              512 & n[se] && ((n[se] &= -513), Id(n[Qe], -1));
          } finally {
            kd();
          }
        }
      }
      function Gv(e, n, t, r, i) {
        const o = Zt(),
          s = 2 & r;
        try {
          gi(-1),
            s && n.length > Ge && Ov(e, n, Ge, !1),
            Rn(s ? 2 : 0, i),
            t(r, i);
        } finally {
          gi(o), Rn(s ? 3 : 1, i);
        }
      }
      function Hf(e, n, t) {
        if (Md(n)) {
          const i = n.directiveEnd;
          for (let o = n.directiveStart; o < i; o++) {
            const s = e.data[o];
            s.contentQueries && s.contentQueries(1, t[o], o);
          }
        }
      }
      function jf(e, n, t) {
        Um() &&
          ((function VI(e, n, t, r) {
            const i = t.directiveStart,
              o = t.directiveEnd;
            Os(t) &&
              (function zI(e, n, t) {
                const r = vn(n, e),
                  i = zv(t),
                  o = e[Nl],
                  s = ic(
                    e,
                    nc(
                      e,
                      i,
                      null,
                      t.onPush ? 32 : 16,
                      r,
                      n,
                      o,
                      o.createRenderer(r, t),
                      null,
                      null,
                      null,
                    ),
                  );
                e[n.index] = s;
              })(n, t, e.data[i + t.componentOffset]),
              e.firstCreatePass || Hl(t, n),
              Ut(r, n);
            const s = t.initialInputs;
            for (let a = i; a < o; a++) {
              const l = e.data[a],
                c = mi(n, e, a, t);
              Ut(c, n),
                null !== s && WI(0, a - i, c, l, 0, s),
                Wn(l) && (rn(t.index, n)[ot] = mi(n, e, a, t));
            }
          })(e, n, t, vn(t, n)),
          64 == (64 & t.flags) && Zv(e, n, t));
      }
      function $f(e, n, t = vn) {
        const r = n.localNames;
        if (null !== r) {
          let i = n.index + 1;
          for (let o = 0; o < r.length; o += 2) {
            const s = r[o + 1],
              a = -1 === s ? t(n, e) : e[s];
            e[i++] = a;
          }
        }
      }
      function zv(e) {
        const n = e.tView;
        return null === n || n.incompleteFirstPass
          ? (e.tView = Uf(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
            ))
          : n;
      }
      function Uf(e, n, t, r, i, o, s, a, l, c) {
        const u = Ge + r,
          d = u + i,
          f = (function II(e, n) {
            const t = [];
            for (let r = 0; r < n; r++) t.push(r < e ? null : re);
            return t;
          })(u, d),
          h = "function" == typeof c ? c() : c;
        return (f[B] = {
          type: e,
          blueprint: f,
          template: t,
          queries: null,
          viewQuery: a,
          declTNode: n,
          data: f.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof o ? o() : o,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function Wv(e, n, t, r) {
        const i = Qv(n);
        null === t
          ? i.push(r)
          : (i.push(t), e.firstCreatePass && Xv(e).push(r, i.length - 1));
      }
      function qv(e, n, t, r) {
        for (let i in e)
          if (e.hasOwnProperty(i)) {
            t = null === t ? {} : t;
            const o = e[i];
            null === r
              ? Yv(t, n, i, o)
              : r.hasOwnProperty(i) && Yv(t, n, r[i], o);
          }
        return t;
      }
      function Yv(e, n, t, r) {
        e.hasOwnProperty(t) ? e[t].push(n, r) : (e[t] = [n, r]);
      }
      function bn(e, n, t, r, i, o, s, a) {
        const l = vn(n, t);
        let u,
          c = n.inputs;
        !a && null != c && (u = c[r])
          ? (Jf(e, t, u, r, i),
            Os(n) &&
              (function xI(e, n) {
                const t = rn(n, e);
                16 & t[se] || (t[se] |= 32);
              })(t, n.index))
          : 3 & n.type &&
            ((r = (function PI(e) {
              return "class" === e
                ? "className"
                : "for" === e
                  ? "htmlFor"
                  : "formaction" === e
                    ? "formAction"
                    : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                        ? "readOnly"
                        : "tabindex" === e
                          ? "tabIndex"
                          : e;
            })(r)),
            (i = null != s ? s(i, n.value || "", r) : i),
            o.setProperty(l, r, i));
      }
      function Gf(e, n, t, r) {
        if (Um()) {
          const i = null === r ? null : { "": -1 },
            o = (function HI(e, n) {
              const t = e.directiveRegistry;
              let r = null,
                i = null;
              if (t)
                for (let o = 0; o < t.length; o++) {
                  const s = t[o];
                  if (Nv(n, s.selectors, !1))
                    if ((r || (r = []), Wn(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (i = i || new Map()),
                          s.findHostDirectiveDefs(s, a, i),
                          r.unshift(...a, s),
                          zf(e, n, a.length);
                      } else r.unshift(s), zf(e, n, 0);
                    else
                      (i = i || new Map()),
                        s.findHostDirectiveDefs?.(s, r, i),
                        r.push(s);
                }
              return null === r ? null : [r, i];
            })(e, t);
          let s, a;
          null === o ? (s = a = null) : ([s, a] = o),
            null !== s && Jv(e, n, t, s, i, a),
            i &&
              (function jI(e, n, t) {
                if (n) {
                  const r = (e.localNames = []);
                  for (let i = 0; i < n.length; i += 2) {
                    const o = t[n[i + 1]];
                    if (null == o) throw new A(-301, !1);
                    r.push(n[i], o);
                  }
                }
              })(t, r, i);
        }
        t.mergedAttrs = Ps(t.mergedAttrs, t.attrs);
      }
      function Jv(e, n, t, r, i, o) {
        for (let c = 0; c < r.length; c++) Ud(Hl(t, n), e, r[c].type);
        !(function UI(e, n, t) {
          (e.flags |= 1),
            (e.directiveStart = n),
            (e.directiveEnd = n + t),
            (e.providerIndexes = n);
        })(t, e.data.length, r.length);
        for (let c = 0; c < r.length; c++) {
          const u = r[c];
          u.providersResolver && u.providersResolver(u);
        }
        let s = !1,
          a = !1,
          l = Js(e, n, r.length, null);
        for (let c = 0; c < r.length; c++) {
          const u = r[c];
          (t.mergedAttrs = Ps(t.mergedAttrs, u.hostAttrs)),
            GI(e, t, n, l, u),
            $I(l, u, i),
            null !== u.contentQueries && (t.flags |= 4),
            (null !== u.hostBindings ||
              null !== u.hostAttrs ||
              0 !== u.hostVars) &&
              (t.flags |= 64);
          const d = u.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ?? (e.preOrderHooks = [])).push(t.index),
            (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ?? (e.preOrderCheckHooks = [])).push(
                t.index,
              ),
              (a = !0)),
            l++;
        }
        !(function RI(e, n, t) {
          const i = n.directiveEnd,
            o = e.data,
            s = n.attrs,
            a = [];
          let l = null,
            c = null;
          for (let u = n.directiveStart; u < i; u++) {
            const d = o[u],
              f = t ? t.get(d) : null,
              p = f ? f.outputs : null;
            (l = qv(d.inputs, u, l, f ? f.inputs : null)),
              (c = qv(d.outputs, u, c, p));
            const m = null === l || null === s || Mv(n) ? null : qI(l, u, s);
            a.push(m);
          }
          null !== l &&
            (l.hasOwnProperty("class") && (n.flags |= 8),
            l.hasOwnProperty("style") && (n.flags |= 16)),
            (n.initialInputs = a),
            (n.inputs = l),
            (n.outputs = c);
        })(e, t, o);
      }
      function Zv(e, n, t) {
        const r = t.directiveStart,
          i = t.directiveEnd,
          o = t.index,
          s = (function OT() {
            return ne.lFrame.currentDirectiveIndex;
          })();
        try {
          gi(o);
          for (let a = r; a < i; a++) {
            const l = e.data[a],
              c = n[a];
            Rd(a),
              (null !== l.hostBindings ||
                0 !== l.hostVars ||
                null !== l.hostAttrs) &&
                BI(l, c);
          }
        } finally {
          gi(-1), Rd(s);
        }
      }
      function BI(e, n) {
        null !== e.hostBindings && e.hostBindings(1, n);
      }
      function zf(e, n, t) {
        (n.componentOffset = t),
          (e.components ?? (e.components = [])).push(n.index);
      }
      function $I(e, n, t) {
        if (t) {
          if (n.exportAs)
            for (let r = 0; r < n.exportAs.length; r++) t[n.exportAs[r]] = e;
          Wn(n) && (t[""] = e);
        }
      }
      function GI(e, n, t, r, i) {
        e.data[r] = i;
        const o = i.factory || (i.factory = pi(i.type)),
          s = new Rs(o, Wn(i), g);
        (e.blueprint[r] = s),
          (t[r] = s),
          (function kI(e, n, t, r, i) {
            const o = i.hostBindings;
            if (o) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~n.index;
              (function LI(e) {
                let n = e.length;
                for (; n > 0; ) {
                  const t = e[--n];
                  if ("number" == typeof t && t < 0) return t;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(t, r, o);
            }
          })(e, n, r, Js(e, t, i.hostVars, re), i);
      }
      function Wf(e, n, t, r, i, o, s) {
        if (null == o) e.removeAttribute(n, i, t);
        else {
          const a = null == s ? te(o) : s(o, r || "", i);
          e.setAttribute(n, i, a, t);
        }
      }
      function WI(e, n, t, r, i, o) {
        const s = o[n];
        if (null !== s) {
          const a = r.setInput;
          for (let l = 0; l < s.length; ) {
            const c = s[l++],
              u = s[l++],
              d = s[l++];
            null !== a ? r.setInput(t, d, c, u) : (t[u] = d);
          }
        }
      }
      function qI(e, n, t) {
        let r = null,
          i = 0;
        for (; i < t.length; ) {
          const o = t[i];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              if (e.hasOwnProperty(o)) {
                null === r && (r = []);
                const s = e[o];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === n) {
                    r.push(o, s[a + 1], t[i + 1]);
                    break;
                  }
              }
              i += 2;
            } else i += 2;
          else i += 4;
        }
        return r;
      }
      function Kv(e, n, t, r) {
        return [e, !0, !1, n, null, 0, r, t, null, null];
      }
      function ZI(e, n) {
        const t = rn(n, e);
        if (Pl(t)) {
          const r = t[B];
          48 & t[se] ? rc(r, t, r.template, t[ot]) : t[hi] > 0 && qf(t);
        }
      }
      function qf(e) {
        for (let r = sf(e); null !== r; r = af(r))
          for (let i = Yt; i < r.length; i++) {
            const o = r[i];
            if (Pl(o))
              if (512 & o[se]) {
                const s = o[B];
                rc(s, o, s.template, o[ot]);
              } else o[hi] > 0 && qf(o);
          }
        const t = e[B].components;
        if (null !== t)
          for (let r = 0; r < t.length; r++) {
            const i = rn(t[r], e);
            Pl(i) && i[hi] > 0 && qf(i);
          }
      }
      function KI(e, n) {
        const t = rn(n, e),
          r = t[B];
        (function QI(e, n) {
          for (let t = n.length; t < e.blueprint.length; t++)
            n.push(e.blueprint[t]);
        })(r, t),
          Bf(r, t, t[ot]);
      }
      function ic(e, n) {
        return e[Ms] ? (e[Om][Gn] = n) : (e[Ms] = n), (e[Om] = n), n;
      }
      function oc(e) {
        for (; e; ) {
          e[se] |= 32;
          const n = $s(e);
          if (uT(e) && !n) return e;
          e = n;
        }
        return null;
      }
      function sc(e, n, t, r = !0) {
        const i = n[Nl];
        i.begin && i.begin();
        try {
          rc(e, n, e.template, t);
        } catch (s) {
          throw (r && ty(n, s), s);
        } finally {
          i.end && i.end();
        }
      }
      function Yf(e, n, t) {
        xd(0), n(e, t);
      }
      function Qv(e) {
        return e[io] || (e[io] = []);
      }
      function Xv(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function ty(e, n) {
        const t = e[Ml],
          r = t ? t.get(wo, null) : null;
        r && r.handleError(n);
      }
      function Jf(e, n, t, r, i) {
        for (let o = 0; o < t.length; ) {
          const s = t[o++],
            a = t[o++],
            l = n[s],
            c = e.data[s];
          null !== c.setInput ? c.setInput(l, i, r, a) : (l[a] = i);
        }
      }
      function ac(e, n, t) {
        let r = t ? e.styles : null,
          i = t ? e.classes : null,
          o = 0;
        if (null !== n)
          for (let s = 0; s < n.length; s++) {
            const a = n[s];
            "number" == typeof a
              ? (o = a)
              : 1 == o
                ? (i = md(i, a))
                : 2 == o && (r = md(r, a + ": " + n[++s] + ";"));
          }
        t ? (e.styles = r) : (e.stylesWithoutHost = r),
          t ? (e.classes = i) : (e.classesWithoutHost = i);
      }
      function lc(e, n, t, r, i = !1) {
        for (; null !== t; ) {
          const o = n[t.index];
          if ((null !== o && r.push(At(o)), zn(o)))
            for (let a = Yt; a < o.length; a++) {
              const l = o[a],
                c = l[B].firstChild;
              null !== c && lc(l[B], l, c, r);
            }
          const s = t.type;
          if (8 & s) lc(e, n, t.child, r);
          else if (32 & s) {
            const a = rf(t, n);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & s) {
            const a = J_(n, t);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = $s(n[$t]);
              lc(l[B], l, a, r, !0);
            }
          }
          t = i ? t.projectionNext : t.next;
        }
        return r;
      }
      class Zs {
        get rootNodes() {
          const n = this._lView,
            t = n[B];
          return lc(t, n, t.firstChild, []);
        }
        constructor(n, t) {
          (this._lView = n),
            (this._cdRefInjectingView = t),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[ot];
        }
        set context(n) {
          this._lView[ot] = n;
        }
        get destroyed() {
          return 128 == (128 & this._lView[se]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const n = this._lView[Qe];
            if (zn(n)) {
              const t = n[Ol],
                r = t ? t.indexOf(this) : -1;
              r > -1 && (uf(n, r), $l(t, r));
            }
            this._attachedToViewContainer = !1;
          }
          H_(this._lView[B], this._lView);
        }
        onDestroy(n) {
          Wv(this._lView[B], this._lView, null, n);
        }
        markForCheck() {
          oc(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[se] &= -65;
        }
        reattach() {
          this._lView[se] |= 64;
        }
        detectChanges() {
          sc(this._lView[B], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new A(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function BM(e, n) {
              Us(e, n, n[le], 2, null, null);
            })(this._lView[B], this._lView);
        }
        attachToAppRef(n) {
          if (this._attachedToViewContainer) throw new A(902, !1);
          this._appRef = n;
        }
      }
      class XI extends Zs {
        constructor(n) {
          super(n), (this._view = n);
        }
        detectChanges() {
          const n = this._view;
          sc(n[B], n, n[ot], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class ny extends qs {
        constructor(n) {
          super(), (this.ngModule = n);
        }
        resolveComponentFactory(n) {
          const t = Se(n);
          return new Ks(t, this.ngModule);
        }
      }
      function ry(e) {
        const n = [];
        for (let t in e)
          e.hasOwnProperty(t) && n.push({ propName: e[t], templateName: t });
        return n;
      }
      class tO {
        constructor(n, t) {
          (this.injector = n), (this.parentInjector = t);
        }
        get(n, t, r) {
          r = El(r);
          const i = this.injector.get(n, Af, r);
          return i !== Af || t === Af ? i : this.parentInjector.get(n, t, r);
        }
      }
      class Ks extends Cv {
        get inputs() {
          return ry(this.componentDef.inputs);
        }
        get outputs() {
          return ry(this.componentDef.outputs);
        }
        constructor(n, t) {
          super(),
            (this.componentDef = n),
            (this.ngModule = t),
            (this.componentType = n.type),
            (this.selector = (function sI(e) {
              return e.map(oI).join(",");
            })(n.selectors)),
            (this.ngContentSelectors = n.ngContentSelectors
              ? n.ngContentSelectors
              : []),
            (this.isBoundToModule = !!t);
        }
        create(n, t, r, i) {
          let o = (i = i || this.ngModule) instanceof xn ? i : i?.injector;
          o &&
            null !== this.componentDef.getStandaloneInjector &&
            (o = this.componentDef.getStandaloneInjector(o) || o);
          const s = o ? new tO(n, o) : n,
            a = s.get(Of, null);
          if (null === a) throw new A(407, !1);
          const l = s.get(BN, null),
            c = a.createRenderer(null, this.componentDef),
            u = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function OI(e, n, t) {
                  return e.selectRootElement(n, t === sr.ShadowDom);
                })(c, r, this.componentDef.encapsulation)
              : cf(
                  c,
                  u,
                  (function eO(e) {
                    const n = e.toLowerCase();
                    return "svg" === n ? "svg" : "math" === n ? "math" : null;
                  })(u),
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = Uf(0, null, null, 1, 0, null, null, null, null, null),
            p = nc(null, h, null, f, null, null, a, c, l, s, null);
          let m, v;
          Fd(p);
          try {
            const b = this.componentDef;
            let w,
              D = null;
            b.findHostDirectiveDefs
              ? ((w = []),
                (D = new Map()),
                b.findHostDirectiveDefs(b, w, D),
                w.push(b))
              : (w = [b]);
            const O = (function rO(e, n) {
                const t = e[B],
                  r = Ge;
                return (e[r] = n), To(t, r, 2, "#host", null);
              })(p, d),
              j = (function iO(e, n, t, r, i, o, s, a) {
                const l = i[B];
                !(function oO(e, n, t, r) {
                  for (const i of e)
                    n.mergedAttrs = Ps(n.mergedAttrs, i.hostAttrs);
                  null !== n.mergedAttrs &&
                    (ac(n, n.mergedAttrs, !0), null !== t && Q_(r, t, n));
                })(r, e, n, s);
                const c = o.createRenderer(n, t),
                  u = nc(
                    i,
                    zv(t),
                    null,
                    t.onPush ? 32 : 16,
                    i[e.index],
                    e,
                    o,
                    c,
                    a || null,
                    null,
                    null,
                  );
                return (
                  l.firstCreatePass && zf(l, e, r.length - 1),
                  ic(i, u),
                  (i[e.index] = u)
                );
              })(O, d, b, w, p, a, c);
            (v = Hm(h, Ge)),
              d &&
                (function aO(e, n, t, r) {
                  if (r) Bd(e, t, ["ng-version", HN.full]);
                  else {
                    const { attrs: i, classes: o } = (function aI(e) {
                      const n = [],
                        t = [];
                      let r = 1,
                        i = 2;
                      for (; r < e.length; ) {
                        let o = e[r];
                        if ("string" == typeof o)
                          2 === i
                            ? "" !== o && n.push(o, e[++r])
                            : 8 === i && t.push(o);
                        else {
                          if (!qn(i)) break;
                          i = o;
                        }
                        r++;
                      }
                      return { attrs: n, classes: t };
                    })(n.selectors[0]);
                    i && Bd(e, t, i),
                      o && o.length > 0 && K_(e, t, o.join(" "));
                  }
                })(c, b, d, r),
              void 0 !== t &&
                (function lO(e, n, t) {
                  const r = (e.projection = []);
                  for (let i = 0; i < n.length; i++) {
                    const o = t[i];
                    r.push(null != o ? Array.from(o) : null);
                  }
                })(v, this.ngContentSelectors, t),
              (m = (function sO(e, n, t, r, i, o) {
                const s = Rt(),
                  a = i[B],
                  l = vn(s, i);
                Jv(a, i, s, t, null, r);
                for (let u = 0; u < t.length; u++)
                  Ut(mi(i, a, s.directiveStart + u, s), i);
                Zv(a, i, s), l && Ut(l, i);
                const c = mi(i, a, s.directiveStart + s.componentOffset, s);
                if (((e[ot] = i[ot] = c), null !== o))
                  for (const u of o) u(c, n);
                return Hf(a, s, e), c;
              })(j, b, w, D, p, [cO])),
              Bf(h, p, null);
          } finally {
            kd();
          }
          return new nO(this.componentType, m, Co(v, p), p, v);
        }
      }
      class nO extends PN {
        constructor(n, t, r, i, o) {
          super(),
            (this.location = r),
            (this._rootLView = i),
            (this._tNode = o),
            (this.instance = t),
            (this.hostView = this.changeDetectorRef = new XI(i)),
            (this.componentType = n);
        }
        setInput(n, t) {
          const r = this._tNode.inputs;
          let i;
          if (null !== r && (i = r[n])) {
            const o = this._rootLView;
            Jf(o[B], o, i, n, t), oc(rn(this._tNode.index, o));
          }
        }
        get injector() {
          return new fo(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(n) {
          this.hostView.onDestroy(n);
        }
      }
      function cO() {
        const e = Rt();
        xl(S()[B], e);
      }
      function Qs(e) {
        return (n) => {
          (n.findHostDirectiveDefs = oy),
            (n.hostDirectives = (Array.isArray(e) ? e : e()).map((t) =>
              "function" == typeof t
                ? { directive: J(t), inputs: Cr, outputs: Cr }
                : {
                    directive: J(t.directive),
                    inputs: sy(t.inputs),
                    outputs: sy(t.outputs),
                  },
            ));
        };
      }
      function oy(e, n, t) {
        if (null !== e.hostDirectives)
          for (const r of e.hostDirectives) {
            const i = Ht(r.directive);
            _O(i.declaredInputs, r.inputs), oy(i, n, t), t.set(i, r), n.push(i);
          }
      }
      function sy(e) {
        if (void 0 === e || 0 === e.length) return Cr;
        const n = {};
        for (let t = 0; t < e.length; t += 2) n[e[t]] = e[t + 1];
        return n;
      }
      function _O(e, n) {
        for (const t in n) n.hasOwnProperty(t) && (e[n[t]] = e[t]);
      }
      function cc(e) {
        return (
          !!(function Kf(e) {
            return (
              null !== e && ("function" == typeof e || "object" == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function dr(e, n, t) {
        return (e[n] = t);
      }
      function Gt(e, n, t) {
        return !Object.is(e[n], t) && ((e[n] = t), !0);
      }
      function bi(e, n, t, r) {
        const i = Gt(e, n, t);
        return Gt(e, n + 1, r) || i;
      }
      function de(e, n, t, r) {
        const i = S();
        return (
          Gt(i, co(), n) &&
            (pe(),
            (function ur(e, n, t, r, i, o) {
              const s = vn(e, n);
              Wf(n[le], s, o, e.value, t, r, i);
            })(Je(), i, e, n, t, r)),
          de
        );
      }
      function No(e, n, t, r) {
        return Gt(e, co(), t) ? n + te(t) + r : re;
      }
      function R(e, n, t, r, i, o, s, a) {
        const l = S(),
          c = pe(),
          u = e + Ge,
          d = c.firstCreatePass
            ? (function CO(e, n, t, r, i, o, s, a, l) {
                const c = n.consts,
                  u = To(n, e, 4, s || null, zr(c, a));
                Gf(n, t, u, zr(c, l)), xl(n, u);
                const d = (u.tView = Uf(
                  2,
                  u,
                  r,
                  i,
                  o,
                  n.directiveRegistry,
                  n.pipeRegistry,
                  null,
                  n.schemas,
                  c,
                ));
                return (
                  null !== n.queries &&
                    (n.queries.template(n, u),
                    (d.queries = n.queries.embeddedTView(u))),
                  u
                );
              })(u, c, l, n, t, r, i, o, s)
            : c.data[u];
        lr(d, !1);
        const f = l[le].createComment("");
        ql(c, l, f, d),
          Ut(f, l),
          ic(l, (l[u] = Kv(f, l, f, d))),
          Al(d) && jf(c, l, d),
          null != s && $f(l, d, a);
      }
      function Pt(e) {
        return lo(
          (function MT() {
            return ne.lFrame.contextLView;
          })(),
          Ge + e,
        );
      }
      function T(e, n, t) {
        const r = S();
        return Gt(r, co(), n) && bn(pe(), Je(), r, e, n, r[le], t, !1), T;
      }
      function Qf(e, n, t, r, i) {
        const s = i ? "class" : "style";
        Jf(e, t, n.inputs[s], s, r);
      }
      function M(e, n, t, r) {
        const i = S(),
          o = pe(),
          s = Ge + e,
          a = i[le],
          l = o.firstCreatePass
            ? (function EO(e, n, t, r, i, o) {
                const s = n.consts,
                  l = To(n, e, 2, r, zr(s, i));
                return (
                  Gf(n, t, l, zr(s, o)),
                  null !== l.attrs && ac(l, l.attrs, !1),
                  null !== l.mergedAttrs && ac(l, l.mergedAttrs, !0),
                  null !== n.queries && n.queries.elementStart(n, l),
                  l
                );
              })(s, o, i, n, t, r)
            : o.data[s],
          c = (i[s] = cf(
            a,
            n,
            (function VT() {
              return ne.lFrame.currentNamespace;
            })(),
          )),
          u = Al(l);
        return (
          lr(l, !0),
          Q_(a, c, l),
          32 != (32 & l.flags) && ql(o, i, c, l),
          0 ===
            (function CT() {
              return ne.lFrame.elementDepthCount;
            })() && Ut(c, i),
          (function wT() {
            ne.lFrame.elementDepthCount++;
          })(),
          u && (jf(o, i, l), Hf(o, l, i)),
          null !== r && $f(i, l),
          M
        );
      }
      function I() {
        let e = Rt();
        Od() ? Ad() : ((e = e.parent), lr(e, !1));
        const n = e;
        !(function ET() {
          ne.lFrame.elementDepthCount--;
        })();
        const t = pe();
        return (
          t.firstCreatePass && (xl(t, e), Md(e) && t.queries.elementEnd(e)),
          null != n.classesWithoutHost &&
            (function $T(e) {
              return 0 != (8 & e.flags);
            })(n) &&
            Qf(t, n, S(), n.classesWithoutHost, !0),
          null != n.stylesWithoutHost &&
            (function UT(e) {
              return 0 != (16 & e.flags);
            })(n) &&
            Qf(t, n, S(), n.stylesWithoutHost, !1),
          I
        );
      }
      function qe(e, n, t, r) {
        return M(e, n, t, r), I(), qe;
      }
      function dc(e, n, t) {
        const r = S(),
          i = pe(),
          o = e + Ge,
          s = i.firstCreatePass
            ? (function SO(e, n, t, r, i) {
                const o = n.consts,
                  s = zr(o, r),
                  a = To(n, e, 8, "ng-container", s);
                return (
                  null !== s && ac(a, s, !0),
                  Gf(n, t, a, zr(o, i)),
                  null !== n.queries && n.queries.elementStart(n, a),
                  a
                );
              })(o, i, r, n, t)
            : i.data[o];
        lr(s, !0);
        const a = (r[o] = r[le].createComment(""));
        return (
          ql(i, r, a, s),
          Ut(a, r),
          Al(s) && (jf(i, r, s), Hf(i, s, r)),
          null != t && $f(r, s),
          dc
        );
      }
      function fc() {
        let e = Rt();
        const n = pe();
        return (
          Od() ? Ad() : ((e = e.parent), lr(e, !1)),
          n.firstCreatePass && (xl(n, e), Md(e) && n.queries.elementEnd(e)),
          fc
        );
      }
      function Fe() {
        return S();
      }
      function ea(e) {
        return !!e && "function" == typeof e.then;
      }
      const Xf = function vy(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function G(e, n, t, r) {
        const i = S(),
          o = pe(),
          s = Rt();
        return (
          (function by(e, n, t, r, i, o, s) {
            const a = Al(r),
              c = e.firstCreatePass && Xv(e),
              u = n[ot],
              d = Qv(n);
            let f = !0;
            if (3 & r.type || s) {
              const m = vn(r, n),
                v = s ? s(m) : m,
                b = d.length,
                w = s ? (O) => s(At(O[r.index])) : r.index;
              let D = null;
              if (
                (!s &&
                  a &&
                  (D = (function TO(e, n, t, r) {
                    const i = e.cleanup;
                    if (null != i)
                      for (let o = 0; o < i.length - 1; o += 2) {
                        const s = i[o];
                        if (s === t && i[o + 1] === r) {
                          const a = n[io],
                            l = i[o + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof s && (o += 2);
                      }
                    return null;
                  })(e, n, i, r.index)),
                null !== D)
              )
                ((D.__ngLastListenerFn__ || D).__ngNextListenerFn__ = o),
                  (D.__ngLastListenerFn__ = o),
                  (f = !1);
              else {
                o = Cy(r, n, u, o, !1);
                const O = t.listen(v, i, o);
                d.push(o, O), c && c.push(i, w, b, b + 1);
              }
            } else o = Cy(r, n, u, o, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[i])) {
              const m = p.length;
              if (m)
                for (let v = 0; v < m; v += 2) {
                  const j = n[p[v]][p[v + 1]].subscribe(o),
                    W = d.length;
                  d.push(o, j), c && c.push(i, r.index, W, -(W + 1));
                }
            }
          })(o, i, i[le], s, e, n, r),
          G
        );
      }
      function Dy(e, n, t, r) {
        try {
          return Rn(6, n, t), !1 !== t(r);
        } catch (i) {
          return ty(e, i), !1;
        } finally {
          Rn(7, n, t);
        }
      }
      function Cy(e, n, t, r, i) {
        return function o(s) {
          if (s === Function) return r;
          oc(e.componentOffset > -1 ? rn(e.index, n) : n);
          let l = Dy(n, t, r, s),
            c = o.__ngNextListenerFn__;
          for (; c; ) (l = Dy(n, t, c, s) && l), (c = c.__ngNextListenerFn__);
          return i && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
        };
      }
      function F(e = 1) {
        return (function RT(e) {
          return (ne.lFrame.contextLView = (function PT(e, n) {
            for (; e > 0; ) (n = n[oo]), e--;
            return n;
          })(e, ne.lFrame.contextLView))[ot];
        })(e);
      }
      function MO(e, n) {
        let t = null;
        const r = (function tI(e) {
          const n = e.attrs;
          if (null != n) {
            const t = n.indexOf(5);
            if (!(1 & t)) return n[t + 1];
          }
          return null;
        })(e);
        for (let i = 0; i < n.length; i++) {
          const o = n[i];
          if ("*" !== o) {
            if (null === r ? Nv(e, o, !0) : iI(r, o)) return i;
          } else t = i;
        }
        return t;
      }
      function ta(e) {
        const n = S()[$t][jt];
        if (!n.projection) {
          const r = (n.projection = ks(e ? e.length : 1, null)),
            i = r.slice();
          let o = n.child;
          for (; null !== o; ) {
            const s = e ? MO(o, e) : 0;
            null !== s &&
              (i[s] ? (i[s].projectionNext = o) : (r[s] = o), (i[s] = o)),
              (o = o.next);
          }
        }
      }
      function na(e, n = 0, t) {
        const r = S(),
          i = pe(),
          o = To(i, Ge + e, 16, null, t || null);
        null === o.projection && (o.projection = n),
          Ad(),
          32 != (32 & o.flags) &&
            (function qM(e, n, t) {
              Z_(n[le], 0, n, t, j_(e, t, n), z_(t.parent || n[jt], t, n));
            })(i, r, o);
      }
      function eh(e, n, t) {
        return hc(e, "", n, "", t), eh;
      }
      function hc(e, n, t, r, i) {
        const o = S(),
          s = No(o, n, t, r);
        return s !== re && bn(pe(), Je(), o, e, s, o[le], i, !1), hc;
      }
      function pc(e, n) {
        return (e << 17) | (n << 2);
      }
      function Yr(e) {
        return (e >> 17) & 32767;
      }
      function th(e) {
        return 2 | e;
      }
      function Di(e) {
        return (131068 & e) >> 2;
      }
      function nh(e, n) {
        return (-131069 & e) | (n << 2);
      }
      function rh(e) {
        return 1 | e;
      }
      function Ay(e, n, t, r, i) {
        const o = e[t + 1],
          s = null === n;
        let a = r ? Yr(o) : Di(o),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const u = e[a + 1];
          PO(e[a], n) && ((l = !0), (e[a + 1] = r ? rh(u) : th(u))),
            (a = r ? Yr(u) : Di(u));
        }
        l && (e[t + 1] = r ? th(o) : rh(o));
      }
      function PO(e, n) {
        return (
          null === e ||
          null == n ||
          (Array.isArray(e) ? e[1] : e) === n ||
          (!(!Array.isArray(e) || "string" != typeof n) && _o(e, n) >= 0)
        );
      }
      const bt = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function Ry(e) {
        return e.substring(bt.key, bt.keyEnd);
      }
      function Py(e, n) {
        const t = bt.textEnd;
        return t === n
          ? -1
          : ((n = bt.keyEnd =
              (function LO(e, n, t) {
                for (; n < t && e.charCodeAt(n) > 32; ) n++;
                return n;
              })(e, (bt.key = n), t)),
            ko(e, n, t));
      }
      function ko(e, n, t) {
        for (; n < t && e.charCodeAt(n) <= 32; ) n++;
        return n;
      }
      function Lo(e, n, t) {
        return Yn(e, n, t, !1), Lo;
      }
      function Q(e, n) {
        return Yn(e, n, null, !0), Q;
      }
      function Jr(e) {
        Jn(WO, hr, e, !0);
      }
      function hr(e, n) {
        for (
          let t = (function FO(e) {
            return (
              (function Fy(e) {
                (bt.key = 0),
                  (bt.keyEnd = 0),
                  (bt.value = 0),
                  (bt.valueEnd = 0),
                  (bt.textEnd = e.length);
              })(e),
              Py(e, ko(e, 0, bt.textEnd))
            );
          })(n);
          t >= 0;
          t = Py(n, t)
        )
          yn(e, Ry(n), !0);
      }
      function Yn(e, n, t, r) {
        const i = S(),
          o = pe(),
          s = Tr(2);
        o.firstUpdatePass && By(o, e, s, r),
          n !== re &&
            Gt(i, s, n) &&
            jy(
              o,
              o.data[Zt()],
              i,
              i[le],
              e,
              (i[s + 1] = (function YO(e, n) {
                return (
                  null == e ||
                    "" === e ||
                    ("string" == typeof n
                      ? (e += n)
                      : "object" == typeof e && (e = ke(qr(e)))),
                  e
                );
              })(n, t)),
              r,
              s,
            );
      }
      function Jn(e, n, t, r) {
        const i = pe(),
          o = Tr(2);
        i.firstUpdatePass && By(i, null, o, r);
        const s = S();
        if (t !== re && Gt(s, o, t)) {
          const a = i.data[Zt()];
          if (Uy(a, r) && !Vy(i, o)) {
            let l = r ? a.classesWithoutHost : a.stylesWithoutHost;
            null !== l && (t = md(l, t || "")), Qf(i, a, s, t, r);
          } else
            !(function qO(e, n, t, r, i, o, s, a) {
              i === re && (i = De);
              let l = 0,
                c = 0,
                u = 0 < i.length ? i[0] : null,
                d = 0 < o.length ? o[0] : null;
              for (; null !== u || null !== d; ) {
                const f = l < i.length ? i[l + 1] : void 0,
                  h = c < o.length ? o[c + 1] : void 0;
                let m,
                  p = null;
                u === d
                  ? ((l += 2), (c += 2), f !== h && ((p = d), (m = h)))
                  : null === d || (null !== u && u < d)
                    ? ((l += 2), (p = u))
                    : ((c += 2), (p = d), (m = h)),
                  null !== p && jy(e, n, t, r, p, m, s, a),
                  (u = l < i.length ? i[l] : null),
                  (d = c < o.length ? o[c] : null);
              }
            })(
              i,
              a,
              s,
              s[le],
              s[o + 1],
              (s[o + 1] = (function zO(e, n, t) {
                if (null == t || "" === t) return De;
                const r = [],
                  i = qr(t);
                if (Array.isArray(i))
                  for (let o = 0; o < i.length; o++) e(r, i[o], !0);
                else if ("object" == typeof i)
                  for (const o in i) i.hasOwnProperty(o) && e(r, o, i[o]);
                else "string" == typeof i && n(r, i);
                return r;
              })(e, n, t)),
              r,
              o,
            );
        }
      }
      function Vy(e, n) {
        return n >= e.expandoStartIndex;
      }
      function By(e, n, t, r) {
        const i = e.data;
        if (null === i[t + 1]) {
          const o = i[Zt()],
            s = Vy(e, t);
          Uy(o, r) && null === n && !s && (n = !1),
            (n = (function jO(e, n, t, r) {
              const i = (function Pd(e) {
                const n = ne.lFrame.currentDirectiveIndex;
                return -1 === n ? null : e[n];
              })(e);
              let o = r ? n.residualClasses : n.residualStyles;
              if (null === i)
                0 === (r ? n.classBindings : n.styleBindings) &&
                  ((t = ra((t = ih(null, e, n, t, r)), n.attrs, r)),
                  (o = null));
              else {
                const s = n.directiveStylingLast;
                if (-1 === s || e[s] !== i)
                  if (((t = ih(i, e, n, t, r)), null === o)) {
                    let l = (function $O(e, n, t) {
                      const r = t ? n.classBindings : n.styleBindings;
                      if (0 !== Di(r)) return e[Yr(r)];
                    })(e, n, r);
                    void 0 !== l &&
                      Array.isArray(l) &&
                      ((l = ih(null, e, n, l[1], r)),
                      (l = ra(l, n.attrs, r)),
                      (function UO(e, n, t, r) {
                        e[Yr(t ? n.classBindings : n.styleBindings)] = r;
                      })(e, n, r, l));
                  } else
                    o = (function GO(e, n, t) {
                      let r;
                      const i = n.directiveEnd;
                      for (let o = 1 + n.directiveStylingLast; o < i; o++)
                        r = ra(r, e[o].hostAttrs, t);
                      return ra(r, n.attrs, t);
                    })(e, n, r);
              }
              return (
                void 0 !== o &&
                  (r ? (n.residualClasses = o) : (n.residualStyles = o)),
                t
              );
            })(i, o, n, r)),
            (function AO(e, n, t, r, i, o) {
              let s = o ? n.classBindings : n.styleBindings,
                a = Yr(s),
                l = Di(s);
              e[r] = t;
              let u,
                c = !1;
              if (
                (Array.isArray(t)
                  ? ((u = t[1]), (null === u || _o(t, u) > 0) && (c = !0))
                  : (u = t),
                i)
              )
                if (0 !== l) {
                  const f = Yr(e[a + 1]);
                  (e[r + 1] = pc(f, a)),
                    0 !== f && (e[f + 1] = nh(e[f + 1], r)),
                    (e[a + 1] = (function IO(e, n) {
                      return (131071 & e) | (n << 17);
                    })(e[a + 1], r));
                } else
                  (e[r + 1] = pc(a, 0)),
                    0 !== a && (e[a + 1] = nh(e[a + 1], r)),
                    (a = r);
              else
                (e[r + 1] = pc(l, 0)),
                  0 === a ? (a = r) : (e[l + 1] = nh(e[l + 1], r)),
                  (l = r);
              c && (e[r + 1] = th(e[r + 1])),
                Ay(e, u, r, !0),
                Ay(e, u, r, !1),
                (function RO(e, n, t, r, i) {
                  const o = i ? e.residualClasses : e.residualStyles;
                  null != o &&
                    "string" == typeof n &&
                    _o(o, n) >= 0 &&
                    (t[r + 1] = rh(t[r + 1]));
                })(n, u, e, r, o),
                (s = pc(a, l)),
                o ? (n.classBindings = s) : (n.styleBindings = s);
            })(i, o, n, t, s, r);
        }
      }
      function ih(e, n, t, r, i) {
        let o = null;
        const s = t.directiveEnd;
        let a = t.directiveStylingLast;
        for (
          -1 === a ? (a = t.directiveStart) : a++;
          a < s && ((o = n[a]), (r = ra(r, o.hostAttrs, i)), o !== e);

        )
          a++;
        return null !== e && (t.directiveStylingLast = a), r;
      }
      function ra(e, n, t) {
        const r = t ? 1 : 2;
        let i = -1;
        if (null !== n)
          for (let o = 0; o < n.length; o++) {
            const s = n[o];
            "number" == typeof s
              ? (i = s)
              : i === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                yn(e, s, !!t || n[++o]));
          }
        return void 0 === e ? null : e;
      }
      function WO(e, n, t) {
        const r = String(n);
        "" !== r && !r.includes(" ") && yn(e, r, t);
      }
      function jy(e, n, t, r, i, o, s, a) {
        if (!(3 & n.type)) return;
        const l = e.data,
          c = l[a + 1],
          u = (function OO(e) {
            return 1 == (1 & e);
          })(c)
            ? $y(l, n, t, i, Di(c), s)
            : void 0;
        gc(u) ||
          (gc(o) ||
            ((function NO(e) {
              return 2 == (2 & e);
            })(c) &&
              (o = $y(l, null, t, i, a, s))),
          (function JM(e, n, t, r, i) {
            if (n) i ? e.addClass(t, r) : e.removeClass(t, r);
            else {
              let o = -1 === r.indexOf("-") ? void 0 : on.DashCase;
              null == i
                ? e.removeStyle(t, r, o)
                : ("string" == typeof i &&
                    i.endsWith("!important") &&
                    ((i = i.slice(0, -10)), (o |= on.Important)),
                  e.setStyle(t, r, i, o));
            }
          })(r, s, Rl(Zt(), t), i, o));
      }
      function $y(e, n, t, r, i, o) {
        const s = null === n;
        let a;
        for (; i > 0; ) {
          const l = e[i],
            c = Array.isArray(l),
            u = c ? l[1] : l,
            d = null === u;
          let f = t[i + 1];
          f === re && (f = d ? De : void 0);
          let h = d ? qd(f, r) : u === r ? f : void 0;
          if ((c && !gc(h) && (h = qd(l, r)), gc(h) && ((a = h), s))) return a;
          const p = e[i + 1];
          i = s ? Yr(p) : Di(p);
        }
        if (null !== n) {
          let l = o ? n.residualClasses : n.residualStyles;
          null != l && (a = qd(l, r));
        }
        return a;
      }
      function gc(e) {
        return void 0 !== e;
      }
      function Uy(e, n) {
        return 0 != (e.flags & (n ? 8 : 16));
      }
      function fe(e, n = "") {
        const t = S(),
          r = pe(),
          i = e + Ge,
          o = r.firstCreatePass ? To(r, i, 1, n, null) : r.data[i],
          s = (t[i] = lf(t[le], n));
        ql(r, t, s, o), lr(o, !1);
      }
      function zt(e) {
        return Ci("", e, ""), zt;
      }
      function Ci(e, n, t) {
        const r = S(),
          i = No(r, e, n, t);
        return (
          i !== re &&
            (function Ir(e, n, t) {
              const r = Rl(n, e);
              V_(e[le], r, t);
            })(r, Zt(), i),
          Ci
        );
      }
      function Qy(e, n, t, r, i) {
        Jn(
          yn,
          hr,
          (function Io(e, n, t, r, i, o) {
            const a = bi(e, Sr(), t, i);
            return Tr(2), a ? n + te(t) + r + te(i) + o : re;
          })(S(), e, n, t, r, i),
          !0,
        );
      }
      function Dn(e, n, t) {
        const r = S();
        return Gt(r, co(), n) && bn(pe(), Je(), r, e, n, r[le], t, !0), Dn;
      }
      const wi = void 0;
      var hA = [
        "en",
        [["a", "p"], ["AM", "PM"], wi],
        [["AM", "PM"], wi, wi],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        wi,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        wi,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", wi, "{1} 'at' {0}", wi],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function fA(e) {
          const t = Math.floor(Math.abs(e)),
            r = e.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === t && 0 === r ? 1 : 5;
        },
      ];
      let Vo = {};
      function Kt(e) {
        const n = (function pA(e) {
          return e.toLowerCase().replace(/_/g, "-");
        })(e);
        let t = d0(n);
        if (t) return t;
        const r = n.split("-")[0];
        if (((t = d0(r)), t)) return t;
        if ("en" === r) return hA;
        throw new A(701, !1);
      }
      function d0(e) {
        return (
          e in Vo ||
            (Vo[e] =
              Ue.ng &&
              Ue.ng.common &&
              Ue.ng.common.locales &&
              Ue.ng.common.locales[e]),
          Vo[e]
        );
      }
      var V = (() => (
        ((V = V || {})[(V.LocaleId = 0)] = "LocaleId"),
        (V[(V.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
        (V[(V.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
        (V[(V.DaysFormat = 3)] = "DaysFormat"),
        (V[(V.DaysStandalone = 4)] = "DaysStandalone"),
        (V[(V.MonthsFormat = 5)] = "MonthsFormat"),
        (V[(V.MonthsStandalone = 6)] = "MonthsStandalone"),
        (V[(V.Eras = 7)] = "Eras"),
        (V[(V.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
        (V[(V.WeekendRange = 9)] = "WeekendRange"),
        (V[(V.DateFormat = 10)] = "DateFormat"),
        (V[(V.TimeFormat = 11)] = "TimeFormat"),
        (V[(V.DateTimeFormat = 12)] = "DateTimeFormat"),
        (V[(V.NumberSymbols = 13)] = "NumberSymbols"),
        (V[(V.NumberFormats = 14)] = "NumberFormats"),
        (V[(V.CurrencyCode = 15)] = "CurrencyCode"),
        (V[(V.CurrencySymbol = 16)] = "CurrencySymbol"),
        (V[(V.CurrencyName = 17)] = "CurrencyName"),
        (V[(V.Currencies = 18)] = "Currencies"),
        (V[(V.Directionality = 19)] = "Directionality"),
        (V[(V.PluralCase = 20)] = "PluralCase"),
        (V[(V.ExtraData = 21)] = "ExtraData"),
        V
      ))();
      const gA = ["zero", "one", "two", "few", "many"],
        Bo = "en-US",
        mc = { marker: "element" },
        _c = { marker: "ICU" };
      var tt = (() => (
        ((tt = tt || {})[(tt.SHIFT = 2)] = "SHIFT"),
        (tt[(tt.APPEND_EAGERLY = 1)] = "APPEND_EAGERLY"),
        (tt[(tt.COMMENT = 2)] = "COMMENT"),
        tt
      ))();
      let f0 = Bo;
      function h0(e) {
        (function On(e, n) {
          null == e && Ee(n, e, null, "!=");
        })(e, "Expected localeId to be defined"),
          "string" == typeof e && (f0 = e.toLowerCase().replace(/_/g, "-"));
      }
      function p0(e, n, t) {
        const r = n.insertBeforeIndex,
          i = Array.isArray(r) ? r[0] : r;
        return null === i ? W_(e, 0, t) : At(t[i]);
      }
      function g0(e, n, t, r, i) {
        const o = n.insertBeforeIndex;
        if (Array.isArray(o)) {
          let s = r,
            a = null;
          if (
            (3 & n.type || ((a = s), (s = i)),
            null !== s && -1 === n.componentOffset)
          )
            for (let l = 1; l < o.length; l++) vi(e, s, t[o[l]], a, !1);
        }
      }
      function m0(e, n) {
        if ((e.push(n), e.length > 1))
          for (let t = e.length - 2; t >= 0; t--) {
            const r = e[t];
            _0(r) || (yA(r, n) && null === bA(r) && DA(r, n.index));
          }
      }
      function _0(e) {
        return !(64 & e.type);
      }
      function yA(e, n) {
        return _0(n) || e.index > n.index;
      }
      function bA(e) {
        const n = e.insertBeforeIndex;
        return Array.isArray(n) ? n[0] : n;
      }
      function DA(e, n) {
        const t = e.insertBeforeIndex;
        Array.isArray(t) ? (t[0] = n) : (Y_(p0, g0), (e.insertBeforeIndex = n));
      }
      function ia(e, n) {
        const t = e.data[n];
        return null === t || "string" == typeof t
          ? null
          : t.hasOwnProperty("currentCaseLViewIndex")
            ? t
            : t.value;
      }
      function EA(e, n, t) {
        const r = Vf(e, t, 64, null, null);
        return m0(n, r), r;
      }
      function vc(e, n) {
        const t = n[e.currentCaseLViewIndex];
        return null === t ? t : t < 0 ? ~t : t;
      }
      function v0(e) {
        return e >>> 17;
      }
      function y0(e) {
        return (131070 & e) >>> 1;
      }
      let oa = 0,
        sa = 0;
      function D0(e, n, t, r) {
        const i = t[le];
        let s,
          o = null;
        for (let a = 0; a < n.length; a++) {
          const l = n[a];
          if ("string" == typeof l) {
            const c = n[++a];
            null === t[c] && (t[c] = lf(i, l));
          } else if ("number" == typeof l)
            switch (1 & l) {
              case 0:
                const c = v0(l);
                let u, d;
                if (
                  (null === o && ((o = c), (s = Wl(i, r))),
                  c === o ? ((u = r), (d = s)) : ((u = null), (d = At(t[c]))),
                  null !== d)
                ) {
                  const m = y0(l);
                  vi(i, d, t[m], u, !1);
                  const b = ia(e, m);
                  if (null !== b && "object" == typeof b) {
                    const w = vc(b, t);
                    null !== w && D0(e, b.create[w], t, t[b.anchorIdx]);
                  }
                }
                break;
              case 1:
                const h = n[++a],
                  p = n[++a];
                Wf(i, Rl(l >>> 1, t), null, null, h, p, null);
            }
          else
            switch (l) {
              case _c:
                const c = n[++a],
                  u = n[++a];
                null === t[u] && Ut((t[u] = kM(i, c)), t);
                break;
              case mc:
                const d = n[++a],
                  f = n[++a];
                null === t[f] && Ut((t[f] = cf(i, d, null)), t);
            }
        }
      }
      function C0(e, n, t, r, i) {
        for (let o = 0; o < t.length; o++) {
          const s = t[o],
            a = t[++o];
          if (s & i) {
            let l = "";
            for (let c = o + 1; c <= o + a; c++) {
              const u = t[c];
              if ("string" == typeof u) l += u;
              else if ("number" == typeof u)
                if (u < 0) l += te(n[r - u]);
                else {
                  const d = u >>> 2;
                  switch (3 & u) {
                    case 1:
                      const f = t[++c],
                        h = t[++c],
                        p = e.data[d];
                      "string" == typeof p
                        ? Wf(n[le], n[d], null, p, f, l, h)
                        : bn(e, p, n, f, l, n[le], h, !1);
                      break;
                    case 0:
                      const m = n[d];
                      null !== m && V_(n[le], m, l);
                      break;
                    case 2:
                      IA(e, ia(e, d), n, l);
                      break;
                    case 3:
                      w0(e, ia(e, d), r, n);
                  }
                }
            }
          } else {
            const l = t[o + 1];
            if (l > 0 && 3 == (3 & l)) {
              const u = ia(e, l >>> 2);
              n[u.currentCaseLViewIndex] < 0 && w0(e, u, r, n);
            }
          }
          o += a;
        }
      }
      function w0(e, n, t, r) {
        let i = r[n.currentCaseLViewIndex];
        if (null !== i) {
          let o = oa;
          i < 0 && ((i = r[n.currentCaseLViewIndex] = ~i), (o = -1)),
            C0(e, r, n.update[i], t, o);
        }
      }
      function IA(e, n, t, r) {
        const i = (function OA(e, n) {
          let t = e.cases.indexOf(n);
          if (-1 === t)
            switch (e.type) {
              case 1: {
                const r = (function mA(e, n) {
                  const t = (function u0(e) {
                      return Kt(e)[V.PluralCase];
                    })(n)(parseInt(e, 10)),
                    r = gA[t];
                  return void 0 !== r ? r : "other";
                })(
                  n,
                  (function vA() {
                    return f0;
                  })(),
                );
                (t = e.cases.indexOf(r)),
                  -1 === t && "other" !== r && (t = e.cases.indexOf("other"));
                break;
              }
              case 0:
                t = e.cases.indexOf("other");
            }
          return -1 === t ? null : t;
        })(n, r);
        if (
          vc(n, t) !== i &&
          (E0(e, n, t),
          (t[n.currentCaseLViewIndex] = null === i ? null : ~i),
          null !== i)
        ) {
          const s = t[n.anchorIdx];
          s && D0(e, n.create[i], t, s);
        }
      }
      function E0(e, n, t) {
        let r = vc(n, t);
        if (null !== r) {
          const i = n.remove[r];
          for (let o = 0; o < i.length; o++) {
            const s = i[o];
            if (s > 0) {
              const a = Rl(s, t);
              null !== a && pf(t[le], a);
            } else E0(e, ia(e, ~s), t);
          }
        }
      }
      function AA() {
        const e = [];
        let t,
          r,
          n = -1;
        function o(a, l) {
          n = 0;
          const c = vc(a, l);
          r = null !== c ? a.remove[c] : De;
        }
        function s() {
          if (n < r.length) {
            const a = r[n++];
            return a > 0 ? t[a] : (e.push(n, r), o(t[B].data[~a], t), s());
          }
          return 0 === e.length ? null : ((r = e.pop()), (n = e.pop()), s());
        }
        return function i(a, l) {
          for (t = l; e.length; ) e.pop();
          return o(a.value, l), s;
        };
      }
      const yc = /\ufffd(\d+):?\d*\ufffd/gi,
        PA = /\ufffd(\d+)\ufffd/,
        T0 = /^\s*(\ufffd\d+:?\d*\ufffd)\s*,\s*(select|plural)\s*,/,
        aa = "\ufffd",
        xA = /\ufffd\/?\*(\d+:\d+)\ufffd/gi,
        FA = /\ufffd(\/?[#*]\d+):?\d*\ufffd/gi,
        kA = /\uE500/g;
      function M0(e, n, t, r, i, o, s) {
        const a = Js(e, r, 1, null);
        let l = a << tt.SHIFT,
          c = As();
        n === c && (c = null),
          null === c && (l |= tt.APPEND_EAGERLY),
          s &&
            ((l |= tt.COMMENT),
            (function PM(e) {
              void 0 === nf && (nf = e());
            })(AA)),
          i.push(l, null === o ? "" : o);
        const u = Vf(e, a, s ? 32 : 1, null === o ? "" : o, null);
        m0(t, u);
        const d = u.index;
        return (
          lr(u, !1),
          null !== c &&
            n !== c &&
            (function wA(e, n) {
              let t = e.insertBeforeIndex;
              null === t
                ? (Y_(p0, g0), (t = e.insertBeforeIndex = [null, n]))
                : ((function Gr(e, n, t) {
                    e != n && Ee(t, e, n, "==");
                  })(Array.isArray(t), !0, "Expecting array here"),
                  t.push(n));
            })(c, d),
          u
        );
      }
      function BA(e, n, t, r, i, o, s) {
        const a = s.match(yc),
          l = M0(e, n, t, o, r, a ? null : s, !1);
        a && la(i, s, l.index, null, 0, null);
      }
      function la(e, n, t, r, i, o) {
        const s = e.length,
          a = s + 1;
        e.push(null, null);
        const l = s + 2,
          c = n.split(yc);
        let u = 0;
        for (let d = 0; d < c.length; d++) {
          const f = c[d];
          if (1 & d) {
            const h = i + parseInt(f, 10);
            e.push(-1 - h), (u |= N0(h));
          } else "" !== f && e.push(f);
        }
        return (
          e.push((t << 2) | (r ? 1 : 0)),
          r && e.push(r, o),
          (e[s] = u),
          (e[a] = e.length - l),
          u
        );
      }
      function N0(e) {
        return 1 << Math.min(e, 31);
      }
      function I0(e) {
        let n,
          o,
          t = "",
          r = 0,
          i = !1;
        for (; null !== (n = xA.exec(e)); )
          i
            ? n[0] === `${aa}/*${o}${aa}` && ((r = n.index), (i = !1))
            : ((t += e.substring(r, n.index + n[0].length)),
              (o = n[1]),
              (i = !0));
        return (t += e.slice(r)), t;
      }
      function O0(e, n, t, r, i, o) {
        let s = 0;
        const a = {
          type: i.type,
          currentCaseLViewIndex: Js(e, n, 1, null),
          anchorIdx: o,
          cases: [],
          create: [],
          remove: [],
          update: [],
        };
        (function qA(e, n, t) {
          e.push(N0(n.mainBinding), 2, -1 - n.mainBinding, (t << 2) | 2);
        })(t, i, o),
          (function CA(e, n, t) {
            const r = e.data[n];
            null === r ? (e.data[n] = t) : (r.value = t);
          })(e, o, a);
        const l = i.values;
        for (let c = 0; c < l.length; c++) {
          const u = l[c],
            d = [];
          for (let f = 0; f < u.length; f++) {
            const h = u[f];
            if ("string" != typeof h) {
              const p = d.push(h) - 1;
              u[f] = `\x3c!--\ufffd${p}\ufffd--\x3e`;
            }
          }
          s = zA(e, a, n, t, r, i.cases[c], u.join(""), d) | s;
        }
        s &&
          (function YA(e, n, t) {
            e.push(n, 1, (t << 2) | 3);
          })(t, s, o);
      }
      function GA(e) {
        const n = [],
          t = [];
        let r = 1,
          i = 0;
        const o = oh(
          (e = e.replace(T0, function (s, a, l) {
            return (
              (r = "select" === l ? 0 : 1), (i = parseInt(a.slice(1), 10)), ""
            );
          })),
        );
        for (let s = 0; s < o.length; ) {
          let a = o[s++].trim();
          1 === r && (a = a.replace(/\s*(?:=)?(\w+)\s*/, "$1")),
            a.length && n.push(a);
          const l = oh(o[s++]);
          n.length > t.length && t.push(l);
        }
        return { type: r, mainBinding: i, cases: n, values: t };
      }
      function oh(e) {
        if (!e) return [];
        let n = 0;
        const t = [],
          r = [],
          i = /[{}]/g;
        let o;
        for (i.lastIndex = 0; (o = i.exec(e)); ) {
          const a = o.index;
          if ("}" == o[0]) {
            if ((t.pop(), 0 == t.length)) {
              const l = e.substring(n, a);
              T0.test(l) ? r.push(GA(l)) : r.push(l), (n = a + 1);
            }
          } else {
            if (0 == t.length) {
              const l = e.substring(n, a);
              r.push(l), (n = a + 1);
            }
            t.push("{");
          }
        }
        const s = e.substring(n);
        return r.push(s), r;
      }
      function zA(e, n, t, r, i, o, s, a) {
        const l = [],
          c = [],
          u = [];
        n.cases.push(o), n.create.push(l), n.remove.push(c), n.update.push(u);
        const f = (function iv(e) {
            const n = new lN(e);
            return (function cN() {
              try {
                return !!new window.DOMParser().parseFromString(
                  bo(""),
                  "text/html",
                );
              } catch {
                return !1;
              }
            })()
              ? new aN(n)
              : n;
          })(
            (function X_() {
              return void 0 !== _f
                ? _f
                : typeof document < "u"
                  ? document
                  : void 0;
            })(),
          ).getInertBodyElement(s),
          h =
            (function Cf(e) {
              return "content" in e &&
                (function mN(e) {
                  return (
                    e.nodeType === Node.ELEMENT_NODE &&
                    "TEMPLATE" === e.nodeName
                  );
                })(e)
                ? e.content
                : null;
            })(f) || f;
        return h ? A0(e, n, t, r, l, c, u, h, i, a, 0) : 0;
      }
      function A0(e, n, t, r, i, o, s, a, l, c, u) {
        let d = 0,
          f = a.firstChild;
        for (; f; ) {
          const h = Js(e, t, 1, null);
          switch (f.nodeType) {
            case Node.ELEMENT_NODE:
              const p = f,
                m = p.tagName.toLowerCase();
              if (bf.hasOwnProperty(m)) {
                sh(i, mc, m, l, h), (e.data[h] = m);
                const D = p.attributes;
                for (let O = 0; O < D.length; O++) {
                  const j = D.item(O),
                    W = j.name.toLowerCase();
                  j.value.match(yc)
                    ? lv.hasOwnProperty(W) &&
                      la(s, j.value, h, j.name, 0, Df[W] ? yf : null)
                    : JA(i, h, j);
                }
                (d = A0(e, n, t, r, i, o, s, f, h, c, u + 1) | d), R0(o, h, u);
              }
              break;
            case Node.TEXT_NODE:
              const v = f.textContent || "",
                b = v.match(yc);
              sh(i, null, b ? "" : v, l, h),
                R0(o, h, u),
                b && (d = la(s, v, h, null, 0, null) | d);
              break;
            case Node.COMMENT_NODE:
              const w = PA.exec(f.textContent || "");
              if (w) {
                const O = c[parseInt(w[1], 10)];
                sh(i, _c, "", l, h), O0(e, t, r, l, O, h), WA(o, h, u);
              }
          }
          f = f.nextSibling;
        }
        return d;
      }
      function R0(e, n, t) {
        0 === t && e.push(n);
      }
      function WA(e, n, t) {
        0 === t && (e.push(~n), e.push(n));
      }
      function sh(e, n, t, r, i) {
        null !== n && e.push(n),
          e.push(
            t,
            i,
            (function SA(e, n, t) {
              return e | (n << 17) | (t << 1);
            })(0, r, i),
          );
      }
      function JA(e, n, t) {
        e.push((n << 1) | 1, t.name, t.value);
      }
      function x0(e, n, t = -1) {
        const r = pe(),
          i = S(),
          o = Ge + e,
          s = zr(r.consts, n),
          a = As();
        r.firstCreatePass &&
          (function VA(e, n, t, r, i, o) {
            const s = As(),
              a = [],
              l = [],
              c = [[]];
            i = (function UA(e, n) {
              if (
                (function $A(e) {
                  return -1 === e;
                })(n)
              )
                return I0(e);
              {
                const t = e.indexOf(`:${n}${aa}`) + 2 + n.toString().length,
                  r = e.search(new RegExp(`${aa}\\/\\*\\d+:${n}${aa}`));
                return I0(e.substring(t, r));
              }
            })(i, o);
            const u = (function LA(e) {
              return e.replace(kA, " ");
            })(i).split(FA);
            for (let d = 0; d < u.length; d++) {
              let f = u[d];
              if (1 & d) {
                const h = 47 === f.charCodeAt(0),
                  m =
                    (f.charCodeAt(h ? 1 : 0),
                    Ge + Number.parseInt(f.substring(h ? 2 : 1)));
                if (h) c.shift(), lr(As(), !1);
                else {
                  const v = EA(e, c[0], m);
                  c.unshift([]), lr(v, !0);
                }
              } else {
                const h = oh(f);
                for (let p = 0; p < h.length; p++) {
                  let m = h[p];
                  if (1 & p) {
                    const v = m;
                    if ("object" != typeof v)
                      throw new Error(
                        `Unable to parse ICU expression in "${i}" message.`,
                      );
                    O0(e, t, l, n, v, M0(e, s, c[0], t, a, "", !0).index);
                  } else "" !== m && BA(e, s, c[0], a, l, t, m);
                }
              }
            }
            e.data[r] = { create: a, update: l };
          })(r, null === a ? 0 : a.index, i, o, s, t);
        const l = r.data[o],
          u = $_(r, a === i[jt] ? null : a, i);
        (function NA(e, n, t, r) {
          const i = e[le];
          for (let o = 0; o < n.length; o++) {
            const s = n[o++],
              a = n[o],
              c = (s & tt.APPEND_EAGERLY) === tt.APPEND_EAGERLY,
              u = s >>> tt.SHIFT;
            let d = e[u];
            null === d &&
              (d = e[u] =
                (s & tt.COMMENT) === tt.COMMENT
                  ? i.createComment(a)
                  : lf(i, a)),
              c && null !== t && vi(i, t, d, r, !1);
          }
        })(i, l.create, u, a && 8 & a.type ? i[a.index] : null),
          qm(!0);
      }
      function xt(e, n, t) {
        x0(e, n, t),
          (function F0() {
            qm(!1);
          })();
      }
      function Ho(e) {
        return (
          (function TA(e) {
            e && (oa |= 1 << Math.min(sa, 31)), sa++;
          })(Gt(S(), co(), e)),
          Ho
        );
      }
      function ca(e) {
        !(function MA(e, n, t) {
          if (sa > 0) {
            const r = e.data[t];
            C0(e, n, Array.isArray(r) ? r : r.update, Sr() - sa - 1, oa);
          }
          (oa = 0), (sa = 0);
        })(pe(), S(), e + Ge);
      }
      function ah(e, n, t, r, i) {
        if (((e = J(e)), Array.isArray(e)))
          for (let o = 0; o < e.length; o++) ah(e[o], n, t, r, i);
        else {
          const o = pe(),
            s = S();
          let a = yi(e) ? e : J(e.provide),
            l = Dv(e);
          const c = Rt(),
            u = 1048575 & c.providerIndexes,
            d = c.directiveStart,
            f = c.providerIndexes >> 20;
          if (yi(e) || !e.multi) {
            const h = new Rs(l, i, g),
              p = ch(a, n, i ? u : u + f, d);
            -1 === p
              ? (Ud(Hl(c, s), o, a),
                lh(o, e, n.length),
                n.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                i && (c.providerIndexes += 1048576),
                t.push(h),
                s.push(h))
              : ((t[p] = h), (s[p] = h));
          } else {
            const h = ch(a, n, u + f, d),
              p = ch(a, n, u, u + f),
              v = p >= 0 && t[p];
            if ((i && !v) || (!i && !(h >= 0 && t[h]))) {
              Ud(Hl(c, s), o, a);
              const b = (function cR(e, n, t, r, i) {
                const o = new Rs(e, t, g);
                return (
                  (o.multi = []),
                  (o.index = n),
                  (o.componentProviders = 0),
                  k0(o, i, r && !t),
                  o
                );
              })(i ? lR : aR, t.length, i, r, l);
              !i && v && (t[p].providerFactory = b),
                lh(o, e, n.length, 0),
                n.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                i && (c.providerIndexes += 1048576),
                t.push(b),
                s.push(b);
            } else lh(o, e, h > -1 ? h : p, k0(t[i ? p : h], l, !i && r));
            !i && r && v && t[p].componentProviders++;
          }
        }
      }
      function lh(e, n, t, r) {
        const i = yi(n),
          o = (function TN(e) {
            return !!e.useClass;
          })(n);
        if (i || o) {
          const l = (o ? J(n.useClass) : n).prototype.ngOnDestroy;
          if (l) {
            const c = e.destroyHooks || (e.destroyHooks = []);
            if (!i && n.multi) {
              const u = c.indexOf(t);
              -1 === u ? c.push(t, [r, l]) : c[u + 1].push(r, l);
            } else c.push(t, l);
          }
        }
      }
      function k0(e, n, t) {
        return t && e.componentProviders++, e.multi.push(n) - 1;
      }
      function ch(e, n, t, r) {
        for (let i = t; i < r; i++) if (n[i] === e) return i;
        return -1;
      }
      function aR(e, n, t, r) {
        return uh(this.multi, []);
      }
      function lR(e, n, t, r) {
        const i = this.multi;
        let o;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = mi(t, t[B], this.providerFactory.index, r);
          (o = a.slice(0, s)), uh(i, o);
          for (let l = s; l < a.length; l++) o.push(a[l]);
        } else (o = []), uh(i, o);
        return o;
      }
      function uh(e, n) {
        for (let t = 0; t < e.length; t++) n.push((0, e[t])());
        return n;
      }
      function Ie(e, n = []) {
        return (t) => {
          t.providersResolver = (r, i) =>
            (function sR(e, n, t) {
              const r = pe();
              if (r.firstCreatePass) {
                const i = Wn(e);
                ah(t, r.data, r.blueprint, i, !0),
                  ah(n, r.data, r.blueprint, i, !1);
              }
            })(r, i ? i(e) : e, n);
        };
      }
      class jo {}
      class L0 {}
      class V0 extends jo {
        constructor(n, t) {
          super(),
            (this._parent = t),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new ny(this));
          const r = mn(n);
          (this._bootstrapComponents = Nr(r.bootstrap)),
            (this._r3Injector = Fv(
              n,
              t,
              [
                { provide: jo, useValue: this },
                { provide: qs, useValue: this.componentFactoryResolver },
              ],
              ke(n),
              new Set(["environment"]),
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(n));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const n = this._r3Injector;
          !n.destroyed && n.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(n) {
          this.destroyCbs.push(n);
        }
      }
      class dh extends L0 {
        constructor(n) {
          super(), (this.moduleType = n);
        }
        create(n) {
          return new V0(this.moduleType, n);
        }
      }
      class dR extends jo {
        constructor(n, t, r) {
          super(),
            (this.componentFactoryResolver = new ny(this)),
            (this.instance = null);
          const i = new bv(
            [
              ...n,
              { provide: jo, useValue: this },
              { provide: qs, useValue: this.componentFactoryResolver },
            ],
            t || ec(),
            r,
            new Set(["environment"]),
          );
          (this.injector = i), i.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(n) {
          this.injector.onDestroy(n);
        }
      }
      function bc(e, n, t = null) {
        return new dR(e, n, t).injector;
      }
      let fR = (() => {
        class e {
          constructor(t) {
            (this._injector = t), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(t) {
            if (!t.standalone) return null;
            if (!this.cachedInjectors.has(t.id)) {
              const r = mv(0, t.type),
                i =
                  r.length > 0
                    ? bc([r], this._injector, `Standalone[${t.type.name}]`)
                    : null;
              this.cachedInjectors.set(t.id, i);
            }
            return this.cachedInjectors.get(t.id);
          }
          ngOnDestroy() {
            try {
              for (const t of this.cachedInjectors.values())
                null !== t && t.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = P({
            token: e,
            providedIn: "environment",
            factory: () => new e(k(xn)),
          })),
          e
        );
      })();
      function Dt(e) {
        e.getStandaloneInjector = (n) =>
          n.get(fR).getOrCreateStandaloneInjector(e);
      }
      function ua(e, n, t, r) {
        return z0(S(), Jt(), e, n, t, r);
      }
      function da(e, n, t, r, i) {
        return (function W0(e, n, t, r, i, o, s) {
          const a = n + t;
          return bi(e, a, i, o)
            ? dr(e, a + 2, s ? r.call(s, i, o) : r(i, o))
            : fa(e, a + 2);
        })(S(), Jt(), e, n, t, r, i);
      }
      function hh(e, n, t, r, i, o) {
        return (function q0(e, n, t, r, i, o, s, a) {
          const l = n + t;
          return (function uc(e, n, t, r, i) {
            const o = bi(e, n, t, r);
            return Gt(e, n + 2, i) || o;
          })(e, l, i, o, s)
            ? dr(e, l + 3, a ? r.call(a, i, o, s) : r(i, o, s))
            : fa(e, l + 3);
        })(S(), Jt(), e, n, t, r, i, o);
      }
      function fa(e, n) {
        const t = e[n];
        return t === re ? void 0 : t;
      }
      function z0(e, n, t, r, i, o) {
        const s = n + t;
        return Gt(e, s, i)
          ? dr(e, s + 1, o ? r.call(o, i) : r(i))
          : fa(e, s + 1);
      }
      function K0(e, n, t) {
        const r = e + Ge,
          i = S(),
          o = lo(i, r);
        return (function ha(e, n) {
          return e[B].data[n].pure;
        })(i, r)
          ? z0(i, Jt(), n, o.transform, t, o)
          : o.transform(t);
      }
      function ph(e) {
        return (n) => {
          setTimeout(e, void 0, n);
        };
      }
      const U = class PR extends Me {
        constructor(n = !1) {
          super(), (this.__isAsync = n);
        }
        emit(n) {
          super.next(n);
        }
        subscribe(n, t, r) {
          let i = n,
            o = t || (() => null),
            s = r;
          if (n && "object" == typeof n) {
            const l = n;
            (i = l.next?.bind(l)),
              (o = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((o = ph(o)), i && (i = ph(i)), s && (s = ph(s)));
          const a = super.subscribe({ next: i, error: o, complete: s });
          return n instanceof lt && n.add(a), a;
        }
      };
      function xR() {
        return this._results[Symbol.iterator]();
      }
      class gh {
        get changes() {
          return this._changes || (this._changes = new U());
        }
        constructor(n = !1) {
          (this._emitDistinctChangesOnly = n),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const t = gh.prototype;
          t[Symbol.iterator] || (t[Symbol.iterator] = xR);
        }
        get(n) {
          return this._results[n];
        }
        map(n) {
          return this._results.map(n);
        }
        filter(n) {
          return this._results.filter(n);
        }
        find(n) {
          return this._results.find(n);
        }
        reduce(n, t) {
          return this._results.reduce(n, t);
        }
        forEach(n) {
          this._results.forEach(n);
        }
        some(n) {
          return this._results.some(n);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(n, t) {
          const r = this;
          r.dirty = !1;
          const i = (function Pn(e) {
            return e.flat(Number.POSITIVE_INFINITY);
          })(n);
          (this._changesDetected = !(function XT(e, n, t) {
            if (e.length !== n.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let i = e[r],
                o = n[r];
              if ((t && ((i = t(i)), (o = t(o))), o !== i)) return !1;
            }
            return !0;
          })(r._results, i, t)) &&
            ((r._results = i),
            (r.length = i.length),
            (r.last = i[this.length - 1]),
            (r.first = i[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let Ve = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = LR), e;
      })();
      const FR = Ve,
        kR = class extends FR {
          constructor(n, t, r) {
            super(),
              (this._declarationLView = n),
              (this._declarationTContainer = t),
              (this.elementRef = r);
          }
          createEmbeddedView(n, t) {
            const r = this._declarationTContainer.tView,
              i = nc(
                this._declarationLView,
                r,
                n,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                t || null,
              );
            i[Ns] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[ar];
            return (
              null !== s && (i[ar] = s.createEmbeddedView(r)),
              Bf(r, i, n),
              new Zs(i)
            );
          }
        };
      function LR() {
        return Dc(Rt(), S());
      }
      function Dc(e, n) {
        return 4 & e.type ? new kR(n, e, Co(e, n)) : null;
      }
      let kn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = VR), e;
      })();
      function VR() {
        return eb(Rt(), S());
      }
      const BR = kn,
        Q0 = class extends BR {
          constructor(n, t, r) {
            super(),
              (this._lContainer = n),
              (this._hostTNode = t),
              (this._hostLView = r);
          }
          get element() {
            return Co(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new fo(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const n = $d(this._hostTNode, this._hostLView);
            if (i_(n)) {
              const t = Vl(n, this._hostLView),
                r = Ll(n);
              return new fo(t[B].data[r + 8], t);
            }
            return new fo(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(n) {
            const t = X0(this._lContainer);
            return (null !== t && t[n]) || null;
          }
          get length() {
            return this._lContainer.length - Yt;
          }
          createEmbeddedView(n, t, r) {
            let i, o;
            "number" == typeof r
              ? (i = r)
              : null != r && ((i = r.index), (o = r.injector));
            const s = n.createEmbeddedView(t || {}, o);
            return this.insert(s, i), s;
          }
          createComponent(n, t, r, i, o) {
            const s =
              n &&
              !(function Fs(e) {
                return "function" == typeof e;
              })(n);
            let a;
            if (s) a = t;
            else {
              const d = t || {};
              (a = d.index),
                (r = d.injector),
                (i = d.projectableNodes),
                (o = d.environmentInjector || d.ngModuleRef);
            }
            const l = s ? n : new Ks(Se(n)),
              c = r || this.parentInjector;
            if (!o && null == l.ngModule) {
              const f = (s ? c : this.parentInjector).get(xn, null);
              f && (o = f);
            }
            const u = l.create(c, i, void 0, o);
            return this.insert(u.hostView, a), u;
          }
          insert(n, t) {
            const r = n._lView,
              i = r[B];
            if (
              (function DT(e) {
                return zn(e[Qe]);
              })(r)
            ) {
              const u = this.indexOf(n);
              if (-1 !== u) this.detach(u);
              else {
                const d = r[Qe],
                  f = new Q0(d, d[jt], d[Qe]);
                f.detach(f.indexOf(n));
              }
            }
            const o = this._adjustIndex(t),
              s = this._lContainer;
            !(function jM(e, n, t, r) {
              const i = Yt + r,
                o = t.length;
              r > 0 && (t[i - 1][Gn] = n),
                r < o - Yt
                  ? ((n[Gn] = t[i]), m_(t, Yt + r, n))
                  : (t.push(n), (n[Gn] = null)),
                (n[Qe] = t);
              const s = n[Ns];
              null !== s &&
                t !== s &&
                (function $M(e, n) {
                  const t = e[ao];
                  n[$t] !== n[Qe][Qe][$t] && (e[Rm] = !0),
                    null === t ? (e[ao] = [n]) : t.push(n);
                })(s, n);
              const a = n[ar];
              null !== a && a.insertView(e), (n[se] |= 64);
            })(i, r, s, o);
            const a = hf(o, s),
              l = r[le],
              c = Wl(l, s[Il]);
            return (
              null !== c &&
                (function VM(e, n, t, r, i, o) {
                  (r[Er] = i), (r[jt] = n), Us(e, r, t, 1, i, o);
                })(i, s[jt], l, r, c, a),
              n.attachToViewContainerRef(),
              m_(mh(s), o, n),
              n
            );
          }
          move(n, t) {
            return this.insert(n, t);
          }
          indexOf(n) {
            const t = X0(this._lContainer);
            return null !== t ? t.indexOf(n) : -1;
          }
          remove(n) {
            const t = this._adjustIndex(n, -1),
              r = uf(this._lContainer, t);
            r && ($l(mh(this._lContainer), t), H_(r[B], r));
          }
          detach(n) {
            const t = this._adjustIndex(n, -1),
              r = uf(this._lContainer, t);
            return r && null != $l(mh(this._lContainer), t) ? new Zs(r) : null;
          }
          _adjustIndex(n, t = 0) {
            return n ?? this.length + t;
          }
        };
      function X0(e) {
        return e[Ol];
      }
      function mh(e) {
        return e[Ol] || (e[Ol] = []);
      }
      function eb(e, n) {
        let t;
        const r = n[e.index];
        if (zn(r)) t = r;
        else {
          let i;
          if (8 & e.type) i = At(r);
          else {
            const o = n[le];
            i = o.createComment("");
            const s = vn(e, n);
            vi(
              o,
              Wl(o, s),
              i,
              (function WM(e, n) {
                return e.nextSibling(n);
              })(o, s),
              !1,
            );
          }
          (n[e.index] = t = Kv(r, n, i, e)), ic(n, t);
        }
        return new Q0(t, e, n);
      }
      class _h {
        constructor(n) {
          (this.queryList = n), (this.matches = null);
        }
        clone() {
          return new _h(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class vh {
        constructor(n = []) {
          this.queries = n;
        }
        createEmbeddedView(n) {
          const t = n.queries;
          if (null !== t) {
            const r =
                null !== n.contentQueries ? n.contentQueries[0] : t.length,
              i = [];
            for (let o = 0; o < r; o++) {
              const s = t.getByIndex(o);
              i.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new vh(i);
          }
          return null;
        }
        insertView(n) {
          this.dirtyQueriesWithMatches(n);
        }
        detachView(n) {
          this.dirtyQueriesWithMatches(n);
        }
        dirtyQueriesWithMatches(n) {
          for (let t = 0; t < this.queries.length; t++)
            null !== ob(n, t).matches && this.queries[t].setDirty();
        }
      }
      class tb {
        constructor(n, t, r = null) {
          (this.predicate = n), (this.flags = t), (this.read = r);
        }
      }
      class yh {
        constructor(n = []) {
          this.queries = n;
        }
        elementStart(n, t) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(n, t);
        }
        elementEnd(n) {
          for (let t = 0; t < this.queries.length; t++)
            this.queries[t].elementEnd(n);
        }
        embeddedTView(n) {
          let t = null;
          for (let r = 0; r < this.length; r++) {
            const i = null !== t ? t.length : 0,
              o = this.getByIndex(r).embeddedTView(n, i);
            o &&
              ((o.indexInDeclarationView = r),
              null !== t ? t.push(o) : (t = [o]));
          }
          return null !== t ? new yh(t) : null;
        }
        template(n, t) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(n, t);
        }
        getByIndex(n) {
          return this.queries[n];
        }
        get length() {
          return this.queries.length;
        }
        track(n) {
          this.queries.push(n);
        }
      }
      class bh {
        constructor(n, t = -1) {
          (this.metadata = n),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = t);
        }
        elementStart(n, t) {
          this.isApplyingToNode(t) && this.matchTNode(n, t);
        }
        elementEnd(n) {
          this._declarationNodeIndex === n.index &&
            (this._appliesToNextNode = !1);
        }
        template(n, t) {
          this.elementStart(n, t);
        }
        embeddedTView(n, t) {
          return this.isApplyingToNode(n)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-n.index, t),
              new bh(this.metadata))
            : null;
        }
        isApplyingToNode(n) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const t = this._declarationNodeIndex;
            let r = n.parent;
            for (; null !== r && 8 & r.type && r.index !== t; ) r = r.parent;
            return t === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(n, t) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let i = 0; i < r.length; i++) {
              const o = r[i];
              this.matchTNodeWithReadOption(n, t, HR(t, o)),
                this.matchTNodeWithReadOption(n, t, jl(t, n, o, !1, !1));
            }
          else
            r === Ve
              ? 4 & t.type && this.matchTNodeWithReadOption(n, t, -1)
              : this.matchTNodeWithReadOption(n, t, jl(t, n, r, !1, !1));
        }
        matchTNodeWithReadOption(n, t, r) {
          if (null !== r) {
            const i = this.metadata.read;
            if (null !== i)
              if (i === _e || i === kn || (i === Ve && 4 & t.type))
                this.addMatch(t.index, -2);
              else {
                const o = jl(t, n, i, !1, !1);
                null !== o && this.addMatch(t.index, o);
              }
            else this.addMatch(t.index, r);
          }
        }
        addMatch(n, t) {
          null === this.matches
            ? (this.matches = [n, t])
            : this.matches.push(n, t);
        }
      }
      function HR(e, n) {
        const t = e.localNames;
        if (null !== t)
          for (let r = 0; r < t.length; r += 2) if (t[r] === n) return t[r + 1];
        return null;
      }
      function $R(e, n, t, r) {
        return -1 === t
          ? (function jR(e, n) {
              return 11 & e.type ? Co(e, n) : 4 & e.type ? Dc(e, n) : null;
            })(n, e)
          : -2 === t
            ? (function UR(e, n, t) {
                return t === _e
                  ? Co(n, e)
                  : t === Ve
                    ? Dc(n, e)
                    : t === kn
                      ? eb(n, e)
                      : void 0;
              })(e, n, r)
            : mi(e, e[B], t, n);
      }
      function nb(e, n, t, r) {
        const i = n[ar].queries[r];
        if (null === i.matches) {
          const o = e.data,
            s = t.matches,
            a = [];
          for (let l = 0; l < s.length; l += 2) {
            const c = s[l];
            a.push(c < 0 ? null : $R(n, o[c], s[l + 1], t.metadata.read));
          }
          i.matches = a;
        }
        return i.matches;
      }
      function Dh(e, n, t, r) {
        const i = e.queries.getByIndex(t),
          o = i.matches;
        if (null !== o) {
          const s = nb(e, n, i, t);
          for (let a = 0; a < o.length; a += 2) {
            const l = o[a];
            if (l > 0) r.push(s[a / 2]);
            else {
              const c = o[a + 1],
                u = n[-l];
              for (let d = Yt; d < u.length; d++) {
                const f = u[d];
                f[Ns] === f[Qe] && Dh(f[B], f, c, r);
              }
              if (null !== u[ao]) {
                const d = u[ao];
                for (let f = 0; f < d.length; f++) {
                  const h = d[f];
                  Dh(h[B], h, c, r);
                }
              }
            }
          }
        }
        return r;
      }
      function ye(e) {
        const n = S(),
          t = pe(),
          r = Ym();
        xd(r + 1);
        const i = ob(t, r);
        if (
          e.dirty &&
          (function bT(e) {
            return 4 == (4 & e[se]);
          })(n) ===
            (2 == (2 & i.metadata.flags))
        ) {
          if (null === i.matches) e.reset([]);
          else {
            const o = i.crossesNgTemplate ? Dh(t, n, r, []) : nb(t, n, i, r);
            e.reset(o, LN), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Ei(e, n, t) {
        const r = pe();
        r.firstCreatePass &&
          (ib(r, new tb(e, n, t), -1),
          2 == (2 & n) && (r.staticViewQueries = !0)),
          rb(r, S(), n);
      }
      function Be(e, n, t, r) {
        const i = pe();
        if (i.firstCreatePass) {
          const o = Rt();
          ib(i, new tb(n, t, r), o.index),
            (function zR(e, n) {
              const t = e.contentQueries || (e.contentQueries = []);
              n !== (t.length ? t[t.length - 1] : -1) &&
                t.push(e.queries.length - 1, n);
            })(i, e),
            2 == (2 & t) && (i.staticContentQueries = !0);
        }
        rb(i, S(), t);
      }
      function be() {
        return (function GR(e, n) {
          return e[ar].queries[n].queryList;
        })(S(), Ym());
      }
      function rb(e, n, t) {
        const r = new gh(4 == (4 & t));
        Wv(e, n, r, r.destroy),
          null === n[ar] && (n[ar] = new vh()),
          n[ar].queries.push(new _h(r));
      }
      function ib(e, n, t) {
        null === e.queries && (e.queries = new yh()),
          e.queries.track(new bh(n, t));
      }
      function ob(e, n) {
        return e.queries.getByIndex(n);
      }
      function Ft(e, n) {
        return Dc(e, n);
      }
      function wc(...e) {}
      const Ec = new $("Application Initializer");
      let Sc = (() => {
        class e {
          constructor(t) {
            (this.appInits = t),
              (this.resolve = wc),
              (this.reject = wc),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, i) => {
                (this.resolve = r), (this.reject = i);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let i = 0; i < this.appInits.length; i++) {
                const o = this.appInits[i]();
                if (ea(o)) t.push(o);
                else if (Xf(o)) {
                  const s = new Promise((a, l) => {
                    o.subscribe({ complete: a, error: l });
                  });
                  t.push(s);
                }
              }
            Promise.all(t)
              .then(() => {
                r();
              })
              .catch((i) => {
                this.reject(i);
              }),
              0 === t.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(k(Ec, 8));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const ga = new $("AppId", {
        providedIn: "root",
        factory: function wb() {
          return `${Mh()}${Mh()}${Mh()}`;
        },
      });
      function Mh() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Eb = new $("Platform Initializer"),
        Tc = new $("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        });
      let dP = (() => {
        class e {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const Cn = new $("LocaleId", {
        providedIn: "root",
        factory: () =>
          X(Cn, Z.Optional | Z.SkipSelf) ||
          (function fP() {
            return (typeof $localize < "u" && $localize.locale) || Bo;
          })(),
      });
      class pP {
        constructor(n, t) {
          (this.ngModuleFactory = n), (this.componentFactories = t);
        }
      }
      let Sb = (() => {
        class e {
          compileModuleSync(t) {
            return new dh(t);
          }
          compileModuleAsync(t) {
            return Promise.resolve(this.compileModuleSync(t));
          }
          compileModuleAndAllComponentsSync(t) {
            const r = this.compileModuleSync(t),
              o = Nr(mn(t).declarations).reduce((s, a) => {
                const l = Se(a);
                return l && s.push(new Ks(l)), s;
              }, []);
            return new pP(r, o);
          }
          compileModuleAndAllComponentsAsync(t) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(t));
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const _P = (() => Promise.resolve(0))();
      function Nh(e) {
        typeof Zone > "u"
          ? _P.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class ve {
        constructor({
          enableLongStackTrace: n = !1,
          shouldCoalesceEventChangeDetection: t = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new U(!1)),
            (this.onMicrotaskEmpty = new U(!1)),
            (this.onStable = new U(!1)),
            (this.onError = new U(!1)),
            typeof Zone > "u")
          )
            throw new A(908, !1);
          Zone.assertZonePatched();
          const i = this;
          (i._nesting = 0),
            (i._outer = i._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
            n &&
              Zone.longStackTraceZoneSpec &&
              (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
            (i.shouldCoalesceEventChangeDetection = !r && t),
            (i.shouldCoalesceRunChangeDetection = r),
            (i.lastRequestAnimationFrameId = -1),
            (i.nativeRequestAnimationFrame = (function vP() {
              let e = Ue.requestAnimationFrame,
                n = Ue.cancelAnimationFrame;
              if (typeof Zone < "u" && e && n) {
                const t = e[Zone.__symbol__("OriginalDelegate")];
                t && (e = t);
                const r = n[Zone.__symbol__("OriginalDelegate")];
                r && (n = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: n,
              };
            })().nativeRequestAnimationFrame),
            (function DP(e) {
              const n = () => {
                !(function bP(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(Ue, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Oh(e),
                                (e.isCheckStableRunning = !0),
                                Ih(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {},
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Oh(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (t, r, i, o, s, a) => {
                  try {
                    return Nb(e), t.invokeTask(i, o, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === o.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      n(),
                      Ib(e);
                  }
                },
                onInvoke: (t, r, i, o, s, a, l) => {
                  try {
                    return Nb(e), t.invoke(i, o, s, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && n(), Ib(e);
                  }
                },
                onHasTask: (t, r, i, o) => {
                  t.hasTask(i, o),
                    r === i &&
                      ("microTask" == o.change
                        ? ((e._hasPendingMicrotasks = o.microTask),
                          Oh(e),
                          Ih(e))
                        : "macroTask" == o.change &&
                          (e.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: (t, r, i, o) => (
                  t.handleError(i, o),
                  e.runOutsideAngular(() => e.onError.emit(o)),
                  !1
                ),
              });
            })(i);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!ve.isInAngularZone()) throw new A(909, !1);
        }
        static assertNotInAngularZone() {
          if (ve.isInAngularZone()) throw new A(909, !1);
        }
        run(n, t, r) {
          return this._inner.run(n, t, r);
        }
        runTask(n, t, r, i) {
          const o = this._inner,
            s = o.scheduleEventTask("NgZoneEvent: " + i, n, yP, wc, wc);
          try {
            return o.runTask(s, t, r);
          } finally {
            o.cancelTask(s);
          }
        }
        runGuarded(n, t, r) {
          return this._inner.runGuarded(n, t, r);
        }
        runOutsideAngular(n) {
          return this._outer.run(n);
        }
      }
      const yP = {};
      function Ih(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Oh(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function Nb(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Ib(e) {
        e._nesting--, Ih(e);
      }
      class CP {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new U()),
            (this.onMicrotaskEmpty = new U()),
            (this.onStable = new U()),
            (this.onError = new U());
        }
        run(n, t, r) {
          return n.apply(t, r);
        }
        runGuarded(n, t, r) {
          return n.apply(t, r);
        }
        runOutsideAngular(n) {
          return n();
        }
        runTask(n, t, r, i) {
          return n.apply(t, r);
        }
      }
      const Ob = new $(""),
        Mc = new $("");
      let Ph,
        Ah = (() => {
          class e {
            constructor(t, r, i) {
              (this._ngZone = t),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Ph ||
                  ((function wP(e) {
                    Ph = e;
                  })(i),
                  i.addToWindow(r)),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      ve.assertNotInAngularZone(),
                        Nh(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Nh(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(t) ||
                    (clearTimeout(r.timeoutId), !1),
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, r, i) {
              let o = -1;
              r &&
                r > 0 &&
                (o = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== o,
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: t, timeoutId: o, updateCb: i });
            }
            whenStable(t, r, i) {
              if (i && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?',
                );
              this.addCallback(t, r, i), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(t) {
              this.registry.registerApplication(t, this);
            }
            unregisterApplication(t) {
              this.registry.unregisterApplication(t);
            }
            findProviders(t, r, i) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k(ve), k(Rh), k(Mc));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Rh = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(t, r) {
              this._applications.set(t, r);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, r = !0) {
              return Ph?.findTestabilityInTree(this, t, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })();
      const Or = !1;
      let Zr = null;
      const Ab = new $("AllowMultipleToken"),
        xh = new $("PlatformDestroyListeners"),
        Rb = new $("appBootstrapListener");
      class Pb {
        constructor(n, t) {
          (this.name = n), (this.token = t);
        }
      }
      function Fb(e, n, t = []) {
        const r = `Platform: ${n}`,
          i = new $(r);
        return (o = []) => {
          let s = Fh();
          if (!s || s.injector.get(Ab, !1)) {
            const a = [...t, ...o, { provide: i, useValue: !0 }];
            e
              ? e(a)
              : (function TP(e) {
                  if (Zr && !Zr.get(Ab, !1)) throw new A(400, !1);
                  Zr = e;
                  const n = e.get(Lb);
                  (function xb(e) {
                    const n = e.get(Eb, null);
                    n && n.forEach((t) => t());
                  })(e);
                })(
                  (function kb(e = [], n) {
                    return ln.create({
                      name: n,
                      providers: [
                        { provide: Tf, useValue: "platform" },
                        { provide: xh, useValue: new Set([() => (Zr = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r),
                );
          }
          return (function NP(e) {
            const n = Fh();
            if (!n) throw new A(401, !1);
            return n;
          })();
        };
      }
      function Fh() {
        return Zr?.get(Lb) ?? null;
      }
      let Lb = (() => {
        class e {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, r) {
            const i = (function Bb(e, n) {
                let t;
                return (
                  (t =
                    "noop" === e
                      ? new CP()
                      : ("zone.js" === e ? void 0 : e) || new ve(n)),
                  t
                );
              })(
                r?.ngZone,
                (function Vb(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r),
              ),
              o = [{ provide: ve, useValue: i }];
            return i.run(() => {
              const s = ln.create({
                  providers: o,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                a = t.create(s),
                l = a.injector.get(wo, null);
              if (!l) throw new A(402, !1);
              return (
                i.runOutsideAngular(() => {
                  const c = i.onError.subscribe({
                    next: (u) => {
                      l.handleError(u);
                    },
                  });
                  a.onDestroy(() => {
                    Nc(this._modules, a), c.unsubscribe();
                  });
                }),
                (function Hb(e, n, t) {
                  try {
                    const r = t();
                    return ea(r)
                      ? r.catch((i) => {
                          throw (
                            (n.runOutsideAngular(() => e.handleError(i)), i)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (n.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(l, i, () => {
                  const c = a.injector.get(Sc);
                  return (
                    c.runInitializers(),
                    c.donePromise.then(
                      () => (
                        h0(a.injector.get(Cn, Bo) || Bo),
                        this._moduleDoBootstrap(a),
                        a
                      ),
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, r = []) {
            const i = jb({}, r);
            return (function EP(e, n, t) {
              const r = new dh(t);
              return Promise.resolve(r);
            })(0, 0, t).then((o) => this.bootstrapModuleFactory(o, i));
          }
          _moduleDoBootstrap(t) {
            const r = t.injector.get(Go);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((i) => r.bootstrap(i));
            else {
              if (!t.instance.ngDoBootstrap) throw new A(-403, !1);
              t.instance.ngDoBootstrap(r);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new A(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const t = this._injector.get(xh, null);
            t && (t.forEach((r) => r()), t.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(k(ln));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function jb(e, n) {
        return Array.isArray(n) ? n.reduce(jb, e) : { ...e, ...n };
      }
      let Go = (() => {
        class e {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(t, r, i) {
            (this._zone = t),
              (this._injector = r),
              (this._exceptionHandler = i),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const o = new Ce((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new Ce((a) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    ve.assertNotInAngularZone(),
                      Nh(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const c = this._zone.onUnstable.subscribe(() => {
                  ve.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), c.unsubscribe();
                };
              });
            this.isStable = vm(
              o,
              s.pipe(
                (function jS(e = {}) {
                  const {
                    connector: n = () => new Me(),
                    resetOnError: t = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: i = !0,
                  } = e;
                  return (o) => {
                    let s,
                      a,
                      l,
                      c = 0,
                      u = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (s = l = void 0), (u = d = !1);
                      },
                      p = () => {
                        const m = s;
                        h(), m?.unsubscribe();
                      };
                    return We((m, v) => {
                      c++, !d && !u && f();
                      const b = (l = l ?? n());
                      v.add(() => {
                        c--, 0 === c && !d && !u && (a = pd(p, i));
                      }),
                        b.subscribe(v),
                        !s &&
                          c > 0 &&
                          ((s = new $r({
                            next: (w) => b.next(w),
                            error: (w) => {
                              (d = !0), f(), (a = pd(h, t, w)), b.error(w);
                            },
                            complete: () => {
                              (u = !0), f(), (a = pd(h, r)), b.complete();
                            },
                          })),
                          _t(m).subscribe(s));
                    })(o);
                  };
                })(),
              ),
            );
          }
          bootstrap(t, r) {
            const i = t instanceof Cv;
            if (!this._injector.get(Sc).done) {
              !i &&
                (function ro(e) {
                  const n = Se(e) || Ht(e) || nn(e);
                  return null !== n && n.standalone;
                })(t);
              throw new A(405, Or);
            }
            let s;
            (s = i ? t : this._injector.get(qs).resolveComponentFactory(t)),
              this.componentTypes.push(s.componentType);
            const a = (function SP(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(jo),
              c = s.create(ln.NULL, [], r || s.selector, a),
              u = c.location.nativeElement,
              d = c.injector.get(Ob, null);
            return (
              d?.registerApplication(u),
              c.onDestroy(() => {
                this.detachView(c.hostView),
                  Nc(this.components, c),
                  d?.unregisterApplication(u);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            if (this._runningTick) throw new A(101, !1);
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t),
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const r = t;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(t) {
            const r = t;
            Nc(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView), this.tick(), this.components.push(t);
            const r = this._injector.get(Rb, []);
            r.push(...this._bootstrapListeners), r.forEach((i) => i(t));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((t) => t()),
                  this._views.slice().forEach((t) => t.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(t) {
            return (
              this._destroyListeners.push(t),
              () => Nc(this._destroyListeners, t)
            );
          }
          destroy() {
            if (this._destroyed) throw new A(406, !1);
            const t = this._injector;
            t.destroy && !t.destroyed && t.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(k(ve), k(xn), k(wo));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Nc(e, n) {
        const t = e.indexOf(n);
        t > -1 && e.splice(t, 1);
      }
      let cn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = OP), e;
      })();
      function OP(e) {
        return (function AP(e, n, t) {
          if (Os(e) && !t) {
            const r = rn(e.index, n);
            return new Zs(r, r);
          }
          return 47 & e.type ? new Zs(n[$t], n) : null;
        })(Rt(), S(), 16 == (16 & e));
      }
      class Wb {
        constructor() {}
        supports(n) {
          return cc(n);
        }
        create(n) {
          return new LP(n);
        }
      }
      const kP = (e, n) => n;
      class LP {
        constructor(n) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = n || kP);
        }
        forEachItem(n) {
          let t;
          for (t = this._itHead; null !== t; t = t._next) n(t);
        }
        forEachOperation(n) {
          let t = this._itHead,
            r = this._removalsHead,
            i = 0,
            o = null;
          for (; t || r; ) {
            const s = !r || (t && t.currentIndex < Yb(r, i, o)) ? t : r,
              a = Yb(s, i, o),
              l = s.currentIndex;
            if (s === r) i--, (r = r._nextRemoved);
            else if (((t = t._next), null == s.previousIndex)) i++;
            else {
              o || (o = []);
              const c = a - i,
                u = l - i;
              if (c != u) {
                for (let f = 0; f < c; f++) {
                  const h = f < o.length ? o[f] : (o[f] = 0),
                    p = h + f;
                  u <= p && p < c && (o[f] = h + 1);
                }
                o[s.previousIndex] = u - c;
              }
            }
            a !== l && n(s, a, l);
          }
        }
        forEachPreviousItem(n) {
          let t;
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) n(t);
        }
        forEachAddedItem(n) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) n(t);
        }
        forEachMovedItem(n) {
          let t;
          for (t = this._movesHead; null !== t; t = t._nextMoved) n(t);
        }
        forEachRemovedItem(n) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) n(t);
        }
        forEachIdentityChange(n) {
          let t;
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            n(t);
        }
        diff(n) {
          if ((null == n && (n = []), !cc(n))) throw new A(900, !1);
          return this.check(n) ? this : null;
        }
        onDestroy() {}
        check(n) {
          this._reset();
          let i,
            o,
            s,
            t = this._itHead,
            r = !1;
          if (Array.isArray(n)) {
            this.length = n.length;
            for (let a = 0; a < this.length; a++)
              (o = n[a]),
                (s = this._trackByFn(a, o)),
                null !== t && Object.is(t.trackById, s)
                  ? (r && (t = this._verifyReinsertion(t, o, s, a)),
                    Object.is(t.item, o) || this._addIdentityChange(t, o))
                  : ((t = this._mismatch(t, o, s, a)), (r = !0)),
                (t = t._next);
          } else
            (i = 0),
              (function yO(e, n) {
                if (Array.isArray(e))
                  for (let t = 0; t < e.length; t++) n(e[t]);
                else {
                  const t = e[Symbol.iterator]();
                  let r;
                  for (; !(r = t.next()).done; ) n(r.value);
                }
              })(n, (a) => {
                (s = this._trackByFn(i, a)),
                  null !== t && Object.is(t.trackById, s)
                    ? (r && (t = this._verifyReinsertion(t, a, s, i)),
                      Object.is(t.item, a) || this._addIdentityChange(t, a))
                    : ((t = this._mismatch(t, a, s, i)), (r = !0)),
                  (t = t._next),
                  i++;
              }),
              (this.length = i);
          return this._truncate(t), (this.collection = n), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let n;
            for (
              n = this._previousItHead = this._itHead;
              null !== n;
              n = n._next
            )
              n._nextPrevious = n._next;
            for (n = this._additionsHead; null !== n; n = n._nextAdded)
              n.previousIndex = n.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                n = this._movesHead;
              null !== n;
              n = n._nextMoved
            )
              n.previousIndex = n.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(n, t, r, i) {
          let o;
          return (
            null === n ? (o = this._itTail) : ((o = n._prev), this._remove(n)),
            null !==
            (n =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
                this._reinsertAfter(n, o, i))
              : null !==
                  (n =
                    null === this._linkedRecords
                      ? null
                      : this._linkedRecords.get(r, i))
                ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
                  this._moveAfter(n, o, i))
                : (n = this._addAfter(new VP(t, r), o, i)),
            n
          );
        }
        _verifyReinsertion(n, t, r, i) {
          let o =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== o
              ? (n = this._reinsertAfter(o, n._prev, i))
              : n.currentIndex != i &&
                ((n.currentIndex = i), this._addToMoves(n, i)),
            n
          );
        }
        _truncate(n) {
          for (; null !== n; ) {
            const t = n._next;
            this._addToRemovals(this._unlink(n)), (n = t);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(n, t, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(n);
          const i = n._prevRemoved,
            o = n._nextRemoved;
          return (
            null === i ? (this._removalsHead = o) : (i._nextRemoved = o),
            null === o ? (this._removalsTail = i) : (o._prevRemoved = i),
            this._insertAfter(n, t, r),
            this._addToMoves(n, r),
            n
          );
        }
        _moveAfter(n, t, r) {
          return (
            this._unlink(n),
            this._insertAfter(n, t, r),
            this._addToMoves(n, r),
            n
          );
        }
        _addAfter(n, t, r) {
          return (
            this._insertAfter(n, t, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = n)
                : (this._additionsTail._nextAdded = n)),
            n
          );
        }
        _insertAfter(n, t, r) {
          const i = null === t ? this._itHead : t._next;
          return (
            (n._next = i),
            (n._prev = t),
            null === i ? (this._itTail = n) : (i._prev = n),
            null === t ? (this._itHead = n) : (t._next = n),
            null === this._linkedRecords && (this._linkedRecords = new qb()),
            this._linkedRecords.put(n),
            (n.currentIndex = r),
            n
          );
        }
        _remove(n) {
          return this._addToRemovals(this._unlink(n));
        }
        _unlink(n) {
          null !== this._linkedRecords && this._linkedRecords.remove(n);
          const t = n._prev,
            r = n._next;
          return (
            null === t ? (this._itHead = r) : (t._next = r),
            null === r ? (this._itTail = t) : (r._prev = t),
            n
          );
        }
        _addToMoves(n, t) {
          return (
            n.previousIndex === t ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = n)
                  : (this._movesTail._nextMoved = n)),
            n
          );
        }
        _addToRemovals(n) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new qb()),
            this._unlinkedRecords.put(n),
            (n.currentIndex = null),
            (n._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = n),
                (n._prevRemoved = null))
              : ((n._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = n)),
            n
          );
        }
        _addIdentityChange(n, t) {
          return (
            (n.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = n)
                : (this._identityChangesTail._nextIdentityChange = n)),
            n
          );
        }
      }
      class VP {
        constructor(n, t) {
          (this.item = n),
            (this.trackById = t),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class BP {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(n) {
          null === this._head
            ? ((this._head = this._tail = n),
              (n._nextDup = null),
              (n._prevDup = null))
            : ((this._tail._nextDup = n),
              (n._prevDup = this._tail),
              (n._nextDup = null),
              (this._tail = n));
        }
        get(n, t) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === t || t <= r.currentIndex) &&
              Object.is(r.trackById, n)
            )
              return r;
          return null;
        }
        remove(n) {
          const t = n._prevDup,
            r = n._nextDup;
          return (
            null === t ? (this._head = r) : (t._nextDup = r),
            null === r ? (this._tail = t) : (r._prevDup = t),
            null === this._head
          );
        }
      }
      class qb {
        constructor() {
          this.map = new Map();
        }
        put(n) {
          const t = n.trackById;
          let r = this.map.get(t);
          r || ((r = new BP()), this.map.set(t, r)), r.add(n);
        }
        get(n, t) {
          const i = this.map.get(n);
          return i ? i.get(n, t) : null;
        }
        remove(n) {
          const t = n.trackById;
          return this.map.get(t).remove(n) && this.map.delete(t), n;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Yb(e, n, t) {
        const r = e.previousIndex;
        if (null === r) return r;
        let i = 0;
        return t && r < t.length && (i = t[r]), r + n + i;
      }
      function Zb() {
        return new Ac([new Wb()]);
      }
      let Ac = (() => {
        class e {
          constructor(t) {
            this.factories = t;
          }
          static create(t, r) {
            if (null != r) {
              const i = r.factories.slice();
              t = t.concat(i);
            }
            return new e(t);
          }
          static extend(t) {
            return {
              provide: e,
              useFactory: (r) => e.create(t, r || Zb()),
              deps: [[e, new Vs(), new Ls()]],
            };
          }
          find(t) {
            const r = this.factories.find((i) => i.supports(t));
            if (null != r) return r;
            throw new A(901, !1);
          }
        }
        return (e.ɵprov = P({ token: e, providedIn: "root", factory: Zb })), e;
      })();
      const GP = Fb(null, "core", []);
      let zP = (() => {
        class e {
          constructor(t) {}
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(k(Go));
          }),
          (e.ɵmod = xe({ type: e })),
          (e.ɵinj = Ae({})),
          e
        );
      })();
      function Hh(e, n) {
        const t = Se(e),
          r = n.elementInjector || ec();
        return new Ks(t).create(
          r,
          n.projectableNodes,
          n.hostElement,
          n.environmentInjector,
        );
      }
      let jh = null;
      function Ar() {
        return jh;
      }
      class YP {}
      const nt = new $("DocumentToken");
      let $h = (() => {
        class e {
          historyGo(t) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = P({
            token: e,
            factory: function () {
              return (function JP() {
                return k(Qb);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const ZP = new $("Location Initialized");
      let Qb = (() => {
        class e extends $h {
          constructor(t) {
            super(),
              (this._doc = t),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Ar().getBaseHref(this._doc);
          }
          onPopState(t) {
            const r = Ar().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", t, !1),
              () => r.removeEventListener("popstate", t)
            );
          }
          onHashChange(t) {
            const r = Ar().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", t, !1),
              () => r.removeEventListener("hashchange", t)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(t) {
            this._location.pathname = t;
          }
          pushState(t, r, i) {
            Xb() ? this._history.pushState(t, r, i) : (this._location.hash = i);
          }
          replaceState(t, r, i) {
            Xb()
              ? this._history.replaceState(t, r, i)
              : (this._location.hash = i);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(t = 0) {
            this._history.go(t);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(k(nt));
          }),
          (e.ɵprov = P({
            token: e,
            factory: function () {
              return (function KP() {
                return new Qb(k(nt));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function Xb() {
        return !!window.history.pushState;
      }
      function Uh(e, n) {
        if (0 == e.length) return n;
        if (0 == n.length) return e;
        let t = 0;
        return (
          e.endsWith("/") && t++,
          n.startsWith("/") && t++,
          2 == t ? e + n.substring(1) : 1 == t ? e + n : e + "/" + n
        );
      }
      function eD(e) {
        const n = e.match(/#|\?|$/),
          t = (n && n.index) || e.length;
        return e.slice(0, t - ("/" === e[t - 1] ? 1 : 0)) + e.slice(t);
      }
      function Rr(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Ti = (() => {
        class e {
          historyGo(t) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = P({
            token: e,
            factory: function () {
              return X(nD);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const tD = new $("appBaseHref");
      let nD = (() => {
          class e extends Ti {
            constructor(t, r) {
              super(),
                (this._platformLocation = t),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  X(nt).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t),
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return Uh(this._baseHref, t);
            }
            path(t = !1) {
              const r =
                  this._platformLocation.pathname +
                  Rr(this._platformLocation.search),
                i = this._platformLocation.hash;
              return i && t ? `${r}${i}` : r;
            }
            pushState(t, r, i, o) {
              const s = this.prepareExternalUrl(i + Rr(o));
              this._platformLocation.pushState(t, r, s);
            }
            replaceState(t, r, i, o) {
              const s = this.prepareExternalUrl(i + Rr(o));
              this._platformLocation.replaceState(t, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(t = 0) {
              this._platformLocation.historyGo?.(t);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k($h), k(tD, 8));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        QP = (() => {
          class e extends Ti {
            constructor(t, r) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t),
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(t) {
              const r = Uh(this._baseHref, t);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(t, r, i, o) {
              let s = this.prepareExternalUrl(i + Rr(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(t, r, s);
            }
            replaceState(t, r, i, o) {
              let s = this.prepareExternalUrl(i + Rr(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(t = 0) {
              this._platformLocation.historyGo?.(t);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k($h), k(tD, 8));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Gh = (() => {
          class e {
            constructor(t) {
              (this._subject = new U()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = t);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function tx(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, t] = e.split(/\/\/[^\/]+/);
                  return t;
                }
                return e;
              })(eD(rD(r)))),
                this._locationStrategy.onPopState((i) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: i.state,
                    type: i.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(t = !1) {
              return this.normalize(this._locationStrategy.path(t));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(t, r = "") {
              return this.path() == this.normalize(t + Rr(r));
            }
            normalize(t) {
              return e.stripTrailingSlash(
                (function ex(e, n) {
                  if (!e || !n.startsWith(e)) return n;
                  const t = n.substring(e.length);
                  return "" === t || ["/", ";", "?", "#"].includes(t[0])
                    ? t
                    : n;
                })(this._basePath, rD(t)),
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._locationStrategy.prepareExternalUrl(t)
              );
            }
            go(t, r = "", i = null) {
              this._locationStrategy.pushState(i, "", t, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + Rr(r)),
                  i,
                );
            }
            replaceState(t, r = "", i = null) {
              this._locationStrategy.replaceState(i, "", t, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + Rr(r)),
                  i,
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(t = 0) {
              this._locationStrategy.historyGo?.(t);
            }
            onUrlChange(t) {
              return (
                this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(t);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(t = "", r) {
              this._urlChangeListeners.forEach((i) => i(t, r));
            }
            subscribe(t, r, i) {
              return this._subject.subscribe({
                next: t,
                error: r,
                complete: i,
              });
            }
          }
          return (
            (e.normalizeQueryParams = Rr),
            (e.joinWithSlash = Uh),
            (e.stripTrailingSlash = eD),
            (e.ɵfac = function (t) {
              return new (t || e)(k(Ti));
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return (function XP() {
                  return new Gh(k(Ti));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function rD(e) {
        return e.replace(/\/index.html$/, "");
      }
      var un = (() => (
          ((un = un || {})[(un.Decimal = 0)] = "Decimal"),
          (un[(un.Percent = 1)] = "Percent"),
          (un[(un.Currency = 2)] = "Currency"),
          (un[(un.Scientific = 3)] = "Scientific"),
          un
        ))(),
        ze = (() => (
          ((ze = ze || {})[(ze.Format = 0)] = "Format"),
          (ze[(ze.Standalone = 1)] = "Standalone"),
          ze
        ))(),
        ie = (() => (
          ((ie = ie || {})[(ie.Narrow = 0)] = "Narrow"),
          (ie[(ie.Abbreviated = 1)] = "Abbreviated"),
          (ie[(ie.Wide = 2)] = "Wide"),
          (ie[(ie.Short = 3)] = "Short"),
          ie
        ))(),
        Ze = (() => (
          ((Ze = Ze || {})[(Ze.Short = 0)] = "Short"),
          (Ze[(Ze.Medium = 1)] = "Medium"),
          (Ze[(Ze.Long = 2)] = "Long"),
          (Ze[(Ze.Full = 3)] = "Full"),
          Ze
        ))(),
        q = (() => (
          ((q = q || {})[(q.Decimal = 0)] = "Decimal"),
          (q[(q.Group = 1)] = "Group"),
          (q[(q.List = 2)] = "List"),
          (q[(q.PercentSign = 3)] = "PercentSign"),
          (q[(q.PlusSign = 4)] = "PlusSign"),
          (q[(q.MinusSign = 5)] = "MinusSign"),
          (q[(q.Exponential = 6)] = "Exponential"),
          (q[(q.SuperscriptingExponent = 7)] = "SuperscriptingExponent"),
          (q[(q.PerMille = 8)] = "PerMille"),
          (q[(q.Infinity = 9)] = "Infinity"),
          (q[(q.NaN = 10)] = "NaN"),
          (q[(q.TimeSeparator = 11)] = "TimeSeparator"),
          (q[(q.CurrencyDecimal = 12)] = "CurrencyDecimal"),
          (q[(q.CurrencyGroup = 13)] = "CurrencyGroup"),
          q
        ))();
      function oD(e, n, t) {
        const r = Kt(e),
          o = Vn([r[V.DayPeriodsFormat], r[V.DayPeriodsStandalone]], n);
        return Vn(o, t);
      }
      function sD(e, n, t) {
        const r = Kt(e),
          o = Vn([r[V.DaysFormat], r[V.DaysStandalone]], n);
        return Vn(o, t);
      }
      function zh(e, n, t) {
        const r = Kt(e),
          o = Vn([r[V.MonthsFormat], r[V.MonthsStandalone]], n);
        return Vn(o, t);
      }
      function Rc(e, n) {
        return Vn(Kt(e)[V.DateFormat], n);
      }
      function Pc(e, n) {
        return Vn(Kt(e)[V.TimeFormat], n);
      }
      function xc(e, n) {
        return Vn(Kt(e)[V.DateTimeFormat], n);
      }
      function Ln(e, n) {
        const t = Kt(e),
          r = t[V.NumberSymbols][n];
        if (typeof r > "u") {
          if (n === q.CurrencyDecimal) return t[V.NumberSymbols][q.Decimal];
          if (n === q.CurrencyGroup) return t[V.NumberSymbols][q.Group];
        }
        return r;
      }
      function aD(e) {
        if (!e[V.ExtraData])
          throw new Error(
            `Missing extra locale data for the locale "${e[V.LocaleId]}". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`,
          );
      }
      function Vn(e, n) {
        for (let t = n; t > -1; t--) if (typeof e[t] < "u") return e[t];
        throw new Error("Locale data API: locale data undefined");
      }
      function qh(e) {
        const [n, t] = e.split(":");
        return { hours: +n, minutes: +t };
      }
      const dx =
          /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
        _a = {},
        fx =
          /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;
      var Ct = (() => (
          ((Ct = Ct || {})[(Ct.Short = 0)] = "Short"),
          (Ct[(Ct.ShortGMT = 1)] = "ShortGMT"),
          (Ct[(Ct.Long = 2)] = "Long"),
          (Ct[(Ct.Extended = 3)] = "Extended"),
          Ct
        ))(),
        K = (() => (
          ((K = K || {})[(K.FullYear = 0)] = "FullYear"),
          (K[(K.Month = 1)] = "Month"),
          (K[(K.Date = 2)] = "Date"),
          (K[(K.Hours = 3)] = "Hours"),
          (K[(K.Minutes = 4)] = "Minutes"),
          (K[(K.Seconds = 5)] = "Seconds"),
          (K[(K.FractionalSeconds = 6)] = "FractionalSeconds"),
          (K[(K.Day = 7)] = "Day"),
          K
        ))(),
        ae = (() => (
          ((ae = ae || {})[(ae.DayPeriods = 0)] = "DayPeriods"),
          (ae[(ae.Days = 1)] = "Days"),
          (ae[(ae.Months = 2)] = "Months"),
          (ae[(ae.Eras = 3)] = "Eras"),
          ae
        ))();
      function lD(e, n, t, r) {
        let i = (function Dx(e) {
          if (dD(e)) return e;
          if ("number" == typeof e && !isNaN(e)) return new Date(e);
          if ("string" == typeof e) {
            if (((e = e.trim()), /^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e))) {
              const [i, o = 1, s = 1] = e.split("-").map((a) => +a);
              return Fc(i, o - 1, s);
            }
            const t = parseFloat(e);
            if (!isNaN(e - t)) return new Date(t);
            let r;
            if ((r = e.match(dx)))
              return (function Cx(e) {
                const n = new Date(0);
                let t = 0,
                  r = 0;
                const i = e[8] ? n.setUTCFullYear : n.setFullYear,
                  o = e[8] ? n.setUTCHours : n.setHours;
                e[9] &&
                  ((t = Number(e[9] + e[10])), (r = Number(e[9] + e[11]))),
                  i.call(n, Number(e[1]), Number(e[2]) - 1, Number(e[3]));
                const s = Number(e[4] || 0) - t,
                  a = Number(e[5] || 0) - r,
                  l = Number(e[6] || 0),
                  c = Math.floor(1e3 * parseFloat("0." + (e[7] || 0)));
                return o.call(n, s, a, l, c), n;
              })(r);
          }
          const n = new Date(e);
          if (!dD(n)) throw new Error(`Unable to convert "${e}" into a date`);
          return n;
        })(e);
        n = Pr(t, n) || n;
        let a,
          s = [];
        for (; n; ) {
          if (((a = fx.exec(n)), !a)) {
            s.push(n);
            break;
          }
          {
            s = s.concat(a.slice(1));
            const u = s.pop();
            if (!u) break;
            n = u;
          }
        }
        let l = i.getTimezoneOffset();
        r &&
          ((l = uD(r, l)),
          (i = (function bx(e, n, t) {
            const r = t ? -1 : 1,
              i = e.getTimezoneOffset();
            return (function yx(e, n) {
              return (
                (e = new Date(e.getTime())).setMinutes(e.getMinutes() + n), e
              );
            })(e, r * (uD(n, i) - i));
          })(i, r, !0)));
        let c = "";
        return (
          s.forEach((u) => {
            const d = (function vx(e) {
              if (Jh[e]) return Jh[e];
              let n;
              switch (e) {
                case "G":
                case "GG":
                case "GGG":
                  n = He(ae.Eras, ie.Abbreviated);
                  break;
                case "GGGG":
                  n = He(ae.Eras, ie.Wide);
                  break;
                case "GGGGG":
                  n = He(ae.Eras, ie.Narrow);
                  break;
                case "y":
                  n = pt(K.FullYear, 1, 0, !1, !0);
                  break;
                case "yy":
                  n = pt(K.FullYear, 2, 0, !0, !0);
                  break;
                case "yyy":
                  n = pt(K.FullYear, 3, 0, !1, !0);
                  break;
                case "yyyy":
                  n = pt(K.FullYear, 4, 0, !1, !0);
                  break;
                case "Y":
                  n = Bc(1);
                  break;
                case "YY":
                  n = Bc(2, !0);
                  break;
                case "YYY":
                  n = Bc(3);
                  break;
                case "YYYY":
                  n = Bc(4);
                  break;
                case "M":
                case "L":
                  n = pt(K.Month, 1, 1);
                  break;
                case "MM":
                case "LL":
                  n = pt(K.Month, 2, 1);
                  break;
                case "MMM":
                  n = He(ae.Months, ie.Abbreviated);
                  break;
                case "MMMM":
                  n = He(ae.Months, ie.Wide);
                  break;
                case "MMMMM":
                  n = He(ae.Months, ie.Narrow);
                  break;
                case "LLL":
                  n = He(ae.Months, ie.Abbreviated, ze.Standalone);
                  break;
                case "LLLL":
                  n = He(ae.Months, ie.Wide, ze.Standalone);
                  break;
                case "LLLLL":
                  n = He(ae.Months, ie.Narrow, ze.Standalone);
                  break;
                case "w":
                  n = Yh(1);
                  break;
                case "ww":
                  n = Yh(2);
                  break;
                case "W":
                  n = Yh(1, !0);
                  break;
                case "d":
                  n = pt(K.Date, 1);
                  break;
                case "dd":
                  n = pt(K.Date, 2);
                  break;
                case "c":
                case "cc":
                  n = pt(K.Day, 1);
                  break;
                case "ccc":
                  n = He(ae.Days, ie.Abbreviated, ze.Standalone);
                  break;
                case "cccc":
                  n = He(ae.Days, ie.Wide, ze.Standalone);
                  break;
                case "ccccc":
                  n = He(ae.Days, ie.Narrow, ze.Standalone);
                  break;
                case "cccccc":
                  n = He(ae.Days, ie.Short, ze.Standalone);
                  break;
                case "E":
                case "EE":
                case "EEE":
                  n = He(ae.Days, ie.Abbreviated);
                  break;
                case "EEEE":
                  n = He(ae.Days, ie.Wide);
                  break;
                case "EEEEE":
                  n = He(ae.Days, ie.Narrow);
                  break;
                case "EEEEEE":
                  n = He(ae.Days, ie.Short);
                  break;
                case "a":
                case "aa":
                case "aaa":
                  n = He(ae.DayPeriods, ie.Abbreviated);
                  break;
                case "aaaa":
                  n = He(ae.DayPeriods, ie.Wide);
                  break;
                case "aaaaa":
                  n = He(ae.DayPeriods, ie.Narrow);
                  break;
                case "b":
                case "bb":
                case "bbb":
                  n = He(ae.DayPeriods, ie.Abbreviated, ze.Standalone, !0);
                  break;
                case "bbbb":
                  n = He(ae.DayPeriods, ie.Wide, ze.Standalone, !0);
                  break;
                case "bbbbb":
                  n = He(ae.DayPeriods, ie.Narrow, ze.Standalone, !0);
                  break;
                case "B":
                case "BB":
                case "BBB":
                  n = He(ae.DayPeriods, ie.Abbreviated, ze.Format, !0);
                  break;
                case "BBBB":
                  n = He(ae.DayPeriods, ie.Wide, ze.Format, !0);
                  break;
                case "BBBBB":
                  n = He(ae.DayPeriods, ie.Narrow, ze.Format, !0);
                  break;
                case "h":
                  n = pt(K.Hours, 1, -12);
                  break;
                case "hh":
                  n = pt(K.Hours, 2, -12);
                  break;
                case "H":
                  n = pt(K.Hours, 1);
                  break;
                case "HH":
                  n = pt(K.Hours, 2);
                  break;
                case "m":
                  n = pt(K.Minutes, 1);
                  break;
                case "mm":
                  n = pt(K.Minutes, 2);
                  break;
                case "s":
                  n = pt(K.Seconds, 1);
                  break;
                case "ss":
                  n = pt(K.Seconds, 2);
                  break;
                case "S":
                  n = pt(K.FractionalSeconds, 1);
                  break;
                case "SS":
                  n = pt(K.FractionalSeconds, 2);
                  break;
                case "SSS":
                  n = pt(K.FractionalSeconds, 3);
                  break;
                case "Z":
                case "ZZ":
                case "ZZZ":
                  n = Lc(Ct.Short);
                  break;
                case "ZZZZZ":
                  n = Lc(Ct.Extended);
                  break;
                case "O":
                case "OO":
                case "OOO":
                case "z":
                case "zz":
                case "zzz":
                  n = Lc(Ct.ShortGMT);
                  break;
                case "OOOO":
                case "ZZZZ":
                case "zzzz":
                  n = Lc(Ct.Long);
                  break;
                default:
                  return null;
              }
              return (Jh[e] = n), n;
            })(u);
            c += d
              ? d(i, t, l)
              : "''" === u
                ? "'"
                : u.replace(/(^'|'$)/g, "").replace(/''/g, "'");
          }),
          c
        );
      }
      function Fc(e, n, t) {
        const r = new Date(0);
        return r.setFullYear(e, n, t), r.setHours(0, 0, 0), r;
      }
      function Pr(e, n) {
        const t = (function nx(e) {
          return Kt(e)[V.LocaleId];
        })(e);
        if (((_a[t] = _a[t] || {}), _a[t][n])) return _a[t][n];
        let r = "";
        switch (n) {
          case "shortDate":
            r = Rc(e, Ze.Short);
            break;
          case "mediumDate":
            r = Rc(e, Ze.Medium);
            break;
          case "longDate":
            r = Rc(e, Ze.Long);
            break;
          case "fullDate":
            r = Rc(e, Ze.Full);
            break;
          case "shortTime":
            r = Pc(e, Ze.Short);
            break;
          case "mediumTime":
            r = Pc(e, Ze.Medium);
            break;
          case "longTime":
            r = Pc(e, Ze.Long);
            break;
          case "fullTime":
            r = Pc(e, Ze.Full);
            break;
          case "short":
            const i = Pr(e, "shortTime"),
              o = Pr(e, "shortDate");
            r = kc(xc(e, Ze.Short), [i, o]);
            break;
          case "medium":
            const s = Pr(e, "mediumTime"),
              a = Pr(e, "mediumDate");
            r = kc(xc(e, Ze.Medium), [s, a]);
            break;
          case "long":
            const l = Pr(e, "longTime"),
              c = Pr(e, "longDate");
            r = kc(xc(e, Ze.Long), [l, c]);
            break;
          case "full":
            const u = Pr(e, "fullTime"),
              d = Pr(e, "fullDate");
            r = kc(xc(e, Ze.Full), [u, d]);
        }
        return r && (_a[t][n] = r), r;
      }
      function kc(e, n) {
        return (
          n &&
            (e = e.replace(/\{([^}]+)}/g, function (t, r) {
              return null != n && r in n ? n[r] : t;
            })),
          e
        );
      }
      function Kn(e, n, t = "-", r, i) {
        let o = "";
        (e < 0 || (i && e <= 0)) && (i ? (e = 1 - e) : ((e = -e), (o = t)));
        let s = String(e);
        for (; s.length < n; ) s = "0" + s;
        return r && (s = s.slice(s.length - n)), o + s;
      }
      function pt(e, n, t = 0, r = !1, i = !1) {
        return function (o, s) {
          let a = (function px(e, n) {
            switch (e) {
              case K.FullYear:
                return n.getFullYear();
              case K.Month:
                return n.getMonth();
              case K.Date:
                return n.getDate();
              case K.Hours:
                return n.getHours();
              case K.Minutes:
                return n.getMinutes();
              case K.Seconds:
                return n.getSeconds();
              case K.FractionalSeconds:
                return n.getMilliseconds();
              case K.Day:
                return n.getDay();
              default:
                throw new Error(`Unknown DateType value "${e}".`);
            }
          })(e, o);
          if (((t > 0 || a > -t) && (a += t), e === K.Hours))
            0 === a && -12 === t && (a = 12);
          else if (e === K.FractionalSeconds)
            return (function hx(e, n) {
              return Kn(e, 3).substring(0, n);
            })(a, n);
          const l = Ln(s, q.MinusSign);
          return Kn(a, n, l, r, i);
        };
      }
      function He(e, n, t = ze.Format, r = !1) {
        return function (i, o) {
          return (function gx(e, n, t, r, i, o) {
            switch (t) {
              case ae.Months:
                return zh(n, i, r)[e.getMonth()];
              case ae.Days:
                return sD(n, i, r)[e.getDay()];
              case ae.DayPeriods:
                const s = e.getHours(),
                  a = e.getMinutes();
                if (o) {
                  const c = (function sx(e) {
                      const n = Kt(e);
                      return (
                        aD(n),
                        (n[V.ExtraData][2] || []).map((r) =>
                          "string" == typeof r ? qh(r) : [qh(r[0]), qh(r[1])],
                        )
                      );
                    })(n),
                    u = (function ax(e, n, t) {
                      const r = Kt(e);
                      aD(r);
                      const o =
                        Vn([r[V.ExtraData][0], r[V.ExtraData][1]], n) || [];
                      return Vn(o, t) || [];
                    })(n, i, r),
                    d = c.findIndex((f) => {
                      if (Array.isArray(f)) {
                        const [h, p] = f,
                          m = s >= h.hours && a >= h.minutes,
                          v = s < p.hours || (s === p.hours && a < p.minutes);
                        if (h.hours < p.hours) {
                          if (m && v) return !0;
                        } else if (m || v) return !0;
                      } else if (f.hours === s && f.minutes === a) return !0;
                      return !1;
                    });
                  if (-1 !== d) return u[d];
                }
                return oD(n, i, r)[s < 12 ? 0 : 1];
              case ae.Eras:
                return (function rx(e, n) {
                  return Vn(Kt(e)[V.Eras], n);
                })(n, r)[e.getFullYear() <= 0 ? 0 : 1];
              default:
                throw new Error(`unexpected translation type ${t}`);
            }
          })(i, o, e, n, t, r);
        };
      }
      function Lc(e) {
        return function (n, t, r) {
          const i = -1 * r,
            o = Ln(t, q.MinusSign),
            s = i > 0 ? Math.floor(i / 60) : Math.ceil(i / 60);
          switch (e) {
            case Ct.Short:
              return (
                (i >= 0 ? "+" : "") + Kn(s, 2, o) + Kn(Math.abs(i % 60), 2, o)
              );
            case Ct.ShortGMT:
              return "GMT" + (i >= 0 ? "+" : "") + Kn(s, 1, o);
            case Ct.Long:
              return (
                "GMT" +
                (i >= 0 ? "+" : "") +
                Kn(s, 2, o) +
                ":" +
                Kn(Math.abs(i % 60), 2, o)
              );
            case Ct.Extended:
              return 0 === r
                ? "Z"
                : (i >= 0 ? "+" : "") +
                    Kn(s, 2, o) +
                    ":" +
                    Kn(Math.abs(i % 60), 2, o);
            default:
              throw new Error(`Unknown zone width "${e}"`);
          }
        };
      }
      const mx = 0,
        Vc = 4;
      function cD(e) {
        return Fc(
          e.getFullYear(),
          e.getMonth(),
          e.getDate() + (Vc - e.getDay()),
        );
      }
      function Yh(e, n = !1) {
        return function (t, r) {
          let i;
          if (n) {
            const o = new Date(t.getFullYear(), t.getMonth(), 1).getDay() - 1,
              s = t.getDate();
            i = 1 + Math.floor((s + o) / 7);
          } else {
            const o = cD(t),
              s = (function _x(e) {
                const n = Fc(e, mx, 1).getDay();
                return Fc(e, 0, 1 + (n <= Vc ? Vc : Vc + 7) - n);
              })(o.getFullYear()),
              a = o.getTime() - s.getTime();
            i = 1 + Math.round(a / 6048e5);
          }
          return Kn(i, e, Ln(r, q.MinusSign));
        };
      }
      function Bc(e, n = !1) {
        return function (t, r) {
          return Kn(cD(t).getFullYear(), e, Ln(r, q.MinusSign), n);
        };
      }
      const Jh = {};
      function uD(e, n) {
        e = e.replace(/:/g, "");
        const t = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
        return isNaN(t) ? n : t;
      }
      function dD(e) {
        return e instanceof Date && !isNaN(e.valueOf());
      }
      const wx = /^(\d+)?\.((\d+)(-(\d+))?)?$/,
        fD = 22,
        Hc = ".",
        va = "0",
        Ex = ";",
        Sx = ",",
        Zh = "#";
      function Xh(e) {
        const n = parseInt(e);
        if (isNaN(n))
          throw new Error("Invalid integer literal when parsing " + e);
        return n;
      }
      function gD(e, n) {
        n = encodeURIComponent(n);
        for (const t of e.split(";")) {
          const r = t.indexOf("="),
            [i, o] = -1 == r ? [t, ""] : [t.slice(0, r), t.slice(r + 1)];
          if (i.trim() === n) return decodeURIComponent(o);
        }
        return null;
      }
      class kx {
        constructor(n, t, r, i) {
          (this.$implicit = n),
            (this.ngForOf = t),
            (this.index = r),
            (this.count = i);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Bn = (() => {
        class e {
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            this._trackByFn = t;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(t, r, i) {
            (this._viewContainer = t),
              (this._template = r),
              (this._differs = i),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const t = this._ngForOf;
              !this._differ &&
                t &&
                (this._differ = this._differs
                  .find(t)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const r = this._viewContainer;
            t.forEachOperation((i, o, s) => {
              if (null == i.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new kx(i.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s,
                );
              else if (null == s) r.remove(null === o ? void 0 : o);
              else if (null !== o) {
                const a = r.get(o);
                r.move(a, s), yD(a, i);
              }
            });
            for (let i = 0, o = r.length; i < o; i++) {
              const a = r.get(i).context;
              (a.index = i), (a.count = o), (a.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((i) => {
              yD(r.get(i.currentIndex), i);
            });
          }
          static ngTemplateContextGuard(t, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(g(kn), g(Ve), g(Ac));
          }),
          (e.ɵdir = x({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function yD(e, n) {
        e.context.$implicit = n.item;
      }
      let dn = (() => {
        class e {
          constructor(t, r) {
            (this._viewContainer = t),
              (this._context = new Vx()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            bD("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            bD("ngIfElse", t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context,
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context,
                  )));
          }
          static ngTemplateContextGuard(t, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(g(kn), g(Ve));
          }),
          (e.ɵdir = x({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          e
        );
      })();
      class Vx {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function bD(e, n) {
        if (n && !n.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${ke(n)}'.`,
          );
      }
      let xr = (() => {
        class e {
          constructor(t) {
            (this._viewContainerRef = t),
              (this._viewRef = null),
              (this.ngTemplateOutletContext = null),
              (this.ngTemplateOutlet = null),
              (this.ngTemplateOutletInjector = null);
          }
          ngOnChanges(t) {
            if (t.ngTemplateOutlet || t.ngTemplateOutletInjector) {
              const r = this._viewContainerRef;
              if (
                (this._viewRef && r.remove(r.indexOf(this._viewRef)),
                this.ngTemplateOutlet)
              ) {
                const {
                  ngTemplateOutlet: i,
                  ngTemplateOutletContext: o,
                  ngTemplateOutletInjector: s,
                } = this;
                this._viewRef = r.createEmbeddedView(
                  i,
                  o,
                  s ? { injector: s } : void 0,
                );
              } else this._viewRef = null;
            } else
              this._viewRef &&
                t.ngTemplateOutletContext &&
                this.ngTemplateOutletContext &&
                (this._viewRef.context = this.ngTemplateOutletContext);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(g(kn));
          }),
          (e.ɵdir = x({
            type: e,
            selectors: [["", "ngTemplateOutlet", ""]],
            inputs: {
              ngTemplateOutletContext: "ngTemplateOutletContext",
              ngTemplateOutlet: "ngTemplateOutlet",
              ngTemplateOutletInjector: "ngTemplateOutletInjector",
            },
            standalone: !0,
            features: [Xe],
          })),
          e
        );
      })();
      let wD = (() => {
        class e {
          constructor(t) {
            this._locale = t;
          }
          transform(t, r, i) {
            if (
              !(function ip(e) {
                return !(null == e || "" === e || e != e);
              })(t)
            )
              return null;
            i = i || this._locale;
            try {
              return (function Nx(e, n, t) {
                return (function Kh(e, n, t, r, i, o, s = !1) {
                  let a = "",
                    l = !1;
                  if (isFinite(e)) {
                    let c = (function Ax(e) {
                      let r,
                        i,
                        o,
                        s,
                        a,
                        n = Math.abs(e) + "",
                        t = 0;
                      for (
                        (i = n.indexOf(Hc)) > -1 && (n = n.replace(Hc, "")),
                          (o = n.search(/e/i)) > 0
                            ? (i < 0 && (i = o),
                              (i += +n.slice(o + 1)),
                              (n = n.substring(0, o)))
                            : i < 0 && (i = n.length),
                          o = 0;
                        n.charAt(o) === va;
                        o++
                      );
                      if (o === (a = n.length)) (r = [0]), (i = 1);
                      else {
                        for (a--; n.charAt(a) === va; ) a--;
                        for (i -= o, r = [], s = 0; o <= a; o++, s++)
                          r[s] = Number(n.charAt(o));
                      }
                      return (
                        i > fD &&
                          ((r = r.splice(0, fD - 1)), (t = i - 1), (i = 1)),
                        { digits: r, exponent: t, integerLen: i }
                      );
                    })(e);
                    s &&
                      (c = (function Ox(e) {
                        if (0 === e.digits[0]) return e;
                        const n = e.digits.length - e.integerLen;
                        return (
                          e.exponent
                            ? (e.exponent += 2)
                            : (0 === n
                                ? e.digits.push(0, 0)
                                : 1 === n && e.digits.push(0),
                              (e.integerLen += 2)),
                          e
                        );
                      })(c));
                    let u = n.minInt,
                      d = n.minFrac,
                      f = n.maxFrac;
                    if (o) {
                      const w = o.match(wx);
                      if (null === w)
                        throw new Error(`${o} is not a valid digit info`);
                      const D = w[1],
                        O = w[3],
                        j = w[5];
                      null != D && (u = Xh(D)),
                        null != O && (d = Xh(O)),
                        null != j ? (f = Xh(j)) : null != O && d > f && (f = d);
                    }
                    !(function Rx(e, n, t) {
                      if (n > t)
                        throw new Error(
                          `The minimum number of digits after fraction (${n}) is higher than the maximum (${t}).`,
                        );
                      let r = e.digits,
                        i = r.length - e.integerLen;
                      const o = Math.min(Math.max(n, i), t);
                      let s = o + e.integerLen,
                        a = r[s];
                      if (s > 0) {
                        r.splice(Math.max(e.integerLen, s));
                        for (let d = s; d < r.length; d++) r[d] = 0;
                      } else {
                        (i = Math.max(0, i)),
                          (e.integerLen = 1),
                          (r.length = Math.max(1, (s = o + 1))),
                          (r[0] = 0);
                        for (let d = 1; d < s; d++) r[d] = 0;
                      }
                      if (a >= 5)
                        if (s - 1 < 0) {
                          for (let d = 0; d > s; d--)
                            r.unshift(0), e.integerLen++;
                          r.unshift(1), e.integerLen++;
                        } else r[s - 1]++;
                      for (; i < Math.max(0, o); i++) r.push(0);
                      let l = 0 !== o;
                      const c = n + e.integerLen,
                        u = r.reduceRight(function (d, f, h, p) {
                          return (
                            (p[h] = (f += d) < 10 ? f : f - 10),
                            l && (0 === p[h] && h >= c ? p.pop() : (l = !1)),
                            f >= 10 ? 1 : 0
                          );
                        }, 0);
                      u && (r.unshift(u), e.integerLen++);
                    })(c, d, f);
                    let h = c.digits,
                      p = c.integerLen;
                    const m = c.exponent;
                    let v = [];
                    for (l = h.every((w) => !w); p < u; p++) h.unshift(0);
                    for (; p < 0; p++) h.unshift(0);
                    p > 0 ? (v = h.splice(p, h.length)) : ((v = h), (h = [0]));
                    const b = [];
                    for (
                      h.length >= n.lgSize &&
                      b.unshift(h.splice(-n.lgSize, h.length).join(""));
                      h.length > n.gSize;

                    )
                      b.unshift(h.splice(-n.gSize, h.length).join(""));
                    h.length && b.unshift(h.join("")),
                      (a = b.join(Ln(t, r))),
                      v.length && (a += Ln(t, i) + v.join("")),
                      m && (a += Ln(t, q.Exponential) + "+" + m);
                  } else a = Ln(t, q.Infinity);
                  return (
                    (a =
                      e < 0 && !l
                        ? n.negPre + a + n.negSuf
                        : n.posPre + a + n.posSuf),
                    a
                  );
                })(
                  e,
                  (function Qh(e, n = "-") {
                    const t = {
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 0,
                        posPre: "",
                        posSuf: "",
                        negPre: "",
                        negSuf: "",
                        gSize: 0,
                        lgSize: 0,
                      },
                      r = e.split(Ex),
                      i = r[0],
                      o = r[1],
                      s =
                        -1 !== i.indexOf(Hc)
                          ? i.split(Hc)
                          : [
                              i.substring(0, i.lastIndexOf(va) + 1),
                              i.substring(i.lastIndexOf(va) + 1),
                            ],
                      a = s[0],
                      l = s[1] || "";
                    t.posPre = a.substring(0, a.indexOf(Zh));
                    for (let u = 0; u < l.length; u++) {
                      const d = l.charAt(u);
                      d === va
                        ? (t.minFrac = t.maxFrac = u + 1)
                        : d === Zh
                          ? (t.maxFrac = u + 1)
                          : (t.posSuf += d);
                    }
                    const c = a.split(Sx);
                    if (
                      ((t.gSize = c[1] ? c[1].length : 0),
                      (t.lgSize = c[2] || c[1] ? (c[2] || c[1]).length : 0),
                      o)
                    ) {
                      const u = i.length - t.posPre.length - t.posSuf.length,
                        d = o.indexOf(Zh);
                      (t.negPre = o.substring(0, d).replace(/'/g, "")),
                        (t.negSuf = o.slice(d + u).replace(/'/g, ""));
                    } else (t.negPre = n + t.posPre), (t.negSuf = t.posSuf);
                    return t;
                  })(
                    (function Wh(e, n) {
                      return Kt(e)[V.NumberFormats][n];
                    })(n, un.Percent),
                    Ln(n, q.MinusSign),
                  ),
                  n,
                  q.Group,
                  q.Decimal,
                  t,
                  !0,
                ).replace(new RegExp("%", "g"), Ln(n, q.PercentSign));
              })(
                (function op(e) {
                  if ("string" == typeof e && !isNaN(Number(e) - parseFloat(e)))
                    return Number(e);
                  if ("number" != typeof e)
                    throw new Error(`${e} is not a number`);
                  return e;
                })(t),
                i,
                r,
              );
            } catch (o) {
              throw (function Qn(e, n) {
                return new A(2100, !1);
              })();
            }
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(g(Cn, 16));
          }),
          (e.ɵpipe = tn({
            name: "percent",
            type: e,
            pure: !0,
            standalone: !0,
          })),
          e
        );
      })();
      let uF = (() => {
        class e {}
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵmod = xe({ type: e })),
          (e.ɵinj = Ae({})),
          e
        );
      })();
      const ED = "browser";
      let gF = (() => {
        class e {}
        return (
          (e.ɵprov = P({
            token: e,
            providedIn: "root",
            factory: () => new mF(k(nt), window),
          })),
          e
        );
      })();
      class mF {
        constructor(n, t) {
          (this.document = n), (this.window = t), (this.offset = () => [0, 0]);
        }
        setOffset(n) {
          this.offset = Array.isArray(n) ? () => n : n;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(n) {
          this.supportsScrolling() && this.window.scrollTo(n[0], n[1]);
        }
        scrollToAnchor(n) {
          if (!this.supportsScrolling()) return;
          const t = (function _F(e, n) {
            const t = e.getElementById(n) || e.getElementsByName(n)[0];
            if (t) return t;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let i = r.currentNode;
              for (; i; ) {
                const o = i.shadowRoot;
                if (o) {
                  const s =
                    o.getElementById(n) || o.querySelector(`[name="${n}"]`);
                  if (s) return s;
                }
                i = r.nextNode();
              }
            }
            return null;
          })(this.document, n);
          t && (this.scrollToElement(t), t.focus());
        }
        setHistoryScrollRestoration(n) {
          if (this.supportScrollRestoration()) {
            const t = this.window.history;
            t && t.scrollRestoration && (t.scrollRestoration = n);
          }
        }
        scrollToElement(n) {
          const t = n.getBoundingClientRect(),
            r = t.left + this.window.pageXOffset,
            i = t.top + this.window.pageYOffset,
            o = this.offset();
          this.window.scrollTo(r - o[0], i - o[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const n =
              SD(this.window.history) ||
              SD(Object.getPrototypeOf(this.window.history));
            return !(!n || (!n.writable && !n.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function SD(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class TD {}
      class GF extends YP {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class lp extends GF {
        static makeCurrent() {
          !(function qP(e) {
            jh || (jh = e);
          })(new lp());
        }
        onAndCancel(n, t, r) {
          return (
            n.addEventListener(t, r, !1),
            () => {
              n.removeEventListener(t, r, !1);
            }
          );
        }
        dispatchEvent(n, t) {
          n.dispatchEvent(t);
        }
        remove(n) {
          n.parentNode && n.parentNode.removeChild(n);
        }
        createElement(n, t) {
          return (t = t || this.getDefaultDocument()).createElement(n);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(n) {
          return n.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(n) {
          return n instanceof DocumentFragment;
        }
        getGlobalEventTarget(n, t) {
          return "window" === t
            ? window
            : "document" === t
              ? n
              : "body" === t
                ? n.body
                : null;
        }
        getBaseHref(n) {
          const t = (function zF() {
            return (
              (ba = ba || document.querySelector("base")),
              ba ? ba.getAttribute("href") : null
            );
          })();
          return null == t
            ? null
            : (function WF(e) {
                (Uc = Uc || document.createElement("a")),
                  Uc.setAttribute("href", e);
                const n = Uc.pathname;
                return "/" === n.charAt(0) ? n : `/${n}`;
              })(t);
        }
        resetBaseElement() {
          ba = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(n) {
          return gD(document.cookie, n);
        }
      }
      let Uc,
        ba = null;
      const AD = new $("TRANSITION_ID"),
        YF = [
          {
            provide: Ec,
            useFactory: function qF(e, n, t) {
              return () => {
                t.get(Sc).donePromise.then(() => {
                  const r = Ar(),
                    i = n.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let o = 0; o < i.length; o++) r.remove(i[o]);
                });
              };
            },
            deps: [AD, nt, ln],
            multi: !0,
          },
        ];
      let ZF = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Gc = new $("EventManagerPlugins");
      let zc = (() => {
        class e {
          constructor(t, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              t.forEach((i) => {
                i.manager = this;
              }),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, r, i) {
            return this._findPluginFor(r).addEventListener(t, r, i);
          }
          addGlobalEventListener(t, r, i) {
            return this._findPluginFor(r).addGlobalEventListener(t, r, i);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const r = this._eventNameToPlugin.get(t);
            if (r) return r;
            const i = this._plugins;
            for (let o = 0; o < i.length; o++) {
              const s = i[o];
              if (s.supports(t)) return this._eventNameToPlugin.set(t, s), s;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(k(Gc), k(ve));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class RD {
        constructor(n) {
          this._doc = n;
        }
        addGlobalEventListener(n, t, r) {
          const i = Ar().getGlobalEventTarget(this._doc, n);
          if (!i)
            throw new Error(`Unsupported event target ${i} for event ${t}`);
          return this.addEventListener(i, t, r);
        }
      }
      let PD = (() => {
          class e {
            constructor() {
              this.usageCount = new Map();
            }
            addStyles(t) {
              for (const r of t)
                1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
            }
            removeStyles(t) {
              for (const r of t)
                0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r);
            }
            onStyleRemoved(t) {}
            onStyleAdded(t) {}
            getAllStyles() {
              return this.usageCount.keys();
            }
            changeUsageCount(t, r) {
              const i = this.usageCount;
              let o = i.get(t) ?? 0;
              return (o += r), o > 0 ? i.set(t, o) : i.delete(t), o;
            }
            ngOnDestroy() {
              for (const t of this.getAllStyles()) this.onStyleRemoved(t);
              this.usageCount.clear();
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Da = (() => {
          class e extends PD {
            constructor(t) {
              super(),
                (this.doc = t),
                (this.styleRef = new Map()),
                (this.hostNodes = new Set()),
                this.resetHostNodes();
            }
            onStyleAdded(t) {
              for (const r of this.hostNodes) this.addStyleToHost(r, t);
            }
            onStyleRemoved(t) {
              const r = this.styleRef;
              r.get(t)?.forEach((o) => o.remove()), r.delete(t);
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this.styleRef.clear(), this.resetHostNodes();
            }
            addHost(t) {
              this.hostNodes.add(t);
              for (const r of this.getAllStyles()) this.addStyleToHost(t, r);
            }
            removeHost(t) {
              this.hostNodes.delete(t);
            }
            addStyleToHost(t, r) {
              const i = this.doc.createElement("style");
              (i.textContent = r), t.appendChild(i);
              const o = this.styleRef.get(r);
              o ? o.push(i) : this.styleRef.set(r, [i]);
            }
            resetHostNodes() {
              const t = this.hostNodes;
              t.clear(), t.add(this.doc.head);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k(nt));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const cp = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        up = /%COMP%/g,
        kD = new $("RemoveStylesOnCompDestory", {
          providedIn: "root",
          factory: () => !1,
        });
      function LD(e, n) {
        return n.flat(100).map((t) => t.replace(up, e));
      }
      function VD(e) {
        return (n) => {
          if ("__ngUnwrap__" === n) return e;
          !1 === e(n) && (n.preventDefault(), (n.returnValue = !1));
        };
      }
      let dp = (() => {
        class e {
          constructor(t, r, i, o) {
            (this.eventManager = t),
              (this.sharedStylesHost = r),
              (this.appId = i),
              (this.removeStylesOnCompDestory = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new fp(t));
          }
          createRenderer(t, r) {
            if (!t || !r) return this.defaultRenderer;
            const i = this.getOrCreateRenderer(t, r);
            return (
              i instanceof jD
                ? i.applyToHost(t)
                : i instanceof hp && i.applyStyles(),
              i
            );
          }
          getOrCreateRenderer(t, r) {
            const i = this.rendererByCompId;
            let o = i.get(r.id);
            if (!o) {
              const s = this.eventManager,
                a = this.sharedStylesHost,
                l = this.removeStylesOnCompDestory;
              switch (r.encapsulation) {
                case sr.Emulated:
                  o = new jD(s, a, r, this.appId, l);
                  break;
                case sr.ShadowDom:
                  return new rk(s, a, t, r);
                default:
                  o = new hp(s, a, r, l);
              }
              (o.onDestroy = () => i.delete(r.id)), i.set(r.id, o);
            }
            return o;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(k(zc), k(Da), k(ga), k(kD));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class fp {
        constructor(n) {
          (this.eventManager = n),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(n, t) {
          return t
            ? document.createElementNS(cp[t] || t, n)
            : document.createElement(n);
        }
        createComment(n) {
          return document.createComment(n);
        }
        createText(n) {
          return document.createTextNode(n);
        }
        appendChild(n, t) {
          (HD(n) ? n.content : n).appendChild(t);
        }
        insertBefore(n, t, r) {
          n && (HD(n) ? n.content : n).insertBefore(t, r);
        }
        removeChild(n, t) {
          n && n.removeChild(t);
        }
        selectRootElement(n, t) {
          let r = "string" == typeof n ? document.querySelector(n) : n;
          if (!r)
            throw new Error(`The selector "${n}" did not match any elements`);
          return t || (r.textContent = ""), r;
        }
        parentNode(n) {
          return n.parentNode;
        }
        nextSibling(n) {
          return n.nextSibling;
        }
        setAttribute(n, t, r, i) {
          if (i) {
            t = i + ":" + t;
            const o = cp[i];
            o ? n.setAttributeNS(o, t, r) : n.setAttribute(t, r);
          } else n.setAttribute(t, r);
        }
        removeAttribute(n, t, r) {
          if (r) {
            const i = cp[r];
            i ? n.removeAttributeNS(i, t) : n.removeAttribute(`${r}:${t}`);
          } else n.removeAttribute(t);
        }
        addClass(n, t) {
          n.classList.add(t);
        }
        removeClass(n, t) {
          n.classList.remove(t);
        }
        setStyle(n, t, r, i) {
          i & (on.DashCase | on.Important)
            ? n.style.setProperty(t, r, i & on.Important ? "important" : "")
            : (n.style[t] = r);
        }
        removeStyle(n, t, r) {
          r & on.DashCase ? n.style.removeProperty(t) : (n.style[t] = "");
        }
        setProperty(n, t, r) {
          n[t] = r;
        }
        setValue(n, t) {
          n.nodeValue = t;
        }
        listen(n, t, r) {
          return "string" == typeof n
            ? this.eventManager.addGlobalEventListener(n, t, VD(r))
            : this.eventManager.addEventListener(n, t, VD(r));
        }
      }
      function HD(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class rk extends fp {
        constructor(n, t, r, i) {
          super(n),
            (this.sharedStylesHost = t),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const o = LD(i.id, i.styles);
          for (const s of o) {
            const a = document.createElement("style");
            (a.textContent = s), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(n) {
          return n === this.hostEl ? this.shadowRoot : n;
        }
        appendChild(n, t) {
          return super.appendChild(this.nodeOrShadowRoot(n), t);
        }
        insertBefore(n, t, r) {
          return super.insertBefore(this.nodeOrShadowRoot(n), t, r);
        }
        removeChild(n, t) {
          return super.removeChild(this.nodeOrShadowRoot(n), t);
        }
        parentNode(n) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(n)),
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class hp extends fp {
        constructor(n, t, r, i, o = r.id) {
          super(n),
            (this.sharedStylesHost = t),
            (this.removeStylesOnCompDestory = i),
            (this.rendererUsageCount = 0),
            (this.styles = LD(o, r.styles));
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles),
            this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class jD extends hp {
        constructor(n, t, r, i, o) {
          const s = i + "-" + r.id;
          super(n, t, r, o, s),
            (this.contentAttr = (function ek(e) {
              return "_ngcontent-%COMP%".replace(up, e);
            })(s)),
            (this.hostAttr = (function tk(e) {
              return "_nghost-%COMP%".replace(up, e);
            })(s));
        }
        applyToHost(n) {
          this.applyStyles(), this.setAttribute(n, this.hostAttr, "");
        }
        createElement(n, t) {
          const r = super.createElement(n, t);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let ik = (() => {
        class e extends RD {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, r, i) {
            return (
              t.addEventListener(r, i, !1),
              () => this.removeEventListener(t, r, i)
            );
          }
          removeEventListener(t, r, i) {
            return t.removeEventListener(r, i);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(k(nt));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const $D = ["alt", "control", "meta", "shift"],
        ok = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        sk = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let ak = (() => {
        class e extends RD {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return null != e.parseEventName(t);
          }
          addEventListener(t, r, i) {
            const o = e.parseEventName(r),
              s = e.eventCallback(o.fullKey, i, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Ar().onAndCancel(t, o.domEventName, s));
          }
          static parseEventName(t) {
            const r = t.toLowerCase().split("."),
              i = r.shift();
            if (0 === r.length || ("keydown" !== i && "keyup" !== i))
              return null;
            const o = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              $D.forEach((c) => {
                const u = r.indexOf(c);
                u > -1 && (r.splice(u, 1), (s += c + "."));
              }),
              (s += o),
              0 != r.length || 0 === o.length)
            )
              return null;
            const l = {};
            return (l.domEventName = i), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(t, r) {
            let i = ok[t.key] || t.key,
              o = "";
            return (
              r.indexOf("code.") > -1 && ((i = t.code), (o = "code.")),
              !(null == i || !i) &&
                ((i = i.toLowerCase()),
                " " === i ? (i = "space") : "." === i && (i = "dot"),
                $D.forEach((s) => {
                  s !== i && (0, sk[s])(t) && (o += s + ".");
                }),
                (o += i),
                o === r)
            );
          }
          static eventCallback(t, r, i) {
            return (o) => {
              e.matchEventFullKeyCode(o, t) && i.runGuarded(() => r(o));
            };
          }
          static _normalizeKey(t) {
            return "esc" === t ? "escape" : t;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(k(nt));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const dk = Fb(GP, "browser", [
          { provide: Tc, useValue: ED },
          {
            provide: Eb,
            useValue: function lk() {
              lp.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: nt,
            useFactory: function uk() {
              return (
                (function eN(e) {
                  _f = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        zD = new $(""),
        WD = [
          {
            provide: Mc,
            useClass: class JF {
              addToWindow(n) {
                (Ue.getAngularTestability = (r, i = !0) => {
                  const o = n.findTestabilityInTree(r, i);
                  if (null == o)
                    throw new Error("Could not find testability for element.");
                  return o;
                }),
                  (Ue.getAllAngularTestabilities = () =>
                    n.getAllTestabilities()),
                  (Ue.getAllAngularRootElements = () => n.getAllRootElements()),
                  Ue.frameworkStabilizers || (Ue.frameworkStabilizers = []),
                  Ue.frameworkStabilizers.push((r) => {
                    const i = Ue.getAllAngularTestabilities();
                    let o = i.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), o--, 0 == o && r(s);
                    };
                    i.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(n, t, r) {
                return null == t
                  ? null
                  : n.getTestability(t) ??
                      (r
                        ? Ar().isShadowRoot(t)
                          ? this.findTestabilityInTree(n, t.host, !0)
                          : this.findTestabilityInTree(n, t.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: Ob, useClass: Ah, deps: [ve, Rh, Mc] },
          { provide: Ah, useClass: Ah, deps: [ve, Rh, Mc] },
        ],
        qD = [
          { provide: Tf, useValue: "root" },
          {
            provide: wo,
            useFactory: function ck() {
              return new wo();
            },
            deps: [],
          },
          { provide: Gc, useClass: ik, multi: !0, deps: [nt, ve, Tc] },
          { provide: Gc, useClass: ak, multi: !0, deps: [nt] },
          { provide: dp, useClass: dp, deps: [zc, Da, ga, kD] },
          { provide: Of, useExisting: dp },
          { provide: PD, useExisting: Da },
          { provide: Da, useClass: Da, deps: [nt] },
          { provide: zc, useClass: zc, deps: [Gc, ve] },
          { provide: TD, useClass: ZF, deps: [] },
          [],
        ];
      let fk = (() => {
          class e {
            constructor(t) {}
            static withServerTransition(t) {
              return {
                ngModule: e,
                providers: [
                  { provide: ga, useValue: t.appId },
                  { provide: AD, useExisting: ga },
                  YF,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k(zD, 12));
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ providers: [...qD, ...WD], imports: [uF, zP] })),
            e
          );
        })(),
        YD = (() => {
          class e {
            constructor(t) {
              this._doc = t;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(t) {
              this._doc.title = t || "";
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k(nt));
            }),
            (e.ɵprov = P({
              token: e,
              factory: function (t) {
                let r = null;
                return (
                  (r = t
                    ? new t()
                    : (function pk() {
                        return new YD(k(nt));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function z(...e) {
        return dt(e, Cs(e));
      }
      typeof window < "u" && window;
      class Nt extends Me {
        constructor(n) {
          super(), (this._value = n);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(n) {
          const t = super._subscribe(n);
          return !t.closed && n.next(this._value), t;
        }
        getValue() {
          const { hasError: n, thrownError: t, _value: r } = this;
          if (n) throw t;
          return this._throwIfClosed(), r;
        }
        next(n) {
          super.next((this._value = n));
        }
      }
      const Wc = Vr(
          (e) =>
            function () {
              e(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence");
            },
        ),
        { isArray: bk } = Array,
        { getPrototypeOf: Dk, prototype: Ck, keys: wk } = Object;
      const { isArray: Sk } = Array;
      function mp(e) {
        return Y((n) =>
          (function Tk(e, n) {
            return Sk(n) ? e(...n) : e(n);
          })(e, n),
        );
      }
      function qc(...e) {
        const n = Cs(e),
          t = vl(e),
          { args: r, keys: i } = (function KD(e) {
            if (1 === e.length) {
              const n = e[0];
              if (bk(n)) return { args: n, keys: null };
              if (
                (function Ek(e) {
                  return e && "object" == typeof e && Dk(e) === Ck;
                })(n)
              ) {
                const t = wk(n);
                return { args: t.map((r) => n[r]), keys: t };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return dt([], n);
        const o = new Ce(
          (function Mk(e, n, t = Un) {
            return (r) => {
              XD(
                n,
                () => {
                  const { length: i } = e,
                    o = new Array(i);
                  let s = i,
                    a = i;
                  for (let l = 0; l < i; l++)
                    XD(
                      n,
                      () => {
                        const c = dt(e[l], n);
                        let u = !1;
                        c.subscribe(
                          Re(
                            r,
                            (d) => {
                              (o[l] = d),
                                u || ((u = !0), a--),
                                a || r.next(t(o.slice()));
                            },
                            () => {
                              --s || r.complete();
                            },
                          ),
                        );
                      },
                      r,
                    );
                },
                r,
              );
            };
          })(
            r,
            n,
            i
              ? (s) =>
                  (function QD(e, n) {
                    return e.reduce((t, r, i) => ((t[r] = n[i]), t), {});
                  })(i, s)
              : Un,
          ),
        );
        return t ? o.pipe(mp(t)) : o;
      }
      function XD(e, n, t) {
        e ? br(t, e, n) : n();
      }
      function Ca(...e) {
        return (function Nk() {
          return to(1);
        })()(dt(e, Cs(e)));
      }
      function e1(e) {
        return new Ce((n) => {
          _t(e()).subscribe(n);
        });
      }
      function wa(e, n) {
        const t = ue(e) ? e : () => e,
          r = (i) => i.error(t());
        return new Ce(n ? (i) => n.schedule(r, 0, i) : r);
      }
      function _p() {
        return We((e, n) => {
          let t = null;
          e._refCount++;
          const r = Re(n, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (t = null);
            const i = e._connection,
              o = t;
            (t = null),
              i && (!o || i === o) && i.unsubscribe(),
              n.unsubscribe();
          });
          e.subscribe(r), r.closed || (t = e.connect());
        });
      }
      class t1 extends Ce {
        constructor(n, t) {
          super(),
            (this.source = n),
            (this.subjectFactory = t),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Ds(n) && (this.lift = n.lift);
        }
        _subscribe(n) {
          return this.getSubject().subscribe(n);
        }
        getSubject() {
          const n = this._subject;
          return (
            (!n || n.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: n } = this;
          (this._subject = this._connection = null), n?.unsubscribe();
        }
        connect() {
          let n = this._connection;
          if (!n) {
            n = this._connection = new lt();
            const t = this.getSubject();
            n.add(
              this.source.subscribe(
                Re(
                  t,
                  void 0,
                  () => {
                    this._teardown(), t.complete();
                  },
                  (r) => {
                    this._teardown(), t.error(r);
                  },
                  () => this._teardown(),
                ),
              ),
            ),
              n.closed && ((this._connection = null), (n = lt.EMPTY));
          }
          return n;
        }
        refCount() {
          return _p()(this);
        }
      }
      function Hn(e, n) {
        return We((t, r) => {
          let i = null,
            o = 0,
            s = !1;
          const a = () => s && !i && r.complete();
          t.subscribe(
            Re(
              r,
              (l) => {
                i?.unsubscribe();
                let c = 0;
                const u = o++;
                _t(e(l, u)).subscribe(
                  (i = Re(
                    r,
                    (d) => r.next(n ? n(l, d, u, c++) : d),
                    () => {
                      (i = null), a();
                    },
                  )),
                );
              },
              () => {
                (s = !0), a();
              },
            ),
          );
        });
      }
      function gt(e) {
        return e <= 0
          ? () => In
          : We((n, t) => {
              let r = 0;
              n.subscribe(
                Re(t, (i) => {
                  ++r <= e && (t.next(i), e <= r && t.complete());
                }),
              );
            });
      }
      function Yc(...e) {
        const n = Cs(e);
        return We((t, r) => {
          (n ? Ca(e, t, n) : Ca(e, t)).subscribe(r);
        });
      }
      function wt(e, n) {
        return We((t, r) => {
          let i = 0;
          t.subscribe(Re(r, (o) => e.call(n, o, i++) && r.next(o)));
        });
      }
      function Jc(e) {
        return We((n, t) => {
          let r = !1;
          n.subscribe(
            Re(
              t,
              (i) => {
                (r = !0), t.next(i);
              },
              () => {
                r || t.next(e), t.complete();
              },
            ),
          );
        });
      }
      function n1(e = Ik) {
        return We((n, t) => {
          let r = !1;
          n.subscribe(
            Re(
              t,
              (i) => {
                (r = !0), t.next(i);
              },
              () => (r ? t.complete() : t.error(e())),
            ),
          );
        });
      }
      function Ik() {
        return new Wc();
      }
      function Qr(e, n) {
        const t = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? wt((i, o) => e(i, o, r)) : Un,
            gt(1),
            t ? Jc(n) : n1(() => new Wc()),
          );
      }
      function Xr(e, n) {
        return ue(n) ? vt(e, n, 1) : vt(e, 1);
      }
      function It(e, n, t) {
        const r = ue(e) || n || t ? { next: e, error: n, complete: t } : e;
        return r
          ? We((i, o) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              i.subscribe(
                Re(
                  o,
                  (l) => {
                    var c;
                    null === (c = r.next) || void 0 === c || c.call(r, l),
                      o.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = r.complete) || void 0 === l || l.call(r),
                      o.complete();
                  },
                  (l) => {
                    var c;
                    (a = !1),
                      null === (c = r.error) || void 0 === c || c.call(r, l),
                      o.error(l);
                  },
                  () => {
                    var l, c;
                    a &&
                      (null === (l = r.unsubscribe) ||
                        void 0 === l ||
                        l.call(r)),
                      null === (c = r.finalize) || void 0 === c || c.call(r);
                  },
                ),
              );
            })
          : Un;
      }
      function ei(e) {
        return We((n, t) => {
          let o,
            r = null,
            i = !1;
          (r = n.subscribe(
            Re(t, void 0, void 0, (s) => {
              (o = _t(e(s, ei(e)(n)))),
                r ? (r.unsubscribe(), (r = null), o.subscribe(t)) : (i = !0);
            }),
          )),
            i && (r.unsubscribe(), (r = null), o.subscribe(t));
        });
      }
      function r1(e, n) {
        return We(
          (function Ok(e, n, t, r, i) {
            return (o, s) => {
              let a = t,
                l = n,
                c = 0;
              o.subscribe(
                Re(
                  s,
                  (u) => {
                    const d = c++;
                    (l = a ? e(l, u, d) : ((a = !0), u)), r && s.next(l);
                  },
                  i &&
                    (() => {
                      a && s.next(l), s.complete();
                    }),
                ),
              );
            };
          })(e, n, arguments.length >= 2, !0),
        );
      }
      function vp(e) {
        return e <= 0
          ? () => In
          : We((n, t) => {
              let r = [];
              n.subscribe(
                Re(
                  t,
                  (i) => {
                    r.push(i), e < r.length && r.shift();
                  },
                  () => {
                    for (const i of r) t.next(i);
                    t.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  },
                ),
              );
            });
      }
      function i1(e, n) {
        const t = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? wt((i, o) => e(i, o, r)) : Un,
            vp(1),
            t ? Jc(n) : n1(() => new Wc()),
          );
      }
      function yp(e) {
        return We((n, t) => {
          try {
            n.subscribe(t);
          } finally {
            t.add(e);
          }
        });
      }
      const oe = "primary",
        Ea = Symbol("RouteTitle");
      class Rk {
        constructor(n) {
          this.params = n || {};
        }
        has(n) {
          return Object.prototype.hasOwnProperty.call(this.params, n);
        }
        get(n) {
          if (this.has(n)) {
            const t = this.params[n];
            return Array.isArray(t) ? t[0] : t;
          }
          return null;
        }
        getAll(n) {
          if (this.has(n)) {
            const t = this.params[n];
            return Array.isArray(t) ? t : [t];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Wo(e) {
        return new Rk(e);
      }
      function Pk(e, n, t) {
        const r = t.path.split("/");
        if (
          r.length > e.length ||
          ("full" === t.pathMatch && (n.hasChildren() || r.length < e.length))
        )
          return null;
        const i = {};
        for (let o = 0; o < r.length; o++) {
          const s = r[o],
            a = e[o];
          if (s.startsWith(":")) i[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: i };
      }
      function pr(e, n) {
        const t = e ? Object.keys(e) : void 0,
          r = n ? Object.keys(n) : void 0;
        if (!t || !r || t.length != r.length) return !1;
        let i;
        for (let o = 0; o < t.length; o++)
          if (((i = t[o]), !s1(e[i], n[i]))) return !1;
        return !0;
      }
      function s1(e, n) {
        if (Array.isArray(e) && Array.isArray(n)) {
          if (e.length !== n.length) return !1;
          const t = [...e].sort(),
            r = [...n].sort();
          return t.every((i, o) => r[o] === i);
        }
        return e === n;
      }
      function a1(e) {
        return Array.prototype.concat.apply([], e);
      }
      function l1(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function kt(e, n) {
        for (const t in e) e.hasOwnProperty(t) && n(e[t], t);
      }
      function ti(e) {
        return Xf(e) ? e : ea(e) ? dt(Promise.resolve(e)) : z(e);
      }
      const Zc = !1,
        Fk = {
          exact: function d1(e, n, t) {
            if (
              !Mi(e.segments, n.segments) ||
              !Kc(e.segments, n.segments, t) ||
              e.numberOfChildren !== n.numberOfChildren
            )
              return !1;
            for (const r in n.children)
              if (!e.children[r] || !d1(e.children[r], n.children[r], t))
                return !1;
            return !0;
          },
          subset: f1,
        },
        c1 = {
          exact: function kk(e, n) {
            return pr(e, n);
          },
          subset: function Lk(e, n) {
            return (
              Object.keys(n).length <= Object.keys(e).length &&
              Object.keys(n).every((t) => s1(e[t], n[t]))
            );
          },
          ignored: () => !0,
        };
      function u1(e, n, t) {
        return (
          Fk[t.paths](e.root, n.root, t.matrixParams) &&
          c1[t.queryParams](e.queryParams, n.queryParams) &&
          !("exact" === t.fragment && e.fragment !== n.fragment)
        );
      }
      function f1(e, n, t) {
        return h1(e, n, n.segments, t);
      }
      function h1(e, n, t, r) {
        if (e.segments.length > t.length) {
          const i = e.segments.slice(0, t.length);
          return !(!Mi(i, t) || n.hasChildren() || !Kc(i, t, r));
        }
        if (e.segments.length === t.length) {
          if (!Mi(e.segments, t) || !Kc(e.segments, t, r)) return !1;
          for (const i in n.children)
            if (!e.children[i] || !f1(e.children[i], n.children[i], r))
              return !1;
          return !0;
        }
        {
          const i = t.slice(0, e.segments.length),
            o = t.slice(e.segments.length);
          return (
            !!(Mi(e.segments, i) && Kc(e.segments, i, r) && e.children[oe]) &&
            h1(e.children[oe], n, o, r)
          );
        }
      }
      function Kc(e, n, t) {
        return n.every((r, i) => c1[t](e[i].parameters, r.parameters));
      }
      class ni {
        constructor(n = new ce([], {}), t = {}, r = null) {
          (this.root = n), (this.queryParams = t), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Wo(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return Hk.serialize(this);
        }
      }
      class ce {
        constructor(n, t) {
          (this.segments = n),
            (this.children = t),
            (this.parent = null),
            kt(t, (r, i) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Qc(this);
        }
      }
      class Sa {
        constructor(n, t) {
          (this.path = n), (this.parameters = t);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Wo(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return m1(this);
        }
      }
      function Mi(e, n) {
        return e.length === n.length && e.every((t, r) => t.path === n[r].path);
      }
      let Ta = (() => {
        class e {}
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = P({
            token: e,
            factory: function () {
              return new bp();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class bp {
        parse(n) {
          const t = new Jk(n);
          return new ni(
            t.parseRootSegment(),
            t.parseQueryParams(),
            t.parseFragment(),
          );
        }
        serialize(n) {
          const t = `/${Ma(n.root, !0)}`,
            r = (function Uk(e) {
              const n = Object.keys(e)
                .map((t) => {
                  const r = e[t];
                  return Array.isArray(r)
                    ? r.map((i) => `${Xc(t)}=${Xc(i)}`).join("&")
                    : `${Xc(t)}=${Xc(r)}`;
                })
                .filter((t) => !!t);
              return n.length ? `?${n.join("&")}` : "";
            })(n.queryParams);
          return `${t}${r}${
            "string" == typeof n.fragment
              ? `#${(function jk(e) {
                  return encodeURI(e);
                })(n.fragment)}`
              : ""
          }`;
        }
      }
      const Hk = new bp();
      function Qc(e) {
        return e.segments.map((n) => m1(n)).join("/");
      }
      function Ma(e, n) {
        if (!e.hasChildren()) return Qc(e);
        if (n) {
          const t = e.children[oe] ? Ma(e.children[oe], !1) : "",
            r = [];
          return (
            kt(e.children, (i, o) => {
              o !== oe && r.push(`${o}:${Ma(i, !1)}`);
            }),
            r.length > 0 ? `${t}(${r.join("//")})` : t
          );
        }
        {
          const t = (function Bk(e, n) {
            let t = [];
            return (
              kt(e.children, (r, i) => {
                i === oe && (t = t.concat(n(r, i)));
              }),
              kt(e.children, (r, i) => {
                i !== oe && (t = t.concat(n(r, i)));
              }),
              t
            );
          })(e, (r, i) =>
            i === oe ? [Ma(e.children[oe], !1)] : [`${i}:${Ma(r, !1)}`],
          );
          return 1 === Object.keys(e.children).length && null != e.children[oe]
            ? `${Qc(e)}/${t[0]}`
            : `${Qc(e)}/(${t.join("//")})`;
        }
      }
      function p1(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Xc(e) {
        return p1(e).replace(/%3B/gi, ";");
      }
      function Dp(e) {
        return p1(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function eu(e) {
        return decodeURIComponent(e);
      }
      function g1(e) {
        return eu(e.replace(/\+/g, "%20"));
      }
      function m1(e) {
        return `${Dp(e.path)}${(function $k(e) {
          return Object.keys(e)
            .map((n) => `;${Dp(n)}=${Dp(e[n])}`)
            .join("");
        })(e.parameters)}`;
      }
      const Gk = /^[^\/()?;=#]+/;
      function tu(e) {
        const n = e.match(Gk);
        return n ? n[0] : "";
      }
      const zk = /^[^=?&#]+/,
        qk = /^[^&#]+/;
      class Jk {
        constructor(n) {
          (this.url = n), (this.remaining = n);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new ce([], {})
              : new ce([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const n = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(n);
            } while (this.consumeOptional("&"));
          return n;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const n = [];
          for (
            this.peekStartsWith("(") || n.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), n.push(this.parseSegment());
          let t = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (t = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (n.length > 0 || Object.keys(t).length > 0) &&
              (r[oe] = new ce(n, t)),
            r
          );
        }
        parseSegment() {
          const n = tu(this.remaining);
          if ("" === n && this.peekStartsWith(";")) throw new A(4009, Zc);
          return this.capture(n), new Sa(eu(n), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const n = {};
          for (; this.consumeOptional(";"); ) this.parseParam(n);
          return n;
        }
        parseParam(n) {
          const t = tu(this.remaining);
          if (!t) return;
          this.capture(t);
          let r = "";
          if (this.consumeOptional("=")) {
            const i = tu(this.remaining);
            i && ((r = i), this.capture(r));
          }
          n[eu(t)] = eu(r);
        }
        parseQueryParam(n) {
          const t = (function Wk(e) {
            const n = e.match(zk);
            return n ? n[0] : "";
          })(this.remaining);
          if (!t) return;
          this.capture(t);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function Yk(e) {
              const n = e.match(qk);
              return n ? n[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const i = g1(t),
            o = g1(r);
          if (n.hasOwnProperty(i)) {
            let s = n[i];
            Array.isArray(s) || ((s = [s]), (n[i] = s)), s.push(o);
          } else n[i] = o;
        }
        parseParens(n) {
          const t = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = tu(this.remaining),
              i = this.remaining[r.length];
            if ("/" !== i && ")" !== i && ";" !== i) throw new A(4010, Zc);
            let o;
            r.indexOf(":") > -1
              ? ((o = r.slice(0, r.indexOf(":"))),
                this.capture(o),
                this.capture(":"))
              : n && (o = oe);
            const s = this.parseChildren();
            (t[o] = 1 === Object.keys(s).length ? s[oe] : new ce([], s)),
              this.consumeOptional("//");
          }
          return t;
        }
        peekStartsWith(n) {
          return this.remaining.startsWith(n);
        }
        consumeOptional(n) {
          return (
            !!this.peekStartsWith(n) &&
            ((this.remaining = this.remaining.substring(n.length)), !0)
          );
        }
        capture(n) {
          if (!this.consumeOptional(n)) throw new A(4011, Zc);
        }
      }
      function Cp(e) {
        return e.segments.length > 0 ? new ce([], { [oe]: e }) : e;
      }
      function nu(e) {
        const n = {};
        for (const r of Object.keys(e.children)) {
          const o = nu(e.children[r]);
          (o.segments.length > 0 || o.hasChildren()) && (n[r] = o);
        }
        return (function Zk(e) {
          if (1 === e.numberOfChildren && e.children[oe]) {
            const n = e.children[oe];
            return new ce(e.segments.concat(n.segments), n.children);
          }
          return e;
        })(new ce(e.segments, n));
      }
      function Ni(e) {
        return e instanceof ni;
      }
      const wp = !1;
      function Kk(e, n, t, r, i) {
        if (0 === t.length) return qo(n.root, n.root, n.root, r, i);
        const o = (function D1(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new b1(!0, 0, e);
          let n = 0,
            t = !1;
          const r = e.reduce((i, o, s) => {
            if ("object" == typeof o && null != o) {
              if (o.outlets) {
                const a = {};
                return (
                  kt(o.outlets, (l, c) => {
                    a[c] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...i, { outlets: a }]
                );
              }
              if (o.segmentPath) return [...i, o.segmentPath];
            }
            return "string" != typeof o
              ? [...i, o]
              : 0 === s
                ? (o.split("/").forEach((a, l) => {
                    (0 == l && "." === a) ||
                      (0 == l && "" === a
                        ? (t = !0)
                        : ".." === a
                          ? n++
                          : "" != a && i.push(a));
                  }),
                  i)
                : [...i, o];
          }, []);
          return new b1(t, n, r);
        })(t);
        return o.toRoot()
          ? qo(n.root, n.root, new ce([], {}), r, i)
          : (function s(l) {
              const c = (function Xk(e, n, t, r) {
                  if (e.isAbsolute) return new Yo(n.root, !0, 0);
                  if (-1 === r) return new Yo(t, t === n.root, 0);
                  return (function C1(e, n, t) {
                    let r = e,
                      i = n,
                      o = t;
                    for (; o > i; ) {
                      if (((o -= i), (r = r.parent), !r))
                        throw new A(4005, wp && "Invalid number of '../'");
                      i = r.segments.length;
                    }
                    return new Yo(r, !1, i - o);
                  })(t, r + (Na(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(o, n, e.snapshot?._urlSegment, l),
                u = c.processChildren
                  ? Jo(c.segmentGroup, c.index, o.commands)
                  : Ep(c.segmentGroup, c.index, o.commands);
              return qo(n.root, c.segmentGroup, u, r, i);
            })(e.snapshot?._lastPathIndex);
      }
      function Na(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Ia(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function qo(e, n, t, r, i) {
        let s,
          o = {};
        r &&
          kt(r, (l, c) => {
            o[c] = Array.isArray(l) ? l.map((u) => `${u}`) : `${l}`;
          }),
          (s = e === n ? t : y1(e, n, t));
        const a = Cp(nu(s));
        return new ni(a, o, i);
      }
      function y1(e, n, t) {
        const r = {};
        return (
          kt(e.children, (i, o) => {
            r[o] = i === n ? t : y1(i, n, t);
          }),
          new ce(e.segments, r)
        );
      }
      class b1 {
        constructor(n, t, r) {
          if (
            ((this.isAbsolute = n),
            (this.numberOfDoubleDots = t),
            (this.commands = r),
            n && r.length > 0 && Na(r[0]))
          )
            throw new A(
              4003,
              wp && "Root segment cannot have matrix parameters",
            );
          const i = r.find(Ia);
          if (i && i !== l1(r))
            throw new A(4004, wp && "{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Yo {
        constructor(n, t, r) {
          (this.segmentGroup = n), (this.processChildren = t), (this.index = r);
        }
      }
      function Ep(e, n, t) {
        if (
          (e || (e = new ce([], {})),
          0 === e.segments.length && e.hasChildren())
        )
          return Jo(e, n, t);
        const r = (function tL(e, n, t) {
            let r = 0,
              i = n;
            const o = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; i < e.segments.length; ) {
              if (r >= t.length) return o;
              const s = e.segments[i],
                a = t[r];
              if (Ia(a)) break;
              const l = `${a}`,
                c = r < t.length - 1 ? t[r + 1] : null;
              if (i > 0 && void 0 === l) break;
              if (l && c && "object" == typeof c && void 0 === c.outlets) {
                if (!E1(l, c, s)) return o;
                r += 2;
              } else {
                if (!E1(l, {}, s)) return o;
                r++;
              }
              i++;
            }
            return { match: !0, pathIndex: i, commandIndex: r };
          })(e, n, t),
          i = t.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const o = new ce(e.segments.slice(0, r.pathIndex), {});
          return (
            (o.children[oe] = new ce(
              e.segments.slice(r.pathIndex),
              e.children,
            )),
            Jo(o, 0, i)
          );
        }
        return r.match && 0 === i.length
          ? new ce(e.segments, {})
          : r.match && !e.hasChildren()
            ? Sp(e, n, t)
            : r.match
              ? Jo(e, 0, i)
              : Sp(e, n, t);
      }
      function Jo(e, n, t) {
        if (0 === t.length) return new ce(e.segments, {});
        {
          const r = (function eL(e) {
              return Ia(e[0]) ? e[0].outlets : { [oe]: e };
            })(t),
            i = {};
          if (
            !r[oe] &&
            e.children[oe] &&
            1 === e.numberOfChildren &&
            0 === e.children[oe].segments.length
          ) {
            const o = Jo(e.children[oe], n, t);
            return new ce(e.segments, o.children);
          }
          return (
            kt(r, (o, s) => {
              "string" == typeof o && (o = [o]),
                null !== o && (i[s] = Ep(e.children[s], n, o));
            }),
            kt(e.children, (o, s) => {
              void 0 === r[s] && (i[s] = o);
            }),
            new ce(e.segments, i)
          );
        }
      }
      function Sp(e, n, t) {
        const r = e.segments.slice(0, n);
        let i = 0;
        for (; i < t.length; ) {
          const o = t[i];
          if (Ia(o)) {
            const l = nL(o.outlets);
            return new ce(r, l);
          }
          if (0 === i && Na(t[0])) {
            r.push(new Sa(e.segments[n].path, w1(t[0]))), i++;
            continue;
          }
          const s = Ia(o) ? o.outlets[oe] : `${o}`,
            a = i < t.length - 1 ? t[i + 1] : null;
          s && a && Na(a)
            ? (r.push(new Sa(s, w1(a))), (i += 2))
            : (r.push(new Sa(s, {})), i++);
        }
        return new ce(r, {});
      }
      function nL(e) {
        const n = {};
        return (
          kt(e, (t, r) => {
            "string" == typeof t && (t = [t]),
              null !== t && (n[r] = Sp(new ce([], {}), 0, t));
          }),
          n
        );
      }
      function w1(e) {
        const n = {};
        return kt(e, (t, r) => (n[r] = `${t}`)), n;
      }
      function E1(e, n, t) {
        return e == t.path && pr(n, t.parameters);
      }
      const Oa = "imperative";
      class gr {
        constructor(n, t) {
          (this.id = n), (this.url = t);
        }
      }
      class Tp extends gr {
        constructor(n, t, r = "imperative", i = null) {
          super(n, t),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = i);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Ii extends gr {
        constructor(n, t, r) {
          super(n, t), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class ru extends gr {
        constructor(n, t, r, i) {
          super(n, t), (this.reason = r), (this.code = i), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class iu extends gr {
        constructor(n, t, r, i) {
          super(n, t), (this.reason = r), (this.code = i), (this.type = 16);
        }
      }
      class Mp extends gr {
        constructor(n, t, r, i) {
          super(n, t), (this.error = r), (this.target = i), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class rL extends gr {
        constructor(n, t, r, i) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class iL extends gr {
        constructor(n, t, r, i) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class oL extends gr {
        constructor(n, t, r, i, o) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.shouldActivate = o),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class sL extends gr {
        constructor(n, t, r, i) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class aL extends gr {
        constructor(n, t, r, i) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class lL {
        constructor(n) {
          (this.route = n), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class cL {
        constructor(n) {
          (this.route = n), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class uL {
        constructor(n) {
          (this.snapshot = n), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
        }
      }
      class dL {
        constructor(n) {
          (this.snapshot = n), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
        }
      }
      class fL {
        constructor(n) {
          (this.snapshot = n), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
        }
      }
      class hL {
        constructor(n) {
          (this.snapshot = n), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
        }
      }
      class S1 {
        constructor(n, t, r) {
          (this.routerEvent = n),
            (this.position = t),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${this.position ? `${this.position[0]}, ${this.position[1]}` : null}')`;
        }
      }
      let mL = (() => {
          class e {
            createUrlTree(t, r, i, o, s, a) {
              return Kk(t || r.root, i, o, s, a);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        vL = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function (n) {
                return mL.ɵfac(n);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class T1 {
        constructor(n) {
          this._root = n;
        }
        get root() {
          return this._root.value;
        }
        parent(n) {
          const t = this.pathFromRoot(n);
          return t.length > 1 ? t[t.length - 2] : null;
        }
        children(n) {
          const t = Np(n, this._root);
          return t ? t.children.map((r) => r.value) : [];
        }
        firstChild(n) {
          const t = Np(n, this._root);
          return t && t.children.length > 0 ? t.children[0].value : null;
        }
        siblings(n) {
          const t = Ip(n, this._root);
          return t.length < 2
            ? []
            : t[t.length - 2].children
                .map((i) => i.value)
                .filter((i) => i !== n);
        }
        pathFromRoot(n) {
          return Ip(n, this._root).map((t) => t.value);
        }
      }
      function Np(e, n) {
        if (e === n.value) return n;
        for (const t of n.children) {
          const r = Np(e, t);
          if (r) return r;
        }
        return null;
      }
      function Ip(e, n) {
        if (e === n.value) return [n];
        for (const t of n.children) {
          const r = Ip(e, t);
          if (r.length) return r.unshift(n), r;
        }
        return [];
      }
      class Fr {
        constructor(n, t) {
          (this.value = n), (this.children = t);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Zo(e) {
        const n = {};
        return e && e.children.forEach((t) => (n[t.value.outlet] = t)), n;
      }
      class M1 extends T1 {
        constructor(n, t) {
          super(n), (this.snapshot = t), Op(this, n);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function N1(e, n) {
        const t = (function yL(e, n) {
            const s = new ou([], {}, {}, "", {}, oe, n, null, e.root, -1, {});
            return new O1("", new Fr(s, []));
          })(e, n),
          r = new Nt([new Sa("", {})]),
          i = new Nt({}),
          o = new Nt({}),
          s = new Nt({}),
          a = new Nt(""),
          l = new Ko(r, i, s, a, o, oe, n, t.root);
        return (l.snapshot = t.root), new M1(new Fr(l, []), t);
      }
      class Ko {
        constructor(n, t, r, i, o, s, a, l) {
          (this.url = n),
            (this.params = t),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(Y((c) => c[Ea])) ?? z(void 0)),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(Y((n) => Wo(n)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(Y((n) => Wo(n)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function I1(e, n = "emptyOnly") {
        const t = e.pathFromRoot;
        let r = 0;
        if ("always" !== n)
          for (r = t.length - 1; r >= 1; ) {
            const i = t[r],
              o = t[r - 1];
            if (i.routeConfig && "" === i.routeConfig.path) r--;
            else {
              if (o.component) break;
              r--;
            }
          }
        return (function bL(e) {
          return e.reduce(
            (n, t) => ({
              params: { ...n.params, ...t.params },
              data: { ...n.data, ...t.data },
              resolve: {
                ...t.data,
                ...n.resolve,
                ...t.routeConfig?.data,
                ...t._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} },
          );
        })(t.slice(r));
      }
      class ou {
        get title() {
          return this.data?.[Ea];
        }
        constructor(n, t, r, i, o, s, a, l, c, u, d) {
          (this.url = n),
            (this.params = t),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = l),
            (this._urlSegment = c),
            (this._lastPathIndex = u),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Wo(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Wo(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url.map((r) => r.toString()).join("/")}', path:'${this.routeConfig ? this.routeConfig.path : ""}')`;
        }
      }
      class O1 extends T1 {
        constructor(n, t) {
          super(t), (this.url = n), Op(this, t);
        }
        toString() {
          return A1(this._root);
        }
      }
      function Op(e, n) {
        (n.value._routerState = e), n.children.forEach((t) => Op(e, t));
      }
      function A1(e) {
        const n =
          e.children.length > 0 ? ` { ${e.children.map(A1).join(", ")} } ` : "";
        return `${e.value}${n}`;
      }
      function Ap(e) {
        if (e.snapshot) {
          const n = e.snapshot,
            t = e._futureSnapshot;
          (e.snapshot = t),
            pr(n.queryParams, t.queryParams) ||
              e.queryParams.next(t.queryParams),
            n.fragment !== t.fragment && e.fragment.next(t.fragment),
            pr(n.params, t.params) || e.params.next(t.params),
            (function xk(e, n) {
              if (e.length !== n.length) return !1;
              for (let t = 0; t < e.length; ++t) if (!pr(e[t], n[t])) return !1;
              return !0;
            })(n.url, t.url) || e.url.next(t.url),
            pr(n.data, t.data) || e.data.next(t.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function Rp(e, n) {
        const t =
          pr(e.params, n.params) &&
          (function Vk(e, n) {
            return (
              Mi(e, n) && e.every((t, r) => pr(t.parameters, n[r].parameters))
            );
          })(e.url, n.url);
        return (
          t &&
          !(!e.parent != !n.parent) &&
          (!e.parent || Rp(e.parent, n.parent))
        );
      }
      function Aa(e, n, t) {
        if (t && e.shouldReuseRoute(n.value, t.value.snapshot)) {
          const r = t.value;
          r._futureSnapshot = n.value;
          const i = (function CL(e, n, t) {
            return n.children.map((r) => {
              for (const i of t.children)
                if (e.shouldReuseRoute(r.value, i.value.snapshot))
                  return Aa(e, r, i);
              return Aa(e, r);
            });
          })(e, n, t);
          return new Fr(r, i);
        }
        {
          if (e.shouldAttach(n.value)) {
            const o = e.retrieve(n.value);
            if (null !== o) {
              const s = o.route;
              return (
                (s.value._futureSnapshot = n.value),
                (s.children = n.children.map((a) => Aa(e, a))),
                s
              );
            }
          }
          const r = (function wL(e) {
              return new Ko(
                new Nt(e.url),
                new Nt(e.params),
                new Nt(e.queryParams),
                new Nt(e.fragment),
                new Nt(e.data),
                e.outlet,
                e.component,
                e,
              );
            })(n.value),
            i = n.children.map((o) => Aa(e, o));
          return new Fr(r, i);
        }
      }
      const Pp = "ngNavigationCancelingError";
      function R1(e, n) {
        const { redirectTo: t, navigationBehaviorOptions: r } = Ni(n)
            ? { redirectTo: n, navigationBehaviorOptions: void 0 }
            : n,
          i = P1(!1, 0, n);
        return (i.url = t), (i.navigationBehaviorOptions = r), i;
      }
      function P1(e, n, t) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[Pp] = !0), (r.cancellationCode = n), t && (r.url = t), r;
      }
      function x1(e) {
        return F1(e) && Ni(e.url);
      }
      function F1(e) {
        return e && e[Pp];
      }
      class EL {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new Ra()),
            (this.attachRef = null);
        }
      }
      let Ra = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(t, r) {
            const i = this.getOrCreateContext(t);
            (i.outlet = r), this.contexts.set(t, i);
          }
          onChildOutletDestroyed(t) {
            const r = this.getContext(t);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const t = this.contexts;
            return (this.contexts = new Map()), t;
          }
          onOutletReAttached(t) {
            this.contexts = t;
          }
          getOrCreateContext(t) {
            let r = this.getContext(t);
            return r || ((r = new EL()), this.contexts.set(t, r)), r;
          }
          getContext(t) {
            return this.contexts.get(t) || null;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const su = !1;
      let k1 = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = oe),
              (this.activateEvents = new U()),
              (this.deactivateEvents = new U()),
              (this.attachEvents = new U()),
              (this.detachEvents = new U()),
              (this.parentContexts = X(Ra)),
              (this.location = X(kn)),
              (this.changeDetector = X(cn)),
              (this.environmentInjector = X(xn));
          }
          ngOnChanges(t) {
            if (t.name) {
              const { firstChange: r, previousValue: i } = t.name;
              if (r) return;
              this.isTrackedInParentContexts(i) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(i)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          isTrackedInParentContexts(t) {
            return this.parentContexts.getContext(t)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const t = this.parentContexts.getContext(this.name);
            t?.route &&
              (t.attachRef
                ? this.attach(t.attachRef, t.route)
                : this.activateWith(t.route, t.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new A(4012, su);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new A(4012, su);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new A(4012, su);
            this.location.detach();
            const t = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(t.instance),
              t
            );
          }
          attach(t, r) {
            (this.activated = t),
              (this._activatedRoute = r),
              this.location.insert(t.hostView),
              this.attachEvents.emit(t.instance);
          }
          deactivate() {
            if (this.activated) {
              const t = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(t);
            }
          }
          activateWith(t, r) {
            if (this.isActivated) throw new A(4013, su);
            this._activatedRoute = t;
            const i = this.location,
              s = t.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new SL(t, a, i.injector);
            if (
              r &&
              (function TL(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const c = r.resolveComponentFactory(s);
              this.activated = i.createComponent(c, i.length, l);
            } else
              this.activated = i.createComponent(s, {
                index: i.length,
                injector: l,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵdir = x({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [Xe],
          })),
          e
        );
      })();
      class SL {
        constructor(n, t, r) {
          (this.route = n), (this.childContexts = t), (this.parent = r);
        }
        get(n, t) {
          return n === Ko
            ? this.route
            : n === Ra
              ? this.childContexts
              : this.parent.get(n, t);
        }
      }
      let xp = (() => {
        class e {}
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵcmp = Le({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [Dt],
            decls: 1,
            vars: 0,
            template: function (t, r) {
              1 & t && qe(0, "router-outlet");
            },
            dependencies: [k1],
            encapsulation: 2,
          })),
          e
        );
      })();
      function L1(e, n) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = bc(e.providers, n, `Route: ${e.path}`)),
          e._injector ?? n
        );
      }
      function kp(e) {
        const n = e.children && e.children.map(kp),
          t = n ? { ...e, children: n } : { ...e };
        return (
          !t.component &&
            !t.loadComponent &&
            (n || t.loadChildren) &&
            t.outlet &&
            t.outlet !== oe &&
            (t.component = xp),
          t
        );
      }
      function jn(e) {
        return e.outlet || oe;
      }
      function V1(e, n) {
        const t = e.filter((r) => jn(r) === n);
        return t.push(...e.filter((r) => jn(r) !== n)), t;
      }
      function Pa(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let n = e.parent; n; n = n.parent) {
          const t = n.routeConfig;
          if (t?._loadedInjector) return t._loadedInjector;
          if (t?._injector) return t._injector;
        }
        return null;
      }
      class AL {
        constructor(n, t, r, i) {
          (this.routeReuseStrategy = n),
            (this.futureState = t),
            (this.currState = r),
            (this.forwardEvent = i);
        }
        activate(n) {
          const t = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(t, r, n),
            Ap(this.futureState.root),
            this.activateChildRoutes(t, r, n);
        }
        deactivateChildRoutes(n, t, r) {
          const i = Zo(t);
          n.children.forEach((o) => {
            const s = o.value.outlet;
            this.deactivateRoutes(o, i[s], r), delete i[s];
          }),
            kt(i, (o, s) => {
              this.deactivateRouteAndItsChildren(o, r);
            });
        }
        deactivateRoutes(n, t, r) {
          const i = n.value,
            o = t ? t.value : null;
          if (i === o)
            if (i.component) {
              const s = r.getContext(i.outlet);
              s && this.deactivateChildRoutes(n, t, s.children);
            } else this.deactivateChildRoutes(n, t, r);
          else o && this.deactivateRouteAndItsChildren(t, r);
        }
        deactivateRouteAndItsChildren(n, t) {
          n.value.component &&
          this.routeReuseStrategy.shouldDetach(n.value.snapshot)
            ? this.detachAndStoreRouteSubtree(n, t)
            : this.deactivateRouteAndOutlet(n, t);
        }
        detachAndStoreRouteSubtree(n, t) {
          const r = t.getContext(n.value.outlet),
            i = r && n.value.component ? r.children : t,
            o = Zo(n);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(n.value.snapshot, {
              componentRef: s,
              route: n,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(n, t) {
          const r = t.getContext(n.value.outlet),
            i = r && n.value.component ? r.children : t,
            o = Zo(n);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(n, t, r) {
          const i = Zo(t);
          n.children.forEach((o) => {
            this.activateRoutes(o, i[o.value.outlet], r),
              this.forwardEvent(new hL(o.value.snapshot));
          }),
            n.children.length && this.forwardEvent(new dL(n.value.snapshot));
        }
        activateRoutes(n, t, r) {
          const i = n.value,
            o = t ? t.value : null;
          if ((Ap(i), i === o))
            if (i.component) {
              const s = r.getOrCreateContext(i.outlet);
              this.activateChildRoutes(n, t, s.children);
            } else this.activateChildRoutes(n, t, r);
          else if (i.component) {
            const s = r.getOrCreateContext(i.outlet);
            if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(i.snapshot);
              this.routeReuseStrategy.store(i.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Ap(a.route.value),
                this.activateChildRoutes(n, null, s.children);
            } else {
              const a = Pa(i.snapshot),
                l = a?.get(qs) ?? null;
              (s.attachRef = null),
                (s.route = i),
                (s.resolver = l),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(i, s.injector),
                this.activateChildRoutes(n, null, s.children);
            }
          } else this.activateChildRoutes(n, null, r);
        }
      }
      class B1 {
        constructor(n) {
          (this.path = n), (this.route = this.path[this.path.length - 1]);
        }
      }
      class au {
        constructor(n, t) {
          (this.component = n), (this.route = t);
        }
      }
      function RL(e, n, t) {
        const r = e._root;
        return xa(r, n ? n._root : null, t, [r.value]);
      }
      function Qo(e, n) {
        const t = Symbol(),
          r = n.get(e, t);
        return r === t
          ? "function" != typeof e ||
            (function YS(e) {
              return null !== Dl(e);
            })(e)
            ? n.get(e)
            : e
          : r;
      }
      function xa(
        e,
        n,
        t,
        r,
        i = { canDeactivateChecks: [], canActivateChecks: [] },
      ) {
        const o = Zo(n);
        return (
          e.children.forEach((s) => {
            (function xL(
              e,
              n,
              t,
              r,
              i = { canDeactivateChecks: [], canActivateChecks: [] },
            ) {
              const o = e.value,
                s = n ? n.value : null,
                a = t ? t.getContext(e.value.outlet) : null;
              if (s && o.routeConfig === s.routeConfig) {
                const l = (function FL(e, n, t) {
                  if ("function" == typeof t) return t(e, n);
                  switch (t) {
                    case "pathParamsChange":
                      return !Mi(e.url, n.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Mi(e.url, n.url) || !pr(e.queryParams, n.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Rp(e, n) || !pr(e.queryParams, n.queryParams);
                    default:
                      return !Rp(e, n);
                  }
                })(s, o, o.routeConfig.runGuardsAndResolvers);
                l
                  ? i.canActivateChecks.push(new B1(r))
                  : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
                  xa(e, n, o.component ? (a ? a.children : null) : t, r, i),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    i.canDeactivateChecks.push(new au(a.outlet.component, s));
              } else
                s && Fa(n, a, i),
                  i.canActivateChecks.push(new B1(r)),
                  xa(e, null, o.component ? (a ? a.children : null) : t, r, i);
            })(s, o[s.value.outlet], t, r.concat([s.value]), i),
              delete o[s.value.outlet];
          }),
          kt(o, (s, a) => Fa(s, t.getContext(a), i)),
          i
        );
      }
      function Fa(e, n, t) {
        const r = Zo(e),
          i = e.value;
        kt(r, (o, s) => {
          Fa(o, i.component ? (n ? n.children.getContext(s) : null) : n, t);
        }),
          t.canDeactivateChecks.push(
            new au(
              i.component && n && n.outlet && n.outlet.isActivated
                ? n.outlet.component
                : null,
              i,
            ),
          );
      }
      function ka(e) {
        return "function" == typeof e;
      }
      function Lp(e) {
        return e instanceof Wc || "EmptyError" === e?.name;
      }
      const lu = Symbol("INITIAL_VALUE");
      function Xo() {
        return Hn((e) =>
          qc(e.map((n) => n.pipe(gt(1), Yc(lu)))).pipe(
            Y((n) => {
              for (const t of n)
                if (!0 !== t) {
                  if (t === lu) return lu;
                  if (!1 === t || t instanceof ni) return t;
                }
              return !0;
            }),
            wt((n) => n !== lu),
            gt(1),
          ),
        );
      }
      function H1(e) {
        return (function dl(...e) {
          return fl(e);
        })(
          It((n) => {
            if (Ni(n)) throw R1(0, n);
          }),
          Y((n) => !0 === n),
        );
      }
      const Vp = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function j1(e, n, t, r, i) {
        const o = Bp(e, n, t);
        return o.matched
          ? (function QL(e, n, t, r) {
              const i = n.canMatch;
              return i && 0 !== i.length
                ? z(
                    i.map((s) => {
                      const a = Qo(s, e);
                      return ti(
                        (function jL(e) {
                          return e && ka(e.canMatch);
                        })(a)
                          ? a.canMatch(n, t)
                          : e.runInContext(() => a(n, t)),
                      );
                    }),
                  ).pipe(Xo(), H1())
                : z(!0);
            })((r = L1(n, r)), n, t).pipe(Y((s) => (!0 === s ? o : { ...Vp })))
          : z(o);
      }
      function Bp(e, n, t) {
        if ("" === n.path)
          return "full" === n.pathMatch && (e.hasChildren() || t.length > 0)
            ? { ...Vp }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: t,
                parameters: {},
                positionalParamSegments: {},
              };
        const i = (n.matcher || Pk)(t, e, n);
        if (!i) return { ...Vp };
        const o = {};
        kt(i.posParams, (a, l) => {
          o[l] = a.path;
        });
        const s =
          i.consumed.length > 0
            ? { ...o, ...i.consumed[i.consumed.length - 1].parameters }
            : o;
        return {
          matched: !0,
          consumedSegments: i.consumed,
          remainingSegments: t.slice(i.consumed.length),
          parameters: s,
          positionalParamSegments: i.posParams ?? {},
        };
      }
      function cu(e, n, t, r) {
        if (
          t.length > 0 &&
          (function t2(e, n, t) {
            return t.some((r) => uu(e, n, r) && jn(r) !== oe);
          })(e, t, r)
        ) {
          const o = new ce(
            n,
            (function e2(e, n, t, r) {
              const i = {};
              (i[oe] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = n.length);
              for (const o of t)
                if ("" === o.path && jn(o) !== oe) {
                  const s = new ce([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = n.length),
                    (i[jn(o)] = s);
                }
              return i;
            })(e, n, r, new ce(t, e.children)),
          );
          return (
            (o._sourceSegment = e),
            (o._segmentIndexShift = n.length),
            { segmentGroup: o, slicedSegments: [] }
          );
        }
        if (
          0 === t.length &&
          (function n2(e, n, t) {
            return t.some((r) => uu(e, n, r));
          })(e, t, r)
        ) {
          const o = new ce(
            e.segments,
            (function XL(e, n, t, r, i) {
              const o = {};
              for (const s of r)
                if (uu(e, t, s) && !i[jn(s)]) {
                  const a = new ce([], {});
                  (a._sourceSegment = e),
                    (a._segmentIndexShift = n.length),
                    (o[jn(s)] = a);
                }
              return { ...i, ...o };
            })(e, n, t, r, e.children),
          );
          return (
            (o._sourceSegment = e),
            (o._segmentIndexShift = n.length),
            { segmentGroup: o, slicedSegments: t }
          );
        }
        const i = new ce(e.segments, e.children);
        return (
          (i._sourceSegment = e),
          (i._segmentIndexShift = n.length),
          { segmentGroup: i, slicedSegments: t }
        );
      }
      function uu(e, n, t) {
        return (
          (!(e.hasChildren() || n.length > 0) || "full" !== t.pathMatch) &&
          "" === t.path
        );
      }
      function $1(e, n, t, r) {
        return (
          !!(jn(e) === r || (r !== oe && uu(n, t, e))) &&
          ("**" === e.path || Bp(n, e, t).matched)
        );
      }
      function U1(e, n, t) {
        return 0 === n.length && !e.children[t];
      }
      const du = !1;
      class fu {
        constructor(n) {
          this.segmentGroup = n || null;
        }
      }
      class G1 {
        constructor(n) {
          this.urlTree = n;
        }
      }
      function La(e) {
        return wa(new fu(e));
      }
      function z1(e) {
        return wa(new G1(e));
      }
      class s2 {
        constructor(n, t, r, i, o) {
          (this.injector = n),
            (this.configLoader = t),
            (this.urlSerializer = r),
            (this.urlTree = i),
            (this.config = o),
            (this.allowRedirects = !0);
        }
        apply() {
          const n = cu(this.urlTree.root, [], [], this.config).segmentGroup,
            t = new ce(n.segments, n.children);
          return this.expandSegmentGroup(this.injector, this.config, t, oe)
            .pipe(
              Y((o) =>
                this.createUrlTree(
                  nu(o),
                  this.urlTree.queryParams,
                  this.urlTree.fragment,
                ),
              ),
            )
            .pipe(
              ei((o) => {
                if (o instanceof G1)
                  return (this.allowRedirects = !1), this.match(o.urlTree);
                throw o instanceof fu ? this.noMatchError(o) : o;
              }),
            );
        }
        match(n) {
          return this.expandSegmentGroup(this.injector, this.config, n.root, oe)
            .pipe(
              Y((i) => this.createUrlTree(nu(i), n.queryParams, n.fragment)),
            )
            .pipe(
              ei((i) => {
                throw i instanceof fu ? this.noMatchError(i) : i;
              }),
            );
        }
        noMatchError(n) {
          return new A(4002, du);
        }
        createUrlTree(n, t, r) {
          const i = Cp(n);
          return new ni(i, t, r);
        }
        expandSegmentGroup(n, t, r, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(n, t, r).pipe(Y((o) => new ce([], o)))
            : this.expandSegment(n, r, t, r.segments, i, !0);
        }
        expandChildren(n, t, r) {
          const i = [];
          for (const o of Object.keys(r.children))
            "primary" === o ? i.unshift(o) : i.push(o);
          return dt(i).pipe(
            Xr((o) => {
              const s = r.children[o],
                a = V1(t, o);
              return this.expandSegmentGroup(n, a, s, o).pipe(
                Y((l) => ({ segment: l, outlet: o })),
              );
            }),
            r1((o, s) => ((o[s.outlet] = s.segment), o), {}),
            i1(),
          );
        }
        expandSegment(n, t, r, i, o, s) {
          return dt(r).pipe(
            Xr((a) =>
              this.expandSegmentAgainstRoute(n, t, r, a, i, o, s).pipe(
                ei((c) => {
                  if (c instanceof fu) return z(null);
                  throw c;
                }),
              ),
            ),
            Qr((a) => !!a),
            ei((a, l) => {
              if (Lp(a)) return U1(t, i, o) ? z(new ce([], {})) : La(t);
              throw a;
            }),
          );
        }
        expandSegmentAgainstRoute(n, t, r, i, o, s, a) {
          return $1(i, t, o, s)
            ? void 0 === i.redirectTo
              ? this.matchSegmentAgainstRoute(n, t, i, o, s)
              : a && this.allowRedirects
                ? this.expandSegmentAgainstRouteUsingRedirect(n, t, r, i, o, s)
                : La(t)
            : La(t);
        }
        expandSegmentAgainstRouteUsingRedirect(n, t, r, i, o, s) {
          return "**" === i.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(n, r, i, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                n,
                t,
                r,
                i,
                o,
                s,
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(n, t, r, i) {
          const o = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? z1(o)
            : this.lineralizeSegments(r, o).pipe(
                vt((s) => {
                  const a = new ce(s, {});
                  return this.expandSegment(n, a, t, s, i, !1);
                }),
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(n, t, r, i, o, s) {
          const {
            matched: a,
            consumedSegments: l,
            remainingSegments: c,
            positionalParamSegments: u,
          } = Bp(t, i, o);
          if (!a) return La(t);
          const d = this.applyRedirectCommands(l, i.redirectTo, u);
          return i.redirectTo.startsWith("/")
            ? z1(d)
            : this.lineralizeSegments(i, d).pipe(
                vt((f) => this.expandSegment(n, t, r, f.concat(c), s, !1)),
              );
        }
        matchSegmentAgainstRoute(n, t, r, i, o) {
          return "**" === r.path
            ? ((n = L1(r, n)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? z({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(n, r)
                  ).pipe(
                    Y(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new ce(i, {})
                      ),
                    ),
                  )
                : z(new ce(i, {})))
            : j1(t, r, i, n).pipe(
                Hn(
                  ({
                    matched: s,
                    consumedSegments: a,
                    remainingSegments: l,
                  }) =>
                    s
                      ? this.getChildConfig((n = r._injector ?? n), r, i).pipe(
                          vt((u) => {
                            const d = u.injector ?? n,
                              f = u.routes,
                              { segmentGroup: h, slicedSegments: p } = cu(
                                t,
                                a,
                                l,
                                f,
                              ),
                              m = new ce(h.segments, h.children);
                            if (0 === p.length && m.hasChildren())
                              return this.expandChildren(d, f, m).pipe(
                                Y((D) => new ce(a, D)),
                              );
                            if (0 === f.length && 0 === p.length)
                              return z(new ce(a, {}));
                            const v = jn(r) === o;
                            return this.expandSegment(
                              d,
                              m,
                              f,
                              p,
                              v ? oe : o,
                              !0,
                            ).pipe(
                              Y(
                                (w) => new ce(a.concat(w.segments), w.children),
                              ),
                            );
                          }),
                        )
                      : La(t),
                ),
              );
        }
        getChildConfig(n, t, r) {
          return t.children
            ? z({ routes: t.children, injector: n })
            : t.loadChildren
              ? void 0 !== t._loadedRoutes
                ? z({ routes: t._loadedRoutes, injector: t._loadedInjector })
                : (function KL(e, n, t, r) {
                    const i = n.canLoad;
                    return void 0 === i || 0 === i.length
                      ? z(!0)
                      : z(
                          i.map((s) => {
                            const a = Qo(s, e);
                            return ti(
                              (function LL(e) {
                                return e && ka(e.canLoad);
                              })(a)
                                ? a.canLoad(n, t)
                                : e.runInContext(() => a(n, t)),
                            );
                          }),
                        ).pipe(Xo(), H1());
                  })(n, t, r).pipe(
                    vt((i) =>
                      i
                        ? this.configLoader.loadChildren(n, t).pipe(
                            It((o) => {
                              (t._loadedRoutes = o.routes),
                                (t._loadedInjector = o.injector);
                            }),
                          )
                        : (function i2(e) {
                            return wa(P1(du, 3));
                          })(),
                    ),
                  )
              : z({ routes: [], injector: n });
        }
        lineralizeSegments(n, t) {
          let r = [],
            i = t.root;
          for (;;) {
            if (((r = r.concat(i.segments)), 0 === i.numberOfChildren))
              return z(r);
            if (i.numberOfChildren > 1 || !i.children[oe])
              return n.redirectTo, wa(new A(4e3, du));
            i = i.children[oe];
          }
        }
        applyRedirectCommands(n, t, r) {
          return this.applyRedirectCreateUrlTree(
            t,
            this.urlSerializer.parse(t),
            n,
            r,
          );
        }
        applyRedirectCreateUrlTree(n, t, r, i) {
          const o = this.createSegmentGroup(n, t.root, r, i);
          return new ni(
            o,
            this.createQueryParams(t.queryParams, this.urlTree.queryParams),
            t.fragment,
          );
        }
        createQueryParams(n, t) {
          const r = {};
          return (
            kt(n, (i, o) => {
              if ("string" == typeof i && i.startsWith(":")) {
                const a = i.substring(1);
                r[o] = t[a];
              } else r[o] = i;
            }),
            r
          );
        }
        createSegmentGroup(n, t, r, i) {
          const o = this.createSegments(n, t.segments, r, i);
          let s = {};
          return (
            kt(t.children, (a, l) => {
              s[l] = this.createSegmentGroup(n, a, r, i);
            }),
            new ce(o, s)
          );
        }
        createSegments(n, t, r, i) {
          return t.map((o) =>
            o.path.startsWith(":")
              ? this.findPosParam(n, o, i)
              : this.findOrReturn(o, r),
          );
        }
        findPosParam(n, t, r) {
          const i = r[t.path.substring(1)];
          if (!i) throw new A(4001, du);
          return i;
        }
        findOrReturn(n, t) {
          let r = 0;
          for (const i of t) {
            if (i.path === n.path) return t.splice(r), i;
            r++;
          }
          return n;
        }
      }
      class l2 {}
      class d2 {
        constructor(n, t, r, i, o, s, a) {
          (this.injector = n),
            (this.rootComponentType = t),
            (this.config = r),
            (this.urlTree = i),
            (this.url = o),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a);
        }
        recognize() {
          const n = cu(
            this.urlTree.root,
            [],
            [],
            this.config.filter((t) => void 0 === t.redirectTo),
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            n,
            oe,
          ).pipe(
            Y((t) => {
              if (null === t) return null;
              const r = new ou(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  oe,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {},
                ),
                i = new Fr(r, t),
                o = new O1(this.url, i);
              return this.inheritParamsAndData(o._root), o;
            }),
          );
        }
        inheritParamsAndData(n) {
          const t = n.value,
            r = I1(t, this.paramsInheritanceStrategy);
          (t.params = Object.freeze(r.params)),
            (t.data = Object.freeze(r.data)),
            n.children.forEach((i) => this.inheritParamsAndData(i));
        }
        processSegmentGroup(n, t, r, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(n, t, r)
            : this.processSegment(n, t, r, r.segments, i);
        }
        processChildren(n, t, r) {
          return dt(Object.keys(r.children)).pipe(
            Xr((i) => {
              const o = r.children[i],
                s = V1(t, i);
              return this.processSegmentGroup(n, s, o, i);
            }),
            r1((i, o) => (i && o ? (i.push(...o), i) : null)),
            (function Ak(e, n = !1) {
              return We((t, r) => {
                let i = 0;
                t.subscribe(
                  Re(r, (o) => {
                    const s = e(o, i++);
                    (s || n) && r.next(o), !s && r.complete();
                  }),
                );
              });
            })((i) => null !== i),
            Jc(null),
            i1(),
            Y((i) => {
              if (null === i) return null;
              const o = q1(i);
              return (
                (function f2(e) {
                  e.sort((n, t) =>
                    n.value.outlet === oe
                      ? -1
                      : t.value.outlet === oe
                        ? 1
                        : n.value.outlet.localeCompare(t.value.outlet),
                  );
                })(o),
                o
              );
            }),
          );
        }
        processSegment(n, t, r, i, o) {
          return dt(t).pipe(
            Xr((s) =>
              this.processSegmentAgainstRoute(s._injector ?? n, s, r, i, o),
            ),
            Qr((s) => !!s),
            ei((s) => {
              if (Lp(s)) return U1(r, i, o) ? z([]) : z(null);
              throw s;
            }),
          );
        }
        processSegmentAgainstRoute(n, t, r, i, o) {
          if (t.redirectTo || !$1(t, r, i, o)) return z(null);
          let s;
          if ("**" === t.path) {
            const a = i.length > 0 ? l1(i).parameters : {},
              l = J1(r) + i.length;
            s = z({
              snapshot: new ou(
                i,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                Z1(t),
                jn(t),
                t.component ?? t._loadedComponent ?? null,
                t,
                Y1(r),
                l,
                K1(t),
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = j1(r, t, i, n).pipe(
              Y(
                ({
                  matched: a,
                  consumedSegments: l,
                  remainingSegments: c,
                  parameters: u,
                }) => {
                  if (!a) return null;
                  const d = J1(r) + l.length;
                  return {
                    snapshot: new ou(
                      l,
                      u,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      Z1(t),
                      jn(t),
                      t.component ?? t._loadedComponent ?? null,
                      t,
                      Y1(r),
                      d,
                      K1(t),
                    ),
                    consumedSegments: l,
                    remainingSegments: c,
                  };
                },
              ),
            );
          return s.pipe(
            Hn((a) => {
              if (null === a) return z(null);
              const {
                snapshot: l,
                consumedSegments: c,
                remainingSegments: u,
              } = a;
              n = t._injector ?? n;
              const d = t._loadedInjector ?? n,
                f = (function h2(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                      ? e._loadedRoutes
                      : [];
                })(t),
                { segmentGroup: h, slicedSegments: p } = cu(
                  r,
                  c,
                  u,
                  f.filter((v) => void 0 === v.redirectTo),
                );
              if (0 === p.length && h.hasChildren())
                return this.processChildren(d, f, h).pipe(
                  Y((v) => (null === v ? null : [new Fr(l, v)])),
                );
              if (0 === f.length && 0 === p.length) return z([new Fr(l, [])]);
              const m = jn(t) === o;
              return this.processSegment(d, f, h, p, m ? oe : o).pipe(
                Y((v) => (null === v ? null : [new Fr(l, v)])),
              );
            }),
          );
        }
      }
      function p2(e) {
        const n = e.value.routeConfig;
        return n && "" === n.path && void 0 === n.redirectTo;
      }
      function q1(e) {
        const n = [],
          t = new Set();
        for (const r of e) {
          if (!p2(r)) {
            n.push(r);
            continue;
          }
          const i = n.find((o) => r.value.routeConfig === o.value.routeConfig);
          void 0 !== i ? (i.children.push(...r.children), t.add(i)) : n.push(r);
        }
        for (const r of t) {
          const i = q1(r.children);
          n.push(new Fr(r.value, i));
        }
        return n.filter((r) => !t.has(r));
      }
      function Y1(e) {
        let n = e;
        for (; n._sourceSegment; ) n = n._sourceSegment;
        return n;
      }
      function J1(e) {
        let n = e,
          t = n._segmentIndexShift ?? 0;
        for (; n._sourceSegment; )
          (n = n._sourceSegment), (t += n._segmentIndexShift ?? 0);
        return t - 1;
      }
      function Z1(e) {
        return e.data || {};
      }
      function K1(e) {
        return e.resolve || {};
      }
      function _2(e, n) {
        return vt((t) => {
          const {
            targetSnapshot: r,
            guards: { canActivateChecks: i },
          } = t;
          if (!i.length) return z(t);
          let o = 0;
          return dt(i).pipe(
            Xr((s) =>
              (function v2(e, n, t, r) {
                const i = e.routeConfig,
                  o = e._resolve;
                return (
                  void 0 !== i?.title && !Q1(i) && (o[Ea] = i.title),
                  (function y2(e, n, t, r) {
                    const i = (function b2(e) {
                      return [
                        ...Object.keys(e),
                        ...Object.getOwnPropertySymbols(e),
                      ];
                    })(e);
                    if (0 === i.length) return z({});
                    const o = {};
                    return dt(i).pipe(
                      vt((s) =>
                        (function D2(e, n, t, r) {
                          const i = Pa(n) ?? r,
                            o = Qo(e, i);
                          return ti(
                            o.resolve
                              ? o.resolve(n, t)
                              : i.runInContext(() => o(n, t)),
                          );
                        })(e[s], n, t, r).pipe(
                          Qr(),
                          It((a) => {
                            o[s] = a;
                          }),
                        ),
                      ),
                      vp(1),
                      (function o1(e) {
                        return Y(() => e);
                      })(o),
                      ei((s) => (Lp(s) ? In : wa(s))),
                    );
                  })(o, e, n, r).pipe(
                    Y(
                      (s) => (
                        (e._resolvedData = s),
                        (e.data = I1(e, t).resolve),
                        i && Q1(i) && (e.data[Ea] = i.title),
                        null
                      ),
                    ),
                  )
                );
              })(s.route, r, e, n),
            ),
            It(() => o++),
            vp(1),
            vt((s) => (o === i.length ? z(t) : In)),
          );
        });
      }
      function Q1(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function Hp(e) {
        return Hn((n) => {
          const t = e(n);
          return t ? dt(t).pipe(Y(() => n)) : z(n);
        });
      }
      const es = new $("ROUTES");
      let jp = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = X(Sb));
          }
          loadComponent(t) {
            if (this.componentLoaders.get(t))
              return this.componentLoaders.get(t);
            if (t._loadedComponent) return z(t._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(t);
            const r = ti(t.loadComponent()).pipe(
                Y(eC),
                It((o) => {
                  this.onLoadEndListener && this.onLoadEndListener(t),
                    (t._loadedComponent = o);
                }),
                yp(() => {
                  this.componentLoaders.delete(t);
                }),
              ),
              i = new t1(r, () => new Me()).pipe(_p());
            return this.componentLoaders.set(t, i), i;
          }
          loadChildren(t, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return z({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const o = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                Y((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let l,
                    c,
                    u = !1;
                  Array.isArray(a)
                    ? (c = a)
                    : ((l = a.create(t).injector),
                      (c = a1(l.get(es, [], Z.Self | Z.Optional))));
                  return { routes: c.map(kp), injector: l };
                }),
                yp(() => {
                  this.childrenLoaders.delete(r);
                }),
              ),
              s = new t1(o, () => new Me()).pipe(_p());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(t) {
            return ti(t()).pipe(
              Y(eC),
              vt((r) =>
                r instanceof L0 || Array.isArray(r)
                  ? z(r)
                  : dt(this.compiler.compileModuleAsync(r)),
              ),
            );
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function eC(e) {
        return (function C2(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let pu = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new Me()),
              (this.configLoader = X(jp)),
              (this.environmentInjector = X(xn)),
              (this.urlSerializer = X(Ta)),
              (this.rootContexts = X(Ra)),
              (this.navigationId = 0),
              (this.afterPreactivation = () => z(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (i) =>
                this.events.next(new cL(i))),
              (this.configLoader.onLoadStartListener = (i) =>
                this.events.next(new lL(i)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(t) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...t, id: r });
          }
          setupNavigations(t) {
            return (
              (this.transitions = new Nt({
                id: 0,
                targetPageId: 0,
                currentUrlTree: t.currentUrlTree,
                currentRawUrl: t.currentUrlTree,
                extractedUrl: t.urlHandlingStrategy.extract(t.currentUrlTree),
                urlAfterRedirects: t.urlHandlingStrategy.extract(
                  t.currentUrlTree,
                ),
                rawUrl: t.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Oa,
                restoredState: null,
                currentSnapshot: t.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: t.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                wt((r) => 0 !== r.id),
                Y((r) => ({
                  ...r,
                  extractedUrl: t.urlHandlingStrategy.extract(r.rawUrl),
                })),
                Hn((r) => {
                  let i = !1,
                    o = !1;
                  return z(r).pipe(
                    It((s) => {
                      this.currentNavigation = {
                        id: s.id,
                        initialUrl: s.rawUrl,
                        extractedUrl: s.extractedUrl,
                        trigger: s.source,
                        extras: s.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Hn((s) => {
                      const a = t.browserUrlTree.toString(),
                        l =
                          !t.navigated ||
                          s.extractedUrl.toString() !== a ||
                          a !== t.currentUrlTree.toString();
                      if (
                        !l &&
                        "reload" !==
                          (s.extras.onSameUrlNavigation ??
                            t.onSameUrlNavigation)
                      ) {
                        const u = "";
                        return (
                          this.events.next(
                            new iu(s.id, t.serializeUrl(r.rawUrl), u, 0),
                          ),
                          (t.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          In
                        );
                      }
                      if (t.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                        return (
                          tC(s.source) && (t.browserUrlTree = s.extractedUrl),
                          z(s).pipe(
                            Hn((u) => {
                              const d = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new Tp(
                                    u.id,
                                    this.urlSerializer.serialize(
                                      u.extractedUrl,
                                    ),
                                    u.source,
                                    u.restoredState,
                                  ),
                                ),
                                d !== this.transitions?.getValue()
                                  ? In
                                  : Promise.resolve(u)
                              );
                            }),
                            (function a2(e, n, t, r) {
                              return Hn((i) =>
                                (function o2(e, n, t, r, i) {
                                  return new s2(e, n, t, r, i).apply();
                                })(e, n, t, i.extractedUrl, r).pipe(
                                  Y((o) => ({ ...i, urlAfterRedirects: o })),
                                ),
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.urlSerializer,
                              t.config,
                            ),
                            It((u) => {
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: u.urlAfterRedirects,
                              }),
                                (r.urlAfterRedirects = u.urlAfterRedirects);
                            }),
                            (function m2(e, n, t, r, i) {
                              return vt((o) =>
                                (function u2(
                                  e,
                                  n,
                                  t,
                                  r,
                                  i,
                                  o,
                                  s = "emptyOnly",
                                ) {
                                  return new d2(e, n, t, r, i, s, o)
                                    .recognize()
                                    .pipe(
                                      Hn((a) =>
                                        null === a
                                          ? (function c2(e) {
                                              return new Ce((n) => n.error(e));
                                            })(new l2())
                                          : z(a),
                                      ),
                                    );
                                })(
                                  e,
                                  n,
                                  t,
                                  o.urlAfterRedirects,
                                  r.serialize(o.urlAfterRedirects),
                                  r,
                                  i,
                                ).pipe(Y((s) => ({ ...o, targetSnapshot: s }))),
                              );
                            })(
                              this.environmentInjector,
                              this.rootComponentType,
                              t.config,
                              this.urlSerializer,
                              t.paramsInheritanceStrategy,
                            ),
                            It((u) => {
                              if (
                                ((r.targetSnapshot = u.targetSnapshot),
                                "eager" === t.urlUpdateStrategy)
                              ) {
                                if (!u.extras.skipLocationChange) {
                                  const f = t.urlHandlingStrategy.merge(
                                    u.urlAfterRedirects,
                                    u.rawUrl,
                                  );
                                  t.setBrowserUrl(f, u);
                                }
                                t.browserUrlTree = u.urlAfterRedirects;
                              }
                              const d = new rL(
                                u.id,
                                this.urlSerializer.serialize(u.extractedUrl),
                                this.urlSerializer.serialize(
                                  u.urlAfterRedirects,
                                ),
                                u.targetSnapshot,
                              );
                              this.events.next(d);
                            }),
                          )
                        );
                      if (
                        l &&
                        t.urlHandlingStrategy.shouldProcessUrl(t.rawUrlTree)
                      ) {
                        const {
                            id: u,
                            extractedUrl: d,
                            source: f,
                            restoredState: h,
                            extras: p,
                          } = s,
                          m = new Tp(u, this.urlSerializer.serialize(d), f, h);
                        this.events.next(m);
                        const v = N1(d, this.rootComponentType).snapshot;
                        return z(
                          (r = {
                            ...s,
                            targetSnapshot: v,
                            urlAfterRedirects: d,
                            extras: {
                              ...p,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          }),
                        );
                      }
                      {
                        const u = "";
                        return (
                          this.events.next(
                            new iu(s.id, t.serializeUrl(r.extractedUrl), u, 1),
                          ),
                          (t.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          In
                        );
                      }
                    }),
                    It((s) => {
                      const a = new iL(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                      );
                      this.events.next(a);
                    }),
                    Y(
                      (s) =>
                        (r = {
                          ...s,
                          guards: RL(
                            s.targetSnapshot,
                            s.currentSnapshot,
                            this.rootContexts,
                          ),
                        }),
                    ),
                    (function UL(e, n) {
                      return vt((t) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: i,
                          guards: {
                            canActivateChecks: o,
                            canDeactivateChecks: s,
                          },
                        } = t;
                        return 0 === s.length && 0 === o.length
                          ? z({ ...t, guardsResult: !0 })
                          : (function GL(e, n, t, r) {
                              return dt(e).pipe(
                                vt((i) =>
                                  (function ZL(e, n, t, r, i) {
                                    const o =
                                      n && n.routeConfig
                                        ? n.routeConfig.canDeactivate
                                        : null;
                                    return o && 0 !== o.length
                                      ? z(
                                          o.map((a) => {
                                            const l = Pa(n) ?? i,
                                              c = Qo(a, l);
                                            return ti(
                                              (function HL(e) {
                                                return e && ka(e.canDeactivate);
                                              })(c)
                                                ? c.canDeactivate(e, n, t, r)
                                                : l.runInContext(() =>
                                                    c(e, n, t, r),
                                                  ),
                                            ).pipe(Qr());
                                          }),
                                        ).pipe(Xo())
                                      : z(!0);
                                  })(i.component, i.route, t, n, r),
                                ),
                                Qr((i) => !0 !== i, !0),
                              );
                            })(s, r, i, e).pipe(
                              vt((a) =>
                                a &&
                                (function kL(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function zL(e, n, t, r) {
                                      return dt(n).pipe(
                                        Xr((i) =>
                                          Ca(
                                            (function qL(e, n) {
                                              return (
                                                null !== e && n && n(new uL(e)),
                                                z(!0)
                                              );
                                            })(i.route.parent, r),
                                            (function WL(e, n) {
                                              return (
                                                null !== e && n && n(new fL(e)),
                                                z(!0)
                                              );
                                            })(i.route, r),
                                            (function JL(e, n, t) {
                                              const r = n[n.length - 1],
                                                o = n
                                                  .slice(0, n.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function PL(e) {
                                                      const n = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return n && 0 !== n.length
                                                        ? { node: e, guards: n }
                                                        : null;
                                                    })(s),
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    e1(() =>
                                                      z(
                                                        s.guards.map((l) => {
                                                          const c =
                                                              Pa(s.node) ?? t,
                                                            u = Qo(l, c);
                                                          return ti(
                                                            (function BL(e) {
                                                              return (
                                                                e &&
                                                                ka(
                                                                  e.canActivateChild,
                                                                )
                                                              );
                                                            })(u)
                                                              ? u.canActivateChild(
                                                                  r,
                                                                  e,
                                                                )
                                                              : c.runInContext(
                                                                  () => u(r, e),
                                                                ),
                                                          ).pipe(Qr());
                                                        }),
                                                      ).pipe(Xo()),
                                                    ),
                                                  );
                                              return z(o).pipe(Xo());
                                            })(e, i.path, t),
                                            (function YL(e, n, t) {
                                              const r = n.routeConfig
                                                ? n.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return z(!0);
                                              const i = r.map((o) =>
                                                e1(() => {
                                                  const s = Pa(n) ?? t,
                                                    a = Qo(o, s);
                                                  return ti(
                                                    (function VL(e) {
                                                      return (
                                                        e && ka(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(n, e)
                                                      : s.runInContext(() =>
                                                          a(n, e),
                                                        ),
                                                  ).pipe(Qr());
                                                }),
                                              );
                                              return z(i).pipe(Xo());
                                            })(e, i.route, t),
                                          ),
                                        ),
                                        Qr((i) => !0 !== i, !0),
                                      );
                                    })(r, o, e, n)
                                  : z(a),
                              ),
                              Y((a) => ({ ...t, guardsResult: a })),
                            );
                      });
                    })(this.environmentInjector, (s) => this.events.next(s)),
                    It((s) => {
                      if (
                        ((r.guardsResult = s.guardsResult), Ni(s.guardsResult))
                      )
                        throw R1(0, s.guardsResult);
                      const a = new oL(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                        !!s.guardsResult,
                      );
                      this.events.next(a);
                    }),
                    wt(
                      (s) =>
                        !!s.guardsResult ||
                        (t.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1),
                    ),
                    Hp((s) => {
                      if (s.guards.canActivateChecks.length)
                        return z(s).pipe(
                          It((a) => {
                            const l = new sL(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot,
                            );
                            this.events.next(l);
                          }),
                          Hn((a) => {
                            let l = !1;
                            return z(a).pipe(
                              _2(
                                t.paramsInheritanceStrategy,
                                this.environmentInjector,
                              ),
                              It({
                                next: () => (l = !0),
                                complete: () => {
                                  l ||
                                    (t.restoreHistory(a),
                                    this.cancelNavigationTransition(a, "", 2));
                                },
                              }),
                            );
                          }),
                          It((a) => {
                            const l = new aL(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot,
                            );
                            this.events.next(l);
                          }),
                        );
                    }),
                    Hp((s) => {
                      const a = (l) => {
                        const c = [];
                        l.routeConfig?.loadComponent &&
                          !l.routeConfig._loadedComponent &&
                          c.push(
                            this.configLoader.loadComponent(l.routeConfig).pipe(
                              It((u) => {
                                l.component = u;
                              }),
                              Y(() => {}),
                            ),
                          );
                        for (const u of l.children) c.push(...a(u));
                        return c;
                      };
                      return qc(a(s.targetSnapshot.root)).pipe(Jc(), gt(1));
                    }),
                    Hp(() => this.afterPreactivation()),
                    Y((s) => {
                      const a = (function DL(e, n, t) {
                        const r = Aa(e, n._root, t ? t._root : void 0);
                        return new M1(r, n);
                      })(
                        t.routeReuseStrategy,
                        s.targetSnapshot,
                        s.currentRouterState,
                      );
                      return (r = { ...s, targetRouterState: a });
                    }),
                    It((s) => {
                      (t.currentUrlTree = s.urlAfterRedirects),
                        (t.rawUrlTree = t.urlHandlingStrategy.merge(
                          s.urlAfterRedirects,
                          s.rawUrl,
                        )),
                        (t.routerState = s.targetRouterState),
                        "deferred" === t.urlUpdateStrategy &&
                          (s.extras.skipLocationChange ||
                            t.setBrowserUrl(t.rawUrlTree, s),
                          (t.browserUrlTree = s.urlAfterRedirects));
                    }),
                    ((e, n, t) =>
                      Y(
                        (r) => (
                          new AL(
                            n,
                            r.targetRouterState,
                            r.currentRouterState,
                            t,
                          ).activate(e),
                          r
                        ),
                      ))(this.rootContexts, t.routeReuseStrategy, (s) =>
                      this.events.next(s),
                    ),
                    gt(1),
                    It({
                      next: (s) => {
                        (i = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (t.navigated = !0),
                          this.events.next(
                            new Ii(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(t.currentUrlTree),
                            ),
                          ),
                          t.titleStrategy?.updateTitle(
                            s.targetRouterState.snapshot,
                          ),
                          s.resolve(!0);
                      },
                      complete: () => {
                        i = !0;
                      },
                    }),
                    yp(() => {
                      i || o || this.cancelNavigationTransition(r, "", 1),
                        this.currentNavigation?.id === r.id &&
                          (this.currentNavigation = null);
                    }),
                    ei((s) => {
                      if (((o = !0), F1(s))) {
                        x1(s) || ((t.navigated = !0), t.restoreHistory(r, !0));
                        const a = new ru(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s.message,
                          s.cancellationCode,
                        );
                        if ((this.events.next(a), x1(s))) {
                          const l = t.urlHandlingStrategy.merge(
                              s.url,
                              t.rawUrlTree,
                            ),
                            c = {
                              skipLocationChange: r.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === t.urlUpdateStrategy || tC(r.source),
                            };
                          t.scheduleNavigation(l, Oa, null, c, {
                            resolve: r.resolve,
                            reject: r.reject,
                            promise: r.promise,
                          });
                        } else r.resolve(!1);
                      } else {
                        t.restoreHistory(r, !0);
                        const a = new Mp(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s,
                          r.targetSnapshot ?? void 0,
                        );
                        this.events.next(a);
                        try {
                          r.resolve(t.errorHandler(s));
                        } catch (l) {
                          r.reject(l);
                        }
                      }
                      return In;
                    }),
                  );
                }),
              )
            );
          }
          cancelNavigationTransition(t, r, i) {
            const o = new ru(
              t.id,
              this.urlSerializer.serialize(t.extractedUrl),
              r,
              i,
            );
            this.events.next(o), t.resolve(!1);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function tC(e) {
        return e !== Oa;
      }
      let nC = (() => {
          class e {
            buildTitle(t) {
              let r,
                i = t.root;
              for (; void 0 !== i; )
                (r = this.getResolvedTitleForRoute(i) ?? r),
                  (i = i.children.find((o) => o.outlet === oe));
              return r;
            }
            getResolvedTitleForRoute(t) {
              return t.data[Ea];
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return X(w2);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        w2 = (() => {
          class e extends nC {
            constructor(t) {
              super(), (this.title = t);
            }
            updateTitle(t) {
              const r = this.buildTitle(t);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k(YD));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        E2 = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return X(T2);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class S2 {
        shouldDetach(n) {
          return !1;
        }
        store(n, t) {}
        shouldAttach(n) {
          return !1;
        }
        retrieve(n) {
          return null;
        }
        shouldReuseRoute(n, t) {
          return n.routeConfig === t.routeConfig;
        }
      }
      let T2 = (() => {
        class e extends S2 {}
        return (
          (e.ɵfac = (function () {
            let n;
            return function (r) {
              return (n || (n = et(e)))(r || e);
            };
          })()),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const gu = new $("", { providedIn: "root", factory: () => ({}) });
      let N2 = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return X(I2);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        I2 = (() => {
          class e {
            shouldProcessUrl(t) {
              return !0;
            }
            extract(t) {
              return t;
            }
            merge(t, r) {
              return t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function O2(e) {
        throw e;
      }
      function A2(e, n, t) {
        return n.parse("/");
      }
      const R2 = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        P2 = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let wn = (() => {
        class e {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            if ("computed" === this.canceledNavigationResolution)
              return this.location.getState()?.ɵrouterPageId;
          }
          get events() {
            return this.navigationTransitions.events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = X(dP)),
              (this.isNgZoneEnabled = !1),
              (this.options = X(gu, { optional: !0 }) || {}),
              (this.errorHandler = this.options.errorHandler || O2),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || A2),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = X(N2)),
              (this.routeReuseStrategy = X(E2)),
              (this.urlCreationStrategy = X(vL)),
              (this.titleStrategy = X(nC)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || "ignore"),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly"),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || "deferred"),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace"),
              (this.config = a1(X(es, { optional: !0 }) ?? [])),
              (this.navigationTransitions = X(pu)),
              (this.urlSerializer = X(Ta)),
              (this.location = X(Gh)),
              (this.isNgZoneEnabled =
                X(ve) instanceof ve && ve.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new ni()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = N1(this.currentUrlTree, null)),
              this.navigationTransitions.setupNavigations(this).subscribe(
                (t) => {
                  (this.lastSuccessfulId = t.id),
                    (this.currentPageId = this.browserPageId ?? 0);
                },
                (t) => {
                  this.console.warn(`Unhandled Navigation Error: ${t}`);
                },
              );
          }
          resetRootComponentType(t) {
            (this.routerState.root.component = t),
              (this.navigationTransitions.rootComponentType = t);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const t = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), Oa, t);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((t) => {
                const r = "popstate" === t.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(t.url, r, t.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(t, r, i) {
            const o = { replaceUrl: !0 },
              s = i?.navigationId ? i : null;
            if (i) {
              const l = { ...i };
              delete l.navigationId,
                delete l.ɵrouterPageId,
                0 !== Object.keys(l).length && (o.state = l);
            }
            const a = this.parseUrl(t);
            this.scheduleNavigation(a, r, s, o);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          resetConfig(t) {
            (this.config = t.map(kp)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(t, r = {}) {
            const {
                relativeTo: i,
                queryParams: o,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: l,
              } = r,
              c = l ? this.currentUrlTree.fragment : s;
            let u = null;
            switch (a) {
              case "merge":
                u = { ...this.currentUrlTree.queryParams, ...o };
                break;
              case "preserve":
                u = this.currentUrlTree.queryParams;
                break;
              default:
                u = o || null;
            }
            return (
              null !== u && (u = this.removeEmptyProps(u)),
              this.urlCreationStrategy.createUrlTree(
                i,
                this.routerState,
                this.currentUrlTree,
                t,
                u,
                c ?? null,
              )
            );
          }
          navigateByUrl(t, r = { skipLocationChange: !1 }) {
            const i = Ni(t) ? t : this.parseUrl(t),
              o = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
            return this.scheduleNavigation(o, Oa, null, r);
          }
          navigate(t, r = { skipLocationChange: !1 }) {
            return (
              (function x2(e) {
                for (let n = 0; n < e.length; n++) {
                  const t = e[n];
                  if (null == t) throw new A(4008, false);
                }
              })(t),
              this.navigateByUrl(this.createUrlTree(t, r), r)
            );
          }
          serializeUrl(t) {
            return this.urlSerializer.serialize(t);
          }
          parseUrl(t) {
            let r;
            try {
              r = this.urlSerializer.parse(t);
            } catch (i) {
              r = this.malformedUriErrorHandler(i, this.urlSerializer, t);
            }
            return r;
          }
          isActive(t, r) {
            let i;
            if (((i = !0 === r ? { ...R2 } : !1 === r ? { ...P2 } : r), Ni(t)))
              return u1(this.currentUrlTree, t, i);
            const o = this.parseUrl(t);
            return u1(this.currentUrlTree, o, i);
          }
          removeEmptyProps(t) {
            return Object.keys(t).reduce((r, i) => {
              const o = t[i];
              return null != o && (r[i] = o), r;
            }, {});
          }
          scheduleNavigation(t, r, i, o, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, l, c, u;
            return (
              s
                ? ((a = s.resolve), (l = s.reject), (c = s.promise))
                : (c = new Promise((d, f) => {
                    (a = d), (l = f);
                  })),
              (u =
                "computed" === this.canceledNavigationResolution
                  ? i && i.ɵrouterPageId
                    ? i.ɵrouterPageId
                    : (this.browserPageId ?? 0) + 1
                  : 0),
              this.navigationTransitions.handleNavigationRequest({
                targetPageId: u,
                source: r,
                restoredState: i,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                rawUrl: t,
                extras: o,
                resolve: a,
                reject: l,
                promise: c,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              c.catch((d) => Promise.reject(d))
            );
          }
          setBrowserUrl(t, r) {
            const i = this.urlSerializer.serialize(t);
            if (this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl) {
              const s = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, this.browserPageId),
              };
              this.location.replaceState(i, "", s);
            } else {
              const o = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, r.targetPageId),
              };
              this.location.go(i, "", o);
            }
          }
          restoreHistory(t, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const o =
                this.currentPageId - (this.browserPageId ?? this.currentPageId);
              0 !== o
                ? this.location.historyGo(o)
                : this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === o &&
                  (this.resetState(t),
                  (this.browserUrlTree = t.currentUrlTree),
                  this.resetUrlToCurrentUrlTree());
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(t), this.resetUrlToCurrentUrlTree());
          }
          resetState(t) {
            (this.routerState = t.currentRouterState),
              (this.currentUrlTree = t.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                t.rawUrl,
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId,
              ),
            );
          }
          generateNgRouterState(t, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: t, ɵrouterPageId: r }
              : { navigationId: t };
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class rC {}
      let L2 = (() => {
        class e {
          constructor(t, r, i, o, s) {
            (this.router = t),
              (this.injector = i),
              (this.preloadingStrategy = o),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                wt((t) => t instanceof Ii),
                Xr(() => this.preload()),
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(t, r) {
            const i = [];
            for (const o of r) {
              o.providers &&
                !o._injector &&
                (o._injector = bc(o.providers, t, `Route: ${o.path}`));
              const s = o._injector ?? t,
                a = o._loadedInjector ?? s;
              ((o.loadChildren && !o._loadedRoutes && void 0 === o.canLoad) ||
                (o.loadComponent && !o._loadedComponent)) &&
                i.push(this.preloadConfig(s, o)),
                (o.children || o._loadedRoutes) &&
                  i.push(this.processRoutes(a, o.children ?? o._loadedRoutes));
            }
            return dt(i).pipe(to());
          }
          preloadConfig(t, r) {
            return this.preloadingStrategy.preload(r, () => {
              let i;
              i =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(t, r)
                  : z(null);
              const o = i.pipe(
                vt((s) =>
                  null === s
                    ? z(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? t, s.routes)),
                ),
              );
              return r.loadComponent && !r._loadedComponent
                ? dt([o, this.loader.loadComponent(r)]).pipe(to())
                : o;
            });
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(k(wn), k(Sb), k(xn), k(rC), k(jp));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Gp = new $("");
      let iC = (() => {
        class e {
          constructor(t, r, i, o, s = {}) {
            (this.urlSerializer = t),
              (this.transitions = r),
              (this.viewportScroller = i),
              (this.zone = o),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((t) => {
              t instanceof Tp
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = t.navigationTrigger),
                  (this.restoredId = t.restoredState
                    ? t.restoredState.navigationId
                    : 0))
                : t instanceof Ii &&
                  ((this.lastId = t.id),
                  this.scheduleScrollEvent(
                    t,
                    this.urlSerializer.parse(t.urlAfterRedirects).fragment,
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((t) => {
              t instanceof S1 &&
                (t.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(t.position)
                  : t.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(t, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new S1(
                      t,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r,
                    ),
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (t) {
            !(function $v() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      var En = (() => (
        ((En = En || {})[(En.COMPLETE = 0)] = "COMPLETE"),
        (En[(En.FAILED = 1)] = "FAILED"),
        (En[(En.REDIRECTING = 2)] = "REDIRECTING"),
        En
      ))();
      const ts = !1;
      function ri(e, n) {
        return { ɵkind: e, ɵproviders: n };
      }
      const zp = new $("", { providedIn: "root", factory: () => !1 });
      function sC() {
        const e = X(ln);
        return (n) => {
          const t = e.get(Go);
          if (n !== t.components[0]) return;
          const r = e.get(wn),
            i = e.get(aC);
          1 === e.get(Wp) && r.initialNavigation(),
            e.get(lC, null, Z.Optional)?.setUpPreloading(),
            e.get(Gp, null, Z.Optional)?.init(),
            r.resetRootComponentType(t.componentTypes[0]),
            i.closed || (i.next(), i.complete(), i.unsubscribe());
        };
      }
      const aC = new $(ts ? "bootstrap done indicator" : "", {
          factory: () => new Me(),
        }),
        Wp = new $(ts ? "initial navigation" : "", {
          providedIn: "root",
          factory: () => 1,
        });
      function $2() {
        let e = [];
        return (
          (e = ts
            ? [
                {
                  provide: Ql,
                  multi: !0,
                  useFactory: () => {
                    const n = X(wn);
                    return () =>
                      n.events.subscribe((t) => {
                        console.group?.(`Router Event: ${t.constructor.name}`),
                          console.log(
                            (function pL(e) {
                              if (!("type" in e))
                                return `Unknown Router Event: ${e.constructor.name}`;
                              switch (e.type) {
                                case 14:
                                  return `ActivationEnd(path: '${e.snapshot.routeConfig?.path || ""}')`;
                                case 13:
                                  return `ActivationStart(path: '${e.snapshot.routeConfig?.path || ""}')`;
                                case 12:
                                  return `ChildActivationEnd(path: '${e.snapshot.routeConfig?.path || ""}')`;
                                case 11:
                                  return `ChildActivationStart(path: '${e.snapshot.routeConfig?.path || ""}')`;
                                case 8:
                                  return `GuardsCheckEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state}, shouldActivate: ${e.shouldActivate})`;
                                case 7:
                                  return `GuardsCheckStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 2:
                                  return `NavigationCancel(id: ${e.id}, url: '${e.url}')`;
                                case 16:
                                  return `NavigationSkipped(id: ${e.id}, url: '${e.url}')`;
                                case 1:
                                  return `NavigationEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}')`;
                                case 3:
                                  return `NavigationError(id: ${e.id}, url: '${e.url}', error: ${e.error})`;
                                case 0:
                                  return `NavigationStart(id: ${e.id}, url: '${e.url}')`;
                                case 6:
                                  return `ResolveEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 5:
                                  return `ResolveStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 10:
                                  return `RouteConfigLoadEnd(path: ${e.route.path})`;
                                case 9:
                                  return `RouteConfigLoadStart(path: ${e.route.path})`;
                                case 4:
                                  return `RoutesRecognized(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 15:
                                  return `Scroll(anchor: '${e.anchor}', position: '${e.position ? `${e.position[0]}, ${e.position[1]}` : null}')`;
                              }
                            })(t),
                          ),
                          console.log(t),
                          console.groupEnd?.();
                      });
                  },
                },
              ]
            : []),
          ri(1, e)
        );
      }
      const lC = new $(ts ? "router preloader" : "");
      function U2(e) {
        return ri(0, [
          { provide: lC, useExisting: L2 },
          { provide: rC, useExisting: e },
        ]);
      }
      const Va = !1,
        cC = new $(
          Va ? "router duplicate forRoot guard" : "ROUTER_FORROOT_GUARD",
        ),
        G2 = [
          Gh,
          { provide: Ta, useClass: bp },
          wn,
          Ra,
          {
            provide: Ko,
            useFactory: function oC(e) {
              return e.routerState.root;
            },
            deps: [wn],
          },
          jp,
          Va ? { provide: zp, useValue: !0 } : [],
        ];
      function z2() {
        return new Pb("Router", wn);
      }
      let uC = (() => {
        class e {
          constructor(t) {}
          static forRoot(t, r) {
            return {
              ngModule: e,
              providers: [
                G2,
                Va && r?.enableTracing ? $2().ɵproviders : [],
                { provide: es, multi: !0, useValue: t },
                {
                  provide: cC,
                  useFactory: J2,
                  deps: [[wn, new Ls(), new Vs()]],
                },
                { provide: gu, useValue: r || {} },
                r?.useHash
                  ? { provide: Ti, useClass: QP }
                  : { provide: Ti, useClass: nD },
                {
                  provide: Gp,
                  useFactory: () => {
                    const e = X(gF),
                      n = X(ve),
                      t = X(gu),
                      r = X(pu),
                      i = X(Ta);
                    return (
                      t.scrollOffset && e.setOffset(t.scrollOffset),
                      new iC(i, r, e, n, t)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? U2(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: Pb, multi: !0, useFactory: z2 },
                r?.initialNavigation ? Z2(r) : [],
                [
                  { provide: dC, useFactory: sC },
                  { provide: Rb, multi: !0, useExisting: dC },
                ],
              ],
            };
          }
          static forChild(t) {
            return {
              ngModule: e,
              providers: [{ provide: es, multi: !0, useValue: t }],
            };
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(k(cC, 8));
          }),
          (e.ɵmod = xe({ type: e })),
          (e.ɵinj = Ae({ imports: [xp] })),
          e
        );
      })();
      function J2(e) {
        if (Va && e)
          throw new A(
            4007,
            "The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead.",
          );
        return "guarded";
      }
      function Z2(e) {
        return [
          "disabled" === e.initialNavigation
            ? ri(3, [
                {
                  provide: Ec,
                  multi: !0,
                  useFactory: () => {
                    const n = X(wn);
                    return () => {
                      n.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Wp, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? ri(2, [
                { provide: Wp, useValue: 0 },
                {
                  provide: Ec,
                  multi: !0,
                  deps: [ln],
                  useFactory: (n) => {
                    const t = n.get(ZP, Promise.resolve());
                    return () =>
                      t.then(
                        () =>
                          new Promise((r) => {
                            const i = n.get(wn),
                              o = n.get(aC);
                            (function V2(e, n) {
                              e.events
                                .pipe(
                                  wt(
                                    (t) =>
                                      t instanceof Ii ||
                                      t instanceof ru ||
                                      t instanceof Mp ||
                                      t instanceof iu,
                                  ),
                                  Y((t) =>
                                    t instanceof Ii || t instanceof iu
                                      ? En.COMPLETE
                                      : t instanceof ru &&
                                          (0 === t.code || 1 === t.code)
                                        ? En.REDIRECTING
                                        : En.FAILED,
                                  ),
                                  wt((t) => t !== En.REDIRECTING),
                                  gt(1),
                                )
                                .subscribe(() => {
                                  n();
                                });
                            })(i, () => {
                              r(!0);
                            }),
                              (n.get(pu).afterPreactivation = () => (
                                r(!0), o.closed ? z(void 0) : o
                              )),
                              i.initialNavigation();
                          }),
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const dC = new $(Va ? "Router Initializer" : ""),
        Q2 = [];
      let X2 = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵmod = xe({ type: e }));
          static #n = (this.ɵinj = Ae({ imports: [uC.forRoot(Q2), uC] }));
        }
        return e;
      })();
      const eV = ["addListener", "removeListener"],
        tV = ["addEventListener", "removeEventListener"],
        nV = ["on", "off"];
      function Lt(e, n, t, r) {
        if ((ue(t) && ((r = t), (t = void 0)), r))
          return Lt(e, n, t).pipe(mp(r));
        const [i, o] = (function oV(e) {
          return ue(e.addEventListener) && ue(e.removeEventListener);
        })(e)
          ? tV.map((s) => (a) => e[s](n, a, t))
          : (function rV(e) {
                return ue(e.addListener) && ue(e.removeListener);
              })(e)
            ? eV.map(fC(e, n))
            : (function iV(e) {
                  return ue(e.on) && ue(e.off);
                })(e)
              ? nV.map(fC(e, n))
              : [];
        if (!i && fd(e)) return vt((s) => Lt(s, n, t))(_t(e));
        if (!i) throw new TypeError("Invalid event target");
        return new Ce((s) => {
          const a = (...l) => s.next(1 < l.length ? l : l[0]);
          return i(a), () => o(a);
        });
      }
      function fC(e, n) {
        return (t) => (r) => e[t](n, r);
      }
      class sV extends lt {
        constructor(n, t) {
          super();
        }
        schedule(n, t = 0) {
          return this;
        }
      }
      const mu = {
          setInterval(e, n, ...t) {
            const { delegate: r } = mu;
            return r?.setInterval
              ? r.setInterval(e, n, ...t)
              : setInterval(e, n, ...t);
          },
          clearInterval(e) {
            const { delegate: n } = mu;
            return (n?.clearInterval || clearInterval)(e);
          },
          delegate: void 0,
        },
        hC = { now: () => (hC.delegate || Date).now(), delegate: void 0 };
      class Ba {
        constructor(n, t = Ba.now) {
          (this.schedulerActionCtor = n), (this.now = t);
        }
        schedule(n, t = 0, r) {
          return new this.schedulerActionCtor(this, n).schedule(r, t);
        }
      }
      Ba.now = hC.now;
      const cV = new (class lV extends Ba {
        constructor(n, t = Ba.now) {
          super(n, t), (this.actions = []), (this._active = !1);
        }
        flush(n) {
          const { actions: t } = this;
          if (this._active) return void t.push(n);
          let r;
          this._active = !0;
          do {
            if ((r = n.execute(n.state, n.delay))) break;
          } while ((n = t.shift()));
          if (((this._active = !1), r)) {
            for (; (n = t.shift()); ) n.unsubscribe();
            throw r;
          }
        }
      })(
        class aV extends sV {
          constructor(n, t) {
            super(n, t),
              (this.scheduler = n),
              (this.work = t),
              (this.pending = !1);
          }
          schedule(n, t = 0) {
            var r;
            if (this.closed) return this;
            this.state = n;
            const i = this.id,
              o = this.scheduler;
            return (
              null != i && (this.id = this.recycleAsyncId(o, i, t)),
              (this.pending = !0),
              (this.delay = t),
              (this.id =
                null !== (r = this.id) && void 0 !== r
                  ? r
                  : this.requestAsyncId(o, this.id, t)),
              this
            );
          }
          requestAsyncId(n, t, r = 0) {
            return mu.setInterval(n.flush.bind(n, this), r);
          }
          recycleAsyncId(n, t, r = 0) {
            if (null != r && this.delay === r && !1 === this.pending) return t;
            null != t && mu.clearInterval(t);
          }
          execute(n, t) {
            if (this.closed) return new Error("executing a cancelled action");
            this.pending = !1;
            const r = this._execute(n, t);
            if (r) return r;
            !1 === this.pending &&
              null != this.id &&
              (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
          }
          _execute(n, t) {
            let i,
              r = !1;
            try {
              this.work(n);
            } catch (o) {
              (r = !0),
                (i = o || new Error("Scheduled action threw falsy error"));
            }
            if (r) return this.unsubscribe(), i;
          }
          unsubscribe() {
            if (!this.closed) {
              const { id: n, scheduler: t } = this,
                { actions: r } = t;
              (this.work = this.state = this.scheduler = null),
                (this.pending = !1),
                Br(r, this),
                null != n && (this.id = this.recycleAsyncId(t, n, null)),
                (this.delay = null),
                super.unsubscribe();
            }
          }
        },
      );
      function qp(e = 0, n, t = cV) {
        let r = -1;
        return (
          null != n && (pm(n) ? (t = n) : (r = n)),
          new Ce((i) => {
            let o = (function uV(e) {
              return e instanceof Date && !isNaN(e);
            })(e)
              ? +e - t.now()
              : e;
            o < 0 && (o = 0);
            let s = 0;
            return t.schedule(function () {
              i.closed ||
                (i.next(s++), 0 <= r ? this.schedule(void 0, r) : i.complete());
            }, o);
          })
        );
      }
      const { isArray: dV } = Array;
      function gC(e) {
        return 1 === e.length && dV(e[0]) ? e[0] : e;
      }
      const _C = new Ce(jr);
      function _u(...e) {
        const n = vl(e),
          t = gC(e);
        return t.length
          ? new Ce((r) => {
              let i = t.map(() => []),
                o = t.map(() => !1);
              r.add(() => {
                i = o = null;
              });
              for (let s = 0; !r.closed && s < t.length; s++)
                _t(t[s]).subscribe(
                  Re(
                    r,
                    (a) => {
                      if ((i[s].push(a), i.every((l) => l.length))) {
                        const l = i.map((c) => c.shift());
                        r.next(n ? n(...l) : l),
                          i.some((c, u) => !c.length && o[u]) && r.complete();
                      }
                    },
                    () => {
                      (o[s] = !0), !i[s].length && r.complete();
                    },
                  ),
                );
              return () => {
                i = o = null;
              };
            })
          : In;
      }
      function rt(e) {
        return We((n, t) => {
          _t(e).subscribe(Re(t, () => t.complete(), jr)),
            !t.closed && n.subscribe(t);
        });
      }
      function Yp(e, n = Un) {
        return (
          (e = e ?? pV),
          We((t, r) => {
            let i,
              o = !0;
            t.subscribe(
              Re(r, (s) => {
                const a = n(s);
                (o || !e(i, a)) && ((o = !1), (i = a), r.next(s));
              }),
            );
          })
        );
      }
      function pV(e, n) {
        return e === n;
      }
      function Jp(...e) {
        const n = vl(e);
        return We((t, r) => {
          const i = e.length,
            o = new Array(i);
          let s = e.map(() => !1),
            a = !1;
          for (let l = 0; l < i; l++)
            _t(e[l]).subscribe(
              Re(
                r,
                (c) => {
                  (o[l] = c),
                    !a &&
                      !s[l] &&
                      ((s[l] = !0), (a = s.every(Un)) && (s = null));
                },
                jr,
              ),
            );
          t.subscribe(
            Re(r, (l) => {
              if (a) {
                const c = [l, ...o];
                r.next(n ? n(...c) : c);
              }
            }),
          );
        });
      }
      const fn = new $("NgValueAccessor");
      function EH(e, n) {}
      function SH(e, n) {
        if (
          (1 & e &&
            (M(0, "button", 3), fe(1), R(2, EH, 0, 0, "ng-template", 4), I()),
          2 & e)
        ) {
          const t = n.$implicit;
          T("ngbPanelToggle", t),
            N(1),
            Ci(" ", t.title, " "),
            N(1),
            T(
              "ngTemplateOutlet",
              null == t.titleTpl ? null : t.titleTpl.templateRef,
            );
        }
      }
      function TH(e, n) {}
      function MH(e, n) {}
      function NH(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "div", 8),
            G("ngbRef", function (i) {
              return ge(t), me((F().$implicit.panelDiv = i));
            }),
            M(1, "div", 9),
            R(2, MH, 0, 0, "ng-template", 4),
            I()();
        }
        if (2 & e) {
          const t = F().$implicit;
          eh("id", t.id),
            de("aria-labelledby", t.id + "-header"),
            N(2),
            T(
              "ngTemplateOutlet",
              (null == t.contentTpl ? null : t.contentTpl.templateRef) || null,
            );
        }
      }
      Math, Math, Math;
      const IH = function (e, n) {
        return { $implicit: e, opened: n };
      };
      function OH(e, n) {
        if (
          (1 & e &&
            (M(0, "div")(1, "div", 5),
            R(2, TH, 0, 0, "ng-template", 6),
            I(),
            R(3, NH, 3, 3, "div", 7),
            I()),
          2 & e)
        ) {
          const t = n.$implicit,
            r = F(),
            i = Pt(1);
          Jr("accordion-item " + (t.cardClass || "")),
            N(1),
            Jr(
              "accordion-header " +
                (t.type ? "bg-" + t.type : r.type ? "bg-" + r.type : ""),
            ),
            hc("id", "", t.id, "-header"),
            N(1),
            T(
              "ngTemplateOutlet",
              (null == t.headerTpl ? null : t.headerTpl.templateRef) || i,
            )("ngTemplateOutletContext", da(8, IH, t, t.isOpen)),
            N(1),
            T("ngIf", !r.destroyOnHide || t.isOpen || t.transitionRunning);
        }
      }
      function AH(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "button", 1),
            G("click", function () {
              return ge(t), me(F().close());
            }),
            I();
        }
      }
      const Au = ["*"];
      function RH(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "button", 6),
            G("click", function () {
              const o = ge(t).$implicit,
                s = F();
              return (
                s.focus(), me(s.select(o.id, s.NgbSlideEventSource.INDICATOR))
              );
            }),
            I();
        }
        if (2 & e) {
          const t = n.$implicit,
            r = F();
          Q("active", t.id === r.activeId),
            de("aria-labelledby", "slide-" + t.id)(
              "aria-controls",
              "slide-" + t.id,
            )("aria-selected", t.id === r.activeId);
        }
      }
      function PH(e, n) {}
      function xH(e, n) {
        if (
          (1 & e &&
            (M(0, "div", 7)(1, "span", 8),
            xt(2, 9),
            I(),
            R(3, PH, 0, 0, "ng-template", 10),
            I()),
          2 & e)
        ) {
          const t = n.$implicit,
            r = n.index,
            i = n.count;
          T("id", "slide-" + t.id),
            N(2),
            Ho(r + 1)(i),
            ca(2),
            N(1),
            T("ngTemplateOutlet", t.tplRef);
        }
      }
      function FH(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "button", 11),
            G("click", function () {
              return ge(t), me(F().arrowLeft());
            }),
            qe(1, "span", 12),
            M(2, "span", 8),
            xt(3, 13),
            I()();
        }
      }
      function kH(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "button", 14),
            G("click", function () {
              return ge(t), me(F().arrowRight());
            }),
            qe(1, "span", 15),
            M(2, "span", 8),
            xt(3, 16),
            I()();
        }
      }
      const LH = ["ngbDatepickerDayView", ""],
        VH = ["month"],
        BH = ["year"];
      function HH(e, n) {
        if ((1 & e && (M(0, "option", 5), fe(1), I()), 2 & e)) {
          const t = n.$implicit,
            r = F();
          T("value", t),
            de("aria-label", r.i18n.getMonthFullName(t, r.date.year)),
            N(1),
            zt(r.i18n.getMonthShortName(t, r.date.year));
        }
      }
      function jH(e, n) {
        if ((1 & e && (M(0, "option", 5), fe(1), I()), 2 & e)) {
          const t = n.$implicit,
            r = F();
          T("value", t), N(1), zt(r.i18n.getYearNumerals(t));
        }
      }
      function $H(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "ngb-datepicker-navigation-select", 7),
            G("select", function (i) {
              return ge(t), me(F().select.emit(i));
            }),
            I();
        }
        if (2 & e) {
          const t = F();
          T("date", t.date)("disabled", t.disabled)(
            "months",
            t.selectBoxes.months,
          )("years", t.selectBoxes.years);
        }
      }
      function UH(e, n) {
        1 & e && qe(0, "div", 0);
      }
      function GH(e, n) {
        1 & e && qe(0, "div", 0);
      }
      function zH(e, n) {
        if (
          (1 & e &&
            (R(0, UH, 1, 0, "div", 9),
            M(1, "div", 10),
            fe(2),
            I(),
            R(3, GH, 1, 0, "div", 9)),
          2 & e)
        ) {
          const t = n.$implicit,
            r = n.index,
            i = F(2);
          T("ngIf", r > 0),
            N(2),
            Ci(" ", i.i18n.getMonthLabel(t.firstDate), " "),
            N(1),
            T("ngIf", r !== i.months.length - 1);
        }
      }
      function WH(e, n) {
        1 & e && R(0, zH, 4, 3, "ng-template", 8),
          2 & e && T("ngForOf", F().months);
      }
      function qH(e, n) {
        if ((1 & e && (M(0, "div", 5), fe(1), I()), 2 & e)) {
          const t = F(2);
          N(1), zt(t.i18n.getWeekLabel());
        }
      }
      function YH(e, n) {
        if ((1 & e && (M(0, "div", 6), fe(1), I()), 2 & e)) {
          const t = n.$implicit;
          N(1), zt(t);
        }
      }
      function JH(e, n) {
        if (
          (1 & e &&
            (M(0, "div", 2),
            R(1, qH, 2, 1, "div", 3),
            R(2, YH, 2, 1, "div", 4),
            I()),
          2 & e)
        ) {
          const t = F();
          N(1),
            T("ngIf", t.datepicker.showWeekNumbers),
            N(1),
            T("ngForOf", t.viewModel.weekdays);
        }
      }
      function ZH(e, n) {
        if ((1 & e && (M(0, "div", 11), fe(1), I()), 2 & e)) {
          const t = F(2).$implicit,
            r = F();
          N(1), zt(r.i18n.getWeekNumerals(t.number));
        }
      }
      function KH(e, n) {}
      function QH(e, n) {
        if ((1 & e && R(0, KH, 0, 0, "ng-template", 14), 2 & e)) {
          const t = F().$implicit;
          T("ngTemplateOutlet", F(3).datepicker.dayTemplate)(
            "ngTemplateOutletContext",
            t.context,
          );
        }
      }
      function XH(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "div", 12),
            G("click", function (i) {
              const s = ge(t).$implicit;
              return F(3).doSelect(s), me(i.preventDefault());
            }),
            R(1, QH, 1, 2, "ng-template", 13),
            I();
        }
        if (2 & e) {
          const t = n.$implicit;
          Q("disabled", t.context.disabled)("hidden", t.hidden)(
            "ngb-dp-today",
            t.context.today,
          ),
            T("tabindex", t.tabindex),
            de("aria-label", t.ariaLabel),
            N(1),
            T("ngIf", !t.hidden);
        }
      }
      function ej(e, n) {
        if (
          (1 & e &&
            (M(0, "div", 8),
            R(1, ZH, 2, 1, "div", 9),
            R(2, XH, 2, 9, "div", 10),
            I()),
          2 & e)
        ) {
          const t = F().$implicit,
            r = F();
          N(1),
            T("ngIf", r.datepicker.showWeekNumbers),
            N(1),
            T("ngForOf", t.days);
        }
      }
      function tj(e, n) {
        1 & e && R(0, ej, 3, 2, "div", 7),
          2 & e && T("ngIf", !n.$implicit.collapsed);
      }
      const nj = ["defaultDayTemplate"],
        rj = ["content"];
      function ij(e, n) {
        if ((1 & e && qe(0, "div", 8), 2 & e)) {
          const r = n.currentMonth,
            i = n.selected,
            o = n.disabled,
            s = n.focused;
          T("date", n.date)("currentMonth", r)("selected", i)("disabled", o)(
            "focused",
            s,
          );
        }
      }
      function oj(e, n) {
        if ((1 & e && (M(0, "div", 13), fe(1), I()), 2 & e)) {
          const t = F().$implicit,
            r = F(2);
          N(1), Ci(" ", r.i18n.getMonthLabel(t.firstDate), " ");
        }
      }
      function sj(e, n) {
        if (
          (1 & e &&
            (M(0, "div", 10),
            R(1, oj, 2, 1, "div", 11),
            qe(2, "ngb-datepicker-month", 12),
            I()),
          2 & e)
        ) {
          const t = n.$implicit,
            r = F(2);
          N(1),
            T(
              "ngIf",
              "none" === r.navigation ||
                (r.displayMonths > 1 && "select" === r.navigation),
            ),
            N(1),
            T("month", t.firstDate);
        }
      }
      function aj(e, n) {
        1 & e && R(0, sj, 3, 2, "div", 9),
          2 & e && T("ngForOf", F().model.months);
      }
      function lj(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "ngb-datepicker-navigation", 14),
            G("navigate", function (i) {
              return ge(t), me(F().onNavigateEvent(i));
            })("select", function (i) {
              return ge(t), me(F().onNavigateDateSelect(i));
            }),
            I();
        }
        if (2 & e) {
          const t = F();
          T("date", t.model.firstDate)("months", t.model.months)(
            "disabled",
            t.model.disabled,
          )("showSelect", "select" === t.model.navigation)(
            "prevDisabled",
            t.model.prevDisabled,
          )("nextDisabled", t.model.nextDisabled)(
            "selectBoxes",
            t.model.selectBoxes,
          );
        }
      }
      function cj(e, n) {}
      function uj(e, n) {}
      const Vw = function (e) {
          return { $implicit: e };
        },
        dj = ["dialog"],
        fj = ["ngbNavOutlet", ""];
      function hj(e, n) {}
      function pj(e, n) {
        if (
          (1 & e && (M(0, "div", 2), R(1, hj, 0, 0, "ng-template", 3), I()),
          2 & e)
        ) {
          const t = F().$implicit,
            r = F();
          T("item", t)("nav", r.nav)("role", r.paneRole),
            N(1),
            T(
              "ngTemplateOutlet",
              (null == t.contentTpl ? null : t.contentTpl.templateRef) || null,
            )(
              "ngTemplateOutletContext",
              ua(5, Vw, t.active || r.isPanelTransitioning(t)),
            );
        }
      }
      function gj(e, n) {
        if ((1 & e && R(0, pj, 2, 7, "div", 1), 2 & e)) {
          const t = n.$implicit,
            r = F();
          T("ngIf", t.isPanelInDom() || r.isPanelTransitioning(t));
        }
      }
      function mj(e, n) {
        1 & e && (M(0, "span", 9), xt(1, 10), I());
      }
      function _j(e, n) {
        1 & e && (M(0, "span", 9), xt(1, 11), I());
      }
      function vj(e, n) {
        1 & e && (M(0, "span", 9), xt(1, 12), I());
      }
      function yj(e, n) {
        1 & e && (M(0, "span", 9), xt(1, 13), I());
      }
      function bj(e, n) {
        1 & e && fe(0, "...");
      }
      function Dj(e, n) {
        1 & e && fe(0), 2 & e && zt(n.$implicit);
      }
      function Cj(e, n) {}
      const wj = function (e) {
        return { disabled: !0, currentPage: e };
      };
      function Ej(e, n) {
        if (
          (1 & e && (M(0, "a", 18), R(1, Cj, 0, 0, "ng-template", 8), I()),
          2 & e)
        ) {
          const t = F(2).$implicit,
            r = F(),
            i = Pt(9);
          N(1),
            T(
              "ngTemplateOutlet",
              (null == r.tplEllipsis ? null : r.tplEllipsis.templateRef) || i,
            )("ngTemplateOutletContext", ua(2, wj, t));
        }
      }
      function Sj(e, n) {}
      const Tj = function (e, n, t) {
        return { disabled: e, $implicit: n, currentPage: t };
      };
      function Mj(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "a", 19),
            G("click", function (i) {
              ge(t);
              const o = F().$implicit;
              return F(2).selectPage(o), me(i.preventDefault());
            }),
            R(1, Sj, 0, 0, "ng-template", 8),
            I();
        }
        if (2 & e) {
          const t = F().$implicit,
            r = F(),
            i = r.disabled,
            o = r.$implicit,
            s = F(),
            a = Pt(11);
          de("tabindex", i ? "-1" : null)("aria-disabled", i ? "true" : null),
            N(1),
            T(
              "ngTemplateOutlet",
              (null == s.tplNumber ? null : s.tplNumber.templateRef) || a,
            )("ngTemplateOutletContext", hh(4, Tj, i, t, o));
        }
      }
      function Nj(e, n) {
        if (
          (1 & e &&
            (M(0, "li", 15),
            R(1, Ej, 2, 4, "a", 16),
            R(2, Mj, 2, 8, "a", 17),
            I()),
          2 & e)
        ) {
          const t = n.$implicit,
            r = F(),
            i = r.$implicit,
            o = r.disabled,
            s = F();
          Q("active", t === i)("disabled", s.isEllipsis(t) || o),
            de("aria-current", t === i ? "page" : null),
            N(1),
            T("ngIf", s.isEllipsis(t)),
            N(1),
            T("ngIf", !s.isEllipsis(t));
        }
      }
      function Ij(e, n) {
        1 & e && R(0, Nj, 3, 7, "li", 14), 2 & e && T("ngForOf", n.pages);
      }
      function Oj(e, n) {}
      const Ng = function (e, n) {
        return { disabled: e, currentPage: n };
      };
      function Aj(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "li", 15)(1, "a", 20),
            G("click", function (i) {
              return ge(t), F().selectPage(1), me(i.preventDefault());
            }),
            R(2, Oj, 0, 0, "ng-template", 8),
            I()();
        }
        if (2 & e) {
          const t = F(),
            r = Pt(1);
          Q("disabled", t.previousDisabled()),
            N(1),
            de("tabindex", t.previousDisabled() ? "-1" : null)(
              "aria-disabled",
              t.previousDisabled() ? "true" : null,
            ),
            N(1),
            T(
              "ngTemplateOutlet",
              (null == t.tplFirst ? null : t.tplFirst.templateRef) || r,
            )(
              "ngTemplateOutletContext",
              da(6, Ng, t.previousDisabled(), t.page),
            );
        }
      }
      function Rj(e, n) {}
      const Pj = function (e) {
        return { disabled: e };
      };
      function xj(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "li", 15)(1, "a", 21),
            G("click", function (i) {
              ge(t);
              const o = F();
              return o.selectPage(o.page - 1), me(i.preventDefault());
            }),
            R(2, Rj, 0, 0, "ng-template", 8),
            I()();
        }
        if (2 & e) {
          const t = F(),
            r = Pt(3);
          Q("disabled", t.previousDisabled()),
            N(1),
            de("tabindex", t.previousDisabled() ? "-1" : null)(
              "aria-disabled",
              t.previousDisabled() ? "true" : null,
            ),
            N(1),
            T(
              "ngTemplateOutlet",
              (null == t.tplPrevious ? null : t.tplPrevious.templateRef) || r,
            )("ngTemplateOutletContext", ua(6, Pj, t.previousDisabled()));
        }
      }
      function Fj(e, n) {}
      function kj(e, n) {}
      function Lj(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "li", 15)(1, "a", 22),
            G("click", function (i) {
              ge(t);
              const o = F();
              return o.selectPage(o.page + 1), me(i.preventDefault());
            }),
            R(2, kj, 0, 0, "ng-template", 8),
            I()();
        }
        if (2 & e) {
          const t = F(),
            r = Pt(5);
          Q("disabled", t.nextDisabled()),
            N(1),
            de("tabindex", t.nextDisabled() ? "-1" : null)(
              "aria-disabled",
              t.nextDisabled() ? "true" : null,
            ),
            N(1),
            T(
              "ngTemplateOutlet",
              (null == t.tplNext ? null : t.tplNext.templateRef) || r,
            )("ngTemplateOutletContext", da(6, Ng, t.nextDisabled(), t.page));
        }
      }
      function Vj(e, n) {}
      function Bj(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "li", 15)(1, "a", 23),
            G("click", function (i) {
              ge(t);
              const o = F();
              return o.selectPage(o.pageCount), me(i.preventDefault());
            }),
            R(2, Vj, 0, 0, "ng-template", 8),
            I()();
        }
        if (2 & e) {
          const t = F(),
            r = Pt(7);
          Q("disabled", t.nextDisabled()),
            N(1),
            de("tabindex", t.nextDisabled() ? "-1" : null)(
              "aria-disabled",
              t.nextDisabled() ? "true" : null,
            ),
            N(1),
            T(
              "ngTemplateOutlet",
              (null == t.tplLast ? null : t.tplLast.templateRef) || r,
            )("ngTemplateOutletContext", da(6, Ng, t.nextDisabled(), t.page));
        }
      }
      const Hj = function (e, n, t) {
        return { $implicit: e, pages: n, disabled: t };
      };
      function Uj(e, n) {
        if (
          (1 & e &&
            (M(0, "span"),
            xt(1, 1),
            (function Z0(e, n) {
              const t = pe();
              let r;
              const i = e + Ge;
              t.firstCreatePass
                ? ((r = (function NR(e, n) {
                    if (n)
                      for (let t = n.length - 1; t >= 0; t--) {
                        const r = n[t];
                        if (e === r.name) return r;
                      }
                  })(n, t.pipeRegistry)),
                  (t.data[i] = r),
                  r.onDestroy &&
                    (t.destroyHooks ?? (t.destroyHooks = [])).push(
                      i,
                      r.onDestroy,
                    ))
                : (r = t.data[i]);
              const o = r.factory || (r.factory = pi(r.type)),
                s = An(g);
              try {
                const a = Bl(!1),
                  l = o();
                return (
                  Bl(a),
                  (function wO(e, n, t, r) {
                    t >= e.data.length &&
                      ((e.data[t] = null), (e.blueprint[t] = null)),
                      (n[t] = r);
                  })(t, S(), i, l),
                  l
                );
              } finally {
                An(s);
              }
            })(2, "percent"),
            I()),
          2 & e)
        ) {
          const t = F();
          N(2), Ho(K0(2, 1, t.getValue() / t.max)), ca(1);
        }
      }
      function Gj(e, n) {
        1 & e && fe(0), 2 & e && zt(100 === n.fill ? "\u2605" : "\u2606");
      }
      function zj(e, n) {}
      function Wj(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "span", 2),
            fe(1),
            I(),
            M(2, "span", 3),
            G("mouseenter", function () {
              const o = ge(t).index;
              return me(F().enter(o + 1));
            })("click", function () {
              const o = ge(t).index;
              return me(F().handleClick(o + 1));
            }),
            R(3, zj, 0, 0, "ng-template", 4),
            I();
        }
        if (2 & e) {
          const t = n.index,
            r = F(),
            i = Pt(1);
          N(1),
            Ci("(", t < r.nextRate ? "*" : " ", ")"),
            N(1),
            Lo("cursor", r.isInteractive() ? "pointer" : "default"),
            N(1),
            T(
              "ngTemplateOutlet",
              r.starTemplate || r.starTemplateFromContent || i,
            )("ngTemplateOutletContext", r.contexts[t]);
        }
      }
      function qj(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "button", 11),
            G("click", function () {
              ge(t);
              const i = F();
              return me(i.changeHour(i.hourStep));
            }),
            qe(1, "span", 12),
            M(2, "span", 13),
            xt(3, 14),
            I()();
        }
        if (2 & e) {
          const t = F();
          Q("btn-sm", t.isSmallSize)("btn-lg", t.isLargeSize)(
            "disabled",
            t.disabled,
          ),
            T("disabled", t.disabled);
        }
      }
      function Yj(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "button", 11),
            G("click", function () {
              ge(t);
              const i = F();
              return me(i.changeHour(-i.hourStep));
            }),
            qe(1, "span", 15),
            M(2, "span", 13),
            xt(3, 16),
            I()();
        }
        if (2 & e) {
          const t = F();
          Q("btn-sm", t.isSmallSize)("btn-lg", t.isLargeSize)(
            "disabled",
            t.disabled,
          ),
            T("disabled", t.disabled);
        }
      }
      function Jj(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "button", 11),
            G("click", function () {
              ge(t);
              const i = F();
              return me(i.changeMinute(i.minuteStep));
            }),
            qe(1, "span", 12),
            M(2, "span", 13),
            xt(3, 17),
            I()();
        }
        if (2 & e) {
          const t = F();
          Q("btn-sm", t.isSmallSize)("btn-lg", t.isLargeSize)(
            "disabled",
            t.disabled,
          ),
            T("disabled", t.disabled);
        }
      }
      function Zj(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "button", 11),
            G("click", function () {
              ge(t);
              const i = F();
              return me(i.changeMinute(-i.minuteStep));
            }),
            qe(1, "span", 15),
            M(2, "span", 13),
            xt(3, 18),
            I()();
        }
        if (2 & e) {
          const t = F();
          Q("btn-sm", t.isSmallSize)("btn-lg", t.isLargeSize)(
            "disabled",
            t.disabled,
          ),
            T("disabled", t.disabled);
        }
      }
      function Kj(e, n) {
        1 & e && (M(0, "div", 5), fe(1, ":"), I());
      }
      function Qj(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "button", 11),
            G("click", function () {
              ge(t);
              const i = F(2);
              return me(i.changeSecond(i.secondStep));
            }),
            qe(1, "span", 12),
            M(2, "span", 13),
            xt(3, 21),
            I()();
        }
        if (2 & e) {
          const t = F(2);
          Q("btn-sm", t.isSmallSize)("btn-lg", t.isLargeSize)(
            "disabled",
            t.disabled,
          ),
            T("disabled", t.disabled);
        }
      }
      function Xj(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "button", 11),
            G("click", function () {
              ge(t);
              const i = F(2);
              return me(i.changeSecond(-i.secondStep));
            }),
            qe(1, "span", 15),
            M(2, "span", 13),
            xt(3, 22),
            I()();
        }
        if (2 & e) {
          const t = F(2);
          Q("btn-sm", t.isSmallSize)("btn-lg", t.isLargeSize)(
            "disabled",
            t.disabled,
          ),
            T("disabled", t.disabled);
        }
      }
      function e$(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "div", 19),
            R(1, Qj, 4, 7, "button", 3),
            M(2, "input", 20),
            G("change", function (i) {
              return ge(t), me(F().updateSecond(i.target.value));
            })("blur", function () {
              return ge(t), me(F().handleBlur());
            })("input", function (i) {
              return ge(t), me(F().formatInput(i.target));
            })("keydown.ArrowUp", function (i) {
              ge(t);
              const o = F();
              return o.changeSecond(o.secondStep), me(i.preventDefault());
            })("keydown.ArrowDown", function (i) {
              ge(t);
              const o = F();
              return o.changeSecond(-o.secondStep), me(i.preventDefault());
            }),
            I(),
            R(3, Xj, 4, 7, "button", 3),
            I();
        }
        if (2 & e) {
          const t = F();
          N(1),
            T("ngIf", t.spinners),
            N(1),
            Q("form-control-sm", t.isSmallSize)(
              "form-control-lg",
              t.isLargeSize,
            ),
            T("value", t.formatMinSec(null == t.model ? null : t.model.second))(
              "readOnly",
              t.readonlyInputs,
            )("disabled", t.disabled),
            N(1),
            T("ngIf", t.spinners);
        }
      }
      function t$(e, n) {
        1 & e && qe(0, "div", 5);
      }
      function n$(e, n) {
        if ((1 & e && (dc(0), xt(1, 27), fc()), 2 & e)) {
          const t = F(2);
          N(1), Ho(t.i18n.getAfternoonPeriod()), ca(1);
        }
      }
      function r$(e, n) {
        1 & e && xt(0, 28), 2 & e && (Ho(F(2).i18n.getMorningPeriod()), ca(0));
      }
      function i$(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "div", 23)(1, "button", 24),
            G("click", function () {
              return ge(t), me(F().toggleMeridian());
            }),
            R(2, n$, 2, 1, "ng-container", 25),
            R(3, r$, 1, 1, "ng-template", null, 26, Ft),
            I()();
        }
        if (2 & e) {
          const t = Pt(4),
            r = F();
          N(1),
            Q("btn-sm", r.isSmallSize)("btn-lg", r.isLargeSize)(
              "disabled",
              r.disabled,
            ),
            T("disabled", r.disabled),
            N(1),
            T("ngIf", r.model && r.model.hour >= 12)("ngIfElse", t);
        }
      }
      function o$(e, n) {
        if ((1 & e && (M(0, "strong", 3), fe(1), I()), 2 & e)) {
          const t = F();
          N(1), zt(t.header);
        }
      }
      function s$(e, n) {}
      function a$(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "div", 4),
            R(1, s$, 0, 0, "ng-template", 5),
            M(2, "button", 6),
            G("click", function () {
              return ge(t), me(F().hide());
            }),
            I()();
        }
        if (2 & e) {
          const t = F(),
            r = Pt(1);
          N(1), T("ngTemplateOutlet", t.contentHeaderTpl || r);
        }
      }
      function l$(e, n) {
        if ((1 & e && (M(0, "span"), fe(1), I()), 2 & e)) {
          const t = F().$implicit;
          Jr(F().highlightClass), N(1), zt(t);
        }
      }
      function c$(e, n) {
        1 & e && fe(0), 2 & e && zt(F().$implicit);
      }
      function u$(e, n) {
        if (
          (1 & e &&
            (R(0, l$, 2, 3, "span", 1),
            R(1, c$, 1, 1, "ng-template", null, 2, Ft)),
          2 & e)
        ) {
          const t = n.odd,
            r = Pt(2);
          T("ngIf", t)("ngIfElse", r);
        }
      }
      function Bt(e) {
        return parseInt(`${e}`, 10);
      }
      function Bw(e) {
        return null != e ? `${e}` : "";
      }
      function Ru(e, n, t = 0) {
        return Math.max(Math.min(e, n), t);
      }
      function as(e) {
        return "string" == typeof e;
      }
      function it(e) {
        return !isNaN(Bt(e));
      }
      function Ke(e) {
        return "number" == typeof e && isFinite(e) && Math.floor(e) === e;
      }
      function xi(e) {
        return null != e;
      }
      function ls(e) {
        return it(e) ? `0${e}`.slice(-2) : "";
      }
      function jw(e, n) {
        return (
          e &&
          e.className &&
          e.className.split &&
          e.className.split(/\s+/).indexOf(n) >= 0
        );
      }
      function cs(e) {
        return (e || document.body).getBoundingClientRect();
      }
      function $w(e) {
        return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }
      const Uw = { animation: !0, transitionTimerDelayMs: 5 },
        _$ = () => {},
        { transitionTimerDelayMs: v$ } = Uw,
        Ka = new Map(),
        Et = (e, n, t, r) => {
          let i = r.context || {};
          const o = Ka.get(n);
          if (o)
            switch (r.runningTransition) {
              case "continue":
                return In;
              case "stop":
                e.run(() => o.transition$.complete()),
                  (i = Object.assign(o.context, i)),
                  Ka.delete(n);
            }
          const s = t(n, r.animation, i) || _$;
          if (
            !r.animation ||
            "none" === window.getComputedStyle(n).transitionProperty
          )
            return (
              e.run(() => s()),
              z(void 0).pipe(
                (function g$(e) {
                  return (n) =>
                    new Ce((t) =>
                      n.subscribe({
                        next: (s) => e.run(() => t.next(s)),
                        error: (s) => e.run(() => t.error(s)),
                        complete: () => e.run(() => t.complete()),
                      }),
                    );
                })(e),
              )
            );
          const a = new Me(),
            l = new Me(),
            c = a.pipe(
              (function hV(...e) {
                return (n) => Ca(n, z(...e));
              })(!0),
            );
          Ka.set(n, {
            transition$: a,
            complete: () => {
              l.next(), l.complete();
            },
            context: i,
          });
          const u = (function m$(e) {
            const { transitionDelay: n, transitionDuration: t } =
              window.getComputedStyle(e);
            return 1e3 * (parseFloat(n) + parseFloat(t));
          })(n);
          return (
            e.runOutsideAngular(() => {
              const d = Lt(n, "transitionend").pipe(
                rt(c),
                wt(({ target: h }) => h === n),
              );
              (function mC(...e) {
                return 1 === (e = gC(e)).length
                  ? _t(e[0])
                  : new Ce(
                      (function fV(e) {
                        return (n) => {
                          let t = [];
                          for (let r = 0; t && !n.closed && r < e.length; r++)
                            t.push(
                              _t(e[r]).subscribe(
                                Re(n, (i) => {
                                  if (t) {
                                    for (let o = 0; o < t.length; o++)
                                      o !== r && t[o].unsubscribe();
                                    t = null;
                                  }
                                  n.next(i);
                                }),
                              ),
                            );
                        };
                      })(e),
                    );
              })(qp(u + v$).pipe(rt(c)), d, l)
                .pipe(rt(c))
                .subscribe(() => {
                  Ka.delete(n),
                    e.run(() => {
                      s(), a.next(), a.complete();
                    });
                });
            }),
            a.asObservable()
          );
        },
        Ig = (e, n, t) => {
          let { direction: r, maxSize: i, dimension: o } = t;
          const { classList: s } = e;
          function a() {
            s.add("collapse"), "show" === r ? s.add("show") : s.remove("show");
          }
          if (n)
            return (
              i ||
                ((i = (function b$(e, n) {
                  if (typeof navigator > "u") return "0px";
                  const { classList: t } = e,
                    r = t.contains("show");
                  r || t.add("show"), (e.style[n] = "");
                  const i = e.getBoundingClientRect()[n] + "px";
                  return r || t.remove("show"), i;
                })(e, o)),
                (t.maxSize = i),
                (e.style[o] = "show" !== r ? i : "0px"),
                s.remove("collapse"),
                s.remove("collapsing"),
                s.remove("show"),
                cs(e),
                s.add("collapsing")),
              (e.style[o] = "show" === r ? i : "0px"),
              () => {
                a(), s.remove("collapsing"), (e.style[o] = "");
              }
            );
          a();
        };
      let Fi = (() => {
          class e {
            constructor() {
              this.animation = Uw.animation;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        Gw = (() => {
          class e {
            constructor(t) {
              (this._ngbConfig = t), (this.closeOthers = !1);
            }
            get animation() {
              return void 0 === this._animation
                ? this._ngbConfig.animation
                : this._animation;
            }
            set animation(t) {
              this._animation = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k(Fi));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        D$ = 0,
        Og = (() => {
          class e {
            constructor(t) {
              this.templateRef = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Ve));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["ng-template", "ngbPanelHeader", ""]],
              standalone: !0,
            })),
            e
          );
        })(),
        zw = (() => {
          class e {
            constructor(t) {
              this.templateRef = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Ve));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["ng-template", "ngbPanelTitle", ""]],
              standalone: !0,
            })),
            e
          );
        })(),
        Ww = (() => {
          class e {
            constructor(t) {
              this.templateRef = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Ve));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["ng-template", "ngbPanelContent", ""]],
              standalone: !0,
            })),
            e
          );
        })(),
        Ag = (() => {
          class e {
            constructor() {
              (this.disabled = !1),
                (this.id = "ngb-panel-" + D$++),
                (this.isOpen = !1),
                (this.initClassDone = !1),
                (this.transitionRunning = !1),
                (this.shown = new U()),
                (this.hidden = new U());
            }
            ngAfterContentChecked() {
              (this.titleTpl = this.titleTpls.first),
                (this.headerTpl = this.headerTpls.first),
                (this.contentTpl = this.contentTpls.first);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["ngb-panel"]],
              contentQueries: function (t, r, i) {
                if (
                  (1 & t && (Be(i, zw, 4), Be(i, Og, 4), Be(i, Ww, 4)), 2 & t)
                ) {
                  let o;
                  ye((o = be())) && (r.titleTpls = o),
                    ye((o = be())) && (r.headerTpls = o),
                    ye((o = be())) && (r.contentTpls = o);
                }
              },
              inputs: {
                disabled: "disabled",
                id: "id",
                title: "title",
                type: "type",
                cardClass: "cardClass",
              },
              outputs: { shown: "shown", hidden: "hidden" },
              standalone: !0,
            })),
            e
          );
        })(),
        C$ = (() => {
          class e {
            constructor(t) {
              (this._El = t), (this.ngbRef = new U());
            }
            ngOnInit() {
              this.ngbRef.emit(this._El.nativeElement);
            }
            ngOnDestroy() {
              this.ngbRef.emit(null);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(_e));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["", "ngbRef", ""]],
              outputs: { ngbRef: "ngbRef" },
              standalone: !0,
            })),
            e
          );
        })(),
        qw = (() => {
          class e {
            constructor(t, r) {
              (this.accordion = t), (this.panel = r);
            }
            set ngbPanelToggle(t) {
              t && (this.panel = t);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(ee(() => Rg)), g(Ag, 9));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["button", "ngbPanelToggle", ""]],
              hostAttrs: ["type", "button"],
              hostVars: 5,
              hostBindings: function (t, r) {
                1 & t &&
                  G("click", function () {
                    return r.accordion.toggle(r.panel.id);
                  }),
                  2 & t &&
                    (Dn("disabled", r.panel.disabled),
                    de("aria-expanded", r.panel.isOpen)(
                      "aria-controls",
                      r.panel.id,
                    ),
                    Q("collapsed", !r.panel.isOpen));
              },
              inputs: { ngbPanelToggle: "ngbPanelToggle" },
              standalone: !0,
            })),
            e
          );
        })(),
        Rg = (() => {
          class e {
            constructor(t, r, i) {
              (this._ngZone = r),
                (this._changeDetector = i),
                (this.activeIds = []),
                (this.destroyOnHide = !0),
                (this.panelChange = new U()),
                (this.shown = new U()),
                (this.hidden = new U()),
                (this.animation = t.animation),
                (this.type = t.type),
                (this.closeOtherPanels = t.closeOthers);
            }
            isExpanded(t) {
              return this.activeIds.indexOf(t) > -1;
            }
            expand(t) {
              this._changeOpenState(this._findPanelById(t), !0);
            }
            expandAll() {
              this.closeOtherPanels
                ? 0 === this.activeIds.length &&
                  this.panels.length &&
                  this._changeOpenState(this.panels.first, !0)
                : this.panels.forEach((t) => this._changeOpenState(t, !0));
            }
            collapse(t) {
              this._changeOpenState(this._findPanelById(t), !1);
            }
            collapseAll() {
              this.panels.forEach((t) => {
                this._changeOpenState(t, !1);
              });
            }
            toggle(t) {
              const r = this._findPanelById(t);
              r && this._changeOpenState(r, !r.isOpen);
            }
            ngAfterContentChecked() {
              as(this.activeIds) &&
                (this.activeIds = this.activeIds.split(/\s*,\s*/)),
                this.panels.forEach((t) => {
                  t.isOpen = !t.disabled && this.activeIds.indexOf(t.id) > -1;
                }),
                this.activeIds.length > 1 &&
                  this.closeOtherPanels &&
                  (this._closeOthers(this.activeIds[0], !1),
                  this._updateActiveIds()),
                this._ngZone.onStable.pipe(gt(1)).subscribe(() => {
                  this.panels.forEach((t) => {
                    const r = t.panelDiv;
                    r
                      ? t.initClassDone ||
                        ((t.initClassDone = !0),
                        Et(this._ngZone, r, Ig, {
                          animation: !1,
                          runningTransition: "continue",
                          context: {
                            direction: t.isOpen ? "show" : "hide",
                            dimension: "height",
                          },
                        }))
                      : (t.initClassDone = !1);
                  });
                });
            }
            _changeOpenState(t, r) {
              if (null != t && !t.disabled && t.isOpen !== r) {
                let i = !1;
                this.panelChange.emit({
                  panelId: t.id,
                  nextState: r,
                  preventDefault: () => {
                    i = !0;
                  },
                }),
                  i ||
                    ((t.isOpen = r),
                    (t.transitionRunning = !0),
                    r && this.closeOtherPanels && this._closeOthers(t.id),
                    this._updateActiveIds(),
                    this._runTransitions(this.animation));
              }
            }
            _closeOthers(t, r = !0) {
              this.panels.forEach((i) => {
                i.id !== t &&
                  i.isOpen &&
                  ((i.isOpen = !1), (i.transitionRunning = r));
              });
            }
            _findPanelById(t) {
              return this.panels.find((r) => r.id === t) || null;
            }
            _updateActiveIds() {
              this.activeIds = this.panels
                .filter((t) => t.isOpen && !t.disabled)
                .map((t) => t.id);
            }
            _runTransitions(t) {
              this._changeDetector.detectChanges(),
                this.panels.forEach((r) => {
                  r.transitionRunning &&
                    Et(this._ngZone, r.panelDiv, Ig, {
                      animation: t,
                      runningTransition: "stop",
                      context: {
                        direction: r.isOpen ? "show" : "hide",
                        dimension: "height",
                      },
                    }).subscribe(() => {
                      r.transitionRunning = !1;
                      const { id: o } = r;
                      r.isOpen
                        ? (r.shown.emit(), this.shown.emit(o))
                        : (r.hidden.emit(), this.hidden.emit(o));
                    });
                });
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Gw), g(ve), g(cn));
            }),
            (e.ɵcmp = Le({
              type: e,
              selectors: [["ngb-accordion"]],
              contentQueries: function (t, r, i) {
                if ((1 & t && Be(i, Ag, 4), 2 & t)) {
                  let o;
                  ye((o = be())) && (r.panels = o);
                }
              },
              hostAttrs: ["role", "tablist", 1, "accordion"],
              hostVars: 1,
              hostBindings: function (t, r) {
                2 & t && de("aria-multiselectable", !r.closeOtherPanels);
              },
              inputs: {
                animation: "animation",
                activeIds: "activeIds",
                closeOtherPanels: ["closeOthers", "closeOtherPanels"],
                destroyOnHide: "destroyOnHide",
                type: "type",
              },
              outputs: {
                panelChange: "panelChange",
                shown: "shown",
                hidden: "hidden",
              },
              exportAs: ["ngbAccordion"],
              standalone: !0,
              features: [Dt],
              decls: 3,
              vars: 1,
              consts: [
                ["ngbPanelHeader", ""],
                ["t", ""],
                ["ngFor", "", 3, "ngForOf"],
                [1, "accordion-button", 3, "ngbPanelToggle"],
                [3, "ngTemplateOutlet"],
                ["role", "tab", 3, "id"],
                [3, "ngTemplateOutlet", "ngTemplateOutletContext"],
                ["role", "tabpanel", 3, "id", "ngbRef", 4, "ngIf"],
                ["role", "tabpanel", 3, "id", "ngbRef"],
                [1, "accordion-body"],
              ],
              template: function (t, r) {
                1 & t &&
                  (R(0, SH, 3, 3, "ng-template", 0, 1, Ft),
                  R(2, OH, 4, 11, "ng-template", 2)),
                  2 & t && (N(2), T("ngForOf", r.panels));
              },
              dependencies: [Bn, xr, qw, C$, Og, dn],
              encapsulation: 2,
            })),
            e
          );
        })(),
        Kw = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ imports: [Rg] })),
            e
          );
        })();
      const N$ = ({ classList: e }) => {
        e.remove("show");
      };
      let I$ = (() => {
          class e {
            constructor(t) {
              (this._ngbConfig = t),
                (this.dismissible = !0),
                (this.type = "warning");
            }
            get animation() {
              return void 0 === this._animation
                ? this._ngbConfig.animation
                : this._animation;
            }
            set animation(t) {
              this._animation = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k(Fi));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        Qw = (() => {
          class e {
            constructor(t, r, i, o) {
              (this._renderer = r),
                (this._element = i),
                (this._zone = o),
                (this.closed = new U()),
                (this.dismissible = t.dismissible),
                (this.type = t.type),
                (this.animation = t.animation);
            }
            close() {
              const t = Et(this._zone, this._element.nativeElement, N$, {
                animation: this.animation,
                runningTransition: "continue",
              });
              return t.subscribe(() => this.closed.emit()), t;
            }
            ngOnChanges(t) {
              const r = t.type;
              r &&
                !r.firstChange &&
                (this._renderer.removeClass(
                  this._element.nativeElement,
                  `alert-${r.previousValue}`,
                ),
                this._renderer.addClass(
                  this._element.nativeElement,
                  `alert-${r.currentValue}`,
                ));
            }
            ngOnInit() {
              this._renderer.addClass(
                this._element.nativeElement,
                `alert-${this.type}`,
              );
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(I$), g(an), g(_e), g(ve));
            }),
            (e.ɵcmp = Le({
              type: e,
              selectors: [["ngb-alert"]],
              hostAttrs: ["role", "alert", 1, "alert", "show"],
              hostVars: 4,
              hostBindings: function (t, r) {
                2 & t &&
                  Q("fade", r.animation)("alert-dismissible", r.dismissible);
              },
              inputs: {
                animation: "animation",
                dismissible: "dismissible",
                type: "type",
              },
              outputs: { closed: "closed" },
              exportAs: ["ngbAlert"],
              standalone: !0,
              features: [Xe, Dt],
              ngContentSelectors: Au,
              decls: 2,
              vars: 1,
              consts: function () {
                let n;
                return (
                  (n = $localize`:@@ngb.alert.close:Close`),
                  [
                    [
                      "type",
                      "button",
                      "class",
                      "btn-close",
                      "aria-label",
                      n,
                      3,
                      "click",
                      4,
                      "ngIf",
                    ],
                    [
                      "type",
                      "button",
                      "aria-label",
                      n,
                      1,
                      "btn-close",
                      3,
                      "click",
                    ],
                  ]
                );
              },
              template: function (t, r) {
                1 & t && (ta(), na(0), R(1, AH, 1, 0, "button", 0)),
                  2 & t && (N(1), T("ngIf", r.dismissible));
              },
              dependencies: [dn],
              styles: ["ngb-alert{display:block}\n"],
              encapsulation: 2,
              changeDetection: 0,
            })),
            e
          );
        })(),
        Xw = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ imports: [Qw] })),
            e
          );
        })();
      var li = (() => {
        return ((e = li || (li = {})).START = "start"), (e.END = "end"), li;
        var e;
      })();
      const eE = ({ classList: e }) =>
          e.contains("carousel-item-start") || e.contains("carousel-item-end"),
        Qa = (e) => {
          e.remove("carousel-item-start"), e.remove("carousel-item-end");
        },
        Pu = (e) => {
          Qa(e), e.remove("carousel-item-prev"), e.remove("carousel-item-next");
        },
        O$ = (e, n, { direction: t }) => {
          const { classList: r } = e;
          return n
            ? (eE(e)
                ? Qa(r)
                : (r.add("carousel-item-" + (t === li.START ? "next" : "prev")),
                  cs(e),
                  r.add("carousel-item-" + t)),
              () => {
                Pu(r), r.add("active");
              })
            : (Qa(r), Pu(r), void r.add("active"));
        },
        A$ = (e, n, { direction: t }) => {
          const { classList: r } = e;
          return n
            ? (eE(e) ? Qa(r) : r.add("carousel-item-" + t),
              () => {
                Pu(r), r.remove("active");
              })
            : (Qa(r), Pu(r), void r.remove("active"));
        };
      let R$ = (() => {
          class e {
            constructor(t) {
              (this._ngbConfig = t),
                (this.interval = 5e3),
                (this.wrap = !0),
                (this.keyboard = !0),
                (this.pauseOnHover = !0),
                (this.pauseOnFocus = !0),
                (this.showNavigationArrows = !0),
                (this.showNavigationIndicators = !0);
            }
            get animation() {
              return void 0 === this._animation
                ? this._ngbConfig.animation
                : this._animation;
            }
            set animation(t) {
              this._animation = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k(Fi));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        P$ = 0,
        x$ = (() => {
          class e {
            constructor(t) {
              (this.tplRef = t),
                (this.id = "ngb-slide-" + P$++),
                (this.slid = new U());
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Ve));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["ng-template", "ngbSlide", ""]],
              inputs: { id: "id" },
              outputs: { slid: "slid" },
              standalone: !0,
            })),
            e
          );
        })(),
        F$ = (() => {
          class e {
            constructor(t, r, i, o, s) {
              (this._platformId = r),
                (this._ngZone = i),
                (this._cd = o),
                (this._container = s),
                (this.NgbSlideEventSource = Li),
                (this._destroy$ = new Me()),
                (this._interval$ = new Nt(0)),
                (this._mouseHover$ = new Nt(!1)),
                (this._focused$ = new Nt(!1)),
                (this._pauseOnHover$ = new Nt(!1)),
                (this._pauseOnFocus$ = new Nt(!1)),
                (this._pause$ = new Nt(!1)),
                (this._wrap$ = new Nt(!1)),
                (this.slide = new U()),
                (this.slid = new U()),
                (this._transitionIds = null),
                (this.animation = t.animation),
                (this.interval = t.interval),
                (this.wrap = t.wrap),
                (this.keyboard = t.keyboard),
                (this.pauseOnHover = t.pauseOnHover),
                (this.pauseOnFocus = t.pauseOnFocus),
                (this.showNavigationArrows = t.showNavigationArrows),
                (this.showNavigationIndicators = t.showNavigationIndicators);
            }
            set interval(t) {
              this._interval$.next(t);
            }
            get interval() {
              return this._interval$.value;
            }
            set wrap(t) {
              this._wrap$.next(t);
            }
            get wrap() {
              return this._wrap$.value;
            }
            set pauseOnHover(t) {
              this._pauseOnHover$.next(t);
            }
            get pauseOnHover() {
              return this._pauseOnHover$.value;
            }
            set pauseOnFocus(t) {
              this._pauseOnFocus$.next(t);
            }
            get pauseOnFocus() {
              return this._pauseOnFocus$.value;
            }
            set mouseHover(t) {
              this._mouseHover$.next(t);
            }
            get mouseHover() {
              return this._mouseHover$.value;
            }
            set focused(t) {
              this._focused$.next(t);
            }
            get focused() {
              return this._focused$.value;
            }
            arrowLeft() {
              this.focus(), this.prev(Li.ARROW_LEFT);
            }
            arrowRight() {
              this.focus(), this.next(Li.ARROW_RIGHT);
            }
            ngAfterContentInit() {
              (function pF(e) {
                return e === ED;
              })(this._platformId) &&
                this._ngZone.runOutsideAngular(() => {
                  const t = qc([
                    this.slide.pipe(
                      Y((r) => r.current),
                      Yc(this.activeId),
                    ),
                    this._wrap$,
                    this.slides.changes.pipe(Yc(null)),
                  ]).pipe(
                    Y(([r, i]) => {
                      const o = this.slides.toArray(),
                        s = this._getSlideIdxById(r);
                      return i ? o.length > 1 : s < o.length - 1;
                    }),
                    Yp(),
                  );
                  qc([
                    this._pause$,
                    this._pauseOnHover$,
                    this._mouseHover$,
                    this._pauseOnFocus$,
                    this._focused$,
                    this._interval$,
                    t,
                  ])
                    .pipe(
                      Y(([r, i, o, s, a, l, c]) =>
                        r || (i && o) || (s && a) || !c ? 0 : l,
                      ),
                      Yp(),
                      Hn((r) => (r > 0 ? qp(r, r) : _C)),
                      rt(this._destroy$),
                    )
                    .subscribe(() =>
                      this._ngZone.run(() => this.next(Li.TIMER)),
                    );
                }),
                this.slides.changes.pipe(rt(this._destroy$)).subscribe(() => {
                  this._transitionIds?.forEach((t) =>
                    ((e) => {
                      Ka.get(e)?.complete();
                    })(this._getSlideElement(t)),
                  ),
                    (this._transitionIds = null),
                    this._cd.markForCheck(),
                    this._ngZone.onStable.pipe(gt(1)).subscribe(() => {
                      for (const { id: t } of this.slides) {
                        const r = this._getSlideElement(t);
                        t === this.activeId
                          ? r.classList.add("active")
                          : r.classList.remove("active");
                      }
                    });
                });
            }
            ngAfterContentChecked() {
              let t = this._getSlideById(this.activeId);
              this.activeId = t
                ? t.id
                : this.slides.length
                  ? this.slides.first.id
                  : "";
            }
            ngAfterViewInit() {
              if (this.activeId) {
                const t = this._getSlideElement(this.activeId);
                t && t.classList.add("active");
              }
            }
            ngOnDestroy() {
              this._destroy$.next();
            }
            select(t, r) {
              this._cycleToSelected(
                t,
                this._getSlideEventDirection(this.activeId, t),
                r,
              );
            }
            prev(t) {
              this._cycleToSelected(
                this._getPrevSlide(this.activeId),
                li.END,
                t,
              );
            }
            next(t) {
              this._cycleToSelected(
                this._getNextSlide(this.activeId),
                li.START,
                t,
              );
            }
            pause() {
              this._pause$.next(!0);
            }
            cycle() {
              this._pause$.next(!1);
            }
            focus() {
              this._container.nativeElement.focus();
            }
            _cycleToSelected(t, r, i) {
              const o = this._transitionIds;
              if (o && (o[0] !== t || o[1] !== this.activeId)) return;
              let s = this._getSlideById(t);
              if (s && s.id !== this.activeId) {
                (this._transitionIds = [this.activeId, t]),
                  this.slide.emit({
                    prev: this.activeId,
                    current: s.id,
                    direction: r,
                    paused: this._pause$.value,
                    source: i,
                  });
                const a = {
                    animation: this.animation,
                    runningTransition: "stop",
                    context: { direction: r },
                  },
                  l = [],
                  c = this._getSlideById(this.activeId);
                if (c) {
                  const h = Et(
                    this._ngZone,
                    this._getSlideElement(c.id),
                    A$,
                    a,
                  );
                  h.subscribe(() => {
                    c.slid.emit({ isShown: !1, direction: r, source: i });
                  }),
                    l.push(h);
                }
                const u = this.activeId;
                this.activeId = s.id;
                const d = this._getSlideById(this.activeId),
                  f = Et(this._ngZone, this._getSlideElement(s.id), O$, a);
                f.subscribe(() => {
                  d?.slid.emit({ isShown: !0, direction: r, source: i });
                }),
                  l.push(f),
                  _u(...l)
                    .pipe(gt(1))
                    .subscribe(() => {
                      (this._transitionIds = null),
                        this.slid.emit({
                          prev: u,
                          current: s.id,
                          direction: r,
                          paused: this._pause$.value,
                          source: i,
                        });
                    });
              }
              this._cd.markForCheck();
            }
            _getSlideEventDirection(t, r) {
              return this._getSlideIdxById(t) > this._getSlideIdxById(r)
                ? li.END
                : li.START;
            }
            _getSlideById(t) {
              return this.slides.find((r) => r.id === t) || null;
            }
            _getSlideIdxById(t) {
              const r = this._getSlideById(t);
              return null != r ? this.slides.toArray().indexOf(r) : -1;
            }
            _getNextSlide(t) {
              const r = this.slides.toArray(),
                i = this._getSlideIdxById(t);
              return i === r.length - 1
                ? this.wrap
                  ? r[0].id
                  : r[r.length - 1].id
                : r[i + 1].id;
            }
            _getPrevSlide(t) {
              const r = this.slides.toArray(),
                i = this._getSlideIdxById(t);
              return 0 === i
                ? this.wrap
                  ? r[r.length - 1].id
                  : r[0].id
                : r[i - 1].id;
            }
            _getSlideElement(t) {
              return this._container.nativeElement.querySelector(`#slide-${t}`);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(R$), g(Tc), g(ve), g(cn), g(_e));
            }),
            (e.ɵcmp = Le({
              type: e,
              selectors: [["ngb-carousel"]],
              contentQueries: function (t, r, i) {
                if ((1 & t && Be(i, x$, 4), 2 & t)) {
                  let o;
                  ye((o = be())) && (r.slides = o);
                }
              },
              hostAttrs: ["tabIndex", "0", 1, "carousel", "slide"],
              hostVars: 3,
              hostBindings: function (t, r) {
                1 & t &&
                  G("keydown.arrowLeft", function () {
                    return r.keyboard && r.arrowLeft();
                  })("keydown.arrowRight", function () {
                    return r.keyboard && r.arrowRight();
                  })("mouseenter", function () {
                    return (r.mouseHover = !0);
                  })("mouseleave", function () {
                    return (r.mouseHover = !1);
                  })("focusin", function () {
                    return (r.focused = !0);
                  })("focusout", function () {
                    return (r.focused = !1);
                  }),
                  2 & t &&
                    (de("aria-activedescendant", "slide-" + r.activeId),
                    Lo("display", "block"));
              },
              inputs: {
                animation: "animation",
                activeId: "activeId",
                interval: "interval",
                wrap: "wrap",
                keyboard: "keyboard",
                pauseOnHover: "pauseOnHover",
                pauseOnFocus: "pauseOnFocus",
                showNavigationArrows: "showNavigationArrows",
                showNavigationIndicators: "showNavigationIndicators",
              },
              outputs: { slide: "slide", slid: "slid" },
              exportAs: ["ngbCarousel"],
              standalone: !0,
              features: [Dt],
              decls: 6,
              vars: 6,
              consts: function () {
                let n, t, r;
                return (
                  (n = $localize`:Currently selected slide number read by screen reader@@ngb.carousel.slide-number: Slide ${"\ufffd0\ufffd"}:INTERPOLATION: of ${"\ufffd1\ufffd"}:INTERPOLATION_1: `),
                  (t = $localize`:@@ngb.carousel.previous:Previous`),
                  (r = $localize`:@@ngb.carousel.next:Next`),
                  [
                    ["role", "tablist", 1, "carousel-indicators"],
                    [
                      "type",
                      "button",
                      "data-bs-target",
                      "",
                      "role",
                      "tab",
                      3,
                      "active",
                      "click",
                      4,
                      "ngFor",
                      "ngForOf",
                    ],
                    [1, "carousel-inner"],
                    [
                      "class",
                      "carousel-item",
                      "role",
                      "tabpanel",
                      3,
                      "id",
                      4,
                      "ngFor",
                      "ngForOf",
                    ],
                    [
                      "class",
                      "carousel-control-prev",
                      "type",
                      "button",
                      3,
                      "click",
                      4,
                      "ngIf",
                    ],
                    [
                      "class",
                      "carousel-control-next",
                      "type",
                      "button",
                      3,
                      "click",
                      4,
                      "ngIf",
                    ],
                    [
                      "type",
                      "button",
                      "data-bs-target",
                      "",
                      "role",
                      "tab",
                      3,
                      "click",
                    ],
                    ["role", "tabpanel", 1, "carousel-item", 3, "id"],
                    [1, "visually-hidden"],
                    n,
                    [3, "ngTemplateOutlet"],
                    ["type", "button", 1, "carousel-control-prev", 3, "click"],
                    ["aria-hidden", "true", 1, "carousel-control-prev-icon"],
                    t,
                    ["type", "button", 1, "carousel-control-next", 3, "click"],
                    ["aria-hidden", "true", 1, "carousel-control-next-icon"],
                    r,
                  ]
                );
              },
              template: function (t, r) {
                1 & t &&
                  (M(0, "div", 0),
                  R(1, RH, 1, 5, "button", 1),
                  I(),
                  M(2, "div", 2),
                  R(3, xH, 4, 4, "div", 3),
                  I(),
                  R(4, FH, 4, 0, "button", 4),
                  R(5, kH, 4, 0, "button", 5)),
                  2 & t &&
                    (Q("visually-hidden", !r.showNavigationIndicators),
                    N(1),
                    T("ngForOf", r.slides),
                    N(2),
                    T("ngForOf", r.slides),
                    N(1),
                    T("ngIf", r.showNavigationArrows),
                    N(1),
                    T("ngIf", r.showNavigationArrows));
              },
              dependencies: [Bn, xr, dn],
              encapsulation: 2,
              changeDetection: 0,
            })),
            e
          );
        })();
      var Li = (() => {
        return (
          ((e = Li || (Li = {})).TIMER = "timer"),
          (e.ARROW_LEFT = "arrowLeft"),
          (e.ARROW_RIGHT = "arrowRight"),
          (e.INDICATOR = "indicator"),
          Li
        );
        var e;
      })();
      let tE = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ imports: [F$] })),
            e
          );
        })(),
        nE = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({})),
            e
          );
        })();
      class St {
        constructor(n, t, r) {
          (this.year = Ke(n) ? n : null),
            (this.month = Ke(t) ? t : null),
            (this.day = Ke(r) ? r : null);
        }
        static from(n) {
          return n instanceof St
            ? n
            : n
              ? new St(n.year, n.month, n.day)
              : null;
        }
        equals(n) {
          return (
            null != n &&
            this.year === n.year &&
            this.month === n.month &&
            this.day === n.day
          );
        }
        before(n) {
          return (
            !!n &&
            (this.year === n.year
              ? this.month === n.month
                ? this.day !== n.day && this.day < n.day
                : this.month < n.month
              : this.year < n.year)
          );
        }
        after(n) {
          return (
            !!n &&
            (this.year === n.year
              ? this.month === n.month
                ? this.day !== n.day && this.day > n.day
                : this.month > n.month
              : this.year > n.year)
          );
        }
      }
      function us(e, n) {
        return !(function k$(e, n) {
          return (!e && !n) || (!!e && !!n && e.equals(n));
        })(e, n);
      }
      function rE(e, n) {
        return !(
          (!e && !n) ||
          (e && n && e.year === n.year && e.month === n.month)
        );
      }
      function xu(e, n, t) {
        return e && n && e.before(n) ? n : e && t && e.after(t) ? t : e || null;
      }
      function xg(e, n) {
        const { minDate: t, maxDate: r, disabled: i, markDisabled: o } = n;
        return !(
          null == e ||
          i ||
          (o && o(e, { year: e.year, month: e.month })) ||
          (t && e.before(t)) ||
          (r && e.after(r))
        );
      }
      function iE(e) {
        return new St(e.getFullYear(), e.getMonth() + 1, e.getDate());
      }
      function Fu(e) {
        const n = new Date(e.year, e.month - 1, e.day, 12);
        return isNaN(n.getTime()) || n.setFullYear(e.year), n;
      }
      let ku = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return (function z$() {
                  return new W$();
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        W$ = (() => {
          class e extends ku {
            getDaysPerWeek() {
              return 7;
            }
            getMonths() {
              return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            }
            getWeeksPerMonth() {
              return 6;
            }
            getNext(t, r = "d", i = 1) {
              let o = Fu(t),
                s = !0,
                a = o.getMonth();
              switch (r) {
                case "y":
                  o.setFullYear(o.getFullYear() + i);
                  break;
                case "m":
                  (a += i), o.setMonth(a), (a %= 12), a < 0 && (a += 12);
                  break;
                case "d":
                  o.setDate(o.getDate() + i), (s = !1);
                  break;
                default:
                  return t;
              }
              return s && o.getMonth() !== a && o.setDate(0), iE(o);
            }
            getPrev(t, r = "d", i = 1) {
              return this.getNext(t, r, -i);
            }
            getWeekday(t) {
              let i = Fu(t).getDay();
              return 0 === i ? 7 : i;
            }
            getWeekNumber(t, r) {
              7 === r && (r = 0);
              const s = Fu(t[(11 - r) % 7]);
              s.setDate(s.getDate() + 4 - (s.getDay() || 7));
              const a = s.getTime();
              return (
                s.setMonth(0),
                s.setDate(1),
                Math.floor(Math.round((a - s.getTime()) / 864e5) / 7) + 1
              );
            }
            getToday() {
              return iE(new Date());
            }
            isValid(t) {
              if (
                !(t && Ke(t.year) && Ke(t.month) && Ke(t.day) && 0 !== t.year)
              )
                return !1;
              const r = Fu(t);
              return (
                !isNaN(r.getTime()) &&
                r.getFullYear() === t.year &&
                r.getMonth() + 1 === t.month &&
                r.getDate() === t.day
              );
            }
          }
          return (
            (e.ɵfac = (function () {
              let n;
              return function (r) {
                return (n || (n = et(e)))(r || e);
              };
            })()),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Vi = (() => {
          class e {
            getMonthLabel(t) {
              return `${this.getMonthFullName(t.month, t.year)} ${this.getYearNumerals(t.year)}`;
            }
            getDayNumerals(t) {
              return `${t.day}`;
            }
            getWeekNumerals(t) {
              return `${t}`;
            }
            getYearNumerals(t) {
              return `${t}`;
            }
            getWeekLabel() {
              return "";
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function (t) {
                let r = null;
                return (
                  (r = t
                    ? new t()
                    : (function q$(e) {
                        return new Y$(e);
                      })(k(Cn))),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        Y$ = (() => {
          class e extends Vi {
            constructor(t) {
              super(),
                (this._locale = t),
                (this._monthsShort = zh(t, ze.Standalone, ie.Abbreviated)),
                (this._monthsFull = zh(t, ze.Standalone, ie.Wide));
            }
            getWeekdayLabel(t, r) {
              const i = sD(
                this._locale,
                ze.Standalone,
                void 0 === r ? ie.Short : r,
              );
              return i.map((s, a) => i[(a + 1) % 7])[t - 1] || "";
            }
            getMonthShortName(t) {
              return this._monthsShort[t - 1] || "";
            }
            getMonthFullName(t) {
              return this._monthsFull[t - 1] || "";
            }
            getDayAriaLabel(t) {
              return lD(
                new Date(t.year, t.month - 1, t.day),
                "fullDate",
                this._locale,
              );
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k(Cn));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Fg = (() => {
          class e {
            constructor(t, r) {
              (this._calendar = t),
                (this._i18n = r),
                (this._VALIDATORS = {
                  dayTemplateData: (i) => {
                    if (this._state.dayTemplateData !== i)
                      return { dayTemplateData: i };
                  },
                  displayMonths: (i) => {
                    if (
                      Ke((i = Bt(i))) &&
                      i > 0 &&
                      this._state.displayMonths !== i
                    )
                      return { displayMonths: i };
                  },
                  disabled: (i) => {
                    if (this._state.disabled !== i) return { disabled: i };
                  },
                  firstDayOfWeek: (i) => {
                    if (
                      Ke((i = Bt(i))) &&
                      i >= 0 &&
                      this._state.firstDayOfWeek !== i
                    )
                      return { firstDayOfWeek: i };
                  },
                  focusVisible: (i) => {
                    if (this._state.focusVisible !== i && !this._state.disabled)
                      return { focusVisible: i };
                  },
                  markDisabled: (i) => {
                    if (this._state.markDisabled !== i)
                      return { markDisabled: i };
                  },
                  maxDate: (i) => {
                    const o = this.toValidDate(i, null);
                    if (us(this._state.maxDate, o)) return { maxDate: o };
                  },
                  minDate: (i) => {
                    const o = this.toValidDate(i, null);
                    if (us(this._state.minDate, o)) return { minDate: o };
                  },
                  navigation: (i) => {
                    if (this._state.navigation !== i) return { navigation: i };
                  },
                  outsideDays: (i) => {
                    if (this._state.outsideDays !== i)
                      return { outsideDays: i };
                  },
                  weekdays: (i) => {
                    const o = !0 === i || !1 === i ? ie.Short : i,
                      s = (!0 !== i && !1 !== i) || i;
                    if (
                      this._state.weekdayWidth !== o ||
                      this._state.weekdaysVisible !== s
                    )
                      return { weekdayWidth: o, weekdaysVisible: s };
                  },
                }),
                (this._model$ = new Me()),
                (this._dateSelect$ = new Me()),
                (this._state = {
                  dayTemplateData: null,
                  markDisabled: null,
                  maxDate: null,
                  minDate: null,
                  disabled: !1,
                  displayMonths: 1,
                  firstDate: null,
                  firstDayOfWeek: 1,
                  lastDate: null,
                  focusDate: null,
                  focusVisible: !1,
                  months: [],
                  navigation: "select",
                  outsideDays: "visible",
                  prevDisabled: !1,
                  nextDisabled: !1,
                  selectedDate: null,
                  selectBoxes: { years: [], months: [] },
                  weekdayWidth: ie.Short,
                  weekdaysVisible: !0,
                });
            }
            get model$() {
              return this._model$.pipe(wt((t) => t.months.length > 0));
            }
            get dateSelect$() {
              return this._dateSelect$.pipe(wt((t) => null !== t));
            }
            set(t) {
              let r = Object.keys(t)
                .map((i) => this._VALIDATORS[i](t[i]))
                .reduce((i, o) => ({ ...i, ...o }), {});
              Object.keys(r).length > 0 && this._nextState(r);
            }
            focus(t) {
              const r = this.toValidDate(t, null);
              null != r &&
                !this._state.disabled &&
                us(this._state.focusDate, r) &&
                this._nextState({ focusDate: t });
            }
            focusSelect() {
              xg(this._state.focusDate, this._state) &&
                this.select(this._state.focusDate, { emitEvent: !0 });
            }
            open(t) {
              const r = this.toValidDate(t, this._calendar.getToday());
              null != r &&
                !this._state.disabled &&
                (!this._state.firstDate || rE(this._state.firstDate, r)) &&
                this._nextState({ firstDate: r });
            }
            select(t, r = {}) {
              const i = this.toValidDate(t, null);
              null != i &&
                !this._state.disabled &&
                (us(this._state.selectedDate, i) &&
                  this._nextState({ selectedDate: i }),
                r.emitEvent && xg(i, this._state) && this._dateSelect$.next(i));
            }
            toValidDate(t, r) {
              const i = St.from(t);
              return (
                void 0 === r && (r = this._calendar.getToday()),
                this._calendar.isValid(i) ? i : r
              );
            }
            getMonth(t) {
              for (let r of this._state.months)
                if (t.month === r.number && t.year === r.year) return r;
              throw new Error(`month ${t.month} of year ${t.year} not found`);
            }
            _nextState(t) {
              const r = this._updateState(t);
              this._patchContexts(r),
                (this._state = r),
                this._model$.next(this._state);
            }
            _patchContexts(t) {
              const {
                months: r,
                displayMonths: i,
                selectedDate: o,
                focusDate: s,
                focusVisible: a,
                disabled: l,
                outsideDays: c,
              } = t;
              t.months.forEach((u) => {
                u.weeks.forEach((d) => {
                  d.days.forEach((f) => {
                    s && (f.context.focused = s.equals(f.date) && a),
                      (f.tabindex =
                        !l && s && f.date.equals(s) && s.month === u.number
                          ? 0
                          : -1),
                      !0 === l && (f.context.disabled = !0),
                      void 0 !== o &&
                        (f.context.selected = null !== o && o.equals(f.date)),
                      u.number !== f.date.month &&
                        (f.hidden =
                          "hidden" === c ||
                          "collapsed" === c ||
                          (i > 1 &&
                            f.date.after(r[0].firstDate) &&
                            f.date.before(r[i - 1].lastDate)));
                  });
                });
              });
            }
            _updateState(t) {
              const r = Object.assign({}, this._state, t);
              let i = r.firstDate;
              if (
                (("minDate" in t || "maxDate" in t) &&
                  ((function L$(e, n) {
                    if (n && e && n.before(e))
                      throw new Error(
                        `'maxDate' ${n} should be greater than 'minDate' ${e}`,
                      );
                  })(r.minDate, r.maxDate),
                  (r.focusDate = xu(r.focusDate, r.minDate, r.maxDate)),
                  (r.firstDate = xu(r.firstDate, r.minDate, r.maxDate)),
                  (i = r.focusDate)),
                "disabled" in t && (r.focusVisible = !1),
                "selectedDate" in t &&
                  0 === this._state.months.length &&
                  (i = r.selectedDate),
                "focusVisible" in t ||
                  ("focusDate" in t &&
                    ((r.focusDate = xu(r.focusDate, r.minDate, r.maxDate)),
                    (i = r.focusDate),
                    0 !== r.months.length &&
                      r.focusDate &&
                      !r.focusDate.before(r.firstDate) &&
                      !r.focusDate.after(r.lastDate))))
              )
                return r;
              if (
                ("firstDate" in t &&
                  ((r.firstDate = xu(r.firstDate, r.minDate, r.maxDate)),
                  (i = r.firstDate)),
                i)
              ) {
                const s = (function $$(e, n, t, r, i) {
                  const { displayMonths: o, months: s } = t,
                    a = s.splice(0, s.length);
                  return (
                    Array.from({ length: o }, (c, u) => {
                      const d = Object.assign(e.getNext(n, "m", u), { day: 1 });
                      if (((s[u] = null), !i)) {
                        const f = a.findIndex((h) => h.firstDate.equals(d));
                        -1 !== f && (s[u] = a.splice(f, 1)[0]);
                      }
                      return d;
                    }).forEach((c, u) => {
                      null === s[u] &&
                        (s[u] = (function U$(e, n, t, r, i = {}) {
                          const {
                              dayTemplateData: o,
                              minDate: s,
                              maxDate: a,
                              firstDayOfWeek: l,
                              markDisabled: c,
                              outsideDays: u,
                              weekdayWidth: d,
                              weekdaysVisible: f,
                            } = t,
                            h = e.getToday();
                          (i.firstDate = null),
                            (i.lastDate = null),
                            (i.number = n.month),
                            (i.year = n.year),
                            (i.weeks = i.weeks || []),
                            (i.weekdays = i.weekdays || []),
                            (n = (function G$(e, n, t) {
                              const r = e.getDaysPerWeek(),
                                i = new St(n.year, n.month, 1),
                                o = e.getWeekday(i) % r;
                              return e.getPrev(i, "d", (r + o - t) % r);
                            })(e, n, l)),
                            f || (i.weekdays.length = 0);
                          for (let p = 0; p < e.getWeeksPerMonth(); p++) {
                            let m = i.weeks[p];
                            m ||
                              (m = i.weeks[p] =
                                { number: 0, days: [], collapsed: !0 });
                            const v = m.days;
                            for (let b = 0; b < e.getDaysPerWeek(); b++) {
                              0 === p &&
                                f &&
                                (i.weekdays[b] = r.getWeekdayLabel(
                                  e.getWeekday(n),
                                  d,
                                ));
                              const w = new St(n.year, n.month, n.day),
                                D = e.getNext(w),
                                O = r.getDayAriaLabel(w);
                              let j = !!(
                                (s && w.before(s)) ||
                                (a && w.after(a))
                              );
                              !j &&
                                c &&
                                (j = c(w, { month: i.number, year: i.year }));
                              let W = w.equals(h),
                                je = o
                                  ? o(w, { month: i.number, year: i.year })
                                  : void 0;
                              null === i.firstDate &&
                                w.month === i.number &&
                                (i.firstDate = w),
                                w.month === i.number &&
                                  D.month !== i.number &&
                                  (i.lastDate = w);
                              let $e = v[b];
                              $e || ($e = v[b] = {}),
                                ($e.date = w),
                                ($e.context = Object.assign($e.context || {}, {
                                  $implicit: w,
                                  date: w,
                                  data: je,
                                  currentMonth: i.number,
                                  currentYear: i.year,
                                  disabled: j,
                                  focused: !1,
                                  selected: !1,
                                  today: W,
                                })),
                                ($e.tabindex = -1),
                                ($e.ariaLabel = O),
                                ($e.hidden = !1),
                                (n = D);
                            }
                            (m.number = e.getWeekNumber(
                              v.map((b) => b.date),
                              l,
                            )),
                              (m.collapsed =
                                "collapsed" === u &&
                                v[0].date.month !== i.number &&
                                v[v.length - 1].date.month !== i.number);
                          }
                          return i;
                        })(e, c, t, r, a.shift() || {}));
                    }),
                    s
                  );
                })(
                  this._calendar,
                  i,
                  r,
                  this._i18n,
                  "dayTemplateData" in t ||
                    "firstDayOfWeek" in t ||
                    "markDisabled" in t ||
                    "minDate" in t ||
                    "maxDate" in t ||
                    "disabled" in t ||
                    "outsideDays" in t ||
                    "weekdaysVisible" in t,
                );
                (r.months = s),
                  (r.firstDate = s[0].firstDate),
                  (r.lastDate = s[s.length - 1].lastDate),
                  "selectedDate" in t &&
                    !xg(r.selectedDate, r) &&
                    (r.selectedDate = null),
                  "firstDate" in t &&
                    (!r.focusDate ||
                      r.focusDate.before(r.firstDate) ||
                      r.focusDate.after(r.lastDate)) &&
                    (r.focusDate = i);
                const a =
                    !this._state.firstDate ||
                    this._state.firstDate.year !== r.firstDate.year,
                  l =
                    !this._state.firstDate ||
                    this._state.firstDate.month !== r.firstDate.month;
                "select" === r.navigation
                  ? (("minDate" in t ||
                      "maxDate" in t ||
                      0 === r.selectBoxes.years.length ||
                      a) &&
                      (r.selectBoxes.years = (function B$(e, n, t) {
                        if (!e) return [];
                        const r = n
                            ? Math.max(n.year, e.year - 500)
                            : e.year - 10,
                          o =
                            (t ? Math.min(t.year, e.year + 500) : e.year + 10) -
                            r +
                            1,
                          s = Array(o);
                        for (let a = 0; a < o; a++) s[a] = r + a;
                        return s;
                      })(r.firstDate, r.minDate, r.maxDate)),
                    ("minDate" in t ||
                      "maxDate" in t ||
                      0 === r.selectBoxes.months.length ||
                      a) &&
                      (r.selectBoxes.months = (function V$(e, n, t, r) {
                        if (!n) return [];
                        let i = e.getMonths(n.year);
                        if (t && n.year === t.year) {
                          const o = i.findIndex((s) => s === t.month);
                          i = i.slice(o);
                        }
                        if (r && n.year === r.year) {
                          const o = i.findIndex((s) => s === r.month);
                          i = i.slice(0, o + 1);
                        }
                        return i;
                      })(this._calendar, r.firstDate, r.minDate, r.maxDate)))
                  : (r.selectBoxes = { years: [], months: [] }),
                  ("arrows" === r.navigation || "select" === r.navigation) &&
                    (l ||
                      a ||
                      "minDate" in t ||
                      "maxDate" in t ||
                      "disabled" in t) &&
                    ((r.prevDisabled =
                      r.disabled ||
                      (function j$(e, n, t) {
                        const r = Object.assign(e.getPrev(n, "m"), { day: 1 });
                        return (
                          null != t &&
                          ((r.year === t.year && r.month < t.month) ||
                            (r.year < t.year && 1 === t.month))
                        );
                      })(this._calendar, r.firstDate, r.minDate)),
                    (r.nextDisabled =
                      r.disabled ||
                      (function H$(e, n, t) {
                        const r = Object.assign(e.getNext(n, "m"), { day: 1 });
                        return null != t && r.after(t);
                      })(this._calendar, r.lastDate, r.maxDate)));
              }
              return r;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k(ku), k(Vi));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      var ds = (() => {
        return (
          ((e = ds || (ds = {}))[(e.PREV = 0)] = "PREV"),
          (e[(e.NEXT = 1)] = "NEXT"),
          ds
        );
        var e;
      })();
      let J$ = (() => {
          class e {
            constructor(t) {
              this.i18n = t;
            }
            isMuted() {
              return (
                !this.selected &&
                (this.date.month !== this.currentMonth || this.disabled)
              );
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Vi));
            }),
            (e.ɵcmp = Le({
              type: e,
              selectors: [["", "ngbDatepickerDayView", ""]],
              hostAttrs: [1, "btn-light"],
              hostVars: 10,
              hostBindings: function (t, r) {
                2 & t &&
                  Q("bg-primary", r.selected)("text-white", r.selected)(
                    "text-muted",
                    r.isMuted(),
                  )("outside", r.isMuted())("active", r.focused);
              },
              inputs: {
                currentMonth: "currentMonth",
                date: "date",
                disabled: "disabled",
                focused: "focused",
                selected: "selected",
              },
              standalone: !0,
              features: [Dt],
              attrs: LH,
              decls: 1,
              vars: 1,
              template: function (t, r) {
                1 & t && fe(0), 2 & t && zt(r.i18n.getDayNumerals(r.date));
              },
              styles: [
                "[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:transparent}[ngbDatepickerDayView]:hover:not(.bg-primary),[ngbDatepickerDayView].active:not(.bg-primary){background-color:var(--bs-btn-bg);outline:1px solid var(--bs-border-color)}[ngbDatepickerDayView].outside{opacity:.5}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            e
          );
        })(),
        Z$ = (() => {
          class e {
            constructor(t, r) {
              (this.i18n = t),
                (this._renderer = r),
                (this.select = new U()),
                (this._month = -1),
                (this._year = -1);
            }
            changeMonth(t) {
              this.select.emit(new St(this.date.year, Bt(t), 1));
            }
            changeYear(t) {
              this.select.emit(new St(Bt(t), this.date.month, 1));
            }
            ngAfterViewChecked() {
              this.date &&
                (this.date.month !== this._month &&
                  ((this._month = this.date.month),
                  this._renderer.setProperty(
                    this.monthSelect.nativeElement,
                    "value",
                    this._month,
                  )),
                this.date.year !== this._year &&
                  ((this._year = this.date.year),
                  this._renderer.setProperty(
                    this.yearSelect.nativeElement,
                    "value",
                    this._year,
                  )));
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Vi), g(an));
            }),
            (e.ɵcmp = Le({
              type: e,
              selectors: [["ngb-datepicker-navigation-select"]],
              viewQuery: function (t, r) {
                if ((1 & t && (Ei(VH, 7, _e), Ei(BH, 7, _e)), 2 & t)) {
                  let i;
                  ye((i = be())) && (r.monthSelect = i.first),
                    ye((i = be())) && (r.yearSelect = i.first);
                }
              },
              inputs: {
                date: "date",
                disabled: "disabled",
                months: "months",
                years: "years",
              },
              outputs: { select: "select" },
              standalone: !0,
              features: [Dt],
              decls: 6,
              vars: 4,
              consts: function () {
                let n, t, r, i;
                return (
                  (n = $localize`:@@ngb.datepicker.select-month:Select month`),
                  (t = $localize`:@@ngb.datepicker.select-month:Select month`),
                  (r = $localize`:@@ngb.datepicker.select-year:Select year`),
                  (i = $localize`:@@ngb.datepicker.select-year:Select year`),
                  [
                    [
                      "aria-label",
                      n,
                      "title",
                      t,
                      1,
                      "form-select",
                      3,
                      "disabled",
                      "change",
                    ],
                    ["month", ""],
                    [3, "value", 4, "ngFor", "ngForOf"],
                    [
                      "aria-label",
                      r,
                      "title",
                      i,
                      1,
                      "form-select",
                      3,
                      "disabled",
                      "change",
                    ],
                    ["year", ""],
                    [3, "value"],
                  ]
                );
              },
              template: function (t, r) {
                1 & t &&
                  (M(0, "select", 0, 1),
                  G("change", function (o) {
                    return r.changeMonth(o.target.value);
                  }),
                  R(2, HH, 2, 3, "option", 2),
                  I(),
                  M(3, "select", 3, 4),
                  G("change", function (o) {
                    return r.changeYear(o.target.value);
                  }),
                  R(5, jH, 2, 2, "option", 2),
                  I()),
                  2 & t &&
                    (T("disabled", r.disabled),
                    N(2),
                    T("ngForOf", r.months),
                    N(1),
                    T("disabled", r.disabled),
                    N(2),
                    T("ngForOf", r.years));
              },
              dependencies: [Bn],
              styles: [
                "ngb-datepicker-navigation-select>.form-select{flex:1 1 auto;padding:0 .5rem;font-size:.875rem;height:1.85rem}ngb-datepicker-navigation-select>.form-select:focus{z-index:1}ngb-datepicker-navigation-select>.form-select::-ms-value{background-color:transparent!important}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            e
          );
        })(),
        K$ = (() => {
          class e {
            constructor(t) {
              (this.i18n = t),
                (this.navigation = ds),
                (this.months = []),
                (this.navigate = new U()),
                (this.select = new U());
            }
            onClickPrev(t) {
              t.currentTarget.focus(), this.navigate.emit(this.navigation.PREV);
            }
            onClickNext(t) {
              t.currentTarget.focus(), this.navigate.emit(this.navigation.NEXT);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Vi));
            }),
            (e.ɵcmp = Le({
              type: e,
              selectors: [["ngb-datepicker-navigation"]],
              inputs: {
                date: "date",
                disabled: "disabled",
                months: "months",
                showSelect: "showSelect",
                prevDisabled: "prevDisabled",
                nextDisabled: "nextDisabled",
                selectBoxes: "selectBoxes",
              },
              outputs: { navigate: "navigate", select: "select" },
              standalone: !0,
              features: [Dt],
              decls: 8,
              vars: 4,
              consts: function () {
                let n, t, r, i;
                return (
                  (n = $localize`:@@ngb.datepicker.previous-month:Previous month`),
                  (t = $localize`:@@ngb.datepicker.previous-month:Previous month`),
                  (r = $localize`:@@ngb.datepicker.next-month:Next month`),
                  (i = $localize`:@@ngb.datepicker.next-month:Next month`),
                  [
                    [1, "ngb-dp-arrow"],
                    [
                      "type",
                      "button",
                      "aria-label",
                      n,
                      "title",
                      t,
                      1,
                      "btn",
                      "btn-link",
                      "ngb-dp-arrow-btn",
                      3,
                      "disabled",
                      "click",
                    ],
                    [1, "ngb-dp-navigation-chevron"],
                    [
                      "class",
                      "ngb-dp-navigation-select",
                      3,
                      "date",
                      "disabled",
                      "months",
                      "years",
                      "select",
                      4,
                      "ngIf",
                    ],
                    [4, "ngIf"],
                    [1, "ngb-dp-arrow", "right"],
                    [
                      "type",
                      "button",
                      "aria-label",
                      r,
                      "title",
                      i,
                      1,
                      "btn",
                      "btn-link",
                      "ngb-dp-arrow-btn",
                      3,
                      "disabled",
                      "click",
                    ],
                    [
                      1,
                      "ngb-dp-navigation-select",
                      3,
                      "date",
                      "disabled",
                      "months",
                      "years",
                      "select",
                    ],
                    ["ngFor", "", 3, "ngForOf"],
                    ["class", "ngb-dp-arrow", 4, "ngIf"],
                    [1, "ngb-dp-month-name"],
                  ]
                );
              },
              template: function (t, r) {
                1 & t &&
                  (M(0, "div", 0)(1, "button", 1),
                  G("click", function (o) {
                    return r.onClickPrev(o);
                  }),
                  qe(2, "span", 2),
                  I()(),
                  R(3, $H, 1, 4, "ngb-datepicker-navigation-select", 3),
                  R(4, WH, 1, 1, null, 4),
                  M(5, "div", 5)(6, "button", 6),
                  G("click", function (o) {
                    return r.onClickNext(o);
                  }),
                  qe(7, "span", 2),
                  I()()),
                  2 & t &&
                    (N(1),
                    T("disabled", r.prevDisabled),
                    N(2),
                    T("ngIf", r.showSelect),
                    N(1),
                    T("ngIf", !r.showSelect),
                    N(2),
                    T("disabled", r.nextDisabled));
              },
              dependencies: [dn, Bn, Z$],
              styles: [
                "ngb-datepicker-navigation{display:flex;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;transform:rotate(-135deg)}.ngb-dp-arrow{display:flex;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow.right{justify-content:flex-end}.ngb-dp-arrow.right .ngb-dp-navigation-chevron{transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:flex;flex:1 1 9rem}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            e
          );
        })();
      var he = (() => {
        return (
          ((e = he || (he = {}))[(e.Tab = 9)] = "Tab"),
          (e[(e.Enter = 13)] = "Enter"),
          (e[(e.Escape = 27)] = "Escape"),
          (e[(e.Space = 32)] = "Space"),
          (e[(e.PageUp = 33)] = "PageUp"),
          (e[(e.PageDown = 34)] = "PageDown"),
          (e[(e.End = 35)] = "End"),
          (e[(e.Home = 36)] = "Home"),
          (e[(e.ArrowLeft = 37)] = "ArrowLeft"),
          (e[(e.ArrowUp = 38)] = "ArrowUp"),
          (e[(e.ArrowRight = 39)] = "ArrowRight"),
          (e[(e.ArrowDown = 40)] = "ArrowDown"),
          he
        );
        var e;
      })();
      let Q$ = (() => {
          class e {
            processKey(t, r) {
              const { state: i, calendar: o } = r;
              switch (t.which) {
                case he.PageUp:
                  r.focusDate(
                    o.getPrev(i.focusedDate, t.shiftKey ? "y" : "m", 1),
                  );
                  break;
                case he.PageDown:
                  r.focusDate(
                    o.getNext(i.focusedDate, t.shiftKey ? "y" : "m", 1),
                  );
                  break;
                case he.End:
                  r.focusDate(t.shiftKey ? i.maxDate : i.lastDate);
                  break;
                case he.Home:
                  r.focusDate(t.shiftKey ? i.minDate : i.firstDate);
                  break;
                case he.ArrowLeft:
                  r.focusDate(o.getPrev(i.focusedDate, "d", 1));
                  break;
                case he.ArrowUp:
                  r.focusDate(
                    o.getPrev(i.focusedDate, "d", o.getDaysPerWeek()),
                  );
                  break;
                case he.ArrowRight:
                  r.focusDate(o.getNext(i.focusedDate, "d", 1));
                  break;
                case he.ArrowDown:
                  r.focusDate(
                    o.getNext(i.focusedDate, "d", o.getDaysPerWeek()),
                  );
                  break;
                case he.Enter:
                case he.Space:
                  r.focusSelect();
                  break;
                default:
                  return;
              }
              t.preventDefault(), t.stopPropagation();
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        kg = (() => {
          class e {
            constructor() {
              (this.displayMonths = 1),
                (this.firstDayOfWeek = 1),
                (this.navigation = "select"),
                (this.outsideDays = "visible"),
                (this.showWeekNumbers = !1),
                (this.weekdays = ie.Short);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        Lg = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return (function X$() {
                  return new eU();
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        eU = (() => {
          class e extends Lg {
            fromModel(t) {
              return t && Ke(t.year) && Ke(t.month) && Ke(t.day)
                ? { year: t.year, month: t.month, day: t.day }
                : null;
            }
            toModel(t) {
              return t && Ke(t.year) && Ke(t.month) && Ke(t.day)
                ? { year: t.year, month: t.month, day: t.day }
                : null;
            }
          }
          return (
            (e.ɵfac = (function () {
              let n;
              return function (r) {
                return (n || (n = et(e)))(r || e);
              };
            })()),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        oE = (() => {
          class e {
            constructor(t) {
              this.templateRef = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Ve));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["ng-template", "ngbDatepickerContent", ""]],
              standalone: !0,
            })),
            e
          );
        })(),
        Vg = (() => {
          class e {
            constructor(t, r, i, o) {
              (this.i18n = t),
                (this.datepicker = r),
                (this._keyboardService = i),
                (this._service = o);
            }
            set month(t) {
              this.viewModel = this._service.getMonth(t);
            }
            onKeyDown(t) {
              this._keyboardService.processKey(t, this.datepicker);
            }
            doSelect(t) {
              !t.context.disabled &&
                !t.hidden &&
                this.datepicker.onDateSelect(t.date);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Vi), g(ee(() => Lu)), g(Q$), g(Fg));
            }),
            (e.ɵcmp = Le({
              type: e,
              selectors: [["ngb-datepicker-month"]],
              hostAttrs: ["role", "grid"],
              hostBindings: function (t, r) {
                1 & t &&
                  G("keydown", function (o) {
                    return r.onKeyDown(o);
                  });
              },
              inputs: { month: "month" },
              standalone: !0,
              features: [Dt],
              decls: 2,
              vars: 2,
              consts: [
                [
                  "class",
                  "ngb-dp-week ngb-dp-weekdays",
                  "role",
                  "row",
                  4,
                  "ngIf",
                ],
                ["ngFor", "", 3, "ngForOf"],
                ["role", "row", 1, "ngb-dp-week", "ngb-dp-weekdays"],
                ["class", "ngb-dp-weekday ngb-dp-showweek small", 4, "ngIf"],
                [
                  "class",
                  "ngb-dp-weekday small",
                  "role",
                  "columnheader",
                  4,
                  "ngFor",
                  "ngForOf",
                ],
                [1, "ngb-dp-weekday", "ngb-dp-showweek", "small"],
                ["role", "columnheader", 1, "ngb-dp-weekday", "small"],
                ["class", "ngb-dp-week", "role", "row", 4, "ngIf"],
                ["role", "row", 1, "ngb-dp-week"],
                ["class", "ngb-dp-week-number small text-muted", 4, "ngIf"],
                [
                  "class",
                  "ngb-dp-day",
                  "role",
                  "gridcell",
                  3,
                  "disabled",
                  "tabindex",
                  "hidden",
                  "ngb-dp-today",
                  "click",
                  4,
                  "ngFor",
                  "ngForOf",
                ],
                [1, "ngb-dp-week-number", "small", "text-muted"],
                ["role", "gridcell", 1, "ngb-dp-day", 3, "tabindex", "click"],
                [3, "ngIf"],
                [3, "ngTemplateOutlet", "ngTemplateOutletContext"],
              ],
              template: function (t, r) {
                1 & t &&
                  (R(0, JH, 3, 2, "div", 0), R(1, tj, 1, 1, "ng-template", 1)),
                  2 & t &&
                    (T("ngIf", r.viewModel.weekdays.length > 0),
                    N(1),
                    T("ngForOf", r.viewModel.weeks));
              },
              dependencies: [dn, Bn, xr],
              styles: [
                'ngb-datepicker-month{display:block}.ngb-dp-weekday,.ngb-dp-week-number{line-height:2rem;text-align:center;font-style:italic}.ngb-dp-weekday{color:var(--bs-info)}.ngb-dp-week{border-radius:.25rem;display:flex}.ngb-dp-weekdays{border-bottom:1px solid var(--bs-border-color);border-radius:0;background-color:var(--bs-light)}.ngb-dp-day,.ngb-dp-weekday,.ngb-dp-week-number{width:2rem;height:2rem}.ngb-dp-day{cursor:pointer}.ngb-dp-day.disabled,.ngb-dp-day.hidden{cursor:default;pointer-events:none}.ngb-dp-day[tabindex="0"]{z-index:1}\n',
              ],
              encapsulation: 2,
            })),
            e
          );
        })(),
        Lu = (() => {
          class e {
            constructor(t, r, i, o, s, a, l, c) {
              (this._service = t),
                (this._calendar = r),
                (this._i18n = i),
                (this._elementRef = a),
                (this._ngbDateAdapter = l),
                (this._ngZone = c),
                (this.injector = X(ln)),
                (this._controlValue = null),
                (this._destroyed$ = new Me()),
                (this._publicState = {}),
                (this.navigate = new U()),
                (this.dateSelect = new U()),
                (this.onChange = (u) => {}),
                (this.onTouched = () => {}),
                [
                  "contentTemplate",
                  "dayTemplate",
                  "dayTemplateData",
                  "displayMonths",
                  "firstDayOfWeek",
                  "footerTemplate",
                  "markDisabled",
                  "minDate",
                  "maxDate",
                  "navigation",
                  "outsideDays",
                  "showWeekNumbers",
                  "startDate",
                  "weekdays",
                ].forEach((u) => (this[u] = o[u])),
                t.dateSelect$.pipe(rt(this._destroyed$)).subscribe((u) => {
                  this.dateSelect.emit(u);
                }),
                t.model$.pipe(rt(this._destroyed$)).subscribe((u) => {
                  const d = u.firstDate,
                    f = this.model ? this.model.firstDate : null;
                  this._publicState = {
                    maxDate: u.maxDate,
                    minDate: u.minDate,
                    firstDate: u.firstDate,
                    lastDate: u.lastDate,
                    focusedDate: u.focusDate,
                    months: u.months.map((b) => b.firstDate),
                  };
                  let h = !1;
                  if (
                    !d.equals(f) &&
                    (this.navigate.emit({
                      current: f ? { year: f.year, month: f.month } : null,
                      next: { year: d.year, month: d.month },
                      preventDefault: () => (h = !0),
                    }),
                    h && null !== f)
                  )
                    return void this._service.open(f);
                  const p = u.selectedDate,
                    m = u.focusDate,
                    v = this.model ? this.model.focusDate : null;
                  (this.model = u),
                    us(p, this._controlValue) &&
                      ((this._controlValue = p),
                      this.onTouched(),
                      this.onChange(this._ngbDateAdapter.toModel(p))),
                    us(m, v) && v && u.focusVisible && this.focus(),
                    s.markForCheck();
                });
            }
            get state() {
              return this._publicState;
            }
            get calendar() {
              return this._calendar;
            }
            get i18n() {
              return this._i18n;
            }
            focusDate(t) {
              this._service.focus(St.from(t));
            }
            focusSelect() {
              this._service.focusSelect();
            }
            focus() {
              this._ngZone.onStable
                .asObservable()
                .pipe(gt(1))
                .subscribe(() => {
                  const t = this._elementRef.nativeElement.querySelector(
                    'div.ngb-dp-day[tabindex="0"]',
                  );
                  t && t.focus();
                });
            }
            navigateTo(t) {
              this._service.open(
                St.from(t ? (t.day ? t : { ...t, day: 1 }) : null),
              );
            }
            ngAfterViewInit() {
              this._ngZone.runOutsideAngular(() => {
                const t = Lt(this._contentEl.nativeElement, "focusin"),
                  r = Lt(this._contentEl.nativeElement, "focusout"),
                  { nativeElement: i } = this._elementRef;
                vm(t, r)
                  .pipe(
                    wt(
                      ({ target: o, relatedTarget: s }) =>
                        !(
                          jw(o, "ngb-dp-day") &&
                          jw(s, "ngb-dp-day") &&
                          i.contains(o) &&
                          i.contains(s)
                        ),
                    ),
                    rt(this._destroyed$),
                  )
                  .subscribe(({ type: o }) =>
                    this._ngZone.run(() =>
                      this._service.set({ focusVisible: "focusin" === o }),
                    ),
                  );
              });
            }
            ngOnDestroy() {
              this._destroyed$.next();
            }
            ngOnInit() {
              if (void 0 === this.model) {
                const t = {};
                [
                  "dayTemplateData",
                  "displayMonths",
                  "markDisabled",
                  "firstDayOfWeek",
                  "navigation",
                  "minDate",
                  "maxDate",
                  "outsideDays",
                  "weekdays",
                ].forEach((r) => (t[r] = this[r])),
                  this._service.set(t),
                  this.navigateTo(this.startDate);
              }
              this.dayTemplate || (this.dayTemplate = this._defaultDayTemplate);
            }
            ngOnChanges(t) {
              const r = {};
              if (
                ([
                  "dayTemplateData",
                  "displayMonths",
                  "markDisabled",
                  "firstDayOfWeek",
                  "navigation",
                  "minDate",
                  "maxDate",
                  "outsideDays",
                  "weekdays",
                ]
                  .filter((i) => i in t)
                  .forEach((i) => (r[i] = this[i])),
                this._service.set(r),
                "startDate" in t)
              ) {
                const { currentValue: i, previousValue: o } = t.startDate;
                rE(o, i) && this.navigateTo(this.startDate);
              }
            }
            onDateSelect(t) {
              this._service.focus(t),
                this._service.select(t, { emitEvent: !0 });
            }
            onNavigateDateSelect(t) {
              this._service.open(t);
            }
            onNavigateEvent(t) {
              switch (t) {
                case ds.PREV:
                  this._service.open(
                    this._calendar.getPrev(this.model.firstDate, "m", 1),
                  );
                  break;
                case ds.NEXT:
                  this._service.open(
                    this._calendar.getNext(this.model.firstDate, "m", 1),
                  );
              }
            }
            registerOnChange(t) {
              this.onChange = t;
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._service.set({ disabled: t });
            }
            writeValue(t) {
              (this._controlValue = St.from(this._ngbDateAdapter.fromModel(t))),
                this._service.select(this._controlValue);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(
                g(Fg),
                g(ku),
                g(Vi),
                g(kg),
                g(cn),
                g(_e),
                g(Lg),
                g(ve),
              );
            }),
            (e.ɵcmp = Le({
              type: e,
              selectors: [["ngb-datepicker"]],
              contentQueries: function (t, r, i) {
                if ((1 & t && Be(i, oE, 7), 2 & t)) {
                  let o;
                  ye((o = be())) && (r.contentTemplateFromContent = o.first);
                }
              },
              viewQuery: function (t, r) {
                if ((1 & t && (Ei(nj, 7), Ei(rj, 7)), 2 & t)) {
                  let i;
                  ye((i = be())) && (r._defaultDayTemplate = i.first),
                    ye((i = be())) && (r._contentEl = i.first);
                }
              },
              hostVars: 2,
              hostBindings: function (t, r) {
                2 & t && Q("disabled", r.model.disabled);
              },
              inputs: {
                contentTemplate: "contentTemplate",
                dayTemplate: "dayTemplate",
                dayTemplateData: "dayTemplateData",
                displayMonths: "displayMonths",
                firstDayOfWeek: "firstDayOfWeek",
                footerTemplate: "footerTemplate",
                markDisabled: "markDisabled",
                maxDate: "maxDate",
                minDate: "minDate",
                navigation: "navigation",
                outsideDays: "outsideDays",
                showWeekNumbers: "showWeekNumbers",
                startDate: "startDate",
                weekdays: "weekdays",
              },
              outputs: { navigate: "navigate", dateSelect: "dateSelect" },
              exportAs: ["ngbDatepicker"],
              standalone: !0,
              features: [
                Ie([{ provide: fn, useExisting: ee(() => e), multi: !0 }, Fg]),
                Xe,
                Dt,
              ],
              decls: 10,
              vars: 9,
              consts: [
                ["defaultDayTemplate", ""],
                ["defaultContentTemplate", ""],
                [1, "ngb-dp-header"],
                [
                  3,
                  "date",
                  "months",
                  "disabled",
                  "showSelect",
                  "prevDisabled",
                  "nextDisabled",
                  "selectBoxes",
                  "navigate",
                  "select",
                  4,
                  "ngIf",
                ],
                [1, "ngb-dp-content"],
                ["content", ""],
                [
                  3,
                  "ngTemplateOutlet",
                  "ngTemplateOutletContext",
                  "ngTemplateOutletInjector",
                ],
                [3, "ngTemplateOutlet"],
                [
                  "ngbDatepickerDayView",
                  "",
                  3,
                  "date",
                  "currentMonth",
                  "selected",
                  "disabled",
                  "focused",
                ],
                ["class", "ngb-dp-month", 4, "ngFor", "ngForOf"],
                [1, "ngb-dp-month"],
                ["class", "ngb-dp-month-name", 4, "ngIf"],
                [3, "month"],
                [1, "ngb-dp-month-name"],
                [
                  3,
                  "date",
                  "months",
                  "disabled",
                  "showSelect",
                  "prevDisabled",
                  "nextDisabled",
                  "selectBoxes",
                  "navigate",
                  "select",
                ],
              ],
              template: function (t, r) {
                if (
                  (1 & t &&
                    (R(0, ij, 1, 5, "ng-template", null, 0, Ft),
                    R(2, aj, 1, 1, "ng-template", null, 1, Ft),
                    M(4, "div", 2),
                    R(5, lj, 1, 7, "ngb-datepicker-navigation", 3),
                    I(),
                    M(6, "div", 4, 5),
                    R(8, cj, 0, 0, "ng-template", 6),
                    I(),
                    R(9, uj, 0, 0, "ng-template", 7)),
                  2 & t)
                ) {
                  const i = Pt(3);
                  N(5),
                    T("ngIf", "none" !== r.navigation),
                    N(1),
                    Q("ngb-dp-months", !r.contentTemplate),
                    N(2),
                    T(
                      "ngTemplateOutlet",
                      r.contentTemplate ||
                        (null == r.contentTemplateFromContent
                          ? null
                          : r.contentTemplateFromContent.templateRef) ||
                        i,
                    )("ngTemplateOutletContext", ua(7, Vw, r))(
                      "ngTemplateOutletInjector",
                      r.injector,
                    ),
                    N(1),
                    T("ngTemplateOutlet", r.footerTemplate);
                }
              },
              dependencies: [dn, Bn, xr, J$, Vg, K$],
              styles: [
                "ngb-datepicker{border:1px solid var(--bs-border-color);border-radius:.25rem;display:inline-block}ngb-datepicker-month{pointer-events:auto}ngb-datepicker.dropdown-menu{padding:0}ngb-datepicker.disabled .ngb-dp-weekday,ngb-datepicker.disabled .ngb-dp-week-number,ngb-datepicker.disabled .ngb-dp-month-name{color:var(--bs-text-muted)}.ngb-dp-body{z-index:1055}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem;background-color:var(--bs-light)}.ngb-dp-months{display:flex}.ngb-dp-month{pointer-events:none}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center;background-color:var(--bs-light)}.ngb-dp-month+.ngb-dp-month .ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month .ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month .ngb-dp-week:last-child{padding-bottom:.25rem}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            e
          );
        })();
      typeof navigator < "u" &&
        navigator.userAgent &&
        (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
          (/Macintosh/.test(navigator.userAgent) &&
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2) ||
          /Android/.test(navigator.userAgent));
      const lE = [
        "a[href]",
        "button:not([disabled])",
        'input:not([disabled]):not([type="hidden"])',
        "select:not([disabled])",
        "textarea:not([disabled])",
        "[contenteditable]",
        '[tabindex]:not([tabindex="-1"])',
      ].join(", ");
      function cE(e) {
        const n = Array.from(e.querySelectorAll(lE)).filter(
          (t) => -1 !== t.tabIndex,
        );
        return [n[0], n[n.length - 1]];
      }
      new Date(1882, 10, 12), new Date(2174, 10, 25);
      let CE = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ imports: [Lu, Vg] })),
            e
          );
        })(),
        SE = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({})),
            e
          );
        })();
      class ji {
        constructor(n, t, r) {
          (this.nodes = n), (this.viewRef = t), (this.componentRef = r);
        }
      }
      let SU = (() => {
        class e {
          constructor(t, r) {
            (this._el = t), (this._zone = r);
          }
          ngOnInit() {
            this._zone.onStable
              .asObservable()
              .pipe(gt(1))
              .subscribe(() => {
                Et(
                  this._zone,
                  this._el.nativeElement,
                  (t, r) => {
                    r && cs(t), t.classList.add("show");
                  },
                  { animation: this.animation, runningTransition: "continue" },
                );
              });
          }
          hide() {
            return Et(
              this._zone,
              this._el.nativeElement,
              ({ classList: t }) => t.remove("show"),
              { animation: this.animation, runningTransition: "stop" },
            );
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(g(_e), g(ve));
          }),
          (e.ɵcmp = Le({
            type: e,
            selectors: [["ngb-modal-backdrop"]],
            hostAttrs: [2, "z-index", "1055"],
            hostVars: 6,
            hostBindings: function (t, r) {
              2 & t &&
                (Jr(
                  "modal-backdrop" +
                    (r.backdropClass ? " " + r.backdropClass : ""),
                ),
                Q("show", !r.animation)("fade", r.animation));
            },
            inputs: { animation: "animation", backdropClass: "backdropClass" },
            standalone: !0,
            features: [Dt],
            decls: 0,
            vars: 0,
            template: function (t, r) {},
            encapsulation: 2,
          })),
          e
        );
      })();
      class TE {
        update(n) {}
        close(n) {}
        dismiss(n) {}
      }
      const TU = [
          "animation",
          "ariaLabelledBy",
          "ariaDescribedBy",
          "backdrop",
          "centered",
          "fullscreen",
          "keyboard",
          "scrollable",
          "size",
          "windowClass",
          "modalDialogClass",
        ],
        MU = ["animation", "backdropClass"];
      class NU {
        constructor(n, t, r, i) {
          (this._windowCmptRef = n),
            (this._contentRef = t),
            (this._backdropCmptRef = r),
            (this._beforeDismiss = i),
            (this._closed = new Me()),
            (this._dismissed = new Me()),
            (this._hidden = new Me()),
            n.instance.dismissEvent.subscribe((o) => {
              this.dismiss(o);
            }),
            (this.result = new Promise((o, s) => {
              (this._resolve = o), (this._reject = s);
            })),
            this.result.then(null, () => {});
        }
        _applyWindowOptions(n, t) {
          TU.forEach((r) => {
            xi(t[r]) && (n[r] = t[r]);
          });
        }
        _applyBackdropOptions(n, t) {
          MU.forEach((r) => {
            xi(t[r]) && (n[r] = t[r]);
          });
        }
        update(n) {
          this._applyWindowOptions(this._windowCmptRef.instance, n),
            this._backdropCmptRef &&
              this._backdropCmptRef.instance &&
              this._applyBackdropOptions(this._backdropCmptRef.instance, n);
        }
        get componentInstance() {
          if (this._contentRef && this._contentRef.componentRef)
            return this._contentRef.componentRef.instance;
        }
        get closed() {
          return this._closed.asObservable().pipe(rt(this._hidden));
        }
        get dismissed() {
          return this._dismissed.asObservable().pipe(rt(this._hidden));
        }
        get hidden() {
          return this._hidden.asObservable();
        }
        get shown() {
          return this._windowCmptRef.instance.shown.asObservable();
        }
        close(n) {
          this._windowCmptRef &&
            (this._closed.next(n),
            this._resolve(n),
            this._removeModalElements());
        }
        _dismiss(n) {
          this._dismissed.next(n), this._reject(n), this._removeModalElements();
        }
        dismiss(n) {
          if (this._windowCmptRef)
            if (this._beforeDismiss) {
              const t = this._beforeDismiss();
              !(function Hw(e) {
                return e && e.then;
              })(t)
                ? !1 !== t && this._dismiss(n)
                : t.then(
                    (r) => {
                      !1 !== r && this._dismiss(n);
                    },
                    () => {},
                  );
            } else this._dismiss(n);
        }
        _removeModalElements() {
          const n = this._windowCmptRef.instance.hide(),
            t = this._backdropCmptRef
              ? this._backdropCmptRef.instance.hide()
              : z(void 0);
          n.subscribe(() => {
            const { nativeElement: r } = this._windowCmptRef.location;
            r.parentNode.removeChild(r),
              this._windowCmptRef.destroy(),
              this._contentRef &&
                this._contentRef.viewRef &&
                this._contentRef.viewRef.destroy(),
              (this._windowCmptRef = null),
              (this._contentRef = null);
          }),
            t.subscribe(() => {
              if (this._backdropCmptRef) {
                const { nativeElement: r } = this._backdropCmptRef.location;
                r.parentNode.removeChild(r),
                  this._backdropCmptRef.destroy(),
                  (this._backdropCmptRef = null);
              }
            }),
            _u(n, t).subscribe(() => {
              this._hidden.next(), this._hidden.complete();
            });
        }
      }
      var tl = (() => {
        return (
          ((e = tl || (tl = {}))[(e.BACKDROP_CLICK = 0)] = "BACKDROP_CLICK"),
          (e[(e.ESC = 1)] = "ESC"),
          tl
        );
        var e;
      })();
      let IU = (() => {
          class e {
            constructor(t, r, i) {
              (this._document = t),
                (this._elRef = r),
                (this._zone = i),
                (this._closed$ = new Me()),
                (this._elWithFocus = null),
                (this.backdrop = !0),
                (this.keyboard = !0),
                (this.dismissEvent = new U()),
                (this.shown = new Me()),
                (this.hidden = new Me());
            }
            get fullscreenClass() {
              return !0 === this.fullscreen
                ? " modal-fullscreen"
                : as(this.fullscreen)
                  ? ` modal-fullscreen-${this.fullscreen}-down`
                  : "";
            }
            dismiss(t) {
              this.dismissEvent.emit(t);
            }
            ngOnInit() {
              (this._elWithFocus = this._document.activeElement),
                this._zone.onStable
                  .asObservable()
                  .pipe(gt(1))
                  .subscribe(() => {
                    this._show();
                  });
            }
            ngOnDestroy() {
              this._disableEventHandling();
            }
            hide() {
              const { nativeElement: t } = this._elRef,
                r = { animation: this.animation, runningTransition: "stop" },
                s = _u(
                  Et(this._zone, t, () => t.classList.remove("show"), r),
                  Et(this._zone, this._dialogEl.nativeElement, () => {}, r),
                );
              return (
                s.subscribe(() => {
                  this.hidden.next(), this.hidden.complete();
                }),
                this._disableEventHandling(),
                this._restoreFocus(),
                s
              );
            }
            _show() {
              const t = {
                animation: this.animation,
                runningTransition: "continue",
              };
              _u(
                Et(
                  this._zone,
                  this._elRef.nativeElement,
                  (o, s) => {
                    s && cs(o), o.classList.add("show");
                  },
                  t,
                ),
                Et(this._zone, this._dialogEl.nativeElement, () => {}, t),
              ).subscribe(() => {
                this.shown.next(), this.shown.complete();
              }),
                this._enableEventHandling(),
                this._setFocus();
            }
            _enableEventHandling() {
              const { nativeElement: t } = this._elRef;
              this._zone.runOutsideAngular(() => {
                Lt(t, "keydown")
                  .pipe(
                    rt(this._closed$),
                    wt((i) => i.which === he.Escape),
                  )
                  .subscribe((i) => {
                    this.keyboard
                      ? requestAnimationFrame(() => {
                          i.defaultPrevented ||
                            this._zone.run(() => this.dismiss(tl.ESC));
                        })
                      : "static" === this.backdrop && this._bumpBackdrop();
                  });
                let r = !1;
                Lt(this._dialogEl.nativeElement, "mousedown")
                  .pipe(
                    rt(this._closed$),
                    It(() => (r = !1)),
                    Hn(() => Lt(t, "mouseup").pipe(rt(this._closed$), gt(1))),
                    wt(({ target: i }) => t === i),
                  )
                  .subscribe(() => {
                    r = !0;
                  }),
                  Lt(t, "click")
                    .pipe(rt(this._closed$))
                    .subscribe(({ target: i }) => {
                      t === i &&
                        ("static" === this.backdrop
                          ? this._bumpBackdrop()
                          : !0 === this.backdrop &&
                            !r &&
                            this._zone.run(() =>
                              this.dismiss(tl.BACKDROP_CLICK),
                            )),
                        (r = !1);
                    });
              });
            }
            _disableEventHandling() {
              this._closed$.next();
            }
            _setFocus() {
              const { nativeElement: t } = this._elRef;
              if (!t.contains(document.activeElement)) {
                const r = t.querySelector("[ngbAutofocus]"),
                  i = cE(t)[0];
                (r || i || t).focus();
              }
            }
            _restoreFocus() {
              const t = this._document.body,
                r = this._elWithFocus;
              let i;
              (i = r && r.focus && t.contains(r) ? r : t),
                this._zone.runOutsideAngular(() => {
                  setTimeout(() => i.focus()), (this._elWithFocus = null);
                });
            }
            _bumpBackdrop() {
              "static" === this.backdrop &&
                Et(
                  this._zone,
                  this._elRef.nativeElement,
                  ({ classList: t }) => (
                    t.add("modal-static"), () => t.remove("modal-static")
                  ),
                  { animation: this.animation, runningTransition: "continue" },
                );
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(nt), g(_e), g(ve));
            }),
            (e.ɵcmp = Le({
              type: e,
              selectors: [["ngb-modal-window"]],
              viewQuery: function (t, r) {
                if ((1 & t && Ei(dj, 7), 2 & t)) {
                  let i;
                  ye((i = be())) && (r._dialogEl = i.first);
                }
              },
              hostAttrs: ["role", "dialog", "tabindex", "-1"],
              hostVars: 7,
              hostBindings: function (t, r) {
                2 & t &&
                  (de("aria-modal", !0)("aria-labelledby", r.ariaLabelledBy)(
                    "aria-describedby",
                    r.ariaDescribedBy,
                  ),
                  Jr(
                    "modal d-block" +
                      (r.windowClass ? " " + r.windowClass : ""),
                  ),
                  Q("fade", r.animation));
              },
              inputs: {
                animation: "animation",
                ariaLabelledBy: "ariaLabelledBy",
                ariaDescribedBy: "ariaDescribedBy",
                backdrop: "backdrop",
                centered: "centered",
                fullscreen: "fullscreen",
                keyboard: "keyboard",
                scrollable: "scrollable",
                size: "size",
                windowClass: "windowClass",
                modalDialogClass: "modalDialogClass",
              },
              outputs: { dismissEvent: "dismiss" },
              standalone: !0,
              features: [Dt],
              ngContentSelectors: Au,
              decls: 4,
              vars: 2,
              consts: [
                ["role", "document"],
                ["dialog", ""],
                [1, "modal-content"],
              ],
              template: function (t, r) {
                1 & t && (ta(), M(0, "div", 0, 1)(2, "div", 2), na(3), I()()),
                  2 & t &&
                    Jr(
                      "modal-dialog" +
                        (r.size ? " modal-" + r.size : "") +
                        (r.centered ? " modal-dialog-centered" : "") +
                        r.fullscreenClass +
                        (r.scrollable ? " modal-dialog-scrollable" : "") +
                        (r.modalDialogClass ? " " + r.modalDialogClass : ""),
                    );
              },
              styles: [
                "ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}\n",
              ],
              encapsulation: 2,
            })),
            e
          );
        })(),
        OU = (() => {
          class e {
            constructor(t) {
              this._document = t;
            }
            hide() {
              const t = Math.abs(
                  window.innerWidth -
                    this._document.documentElement.clientWidth,
                ),
                r = this._document.body,
                i = r.style,
                { overflow: o, paddingRight: s } = i;
              if (t > 0) {
                const a = parseFloat(window.getComputedStyle(r).paddingRight);
                i.paddingRight = `${a + t}px`;
              }
              return (
                (i.overflow = "hidden"),
                () => {
                  t > 0 && (i.paddingRight = s), (i.overflow = o);
                }
              );
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k(nt));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        AU = (() => {
          class e {
            constructor(t, r, i, o, s, a, l) {
              (this._applicationRef = t),
                (this._injector = r),
                (this._environmentInjector = i),
                (this._document = o),
                (this._scrollBar = s),
                (this._rendererFactory = a),
                (this._ngZone = l),
                (this._activeWindowCmptHasChanged = new Me()),
                (this._ariaHiddenValues = new Map()),
                (this._scrollBarRestoreFn = null),
                (this._modalRefs = []),
                (this._windowCmpts = []),
                (this._activeInstances = new U()),
                this._activeWindowCmptHasChanged.subscribe(() => {
                  if (this._windowCmpts.length) {
                    const c = this._windowCmpts[this._windowCmpts.length - 1];
                    ((e, n, t, r = !1) => {
                      e.runOutsideAngular(() => {
                        const i = Lt(n, "focusin").pipe(
                          rt(t),
                          Y((o) => o.target),
                        );
                        Lt(n, "keydown")
                          .pipe(
                            rt(t),
                            wt((o) => o.which === he.Tab),
                            Jp(i),
                          )
                          .subscribe(([o, s]) => {
                            const [a, l] = cE(n);
                            (s === a || s === n) &&
                              o.shiftKey &&
                              (l.focus(), o.preventDefault()),
                              s === l &&
                                !o.shiftKey &&
                                (a.focus(), o.preventDefault());
                          }),
                          r &&
                            Lt(n, "click")
                              .pipe(
                                rt(t),
                                Jp(i),
                                Y((o) => o[1]),
                              )
                              .subscribe((o) => o.focus());
                      });
                    })(
                      this._ngZone,
                      c.location.nativeElement,
                      this._activeWindowCmptHasChanged,
                    ),
                      this._revertAriaHidden(),
                      this._setAriaHidden(c.location.nativeElement);
                  }
                });
            }
            _restoreScrollBar() {
              const t = this._scrollBarRestoreFn;
              t && ((this._scrollBarRestoreFn = null), t());
            }
            _hideScrollBar() {
              this._scrollBarRestoreFn ||
                (this._scrollBarRestoreFn = this._scrollBar.hide());
            }
            open(t, r, i) {
              const o =
                  i.container instanceof HTMLElement
                    ? i.container
                    : xi(i.container)
                      ? this._document.querySelector(i.container)
                      : this._document.body,
                s = this._rendererFactory.createRenderer(null, null);
              if (!o)
                throw new Error(
                  `The specified modal container "${i.container || "body"}" was not found in the DOM.`,
                );
              this._hideScrollBar();
              const a = new TE(),
                l =
                  (t = i.injector || t).get(xn, null) ||
                  this._environmentInjector,
                c = this._getContentRef(t, l, r, a, i);
              let u = !1 !== i.backdrop ? this._attachBackdrop(o) : void 0,
                d = this._attachWindowComponent(o, c.nodes),
                f = new NU(d, c, u, i.beforeDismiss);
              return (
                this._registerModalRef(f),
                this._registerWindowCmpt(d),
                f.hidden.pipe(gt(1)).subscribe(() =>
                  Promise.resolve(!0).then(() => {
                    this._modalRefs.length ||
                      (s.removeClass(this._document.body, "modal-open"),
                      this._restoreScrollBar(),
                      this._revertAriaHidden());
                  }),
                ),
                (a.close = (h) => {
                  f.close(h);
                }),
                (a.dismiss = (h) => {
                  f.dismiss(h);
                }),
                (a.update = (h) => {
                  f.update(h);
                }),
                f.update(i),
                1 === this._modalRefs.length &&
                  s.addClass(this._document.body, "modal-open"),
                u && u.instance && u.changeDetectorRef.detectChanges(),
                d.changeDetectorRef.detectChanges(),
                f
              );
            }
            get activeInstances() {
              return this._activeInstances;
            }
            dismissAll(t) {
              this._modalRefs.forEach((r) => r.dismiss(t));
            }
            hasOpenModals() {
              return this._modalRefs.length > 0;
            }
            _attachBackdrop(t) {
              let r = Hh(SU, {
                environmentInjector: this._applicationRef.injector,
                elementInjector: this._injector,
              });
              return (
                this._applicationRef.attachView(r.hostView),
                t.appendChild(r.location.nativeElement),
                r
              );
            }
            _attachWindowComponent(t, r) {
              let i = Hh(IU, {
                environmentInjector: this._applicationRef.injector,
                elementInjector: this._injector,
                projectableNodes: r,
              });
              return (
                this._applicationRef.attachView(i.hostView),
                t.appendChild(i.location.nativeElement),
                i
              );
            }
            _getContentRef(t, r, i, o, s) {
              return i
                ? i instanceof Ve
                  ? this._createFromTemplateRef(i, o)
                  : as(i)
                    ? this._createFromString(i)
                    : this._createFromComponent(t, r, i, o, s)
                : new ji([]);
            }
            _createFromTemplateRef(t, r) {
              const o = t.createEmbeddedView({
                $implicit: r,
                close(s) {
                  r.close(s);
                },
                dismiss(s) {
                  r.dismiss(s);
                },
              });
              return (
                this._applicationRef.attachView(o), new ji([o.rootNodes], o)
              );
            }
            _createFromString(t) {
              const r = this._document.createTextNode(`${t}`);
              return new ji([[r]]);
            }
            _createFromComponent(t, r, i, o, s) {
              const l = Hh(i, {
                  environmentInjector: r,
                  elementInjector: ln.create({
                    providers: [{ provide: TE, useValue: o }],
                    parent: t,
                  }),
                }),
                c = l.location.nativeElement;
              return (
                s.scrollable && c.classList.add("component-host-scrollable"),
                this._applicationRef.attachView(l.hostView),
                new ji([[c]], l.hostView, l)
              );
            }
            _setAriaHidden(t) {
              const r = t.parentElement;
              r &&
                t !== this._document.body &&
                (Array.from(r.children).forEach((i) => {
                  i !== t &&
                    "SCRIPT" !== i.nodeName &&
                    (this._ariaHiddenValues.set(
                      i,
                      i.getAttribute("aria-hidden"),
                    ),
                    i.setAttribute("aria-hidden", "true"));
                }),
                this._setAriaHidden(r));
            }
            _revertAriaHidden() {
              this._ariaHiddenValues.forEach((t, r) => {
                t
                  ? r.setAttribute("aria-hidden", t)
                  : r.removeAttribute("aria-hidden");
              }),
                this._ariaHiddenValues.clear();
            }
            _registerModalRef(t) {
              const r = () => {
                const i = this._modalRefs.indexOf(t);
                i > -1 &&
                  (this._modalRefs.splice(i, 1),
                  this._activeInstances.emit(this._modalRefs));
              };
              this._modalRefs.push(t),
                this._activeInstances.emit(this._modalRefs),
                t.result.then(r, r);
            }
            _registerWindowCmpt(t) {
              this._windowCmpts.push(t),
                this._activeWindowCmptHasChanged.next(),
                t.onDestroy(() => {
                  const r = this._windowCmpts.indexOf(t);
                  r > -1 &&
                    (this._windowCmpts.splice(r, 1),
                    this._activeWindowCmptHasChanged.next());
                });
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(
                k(Go),
                k(ln),
                k(xn),
                k(nt),
                k(OU),
                k(Of),
                k(ve),
              );
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        RU = (() => {
          class e {
            constructor(t) {
              (this._ngbConfig = t),
                (this.backdrop = !0),
                (this.fullscreen = !1),
                (this.keyboard = !0);
            }
            get animation() {
              return void 0 === this._animation
                ? this._ngbConfig.animation
                : this._animation;
            }
            set animation(t) {
              this._animation = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k(Fi));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        ME = (() => {
          class e {
            constructor(t, r, i) {
              (this._injector = t), (this._modalStack = r), (this._config = i);
            }
            open(t, r = {}) {
              const i = {
                ...this._config,
                animation: this._config.animation,
                ...r,
              };
              return this._modalStack.open(this._injector, t, i);
            }
            get activeInstances() {
              return this._modalStack.activeInstances;
            }
            dismissAll(t) {
              this._modalStack.dismissAll(t);
            }
            hasOpenModals() {
              return this._modalStack.hasOpenModals();
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k(ln), k(AU), k(RU));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        NE = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ providers: [ME] })),
            e
          );
        })(),
        PU = (() => {
          class e {
            constructor(t) {
              (this._ngbConfig = t),
                (this.destroyOnHide = !0),
                (this.orientation = "horizontal"),
                (this.roles = "tablist"),
                (this.keyboard = !1);
            }
            get animation() {
              return void 0 === this._animation
                ? this._ngbConfig.animation
                : this._animation;
            }
            set animation(t) {
              this._animation = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k(Fi));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      const IE = (e) => xi(e) && "" !== e;
      let xU = 0,
        $g = (() => {
          class e {
            constructor(t) {
              this.templateRef = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Ve));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["ng-template", "ngbNavContent", ""]],
              standalone: !0,
            })),
            e
          );
        })(),
        OE = (() => {
          class e {
            constructor(t, r) {
              (this.role = t), (this.nav = r);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(Wr("role"), g(ee(() => $i)));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["", "ngbNavItem", "", 5, "ng-container"]],
              hostVars: 1,
              hostBindings: function (t, r) {
                2 & t &&
                  de(
                    "role",
                    r.role ? r.role : r.nav.roles ? "presentation" : void 0,
                  );
              },
              standalone: !0,
            })),
            e
          );
        })(),
        hs = (() => {
          class e {
            constructor(t, r) {
              (this._nav = t),
                (this.elementRef = r),
                (this.disabled = !1),
                (this.shown = new U()),
                (this.hidden = new U());
            }
            ngAfterContentChecked() {
              this.contentTpl = this.contentTpls.first;
            }
            ngOnInit() {
              xi(this.domId) || (this.domId = "ngb-nav-" + xU++);
            }
            get active() {
              return this._nav.activeId === this.id;
            }
            get id() {
              return IE(this._id) ? this._id : this.domId;
            }
            get panelDomId() {
              return `${this.domId}-panel`;
            }
            isPanelInDom() {
              return (
                (xi(this.destroyOnHide)
                  ? !this.destroyOnHide
                  : !this._nav.destroyOnHide) || this.active
              );
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(ee(() => $i)), g(_e));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["", "ngbNavItem", ""]],
              contentQueries: function (t, r, i) {
                if ((1 & t && Be(i, $g, 4), 2 & t)) {
                  let o;
                  ye((o = be())) && (r.contentTpls = o);
                }
              },
              hostVars: 2,
              hostBindings: function (t, r) {
                2 & t && Q("nav-item", !0);
              },
              inputs: {
                destroyOnHide: "destroyOnHide",
                disabled: "disabled",
                domId: "domId",
                _id: ["ngbNavItem", "_id"],
              },
              outputs: { shown: "shown", hidden: "hidden" },
              exportAs: ["ngbNavItem"],
              standalone: !0,
            })),
            e
          );
        })(),
        $i = (() => {
          class e {
            constructor(t, r, i, o) {
              (this.role = t),
                (this._cd = i),
                (this._document = o),
                (this.activeIdChange = new U()),
                (this.shown = new U()),
                (this.hidden = new U()),
                (this.destroy$ = new Me()),
                (this.navItemChange$ = new Me()),
                (this.navChange = new U()),
                (this.animation = r.animation),
                (this.destroyOnHide = r.destroyOnHide),
                (this.orientation = r.orientation),
                (this.roles = r.roles),
                (this.keyboard = r.keyboard);
            }
            click(t) {
              t.disabled || this._updateActiveId(t.id);
            }
            onKeyDown(t) {
              if ("tablist" !== this.roles || !this.keyboard) return;
              const r = t.which,
                i = this.links.filter((a) => !a.navItem.disabled),
                { length: o } = i;
              let s = -1;
              if (
                (i.forEach((a, l) => {
                  a.elRef.nativeElement === this._document.activeElement &&
                    (s = l);
                }),
                o)
              ) {
                switch (r) {
                  case he.ArrowLeft:
                    if ("vertical" === this.orientation) return;
                    s = (s - 1 + o) % o;
                    break;
                  case he.ArrowRight:
                    if ("vertical" === this.orientation) return;
                    s = (s + 1) % o;
                    break;
                  case he.ArrowDown:
                    if ("horizontal" === this.orientation) return;
                    s = (s + 1) % o;
                    break;
                  case he.ArrowUp:
                    if ("horizontal" === this.orientation) return;
                    s = (s - 1 + o) % o;
                    break;
                  case he.Home:
                    s = 0;
                    break;
                  case he.End:
                    s = o - 1;
                }
                "changeWithArrows" === this.keyboard &&
                  this.select(i[s].navItem.id),
                  i[s].elRef.nativeElement.focus(),
                  t.preventDefault();
              }
            }
            select(t) {
              this._updateActiveId(t, !1);
            }
            ngAfterContentInit() {
              if (!xi(this.activeId)) {
                const t = this.items.first ? this.items.first.id : null;
                IE(t) &&
                  (this._updateActiveId(t, !1), this._cd.detectChanges());
              }
              this.items.changes
                .pipe(rt(this.destroy$))
                .subscribe(() => this._notifyItemChanged(this.activeId));
            }
            ngOnChanges({ activeId: t }) {
              t && !t.firstChange && this._notifyItemChanged(t.currentValue);
            }
            ngOnDestroy() {
              this.destroy$.next();
            }
            _updateActiveId(t, r = !0) {
              if (this.activeId !== t) {
                let i = !1;
                r &&
                  this.navChange.emit({
                    activeId: this.activeId,
                    nextId: t,
                    preventDefault: () => {
                      i = !0;
                    },
                  }),
                  i ||
                    ((this.activeId = t),
                    this.activeIdChange.emit(t),
                    this._notifyItemChanged(t));
              }
            }
            _notifyItemChanged(t) {
              this.navItemChange$.next(this._getItemById(t));
            }
            _getItemById(t) {
              return (this.items && this.items.find((r) => r.id === t)) || null;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(Wr("role"), g(PU), g(cn), g(nt));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["", "ngbNav", ""]],
              contentQueries: function (t, r, i) {
                if ((1 & t && (Be(i, hs, 4), Be(i, nl, 5)), 2 & t)) {
                  let o;
                  ye((o = be())) && (r.items = o),
                    ye((o = be())) && (r.links = o);
                }
              },
              hostVars: 6,
              hostBindings: function (t, r) {
                1 & t &&
                  G("keydown.arrowLeft", function (o) {
                    return r.onKeyDown(o);
                  })("keydown.arrowRight", function (o) {
                    return r.onKeyDown(o);
                  })("keydown.arrowDown", function (o) {
                    return r.onKeyDown(o);
                  })("keydown.arrowUp", function (o) {
                    return r.onKeyDown(o);
                  })("keydown.Home", function (o) {
                    return r.onKeyDown(o);
                  })("keydown.End", function (o) {
                    return r.onKeyDown(o);
                  }),
                  2 & t &&
                    (de(
                      "aria-orientation",
                      "vertical" === r.orientation && "tablist" === r.roles
                        ? "vertical"
                        : void 0,
                    )("role", r.role ? r.role : r.roles ? "tablist" : void 0),
                    Q("nav", !0)("flex-column", "vertical" === r.orientation));
              },
              inputs: {
                activeId: "activeId",
                animation: "animation",
                destroyOnHide: "destroyOnHide",
                orientation: "orientation",
                roles: "roles",
                keyboard: "keyboard",
              },
              outputs: {
                activeIdChange: "activeIdChange",
                shown: "shown",
                hidden: "hidden",
                navChange: "navChange",
              },
              exportAs: ["ngbNav"],
              standalone: !0,
              features: [Xe],
            })),
            e
          );
        })(),
        nl = (() => {
          class e {
            constructor(t, r, i, o) {
              (this.role = t),
                (this.navItem = r),
                (this.nav = i),
                (this.elRef = o);
            }
            hasNavItemClass() {
              return (
                this.navItem.elementRef.nativeElement.nodeType ===
                Node.COMMENT_NODE
              );
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(Wr("role"), g(hs), g($i), g(_e));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["", "ngbNavLink", ""]],
              hostVars: 14,
              hostBindings: function (t, r) {
                2 & t &&
                  (Dn("id", r.navItem.domId),
                  de("role", r.role ? r.role : r.nav.roles ? "tab" : void 0)(
                    "tabindex",
                    r.navItem.disabled ? -1 : void 0,
                  )(
                    "aria-controls",
                    r.navItem.isPanelInDom() ? r.navItem.panelDomId : null,
                  )("aria-selected", r.navItem.active)(
                    "aria-disabled",
                    r.navItem.disabled,
                  ),
                  Q("nav-link", !0)("nav-item", r.hasNavItemClass())(
                    "active",
                    r.navItem.active,
                  )("disabled", r.navItem.disabled));
              },
              standalone: !0,
            })),
            e
          );
        })(),
        AE = (() => {
          class e {
            constructor(t, r) {
              (this.navItem = t), (this.nav = r);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(hs), g($i));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["button", "ngbNavLink", ""]],
              hostAttrs: ["type", "button"],
              hostVars: 1,
              hostBindings: function (t, r) {
                1 & t &&
                  G("click", function () {
                    return r.nav.click(r.navItem);
                  }),
                  2 & t && Dn("disabled", r.navItem.disabled);
              },
              standalone: !0,
              features: [Qs([nl])],
            })),
            e
          );
        })();
      const kU = ({ classList: e }) => (
          e.remove("show"), () => e.remove("active")
        ),
        LU = (e, n) => {
          n && cs(e), e.classList.add("show");
        };
      let Ug = (() => {
          class e {
            constructor(t) {
              this.elRef = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(_e));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["", "ngbNavPane", ""]],
              hostAttrs: [1, "tab-pane"],
              hostVars: 5,
              hostBindings: function (t, r) {
                2 & t &&
                  (Dn("id", r.item.panelDomId),
                  de(
                    "role",
                    r.role ? r.role : r.nav.roles ? "tabpanel" : void 0,
                  )("aria-labelledby", r.item.domId),
                  Q("fade", r.nav.animation));
              },
              inputs: { item: "item", nav: "nav", role: "role" },
              standalone: !0,
            })),
            e
          );
        })(),
        Gg = (() => {
          class e {
            constructor(t, r) {
              (this._cd = t), (this._ngZone = r), (this._activePane = null);
            }
            isPanelTransitioning(t) {
              return this._activePane?.item === t;
            }
            ngAfterViewInit() {
              this._updateActivePane(),
                this.nav.navItemChange$
                  .pipe(
                    rt(this.nav.destroy$),
                    Yc(this._activePane?.item || null),
                    Yp(),
                    (function _V(e) {
                      return wt((n, t) => e <= t);
                    })(1),
                  )
                  .subscribe((t) => {
                    const r = {
                      animation: this.nav.animation,
                      runningTransition: "stop",
                    };
                    this._cd.detectChanges(),
                      this._activePane
                        ? Et(
                            this._ngZone,
                            this._activePane.elRef.nativeElement,
                            kU,
                            r,
                          ).subscribe(() => {
                            const i = this._activePane?.item;
                            (this._activePane = this._getPaneForItem(t)),
                              this._cd.markForCheck(),
                              this._activePane &&
                                (this._activePane.elRef.nativeElement.classList.add(
                                  "active",
                                ),
                                Et(
                                  this._ngZone,
                                  this._activePane.elRef.nativeElement,
                                  LU,
                                  r,
                                ).subscribe(() => {
                                  t &&
                                    (t.shown.emit(), this.nav.shown.emit(t.id));
                                })),
                              i &&
                                (i.hidden.emit(), this.nav.hidden.emit(i.id));
                          })
                        : this._updateActivePane();
                  });
            }
            _updateActivePane() {
              (this._activePane = this._getActivePane()),
                this._activePane?.elRef.nativeElement.classList.add("show"),
                this._activePane?.elRef.nativeElement.classList.add("active");
            }
            _getPaneForItem(t) {
              return (
                (this._panes && this._panes.find((r) => r.item === t)) || null
              );
            }
            _getActivePane() {
              return (
                (this._panes && this._panes.find((t) => t.item.active)) || null
              );
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(cn), g(ve));
            }),
            (e.ɵcmp = Le({
              type: e,
              selectors: [["", "ngbNavOutlet", ""]],
              viewQuery: function (t, r) {
                if ((1 & t && Ei(Ug, 5), 2 & t)) {
                  let i;
                  ye((i = be())) && (r._panes = i);
                }
              },
              hostVars: 2,
              hostBindings: function (t, r) {
                2 & t && Q("tab-content", !0);
              },
              inputs: { paneRole: "paneRole", nav: ["ngbNavOutlet", "nav"] },
              standalone: !0,
              features: [Dt],
              attrs: fj,
              decls: 1,
              vars: 1,
              consts: [
                ["ngFor", "", 3, "ngForOf"],
                ["ngbNavPane", "", 3, "item", "nav", "role", 4, "ngIf"],
                ["ngbNavPane", "", 3, "item", "nav", "role"],
                [3, "ngTemplateOutlet", "ngTemplateOutletContext"],
              ],
              template: function (t, r) {
                1 & t && R(0, gj, 1, 1, "ng-template", 0),
                  2 & t && T("ngForOf", r.nav.items);
              },
              dependencies: [Ug, Bn, dn, xr],
              encapsulation: 2,
              changeDetection: 0,
            })),
            e
          );
        })(),
        RE = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ imports: [Gg] })),
            e
          );
        })(),
        VU = (() => {
          class e {
            constructor() {
              (this.disabled = !1),
                (this.boundaryLinks = !1),
                (this.directionLinks = !0),
                (this.ellipses = !0),
                (this.maxSize = 0),
                (this.pageSize = 10),
                (this.rotate = !1);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        PE = (() => {
          class e {
            constructor(t) {
              this.templateRef = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Ve));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["ng-template", "ngbPaginationEllipsis", ""]],
              standalone: !0,
            })),
            e
          );
        })(),
        xE = (() => {
          class e {
            constructor(t) {
              this.templateRef = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Ve));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["ng-template", "ngbPaginationFirst", ""]],
              standalone: !0,
            })),
            e
          );
        })(),
        FE = (() => {
          class e {
            constructor(t) {
              this.templateRef = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Ve));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["ng-template", "ngbPaginationLast", ""]],
              standalone: !0,
            })),
            e
          );
        })(),
        kE = (() => {
          class e {
            constructor(t) {
              this.templateRef = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Ve));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["ng-template", "ngbPaginationNext", ""]],
              standalone: !0,
            })),
            e
          );
        })(),
        LE = (() => {
          class e {
            constructor(t) {
              this.templateRef = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Ve));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["ng-template", "ngbPaginationNumber", ""]],
              standalone: !0,
            })),
            e
          );
        })(),
        VE = (() => {
          class e {
            constructor(t) {
              this.templateRef = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Ve));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["ng-template", "ngbPaginationPrevious", ""]],
              standalone: !0,
            })),
            e
          );
        })(),
        BE = (() => {
          class e {
            constructor(t) {
              this.templateRef = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(Ve));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["ng-template", "ngbPaginationPages", ""]],
              standalone: !0,
            })),
            e
          );
        })(),
        HE = (() => {
          class e {
            constructor(t) {
              (this.pageCount = 0),
                (this.pages = []),
                (this.page = 1),
                (this.pageChange = new U(!0)),
                (this.disabled = t.disabled),
                (this.boundaryLinks = t.boundaryLinks),
                (this.directionLinks = t.directionLinks),
                (this.ellipses = t.ellipses),
                (this.maxSize = t.maxSize),
                (this.pageSize = t.pageSize),
                (this.rotate = t.rotate),
                (this.size = t.size);
            }
            hasPrevious() {
              return this.page > 1;
            }
            hasNext() {
              return this.page < this.pageCount;
            }
            nextDisabled() {
              return !this.hasNext() || this.disabled;
            }
            previousDisabled() {
              return !this.hasPrevious() || this.disabled;
            }
            selectPage(t) {
              this._updatePages(t);
            }
            ngOnChanges(t) {
              this._updatePages(this.page);
            }
            isEllipsis(t) {
              return -1 === t;
            }
            _applyEllipses(t, r) {
              this.ellipses &&
                (t > 0 &&
                  (t > 2
                    ? this.pages.unshift(-1)
                    : 2 === t && this.pages.unshift(2),
                  this.pages.unshift(1)),
                r < this.pageCount &&
                  (r < this.pageCount - 2
                    ? this.pages.push(-1)
                    : r === this.pageCount - 2 &&
                      this.pages.push(this.pageCount - 1),
                  this.pages.push(this.pageCount)));
            }
            _applyRotation() {
              let t = 0,
                r = this.pageCount,
                i = Math.floor(this.maxSize / 2);
              return (
                this.page <= i
                  ? (r = this.maxSize)
                  : this.pageCount - this.page < i
                    ? (t = this.pageCount - this.maxSize)
                    : ((t = this.page - i - 1),
                      (r = this.page + (this.maxSize % 2 == 0 ? i - 1 : i))),
                [t, r]
              );
            }
            _applyPagination() {
              let r = (Math.ceil(this.page / this.maxSize) - 1) * this.maxSize;
              return [r, r + this.maxSize];
            }
            _setPageInRange(t) {
              const r = this.page;
              (this.page = Ru(t, this.pageCount, 1)),
                this.page !== r &&
                  it(this.collectionSize) &&
                  this.pageChange.emit(this.page);
            }
            _updatePages(t) {
              (this.pageCount = Math.ceil(this.collectionSize / this.pageSize)),
                it(this.pageCount) || (this.pageCount = 0),
                (this.pages.length = 0);
              for (let r = 1; r <= this.pageCount; r++) this.pages.push(r);
              if (
                (this._setPageInRange(t),
                this.maxSize > 0 && this.pageCount > this.maxSize)
              ) {
                let r = 0,
                  i = this.pageCount;
                ([r, i] = this.rotate
                  ? this._applyRotation()
                  : this._applyPagination()),
                  (this.pages = this.pages.slice(r, i)),
                  this._applyEllipses(r, i);
              }
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(VU));
            }),
            (e.ɵcmp = Le({
              type: e,
              selectors: [["ngb-pagination"]],
              contentQueries: function (t, r, i) {
                if (
                  (1 & t &&
                    (Be(i, PE, 5),
                    Be(i, xE, 5),
                    Be(i, FE, 5),
                    Be(i, kE, 5),
                    Be(i, LE, 5),
                    Be(i, VE, 5),
                    Be(i, BE, 5)),
                  2 & t)
                ) {
                  let o;
                  ye((o = be())) && (r.tplEllipsis = o.first),
                    ye((o = be())) && (r.tplFirst = o.first),
                    ye((o = be())) && (r.tplLast = o.first),
                    ye((o = be())) && (r.tplNext = o.first),
                    ye((o = be())) && (r.tplNumber = o.first),
                    ye((o = be())) && (r.tplPrevious = o.first),
                    ye((o = be())) && (r.tplPages = o.first);
                }
              },
              hostAttrs: ["role", "navigation"],
              inputs: {
                disabled: "disabled",
                boundaryLinks: "boundaryLinks",
                directionLinks: "directionLinks",
                ellipses: "ellipses",
                rotate: "rotate",
                collectionSize: "collectionSize",
                maxSize: "maxSize",
                page: "page",
                pageSize: "pageSize",
                size: "size",
              },
              outputs: { pageChange: "pageChange" },
              standalone: !0,
              features: [Xe, Dt],
              decls: 20,
              vars: 12,
              consts: function () {
                let n, t, r, i, o, s, a, l;
                return (
                  (n = $localize`:@@ngb.pagination.first:««`),
                  (t = $localize`:@@ngb.pagination.previous:«`),
                  (r = $localize`:@@ngb.pagination.next:»`),
                  (i = $localize`:@@ngb.pagination.last:»»`),
                  (o = $localize`:@@ngb.pagination.first-aria:First`),
                  (s = $localize`:@@ngb.pagination.previous-aria:Previous`),
                  (a = $localize`:@@ngb.pagination.next-aria:Next`),
                  (l = $localize`:@@ngb.pagination.last-aria:Last`),
                  [
                    ["first", ""],
                    ["previous", ""],
                    ["next", ""],
                    ["last", ""],
                    ["ellipsis", ""],
                    ["defaultNumber", ""],
                    ["defaultPages", ""],
                    ["class", "page-item", 3, "disabled", 4, "ngIf"],
                    [3, "ngTemplateOutlet", "ngTemplateOutletContext"],
                    ["aria-hidden", "true"],
                    n,
                    t,
                    r,
                    i,
                    [
                      "class",
                      "page-item",
                      3,
                      "active",
                      "disabled",
                      4,
                      "ngFor",
                      "ngForOf",
                    ],
                    [1, "page-item"],
                    [
                      "class",
                      "page-link",
                      "tabindex",
                      "-1",
                      "aria-disabled",
                      "true",
                      4,
                      "ngIf",
                    ],
                    ["class", "page-link", "href", "", 3, "click", 4, "ngIf"],
                    ["tabindex", "-1", "aria-disabled", "true", 1, "page-link"],
                    ["href", "", 1, "page-link", 3, "click"],
                    ["aria-label", o, "href", "", 1, "page-link", 3, "click"],
                    ["aria-label", s, "href", "", 1, "page-link", 3, "click"],
                    ["aria-label", a, "href", "", 1, "page-link", 3, "click"],
                    ["aria-label", l, "href", "", 1, "page-link", 3, "click"],
                  ]
                );
              },
              template: function (t, r) {
                if (
                  (1 & t &&
                    (R(0, mj, 2, 0, "ng-template", null, 0, Ft),
                    R(2, _j, 2, 0, "ng-template", null, 1, Ft),
                    R(4, vj, 2, 0, "ng-template", null, 2, Ft),
                    R(6, yj, 2, 0, "ng-template", null, 3, Ft),
                    R(8, bj, 1, 0, "ng-template", null, 4, Ft),
                    R(10, Dj, 1, 1, "ng-template", null, 5, Ft),
                    R(12, Ij, 1, 1, "ng-template", null, 6, Ft),
                    M(14, "ul"),
                    R(15, Aj, 3, 9, "li", 7),
                    R(16, xj, 3, 8, "li", 7),
                    R(17, Fj, 0, 0, "ng-template", 8),
                    R(18, Lj, 3, 9, "li", 7),
                    R(19, Bj, 3, 9, "li", 7),
                    I()),
                  2 & t)
                ) {
                  const i = Pt(13);
                  N(14),
                    Jr("pagination" + (r.size ? " pagination-" + r.size : "")),
                    N(1),
                    T("ngIf", r.boundaryLinks),
                    N(1),
                    T("ngIf", r.directionLinks),
                    N(1),
                    T(
                      "ngTemplateOutlet",
                      (null == r.tplPages ? null : r.tplPages.templateRef) || i,
                    )(
                      "ngTemplateOutletContext",
                      hh(8, Hj, r.page, r.pages, r.disabled),
                    ),
                    N(1),
                    T("ngIf", r.directionLinks),
                    N(1),
                    T("ngIf", r.boundaryLinks);
                }
              },
              dependencies: [dn, Bn, xr],
              encapsulation: 2,
              changeDetection: 0,
            })),
            e
          );
        })(),
        jE = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ imports: [HE] })),
            e
          );
        })(),
        UE = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({})),
            e
          );
        })(),
        GU = (() => {
          class e {
            constructor() {
              (this.max = 100),
                (this.animated = !1),
                (this.ariaLabel = "progress bar"),
                (this.striped = !1),
                (this.showValue = !1);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        zU = (() => {
          class e {
            constructor(t) {
              (this.value = 0),
                (this.max = t.max),
                (this.animated = t.animated),
                (this.ariaLabel = t.ariaLabel),
                (this.striped = t.striped),
                (this.textType = t.textType),
                (this.type = t.type),
                (this.showValue = t.showValue),
                (this.height = t.height);
            }
            set max(t) {
              this._max = !it(t) || t <= 0 ? 100 : t;
            }
            get max() {
              return this._max;
            }
            getValue() {
              return Ru(this.value, this.max);
            }
            getPercentValue() {
              return (100 * this.getValue()) / this.max;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(GU));
            }),
            (e.ɵcmp = Le({
              type: e,
              selectors: [["ngb-progressbar"]],
              hostAttrs: [
                "role",
                "progressbar",
                "aria-valuemin",
                "0",
                1,
                "progress",
              ],
              hostVars: 5,
              hostBindings: function (t, r) {
                2 & t &&
                  (de("aria-valuenow", r.getValue())("aria-valuemax", r.max)(
                    "aria-label",
                    r.ariaLabel,
                  ),
                  Lo("height", r.height));
              },
              inputs: {
                max: "max",
                animated: "animated",
                ariaLabel: "ariaLabel",
                striped: "striped",
                showValue: "showValue",
                textType: "textType",
                type: "type",
                value: "value",
                height: "height",
              },
              standalone: !0,
              features: [Dt],
              ngContentSelectors: Au,
              decls: 3,
              vars: 11,
              consts: function () {
                let n;
                return (
                  (n = $localize`:@@ngb.progressbar.value:${"\ufffd0\ufffd"}:INTERPOLATION:`),
                  [[4, "ngIf"], n]
                );
              },
              template: function (t, r) {
                1 & t &&
                  (ta(), M(0, "div"), R(1, Uj, 3, 3, "span", 0), na(2), I()),
                  2 & t &&
                    (Qy(
                      "progress-bar",
                      r.type
                        ? r.textType
                          ? " bg-" + r.type
                          : " text-bg-" + r.type
                        : "",
                      "",
                      r.textType ? " text-" + r.textType : "",
                      "",
                    ),
                    Lo("width", r.getPercentValue(), "%"),
                    Q("progress-bar-animated", r.animated)(
                      "progress-bar-striped",
                      r.striped,
                    ),
                    N(1),
                    T("ngIf", r.showValue));
              },
              dependencies: [dn, wD],
              encapsulation: 2,
              changeDetection: 0,
            })),
            e
          );
        })(),
        GE = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ imports: [zU] })),
            e
          );
        })(),
        WU = (() => {
          class e {
            constructor() {
              (this.max = 10),
                (this.readonly = !1),
                (this.resettable = !1),
                (this.tabindex = 0);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        qU = (() => {
          class e {
            constructor(t, r) {
              (this._changeDetectorRef = r),
                (this.contexts = []),
                (this.disabled = !1),
                (this.hover = new U()),
                (this.leave = new U()),
                (this.rateChange = new U(!0)),
                (this.onChange = (i) => {}),
                (this.onTouched = () => {}),
                (this.max = t.max),
                (this.readonly = t.readonly),
                (this.tabindex = t.tabindex);
            }
            ariaValueText(t, r) {
              return `${t} out of ${r}`;
            }
            isInteractive() {
              return !this.readonly && !this.disabled;
            }
            enter(t) {
              this.isInteractive() && this._updateState(t), this.hover.emit(t);
            }
            handleBlur() {
              this.onTouched();
            }
            handleClick(t) {
              this.isInteractive() &&
                this.update(this.resettable && this.rate === t ? 0 : t);
            }
            handleKeyDown(t) {
              switch (t.which) {
                case he.ArrowDown:
                case he.ArrowLeft:
                  this.update(this.rate - 1);
                  break;
                case he.ArrowUp:
                case he.ArrowRight:
                  this.update(this.rate + 1);
                  break;
                case he.Home:
                  this.update(0);
                  break;
                case he.End:
                  this.update(this.max);
                  break;
                default:
                  return;
              }
              t.preventDefault();
            }
            ngOnChanges(t) {
              t.rate && this.update(this.rate), t.max && this._updateMax();
            }
            ngOnInit() {
              this._setupContexts(), this._updateState(this.rate);
            }
            registerOnChange(t) {
              this.onChange = t;
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            reset() {
              this.leave.emit(this.nextRate), this._updateState(this.rate);
            }
            setDisabledState(t) {
              this.disabled = t;
            }
            update(t, r = !0) {
              const i = Ru(t, this.max, 0);
              this.isInteractive() &&
                this.rate !== i &&
                ((this.rate = i), this.rateChange.emit(this.rate)),
                r && (this.onChange(this.rate), this.onTouched()),
                this._updateState(this.rate);
            }
            writeValue(t) {
              this.update(t, !1), this._changeDetectorRef.markForCheck();
            }
            _updateState(t) {
              (this.nextRate = t),
                this.contexts.forEach(
                  (r, i) => (r.fill = Math.round(100 * Ru(t - i, 1, 0))),
                );
            }
            _updateMax() {
              this.max > 0 && (this._setupContexts(), this.update(this.rate));
            }
            _setupContexts() {
              this.contexts = Array.from({ length: this.max }, (t, r) => ({
                fill: 0,
                index: r,
              }));
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(WU), g(cn));
            }),
            (e.ɵcmp = Le({
              type: e,
              selectors: [["ngb-rating"]],
              contentQueries: function (t, r, i) {
                if ((1 & t && Be(i, Ve, 5), 2 & t)) {
                  let o;
                  ye((o = be())) && (r.starTemplateFromContent = o.first);
                }
              },
              hostAttrs: [
                "role",
                "slider",
                "aria-valuemin",
                "0",
                1,
                "d-inline-flex",
              ],
              hostVars: 5,
              hostBindings: function (t, r) {
                1 & t &&
                  G("blur", function () {
                    return r.handleBlur();
                  })("keydown", function (o) {
                    return r.handleKeyDown(o);
                  })("mouseleave", function () {
                    return r.reset();
                  }),
                  2 & t &&
                    (Dn("tabindex", r.disabled ? -1 : r.tabindex),
                    de("aria-valuemax", r.max)("aria-valuenow", r.nextRate)(
                      "aria-valuetext",
                      r.ariaValueText(r.nextRate, r.max),
                    )("aria-disabled", !!r.readonly || null));
              },
              inputs: {
                max: "max",
                rate: "rate",
                readonly: "readonly",
                resettable: "resettable",
                starTemplate: "starTemplate",
                tabindex: "tabindex",
                ariaValueText: "ariaValueText",
              },
              outputs: {
                hover: "hover",
                leave: "leave",
                rateChange: "rateChange",
              },
              standalone: !0,
              features: [
                Ie([{ provide: fn, useExisting: ee(() => e), multi: !0 }]),
                Xe,
                Dt,
              ],
              decls: 3,
              vars: 1,
              consts: [
                ["t", ""],
                ["ngFor", "", 3, "ngForOf"],
                [1, "visually-hidden"],
                [3, "mouseenter", "click"],
                [3, "ngTemplateOutlet", "ngTemplateOutletContext"],
              ],
              template: function (t, r) {
                1 & t &&
                  (R(0, Gj, 1, 1, "ng-template", null, 0, Ft),
                  R(2, Wj, 4, 5, "ng-template", 1)),
                  2 & t && (N(2), T("ngForOf", r.contexts));
              },
              dependencies: [Bn, xr],
              encapsulation: 2,
              changeDetection: 0,
            })),
            e
          );
        })(),
        zE = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ imports: [qU] })),
            e
          );
        })();
      class WE {
        constructor(n, t, r) {
          (this.hour = Bt(n)), (this.minute = Bt(t)), (this.second = Bt(r));
        }
        changeHour(n = 1) {
          this.updateHour((isNaN(this.hour) ? 0 : this.hour) + n);
        }
        updateHour(n) {
          this.hour = it(n) ? (n < 0 ? 24 + n : n) % 24 : NaN;
        }
        changeMinute(n = 1) {
          this.updateMinute((isNaN(this.minute) ? 0 : this.minute) + n);
        }
        updateMinute(n) {
          it(n)
            ? ((this.minute = n % 60 < 0 ? 60 + (n % 60) : n % 60),
              this.changeHour(Math.floor(n / 60)))
            : (this.minute = NaN);
        }
        changeSecond(n = 1) {
          this.updateSecond((isNaN(this.second) ? 0 : this.second) + n);
        }
        updateSecond(n) {
          it(n)
            ? ((this.second = n < 0 ? 60 + (n % 60) : n % 60),
              this.changeMinute(Math.floor(n / 60)))
            : (this.second = NaN);
        }
        isValid(n = !0) {
          return it(this.hour) && it(this.minute) && (!n || it(this.second));
        }
        toString() {
          return `${this.hour || 0}:${this.minute || 0}:${this.second || 0}`;
        }
      }
      let YU = (() => {
          class e {
            constructor() {
              (this.meridian = !1),
                (this.spinners = !0),
                (this.seconds = !1),
                (this.hourStep = 1),
                (this.minuteStep = 1),
                (this.secondStep = 1),
                (this.disabled = !1),
                (this.readonlyInputs = !1),
                (this.size = "medium");
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        qE = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return (function JU() {
                  return new ZU();
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        ZU = (() => {
          class e extends qE {
            fromModel(t) {
              return t && Ke(t.hour) && Ke(t.minute)
                ? {
                    hour: t.hour,
                    minute: t.minute,
                    second: Ke(t.second) ? t.second : null,
                  }
                : null;
            }
            toModel(t) {
              return t && Ke(t.hour) && Ke(t.minute)
                ? {
                    hour: t.hour,
                    minute: t.minute,
                    second: Ke(t.second) ? t.second : null,
                  }
                : null;
            }
          }
          return (
            (e.ɵfac = (function () {
              let n;
              return function (r) {
                return (n || (n = et(e)))(r || e);
              };
            })()),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        YE = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function (t) {
                let r = null;
                return (
                  (r = t
                    ? new t()
                    : (function KU(e) {
                        return new QU(e);
                      })(k(Cn))),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        QU = (() => {
          class e extends YE {
            constructor(t) {
              super(), (this._periods = oD(t, ze.Standalone, ie.Narrow));
            }
            getMorningPeriod() {
              return this._periods[0];
            }
            getAfternoonPeriod() {
              return this._periods[1];
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k(Cn));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const XU = /[^0-9]/g;
      let e3 = (() => {
          class e {
            constructor(t, r, i, o) {
              (this._config = t),
                (this._ngbTimeAdapter = r),
                (this._cd = i),
                (this.i18n = o),
                (this.onChange = (s) => {}),
                (this.onTouched = () => {}),
                (this.meridian = t.meridian),
                (this.spinners = t.spinners),
                (this.seconds = t.seconds),
                (this.hourStep = t.hourStep),
                (this.minuteStep = t.minuteStep),
                (this.secondStep = t.secondStep),
                (this.disabled = t.disabled),
                (this.readonlyInputs = t.readonlyInputs),
                (this.size = t.size);
            }
            set hourStep(t) {
              this._hourStep = Ke(t) ? t : this._config.hourStep;
            }
            get hourStep() {
              return this._hourStep;
            }
            set minuteStep(t) {
              this._minuteStep = Ke(t) ? t : this._config.minuteStep;
            }
            get minuteStep() {
              return this._minuteStep;
            }
            set secondStep(t) {
              this._secondStep = Ke(t) ? t : this._config.secondStep;
            }
            get secondStep() {
              return this._secondStep;
            }
            writeValue(t) {
              const r = this._ngbTimeAdapter.fromModel(t);
              (this.model = r ? new WE(r.hour, r.minute, r.second) : new WE()),
                !this.seconds &&
                  (!r || !it(r.second)) &&
                  (this.model.second = 0),
                this._cd.markForCheck();
            }
            registerOnChange(t) {
              this.onChange = t;
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this.disabled = t;
            }
            changeHour(t) {
              this.model?.changeHour(t), this.propagateModelChange();
            }
            changeMinute(t) {
              this.model?.changeMinute(t), this.propagateModelChange();
            }
            changeSecond(t) {
              this.model?.changeSecond(t), this.propagateModelChange();
            }
            updateHour(t) {
              const r = !!this.model && this.model.hour >= 12,
                i = Bt(t);
              this.model?.updateHour(
                this.meridian && ((r && i < 12) || (!r && 12 === i))
                  ? i + 12
                  : i,
              ),
                this.propagateModelChange();
            }
            updateMinute(t) {
              this.model?.updateMinute(Bt(t)), this.propagateModelChange();
            }
            updateSecond(t) {
              this.model?.updateSecond(Bt(t)), this.propagateModelChange();
            }
            toggleMeridian() {
              this.meridian && this.changeHour(12);
            }
            formatInput(t) {
              t.value = t.value.replace(XU, "");
            }
            formatHour(t) {
              return it(t)
                ? ls(this.meridian ? (t % 12 == 0 ? 12 : t % 12) : t % 24)
                : ls(NaN);
            }
            formatMinSec(t) {
              return ls(it(t) ? t : NaN);
            }
            handleBlur() {
              this.onTouched();
            }
            get isSmallSize() {
              return "small" === this.size;
            }
            get isLargeSize() {
              return "large" === this.size;
            }
            ngOnChanges(t) {
              t.seconds &&
                !this.seconds &&
                this.model &&
                !it(this.model.second) &&
                ((this.model.second = 0), this.propagateModelChange(!1));
            }
            propagateModelChange(t = !0) {
              t && this.onTouched(),
                this.model?.isValid(this.seconds)
                  ? this.onChange(
                      this._ngbTimeAdapter.toModel({
                        hour: this.model.hour,
                        minute: this.model.minute,
                        second: this.model.second,
                      }),
                    )
                  : this.onChange(this._ngbTimeAdapter.toModel(null));
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(g(YU), g(qE), g(cn), g(YE));
            }),
            (e.ɵcmp = Le({
              type: e,
              selectors: [["ngb-timepicker"]],
              inputs: {
                meridian: "meridian",
                spinners: "spinners",
                seconds: "seconds",
                hourStep: "hourStep",
                minuteStep: "minuteStep",
                secondStep: "secondStep",
                readonlyInputs: "readonlyInputs",
                size: "size",
              },
              exportAs: ["ngbTimepicker"],
              standalone: !0,
              features: [
                Ie([{ provide: fn, useExisting: ee(() => e), multi: !0 }]),
                Xe,
                Dt,
              ],
              decls: 16,
              vars: 25,
              consts: function () {
                let n, t, r, i, o, s, a, l, c, u, d, f, h, p;
                return (
                  (n = $localize`:@@ngb.timepicker.HH:HH`),
                  (t = $localize`:@@ngb.timepicker.hours:Hours`),
                  (r = $localize`:@@ngb.timepicker.MM:MM`),
                  (i = $localize`:@@ngb.timepicker.minutes:Minutes`),
                  (o = $localize`:@@ngb.timepicker.increment-hours:Increment hours`),
                  (s = $localize`:@@ngb.timepicker.decrement-hours:Decrement hours`),
                  (a = $localize`:@@ngb.timepicker.increment-minutes:Increment minutes`),
                  (l = $localize`:@@ngb.timepicker.decrement-minutes:Decrement minutes`),
                  (c = $localize`:@@ngb.timepicker.SS:SS`),
                  (u = $localize`:@@ngb.timepicker.seconds:Seconds`),
                  (d = $localize`:@@ngb.timepicker.increment-seconds:Increment seconds`),
                  (f = $localize`:@@ngb.timepicker.decrement-seconds:Decrement seconds`),
                  (h = $localize`:@@ngb.timepicker.PM:${"\ufffd0\ufffd"}:INTERPOLATION:`),
                  (p = $localize`:@@ngb.timepicker.AM:${"\ufffd0\ufffd"}:INTERPOLATION:`),
                  [
                    [3, "disabled"],
                    [1, "ngb-tp"],
                    [1, "ngb-tp-input-container", "ngb-tp-hour"],
                    [
                      "tabindex",
                      "-1",
                      "type",
                      "button",
                      "class",
                      "btn btn-link",
                      3,
                      "btn-sm",
                      "btn-lg",
                      "disabled",
                      "click",
                      4,
                      "ngIf",
                    ],
                    [
                      "type",
                      "text",
                      "maxlength",
                      "2",
                      "inputmode",
                      "numeric",
                      "placeholder",
                      n,
                      "aria-label",
                      t,
                      1,
                      "ngb-tp-input",
                      "form-control",
                      3,
                      "value",
                      "readOnly",
                      "disabled",
                      "change",
                      "blur",
                      "input",
                      "keydown.ArrowUp",
                      "keydown.ArrowDown",
                    ],
                    [1, "ngb-tp-spacer"],
                    [1, "ngb-tp-input-container", "ngb-tp-minute"],
                    [
                      "type",
                      "text",
                      "maxlength",
                      "2",
                      "inputmode",
                      "numeric",
                      "placeholder",
                      r,
                      "aria-label",
                      i,
                      1,
                      "ngb-tp-input",
                      "form-control",
                      3,
                      "value",
                      "readOnly",
                      "disabled",
                      "change",
                      "blur",
                      "input",
                      "keydown.ArrowUp",
                      "keydown.ArrowDown",
                    ],
                    ["class", "ngb-tp-spacer", 4, "ngIf"],
                    [
                      "class",
                      "ngb-tp-input-container ngb-tp-second",
                      4,
                      "ngIf",
                    ],
                    ["class", "ngb-tp-meridian", 4, "ngIf"],
                    [
                      "tabindex",
                      "-1",
                      "type",
                      "button",
                      1,
                      "btn",
                      "btn-link",
                      3,
                      "disabled",
                      "click",
                    ],
                    [1, "chevron", "ngb-tp-chevron"],
                    [1, "visually-hidden"],
                    o,
                    [1, "chevron", "ngb-tp-chevron", "bottom"],
                    s,
                    a,
                    l,
                    [1, "ngb-tp-input-container", "ngb-tp-second"],
                    [
                      "type",
                      "text",
                      "maxlength",
                      "2",
                      "inputmode",
                      "numeric",
                      "placeholder",
                      c,
                      "aria-label",
                      u,
                      1,
                      "ngb-tp-input",
                      "form-control",
                      3,
                      "value",
                      "readOnly",
                      "disabled",
                      "change",
                      "blur",
                      "input",
                      "keydown.ArrowUp",
                      "keydown.ArrowDown",
                    ],
                    d,
                    f,
                    [1, "ngb-tp-meridian"],
                    [
                      "type",
                      "button",
                      1,
                      "btn",
                      "btn-outline-primary",
                      3,
                      "disabled",
                      "click",
                    ],
                    [4, "ngIf", "ngIfElse"],
                    ["am", ""],
                    h,
                    p,
                  ]
                );
              },
              template: function (t, r) {
                1 & t &&
                  (M(0, "fieldset", 0)(1, "div", 1)(2, "div", 2),
                  R(3, qj, 4, 7, "button", 3),
                  M(4, "input", 4),
                  G("change", function (o) {
                    return r.updateHour(o.target.value);
                  })("blur", function () {
                    return r.handleBlur();
                  })("input", function (o) {
                    return r.formatInput(o.target);
                  })("keydown.ArrowUp", function (o) {
                    return r.changeHour(r.hourStep), o.preventDefault();
                  })("keydown.ArrowDown", function (o) {
                    return r.changeHour(-r.hourStep), o.preventDefault();
                  }),
                  I(),
                  R(5, Yj, 4, 7, "button", 3),
                  I(),
                  M(6, "div", 5),
                  fe(7, ":"),
                  I(),
                  M(8, "div", 6),
                  R(9, Jj, 4, 7, "button", 3),
                  M(10, "input", 7),
                  G("change", function (o) {
                    return r.updateMinute(o.target.value);
                  })("blur", function () {
                    return r.handleBlur();
                  })("input", function (o) {
                    return r.formatInput(o.target);
                  })("keydown.ArrowUp", function (o) {
                    return r.changeMinute(r.minuteStep), o.preventDefault();
                  })("keydown.ArrowDown", function (o) {
                    return r.changeMinute(-r.minuteStep), o.preventDefault();
                  }),
                  I(),
                  R(11, Zj, 4, 7, "button", 3),
                  I(),
                  R(12, Kj, 2, 0, "div", 8),
                  R(13, e$, 4, 9, "div", 9),
                  R(14, t$, 1, 0, "div", 8),
                  R(15, i$, 5, 9, "div", 10),
                  I()()),
                  2 & t &&
                    (Q("disabled", r.disabled),
                    T("disabled", r.disabled),
                    N(3),
                    T("ngIf", r.spinners),
                    N(1),
                    Q("form-control-sm", r.isSmallSize)(
                      "form-control-lg",
                      r.isLargeSize,
                    ),
                    T(
                      "value",
                      r.formatHour(null == r.model ? null : r.model.hour),
                    )("readOnly", r.readonlyInputs)("disabled", r.disabled),
                    N(1),
                    T("ngIf", r.spinners),
                    N(4),
                    T("ngIf", r.spinners),
                    N(1),
                    Q("form-control-sm", r.isSmallSize)(
                      "form-control-lg",
                      r.isLargeSize,
                    ),
                    T(
                      "value",
                      r.formatMinSec(null == r.model ? null : r.model.minute),
                    )("readOnly", r.readonlyInputs)("disabled", r.disabled),
                    N(1),
                    T("ngIf", r.spinners),
                    N(1),
                    T("ngIf", r.seconds),
                    N(1),
                    T("ngIf", r.seconds),
                    N(1),
                    T("ngIf", r.meridian),
                    N(1),
                    T("ngIf", r.meridian));
              },
              dependencies: [dn],
              styles: [
                'ngb-timepicker{font-size:1rem}.ngb-tp{display:flex;align-items:center}.ngb-tp-input-container{width:4em}.ngb-tp-chevron:before{border-style:solid;border-width:.29em .29em 0 0;content:"";display:inline-block;height:.69em;left:.05em;position:relative;top:.15em;transform:rotate(-45deg);vertical-align:middle;width:.69em}.ngb-tp-chevron.bottom:before{top:-.3em;transform:rotate(135deg)}.ngb-tp-input{text-align:center}.ngb-tp-hour,.ngb-tp-minute,.ngb-tp-second,.ngb-tp-meridian{display:flex;flex-direction:column;align-items:center;justify-content:space-around}.ngb-tp-spacer{width:1em;text-align:center}\n',
              ],
              encapsulation: 2,
            })),
            e
          );
        })(),
        JE = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ imports: [e3] })),
            e
          );
        })();
      const t3 = (e, n) => {
          const { classList: t } = e;
          if (n)
            return (
              t.add("fade"),
              cs(e),
              t.add("show", "showing"),
              () => {
                t.remove("showing");
              }
            );
          t.add("show");
        },
        n3 = ({ classList: e }) => (
          e.add("showing"),
          () => {
            e.remove("show", "showing");
          }
        );
      let r3 = (() => {
          class e {
            constructor(t) {
              (this._ngbConfig = t),
                (this.autohide = !0),
                (this.delay = 5e3),
                (this.ariaLive = "polite");
            }
            get animation() {
              return void 0 === this._animation
                ? this._ngbConfig.animation
                : this._animation;
            }
            set animation(t) {
              this._animation = t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(k(Fi));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        i3 = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["", "ngbToastHeader", ""]],
              standalone: !0,
            })),
            e
          );
        })(),
        o3 = (() => {
          class e {
            constructor(t, r, i, o) {
              (this.ariaLive = t),
                (this._zone = i),
                (this._element = o),
                (this.contentHeaderTpl = null),
                (this.shown = new U()),
                (this.hidden = new U()),
                null == this.ariaLive && (this.ariaLive = r.ariaLive),
                (this.delay = r.delay),
                (this.autohide = r.autohide),
                (this.animation = r.animation);
            }
            ngAfterContentInit() {
              this._zone.onStable
                .asObservable()
                .pipe(gt(1))
                .subscribe(() => {
                  this._init(), this.show();
                });
            }
            ngOnChanges(t) {
              "autohide" in t && (this._clearTimeout(), this._init());
            }
            hide() {
              this._clearTimeout();
              const t = Et(this._zone, this._element.nativeElement, n3, {
                animation: this.animation,
                runningTransition: "stop",
              });
              return (
                t.subscribe(() => {
                  this.hidden.emit();
                }),
                t
              );
            }
            show() {
              const t = Et(this._zone, this._element.nativeElement, t3, {
                animation: this.animation,
                runningTransition: "continue",
              });
              return (
                t.subscribe(() => {
                  this.shown.emit();
                }),
                t
              );
            }
            _init() {
              this.autohide &&
                !this._timeoutID &&
                (this._timeoutID = setTimeout(() => this.hide(), this.delay));
            }
            _clearTimeout() {
              this._timeoutID &&
                (clearTimeout(this._timeoutID), (this._timeoutID = null));
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(Wr("aria-live"), g(r3), g(ve), g(_e));
            }),
            (e.ɵcmp = Le({
              type: e,
              selectors: [["ngb-toast"]],
              contentQueries: function (t, r, i) {
                if ((1 & t && Be(i, i3, 7, Ve), 2 & t)) {
                  let o;
                  ye((o = be())) && (r.contentHeaderTpl = o.first);
                }
              },
              hostAttrs: ["role", "alert", "aria-atomic", "true", 1, "toast"],
              hostVars: 3,
              hostBindings: function (t, r) {
                2 & t && (de("aria-live", r.ariaLive), Q("fade", r.animation));
              },
              inputs: {
                animation: "animation",
                delay: "delay",
                autohide: "autohide",
                header: "header",
              },
              outputs: { shown: "shown", hidden: "hidden" },
              exportAs: ["ngbToast"],
              standalone: !0,
              features: [Xe, Dt],
              ngContentSelectors: Au,
              decls: 5,
              vars: 1,
              consts: function () {
                let n;
                return (
                  (n = $localize`:@@ngb.toast.close-aria:Close`),
                  [
                    ["headerTpl", ""],
                    [3, "ngIf"],
                    [1, "toast-body"],
                    [1, "me-auto"],
                    [1, "toast-header"],
                    [3, "ngTemplateOutlet"],
                    [
                      "type",
                      "button",
                      "aria-label",
                      n,
                      1,
                      "btn-close",
                      3,
                      "click",
                    ],
                  ]
                );
              },
              template: function (t, r) {
                1 & t &&
                  (ta(),
                  R(0, o$, 2, 1, "ng-template", null, 0, Ft),
                  R(2, a$, 3, 1, "ng-template", 1),
                  M(3, "div", 2),
                  na(4),
                  I()),
                  2 & t && (N(2), T("ngIf", r.contentHeaderTpl || r.header));
              },
              dependencies: [dn, xr],
              styles: [
                "ngb-toast{display:block}ngb-toast .toast-header .close{margin-left:auto;margin-bottom:.25rem}\n",
              ],
              encapsulation: 2,
            })),
            e
          );
        })(),
        ZE = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ imports: [o3] })),
            e
          );
        })(),
        KE = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({})),
            e
          );
        })(),
        s3 = (() => {
          class e {
            constructor() {
              (this.highlightClass = "ngb-highlight"),
                (this.accentSensitive = !0);
            }
            ngOnChanges(t) {
              !this.accentSensitive &&
                !String.prototype.normalize &&
                (console.warn(
                  "The `accentSensitive` input in `ngb-highlight` cannot be set to `false` in a browser that does not implement the `String.normalize` function. You will have to include a polyfill in your application to use this feature in the current browser.",
                ),
                (this.accentSensitive = !0));
              const r = Bw(this.result),
                i = Array.isArray(this.term) ? this.term : [this.term],
                o = (c) => (this.accentSensitive ? c : $w(c)),
                s = i
                  .map((c) =>
                    (function h$(e) {
                      return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                    })(o(Bw(c))),
                  )
                  .filter((c) => c),
                a = this.accentSensitive ? r : $w(r),
                l = s.length
                  ? a.split(new RegExp(`(${s.join("|")})`, "gmi"))
                  : [r];
              if (this.accentSensitive) this.parts = l;
              else {
                let c = 0;
                this.parts = l.map((u) => r.substring(c, (c += u.length)));
              }
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵcmp = Le({
              type: e,
              selectors: [["ngb-highlight"]],
              inputs: {
                highlightClass: "highlightClass",
                result: "result",
                term: "term",
                accentSensitive: "accentSensitive",
              },
              standalone: !0,
              features: [Xe, Dt],
              decls: 1,
              vars: 1,
              consts: [
                ["ngFor", "", 3, "ngForOf"],
                [3, "class", 4, "ngIf", "ngIfElse"],
                ["even", ""],
              ],
              template: function (t, r) {
                1 & t && R(0, u$, 3, 2, "ng-template", 0),
                  2 & t && T("ngForOf", r.parts);
              },
              dependencies: [dn, Bn],
              styles: [".ngb-highlight{font-weight:700}\n"],
              encapsulation: 2,
              changeDetection: 0,
            })),
            e
          );
        })();
      new $("live announcer delay", {
        providedIn: "root",
        factory: function a3() {
          return 100;
        },
      });
      let QE = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({ imports: [s3] })),
            e
          );
        })(),
        XE = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({})),
            e
          );
        })();
      const l3 = [
        Kw,
        Xw,
        tE,
        nE,
        CE,
        SE,
        NE,
        RE,
        XE,
        jE,
        UE,
        GE,
        zE,
        JE,
        ZE,
        KE,
        QE,
      ];
      let c3 = (() => {
        class e {}
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵmod = xe({ type: e })),
          (e.ɵinj = Ae({
            imports: [
              l3,
              Kw,
              Xw,
              tE,
              nE,
              CE,
              SE,
              NE,
              RE,
              XE,
              jE,
              UE,
              GE,
              zE,
              JE,
              ZE,
              KE,
              QE,
            ],
          })),
          e
        );
      })();
      function u3(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "div", 3)(1, "h6", 4),
            fe(2, " This was a joke. Congratulations for getting it "),
            I(),
            M(3, "p"),
            fe(
              4,
              " I'm not collecting any data. I doubt there's much buisness-value in collecting data about this site lol ",
            ),
            I(),
            M(5, "button", 5),
            G("click", function () {
              return me(ge(t).$implicit.dismiss("Cross click"));
            }),
            I()();
        }
      }
      function d3(e, n) {
        if (1 & e) {
          const t = Fe();
          M(0, "div", 3)(1, "p"),
            fe(2, "Hereby your soul is pledged to the devil anyways."),
            I(),
            M(3, "p"),
            fe(
              4,
              " Just kidding. I'm not collecting any data. I bet your's is boring though ",
            ),
            I(),
            M(5, "button", 5),
            G("click", function () {
              return me(ge(t).$implicit.dismiss("Cross click"));
            }),
            I()();
        }
      }
      let f3 = (() => {
          class e {
            constructor() {
              (this.modalService = X(ME)), (this.closeResult = "");
            }
            open(t) {
              this.modalService.open(t, {
                ariaLabelledBy: "modal-basic-title",
              });
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = Le({
              type: e,
              selectors: [["app-cookienotice"]],
              decls: 10,
              vars: 0,
              consts: [
                [3, "click"],
                ["content", ""],
                ["nonbasiccontent", ""],
                [1, "modal-header"],
                ["id", "modal-basic-title", 1, "modal-title"],
                [
                  "type",
                  "button",
                  "aria-label",
                  "Close",
                  1,
                  "btn-close",
                  3,
                  "click",
                ],
              ],
              template: function (r, i) {
                if (1 & r) {
                  const o = Fe();
                  M(0, "ngb-alert"),
                    fe(
                      1,
                      " Cookie Notice: By accepting cookies you pledge your soul to the devil ",
                    ),
                    M(2, "button", 0),
                    G("click", function () {
                      ge(o);
                      const a = Pt(7);
                      return me(i.open(a));
                    }),
                    fe(3, "Accept"),
                    I(),
                    M(4, "button", 0),
                    G("click", function () {
                      ge(o);
                      const a = Pt(9);
                      return me(i.open(a));
                    }),
                    fe(5, "Reject"),
                    I(),
                    R(6, u3, 6, 0, "ng-template", null, 1, Ft),
                    R(8, d3, 6, 0, "ng-template", null, 2, Ft),
                    I();
                }
              },
              dependencies: [Qw],
            }));
          }
          return e;
        })(),
        h3 = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = Le({
              type: e,
              selectors: [["app-example"]],
              decls: 1,
              vars: 0,
              template: function (r, i) {
                1 & r && qe(0, "app-cookienotice");
              },
              dependencies: [f3],
            }));
          }
          return e;
        })();
      class Gu {}
      class zg {}
      class Lr {
        constructor(n) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            n
              ? (this.lazyInit =
                  "string" == typeof n
                    ? () => {
                        (this.headers = new Map()),
                          n.split("\n").forEach((t) => {
                            const r = t.indexOf(":");
                            if (r > 0) {
                              const i = t.slice(0, r),
                                o = i.toLowerCase(),
                                s = t.slice(r + 1).trim();
                              this.maybeSetNormalizedName(i, o),
                                this.headers.has(o)
                                  ? this.headers.get(o).push(s)
                                  : this.headers.set(o, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.entries(n).forEach(([t, r]) => {
                            let i;
                            if (
                              ((i =
                                "string" == typeof r
                                  ? [r]
                                  : "number" == typeof r
                                    ? [r.toString()]
                                    : r.map((o) => o.toString())),
                              i.length > 0)
                            ) {
                              const o = t.toLowerCase();
                              this.headers.set(o, i),
                                this.maybeSetNormalizedName(t, o);
                            }
                          });
                      })
              : (this.headers = new Map());
        }
        has(n) {
          return this.init(), this.headers.has(n.toLowerCase());
        }
        get(n) {
          this.init();
          const t = this.headers.get(n.toLowerCase());
          return t && t.length > 0 ? t[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(n) {
          return this.init(), this.headers.get(n.toLowerCase()) || null;
        }
        append(n, t) {
          return this.clone({ name: n, value: t, op: "a" });
        }
        set(n, t) {
          return this.clone({ name: n, value: t, op: "s" });
        }
        delete(n, t) {
          return this.clone({ name: n, value: t, op: "d" });
        }
        maybeSetNormalizedName(n, t) {
          this.normalizedNames.has(t) || this.normalizedNames.set(t, n);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Lr
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((n) => this.applyUpdate(n)),
              (this.lazyUpdate = null)));
        }
        copyFrom(n) {
          n.init(),
            Array.from(n.headers.keys()).forEach((t) => {
              this.headers.set(t, n.headers.get(t)),
                this.normalizedNames.set(t, n.normalizedNames.get(t));
            });
        }
        clone(n) {
          const t = new Lr();
          return (
            (t.lazyInit =
              this.lazyInit && this.lazyInit instanceof Lr
                ? this.lazyInit
                : this),
            (t.lazyUpdate = (this.lazyUpdate || []).concat([n])),
            t
          );
        }
        applyUpdate(n) {
          const t = n.name.toLowerCase();
          switch (n.op) {
            case "a":
            case "s":
              let r = n.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(n.name, t);
              const i = ("a" === n.op ? this.headers.get(t) : void 0) || [];
              i.push(...r), this.headers.set(t, i);
              break;
            case "d":
              const o = n.value;
              if (o) {
                let s = this.headers.get(t);
                if (!s) return;
                (s = s.filter((a) => -1 === o.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(t), this.normalizedNames.delete(t))
                    : this.headers.set(t, s);
              } else this.headers.delete(t), this.normalizedNames.delete(t);
          }
        }
        forEach(n) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((t) =>
              n(this.normalizedNames.get(t), this.headers.get(t)),
            );
        }
      }
      class p3 {
        encodeKey(n) {
          return eS(n);
        }
        encodeValue(n) {
          return eS(n);
        }
        decodeKey(n) {
          return decodeURIComponent(n);
        }
        decodeValue(n) {
          return decodeURIComponent(n);
        }
      }
      const m3 = /%(\d[a-f0-9])/gi,
        _3 = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function eS(e) {
        return encodeURIComponent(e).replace(m3, (n, t) => _3[t] ?? n);
      }
      function zu(e) {
        return `${e}`;
      }
      class ci {
        constructor(n = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = n.encoder || new p3()),
            n.fromString)
          ) {
            if (n.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function g3(e, n) {
              const t = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((i) => {
                      const o = i.indexOf("="),
                        [s, a] =
                          -1 == o
                            ? [n.decodeKey(i), ""]
                            : [
                                n.decodeKey(i.slice(0, o)),
                                n.decodeValue(i.slice(o + 1)),
                              ],
                        l = t.get(s) || [];
                      l.push(a), t.set(s, l);
                    }),
                t
              );
            })(n.fromString, this.encoder);
          } else
            n.fromObject
              ? ((this.map = new Map()),
                Object.keys(n.fromObject).forEach((t) => {
                  const r = n.fromObject[t],
                    i = Array.isArray(r) ? r.map(zu) : [zu(r)];
                  this.map.set(t, i);
                }))
              : (this.map = null);
        }
        has(n) {
          return this.init(), this.map.has(n);
        }
        get(n) {
          this.init();
          const t = this.map.get(n);
          return t ? t[0] : null;
        }
        getAll(n) {
          return this.init(), this.map.get(n) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(n, t) {
          return this.clone({ param: n, value: t, op: "a" });
        }
        appendAll(n) {
          const t = [];
          return (
            Object.keys(n).forEach((r) => {
              const i = n[r];
              Array.isArray(i)
                ? i.forEach((o) => {
                    t.push({ param: r, value: o, op: "a" });
                  })
                : t.push({ param: r, value: i, op: "a" });
            }),
            this.clone(t)
          );
        }
        set(n, t) {
          return this.clone({ param: n, value: t, op: "s" });
        }
        delete(n, t) {
          return this.clone({ param: n, value: t, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((n) => {
                const t = this.encoder.encodeKey(n);
                return this.map
                  .get(n)
                  .map((r) => t + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((n) => "" !== n)
              .join("&")
          );
        }
        clone(n) {
          const t = new ci({ encoder: this.encoder });
          return (
            (t.cloneFrom = this.cloneFrom || this),
            (t.updates = (this.updates || []).concat(n)),
            t
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((n) => this.map.set(n, this.cloneFrom.map.get(n))),
              this.updates.forEach((n) => {
                switch (n.op) {
                  case "a":
                  case "s":
                    const t =
                      ("a" === n.op ? this.map.get(n.param) : void 0) || [];
                    t.push(zu(n.value)), this.map.set(n.param, t);
                    break;
                  case "d":
                    if (void 0 === n.value) {
                      this.map.delete(n.param);
                      break;
                    }
                    {
                      let r = this.map.get(n.param) || [];
                      const i = r.indexOf(zu(n.value));
                      -1 !== i && r.splice(i, 1),
                        r.length > 0
                          ? this.map.set(n.param, r)
                          : this.map.delete(n.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class v3 {
        constructor() {
          this.map = new Map();
        }
        set(n, t) {
          return this.map.set(n, t), this;
        }
        get(n) {
          return (
            this.map.has(n) || this.map.set(n, n.defaultValue()),
            this.map.get(n)
          );
        }
        delete(n) {
          return this.map.delete(n), this;
        }
        has(n) {
          return this.map.has(n);
        }
        keys() {
          return this.map.keys();
        }
      }
      function tS(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function nS(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function rS(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class rl {
        constructor(n, t, r, i) {
          let o;
          if (
            ((this.url = t),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = n.toUpperCase()),
            (function y3(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || i
              ? ((this.body = void 0 !== r ? r : null), (o = i))
              : (o = r),
            o &&
              ((this.reportProgress = !!o.reportProgress),
              (this.withCredentials = !!o.withCredentials),
              o.responseType && (this.responseType = o.responseType),
              o.headers && (this.headers = o.headers),
              o.context && (this.context = o.context),
              o.params && (this.params = o.params)),
            this.headers || (this.headers = new Lr()),
            this.context || (this.context = new v3()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = t;
            else {
              const a = t.indexOf("?");
              this.urlWithParams =
                t + (-1 === a ? "?" : a < t.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new ci()), (this.urlWithParams = t);
        }
        serializeBody() {
          return null === this.body
            ? null
            : tS(this.body) ||
                nS(this.body) ||
                rS(this.body) ||
                (function b3(e) {
                  return (
                    typeof URLSearchParams < "u" && e instanceof URLSearchParams
                  );
                })(this.body) ||
                "string" == typeof this.body
              ? this.body
              : this.body instanceof ci
                ? this.body.toString()
                : "object" == typeof this.body ||
                    "boolean" == typeof this.body ||
                    Array.isArray(this.body)
                  ? JSON.stringify(this.body)
                  : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || rS(this.body)
            ? null
            : nS(this.body)
              ? this.body.type || null
              : tS(this.body)
                ? null
                : "string" == typeof this.body
                  ? "text/plain"
                  : this.body instanceof ci
                    ? "application/x-www-form-urlencoded;charset=UTF-8"
                    : "object" == typeof this.body ||
                        "number" == typeof this.body ||
                        "boolean" == typeof this.body
                      ? "application/json"
                      : null;
        }
        clone(n = {}) {
          const t = n.method || this.method,
            r = n.url || this.url,
            i = n.responseType || this.responseType,
            o = void 0 !== n.body ? n.body : this.body,
            s =
              void 0 !== n.withCredentials
                ? n.withCredentials
                : this.withCredentials,
            a =
              void 0 !== n.reportProgress
                ? n.reportProgress
                : this.reportProgress;
          let l = n.headers || this.headers,
            c = n.params || this.params;
          const u = n.context ?? this.context;
          return (
            void 0 !== n.setHeaders &&
              (l = Object.keys(n.setHeaders).reduce(
                (d, f) => d.set(f, n.setHeaders[f]),
                l,
              )),
            n.setParams &&
              (c = Object.keys(n.setParams).reduce(
                (d, f) => d.set(f, n.setParams[f]),
                c,
              )),
            new rl(t, r, o, {
              params: c,
              headers: l,
              context: u,
              reportProgress: a,
              responseType: i,
              withCredentials: s,
            })
          );
        }
      }
      var mt = (() => (
        ((mt = mt || {})[(mt.Sent = 0)] = "Sent"),
        (mt[(mt.UploadProgress = 1)] = "UploadProgress"),
        (mt[(mt.ResponseHeader = 2)] = "ResponseHeader"),
        (mt[(mt.DownloadProgress = 3)] = "DownloadProgress"),
        (mt[(mt.Response = 4)] = "Response"),
        (mt[(mt.User = 5)] = "User"),
        mt
      ))();
      class Wg {
        constructor(n, t = 200, r = "OK") {
          (this.headers = n.headers || new Lr()),
            (this.status = void 0 !== n.status ? n.status : t),
            (this.statusText = n.statusText || r),
            (this.url = n.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class qg extends Wg {
        constructor(n = {}) {
          super(n), (this.type = mt.ResponseHeader);
        }
        clone(n = {}) {
          return new qg({
            headers: n.headers || this.headers,
            status: void 0 !== n.status ? n.status : this.status,
            statusText: n.statusText || this.statusText,
            url: n.url || this.url || void 0,
          });
        }
      }
      class Wu extends Wg {
        constructor(n = {}) {
          super(n),
            (this.type = mt.Response),
            (this.body = void 0 !== n.body ? n.body : null);
        }
        clone(n = {}) {
          return new Wu({
            body: void 0 !== n.body ? n.body : this.body,
            headers: n.headers || this.headers,
            status: void 0 !== n.status ? n.status : this.status,
            statusText: n.statusText || this.statusText,
            url: n.url || this.url || void 0,
          });
        }
      }
      class iS extends Wg {
        constructor(n) {
          super(n, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${n.url || "(unknown url)"}`
                : `Http failure response for ${n.url || "(unknown url)"}: ${n.status} ${n.statusText}`),
            (this.error = n.error || null);
        }
      }
      function Yg(e, n) {
        return {
          body: n,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let Jg = (() => {
        class e {
          constructor(t) {
            this.handler = t;
          }
          request(t, r, i = {}) {
            let o;
            if (t instanceof rl) o = t;
            else {
              let l, c;
              (l = i.headers instanceof Lr ? i.headers : new Lr(i.headers)),
                i.params &&
                  (c =
                    i.params instanceof ci
                      ? i.params
                      : new ci({ fromObject: i.params })),
                (o = new rl(t, r, void 0 !== i.body ? i.body : null, {
                  headers: l,
                  context: i.context,
                  params: c,
                  reportProgress: i.reportProgress,
                  responseType: i.responseType || "json",
                  withCredentials: i.withCredentials,
                }));
            }
            const s = z(o).pipe(Xr((l) => this.handler.handle(l)));
            if (t instanceof rl || "events" === i.observe) return s;
            const a = s.pipe(wt((l) => l instanceof Wu));
            switch (i.observe || "body") {
              case "body":
                switch (o.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      Y((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      }),
                    );
                  case "blob":
                    return a.pipe(
                      Y((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      }),
                    );
                  case "text":
                    return a.pipe(
                      Y((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      }),
                    );
                  default:
                    return a.pipe(Y((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${i.observe}}`,
                );
            }
          }
          delete(t, r = {}) {
            return this.request("DELETE", t, r);
          }
          get(t, r = {}) {
            return this.request("GET", t, r);
          }
          head(t, r = {}) {
            return this.request("HEAD", t, r);
          }
          jsonp(t, r) {
            return this.request("JSONP", t, {
              params: new ci().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(t, r = {}) {
            return this.request("OPTIONS", t, r);
          }
          patch(t, r, i = {}) {
            return this.request("PATCH", t, Yg(i, r));
          }
          post(t, r, i = {}) {
            return this.request("POST", t, Yg(i, r));
          }
          put(t, r, i = {}) {
            return this.request("PUT", t, Yg(i, r));
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(k(Gu));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function oS(e, n) {
        return n(e);
      }
      function D3(e, n) {
        return (t, r) => n.intercept(t, { handle: (i) => e(i, r) });
      }
      const w3 = new $("HTTP_INTERCEPTORS"),
        il = new $("HTTP_INTERCEPTOR_FNS");
      function E3() {
        let e = null;
        return (n, t) => (
          null === e &&
            (e = (X(w3, { optional: !0 }) ?? []).reduceRight(D3, oS)),
          e(n, t)
        );
      }
      let sS = (() => {
        class e extends Gu {
          constructor(t, r) {
            super(),
              (this.backend = t),
              (this.injector = r),
              (this.chain = null);
          }
          handle(t) {
            if (null === this.chain) {
              const r = Array.from(new Set(this.injector.get(il)));
              this.chain = r.reduceRight(
                (i, o) =>
                  (function C3(e, n, t) {
                    return (r, i) => t.runInContext(() => n(r, (o) => e(o, i)));
                  })(i, o, this.injector),
                oS,
              );
            }
            return this.chain(t, (r) => this.backend.handle(r));
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(k(zg), k(xn));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const N3 = /^\)\]\}',?\n/;
      let lS = (() => {
        class e {
          constructor(t) {
            this.xhrFactory = t;
          }
          handle(t) {
            if ("JSONP" === t.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed.",
              );
            return new Ce((r) => {
              const i = this.xhrFactory.build();
              if (
                (i.open(t.method, t.urlWithParams),
                t.withCredentials && (i.withCredentials = !0),
                t.headers.forEach((h, p) => i.setRequestHeader(h, p.join(","))),
                t.headers.has("Accept") ||
                  i.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*",
                  ),
                !t.headers.has("Content-Type"))
              ) {
                const h = t.detectContentTypeHeader();
                null !== h && i.setRequestHeader("Content-Type", h);
              }
              if (t.responseType) {
                const h = t.responseType.toLowerCase();
                i.responseType = "json" !== h ? h : "text";
              }
              const o = t.serializeBody();
              let s = null;
              const a = () => {
                  if (null !== s) return s;
                  const h = i.statusText || "OK",
                    p = new Lr(i.getAllResponseHeaders()),
                    m =
                      (function I3(e) {
                        return "responseURL" in e && e.responseURL
                          ? e.responseURL
                          : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                            ? e.getResponseHeader("X-Request-URL")
                            : null;
                      })(i) || t.url;
                  return (
                    (s = new qg({
                      headers: p,
                      status: i.status,
                      statusText: h,
                      url: m,
                    })),
                    s
                  );
                },
                l = () => {
                  let { headers: h, status: p, statusText: m, url: v } = a(),
                    b = null;
                  204 !== p &&
                    (b = typeof i.response > "u" ? i.responseText : i.response),
                    0 === p && (p = b ? 200 : 0);
                  let w = p >= 200 && p < 300;
                  if ("json" === t.responseType && "string" == typeof b) {
                    const D = b;
                    b = b.replace(N3, "");
                    try {
                      b = "" !== b ? JSON.parse(b) : null;
                    } catch (O) {
                      (b = D), w && ((w = !1), (b = { error: O, text: b }));
                    }
                  }
                  w
                    ? (r.next(
                        new Wu({
                          body: b,
                          headers: h,
                          status: p,
                          statusText: m,
                          url: v || void 0,
                        }),
                      ),
                      r.complete())
                    : r.error(
                        new iS({
                          error: b,
                          headers: h,
                          status: p,
                          statusText: m,
                          url: v || void 0,
                        }),
                      );
                },
                c = (h) => {
                  const { url: p } = a(),
                    m = new iS({
                      error: h,
                      status: i.status || 0,
                      statusText: i.statusText || "Unknown Error",
                      url: p || void 0,
                    });
                  r.error(m);
                };
              let u = !1;
              const d = (h) => {
                  u || (r.next(a()), (u = !0));
                  let p = { type: mt.DownloadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total),
                    "text" === t.responseType &&
                      i.responseText &&
                      (p.partialText = i.responseText),
                    r.next(p);
                },
                f = (h) => {
                  let p = { type: mt.UploadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total), r.next(p);
                };
              return (
                i.addEventListener("load", l),
                i.addEventListener("error", c),
                i.addEventListener("timeout", c),
                i.addEventListener("abort", c),
                t.reportProgress &&
                  (i.addEventListener("progress", d),
                  null !== o &&
                    i.upload &&
                    i.upload.addEventListener("progress", f)),
                i.send(o),
                r.next({ type: mt.Sent }),
                () => {
                  i.removeEventListener("error", c),
                    i.removeEventListener("abort", c),
                    i.removeEventListener("load", l),
                    i.removeEventListener("timeout", c),
                    t.reportProgress &&
                      (i.removeEventListener("progress", d),
                      null !== o &&
                        i.upload &&
                        i.upload.removeEventListener("progress", f)),
                    i.readyState !== i.DONE && i.abort();
                }
              );
            });
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(k(TD));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Zg = new $("XSRF_ENABLED"),
        cS = new $("XSRF_COOKIE_NAME", {
          providedIn: "root",
          factory: () => "XSRF-TOKEN",
        }),
        uS = new $("XSRF_HEADER_NAME", {
          providedIn: "root",
          factory: () => "X-XSRF-TOKEN",
        });
      class dS {}
      let R3 = (() => {
        class e {
          constructor(t, r, i) {
            (this.doc = t),
              (this.platform = r),
              (this.cookieName = i),
              (this.lastCookieString = ""),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ("server" === this.platform) return null;
            const t = this.doc.cookie || "";
            return (
              t !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = gD(t, this.cookieName)),
                (this.lastCookieString = t)),
              this.lastToken
            );
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(k(nt), k(Tc), k(cS));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function P3(e, n) {
        const t = e.url.toLowerCase();
        if (
          !X(Zg) ||
          "GET" === e.method ||
          "HEAD" === e.method ||
          t.startsWith("http://") ||
          t.startsWith("https://")
        )
          return n(e);
        const r = X(dS).getToken(),
          i = X(uS);
        return (
          null != r &&
            !e.headers.has(i) &&
            (e = e.clone({ headers: e.headers.set(i, r) })),
          n(e)
        );
      }
      var at = (() => (
        ((at = at || {})[(at.Interceptors = 0)] = "Interceptors"),
        (at[(at.LegacyInterceptors = 1)] = "LegacyInterceptors"),
        (at[(at.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
        (at[(at.NoXsrfProtection = 3)] = "NoXsrfProtection"),
        (at[(at.JsonpSupport = 4)] = "JsonpSupport"),
        (at[(at.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
        at
      ))();
      function ps(e, n) {
        return { ɵkind: e, ɵproviders: n };
      }
      function x3(...e) {
        const n = [
          Jg,
          lS,
          sS,
          { provide: Gu, useExisting: sS },
          { provide: zg, useExisting: lS },
          { provide: il, useValue: P3, multi: !0 },
          { provide: Zg, useValue: !0 },
          { provide: dS, useClass: R3 },
        ];
        for (const t of e) n.push(...t.ɵproviders);
        return (function wN(e) {
          return { ɵproviders: e };
        })(n);
      }
      const fS = new $("LEGACY_INTERCEPTOR_FN");
      let k3 = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = xe({ type: e })),
            (e.ɵinj = Ae({
              providers: [
                x3(
                  ps(at.LegacyInterceptors, [
                    { provide: fS, useFactory: E3 },
                    { provide: il, useExisting: fS, multi: !0 },
                  ]),
                ),
              ],
            })),
            e
          );
        })(),
        L3 = (() => {
          class e {
            constructor(t) {
              this.http = t;
            }
            providePageContent() {
              return this.http.get("/assets/TextContent/content.json");
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(k(Jg));
            });
            static #t = (this.ɵprov = P({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })();
      function V3(e, n) {
        if (
          (1 & e && (M(0, "div")(1, "h5"), fe(2), I(), M(3, "p"), fe(4), I()()),
          2 & e)
        ) {
          const t = n.$implicit;
          N(2), zt(t.subheader), N(2), zt(t.paragraph);
        }
      }
      function B3(e, n) {
        if (
          (1 & e &&
            (M(0, "div")(1, "h2"), fe(2), I(), R(3, V3, 5, 2, "div", 2), I()),
          2 & e)
        ) {
          const t = F();
          N(2),
            zt(t.textContent.pageName),
            N(1),
            T("ngForOf", t.textContent.paragraphs);
        }
      }
      let H3 = (() => {
          class e {
            constructor(t, r) {
              (this.http = t),
                (this.stringContentProvider = r),
                (this.allContent = []);
            }
            ngOnInit() {
              this.stringContentProvider.providePageContent().subscribe((r) => {
                (this.textContent = r.pages[0]),
                  (this.textContent.paragraphs = r.pages[0].content);
              });
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(g(Jg), g(L3));
            });
            static #t = (this.ɵcmp = Le({
              type: e,
              selectors: [["app-about"]],
              decls: 2,
              vars: 1,
              consts: [
                [1, "about-wrapper"],
                [4, "ngIf"],
                [4, "ngFor", "ngForOf"],
              ],
              template: function (r, i) {
                1 & r && (M(0, "div", 0), R(1, B3, 4, 2, "div", 1), I()),
                  2 & r && (N(1), T("ngIf", i.textContent));
              },
              dependencies: [Bn, dn],
              styles: [
                ".about-wrapper[_ngcontent-%COMP%]{max-width:60%;margin:20px}",
              ],
            }));
          }
          return e;
        })(),
        j3 = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = Le({
              type: e,
              selectors: [["app-project-walrus"]],
              decls: 2,
              vars: 0,
              template: function (r, i) {
                1 & r && (M(0, "p"), fe(1, "project-walrus works!"), I());
              },
            }));
          }
          return e;
        })();
      function $3(e, n) {
        1 & e && qe(0, "app-about");
      }
      function U3(e, n) {
        1 & e && qe(0, "app-example");
      }
      function G3(e, n) {
        1 & e && qe(0, "app-project-walrus");
      }
      let z3 = (() => {
          class e {
            constructor() {
              this.active = "1";
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = Le({
              type: e,
              selectors: [["app-nav"]],
              decls: 15,
              vars: 5,
              consts: [
                ["ngbNav", "", 1, "nav-tabs", 3, "activeId", "activeIdChange"],
                ["nav", "ngbNav"],
                [3, "ngbNavItem"],
                ["ngbNavLink", ""],
                ["ngbNavContent", ""],
                [1, "mt-2", 3, "ngbNavOutlet"],
              ],
              template: function (r, i) {
                if (
                  (1 & r &&
                    (M(0, "ul", 0, 1),
                    G("activeIdChange", function (s) {
                      return (i.active = s);
                    }),
                    M(2, "li", 2)(3, "button", 3),
                    fe(4, "About"),
                    I(),
                    R(5, $3, 1, 0, "ng-template", 4),
                    I(),
                    M(6, "li", 2)(7, "button", 3),
                    fe(8, "Example"),
                    I(),
                    R(9, U3, 1, 0, "ng-template", 4),
                    I(),
                    M(10, "li", 2)(11, "button", 3),
                    fe(12, "Project Walrus"),
                    I(),
                    R(13, G3, 1, 0, "ng-template", 4),
                    I()(),
                    qe(14, "div", 5)),
                  2 & r)
                ) {
                  const o = Pt(1);
                  T("activeId", i.active),
                    N(2),
                    T("ngbNavItem", 1),
                    N(4),
                    T("ngbNavItem", 2),
                    N(4),
                    T("ngbNavItem", 3),
                    N(4),
                    T("ngbNavOutlet", o);
                }
              },
              dependencies: [$g, $i, hs, OE, AE, nl, Gg, h3, H3, j3],
            }));
          }
          return e;
        })(),
        W3 = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = Le({
              type: e,
              selectors: [["app-header"]],
              decls: 3,
              vars: 0,
              consts: [[1, "header"]],
              template: function (r, i) {
                1 & r &&
                  (M(0, "div", 0)(1, "h1"),
                  fe(2, "Hopeless Romantics Inc."),
                  I()());
              },
              styles: [
                ".header[_ngcontent-%COMP%]{padding:30px 50px 30px 20px}",
              ],
            }));
          }
          return e;
        })(),
        q3 = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = Le({
              type: e,
              selectors: [["app-footer"]],
              decls: 5,
              vars: 0,
              consts: [
                ["id", "footer"],
                ["href", "https://github.com/somedayillbegoodatthis"],
                [
                  "id",
                  "github-logo",
                  "src",
                  "assets/Images/Logos/GitHub-Logo.png",
                ],
              ],
              template: function (r, i) {
                1 & r &&
                  (M(0, "div", 0)(1, "p"),
                  fe(
                    2,
                    "This page is just a fun way to display my art. All rights reserved.",
                  ),
                  I(),
                  M(3, "a", 1),
                  qe(4, "img", 2),
                  I()());
              },
              styles: [
                "#footer[_ngcontent-%COMP%]{position:absolute;bottom:0;height:2.5rem;margin:20px}#github-logo[_ngcontent-%COMP%]{max-width:50%;max-height:50%;top:50%;left:50%}",
              ],
            }));
          }
          return e;
        })(),
        Y3 = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = xe({ type: e, bootstrap: [z3, W3, q3] }));
            static #n = (this.ɵinj = Ae({ imports: [fk, X2, c3, k3] }));
          }
          return e;
        })();
      dk()
        .bootstrapModule(Y3)
        .catch((e) => console.error(e));
    },
    321: () => {
      const ue = ":";
      class We extends Error {
        constructor(_) {
          super(`No translation found for ${Ki(_)}.`),
            (this.parsedMessage = _),
            (this.type = "MissingTranslationError");
        }
      }
      const _l = function (y, ..._) {
          if (_l.translate) {
            const E = _l.translate(y, _);
            (y = E[0]), (_ = E[1]);
          }
          let C = ld(y[0], y.raw[0]);
          for (let E = 1; E < y.length; E++) C += _[E - 1] + ld(y[E], y.raw[E]);
          return C;
        },
        im = ":";
      function ld(y, _) {
        return _.charAt(0) === im
          ? y.substring(
              (function Ds(y, _) {
                for (let C = 1, E = 1; C < y.length; C++, E++)
                  if ("\\" === _[E]) E++;
                  else if (y[C] === ue) return C;
                throw new Error(
                  `Unterminated $localize metadata block in "${_}".`,
                );
              })(y, _) + 1,
            )
          : y;
      }
      (() =>
        (typeof globalThis < "u" && globalThis) ||
        (typeof global < "u" && global) ||
        (typeof window < "u" && window) ||
        (typeof self < "u" &&
          typeof WorkerGlobalScope < "u" &&
          self instanceof WorkerGlobalScope &&
          self))().$localize = _l;
    },
  },
  (ue) => {
    var Vr = (Br) => ue((ue.s = Br));
    Vr(321), Vr(81);
  },
]);
