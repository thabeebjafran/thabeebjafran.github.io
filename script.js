// ==========================================================================
// Thabeeb Jafran | 360° Technical Command Center Engine
// ==========================================================================

let currentPillar = "all";
let currentSearchQuery = "";
let currentModalProject = null;
let currentModalTab = "overview";

// Initialize Lucide Icons
function refreshIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

// --------------------------------------------------------------------------
// 1. Theme Management Engine
// --------------------------------------------------------------------------
function updateThemeButtons(theme) {
  const lightBtn = document.getElementById("theme-light-btn");
  const darkBtn = document.getElementById("theme-dark-btn");
  const sysBtn = document.getElementById("theme-system-btn");

  if (!lightBtn || !darkBtn || !sysBtn) return;

  const current = theme || localStorage.getItem("theme") || "system";

  // Base reset for all 3 buttons
  [lightBtn, darkBtn, sysBtn].forEach(btn => {
    btn.classList.remove("bg-white", "dark:bg-slate-800", "text-cyan-600", "dark:text-cyan-400", "shadow-sm", "font-bold");
    btn.classList.add("text-slate-600", "dark:text-slate-400");
  });

  // Apply active styling
  let activeBtn = sysBtn;
  if (current === "light") {
    activeBtn = lightBtn;
  } else if (current === "dark") {
    activeBtn = darkBtn;
  }

  activeBtn.classList.remove("text-slate-600", "dark:text-slate-400");
  activeBtn.classList.add("bg-white", "dark:bg-slate-800", "text-cyan-600", "dark:text-cyan-400", "shadow-sm", "font-bold");
}

function setTheme(theme) {
  if (theme === "light") {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else if (theme === "dark") {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.removeItem("theme");
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  updateThemeButtons(theme);
}

// Listen to OS system color scheme changes if in system mode
if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      updateThemeButtons("system");
    }
  });
}

// --------------------------------------------------------------------------
// 2. Sidebar Tree Toggles
// --------------------------------------------------------------------------
function toggleTree(id) {
  const el = document.getElementById(id);
  const icon = document.getElementById("icon-" + id);
  if (!el) return;

  if (el.classList.contains("hidden")) {
    el.classList.remove("hidden");
    if (icon) icon.style.transform = "rotate(0deg)";
  } else {
    el.classList.add("hidden");
    if (icon) icon.style.transform = "rotate(-90deg)";
  }
}

