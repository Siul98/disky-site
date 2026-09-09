var hf = Object.defineProperty;
var pf = (e, t, n) => t in e ? hf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ke = (e, t, n) => pf(e, typeof t != "symbol" ? t + "" : t, n);
var bf = Object.defineProperty, uc = (e) => {
  throw TypeError(e);
}, gf = (e, t, n) => t in e ? bf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Ve = (e, t, n) => gf(e, typeof t != "symbol" ? t + "" : t, n), _c = (e, t, n) => t.has(e) || uc("Cannot " + n), I = (e, t, n) => (_c(e, t, "read from private field"), n ? n.call(e) : t.get(e)), ne = (e, t, n) => t.has(e) ? uc("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), De = (e, t, n, r) => (_c(e, t, "write to private field"), t.set(e, n), n);
function wi(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    if (e[n] < t[n])
      return -1;
    if (e[n] > t[n])
      return 1;
    n += 1;
  }
  return n !== t.length ? -1 : n !== e.length ? 1 : 0;
}
function rs(e) {
  const t = { ...e };
  return Object.setPrototypeOf(t, Object.getPrototypeOf(e)), t;
}
function _t(e, t, n) {
  if (e === void 0 ? t === void 0 ? (e = 0, t = 10) : e = t - 10 : t === void 0 && (t = e + 10), e > t) {
    const i = e;
    e = t, t = i;
  }
  const r = [], a = 1 / (n + 1);
  for (let i = 0; i < n; i++) {
    const c = e + (t - e) * (i + 0.75 + Math.random() * 0.5) * a;
    r.push(c);
  }
  return r;
}
function Ya(e) {
  return e instanceof Uint8Array || e instanceof Uint16Array || e instanceof Uint32Array || e instanceof Int8Array || e instanceof Int16Array || e instanceof Int32Array || e instanceof Float32Array || e instanceof Float64Array;
}
function mf() {
  return typeof process < "u";
}
function ai(e) {
  if (e.deepFreeze !== void 0) {
    e.deepFreeze(e);
    return;
  }
  const t = Object.getOwnPropertyNames(e);
  for (const n of t) {
    const r = e[n];
    r && typeof r == "object" && ai(r);
  }
  return Object.freeze(e);
}
class dc {
}
class en extends dc {
  constructor(t) {
    super(), this.id = t;
  }
}
class yi extends dc {
  constructor(t) {
    super(), this.data = t;
  }
}
var be = /* @__PURE__ */ ((e) => (e[e.Update = 0] = "Update", e))(be || {}), xe = /* @__PURE__ */ ((e) => (e[e.Add = 1] = "Add", e[e.Delete = 2] = "Delete", e[e.Unlink = 3] = "Unlink", e))(xe || {}), Re = /* @__PURE__ */ ((e) => (e[e.Add = 4] = "Add", e[e.Delete = 5] = "Delete", e[e.Move = 6] = "Move", e))(Re || {}), Me = /* @__PURE__ */ ((e) => (e[e.Add = 7] = "Add", e[e.Delete = 8] = "Delete", e[e.Move = 9] = "Move", e))(Me || {});
let Ie = class jr {
  // @ts-expect-error - this is a hack to make the type system happy
  modifyById(t, n) {
    const r = this;
    if (r[t] === void 0)
      throw new Error("not expected");
    {
      const a = { ...r, [t]: n };
      return Object.setPrototypeOf(a, jr.prototype), a;
    }
  }
  // @ts-expect-error - this is a hack to make the type system happy
  add(t, n) {
    return this.runOp({ type: xe.Add, id: t, data: n })?.data ?? this;
  }
  // @ts-expect-error - this is a hack to make the type system happy
  runOp(t) {
    const n = this;
    if (t.type === xe.Add) {
      const r = n[t.id];
      let a;
      r === void 0 ? a = { type: xe.Delete, id: t.id } : a = { type: xe.Add, id: t.id, data: r };
      const { id: i, data: c } = t, f = { ...n, [i]: c };
      return Object.setPrototypeOf(f, jr.prototype), {
        data: f,
        actual: t,
        reverse: a
      };
    } else if (t.type === xe.Delete) {
      const { id: r } = t, a = n[r];
      if (a === void 0)
        return null;
      {
        const i = { ...n };
        return Object.setPrototypeOf(i, jr.prototype), delete i[r], {
          data: i,
          actual: t,
          reverse: { type: xe.Add, id: r, data: a }
        };
      }
    }
    return null;
  }
};
class hc extends Error {
}
function pc(e, t) {
  for (const n of e)
    t(n.id, n.data) !== !0 && pc(n.children, t);
}
function bc(e, t) {
  if (t(e.id, e.data) !== !0)
    for (const n of e.children)
      bc(n, t);
}
let Ne = class ks extends Array {
  constructor(...t) {
    super(...t), Ve(this, "partialObjectCaches"), Ve(this, "objCaches"), Ve(this, "parentCaches"), Object.setPrototypeOf(this, ks.prototype);
  }
  deepFreeze() {
    let t = 0;
    for (; t < this.length; )
      ai(this[t]), t++;
  }
  fillCaches0(t, n) {
    this.objCaches.set(t.id, t), this.parentCaches.set(t.id, n);
    for (const r of t.children)
      this.fillCaches0(r, t.id);
  }
  fillCaches() {
    if (this.objCaches === void 0) {
      this.objCaches = /* @__PURE__ */ new Map(), this.parentCaches = /* @__PURE__ */ new Map();
      for (const t of this)
        this.fillCaches0(t, null);
    }
  }
  randomId() {
    this.fillCaches();
    const t = Array.from(this.objCaches.keys());
    if (t.length !== 0)
      return t[Math.max(0, Math.floor(Math.random() * t.length) - 1)];
  }
  nonExistOrDescendantOf(t, n) {
    if (!this.has(t))
      return !0;
    for (; t; ) {
      const r = this.parent(t);
      if (r === n) return !0;
      t = r;
    }
    return !1;
  }
  rootAcestor(t) {
    for (; t; ) {
      const n = this.parent(t);
      if (n)
        t = n;
      else
        return t;
    }
    return t;
  }
  isDescendantOf(t, n) {
    for (; t; ) {
      const r = this.parent(t);
      if (r === n) return !0;
      t = r;
    }
    return !1;
  }
  data(t) {
    return this.get(t)?.data;
  }
  has(t) {
    return this.childrenOf(t) !== void 0;
  }
  partialCache(t) {
    this.partialObjectCaches === void 0 && (this.partialObjectCaches = /* @__PURE__ */ new Map());
    const n = this.get(t);
    n !== void 0 && this.partialObjectCaches.set(t, n);
  }
  get(t) {
    if (this.partialObjectCaches !== void 0) {
      const n = this.partialObjectCaches.get(t);
      if (n !== void 0)
        return n;
    }
    return this.fillCaches(), this.objCaches.get(t);
  }
  childrenOf(t) {
    return t === null ? this : this.get(t)?.children;
  }
  traverseFrom(t, n) {
    if (t === null)
      this.traverse(n);
    else {
      const r = this.get(t);
      r && bc(r, n);
    }
  }
  traverse(t) {
    pc(this, t);
  }
  totalSize() {
    return this.fillCaches(), this.objCaches.size;
  }
  parent(t) {
    return this.fillCaches(), this.parentCaches.get(t);
  }
  childrenArray(t) {
    return t === null ? this : this.get(t).children;
  }
  modifyById(t, n) {
    if (this.get(t) === void 0)
      throw new Error("not expected");
    {
      const r = this.parent(t);
      let a = this.childrenArray(r);
      const i = a.findIndex((l) => l.id === t);
      if (i < 0) throw new Error("not expected");
      const c = a[i];
      a = [...a], a[i] = { ...c, data: n };
      const f = /* @__PURE__ */ new Map();
      return f.set(t, a[i]), this.modifyArrayBy(r, a, f);
    }
  }
  modifyArrayBy(t, n, r = void 0) {
    let a = t, i = n;
    for (; a !== null; ) {
      const f = i, l = a;
      if (a = this.parent(a), a === void 0) throw new Error();
      i = this.childrenArray(a);
      const d = i.findIndex((m) => m.id === l);
      if (d < 0) throw new Error();
      i = [...i], i[d] = { ...i[d], children: f }, r && r.set(l, i[d]);
    }
    Object.setPrototypeOf(i, ks.prototype);
    const c = i;
    if (r && this.objCaches !== void 0 && this.parentCaches !== void 0) {
      c.objCaches = this.objCaches;
      for (const [f, l] of r)
        c.objCaches.set(f, l);
      c.parentCaches = this.parentCaches, this.objCaches = void 0, this.parentCaches = void 0;
    } else
      c.fillCaches();
    return c;
  }
  runOp(t) {
    switch (t.type) {
      case Me.Add:
        return this.addOp(t);
      case Me.Delete:
        return this.deleteOp(t);
      case Me.Move:
        return this.moveOp(t);
    }
    return null;
  }
  checkDuplicatedIdRec({ id: t, children: n }) {
    if (this.get(t) !== void 0)
      return !0;
    for (const r of n)
      if (this.checkDuplicatedIdRec(r))
        return !0;
    return !1;
  }
  addOp(t) {
    const { parent: n, fi: r, id: a, data: i, children: c } = t;
    if (n !== null && this.get(n) === void 0 || this.checkDuplicatedIdRec(t))
      return null;
    {
      const f = n;
      let l = this.childrenArray(f);
      const d = { fi: r, id: a, data: i, children: c };
      return l = [...l, d], l.sort((m, y) => m.fi - y.fi), t.localIndex = l.indexOf(d), {
        data: this.modifyArrayBy(f, l),
        actual: t,
        reverse: { type: Me.Delete, id: a }
      };
    }
  }
  deleteOp(t) {
    const { id: n } = t;
    if (this.get(n) === null)
      return null;
    {
      const r = this.parent(n);
      if (r === void 0) return null;
      let a = this.childrenArray(r);
      const i = a.findIndex((f) => f.id === n);
      t.localIndex = i, a = [...a];
      const c = a.splice(i, 1)[0];
      return {
        data: this.modifyArrayBy(r, a),
        actual: t,
        reverse: { type: Me.Add, ...c, parent: r }
      };
    }
  }
  moveOp(t) {
    const { parent: n, fi: r, id: a } = t;
    if (n !== null && this.get(n) === void 0)
      return this.deleteOp({ type: Me.Delete, id: a });
    if (n !== null) {
      let x = n;
      for (; x !== null; ) {
        if (x === void 0) throw new Error();
        if (x === a)
          throw new hc("cyclic tree");
        x = this.parent(x);
      }
    }
    let i = this.parent(a);
    if (i === void 0)
      return null;
    const c = i;
    let f = this.childrenArray(i);
    const l = f.findIndex((x) => x.id === a);
    f = [...f];
    let d = f.splice(l, 1)[0], m = this.modifyArrayBy(i, f);
    i = n, f = m.childrenArray(i);
    const y = d.fi;
    return d = { ...d, fi: r }, f = [...f, d], f.sort((x, L) => x.fi - L.fi), t.localIndex = f.indexOf(d), m = m.modifyArrayBy(i, f), {
      data: m,
      actual: t,
      reverse: { type: Me.Move, parent: c, fi: y, id: a }
    };
  }
  /**
   * previous id of a given object, if null or not find, return the last object id if not empty
   */
  previous(t, n) {
    if (n === null) {
      const a = this.childrenArray(t);
      return a.length === 0 ? null : a[a.length - 1].id;
    }
    let r = null;
    for (const a of this.childrenArray(t)) {
      if (a.id === n)
        return r;
      r = a.id;
    }
    return null;
  }
  traverseSortNext(t) {
    const n = this.parent(t);
    if (n !== void 0) {
      const r = this.childrenArray(n), a = r.findIndex((i) => i.id === t) + 1;
      if (a < r.length) return r[a].id;
      if (n) return this.traverseSortNext(n);
    }
  }
  /**
   * return next id by preorder traversal
   */
  sortNext(t) {
    const n = this.childrenArray(t);
    return n.length > 0 ? n[0].id : this.traverseSortNext(t);
  }
  traverseSortPrevious(t) {
    const n = this.childrenArray(t);
    return n.length > 0 ? this.traverseSortPrevious(n[n.length - 1].id) : t;
  }
  /**
   * return previous id by preorder traversal
   */
  sortPrevious(t) {
    const n = this.parent(t);
    if (n !== void 0) {
      const r = this.childrenArray(n), a = r.findIndex((i) => i.id === t) - 1;
      return a >= 0 ? this.traverseSortPrevious(r[a].id) : n;
    }
  }
  /**
   * get objects by the order they appear visually in object tree
   * if object doesn't exist, it is omitted
   */
  getAllSorted(t) {
    const n = [];
    for (const r of t) {
      const a = this.getWithSortKey(r.id);
      a !== void 0 && n.push({ ...r, ...a });
    }
    n.sort((r, a) => wi(r.sortKey, a.sortKey));
    for (const r of n)
      delete r.sortKey;
    return n;
  }
  getAllIdSorted(t) {
    const n = [];
    for (const r of t) {
      const a = this.getWithSortKey(r);
      a !== void 0 && n.push(a);
    }
    n.sort((r, a) => wi(r.sortKey, a.sortKey));
    for (const r of n)
      delete r.sortKey;
    return n.map((r) => r.id);
  }
  /**
   * return the item and the indexes to get to the item from root to the item
   */
  getWithSortKey(t) {
    let n = t;
    const r = [];
    let a = this.get(n);
    const i = a;
    if (a !== void 0) {
      for (; n; )
        r.splice(0, 0, a.fi), n = this.parent(n), n !== null && (a = this.get(n));
      return { ...i, sortKey: r };
    }
  }
  insertBeforeHelper(t, n, r) {
    return this.insertAfterHelper(t, this.previous(t, n), r);
  }
  insertAfterHelper(t, n, r) {
    const a = this.childrenArray(t);
    if (n === null) {
      if (a.length === 0)
        return _t(0, r, r);
      {
        const i = a[0].fi;
        return _t(i - r, i, r);
      }
    } else {
      const i = this.get(n);
      if (i === void 0 || this.parent(n) !== t)
        throw new Error("illegal args");
      const c = a.find((f) => f.fi > i.fi);
      if (c === void 0) {
        const f = a[a.length - 1].fi;
        return _t(f, f + r, r);
      } else
        return _t(i.fi, c.fi, r);
    }
  }
}, as = null;
var tn;
((e) => {
  function t(a) {
    as = a;
  }
  e.setPreservePrototype = t;
  function n(a, i) {
    return Object.getPrototypeOf(a) === as && Object.setPrototypeOf(i, as), i;
  }
  e.tryPreservePrototype = n;
  function r(a, i) {
    if (i.type !== be.Update)
      return null;
    if (Array.isArray(a)) {
      const c = i.props, f = {}, l = [...a];
      let d = !1;
      if (c)
        for (const m of Object.keys(c)) {
          const y = parseInt(m);
          if (isNaN(y))
            throw new Error("wrong index");
          f[m] = l[y], l[y] = c[m], d = !0;
        }
      return d ? {
        data: l,
        actual: i,
        reverse: {
          type: be.Update,
          props: f
        }
      } : null;
    } else {
      const c = i.props, f = {}, l = { ...a };
      let d = !1;
      if (c)
        for (const m of Object.keys(c)) {
          f[m] = l[m];
          const y = c[m];
          y === void 0 ? delete l[m] : l[m] = y, d = !0;
        }
      return d ? {
        data: e.tryPreservePrototype(a, l),
        actual: i,
        reverse: {
          type: be.Update,
          props: f
        }
      } : null;
    }
  }
  e.runOp = r;
})(tn || (tn = {}));
let Ae = class Ss extends Array {
  constructor(...t) {
    super(...t), Ve(this, "objCaches"), Object.setPrototypeOf(this, Ss.prototype);
  }
  deepFreeze() {
    let t = 0;
    for (; t < this.length; )
      ai(this[t]), t++;
  }
  fillCaches0(t) {
    this.objCaches.set(t.id, t);
  }
  fillCaches() {
    if (this.objCaches === void 0) {
      this.objCaches = /* @__PURE__ */ new Map(), Object.getOwnPropertyDescriptor(this, "objCaches").enumerable = !1;
      for (const t of this)
        this.fillCaches0(t);
    }
  }
  randomId() {
    this.fillCaches();
    const t = Array.from(this.objCaches.keys());
    if (t.length !== 0)
      return t[Math.max(0, Math.floor(Math.random() * t.length) - 1)];
  }
  data(t) {
    return this.get(t)?.data;
  }
  get(t) {
    return this.fillCaches(), this.objCaches.get(t);
  }
  modifyById(t, n) {
    if (this.get(t) === void 0)
      throw new Error("not expected");
    {
      let r = this;
      const a = r.findIndex((c) => c.id === t);
      if (a < 0) throw new Error("not expected");
      const i = r[a];
      return r = [...r], r[a] = { ...i, data: n }, this.modifyArrayBy(r);
    }
  }
  modifyArrayBy(t) {
    Object.setPrototypeOf(t, Ss.prototype);
    const n = t;
    return mf() || n.fillCaches(), n;
  }
  runOp(t) {
    switch (t.type) {
      case Re.Add:
        return this.addOp(t);
      case Re.Delete:
        return this.deleteOp(t);
      case Re.Move:
        return this.moveOp(t);
    }
    return null;
  }
  addOp(t) {
    const { fi: n, id: r, data: a } = t;
    let i = this;
    const c = { fi: n, id: r, data: a };
    return i = [...i, c], i.sort((f, l) => f.fi - l.fi), t.localIndex = i.indexOf(c), {
      data: this.modifyArrayBy(i),
      actual: t,
      reverse: { type: Re.Delete, id: r }
    };
  }
  deleteOp(t) {
    const { id: n } = t;
    let r = this;
    const a = r.findIndex((c) => c.id === n);
    if (a === -1) return null;
    t.localIndex = a, r = [...r];
    const i = r.splice(a, 1)[0];
    return {
      data: this.modifyArrayBy(r),
      actual: t,
      reverse: { type: Re.Add, ...i }
    };
  }
  moveOp(t) {
    const { fi: n, id: r } = t;
    let a = this;
    a = [...a];
    const i = a.findIndex((l) => l.id === r);
    if (i === -1)
      return null;
    const c = a[i].fi, f = { ...a[i], fi: n };
    return a[i] = f, a.sort((l, d) => l.fi - d.fi), t.localIndex = a.indexOf(f), {
      data: this.modifyArrayBy(a),
      actual: t,
      reverse: { type: Re.Move, fi: c, id: r }
    };
  }
  /**
   * previous id of a given object, if null or not find, return the last object id if not empty
   */
  previous(t) {
    if (t === null)
      return this.length === 0 ? null : this[this.length - 1].id;
    let n = null;
    for (const r of this) {
      if (r.id === t)
        return n;
      n = r.id;
    }
    return null;
  }
  insertBeforeHelper(t, n) {
    return this.insertAfterHelper(this.previous(t), n);
  }
  insertAfterHelper(t, n) {
    const r = this;
    if (t === null) {
      if (r.length === 0)
        return _t(0, n, n);
      {
        const a = r[0].fi;
        return _t(a - n, a, n);
      }
    } else {
      const a = this.get(t);
      if (a === void 0)
        throw new Error("illegal args");
      const i = r.find((c) => c.fi > a.fi);
      if (i === void 0) {
        const c = r[r.length - 1].fi;
        return _t(c, c + n, n);
      } else
        return _t(a.fi, i.fi, n);
    }
  }
};
function wf(e, t) {
  const n = { cur: [], result: [], len: 0 };
  return e = Hn(e, t, n) ?? e, [e, n.result];
}
function Xr(e, t) {
  return e === null ? null : (e.cur[e.len] = t, e.len += 1, e);
}
function ea(e) {
  e && (e.len -= 1);
}
function yf(e) {
  if (e === null)
    return null;
  e.result.push(e.cur.slice(0, e.len));
}
function gc(e, t, n) {
  let r = !1;
  const a = e.map((i) => {
    let c = i.id;
    const f = t[c];
    if (f !== void 0 && typeof f == "string" && (r = !0, c = f, n !== null))
      throw new Error("not supported");
    let l = Hn(i.data, t, Xr(n, c));
    ea(n), r = r || l !== void 0, l === void 0 && (l = i.data);
    let d = gc(i.children, t, n);
    return d !== void 0 ? r = !0 : d = i.children, { ...i, id: c, data: l, children: d };
  });
  if (r)
    return a;
}
function vf(e, t, n) {
  let r = !1;
  const a = e.map((i) => {
    let c = i.id;
    const f = t[c];
    if (f !== void 0 && typeof f == "string" && (r = !0, c = f, n !== null))
      throw new Error("not supported");
    let l = Hn(i.data, t, Xr(n, c));
    return ea(n), r = r || l !== void 0, l === void 0 && (l = i.data), { ...i, id: c, data: l };
  });
  if (r)
    return Object.setPrototypeOf(a, Object.getPrototypeOf(e)), a;
}
function Hn(e, t, n) {
  if (e instanceof Ne) {
    const r = gc(e, t, n);
    return r !== void 0 && Object.setPrototypeOf(r, Object.getPrototypeOf(e)), r;
  } else {
    if (e instanceof Ae)
      return vf(e, t, n);
    if (Array.isArray(e)) {
      let r = !1;
      const a = e.map((i, c) => {
        let f = Hn(i, t, Xr(n, c));
        return ea(n), r = r || f !== void 0, f === void 0 && (f = i), f;
      });
      return r ? (Object.setPrototypeOf(a, Object.getPrototypeOf(e)), a) : void 0;
    } else if (e && typeof e == "object" && !Ya(e)) {
      const r = {};
      let a = !1;
      for (let [i, c] of Object.entries(e))
        if (i !== "name" && i !== "variableId") {
          const f = t[i];
          if (typeof f == "string") {
            if (n !== null)
              throw new Error("not supported");
            a = !0, i = f;
          }
          let l = Hn(c, t, Xr(n, i));
          ea(n), a = a || l !== void 0, l === void 0 && (l = c), r[i] = l;
        } else
          r[i] = c;
      return a ? (Object.setPrototypeOf(r, Object.getPrototypeOf(e)), r) : void 0;
    } else if (typeof e == "string") {
      const r = t[e];
      return r !== void 0 && yf(n), r;
    } else
      return;
  }
}
function nn(e) {
  return e && typeof e == "object" && e instanceof Ue;
}
class Ue {
  unusedFunOverridesTable(t) {
  }
  runOp(t) {
    const n = [];
    let r = this, a = 0;
    const i = {};
    for (; a < t.path.length; ) {
      if (n.push(r), r = r === void 0 ? void 0 : r[t.path[a]], r !== void 0 && !nn(r))
        return null;
      a += 1;
    }
    r = r ? rs(r) : new Ue();
    for (const [l, d] of Object.entries(t.props)) {
      const m = r[l];
      i[l] = m, d === void 0 ? delete r[l] : r[l] = d;
    }
    for (; a > 0; ) {
      if (Object.keys(r).length === 0) {
        const l = n[a - 1];
        l && (r = rs(l), delete r[t.path[a - 1]]);
      } else {
        const l = n[a - 1];
        if (l) {
          const d = rs(l);
          d[t.path[a - 1]] = r, r = d;
        } else {
          const d = new Ue();
          d[t.path[a - 1]] = r, r = d;
        }
      }
      a -= 1;
    }
    const c = Object.setPrototypeOf(r, Ue.prototype), f = { ...t, props: i };
    return { data: c, actual: t, reverse: f };
  }
}
var xs;
((e) => {
  function t(a, i) {
    return Gn(a, i) ?? a;
  }
  e.apply = t;
  function n(a, i) {
    return oi(a, i);
  }
  e.merge = n;
  function r(a, i) {
    let c = 0;
    const f = i.path;
    let l = a;
    for (; c < f.length && l !== void 0; ) {
      if (l = $e.zoomOnce(l, f[c]), l === void 0)
        return i;
      if (!nn(l))
        return;
      c += 1;
    }
    if (l === void 0)
      return i;
    if (nn(l))
      if (i.type === be.Update) {
        const d = { ...i.props };
        for (const m of Object.keys(l))
          delete d[m];
        return { ...i, props: d };
      } else if (i.type === xe.Add || i.type === Re.Add || i.type === Me.Add) {
        const d = si([i], l);
        return d ? d[0] : i;
      } else
        return i;
  }
  e.filterOp = r;
})(xs || (xs = {}));
function si(e, t) {
  if (t === void 0)
    return;
  let n = !1;
  const r = e.map((a) => {
    const i = a.id;
    let c = Gn(a.data, t[i]);
    if (n = n || c !== void 0, c === void 0 && (c = a.data), a.children) {
      let f = si(a.children, t);
      return f !== void 0 ? n = !0 : f = a.children, { ...a, id: i, data: c, children: f };
    } else
      return { ...a, id: i, data: c };
  });
  if (n)
    return r;
}
function kf(e, t) {
  if (t === void 0)
    return;
  let n = !1;
  const r = e.map((a) => {
    const i = a.id;
    let c = Gn(a.data, t[i]);
    return n = n || c !== void 0, c === void 0 && (c = a.data), { ...a, id: i, data: c };
  });
  if (n)
    return Object.setPrototypeOf(r, Object.getPrototypeOf(e)), r;
}
function Gn(e, t) {
  if (!nn(t))
    return t;
  if (e instanceof Ne) {
    const n = si(e, t);
    return n !== void 0 && Object.setPrototypeOf(n, Object.getPrototypeOf(e)), n;
  } else {
    if (e instanceof Ae)
      return kf(e, t);
    if (Array.isArray(e)) {
      let n = !1;
      const r = e.map((a, i) => {
        let c = Gn(a, t[i]);
        return n = n || c !== void 0, c === void 0 && (c = a), c;
      });
      return n ? (Object.setPrototypeOf(r, Object.getPrototypeOf(e)), r) : void 0;
    } else {
      if (e instanceof Ue)
        return oi(e, t);
      if (e && typeof e == "object") {
        const n = {};
        let r = !1;
        for (const [a, i] of Object.entries(e)) {
          let c = Gn(i, t[a]);
          r = r || c !== void 0, c === void 0 && (c = i), n[a] = c;
        }
        return r ? (Object.setPrototypeOf(n, Object.getPrototypeOf(e)), n) : void 0;
      }
    }
  }
}
function oi(e, t) {
  if (e === void 0)
    return t;
  if (t === void 0)
    return e;
  if (!nn(t))
    return t;
  if (!nn(e))
    return xs.apply(e, t);
  const n = /* @__PURE__ */ new Set();
  for (const a of Object.keys(e))
    n.add(a);
  for (const a of Object.keys(t))
    n.add(a);
  const r = new Ue();
  for (const a of n) {
    const i = oi(
      e === void 0 ? void 0 : e[a],
      t === void 0 ? void 0 : t[a]
    );
    r[a] = i;
  }
  return r;
}
var vi;
((e) => {
  function t(n, r) {
    const a = $e.zoom(r, n.path);
    if (typeof a == "object") {
      const i = {};
      for (const c of Object.keys(n.props))
        i[c] = a[c];
      return { ...n, props: i };
    } else
      return { ...n, props: {} };
  }
  e.replaceProps = t;
})(vi || (vi = {}));
var Dt;
((e) => {
  function t(l, d) {
    return {
      ...l,
      path: l.path.slice(d)
    };
  }
  e.drop = t;
  function n(l, d) {
    return r(l, d)?.data ?? l;
  }
  e.applySimple = n;
  function r(l, d) {
    const m = d.path, y = [];
    for (; ; ) {
      let x;
      if (l instanceof Ue && d.type === be.Update && (x = l.runOp({
        ...d,
        path: m.slice(y.length)
      }), x === null && (x = void 0)), x === void 0 && y.length === m.length && (l instanceof Ne || l instanceof Ae || l instanceof Ie ? x = l.runOp(d) : x = tn.runOp(l, d)), x !== void 0)
        if (x !== null) {
          let R = x.data;
          for (let de = y.length - 1; de >= 0; de--) {
            let G = m[de];
            const se = y[de];
            if (se instanceof Ne) {
              if (typeof G == "number")
                throw new Error("illegal arg");
              R = se.modifyById(G, R);
            } else if (se instanceof Ae) {
              if (typeof G == "number")
                throw new Error("illegal arg");
              R = se.modifyById(G, R);
            } else if (se instanceof Ie) {
              if (typeof G == "number")
                throw new Error("illegal arg");
              R = se.modifyById(G, R);
            } else if (se instanceof Ue) {
              const ge = { ...se, [G]: R };
              R = Object.setPrototypeOf(ge, Ue.prototype);
            } else if (typeof se == "object")
              if (Array.isArray(se)) {
                if (typeof G == "string" && (G = parseInt(G), isNaN(G)))
                  throw new Error("Invalid path");
                const ge = R;
                R = [...se], R[G] = ge;
              } else
                R = tn.tryPreservePrototype(se, { ...se, [G]: R });
            else
              return null;
          }
          return {
            data: R,
            actual: { ...x.actual, path: m },
            reverse: { ...x.reverse, path: m }
          };
        } else
          return null;
      const L = m[y.length];
      let N;
      if (l instanceof Ne) {
        if (typeof L == "number") throw new Error("");
        N = l.get(L)?.data;
      } else if (l instanceof Ae) {
        if (typeof L == "number") throw new Error("");
        N = l.get(L)?.data;
      } else l !== null && (N = l[L]);
      if (N !== void 0)
        y.push(l), l = N;
      else
        return null;
    }
  }
  e.apply = r;
  function a(l, d) {
    for (let m = 0; m < l.length && m < d.length; m++)
      if (l[m] !== d[m])
        return !0;
    return !1;
  }
  e.pathDisjoint = a;
  function i(l, d) {
    if (l.length !== d.length) return !1;
    for (let m = 0; m < l.length; m++)
      if (l[m] !== d[m])
        return !1;
    return !0;
  }
  e.pathEq = i;
  function c(l, d) {
    return a(l.path, d.path);
  }
  e.commutative = c;
  function f(l, d) {
    return l.type === be.Update && d.type === be.Update && i(l.path, d.path) ? Object.keys(l.props).every((m) => d.props[m] !== void 0) : !1;
  }
  e.subsumed = f;
})(Dt || (Dt = {}));
var ta;
((e) => {
  function t() {
    return [];
  }
  e.empty = t;
  function n(d, m) {
    const y = [];
    for (const x of d) {
      const [L, ...N] = x.path;
      L === m && y.push({ ...x, path: N });
    }
    return y;
  }
  e.removePrefix = n;
  function r(d, m) {
    return d.map((y) => ({ ...y, path: [m, ...y.path] }));
  }
  e.addPrefix = r;
  function a(d, m) {
    return [...d, ...m];
  }
  e.concat = a;
  function i(d, m) {
    return [...d.filter((y) => !m.some((x) => Dt.subsumed(y, x))), ...m];
  }
  e.compress = i;
  function c(d, m) {
    return d.every((y) => m.every((x) => Dt.commutative(y, x)));
  }
  e.commutative = c;
  function f(d, m) {
    for (const y of m) {
      const x = l(d, y);
      x !== null && (d = x.data);
    }
    return d;
  }
  e.applyAll = f;
  function l(d, m) {
    let y = d;
    const x = [], L = [];
    for (const N of m)
      try {
        if (N.type === xe.Unlink || N.type === Re.Delete && N.path[N.path.length - 1] === "variables") {
          let R, de, G;
          if (N.type === xe.Unlink ? (R = $e.zoom(y, [...N.path, N.id]), G = Dt.apply(y, { ...N, type: xe.Delete })) : (R = $e.zoom(y, [...N.path, N.id, "value"]), G = Dt.apply(y, N)), G !== null) {
            y = G.data;
            const [se, ge] = wf(y, {
              [N.id]: R
            });
            y = se;
            for (let q = 0; q < ge.length; q++) {
              const he = ge[q];
              let ye = he.pop();
              if (typeof ye == "number") {
                const Pe = [ye];
                for (let ie = q + 1; ie < ge.length; ie++) {
                  const ve = ge[ie], wn = ve[ve.length - 1];
                  if (typeof wn == "number" && $e.equal(he, ve.slice(0, ve.length - 1)))
                    Pe.push(wn), ge.splice(ie, 1);
                  else
                    break;
                }
                const Fe = $e.zoom(y, he);
                de = Fe.map((ie, ve) => Pe.includes(ve) ? N.id : ie), R = Fe, ye = he.pop();
              } else {
                if (ye === "alphaOverride" || ye === "alpha") {
                  R /= 100;
                  const Pe = R, Fe = $e.zoom(y, he.slice(0, he.length - 2)), ie = Fe.layers.map((ve) => ve.id === he[he.length - 1] ? {
                    ...ve,
                    data: { ...ve.data, [ye]: Pe }
                  } : ve);
                  Object.setPrototypeOf(ie, Object.getPrototypeOf(Fe.layers)), Fe.layers = ie;
                }
                de = N.id;
              }
              x.push({
                type: be.Update,
                path: he,
                props: { [ye]: R }
              }), L.push({
                type: be.Update,
                path: he,
                props: { [ye]: de }
              });
            }
            L.push(G.reverse), x.push(G.actual);
          }
        } else {
          const R = Dt.apply(y, N);
          R !== null && (x.push(R.actual), y = R.data, L.push(R.reverse));
        }
      } catch (R) {
        if (R instanceof hc)
          return null;
        throw R;
      }
    return { data: y, actual: x, reverse: L.reverse() };
  }
  e.apply = l;
})(ta || (ta = {}));
const ii = Symbol(), Sf = Symbol(), Xa = Symbol();
class Ir {
  reportOp(t, n, r = []) {
    let a = this;
    if (n === null)
      return;
    a._current = n.data;
    const i = r;
    for (; !(a instanceof Ef); ) {
      const c = a._path, f = a._current;
      if (c !== "" && i.splice(0, 0, c), a = a._parent, a === null)
        return;
      a.update(c, f);
    }
    a.push(i, t, n.actual, n.reverse);
  }
  deleteChildren(t) {
    if (this._children) {
      const n = this._children[t];
      if (n) {
        const r = n[Xa];
        r && r(), delete this._children[t];
      }
    }
  }
}
class xf extends Ir {
  constructor(t, n, r) {
    super(), this._parent = t, this._path = n, this._current = r;
  }
  update(t, n) {
    if (Array.isArray(this._current)) {
      if (typeof t == "string" && (t = parseInt(t), isNaN(t)))
        throw new Error("Invalid path");
      this._current = [...this._current], this._current[t] = n;
    } else
      this._current = tn.tryPreservePrototype(this._current, { ...this._current, [t]: n });
  }
  runOp(t) {
    this.reportOp(t, tn.runOp(this._current, t), t.path);
  }
}
class Af extends Ir {
  constructor(t, n, r) {
    super(), this._parent = t, this._path = n, this._current = r;
  }
  update(t, n) {
    this._current = { ...this._current, [t]: n }, Object.setPrototypeOf(this._current, Ie.prototype);
  }
  runOp(t) {
    this.reportOp(t, this._current.runOp(t));
  }
}
const mc = {
  get(e, t) {
    if (t === Xa)
      return () => {
        e._parent = null;
      };
    if (t === ii)
      return e._current;
    if (t === Sf)
      return e;
    let { _current: n, _children: r } = e;
    if (t === "push" && Array.isArray(n))
      throw new Error("not supported to expand array");
    const a = r === void 0 ? void 0 : r[t];
    if (a !== void 0)
      return a;
    const i = n[t], c = ci(e, t, i);
    return c !== i ? (r === void 0 && (r = {}, e._children = r), r[t] = c, c) : i;
  },
  has(e, t) {
    return t in e._current;
  },
  ownKeys(e) {
    return Reflect.ownKeys(e._current);
  },
  defineProperty() {
    throw Error("not supported");
  },
  getPrototypeOf(e) {
    return Object.getPrototypeOf(e._current);
  },
  setPrototypeOf() {
    throw Error("not supported");
  },
  getOwnPropertyDescriptor(e, t) {
    const n = e._current, r = Reflect.getOwnPropertyDescriptor(n, t);
    return r && {
      writable: !0,
      configurable: !0,
      enumerable: r.enumerable,
      value: n[t]
    };
  }
}, Of = {
  ...mc,
  set(e, t, n) {
    const r = {
      type: be.Update,
      props: { [t]: fi(n) ?? n }
    };
    return e.deleteChildren(t), e.runOp(r), !0;
  },
  deleteProperty(e, t) {
    const n = { type: be.Update, props: { [t]: void 0 } };
    return e.deleteChildren(t), e.runOp(n), !0;
  }
}, Df = {
  ...mc,
  set(e, t, n) {
    return n === void 0 ? this.deleteProperty(e, t) : (e.deleteChildren(t), e.runOp({ type: xe.Add, id: t, data: n })), !0;
  },
  deleteProperty(e, t) {
    return e.runOp({ type: xe.Delete, id: t }), !0;
  }
};
class Pr extends Ir {
  constructor(t, n, r) {
    super(), this._children = {}, this._parent = t, this._path = n, this._current = r, this[Xa] = () => {
      this._parent = null;
    };
  }
  unproxy() {
    return this._current;
  }
  update(t, n) {
    this._current = this._current.modifyById(t, n);
  }
  runOp(t) {
    this.reportOp(t, this._current.runOp(t));
  }
  randomId() {
    return this._current.randomId();
  }
  isDescendantOf(t, n) {
    return this._current.isDescendantOf(t, n);
  }
  childrenOf(t) {
    return this._current.childrenOf(t);
  }
  // traverse(map) {
  // 	return this._current.traverse(map);
  // }
  get(t) {
    return this._current.get(t);
  }
  parent(t) {
    return this._current.parent(t);
  }
  traverse(t) {
    this._current.traverse((n, r) => {
      t(n, this.data(n));
    });
  }
  data(t) {
    let { _current: n, _children: r } = this;
    const a = r === void 0 ? void 0 : r[t];
    if (a !== void 0)
      return a;
    const i = n.get(t)?.data, c = ci(this, t, i);
    return c !== i ? (r === void 0 && (r = {}, this._children = r), r[t] = c, c) : i;
  }
  add(t, n, r, a, i) {
    this.runOp({ type: Me.Add, parent: t, fi: n, id: r, data: a, children: i });
  }
  move(t, n, r) {
    this.runOp({ type: Me.Move, parent: t, fi: n, id: r });
  }
  insertAfter(t, n, r) {
    const a = this._current.insertAfterHelper(t, n, r.length);
    for (let i = 0; i < r.length; i++) {
      const c = r[i];
      this.add(t, a[i], c.id, c.data, c.children);
    }
  }
  insertBefore(t, n, r) {
    const a = this._current.insertBeforeHelper(t, n, r.length);
    for (let i = 0; i < r.length; i++) {
      const c = r[i];
      this.add(t, a[i], c.id, c.data, c.children);
    }
  }
  moveAfter(t, n, r) {
    const a = this._current.insertAfterHelper(t, n, r.length);
    for (let i = 0; i < r.length; i++) {
      const c = r[i];
      this.move(t, a[i], c);
    }
  }
  moveBefore(t, n, r) {
    const a = this._current.insertBeforeHelper(t, n, r.length);
    for (let i = 0; i < r.length; i++) {
      const c = r[i];
      this.move(t, a[i], c);
    }
  }
  delete(t) {
    this.deleteChildren(t), this.runOp({ type: Me.Delete, id: t });
  }
  sortNext(t) {
    return this._current.sortNext(t);
  }
  sortPrevious(t) {
    return this._current.sortPrevious(t);
  }
  getAllSorted(t) {
    return this._current.getAllSorted(t);
  }
}
class Cr extends Ir {
  constructor(t, n, r) {
    super(), this._children = {}, this._parent = t, this._path = n, this._current = r, this[Xa] = () => {
      this._parent = null;
    };
  }
  unproxy() {
    return this._current;
  }
  get length() {
    return this._current.length;
  }
  forEach(t) {
    const n = this.length;
    for (let r = 0; r < n; r++) {
      const a = this._current[r].id, i = this._current[r].fi;
      t(this.data(this._current[r].id), a, i, r);
    }
  }
  find(t) {
    const n = this.length;
    for (let r = 0; r < n; r++) {
      const a = this._current[r].id;
      if (t(this.data(a), a))
        return this.get(a);
    }
  }
  update(t, n) {
    this._current = this._current.modifyById(t, n);
  }
  randomId() {
    return this._current.randomId();
  }
  get(t) {
    return { ...this._current.get(t), data: this.data(t) };
  }
  at(t) {
    const { id: n, fi: r } = this._current.at(t);
    return { id: n, fi: r, data: this.data(n) };
  }
  data(t) {
    let { _current: n, _children: r } = this;
    const a = r === void 0 ? void 0 : r[t];
    if (a !== void 0)
      return a;
    const i = n.get(t)?.data, c = ci(this, t, i);
    return c !== i ? (r === void 0 && (r = {}, this._children = r), r[t] = c, c) : i;
  }
  runOp(t) {
    this.reportOp(t, this._current.runOp(t));
  }
  add(t, n, r) {
    this.runOp({ type: Re.Add, fi: t, id: n, data: r });
  }
  move(t, n) {
    this.runOp({ type: Re.Move, fi: t, id: n });
  }
  insertAfter(t, n) {
    const r = this._current.insertAfterHelper(t, n.length);
    for (let a = 0; a < n.length; a++) {
      const i = n[a];
      this.add(r[a], i.id, i.data);
    }
  }
  insertBefore(t, n) {
    const r = this._current.insertBeforeHelper(t, n.length);
    for (let a = 0; a < n.length; a++) {
      const i = n[a];
      this.add(r[a], i.id, i.data);
    }
  }
  moveAfter(t, n) {
    const r = this._current.insertAfterHelper(t, n.length);
    for (let a = 0; a < n.length; a++) {
      const i = n[a];
      this.move(r[a], i);
    }
  }
  moveBefore(t, n) {
    const r = this._current.insertBeforeHelper(t, n.length);
    for (let a = 0; a < n.length; a++) {
      const i = n[a];
      this.move(r[a], i);
    }
  }
  delete(t) {
    this.deleteChildren(t), this.runOp({ type: Re.Delete, id: t });
  }
}
function ss(e, t, n) {
  if (e.length > 0) {
    const r = e[e.length - 1];
    if (r.type === be.Update && t.type === be.Update && $e.equal(r.path, n)) {
      Object.assign(r.props, t.props);
      return;
    }
  }
  e.push({ ...t, path: n });
}
class Ef extends Ir {
  constructor(t) {
    super(), this.ts = [], this.actual = [], this.reverse = [], this._current = t;
  }
  update(t, n) {
    if (t !== "")
      throw new Error("");
    this._current = n;
  }
  push(t, n, r, a) {
    ss(this.ts, n, t), ss(this.actual, r, t), ss(this.reverse, a, t);
  }
  result() {
    return {
      data: this._current,
      ts: this.ts,
      actual: this.actual,
      reverse: this.reverse.reverse()
    };
  }
}
function ci(e, t, n) {
  return n instanceof Ne ? new Pr(e, t, n) : n instanceof Ae ? new Cr(e, t, n) : n instanceof Ie ? new Proxy(new Af(e, t, n), Df) : n !== null && typeof n == "object" ? Ya(n) ? n : new Proxy(new xf(e, t, n), Of) : n;
}
function fi(e) {
  return e instanceof Pr || e instanceof Cr ? e._current : e !== null && typeof e == "object" ? e[ii] : e;
}
function Br(e) {
  if (e instanceof Pr || e instanceof Cr)
    return e._current;
  if (e !== null && typeof e == "object") {
    const t = e[ii];
    return t !== void 0 ? t : e;
  } else
    return e;
}
var $e;
((e) => {
  function t(c, f) {
    if (f.length === c.length) {
      let l = 0;
      for (; l < c.length; ) {
        if (c[l] !== f[l]) return !1;
        l += 1;
      }
    } else
      return !1;
    return !0;
  }
  e.equal = t;
  function n(c, f, l) {
    const d = a(l, c);
    if (d !== void 0 && typeof d == "object" && d !== null) {
      const m = { ...f };
      return Object.keys(d).forEach((y) => {
        delete m[y];
      }), m;
    } else
      return f;
  }
  e.removeOverridden = n;
  function r(c, f) {
    if ((c instanceof Ne || c instanceof Pr) && typeof f == "string" || (c instanceof Ae || c instanceof Cr) && typeof f == "string")
      return c.data(f);
    if (typeof f == "number" && Array.isArray(c) || typeof f == "string" && typeof c == "object" && c !== null)
      return c[f];
  }
  e.zoomOnce = r;
  function a(c, f, l = 0) {
    for (; l < f.length && c !== void 0; )
      c = r(c, f[l]), l += 1;
    return c;
  }
  e.zoom = a;
  function i(c, f) {
    const l = [];
    function d(m, y) {
      if (m instanceof en && m.id === f.id)
        l.push(y);
      else if (m instanceof Ae)
        for (let x = 0; x < m.length; x++)
          d(m[x].data, [...y, m[x].id]);
      else if (m instanceof Ne)
        m.traverse((x, L) => {
          d(x, [...y, L]);
        });
      else if (Array.isArray(m))
        for (let x = 0; x < m.length; x++)
          d(m[x], [...y, x]);
      else {
        if (Ya(m))
          return;
        if (typeof m == "object" && m !== null)
          for (const x in m)
            d(m[x], [...y, x]);
      }
    }
    return d(c, []), l;
  }
  e.findPathes = i;
})($e || ($e = {}));
var As;
try {
  As = new TextDecoder();
} catch {
}
var O, Je, _ = 0, X = {}, H, dt, Te = 0, Ze = 0, le, et, we = [], W, ki = {
  useRecords: !1,
  mapsAsObjects: !0
};
class wc {
}
const yc = new wc();
yc.name = "MessagePack 0xC1";
var ht = !1, Si = 2, If;
class rn {
  constructor(t) {
    t && (t.useRecords === !1 && t.mapsAsObjects === void 0 && (t.mapsAsObjects = !0), t.sequential && t.trusted !== !1 && (t.trusted = !0, !t.structures && t.useRecords != !1 && (t.structures = [], t.maxSharedStructures || (t.maxSharedStructures = 0))), t.structures ? t.structures.sharedLength = t.structures.length : t.getStructures && ((t.structures = []).uninitialized = !0, t.structures.sharedLength = 0), t.int64AsNumber && (t.int64AsType = "number")), Object.assign(this, t);
  }
  unpack(t, n) {
    if (O)
      return Oc(() => (Ds(), this ? this.unpack(t, n) : rn.prototype.unpack.call(ki, t, n)));
    !t.buffer && t.constructor === ArrayBuffer && (t = typeof Buffer < "u" ? Buffer.from(t) : new Uint8Array(t)), typeof n == "object" ? (Je = n.end || t.length, _ = n.start || 0) : (_ = 0, Je = n > -1 ? n : t.length), Ze = 0, dt = null, le = null, O = t;
    try {
      W = t.dataView || (t.dataView = new DataView(t.buffer, t.byteOffset, t.byteLength));
    } catch (r) {
      throw O = null, t instanceof Uint8Array ? r : new Error("Source must be a Uint8Array or Buffer but was a " + (t && typeof t == "object" ? t.constructor.name : typeof t));
    }
    if (this instanceof rn) {
      if (X = this, this.structures)
        return H = this.structures, $r();
      (!H || H.length > 0) && (H = []);
    } else
      X = ki, (!H || H.length > 0) && (H = []);
    return $r();
  }
  unpackMultiple(t, n) {
    let r, a = 0;
    try {
      ht = !0;
      let i = t.length, c = this ? this.unpack(t, i) : es.unpack(t, i);
      if (n) {
        if (n(c, a, _) === !1) return;
        for (; _ < i; )
          if (a = _, n($r(), a, _) === !1)
            return;
      } else {
        for (r = [c]; _ < i; )
          a = _, r.push($r());
        return r;
      }
    } catch (i) {
      throw i.lastPosition = a, i.values = r, i;
    } finally {
      ht = !1, Ds();
    }
  }
  _mergeStructures(t, n) {
    t = t || [], Object.isFrozen(t) && (t = t.map((r) => r.slice(0)));
    for (let r = 0, a = t.length; r < a; r++) {
      let i = t[r];
      i && (i.isShared = !0, r >= 32 && (i.highByte = r - 32 >> 5));
    }
    t.sharedLength = t.length;
    for (let r in n || [])
      if (r >= 0) {
        let a = t[r], i = n[r];
        i && (a && ((t.restoreStructures || (t.restoreStructures = []))[r] = a), t[r] = i);
      }
    return this.structures = t;
  }
  decode(t, n) {
    return this.unpack(t, n);
  }
}
function $r(e) {
  try {
    if (!X.trusted && !ht) {
      let n = H.sharedLength || 0;
      n < H.length && (H.length = n);
    }
    let t;
    if (X.randomAccessStructure && O[_] < 64 && O[_] >= 32 && If || (t = ae()), le && (_ = le.postBundlePosition, le = null), ht && (H.restoreStructures = null), _ == Je)
      H && H.restoreStructures && xi(), H = null, O = null, et && (et = null);
    else {
      if (_ > Je)
        throw new Error("Unexpected end of MessagePack data");
      if (!ht) {
        let n;
        try {
          n = JSON.stringify(t, (r, a) => typeof a == "bigint" ? `${a}n` : a).slice(0, 100);
        } catch (r) {
          n = "(JSON view not available " + r + ")";
        }
        throw new Error("Data read, but end of buffer not reached " + n);
      }
    }
    return t;
  } catch (t) {
    throw H && H.restoreStructures && xi(), Ds(), (t instanceof RangeError || t.message.startsWith("Unexpected end of buffer") || _ > Je) && (t.incomplete = !0), t;
  }
}
function xi() {
  for (let e in H.restoreStructures)
    H[e] = H.restoreStructures[e];
  H.restoreStructures = null;
}
function ae() {
  let e = O[_++];
  if (e < 160)
    if (e < 128) {
      if (e < 64)
        return e;
      {
        let t = H[e & 63] || X.getStructures && vc()[e & 63];
        return t ? (t.read || (t.read = li(t, e & 63)), t.read()) : e;
      }
    } else if (e < 144)
      if (e -= 128, X.mapsAsObjects) {
        let t = {};
        for (let n = 0; n < e; n++) {
          let r = Sc();
          r === "__proto__" && (r = "__proto_"), t[r] = ae();
        }
        return t;
      } else {
        let t = /* @__PURE__ */ new Map();
        for (let n = 0; n < e; n++)
          t.set(ae(), ae());
        return t;
      }
    else {
      e -= 144;
      let t = new Array(e);
      for (let n = 0; n < e; n++)
        t[n] = ae();
      return X.freezeData ? Object.freeze(t) : t;
    }
  else if (e < 192) {
    let t = e - 160;
    if (Ze >= _)
      return dt.slice(_ - Te, (_ += t) - Te);
    if (Ze == 0 && Je < 140) {
      let n = t < 16 ? ui(t) : kc(t);
      if (n != null)
        return n;
    }
    return Os(t);
  } else {
    let t;
    switch (e) {
      case 192:
        return null;
      case 193:
        return le ? (t = ae(), t > 0 ? le[1].slice(le.position1, le.position1 += t) : le[0].slice(le.position0, le.position0 -= t)) : yc;
      // "never-used", return special object to denote that
      case 194:
        return !1;
      case 195:
        return !0;
      case 196:
        if (t = O[_++], t === void 0)
          throw new Error("Unexpected end of buffer");
        return os(t);
      case 197:
        return t = W.getUint16(_), _ += 2, os(t);
      case 198:
        return t = W.getUint32(_), _ += 4, os(t);
      case 199:
        return kt(O[_++]);
      case 200:
        return t = W.getUint16(_), _ += 2, kt(t);
      case 201:
        return t = W.getUint32(_), _ += 4, kt(t);
      case 202:
        if (t = W.getFloat32(_), X.useFloat32 > 2) {
          let n = _i[(O[_] & 127) << 1 | O[_ + 1] >> 7];
          return _ += 4, (n * t + (t > 0 ? 0.5 : -0.5) >> 0) / n;
        }
        return _ += 4, t;
      case 203:
        return t = W.getFloat64(_), _ += 8, t;
      // uint handlers
      case 204:
        return O[_++];
      case 205:
        return t = W.getUint16(_), _ += 2, t;
      case 206:
        return t = W.getUint32(_), _ += 4, t;
      case 207:
        return X.int64AsType === "number" ? (t = W.getUint32(_) * 4294967296, t += W.getUint32(_ + 4)) : X.int64AsType === "string" ? t = W.getBigUint64(_).toString() : X.int64AsType === "auto" ? (t = W.getBigUint64(_), t <= BigInt(2) << BigInt(52) && (t = Number(t))) : t = W.getBigUint64(_), _ += 8, t;
      // int handlers
      case 208:
        return W.getInt8(_++);
      case 209:
        return t = W.getInt16(_), _ += 2, t;
      case 210:
        return t = W.getInt32(_), _ += 4, t;
      case 211:
        return X.int64AsType === "number" ? (t = W.getInt32(_) * 4294967296, t += W.getUint32(_ + 4)) : X.int64AsType === "string" ? t = W.getBigInt64(_).toString() : X.int64AsType === "auto" ? (t = W.getBigInt64(_), t >= BigInt(-2) << BigInt(52) && t <= BigInt(2) << BigInt(52) && (t = Number(t))) : t = W.getBigInt64(_), _ += 8, t;
      case 212:
        if (t = O[_++], t == 114)
          return Pi(O[_++] & 63);
        {
          let n = we[t];
          if (n)
            return n.read ? (_++, n.read(ae())) : n.noBuffer ? (_++, n()) : n(O.subarray(_, ++_));
          throw new Error("Unknown extension " + t);
        }
      case 213:
        return t = O[_], t == 114 ? (_++, Pi(O[_++] & 63, O[_++])) : kt(2);
      case 214:
        return kt(4);
      case 215:
        return kt(8);
      case 216:
        return kt(16);
      case 217:
        return t = O[_++], Ze >= _ ? dt.slice(_ - Te, (_ += t) - Te) : Cf(t);
      case 218:
        return t = W.getUint16(_), _ += 2, Ze >= _ ? dt.slice(_ - Te, (_ += t) - Te) : Bf(t);
      case 219:
        return t = W.getUint32(_), _ += 4, Ze >= _ ? dt.slice(_ - Te, (_ += t) - Te) : Tf(t);
      case 220:
        return t = W.getUint16(_), _ += 2, Oi(t);
      case 221:
        return t = W.getUint32(_), _ += 4, Oi(t);
      case 222:
        return t = W.getUint16(_), _ += 2, Di(t);
      case 223:
        return t = W.getUint32(_), _ += 4, Di(t);
      default:
        if (e >= 224)
          return e - 256;
        if (e === void 0) {
          let n = new Error("Unexpected end of MessagePack data");
          throw n.incomplete = !0, n;
        }
        throw new Error("Unknown MessagePack token " + e);
    }
  }
}
const Pf = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
function li(e, t) {
  function n() {
    if (n.count++ > Si) {
      let a;
      try {
        a = e.read = new Function("r", "return function(){return " + (X.freezeData ? "Object.freeze" : "") + "({" + e.map((i) => i === "__proto__" ? "__proto_:r()" : Pf.test(i) ? i + ":r()" : "[" + JSON.stringify(i) + "]:r()").join(",") + "})}")(ae);
      } catch {
        return Si = 1 / 0, n();
      }
      return e.read0 = a, e.highByte === 0 && (e.read = Ai(t, e.read)), a();
    }
    let r = {};
    for (let a = 0, i = e.length; a < i; a++) {
      let c = e[a];
      c === "__proto__" && (c = "__proto_"), r[c] = ae();
    }
    return X.freezeData ? Object.freeze(r) : r;
  }
  return n.count = 0, e.read0 = n, e.highByte === 0 ? Ai(t, n) : n;
}
const Ai = (e, t) => function() {
  let n = O[_++];
  if (n === 0)
    return t();
  let r = e < 32 ? -(e + (n << 5)) : e + (n << 5), a = H[r] || vc()[r];
  if (!a)
    throw new Error("Record id is not defined for " + r);
  return a.read || (a.read = li(a, e)), a.read();
};
function vc() {
  let e = Oc(() => (O = null, X.getStructures()));
  return H = X._mergeStructures(e, H);
}
var Os = Tr, Cf = Tr, Bf = Tr, Tf = Tr;
function Tr(e) {
  let t;
  if (e < 16 && (t = ui(e)))
    return t;
  if (e > 64 && As)
    return As.decode(O.subarray(_, _ += e));
  const n = _ + e, r = [];
  for (t = ""; _ < n; ) {
    const a = O[_++];
    if ((a & 128) === 0)
      r.push(a);
    else if ((a & 224) === 192) {
      const i = O[_++] & 63, c = (a & 31) << 6 | i;
      c < 128 ? r.push(65533) : r.push(c);
    } else if ((a & 240) === 224) {
      const i = O[_++] & 63, c = O[_++] & 63, f = (a & 31) << 12 | i << 6 | c;
      f < 2048 || f >= 55296 && f <= 57343 ? r.push(65533) : r.push(f);
    } else if ((a & 248) === 240) {
      const i = O[_++] & 63, c = O[_++] & 63, f = O[_++] & 63;
      let l = (a & 7) << 18 | i << 12 | c << 6 | f;
      l < 65536 || l > 1114111 ? r.push(65533) : (l > 65535 && (l -= 65536, r.push(l >>> 10 & 1023 | 55296), l = 56320 | l & 1023), r.push(l));
    } else
      r.push(65533);
    r.length >= 4096 && (t += fe.apply(String, r), r.length = 0);
  }
  return r.length > 0 && (t += fe.apply(String, r)), t;
}
function Oi(e) {
  let t = new Array(e);
  for (let n = 0; n < e; n++)
    t[n] = ae();
  return X.freezeData ? Object.freeze(t) : t;
}
function Di(e) {
  if (X.mapsAsObjects) {
    let t = {};
    for (let n = 0; n < e; n++) {
      let r = Sc();
      r === "__proto__" && (r = "__proto_"), t[r] = ae();
    }
    return t;
  } else {
    let t = /* @__PURE__ */ new Map();
    for (let n = 0; n < e; n++)
      t.set(ae(), ae());
    return t;
  }
}
var fe = String.fromCharCode;
function kc(e) {
  let t = _, n = new Array(e);
  for (let r = 0; r < e; r++) {
    const a = O[_++];
    if ((a & 128) > 0) {
      _ = t;
      return;
    }
    n[r] = a;
  }
  return fe.apply(String, n);
}
function ui(e) {
  if (e < 4)
    if (e < 2) {
      if (e === 0)
        return "";
      {
        let t = O[_++];
        if ((t & 128) > 1) {
          _ -= 1;
          return;
        }
        return fe(t);
      }
    } else {
      let t = O[_++], n = O[_++];
      if ((t & 128) > 0 || (n & 128) > 0) {
        _ -= 2;
        return;
      }
      if (e < 3)
        return fe(t, n);
      let r = O[_++];
      if ((r & 128) > 0) {
        _ -= 3;
        return;
      }
      return fe(t, n, r);
    }
  else {
    let t = O[_++], n = O[_++], r = O[_++], a = O[_++];
    if ((t & 128) > 0 || (n & 128) > 0 || (r & 128) > 0 || (a & 128) > 0) {
      _ -= 4;
      return;
    }
    if (e < 6) {
      if (e === 4)
        return fe(t, n, r, a);
      {
        let i = O[_++];
        if ((i & 128) > 0) {
          _ -= 5;
          return;
        }
        return fe(t, n, r, a, i);
      }
    } else if (e < 8) {
      let i = O[_++], c = O[_++];
      if ((i & 128) > 0 || (c & 128) > 0) {
        _ -= 6;
        return;
      }
      if (e < 7)
        return fe(t, n, r, a, i, c);
      let f = O[_++];
      if ((f & 128) > 0) {
        _ -= 7;
        return;
      }
      return fe(t, n, r, a, i, c, f);
    } else {
      let i = O[_++], c = O[_++], f = O[_++], l = O[_++];
      if ((i & 128) > 0 || (c & 128) > 0 || (f & 128) > 0 || (l & 128) > 0) {
        _ -= 8;
        return;
      }
      if (e < 10) {
        if (e === 8)
          return fe(t, n, r, a, i, c, f, l);
        {
          let d = O[_++];
          if ((d & 128) > 0) {
            _ -= 9;
            return;
          }
          return fe(t, n, r, a, i, c, f, l, d);
        }
      } else if (e < 12) {
        let d = O[_++], m = O[_++];
        if ((d & 128) > 0 || (m & 128) > 0) {
          _ -= 10;
          return;
        }
        if (e < 11)
          return fe(t, n, r, a, i, c, f, l, d, m);
        let y = O[_++];
        if ((y & 128) > 0) {
          _ -= 11;
          return;
        }
        return fe(t, n, r, a, i, c, f, l, d, m, y);
      } else {
        let d = O[_++], m = O[_++], y = O[_++], x = O[_++];
        if ((d & 128) > 0 || (m & 128) > 0 || (y & 128) > 0 || (x & 128) > 0) {
          _ -= 12;
          return;
        }
        if (e < 14) {
          if (e === 12)
            return fe(t, n, r, a, i, c, f, l, d, m, y, x);
          {
            let L = O[_++];
            if ((L & 128) > 0) {
              _ -= 13;
              return;
            }
            return fe(t, n, r, a, i, c, f, l, d, m, y, x, L);
          }
        } else {
          let L = O[_++], N = O[_++];
          if ((L & 128) > 0 || (N & 128) > 0) {
            _ -= 14;
            return;
          }
          if (e < 15)
            return fe(t, n, r, a, i, c, f, l, d, m, y, x, L, N);
          let R = O[_++];
          if ((R & 128) > 0) {
            _ -= 15;
            return;
          }
          return fe(t, n, r, a, i, c, f, l, d, m, y, x, L, N, R);
        }
      }
    }
  }
}
function Ei() {
  let e = O[_++], t;
  if (e < 192)
    t = e - 160;
  else
    switch (e) {
      case 217:
        t = O[_++];
        break;
      case 218:
        t = W.getUint16(_), _ += 2;
        break;
      case 219:
        t = W.getUint32(_), _ += 4;
        break;
      default:
        throw new Error("Expected string");
    }
  return Tr(t);
}
function os(e) {
  return X.copyBuffers ? (
    // specifically use the copying slice (not the node one)
    Uint8Array.prototype.slice.call(O, _, _ += e)
  ) : O.subarray(_, _ += e);
}
function kt(e) {
  let t = O[_++];
  if (we[t]) {
    let n;
    return we[t](O.subarray(_, n = _ += e), (r) => {
      _ = r;
      try {
        return ae();
      } finally {
        _ = n;
      }
    });
  } else
    throw new Error("Unknown extension type " + t);
}
var Ii = new Array(4096);
function Sc() {
  let e = O[_++];
  if (e >= 160 && e < 192) {
    if (e = e - 160, Ze >= _)
      return dt.slice(_ - Te, (_ += e) - Te);
    if (!(Ze == 0 && Je < 180))
      return Os(e);
  } else
    return _--, xc(ae());
  let t = (e << 5 ^ (e > 1 ? W.getUint16(_) : e > 0 ? O[_] : 0)) & 4095, n = Ii[t], r = _, a = _ + e - 3, i, c = 0;
  if (n && n.bytes == e) {
    for (; r < a; ) {
      if (i = W.getUint32(r), i != n[c++]) {
        r = 1879048192;
        break;
      }
      r += 4;
    }
    for (a += 3; r < a; )
      if (i = O[r++], i != n[c++]) {
        r = 1879048192;
        break;
      }
    if (r === a)
      return _ = r, n.string;
    a -= 3, r = _;
  }
  for (n = [], Ii[t] = n, n.bytes = e; r < a; )
    i = W.getUint32(r), n.push(i), r += 4;
  for (a += 3; r < a; )
    i = O[r++], n.push(i);
  let f = e < 16 ? ui(e) : kc(e);
  return f != null ? n.string = f : n.string = Os(e);
}
function xc(e) {
  if (typeof e == "string") return e;
  if (typeof e == "number" || typeof e == "boolean" || typeof e == "bigint") return e.toString();
  if (e == null) return e + "";
  if (X.allowArraysInMapKeys && Array.isArray(e) && e.flat().every((t) => ["string", "number", "boolean", "bigint"].includes(typeof t)))
    return e.flat().toString();
  throw new Error(`Invalid property type for record: ${typeof e}`);
}
const Pi = (e, t) => {
  let n = ae().map(xc), r = e;
  t !== void 0 && (e = e < 32 ? -((t << 5) + e) : (t << 5) + e, n.highByte = t);
  let a = H[e];
  return a && (a.isShared || ht) && ((H.restoreStructures || (H.restoreStructures = []))[e] = a), H[e] = n, n.read = li(n, r), (n.read0 || n.read)();
};
we[0] = () => {
};
we[0].noBuffer = !0;
we[66] = (e) => {
  let t = e.byteLength % 8 || 8, n = BigInt(e[0] & 128 ? e[0] - 256 : e[0]);
  for (let r = 1; r < t; r++)
    n <<= BigInt(8), n += BigInt(e[r]);
  if (e.byteLength !== t) {
    let r = new DataView(e.buffer, e.byteOffset, e.byteLength), a = (i, c) => {
      let f = c - i;
      if (f <= 40) {
        let y = r.getBigUint64(i);
        for (let x = i + 8; x < c; x += 8)
          y <<= BigInt(64), y |= r.getBigUint64(x);
        return y;
      }
      let l = i + (f >> 4 << 3), d = a(i, l), m = a(l, c);
      return d << BigInt((c - l) * 8) | m;
    };
    n = n << BigInt((r.byteLength - t) * 8) | a(t, r.byteLength);
  }
  return n;
};
let Ci = {
  Error,
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError,
  AggregateError: typeof AggregateError == "function" ? AggregateError : null
};
we[101] = () => {
  let e = ae();
  if (!Ci[e[0]]) {
    let t = Error(e[1], { cause: e[2] });
    return t.name = e[0], t;
  }
  return Ci[e[0]](e[1], { cause: e[2] });
};
we[105] = (e) => {
  if (X.structuredClone === !1) throw new Error("Structured clone extension is disabled");
  let t = W.getUint32(_ - 4);
  et || (et = /* @__PURE__ */ new Map());
  let n = O[_], r;
  n >= 144 && n < 160 || n == 220 || n == 221 ? r = [] : n >= 128 && n < 144 || n == 222 || n == 223 ? r = /* @__PURE__ */ new Map() : (n >= 199 && n <= 201 || n >= 212 && n <= 216) && O[_ + 1] === 115 ? r = /* @__PURE__ */ new Set() : r = {};
  let a = { target: r };
  et.set(t, a);
  let i = ae();
  if (a.used)
    Object.assign(r, i);
  else
    return a.target = i;
  if (r instanceof Map)
    for (let [c, f] of i.entries()) r.set(c, f);
  if (r instanceof Set)
    for (let c of Array.from(i)) r.add(c);
  return r;
};
we[112] = (e) => {
  if (X.structuredClone === !1) throw new Error("Structured clone extension is disabled");
  let t = W.getUint32(_ - 4), n = et.get(t);
  return n.used = !0, n.target;
};
we[115] = () => new Set(ae());
const Ac = ["Int8", "Uint8", "Uint8Clamped", "Int16", "Uint16", "Int32", "Uint32", "Float32", "Float64", "BigInt64", "BigUint64"].map((e) => e + "Array");
let Mf = typeof globalThis == "object" ? globalThis : window;
we[116] = (e) => {
  let t = e[0], n = Uint8Array.prototype.slice.call(e, 1).buffer, r = Ac[t];
  if (!r) {
    if (t === 16) return n;
    if (t === 17) return new DataView(n);
    throw new Error("Could not find typed array for code " + t);
  }
  return new Mf[r](n);
};
we[120] = () => {
  let e = ae();
  return new RegExp(e[0], e[1]);
};
const Rf = [];
we[98] = (e) => {
  let t = (e[0] << 24) + (e[1] << 16) + (e[2] << 8) + e[3], n = _;
  return _ += t - e.length, le = Rf, le = [Ei(), Ei()], le.position0 = 0, le.position1 = 0, le.postBundlePosition = _, _ = n, ae();
};
we[255] = (e) => e.length == 4 ? new Date((e[0] * 16777216 + (e[1] << 16) + (e[2] << 8) + e[3]) * 1e3) : e.length == 8 ? new Date(
  ((e[0] << 22) + (e[1] << 14) + (e[2] << 6) + (e[3] >> 2)) / 1e6 + ((e[3] & 3) * 4294967296 + e[4] * 16777216 + (e[5] << 16) + (e[6] << 8) + e[7]) * 1e3
) : e.length == 12 ? new Date(
  ((e[0] << 24) + (e[1] << 16) + (e[2] << 8) + e[3]) / 1e6 + ((e[4] & 128 ? -281474976710656 : 0) + e[6] * 1099511627776 + e[7] * 4294967296 + e[8] * 16777216 + (e[9] << 16) + (e[10] << 8) + e[11]) * 1e3
) : /* @__PURE__ */ new Date("invalid");
function Oc(e) {
  let t = Je, n = _, r = Te, a = Ze, i = dt, c = et, f = le, l = new Uint8Array(O.slice(0, Je)), d = H, m = H.slice(0, H.length), y = X, x = ht, L = e();
  return Je = t, _ = n, Te = r, Ze = a, dt = i, et = c, le = f, O = l, ht = x, H = d, H.splice(0, H.length, ...m), X = y, W = new DataView(O.buffer, O.byteOffset, O.byteLength), L;
}
function Ds() {
  O = null, et = null, H = null;
}
function Dc(e) {
  e.unpack ? we[e.type] = e.unpack : we[e.type] = e;
}
const _i = new Array(147);
for (let e = 0; e < 256; e++)
  _i[e] = +("1e" + Math.floor(45.15 - e * 0.30103));
var es = new rn({ useRecords: !1 });
es.unpack;
es.unpackMultiple;
es.unpack;
let $f = new Float32Array(1);
new Uint8Array($f.buffer, 0, 4);
let Fr;
try {
  Fr = new TextEncoder();
} catch {
}
let na, ra;
const an = typeof Buffer < "u", Ur = an ? function(e) {
  return Buffer.allocUnsafeSlow(e);
} : Uint8Array, Ec = an ? Buffer : Uint8Array, Bi = an ? 4294967296 : 2144337920;
let p, vn, Y, h = 0, me, re = null, Uf;
const Lf = 21760, jf = /[\u0080-\uFFFF]/, Zt = Symbol("record-id");
class Ic extends rn {
  constructor(t) {
    super(t), this.offset = 0;
    let n, r, a, i, c = Ec.prototype.utf8Write ? function(b, D) {
      return p.utf8Write(b, D, p.byteLength - D);
    } : Fr && Fr.encodeInto ? function(b, D) {
      return Fr.encodeInto(b, p.subarray(D)).written;
    } : !1, f = this;
    t || (t = {});
    let l = t && t.sequential, d = t.structures || t.saveStructures, m = t.maxSharedStructures;
    if (m == null && (m = d ? 32 : 0), m > 8160)
      throw new Error("Maximum maxSharedStructure is 8160");
    t.structuredClone && t.moreTypes == null && (this.moreTypes = !0);
    let y = t.maxOwnStructures;
    y == null && (y = d ? 32 : 64), !this.structures && t.useRecords != !1 && (this.structures = []);
    let x = m > 32 || y + m > 64, L = m + 64, N = m + y + 64;
    if (N > 8256)
      throw new Error("Maximum maxSharedStructure + maxOwnStructure is 8192");
    let R = [], de = 0, G = 0;
    this.pack = this.encode = function(b, D) {
      if (p || (p = new Ur(8192), Y = p.dataView || (p.dataView = new DataView(p.buffer, 0, 8192)), h = 0), me = p.length - 10, me - h < 2048 ? (p = new Ur(p.length), Y = p.dataView || (p.dataView = new DataView(p.buffer, 0, p.length)), me = p.length - 10, h = 0) : h = h + 7 & 2147483640, n = h, D & Hf && (h += D & 255), i = f.structuredClone ? /* @__PURE__ */ new Map() : null, f.bundleStrings && typeof b != "string" ? (re = [], re.size = 1 / 0) : re = null, a = f.structures, a) {
        a.uninitialized && (a = f._mergeStructures(f.getStructures()));
        let k = a.sharedLength || 0;
        if (k > m)
          throw new Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to " + a.sharedLength);
        if (!a.transitions) {
          a.transitions = /* @__PURE__ */ Object.create(null);
          for (let S = 0; S < k; S++) {
            let $ = a[S];
            if (!$)
              continue;
            let U, M = a.transitions;
            for (let J = 0, Q = $.length; J < Q; J++) {
              let qe = $[J];
              U = M[qe], U || (U = M[qe] = /* @__PURE__ */ Object.create(null)), M = U;
            }
            M[Zt] = S + 64;
          }
          this.lastNamedStructuresLength = k;
        }
        l || (a.nextId = k + 64);
      }
      r && (r = !1);
      let A;
      try {
        f.randomAccessStructure && !f.readOnlyStructures && b && typeof b == "object" ? b.constructor === Object ? mi(b) : b.constructor !== Map && !Array.isArray(b) && !ra.some((S) => b instanceof S) ? mi(b.toJSON ? b.toJSON() : b) : q(b) : q(b);
        let k = re;
        if (re && Mi(n, q, 0), i && i.idsToInsert) {
          let S = i.idsToInsert.sort((J, Q) => J.offset > Q.offset ? 1 : -1), $ = S.length, U = -1;
          for (; k && $ > 0; ) {
            let J = S[--$].offset + n;
            J < k.stringsPosition + n && U === -1 && (U = 0), J > k.position + n ? U >= 0 && (U += 6) : (U >= 0 && (Y.setUint32(
              k.position + n,
              Y.getUint32(k.position + n) + U
            ), U = -1), k = k.previous, $++);
          }
          U >= 0 && k && Y.setUint32(
            k.position + n,
            Y.getUint32(k.position + n) + U
          ), h += S.length * 6, h > me && ie(h), f.offset = h;
          let M = Ff(p.subarray(n, h), S);
          return i = null, M;
        }
        return f.offset = h, D & Nf ? (p.start = n, p.end = h, p) : p.subarray(n, h);
      } catch (k) {
        throw A = k, k;
      } finally {
        if (a && (se(), r && f.saveStructures)) {
          let k = a.sharedLength || 0, S = p.subarray(n, h), $ = Vf(a, f);
          if (!A)
            return f.saveStructures($, $.isCompatible) === !1 ? (a.uninitialized = !0, f.pack(b, D)) : (f.lastNamedStructuresLength = k, p.length > 1073741824 && (p = null), S);
        }
        p.length > 1073741824 && (p = null), D & Wf && (h = n);
      }
    };
    const se = () => {
      G < 10 && G++;
      let b = a.sharedLength || 0;
      if (a.length > b && !l && (a.length = b), de > 1e4)
        a.transitions = null, G = 0, de = 0, R.length > 0 && (R = []);
      else if (R.length > 0 && !l) {
        for (let D = 0, A = R.length; D < A; D++)
          R[D][Zt] = 0;
        R = [];
      }
    }, ge = (b) => {
      var D = b.length;
      D < 16 ? p[h++] = 144 | D : D < 65536 ? (p[h++] = 220, p[h++] = D >> 8, p[h++] = D & 255) : (p[h++] = 221, Y.setUint32(h, D), h += 4);
      for (let A = 0; A < D; A++)
        q(b[A]);
    }, q = (b) => {
      h > me && (p = ie(h));
      var D = typeof b, A;
      if (D === "string") {
        let k = b.length;
        if (re && k >= 4 && k < 4096) {
          if ((re.size += k) > Lf) {
            let M, J = (re[0] ? re[0].length * 3 + re[1].length : 0) + 10;
            h + J > me && (p = ie(h + J));
            let Q;
            re.position ? (Q = re, p[h] = 200, h += 3, p[h++] = 98, M = h - n, h += 4, Mi(n, q, 0), Y.setUint16(M + n - 3, h - n - M)) : (p[h++] = 214, p[h++] = 98, M = h - n, h += 4), re = ["", ""], re.previous = Q, re.size = 0, re.position = M;
          }
          let U = jf.test(b);
          re[U ? 0 : 1] += b, p[h++] = 193, q(U ? -k : k);
          return;
        }
        let S;
        k < 32 ? S = 1 : k < 256 ? S = 2 : k < 65536 ? S = 3 : S = 5;
        let $ = k * 3;
        if (h + $ > me && (p = ie(h + $)), k < 64 || !c) {
          let U, M, J, Q = h + S;
          for (U = 0; U < k; U++)
            M = b.charCodeAt(U), M < 128 ? p[Q++] = M : M < 2048 ? (p[Q++] = M >> 6 | 192, p[Q++] = M & 63 | 128) : (M & 64512) === 55296 && ((J = b.charCodeAt(U + 1)) & 64512) === 56320 ? (M = 65536 + ((M & 1023) << 10) + (J & 1023), U++, p[Q++] = M >> 18 | 240, p[Q++] = M >> 12 & 63 | 128, p[Q++] = M >> 6 & 63 | 128, p[Q++] = M & 63 | 128) : (p[Q++] = M >> 12 | 224, p[Q++] = M >> 6 & 63 | 128, p[Q++] = M & 63 | 128);
          A = Q - h - S;
        } else
          A = c(b, h + S);
        A < 32 ? p[h++] = 160 | A : A < 256 ? (S < 2 && p.copyWithin(h + 2, h + 1, h + 1 + A), p[h++] = 217, p[h++] = A) : A < 65536 ? (S < 3 && p.copyWithin(h + 3, h + 2, h + 2 + A), p[h++] = 218, p[h++] = A >> 8, p[h++] = A & 255) : (S < 5 && p.copyWithin(h + 5, h + 3, h + 3 + A), p[h++] = 219, Y.setUint32(h, A), h += 4), h += A;
      } else if (D === "number")
        if (b >>> 0 === b)
          b < 32 || b < 128 && this.useRecords === !1 || b < 64 && !this.randomAccessStructure ? p[h++] = b : b < 256 ? (p[h++] = 204, p[h++] = b) : b < 65536 ? (p[h++] = 205, p[h++] = b >> 8, p[h++] = b & 255) : (p[h++] = 206, Y.setUint32(h, b), h += 4);
        else if (b >> 0 === b)
          b >= -32 ? p[h++] = 256 + b : b >= -128 ? (p[h++] = 208, p[h++] = b + 256) : b >= -32768 ? (p[h++] = 209, Y.setInt16(h, b), h += 2) : (p[h++] = 210, Y.setInt32(h, b), h += 4);
        else {
          let k;
          if ((k = this.useFloat32) > 0 && b < 4294967296 && b >= -2147483648) {
            p[h++] = 202, Y.setFloat32(h, b);
            let S;
            if (k < 4 || // this checks for rounding of numbers that were encoded in 32-bit float to nearest significant decimal digit that could be preserved
            (S = b * _i[(p[h] & 127) << 1 | p[h + 1] >> 7]) >> 0 === S) {
              h += 4;
              return;
            } else
              h--;
          }
          p[h++] = 203, Y.setFloat64(h, b), h += 8;
        }
      else if (D === "object" || D === "function")
        if (!b)
          p[h++] = 192;
        else {
          if (i) {
            let S = i.get(b);
            if (S) {
              if (!S.id) {
                let $ = i.idsToInsert || (i.idsToInsert = []);
                S.id = $.push(S);
              }
              p[h++] = 214, p[h++] = 112, Y.setUint32(h, S.id), h += 4;
              return;
            } else
              i.set(b, { offset: h - n });
          }
          let k = b.constructor;
          if (k === Object)
            Fe(b);
          else if (k === Array)
            ge(b);
          else if (k === Map)
            if (this.mapAsEmptyObject) p[h++] = 128;
            else {
              A = b.size, A < 16 ? p[h++] = 128 | A : A < 65536 ? (p[h++] = 222, p[h++] = A >> 8, p[h++] = A & 255) : (p[h++] = 223, Y.setUint32(h, A), h += 4);
              for (let [S, $] of b)
                q(S), q($);
            }
          else {
            for (let S = 0, $ = na.length; S < $; S++) {
              let U = ra[S];
              if (b instanceof U) {
                let M = na[S];
                if (M.write) {
                  M.type && (p[h++] = 212, p[h++] = M.type, p[h++] = 0);
                  let yn = M.write.call(this, b);
                  yn === b ? Array.isArray(b) ? ge(b) : Fe(b) : q(yn);
                  return;
                }
                let J = p, Q = Y, qe = h;
                p = null;
                let ot;
                try {
                  ot = M.pack.call(this, b, (yn) => (p = J, J = null, h += yn, h > me && ie(h), {
                    target: p,
                    targetView: Y,
                    position: h - yn
                  }), q);
                } finally {
                  J && (p = J, Y = Q, h = qe, me = p.length - 10);
                }
                ot && (ot.length + h > me && ie(ot.length + h), h = Ti(ot, p, h, M.type));
                return;
              }
            }
            if (Array.isArray(b))
              ge(b);
            else {
              if (b.toJSON) {
                const S = b.toJSON();
                if (S !== b)
                  return q(S);
              }
              if (D === "function")
                return q(this.writeFunction && this.writeFunction(b));
              Fe(b);
            }
          }
        }
      else if (D === "boolean")
        p[h++] = b ? 195 : 194;
      else if (D === "bigint") {
        if (b < 9223372036854776e3 && b >= -9223372036854776e3)
          p[h++] = 211, Y.setBigInt64(h, b);
        else if (b < 18446744073709552e3 && b > 0)
          p[h++] = 207, Y.setBigUint64(h, b);
        else if (this.largeBigIntToFloat)
          p[h++] = 203, Y.setFloat64(h, Number(b));
        else {
          if (this.largeBigIntToString)
            return q(b.toString());
          if (this.useBigIntExtension || this.moreTypes) {
            let k = b < 0 ? BigInt(-1) : BigInt(0), S;
            if (b >> BigInt(65536) === k) {
              let $ = BigInt(18446744073709552e3) - BigInt(1), U = [];
              for (; U.push(b & $), b >> BigInt(63) !== k; )
                b >>= BigInt(64);
              S = new Uint8Array(new BigUint64Array(U).buffer), S.reverse();
            } else {
              let $ = b < 0, U = ($ ? ~b : b).toString(16);
              if (U.length % 2 ? U = "0" + U : parseInt(U.charAt(0), 16) >= 8 && (U = "00" + U), an)
                S = Buffer.from(U, "hex");
              else {
                S = new Uint8Array(U.length / 2);
                for (let M = 0; M < S.length; M++)
                  S[M] = parseInt(U.slice(M * 2, M * 2 + 2), 16);
              }
              if ($)
                for (let M = 0; M < S.length; M++) S[M] = ~S[M];
            }
            S.length + h > me && ie(S.length + h), h = Ti(S, p, h, 66);
            return;
          } else
            throw new RangeError(b + " was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set largeBigIntToString to convert to string");
        }
        h += 8;
      } else if (D === "undefined")
        this.encodeUndefinedAsNil ? p[h++] = 192 : (p[h++] = 212, p[h++] = 0, p[h++] = 0);
      else
        throw new Error("Unknown type: " + D);
    }, he = this.variableMapSize || this.coercibleKeyAsNumber || this.skipValues ? (b) => {
      let D;
      if (this.skipValues) {
        D = [];
        for (let S in b)
          (typeof b.hasOwnProperty != "function" || b.hasOwnProperty(S)) && !this.skipValues.includes(b[S]) && D.push(S);
      } else
        D = Object.keys(b);
      let A = D.length;
      A < 16 ? p[h++] = 128 | A : A < 65536 ? (p[h++] = 222, p[h++] = A >> 8, p[h++] = A & 255) : (p[h++] = 223, Y.setUint32(h, A), h += 4);
      let k;
      if (this.coercibleKeyAsNumber)
        for (let S = 0; S < A; S++) {
          k = D[S];
          let $ = Number(k);
          q(isNaN($) ? k : $), q(b[k]);
        }
      else
        for (let S = 0; S < A; S++)
          q(k = D[S]), q(b[k]);
    } : (b) => {
      p[h++] = 222;
      let D = h - n;
      h += 2;
      let A = 0;
      for (let k in b)
        (typeof b.hasOwnProperty != "function" || b.hasOwnProperty(k)) && (q(k), q(b[k]), A++);
      if (A > 65535)
        throw new Error('Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object');
      p[D++ + n] = A >> 8, p[D + n] = A & 255;
    }, ye = this.useRecords === !1 ? he : t.progressiveRecords && !x ? (
      // this is about 2% faster for highly stable structures, since it only requires one for-in loop (but much more expensive when new structure needs to be written)
      ((b) => {
        let D, A = a.transitions || (a.transitions = /* @__PURE__ */ Object.create(null)), k = h++ - n, S;
        for (let $ in b)
          if (typeof b.hasOwnProperty != "function" || b.hasOwnProperty($)) {
            if (D = A[$], D)
              A = D;
            else {
              let U = Object.keys(b), M = A;
              A = a.transitions;
              let J = 0;
              for (let Q = 0, qe = U.length; Q < qe; Q++) {
                let ot = U[Q];
                D = A[ot], D || (D = A[ot] = /* @__PURE__ */ Object.create(null), J++), A = D;
              }
              k + n + 1 == h ? (h--, ve(A, U, J)) : wn(A, U, k, J), S = !0, A = M[$];
            }
            q(b[$]);
          }
        if (!S) {
          let $ = A[Zt];
          $ ? p[k + n] = $ : wn(A, Object.keys(b), k, 0);
        }
      })
    ) : (b) => {
      let D, A = a.transitions || (a.transitions = /* @__PURE__ */ Object.create(null)), k = 0;
      for (let $ in b) (typeof b.hasOwnProperty != "function" || b.hasOwnProperty($)) && (D = A[$], D || (D = A[$] = /* @__PURE__ */ Object.create(null), k++), A = D);
      let S = A[Zt];
      S ? S >= 96 && x ? (p[h++] = ((S -= 96) & 31) + 96, p[h++] = S >> 5) : p[h++] = S : ve(A, A.__keys__ || Object.keys(b), k);
      for (let $ in b)
        (typeof b.hasOwnProperty != "function" || b.hasOwnProperty($)) && q(b[$]);
    }, Pe = typeof this.useRecords == "function" && this.useRecords, Fe = Pe ? (b) => {
      Pe(b) ? ye(b) : he(b);
    } : ye, ie = (b) => {
      let D;
      if (b > 16777216) {
        if (b - n > Bi)
          throw new Error("Packed buffer would be larger than maximum buffer size");
        D = Math.min(
          Bi,
          Math.round(Math.max((b - n) * (b > 67108864 ? 1.25 : 2), 4194304) / 4096) * 4096
        );
      } else
        D = (Math.max(b - n << 2, p.length - 1) >> 12) + 1 << 12;
      let A = new Ur(D);
      return Y = A.dataView || (A.dataView = new DataView(A.buffer, 0, D)), b = Math.min(b, p.length), p.copy ? p.copy(A, 0, n, b) : A.set(p.slice(n, b)), h -= n, n = 0, me = A.length - 10, p = A;
    }, ve = (b, D, A) => {
      let k = a.nextId;
      k || (k = 64), k < L && this.shouldShareStructure && !this.shouldShareStructure(D) ? (k = a.nextOwnId, k < N || (k = L), a.nextOwnId = k + 1) : (k >= N && (k = L), a.nextId = k + 1);
      let S = D.highByte = k >= 96 && x ? k - 96 >> 5 : -1;
      b[Zt] = k, b.__keys__ = D, a[k - 64] = D, k < L ? (D.isShared = !0, a.sharedLength = k - 63, r = !0, S >= 0 ? (p[h++] = (k & 31) + 96, p[h++] = S) : p[h++] = k) : (S >= 0 ? (p[h++] = 213, p[h++] = 114, p[h++] = (k & 31) + 96, p[h++] = S) : (p[h++] = 212, p[h++] = 114, p[h++] = k), A && (de += G * A), R.length >= y && (R.shift()[Zt] = 0), R.push(b), q(D));
    }, wn = (b, D, A, k) => {
      let S = p, $ = h, U = me, M = n;
      p = vn, h = 0, n = 0, p || (vn = p = new Ur(8192)), me = p.length - 10, ve(b, D, k), vn = p;
      let J = h;
      if (p = S, h = $, me = U, n = M, J > 1) {
        let Q = h + J - 1;
        Q > me && ie(Q);
        let qe = A + n;
        p.copyWithin(qe + J, qe + 1, h), p.set(vn.slice(0, J), qe), h = Q;
      } else
        p[A + n] = vn[0];
    }, mi = (b) => {
      let D = Uf(b, p, n, h, a, ie, (A, k, S) => {
        if (S)
          return r = !0;
        h = k;
        let $ = p;
        return q(A), se(), $ !== p ? { position: h, targetView: Y, target: p } : h;
      }, this);
      if (D === 0)
        return Fe(b);
      h = D;
    };
  }
  useBuffer(t) {
    p = t, p.dataView || (p.dataView = new DataView(p.buffer, p.byteOffset, p.byteLength)), Y = p.dataView, h = 0;
  }
  set position(t) {
    h = t;
  }
  get position() {
    return h;
  }
  clearSharedData() {
    this.structures && (this.structures = []), this.typedStructs && (this.typedStructs = []);
  }
}
ra = [Date, Set, Error, RegExp, ArrayBuffer, Object.getPrototypeOf(Uint8Array.prototype).constructor, DataView, wc];
na = [{
  pack(e, t, n) {
    let r = e.getTime() / 1e3;
    if ((this.useTimestamp32 || e.getMilliseconds() === 0) && r >= 0 && r < 4294967296) {
      let { target: a, targetView: i, position: c } = t(6);
      a[c++] = 214, a[c++] = 255, i.setUint32(c, r);
    } else if (r > 0 && r < 4294967296) {
      let { target: a, targetView: i, position: c } = t(10);
      a[c++] = 215, a[c++] = 255, i.setUint32(c, e.getMilliseconds() * 4e6 + (r / 1e3 / 4294967296 >> 0)), i.setUint32(c + 4, r);
    } else if (isNaN(r)) {
      if (this.onInvalidDate)
        return t(0), n(this.onInvalidDate());
      let { target: a, targetView: i, position: c } = t(3);
      a[c++] = 212, a[c++] = 255, a[c++] = 255;
    } else {
      let { target: a, targetView: i, position: c } = t(15);
      a[c++] = 199, a[c++] = 12, a[c++] = 255, i.setUint32(c, e.getMilliseconds() * 1e6), i.setBigInt64(c + 4, BigInt(Math.floor(r)));
    }
  }
}, {
  pack(e, t, n) {
    if (this.setAsEmptyObject)
      return t(0), n({});
    let r = Array.from(e), { target: a, position: i } = t(this.moreTypes ? 3 : 0);
    this.moreTypes && (a[i++] = 212, a[i++] = 115, a[i++] = 0), n(r);
  }
}, {
  pack(e, t, n) {
    let { target: r, position: a } = t(this.moreTypes ? 3 : 0);
    this.moreTypes && (r[a++] = 212, r[a++] = 101, r[a++] = 0), n([e.name, e.message, e.cause]);
  }
}, {
  pack(e, t, n) {
    let { target: r, position: a } = t(this.moreTypes ? 3 : 0);
    this.moreTypes && (r[a++] = 212, r[a++] = 120, r[a++] = 0), n([e.source, e.flags]);
  }
}, {
  pack(e, t) {
    this.moreTypes ? is(e, 16, t) : cs(an ? Buffer.from(e) : new Uint8Array(e), t);
  }
}, {
  pack(e, t) {
    let n = e.constructor;
    n !== Ec && this.moreTypes ? is(e, Ac.indexOf(n.name), t) : cs(e, t);
  }
}, {
  pack(e, t) {
    this.moreTypes ? is(e, 17, t) : cs(an ? Buffer.from(e) : new Uint8Array(e), t);
  }
}, {
  pack(e, t) {
    let { target: n, position: r } = t(1);
    n[r] = 193;
  }
}];
function is(e, t, n, r) {
  let a = e.byteLength;
  if (a + 1 < 256) {
    var { target: i, position: c } = n(4 + a);
    i[c++] = 199, i[c++] = a + 1;
  } else if (a + 1 < 65536) {
    var { target: i, position: c } = n(5 + a);
    i[c++] = 200, i[c++] = a + 1 >> 8, i[c++] = a + 1 & 255;
  } else {
    var { target: i, position: c, targetView: f } = n(7 + a);
    i[c++] = 201, f.setUint32(c, a + 1), c += 4;
  }
  i[c++] = 116, i[c++] = t, e.buffer || (e = new Uint8Array(e)), i.set(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), c);
}
function cs(e, t) {
  let n = e.byteLength;
  var r, a;
  if (n < 256) {
    var { target: r, position: a } = t(n + 2);
    r[a++] = 196, r[a++] = n;
  } else if (n < 65536) {
    var { target: r, position: a } = t(n + 3);
    r[a++] = 197, r[a++] = n >> 8, r[a++] = n & 255;
  } else {
    var { target: r, position: a, targetView: i } = t(n + 5);
    r[a++] = 198, i.setUint32(a, n), a += 4;
  }
  r.set(e, a);
}
function Ti(e, t, n, r) {
  let a = e.length;
  switch (a) {
    case 1:
      t[n++] = 212;
      break;
    case 2:
      t[n++] = 213;
      break;
    case 4:
      t[n++] = 214;
      break;
    case 8:
      t[n++] = 215;
      break;
    case 16:
      t[n++] = 216;
      break;
    default:
      a < 256 ? (t[n++] = 199, t[n++] = a) : a < 65536 ? (t[n++] = 200, t[n++] = a >> 8, t[n++] = a & 255) : (t[n++] = 201, t[n++] = a >> 24, t[n++] = a >> 16 & 255, t[n++] = a >> 8 & 255, t[n++] = a & 255);
  }
  return t[n++] = r, t.set(e, n), n += a, n;
}
function Ff(e, t) {
  let n, r = t.length * 6, a = e.length - r;
  for (; n = t.pop(); ) {
    let i = n.offset, c = n.id;
    e.copyWithin(i + r, i, a), r -= 6;
    let f = i + r;
    e[f++] = 214, e[f++] = 105, e[f++] = c >> 24, e[f++] = c >> 16 & 255, e[f++] = c >> 8 & 255, e[f++] = c & 255, a = i;
  }
  return e;
}
function Mi(e, t, n) {
  if (re.length > 0) {
    Y.setUint32(re.position + e, h + n - re.position - e), re.stringsPosition = h - e;
    let r = re;
    re = null, t(r[0]), t(r[1]);
  }
}
function zf(e) {
  if (e.Class) {
    if (!e.pack && !e.write)
      throw new Error("Extension has no pack or write function");
    if (e.pack && !e.type)
      throw new Error("Extension has no type (numeric code to identify the extension)");
    ra.unshift(e.Class), na.unshift(e);
  }
  Dc(e);
}
function Vf(e, t) {
  return e.isCompatible = (n) => {
    let r = !n || (t.lastNamedStructuresLength || 0) === n.length;
    return r || t._mergeStructures(n), r;
  }, e;
}
let Pc = new Ic({ useRecords: !1 });
Pc.pack;
Pc.pack;
const Nf = 512, Wf = 1024, Hf = 2048, Cc = [
  {
    Class: Ie.prototype.constructor,
    type: 1,
    write(e) {
      return { ...e };
    },
    read(e) {
      return Object.setPrototypeOf(e, Ie.prototype), e;
    }
  },
  {
    Class: Ae.prototype.constructor,
    type: 2,
    write(e) {
      return [...e];
    },
    read(e) {
      return Object.setPrototypeOf(e, Ae.prototype), e;
    }
  },
  {
    Class: Ne.prototype.constructor,
    type: 3,
    write(e) {
      return [...e];
    },
    read(e) {
      return Object.setPrototypeOf(e, Ne.prototype), e;
    }
  },
  {
    Class: en.prototype.constructor,
    type: 4,
    write(e) {
      return e.id;
    },
    read(e) {
      return new en(e);
    }
  },
  {
    Class: yi.prototype.constructor,
    type: 5,
    write(e) {
      return e.data;
    },
    read(e) {
      return new yi(e);
    }
  },
  {
    Class: Ue.prototype.constructor,
    type: 6,
    write(e) {
      return { ...e };
    },
    read(e) {
      return Object.setPrototypeOf(e, Ue.prototype), e;
    }
  }
];
for (const e of Cc)
  Dc(e);
const Gf = new rn({
  structuredClone: !0
  // FIXME!!!!!!!!!!!!!!!!!!! temp — mirrors serialize.ts
});
var Es;
((e) => {
  function t(n) {
    return Gf.unpack(n);
  }
  e.deserialize = t;
})(Es || (Es = {}));
const qf = new Ic({
  structuredClone: !0
  // FIXME!!!!!!!!!!!!!!!!!!! temp
});
for (const e of Cc)
  zf(e);
function Zf(e) {
  let t = 0;
  if (e.length === 0) return t;
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function Is(e) {
  if (Ya(e))
    return e;
  if (Array.isArray(e))
    return e.map(Is);
  if (typeof e == "object" && e !== null) {
    const t = {};
    for (const n of Object.keys(e).sort())
      t[n] = Is(e[n]);
    return Object.setPrototypeOf(t, Object.getPrototypeOf(e)), t;
  } else
    return e;
}
var Ps;
((e) => {
  function t(a) {
    return qf.pack(a);
  }
  e.serialize = t;
  function n(a) {
    return Es.deserialize(a);
  }
  e.deserialize = n;
  function r(a) {
    return Zf(t(Is(a))).toString();
  }
  e.checksum = r;
})(Ps || (Ps = {}));
async function Kf(e) {
  const t = new Blob([e]), n = URL.createObjectURL(t);
  return createImageBitmap(t).finally(() => {
    URL.revokeObjectURL(n);
  });
}
const diskyImageLoads = new Set();
const diskyCanvasSources = new Map(), diskyCanvasBitmaps = new WeakMap();

async function Jf(e) {
  const live = diskyCanvasSources.get(e);
  const pending = live ? createImageBitmap(live.canvas).then(bitmap=>{diskyCanvasBitmaps.set(bitmap,live);return bitmap;}) : fetch(e).then((t) => {
    if (!t.ok)
      throw new Error(`Failed to fetch image: ${t.statusText}`);
    return t.blob();
  }).then((t) => createImageBitmap(t));
  diskyImageLoads.add(pending);
  try { return await pending; } finally { diskyImageLoads.delete(pending); }
}
function Bc(e) {
  e.preload = "auto", e.autoplay = !0, e.loop = !0, e.muted = !0, e.playsInline = !0, e.currentTime = 0.01, e.load(), e.onloadeddata = () => {
    e.muted = !0;
    const n = e.play();
    n !== void 0 && n.then((r) => {
    }).catch(() => {
      e.play();
    }).finally(() => {
      e.pause();
    });
  };
  let t = !1;
  return e.addEventListener("playing", function() {
    t = !0;
  }, !0), new Promise((n) => {
    const r = () => {
      t ? n(e) : setTimeout(r, 10);
    };
    r();
  });
}
async function Qf(e) {
  const t = new Blob([e]), n = document.createElement("video");
  return n.src = URL.createObjectURL(t), Bc(n);
}
async function Yf(e) {
  return fetch(e).then((t) => {
    if (!t.ok)
      throw new Error(`Failed to fetch video: ${t.statusText}`);
    return t.blob();
  }).then(async (t) => {
    const n = document.createElement("video");
    return n.src = URL.createObjectURL(t), Bc(n);
  });
}
class qn {
  static __wrap(t) {
    const n = Object.create(qn.prototype);
    return n.__wbg_ptr = t, Li.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Li.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_devicelostpromise_free(t, 0);
  }
  /**
   * @returns {Promise<string>}
   */
  wait() {
    const t = this.__destroy_into_raw(), n = v.devicelostpromise_wait(t);
    return We(n);
  }
}
Symbol.dispose && (qn.prototype[Symbol.dispose] = qn.prototype.free);
class Tt {
  static __wrap(t) {
    const n = Object.create(Tt.prototype);
    return n.__wbg_ptr = t, ji.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ji.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_engine_free(t, 0);
  }
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {DocumentData} document_data
   * @param {boolean} force_webgl
   * @returns {Promise<Engine>}
   */
  static create(t, n, r) {
    const a = v.engine_create(w(t), w(n), r);
    return We(a);
  }
  /**
   * @returns {DeviceLostPromise | undefined}
   */
  getDeviceLostPromise() {
    const t = v.engine_getDeviceLostPromise(this.__wbg_ptr);
    return t === 0 ? void 0 : qn.__wrap(t);
  }
  /**
   * @returns {number | undefined}
   */
  getGpuFrameTimeMs() {
    try {
      const r = v.__wbindgen_add_to_stack_pointer(-16);
      v.engine_getGpuFrameTimeMs(r, this.__wbg_ptr);
      var t = z().getInt32(r + 0, !0), n = z().getFloat64(r + 8, !0);
      return t === 0 ? void 0 : n;
    } finally {
      v.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {boolean}
   */
  isWebgpu() {
    return v.engine_isWebgpu(this.__wbg_ptr) !== 0;
  }
  /**
   * @param {number | null} [dt]
   */
  onFrame(t) {
    v.engine_onFrame(this.__wbg_ptr, !j(t), j(t) ? 0 : t);
  }
  /**
   * @param {ID} id
   */
  removeTexture(t) {
    v.engine_removeTexture(this.__wbg_ptr, w(t));
  }
  /**
   * @param {DocumentData} document_data
   */
  reset(t) {
    v.engine_reset(this.__wbg_ptr, w(t));
  }
  /**
   * @param {UInt2} logical_size
   * @param {number} scale_factor
   */
  resize(t, n) {
    v.engine_resize(this.__wbg_ptr, w(t), n);
  }
}
Symbol.dispose && (Tt.prototype[Symbol.dispose] = Tt.prototype.free);
class Cs {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Dl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_scenecontroller_free(t, 0);
  }
  /**
   * @returns {boolean}
   */
  get is_play_mode() {
    return v.__wbg_get_scenecontroller_is_play_mode(this.__wbg_ptr) !== 0;
  }
  /**
   * @returns {boolean}
   */
  get needs_video_update() {
    return v.__wbg_get_scenecontroller_needs_video_update(this.__wbg_ptr) !== 0;
  }
  /**
   * @returns {boolean}
   */
  get show_pixel_grid() {
    return v.__wbg_get_scenecontroller_show_pixel_grid(this.__wbg_ptr) !== 0;
  }
  /**
   * @returns {boolean}
   */
  hasFontAssetsChanges() {
    return v.scenecontroller_hasFontAssetsChanges(this.__wbg_ptr) !== 0;
  }
  /**
   * @param {string} key
   */
  onKeyDown(t) {
    const n = Se(t, v.__wbindgen_export, v.__wbindgen_export2), r = pe;
    v.scenecontroller_onKeyDown(this.__wbg_ptr, n, r);
  }
  /**
   * @param {string} key
   */
  onKeyUp(t) {
    const n = Se(t, v.__wbindgen_export, v.__wbindgen_export2), r = pe;
    v.scenecontroller_onKeyUp(this.__wbg_ptr, n, r);
  }
  /**
   * @param {Float2} pos
   * @param {boolean} is_touch
   * @param {number} button
   */
  onPointerDown(t, n, r) {
    v.scenecontroller_onPointerDown(this.__wbg_ptr, w(t), n, r);
  }
  onPointerEnter() {
    v.scenecontroller_onPointerEnter(this.__wbg_ptr);
  }
  onPointerLeave() {
    v.scenecontroller_onPointerLeave(this.__wbg_ptr);
  }
  /**
   * @param {Float2} pos
   * @param {boolean} is_touch
   * @param {number} button
   */
  onPointerMove(t, n, r) {
    v.scenecontroller_onPointerMove(this.__wbg_ptr, w(t), n, r);
  }
  /**
   * @param {Float2} pos
   * @param {boolean} is_touch
   * @param {number} button
   */
  onPointerUp(t, n, r) {
    v.scenecontroller_onPointerUp(this.__wbg_ptr, w(t), n, r);
  }
  /**
   * @param {ID | null} [start_frame]
   * @param {boolean | null} [autoplay_videos]
   */
  present(t, n) {
    v.scenecontroller_present(this.__wbg_ptr, j(t) ? 0 : w(t), j(n) ? 16777215 : n ? 1 : 0);
  }
  start() {
    v.scenecontroller_start(this.__wbg_ptr);
  }
  stopPresenting() {
    v.scenecontroller_stopPresenting(this.__wbg_ptr);
  }
  updateCached() {
    v.scenecontroller_updateCached(this.__wbg_ptr);
  }
  /**
   * @param {boolean} arg0
   */
  set is_play_mode(t) {
    v.__wbg_set_scenecontroller_is_play_mode(this.__wbg_ptr, t);
  }
  /**
   * @param {boolean} arg0
   */
  set needs_video_update(t) {
    v.__wbg_set_scenecontroller_needs_video_update(this.__wbg_ptr, t);
  }
  /**
   * @param {boolean} arg0
   */
  set show_pixel_grid(t) {
    v.__wbg_set_scenecontroller_show_pixel_grid(this.__wbg_ptr, t);
  }
}
Symbol.dispose && (Cs.prototype[Symbol.dispose] = Cs.prototype.free);
function Xf() {
  return {
    __proto__: null,
    "./hana_bg.js": {
      __proto__: null,
      __wbg_Window_afcc911b2f9c92e2: function(e) {
        const t = s(e).Window;
        return w(t);
      },
      __wbg_WorkerGlobalScope_5d19ebc889ff397e: function(e) {
        const t = s(e).WorkerGlobalScope;
        return w(t);
      },
      __wbg___wbindgen_boolean_get_1a45e2c38d4d41b9: function(e) {
        const t = s(e), n = typeof t == "boolean" ? t : void 0;
        return j(n) ? 16777215 : n ? 1 : 0;
      },
      __wbg___wbindgen_debug_string_0accd80f45e5faa2: function(e, t) {
        const n = Bs(s(t)), r = Se(n, v.__wbindgen_export, v.__wbindgen_export2), a = pe;
        z().setInt32(e + 4, a, !0), z().setInt32(e + 0, r, !0);
      },
      __wbg___wbindgen_is_function_754e9f305ff6029e: function(e) {
        return typeof s(e) == "function";
      },
      __wbg___wbindgen_is_null_87c3bfe968c6a5ad: function(e) {
        return s(e) === null;
      },
      __wbg___wbindgen_is_null_or_undefined_cf617b836541fad3: function(e) {
        return s(e) == null;
      },
      __wbg___wbindgen_is_object_56732c2bc353f41d: function(e) {
        const t = s(e);
        return typeof t == "object" && t !== null;
      },
      __wbg___wbindgen_is_string_c236cabd84a4d769: function(e) {
        return typeof s(e) == "string";
      },
      __wbg___wbindgen_is_undefined_67b456be8673d3d7: function(e) {
        return s(e) === void 0;
      },
      __wbg___wbindgen_jsval_eq_1068e624fa87f6ab: function(e, t) {
        return s(e) === s(t);
      },
      __wbg___wbindgen_number_get_9bb1761122181af2: function(e, t) {
        const n = s(t), r = typeof n == "number" ? n : void 0;
        z().setFloat64(e + 8, j(r) ? 0 : r, !0), z().setInt32(e + 0, !j(r), !0);
      },
      __wbg___wbindgen_string_get_72bdf95d3ae505b1: function(e, t) {
        const n = s(t), r = typeof n == "string" ? n : void 0;
        var a = j(r) ? 0 : Se(r, v.__wbindgen_export, v.__wbindgen_export2), i = pe;
        z().setInt32(e + 4, i, !0), z().setInt32(e + 0, a, !0);
      },
      __wbg___wbindgen_throw_1506f2235d1bdba0: function(e, t) {
        throw new Error(F(e, t));
      },
      __wbg__wbg_cb_unref_61db23ac97f16c31: function(e) {
        s(e)._wbg_cb_unref();
      },
      __wbg_activeTexture_7a0d6fe7120979ce: function(e, t) {
        s(e).activeTexture(t >>> 0);
      },
      __wbg_activeTexture_dd15c31d50b73529: function(e, t) {
        s(e).activeTexture(t >>> 0);
      },
      __wbg_arrayBuffer_05927079aabe6d46: function() {
        return T(function(e) {
          const t = s(e).arrayBuffer();
          return w(t);
        }, arguments);
      },
      __wbg_assign_551ec2d000f70c24: function() {
        return T(function(e, t, n) {
          s(e).assign(F(t, n));
        }, arguments);
      },
      __wbg_attachShader_5c6a46e7c0fc637a: function(e, t, n) {
        s(e).attachShader(s(t), s(n));
      },
      __wbg_attachShader_c2b12b36afa45936: function(e, t, n) {
        s(e).attachShader(s(t), s(n));
      },
      __wbg_beginComputePass_431a159006c13c7c: function(e, t) {
        const n = s(e).beginComputePass(s(t));
        return w(n);
      },
      __wbg_beginRenderPass_aa22c432e793359a: function() {
        return T(function(e, t) {
          const n = s(e).beginRenderPass(s(t));
          return w(n);
        }, arguments);
      },
      __wbg_bindBuffer_3841df88ccee4ed0: function(e, t, n) {
        s(e).bindBuffer(t >>> 0, s(n));
      },
      __wbg_bindBuffer_aa5dc7dc1c8ad1c8: function(e, t, n) {
        s(e).bindBuffer(t >>> 0, s(n));
      },
      __wbg_bindFramebuffer_10bbdf7040d89a17: function(e, t, n) {
        s(e).bindFramebuffer(t >>> 0, s(n));
      },
      __wbg_bindFramebuffer_ee8e42543c29c602: function(e, t, n) {
        s(e).bindFramebuffer(t >>> 0, s(n));
      },
      __wbg_bindRenderbuffer_7808d8eabbe18554: function(e, t, n) {
        s(e).bindRenderbuffer(t >>> 0, s(n));
      },
      __wbg_bindRenderbuffer_c0360bfb79c193c2: function(e, t, n) {
        s(e).bindRenderbuffer(t >>> 0, s(n));
      },
      __wbg_bindTexture_28d1d695d4801955: function(e, t, n) {
        s(e).bindTexture(t >>> 0, s(n));
      },
      __wbg_bindTexture_a1a012a31e1419d5: function(e, t, n) {
        s(e).bindTexture(t >>> 0, s(n));
      },
      __wbg_bindVertexArrayOES_15e48910a5d208b1: function(e, t) {
        s(e).bindVertexArrayOES(s(t));
      },
      __wbg_bindVertexArray_4f2f0a7892280041: function(e, t) {
        s(e).bindVertexArray(s(t));
      },
      __wbg_blendEquation_1ced323efc9ce0f8: function(e, t) {
        s(e).blendEquation(t >>> 0);
      },
      __wbg_blendEquation_a12f5acd9d14fb9b: function(e, t) {
        s(e).blendEquation(t >>> 0);
      },
      __wbg_blendFunc_d5202c7fe94c67ee: function(e, t, n) {
        s(e).blendFunc(t >>> 0, n >>> 0);
      },
      __wbg_blendFunc_fbff85cd0fce280e: function(e, t, n) {
        s(e).blendFunc(t >>> 0, n >>> 0);
      },
      __wbg_blitFramebuffer_acb954bfb30ed714: function(e, t, n, r, a, i, c, f, l, d, m) {
        s(e).blitFramebuffer(t, n, r, a, i, c, f, l, d >>> 0, m >>> 0);
      },
      __wbg_bufferData_043a7e5da22f40d9: function(e, t, n, r) {
        s(e).bufferData(t >>> 0, n, r >>> 0);
      },
      __wbg_bufferData_7b6881381d415425: function(e, t, n, r) {
        s(e).bufferData(t >>> 0, s(n), r >>> 0);
      },
      __wbg_bufferData_9fddca30299e6114: function(e, t, n, r) {
        s(e).bufferData(t >>> 0, n, r >>> 0);
      },
      __wbg_bufferData_f0837cec09725cc0: function(e, t, n, r) {
        s(e).bufferData(t >>> 0, s(n), r >>> 0);
      },
      __wbg_bufferSubData_885e4f8d5833cf11: function(e, t, n, r) {
        s(e).bufferSubData(t >>> 0, n, s(r));
      },
      __wbg_bufferSubData_8fc824b6a9503f12: function(e, t, n, r) {
        s(e).bufferSubData(t >>> 0, n, s(r));
      },
      __wbg_call_9c758de292015997: function() {
        return T(function(e, t, n) {
          const r = s(e).call(s(t), s(n));
          return w(r);
        }, arguments);
      },
      __wbg_clearBufferfv_2e2858bd8bcf1715: function(e, t, n, r, a) {
        s(e).clearBufferfv(t >>> 0, n, Ce(r, a));
      },
      __wbg_clearBufferiv_e356514eb1d165fe: function(e, t, n, r, a) {
        s(e).clearBufferiv(t >>> 0, n, zi(r, a));
      },
      __wbg_compileShader_8810a4868b23621b: function(e, t) {
        s(e).compileShader(s(t));
      },
      __wbg_compileShader_ec8d5eb7f2b70a48: function(e, t) {
        s(e).compileShader(s(t));
      },
      __wbg_configure_0e4789c0f6b35c8e: function() {
        return T(function(e, t) {
          s(e).configure(s(t));
        }, arguments);
      },
      __wbg_copyBufferSubData_9936fdf5e53e1832: function(e, t, n, r, a, i) {
        s(e).copyBufferSubData(t >>> 0, n >>> 0, r, a, i);
      },
      __wbg_copyBufferToBuffer_5e2cd8f10ae78183: function() {
        return T(function(e, t, n, r, a) {
          s(e).copyBufferToBuffer(s(t), n, s(r), a);
        }, arguments);
      },
      __wbg_copyBufferToBuffer_ca30deb8de65f5d5: function() {
        return T(function(e, t, n, r, a, i) {
          s(e).copyBufferToBuffer(s(t), n, s(r), a, i);
        }, arguments);
      },
      __wbg_copyExternalImageToTexture_4df105bb39517948: function() {
        return T(function(e, t, n, r) {
          const queue=s(e), source=s(t), target=s(n), size=s(r);
          queue.copyExternalImageToTexture(source,target,size);
          const live=diskyCanvasBitmaps.get(source.source);
          if(live)live.binding={queue,source,target,size};
        }, arguments);
      },
      __wbg_createBindGroupLayout_49a7e2b3d076afcf: function() {
        return T(function(e, t) {
          const n = s(e).createBindGroupLayout(s(t));
          return w(n);
        }, arguments);
      },
      __wbg_createBindGroup_655c6e6c0258530e: function(e, t) {
        const n = s(e).createBindGroup(s(t));
        return w(n);
      },
      __wbg_createBuffer_0726dd2ab09ea1d2: function() {
        return T(function(e, t) {
          const n = s(e).createBuffer(s(t));
          return w(n);
        }, arguments);
      },
      __wbg_createBuffer_333d6aae40284594: function(e) {
        const t = s(e).createBuffer();
        return j(t) ? 0 : w(t);
      },
      __wbg_createBuffer_3ae54605e5676c83: function(e) {
        const t = s(e).createBuffer();
        return j(t) ? 0 : w(t);
      },
      __wbg_createCommandEncoder_ec1f40f0cb4d09df: function(e, t) {
        const n = s(e).createCommandEncoder(s(t));
        return w(n);
      },
      __wbg_createComputePipelineAsync_afe7021ac5a02993: function(e, t) {
        const n = s(e).createComputePipelineAsync(s(t));
        return w(n);
      },
      __wbg_createFramebuffer_6f42ff976bb98152: function(e) {
        const t = s(e).createFramebuffer();
        return j(t) ? 0 : w(t);
      },
      __wbg_createFramebuffer_ef1247e8b2e9b09f: function(e) {
        const t = s(e).createFramebuffer();
        return j(t) ? 0 : w(t);
      },
      __wbg_createPipelineLayout_2c8cd4528b06c108: function(e, t) {
        const n = s(e).createPipelineLayout(s(t));
        return w(n);
      },
      __wbg_createProgram_b48c3323af547213: function(e) {
        const t = s(e).createProgram();
        return j(t) ? 0 : w(t);
      },
      __wbg_createProgram_f6a8df4491031d57: function(e) {
        const t = s(e).createProgram();
        return j(t) ? 0 : w(t);
      },
      __wbg_createQuerySet_cb7b21d1d405b890: function() {
        return T(function(e, t) {
          const n = s(e).createQuerySet(s(t));
          return w(n);
        }, arguments);
      },
      __wbg_createRenderPipelineAsync_eecad1e54ef27acf: function(e, t) {
        const n = s(e).createRenderPipelineAsync(s(t));
        return w(n);
      },
      __wbg_createRenderPipeline_cf98d4d699bfb03c: function() {
        return T(function(e, t) {
          const n = s(e).createRenderPipeline(s(t));
          return w(n);
        }, arguments);
      },
      __wbg_createRenderbuffer_a2f947c7fa8c8bf0: function(e) {
        const t = s(e).createRenderbuffer();
        return j(t) ? 0 : w(t);
      },
      __wbg_createRenderbuffer_c09d5809ac95924e: function(e) {
        const t = s(e).createRenderbuffer();
        return j(t) ? 0 : w(t);
      },
      __wbg_createSampler_c8ffb3c8d565f704: function(e, t) {
        const n = s(e).createSampler(s(t));
        return w(n);
      },
      __wbg_createShaderModule_2e44fc7677c6288b: function(e, t) {
        const n = s(e).createShaderModule(s(t));
        return w(n);
      },
      __wbg_createShader_0e3f814b69e9e184: function(e, t) {
        const n = s(e).createShader(t >>> 0);
        return j(n) ? 0 : w(n);
      },
      __wbg_createShader_383b3295276271d2: function(e, t) {
        const n = s(e).createShader(t >>> 0);
        return j(n) ? 0 : w(n);
      },
      __wbg_createTexture_1bac74c999b8a48e: function() {
        return T(function(e, t) {
          const n = s(e).createTexture(s(t));
          return w(n);
        }, arguments);
      },
      __wbg_createTexture_461a3048c40e7175: function(e) {
        const t = s(e).createTexture();
        return j(t) ? 0 : w(t);
      },
      __wbg_createTexture_d6e2c1f04a554a15: function(e) {
        const t = s(e).createTexture();
        return j(t) ? 0 : w(t);
      },
      __wbg_createVertexArrayOES_2f67d3679ba9a29c: function(e) {
        const t = s(e).createVertexArrayOES();
        return j(t) ? 0 : w(t);
      },
      __wbg_createVertexArray_febd1d11636d15ad: function(e) {
        const t = s(e).createVertexArray();
        return j(t) ? 0 : w(t);
      },
      __wbg_createView_ceaf2f5881adbd34: function() {
        return T(function(e, t) {
          const n = s(e).createView(s(t));
          return w(n);
        }, arguments);
      },
      __wbg_cullFace_a4ee8b8c3c126388: function(e, t) {
        s(e).cullFace(t >>> 0);
      },
      __wbg_cullFace_c6b39a55ccade015: function(e, t) {
        s(e).cullFace(t >>> 0);
      },
      __wbg_debug_78b457f1effb3792: function(e) {
        console.debug(s(e));
      },
      __wbg_deleteBuffer_520156dc8a1f81af: function(e, t) {
        s(e).deleteBuffer(s(t));
      },
      __wbg_deleteBuffer_a925fdd1b590fbbc: function(e, t) {
        s(e).deleteBuffer(s(t));
      },
      __wbg_deleteFramebuffer_aa4bf9f184123318: function(e, t) {
        s(e).deleteFramebuffer(s(t));
      },
      __wbg_deleteFramebuffer_cc043e5a8cb9a556: function(e, t) {
        s(e).deleteFramebuffer(s(t));
      },
      __wbg_deleteProgram_0c859ebcab2b7b5a: function(e, t) {
        s(e).deleteProgram(s(t));
      },
      __wbg_deleteProgram_df6a6609c7d91a6e: function(e, t) {
        s(e).deleteProgram(s(t));
      },
      __wbg_deleteRenderbuffer_37c079dbc257fcf9: function(e, t) {
        s(e).deleteRenderbuffer(s(t));
      },
      __wbg_deleteRenderbuffer_4b7a888363766554: function(e, t) {
        s(e).deleteRenderbuffer(s(t));
      },
      __wbg_deleteShader_170dea06bd074d01: function(e, t) {
        s(e).deleteShader(s(t));
      },
      __wbg_deleteShader_944accd60733a9cb: function(e, t) {
        s(e).deleteShader(s(t));
      },
      __wbg_deleteTexture_54dee8e15570751e: function(e, t) {
        s(e).deleteTexture(s(t));
      },
      __wbg_deleteTexture_be3eaabebb89a85e: function(e, t) {
        s(e).deleteTexture(s(t));
      },
      __wbg_deleteVertexArrayOES_4262d2d0e9fb77c5: function(e, t) {
        s(e).deleteVertexArrayOES(s(t));
      },
      __wbg_deleteVertexArray_8f0fb3b3d54c7483: function(e, t) {
        s(e).deleteVertexArray(s(t));
      },
      __wbg_depthMask_95332b64c5ef8b45: function(e, t) {
        s(e).depthMask(t !== 0);
      },
      __wbg_depthMask_f55bea4b6c3b9531: function(e, t) {
        s(e).depthMask(t !== 0);
      },
      __wbg_description_02485704e69b1e7f: function(e, t) {
        const n = s(t).description, r = Se(n, v.__wbindgen_export, v.__wbindgen_export2), a = pe;
        z().setInt32(e + 4, a, !0), z().setInt32(e + 0, r, !0);
      },
      __wbg_disable_2cf98ccb81612ef9: function(e, t) {
        s(e).disable(t >>> 0);
      },
      __wbg_disable_6b825656c54f5646: function(e, t) {
        s(e).disable(t >>> 0);
      },
      __wbg_dispatchWorkgroups_afb2344298c62227: function(e, t, n, r) {
        s(e).dispatchWorkgroups(t >>> 0, n >>> 0, r >>> 0);
      },
      __wbg_document_aceb08cd6489baf5: function(e) {
        const t = s(e).document;
        return j(t) ? 0 : w(t);
      },
      __wbg_drawArrays_6eb87620c1dcbfb4: function(e, t, n, r) {
        s(e).drawArrays(t >>> 0, n, r);
      },
      __wbg_drawArrays_f332b526550a641e: function(e, t, n, r) {
        s(e).drawArrays(t >>> 0, n, r);
      },
      __wbg_drawBuffersWEBGL_10cdfe87c17cd93f: function(e, t) {
        s(e).drawBuffersWEBGL(s(t));
      },
      __wbg_drawBuffers_c5a9ee312b2d6fa8: function(e, t) {
        s(e).drawBuffers(s(t));
      },
      __wbg_drawElements_23ec4847dad548e0: function(e, t, n, r, a) {
        s(e).drawElements(t >>> 0, n, r >>> 0, a);
      },
      __wbg_drawElements_fe4671e9c358058d: function(e, t, n, r, a) {
        s(e).drawElements(t >>> 0, n, r >>> 0, a);
      },
      __wbg_drawIndexed_d31913e79d58fbac: function(e, t, n, r, a, i) {
        s(e).drawIndexed(t >>> 0, n >>> 0, r >>> 0, a, i >>> 0);
      },
      __wbg_draw_6877f98847e1e36c: function(e, t, n, r, a) {
        s(e).draw(t >>> 0, n >>> 0, r >>> 0, a >>> 0);
      },
      __wbg_enableVertexAttribArray_cc09a0312b6adee5: function(e, t) {
        s(e).enableVertexAttribArray(t >>> 0);
      },
      __wbg_enableVertexAttribArray_f88d3d499ab40ea6: function(e, t) {
        s(e).enableVertexAttribArray(t >>> 0);
      },
      __wbg_enable_1928c361308989d5: function(e, t) {
        s(e).enable(t >>> 0);
      },
      __wbg_enable_2cc4ff32a0fd985f: function(e, t) {
        s(e).enable(t >>> 0);
      },
      __wbg_end_c36889de8ddef882: function(e) {
        s(e).end();
      },
      __wbg_end_f99ebed53d4e198a: function(e) {
        s(e).end();
      },
      __wbg_engine_new: function(e) {
        const t = Tt.__wrap(e);
        return w(t);
      },
      __wbg_error_78ff5b3a29b770e0: function(e) {
        console.error(s(e));
      },
      __wbg_error_a6fa202b58aa1cd3: function(e, t) {
        let n, r;
        try {
          n = e, r = t, console.error(F(e, t));
        } finally {
          v.__wbindgen_export4(n, r, 1);
        }
      },
      __wbg_features_2b07a28fe18ad0ce: function(e) {
        const t = s(e).features;
        return w(t);
      },
      __wbg_features_d4d2020319592cbe: function(e) {
        const t = s(e).features;
        return w(t);
      },
      __wbg_fetch_ce1af4d1b59a60be: function(e, t) {
        const n = s(e).fetch(s(t));
        return w(n);
      },
      __wbg_finish_4d91de5e927dd13f: function(e, t) {
        const n = s(e).finish(s(t));
        return w(n);
      },
      __wbg_finish_6e06b68ab68cd9f6: function(e) {
        const t = s(e).finish();
        return w(t);
      },
      __wbg_flush_2088ebca1fd13068: function(e) {
        s(e).flush();
      },
      __wbg_flush_3be48fce9f195fa5: function(e) {
        s(e).flush();
      },
      __wbg_framebufferRenderbuffer_0c9d0e5587497683: function(e, t, n, r, a) {
        s(e).framebufferRenderbuffer(t >>> 0, n >>> 0, r >>> 0, s(a));
      },
      __wbg_framebufferRenderbuffer_599e58ad30dcfeb3: function(e, t, n, r, a) {
        s(e).framebufferRenderbuffer(t >>> 0, n >>> 0, r >>> 0, s(a));
      },
      __wbg_framebufferTexture2D_44caed1725e57636: function(e, t, n, r, a, i) {
        s(e).framebufferTexture2D(t >>> 0, n >>> 0, r >>> 0, s(a), i);
      },
      __wbg_framebufferTexture2D_fbba21b750c2316a: function(e, t, n, r, a, i) {
        s(e).framebufferTexture2D(t >>> 0, n >>> 0, r >>> 0, s(a), i);
      },
      __wbg_from_d300fe49deab18f5: function(e) {
        const t = Array.from(s(e));
        return w(t);
      },
      __wbg_generateMipmap_1403959fc241438f: function(e, t) {
        s(e).generateMipmap(t >>> 0);
      },
      __wbg_generateMipmap_b261c040d5707fe5: function(e, t) {
        s(e).generateMipmap(t >>> 0);
      },
      __wbg_getActiveUniform_3a275fd8fdf7a327: function(e, t, n) {
        const r = s(e).getActiveUniform(s(t), n >>> 0);
        return j(r) ? 0 : w(r);
      },
      __wbg_getActiveUniform_86f7a30e1a52aca4: function(e, t, n) {
        const r = s(e).getActiveUniform(s(t), n >>> 0);
        return j(r) ? 0 : w(r);
      },
      __wbg_getContext_469d34698d869fc1: function() {
        return T(function(e, t, n) {
          const r = s(e).getContext(F(t, n));
          return j(r) ? 0 : w(r);
        }, arguments);
      },
      __wbg_getContext_5b39fff76491fded: function() {
        return T(function(e, t, n, r) {
          const a = s(e).getContext(F(t, n), s(r));
          return j(a) ? 0 : w(a);
        }, arguments);
      },
      __wbg_getContext_7d3a8f461c828713: function() {
        return T(function(e, t, n) {
          const r = s(e).getContext(F(t, n));
          return j(r) ? 0 : w(r);
        }, arguments);
      },
      __wbg_getCurrentTexture_20714d1bd9051cab: function() {
        return T(function(e) {
          const t = s(e).getCurrentTexture();
          return w(t);
        }, arguments);
      },
      __wbg_getExtension_454cdc5ffd07bf03: function() {
        return T(function(e, t, n) {
          const r = s(e).getExtension(F(t, n));
          return j(r) ? 0 : w(r);
        }, arguments);
      },
      __wbg_getMappedRange_d0bf3141224111b6: function() {
        return T(function(e, t, n) {
          const r = s(e).getMappedRange(t, n);
          return w(r);
        }, arguments);
      },
      __wbg_getParameter_015942a7ad566b20: function() {
        return T(function(e, t) {
          const n = s(e).getParameter(t >>> 0);
          return w(n);
        }, arguments);
      },
      __wbg_getParameter_1e77e23f5ccf0300: function() {
        return T(function(e, t) {
          const n = s(e).getParameter(t >>> 0);
          return w(n);
        }, arguments);
      },
      __wbg_getPreferredCanvasFormat_8b57039d1801a506: function(e) {
        const t = s(e).getPreferredCanvasFormat();
        return (St.indexOf(t) + 1 || 102) - 1;
      },
      __wbg_getProgramInfoLog_2f9cfcecc4f772e1: function(e, t, n) {
        const r = s(t).getProgramInfoLog(s(n));
        var a = j(r) ? 0 : Se(r, v.__wbindgen_export, v.__wbindgen_export2), i = pe;
        z().setInt32(e + 4, i, !0), z().setInt32(e + 0, a, !0);
      },
      __wbg_getProgramInfoLog_f0d48f606547aed7: function(e, t, n) {
        const r = s(t).getProgramInfoLog(s(n));
        var a = j(r) ? 0 : Se(r, v.__wbindgen_export, v.__wbindgen_export2), i = pe;
        z().setInt32(e + 4, i, !0), z().setInt32(e + 0, a, !0);
      },
      __wbg_getProgramParameter_08beabb2736d5769: function(e, t, n) {
        const r = s(e).getProgramParameter(s(t), n >>> 0);
        return w(r);
      },
      __wbg_getProgramParameter_aee848e1db52b7cd: function(e, t, n) {
        const r = s(e).getProgramParameter(s(t), n >>> 0);
        return w(r);
      },
      __wbg_getRandomValues_3f44b700395062e5: function() {
        return T(function(e, t) {
          globalThis.crypto.getRandomValues(Kt(e, t));
        }, arguments);
      },
      __wbg_getRandomValues_bf16787eede473f5: function() {
        return T(function(e, t) {
          globalThis.crypto.getRandomValues(Kt(e, t));
        }, arguments);
      },
      __wbg_getShaderInfoLog_510365af17f29a35: function(e, t, n) {
        const r = s(t).getShaderInfoLog(s(n));
        var a = j(r) ? 0 : Se(r, v.__wbindgen_export, v.__wbindgen_export2), i = pe;
        z().setInt32(e + 4, i, !0), z().setInt32(e + 0, a, !0);
      },
      __wbg_getShaderInfoLog_cd77c7b7bdb9ce65: function(e, t, n) {
        const r = s(t).getShaderInfoLog(s(n));
        var a = j(r) ? 0 : Se(r, v.__wbindgen_export, v.__wbindgen_export2), i = pe;
        z().setInt32(e + 4, i, !0), z().setInt32(e + 0, a, !0);
      },
      __wbg_getSupportedExtensions_7a31b3412a25d9ba: function(e) {
        const t = s(e).getSupportedExtensions();
        return j(t) ? 0 : w(t);
      },
      __wbg_getUniformLocation_010256f946f9a865: function(e, t, n, r) {
        const a = s(e).getUniformLocation(s(t), F(n, r));
        return j(a) ? 0 : w(a);
      },
      __wbg_getUniformLocation_f9774d4f157f5914: function(e, t, n, r) {
        const a = s(e).getUniformLocation(s(t), F(n, r));
        return j(a) ? 0 : w(a);
      },
      __wbg_get_2b48c7d0d006a781: function(e, t) {
        const n = s(e)[t >>> 0];
        return w(n);
      },
      __wbg_get_cb935c1402921898: function(e, t) {
        const n = s(e)[t >>> 0];
        return j(n) ? 0 : w(n);
      },
      __wbg_get_de6a0f7d4d18a304: function() {
        return T(function(e, t) {
          const n = Reflect.get(s(e), s(t));
          return w(n);
        }, arguments);
      },
      __wbg_get_unchecked_33f6e5c9e2f2d6b2: function(e, t) {
        const n = s(e)[t >>> 0];
        return w(n);
      },
      __wbg_get_with_ref_key_7e638bba08a44478: function(e, t) {
        const n = s(e)[s(t)];
        return w(n);
      },
      __wbg_gpu_2ccc250735d24a2a: function(e) {
        const t = s(e).gpu;
        return w(t);
      },
      __wbg_has_0c97053e877f47cc: function(e, t, n) {
        return s(e).has(F(t, n));
      },
      __wbg_has_73740b27f436fed3: function() {
        return T(function(e, t) {
          return Reflect.has(s(e), s(t));
        }, arguments);
      },
      __wbg_height_4e7694e4e2110bdb: function(e) {
        return s(e).height;
      },
      __wbg_info_af7f45292ba9b0ea: function(e) {
        console.info(s(e));
      },
      __wbg_info_cf0d9a286850cd24: function(e) {
        const t = s(e).info;
        return w(t);
      },
      __wbg_innerHeight_8b6ee2571dbedb9d: function() {
        return T(function(e) {
          const t = s(e).innerHeight;
          return w(t);
        }, arguments);
      },
      __wbg_innerWidth_7475bec19f48fe43: function() {
        return T(function(e) {
          const t = s(e).innerWidth;
          return w(t);
        }, arguments);
      },
      __wbg_instanceof_GpuOutOfMemoryError_6429c750997f1c8d: function(e) {
        let t;
        try {
          t = s(e) instanceof GPUOutOfMemoryError;
        } catch {
          t = !1;
        }
        return t;
      },
      __wbg_instanceof_GpuValidationError_75fa3611f065f4df: function(e) {
        let t;
        try {
          t = s(e) instanceof GPUValidationError;
        } catch {
          t = !1;
        }
        return t;
      },
      __wbg_instanceof_HtmlVideoElement_95590e1ff107ba83: function(e) {
        let t;
        try {
          t = s(e) instanceof HTMLVideoElement;
        } catch {
          t = !1;
        }
        return t;
      },
      __wbg_instanceof_ImageBitmap_beed1259521cd66d: function(e) {
        let t;
        try {
          t = s(e) instanceof ImageBitmap;
        } catch {
          t = !1;
        }
        return t;
      },
      __wbg_instanceof_Response_cb984bd66d7bd408: function(e) {
        let t;
        try {
          t = s(e) instanceof Response;
        } catch {
          t = !1;
        }
        return t;
      },
      __wbg_instanceof_Uint8Array_86f30649f63ef9c2: function(e) {
        let t;
        try {
          t = s(e) instanceof Uint8Array;
        } catch {
          t = !1;
        }
        return t;
      },
      __wbg_instanceof_WebGl2RenderingContext_39d13e3f953130c7: function(e) {
        let t;
        try {
          t = s(e) instanceof WebGL2RenderingContext;
        } catch {
          t = !1;
        }
        return t;
      },
      __wbg_instanceof_Window_e093be59ee9a8e14: function(e) {
        let t;
        try {
          t = s(e) instanceof Window;
        } catch {
          t = !1;
        }
        return t;
      },
      __wbg_invalidateFramebuffer_6b8dae55a3debb1d: function() {
        return T(function(e, t, n) {
          s(e).invalidateFramebuffer(t >>> 0, s(n));
        }, arguments);
      },
      __wbg_isFallbackAdapter_8ccb967428491dcb: function(e) {
        return s(e).isFallbackAdapter;
      },
      __wbg_label_7ed42f25f841996b: function(e, t) {
        const n = s(t).label, r = Se(n, v.__wbindgen_export, v.__wbindgen_export2), a = pe;
        z().setInt32(e + 4, a, !0), z().setInt32(e + 0, r, !0);
      },
      __wbg_length_4a591ecaa01354d9: function(e) {
        return s(e).length;
      },
      __wbg_length_66f1a4b2e9026940: function(e) {
        return s(e).length;
      },
      __wbg_limits_20c6f56636df7d38: function(e) {
        const t = s(e).limits;
        return w(t);
      },
      __wbg_limits_328c61cd41512420: function(e) {
        const t = s(e).limits;
        return w(t);
      },
      __wbg_linkProgram_3ccc9beaa6dace28: function(e, t) {
        s(e).linkProgram(s(t));
      },
      __wbg_linkProgram_fe2b1bf26336c4a5: function(e, t) {
        s(e).linkProgram(s(t));
      },
      __wbg_loadImageFromBytes_3d42766b73aca4ca: function(e) {
        const t = Kf(We(e));
        return w(t);
      },
      __wbg_loadImageFromUrl_50be99dbf040255b: function(e, t) {
        let n, r;
        try {
          n = e, r = t;
          const a = Jf(F(e, t));
          return w(a);
        } finally {
          v.__wbindgen_export4(n, r, 1);
        }
      },
      __wbg_loadVideoFromBytes_3d884aadcf4d2139: function(e) {
        const t = Qf(We(e));
        return w(t);
      },
      __wbg_loadVideoFromUrl_7997ffb030d4b08b: function(e, t) {
        let n, r;
        try {
          n = e, r = t;
          const a = Yf(F(e, t));
          return w(a);
        } finally {
          v.__wbindgen_export4(n, r, 1);
        }
      },
      __wbg_location_efdf1fea18b5552a: function(e) {
        const t = s(e).location;
        return w(t);
      },
      __wbg_log_cf2e968649f3384e: function(e) {
        console.log(s(e));
      },
      __wbg_lost_0fa164c88f543338: function(e) {
        const t = s(e).lost;
        return w(t);
      },
      __wbg_mapAsync_52b01fa9e8f765fd: function(e, t, n, r) {
        const a = s(e).mapAsync(t >>> 0, n, r);
        return w(a);
      },
      __wbg_maxBindGroupsPlusVertexBuffers_33e5006b23e20478: function(e) {
        return s(e).maxBindGroupsPlusVertexBuffers;
      },
      __wbg_maxBindGroups_f6d26f3a67826666: function(e) {
        return s(e).maxBindGroups;
      },
      __wbg_maxBindingsPerBindGroup_edab2e8dabbf6060: function(e) {
        return s(e).maxBindingsPerBindGroup;
      },
      __wbg_maxBufferSize_bbc69284c14aa7da: function(e) {
        return s(e).maxBufferSize;
      },
      __wbg_maxColorAttachmentBytesPerSample_63ebe4f81de2f34c: function(e) {
        return s(e).maxColorAttachmentBytesPerSample;
      },
      __wbg_maxColorAttachments_aed8c38beabf3a5c: function(e) {
        return s(e).maxColorAttachments;
      },
      __wbg_maxComputeInvocationsPerWorkgroup_2d964564c37f1c65: function(e) {
        return s(e).maxComputeInvocationsPerWorkgroup;
      },
      __wbg_maxComputeWorkgroupSizeX_a3e3206570da184f: function(e) {
        return s(e).maxComputeWorkgroupSizeX;
      },
      __wbg_maxComputeWorkgroupSizeY_dffa4a62244b7563: function(e) {
        return s(e).maxComputeWorkgroupSizeY;
      },
      __wbg_maxComputeWorkgroupSizeZ_976ebcb760f6d07d: function(e) {
        return s(e).maxComputeWorkgroupSizeZ;
      },
      __wbg_maxComputeWorkgroupStorageSize_2e8dbece6e532e2a: function(e) {
        return s(e).maxComputeWorkgroupStorageSize;
      },
      __wbg_maxComputeWorkgroupsPerDimension_bb7d36b4d20c80f4: function(e) {
        return s(e).maxComputeWorkgroupsPerDimension;
      },
      __wbg_maxDynamicStorageBuffersPerPipelineLayout_1ca859cb96a414e0: function(e) {
        return s(e).maxDynamicStorageBuffersPerPipelineLayout;
      },
      __wbg_maxDynamicUniformBuffersPerPipelineLayout_e968f2c8cd8f4d46: function(e) {
        return s(e).maxDynamicUniformBuffersPerPipelineLayout;
      },
      __wbg_maxInterStageShaderVariables_138ac882c4d6a3d3: function(e) {
        return s(e).maxInterStageShaderVariables;
      },
      __wbg_maxSampledTexturesPerShaderStage_bb3e6b2698321fa6: function(e) {
        return s(e).maxSampledTexturesPerShaderStage;
      },
      __wbg_maxSamplersPerShaderStage_98c00a1829fa414b: function(e) {
        return s(e).maxSamplersPerShaderStage;
      },
      __wbg_maxStorageBufferBindingSize_e500e31f479e669e: function(e) {
        return s(e).maxStorageBufferBindingSize;
      },
      __wbg_maxStorageBuffersPerShaderStage_eb663f6d7521b6a7: function(e) {
        return s(e).maxStorageBuffersPerShaderStage;
      },
      __wbg_maxStorageTexturesPerShaderStage_bb3ad93b53e618c0: function(e) {
        return s(e).maxStorageTexturesPerShaderStage;
      },
      __wbg_maxTextureArrayLayers_2a56d05fb261c99a: function(e) {
        return s(e).maxTextureArrayLayers;
      },
      __wbg_maxTextureDimension1D_84590c1d4770d319: function(e) {
        return s(e).maxTextureDimension1D;
      },
      __wbg_maxTextureDimension2D_7f2b5c8b2727e3fc: function(e) {
        return s(e).maxTextureDimension2D;
      },
      __wbg_maxTextureDimension3D_7f3babddf55c32a6: function(e) {
        return s(e).maxTextureDimension3D;
      },
      __wbg_maxUniformBufferBindingSize_d80a09e23c0b284c: function(e) {
        return s(e).maxUniformBufferBindingSize;
      },
      __wbg_maxUniformBuffersPerShaderStage_0b8b2de676fa740e: function(e) {
        return s(e).maxUniformBuffersPerShaderStage;
      },
      __wbg_maxVertexAttributes_a693dd921316649b: function(e) {
        return s(e).maxVertexAttributes;
      },
      __wbg_maxVertexBufferArrayStride_f256d91f281076cb: function(e) {
        return s(e).maxVertexBufferArrayStride;
      },
      __wbg_maxVertexBuffers_70ab564b25d5ac20: function(e) {
        return s(e).maxVertexBuffers;
      },
      __wbg_message_28959d6ca4d7dda0: function(e, t) {
        const n = s(t).message, r = Se(n, v.__wbindgen_export, v.__wbindgen_export2), a = pe;
        z().setInt32(e + 4, a, !0), z().setInt32(e + 0, r, !0);
      },
      __wbg_message_4ada57a3710f1502: function(e, t) {
        const n = s(t).message, r = Se(n, v.__wbindgen_export, v.__wbindgen_export2), a = pe;
        z().setInt32(e + 4, a, !0), z().setInt32(e + 0, r, !0);
      },
      __wbg_minStorageBufferOffsetAlignment_3248ed00dcdbf79f: function(e) {
        return s(e).minStorageBufferOffsetAlignment;
      },
      __wbg_minUniformBufferOffsetAlignment_3b9fa4caae03e903: function(e) {
        return s(e).minUniformBufferOffsetAlignment;
      },
      __wbg_name_b7fa2500fc153b89: function(e, t) {
        const n = s(t).name, r = Se(n, v.__wbindgen_export, v.__wbindgen_export2), a = pe;
        z().setInt32(e + 4, a, !0), z().setInt32(e + 0, r, !0);
      },
      __wbg_navigator_3833ecdbc19d2757: function(e) {
        const t = s(e).navigator;
        return w(t);
      },
      __wbg_navigator_391291470f58c650: function(e) {
        const t = s(e).navigator;
        return w(t);
      },
      __wbg_new_227d7c05414eb861: function() {
        const e = new Error();
        return w(e);
      },
      __wbg_new_3b242422c588a8f3: function() {
        return T(function(e, t) {
          const n = new OffscreenCanvas(e >>> 0, t >>> 0);
          return w(n);
        }, arguments);
      },
      __wbg_new_578aeef4b6b94378: function(e) {
        const t = new Uint8Array(s(e));
        return w(t);
      },
      __wbg_new_ce1ab61c1c2b300d: function() {
        const e = new Object();
        return w(e);
      },
      __wbg_new_d90091b82fdf5b91: function() {
        const e = new Array();
        return w(e);
      },
      __wbg_new_typed_41c97238ee4583e3: function() {
        const e = new Object();
        return w(e);
      },
      __wbg_new_typed_bf31d18f92484486: function(e, t) {
        try {
          var n = { a: e, b: t }, r = (i, c) => {
            const f = n.a;
            n.a = 0;
            try {
              return il(f, n.b, i, c);
            } finally {
              n.a = f;
            }
          };
          const a = new Promise(r);
          return w(a);
        } finally {
          n.a = 0;
        }
      },
      __wbg_new_with_byte_offset_and_length_d836f26d916dd9ad: function(e, t, n) {
        const r = new Uint8Array(s(e), t >>> 0, n >>> 0);
        return w(r);
      },
      __wbg_new_with_str_and_init_bcd02b79a793d27f: function() {
        return T(function(e, t, n) {
          const r = new Request(F(e, t), s(n));
          return w(r);
        }, arguments);
      },
      __wbg_now_f565250295e2d180: function(e) {
        return s(e).now();
      },
      __wbg_of_57145fdec12d159f: function(e) {
        const t = Array.of(s(e));
        return w(t);
      },
      __wbg_ok_fb13c30bc1893039: function(e) {
        return s(e).ok;
      },
      __wbg_onSubmittedWorkDone_270d6b5a45520e79: function(e) {
        const t = s(e).onSubmittedWorkDone();
        return w(t);
      },
      __wbg_open_177ad1dcc06b9106: function() {
        return T(function(e, t, n, r, a, i, c) {
          const f = s(e).open(F(t, n), F(r, a), F(i, c));
          return j(f) ? 0 : w(f);
        }, arguments);
      },
      __wbg_open_feb75fe4d9971c50: function() {
        return T(function(e, t, n, r, a) {
          const i = s(e).open(F(t, n), F(r, a));
          return j(i) ? 0 : w(i);
        }, arguments);
      },
      __wbg_ownKeys_0587b8fe286a40e6: function() {
        return T(function(e) {
          const t = Reflect.ownKeys(s(e));
          return w(t);
        }, arguments);
      },
      __wbg_pause_adce2b37e004ae49: function() {
        return T(function(e) {
          s(e).pause();
        }, arguments);
      },
      __wbg_performance_68499ca0718837f5: function(e) {
        const t = s(e).performance;
        return j(t) ? 0 : w(t);
      },
      __wbg_pixelStorei_6e42d231aa75bd00: function(e, t, n) {
        s(e).pixelStorei(t >>> 0, n);
      },
      __wbg_pixelStorei_84dc1952dc699c94: function(e, t, n) {
        s(e).pixelStorei(t >>> 0, n);
      },
      __wbg_play_4ed9ece3cae2c100: function() {
        return T(function(e) {
          const t = s(e).play();
          return w(t);
        }, arguments);
      },
      __wbg_popErrorScope_8e7f4cbff8b758dd: function(e) {
        const t = s(e).popErrorScope();
        return w(t);
      },
      __wbg_prototypesetcall_3249fc62a0fafa30: function(e, t, n) {
        Uint8Array.prototype.set.call(Kt(e, t), s(n));
      },
      __wbg_provokingVertexWEBGL_0354dc7ad44d69bf: function(e, t) {
        s(e).provokingVertexWEBGL(t >>> 0);
      },
      __wbg_pushErrorScope_fa23d1206bc26dce: function(e, t) {
        s(e).pushErrorScope(hl[t]);
      },
      __wbg_push_a6822215aa43e71c: function(e, t) {
        return s(e).push(s(t));
      },
      __wbg_querySelectorAll_4dcc230a2f8a2498: function() {
        return T(function(e, t, n) {
          const r = s(e).querySelectorAll(F(t, n));
          return w(r);
        }, arguments);
      },
      __wbg_queueMicrotask_35c611f4a14830b2: function(e) {
        queueMicrotask(s(e));
      },
      __wbg_queueMicrotask_404ed0a58e0b63cc: function(e) {
        const t = s(e).queueMicrotask;
        return w(t);
      },
      __wbg_queue_adce34608fd0c893: function(e) {
        const t = s(e).queue;
        return w(t);
      },
      __wbg_readBuffer_2027f7cdd7533f2d: function(e, t) {
        s(e).readBuffer(t >>> 0);
      },
      __wbg_reason_b02cd587d1a09948: function(e) {
        const t = s(e).reason;
        return (dl.indexOf(t) + 1 || 3) - 1;
      },
      __wbg_renderbufferStorageMultisample_75bba97a8e59bc6e: function(e, t, n, r, a, i) {
        s(e).renderbufferStorageMultisample(t >>> 0, n, r >>> 0, a, i);
      },
      __wbg_renderbufferStorage_3f5b0ec8fca2f9f8: function(e, t, n, r, a) {
        s(e).renderbufferStorage(t >>> 0, n >>> 0, r, a);
      },
      __wbg_renderbufferStorage_c34a47cacbbc5fff: function(e, t, n, r, a) {
        s(e).renderbufferStorage(t >>> 0, n >>> 0, r, a);
      },
      __wbg_requestAdapter_2e6718811c735a57: function(e, t) {
        const n = s(e).requestAdapter(s(t));
        return w(n);
      },
      __wbg_requestDevice_ab46d0519ea1cc34: function(e, t) {
        const n = s(e).requestDevice(s(t));
        return w(n);
      },
      __wbg_resolveQuerySet_0f32dc3de3f09701: function(e, t, n, r, a, i) {
        s(e).resolveQuerySet(s(t), n >>> 0, r >>> 0, s(a), i >>> 0);
      },
      __wbg_resolve_25a7e548d5881dca: function(e) {
        const t = Promise.resolve(s(e));
        return w(t);
      },
      __wbg_scissor_079b7c4a5c9fcb63: function(e, t, n, r, a) {
        s(e).scissor(t, n, r, a);
      },
      __wbg_scissor_e69faa631ab6fdc0: function(e, t, n, r, a) {
        s(e).scissor(t, n, r, a);
      },
      __wbg_setBindGroup_268fd1714fff0ef5: function() {
        return T(function(e, t, n, r, a, i, c) {
          s(e).setBindGroup(t >>> 0, s(n), gs(r, a), i, c >>> 0);
        }, arguments);
      },
      __wbg_setBindGroup_3e4ce136bc833ea1: function() {
        return T(function(e, t, n, r, a, i, c) {
          s(e).setBindGroup(t >>> 0, s(n), gs(r, a), i, c >>> 0);
        }, arguments);
      },
      __wbg_setBindGroup_c22a1b95c0b17f37: function(e, t, n) {
        s(e).setBindGroup(t >>> 0, s(n));
      },
      __wbg_setBindGroup_f0de6cb2c7dbfc2c: function(e, t, n) {
        s(e).setBindGroup(t >>> 0, s(n));
      },
      __wbg_setIndexBuffer_2531a9103450445e: function(e, t, n, r) {
        s(e).setIndexBuffer(s(t), us[n], r);
      },
      __wbg_setIndexBuffer_7f3cf667b4d71566: function(e, t, n, r, a) {
        s(e).setIndexBuffer(s(t), us[n], r, a);
      },
      __wbg_setPipeline_c41bf46790f27f9e: function(e, t) {
        s(e).setPipeline(s(t));
      },
      __wbg_setPipeline_d73f019e98c76d2d: function(e, t) {
        s(e).setPipeline(s(t));
      },
      __wbg_setStencilReference_66c74be6232bb9da: function(e, t) {
        s(e).setStencilReference(t >>> 0);
      },
      __wbg_setVertexBuffer_1e448859663dd400: function(e, t, n, r) {
        s(e).setVertexBuffer(t >>> 0, s(n), r);
      },
      __wbg_setVertexBuffer_7cf533d694e747f3: function(e, t, n, r, a) {
        s(e).setVertexBuffer(t >>> 0, s(n), r, a);
      },
      __wbg_setViewport_d9fc3eac343de7d0: function(e, t, n, r, a, i, c) {
        s(e).setViewport(t, n, r, a, i, c);
      },
      __wbg_set_6e30c9374c26414c: function() {
        return T(function(e, t, n) {
          return Reflect.set(s(e), s(t), s(n));
        }, arguments);
      },
      __wbg_set_a_88262a42340d0b1c: function(e, t) {
        s(e).a = t;
      },
      __wbg_set_access_9a5092f05dc45fad: function(e, t) {
        s(e).access = vl[t];
      },
      __wbg_set_address_mode_u_9e2695575a219e33: function(e, t) {
        s(e).addressModeU = fs[t];
      },
      __wbg_set_address_mode_v_f479b2e6cccbcac4: function(e, t) {
        s(e).addressModeV = fs[t];
      },
      __wbg_set_address_mode_w_46273e153230180d: function(e, t) {
        s(e).addressModeW = fs[t];
      },
      __wbg_set_alpha_bfd2df62e7bc581b: function(e, t) {
        s(e).alpha = s(t);
      },
      __wbg_set_alpha_mode_df805952892caa9c: function(e, t) {
        s(e).alphaMode = ll[t];
      },
      __wbg_set_alpha_to_coverage_enabled_8b5dc2b0a225b3b2: function(e, t) {
        s(e).alphaToCoverageEnabled = t !== 0;
      },
      __wbg_set_array_layer_count_7312f0f31af94e7c: function(e, t) {
        s(e).arrayLayerCount = t >>> 0;
      },
      __wbg_set_array_stride_f64_27ffaf4fffd74e61: function(e, t) {
        s(e).arrayStride = t;
      },
      __wbg_set_aspect_0d453bca3d012f02: function(e, t) {
        s(e).aspect = ps[t];
      },
      __wbg_set_aspect_210da747c9d77aba: function(e, t) {
        s(e).aspect = ps[t];
      },
      __wbg_set_aspect_4962514fe99e68e6: function(e, t) {
        s(e).aspect = ps[t];
      },
      __wbg_set_attributes_7537844a7e6dafdc: function(e, t, n) {
        s(e).attributes = ze(t, n);
      },
      __wbg_set_b_c47befe0af3261eb: function(e, t) {
        s(e).b = t;
      },
      __wbg_set_base_array_layer_f176bb9f1b37b342: function(e, t) {
        s(e).baseArrayLayer = t >>> 0;
      },
      __wbg_set_base_mip_level_1df145d9f8db32a9: function(e, t) {
        s(e).baseMipLevel = t >>> 0;
      },
      __wbg_set_beginning_of_pass_write_index_0d4fa06109208ad7: function(e, t) {
        s(e).beginningOfPassWriteIndex = t >>> 0;
      },
      __wbg_set_beginning_of_pass_write_index_e9f5d016947893bd: function(e, t) {
        s(e).beginningOfPassWriteIndex = t >>> 0;
      },
      __wbg_set_bind_group_layouts_5a9cfea401c020ab: function(e, t, n) {
        s(e).bindGroupLayouts = ze(t, n);
      },
      __wbg_set_binding_155b0440b4307793: function(e, t) {
        s(e).binding = t >>> 0;
      },
      __wbg_set_binding_f74df3510792aba1: function(e, t) {
        s(e).binding = t >>> 0;
      },
      __wbg_set_blend_7493c2066c3e9970: function(e, t) {
        s(e).blend = s(t);
      },
      __wbg_set_buffer_c3410572051920ba: function(e, t) {
        s(e).buffer = s(t);
      },
      __wbg_set_buffer_ef7f75306cf663ed: function(e, t) {
        s(e).buffer = s(t);
      },
      __wbg_set_buffers_7d0d8f507699e956: function(e, t, n) {
        s(e).buffers = ze(t, n);
      },
      __wbg_set_bytes_per_row_d69b88eee3929c07: function(e, t) {
        s(e).bytesPerRow = t >>> 0;
      },
      __wbg_set_c775d84916be79ea: function(e, t, n) {
        s(e).set(s(t), n >>> 0);
      },
      __wbg_set_clear_value_gpu_color_dict_6211425789c76e59: function(e, t) {
        s(e).clearValue = s(t);
      },
      __wbg_set_code_b4f37f81f45b5b25: function(e, t, n) {
        s(e).code = F(t, n);
      },
      __wbg_set_color_83aa977526e88cbb: function(e, t) {
        s(e).color = s(t);
      },
      __wbg_set_color_attachments_581fdb3310e4abfa: function(e, t, n) {
        s(e).colorAttachments = ze(t, n);
      },
      __wbg_set_compare_cd9b62cdb92eb580: function(e, t) {
        s(e).compare = ls[t];
      },
      __wbg_set_compare_f36b34abfaa08ccb: function(e, t) {
        s(e).compare = ls[t];
      },
      __wbg_set_compute_d0c2d276b6d4b18d: function(e, t) {
        s(e).compute = s(t);
      },
      __wbg_set_count_069a4eac409bac55: function(e, t) {
        s(e).count = t >>> 0;
      },
      __wbg_set_count_3ab1c1220e4ceeb3: function(e, t) {
        s(e).count = t >>> 0;
      },
      __wbg_set_cull_mode_fc649853947a3d0c: function(e, t) {
        s(e).cullMode = _l[t];
      },
      __wbg_set_currentTime_7c37e2312e9d2687: function(e, t) {
        s(e).currentTime = t;
      },
      __wbg_set_depth_bias_clamp_1c0d695df7f092e5: function(e, t) {
        s(e).depthBiasClamp = t;
      },
      __wbg_set_depth_bias_d7cd16096242a657: function(e, t) {
        s(e).depthBias = t;
      },
      __wbg_set_depth_bias_slope_scale_c4e52ec743ef55ba: function(e, t) {
        s(e).depthBiasSlopeScale = t;
      },
      __wbg_set_depth_clear_value_beda3ec5b1a5c43a: function(e, t) {
        s(e).depthClearValue = t;
      },
      __wbg_set_depth_compare_0c8631eb2eae98e3: function(e, t) {
        s(e).depthCompare = ls[t];
      },
      __wbg_set_depth_fail_op_668155ae33d3c06f: function(e, t) {
        s(e).depthFailOp = ds[t];
      },
      __wbg_set_depth_load_op_511c513eab4e56a9: function(e, t) {
        s(e).depthLoadOp = _s[t];
      },
      __wbg_set_depth_or_array_layers_89371305ed0bd962: function(e, t) {
        s(e).depthOrArrayLayers = t >>> 0;
      },
      __wbg_set_depth_read_only_7f41a74741c144ec: function(e, t) {
        s(e).depthReadOnly = t !== 0;
      },
      __wbg_set_depth_stencil_97506c7bea4f53da: function(e, t) {
        s(e).depthStencil = s(t);
      },
      __wbg_set_depth_stencil_attachment_73b79e8b4e948222: function(e, t) {
        s(e).depthStencilAttachment = s(t);
      },
      __wbg_set_depth_store_op_c89f33b39b43361c: function(e, t) {
        s(e).depthStoreOp = hs[t];
      },
      __wbg_set_depth_write_enabled_ce89750042940350: function(e, t) {
        s(e).depthWriteEnabled = t !== 0;
      },
      __wbg_set_device_e275d1d4f3c9eb74: function(e, t) {
        s(e).device = s(t);
      },
      __wbg_set_dimension_868eee80f4b90011: function(e, t) {
        s(e).dimension = kl[t];
      },
      __wbg_set_dimension_e325282e613ca0a4: function(e, t) {
        s(e).dimension = bs[t];
      },
      __wbg_set_dst_factor_ec7407f19be1aff9: function(e, t) {
        s(e).dstFactor = $i[t];
      },
      __wbg_set_end_of_pass_write_index_0d546e46b86ea069: function(e, t) {
        s(e).endOfPassWriteIndex = t >>> 0;
      },
      __wbg_set_end_of_pass_write_index_49a6ddbb2b888bfa: function(e, t) {
        s(e).endOfPassWriteIndex = t >>> 0;
      },
      __wbg_set_entries_86a29dd6291c95e7: function(e, t, n) {
        s(e).entries = ze(t, n);
      },
      __wbg_set_entries_a12aca1e458b0456: function(e, t, n) {
        s(e).entries = ze(t, n);
      },
      __wbg_set_entry_point_207540f042015ce5: function(e, t, n) {
        s(e).entryPoint = F(t, n);
      },
      __wbg_set_entry_point_5f26aacbe4c545eb: function(e, t, n) {
        s(e).entryPoint = F(t, n);
      },
      __wbg_set_entry_point_e87e79251dd3144f: function(e, t, n) {
        s(e).entryPoint = F(t, n);
      },
      __wbg_set_external_texture_386483d8dd82ab56: function(e, t) {
        s(e).externalTexture = s(t);
      },
      __wbg_set_fail_op_92f716dbc88b6973: function(e, t) {
        s(e).failOp = ds[t];
      },
      __wbg_set_flip_y_4e1632b36ad0413a: function(e, t) {
        s(e).flipY = t !== 0;
      },
      __wbg_set_format_1fcaa7d60546b490: function(e, t) {
        s(e).format = St[t];
      },
      __wbg_set_format_2c1414a817c213f8: function(e, t) {
        s(e).format = St[t];
      },
      __wbg_set_format_533f9ffa7eef563d: function(e, t) {
        s(e).format = St[t];
      },
      __wbg_set_format_5d2f25cc93654ecc: function(e, t) {
        s(e).format = xl[t];
      },
      __wbg_set_format_5ff53724ed6cedf2: function(e, t) {
        s(e).format = St[t];
      },
      __wbg_set_format_815efd4dc4817bbb: function(e, t) {
        s(e).format = St[t];
      },
      __wbg_set_format_e52bdcca880d2c8e: function(e, t) {
        s(e).format = St[t];
      },
      __wbg_set_fragment_8b780f00a0b0e6f3: function(e, t) {
        s(e).fragment = s(t);
      },
      __wbg_set_front_face_28ffdf524eedce5b: function(e, t) {
        s(e).frontFace = pl[t];
      },
      __wbg_set_g_5983abfc46e0cf4e: function(e, t) {
        s(e).g = t;
      },
      __wbg_set_has_dynamic_offset_62bc230bdb7c54d0: function(e, t) {
        s(e).hasDynamicOffset = t !== 0;
      },
      __wbg_set_height_0739170de8653cc4: function(e, t) {
        s(e).height = t >>> 0;
      },
      __wbg_set_height_14335c4047cf9c1b: function(e, t) {
        s(e).height = t >>> 0;
      },
      __wbg_set_height_c661af0c0b5376f9: function(e, t) {
        s(e).height = t >>> 0;
      },
      __wbg_set_label_08d9be3e4719c226: function(e, t, n) {
        s(e).label = F(t, n);
      },
      __wbg_set_label_17eb9fe3a02f62b0: function(e, t, n) {
        s(e).label = F(t, n);
      },
      __wbg_set_label_206558c8adc3780f: function(e, t, n) {
        s(e).label = F(t, n);
      },
      __wbg_set_label_48e6b787d256f621: function(e, t, n) {
        s(e).label = F(t, n);
      },
      __wbg_set_label_547d0d4aec39fbe9: function(e, t, n) {
        s(e).label = F(t, n);
      },
      __wbg_set_label_5ee7427342869829: function(e, t, n) {
        s(e).label = F(t, n);
      },
      __wbg_set_label_60ad96c811e0d109: function(e, t, n) {
        s(e).label = F(t, n);
      },
      __wbg_set_label_6db0393d3fdc90a5: function(e, t, n) {
        s(e).label = F(t, n);
      },
      __wbg_set_label_72bb4f41ef0cb893: function(e, t, n) {
        s(e).label = F(t, n);
      },
      __wbg_set_label_79387decda299036: function(e, t, n) {
        s(e).label = F(t, n);
      },
      __wbg_set_label_9556af8b5cda3c9d: function(e, t, n) {
        s(e).label = F(t, n);
      },
      __wbg_set_label_d010f237b26f2c55: function(e, t, n) {
        s(e).label = F(t, n);
      },
      __wbg_set_label_e16e2dbe51349c7f: function(e, t, n) {
        s(e).label = F(t, n);
      },
      __wbg_set_label_e3944e54881b8c50: function(e, t, n) {
        s(e).label = F(t, n);
      },
      __wbg_set_label_e922700240417ab5: function(e, t, n) {
        s(e).label = F(t, n);
      },
      __wbg_set_label_ef44793ddf4455c5: function(e, t, n) {
        s(e).label = F(t, n);
      },
      __wbg_set_layout_41021cfd2a2f62df: function(e, t) {
        s(e).layout = s(t);
      },
      __wbg_set_layout_50ab727f44b38f26: function(e, t) {
        s(e).layout = s(t);
      },
      __wbg_set_layout_913d53c17194c989: function(e, t) {
        s(e).layout = s(t);
      },
      __wbg_set_layout_gpu_auto_layout_mode_0a5a185b3d52b726: function(e, t) {
        s(e).layout = Ri[t];
      },
      __wbg_set_layout_gpu_auto_layout_mode_aeba193938b47882: function(e, t) {
        s(e).layout = Ri[t];
      },
      __wbg_set_load_op_99661da6c4eab9b0: function(e, t) {
        s(e).loadOp = _s[t];
      },
      __wbg_set_lod_max_clamp_dd2d9f9f052f4f44: function(e, t) {
        s(e).lodMaxClamp = t;
      },
      __wbg_set_lod_min_clamp_6d20c97916baeb93: function(e, t) {
        s(e).lodMinClamp = t;
      },
      __wbg_set_loop_b622b726769860be: function(e, t) {
        s(e).loop = t !== 0;
      },
      __wbg_set_mag_filter_b5adebc99cb938e1: function(e, t) {
        s(e).magFilter = Ui[t];
      },
      __wbg_set_mapped_at_creation_81b586dc90a50347: function(e, t) {
        s(e).mappedAtCreation = t !== 0;
      },
      __wbg_set_mask_70a8a59ce09e5997: function(e, t) {
        s(e).mask = t >>> 0;
      },
      __wbg_set_max_anisotropy_2beada0e2db62c45: function(e, t) {
        s(e).maxAnisotropy = t;
      },
      __wbg_set_method_7a6811dec7a4feff: function(e, t, n) {
        s(e).method = F(t, n);
      },
      __wbg_set_min_binding_size_f64_5005a6904cdf43da: function(e, t) {
        s(e).minBindingSize = t;
      },
      __wbg_set_min_filter_c72f17375e135f0a: function(e, t) {
        s(e).minFilter = Ui[t];
      },
      __wbg_set_mip_level_13253f3afc7aa58a: function(e, t) {
        s(e).mipLevel = t >>> 0;
      },
      __wbg_set_mip_level_count_534caaa7e68e68b8: function(e, t) {
        s(e).mipLevelCount = t >>> 0;
      },
      __wbg_set_mip_level_count_776c8c218b65bc08: function(e, t) {
        s(e).mipLevelCount = t >>> 0;
      },
      __wbg_set_mip_level_f7ac79e8c54f59ad: function(e, t) {
        s(e).mipLevel = t >>> 0;
      },
      __wbg_set_mipmap_filter_5bf66195a3639700: function(e, t) {
        s(e).mipmapFilter = bl[t];
      },
      __wbg_set_mode_9990b3393ba469ae: function(e, t) {
        s(e).mode = ul[t];
      },
      __wbg_set_mode_c90e3667002857d4: function(e, t) {
        s(e).mode = Ol[t];
      },
      __wbg_set_module_5db9b76ee2dd2a59: function(e, t) {
        s(e).module = s(t);
      },
      __wbg_set_module_d0e2098713606cae: function(e, t) {
        s(e).module = s(t);
      },
      __wbg_set_module_f02e076ca7e7daf8: function(e, t) {
        s(e).module = s(t);
      },
      __wbg_set_multisample_37ddafe88b5cd466: function(e, t) {
        s(e).multisample = s(t);
      },
      __wbg_set_multisampled_7913fd7183272840: function(e, t) {
        s(e).multisampled = t !== 0;
      },
      __wbg_set_muted_16f1e7acd8244e28: function(e, t) {
        s(e).muted = t !== 0;
      },
      __wbg_set_offset_f64_28c24dc15000932e: function(e, t) {
        s(e).offset = t;
      },
      __wbg_set_offset_f64_89f0ce01a689839e: function(e, t) {
        s(e).offset = t;
      },
      __wbg_set_offset_f64_fa66068813376ca3: function(e, t) {
        s(e).offset = t;
      },
      __wbg_set_operation_62ce44e1728c4047: function(e, t) {
        s(e).operation = cl[t];
      },
      __wbg_set_origin_gpu_origin_2d_dict_1240202973e56f92: function(e, t) {
        s(e).origin = s(t);
      },
      __wbg_set_origin_gpu_origin_3d_dict_37222d7b3d238123: function(e, t) {
        s(e).origin = s(t);
      },
      __wbg_set_origin_gpu_origin_3d_dict_631c04520718091f: function(e, t) {
        s(e).origin = s(t);
      },
      __wbg_set_pass_op_cf02fa088d6352a7: function(e, t) {
        s(e).passOp = ds[t];
      },
      __wbg_set_power_preference_8fdca0b7af640d49: function(e, t) {
        s(e).powerPreference = gl[t];
      },
      __wbg_set_premultiplied_alpha_3f27816ad319d5a9: function(e, t) {
        s(e).premultipliedAlpha = t !== 0;
      },
      __wbg_set_primitive_43c23761a55b4088: function(e, t) {
        s(e).primitive = s(t);
      },
      __wbg_set_query_set_41de86d2401aee04: function(e, t) {
        s(e).querySet = s(t);
      },
      __wbg_set_query_set_4889dd944d5ec0fd: function(e, t) {
        s(e).querySet = s(t);
      },
      __wbg_set_r_c6f4c68f4804d655: function(e, t) {
        s(e).r = t;
      },
      __wbg_set_required_features_1baf274a8669db60: function(e, t, n) {
        s(e).requiredFeatures = ze(t, n);
      },
      __wbg_set_required_limits_871ed33c68613dcb: function(e, t) {
        s(e).requiredLimits = s(t);
      },
      __wbg_set_resolve_target_gpu_texture_view_b19a4f2debf79b96: function(e, t) {
        s(e).resolveTarget = s(t);
      },
      __wbg_set_resource_5ae7b5e67924f234: function(e, t) {
        s(e).resource = s(t);
      },
      __wbg_set_resource_gpu_buffer_binding_e5dbca063e7cb67b: function(e, t) {
        s(e).resource = s(t);
      },
      __wbg_set_resource_gpu_texture_view_eb46c355d51ad7e5: function(e, t) {
        s(e).resource = s(t);
      },
      __wbg_set_rows_per_image_59a813ac5006e10e: function(e, t) {
        s(e).rowsPerImage = t >>> 0;
      },
      __wbg_set_sample_count_eb86a8b18545b54f: function(e, t) {
        s(e).sampleCount = t >>> 0;
      },
      __wbg_set_sample_type_c32e1dfff94e63eb: function(e, t) {
        s(e).sampleType = Sl[t];
      },
      __wbg_set_sampler_c0e1258543a33bce: function(e, t) {
        s(e).sampler = s(t);
      },
      __wbg_set_shader_location_7e1832a74f912217: function(e, t) {
        s(e).shaderLocation = t >>> 0;
      },
      __wbg_set_size_f64_6bcd40704bf4cfdc: function(e, t) {
        s(e).size = t;
      },
      __wbg_set_size_f64_8b8f6bba5d678162: function(e, t) {
        s(e).size = t;
      },
      __wbg_set_size_gpu_extent_3d_dict_7e42e1c98fa36434: function(e, t) {
        s(e).size = s(t);
      },
      __wbg_set_source_0c40b87cfdd5d704: function(e, t) {
        s(e).source = s(t);
      },
      __wbg_set_source_html_canvas_element_f657e39507ba2fe5: function(e, t) {
        s(e).source = s(t);
      },
      __wbg_set_source_html_image_element_fcc7cba0635adac1: function(e, t) {
        s(e).source = s(t);
      },
      __wbg_set_source_html_video_element_e63a39653665f651: function(e, t) {
        s(e).source = s(t);
      },
      __wbg_set_source_image_data_68478f1afce208b8: function(e, t) {
        s(e).source = s(t);
      },
      __wbg_set_source_offscreen_canvas_266a3de949693e62: function(e, t) {
        s(e).source = s(t);
      },
      __wbg_set_source_video_frame_3083c0ce54b9cb73: function(e, t) {
        s(e).source = s(t);
      },
      __wbg_set_src_factor_9bfe84af9b7b5cac: function(e, t) {
        s(e).srcFactor = $i[t];
      },
      __wbg_set_stencil_back_85b22f1db5b1940a: function(e, t) {
        s(e).stencilBack = s(t);
      },
      __wbg_set_stencil_clear_value_42be608809151e2a: function(e, t) {
        s(e).stencilClearValue = t >>> 0;
      },
      __wbg_set_stencil_front_525526164a798a44: function(e, t) {
        s(e).stencilFront = s(t);
      },
      __wbg_set_stencil_load_op_31838c036993098a: function(e, t) {
        s(e).stencilLoadOp = _s[t];
      },
      __wbg_set_stencil_read_mask_5cc26495e8b3ae82: function(e, t) {
        s(e).stencilReadMask = t >>> 0;
      },
      __wbg_set_stencil_read_only_bf1d0c1897e25c62: function(e, t) {
        s(e).stencilReadOnly = t !== 0;
      },
      __wbg_set_stencil_store_op_e6be1cbc3a8fc210: function(e, t) {
        s(e).stencilStoreOp = hs[t];
      },
      __wbg_set_stencil_write_mask_d9cb40ec4b4bee5b: function(e, t) {
        s(e).stencilWriteMask = t >>> 0;
      },
      __wbg_set_step_mode_a97bb24714da41a9: function(e, t) {
        s(e).stepMode = Al[t];
      },
      __wbg_set_storage_texture_939a097db4b18bd4: function(e, t) {
        s(e).storageTexture = s(t);
      },
      __wbg_set_store_op_b5fdf672436f13f3: function(e, t) {
        s(e).storeOp = hs[t];
      },
      __wbg_set_strip_index_format_9f787be6c5fc9e87: function(e, t) {
        s(e).stripIndexFormat = us[t];
      },
      __wbg_set_targets_c38bd200c836d66f: function(e, t, n) {
        s(e).targets = ze(t, n);
      },
      __wbg_set_texture_016561d5911339e5: function(e, t) {
        s(e).texture = s(t);
      },
      __wbg_set_texture_1f64653a5d2d7b4d: function(e, t) {
        s(e).texture = s(t);
      },
      __wbg_set_texture_9dcedde1bb31eda6: function(e, t) {
        s(e).texture = s(t);
      },
      __wbg_set_timestamp_writes_59c2d19ed8aecd97: function(e, t) {
        s(e).timestampWrites = s(t);
      },
      __wbg_set_timestamp_writes_98bed1a8bbc6682d: function(e, t) {
        s(e).timestampWrites = s(t);
      },
      __wbg_set_tone_mapping_b3464f1baa4cff92: function(e, t) {
        s(e).toneMapping = s(t);
      },
      __wbg_set_topology_da25f2cc5af203d2: function(e, t) {
        s(e).topology = ml[t];
      },
      __wbg_set_type_7f0457c6084dde9b: function(e, t) {
        s(e).type = wl[t];
      },
      __wbg_set_type_ccf8472d40abcddf: function(e, t) {
        s(e).type = yl[t];
      },
      __wbg_set_type_d09829f59932a0fc: function(e, t) {
        s(e).type = fl[t];
      },
      __wbg_set_unclipped_depth_04524a2b44e1e3c1: function(e, t) {
        s(e).unclippedDepth = t !== 0;
      },
      __wbg_set_usage_a137f82ca163b0a9: function(e, t) {
        s(e).usage = t >>> 0;
      },
      __wbg_set_usage_b2a2935f37bf3d08: function(e, t) {
        s(e).usage = t >>> 0;
      },
      __wbg_set_usage_ba5b0f8b333ab325: function(e, t) {
        s(e).usage = t >>> 0;
      },
      __wbg_set_usage_ddd42599bbba7779: function(e, t) {
        s(e).usage = t >>> 0;
      },
      __wbg_set_vertex_0be5d146f9ff6f36: function(e, t) {
        s(e).vertex = s(t);
      },
      __wbg_set_view_dimension_0df554032f1f3a85: function(e, t) {
        s(e).viewDimension = bs[t];
      },
      __wbg_set_view_dimension_4818d4c18ce5815e: function(e, t) {
        s(e).viewDimension = bs[t];
      },
      __wbg_set_view_formats_4347dc8363331086: function(e, t, n) {
        s(e).viewFormats = ze(t, n);
      },
      __wbg_set_view_formats_5797d2fff3c11808: function(e, t, n) {
        s(e).viewFormats = ze(t, n);
      },
      __wbg_set_view_gpu_texture_view_9b2d86b6b99d9fd9: function(e, t) {
        s(e).view = s(t);
      },
      __wbg_set_view_gpu_texture_view_c0f35f8857c25206: function(e, t) {
        s(e).view = s(t);
      },
      __wbg_set_visibility_9570b037224c4cc2: function(e, t) {
        s(e).visibility = t >>> 0;
      },
      __wbg_set_volume_520cdc6b7ada8f76: function(e, t) {
        s(e).volume = t;
      },
      __wbg_set_width_7ca43f32db1cfe8e: function(e, t) {
        s(e).width = t >>> 0;
      },
      __wbg_set_width_87301412247f3343: function(e, t) {
        s(e).width = t >>> 0;
      },
      __wbg_set_width_9f685402c2cbee70: function(e, t) {
        s(e).width = t >>> 0;
      },
      __wbg_set_write_mask_d45279e56abbfcb5: function(e, t) {
        s(e).writeMask = t >>> 0;
      },
      __wbg_set_x_232d24fdc32d8351: function(e, t) {
        s(e).x = t >>> 0;
      },
      __wbg_set_x_876d592971db129a: function(e, t) {
        s(e).x = t >>> 0;
      },
      __wbg_set_y_18fe375093e59dfb: function(e, t) {
        s(e).y = t >>> 0;
      },
      __wbg_set_y_2b1f5ac0dd5586a5: function(e, t) {
        s(e).y = t >>> 0;
      },
      __wbg_set_z_ef005d82bc9d24e3: function(e, t) {
        s(e).z = t >>> 0;
      },
      __wbg_shaderSource_7d18b5a43a504f5c: function(e, t, n, r) {
        s(e).shaderSource(s(t), F(n, r));
      },
      __wbg_shaderSource_df5bb6320451f3cd: function(e, t, n, r) {
        s(e).shaderSource(s(t), F(n, r));
      },
      __wbg_size_211f88d386430781: function(e) {
        return s(e).size;
      },
      __wbg_stack_3b0d974bbf31e44f: function(e, t) {
        const n = s(t).stack, r = Se(n, v.__wbindgen_export, v.__wbindgen_export2), a = pe;
        z().setInt32(e + 4, a, !0), z().setInt32(e + 0, r, !0);
      },
      __wbg_static_accessor_GLOBAL_9d53f2689e622ca1: function() {
        const e = typeof global > "u" ? null : global;
        return j(e) ? 0 : w(e);
      },
      __wbg_static_accessor_GLOBAL_THIS_a1a35cec07001a8a: function() {
        const e = typeof globalThis > "u" ? null : globalThis;
        return j(e) ? 0 : w(e);
      },
      __wbg_static_accessor_SELF_4c59f6c7ea29a144: function() {
        const e = typeof self > "u" ? null : self;
        return j(e) ? 0 : w(e);
      },
      __wbg_static_accessor_WINDOW_e70ae9f2eb052253: function() {
        const e = typeof window > "u" ? null : window;
        return j(e) ? 0 : w(e);
      },
      __wbg_stencilFunc_8f53a5508560354d: function(e, t, n, r) {
        s(e).stencilFunc(t >>> 0, n, r >>> 0);
      },
      __wbg_stencilFunc_c7553215f237ee38: function(e, t, n, r) {
        s(e).stencilFunc(t >>> 0, n, r >>> 0);
      },
      __wbg_stencilOp_a844a4e9824eee70: function(e, t, n, r) {
        s(e).stencilOp(t >>> 0, n >>> 0, r >>> 0);
      },
      __wbg_stencilOp_e82bd7ea13f18adf: function(e, t, n, r) {
        s(e).stencilOp(t >>> 0, n >>> 0, r >>> 0);
      },
      __wbg_subgroupMaxSize_1527c5f7a8fe91bb: function(e) {
        return s(e).subgroupMaxSize;
      },
      __wbg_subgroupMinSize_d6c5ad4bddc828e9: function(e) {
        return s(e).subgroupMinSize;
      },
      __wbg_submit_ce44115121cd166c: function(e, t, n) {
        s(e).submit(ze(t, n));
      },
      __wbg_texImage2D_01c22558517ee8db: function() {
        return T(function(e, t, n, r, a, i, c) {
          s(e).texImage2D(t >>> 0, n, r, a >>> 0, i >>> 0, s(c));
          diskyBindGL(s(e),t,n,a,i,s(c));
        }, arguments);
      },
      __wbg_texImage2D_152e9dcd4bc3a464: function() {
        return T(function(e, t, n, r, a, i, c, f, l, d) {
          s(e).texImage2D(t >>> 0, n, r, a, i, c, f >>> 0, l >>> 0, s(d));
        }, arguments);
      },
      __wbg_texImage2D_3704db20a16b6c35: function() {
        return T(function(e, t, n, r, a, i, c, f, l, d) {
          s(e).texImage2D(t >>> 0, n, r, a, i, c, f >>> 0, l >>> 0, s(d));
        }, arguments);
      },
      __wbg_texImage2D_63d0b87d5ebe4a7f: function() {
        return T(function(e, t, n, r, a, i, c) {
          s(e).texImage2D(t >>> 0, n, r, a >>> 0, i >>> 0, s(c));
          diskyBindGL(s(e),t,n,a,i,s(c));
        }, arguments);
      },
      __wbg_texImage2D_90633e994ded3d2b: function() {
        return T(function(e, t, n, r, a, i, c) {
          s(e).texImage2D(t >>> 0, n, r, a >>> 0, i >>> 0, s(c));
          diskyBindGL(s(e),t,n,a,i,s(c));
        }, arguments);
      },
      __wbg_texImage2D_ea94e8a2df5f97e2: function() {
        return T(function(e, t, n, r, a, i, c, f, l, d) {
          s(e).texImage2D(t >>> 0, n, r, a, i, c, f >>> 0, l >>> 0, d);
        }, arguments);
      },
      __wbg_texImage2D_facfa039fb461b66: function() {
        return T(function(e, t, n, r, a, i, c) {
          s(e).texImage2D(t >>> 0, n, r, a >>> 0, i >>> 0, s(c));
          diskyBindGL(s(e),t,n,a,i,s(c));
        }, arguments);
      },
      __wbg_texParameteri_87ebfcefb0af2c50: function(e, t, n, r) {
        s(e).texParameteri(t >>> 0, n >>> 0, r);
      },
      __wbg_texParameteri_e5ad2054e239066e: function(e, t, n, r) {
        s(e).texParameteri(t >>> 0, n >>> 0, r);
      },
      __wbg_texStorage2D_bb2a1bd1ab0b9184: function(e, t, n, r, a, i) {
        s(e).texStorage2D(t >>> 0, n, r >>> 0, a, i);
      },
      __wbg_texSubImage2D_3483ba5f10ee42c2: function() {
        return T(function(e, t, n, r, a, i, c, f) {
          s(e).texSubImage2D(t >>> 0, n, r, a, i >>> 0, c >>> 0, s(f));
          diskyBindGL(s(e),t,n,i,c,s(f),r,a);
        }, arguments);
      },
      __wbg_texSubImage2D_4ca4c3faa4392438: function() {
        return T(function(e, t, n, r, a, i, c, f, l, d) {
          s(e).texSubImage2D(t >>> 0, n, r, a, i, c, f >>> 0, l >>> 0, s(d));
        }, arguments);
      },
      __wbg_texSubImage2D_54d18572b1ba74ab: function() {
        return T(function(e, t, n, r, a, i, c, f, l, d) {
          s(e).texSubImage2D(t >>> 0, n, r, a, i, c, f >>> 0, l >>> 0, d);
        }, arguments);
      },
      __wbg_texSubImage2D_5bebe93724e6ed61: function() {
        return T(function(e, t, n, r, a, i, c, f, l, d) {
          s(e).texSubImage2D(t >>> 0, n, r, a, i, c, f >>> 0, l >>> 0, s(d));
        }, arguments);
      },
      __wbg_texSubImage2D_5e1594de0416e9f6: function() {
        return T(function(e, t, n, r, a, i, c, f) {
          s(e).texSubImage2D(t >>> 0, n, r, a, i >>> 0, c >>> 0, s(f));
          diskyBindGL(s(e),t,n,i,c,s(f),r,a);
        }, arguments);
      },
      __wbg_then_18f476d590e58992: function(e, t, n) {
        const r = s(e).then(s(t), s(n));
        return w(r);
      },
      __wbg_then_47213a40b6aeb86c: function(e, t) {
        const n = s(e).then(s(t));
        return w(n);
      },
      __wbg_then_ac7b025999b52837: function(e, t) {
        const n = s(e).then(s(t));
        return w(n);
      },
      __wbg_type_71742b859467fa3c: function(e) {
        return s(e).type;
      },
      __wbg_unconfigure_0a07a0a40de8988d: function(e) {
        s(e).unconfigure();
      },
      __wbg_uniform1f_8c3b3e6e3723fe14: function(e, t, n) {
        s(e).uniform1f(s(t), n);
      },
      __wbg_uniform1f_d6619faa73c2a45f: function(e, t, n) {
        s(e).uniform1f(s(t), n);
      },
      __wbg_uniform1fv_11d5842aff79c8a3: function(e, t, n, r) {
        s(e).uniform1fv(s(t), Ce(n, r));
      },
      __wbg_uniform1fv_b4b087b4d6e2bb25: function(e, t, n, r) {
        s(e).uniform1fv(s(t), Ce(n, r));
      },
      __wbg_uniform1i_14982bb8438243b4: function(e, t, n) {
        s(e).uniform1i(s(t), n);
      },
      __wbg_uniform1i_cf11d5b364eed1c8: function(e, t, n) {
        s(e).uniform1i(s(t), n);
      },
      __wbg_uniform1ui_d177882f473d2afc: function(e, t, n) {
        s(e).uniform1ui(s(t), n >>> 0);
      },
      __wbg_uniform2f_19fb96222ae72e1a: function(e, t, n, r) {
        s(e).uniform2f(s(t), n, r);
      },
      __wbg_uniform2f_44cee47e30b82f96: function(e, t, n, r) {
        s(e).uniform2f(s(t), n, r);
      },
      __wbg_uniform2fv_2f06d989ec4b5d8f: function(e, t, n, r) {
        s(e).uniform2fv(s(t), Ce(n, r));
      },
      __wbg_uniform2fv_f022309b362a80c3: function(e, t, n, r) {
        s(e).uniform2fv(s(t), Ce(n, r));
      },
      __wbg_uniform2i_16e8a2c966614be6: function(e, t, n, r) {
        s(e).uniform2i(s(t), n, r);
      },
      __wbg_uniform2i_d353da02172ea38d: function(e, t, n, r) {
        s(e).uniform2i(s(t), n, r);
      },
      __wbg_uniform3f_360c1ea4c73cacef: function(e, t, n, r, a) {
        s(e).uniform3f(s(t), n, r, a);
      },
      __wbg_uniform3f_b616f9e06266a25f: function(e, t, n, r, a) {
        s(e).uniform3f(s(t), n, r, a);
      },
      __wbg_uniform4f_f1a670d511b34878: function(e, t, n, r, a, i) {
        s(e).uniform4f(s(t), n, r, a, i);
      },
      __wbg_uniform4f_f97f3f59af09856f: function(e, t, n, r, a, i) {
        s(e).uniform4f(s(t), n, r, a, i);
      },
      __wbg_uniformMatrix3fv_f45b91f173d7fbed: function(e, t, n, r, a) {
        s(e).uniformMatrix3fv(s(t), n !== 0, Ce(r, a));
      },
      __wbg_uniformMatrix3fv_feab3f952d705f51: function(e, t, n, r, a) {
        s(e).uniformMatrix3fv(s(t), n !== 0, Ce(r, a));
      },
      __wbg_uniformMatrix3x2fv_ab13f9742e5fcb2f: function(e, t, n, r, a) {
        s(e).uniformMatrix3x2fv(s(t), n !== 0, Ce(r, a));
      },
      __wbg_uniformMatrix4fv_540dc6bf792eba8f: function(e, t, n, r, a) {
        s(e).uniformMatrix4fv(s(t), n !== 0, Ce(r, a));
      },
      __wbg_uniformMatrix4fv_e3dac9dd429d6adc: function(e, t, n, r, a) {
        s(e).uniformMatrix4fv(s(t), n !== 0, Ce(r, a));
      },
      __wbg_uniformMatrix4x3fv_115d029ad3124cef: function(e, t, n, r, a) {
        s(e).uniformMatrix4x3fv(s(t), n !== 0, Ce(r, a));
      },
      __wbg_unmap_adaf93276fdf9aaf: function(e) {
        s(e).unmap();
      },
      __wbg_useProgram_55a3e940abb19137: function(e, t) {
        s(e).useProgram(s(t));
      },
      __wbg_useProgram_e24dadf4c06636f5: function(e, t) {
        s(e).useProgram(s(t));
      },
      __wbg_userAgent_8def8135d886414b: function() {
        return T(function(e, t) {
          const n = s(t).userAgent, r = Se(n, v.__wbindgen_export, v.__wbindgen_export2), a = pe;
          z().setInt32(e + 4, a, !0), z().setInt32(e + 0, r, !0);
        }, arguments);
      },
      __wbg_valueOf_41ae57308c1f031c: function(e) {
        return s(e).valueOf();
      },
      __wbg_vertexAttrib4f_6444504b25f4d43e: function(e, t, n, r, a, i) {
        s(e).vertexAttrib4f(t >>> 0, n, r, a, i);
      },
      __wbg_vertexAttrib4f_aad41fe000407191: function(e, t, n, r, a, i) {
        s(e).vertexAttrib4f(t >>> 0, n, r, a, i);
      },
      __wbg_vertexAttribIPointer_ed1c3507e84527e2: function(e, t, n, r, a, i) {
        s(e).vertexAttribIPointer(t >>> 0, n, r >>> 0, a, i);
      },
      __wbg_vertexAttribPointer_39eddea7c20e350c: function(e, t, n, r, a, i, c) {
        s(e).vertexAttribPointer(t >>> 0, n, r >>> 0, a !== 0, i, c);
      },
      __wbg_vertexAttribPointer_3bc50c0431082f73: function(e, t, n, r, a, i, c) {
        s(e).vertexAttribPointer(t >>> 0, n, r >>> 0, a !== 0, i, c);
      },
      __wbg_videoHeight_e267fd1e74bb1b06: function(e) {
        return s(e).videoHeight;
      },
      __wbg_videoWidth_670b8e775ea04b5d: function(e) {
        return s(e).videoWidth;
      },
      __wbg_viewport_14d947f2faf58e85: function(e, t, n, r, a) {
        s(e).viewport(t, n, r, a);
      },
      __wbg_viewport_24055b0754803788: function(e, t, n, r, a) {
        s(e).viewport(t, n, r, a);
      },
      __wbg_warn_410c3261e3c6d686: function(e) {
        console.warn(s(e));
      },
      __wbg_width_f1791280fae1517a: function(e) {
        return s(e).width;
      },
      __wbg_writeTexture_53ba204c494b042c: function() {
        return T(function(e, t, n, r, a, i) {
          s(e).writeTexture(s(t), Kt(n, r), s(a), s(i));
        }, arguments);
      },
      __wbindgen_cast_0000000000000001: function(e, t) {
        const n = xt(e, t, tl);
        return w(n);
      },
      __wbindgen_cast_0000000000000002: function(e, t) {
        const n = xt(e, t, nl);
        return w(n);
      },
      __wbindgen_cast_0000000000000003: function(e, t) {
        const n = xt(e, t, rl);
        return w(n);
      },
      __wbindgen_cast_0000000000000004: function(e, t) {
        const n = xt(e, t, el);
        return w(n);
      },
      __wbindgen_cast_0000000000000005: function(e, t) {
        const n = xt(e, t, al);
        return w(n);
      },
      __wbindgen_cast_0000000000000006: function(e, t) {
        const n = xt(e, t, sl);
        return w(n);
      },
      __wbindgen_cast_0000000000000007: function(e, t) {
        const n = xt(e, t, ol);
        return w(n);
      },
      __wbindgen_cast_0000000000000008: function(e) {
        return w(e);
      },
      __wbindgen_cast_0000000000000009: function(e, t) {
        const n = Ce(e, t);
        return w(n);
      },
      __wbindgen_cast_000000000000000a: function(e, t) {
        const n = Il(e, t);
        return w(n);
      },
      __wbindgen_cast_000000000000000b: function(e, t) {
        const n = zi(e, t);
        return w(n);
      },
      __wbindgen_cast_000000000000000c: function(e, t) {
        const n = Pl(e, t);
        return w(n);
      },
      __wbindgen_cast_000000000000000d: function(e, t) {
        const n = Cl(e, t);
        return w(n);
      },
      __wbindgen_cast_000000000000000e: function(e, t) {
        const n = gs(e, t);
        return w(n);
      },
      __wbindgen_cast_000000000000000f: function(e, t) {
        const n = Kt(e, t);
        return w(n);
      },
      __wbindgen_cast_0000000000000010: function(e, t) {
        const n = F(e, t);
        return w(n);
      },
      __wbindgen_cast_0000000000000011: function(e, t) {
        var n = Kt(e, t).slice();
        return v.__wbindgen_export4(e, t * 1, 1), w(n);
      },
      __wbindgen_object_clone_ref: function(e) {
        const t = s(e);
        return w(t);
      },
      __wbindgen_object_drop_ref: function(e) {
        We(e);
      }
    }
  };
}
function el(e, t, n) {
  v.__wasm_bindgen_func_elem_7238(e, t, w(n));
}
function tl(e, t, n) {
  try {
    const i = v.__wbindgen_add_to_stack_pointer(-16);
    v.__wasm_bindgen_func_elem_10238(i, e, t, w(n));
    var r = z().getInt32(i + 0, !0), a = z().getInt32(i + 4, !0);
    if (a)
      throw We(r);
  } finally {
    v.__wbindgen_add_to_stack_pointer(16);
  }
}
function nl(e, t, n) {
  try {
    const i = v.__wbindgen_add_to_stack_pointer(-16);
    v.__wasm_bindgen_func_elem_7241(i, e, t, w(n));
    var r = z().getInt32(i + 0, !0), a = z().getInt32(i + 4, !0);
    if (a)
      throw We(r);
  } finally {
    v.__wbindgen_add_to_stack_pointer(16);
  }
}
function rl(e, t, n) {
  try {
    const i = v.__wbindgen_add_to_stack_pointer(-16);
    v.__wasm_bindgen_func_elem_7241_2(i, e, t, w(n));
    var r = z().getInt32(i + 0, !0), a = z().getInt32(i + 4, !0);
    if (a)
      throw We(r);
  } finally {
    v.__wbindgen_add_to_stack_pointer(16);
  }
}
function al(e, t, n) {
  try {
    const i = v.__wbindgen_add_to_stack_pointer(-16);
    v.__wasm_bindgen_func_elem_7241_4(i, e, t, w(n));
    var r = z().getInt32(i + 0, !0), a = z().getInt32(i + 4, !0);
    if (a)
      throw We(r);
  } finally {
    v.__wbindgen_add_to_stack_pointer(16);
  }
}
function sl(e, t, n) {
  try {
    const i = v.__wbindgen_add_to_stack_pointer(-16);
    v.__wasm_bindgen_func_elem_7241_5(i, e, t, w(n));
    var r = z().getInt32(i + 0, !0), a = z().getInt32(i + 4, !0);
    if (a)
      throw We(r);
  } finally {
    v.__wbindgen_add_to_stack_pointer(16);
  }
}
function ol(e, t, n) {
  try {
    const i = v.__wbindgen_add_to_stack_pointer(-16);
    v.__wasm_bindgen_func_elem_7241_6(i, e, t, w(n));
    var r = z().getInt32(i + 0, !0), a = z().getInt32(i + 4, !0);
    if (a)
      throw We(r);
  } finally {
    v.__wbindgen_add_to_stack_pointer(16);
  }
}
function il(e, t, n, r) {
  v.__wasm_bindgen_func_elem_10247(e, t, w(n), w(r));
}
const fs = ["clamp-to-edge", "repeat", "mirror-repeat"], Ri = ["auto"], $i = ["zero", "one", "src", "one-minus-src", "src-alpha", "one-minus-src-alpha", "dst", "one-minus-dst", "dst-alpha", "one-minus-dst-alpha", "src-alpha-saturated", "constant", "one-minus-constant", "src1", "one-minus-src1", "src1-alpha", "one-minus-src1-alpha"], cl = ["add", "subtract", "reverse-subtract", "min", "max"], fl = ["uniform", "storage", "read-only-storage"], ll = ["opaque", "premultiplied"], ul = ["standard", "extended"], ls = ["never", "less", "equal", "less-equal", "greater", "not-equal", "greater-equal", "always"], _l = ["none", "front", "back"], dl = ["unknown", "destroyed"], hl = ["validation", "out-of-memory", "internal"], Ui = ["nearest", "linear"], pl = ["ccw", "cw"], us = ["uint16", "uint32"], _s = ["load", "clear"], bl = ["nearest", "linear"], gl = ["low-power", "high-performance"], ml = ["point-list", "line-list", "line-strip", "triangle-list", "triangle-strip"], wl = ["occlusion", "timestamp"], yl = ["filtering", "non-filtering", "comparison"], ds = ["keep", "zero", "replace", "invert", "increment-clamp", "decrement-clamp", "increment-wrap", "decrement-wrap"], vl = ["write-only", "read-only", "read-write"], hs = ["store", "discard"], ps = ["all", "stencil-only", "depth-only"], kl = ["1d", "2d", "3d"], St = ["r8unorm", "r8snorm", "r8uint", "r8sint", "r16unorm", "r16snorm", "r16uint", "r16sint", "r16float", "rg8unorm", "rg8snorm", "rg8uint", "rg8sint", "r32uint", "r32sint", "r32float", "rg16unorm", "rg16snorm", "rg16uint", "rg16sint", "rg16float", "rgba8unorm", "rgba8unorm-srgb", "rgba8snorm", "rgba8uint", "rgba8sint", "bgra8unorm", "bgra8unorm-srgb", "rgb9e5ufloat", "rgb10a2uint", "rgb10a2unorm", "rg11b10ufloat", "rg32uint", "rg32sint", "rg32float", "rgba16unorm", "rgba16snorm", "rgba16uint", "rgba16sint", "rgba16float", "rgba32uint", "rgba32sint", "rgba32float", "stencil8", "depth16unorm", "depth24plus", "depth24plus-stencil8", "depth32float", "depth32float-stencil8", "bc1-rgba-unorm", "bc1-rgba-unorm-srgb", "bc2-rgba-unorm", "bc2-rgba-unorm-srgb", "bc3-rgba-unorm", "bc3-rgba-unorm-srgb", "bc4-r-unorm", "bc4-r-snorm", "bc5-rg-unorm", "bc5-rg-snorm", "bc6h-rgb-ufloat", "bc6h-rgb-float", "bc7-rgba-unorm", "bc7-rgba-unorm-srgb", "etc2-rgb8unorm", "etc2-rgb8unorm-srgb", "etc2-rgb8a1unorm", "etc2-rgb8a1unorm-srgb", "etc2-rgba8unorm", "etc2-rgba8unorm-srgb", "eac-r11unorm", "eac-r11snorm", "eac-rg11unorm", "eac-rg11snorm", "astc-4x4-unorm", "astc-4x4-unorm-srgb", "astc-5x4-unorm", "astc-5x4-unorm-srgb", "astc-5x5-unorm", "astc-5x5-unorm-srgb", "astc-6x5-unorm", "astc-6x5-unorm-srgb", "astc-6x6-unorm", "astc-6x6-unorm-srgb", "astc-8x5-unorm", "astc-8x5-unorm-srgb", "astc-8x6-unorm", "astc-8x6-unorm-srgb", "astc-8x8-unorm", "astc-8x8-unorm-srgb", "astc-10x5-unorm", "astc-10x5-unorm-srgb", "astc-10x6-unorm", "astc-10x6-unorm-srgb", "astc-10x8-unorm", "astc-10x8-unorm-srgb", "astc-10x10-unorm", "astc-10x10-unorm-srgb", "astc-12x10-unorm", "astc-12x10-unorm-srgb", "astc-12x12-unorm", "astc-12x12-unorm-srgb"], Sl = ["float", "unfilterable-float", "depth", "sint", "uint"], bs = ["1d", "2d", "2d-array", "cube", "cube-array", "3d"], xl = ["uint8", "uint8x2", "uint8x4", "sint8", "sint8x2", "sint8x4", "unorm8", "unorm8x2", "unorm8x4", "snorm8", "snorm8x2", "snorm8x4", "uint16", "uint16x2", "uint16x4", "sint16", "sint16x2", "sint16x4", "unorm16", "unorm16x2", "unorm16x4", "snorm16", "snorm16x2", "snorm16x4", "float16", "float16x2", "float16x4", "float32", "float32x2", "float32x3", "float32x4", "uint32", "uint32x2", "uint32x3", "uint32x4", "sint32", "sint32x2", "sint32x3", "sint32x4", "unorm10-10-10-2", "unorm8x4-bgra"], Al = ["vertex", "instance"], Ol = ["same-origin", "no-cors", "cors", "navigate"], Li = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => v.__wbg_devicelostpromise_free(e, 1)), ji = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => v.__wbg_engine_free(e, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => v.__wbg_pixelreadpromise_free(e, 1));
const Dl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => v.__wbg_scenecontroller_free(e, 1));
function w(e) {
  jn === Xe.length && Xe.push(Xe.length + 1);
  const t = jn;
  return jn = Xe[t], Xe[t] = e, t;
}
const Fi = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => v.__wbindgen_export5(e.a, e.b));
function Bs(e) {
  const t = typeof e;
  if (t == "number" || t == "boolean" || e == null)
    return `${e}`;
  if (t == "string")
    return `"${e}"`;
  if (t == "symbol") {
    const a = e.description;
    return a == null ? "Symbol" : `Symbol(${a})`;
  }
  if (t == "function") {
    const a = e.name;
    return typeof a == "string" && a.length > 0 ? `Function(${a})` : "Function";
  }
  if (Array.isArray(e)) {
    const a = e.length;
    let i = "[";
    a > 0 && (i += Bs(e[0]));
    for (let c = 1; c < a; c++)
      i += ", " + Bs(e[c]);
    return i += "]", i;
  }
  const n = /\[object ([^\]]+)\]/.exec(toString.call(e));
  let r;
  if (n && n.length > 1)
    r = n[1];
  else
    return toString.call(e);
  if (r == "Object")
    try {
      return "Object(" + JSON.stringify(e) + ")";
    } catch {
      return "Object";
    }
  return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : r;
}
function El(e) {
  e < 1028 || (Xe[e] = jn, jn = e);
}
function Ce(e, t) {
  return e = e >>> 0, Bl().subarray(e / 4, e / 4 + t);
}
function Il(e, t) {
  return e = e >>> 0, Tl().subarray(e / 2, e / 2 + t);
}
function zi(e, t) {
  return e = e >>> 0, Ml().subarray(e / 4, e / 4 + t);
}
function Pl(e, t) {
  return e = e >>> 0, Rl().subarray(e / 1, e / 1 + t);
}
function ze(e, t) {
  e = e >>> 0;
  const n = z(), r = [];
  for (let a = e; a < e + 4 * t; a += 4)
    r.push(s(n.getUint32(a, !0)));
  return r;
}
function Cl(e, t) {
  return e = e >>> 0, $l().subarray(e / 2, e / 2 + t);
}
function gs(e, t) {
  return e = e >>> 0, Ul().subarray(e / 4, e / 4 + t);
}
function Kt(e, t) {
  return e = e >>> 0, Ln().subarray(e / 1, e / 1 + t);
}
let Ot = null;
function z() {
  return (Ot === null || Ot.buffer.detached === !0 || Ot.buffer.detached === void 0 && Ot.buffer !== v.memory.buffer) && (Ot = new DataView(v.memory.buffer)), Ot;
}
let Sn = null;
function Bl() {
  return (Sn === null || Sn.byteLength === 0) && (Sn = new Float32Array(v.memory.buffer)), Sn;
}
let xn = null;
function Tl() {
  return (xn === null || xn.byteLength === 0) && (xn = new Int16Array(v.memory.buffer)), xn;
}
let An = null;
function Ml() {
  return (An === null || An.byteLength === 0) && (An = new Int32Array(v.memory.buffer)), An;
}
let On = null;
function Rl() {
  return (On === null || On.byteLength === 0) && (On = new Int8Array(v.memory.buffer)), On;
}
function F(e, t) {
  return jl(e >>> 0, t);
}
let Dn = null;
function $l() {
  return (Dn === null || Dn.byteLength === 0) && (Dn = new Uint16Array(v.memory.buffer)), Dn;
}
let En = null;
function Ul() {
  return (En === null || En.byteLength === 0) && (En = new Uint32Array(v.memory.buffer)), En;
}
let In = null;
function Ln() {
  return (In === null || In.byteLength === 0) && (In = new Uint8Array(v.memory.buffer)), In;
}
function s(e) {
  return Xe[e];
}
function T(e, t) {
  try {
    return e.apply(this, t);
  } catch (n) {
    v.__wbindgen_export3(w(n));
  }
}
let Xe = new Array(1024).fill(void 0);
Xe.push(void 0, null, !0, !1);
let jn = Xe.length;
function j(e) {
  return e == null;
}
function xt(e, t, n) {
  const r = { a: e, b: t, cnt: 1 }, a = (...i) => {
    r.cnt++;
    const c = r.a;
    r.a = 0;
    try {
      return n(c, r.b, ...i);
    } finally {
      r.a = c, a._wbg_cb_unref();
    }
  };
  return a._wbg_cb_unref = () => {
    --r.cnt === 0 && (v.__wbindgen_export5(r.a, r.b), r.a = 0, Fi.unregister(r));
  }, Fi.register(a, r, r), a;
}
function Se(e, t, n) {
  if (n === void 0) {
    const f = Fn.encode(e), l = t(f.length, 1) >>> 0;
    return Ln().subarray(l, l + f.length).set(f), pe = f.length, l;
  }
  let r = e.length, a = t(r, 1) >>> 0;
  const i = Ln();
  let c = 0;
  for (; c < r; c++) {
    const f = e.charCodeAt(c);
    if (f > 127) break;
    i[a + c] = f;
  }
  if (c !== r) {
    c !== 0 && (e = e.slice(c)), a = n(a, r, r = c + e.length * 3, 1) >>> 0;
    const f = Ln().subarray(a + c, a + r), l = Fn.encodeInto(e, f);
    c += l.written, a = n(a, r, c, 1) >>> 0;
  }
  return pe = c, a;
}
function We(e) {
  const t = s(e);
  return El(e), t;
}
let zr = new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 });
zr.decode();
const Ll = 2146435072;
let ms = 0;
function jl(e, t) {
  return ms += t, ms >= Ll && (zr = new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }), zr.decode(), ms = t), zr.decode(Ln().subarray(e, e + t));
}
const Fn = new TextEncoder();
"encodeInto" in Fn || (Fn.encodeInto = function(e, t) {
  const n = Fn.encode(e);
  return t.set(n), {
    read: e.length,
    written: n.length
  };
});
let pe = 0, v;
function Fl(e, t) {
  return v = e.exports, Ot = null, Sn = null, xn = null, An = null, On = null, Dn = null, En = null, In = null, v.__wbindgen_start(), v;
}
async function zl(e, t) {
  if (typeof Response == "function" && e instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(e, t);
      } catch (a) {
        if (e.ok && n(e.type) && e.headers.get("Content-Type") !== "application/wasm")
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", a);
        else
          throw a;
      }
    const r = await e.arrayBuffer();
    return await WebAssembly.instantiate(r, t);
  } else {
    const r = await WebAssembly.instantiate(e, t);
    return r instanceof WebAssembly.Instance ? { instance: r, module: e } : r;
  }
  function n(r) {
    switch (r) {
      case "basic":
      case "cors":
      case "default":
        return !0;
    }
    return !1;
  }
}
async function Vl(e) {
  if (v !== void 0) return v;
  e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? { module_or_path: e } = e : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), e === void 0 && (e = new URL(
    /* @vite-ignore */
    "hana3d.wasm",
    import.meta.url
  ));
  const t = Xf();
  (typeof e == "string" || typeof Request == "function" && e instanceof Request || typeof URL == "function" && e instanceof URL) && (e = fetch(e));
  const { instance: n, module: r } = await zl(await e, t);
  return Fl(n);
}
function g(e) {
  let t = Br(e);
  if (typeof t != "object" || t === null)
    throw new Error("Expected object");
}
function ts(e, t) {
  if (e instanceof Error) {
    const n = e;
    n.__path === void 0 && (n.__path = [], n.__baseMessage = n.message), n.__path.unshift(t);
    let r = "";
    for (const a of n.__path)
      r += typeof a == "number" ? "[" + a + "]" : r === "" ? a : "." + a;
    n.message = n.__baseMessage + " (at " + r + ")";
  }
  return e;
}
function o(e, t, n, r, a, i) {
  let c = a ? e : e[n], f = c;
  if (f === void 0) {
    if (t)
      return;
    if (i !== void 0)
      f = i;
    else
      throw new Error("Expected field " + n);
  }
  let l;
  if (a)
    l = r(f);
  else
    try {
      l = r(f);
    } catch (d) {
      throw ts(d, n);
    }
  l !== c && (a ? Object.assign(e, l) : e[n] = l);
}
function B(e, t, n) {
  let r = n(e);
  return r !== e && (r.type = t), r;
}
function Ke(e, t, n) {
  let r = e.value, a = n(r);
  return a !== Br(r) && (e.value = a), e;
}
function u(e) {
  if (typeof e != "number")
    throw new Error("Expected number");
  return e;
}
const It = u;
function te(e) {
  if (typeof e != "number" || e % 1 !== 0)
    throw new Error("Expected integer");
  return e;
}
function ee(e) {
  if (typeof e != "string")
    throw new Error("Expected string");
  return e;
}
function C(e) {
  if (typeof e != "boolean")
    throw new Error("Expected boolean");
  return e;
}
function K(e) {
  return (t) => {
    if (!Array.isArray(Br(t)))
      throw new Error("Expected array");
    for (let n = 0; n < t.length; n++)
      try {
        e(t.at(n));
      } catch (r) {
        throw ts(r, n);
      }
    return t;
  };
}
function Mr(e, t) {
  return (n) => {
    let r = Br(n);
    if (!Array.isArray(r) || n.length !== t)
      throw new Error("Expected array");
    for (let a = 0; a < n.length; a++)
      try {
        e(n.at(a));
      } catch (i) {
        throw ts(i, a);
      }
    return n;
  };
}
function P(e) {
  return (t) => (t !== null && e(t), t);
}
function Nl(e, t) {
  return (n) => {
    g(n);
    for (let r in n)
      try {
        e(r), t(n[r]);
      } catch (a) {
        throw ts(a, r);
      }
    return n;
  };
}
const Tc = (e) => e;
var E;
((e) => {
  e.check = Mr(u, 2);
})(E || (E = {}));
var oe;
((e) => {
  e.check = Mr(u, 3);
})(oe || (oe = {}));
var tt;
((e) => {
  e.check = Mr(u, 4);
  function t(n, r, a, i) {
    return [n, r, a, i];
  }
  e.new_ = t;
})(tt || (tt = {}));
var Vi;
((e) => {
  e.check = Mr(u, 6);
})(Vi || (Vi = {}));
const Wl = (e) => {
  switch (g(e), e.type) {
    case "Url":
      return Ke(e, "Url", ee), e;
    case "Local":
      return Ke(e, "Local", Jn.check), e;
    default:
      throw new Error(
        "Invalid type for LegacyUrlOrPlatformUInt8Array: " + String(e.type)
      );
  }
};
var Ts;
((e) => {
  e.check = Wl;
})(Ts || (Ts = {}));
const Hl = oe.check;
var Le;
((e) => {
  e.check = Hl;
})(Le || (Le = {}));
const Gl = tt.check;
var Oe;
((e) => {
  e.check = Gl;
})(Oe || (Oe = {}));
const ql = (e) => (g(e), o(e, !1, "min", E.check, !1), o(e, !1, "max", E.check, !1), e);
var aa;
((e) => {
  e.check = ql;
})(aa || (aa = {}));
var Zn = /* @__PURE__ */ ((e) => (e.x = "x", e.y = "y", e.z = "z", e))(Zn || {});
const Zl = [
  "x",
  "y",
  "z"
  /* z */
], Kl = (e) => {
  if (!Zl.includes(e))
    throw new Error("Invalid value for AxisData: " + String(e));
  return e;
};
((e) => {
  e.check = Kl;
})(Zn || (Zn = {}));
var Ms = /* @__PURE__ */ ((e) => (e.x = "x", e.nx = "-x", e.y = "y", e.ny = "-y", e))(Ms || {});
const Jl = [
  "x",
  "-x",
  "y",
  "-y"
  /* ny */
], Ql = (e) => {
  if (!Jl.includes(e))
    throw new Error("Invalid value for DirectionalAxisData: " + String(e));
  return e;
};
((e) => {
  e.check = Ql;
})(Ms || (Ms = {}));
var Kn = /* @__PURE__ */ ((e) => (e.Front = "Front", e.Back = "Back", e.Both = "Both", e))(Kn || {});
const Yl = [
  "Front",
  "Back",
  "Both"
  /* Both */
], Xl = (e) => {
  if (!Yl.includes(e))
    throw new Error("Invalid value for SideData: " + String(e));
  return e;
};
((e) => {
  e.check = Xl;
})(Kn || (Kn = {}));
((e) => {
  function t(n, r) {
    return [n, r];
  }
  e.new_ = t;
})(E || (E = {}));
((e) => {
  function t(n, r, a) {
    return [n, r, a];
  }
  e.new_ = t;
})(oe || (oe = {}));
var Jn;
((e) => {
  e.check = (t) => {
    if (!(t instanceof Uint8Array))
      throw new Error("Invalid value for UInt8Array");
    return t;
  };
})(Jn || (Jn = {}));
var Rs;
((e) => {
  e.check = (t) => {
    if (!(t instanceof Uint8Array))
      throw new Error("Invalid value for PlatformUInt8Array");
    return t;
  };
})(Rs || (Rs = {}));
var sn;
((e) => {
  function t(r) {
    return r instanceof en ? null : r;
  }
  e.externalToNull = t;
  function n(r) {
    if (typeof r == "string" || r instanceof Uint8Array || r instanceof en)
      return r;
    {
      const a = Ts.check(r);
      if (a.type === "Url" || a.type === "Local")
        return a.value;
      throw new Error("Invalid UrlOrPlatformUInt8Array");
    }
  }
  e.check = n;
})(sn || (sn = {}));
((e) => {
  e.union = (t) => t.reduce((n, r) => r ? n ? {
    min: [Math.min(n.min[0], r.min[0]), Math.min(n.min[1], r.min[1])],
    max: [Math.max(n.max[0], r.max[0]), Math.max(n.max[1], r.max[1])]
  } : r : n, null), e.translate = (t, n, r) => ({
    min: [t.min[0] + n, t.min[1] + r],
    max: [t.max[0] + n, t.max[1] + r]
  });
})(aa || (aa = {}));
function eu(e) {
  return (t) => {
    const n = [() => V.check(t), () => e(t)];
    for (const r of n)
      try {
        return r();
      } catch {
      }
    throw new Error("Invalid value for Sharable");
  };
}
var Ni;
((e) => {
  e.check = eu;
})(Ni || (Ni = {}));
function tu(e) {
  return (t) => (g(t), o(t, !1, "data", e, !1), o(t, !1, "fi", It, !1), o(t, !1, "id", V.check, !1), t);
}
var $s;
((e) => {
  e.check = tu;
})($s || ($s = {}));
function Mc(e) {
  return K($s.check(e));
}
var Wi;
((e) => {
  e.check = Mc;
})(Wi || (Wi = {}));
function nu(e) {
  return (t) => (g(t), o(t, !1, "data", e, !1), o(t, !1, "fi", It, !1), o(t, !1, "id", V.check, !1), o(t, !1, "children", Qn.check(e), !1), t);
}
var on;
((e) => {
  e.check = nu;
})(on || (on = {}));
function Rc(e) {
  return K(on.check(e));
}
var Hi;
((e) => {
  e.check = Rc;
})(Hi || (Hi = {}));
function ru(e) {
  return Nl(V.check, e);
}
var Gi;
((e) => {
  e.check = ru;
})(Gi || (Gi = {}));
var V;
((e) => {
  function t(n) {
    if (typeof n != "string")
      throw new Error("Expected string");
    return n;
  }
  e.check = t;
})(V || (V = {}));
var Qn;
((e) => {
  function t(n) {
    return (r) => {
      if (r instanceof Pr)
        r.traverse((a, i) => {
          n(i);
        });
      else {
        const a = Rc(n)(r);
        Object.setPrototypeOf(a, Ne.prototype);
      }
      return r;
    };
  }
  e.check = t;
})(Qn || (Qn = {}));
var Z;
((e) => {
  function t(r) {
    return (a) => {
      g(a);
      for (const i in a)
        r(a[i]);
      if (Br(a) !== a) {
        if (Object.getPrototypeOf(a) !== Ie.prototype)
          throw new Error("cannot set prototype");
      } else
        Object.getPrototypeOf(a) !== Ie.prototype && Object.setPrototypeOf(a, Ie.prototype);
      return a;
    };
  }
  e.check = t;
  function n() {
    return new Ie();
  }
  e.new_ = n;
})(Z || (Z = {}));
var _e;
((e) => {
  function t() {
    return new Ae();
  }
  e.new_ = t;
  function n(r) {
    return (a) => {
      if (a instanceof Cr)
        a.forEach((i) => {
          r(i);
        });
      else {
        const i = Mc(r)(a), c = new Ae(), f = /* @__PURE__ */ new Set();
        for (const l of i)
          f.has(l.id) || (f.add(l.id), c.push(l));
        return c;
      }
      return a;
    };
  }
  e.check = n;
})(_e || (_e = {}));
function au(e, t) {
  const n = {};
  for (const r in e)
    e[r] !== t[r] && (n[r] = t[r]);
  for (const r in t)
    r in e || (n[r] = t[r]);
  return n;
}
function su(e) {
  for (const t of Object.keys(e))
    e[t] === void 0 && delete e[t];
  return e;
}
function Vr(e, t) {
  return Math.abs(e - t) < Number.EPSILON;
}
function Et(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (!Vr(e[n], t[n]))
      return !1;
  return !0;
}
function $c(e, t = 0) {
  return e.map((n) => ou(n, t));
}
function ou(e, t = 0) {
  return typeof e == "string" || isFinite(e) ? e : t;
}
function st(e, t) {
  e.check = t;
}
const iu = (e) => (g(e), o(e, !1, "name", ee, !1, ""), e);
function cu() {
  return {
    name: ""
  };
}
var Mt;
((e) => {
  e.check = iu, e.defaultData = cu;
})(Mt || (Mt = {}));
const fu = (e) => {
  switch (g(e), e.type) {
    case "transition":
      return B(e, "transition", Xn.check);
    case "video":
      return B(e, "video", rr.check);
    case "link":
      return B(e, "link", ar.check);
    case "show":
      return B(e, "show", sr.check);
    case "animation":
      return B(e, "animation", or.check);
    default:
      throw new Error("Invalid type for ActionData: " + String(e.type));
  }
};
var Rt;
((e) => {
  e.check = fu;
})(Rt || (Rt = {}));
var Yn = /* @__PURE__ */ ((e) => (e.once = "once", e.repeat = "repeat", e.toggle = "toggle", e))(Yn || {});
const lu = [
  "once",
  "repeat",
  "toggle"
  /* toggle */
], uu = (e) => {
  if (!lu.includes(e))
    throw new Error("Invalid value for RunModeData: " + String(e));
  return e;
};
((e) => {
  e.check = uu;
})(Yn || (Yn = {}));
const _u = (e) => (g(e), o(e, !1, "base", Mt.check, !0), o(e, !1, "object", P(V.check), !1), o(e, !1, "tweens", _e.check(er.check), !1), o(e, !1, "runMode", Yn.check, !1), o(e, !1, "repeat", te, !1), o(e, !1, "direction", tr.check, !1), o(e, !1, "delay", u, !1), o(e, !1, "delayDirection", nr.check, !1), e);
var Xn;
((e) => {
  e.check = _u;
})(Xn || (Xn = {}));
const Uc = (e) => {
  switch (g(e), e.type) {
    case "current":
      return Ke(e, "current", Tc), e;
    case "state":
      return Ke(e, "state", P(V.check)), e;
    default:
      throw new Error("Invalid type for TweenStateData: " + String(e.type));
  }
};
var sa;
((e) => {
  e.check = Uc;
})(sa || (sa = {}));
const Lc = (e) => (g(e), o(e, !1, "state", sa.check, !1), o(e, !1, "duration", u, !1), o(e, !1, "easing", oa.check, !1), o(e, !1, "repeat", te, !1), o(e, !1, "direction", tr.check, !1), o(e, !1, "delay", u, !1), o(e, !1, "delayDirection", nr.check, !1), o(e, !1, "control1", P(E.check), !1), o(e, !1, "control2", P(E.check), !1), o(e, !1, "mass", P(It), !1), o(e, !1, "stiffness", P(It), !1), o(e, !1, "damping", P(It), !1), o(e, !1, "velocity", P(It), !1), e);
var er;
((e) => {
  e.check = Lc;
})(er || (er = {}));
var oa = /* @__PURE__ */ ((e) => (e[e.linear = 0] = "linear", e[e.ease = 1] = "ease", e[e.easeIn = 2] = "easeIn", e[e.easeOut = 3] = "easeOut", e[e.easeInOut = 4] = "easeInOut", e[e.bezier = 5] = "bezier", e[e.spring = 6] = "spring", e[e.inBezier = 7] = "inBezier", e[e.outBezier = 8] = "outBezier", e[e.inOutBezier = 9] = "inOutBezier", e[e.outInBezier = 10] = "outInBezier", e[e.inPower = 11] = "inPower", e[e.outPower = 12] = "outPower", e[e.inOutPower = 13] = "inOutPower", e[e.outInPower = 14] = "outInPower", e[e.inSine = 15] = "inSine", e[e.outSine = 16] = "outSine", e[e.inOutSine = 17] = "inOutSine", e[e.outInSine = 18] = "outInSine", e[e.inExpo = 19] = "inExpo", e[e.outExpo = 20] = "outExpo", e[e.inOutExpo = 21] = "inOutExpo", e[e.outInExpo = 22] = "outInExpo", e[e.inCirc = 23] = "inCirc", e[e.outCirc = 24] = "outCirc", e[e.inOutCirc = 25] = "inOutCirc", e[e.outInCirc = 26] = "outInCirc", e[e.inBack = 27] = "inBack", e[e.outBack = 28] = "outBack", e[e.inOutBack = 29] = "inOutBack", e[e.outInBack = 30] = "outInBack", e))(oa || {});
const du = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30
  /* outInBack */
], hu = (e) => {
  if (!du.includes(e))
    throw new Error("Invalid value for EasingData: " + String(e));
  return e;
};
((e) => {
  e.check = hu;
})(oa || (oa = {}));
var tr = /* @__PURE__ */ ((e) => (e.normal = "normal", e.pingpong = "pingpong", e.pingpongRewind = "pingpongRewind", e))(tr || {});
const pu = [
  "normal",
  "pingpong",
  "pingpongRewind"
  /* pingpongRewind */
], bu = (e) => {
  if (!pu.includes(e))
    throw new Error("Invalid value for RepeatDirectionData: " + String(e));
  return e;
};
((e) => {
  e.check = bu;
})(tr || (tr = {}));
var nr = /* @__PURE__ */ ((e) => (e.startOnce = "startOnce", e.start = "start", e.end = "end", e.startEnd = "startEnd", e))(nr || {});
const gu = [
  "startOnce",
  "start",
  "end",
  "startEnd"
  /* startEnd */
], mu = (e) => {
  if (!gu.includes(e))
    throw new Error("Invalid value for DelayDirectionData: " + String(e));
  return e;
};
((e) => {
  e.check = mu;
})(nr || (nr = {}));
const wu = (e) => (g(e), o(e, !1, "base", Mt.check, !0), o(e, !1, "object", P(V.check), !1), o(e, !1, "layerId", P(V.check), !1), o(e, !1, "interaction", ia.check, !1), o(e, !1, "triggerAfter", P(ca.check), !1), o(e, !1, "delay", u, !1), o(e, !1, "toggle", P(fa.check), !1), o(e, !1, "volume", u, !1), o(e, !1, "autoLoop", C, !1), e);
var rr;
((e) => {
  e.check = wu;
})(rr || (rr = {}));
var ia = /* @__PURE__ */ ((e) => (e.play = "play", e.pause = "pause", e.stop = "stop", e))(ia || {});
const yu = [
  "play",
  "pause",
  "stop"
  /* stop */
], vu = (e) => {
  if (!yu.includes(e))
    throw new Error("Invalid value for VideoInteractionData: " + String(e));
  return e;
};
((e) => {
  e.check = vu;
})(ia || (ia = {}));
var ca = /* @__PURE__ */ ((e) => (e.autoplay = "autoplay", e.any = "any", e.mouseDown = "mouseDown", e.keyDown = "keyDown", e))(ca || {});
const ku = [
  "autoplay",
  "any",
  "mouseDown",
  "keyDown"
  /* keyDown */
], Su = (e) => {
  if (!ku.includes(e))
    throw new Error("Invalid value for TriggerAfterVideoType: " + String(e));
  return e;
};
((e) => {
  e.check = Su;
})(ca || (ca = {}));
var fa = /* @__PURE__ */ ((e) => (e.none = "none", e.stop = "stop", e.pause = "pause", e))(fa || {});
const xu = [
  "none",
  "stop",
  "pause"
  /* pause */
], Au = (e) => {
  if (!xu.includes(e))
    throw new Error("Invalid value for ToggleData: " + String(e));
  return e;
};
((e) => {
  e.check = Au;
})(fa || (fa = {}));
var la = /* @__PURE__ */ ((e) => (e.Current = "Current", e.Tab = "Tab", e.Window = "Window", e))(la || {});
const Ou = [
  "Current",
  "Tab",
  "Window"
  /* Window */
], Du = (e) => {
  if (!Ou.includes(e))
    throw new Error("Invalid value for LinkTargetData: " + String(e));
  return e;
};
((e) => {
  e.check = Du;
})(la || (la = {}));
const Eu = (e) => (g(e), o(e, !1, "base", Mt.check, !0), o(e, !1, "url", ee, !1, ""), o(
  e,
  !1,
  "target",
  la.check,
  !1,
  "Tab"
  /* Tab */
), e);
var ar;
((e) => {
  e.check = Eu;
})(ar || (ar = {}));
const Iu = (e) => (g(e), o(e, !1, "base", Mt.check, !0), o(e, !1, "object", P(V.check), !1), o(e, !1, "show", C, !1, !0), o(e, !1, "toggle", C, !1, !1), e);
var sr;
((e) => {
  e.check = Iu;
})(sr || (sr = {}));
const Pu = (e) => (g(e), o(e, !1, "base", Mt.check, !0), o(e, !1, "object", P(V.check), !1), o(e, !1, "clipID", P(V.check), !1), o(e, !1, "runMode", Yn.check, !1), o(e, !1, "repeat", te, !1), o(e, !1, "delay", u, !1), o(e, !1, "isPingPong", C, !1), o(e, !0, "crop", E.check, !1), e);
var or;
((e) => {
  e.check = Pu;
})(or || (or = {}));
st(sa, (e) => {
  const t = e;
  return t.type === "base" ? (t.type = "state", t.value = null) : t.id !== void 0 && (t.value = t.id, t.id = void 0), Uc(t);
});
((e) => {
  e.defaultData = (t) => Lc({
    state: t,
    repeat: 0,
    delay: 0,
    delayDirection: "startOnce",
    direction: "normal",
    duration: 300,
    easing: 9,
    control1: null,
    control2: null,
    mass: null,
    stiffness: null,
    damping: null,
    velocity: null
  }), e.defaultDataSpring = {
    mass: 1,
    stiffness: 80,
    damping: 10,
    velocity: 0
  }, e.defaultDataBezier = {
    control1: [0.5, 0],
    control2: [0.5, 1]
  }, e.defaultDataEasing = {
    // 	https://www.w3.org/TR/css-easing-1/#cubic-bezier-easing-functions
    linear: [0, 0, 1, 1],
    ease: [0.25, 0.1, 0.25, 1],
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1]
  };
})(er || (er = {}));
((e) => {
  function t(n) {
    return {
      type: "transition",
      runMode: "repeat",
      object: n,
      tweens: new Ae(),
      repeat: 0,
      delay: 0,
      delayDirection: "startOnce",
      direction: "normal",
      name: "Transition"
    };
  }
  e.defaultData = t;
})(Xn || (Xn = {}));
((e) => {
  function t(n) {
    return {
      type: "video",
      object: n,
      layerId: null,
      toggle: "none",
      delay: 0,
      volume: 9,
      autoLoop: !0,
      interaction: "play",
      triggerAfter: "autoplay",
      name: "Video"
    };
  }
  e.defaultData = t;
})(rr || (rr = {}));
((e) => {
  function t() {
    return {
      type: "link",
      target: "Tab",
      url: "",
      name: "Link"
    };
  }
  e.defaultData = t;
})(ar || (ar = {}));
((e) => {
  function t(n) {
    return {
      type: "show",
      object: n,
      name: "Show / Hide",
      show: !0,
      toggle: !1
    };
  }
  e.defaultData = t;
})(sr || (sr = {}));
((e) => {
  function t(n) {
    return {
      type: "animation",
      object: n,
      clipID: null,
      runMode: "repeat",
      repeat: -1,
      delay: 0,
      isPingPong: !1,
      name: "Animation"
    };
  }
  e.defaultData = t;
})(or || (or = {}));
function Cu(e, t) {
  let n, r;
  for (const a in e)
    t.includes(a) ? (n ?? (n = {}), n[a] = e[a]) : (r ?? (r = {}), r[a] = e[a]);
  return [n, r];
}
function Bu(e, t) {
  if (!t)
    return e;
  let n = !1;
  const r = { ...e };
  for (const a in t) {
    const i = t[a];
    i !== void 0 && r[a] !== void 0 && (n = !0, r[a] = i);
  }
  return n ? r : e;
}
function ws(e, t, n, r) {
  if (!n)
    return e;
  const a = e[t];
  if (a == null)
    return e;
  const i = r(a, n);
  return i === a ? e : { ...e, [t]: i };
}
function Tu(e, t, n) {
  if (!t)
    return e;
  let r = !1;
  const a = {};
  return Object.entries(e).forEach((i) => {
    const [c, f] = i, l = t[c];
    l === void 0 && (a[c] = f);
    const d = n(f, l);
    f !== d ? (r = !0, a[c] = d) : a[c] = f;
  }), r ? (Object.setPrototypeOf(a, Ie.prototype), a) : e;
}
function Mu(e, t, n) {
  if (!t)
    return e;
  let r = !1;
  const a = e.map((i) => {
    const c = t[i.id];
    if (c === void 0)
      return i;
    const f = n(i.data, c);
    return i.data !== f ? (r = !0, { ...i, data: f }) : i;
  });
  return r ? (Object.setPrototypeOf(a, Ae.prototype), a) : e;
}
function Ru(e, t) {
  let n;
  for (const r of t)
    e[r] !== void 0 && (n ?? (n = {}), n[r] = e[r]);
  return n;
}
function ce(e, t, n) {
  if (t == null)
    return e;
  const r = t;
  let a = e;
  const i = Ru(r, n.scalars);
  if (i !== void 0 && (a = Bu(a, i)), n.containers)
    for (const c in n.containers) {
      const f = n.containers[c];
      a = ws(
        a,
        c,
        r[c],
        (l, d) => ce(l, d, f())
      );
    }
  if (n.tables)
    for (const c in n.tables) {
      const f = n.tables[c];
      a = ws(
        a,
        c,
        r[c],
        (l, d) => Tu(l, d, (m, y) => ce(m, y, f()))
      );
    }
  if (n.seqs)
    for (const c in n.seqs) {
      const f = n.seqs[c];
      a = ws(
        a,
        c,
        r[c],
        (l, d) => Mu(l, d, (m, y) => ce(m, y, f()))
      );
    }
  return a;
}
function $u(e, t) {
  let n = e;
  const r = [], a = [];
  let i = 0;
  for (; i < t.length; ) {
    const c = t[i];
    if (typeof c == "string" && n.containers && c in n.containers)
      r.push({
        zoomPath: [...a, c],
        op: { type: be.Update, path: [...a], props: { [c]: {} } }
      }), a.push(c), n = n.containers[c](), i += 1;
    else if (typeof c == "string" && (n.tables && c in n.tables || n.seqs && c in n.seqs)) {
      const f = t[i + 1];
      if (f === void 0)
        return;
      const l = n.tables?.[c] ?? n.seqs?.[c];
      r.push({
        zoomPath: [...a, c],
        op: {
          type: be.Update,
          path: [...a],
          props: { [c]: new Ie() }
        }
      }), r.push({
        zoomPath: [...a, c, f],
        op: { type: xe.Add, path: [...a, c], id: f, data: {} }
      }), a.push(c, f), n = l(), i += 2;
    } else
      return;
  }
  return { scalars: n.scalars, chain: r };
}
function Uu(e, t, n, r, a) {
  const i = r;
  if (i.type !== be.Update)
    return [n, [r]];
  const c = $u(e, i.path);
  if (c === void 0)
    return [n, [r]];
  const [f, l] = Cu(i.props, c.scalars), d = [];
  let m = n;
  if (f !== void 0) {
    const y = [];
    if ($e.zoom(n, i.path) === void 0)
      for (const x of c.chain)
        $e.zoom(n, x.zoomPath) === void 0 && y.push(x.op);
    y.push({ ...i, props: f }), m = ta.apply(n, y)?.data ?? n, t(m);
    for (const x of y) {
      const L = x;
      d.push({ ...L, path: ["states", a, ...L.path] });
    }
  }
  return l !== void 0 && d.push({ ...i, props: l }), [m, d];
}
const Lu = (e) => (g(e), o(e, !1, "enabled", C, !1, !0), e);
function ju() {
  return {
    enabled: !0
  };
}
var He;
((e) => {
  e.check = Lu, e.defaultData = ju;
})(He || (He = {}));
const Fu = (e) => (g(e), o(e, !1, "base", He.check, !0), o(e, !1, "offset", E.check, !1), o(e, !1, "blur", u, !1), o(e, !1, "spread", u, !1), o(e, !1, "color", Oe.check, !1), e);
var Us;
((e) => {
  e.check = Fu;
})(Us || (Us = {}));
const zu = (e) => (g(e), o(e, !1, "base", He.check, !0), o(e, !1, "offset", E.check, !1), o(e, !1, "blur", u, !1), o(e, !1, "spread", u, !1), o(e, !1, "color", Oe.check, !1), e);
var Ls;
((e) => {
  e.check = zu;
})(Ls || (Ls = {}));
const Vu = (e) => (g(e), o(e, !1, "radius", u, !1), e);
var js;
((e) => {
  e.check = Vu;
})(js || (js = {}));
const Nu = (e) => (g(e), o(e, !1, "radius_start", u, !1), o(e, !1, "radius_end", u, !1), o(e, !1, "position_start", E.check, !1), o(e, !1, "position_end", E.check, !1), e);
var Fs;
((e) => {
  e.check = Nu;
})(Fs || (Fs = {}));
const zs = (e) => {
  switch (g(e), e.type) {
    case "Uniform":
      return B(e, "Uniform", js.check);
    case "Progressive":
      return B(e, "Progressive", Fs.check);
    default:
      throw new Error("Invalid type for BlurData: " + String(e.type));
  }
};
var $t;
((e) => {
  e.check = zs, e.stateSchema = {
    scalars: ["radius", "radius_start", "radius_end", "position_start", "position_end"]
  };
  function t(n, r) {
    return ce(n, r, e.stateSchema);
  }
  e.applyState = t;
})($t || ($t = {}));
const Wu = (e) => (g(e), o(e, !0, "radius", u, !1), o(e, !0, "radius_start", u, !1), o(e, !0, "radius_end", u, !1), o(e, !0, "position_start", E.check, !1), o(e, !0, "position_end", E.check, !1), e);
function Hu() {
  return {
    radius: void 0,
    radius_start: void 0,
    radius_end: void 0,
    position_start: void 0,
    position_end: void 0
  };
}
var Vs;
((e) => {
  e.check = Wu, e.defaultData = Hu;
})(Vs || (Vs = {}));
const Gu = (e) => (g(e), o(e, !1, "base", He.check, !0), o(e, !1, "blurData", $t.check, !1), e);
var Ns;
((e) => {
  e.check = Gu;
})(Ns || (Ns = {}));
const qu = (e) => (g(e), o(e, !1, "base", He.check, !0), o(e, !1, "blurData", $t.check, !1), e);
var Ws;
((e) => {
  e.check = qu;
})(Ws || (Ws = {}));
const Zu = (e) => (g(e), o(e, !1, "base", He.check, !0), o(e, !1, "offset", E.check, !1, E.new_(0, 0)), o(e, !1, "distortion", u, !1, 15), o(e, !1, "depth", u, !1, 10), o(e, !1, "blur", u, !1, 10), o(e, !1, "chromatic_aberration", u, !1, 0), o(e, !1, "chromatic_aberration_is_edge_only", C, !1, !0), o(e, !1, "profile", u, !1, 0), o(e, !1, "magnification", u, !1, 0), e);
var Hs;
((e) => {
  e.check = Zu;
})(Hs || (Hs = {}));
const Ku = (e) => (g(e), o(e, !1, "amplitude", u, !1), e);
var Gs;
((e) => {
  e.check = Ku;
})(Gs || (Gs = {}));
var ua = /* @__PURE__ */ ((e) => (e.Linear = "Linear", e.Radial = "Radial", e))(ua || {});
const Ju = [
  "Linear",
  "Radial"
  /* Radial */
], Qu = (e) => {
  if (!Ju.includes(e))
    throw new Error("Invalid value for AmplitudeFalloffTypeData: " + String(e));
  return e;
};
((e) => {
  e.check = Qu;
})(ua || (ua = {}));
const Yu = (e) => (g(e), o(e, !1, "amplitude_start", u, !1), o(e, !1, "amplitude_end", u, !1), o(e, !1, "position_start", E.check, !1), o(e, !1, "position_end", E.check, !1), o(
  e,
  !1,
  "amplitude_falloff_type",
  ua.check,
  !1,
  "Linear"
  /* Linear */
), o(e, !1, "taper", u, !1, 0), e);
var qs;
((e) => {
  e.check = Yu;
})(qs || (qs = {}));
const Zs = (e) => {
  switch (g(e), e.type) {
    case "Uniform":
      return B(e, "Uniform", Gs.check);
    case "Progressive":
      return B(e, "Progressive", qs.check);
    default:
      throw new Error("Invalid type for AmplitudeData: " + String(e.type));
  }
};
var nt;
((e) => {
  e.check = Zs, e.stateSchema = {
    scalars: [
      "amplitude",
      "amplitude_start",
      "amplitude_end",
      "position_start",
      "position_end",
      "taper"
    ]
  };
  function t(n, r) {
    return ce(n, r, e.stateSchema);
  }
  e.applyState = t;
})(nt || (nt = {}));
const Xu = (e) => (g(e), o(e, !0, "amplitude", u, !1), o(e, !0, "amplitude_start", u, !1), o(e, !0, "amplitude_end", u, !1), o(e, !0, "position_start", E.check, !1), o(e, !0, "position_end", E.check, !1), o(e, !0, "taper", u, !1), e);
function e_() {
  return {
    amplitude: void 0,
    amplitude_start: void 0,
    amplitude_end: void 0,
    position_start: void 0,
    position_end: void 0,
    taper: void 0
  };
}
var Ks;
((e) => {
  e.check = Xu, e.defaultData = e_;
})(Ks || (Ks = {}));
var ir = /* @__PURE__ */ ((e) => (e.Simplex = "Simplex", e.Fbm = "Fbm", e.Voronoi = "Voronoi", e.Sine = "Sine", e))(ir || {});
const t_ = [
  "Simplex",
  "Fbm",
  "Voronoi",
  "Sine"
  /* Sine */
], n_ = (e) => {
  if (!t_.includes(e))
    throw new Error("Invalid value for NoiseTypeData: " + String(e));
  return e;
};
((e) => {
  e.check = n_;
})(ir || (ir = {}));
const jc = (e) => (g(e), o(e, !1, "base", He.check, !0), o(
  e,
  !1,
  "noise_type",
  ir.check,
  !1,
  "Simplex"
  /* Simplex */
), o(e, !1, "blur", u, !1), o(e, !1, "amplitudeData", nt.check, !1), o(e, !1, "scale", u, !1), o(e, !1, "stretch", E.check, !1), o(e, !1, "offset", E.check, !1), o(e, !1, "movement", u, !1), o(e, !1, "seed", u, !1, 0), e);
var _a;
((e) => {
  e.check = jc;
})(_a || (_a = {}));
const Fc = (e) => (g(e), o(e, !1, "base", He.check, !0), o(
  e,
  !1,
  "noise_type",
  ir.check,
  !1,
  "Simplex"
  /* Simplex */
), o(e, !1, "blur", u, !1), o(e, !1, "amplitudeData", nt.check, !1), o(e, !1, "scale", u, !1), o(e, !1, "stretch", E.check, !1), o(e, !1, "offset", E.check, !1), o(e, !1, "movement", u, !1), o(e, !1, "seed", u, !1, 0), e);
var da;
((e) => {
  e.check = Fc;
})(da || (da = {}));
var ha = /* @__PURE__ */ ((e) => (e.Sphere = "Sphere", e.Cylinder = "Cylinder", e))(ha || {});
const r_ = [
  "Sphere",
  "Cylinder"
  /* Cylinder */
], a_ = (e) => {
  if (!r_.includes(e))
    throw new Error("Invalid value for ProjectionEffectKindData: " + String(e));
  return e;
};
((e) => {
  e.check = a_;
})(ha || (ha = {}));
var pa = /* @__PURE__ */ ((e) => (e.Auto = "Auto", e.Custom = "Custom", e))(pa || {});
const s_ = [
  "Auto",
  "Custom"
  /* Custom */
], o_ = (e) => {
  if (!s_.includes(e))
    throw new Error("Invalid value for ShadowColorTypeData: " + String(e));
  return e;
};
((e) => {
  e.check = o_;
})(pa || (pa = {}));
const di = (e) => (g(e), o(e, !1, "enabled", C, !1, !1), o(e, !1, "intensity", u, !1), o(e, !1, "color", Le.check, !1), o(e, !1, "shadowColor", Le.check, !1), o(
  e,
  !1,
  "shadowColorType",
  pa.check,
  !1,
  "Auto"
  /* Auto */
), o(e, !1, "height", u, !1), o(e, !1, "direction", u, !1), o(e, !1, "ambient", u, !1, 0), o(e, !1, "ambientColor", Le.check, !1), o(e, !1, "specular", u, !1, 0), o(e, !1, "castShadows", C, !1, !1), o(e, !1, "shadowBlur", u, !1, 5), e);
var bt;
((e) => {
  e.check = di, e.stateSchema = {
    scalars: [
      "intensity",
      "color",
      "shadowColor",
      "height",
      "direction",
      "ambient",
      "ambientColor"
    ]
  };
  function t(n, r) {
    return ce(n, r, e.stateSchema);
  }
  e.applyState = t;
})(bt || (bt = {}));
const i_ = (e) => (g(e), o(e, !0, "intensity", u, !1), o(e, !0, "color", Le.check, !1), o(e, !0, "shadowColor", Le.check, !1), o(e, !0, "height", u, !1), o(e, !0, "direction", u, !1), o(e, !0, "ambient", u, !1), o(e, !0, "ambientColor", Le.check, !1), e);
function c_() {
  return {
    intensity: void 0,
    color: void 0,
    shadowColor: void 0,
    height: void 0,
    direction: void 0,
    ambient: void 0,
    ambientColor: void 0
  };
}
var Js;
((e) => {
  e.check = i_, e.defaultData = c_;
})(Js || (Js = {}));
const f_ = (e) => (g(e), o(e, !1, "base", He.check, !0), o(e, !1, "inputSize", E.check, !1), o(e, !1, "inputQuality", u, !1), o(e, !1, "kind", ha.check, !1), o(e, !1, "radius", u, !1), o(e, !1, "height", u, !1), o(e, !1, "rotation", oe.check, !1), o(e, !1, "side", Kn.check, !1), o(e, !1, "perspective", u, !1), o(e, !1, "light", bt.check, !1), e);
var Qs;
((e) => {
  e.check = f_;
})(Qs || (Qs = {}));
var ba = /* @__PURE__ */ ((e) => (e.Torus = "Torus", e.Sphere = "Sphere", e.Custom = "Custom", e))(ba || {});
const l_ = [
  "Torus",
  "Sphere",
  "Custom"
  /* Custom */
], u_ = (e) => {
  if (!l_.includes(e))
    throw new Error("Invalid value for Mesh3dEffectGeometryData: " + String(e));
  return e;
};
((e) => {
  e.check = u_;
})(ba || (ba = {}));
var ga = /* @__PURE__ */ ((e) => (e.Round = "Round", e.Flat = "Flat", e.FlatRounded = "FlatRounded", e.Concave = "Concave", e.Inflate = "Inflate", e))(ga || {});
const __ = [
  "Round",
  "Flat",
  "FlatRounded",
  "Concave",
  "Inflate"
  /* Inflate */
], d_ = (e) => {
  if (!__.includes(e))
    throw new Error("Invalid value for Mesh3dBevelTypeData: " + String(e));
  return e;
};
((e) => {
  e.check = d_;
})(ga || (ga = {}));
const h_ = (e) => (g(e), o(e, !1, "enabled", C, !1, !1), o(e, !1, "color", Le.check, !1), o(e, !1, "bias", u, !1, 0.1), o(e, !1, "scale", u, !1, 1), o(e, !1, "intensity", u, !1, 2), o(e, !1, "factor", u, !1, 1), e);
var Ut;
((e) => {
  e.check = h_, e.stateSchema = {
    scalars: ["color", "bias", "scale", "intensity", "factor"]
  };
  function t(n, r) {
    return ce(n, r, e.stateSchema);
  }
  e.applyState = t;
})(Ut || (Ut = {}));
const p_ = (e) => (g(e), o(e, !0, "color", Le.check, !1), o(e, !0, "bias", u, !1), o(e, !0, "scale", u, !1), o(e, !0, "intensity", u, !1), o(e, !0, "factor", u, !1), e);
function b_() {
  return {
    color: void 0,
    bias: void 0,
    scale: void 0,
    intensity: void 0,
    factor: void 0
  };
}
var Ys;
((e) => {
  e.check = p_, e.defaultData = b_;
})(Ys || (Ys = {}));
const g_ = (e) => (g(e), o(e, !1, "enabled", C, !1, !1), o(e, !1, "rotation", oe.check, !1, oe.new_(0, 0, 0)), o(e, !1, "image", P(V.check), !1, null), e);
function m_() {
  return {
    enabled: !1,
    rotation: oe.new_(0, 0, 0),
    image: null
  };
}
var cr;
((e) => {
  e.check = g_, e.defaultData = m_, e.stateSchema = { scalars: ["rotation"] };
  function t(n, r) {
    return ce(n, r, e.stateSchema);
  }
  e.applyState = t;
})(cr || (cr = {}));
const w_ = (e) => (g(e), o(e, !0, "rotation", oe.check, !1), e);
function y_() {
  return {
    rotation: void 0
  };
}
var Xs;
((e) => {
  e.check = w_, e.defaultData = y_;
})(Xs || (Xs = {}));
const v_ = (e) => (g(e), o(e, !1, "color", Le.check, !1), o(e, !1, "roughness", u, !1, 0.2), o(e, !1, "metalness", u, !1, 0.2), o(e, !1, "reflectivity", u, !1, 0.2), o(e, !1, "transmission", u, !1, 0), o(e, !1, "chromatic_aberration", u, !1, 0), o(e, !1, "thickness", u, !1, 10), o(e, !1, "ior", u, !1, 1.5), o(e, !1, "blur", u, !1, 0), o(e, !1, "fresnel", Ut.check, !1), o(e, !1, "environment", cr.check, !1), o(e, !1, "tonemapping", C, !1, !1), e);
var Lt;
((e) => {
  e.check = v_, e.stateSchema = {
    scalars: [
      "color",
      "roughness",
      "metalness",
      "reflectivity",
      "transmission",
      "thickness",
      "ior",
      "blur"
    ],
    containers: {
      fresnel: () => Ut.stateSchema,
      environment: () => cr.stateSchema
    }
  };
  function t(n, r) {
    return ce(n, r, e.stateSchema);
  }
  e.applyState = t;
})(Lt || (Lt = {}));
const k_ = (e) => (g(e), o(e, !0, "color", Le.check, !1), o(e, !0, "roughness", u, !1), o(e, !0, "metalness", u, !1), o(e, !0, "reflectivity", u, !1), o(e, !0, "transmission", u, !1), o(e, !0, "thickness", u, !1), o(e, !0, "ior", u, !1), o(e, !0, "blur", u, !1), o(e, !0, "fresnel", Ys.check, !1), o(e, !0, "environment", Xs.check, !1), e);
function S_() {
  return {
    color: void 0,
    roughness: void 0,
    metalness: void 0,
    reflectivity: void 0,
    transmission: void 0,
    thickness: void 0,
    ior: void 0,
    blur: void 0,
    fresnel: void 0,
    environment: void 0
  };
}
var eo;
((e) => {
  e.check = k_, e.defaultData = S_;
})(eo || (eo = {}));
const x_ = (e) => (g(e), o(e, !1, "base", He.check, !0), o(e, !1, "geometry", ba.check, !1), o(e, !1, "radius", u, !1, 1), o(e, !1, "radius_b", u, !1, 1), o(e, !1, "rotation", oe.check, !1), o(e, !1, "perspective", u, !1, 90), o(e, !1, "material", Lt.check, !1), o(e, !1, "light", bt.check, !1), o(e, !1, "extrudeDepth", u, !1, 0), o(e, !1, "extrudeBevelSize", u, !1, 0), o(
  e,
  !1,
  "extrudeBevelType",
  ga.check,
  !1,
  "Round"
  /* Round */
), o(e, !1, "extrudeBevelSegments", u, !1, 1), o(e, !1, "extrudeBevelFlatRound", u, !1, 0.4), o(e, !1, "creaseAngle", u, !1, 40), o(e, !1, "customScale", u, !1, 1), o(e, !1, "subdivisions", u, !1, 12), o(e, !1, "extrudeCentered", C, !1, !1), e);
var to;
((e) => {
  e.check = x_;
})(to || (to = {}));
const it = (e) => {
  switch (g(e), e.type) {
    case "DropShadow":
      return B(e, "DropShadow", Us.check);
    case "InnerShadow":
      return B(e, "InnerShadow", Ls.check);
    case "LayerBlur":
      return B(e, "LayerBlur", Ns.check);
    case "BackgroundBlur":
      return B(e, "BackgroundBlur", Ws.check);
    case "LiquidGlass":
      return B(e, "LiquidGlass", Hs.check);
    case "NoiseGlass":
      return B(e, "NoiseGlass", _a.check);
    case "LayerNoise":
      return B(e, "LayerNoise", da.check);
    case "ProjectionEffect":
      return B(e, "ProjectionEffect", Qs.check);
    case "Mesh3dEffect":
      return B(e, "Mesh3dEffect", to.check);
    default:
      throw new Error("Invalid type for EffectData: " + String(e.type));
  }
};
var jt;
((e) => {
  e.check = it, e.stateSchema = {
    scalars: [
      "offset",
      "blur",
      "spread",
      "color",
      "distortion",
      "depth",
      "chromatic_aberration",
      "profile",
      "magnification",
      "scale",
      "stretch",
      "movement",
      "inputSize",
      "radius",
      "height",
      "rotation",
      "perspective",
      "radius_b",
      "extrudeDepth",
      "extrudeBevelSize",
      "extrudeBevelFlatRound",
      "customScale"
    ],
    containers: {
      blurData: () => $t.stateSchema,
      amplitudeData: () => nt.stateSchema,
      light: () => bt.stateSchema,
      material: () => Lt.stateSchema
    }
  };
  function t(n, r) {
    return ce(n, r, e.stateSchema);
  }
  e.applyState = t;
})(jt || (jt = {}));
const zc = (e) => (g(e), o(e, !0, "offset", E.check, !1), o(e, !0, "blur", u, !1), o(e, !0, "spread", u, !1), o(e, !0, "color", Oe.check, !1), o(e, !0, "blurData", Vs.check, !1), o(e, !0, "distortion", u, !1), o(e, !0, "depth", u, !1), o(e, !0, "chromatic_aberration", u, !1), o(e, !0, "profile", u, !1), o(e, !0, "magnification", u, !1), o(e, !0, "amplitudeData", Ks.check, !1), o(e, !0, "scale", u, !1), o(e, !0, "stretch", E.check, !1), o(e, !0, "movement", u, !1), o(e, !0, "inputSize", E.check, !1), o(e, !0, "radius", u, !1), o(e, !0, "height", u, !1), o(e, !0, "rotation", oe.check, !1), o(e, !0, "perspective", u, !1), o(e, !0, "light", Js.check, !1), o(e, !0, "radius_b", u, !1), o(e, !0, "material", eo.check, !1), o(e, !0, "extrudeDepth", u, !1), o(e, !0, "extrudeBevelSize", u, !1), o(e, !0, "extrudeBevelFlatRound", u, !1), o(e, !0, "customScale", u, !1), e);
function A_() {
  return {
    offset: void 0,
    blur: void 0,
    spread: void 0,
    color: void 0,
    blurData: void 0,
    distortion: void 0,
    depth: void 0,
    chromatic_aberration: void 0,
    profile: void 0,
    magnification: void 0,
    amplitudeData: void 0,
    scale: void 0,
    stretch: void 0,
    movement: void 0,
    inputSize: void 0,
    radius: void 0,
    height: void 0,
    rotation: void 0,
    perspective: void 0,
    light: void 0,
    radius_b: void 0,
    material: void 0,
    extrudeDepth: void 0,
    extrudeBevelSize: void 0,
    extrudeBevelFlatRound: void 0,
    customScale: void 0
  };
}
var ma;
((e) => {
  e.check = zc, e.defaultData = A_;
})(ma || (ma = {}));
((e) => {
  e.defaultData = (t = "Uniform") => {
    switch (t) {
      case "Uniform":
        return zs({
          type: t,
          radius: 10
        });
      case "Progressive":
        return zs({
          type: t,
          radius_start: 0,
          radius_end: 20,
          position_start: [0.5, 0],
          position_end: [0.5, 1]
        });
    }
  };
})($t || ($t = {}));
((e) => {
  e.defaultData = () => di({
    enabled: !1,
    color: [1, 1, 1],
    intensity: 1,
    height: 40,
    direction: 200,
    ambient: 0.3,
    ambientColor: [1, 1, 1],
    shadowColor: [0, 0, 0],
    shadowColorType: "Auto",
    specular: 0.3,
    castShadows: !1,
    shadowBlur: 5
  });
})(bt || (bt = {}));
((e) => {
  e.defaultData = (t = "Uniform") => {
    switch (t) {
      case "Uniform":
        return Zs({
          type: t,
          amplitude: 8
        });
      case "Progressive":
        return Zs({
          type: t,
          amplitude_start: 8,
          amplitude_end: 0,
          position_start: [0.5, 0],
          position_end: [0.5, 1],
          amplitude_falloff_type: "Linear",
          taper: 0
        });
    }
  };
})(nt || (nt = {}));
((e) => {
  function t() {
    return {
      enabled: !1,
      color: [1, 1, 1],
      bias: 0.1,
      scale: 1,
      intensity: 2,
      factor: 1
    };
  }
  e.defaultData = t;
})(Ut || (Ut = {}));
((e) => {
  function t() {
    return {
      color: [0.2, 0.2, 0.2],
      roughness: 0.8,
      metalness: 0.2,
      reflectivity: 2.05,
      transmission: 0.1,
      chromatic_aberration: 0,
      thickness: 10,
      ior: 1.5,
      blur: 0.91,
      fresnel: Ut.defaultData(),
      environment: cr.defaultData(),
      tonemapping: !0
    };
  }
  e.defaultData = t;
})(Lt || (Lt = {}));
((e) => {
  e.defaultData = (t = "DropShadow") => {
    switch (t) {
      case "LayerBlur":
      case "BackgroundBlur":
        return it({
          type: t,
          blurData: {
            type: "Uniform",
            radius: 10
          },
          enabled: !0
        });
      case "DropShadow":
      case "InnerShadow":
        return it({
          type: t,
          offset: [0, 4],
          blur: 5,
          spread: 0,
          color: [0, 0, 0, 0.4],
          enabled: !0
        });
      case "LiquidGlass":
        return it({
          type: t,
          offset: [0, 0],
          distortion: 15,
          depth: 10,
          blur: 10,
          chromatic_aberration: 0,
          chromatic_aberration_is_edge_only: !0,
          profile: 0,
          magnification: 0,
          enabled: !0
        });
      case "ProjectionEffect": {
        const n = {
          type: t,
          enabled: !0,
          rotation: [0, 0, 0],
          kind: "Sphere",
          side: Kn.Both,
          radius: 3,
          height: 6,
          light: bt.defaultData(),
          inputSize: [1, 1],
          inputQuality: 4,
          perspective: 10
        };
        return it(n);
      }
      case "NoiseGlass":
        return it({
          type: t,
          noise_type: "Simplex",
          blur: 0,
          amplitudeData: {
            type: "Uniform",
            amplitude: 10
          },
          scale: 4,
          stretch: [1, 1],
          offset: [0, 0],
          movement: 0,
          seed: 0,
          enabled: !0
        });
      case "LayerNoise":
        return it({
          type: t,
          noise_type: "Simplex",
          blur: 0,
          amplitudeData: {
            type: "Uniform",
            amplitude: 10
          },
          scale: 4,
          stretch: [1, 1],
          offset: [0, 0],
          movement: 0,
          seed: 0,
          enabled: !0
        });
      case "Mesh3dEffect": {
        const n = di({
          enabled: !0,
          color: [1, 1, 1],
          intensity: 1,
          height: 200,
          direction: 280,
          ambient: 0.75,
          ambientColor: [1, 1, 1],
          shadowColor: [0.145, 0.149, 0.196],
          shadowColorType: "Auto",
          specular: 0.1,
          castShadows: !1,
          shadowBlur: 5
        }), r = {
          type: t,
          enabled: !0,
          rotation: [-15, 30, 0],
          geometry: "Custom",
          radius: 3,
          radius_b: 1,
          perspective: 36,
          material: Lt.defaultData(),
          light: n,
          extrudeDepth: 50,
          extrudeBevelSize: 6,
          extrudeBevelType: "Round",
          extrudeBevelSegments: 3,
          extrudeBevelFlatRound: 0.4,
          creaseAngle: 40,
          extrudeCentered: !0,
          customScale: 5,
          subdivisions: 12
        };
        return it(r);
      }
    }
  };
})(jt || (jt = {}));
st(_a, (e) => {
  const t = e;
  if (t.amplitude !== void 0 && typeof t.amplitude == "number") {
    const n = nt.defaultData("Uniform");
    t.amplitudeData = {
      ...n,
      amplitude: t.amplitude ?? n.amplitude
    };
  }
  return t.amplitude_falloff_type === void 0 && (t.amplitude_falloff_type = "Linear"), jc(t);
});
st(da, (e) => {
  const t = e;
  if (t.amplitude !== void 0 && typeof t.amplitude == "number") {
    const n = nt.defaultData("Uniform");
    t.amplitudeData = {
      ...n,
      amplitude: t.amplitude ?? n.amplitude
    };
  }
  return t.amplitude_falloff_type === void 0 && (t.amplitude_falloff_type = "Linear"), Fc(t);
});
st(ma, (e) => {
  const t = e;
  return t.custom_scale !== void 0 && t.customScale === void 0 && (t.customScale = t.custom_scale, delete t.custom_scale), zc(t);
});
const O_ = (e) => (g(e), o(e, !1, "enabled", C, !1, !0), o(e, !1, "name", ee, !1, ""), e);
function D_() {
  return {
    enabled: !0,
    name: ""
  };
}
var gt;
((e) => {
  e.check = O_, e.defaultData = D_;
})(gt || (gt = {}));
const Vc = (e) => {
  switch (g(e), e.type) {
    case "start":
      return B(e, "start", no.check);
    case "mouseDown":
      return B(e, "mouseDown", Ct.check);
    case "mouseUp":
      return B(e, "mouseUp", Ct.check);
    case "mousePress":
      return B(e, "mousePress", Ct.check);
    case "mouseHover":
      return B(e, "mouseHover", ro.check);
    case "keyDown":
      return B(e, "keyDown", Bt.check);
    case "keyUp":
      return B(e, "keyUp", Bt.check);
    case "keyPress":
      return B(e, "keyPress", Bt.check);
    case "follow":
      return B(e, "follow", fr.check);
    case "lookAt":
      return B(e, "lookAt", ur.check);
    default:
      throw new Error("Invalid type for EventData: " + String(e.type));
  }
};
var cn;
((e) => {
  e.check = Vc;
})(cn || (cn = {}));
const E_ = (e) => (g(e), o(e, !1, "base", gt.check, !0), o(e, !1, "actions", _e.check(Rt.check), !1), e);
var no;
((e) => {
  e.check = E_;
})(no || (no = {}));
const Nc = (e) => (g(e), o(e, !1, "base", gt.check, !0), o(e, !1, "actions", _e.check(Rt.check), !1), o(e, !1, "mode", wa.check, !1), e);
var Ct;
((e) => {
  e.check = Nc;
})(Ct || (Ct = {}));
const I_ = (e) => (g(e), o(e, !1, "base", gt.check, !0), o(e, !1, "actions", _e.check(Rt.check), !1), e);
var ro;
((e) => {
  e.check = I_;
})(ro || (ro = {}));
var wa = /* @__PURE__ */ ((e) => (e.object = "object", e.canvas = "canvas", e))(wa || {});
const P_ = [
  "object",
  "canvas"
  /* canvas */
], C_ = (e) => {
  if (!P_.includes(e))
    throw new Error("Invalid value for MouseEventModeData: " + String(e));
  return e;
};
((e) => {
  e.check = C_;
})(wa || (wa = {}));
const Wc = (e) => (g(e), o(e, !1, "base", gt.check, !0), o(e, !1, "actions", _e.check(Rt.check), !1), o(e, !1, "key", P(ee), !1), e);
var Bt;
((e) => {
  e.check = Wc;
})(Bt || (Bt = {}));
const Hc = (e) => (g(e), o(e, !1, "base", gt.check, !0), o(e, !1, "dampingFactor", u, !1), o(e, !1, "resetOnPointerLeave", C, !1), o(e, !1, "resetSpeed", u, !1), o(e, !1, "enabledTranslation", Mr(C, 2), !1), o(e, !1, "maxDelta", u, !1), o(e, !1, "target", lr.check, !1), o(e, !1, "limitDistanceEnabled", C, !1), o(e, !1, "limitDistance", u, !1), o(e, !1, "snapDelay", u, !1), o(e, !1, "resetAfterDistanceLimit", C, !1), o(e, !1, "actions", _e.check(Rt.check), !1), o(
  e,
  !1,
  "limitType",
  ya.check,
  !1,
  "Radial"
  /* Radial */
), o(e, !1, "planarLimitDistance", E.check, !1, E.new_(1e3, 1e3)), e);
var fr;
((e) => {
  e.check = Hc;
})(fr || (fr = {}));
const Gc = (e) => {
  switch (g(e), e.type) {
    case "entity":
      return Ke(e, "entity", V.check), e;
    case "cursor":
      return Ke(e, "cursor", Tc), e;
    default:
      throw new Error("Invalid type for FollowEventTargetData: " + String(e.type));
  }
};
var lr;
((e) => {
  e.check = Gc;
})(lr || (lr = {}));
var ya = /* @__PURE__ */ ((e) => (e.Radial = "Radial", e.Planar = "Planar", e))(ya || {});
const B_ = [
  "Radial",
  "Planar"
  /* Planar */
], T_ = (e) => {
  if (!B_.includes(e))
    throw new Error("Invalid value for FollowLimitType: " + String(e));
  return e;
};
((e) => {
  e.check = T_;
})(ya || (ya = {}));
const qc = (e) => (g(e), o(e, !1, "base", gt.check, !0), o(e, !1, "distance", u, !1, 1e3), o(e, !1, "axis", Zn.check, !1), o(e, !1, "dampingFactor", u, !1), o(e, !1, "resetOnPointerLeave", C, !1), o(e, !1, "resetSpeed", u, !1), o(e, !1, "target", lr.check, !1), o(e, !1, "limitDistanceEnabled", C, !1), o(e, !1, "limitDistance", u, !1), o(e, !1, "snapDelay", u, !1), o(e, !1, "resetAfterDistanceLimit", C, !1), e);
var ur;
((e) => {
  e.check = qc;
})(ur || (ur = {}));
st(lr, (e) => {
  const t = e;
  return t.id !== void 0 && (t.value = t.id, t.id = void 0), Gc(t);
});
((e) => {
  e.defaultData = () => Vc({
    enabled: !0,
    type: "start",
    actions: [],
    name: "Start"
  });
})(cn || (cn = {}));
((e) => {
  e.defaultData = (t = "Mouse") => Nc({
    enabled: !0,
    mode: "object",
    actions: [],
    name: t
  });
})(Ct || (Ct = {}));
((e) => {
  e.defaultData = (t = "Keyboard") => Wc({
    enabled: !0,
    key: null,
    actions: [],
    name: t
  });
})(Bt || (Bt = {}));
((e) => {
  e.defaultData = (t = "Follow") => Hc({
    enabled: !0,
    actions: [],
    maxDelta: 0,
    dampingFactor: 1,
    target: { type: "cursor" },
    resetOnPointerLeave: !0,
    resetAfterDistanceLimit: !1,
    enabledTranslation: [!0, !0],
    limitDistanceEnabled: !1,
    limitDistance: 1e3,
    snapDelay: 0,
    resetSpeed: 5,
    limitType: "Radial",
    planarLimitDistance: [1e3, 1e3],
    name: t
  });
})(fr || (fr = {}));
((e) => {
  e.defaultData = (t = "Look At") => {
    const n = {
      enabled: !0,
      dampingFactor: 1,
      axis: Zn.y,
      target: { type: "cursor" },
      distance: 1e3,
      resetOnPointerLeave: !0,
      resetAfterDistanceLimit: !0,
      limitDistanceEnabled: !1,
      limitDistance: 1e3,
      snapDelay: 0,
      resetSpeed: 5,
      name: t
    };
    return qc(n);
  };
})(ur || (ur = {}));
const M_ = (e) => (g(e), o(e, !1, "enabled", C, !1, !0), e);
function R_() {
  return {
    enabled: !0
  };
}
var Ft;
((e) => {
  e.check = M_, e.defaultData = R_;
})(Ft || (Ft = {}));
const $_ = (e) => (g(e), o(e, !1, "base", Ft.check, !0), o(e, !1, "color", Oe.check, !1, tt.new_(0.2, 0.2, 0.2, 1)), e);
var zt;
((e) => {
  e.check = $_;
})(zt || (zt = {}));
var fn = /* @__PURE__ */ ((e) => (e.Fill = "Fill", e.Fit = "Fit", e.Crop = "Crop", e.Tile = "Tile", e))(fn || {});
const U_ = [
  "Fill",
  "Fit",
  "Crop",
  "Tile"
  /* Tile */
], L_ = (e) => {
  if (!U_.includes(e))
    throw new Error("Invalid value for ImageFillModeData: " + String(e));
  return e;
};
((e) => {
  e.check = L_;
})(fn || (fn = {}));
const j_ = (e) => (g(e), o(e, !1, "base", Ft.check, !0), o(e, !1, "image", P(V.check), !1, null), o(e, !1, "opacity", u, !1, 1), o(
  e,
  !1,
  "mode",
  fn.check,
  !1,
  "Crop"
  /* Crop */
), o(e, !1, "cropOffset", E.check, !1, E.new_(0, 0)), o(e, !1, "cropScale", E.check, !1, E.new_(1, 1)), o(e, !1, "tileScale", u, !1, 0.5), o(e, !1, "rotation", te, !1, 0), o(e, !1, "exposure", u, !1, 0), o(e, !1, "contrast", u, !1, 0), o(e, !1, "saturation", u, !1, 0), o(e, !1, "temperature", u, !1, 0), o(e, !1, "tint", u, !1, 0), o(e, !1, "highlights", u, !1, 0), o(e, !1, "shadows", u, !1, 0), e);
var Vt;
((e) => {
  e.check = j_;
})(Vt || (Vt = {}));
const F_ = (e) => (g(e), o(e, !1, "base", Ft.check, !0), o(e, !1, "frameObject", P(V.check), !1, null), o(e, !1, "scale", u, !1, 2), o(e, !1, "opacity", u, !1, 1), e);
var ln;
((e) => {
  e.check = F_;
})(ln || (ln = {}));
const z_ = (e) => (g(e), o(e, !1, "base", Ft.check, !0), o(e, !1, "video", P(V.check), !1, null), o(e, !1, "opacity", u, !1, 1), o(
  e,
  !1,
  "mode",
  fn.check,
  !1,
  "Crop"
  /* Crop */
), o(e, !1, "cropOffset", E.check, !1, E.new_(0, 0)), o(e, !1, "cropScale", E.check, !1, E.new_(1, 1)), o(e, !1, "tileScale", u, !1, 0.5), o(e, !1, "rotation", te, !1, 0), e);
var un;
((e) => {
  e.check = z_;
})(un || (un = {}));
const V_ = (e) => (g(e), o(e, !1, "color", Oe.check, !1), o(e, !1, "stop", u, !1), e);
var _r;
((e) => {
  e.check = V_, e.stateSchema = { scalars: ["color", "stop"] };
  function t(n, r) {
    return ce(n, r, e.stateSchema);
  }
  e.applyState = t;
})(_r || (_r = {}));
const N_ = (e) => (g(e), o(e, !0, "color", Oe.check, !1), o(e, !0, "stop", u, !1), e);
function W_() {
  return {
    color: void 0,
    stop: void 0
  };
}
var va;
((e) => {
  e.check = N_, e.defaultData = W_;
})(va || (va = {}));
var _n = /* @__PURE__ */ ((e) => (e.Linear = "Linear", e.Radial = "Radial", e.Polar = "Polar", e))(_n || {});
const H_ = [
  "Linear",
  "Radial",
  "Polar"
  /* Polar */
], G_ = (e) => {
  if (!H_.includes(e))
    throw new Error("Invalid value for GradientTypeData: " + String(e));
  return e;
};
((e) => {
  e.check = G_;
})(_n || (_n = {}));
const q_ = (e) => (g(e), o(e, !1, "base", Ft.check, !0), o(e, !1, "gradientType", _n.check, !1), o(
  e,
  !1,
  "stops",
  Z.check(_r.check),
  !1,
  Qe.default_stops()
), o(e, !1, "isSmooth", C, !1, !1), o(e, !1, "opacity", u, !1, 1), o(e, !1, "start", E.check, !1, E.new_(0, 0.5)), o(e, !1, "end", E.check, !1, E.new_(1, 0.5)), o(e, !1, "aspectRadius", u, !1, 1), e);
var Qe;
((e) => {
  e.check = q_;
})(Qe || (Qe = {}));
const Zc = (e) => {
  switch (g(e), e.type) {
    case "Color":
      return B(e, "Color", zt.check);
    case "Image":
      return B(e, "Image", Vt.check);
    case "Video":
      return B(e, "Video", un.check);
    case "Frame":
      return B(e, "Frame", ln.check);
    case "Gradient":
      return B(e, "Gradient", Qe.check);
    default:
      throw new Error("Invalid type for FillData: " + String(e.type));
  }
};
var Ge;
((e) => {
  e.check = Zc, e.stateSchema = {
    scalars: ["color", "opacity", "start", "end", "aspectRadius"],
    tables: { stops: () => _r.stateSchema }
  };
  function t(n, r) {
    return ce(n, r, e.stateSchema);
  }
  e.applyState = t;
})(Ge || (Ge = {}));
const Z_ = (e) => (g(e), o(e, !0, "color", Oe.check, !1), o(e, !0, "opacity", u, !1), o(e, !0, "stops", Z.check(va.check), !1), o(e, !0, "start", E.check, !1), o(e, !0, "end", E.check, !1), o(e, !0, "aspectRadius", u, !1), e);
function K_() {
  return {
    color: void 0,
    opacity: void 0,
    stops: void 0,
    start: void 0,
    end: void 0,
    aspectRadius: void 0
  };
}
var ka;
((e) => {
  e.check = Z_, e.defaultData = K_;
})(ka || (ka = {}));
((e) => {
  function t(n = "Color") {
    switch (n) {
      case "Image":
        return Vt.defaultData();
      case "Video":
        return un.defaultData();
      case "Frame":
        return ln.defaultData();
      case "Gradient":
        return Qe.defaultData();
      case "Color":
      default:
        return zt.defaultData();
    }
  }
  e.defaultData = t;
})(Ge || (Ge = {}));
((e) => {
  function t(n = null) {
    return {
      enabled: !0,
      type: "Image",
      image: n,
      opacity: 1,
      mode: "Fill",
      cropOffset: [0, 0],
      cropScale: [1, 1],
      tileScale: 0.5,
      rotation: 0,
      exposure: 0,
      contrast: 0,
      saturation: 0,
      temperature: 0,
      tint: 0,
      highlights: 0,
      shadows: 0
    };
  }
  e.defaultData = t;
})(Vt || (Vt = {}));
((e) => {
  function t(n = null) {
    return {
      enabled: !0,
      type: "Video",
      video: n,
      opacity: 1,
      mode: "Fill",
      cropOffset: [0, 0],
      cropScale: [1, 1],
      tileScale: 0.5,
      rotation: 0
    };
  }
  e.defaultData = t;
})(un || (un = {}));
((e) => {
  function t(n = null) {
    return {
      enabled: !0,
      type: "Frame",
      frameObject: n,
      opacity: 1,
      scale: 1
    };
  }
  e.defaultData = t;
})(ln || (ln = {}));
((e) => {
  function t(n = [0.2, 0.2, 0.2, 1]) {
    return {
      enabled: !0,
      type: "Color",
      color: n
    };
  }
  e.defaultData = t;
})(zt || (zt = {}));
((e) => {
  function t(n, r) {
    return {
      enabled: !0,
      type: "Gradient",
      gradientType: "Linear",
      stops: e.default_stops(n, r),
      isSmooth: !1,
      opacity: 1,
      start: [0, 0.5],
      end: [1, 0.5],
      aspectRadius: 1
    };
  }
  e.defaultData = t, e.default_stops = (n = [0.27, 0.27, 0.27, 1], r = [0.84, 0.84, 0.84, 1]) => {
    let a = new Ie();
    return a = a.add("00000-0-00-000-0000", { color: n, stop: 0 }), a = a.add("000-000-00000-000-0", { color: r, stop: 1 }), a;
  };
})(Qe || (Qe = {}));
Ge.check = ((e) => {
  e.type === void 0 && e.color !== void 0 && (e.type = "Color"), Zc(e);
});
const Kc = (e) => (g(e), o(e, !1, "size", E.check, !1), e);
var je;
((e) => {
  e.check = Kc;
})(je || (je = {}));
const J_ = (e) => (g(e), o(e, !1, "base", je.check, !0), o(e, !1, "cornerRadius", tt.check, !1), o(e, !1, "cornerSmoothing", u, !1, 0), e);
var ao;
((e) => {
  e.check = J_;
})(ao || (ao = {}));
const Q_ = (e) => (g(e), o(e, !1, "base", je.check, !0), e);
var so;
((e) => {
  e.check = Q_;
})(so || (so = {}));
var Sa = /* @__PURE__ */ ((e) => (e.Left = "Left", e.Right = "Right", e.Center = "Center", e.Justify = "Justify", e))(Sa || {});
const Y_ = [
  "Left",
  "Right",
  "Center",
  "Justify"
  /* Justify */
], X_ = (e) => {
  if (!Y_.includes(e))
    throw new Error("Invalid value for HorizontalAlign: " + String(e));
  return e;
};
((e) => {
  e.check = X_;
})(Sa || (Sa = {}));
var xa = /* @__PURE__ */ ((e) => (e.Top = "Top", e.Center = "Center", e.Bottom = "Bottom", e))(xa || {});
const ed = [
  "Top",
  "Center",
  "Bottom"
  /* Bottom */
], td = (e) => {
  if (!ed.includes(e))
    throw new Error("Invalid value for VerticalAlign: " + String(e));
  return e;
};
((e) => {
  e.check = td;
})(xa || (xa = {}));
var Aa = /* @__PURE__ */ ((e) => (e.TopLeft = "TopLeft", e.TopCenter = "TopCenter", e.TopRight = "TopRight", e.Left = "Left", e.Center = "Center", e.Right = "Right", e.BottomLeft = "BottomLeft", e.BottomCenter = "BottomCenter", e.BottomRight = "BottomRight", e))(Aa || {});
const nd = [
  "TopLeft",
  "TopCenter",
  "TopRight",
  "Left",
  "Center",
  "Right",
  "BottomLeft",
  "BottomCenter",
  "BottomRight"
  /* BottomRight */
], rd = (e) => {
  if (!nd.includes(e))
    throw new Error("Invalid value for LayoutAlign: " + String(e));
  return e;
};
((e) => {
  e.check = rd;
})(Aa || (Aa = {}));
var Oa = /* @__PURE__ */ ((e) => (e.Row = "Row", e.Column = "Column", e))(Oa || {});
const ad = [
  "Row",
  "Column"
  /* Column */
], sd = (e) => {
  if (!ad.includes(e))
    throw new Error("Invalid value for LayoutDirection: " + String(e));
  return e;
};
((e) => {
  e.check = sd;
})(Oa || (Oa = {}));
const Jc = (e) => (g(e), o(e, !1, "direction", Oa.check, !1), o(e, !1, "wrap", C, !1), o(e, !1, "align", Aa.check, !1), o(e, !1, "gap", u, !1), o(e, !1, "rowGap", u, !1), o(e, !1, "autoGap", C, !1), o(e, !1, "autoRowGap", C, !1), o(e, !1, "leftPadding", u, !1), o(e, !1, "rightPadding", u, !1), o(e, !1, "topPadding", u, !1), o(e, !1, "bottomPadding", u, !1), o(e, !1, "masonry", C, !1, !1), e);
var dr;
((e) => {
  e.check = Jc;
})(dr || (dr = {}));
const od = (e) => (g(e), o(e, !1, "base", je.check, !0), o(e, !1, "cornerRadius", tt.check, !1), o(e, !1, "cornerSmoothing", u, !1, 0), o(e, !1, "layout", P(dr.check), !1, null), o(e, !1, "clipContent", C, !1, !0), o(e, !1, "isSection", C, !1, !1), o(e, !1, "codeContent", P(ee), !1, null), e);
var oo;
((e) => {
  e.check = od;
})(oo || (oo = {}));
var Da = /* @__PURE__ */ ((e) => (e.None = "None", e.Upper = "Upper", e.Lower = "Lower", e))(Da || {});
const id = [
  "None",
  "Upper",
  "Lower"
  /* Lower */
], cd = (e) => {
  if (!id.includes(e))
    throw new Error("Invalid value for TextTransform: " + String(e));
  return e;
};
((e) => {
  e.check = cd;
})(Da || (Da = {}));
var Ea = /* @__PURE__ */ ((e) => (e.None = "None", e.Width = "Width", e.Height = "Height", e))(Ea || {});
const fd = [
  "None",
  "Width",
  "Height"
  /* Height */
], ld = (e) => {
  if (!fd.includes(e))
    throw new Error("Invalid value for AutoSize: " + String(e));
  return e;
};
((e) => {
  e.check = ld;
})(Ea || (Ea = {}));
var Ia = /* @__PURE__ */ ((e) => (e.None = "None", e.Ellipsis = "Ellipsis", e.Clip = "Clip", e.ClipWord = "ClipWord", e))(Ia || {});
const ud = [
  "None",
  "Ellipsis",
  "Clip",
  "ClipWord"
  /* ClipWord */
], _d = (e) => {
  if (!ud.includes(e))
    throw new Error("Invalid value for TextTruncate: " + String(e));
  return e;
};
((e) => {
  e.check = _d;
})(Ia || (Ia = {}));
const dd = (e) => (g(e), o(e, !1, "base", je.check, !0), o(e, !1, "text", ee, !1), o(e, !1, "fontSize", u, !1), o(e, !1, "horizontalAlign", Sa.check, !1), o(e, !1, "verticalAlign", xa.check, !1), o(e, !1, "lineHeight", u, !1, 1.2), o(e, !1, "letterSpacing", u, !1, 0), o(
  e,
  !1,
  "textTransform",
  Da.check,
  !1,
  "None"
  /* None */
), o(e, !1, "font", V.check, !1, mt.default_font()), o(e, !1, "version", te, !1, mt.default_version()), o(
  e,
  !1,
  "autoSize",
  Ea.check,
  !1,
  "None"
  /* None */
), o(
  e,
  !1,
  "truncate",
  Ia.check,
  !1,
  "None"
  /* None */
), e);
var mt;
((e) => {
  e.check = dd;
})(mt || (mt = {}));
var Pa = /* @__PURE__ */ ((e) => (e.AND = "AND", e.OR = "OR", e.DIFF = "DIFF", e))(Pa || {});
const hd = [
  "AND",
  "OR",
  "DIFF"
  /* DIFF */
], pd = (e) => {
  if (!hd.includes(e))
    throw new Error("Invalid value for BooleanOpData: " + String(e));
  return e;
};
((e) => {
  e.check = pd;
})(Pa || (Pa = {}));
const bd = (e) => (g(e), o(e, !1, "base", je.check, !0), o(e, !1, "op", Pa.check, !1), o(e, !1, "corner", u, !1, 0), o(e, !1, "cornerSmoothing", u, !1, 0), e);
var io;
((e) => {
  e.check = bd;
})(io || (io = {}));
const gd = (e) => (g(e), o(e, !1, "base", je.check, !0), o(e, !1, "bytes", Jn.check, !1), e);
var Ca;
((e) => {
  e.check = gd;
})(Ca || (Ca = {}));
const md = (e) => (g(e), o(e, !1, "base", je.check, !0), o(e, !1, "spikes", u, !1), o(e, !1, "corner", u, !1), o(e, !1, "cornerSmoothing", u, !1, 0), e);
var co;
((e) => {
  e.check = md;
})(co || (co = {}));
const wd = (e) => (g(e), o(e, !1, "base", je.check, !0), o(e, !1, "innerRadiusPercent", u, !1), o(e, !1, "spikes", u, !1), o(e, !1, "corner", u, !1), o(e, !1, "cornerSmoothing", u, !1, 0), e);
var fo;
((e) => {
  e.check = wd;
})(fo || (fo = {}));
var hr = /* @__PURE__ */ ((e) => (e.ClampToEdge = "ClampToEdge", e.Repeat = "Repeat", e.MirroredRepeat = "MirroredRepeat", e))(hr || {});
const yd = [
  "ClampToEdge",
  "Repeat",
  "MirroredRepeat"
  /* MirroredRepeat */
], vd = (e) => {
  if (!yd.includes(e))
    throw new Error("Invalid value for TextureWrapMode: " + String(e));
  return e;
};
((e) => {
  e.check = vd;
})(hr || (hr = {}));
var Ba = /* @__PURE__ */ ((e) => (e.Nearest = "Nearest", e.Linear = "Linear", e.NearestMipmapNearest = "NearestMipmapNearest", e.NearestMipmapLinear = "NearestMipmapLinear", e.LinearMipmapNearest = "LinearMipmapNearest", e.LinearMipmapLinear = "LinearMipmapLinear", e))(Ba || {});
const kd = [
  "Nearest",
  "Linear",
  "NearestMipmapNearest",
  "NearestMipmapLinear",
  "LinearMipmapNearest",
  "LinearMipmapLinear"
  /* LinearMipmapLinear */
], Sd = (e) => {
  if (!kd.includes(e))
    throw new Error("Invalid value for TextureMinFilter: " + String(e));
  return e;
};
((e) => {
  e.check = Sd;
})(Ba || (Ba = {}));
var Ta = /* @__PURE__ */ ((e) => (e.Nearest = "Nearest", e.Linear = "Linear", e))(Ta || {});
const xd = [
  "Nearest",
  "Linear"
  /* Linear */
], Ad = (e) => {
  if (!xd.includes(e))
    throw new Error("Invalid value for TextureMagFilter: " + String(e));
  return e;
};
((e) => {
  e.check = Ad;
})(Ta || (Ta = {}));
const Od = (e) => (g(e), o(e, !1, "wrapS", hr.check, !1), o(e, !1, "wrapT", hr.check, !1), o(e, !1, "minFilter", Ba.check, !1), o(e, !1, "magFilter", Ta.check, !1), e);
var lo;
((e) => {
  e.check = Od;
})(lo || (lo = {}));
var Ma = /* @__PURE__ */ ((e) => (e.Opaque = "Opaque", e.Mask = "Mask", e.Blend = "Blend", e))(Ma || {});
const Dd = [
  "Opaque",
  "Mask",
  "Blend"
  /* Blend */
], Ed = (e) => {
  if (!Dd.includes(e))
    throw new Error("Invalid value for AlphaMode: " + String(e));
  return e;
};
((e) => {
  e.check = Ed;
})(Ma || (Ma = {}));
const Id = (e) => (g(e), o(e, !1, "imageId", V.check, !1), o(e, !1, "sampler", P(lo.check), !1, null), e);
var lt;
((e) => {
  e.check = Id;
})(lt || (lt = {}));
const Pd = (e) => (g(e), o(e, !1, "joints", K(te), !1), o(e, !1, "inverseBindMatrices", K(u), !1), o(e, !1, "skeletonRootNodeIndex", P(te), !1, null), e);
var uo;
((e) => {
  e.check = Pd;
})(uo || (uo = {}));
const Cd = (e) => (g(e), o(e, !1, "positions", K(u), !1), o(e, !1, "normals", P(K(u)), !1, null), o(e, !1, "tangents", P(K(u)), !1, null), e);
var _o;
((e) => {
  e.check = Cd;
})(_o || (_o = {}));
var Ra = /* @__PURE__ */ ((e) => (e.Step = "Step", e.Linear = "Linear", e.CubicSpline = "CubicSpline", e))(Ra || {});
const Bd = [
  "Step",
  "Linear",
  "CubicSpline"
  /* CubicSpline */
], Td = (e) => {
  if (!Bd.includes(e))
    throw new Error("Invalid value for Model3DAnimationInterpolation: " + String(e));
  return e;
};
((e) => {
  e.check = Td;
})(Ra || (Ra = {}));
var $a = /* @__PURE__ */ ((e) => (e.Translation = "Translation", e.Rotation = "Rotation", e.Scale = "Scale", e.Weights = "Weights", e))($a || {});
const Md = [
  "Translation",
  "Rotation",
  "Scale",
  "Weights"
  /* Weights */
], Rd = (e) => {
  if (!Md.includes(e))
    throw new Error("Invalid value for Model3DAnimationTargetPath: " + String(e));
  return e;
};
((e) => {
  e.check = Rd;
})($a || ($a = {}));
const $d = (e) => (g(e), o(e, !1, "times", K(u), !1), o(e, !1, "values", K(u), !1), o(
  e,
  !1,
  "interpolation",
  Ra.check,
  !1,
  "Linear"
  /* Linear */
), e);
var ho;
((e) => {
  e.check = $d;
})(ho || (ho = {}));
const Ud = (e) => (g(e), o(e, !1, "targetNodeIndex", te, !1), o(e, !1, "targetPath", $a.check, !1), o(e, !1, "sampler", ho.check, !1), e);
var po;
((e) => {
  e.check = Ud;
})(po || (po = {}));
const Ld = (e) => (g(e), o(e, !1, "name", ee, !1), o(e, !1, "duration", u, !1), o(e, !1, "channels", K(po.check), !1), e);
var bo;
((e) => {
  e.check = Ld;
})(bo || (bo = {}));
const jd = (e) => (g(e), o(e, !1, "positions", K(u), !1), o(e, !1, "normals", K(u), !1), o(e, !1, "texCoords", K(u), !1), o(e, !1, "indices", K(te), !1), o(e, !1, "baseColorTexture", P(lt.check), !1, null), o(e, !1, "roughnessFactor", u, !1, 1), o(e, !1, "metallicFactor", u, !1, 1), o(e, !1, "baseColorFactor", tt.check, !1, tt.new_(1, 1, 1, 1)), o(e, !1, "doubleSided", C, !1, !1), o(
  e,
  !1,
  "alphaMode",
  Ma.check,
  !1,
  "Opaque"
  /* Opaque */
), o(e, !1, "alphaCutoff", u, !1, 0.5), o(e, !1, "emissiveFactor", oe.check, !1, oe.new_(0, 0, 0)), o(e, !1, "emissiveTexture", P(lt.check), !1, null), o(
  e,
  !1,
  "metallicRoughnessTexture",
  P(lt.check),
  !1,
  null
), o(e, !1, "occlusionTexture", P(lt.check), !1, null), o(e, !1, "occlusionStrength", u, !1, 1), o(e, !1, "tangents", P(K(u)), !1, null), o(e, !1, "normalTexture", P(lt.check), !1, null), o(e, !1, "normalScale", u, !1, 1), o(e, !1, "jointIndices", P(K(te)), !1, null), o(e, !1, "jointWeights", P(K(u)), !1, null), o(e, !1, "skinIndex", P(te), !1, null), o(
  e,
  !1,
  "morphTargets",
  P(K(_o.check)),
  !1,
  null
), o(e, !1, "morphTargetNames", P(K(ee)), !1, null), o(e, !1, "defaultMorphWeights", P(K(u)), !1, null), o(e, !1, "uvRepeat", E.check, !1, E.new_(1, 1)), o(e, !1, "uvOffset", E.check, !1, E.new_(0, 0)), o(e, !1, "specularFactor", u, !1, 1), o(e, !1, "specularColorFactor", oe.check, !1, oe.new_(1, 1, 1)), o(e, !1, "specularColorTexture", P(lt.check), !1, null), o(e, !1, "ior", u, !1, 1.5), o(e, !1, "draco", P(K(te)), !1, null), e);
var go;
((e) => {
  e.check = jd;
})(go || (go = {}));
const Fd = (e) => (g(e), o(e, !1, "meshIndex", P(te), !1), o(e, !1, "localTransform", K(u), !1), o(e, !1, "parentNodeIndex", P(te), !1), o(e, !1, "name", ee, !1, ""), e);
var mo;
((e) => {
  e.check = Fd;
})(mo || (mo = {}));
const zd = (e) => (g(e), o(e, !1, "base", je.check, !0), o(e, !1, "geometryId", V.check, !1, dn.default_geometry_id()), o(e, !1, "shadowPlaneSize", u, !1, 3), o(e, !1, "shadowPlaneOffset", u, !1, 0), o(e, !1, "meshVersion", te, !1, 0), o(e, !1, "modelFileName", ee, !1, ""), e);
var dn;
((e) => {
  e.check = zd;
})(dn || (dn = {}));
const Qc = (e) => {
  switch (g(e), e.type) {
    case "Rectangle":
      return B(e, "Rectangle", ao.check);
    case "Ellipse":
      return B(e, "Ellipse", so.check);
    case "Text":
      return B(e, "Text", mt.check);
    case "Frame":
      return B(e, "Frame", oo.check);
    case "Boolean":
      return B(e, "Boolean", io.check);
    case "VecNet":
      return B(e, "VecNet", Ca.check);
    case "Polygon":
      return B(e, "Polygon", co.check);
    case "Star":
      return B(e, "Star", fo.check);
    case "Model3D":
      return B(e, "Model3D", dn.check);
    default:
      throw new Error("Invalid type for ShapeData: " + String(e.type));
  }
};
var wt;
((e) => {
  e.check = Qc, e.stateSchema = {
    scalars: [
      "size",
      "cornerRadius",
      "cornerSmoothing",
      "fontSize",
      "lineHeight",
      "letterSpacing",
      "corner",
      "bytes",
      "spikes",
      "innerRadiusPercent"
    ]
  };
  function t(n, r) {
    return ce(n, r, e.stateSchema);
  }
  e.applyState = t;
})(wt || (wt = {}));
const Vd = (e) => (g(e), o(e, !0, "size", E.check, !1), o(e, !0, "cornerRadius", tt.check, !1), o(e, !0, "cornerSmoothing", u, !1), o(e, !0, "fontSize", u, !1), o(e, !0, "lineHeight", u, !1), o(e, !0, "letterSpacing", u, !1), o(e, !0, "corner", u, !1), o(e, !0, "bytes", Jn.check, !1), o(e, !0, "spikes", u, !1), o(e, !0, "innerRadiusPercent", u, !1), e);
function Nd() {
  return {
    size: void 0,
    cornerRadius: void 0,
    cornerSmoothing: void 0,
    fontSize: void 0,
    lineHeight: void 0,
    letterSpacing: void 0,
    corner: void 0,
    bytes: void 0,
    spikes: void 0,
    innerRadiusPercent: void 0
  };
}
var wo;
((e) => {
  e.check = Vd, e.defaultData = Nd;
})(wo || (wo = {}));
st(je, (e) => {
  const t = e;
  if (t.size) {
    const n = $c(t.size);
    Et(n, t.size) || (t.size = n);
  }
  return Kc(e);
});
((e) => {
  e.default_geometry_id = () => "";
})(dn || (dn = {}));
((e) => {
  e.default_font = () => "Inter_regular", e.default_version = () => 1, e.current_version = () => 4;
})(mt || (mt = {}));
((e) => {
  e.defaultData = (t = "Rectangle", n = [100, 100]) => {
    let r;
    switch (t) {
      case "Rectangle": {
        r = {
          type: t,
          cornerRadius: [0, 0, 0, 0],
          cornerSmoothing: 0,
          size: n
        };
        break;
      }
      case "Ellipse": {
        r = {
          type: t,
          size: n
        };
        break;
      }
      case "Text": {
        r = {
          type: t,
          text: "Hello",
          fontSize: 24,
          horizontalAlign: "Left",
          verticalAlign: "Top",
          lineHeight: 1.2,
          letterSpacing: 0,
          textTransform: "None",
          font: "Inter_regular",
          size: n,
          version: mt.current_version(),
          autoSize: "None",
          truncate: "None"
          /* None */
        };
        break;
      }
      case "Boolean": {
        r = {
          type: t,
          size: n,
          op: "DIFF",
          corner: 0,
          cornerSmoothing: 0
        };
        break;
      }
      case "Frame": {
        r = {
          type: t,
          cornerRadius: [0, 0, 0, 0],
          size: n,
          cornerSmoothing: 0,
          layout: null,
          clipContent: !0,
          isSection: !1,
          codeContent: null
        };
        break;
      }
      case "VecNet": {
        r = {
          type: t,
          bytes: new Uint8Array(),
          size: n
        };
        break;
      }
      case "Polygon": {
        r = {
          type: t,
          spikes: 3,
          corner: 0,
          cornerSmoothing: 0,
          size: n
        };
        break;
      }
      case "Star": {
        r = {
          type: t,
          innerRadiusPercent: 38.19,
          spikes: 5,
          corner: 0,
          cornerSmoothing: 0,
          size: n
        };
        break;
      }
      case "Model3D": {
        r = {
          type: t,
          geometryId: "",
          shadowPlaneSize: 3,
          shadowPlaneOffset: 0,
          meshVersion: 0,
          modelFileName: "",
          size: n
        };
        break;
      }
    }
    return Qc(r);
  };
})(wt || (wt = {}));
((e) => {
  function t() {
    return Jc({
      direction: "Row",
      wrap: !1,
      align: "TopLeft",
      gap: 10,
      rowGap: 10,
      autoGap: !1,
      autoRowGap: !1,
      leftPadding: 8,
      rightPadding: 8,
      topPadding: 8,
      bottomPadding: 8,
      masonry: !1
    });
  }
  e.defaultData = t;
})(dr || (dr = {}));
const Wd = (e) => (g(e), o(e, !1, "enabled", C, !1, !0), e);
function Hd() {
  return {
    enabled: !0
  };
}
var yo;
((e) => {
  e.check = Wd, e.defaultData = Hd;
})(yo || (yo = {}));
var Ua = /* @__PURE__ */ ((e) => (e.Butt = "Butt", e.Round = "Round", e.Square = "Square", e))(Ua || {});
const Gd = [
  "Butt",
  "Round",
  "Square"
  /* Square */
], qd = (e) => {
  if (!Gd.includes(e))
    throw new Error("Invalid value for StrokeCap: " + String(e));
  return e;
};
((e) => {
  e.check = qd;
})(Ua || (Ua = {}));
var La = /* @__PURE__ */ ((e) => (e.Inside = "Inside", e.Outside = "Outside", e.Center = "Center", e))(La || {});
const Zd = [
  "Inside",
  "Outside",
  "Center"
  /* Center */
], Kd = (e) => {
  if (!Zd.includes(e))
    throw new Error("Invalid value for StrokeAlign: " + String(e));
  return e;
};
((e) => {
  e.check = Kd;
})(La || (La = {}));
var ja = /* @__PURE__ */ ((e) => (e.Miter = "Miter", e.Round = "Round", e.Bevel = "Bevel", e))(ja || {});
const Jd = [
  "Miter",
  "Round",
  "Bevel"
  /* Bevel */
], Qd = (e) => {
  if (!Jd.includes(e))
    throw new Error("Invalid value for StrokeJoin: " + String(e));
  return e;
};
((e) => {
  e.check = Qd;
})(ja || (ja = {}));
const Yd = (e) => (g(e), o(e, !1, "length", u, !1, 0), o(e, !1, "gap", P(u), !1, null), o(e, !1, "offset", u, !1, 0), e);
function Xd() {
  return {
    length: 0,
    gap: null,
    offset: 0
  };
}
var pr;
((e) => {
  e.check = Yd, e.defaultData = Xd;
})(pr || (pr = {}));
const eh = (e) => (g(e), o(e, !1, "start", u, !1, 0), o(e, !1, "end", u, !1, 0.1), o(e, !1, "trimOffset", u, !1, 0), e);
function th() {
  return {
    start: 0,
    end: 0.1,
    trimOffset: 0
  };
}
var br;
((e) => {
  e.check = eh, e.defaultData = th;
})(br || (br = {}));
const Yc = (e) => {
  switch (g(e), e.type) {
    case "Dash":
      return B(e, "Dash", pr.check);
    case "Trim":
      return B(e, "Trim", br.check);
    default:
      throw new Error("Invalid type for StrokeDashOrTrimData: " + String(e.type));
  }
};
var gr;
((e) => {
  e.check = Yc, e.stateSchema = {
    scalars: ["length", "gap", "offset", "start", "end", "trimOffset"]
  };
  function t(n, r) {
    return ce(n, r, e.stateSchema);
  }
  e.applyState = t;
})(gr || (gr = {}));
const nh = (e) => (g(e), o(e, !0, "length", u, !1), o(e, !0, "gap", P(u), !1), o(e, !0, "offset", u, !1), o(e, !0, "start", u, !1), o(e, !0, "end", u, !1), o(e, !0, "trimOffset", u, !1), e);
function rh() {
  return {
    length: void 0,
    gap: void 0,
    offset: void 0,
    start: void 0,
    end: void 0,
    trimOffset: void 0
  };
}
var vo;
((e) => {
  e.check = nh, e.defaultData = rh;
})(vo || (vo = {}));
const ah = (e) => {
  switch (g(e), e.type) {
    case "Color":
      return B(e, "Color", zt.check);
    case "Image":
      return B(e, "Image", Vt.check);
    case "Gradient":
      return B(e, "Gradient", Qe.check);
    default:
      throw new Error("Invalid type for StrokeFillData: " + String(e.type));
  }
};
var Nt;
((e) => {
  e.check = ah, e.stateSchema = {
    scalars: ["color", "opacity", "start", "end", "aspectRadius"],
    tables: { stops: () => _r.stateSchema }
  };
  function t(n, r) {
    return ce(n, r, e.stateSchema);
  }
  e.applyState = t;
})(Nt || (Nt = {}));
const sh = (e) => (g(e), o(e, !0, "color", Oe.check, !1), o(e, !0, "opacity", u, !1), o(e, !0, "stops", Z.check(va.check), !1), o(e, !0, "start", E.check, !1), o(e, !0, "end", E.check, !1), o(e, !0, "aspectRadius", u, !1), e);
function oh() {
  return {
    color: void 0,
    opacity: void 0,
    stops: void 0,
    start: void 0,
    end: void 0,
    aspectRadius: void 0
  };
}
var ko;
((e) => {
  e.check = sh, e.defaultData = oh;
})(ko || (ko = {}));
const Xc = (e) => (g(e), o(e, !1, "base", yo.check, !0), o(e, !0, "color", Oe.check, !1), o(e, !0, "fill", Nt.check, !1), o(e, !1, "thickness", u, !1), o(e, !1, "dash", P(gr.check), !1, null), o(
  e,
  !1,
  "align",
  La.check,
  !1,
  "Center"
  /* Center */
), o(
  e,
  !1,
  "join",
  ja.check,
  !1,
  "Miter"
  /* Miter */
), o(
  e,
  !1,
  "cap",
  Ua.check,
  !1,
  "Round"
  /* Round */
), e);
var yt;
((e) => {
  e.check = Xc, e.stateSchema = {
    scalars: ["thickness"],
    containers: {
      fill: () => Nt.stateSchema,
      dash: () => gr.stateSchema
    }
  };
  function t(n, r) {
    return ce(n, r, e.stateSchema);
  }
  e.applyState = t;
})(yt || (yt = {}));
const ih = (e) => (g(e), o(e, !0, "fill", ko.check, !1), o(e, !0, "thickness", u, !1), o(e, !0, "dash", vo.check, !1), e);
function ch() {
  return {
    fill: void 0,
    thickness: void 0,
    dash: void 0
  };
}
var So;
((e) => {
  e.check = ih, e.defaultData = ch;
})(So || (So = {}));
st(gr, (e) => (e.type === void 0 && (e.type = "Dash"), Yc(e)));
st(yt, (e) => {
  const t = e;
  return !t.fill && t.color !== void 0 && (t.fill = {
    type: "Color",
    enabled: !0,
    color: fi(t.color)
  }, delete t.color), Xc(e);
});
((e) => {
  e.withValues = (t = 0, n = 10, r = 0) => ({
    start: t,
    end: n,
    trimOffset: r
  });
})(br || (br = {}));
((e) => {
  e.withLength = (t = 10) => ({
    length: t,
    gap: null,
    offset: 0
  });
})(pr || (pr = {}));
((e) => {
  e.defaultData = (t = 2, n = Nt.defaultData()) => ({
    enabled: !0,
    fill: n,
    thickness: t,
    align: "Center",
    join: "Miter",
    cap: "Round",
    dash: null
  }), e.defaultDataWithColor = (t = 2, n = [1, 1, 1, 1]) => (0, e.defaultData)(t, {
    enabled: !0,
    type: "Color",
    color: n
  });
})(yt || (yt = {}));
((e) => {
  function t(r = "Color") {
    switch (r) {
      case "Image":
        return {
          enabled: !0,
          type: "Image",
          image: null,
          opacity: 1,
          mode: fn.Fill,
          cropOffset: [0, 0],
          cropScale: [1, 1],
          tileScale: 0.5,
          rotation: 0,
          exposure: 0,
          contrast: 0,
          saturation: 0,
          temperature: 0,
          tint: 0,
          highlights: 0,
          shadows: 0
        };
      case "Gradient":
        return {
          enabled: !0,
          type: "Gradient",
          gradientType: _n.Linear,
          stops: Qe.default_stops(),
          isSmooth: !1,
          opacity: 1,
          start: [0, 0.5],
          end: [1, 0.5],
          aspectRadius: 1
        };
      case "Color":
      default:
        return {
          enabled: !0,
          type: "Color",
          color: [0, 0, 0, 1]
        };
    }
  }
  e.defaultData = t;
  function n(r, a) {
    return {
      enabled: !0,
      type: "Gradient",
      gradientType: _n.Linear,
      stops: Qe.default_stops(r, a),
      isSmooth: !1,
      opacity: 1,
      start: [0, 0.5],
      end: [1, 0.5],
      aspectRadius: 1
    };
  }
  e.defaultGradientData = n;
})(Nt || (Nt = {}));
const fh = (e) => (g(e), o(e, !1, "diff", Sr.check, !1), o(e, !1, "removed", C, !1, !1), o(e, !1, "extraChildren", Qn.check(rt.check), !1), o(e, !1, "shapeFieldMask", P(K(ee)), !1, null), e);
var xo;
((e) => {
  e.check = fh;
})(xo || (xo = {}));
const lh = (e) => (g(e), o(e, !1, "id", V.check, !1), e);
var Ao;
((e) => {
  e.check = lh;
})(Ao || (Ao = {}));
const uh = (e) => {
  switch (g(e), e.type) {
    case "ref":
      return B(e, "ref", Ao.check);
    case "tree":
      return B(e, "tree", on.check(rt.check));
    default:
      throw new Error("Invalid type for ComponentRootData: " + String(e.type));
  }
};
var Oo;
((e) => {
  e.check = uh;
})(Oo || (Oo = {}));
const _h = (e) => (g(e), o(e, !1, "id", V.check, !1), o(e, !1, "root", Oo.check, !1), e);
var Do;
((e) => {
  e.check = _h;
})(Do || (Do = {}));
const dh = (e) => (g(e), o(e, !1, "componentId", V.check, !1), o(e, !1, "overrides", Z.check(xo.check), !1, Z.new_()), e);
var Fa;
((e) => {
  e.check = dh;
})(Fa || (Fa = {}));
const ef = (e) => (g(e), o(e, !1, "position", E.check, !1), o(e, !1, "rotation", u, !1), o(e, !1, "is3d", C, !1, !1), o(e, !1, "flatten3d", C, !1, !1), o(
  e,
  !1,
  "rotation3d",
  oe.check,
  !1,
  vt.default_rotation3d()
), o(e, !1, "depth3d", u, !1, 0), o(e, !1, "perspective3d", u, !1, 500), o(e, !1, "backface", C, !1, !0), o(e, !1, "scale", E.check, !1), o(e, !1, "shear", E.check, !1), o(e, !1, "pivot", E.check, !1), o(e, !1, "pivotRotation", u, !1, 0), e);
var vt;
((e) => {
  e.check = ef, e.stateSchema = {
    scalars: ["position", "rotation", "rotation3d", "depth3d", "perspective3d", "scale", "shear"]
  };
  function t(n, r) {
    return ce(n, r, e.stateSchema);
  }
  e.applyState = t;
})(vt || (vt = {}));
const hh = (e) => (g(e), o(e, !0, "position", E.check, !1), o(e, !0, "rotation", u, !1), o(e, !0, "rotation3d", oe.check, !1), o(e, !0, "depth3d", u, !1), o(e, !0, "perspective3d", u, !1), o(e, !0, "scale", E.check, !1), o(e, !0, "shear", E.check, !1), e);
function ph() {
  return {
    position: void 0,
    rotation: void 0,
    rotation3d: void 0,
    depth3d: void 0,
    perspective3d: void 0,
    scale: void 0,
    shear: void 0
  };
}
var Eo;
((e) => {
  e.check = hh, e.defaultData = ph;
})(Eo || (Eo = {}));
const bh = (e) => (g(e), o(e, !0, "position", E.check, !1), o(e, !0, "rotation", u, !1), o(e, !0, "is3d", C, !1), o(e, !0, "flatten3d", C, !1), o(e, !0, "rotation3d", oe.check, !1), o(e, !0, "depth3d", u, !1), o(e, !0, "perspective3d", u, !1), o(e, !0, "backface", C, !1), o(e, !0, "scale", E.check, !1), o(e, !0, "shear", E.check, !1), o(e, !0, "pivot", E.check, !1), o(e, !0, "pivotRotation", u, !1), e);
function gh() {
  return {
    position: void 0,
    rotation: void 0,
    is3d: void 0,
    flatten3d: void 0,
    rotation3d: void 0,
    depth3d: void 0,
    perspective3d: void 0,
    backface: void 0,
    scale: void 0,
    shear: void 0,
    pivot: void 0,
    pivotRotation: void 0
  };
}
var Io;
((e) => {
  e.check = bh, e.defaultData = gh;
})(Io || (Io = {}));
var mr = /* @__PURE__ */ ((e) => (e.World = "World", e.Tangent = "Tangent", e))(mr || {});
const mh = [
  "World",
  "Tangent"
  /* Tangent */
], wh = (e) => {
  if (!mh.includes(e))
    throw new Error("Invalid value for PathAlignOrientation: " + String(e));
  return e;
};
((e) => {
  e.check = wh;
})(mr || (mr = {}));
const tf = (e) => (g(e), o(e, !0, "object", V.check, !1), o(e, !1, "orientation", mr.check, !1), o(e, !1, "offset", u, !1), o(e, !1, "slide", u, !1), e);
var hn;
((e) => {
  e.check = tf, e.stateSchema = { scalars: ["offset", "slide"] };
  function t(n, r) {
    return ce(n, r, e.stateSchema);
  }
  e.applyState = t;
})(hn || (hn = {}));
const yh = (e) => (g(e), o(e, !0, "offset", u, !1), o(e, !0, "slide", u, !1), e);
function vh() {
  return {
    offset: void 0,
    slide: void 0
  };
}
var Po;
((e) => {
  e.check = yh, e.defaultData = vh;
})(Po || (Po = {}));
const kh = (e) => (g(e), o(e, !0, "object", V.check, !1), o(e, !0, "orientation", mr.check, !1), o(e, !0, "offset", u, !1), o(e, !0, "slide", u, !1), e);
function Sh() {
  return {
    object: void 0,
    orientation: void 0,
    offset: void 0,
    slide: void 0
  };
}
var Co;
((e) => {
  e.check = kh, e.defaultData = Sh;
})(Co || (Co = {}));
var Wt = /* @__PURE__ */ ((e) => (e.Start = "Start", e.End = "End", e.Center = "Center", e.Stretch = "Stretch", e.Scale = "Scale", e))(Wt || {});
const xh = [
  "Start",
  "End",
  "Center",
  "Stretch",
  "Scale"
  /* Scale */
], Ah = (e) => {
  if (!xh.includes(e))
    throw new Error("Invalid value for AnchorMode: " + String(e));
  return e;
};
((e) => {
  e.check = Ah;
})(Wt || (Wt = {}));
var wr = /* @__PURE__ */ ((e) => (e.Static = "Static", e.Absolute = "Absolute", e))(wr || {});
const Oh = [
  "Static",
  "Absolute"
  /* Absolute */
], Dh = (e) => {
  if (!Oh.includes(e))
    throw new Error("Invalid value for LayoutType: " + String(e));
  return e;
};
((e) => {
  e.check = Dh;
})(wr || (wr = {}));
var Ht = /* @__PURE__ */ ((e) => (e.Fixed = "Fixed", e.Fill = "Fill", e.Hug = "Hug", e))(Ht || {});
const Eh = [
  "Fixed",
  "Fill",
  "Hug"
  /* Hug */
], Ih = (e) => {
  if (!Eh.includes(e))
    throw new Error("Invalid value for ResizeType: " + String(e));
  return e;
};
((e) => {
  e.check = Ih;
})(Ht || (Ht = {}));
var yr = /* @__PURE__ */ ((e) => (e.Normal = "Normal", e.Multiply = "Multiply", e.Screen = "Screen", e.Overlay = "Overlay", e.Darken = "Darken", e.Lighten = "Lighten", e.Difference = "Difference", e.Exclusion = "Exclusion", e.LinearDodge = "LinearDodge", e.Subtract = "Subtract", e.Divide = "Divide", e))(yr || {});
const Ph = [
  "Normal",
  "Multiply",
  "Screen",
  "Overlay",
  "Darken",
  "Lighten",
  "Difference",
  "Exclusion",
  "LinearDodge",
  "Subtract",
  "Divide"
  /* Divide */
], Ch = (e) => {
  if (!Ph.includes(e))
    throw new Error("Invalid value for BlendModeData: " + String(e));
  return e;
};
((e) => {
  e.check = Ch;
})(yr || (yr = {}));
const Bh = (e) => (g(e), o(e, !1, "visible", C, !1, !0), o(e, !1, "raycastLock", C, !1, !1), o(e, !1, "eventsPassthrough", C, !1, !1), o(e, !1, "mask", C, !1, !1), o(e, !1, "name", ee, !1, ""), o(e, !1, "transform", vt.check, !0), o(
  e,
  !1,
  "horizontalConstraint",
  Wt.check,
  !1,
  "Start"
  /* Start */
), o(
  e,
  !1,
  "verticalConstraint",
  Wt.check,
  !1,
  "Start"
  /* Start */
), o(e, !1, "events", _e.check(cn.check), !1), o(e, !1, "opacity", u, !1, 1), o(
  e,
  !1,
  "blendMode",
  yr.check,
  !1,
  "Normal"
  /* Normal */
), o(e, !1, "effects", _e.check(jt.check), !1), o(e, !1, "states", _e.check(Va.check), !1), o(e, !0, "pathAlign", hn.check, !1), o(
  e,
  !1,
  "layoutType",
  wr.check,
  !1,
  "Absolute"
  /* Absolute */
), o(
  e,
  !1,
  "horizontalResizeType",
  Ht.check,
  !1,
  "Fixed"
  /* Fixed */
), o(
  e,
  !1,
  "verticalResizeType",
  Ht.check,
  !1,
  "Fixed"
  /* Fixed */
), o(e, !0, "componentInstance", Fa.check, !1), e);
var za;
((e) => {
  e.check = Bh;
})(za || (za = {}));
const Th = (e) => (g(e), o(e, !1, "name", ee, !1), o(e, !1, "transform", Eo.check, !0), o(e, !0, "opacity", u, !1), o(e, !0, "effects", Z.check(ma.check), !1), o(e, !0, "pathAlign", Po.check, !1), e);
var Bo;
((e) => {
  e.check = Th;
})(Bo || (Bo = {}));
const Mh = (e) => (g(e), o(e, !0, "visible", C, !1), o(e, !0, "raycastLock", C, !1), o(e, !0, "eventsPassthrough", C, !1), o(e, !0, "mask", C, !1), o(e, !0, "name", ee, !1), o(e, !1, "transform", Io.check, !0), o(e, !0, "horizontalConstraint", Wt.check, !1), o(e, !0, "verticalConstraint", Wt.check, !1), o(e, !0, "events", _e.check(cn.check), !1), o(e, !0, "opacity", u, !1), o(e, !0, "blendMode", yr.check, !1), o(e, !0, "effects", _e.check(jt.check), !1), o(e, !0, "states", _e.check(Va.check), !1), o(e, !0, "pathAlign", Co.check, !1), o(e, !0, "layoutType", wr.check, !1), o(e, !0, "horizontalResizeType", Ht.check, !1), o(e, !0, "verticalResizeType", Ht.check, !1), o(e, !0, "componentInstance", P(Fa.check), !1), e);
var To;
((e) => {
  e.check = Mh;
})(To || (To = {}));
const Rh = (e) => (g(e), o(e, !1, "base", za.check, !0), e);
var vr;
((e) => {
  e.check = Rh;
})(vr || (vr = {}));
const nf = (e) => (g(e), o(e, !1, "base", za.check, !0), o(e, !1, "shape", wt.check, !1), o(e, !1, "fill", P(Ge.check), !1, null), o(e, !1, "fills", P(Z.check(Ge.check)), !1, null), o(e, !1, "stroke", P(yt.check), !1), e);
var kr;
((e) => {
  e.check = nf;
})(kr || (kr = {}));
const rf = (e) => {
  switch (g(e), e.type) {
    case "Shape":
      return B(e, "Shape", kr.check);
    case "Group":
      return B(e, "Group", vr.check);
    default:
      throw new Error("Invalid type for ObjectData: " + String(e.type));
  }
};
var rt;
((e) => {
  e.check = rf;
})(rt || (rt = {}));
const af = (e) => (g(e), o(e, !1, "base", Bo.check, !0), o(e, !0, "shape", wo.check, !1), o(e, !0, "fill", ka.check, !1), o(e, !0, "fills", Z.check(ka.check), !1), o(e, !0, "stroke", So.check, !1), e);
var Va;
((e) => {
  e.check = af;
})(Va || (Va = {}));
const $h = (e) => (g(e), o(e, !1, "base", To.check, !0), o(e, !0, "shape", wt.check, !1), o(e, !0, "fill", P(Ge.check), !1), o(e, !0, "fills", P(Z.check(Ge.check)), !1), o(e, !0, "stroke", P(yt.check), !1), e);
var Sr;
((e) => {
  e.check = $h;
})(Sr || (Sr = {}));
st(vt, (e) => {
  const t = e;
  if (t.position) {
    const n = $c(t.position);
    Et(n, t.position) || (t.position = n);
  }
  return ef(t);
});
((e) => {
  e.identity = {
    position: [0, 0],
    rotation: 0,
    is3d: !1,
    flatten3d: !1,
    rotation3d: [0, 0, 0],
    depth3d: 0,
    perspective3d: 500,
    backface: !0,
    scale: [1, 1],
    shear: [0, 0],
    pivot: [0, 0],
    pivotRotation: 0
  };
  function t(a, i) {
    return {
      position: i?.position || a.position,
      rotation: i?.rotation || a.rotation,
      is3d: i?.is3d || a.is3d,
      flatten3d: i?.flatten3d || a.flatten3d,
      rotation3d: i?.rotation3d || a.rotation3d,
      depth3d: i?.depth3d || a.depth3d,
      perspective3d: i?.perspective3d || a.perspective3d,
      backface: i?.backface || a.backface,
      scale: i?.scale || a.scale,
      shear: i?.shear || a.shear,
      pivot: i?.pivot || a.pivot,
      pivotRotation: i?.pivotRotation || a.pivotRotation
    };
  }
  e.merge = t;
  function n(a, i) {
    return su({
      position: Et(a.position, i.position) ? void 0 : i.position,
      rotation: Vr(a.rotation, i.rotation) ? void 0 : i.rotation,
      is3d: a.is3d === i.is3d ? void 0 : i.is3d,
      rotation3d: Et(a.rotation3d, i.rotation3d) ? void 0 : i.rotation3d,
      depth3d: Vr(a.depth3d, i.depth3d) ? void 0 : i.depth3d,
      perspective3d: Vr(a.perspective3d, i.perspective3d) ? void 0 : i.perspective3d,
      backface: a.backface === i.backface ? void 0 : i.backface,
      scale: Et(a.scale, i.scale) ? void 0 : i.scale,
      shear: Et(a.shear, i.shear) ? void 0 : i.shear,
      pivot: Et(a.pivot, i.pivot) ? void 0 : i.pivot
    });
  }
  e.diff = n;
  function r() {
    return [0, 0, 0];
  }
  e.default_rotation3d = r;
})(vt || (vt = {}));
((e) => {
  function t(i, c) {
    if (c === void 0)
      return i;
    const f = i.states.data(c);
    return f === void 0 ? i : n(i, f);
  }
  e.applyStateFromData = t, e.stateSchema = {
    scalars: [...vt.stateSchema.scalars, "opacity"],
    containers: {
      shape: () => wt.stateSchema,
      fill: () => Ge.stateSchema,
      stroke: () => yt.stateSchema,
      pathAlign: () => hn.stateSchema
    },
    seqs: {
      effects: () => jt.stateSchema
    }
  };
  function n(i, c) {
    return ce(i, c, e.stateSchema);
  }
  e.applyState = n;
  function r(i, c) {
    return au(i, c);
  }
  e.toDiff = r;
  function a(i, c, f) {
    return Uu(e.stateSchema, af, i, c, f);
  }
  e.transformOp = a;
})(rt || (rt = {}));
((e) => {
  function t(n) {
    const r = {
      shape: wt.defaultData(n),
      fill: Ge.defaultData(),
      fills: null,
      stroke: null,
      visible: !0,
      raycastLock: !1,
      eventsPassthrough: !1,
      mask: !1,
      name: "Shape",
      horizontalConstraint: "Start",
      verticalConstraint: "Start",
      events: [],
      opacity: 1,
      blendMode: "Normal",
      effects: [],
      states: [],
      position: [0, 0],
      rotation: 0,
      is3d: !1,
      flatten3d: !1,
      rotation3d: [0, 0, 0],
      depth3d: 0,
      perspective3d: 350,
      backface: !0,
      scale: [1, 1],
      shear: [0, 0],
      pivot: [0, 0],
      pivotRotation: 0,
      layoutType: "Absolute",
      verticalResizeType: "Fixed",
      horizontalResizeType: "Fixed"
      /* Fixed */
    };
    return nf(r);
  }
  e.defaultData = t;
})(kr || (kr = {}));
((e) => {
  function t() {
    return rf({
      type: "Group",
      visible: !0,
      raycastLock: !1,
      eventsPassthrough: !1,
      mask: !1,
      name: "Group",
      horizontalConstraint: "Start",
      verticalConstraint: "Start",
      events: [],
      opacity: 1,
      blendMode: "Normal",
      effects: [],
      states: [],
      position: [0, 0],
      rotation: 0,
      is3d: !1,
      flatten3d: !1,
      rotation3d: [0, 0, 0],
      depth3d: 0,
      perspective3d: 350,
      backface: !0,
      scale: [1, 1],
      shear: [0, 0],
      pivot: [0, 0],
      pivotRotation: 0,
      layoutType: "Absolute",
      verticalResizeType: "Fixed",
      horizontalResizeType: "Fixed"
      /* Fixed */
    });
  }
  e.defaultData = t;
})(vr || (vr = {}));
((e) => {
  function t() {
    return tf({
      orientation: "Tangent",
      offset: 0,
      slide: 0
    });
  }
  e.defaultData = t;
})(hn || (hn = {}));
const Uh = (e) => (g(e), o(e, !1, "counters", Z.check(Ro.check), !1), o(e, !1, "randoms", Z.check($o.check), !1), o(e, !1, "timers", Z.check(Lo.check), !1), o(e, !1, "times", Z.check(Uo.check), !1), e);
var Mo;
((e) => {
  e.check = Uh;
})(Mo || (Mo = {}));
const Lh = (e) => (g(e), o(e, !1, "name", ee, !1, ""), o(e, !1, "startValue", u, !1), o(e, !1, "increment", u, !1), o(e, !1, "updateInterval", u, !1), o(e, !1, "endValue", P(u), !1), o(e, !1, "repeat", P(C), !1), e);
var Ro;
((e) => {
  e.check = Lh;
})(Ro || (Ro = {}));
const jh = (e) => (g(e), o(e, !1, "name", ee, !1, ""), o(e, !1, "updateInterval", u, !1), o(e, !1, "min", u, !1), o(e, !1, "max", u, !1), o(e, !1, "decimals", te, !1), e);
var $o;
((e) => {
  e.check = jh;
})($o || ($o = {}));
var Na = /* @__PURE__ */ ((e) => (e.HhMmSs = "HhMmSs", e.HhMm = "HhMm", e.Hh = "Hh", e.Mm = "Mm", e.Ss = "Ss", e.Year = "Year", e.Month = "Month", e.DayOfYear = "DayOfYear", e.DayOfMonth = "DayOfMonth", e.SecondOfDay = "SecondOfDay", e))(Na || {});
const Fh = [
  "HhMmSs",
  "HhMm",
  "Hh",
  "Mm",
  "Ss",
  "Year",
  "Month",
  "DayOfYear",
  "DayOfMonth",
  "SecondOfDay"
  /* SecondOfDay */
], zh = (e) => {
  if (!Fh.includes(e))
    throw new Error("Invalid value for TimeFormat: " + String(e));
  return e;
};
((e) => {
  e.check = zh;
})(Na || (Na = {}));
var Wa = /* @__PURE__ */ ((e) => (e._12 = "_12", e._12Ampm = "_12Ampm", e._24 = "_24", e))(Wa || {});
const Vh = [
  "_12",
  "_12Ampm",
  "_24"
  /* _24 */
], Nh = (e) => {
  if (!Vh.includes(e))
    throw new Error("Invalid value for TimeFormat12h24h: " + String(e));
  return e;
};
((e) => {
  e.check = Nh;
})(Wa || (Wa = {}));
const Wh = (e) => (g(e), o(e, !1, "name", ee, !1, ""), o(e, !1, "format", Na.check, !1), o(e, !1, "format12h24h", Wa.check, !1), o(e, !1, "timeZone", P(ee), !1), e);
var Uo;
((e) => {
  e.check = Wh;
})(Uo || (Uo = {}));
var Ha = /* @__PURE__ */ ((e) => (e.Timer = "Timer", e.Stopwatch = "Stopwatch", e))(Ha || {});
const Hh = [
  "Timer",
  "Stopwatch"
  /* Stopwatch */
], Gh = (e) => {
  if (!Hh.includes(e))
    throw new Error("Invalid value for TimerMode: " + String(e));
  return e;
};
((e) => {
  e.check = Gh;
})(Ha || (Ha = {}));
const qh = (e) => {
  switch (g(e), e.type) {
    case "HhMmSs":
      return Ke(e, "HhMmSs", oe.check), e;
    case "MmSs":
      return Ke(e, "MmSs", E.check), e;
    case "Number":
      return Ke(e, "Number", u), e;
    case "Number3Decimal":
      return Ke(e, "Number3Decimal", u), e;
    default:
      throw new Error("Invalid type for TimerValue: " + String(e.type));
  }
};
var Ga;
((e) => {
  e.check = qh;
})(Ga || (Ga = {}));
const Zh = (e) => (g(e), o(e, !1, "name", ee, !1, ""), o(e, !1, "mode", Ha.check, !1), o(e, !1, "startValue", Ga.check, !1), o(e, !1, "endValue", Ga.check, !1), o(e, !1, "hasEnd", C, !1), o(e, !1, "repeat", C, !1), e);
var Lo;
((e) => {
  e.check = Zh;
})(Lo || (Lo = {}));
const Kh = (e) => (g(e), o(e, !1, "data", sn.check, !1), e);
var jo;
((e) => {
  e.check = Kh;
})(jo || (jo = {}));
const Fo = (e) => (g(e), o(e, !1, "data", sn.check, !1), e);
var qi;
((e) => {
  e.check = Fo;
})(qi || (qi = {}));
const Jh = (e) => (g(e), o(e, !1, "filename", ee, !1), o(e, !1, "data", Rs.check, !1), o(e, !1, "mimeType", ee, !1), e);
var zo;
((e) => {
  e.check = Jh;
})(zo || (zo = {}));
const Qh = (e) => (g(e), o(e, !1, "data", sn.check, !1), o(e, !1, "thumbnail", sn.check, !1), e);
var Vo;
((e) => {
  e.check = Qh;
})(Vo || (Vo = {}));
var qa = /* @__PURE__ */ ((e) => (e.Vector = "Vector", e.Quaternion = "Quaternion", e))(qa || {});
const Yh = [
  "Vector",
  "Quaternion"
  /* Quaternion */
], Xh = (e) => {
  if (!Yh.includes(e))
    throw new Error("Invalid value for TrackType: " + String(e));
  return e;
};
((e) => {
  e.check = Xh;
})(qa || (qa = {}));
const e0 = (e) => (g(e), o(e, !1, "type", qa.check, !1), o(e, !1, "name", ee, !1), o(e, !1, "times", K(u), !1), o(e, !1, "values", K(u), !1), e);
var No;
((e) => {
  e.check = e0;
})(No || (No = {}));
const t0 = (e) => (g(e), o(e, !1, "duration", u, !1), o(e, !1, "tracks", K(No.check), !1), e);
var Wo;
((e) => {
  e.check = t0;
})(Wo || (Wo = {}));
function n0(e) {
  return (t) => (g(t), o(t, !1, "name", ee, !1), o(t, !1, "data", e, !1), o(t, !1, "persistent", C, !1, !1), t);
}
var Ee;
((e) => {
  e.check = n0;
})(Ee || (Ee = {}));
const r0 = (e) => (g(e), o(e, !1, "meshes", K(go.check), !1), o(e, !1, "nodes", K(mo.check), !1), o(e, !1, "skins", P(K(uo.check)), !1, null), o(
  e,
  !1,
  "animations",
  P(K(bo.check)),
  !1,
  null
), e);
var Ho;
((e) => {
  e.check = r0;
})(Ho || (Ho = {}));
const a0 = (e) => (g(e), o(e, !1, "colors", Z.check(Ee.check(Oe.check)), !1), o(e, !1, "numbers", Z.check(Ee.check(u)), !1), o(e, !1, "booleans", Z.check(Ee.check(C)), !1), o(e, !1, "strings", Z.check(Ee.check(ee)), !1), o(e, !1, "dynamicVariables", Mo.check, !1), o(e, !1, "fonts", Z.check(Ee.check(qo.check)), !1), o(e, !1, "animations", Z.check(Ee.check(Wo.check)), !1), o(e, !1, "audios", Z.check(Ee.check(zo.check)), !1), o(e, !1, "images", Z.check(Ee.check(jo.check)), !1), o(e, !1, "videos", Z.check(Ee.check(Vo.check)), !1), o(
  e,
  !1,
  "geometries",
  Z.check(Ee.check(Ho.check)),
  !1,
  Z.new_()
), o(
  e,
  !1,
  "emojiArt",
  Z.check(Ee.check(on.check(rt.check))),
  !1,
  Z.new_()
), e);
var Go;
((e) => {
  e.check = a0;
})(Go || (Go = {}));
var qo;
((e) => {
  e.check = (t) => t instanceof Uint8Array || typeof t == "string" || typeof t == "object" && t instanceof en ? Fo({ data: fi(t) }) : Fo(t);
})(qo || (qo = {}));
const s0 = (e) => (g(e), o(e, !1, "name", ee, !1, "Page"), o(e, !1, "backgroundColor", Oe.check, !1), o(e, !1, "objects", Qn.check(rt.check), !1), e);
var Zo;
((e) => {
  e.check = s0;
})(Zo || (Zo = {}));
const o0 = (e) => (g(e), o(e, !0, "backgroundColor", Oe.check, !1), e);
function i0() {
  return {
    backgroundColor: void 0
  };
}
var Ko;
((e) => {
  e.check = o0, e.defaultData = i0;
})(Ko || (Ko = {}));
const c0 = (e) => (g(e), o(e, !1, "schema", P(te), !1), e);
var Zi;
((e) => {
  e.check = c0;
})(Zi || (Zi = {}));
var pn = /* @__PURE__ */ ((e) => (e.Cover = "Cover", e.Contain = "Contain", e.Actual = "Actual", e.Responsive = "Responsive", e))(pn || {});
const f0 = [
  "Cover",
  "Contain",
  "Actual",
  "Responsive"
  /* Responsive */
], l0 = (e) => {
  if (!f0.includes(e))
    throw new Error("Invalid value for PresentationSizing: " + String(e));
  return e;
};
((e) => {
  e.check = l0;
})(pn || (pn = {}));
var xr = /* @__PURE__ */ ((e) => (e.png = "png", e.jpg = "jpg", e.webp = "webp", e))(xr || {});
const u0 = [
  "png",
  "jpg",
  "webp"
  /* webp */
], _0 = (e) => {
  if (!u0.includes(e))
    throw new Error("Invalid value for ImageFormat: " + String(e));
  return e;
};
((e) => {
  e.check = _0;
})(xr || (xr = {}));
var Ar = /* @__PURE__ */ ((e) => (e.mp4 = "mp4", e.webm = "webm", e.png = "png", e.jpg = "jpg", e))(Ar || {});
const d0 = [
  "mp4",
  "webm",
  "png",
  "jpg"
  /* jpg */
], h0 = (e) => {
  if (!d0.includes(e))
    throw new Error("Invalid value for VideoFormat: " + String(e));
  return e;
};
((e) => {
  e.check = h0;
})(Ar || (Ar = {}));
const p0 = (e) => (g(e), o(e, !1, "logo", C, !1, !0), o(
  e,
  !1,
  "presentationSizing",
  pn.check,
  !1,
  "Contain"
  /* Contain */
), o(e, !1, "allowPageScroll", C, !1, !0), o(e, !1, "showBackground", C, !1, !0), o(e, !0, "startFrame", V.check, !1), e);
function b0() {
  return {
    logo: !0,
    presentationSizing: "Contain",
    allowPageScroll: !0,
    showBackground: !0,
    startFrame: void 0
  };
}
var Jo;
((e) => {
  e.check = p0, e.defaultData = b0;
})(Jo || (Jo = {}));
var Za = /* @__PURE__ */ ((e) => (e.image = "image", e.video = "video", e.pdf = "pdf", e))(Za || {});
const g0 = [
  "image",
  "video",
  "pdf"
  /* pdf */
], m0 = (e) => {
  if (!g0.includes(e))
    throw new Error("Invalid value for ExportType: " + String(e));
  return e;
};
((e) => {
  e.check = m0;
})(Za || (Za = {}));
const w0 = (e) => (g(e), o(
  e,
  !1,
  "type",
  Za.check,
  !1,
  "image"
  /* image */
), o(
  e,
  !1,
  "imageFormat",
  xr.check,
  !1,
  "png"
  /* png */
), o(e, !1, "svg", C, !1, !1), o(e, !1, "imageRatio", te, !1, 1), o(e, !1, "videoRatio", te, !1, 1), o(e, !1, "videoFps", te, !1, 30), o(e, !1, "videoDuration", u, !1, 1), o(
  e,
  !1,
  "videoFormat",
  Ar.check,
  !1,
  "mp4"
  /* mp4 */
), o(e, !1, "showBackground", C, !1, !0), e);
function y0() {
  return {
    type: "image",
    imageFormat: "png",
    svg: !1,
    imageRatio: 1,
    videoRatio: 1,
    videoFps: 30,
    videoDuration: 1,
    videoFormat: "mp4",
    showBackground: !0
  };
}
var Qo;
((e) => {
  e.check = w0, e.defaultData = y0;
})(Qo || (Qo = {}));
const v0 = (e) => (g(e), o(
  e,
  !1,
  "presentationSizing",
  pn.check,
  !1,
  "Contain"
  /* Contain */
), o(e, !1, "allowPageScroll", C, !1, !0), o(e, !1, "showBackground", C, !1, !0), o(
  e,
  !1,
  "imageFormat",
  xr.check,
  !1,
  "png"
  /* png */
), o(e, !1, "imageRatio", te, !1, 1), o(e, !1, "videoRatio", te, !1, 1), o(e, !1, "videoFps", te, !1, 30), o(e, !1, "videoDuration", u, !1, 1), o(
  e,
  !1,
  "videoFormat",
  Ar.check,
  !1,
  "mp4"
  /* mp4 */
), o(e, !1, "exportSettings", _e.check(Qo.check), !1, _e.new_()), e);
function k0() {
  return {
    presentationSizing: "Contain",
    allowPageScroll: !0,
    showBackground: !0,
    imageFormat: "png",
    imageRatio: 1,
    videoRatio: 1,
    videoFps: 30,
    videoDuration: 1,
    videoFormat: "mp4",
    exportSettings: _e.new_()
  };
}
var Yo;
((e) => {
  e.check = v0, e.defaultData = k0;
})(Yo || (Yo = {}));
const sf = (e) => (g(e), o(e, !1, "schema", te, !1), o(e, !1, "scenes", _e.check(Zo.check), !1), o(e, !1, "assets", Go.check, !1), o(e, !1, "publish", Jo.check, !1), o(e, !1, "framePublish", Z.check(Yo.check), !1, Z.new_()), o(
  e,
  !1,
  "components",
  Z.check(Do.check),
  !1,
  Z.new_()
), e);
var Ka;
((e) => {
  e.check = sf;
})(Ka || (Ka = {}));
const S0 = 15, x0 = "32603ebf4-bd9a-54ba-c1e9-6645c3ee7a53";
((e) => {
  e.defaultData = (t) => sf({
    schema: S0,
    scenes: [
      {
        fi: 0,
        id: x0,
        data: {
          name: "Page",
          backgroundColor: t ?? [0.11, 0.11, 0.11, 1],
          objects: []
        }
      }
    ],
    assets: {
      images: {},
      videos: {},
      colors: {},
      audios: {},
      numbers: {},
      booleans: {},
      strings: {},
      dynamicVariables: {
        counters: {},
        randoms: {},
        timers: {},
        times: {}
      },
      fonts: {},
      animations: {},
      geometries: {},
      emojiArt: {}
    },
    publish: {
      logo: !0,
      presentationSizing: "Contain",
      allowPageScroll: !0,
      showBackground: !0
      // panTouches: 3,
    },
    framePublish: {},
    components: {}
  });
})(Ka || (Ka = {}));
function A0(e) {
  const t = (l) => {
    if (l.type === "Shape" && l.shape.type === "Model3D")
      return !0;
    let d = !1;
    return l.effects.forEach((m) => {
      m.data.enabled && m.data.type === "Mesh3dEffect" && (d = !0);
    }), d;
  }, n = (l) => l.type === "Shape" && l.shape.type === "Text", r = (l) => {
    let d = !1;
    return l.effects.forEach((m) => {
      m.data.type !== "Mesh3dEffect" && (d = !0);
    }), d;
  };
  let a = !1, i = !1, c = !1;
  const f = (l, d) => {
    (d || l.visible) && t(l) && (a = !0), n(l) && (i = !0), r(l) && (c = !0);
  };
  return e.scenes.forEach((l) => {
    l.data.objects.traverse((d, m) => f(m, !1));
  }), Object.values(e.components ?? {}).forEach((l) => {
    l.root.type === "tree" && (f(l.root.data, !0), l.root.children.traverse((d, m) => f(m, !0)));
  }), a ? "hana3d.wasm" : i && c ? "hana.wasm" : i ? "hana-nofx.wasm" : c ? "hana-notext.wasm" : "hana-min.wasm";
}
({
  ...ta
});
const O0 = (e) => (g(e), o(e, !0, "position", E.check, !1), o(e, !0, "zoom", u, !1), e);
function D0() {
  return {
    position: void 0,
    zoom: void 0
  };
}
var Ki;
((e) => {
  e.check = O0, e.defaultData = D0;
})(Ki || (Ki = {}));
const E0 = (e) => (g(e), o(e, !0, "presentationSizing", pn.check, !1), e);
function I0() {
  return {
    presentationSizing: void 0
  };
}
var Ji;
((e) => {
  e.check = E0, e.defaultData = I0;
})(Ji || (Ji = {}));
const P0 = (e) => (g(e), o(e, !1, "scene", V.check, !1), o(e, !1, "parent", P(V.check), !1), o(e, !1, "object", on.check(rt.check), !1), e);
var Xo;
((e) => {
  e.check = P0;
})(Xo || (Xo = {}));
const C0 = (e) => (g(e), o(e, !1, "scene", V.check, !1), o(e, !1, "id", V.check, !1), e);
var ei;
((e) => {
  e.check = C0;
})(ei || (ei = {}));
const B0 = (e) => (g(e), o(e, !1, "scene", V.check, !1), o(e, !1, "id", V.check, !1), o(e, !1, "parent", P(V.check), !1), o(e, !1, "fi", It, !1), e);
var ti;
((e) => {
  e.check = B0;
})(ti || (ti = {}));
const T0 = (e) => (g(e), o(e, !1, "scene", V.check, !1), o(e, !1, "id", V.check, !1), o(e, !1, "data", Sr.check, !1), o(e, !1, "dataStateful", Sr.check, !1), e);
var ni;
((e) => {
  e.check = T0;
})(ni || (ni = {}));
const M0 = (e) => (g(e), o(e, !1, "scene", V.check, !1), o(e, !1, "data", Ko.check, !1), e);
var ri;
((e) => {
  e.check = M0;
})(ri || (ri = {}));
const R0 = (e) => {
  switch (g(e), e.type) {
    case "AddObject":
      return B(e, "AddObject", Xo.check);
    case "DeleteObject":
      return B(e, "DeleteObject", ei.check);
    case "MoveObject":
      return B(e, "MoveObject", ti.check);
    case "UpdateObject":
      return B(e, "UpdateObject", ni.check);
    case "UpdateScene":
      return B(e, "UpdateScene", ri.check);
    default:
      throw new Error("Invalid type for DocumentUpdate: " + String(e.type));
  }
};
var Qi;
((e) => {
  e.check = R0;
})(Qi || (Qi = {}));
const $0 = (e) => (g(e), o(e, !1, "object", V.check, !1), o(e, !1, "state", P(V.check), !1), e);
var Yi;
((e) => {
  e.check = $0;
})(Yi || (Yi = {}));
const U0 = (e) => (g(e), o(e, !1, "data", Ca.check, !1), o(e, !1, "offset", E.check, !1), e);
var Xi;
((e) => {
  e.check = U0;
})(Xi || (Xi = {}));
function L0(e) {
  if (!e) return !1;
  const t = e.getRootNode(), n = t instanceof ShadowRoot ? t.host : e, r = n.parentElement;
  if (!r || r.tagName !== "BODY") return !1;
  const a = [
    "DIV",
    "P",
    "SPAN",
    "SECTION",
    "ARTICLE",
    "HEADER",
    "FOOTER",
    "MAIN",
    "ASIDE",
    "NAV",
    "ADDRESS",
    "HGROUP"
  ];
  return Array.from(r.children).some(
    (i) => i !== n && a.includes(i.tagName)
  );
}
let Lr = null;
function j0(e) {
  if (Lr) return Lr;
  const t = e;
  return Lr = (async () => {
    await new Promise((r, a) => {
      const i = document.createElement("script");
      i.src = `${t}/draco_decoder.js`, i.onload = () => r(), i.onerror = () => a(new Error(`Failed to load Draco decoder from ${i.src}`)), document.head.appendChild(i);
    });
    const n = globalThis.DracoDecoderModule;
    if (!n) throw new Error("DracoDecoderModule not available after script load");
    return n({ locateFile: (r) => `${t}/${r}` });
  })(), Lr;
}
function F0(e, t) {
  const n = t.draco, r = new e.Decoder(), a = new e.DecoderBuffer(), i = new Int8Array(n);
  a.Init(i, i.length);
  const c = new e.Mesh(), f = r.DecodeBufferToMesh(a, c);
  if (!f.ok())
    throw e.destroy(c), e.destroy(r), e.destroy(a), new Error(`Draco decode failed: ${f.error_msg()}`);
  const l = c.num_points(), d = c.num_faces();
  function m(G, se) {
    const ge = r.GetAttributeId(c, G);
    if (ge === -1) return [];
    const q = r.GetAttribute(c, ge);
    if (!q || q.ptr === 0) return [];
    const he = new e.DracoFloat32Array();
    r.GetAttributeFloatForAllPoints(c, q, he);
    const ye = new Array(l * se);
    for (let Pe = 0; Pe < ye.length; Pe++) ye[Pe] = he.GetValue(Pe);
    return e.destroy(he), ye;
  }
  const y = m(e.POSITION, 3), x = m(e.NORMAL, 3), L = m(e.TEX_COORD, 2), N = r.GetAttributeId(c, e.GENERIC) !== -1 ? m(e.GENERIC, 4) : null, R = new e.DracoInt32Array(), de = new Array(d * 3);
  for (let G = 0; G < d; G++)
    r.GetFaceFromMesh(c, G, R), de[G * 3] = R.GetValue(0), de[G * 3 + 1] = R.GetValue(1), de[G * 3 + 2] = R.GetValue(2);
  return e.destroy(R), e.destroy(c), e.destroy(r), e.destroy(a), { ...t, draco: null, positions: y, normals: x, texCoords: L, indices: de, tangents: N };
}
async function z0(e, t) {
  const n = e.assets.geometries, r = Object.keys(n);
  if (!r.some(
    (i) => n[i].data.meshes.some((c) => c.draco != null && c.draco.length > 0)
  )) return;
  const a = await j0(t);
  for (const i of r) {
    const c = n[i], f = c.data.meshes, l = f.map(
      (d) => d.draco != null && d.draco.length > 0 ? F0(a, d) : d
    );
    l.some((d, m) => d !== f[m]) && (e.assets.geometries[i] = {
      ...c,
      data: { ...c.data, meshes: l }
    });
  }
}
const ys = {};
function V0(e = "") {
  return ys[e] || (ys[e] = Vl(e ? { module_or_path: e } : void 0)), ys[e];
}
Object.defineProperty(Tt.prototype, "scene", {
  get: function() {
    const e = {};
    return Object.setPrototypeOf(e, Cs.prototype), e.__wbg_ptr = this.__wbg_ptr, e;
  }
});
var Pn, Be, Cn, Bn, ct, Xt, Tn, Mn, Rn, Jt, Qt, Nr, Wr, Ye, ft, $n, Hr, Gr, Un, qr, Zr, Kr, Jr, Qr;
class N0 {
  constructor(t, n) {
    ne(this, Ye), Ve(this, "canvas"), Ve(this, "unloadable", !1), Ve(this, "loading", "lazy"), ne(this, Pn, "local"), Ve(this, "data"), Ve(this, "wasmURL"), Ve(this, "dracoDecoderPath"), ne(this, Be), ne(this, Cn), ne(this, Bn), ne(this, ct, !1), ne(this, Xt, !1), ne(this, Tn), ne(this, Mn), ne(this, Rn), ne(this, Jt, async () => {
      this.data && (De(this, Xt, !1), De(this, Be, await Tt.create(this.canvas, this.data, !1)), I(this, Be).getDeviceLostPromise()?.wait().then(async (a) => {
        console.error("Device lost:", a), I(this, Qt).call(this), I(this, ct) && await I(this, Jt).call(this);
      }), this.resize(), I(this, Be).scene.present(this.data.publish.startFrame ?? null));
    }), ne(this, Qt, () => {
      I(this, Be)?.free(), De(this, Be, void 0);
    }), Ve(this, "resize", () => {
      const a = this.canvas.clientWidth, i = this.canvas.clientHeight;
      this.canvas.width = Math.ceil(a * window.devicePixelRatio), this.canvas.height = Math.ceil(i * window.devicePixelRatio), I(this, Be)?.resize([a, i], window.devicePixelRatio);
      const c = this.canvas.getBoundingClientRect();
      De(this, Mn, c.top + window.scrollY), De(this, Rn, c.left + window.scrollX);
    }), ne(this, Nr, () => {
      const a = this.eventsTarget === "global" ? window : this.canvas;
      this.canvas.addEventListener("pointerdown", I(this, Hr)), this.canvas.addEventListener("pointerup", I(this, Gr)), a.addEventListener("pointermove", I(this, Un)), window.addEventListener("keydown", I(this, qr)), window.addEventListener("keyup", I(this, Zr)), this.canvas.addEventListener("pointerenter", I(this, Kr)), this.canvas.addEventListener("pointerleave", I(this, Jr));
    }), ne(this, Wr, () => {
      this.canvas.removeEventListener("pointerdown", I(this, Hr)), this.canvas.removeEventListener("pointerup", I(this, Gr)), window.removeEventListener("pointermove", I(this, Un)), this.canvas.removeEventListener("pointermove", I(this, Un)), window.removeEventListener("keydown", I(this, qr)), window.removeEventListener("keyup", I(this, Zr)), this.canvas.removeEventListener("pointerenter", I(this, Kr)), this.canvas.removeEventListener("pointerleave", I(this, Jr));
    }), ne(this, $n, (a) => {
      const i = a.pageX - I(this, Rn), c = a.pageY - I(this, Mn);
      return [i, c];
    }), ne(this, Hr, (a) => {
      const i = I(this, $n).call(this, a);
      I(this, Ye, ft)?.onPointerDown(i, a.pointerType === "touch", a.button);
    }), ne(this, Gr, (a) => {
      const i = I(this, $n).call(this, a);
      I(this, Ye, ft)?.onPointerUp(i, a.pointerType === "touch", a.button);
    }), ne(this, Un, (a) => {
      const i = a, c = I(this, $n).call(this, i);
      I(this, Ye, ft)?.onPointerMove(c, i.pointerType === "touch", i.button);
    }), ne(this, qr, (a) => {
      I(this, Ye, ft)?.onKeyDown(a.key);
    }), ne(this, Zr, (a) => {
      I(this, Ye, ft)?.onKeyUp(a.key);
    }), ne(this, Kr, () => {
      I(this, Ye, ft)?.onPointerEnter(), this.resize();
    }), ne(this, Jr, () => {
      I(this, Ye, ft)?.onPointerLeave();
    }), ne(this, Qr, () => {
      if (De(this, Tn, window.requestAnimationFrame(I(this, Qr))), !I(this, Xt) && I(this, ct))
        try {
          I(this, Be)?.onFrame();
        } catch (a) {
          De(this, Xt, !0), console.error(
            "Hana runtime crashed during a frame; halting rendering. Reload to recover.",
            a
          );
        }
    }), this.canvas = t;
    const r = t.getBoundingClientRect();
    De(this, Mn, r.top + window.scrollY), De(this, Rn, r.left + window.scrollX), n && (n.unloadable !== void 0 && (this.unloadable = n.unloadable), n.loading !== void 0 && (this.loading = n.loading), n.eventsTarget !== void 0 && (this.eventsTarget = n.eventsTarget), n.wasmURL !== void 0 && (this.wasmURL = n.wasmURL), n.dracoDecoderPath !== void 0 && (this.dracoDecoderPath = n.dracoDecoderPath));
  }
  get eventsTarget() {
    return I(this, Pn);
  }
  set eventsTarget(t) {
    I(this, Pn) !== t && (De(this, Pn, t), I(this, Wr).call(this), I(this, Nr).call(this));
  }
  async load(t) {
    const n = await fetch(t, { cache: "no-cache" });
    if (!n.ok)
      throw new Error(`Failed to fetch ${t}: ${n.statusText}`);
    const r = await n.arrayBuffer(), a = new Uint8Array(r);
    await this.start(a);
  }
  async start(t) {
    Array.isArray(t) && (t = new Uint8Array(t));
    const n = Ps.deserialize(t);
    this.dracoDecoderPath && await z0(n, this.dracoDecoderPath), this.data = n, await V0(
      this.wasmURL ?? new URL(A0(n), import.meta.url).toString()
    ), this.canvas.addEventListener("contextmenu", (i) => i.preventDefault()), n.publish.allowPageScroll || (this.canvas.addEventListener("wheel", (i) => i.preventDefault()), this.canvas.addEventListener("touchstart", (i) => i.preventDefault())), this.canvas.addEventListener("webglcontextlost", async () => {
      I(this, Qt).call(this), I(this, ct) && await I(this, Jt).call(this);
    }), I(this, Nr).call(this), De(this, Bn, new IntersectionObserver(
      async (i) => {
        const c = i[0];
        De(this, ct, c.isIntersecting), I(this, ct) && I(this, Be) === void 0 && await I(this, Jt).call(this), !I(this, ct) && I(this, Be) !== void 0 && this.unloadable && I(this, Qt).call(this);
      },
      {
        rootMargin: "200px 0px 0px 0px"
      }
    )), I(this, Bn).observe(this.canvas), De(this, Cn, new ResizeObserver(this.resize)), I(this, Cn).observe(this.canvas);
    const r = !L0(this.canvas), a = this.canvas.getRootNode() instanceof ShadowRoot;
    this.canvas.style.width = "100%", this.canvas.style.height = r && !a ? "100vh" : "100%", this.loading === "eager" && await I(this, Jt).call(this), I(this, Qr).call(this);
  }
  dispose() {
    I(this, Wr).call(this), I(this, Qt).call(this), I(this, Cn)?.disconnect(), I(this, Bn)?.disconnect(), I(this, Tn) && window.cancelAnimationFrame(I(this, Tn));
  }
}
Pn = /* @__PURE__ */ new WeakMap(), Be = /* @__PURE__ */ new WeakMap(), Cn = /* @__PURE__ */ new WeakMap(), Bn = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ new WeakMap(), Xt = /* @__PURE__ */ new WeakMap(), Tn = /* @__PURE__ */ new WeakMap(), Mn = /* @__PURE__ */ new WeakMap(), Rn = /* @__PURE__ */ new WeakMap(), Jt = /* @__PURE__ */ new WeakMap(), Qt = /* @__PURE__ */ new WeakMap(), Nr = /* @__PURE__ */ new WeakMap(), Wr = /* @__PURE__ */ new WeakMap(), Ye = /* @__PURE__ */ new WeakSet(), ft = function() {
  if (!I(this, Xt))
    return I(this, Be)?.scene;
}, $n = /* @__PURE__ */ new WeakMap(), Hr = /* @__PURE__ */ new WeakMap(), Gr = /* @__PURE__ */ new WeakMap(), Un = /* @__PURE__ */ new WeakMap(), qr = /* @__PURE__ */ new WeakMap(), Zr = /* @__PURE__ */ new WeakMap(), Kr = /* @__PURE__ */ new WeakMap(), Jr = /* @__PURE__ */ new WeakMap(), Qr = /* @__PURE__ */ new WeakMap();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yr = globalThis, hi = Yr.ShadowRoot && (Yr.ShadyCSS === void 0 || Yr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, pi = Symbol(), ec = /* @__PURE__ */ new WeakMap();
let of = class {
  constructor(t, n, r) {
    if (this._$cssResult$ = !0, r !== pi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (hi && t === void 0) {
      const r = n !== void 0 && n.length === 1;
      r && (t = ec.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && ec.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const W0 = (e) => new of(typeof e == "string" ? e : e + "", void 0, pi), H0 = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((r, a, i) => r + ((c) => {
    if (c._$cssResult$ === !0) return c.cssText;
    if (typeof c == "number") return c;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + c + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + e[i + 1], e[0]);
  return new of(n, e, pi);
}, G0 = (e, t) => {
  if (hi) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const r = document.createElement("style"), a = Yr.litNonce;
    a !== void 0 && r.setAttribute("nonce", a), r.textContent = n.cssText, e.appendChild(r);
  }
}, tc = hi ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const r of t.cssRules) n += r.cssText;
  return W0(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: q0, defineProperty: Z0, getOwnPropertyDescriptor: K0, getOwnPropertyNames: J0, getOwnPropertySymbols: Q0, getPrototypeOf: Y0 } = Object, pt = globalThis, nc = pt.trustedTypes, X0 = nc ? nc.emptyScript : "", ep = pt.reactiveElementPolyfillSupport, zn = (e, t) => e, Ja = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? X0 : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let n = e;
  switch (t) {
    case Boolean:
      n = e !== null;
      break;
    case Number:
      n = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(e);
      } catch {
        n = null;
      }
  }
  return n;
} }, bi = (e, t) => !q0(e, t), rc = { attribute: !0, type: String, converter: Ja, reflect: !1, useDefault: !1, hasChanged: bi };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), pt.litPropertyMetadata ?? (pt.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Yt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = rc) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const r = Symbol(), a = this.getPropertyDescriptor(t, r, n);
      a !== void 0 && Z0(this.prototype, t, a);
    }
  }
  static getPropertyDescriptor(t, n, r) {
    const { get: a, set: i } = K0(this.prototype, t) ?? { get() {
      return this[n];
    }, set(c) {
      this[n] = c;
    } };
    return { get: a, set(c) {
      const f = a?.call(this);
      i?.call(this, c), this.requestUpdate(t, f, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? rc;
  }
  static _$Ei() {
    if (this.hasOwnProperty(zn("elementProperties"))) return;
    const t = Y0(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(zn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(zn("properties"))) {
      const n = this.properties, r = [...J0(n), ...Q0(n)];
      for (const a of r) this.createProperty(a, n[a]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const n = litPropertyMetadata.get(t);
      if (n !== void 0) for (const [r, a] of n) this.elementProperties.set(r, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, r] of this.elementProperties) {
      const a = this._$Eu(n, r);
      a !== void 0 && this._$Eh.set(a, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const n = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const a of r) n.unshift(tc(a));
    } else t !== void 0 && n.push(tc(t));
    return n;
  }
  static _$Eu(t, n) {
    const r = n.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const r of n.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return G0(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, n, r) {
    this._$AK(t, r);
  }
  _$ET(t, n) {
    const r = this.constructor.elementProperties.get(t), a = this.constructor._$Eu(t, r);
    if (a !== void 0 && r.reflect === !0) {
      const i = (r.converter?.toAttribute !== void 0 ? r.converter : Ja).toAttribute(n, r.type);
      this._$Em = t, i == null ? this.removeAttribute(a) : this.setAttribute(a, i), this._$Em = null;
    }
  }
  _$AK(t, n) {
    const r = this.constructor, a = r._$Eh.get(t);
    if (a !== void 0 && this._$Em !== a) {
      const i = r.getPropertyOptions(a), c = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : Ja;
      this._$Em = a;
      const f = c.fromAttribute(n, i.type);
      this[a] = f ?? this._$Ej?.get(a) ?? f, this._$Em = null;
    }
  }
  requestUpdate(t, n, r, a = !1, i) {
    if (t !== void 0) {
      const c = this.constructor;
      if (a === !1 && (i = this[t]), r ?? (r = c.getPropertyOptions(t)), !((r.hasChanged ?? bi)(i, n) || r.useDefault && r.reflect && i === this._$Ej?.get(t) && !this.hasAttribute(c._$Eu(t, r)))) return;
      this.C(t, n, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, n, { useDefault: r, reflect: a, wrapped: i }, c) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, c ?? n ?? this[t]), i !== !0 || c !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (n = void 0), this._$AL.set(t, n)), a === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [a, i] of this._$Ep) this[a] = i;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [a, i] of r) {
        const { wrapped: c } = i, f = this[a];
        c !== !0 || this._$AL.has(a) || f === void 0 || this.C(a, void 0, i, f);
      }
    }
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(n)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((n) => n.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((n) => this._$ET(n, this[n]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Yt.elementStyles = [], Yt.shadowRootOptions = { mode: "open" }, Yt[zn("elementProperties")] = /* @__PURE__ */ new Map(), Yt[zn("finalized")] = /* @__PURE__ */ new Map(), ep?.({ ReactiveElement: Yt }), (pt.reactiveElementVersions ?? (pt.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Vn = globalThis, ac = (e) => e, Qa = Vn.trustedTypes, sc = Qa ? Qa.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, cf = "$lit$", ut = `lit$${Math.random().toFixed(9).slice(2)}$`, ff = "?" + ut, tp = `<${ff}>`, Gt = document, Or = () => Gt.createComment(""), Dr = (e) => e === null || typeof e != "object" && typeof e != "function", gi = Array.isArray, np = (e) => gi(e) || typeof e?.[Symbol.iterator] == "function", vs = `[ 	
\f\r]`, kn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, oc = /-->/g, ic = />/g, At = RegExp(`>|${vs}(?:([^\\s"'>=/]+)(${vs}*=${vs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), cc = /'/g, fc = /"/g, lf = /^(?:script|style|textarea|title)$/i, rp = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), ap = rp(1), bn = Symbol.for("lit-noChange"), ue = Symbol.for("lit-nothing"), lc = /* @__PURE__ */ new WeakMap(), Pt = Gt.createTreeWalker(Gt, 129);
function uf(e, t) {
  if (!gi(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return sc !== void 0 ? sc.createHTML(t) : t;
}
const sp = (e, t) => {
  const n = e.length - 1, r = [];
  let a, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", c = kn;
  for (let f = 0; f < n; f++) {
    const l = e[f];
    let d, m, y = -1, x = 0;
    for (; x < l.length && (c.lastIndex = x, m = c.exec(l), m !== null); ) x = c.lastIndex, c === kn ? m[1] === "!--" ? c = oc : m[1] !== void 0 ? c = ic : m[2] !== void 0 ? (lf.test(m[2]) && (a = RegExp("</" + m[2], "g")), c = At) : m[3] !== void 0 && (c = At) : c === At ? m[0] === ">" ? (c = a ?? kn, y = -1) : m[1] === void 0 ? y = -2 : (y = c.lastIndex - m[2].length, d = m[1], c = m[3] === void 0 ? At : m[3] === '"' ? fc : cc) : c === fc || c === cc ? c = At : c === oc || c === ic ? c = kn : (c = At, a = void 0);
    const L = c === At && e[f + 1].startsWith("/>") ? " " : "";
    i += c === kn ? l + tp : y >= 0 ? (r.push(d), l.slice(0, y) + cf + l.slice(y) + ut + L) : l + ut + (y === -2 ? f : L);
  }
  return [uf(e, i + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class Er {
  constructor({ strings: t, _$litType$: n }, r) {
    let a;
    this.parts = [];
    let i = 0, c = 0;
    const f = t.length - 1, l = this.parts, [d, m] = sp(t, n);
    if (this.el = Er.createElement(d, r), Pt.currentNode = this.el.content, n === 2 || n === 3) {
      const y = this.el.content.firstChild;
      y.replaceWith(...y.childNodes);
    }
    for (; (a = Pt.nextNode()) !== null && l.length < f; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const y of a.getAttributeNames()) if (y.endsWith(cf)) {
          const x = m[c++], L = a.getAttribute(y).split(ut), N = /([.?@])?(.*)/.exec(x);
          l.push({ type: 1, index: i, name: N[2], strings: L, ctor: N[1] === "." ? ip : N[1] === "?" ? cp : N[1] === "@" ? fp : ns }), a.removeAttribute(y);
        } else y.startsWith(ut) && (l.push({ type: 6, index: i }), a.removeAttribute(y));
        if (lf.test(a.tagName)) {
          const y = a.textContent.split(ut), x = y.length - 1;
          if (x > 0) {
            a.textContent = Qa ? Qa.emptyScript : "";
            for (let L = 0; L < x; L++) a.append(y[L], Or()), Pt.nextNode(), l.push({ type: 2, index: ++i });
            a.append(y[x], Or());
          }
        }
      } else if (a.nodeType === 8) if (a.data === ff) l.push({ type: 2, index: i });
      else {
        let y = -1;
        for (; (y = a.data.indexOf(ut, y + 1)) !== -1; ) l.push({ type: 7, index: i }), y += ut.length - 1;
      }
      i++;
    }
  }
  static createElement(t, n) {
    const r = Gt.createElement("template");
    return r.innerHTML = t, r;
  }
}
function gn(e, t, n = e, r) {
  if (t === bn) return t;
  let a = r !== void 0 ? n._$Co?.[r] : n._$Cl;
  const i = Dr(t) ? void 0 : t._$litDirective$;
  return a?.constructor !== i && (a?._$AO?.(!1), i === void 0 ? a = void 0 : (a = new i(e), a._$AT(e, n, r)), r !== void 0 ? (n._$Co ?? (n._$Co = []))[r] = a : n._$Cl = a), a !== void 0 && (t = gn(e, a._$AS(e, t.values), a, r)), t;
}
class op {
  constructor(t, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: n }, parts: r } = this._$AD, a = (t?.creationScope ?? Gt).importNode(n, !0);
    Pt.currentNode = a;
    let i = Pt.nextNode(), c = 0, f = 0, l = r[0];
    for (; l !== void 0; ) {
      if (c === l.index) {
        let d;
        l.type === 2 ? d = new Rr(i, i.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(i, l.name, l.strings, this, t) : l.type === 6 && (d = new lp(i, this, t)), this._$AV.push(d), l = r[++f];
      }
      c !== l?.index && (i = Pt.nextNode(), c++);
    }
    return Pt.currentNode = Gt, a;
  }
  p(t) {
    let n = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, n), n += r.strings.length - 2) : r._$AI(t[n])), n++;
  }
}
class Rr {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, n, r, a) {
    this.type = 2, this._$AH = ue, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = r, this.options = a, this._$Cv = a?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && t?.nodeType === 11 && (t = n.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, n = this) {
    t = gn(this, t, n), Dr(t) ? t === ue || t == null || t === "" ? (this._$AH !== ue && this._$AR(), this._$AH = ue) : t !== this._$AH && t !== bn && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : np(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== ue && Dr(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Gt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: n, _$litType$: r } = t, a = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = Er.createElement(uf(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === a) this._$AH.p(n);
    else {
      const i = new op(a, this), c = i.u(this.options);
      i.p(n), this.T(c), this._$AH = i;
    }
  }
  _$AC(t) {
    let n = lc.get(t.strings);
    return n === void 0 && lc.set(t.strings, n = new Er(t)), n;
  }
  k(t) {
    gi(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let r, a = 0;
    for (const i of t) a === n.length ? n.push(r = new Rr(this.O(Or()), this.O(Or()), this, this.options)) : r = n[a], r._$AI(i), a++;
    a < n.length && (this._$AR(r && r._$AB.nextSibling, a), n.length = a);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); t !== this._$AB; ) {
      const r = ac(t).nextSibling;
      ac(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ns {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, r, a, i) {
    this.type = 1, this._$AH = ue, this._$AN = void 0, this.element = t, this.name = n, this._$AM = a, this.options = i, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = ue;
  }
  _$AI(t, n = this, r, a) {
    const i = this.strings;
    let c = !1;
    if (i === void 0) t = gn(this, t, n, 0), c = !Dr(t) || t !== this._$AH && t !== bn, c && (this._$AH = t);
    else {
      const f = t;
      let l, d;
      for (t = i[0], l = 0; l < i.length - 1; l++) d = gn(this, f[r + l], n, l), d === bn && (d = this._$AH[l]), c || (c = !Dr(d) || d !== this._$AH[l]), d === ue ? t = ue : t !== ue && (t += (d ?? "") + i[l + 1]), this._$AH[l] = d;
    }
    c && !a && this.j(t);
  }
  j(t) {
    t === ue ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ip extends ns {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === ue ? void 0 : t;
  }
}
class cp extends ns {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== ue);
  }
}
class fp extends ns {
  constructor(t, n, r, a, i) {
    super(t, n, r, a, i), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = gn(this, t, n, 0) ?? ue) === bn) return;
    const r = this._$AH, a = t === ue && r !== ue || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, i = t !== ue && (r === ue || a);
    a && this.element.removeEventListener(this.name, this, r), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class lp {
  constructor(t, n, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    gn(this, t);
  }
}
const up = Vn.litHtmlPolyfillSupport;
up?.(Er, Rr), (Vn.litHtmlVersions ?? (Vn.litHtmlVersions = [])).push("3.3.3");
const _f = (e, t, n) => {
  const r = n?.renderBefore ?? t;
  let a = r._$litPart$;
  if (a === void 0) {
    const i = n?.renderBefore ?? null;
    r._$litPart$ = a = new Rr(t.insertBefore(Or(), i), i, void 0, n ?? {});
  }
  return a._$AI(e), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nn = globalThis;
class Wn extends Yt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var n;
    const t = super.createRenderRoot();
    return (n = this.renderOptions).renderBefore ?? (n.renderBefore = t.firstChild), t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = _f(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return bn;
  }
}
Wn._$litElement$ = !0, Wn.finalized = !0, Nn.litElementHydrateSupport?.({ LitElement: Wn });
const _p = Nn.litElementPolyfillSupport;
_p?.({ LitElement: Wn });
(Nn.litElementVersions ?? (Nn.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dp = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const hp = { attribute: !0, type: String, converter: Ja, reflect: !1, hasChanged: bi }, pp = (e = hp, t, n) => {
  const { kind: r, metadata: a } = n;
  let i = globalThis.litPropertyMetadata.get(a);
  if (i === void 0 && globalThis.litPropertyMetadata.set(a, i = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), i.set(n.name, e), r === "accessor") {
    const { name: c } = n;
    return { set(f) {
      const l = t.get.call(this);
      t.set.call(this, f), this.requestUpdate(c, l, e, !0, f);
    }, init(f) {
      return f !== void 0 && this.C(c, void 0, e, f), f;
    } };
  }
  if (r === "setter") {
    const { name: c } = n;
    return function(f) {
      const l = this[c];
      t.call(this, f), this.requestUpdate(c, l, e, !0, f);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function mn(e) {
  return (t, n) => typeof n == "object" ? pp(e, t, n) : ((r, a, i) => {
    const c = a.hasOwnProperty(i);
    return a.constructor.createProperty(i, r), c ? Object.getOwnPropertyDescriptor(a, i) : void 0;
  })(e, t, n);
}
var df = Object.defineProperty, bp = Object.getOwnPropertyDescriptor, gp = (e, t, n) => t in e ? df(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, qt = (e, t, n, r) => {
  for (var a = r > 1 ? void 0 : r ? bp(t, n) : t, i = e.length - 1, c; i >= 0; i--)
    (c = e[i]) && (a = (r ? c(t, n, a) : c(a)) || a);
  return r && a && df(t, n, a), a;
}, mp = (e, t, n) => gp(e, t + "", n);
const wp = () => ap` <style>
      :host {
        width: 100%;
      }</style
    ><style>
      :host {
        height: 100%;
      }
    </style>
    <div id="container">
      <canvas id="hana"></canvas>
      <div id="slot">
        <slot></slot>
      </div>
      <a id="logo" href="https://spline.design/?utm_source=spline-viewer&utm_campaign=spline-logo">
        <span></span>
        <svg
          width="89"
          height="13"
          viewBox="0 0 89 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#fff"
            d="M1 10V1.3h2.9c.6 0 1.2 0 1.6.3a2 2 0 0 1 1.1 1.8c0 .6-.1 1-.4 1.3-.3.3-.7.5-1.2.6.4 0 .7 0 1 .2l.7.7.2 1c0 .7-.1 1.2-.4 1.6-.2.4-.6.7-1 1L4 10H1Zm1.3-1.3h1.4c.6 0 1 0 1.3-.3.3-.2.4-.5.4-1s0-.8-.2-1a1 1 0 0 0-.6-.3 5 5 0 0 0-1 0H2.4v2.6Zm0-3.8h1.3c.4 0 .7 0 1-.2.2 0 .3-.2.4-.4l.1-.7c0-.4 0-.7-.4-.8-.3-.2-.6-.2-1-.2H2.2v2.3Zm7.9 5.2c-.6 0-1-.2-1.4-.6-.3-.4-.5-1-.5-1.7V3.4h1.4v4c0 .4 0 .6.2.8 0 .3.1.4.3.5l.6.1c.3 0 .6 0 .8-.2.3-.2.4-.4.5-.6V3.4h1.4V10h-1.2l-.1-2.5V8c0 .4 0 .7-.2 1-.1.4-.4.6-.6.8a2 2 0 0 1-1.2.3Zm5.1-.1V3.4h1.5V10h-1.5Zm.8-7.5a1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7 1 1 0 0 1 1-1l.6.3c.2.2.3.4.3.7 0 .3-.1.5-.3.7l-.6.3Zm2.4 7.5V.7H20V10h-1.5Zm5.2.1c-.6 0-1-.1-1.3-.4-.2-.3-.4-.7-.4-1.1V4.9l.3-.2-.3-1v-.2l.3-2h1.1v6.7c0 .2 0 .4.2.5l.5.1h.9V10a21.8 21.8 0 0 1-1.4 0Zm-2.5-5.4V3.4H25v1.3h-4Zm8.6 5.3-2-6.5h1.5l.8 3.2.4 2 .1.1.3-2.1.8-3.2h1.8l.8 3.2.3 2.2h.1l.4-2.2.8-3.2h1.6l-2 6.5h-1.7L33 6.9l-.3-2h-.1l-.4 2-.8 3.1h-1.6Zm8.7 0V3.4H40V10h-1.5Zm.8-7.5a1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7 1 1 0 0 1 1-1l.6.3c.2.2.3.4.3.7 0 .3-.1.5-.3.7l-.6.3Zm4.3 7.6c-.5 0-.9-.1-1.2-.4-.3-.3-.4-.7-.4-1.1V4.9l.3-.2-.3-1v-.2l.3-2h1v6.7l.2.5.6.1h.9V10a21.8 21.8 0 0 1-1.4 0Zm-2.5-5.4V3.4h4v1.3h-4Zm5.2 5.3V.7h1.5v2.8l-.1 1.8v.5-.4c0-.3 0-.7.2-1l.6-.8a2 2 0 0 1 1.2-.3c.6 0 1 .2 1.4.6.4.4.5 1 .5 1.8V10h-1.4V6.2c0-.6 0-1-.2-1.2-.2-.3-.5-.4-1-.4a1 1 0 0 0-.7.3 2 2 0 0 0-.5.6V10h-1.5Zm14.2 0V1.3h1.4V10h-1.4Zm-5 0V1.3H57V10h-1.4Zm1-3.8V4.9h4.2v1.3h-4.1Zm8.9 3.8c-.4 0-.8 0-1.1-.2-.3-.1-.6-.3-.7-.6-.2-.2-.3-.6-.3-1 0-.3 0-.6.2-.9l.6-.6 1-.3a9.2 9.2 0 0 1 1.6-.2h.5v-.4c0-.4 0-.7-.2-1-.2-.2-.5-.3-1-.3a2 2 0 0 0-.6.1c-.2 0-.3.2-.4.4l-.2.8h-1.3c0-.6 0-1 .3-1.4.2-.4.5-.6.9-.8a3.7 3.7 0 0 1 2.4-.1c.3 0 .5.1.8.3l.5.7.2 1.2V10h-1.4V8.5c0 .5-.2.8-.5 1.1-.3.3-.8.5-1.3.5Zm.3-1a2 2 0 0 0 1.2-.4c.2-.2.3-.3.3-.5V6.9a7.3 7.3 0 0 0-1 .2c-.5 0-.9.2-1 .4-.3.1-.4.3-.4.6 0 .2 0 .4.2.5l.3.3.4.1Zm4.7 1V3.4h1.2l.1 2.5v-.5c0-.3 0-.7.2-1l.6-.8a2 2 0 0 1 1.2-.3c.6 0 1 .2 1.4.6.4.4.5 1 .5 1.8V10h-1.4V5.2l-.4-.4-.7-.2c-.3 0-.6 0-.8.3a1 1 0 0 0-.5.6V10h-1.4Zm8.6 0c-.4 0-.7 0-1-.2-.4-.1-.6-.3-.8-.6l-.2-1c0-.3 0-.6.2-.9l.6-.6 1-.3a9.2 9.2 0 0 1 1.5-.2h.6v-.4c0-.4 0-.7-.3-1-.1-.2-.4-.3-.9-.3a2 2 0 0 0-.7.1l-.4.4-.1.8h-1.3c0-.6 0-1 .2-1.4.2-.4.5-.6 1-.8a3.7 3.7 0 0 1 2.4-.1c.2 0 .5.1.7.3l.6.7.2 1.2V10h-1.4V8.5c0 .5-.3.8-.6 1.1-.3.3-.7.5-1.3.5Zm.4-1a2 2 0 0 0 1.2-.4c.2-.2.3-.3.3-.5V6.9a7.3 7.3 0 0 0-1.1.2c-.5 0-.8.2-1 .4-.2.1-.3.3-.3.6l.1.5.4.3.4.1Z"
          />
        </svg>
      </a>
    </div>`;
let at = class extends Wn {
  constructor() {
    super();
    ke(this, "url", null);
    ke(this, "width");
    ke(this, "height");
    ke(this, "loading", "lazy");
    ke(this, "unloadable", !1);
    ke(this, "eventsTarget");
    ke(this, "_hana");
    ke(this, "_loaded", !1);
    ke(this, "_container");
    ke(this, "_canvas");
    ke(this, "_logo");
    ke(this, "_slot");
    ke(this, "_loadedUrl", null);
    ke(this, "onLoaded", () => {
      this._loaded = !0, this._hana?.data?.publish.logo !== !1 && (this._logo.style.display = "flex"), setTimeout(() => {
        this._canvas.style.visibility = "visible";
      }), this.dispatchEvent(new CustomEvent("load-complete", { detail: { url: this.url } })), this._slot.style.display = "none";
    });
    this.attachShadow({ mode: "open" });
    const t = this.shadowRoot;
    _f(wp(), t), this._container = t.querySelector("#container"), this._canvas = t.querySelector("#hana"), this._logo = t.querySelector("#logo"), this._slot = t.querySelector("#slot");
  }
  unload() {
    this._loaded && (this._loaded = !1, this._loadedUrl = null, this._hana?.dispose(), this.dispatchEvent(new CustomEvent("unload", { detail: {} })));
  }
  load() {
    if (!this._hana || this._loaded || !this.url || this.url === this._loadedUrl) return;
    this._canvas.style.visibility = "hidden", this.dispatchEvent(new CustomEvent("load-start", { detail: { url: this.url } })), this._loadedUrl = this.url;
    const t = this.shadowRoot?.querySelector("style:nth-child(1)"), n = this.shadowRoot?.querySelector("style:nth-child(2)");
    this.width !== void 0 && (this._container.style.width = this.width + "px", t?.remove()), this.height !== void 0 && (this._container.style.height = this.height + "px", n?.remove()), this._hana.load(this.url).then(this.onLoaded);
  }
  updated(t) {
    super.updated(t), t.has("url") && (this.url == null && this._loaded ? this.unload() : this.url !== this._loadedUrl && this.load());
    const n = this.shadowRoot?.querySelector("style:nth-child(1)"), r = this.shadowRoot?.querySelector("style:nth-child(2)");
    t.has("width") && this.width !== void 0 && (this._container.style.width = this.width + "px", n?.remove()), t.has("height") && this.height !== void 0 && (this._container.style.height = this.height + "px", r?.remove()), t.has("eventsTarget") && this.eventsTarget !== void 0 && this._hana && (this._hana.eventsTarget = this.eventsTarget);
  }
  connectedCallback() {
    super.connectedCallback(), this._hana || (this._hana = new N0(this._canvas, {
      eventsTarget: this.eventsTarget,
      unloadable: this.unloadable,
      loading: this.loading
    })), this.url && this.load();
  }
};
mp(at, "styles", H0`
    :host {
      display: block;
    }
    #container {
      width: 100%;
      height: 100%;
      position: relative;
    }
    #hana {
      display: block;
    }

    #slot {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      pointer-events: none;
    }

    #logo {
      display: none;
      position: absolute;
      z-index: 3;
      bottom: 20px;
      right: 20px;
      width: 137px;
      height: 36px;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border-radius: 12px;
      background: linear-gradient(180deg, #16181c 0%, #121316 100%);
      box-shadow:
        inset 0px -2px 0px -1px #060709,
        inset 0px 1px 0px rgba(255, 255, 255, 0.04);
    }
    #logo span {
      display: block;
      width: 20px;
      height: 20px;
      background-image: url(https://app.spline.design/_assets/_icons/icon_favicon32x32.png);
      background-size: cover;
    }
    #logo svg {
      display: block;
      margin-right: 2px;
    }
    #logo:hover {
      background: linear-gradient(180deg, #1b1c21 0%, #17181c 100%);
    }
  `);
qt([
  mn({ type: String })
], at.prototype, "url", 2);
qt([
  mn({ type: Number })
], at.prototype, "width", 2);
qt([
  mn({ type: Number })
], at.prototype, "height", 2);
qt([
  mn({ type: String })
], at.prototype, "loading", 2);
qt([
  mn({ type: Boolean })
], at.prototype, "unloadable", 2);
qt([
  mn({ type: String, attribute: "events-target" })
], at.prototype, "eventsTarget", 2);
at = qt([
  dp("hana-viewer")
], at);
export {
  at as SplineViewer
};

// DISKY adapter: expose the bundled engine for explicit rendering and disposal.
export { Tt as HanaEngine, Ps as HanaDocument, V0 as initHana, A0 as wasmForDocument };
// Validate generated layouts using the original document schema.
export { Ka as HanaData };

// Await the engine's image decode work before a one-shot material capture.
export async function waitForHanaImages(){ await Promise.all([...diskyImageLoads]); }

// Live canvas bridge: original material shaders remain unchanged.
function diskyBindGL(gl,target,level,format,type,source,x=0,y=0){
 const live=diskyCanvasBitmaps.get(source);
 if(live)live.binding={gl,target,level,format,type,x,y,texture:gl.getParameter(gl.TEXTURE_BINDING_2D)};
}
export function registerHanaCanvas(url,canvas){
 const live={canvas,binding:null};diskyCanvasSources.set(url,live);
 return {update(){const b=live.binding;if(!b)return false;if(b.gl){
 const {gl,target,level,format,type,x,y,texture}=b;if(gl.isContextLost())return false;
 const prev=gl.getParameter(gl.TEXTURE_BINDING_2D),flip=gl.getParameter(gl.UNPACK_FLIP_Y_WEBGL),premul=gl.getParameter(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL);
 try{gl.bindTexture(target,texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);gl.texSubImage2D(target,level,x,y,format,type,canvas)}
 finally{gl.bindTexture(target,prev);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,flip);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,premul)}
 return true;
 }b.queue.copyExternalImageToTexture({...b.source,source:canvas},b.target,b.size);return true;},dispose(){diskyCanvasSources.delete(url);live.binding=null;}};
}
