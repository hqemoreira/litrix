/** Morea persistence — localStorage primary (survives refresh), session + legacy fallbacks. */
window.MoreaStore = {
  prefix: "morea_",
  legacyPrefix: "morea_",

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
      "intake_draft",
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
  }
};