// --------------------------------------------------------------------------
// 3. Project Grid Rendering & Filtering (By Division)
// --------------------------------------------------------------------------
function renderProjects(filter = "all", searchQuery = "") {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  container.innerHTML = "";

  const filtered = projectsData.filter(p => {
    const matchesDiv = filter === "all" || p.division === filter || (p.category && p.category.includes(filter));
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || 
      p.title.toLowerCase().includes(query) || 
      p.desc.toLowerCase().includes(query) ||
      p.badge.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query));
    return matchesDiv && matchesSearch;
  });

  // Update count badge
  const countBadge = document.getElementById("project-count-badge");
  if (countBadge) {
    countBadge.innerText = `${filtered.length} of ${projectsData.length} displayed`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-slate-500 space-y-2">
        <i data-lucide="search-x" class="w-8 h-8 mx-auto text-slate-400"></i>
        <div class="font-bold text-sm text-slate-700 dark:text-slate-300">No matching projects found</div>
        <p class="text-xs">Try clearing the search or choosing a different division.</p>
        <button onclick="clearSearch()" class="mt-2 px-3 py-1.5 rounded-lg bg-cyan-600 text-white text-xs font-semibold hover:bg-cyan-500 transition">
          Reset All Filters
        </button>
      </div>
    `;
    refreshIcons();
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden flex flex-col justify-between hover:border-cyan-500/60 transition-all hover:shadow-xl group shadow-sm";
    
    card.innerHTML = `
      <div class="p-5 space-y-3">
        <div class="flex items-center justify-between gap-2">
          <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-${p.badgeColor}-100 dark:bg-${p.badgeColor}-950/80 text-${p.badgeColor}-800 dark:text-${p.badgeColor}-300 border border-${p.badgeColor}-200 dark:border-${p.badgeColor}-800/50 font-mono font-semibold">
            ${p.badge}
          </span>
          <span class="text-[11px] text-slate-400 font-mono font-medium">${p.divisionName || p.year}</span>
        </div>

        <h3 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition cursor-pointer" onclick="openProjectModal('${p.id}')">
          ${p.title}
        </h3>

        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
          ${p.desc}
        </p>

        <div class="flex flex-wrap gap-1.5 pt-1">
          ${p.tags.map(t => `<button onclick="filterCategory('${t}')" class="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-cyan-100 dark:hover:bg-cyan-950/60 hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-700 dark:text-slate-300 font-mono transition">${t}</button>`).join("")}
        </div>
      </div>

      <div class="px-5 py-3.5 bg-slate-50/60 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <button onclick="openProjectModal('${p.id}')" class="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 flex items-center gap-1.5 group-hover:underline">
          <i data-lucide="file-text" class="w-3.5 h-3.5"></i> Deep Dive Case Study
        </button>
        <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
          ${p.metric}
        </span>
      </div>
    `;

    container.appendChild(card);
  });

  refreshIcons();
}

function updateDivisionCounts() {
  if (typeof projectsData === "undefined") return;
  const allCount = projectsData.length;
  const daCount = projectsData.filter(p => p.division === "data-analyst").length;
  const baCount = projectsData.filter(p => p.division === "business-analyst").length;
  const pmCount = projectsData.filter(p => p.division === "project-manager").length;

  const btnAll = document.getElementById("pillar-all-btn");
  const btnDa = document.getElementById("pillar-da-btn");
  const btnBa = document.getElementById("pillar-ba-btn");
  const btnPm = document.getElementById("pillar-pm-btn");
  const heroCount = document.getElementById("hero-repos-count");

  if (btnAll) btnAll.innerText = `All Projects (${allCount})`;
  if (btnDa) btnDa.innerText = `📊 Data Analyst (${daCount})`;
  if (btnBa) btnBa.innerText = `💼 Business Analyst (${baCount})`;
  if (btnPm) btnPm.innerText = `🚀 Project Manager (${pmCount})`;
  if (heroCount) heroCount.innerText = "16";
}

function filterDivision(divKey) {
  currentPillar = divKey;
  document.querySelectorAll(".pillar-btn").forEach(btn => {
    btn.classList.remove("bg-cyan-600", "text-white", "shadow-lg");
    btn.classList.add("bg-white", "dark:bg-slate-900", "text-slate-700", "dark:text-slate-300");
  });

  if (window.event && window.event.target) {
    const btn = window.event.target.closest(".pillar-btn");
    if (btn) {
      btn.classList.add("bg-cyan-600", "text-white", "shadow-lg");
      btn.classList.remove("bg-white", "dark:bg-slate-900", "text-slate-700", "dark:text-slate-300");
    }
  }

  const badge = document.getElementById("filter-name");
  if (badge) {
    const titles = {
      "all": `Showing All Projects (${projectsData.length})`,
      "data-analyst": "Showing: Data Analyst Division (6 Projects)",
      "business-analyst": "Showing: Business Analyst Division (4 Projects)",
      "project-manager": "Showing: Project Manager Division (4 Projects)"
    };
    badge.innerText = titles[divKey] || `Showing: ${divKey}`;
  }
  renderProjects(divKey, currentSearchQuery);
}

function filterPillar(pillar) {
  if (pillar === "bi" || pillar === "da") filterDivision("data-analyst");
  else if (pillar === "ba") filterDivision("business-analyst");
  else if (pillar === "tpm" || pillar === "pm") filterDivision("project-manager");
  else filterDivision("all");
}

function filterCategory(cat) {
  const searchInput = document.getElementById("project-search");
  if (searchInput) {
    searchInput.value = cat;
  }
  handleSearch(cat);
  
  const showcasesEl = document.getElementById("showcases");
  if (showcasesEl) {
    showcasesEl.scrollIntoView({ behavior: "smooth" });
  }
}

function handleSearch(val) {
  currentSearchQuery = val;
  const clearBtn = document.getElementById("clear-search");
  if (clearBtn) {
    if (val.length > 0) {
      clearBtn.classList.remove("hidden");
    } else {
      clearBtn.classList.add("hidden");
    }
  }
  renderProjects(currentPillar, val);
}

function clearSearch() {
  const searchInput = document.getElementById("project-search");
  if (searchInput) {
    searchInput.value = "";
  }
  handleSearch("");
}

// --------------------------------------------------------------------------
// 4. Case Study Deep Dive Modal & Web Viewer Engine
// --------------------------------------------------------------------------
function getOfficeViewerUrl(path) {
  if (!path) return '#';
  const cleanPath = path.replace(/^\.?\//, '');
  const publicUrl = `https://thabeebjafran.github.io/${encodeURI(cleanPath)}`;
  return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(publicUrl)}`;
}

function getGoogleViewerUrl(path) {
  if (!path) return '#';
  const cleanPath = path.replace(/^\.?\//, '');
  const publicUrl = `https://thabeebjafran.github.io/${encodeURI(cleanPath)}`;
  return `https://docs.google.com/viewer?url=${encodeURIComponent(publicUrl)}&embedded=true`;
}

