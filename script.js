// Initialize Lucide Icons
lucide.createIcons();

// Theme Engine
function updateThemeButtons(theme) {
  const lightBtn = document.getElementById("theme-light-btn");
  const darkBtn = document.getElementById("theme-dark-btn");
  const sysBtn = document.getElementById("theme-system-btn");

  [lightBtn, darkBtn, sysBtn].forEach(b => {
    b.classList.remove("bg-white", "dark:bg-slate-800", "text-cyan-600", "dark:text-cyan-400", "shadow-sm", "font-semibold");
  });

  if (theme === "light") {
    lightBtn.classList.add("bg-white", "text-cyan-600", "shadow-sm", "font-semibold");
  } else if (theme === "dark") {
    darkBtn.classList.add("dark:bg-slate-800", "dark:text-cyan-400", "shadow-sm", "font-semibold");
  } else {
    sysBtn.classList.add("bg-white", "dark:bg-slate-800", "text-cyan-600", "dark:text-cyan-400", "shadow-sm", "font-semibold");
  }
}

function setTheme(theme) {
  if (theme === "light") {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  } else if (theme === "dark") {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    localStorage.removeItem("theme");
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  updateThemeButtons(theme);
}

// Tree Toggles
function toggleTree(id) {
  const el = document.getElementById(id);
  const icon = document.getElementById("icon-" + id);
  if (el.classList.contains("hidden")) {
    el.classList.remove("hidden");
    if (icon) icon.style.transform = "rotate(0deg)";
  } else {
    el.classList.add("hidden");
    if (icon) icon.style.transform = "rotate(-90deg)";
  }
}

// Render Project Cards Dynamically
function renderProjects(filter = "all", searchQuery = "") {
  const container = document.getElementById("projects-grid");
  container.innerHTML = "";

  const filtered = projectsData.filter(p => {
    const matchesPillar = filter === "all" || p.category.includes(filter);
    const matchesSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPillar && matchesSearch;
  });

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 flex flex-col justify-between hover:border-cyan-500/50 transition-all hover:shadow-xl group shadow-sm";
    
    card.innerHTML = `
      <div class="space-y-2.5">
        <div class="flex items-center justify-between">
          <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-${p.badgeColor}-100 dark:bg-${p.badgeColor}-950/80 text-${p.badgeColor}-800 dark:text-${p.badgeColor}-300 border border-${p.badgeColor}-200 dark:border-${p.badgeColor}-800/50 font-mono font-medium">${p.badge}</span>
          <span class="text-xs text-slate-400">${p.year}</span>
        </div>
        <h3 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition">${p.title}</h3>
        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">${p.desc}</p>
        <div class="flex flex-wrap gap-1.5 pt-1">
          ${p.tags.map(t => `<span class="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">${t}</span>`).join("")}
        </div>
      </div>
      <div class="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-3">
        <a href="${p.linkUrl}" target="_blank" class="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1">
          ${p.linkText} <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
        </a>
        <span class="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">${p.metric}</span>
      </div>
    `;
    container.appendChild(card);
  });
  lucide.createIcons();
}

function filterPillar(pillar) {
  document.querySelectorAll(".pillar-btn").forEach(btn => {
    btn.classList.remove("bg-cyan-600", "text-white", "shadow-lg");
    btn.classList.add("bg-white", "dark:bg-slate-900", "text-slate-700", "dark:text-slate-300");
  });
  event.target.classList.add("bg-cyan-600", "text-white", "shadow-lg");
  event.target.classList.remove("bg-white", "dark:bg-slate-900", "text-slate-700", "dark:text-slate-300");

  const badge = document.getElementById("filter-name");
  badge.innerText = pillar === "all" ? "Showing All Showcases" : "Showing: " + pillar.toUpperCase() + " Pillar";
  renderProjects(pillar);
}

function filterCategory(cat) {
  const badge = document.getElementById("filter-name");
  badge.innerText = "Filter: " + cat;
  renderProjects("all", cat);
  document.getElementById("projects-grid").scrollIntoView({ behavior: "smooth" });
}

// Initial Load
updateThemeButtons(localStorage.theme || "system");
renderProjects("all");
