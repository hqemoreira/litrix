(async function () {
  var inventory = MoreaStore.getJSON("inventory");
  var intake = MoreaStore.getJSON("intake");
  var module = MoreaStore.getJSON("module") || {};
  var quiz = MoreaStore.getJSON("quiz");
  var policy = MoreaStore.getJSON("policy");

  if (!intake) {
    window.location.href = "/inventory.html";
    return;
  }
  if (!quiz || !quiz.passed) {
    window.location.href = "/quiz.html";
    return;
  }

  var track =
    quiz.track ||
    MoreaStore.trackFromRole(intake.answers && intake.answers.role);

  var packCore = {
    product: "Morea Evidence Pack",
    version: "0.3",
    illustrative: true,
    disclaimer:
      "Educational / illustrative research prototype. Not legal advice. Not a conformity assessment. Not a compliance service. Personal reskilling · Non-commercial · Not a product for sale. SHA-256 content hash proves file integrity in-browser — not third-party auditor attestation.",
    inventory: inventory || { tools: [], none: true },
    classification: {
      company_size: intake.answers.size,
      sector: intake.answers.sector,
      ai_usage: intake.answers.usage,
      role_answer: intake.answers.role,
      track: track,
      tier: intake.tier,
      tierLabel: intake.tierLabel,
      score: intake.score,
      optionLabels: intake.optionLabels || null
    },
    literacy: {
      moduleTitle: module.title || null,
      moduleSource: module.source || null,
      track: track
    },
    quiz: {
      score: quiz.score,
      total: quiz.total,
      track: track,
      completed_at: quiz.completedAt
    },
    policy: policy || { skipped: true },
    completed_at: new Date().toISOString()
  };

  var canonical = JSON.stringify(packCore);
  var digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(canonical)
  );
  var hex = Array.from(new Uint8Array(digest))
    .map(function (b) {
      return b.toString(16).padStart(2, "0");
    })
    .join("");
  var code =
    "MOREA-" +
    hex
      .slice(0, 20)
      .toUpperCase()
      .match(/.{1,4}/g)
      .join("-");

  var pack = Object.assign({}, packCore, {
    verification_code: code,
    content_hash: hex
  });

  MoreaStore.setJSON("evidence_pack", pack);

  var contentEl = document.getElementById("register-content");
  var completedDate = new Date(pack.completed_at).toLocaleString();
  var trackLabel = track === "partner_ops" ? "Partner / ops" : "Staff user";
  var toolsList = "None listed";
  if (!pack.inventory.none && pack.inventory.tools && pack.inventory.tools.length) {
    toolsList = pack.inventory.tools
      .map(function (t) {
        return t.customName || t.label;
      })
      .join(", ");
  }
  var policySkipped = !!(pack.policy && pack.policy.skipped);
  var policyBody = policySkipped
    ? "Skipped (optional)"
    : pack.policy && pack.policy.body
      ? pack.policy.body
      : pack.policy && pack.policy.title
        ? pack.policy.title
        : "Included";

  contentEl.innerHTML =
    '<div class="no-print dossier" style="margin-bottom:20px;">' +
    '<p class="dossier-label">Review before export</p>' +
    "<h2 style=\"font-size:1.25rem;\">Checklist</h2>" +
    '<ul class="pack-checklist">' +
    '<li><span class="ck">Done</span><span>AI-use inventory recorded</span></li>' +
    '<li><span class="ck">Done</span><span>Exposure classification + literacy track</span></li>' +
    '<li><span class="ck">Done</span><span>Knowledge check ' +
    pack.quiz.score +
    "/" +
    pack.quiz.total +
    "</span></li>" +
    '<li><span class="ck' +
    (policySkipped ? " is-opt" : "") +
    '">' +
    (policySkipped ? "Optional" : "Done") +
    "</span><span>Policy draft " +
    (policySkipped ? "skipped" : "included") +
    "</span></li>" +
    '<li><span class="ck">Ready</span><span>SHA-256 hash + MOREA code will bind this export</span></li>' +
    "</ul>" +
    "</div>" +
    '<div class="pack-print dossier">' +
    '<p class="dossier-label">AI Literacy Evidence Pack · Illustrative</p>' +
    "<h1>Organisational literacy record</h1>" +
    '<p class="cta-time">' +
    escapeHtml(completedDate) +
    " · " +
    escapeHtml(trackLabel) +
    "</p>" +
    '<div class="stamp stamp-' +
    pack.classification.tier +
    '" style="margin-bottom:8px;">' +
    escapeHtml(pack.classification.tierLabel) +
    "</div>" +
    '<p class="faint">Illustrative exposure classification — learning signal only, not a legal determination.</p>' +
    '<section class="pack-section">' +
    '<p class="pack-section-num">01 · Completed evidence</p>' +
    "<table>" +
    "<tr><th>AI-use inventory</th><td>" +
    escapeHtml(toolsList) +
    "</td></tr>" +
    "<tr><th>Literacy module</th><td>" +
    escapeHtml(pack.literacy.moduleTitle || "Completed") +
    " (" +
    escapeHtml(trackLabel) +
    ")</td></tr>" +
    "<tr><th>Knowledge check</th><td>" +
    pack.quiz.score +
    " / " +
    pack.quiz.total +
    "</td></tr>" +
    "<tr><th>Sector / size</th><td>" +
    escapeHtml(pack.classification.sector) +
    " · " +
    escapeHtml(pack.classification.company_size) +
    "</td></tr>" +
    "</table>" +
    "</section>" +
    '<section class="pack-section">' +
    '<p class="pack-section-num">02 · Optional <span class="pack-optional-tag">optional</span></p>' +
    "<table>" +
    "<tr><th>Policy draft</th><td>" +
    escapeHtml(
      typeof policyBody === "string" && policyBody.length > 280
        ? policyBody.slice(0, 280) + "…"
        : policyBody
    ) +
    "</td></tr>" +
    "</table>" +
    "</section>" +
    '<section class="pack-section">' +
    '<p class="pack-section-num">03 · Verification</p>' +
    "<table>" +
    '<tr><th>Verification code</th><td class="mono">' +
    code +
    "</td></tr>" +
    '<tr><th>Content hash (SHA-256)</th><td class="mono" style="font-size:0.72rem;word-break:break-all;">' +
    hex +
    "</td></tr>" +
    "</table>" +
    '<p class="faint" style="margin-top:12px;">This hash lets anyone recompute integrity of the JSON in their browser. It is <strong>not</strong> auditor-grade attestation or a third-party certificate.</p>' +
    "</section>" +
    '<p class="faint" style="margin-top:16px;">' +
    escapeHtml(pack.disclaimer) +
    "</p>" +
    "</div>" +
    '<p style="margin-top:20px;" class="no-print cta-row">' +
    '<button class="btn btn-primary" id="export-btn">Download JSON</button>' +
    '<button class="btn btn-secondary" id="print-btn">Print dossier</button>' +
    '<a class="btn btn-secondary" href="/verify.html">Verify</a>' +
    "</p>" +
    '<div id="save-status" class="no-print"></div>';

  document.getElementById("export-btn").addEventListener("click", function () {
    var blob = new Blob([JSON.stringify(pack, null, 2)], {
      type: "application/json"
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "morea-evidence-pack-" + code + ".json";
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById("print-btn").addEventListener("click", function () {
    window.print();
  });

  var statusEl = document.getElementById("save-status");
  try {
    var sessionRes = await fetch("/api/auth/session");
    var sessionData = await sessionRes.json();
    if (sessionData.user) {
      var legacyEntry = {
        company_size: pack.classification.company_size,
        sector: pack.classification.sector,
        ai_usage: pack.classification.ai_usage,
        role_answer: pack.classification.role_answer,
        classification_result: {
          tier: pack.classification.tier,
          tierLabel: pack.classification.tierLabel,
          score: pack.classification.score,
          moduleTitle: pack.literacy.moduleTitle,
          moduleSource: pack.literacy.moduleSource
        },
        quiz_score: pack.quiz.score,
        quiz_total: pack.quiz.total,
        completed_at: pack.completed_at,
        verification_code: pack.verification_code
      };
      var saveRes = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(legacyEntry)
      });
      if (saveRes.ok) {
        statusEl.innerHTML =
          '<div class="notice">Optional demo save succeeded. Your JSON export remains the primary Evidence Pack artifact.</div>';
      } else {
        statusEl.innerHTML =
          '<div class="notice">Demo save unavailable. Your local JSON export is still valid for this learning exercise.</div>';
      }
    } else {
      statusEl.innerHTML =
        '<div class="notice">No account required. Keep the downloaded JSON as your illustrative Evidence Pack.</div>';
    }
  } catch (err) {
    statusEl.innerHTML =
      '<div class="notice">Keep the downloaded JSON as your illustrative Evidence Pack.</div>';
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }
})();