function getNbViewerUrl(path) {
  if (!path) return '#';
  const cleanPath = path.replace(/^\.?\//, '');
  return `https://nbviewer.org/github/thabeebjafran/thabeebjafran.github.io/blob/main/${encodeURI(cleanPath)}`;
}

function openProjectModal(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  currentModalProject = project;
  currentModalTab = "overview";

  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalBadge = document.getElementById("modal-badge");
  const modalMetric = document.getElementById("modal-metric");

  modalTitle.innerText = project.title;
  modalBadge.className = `text-[10px] px-2.5 py-0.5 rounded-full bg-${project.badgeColor}-100 dark:bg-${project.badgeColor}-950/80 text-${project.badgeColor}-800 dark:text-${project.badgeColor}-300 border border-${project.badgeColor}-200 dark:border-${project.badgeColor}-800/50 font-mono font-semibold`;
  modalBadge.innerText = `${project.badge} &bull; ${project.year}`;
  modalMetric.innerText = project.metric;

  // Reset tab buttons
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  const defaultTabBtn = document.getElementById("modtab-overview");
  if (defaultTabBtn) defaultTabBtn.classList.add("active");

  renderModalTabContent("overview");

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  refreshIcons();
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function switchModalTab(tabKey) {
  currentModalTab = tabKey;
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  const activeBtn = document.getElementById("modtab-" + tabKey);
  if (activeBtn) activeBtn.classList.add("active");
  renderModalTabContent(tabKey);
}

function renderModalTabContent(tabKey) {
  const body = document.getElementById("modal-body");
  if (!body || !currentModalProject) return;

  const p = currentModalProject;

  if (tabKey === "overview") {
    body.innerHTML = `
      <div class="space-y-6">
        <!-- Problem & Solution Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 space-y-2">
            <div class="font-bold text-red-700 dark:text-red-400 flex items-center gap-1.5 text-xs">
              <i data-lucide="alert-circle" class="w-4 h-4"></i> Business Problem Statement
            </div>
            <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
              ${p.execSummary.problem}
            </p>
          </div>

          <div class="p-4 rounded-xl border border-cyan-200 dark:border-cyan-900/40 bg-cyan-50/50 dark:bg-cyan-950/20 space-y-2">
            <div class="font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-1.5 text-xs">
              <i data-lucide="check-circle-2" class="w-4 h-4"></i> Technical Solution
            </div>
            <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
              ${p.execSummary.solution}
            </p>
          </div>
        </div>

        <!-- Business Impact Card -->
        <div class="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1.5">
          <div class="font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-between text-xs">
            <span class="flex items-center gap-1.5"><i data-lucide="trending-up" class="w-4 h-4"></i> Quantified Business ROI & Impact</span>
            <span class="font-mono bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px]">${p.metric}</span>
          </div>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
            ${p.execSummary.impact}
          </p>
        </div>

        <!-- Key Analytical Findings -->
        <div class="space-y-2.5">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono flex items-center gap-1.5">
            <i data-lucide="sparkles" class="w-4 h-4 text-cyan-500"></i> Key Analytical Insights & Takeaways
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            ${p.keyFindings.map((finding, idx) => `
              <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-1">
                <div class="font-mono text-cyan-500 font-bold text-[10px]">Insight 0${idx + 1}</div>
                <p class="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">${finding}</p>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  } else if (tabKey === "methodology") {
    body.innerHTML = `
      <div class="space-y-4">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono flex items-center gap-1.5">
          <i data-lucide="git-merge" class="w-4 h-4 text-cyan-500"></i> End-to-End Data Lifecycle & Engineering Methodology
        </h4>
        <div class="space-y-3">
          ${p.methodology.map(step => `
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              ${step}
            </div>
          `).join("")}
        </div>
      </div>
    `;
  } else if (tabKey === "artifacts") {
    const deckWebUrl = p.artifacts.deckUrl ? getOfficeViewerUrl(p.artifacts.deckUrl) : null;
    const deckGDocsUrl = p.artifacts.deckUrl ? getGoogleViewerUrl(p.artifacts.deckUrl) : null;
    const nbWebUrl = p.artifacts.notebookUrl ? getNbViewerUrl(p.artifacts.notebookUrl) : null;

    body.innerHTML = `
      <div class="space-y-5">
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono flex items-center gap-1.5">
            <i data-lucide="folder-git" class="w-4 h-4 text-cyan-500"></i> Project Deliverables & Web Viewers
          </h4>
          <span class="text-[11px] text-slate-500 font-mono">Open directly in web browser</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          ${p.artifacts.deckUrl ? `
            <div class="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 flex flex-col justify-between space-y-3">
              <div class="space-y-2">
                <div class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
                  <i data-lucide="presentation" class="w-4 h-4"></i>
                </div>
                <div>
                  <div class="font-bold text-slate-900 dark:text-white text-xs">Case Study Web Deck</div>
                  <p class="text-[11px] text-slate-500 leading-relaxed">Interactive Executive Slide Presentation (PPTX)</p>
                </div>
              </div>
              <div class="space-y-1.5 pt-2 border-t border-amber-200/60 dark:border-amber-900/40">
                <a href="${deckWebUrl}" target="_blank" rel="noopener noreferrer" class="w-full py-1.5 px-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-sm transition">
                  <i data-lucide="external-link" class="w-3 h-3"></i> Open Web Presentation
                </a>
                <a href="${deckGDocsUrl}" target="_blank" rel="noopener noreferrer" class="block text-center text-[10px] font-mono text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition">
                  Alternative: Google Docs Viewer &rarr;
                </a>
              </div>
            </div>
          ` : ''}

          ${p.artifacts.notebookUrl ? `
            <div class="p-4 rounded-xl border border-cyan-200 dark:border-cyan-900/50 bg-cyan-50/50 dark:bg-cyan-950/20 flex flex-col justify-between space-y-3">
              <div class="space-y-2">
                <div class="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-500 flex items-center justify-center font-bold">
                  <i data-lucide="book-open" class="w-4 h-4"></i>
                </div>
                <div>
                  <div class="font-bold text-slate-900 dark:text-white text-xs">Jupyter Notebook Web</div>
                  <p class="text-[11px] text-slate-500 leading-relaxed">Interactive Python Code, Visuals & ML Models</p>
                </div>
              </div>
              <div class="space-y-1.5 pt-2 border-t border-cyan-200/60 dark:border-cyan-900/40">
                <a href="${nbWebUrl}" target="_blank" rel="noopener noreferrer" class="w-full py-1.5 px-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-sm transition">
                  <i data-lucide="external-link" class="w-3 h-3"></i> View in NBViewer
                </a>
                <a href="https://colab.research.google.com/github/thabeebjafran/thabeebjafran.github.io/blob/main/${encodeURI(p.artifacts.notebookUrl.replace(/^\.?\//, ''))}" target="_blank" rel="noopener noreferrer" class="block text-center text-[10px] font-mono text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition">
                  Open in Google Colab &rarr;
                </a>
              </div>
            </div>
          ` : ''}

          ${(p.artifacts.tableauPublicUrl || p.id === 'tableau-projects-portfolio') ? `
            <div class="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/20 flex flex-col justify-between space-y-3">
              <div class="space-y-2">
                <div class="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-500 flex items-center justify-center font-bold">
                  <i data-lucide="bar-chart-3" class="w-4 h-4"></i>
                </div>
                <div>
                  <div class="font-bold text-slate-900 dark:text-white text-xs">Tableau Public Suite</div>
                  <p class="text-[11px] text-slate-500 leading-relaxed">20 Live Dashboards & Visual Analytics</p>
                </div>
              </div>
              <div class="pt-2 border-t border-indigo-200/60 dark:border-indigo-900/40">
                <a href="${p.artifacts.tableauPublicUrl || 'https://public.tableau.com/profile/thabeebjafran'}" target="_blank" rel="noopener noreferrer" class="w-full py-1.5 px-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-sm transition">
                  <i data-lucide="external-link" class="w-3 h-3"></i> Open Tableau Public (20 Dashboards)
                </a>
              </div>
            </div>
          ` : ''}

          <div class="p-4 rounded-xl border border-purple-200 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-950/20 flex flex-col justify-between space-y-3">
            <div class="space-y-2">
              <div class="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-500 flex items-center justify-center font-bold">
                <i data-lucide="github" class="w-4 h-4"></i>
              </div>
              <div>
                <div class="font-bold text-slate-900 dark:text-white text-xs">GitHub Repository</div>
                <p class="text-[11px] text-slate-500 leading-relaxed">Source Code, Pipelines & Architecture Specs</p>
              </div>
            </div>
            <div class="pt-2 border-t border-purple-200/60 dark:border-purple-900/40">
              <a href="${p.artifacts.repoUrl || 'https://github.com/thabeebjafran'}" target="_blank" rel="noopener noreferrer" class="w-full py-1.5 px-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-sm transition">
                <i data-lucide="github" class="w-3 h-3"></i> View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  refreshIcons();
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function copyCode(btn, encodedCode) {
  const code = decodeURIComponent(encodedCode);
  navigator.clipboard.writeText(code).then(() => {
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> Copied!`;
    refreshIcons();
    setTimeout(() => {
      btn.innerHTML = originalText;
      refreshIcons();
    }, 2000);
  });
}

// --------------------------------------------------------------------------
// 5. Image Lightbox
// --------------------------------------------------------------------------
function openLightbox(src) {
  const lightbox = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  if (!lightbox || !img) return;

  img.src = src;
  lightbox.classList.remove("hidden");
  refreshIcons();
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox-modal");
  if (lightbox) {
    lightbox.classList.add("hidden");
  }
}

// Keyboard shortcuts for modals
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
    closeProjectModal();
  }
});

