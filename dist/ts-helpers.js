var b = Object.defineProperty;
var w = (h, t, e) => t in h ? b(h, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : h[t] = e;
var g = (h, t, e) => w(h, typeof t != "symbol" ? t + "" : t, e);
class y {
  static length(t) {
    return Object.keys(t).length;
  }
  static has(t, e) {
    return e.every((r) => Object.prototype.hasOwnProperty.call(t, r));
  }
  static first(t, e = 1) {
    const r = Object.entries(t);
    return e === 1 ? r[0] : r.slice(0, e);
  }
  static last(t, e = 1) {
    const r = Object.entries(t);
    return e === 1 ? r[r.length - 1] : r.slice(-e);
  }
  static addProperty(t, e, r) {
    return {
      ...t,
      [e]: r
    };
  }
  static removeProperty(t, e) {
    const { [e]: r, ...n } = t;
    return n;
  }
  static getRandomProperty(t) {
    const e = Object.entries(t), r = l.getRandomNumber(0, e.length - 1);
    return e[r];
  }
  static deepClone(t) {
    return JSON.parse(JSON.stringify(t));
  }
}
class l {
  // ** General utility functions **
  /**
   * Block scope for a given amount of time in ms and run next set piece of
   * code only after given time has passed
   *
   * @NOTE: Must be called with await!
   */
  static delay(t) {
    return new Promise((e) => setTimeout(e, t));
  }
  /**
   * Debounce a function call to prevent it from being called too frequently.
   * The function will only be called after the specified delay has passed
   * since the last call.
   */
  static debounce(t, e) {
    let r = null;
    return function(...n) {
      r !== null && clearTimeout(r), r = setTimeout(() => {
        t(...n);
      }, e);
    };
  }
  static isEmpty(t) {
    return t ? typeof t == "string" ? t.trim() === "" : Array.isArray(t) ? t.length === 0 : t instanceof Map || t instanceof Set ? t.size === 0 : t instanceof Object ? y.length(t) === 0 : t instanceof FormData ? ![...t.keys()].length || [...t.keys()].length === 0 : !1 : !0;
  }
  static iterate(t, e) {
    if (t instanceof Map || Array.isArray(t))
      return t.forEach((r, n) => e(r, n));
    if (t instanceof FormData) {
      for (const r of t.entries())
        e(r[1], r[0]);
      return;
    }
    if (typeof t == "object")
      return Object.keys(t).forEach((r) => {
        e(t[r], r);
      });
    if (typeof t == "string") {
      for (const r of t)
        e(r);
      return;
    }
    throw new Error(`The element type ${typeof t} is not iterable!`);
  }
  static getFormDataFromJson(t, e = "") {
    const r = new FormData();
    return this.iterate(Object.entries(t), ([n, s]) => {
      const i = e ? `${e}.${n}` : n;
      s && (typeof s == "object" ? this.getFormDataFromJson(
        s,
        i
      ).forEach((c, o) => r.append(o, c)) : r.append(i, s.toString()));
    }), r;
  }
  // ##### Number utility functions
  static getRandomNumber(t, e) {
    return Math.floor(Math.random() * (e - t + 1) + t);
  }
  static numberIsEven(t) {
    return t % 2 === 0;
  }
  static numberIsOdd(t) {
    return t % 2 !== 0;
  }
  static calculatePxFromRem(t) {
    return t ? (typeof t == "number" ? t : parseFloat(t)) * parseFloat(getComputedStyle(document.documentElement).fontSize) : 0;
  }
  static clamp(t, e, r) {
    return Math.max(e, Math.min(r, t));
  }
  static createClamper(t, e) {
    return (r) => this.clamp(r, t, e);
  }
  // ##### Validation utility functions
  static isValidEmail(t) {
    return /^[a-zA-Z0-9._-]+(\+[a-zA-Z0-9._-]+)?@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(t);
  }
  // ##### Text utility functions
  static getNextSmallerHeadingType(t) {
    const e = parseInt(t.replace("h", ""), 10);
    return isNaN(e) || e < 1 || e > 6 ? (console.warn(`Invalid Heading-Type "${t}". Falling back to h1.`), "h1") : `h${e >= 6 ? 6 : e + 1}`;
  }
  static generateRandomText(t, e) {
    const r = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", n = "abcdefghijklmnopqrstuvwxyz", s = "0123456789", i = r + n + s, a = [];
    if (e) {
      if (e.minUppercase)
        for (let o = 0; o < e.minUppercase; o++)
          a.push(r.charAt(this.getRandomNumber(0, r.length - 1)));
      if (e.minLowercase)
        for (let o = 0; o < e.minLowercase; o++)
          a.push(n.charAt(this.getRandomNumber(0, n.length - 1)));
      if (e.minNumbers)
        for (let o = 0; o < e.minNumbers; o++)
          a.push(
            s.charAt(this.getRandomNumber(0, s.length - 1))
          );
    }
    a.length > t && (console.warn("generateRandomText: Requirements exceed total length. Increasing length."), t = a.length);
    const c = t - a.length;
    for (let o = 0; o < c; o++)
      a.push(i.charAt(this.getRandomNumber(0, i.length - 1)));
    for (let o = a.length - 1; o > 0; o--) {
      const d = Math.floor(Math.random() * (o + 1));
      [a[o], a[d]] = [a[d], a[o]];
    }
    return a.join("");
  }
}
class k {
  static first(t, e = 1) {
    return e === 1 ? t[0] : t.slice(0, e);
  }
  static last(t, e = 1) {
    return e === 1 ? t[t.length - 1] : t.slice(-e);
  }
  static flatten(t) {
    return t.reduce((e, r) => [
      ...e,
      ...Array.isArray(r) ? this.flatten(r) : [r]
    ], []);
  }
  static sortByProperty(t, e) {
    return t.sort((r, n) => r[e] > n[e] ? 1 : -1);
  }
  static getObjectByValue(t, e, r) {
    return t.find((n) => n[e] === r);
  }
  static hasObjectWithValue(t, e, r) {
    return t.some((n) => n[e] === r);
  }
  static removeItem(t, e) {
    return t.filter((r) => r !== e);
  }
  static getRandomItem(t) {
    return t[l.getRandomNumber(0, t.length - 1)];
  }
  static wrapInArray(t) {
    return t == null ? [] : Array.isArray(t) ? t : [t];
  }
  static toStringSentence(t) {
    return t.length ? t.join(", ").replace(/, ([^,]*)$/, " and $1.") : "";
  }
  static toCommaSeparatedString(t) {
    return t.length ? t.join(", ") : "";
  }
  static getArrayFromNewlines(t) {
    return l.isEmpty(t) ? [] : t.split(/\n|\s\n/);
  }
  static getArrayFromCommas(t) {
    return l.isEmpty(t) ? [] : t.split(",").map((e) => e.trim());
  }
}
class v {
  // **general color functions**
  static getRandomColor() {
    const t = "0123456789ABCDEF";
    return `#${Array.from({ length: 6 }, () => t[Math.floor(Math.random() * 16)]).join("")}`;
  }
  // Returns the computed style color of a given CSS variable
  static getComputedStyleColor(t) {
    return getComputedStyle(document.documentElement).getPropertyValue(t).trim();
  }
  // Detects the color format of a given color string
  static detectColorFormat(t) {
    return t.startsWith("#") ? "hex" : t.startsWith("rgb") ? t.includes("a") ? "rgba" : "rgb" : t.startsWith("hsl") ? t.includes("a") ? "hsla" : "hsl" : "unknown";
  }
  // Calculates a RGB color channel based on the HSL(A) values.
  static calculateRgbChannel(t, e, r) {
    return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + (e - t) * (6 * r) : r < 1 / 2 ? e : r < 2 / 3 ? t + (e - t) * (2 / 3 - r) * 6 : t;
  }
  // Get the text color to use with a given background color.
  static getTextColorFromBackgroundColor(t) {
    if (!t)
      return "#000";
    const e = this.detectColorFormat(t);
    let r = null;
    switch (e) {
      case "hex":
        r = this.hexToRgb(t);
        break;
      case "rgb":
      case "rgba":
        r = this.parseRgbStringToObject(
          t
        );
        break;
      case "hsl":
      case "hsla":
        r = this.hslToRgb(
          t
        );
        break;
      default:
        return console.warn(`Unsupported color format: ${t}`), "#000";
    }
    return r ? (r.red * 299 + r.green * 587 + r.blue * 114) / 1e3 > 128 ? "#000" : "#fff" : (console.warn(`Could not convert color to RGB: ${t}`), "#000");
  }
  // **Format to RGB/A functions**
  // Convert a hex code into a RGB/A object or string
  static hexToRgb(t, e = "object") {
    let r = t.replace(/^#/, "");
    r.length === 3 && (r = r.split("").map((o) => o + o).join(""));
    const n = r.match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i);
    if (!n || !n[1] || !n[2] || !n[3])
      return console.warn(`Invalid Hex format: ${r}`), null;
    const s = parseInt(n[1], 16), i = parseInt(n[2], 16), a = parseInt(n[3], 16), c = n[4] ? parseInt(n[4], 16) / 255 : void 0;
    return c ? e === "object" ? { red: s, green: i, blue: a, alpha: c } : `rgba(${s}, ${i}, ${a}, ${Number(c.toFixed(2))})` : e === "object" ? { red: s, green: i, blue: a } : `rgb(${s}, ${i}, ${a})`;
  }
  // Parses an RGB(A) string and returns an RGB/A object
  static parseRgbStringToObject(t) {
    const e = /^rgba?\(\s*(\d+(\.\d+)?)\s*,\s*(\d+(\.\d+)?)\s*,\s*(\d+(\.\d+)?)(?:\s*,\s*(0|0?\.\d+|1))?\s*\)$/, r = t.match(e);
    if (!r || !r[1] || !r[3] || !r[5])
      return console.warn(`Invalid RGB(A) format: ${t}`), null;
    const n = parseInt(r[1], 10), s = parseInt(r[3], 10), i = parseInt(r[5], 10), a = r[7] ? parseFloat(r[7]) : void 0;
    return { red: n, green: s, blue: i, alpha: a };
  }
  // Converts an HSL(A) string to an RGB(A) object
  static hslToRgb(t, e = "object") {
    const r = /^hsla?\(\s*(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)%\s*,\s*(-?\d+(\.\d+)?)%(?:\s*,\s*(0|0?\.\d+|1))?\s*\)$/, n = t.match(r);
    if (!n || !n[1] || !n[3] || !n[5])
      return console.warn(`Invalid HSL(A) format: ${t}`), null;
    const s = parseInt(n[1], 10) / 360, i = parseInt(n[3], 10) / 100, a = parseInt(n[5], 10) / 100, c = n[7] ? parseFloat(n[7]) : void 0;
    if (i === 0) {
      const f = Math.round(a * 255);
      return { red: f, green: f, blue: f, alpha: c };
    }
    const o = a < 0.5 ? a * (1 + i) : a + i - a * i, d = 2 * a - o, u = Math.round(this.calculateRgbChannel(
      d,
      o,
      s + 1 / 3
    ) * 255), m = Math.round(this.calculateRgbChannel(
      d,
      o,
      s
    ) * 255), p = Math.round(this.calculateRgbChannel(
      d,
      o,
      s - 1 / 3
    ) * 255);
    return c ? e === "object" ? { red: u, green: m, blue: p, alpha: c } : `rgba(${u}, ${m}, ${p}, ${Number(c.toFixed(2))})` : e === "object" ? { red: u, green: m, blue: p } : `rgb(${u}, ${m}, ${p})`;
  }
  // **Format to hex code functions**
  // Converts an RGB object to a hex code string
  static rgbToHex(t) {
    const e = l.createClamper(0, 255), r = e(t.red).toString(16).padStart(2, "0"), n = e(t.green).toString(16).padStart(2, "0"), s = e(t.blue).toString(16).padStart(2, "0");
    return `#${r}${n}${s}`;
  }
  // Converts an HSL String to a hex code string
  static hslToHex(t) {
    const e = this.hslToRgb(t);
    return e ? this.rgbToHex(e) : null;
  }
  // **Format to hsl object functions**
  // Converts an RGB object to an HSL object or string
  static rgbToHsl(t, e = "object") {
    const r = this.parseRgbStringToObject(t);
    if (!r)
      return null;
    const n = l.createClamper(0, 255), s = n(r.red) / 255, i = n(r.green) / 255, a = n(r.blue) / 255, c = Math.max(s, i, a), o = Math.min(s, i, a), d = c - o;
    let u = 0;
    d !== 0 && (c === s ? u = ((i - a) / d + (i < a ? 6 : 0)) * 60 : c === i ? u = ((a - s) / d + 2) * 60 : c === a && (u = ((s - i) / d + 4) * 60));
    let m = (c + o) / 2, p = d === 0 ? 0 : d / (1 - Math.abs(2 * m - 1));
    if (u = Math.round(u), p = Math.round(p * 100), m = Math.round(m * 100), r.alpha) {
      const f = Math.max(0, Math.min(1, r.alpha));
      return e === "object" ? { hue: u, saturation: p, lightness: m, alpha: f } : `hsla(${u}, ${p}, ${m}, ${f})`;
    }
    return { hue: u, saturation: p, lightness: m };
  }
  // Converts an Hex Code to an HSL object or string
  static hexToHsl(t, e = "object") {
    const r = this.hexToRgb(
      t,
      "string"
    );
    return r ? this.rgbToHsl(r, e) : null;
  }
}
class A {
  static isTouch() {
    return (navigator.maxTouchPoints || 0) > 0 || this.hasAnyCoarsePointer();
  }
  static isHoverCapable() {
    return this.hasAnyFinePointer() || this.canAnyInputHover();
  }
  static hasAnyFinePointer() {
    return window.matchMedia("(any-pointer: fine)").matches;
  }
  static hasAnyCoarsePointer() {
    return window.matchMedia("(any-pointer: coarse)").matches;
  }
  static canAnyInputHover() {
    return window.matchMedia("(any-hover: hover)").matches;
  }
  static isPortrait() {
    return window.matchMedia("(orientation: portrait)").matches;
  }
  static isLandscape() {
    return window.matchMedia("(orientation: landscape)").matches;
  }
  static getScreenWidth() {
    return window.screen.width;
  }
  static getScreenHeight() {
    return window.screen.height;
  }
}
class x {
  static isNode(t) {
    return t instanceof Node;
  }
  // Query first element of given selector
  static get(t, e, r = !0) {
    if (r && !this.isNode(t))
      throw new Error("The parent element is not a valid HTML Node!");
    const n = t.querySelector(e);
    if (r && !n)
      throw new Error(`The required element "${e}" does not exist in parent node!`);
    return n;
  }
  // Get multiple elements from the DOM by their selectors
  static getSingleElements(t, e, r = !0) {
    const n = {};
    return l.iterate(e, (s, i) => {
      n[i] = this.get(t, s, r);
    }), n;
  }
  static getAll(t, e, r = !0) {
    if (r && !this.isNode(t))
      throw new Error("The parent element is not a valid HTML Node!");
    const s = [...t.querySelectorAll(e)];
    if (r && s.length === 0)
      throw new Error(`At least one item of "${e}" must exist in parent node!`);
    return s;
  }
  static addClass(t, e) {
    Array.isArray(e) ? t.classList.add(...e) : t.classList.add(e);
  }
  static removeClass(t, e) {
    Array.isArray(e) ? t.classList.remove(...e) : t.classList.remove(e);
  }
  static hasClass(t, e) {
    return t.classList.contains(e);
  }
  static toggleClass(t, e) {
    Array.isArray(e) ? l.iterate(e, (r) => t.classList.toggle(r)) : t.classList.toggle(e);
  }
  // eslint-disable-next-line max-len
  static listenTo(t, e, r) {
    t.addEventListener(
      e,
      r
    );
  }
  static setStyle(t, e, r) {
    r && t.style.setProperty(e, r.toString());
  }
  static removeStyle(t, e) {
    t.style.setProperty(e, "");
  }
  static createElement(t, e = {}, r = null) {
    if (l.isEmpty(t))
      throw new Error("Element type for new element must not be empty");
    const n = document.createElement(t);
    return l.iterate(Object.entries(e), ([s, i]) => {
      switch (s) {
        case "id":
          if (l.isEmpty(i))
            break;
          n.id = i;
          break;
        case "classes":
          if (l.isEmpty(i))
            break;
          this.addClass(n, i);
          break;
        case "text":
          if (l.isEmpty(i))
            break;
          n.textContent = i;
          break;
        case "html":
          if (l.isEmpty(i))
            break;
          n.innerHTML = i;
          break;
        case "dataset":
          if (l.isEmpty(i))
            break;
          Object.entries(i).forEach(([a, c]) => {
            typeof c == "string" && (n.dataset[a] = c);
          });
          break;
        default:
          if (!s)
            break;
          n.setAttribute(s, i);
          break;
      }
    }), r && r.appendChild(n), n;
  }
  static hideElement(t, e = "") {
    if (e === "")
      return this.setStyle(t, "display", "none");
    t.classList.add(e);
  }
  static showElement(t, e = "", r = "block") {
    if (l.isEmpty(e))
      return this.setStyle(t, "display", r);
    t.classList.add(e);
  }
  // Find parent of an element by a given selector (either id or class)
  static findParent(t, e, r = 5, n = 0) {
    if (r <= ++n)
      return null;
    const { parentElement: s } = t;
    let i = !1;
    if (e.charAt(0) === ".") {
      const a = e.substring(1);
      i = (s == null ? void 0 : s.classList.contains(a)) || !1;
    } else if (e.charAt(0) === "#") {
      const a = e.substring(1);
      i = (s == null ? void 0 : s.id) === a;
    } else
      throw new Error("The given selector is not valid, please check if it is an id or class selector");
    return i || !s ? s : this.findParent(
      s,
      e,
      r,
      n
    );
  }
  // Get a parent by going up in the DOM by a given number of iterations
  static getParent(t, e = 5, r = 0) {
    ++r;
    const { parentElement: n } = t;
    return r >= e || !n ? n : this.getParent(n, e, r);
  }
  static isInViewport(t) {
    const e = this.getRect(t);
    return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth);
  }
  static scrollToElement(t, e, r) {
    const n = t.getBoundingClientRect(), s = (n.y || n.top) + (document.scrollingElement || document.documentElement).scrollTop - e;
    window.scrollTo({
      top: s,
      behavior: "smooth"
    }), r && r instanceof Function && r();
  }
  static extractTextFromNodes(t) {
    let e = "";
    for (const r of t)
      typeof r.children == "string" ? e += r.children : Array.isArray(r.children) && (e += this.extractTextFromNodes(r.children));
    return e;
  }
  static getRect(t) {
    return t.getBoundingClientRect();
  }
  static getRects(...t) {
    return t.map((e) => this.getRect(e));
  }
  static rectsOverlap(t, e, r = 0, n = 0) {
    return !(t.right <= e.left || t.left >= e.right || t.bottom <= e.top + n || t.top + r >= e.bottom - n);
  }
  static isOverlapping(t, e) {
    const r = this.getRect(t), n = this.getRect(e);
    return this.rectsOverlap(r, n);
  }
  static isPointerInside(t) {
    return typeof window > "u" || typeof document > "u" ? !1 : t.matches(":hover");
  }
}
class M {
  constructor(t = document) {
    g(this, "_element");
    g(this, "_listeners");
    this._element = t, t.$emitter = this, this._listeners = [];
  }
  get element() {
    return this._element;
  }
  set element(t) {
    this._element = t;
  }
  get listeners() {
    return this._listeners;
  }
  set listeners(t) {
    this._listeners = t;
  }
  publish(t, e = {}, r = !1) {
    const n = new CustomEvent(t, {
      detail: e,
      cancelable: r
    });
    return this.element.dispatchEvent(n), n;
  }
  subscribe(t, e, r = {}) {
    const n = this, s = t.split(".");
    if (!s[0])
      return;
    const i = r.scope ? e.bind(r.scope) : e, a = r.once ? (c) => {
      n.unsubscribe(t), i(c);
    } : i;
    this.element.addEventListener(
      s[0],
      a
    ), this.listeners.push({
      splitEventName: s,
      options: r,
      callback: a
    });
  }
  unsubscribe(t) {
    const e = t.split(".");
    this.listeners = this.listeners.reduce((r, n) => [...n.splitEventName].sort().toString() === e.sort().toString() ? (n.splitEventName[0] && this.element.removeEventListener(
      n.splitEventName[0],
      n.callback
    ), r) : (r.push(n), r), []);
  }
  reset() {
    this.listeners.forEach((t) => {
      t.splitEventName[0] && this.element.removeEventListener(
        t.splitEventName[0],
        t.callback
      );
    });
  }
}
class T {
  static formatDate(t, e = {}) {
    if (!t || t === "")
      throw new Error("Date value must not be null or empty");
    const r = new Date(t);
    if (isNaN(r.getTime()))
      throw new Error("Invalid date");
    const n = (navigator == null ? void 0 : navigator.language) || "de-DE";
    return e = { ...{
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }, ...e }, new Intl.DateTimeFormat(n, e).format(r);
  }
  static formatBytes(t) {
    const e = ["bytes", "kb", "mb", "gb", "tb"];
    if (t === 0)
      return "0 Bytes";
    const r = Math.floor(Math.log(t) / Math.log(1024));
    return `${parseFloat((t / Math.pow(1024, r)).toFixed(2))} ${e[r]}`;
  }
  static decodeString(t) {
    if (t.length === 0)
      return t;
    const e = x.createElement("textarea", {
      html: t
    }), r = e.value;
    return e.remove(), r;
  }
  static truncateString(t, e, r = !0) {
    if (t.length <= e)
      return t;
    let n = t.slice(0, e - 1);
    return r && (n = n.slice(0, n.lastIndexOf(" "))), n += "…", n;
  }
  static camelToDashCase(t) {
    return t.replace(/([A-Z])/g, "-$1").replace(/^-/, "").toLowerCase();
  }
  static spaceToDashCase(t) {
    return t.replace(" ", "-").toLowerCase();
  }
  /**
   * Convert a given string to a string with a unit.
   *
   * If the given string is empty or not a number, it will return null.
   * If the given string is a number, it will return a string with the given
   * unit (default is 'px').
   */
  static convertToUnit(t, e = "px") {
    return t === null || t === "" ? null : isNaN(+t) ? String(t) : isFinite(+t) ? `${Number(t)}${e}` : null;
  }
  static removeWhitespace(t) {
    const e = t.replace(/^\n/, "").split(`
`), r = Math.min(
      ...e.filter(Boolean).map((n) => n.match(/^\s*/)[0].length)
    );
    return e.map((n) => n.slice(r)).join(`
`);
  }
}
class E {
  static getMediaQuery(t, e = "min") {
    const r = this.breakpoints[t];
    return window.matchMedia(`(${e}-width: ${r}px)`);
  }
  static getMediaQueryBetween(t, e) {
    const r = this.breakpoints[t], n = this.breakpoints[e];
    return window.matchMedia(`(min-width: ${r}px) and (max-width: ${n}px)`);
  }
  static watchMediaQuery(t, e) {
    t.addEventListener("change", (r) => e(r));
  }
  static getCurrentViewport() {
    return this.isUHD() ? this.breakpoints.uhd : this.isQHD() ? this.breakpoints.qhd : this.isFHD() ? this.breakpoints.fhd : this.is3XL() ? this.breakpoints["3xl"] : this.isXXL() ? this.breakpoints.xxl : this.isXL() ? this.breakpoints.xl : this.isLG() ? this.breakpoints.lg : this.isMD() ? this.breakpoints.md : this.isSM() ? this.breakpoints.sm : 0;
  }
  static isXS() {
    return window.innerWidth < this.breakpoints.sm;
  }
  static isSM() {
    const t = window.innerWidth;
    return t >= this.breakpoints.sm && t < this.breakpoints.md;
  }
  static isMD() {
    const t = window.innerWidth;
    return t >= this.breakpoints.md && t < this.breakpoints.lg;
  }
  static isLG() {
    const t = window.innerWidth;
    return t >= this.breakpoints.lg && t < this.breakpoints.xl;
  }
  static isXL() {
    const t = window.innerWidth;
    return t >= this.breakpoints.xl && t < this.breakpoints.xxl;
  }
  static isXXL() {
    const t = window.innerWidth;
    return t >= this.breakpoints.xxl && t < this.breakpoints["3xl"];
  }
  static is3XL() {
    const t = window.innerWidth;
    return t >= this.breakpoints["3xl"] && t < this.breakpoints.fhd;
  }
  static isFHD() {
    const t = window.innerWidth;
    return t >= this.breakpoints.fhd && t < this.breakpoints.qhd;
  }
  static isQHD() {
    const t = window.innerWidth;
    return t >= this.breakpoints.qhd && t < this.breakpoints.uhd;
  }
  static isUHD() {
    return window.innerWidth >= this.breakpoints.uhd;
  }
}
// Predefined viewport widths -> based on Bootstrap 5 breakpoints + custom ones
g(E, "breakpoints", {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
  "3xl": 1600,
  fhd: 1920,
  qhd: 2560,
  uhd: 3840
});
export {
  k as ArrayAccess,
  v as Color,
  A as DeviceAccess,
  x as Dom,
  T as Formatting,
  M as NativeEventEmitter,
  y as ObjectAccess,
  l as Utilities,
  E as ViewportAccess
};
