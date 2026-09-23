(() => {
  const list = document.getElementById("radarList");
  const search = document.getElementById("radarSearch");
  const category = document.getElementById("radarCategory");
  const timing = document.getElementById("radarTiming");
  const meta = document.getElementById("radarMeta");
  const stats = document.getElementById("radarStats");

  let opportunities = [];
  const today = "2026-09-23";

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const formatDate = (value) => {
    if (!value) return null;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    return m ? `${m[1]}-${m[2]}-${m[3]}` : value;
  };

  const deadlineState = (deadline) => {
    if (!deadline) return {cls: "", label: "No deadline", detail: "date not extracted"};
    if (deadline < today) return {cls: "overdue", label: formatDate(deadline), detail: "deadline passed"};
    return {cls: "open", label: formatDate(deadline), detail: "deadline"};
  };

  const render = () => {
    const q = search.value.trim().toLowerCase();
    const cat = category.value;
    const time = timing.value;

    const filtered = opportunities.filter((o) => {
      const haystack = [
        o.title, o.source_name, o.department,
        ...(Array.isArray(o.categories) ? o.categories : [])
      ].join(" ").toLowerCase();

      if (q && !haystack.includes(q)) return false;
      if (cat !== "all" && !(o.categories || []).includes(cat)) return false;
      if (time === "dated" && !o.deadline) return false;
      if (time === "open" && (!o.deadline || o.deadline < today)) return false;
      return true;
    });

    stats.textContent = `${filtered.length} visible · ${opportunities.length} in this public snapshot`;

    if (!filtered.length) {
      list.innerHTML = '<div class="empty-state">No opportunities match these filters.</div>';
      return;
    }

    list.innerHTML = filtered.map((o) => {
      const d = deadlineState(o.deadline);
      const cats = (o.categories || []).slice(0, 3).join(" / ") || "general";
      return `
        <article class="radar-item">
          <div>
            <h3><a href="${escapeHtml(o.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(o.title)}</a></h3>
            <div class="radar-item-meta">
              <span>${escapeHtml(o.department || o.source_name || "Official source")}</span>
              <span>${escapeHtml(cats)}</span>
              <span>published ${escapeHtml(formatDate(o.published_at) || "unknown")}</span>
            </div>
          </div>
          <div class="deadline ${d.cls}">
            <strong>${escapeHtml(d.label)}</strong>
            <span>${escapeHtml(d.detail)}</span>
          </div>
        </article>
      `;
    }).join("");
  };

  fetch("./data/opportunities.json", {cache: "no-store"})
    .then((r) => {
      if (!r.ok) throw new Error("Radar snapshot unavailable");
      return r.json();
    })
    .then((data) => {
      opportunities = Array.isArray(data.opportunities) ? data.opportunities : [];
      const cats = [...new Set(opportunities.flatMap((o) => o.categories || []))].sort();
      cats.forEach((c) => {
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c.replaceAll("_", " ");
        category.appendChild(option);
      });

      const sourceStamp = data.source_updated_at ? data.source_updated_at.slice(0, 10) : "unknown";
      meta.textContent = `Public snapshot · source feed ${sourceStamp}`;
      render();
    })
    .catch((err) => {
      console.error(err);
      meta.textContent = "Public snapshot unavailable";
      stats.textContent = "";
      list.innerHTML = '<div class="empty-state">Radar data could not be loaded. The rest of the site remains available.</div>';
    });

  [search, category, timing].forEach((el) => el.addEventListener("input", render));
})();