// --------------------------------------------------------------------------
// 6. Interactive Live Analytics Sandbox / Labs Engine
// --------------------------------------------------------------------------
function switchSandboxTab(tabName) {
  document.querySelectorAll(".sandbox-view").forEach(el => el.classList.add("hidden"));
  
  const targetView = document.getElementById("sandbox-" + tabName);
  if (targetView) targetView.classList.remove("hidden");

  ["pricing", "rfm", "attrition"].forEach(t => {
    const btn = document.getElementById("tab-btn-" + t);
    if (btn) {
      if (t === tabName) {
        btn.className = "px-3 py-1.5 rounded-lg font-semibold bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm transition";
      } else {
        btn.className = "px-3 py-1.5 rounded-lg font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition";
      }
    }
  });

  refreshIcons();
}

// Lab 1: Dynamic Pricing Calculator
function calculatePricing() {
  const dist = parseFloat(document.getElementById("input-distance").value);
  const surge = parseFloat(document.getElementById("input-surge").value);
  const corridor = document.getElementById("input-corridor").value;

  document.getElementById("val-distance").innerText = dist.toFixed(1) + " km";
  document.getElementById("val-surge").innerText = surge.toFixed(2) + "x";

  let base = 3.50;
  let ratePerKm = 2.25;
  let elasticity = -0.42;
  let insight = "";

  if (corridor === "airport") {
    base = 12.00;
    ratePerKm = 2.80;
    elasticity = -0.38;
    insight = "Airport express route (JFK/LGA) demonstrates highly inelastic demand (E = -0.38). Surge pricing captures premium traveler willingness to pay without drop-off.";
  } else if (corridor === "manhattan-peak") {
    base = 4.50;
    ratePerKm = 2.40;
    elasticity = -0.42;
    insight = "Manhattan rush-hour commute demand remains stable up to 1.6x surge. The +11.5% rate optimization yields highest dollar margin per driver hour.";
  } else if (corridor === "off-peak") {
    base = 3.00;
    ratePerKm = 1.85;
    elasticity = -1.42;
    insight = "Mid-day off-peak demand is elastic (E = -1.42). Surges above 1.1x cause ride abandonment; targeted price discounts increase total gross revenue.";
  } else {
    base = 5.00;
    ratePerKm = 2.60;
    elasticity = -0.75;
    insight = "Weekend nightlife hours tolerate moderate surge (up to 1.8x). Driver supply balancing matches ride request velocity.";
  }

  const calculatedFare = (base + (dist * ratePerKm)) * surge;
  document.getElementById("out-fare").innerText = "$" + calculatedFare.toFixed(2);
  document.getElementById("out-elasticity").innerText = elasticity.toFixed(2);
  document.getElementById("out-pricing-insight").innerText = insight;
}

