/** Six-step progress UI for Morea Evidence Pack flow. */
(function () {
  var STEPS = [
    { id: "inventory", label: "Inventory", href: "/inventory.html", optional: false },
    { id: "assess", label: "Exposure", href: "/assess.html", optional: false },
    { id: "module", label: "Literacy", href: "/module.html", optional: false },
    { id: "quiz", label: "Quiz", href: "/quiz.html", optional: false },
    { id: "policy", label: "Policy", href: "/policy.html", optional: true },
    { id: "pack", label: "Evidence", href: "/register.html", optional: false }
  ];

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function currentStepId() {
    var el = document.getElementById("morea-stepper");
    return el && el.getAttribute("data-step");
  }

  function indexOf(id) {
    for (var i = 0; i < STEPS.length; i++) {
      if (STEPS[i].id === id) return i;
    }
    return -1;
  }

  function mount() {
    var host = document.getElementById("morea-stepper");
    if (!host) return;
    var current = currentStepId();
    var curIdx = indexOf(current);
    if (typeof MoreaStore !== "undefined") {
      MoreaStore.set("step", current || "");
    }

    var nav = document.createElement("nav");
    nav.className = "morea-stepper";
    nav.setAttribute("aria-label", "Evidence Pack progress");

    var list = document.createElement("ol");
    list.className = "morea-stepper-list";

    STEPS.forEach(function (step, i) {
      var li = document.createElement("li");
      li.className = "morea-stepper-item";
      if (step.optional) li.className += " is-optional";
      if (i < curIdx) li.className += " is-done";
      if (i === curIdx) li.className += " is-current";

      var inner;
      if (i < curIdx) {
        inner = document.createElement("a");
        inner.href = step.href;
      } else if (i === curIdx) {
        inner = document.createElement("span");
        inner.setAttribute("aria-current", "step");
      } else {
        inner = document.createElement("span");
      }
      inner.className = "morea-stepper-link";
      var opt = step.optional
        ? '<span class="morea-stepper-opt">opt</span>'
        : "";
      inner.innerHTML =
        '<span class="morea-stepper-num">' +
        pad(i + 1) +
        '</span><span class="morea-stepper-label">' +
        step.label +
        opt +
        "</span>";
      li.appendChild(inner);
      list.appendChild(li);
    });

    nav.appendChild(list);

    var actions = document.createElement("div");
    actions.className = "morea-stepper-actions no-print";
    var restart = document.createElement("button");
    restart.type = "button";
    restart.className = "btn-text";
    restart.textContent = "Start over";
    restart.addEventListener("click", function () {
      if (
        typeof MoreaStore !== "undefined" &&
        confirm("Clear saved progress and start from the inventory?")
      ) {
        MoreaStore.clearProgress();
        window.location.href = "/inventory.html";
      }
    });
    actions.appendChild(restart);
    nav.appendChild(actions);

    host.innerHTML = "";
    host.appendChild(nav);
  }

  window.MoreaSteps = STEPS;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
