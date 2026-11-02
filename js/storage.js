/** Morea persistence — localStorage primary (survives refresh), session + legacy fallbacks. */
window.MoreaStore = {
  prefix: "morea_",
  legacyPrefix: "litrix_",

  get: function (key) {
    var k = this.prefix + key;
    var legacy = this.legacyPrefix + key;
    try {
      return (
        localStorage.getItem(k) ||
        sessionStorage.getItem(k) ||
        sessionStorage.getItem(legacy) ||
        localStorage.getItem(legacy)
      );
    } catch (e) {
      return sessionStorage.getItem(k) || sessionStorage.getItem(legacy);
    }
  },

  set: function (key, value) {
    var k = this.prefix + key;
    try {
      localStorage.setItem(k, value);
    } catch (e) {}
    try {
      sessionStorage.setItem(k, value);
    } catch (e2) {}
  },

  getJSON: function (key) {
    var raw = this.get(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  },

  setJSON: function (key, obj) {
    this.set(key, JSON.stringify(obj));
  },

  remove: function (key) {
    var k = this.prefix + key;
    var legacy = this.legacyPrefix + key;
    try {
      localStorage.removeItem(k);
      localStorage.removeItem(legacy);
    } catch (e) {}
    try {
      sessionStorage.removeItem(k);
      sessionStorage.removeItem(legacy);
    } catch (e2) {}
  },

  clearProgress: function () {
    var keys = [
      "inventory",
      "intake",
      "module",
      "quiz",
      "policy",
      "evidence_pack",
      "step"
    ];
    var self = this;
    keys.forEach(function (k) {
      self.remove(k);
    });
  },

  trackFromRole: function (role) {
    if (role === "founder" || role === "compliance" || role === "partner_ops") {
      return "partner_ops";
    }
    return "staff";
  },

  /** Shared mulberry leaf mark for headers (inline SVG). */
  leafMarkSvg:
    '<svg class="logo-mark" viewBox="0 0 32 32" aria-hidden="true" fill="none">' +
    '<path d="M16 3C12.5 6.2 8 9.5 7 14.5c-.8 4 1.2 8.2 5.2 10.4 1.4.8 2.9 1.2 3.8 1.2s2.4-.4 3.8-1.2c4-2.2 6-6.4 5.2-10.4C24 9.5 19.5 6.2 16 3z" fill="currentColor"/>' +
    '<path d="M16 6.5v14.2" stroke="var(--paper)" stroke-width="1.4" stroke-linecap="round" opacity="0.35"/>' +
    '<path d="M12.8 18.2l2.2 2.2 4.4-4.6" stroke="var(--paper)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>"
};