// Lab 2: RFM Customer Segmentation
function calculateRFM() {
  const recency = parseInt(document.getElementById("input-recency").value);
  const frequency = parseInt(document.getElementById("input-frequency").value);
  const monetary = parseInt(document.getElementById("input-monetary").value);

  document.getElementById("val-recency").innerText = recency + " days";
  document.getElementById("val-frequency").innerText = frequency + " orders";
  document.getElementById("val-monetary").innerText = "£" + monetary.toLocaleString();

  // Quintile calculation logic
  const rScore = recency <= 30 ? 5 : recency <= 60 ? 4 : recency <= 120 ? 3 : recency <= 200 ? 2 : 1;
  const fScore = frequency >= 25 ? 5 : frequency >= 15 ? 4 : frequency >= 8 ? 3 : frequency >= 3 ? 2 : 1;
  const mScore = monetary >= 4000 ? 5 : monetary >= 2000 ? 4 : monetary >= 1000 ? 3 : monetary >= 300 ? 2 : 1;

  document.getElementById("out-rfm-score").innerText = `R: ${rScore} | F: ${fScore} | M: ${mScore}`;

  let persona = "💎 Loyal Customer";
  let playbook = "Upsell higher-value product bundles and solicit product feedback. Enroll in tier-2 VIP perks.";

  if (rScore >= 4 && fScore >= 4 && mScore >= 4) {
    persona = "👑 Champion / High-Value";
    playbook = "Reward loyalty with exclusive early access to product launches and concierge support. Avoid aggressive discounting.";
  } else if (rScore <= 2 && fScore >= 3 && mScore >= 3) {
    persona = "⚠️ At Risk / Churn Threat";
    playbook = "Customer spent heavily previously but hasn't returned recently. Dispatch personalized win-back email and exclusive limited-time re-engagement voucher.";
  } else if (rScore <= 2 && fScore <= 2) {
    persona = "💤 Lost / Hibernating";
    playbook = "Low engagement and low spend. Automate light monthly newsletter touches without exhausting ad budget.";
  } else if (rScore >= 4 && fScore <= 2) {
    persona = "🌱 New / Potential Loyalist";
    playbook = "Recently purchased for the first time. Deliver onboarding nurture sequence and secondary product recommendations within 14 days.";
  }

  document.getElementById("out-rfm-persona").innerText = persona;
  document.getElementById("out-rfm-playbook").innerText = playbook;
}

