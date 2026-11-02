/** Shared Back · Save progress · Continue chrome for flow pages. */
(function () {
  function toast(msg) {
    var el = document.getElementById("morea-save-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "morea-save-toast";
      el.className = "morea-save-toast no-print";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("is-visible");
    clearTimeout(el._t);
    el._t = setTimeout(function () {
      el.classList.remove("is-visible");
    }, 2200);
  }

  window.MoreaToast = toast;

  function mount() {
    var host = document.getElementById("morea-flow-nav");
    if (!host) return;

    var backHref = host.getAttribute("data-back") || "";
    var continueHref = host.getAttribute("data-continue") || "";
    var continueLabel = host.getAttribute("data-continue-label") || "Continue";
    var formId = host.getAttribute("data-form") || "";
    var hideContinue = host.getAttribute("data-hide-continue") === "true";

    var bar = document.createElement("div");
    bar.className = "morea-flow-nav no-print";

    if (backHref) {
      var back = document.createElement("a");
      back.href = backHref;
      back.className = "btn btn-secondary";
      back.textContent = "Back";
      bar.appendChild(back);
    } else {
      bar.appendChild(document.createElement("span"));
    }

    var mid = document.createElement("div");
    mid.className = "morea-flow-nav-mid";

    var save = document.createElement("button");
    save.type = "button";
    save.className = "btn-text";
    save.textContent = "Save progress";
    save.addEventListener("click", function () {
      var handled = { ok: false };
      document.dispatchEvent(
        new CustomEvent("morea:save", {
          detail: { formId: formId, handled: handled }
        })
      );
      if (handled.ok) {
        toast("Progress saved in this browser");
      } else if (typeof MoreaStore !== "undefined") {
        toast("Nothing new to save on this step");
      } else {
        toast("Could not save");
      }
    });
    mid.appendChild(save);
    bar.appendChild(mid);

    if (!hideContinue && (continueHref || formId)) {
      if (formId) {
        var cont = document.createElement("button");
        cont.type = "submit";
        cont.setAttribute("form", formId);
        cont.className = "btn btn-primary";
        cont.textContent = continueLabel;
        bar.appendChild(cont);
      } else {
        var link = document.createElement("a");
        link.href = continueHref;
        link.className = "btn btn-primary";
        link.textContent = continueLabel;
        bar.appendChild(link);
      }
    }

    host.innerHTML = "";
    host.appendChild(bar);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