// Lab 3: IBM TalentGuard Attrition Risk Predictor
function calculateAttrition() {
  const isOvertime = document.getElementById("input-overtime").checked;
  const income = parseInt(document.getElementById("input-income").value);
  const managerTenure = parseFloat(document.getElementById("input-manager").value);

  document.getElementById("val-income").innerText = "$" + income.toLocaleString();
  document.getElementById("val-manager").innerText = managerTenure.toFixed(1) + " years";

  // Logistic Regression Heuristic Model weights from IBM notebook
  let logOdds = 0.5;
  if (isOvertime) logOdds += 1.45; // Overtime is #1 feature
  logOdds -= (income / 8000); // Higher income reduces risk
  logOdds -= (managerTenure * 0.28); // Tenure with manager protects against turnover

  const probability = (1 / (1 + Math.exp(-logOdds))) * 100;
  const probFormatted = Math.min(Math.max(probability, 4.0), 96.0).toFixed(1);

  document.getElementById("out-attrition-prob").innerText = probFormatted + "%";

  const bar = document.getElementById("out-attrition-bar");
  bar.style.width = probFormatted + "%";

  let action = "";
  if (probFormatted > 60) {
    bar.className = "h-full bg-red-500 rounded-full transition-all duration-300";
    document.getElementById("out-attrition-prob").className = "text-2xl font-black font-mono text-red-500";
    action = "Critical flight risk detected due to overtime strain and tenure transition. Immediately conduct manager check-in, redistribute workload, and evaluate equity retention bonus.";
  } else if (probFormatted > 30) {
    bar.className = "h-full bg-amber-500 rounded-full transition-all duration-300";
    document.getElementById("out-attrition-prob").className = "text-2xl font-black font-mono text-amber-500";
    action = "Moderate retention risk. Review career growth path and schedule bi-weekly 1-on-1 development check-ins.";
  } else {
    bar.className = "h-full bg-emerald-500 rounded-full transition-all duration-300";
    document.getElementById("out-attrition-prob").className = "text-2xl font-black font-mono text-emerald-500";
    action = "Stable retention profile. Employee demonstrates high engagement and protective relationship with direct manager.";
  }

  document.getElementById("out-attrition-action").innerText = action;
}

// --------------------------------------------------------------------------
// Initial Load & Event Attachments
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  updateThemeButtons(localStorage.getItem("theme") || "system");
  updateDivisionCounts();
  renderProjects("all");

  // Initialize Sandbox Calculators
  calculatePricing();
  calculateRFM();
  calculateAttrition();
  refreshIcons();
});

// Run once immediately in case DOM is already ready
updateThemeButtons(localStorage.getItem("theme") || "system");
updateDivisionCounts();
renderProjects("all");
calculatePricing();
calculateRFM();
calculateAttrition();
refreshIcons();

