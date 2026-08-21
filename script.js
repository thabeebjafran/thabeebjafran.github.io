// Footer Dynamic Year
const yearNode = document.querySelector('#year');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

// Dark / Light Theme Switcher
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark-mode');
    document.body.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
    document.body.classList.remove('dark-mode');
  }
  const themeIcons = document.querySelectorAll('.theme-icon');
  themeIcons.forEach((icon) => {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  });
}

window.toggleTheme = function () {
  const currentTheme = document.documentElement.getAttribute('data-theme') || (document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  applyTheme(newTheme);
};

// Initialize Theme on Page Load
(function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);
})();

// Mobile Navigation Menu Toggle with Accessibility Sync
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}



// Scroll Reveal Animation (Intersection Observer)
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Active Header Navigation Link Indicator on Scroll
const sections = document.querySelectorAll('section[id], main[id="home"]');
const navLinks = document.querySelectorAll('.site-nav .nav-link');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach((section) => navObserver.observe(section));

// Instant Search Bar & Category Filter Logic
const projectSearchInput = document.querySelector('#projectSearchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

function filterProjects() {
  const query = projectSearchInput ? projectSearchInput.value.toLowerCase().trim() : '';
  const activeBtn = document.querySelector('.filter-btn.active');
  const activeFilter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';

  projectCards.forEach((card) => {
    const category = card.getAttribute('data-category');
    const keywords = card.getAttribute('data-keywords') || '';
    const cardText = card.textContent.toLowerCase();

    const matchesCategory = activeFilter === 'all' || category === activeFilter;
    const matchesSearch = query === '' || keywords.toLowerCase().includes(query) || cardText.includes(query);

    if (matchesCategory && matchesSearch) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

if (projectSearchInput) {
  projectSearchInput.addEventListener('input', filterProjects);
}

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    filterProjects();
  });
});

// Interactive Skill Badge Cross-Spotlighting
const clickableBadges = document.querySelectorAll('.clickable-badge');

clickableBadges.forEach((badge) => {
  badge.addEventListener('click', () => {
    const skill = badge.getAttribute('data-skill') || badge.textContent.trim().toLowerCase();
    
    // Toggle spotlight state on badge
    const isActive = badge.classList.contains('active-spotlight');
    clickableBadges.forEach((b) => b.classList.remove('active-spotlight'));

    if (!isActive) {
      badge.classList.add('active-spotlight');
      if (projectSearchInput) {
        projectSearchInput.value = skill;
        filterProjects();
      }
      showToast(`🎯 Spotlighting projects using "${badge.textContent.trim()}"`);
    } else {
      if (projectSearchInput) {
        projectSearchInput.value = '';
        filterProjects();
      }
    }
  });
});

// Expandable Experience Timeline Details
window.toggleTimelineDetails = function (btn) {
  const content = btn.nextElementSibling;
  const arrow = btn.querySelector('.arrow');
  
  if (!content) return;

  if (content.classList.contains('collapsed')) {
    content.classList.remove('collapsed');
    content.classList.add('expanded');
    btn.classList.add('open');
    if (arrow) arrow.textContent = '▴';
  } else {
    content.classList.remove('expanded');
    content.classList.add('collapsed');
    btn.classList.remove('open');
    if (arrow) arrow.textContent = '▾';
  }
};

// Interactive Data Impact Simulator Calculations
const monthlyRevRange = document.querySelector('#monthlyRevRange');
const surgeRateRange = document.querySelector('#surgeRateRange');
const monthlyRevVal = document.querySelector('#monthlyRevVal');
const surgeRateVal = document.querySelector('#surgeRateVal');
const revUpliftPct = document.querySelector('#revUpliftPct');
const revUpliftDollar = document.querySelector('#revUpliftDollar');

const empCountRange = document.querySelector('#empCountRange');
const overtimePctRange = document.querySelector('#overtimePctRange');
const empCountVal = document.querySelector('#empCountVal');
const overtimePctVal = document.querySelector('#overtimePctVal');
const churnReductionVal = document.querySelector('#churnReductionVal');
const churnSavingsVal = document.querySelector('#churnSavingsVal');

function calculateSurgePricing() {
  if (!monthlyRevRange || !surgeRateRange) return;
  const rev = parseInt(monthlyRevRange.value, 10);
  const surge = parseInt(surgeRateRange.value, 10);

  if (monthlyRevVal) monthlyRevVal.textContent = `$${rev.toLocaleString()}`;
  if (surgeRateVal) surgeRateVal.textContent = `${surge}%`;

  const pctGain = (surge * 0.767).toFixed(1);
  const dollarGain = Math.round(rev * (pctGain / 100));

  if (revUpliftPct) revUpliftPct.textContent = `+${pctGain}%`;
  if (revUpliftDollar) revUpliftDollar.textContent = `+$${dollarGain.toLocaleString()} / mo`;
}

function calculateHRRetention() {
  if (!empCountRange || !overtimePctRange) return;
  const emps = parseInt(empCountRange.value, 10);
  const overtime = parseInt(overtimePctRange.value, 10);

  if (empCountVal) empCountVal.textContent = `${emps.toLocaleString()} Employees`;
  if (overtimePctVal) overtimePctVal.textContent = `${overtime}%`;

  const projectedRate = Math.max(5.5, 16.14 - (overtime * 0.16)).toFixed(2);
  const churnedSaved = Math.round(emps * ((16.14 - projectedRate) / 100));
  const savings = churnedSaved * 28500;

  if (churnReductionVal) churnReductionVal.textContent = `16.14% ➔ ${projectedRate}%`;
  if (churnSavingsVal) churnSavingsVal.textContent = `$${savings.toLocaleString()} / yr`;
}

if (monthlyRevRange) monthlyRevRange.addEventListener('input', calculateSurgePricing);
if (surgeRateRange) surgeRateRange.addEventListener('input', calculateSurgePricing);
if (empCountRange) empCountRange.addEventListener('input', calculateHRRetention);
if (overtimePctRange) overtimePctRange.addEventListener('input', calculateHRRetention);

// Run initial simulator calculation
calculateSurgePricing();
calculateHRRetention();

// Interactive Case Study & Live Code Data
const caseStudyData = {
  smartfare: {
    title: 'SmartFare NYC — Dynamic Pricing Optimization',
    tag: 'Pricing & Revenue Analytics',
    tools: 'Python (Google Colab), Tableau, Linear Regression',
    embedPresentation: `<div class="presentation-embed-wrap"><iframe src="https://docs.google.com/presentation/d/e/2PACX-1vS12ID30mLeJhwPAlkjKtvOTTEOJubbeQdFANJTlhNgTwbwWdhx6yOh2Ne6_75iXLIM16xi83F2IeC1/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe></div>`,
    objective: 'Optimize Uber fare pricing structures across NYC zones to maximize gross revenue without sacrificing ride volume.',
    metrics: [
      { label: 'Projected Revenue Uplift', value: '+11.5%' },
      { label: 'Distance Correlation Coeff', value: '0.8616' },
      { label: 'Peak Hour Demand Spike', value: '+20% Surge' },
      { label: 'High Demand Surge Fare', value: 'Dynamic Rate' }
    ],
    problem: 'Historical pricing models relied heavily on flat distance rates, drastically underpricing peak commute hours in high-demand zones such as Manhattan and JFK Airport.',
    methodology: 'Built multiple linear regression algorithms evaluating trip distance, trip duration, time of day, weather factors, and pick-up density against fare history in Python.',
    insights: 'Trip distance was identified as the primary revenue driver, but demand-driven surge multipliers during 7-9 AM and 5-7 PM offered significant uncaptured margins.',
    impact: 'Formulated a dynamic pricing model applying a 20% high-demand surge modifier and off-peak discount incentives, boosting projected driver and platform revenue by 11.5%.',
    codeLang: 'Python (Pandas & Scikit-Learn)',
    codeSnippet: `<span class="code-keyword">import</span> pandas <span class="code-keyword">as</span> pd
<span class="code-keyword">import</span> numpy <span class="code-keyword">as</span> np
<span class="code-keyword">from</span> sklearn.linear_model <span class="code-keyword">import</span> LinearRegression
<span class="code-keyword">from</span> sklearn.model_selection <span class="code-keyword">import</span> train_test_split

<span class="code-comment"># Load NYC Uber trip fare dataset</span>
df = pd.read_csv(<span class="code-string">'nyc_uber_fares.csv'</span>)

<span class="code-comment"># Feature Engineering: Extract peak hour demand flags</span>
df[<span class="code-string">'pickup_hour'</span>] = pd.to_datetime(df[<span class="code-string">'pickup_datetime'</span>]).dt.hour
df[<span class="code-string">'is_peak_hour'</span>] = df[<span class="code-string">'pickup_hour'</span>].isin([7,8,9,17,18,19]).astype(int)

<span class="code-comment"># Features and Target Matrix</span>
X = df[[<span class="code-string">'trip_distance'</span>, <span class="code-string">'trip_duration'</span>, <span class="code-string">'is_peak_hour'</span>, <span class="code-string">'passenger_count'</span>]]
y = df[<span class="code-string">'fare_amount'</span>]

<span class="code-comment"># Train Multiple Linear Regression Model</span>
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)

<span class="code-comment"># Distance Coefficient: 0.8616 | Projected Revenue Uplift: +11.5%</span>
print(<span class="code-string">"Model Feature Coefficients:"</span>, dict(zip(X.columns, model.coef_)))`
  },
  talentguard: {
    title: 'TalentGuard IBM — Employee Attrition Prediction & Strategy',
    tag: 'HR & People Analytics',
    tools: 'Python (Google Colab), Tableau, Logistic Regression',
    embedPresentation: `<div class="presentation-embed-wrap"><iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSYbczUICP-DeUwF0UD6umT2nN70FJbF2AcMotpRevriYguvsI125B_pd_6kKeUBvNrWbPj5j07zWKD/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe></div>`,
    objective: 'Reduce IBM corporate employee churn rate from 16.14% to below the 10% target benchmark.',
    metrics: [
      { label: 'Initial Attrition Rate', value: '16.14%' },
      { label: 'Projected Attrition Rate', value: '8.80%' },
      { label: 'Overtime Risk Factor', value: '100% Correlation' },
      { label: 'Target Salary Threshold', value: '< $5,000 / mo' }
    ],
    problem: 'IBM experienced costly attrition across technical and sales departments. Traditional exit surveys failed to pinpoint predictive indicators early enough to retain top talent.',
    methodology: 'Engineered feature sets from historical HR data (monthly income, overtime hours, stock options, job role, distance from home) and trained Logistic Regression classifiers.',
    insights: 'Uncompensated overtime was the single largest predictor of churn—100% of employees categorized as extreme churn risks consistently logged overtime hours with zero stock options.',
    impact: 'Designed a structured HR retention roadmap capping overtime hours and offering targeted equity retention packages for low-salary tiers, projected to lower churn to 8.80%.',
    codeLang: 'Python (Logistic Regression Classification)',
    codeSnippet: `<span class="code-keyword">import</span> pandas <span class="code-keyword">as</span> pd
<span class="code-keyword">from</span> sklearn.linear_model <span class="code-keyword">import</span> LogisticRegression
<span class="code-keyword">from</span> sklearn.metrics <span class="code-keyword">import</span> classification_report

<span class="code-comment"># Load IBM HR Attrition Dataset</span>
hr_df = pd.read_csv(<span class="code-string">'ibm_hr_attrition.csv'</span>)
hr_df[<span class="code-string">'OverTime_Binary'</span>] = hr_df[<span class="code-string">'OverTime'</span>].apply(<span class="code-keyword">lambda</span> x: 1 <span class="code-keyword">if</span> x == <span class="code-string">'Yes'</span> <span class="code-keyword">else</span> 0)

<span class="code-comment"># Model Training to Identify Risk Factors</span>
features = [<span class="code-string">'OverTime_Binary'</span>, <span class="code-string">'MonthlyIncome'</span>, <span class="code-string">'StockOptionLevel'</span>, <span class="code-string">'YearsAtCompany'</span>]
X = hr_df[features]
y = hr_df[<span class="code-string">'Attrition'</span>].apply(<span class="code-keyword">lambda</span> x: 1 <span class="code-keyword">if</span> x == <span class="code-string">'Yes'</span> <span class="code-keyword">else</span> 0)

clf = LogisticRegression(class_weight=<span class="code-string">'balanced'</span>)
clf.fit(X, y)

<span class="code-comment"># Predict Churn Risk & Formulate Targeted HR Intervention</span>
hr_df[<span class="code-string">'Churn_Risk_Score'</span>] = clf.predict_proba(X)[:, 1]
print(<span class="code-string">"High Risk Employees Identified:"</span>, len(hr_df[hr_df[<span class="code-string">'Churn_Risk_Score'</span>] > 0.7]))`
  },
  fastfood: {
    title: 'FastFood A/B Analytics — Marketing Campaign Testing',
    tag: 'Marketing Analytics & A/B Testing',
    tools: 'Google Sheets, Excel, ANOVA, Post-Hoc T-Test',
    embedPresentation: `<div class="presentation-embed-wrap"><iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQULAH5aBa_KsyYj9wgxtte90ZURvWFpyhveU2KCK2IlMr2iOP7kPoSZEzMrzJVCCCtUWNP4E6JQ73a/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe></div>`,
    objective: 'Determine the most profitable ad campaign across 137 franchise locations across various market sizes.',
    metrics: [
      { label: 'Franchise Locations Tested', value: '137 Stores' },
      { label: 'Top Campaigns', value: 'Campaign 1 & 3' },
      { label: 'Underperforming Campaign', value: 'Campaign 2' },
      { label: 'Statistical Confidence', value: '95% (p < 0.05)' }
    ],
    problem: 'The parent company was split between 3 competing promotion campaigns, distributing marketing budget evenly despite varying revenue outputs.',
    methodology: 'Executed a 4-week A/B experiment. Performed One-Way ANOVA and Tukey Post-Hoc T-Tests across small, medium, and large market tiers in Google Sheets/Excel.',
    insights: 'Campaigns 1 and 3 generated statistically significant higher sales ($58.2k & $56.1k avg) compared to Campaign 2 ($47.3k avg) across all market segments.',
    impact: 'Recommended immediate sunsetting of Campaign 2, reallocating its budget to scale Campaign 1 nationally, maximizing return on ad spend (ROAS).',
    codeLang: 'Python (SciPy Hypothesis Testing)',
    codeSnippet: `<span class="code-keyword">import</span> scipy.stats <span class="code-keyword">as</span> stats
<span class="code-keyword">from</span> statsmodels.stats.multicomp <span class="code-keyword">import</span> pairwise_tukeyhsd

<span class="code-comment"># One-Way ANOVA Test across 3 Marketing Campaigns</span>
c1_sales = df[df[<span class="code-string">'Promotion'</span>] == 1][<span class="code-string">'SalesInThousands'</span>]
c2_sales = df[df[<span class="code-string">'Promotion'</span>] == 2][<span class="code-string">'SalesInThousands'</span>]
c3_sales = df[df[<span class="code-string">'Promotion'</span>] == 3][<span class="code-string">'SalesInThousands'</span>]

f_stat, p_val = stats.f_oneway(c1_sales, c2_sales, c3_sales)
print(f<span class="code-string">"ANOVA F-Statistic: {f_stat:.4f}, p-value: {p_val:.4e}"</span>)

<span class="code-comment"># Tukey Post-Hoc Pairwise T-Test</span>
tukey = pairwise_tukeyhsd(endog=df[<span class="code-string">'SalesInThousands'</span>], groups=df[<span class="code-string">'Promotion'</span>], alpha=0.05)
print(tukey)`
  },
  retailuk: {
    title: 'Retail UK — Cohort Analysis & RFM Customer Segmentation',
    tag: 'E-commerce & Customer Analytics',
    tools: 'SQL (BigQuery), Python, Google Looker Studio',
    embedPresentation: `<div class="presentation-embed-wrap"><iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQrd0In_xRCFGi-RRmGTCpft9BJ-HwkzpZ2YZTLjs6KT7JRX6GCaCKVzA4yCSGQrcnsOoMzZNa4SRuB/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe></div>`,
    objective: 'Increase e-commerce customer retention rate beyond the 31% retail industry benchmark.',
    metrics: [
      { label: 'High Potential Customers', value: '3,089 Users' },
      { label: 'Projected Retention Uplift', value: '+5.8% to +23.4%' },
      { label: 'Optimal CRC Budget', value: '$3.80 - $15.20' },
      { label: 'Target Benchmark', value: '> 31% Benchmark' }
    ],
    problem: 'Customer acquisition costs (CAC) were escalating while repeat purchase rates remained stagnant, placing heavy reliance on one-time buyers.',
    methodology: 'Processed 500,000+ transaction records in BigQuery SQL. Calculated Recency, Frequency, and Monetary (RFM) scores and performed monthly cohort retention tracking.',
    insights: 'Discovered that 3,089 repeat customers accounted for over 68% of total lifetime value (CLTV). However, customer decay peaked after month 2 post-acquisition.',
    impact: 'Built dynamic Google Looker dashboards and targeted re-engagement email triggers, enabling automated retention workflows with projected retention gains of up to +23.4%.',
    codeLang: 'SQL (Google BigQuery RFM Query)',
    codeSnippet: `<span class="code-comment">-- Recency, Frequency, and Monetary (RFM) Customer Segmentation</span>
<span class="code-keyword">WITH</span> user_transactions <span class="code-keyword">AS</span> (
  <span class="code-keyword">SELECT</span>
    CustomerID,
    <span class="code-function">MAX</span>(InvoiceDate) <span class="code-keyword">AS</span> last_purchase_date,
    <span class="code-function">COUNT</span>(<span class="code-keyword">DISTINCT</span> InvoiceNo) <span class="code-keyword">AS</span> frequency,
    <span class="code-function">SUM</span>(Quantity * UnitPrice) <span class="code-keyword">AS</span> monetary_val
  <span class="code-keyword">FROM</span> \`retail_uk.online_retail\`
  <span class="code-keyword">WHERE</span> CustomerID <span class="code-keyword">IS NOT NULL</span>
  <span class="code-keyword">GROUP BY</span> CustomerID
),
rfm_scores <span class="code-keyword">AS</span> (
  <span class="code-keyword">SELECT</span> *,
    <span class="code-function">NTILE</span>(5) <span class="code-function">OVER</span> (<span class="code-keyword">ORDER BY</span> last_purchase_date) <span class="code-keyword">AS</span> R_Score,
    <span class="code-function">NTILE</span>(5) <span class="code-function">OVER</span> (<span class="code-keyword">ORDER BY</span> frequency) <span class="code-keyword">AS</span> F_Score,
    <span class="code-function">NTILE</span>(5) <span class="code-function">OVER</span> (<span class="code-keyword">ORDER BY</span> monetary_val) <span class="code-keyword">AS</span> M_Score
  <span class="code-keyword">FROM</span> user_transactions
)
<span class="code-keyword">SELECT</span> *,
  <span class="code-keyword">CASE</span>
    <span class="code-keyword">WHEN</span> R_Score >= 4 <span class="code-keyword">AND</span> F_Score >= 4 <span class="code-keyword">THEN</span> <span class="code-string">'Champions'</span>
    <span class="code-keyword">WHEN</span> R_Score >= 3 <span class="code-keyword">AND</span> F_Score >= 3 <span class="code-keyword">THEN</span> <span class="code-string">'Loyal Customers'</span>
    <span class="code-keyword">WHEN</span> R_Score <= 2 <span class="code-keyword">THEN</span> <span class="code-string">'At-Risk / Loss'</span>
    <span class="code-keyword">ELSE</span> <span class="code-string">'Standard'</span>
  <span class="code-keyword">END AS</span> Customer_Segment
<span class="code-keyword">FROM</span> rfm_scores;`
  }
};

// Modal Tab Switcher & Renderer
let activeModalProjectId = null;
let activeModalTab = 'dashboard';

const modalOverlay = document.querySelector('#caseStudyModal');
const modalContent = document.querySelector('#modalContent');
const modalCloseBtn = document.querySelector('.modal-close');

window.switchModalTab = function (tab) {
  activeModalTab = tab;
  
  const dashboardBtn = document.querySelector('#tabDashboardBtn');
  const codeBtn = document.querySelector('#tabCodeBtn');

  if (dashboardBtn) dashboardBtn.classList.toggle('active', tab === 'dashboard');
  if (codeBtn) codeBtn.classList.toggle('active', tab === 'code');

  renderModalBody();
};

function renderModalBody() {
  if (!activeModalProjectId || !caseStudyData[activeModalProjectId] || !modalContent) return;
  const data = caseStudyData[activeModalProjectId];

  const metricsHTML = data.metrics
    .map(
      (m) => `
    <div class="modal-metric-card">
      <strong>${m.value}</strong>
      <span>${m.label}</span>
    </div>
  `
    )
    .join('');

  modalContent.innerHTML = `
    <div class="modal-header">
      <span class="pill">${data.tag}</span>
      <h2 class="modal-title">${data.title}</h2>
      <p class="project-tools"><strong>Tools &amp; Stack:</strong> ${data.tools}</p>
    </div>

    <div class="modal-grid">
      ${metricsHTML}
    </div>

    ${data.embedPresentation ? `
    <div class="modal-section">
      <h3>📊 Interactive Presentation Deck</h3>
      ${data.embedPresentation}
    </div>
    ` : ''}

    <div class="modal-section">
      <h3>🎯 Business Objective</h3>
      <p>${data.objective}</p>
    </div>

    <div class="modal-section">
      <h3>🚨 Problem Statement</h3>
      <p>${data.problem}</p>
    </div>

    <div class="modal-section">
      <h3>🔬 Methodology &amp; Analysis</h3>
      <p>${data.methodology}</p>
    </div>

    <div class="modal-section">
      <h3>💡 Key Insights</h3>
      <p>${data.insights}</p>
    </div>

    <div class="modal-section">
      <h3>🚀 Business Impact &amp; Strategy</h3>
      <p>${data.impact}</p>
    </div>
  `;
}

function openCaseStudyModal(projectId) {
  activeModalProjectId = projectId;

  renderModalBody();

  if (modalOverlay) {
    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeCaseStudyModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Event Listeners for Case Study Modals
document.querySelectorAll('.open-modal-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = btn.getAttribute('data-project-id');
    openCaseStudyModal(id);
  });
});

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeCaseStudyModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeCaseStudyModal();
    }
  });
}

// Keyboard ESC Close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
    closeCaseStudyModal();
  }
});

// Toast Feedback System
const toast = document.querySelector('#toast');

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Copy Email Button Listener & Dock Action
window.copyEmailFromDock = function() {
  const email = 'thabeebjafran@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    showToast('📧 Copied thabeebjafran@gmail.com to clipboard!');
  });
};

const copyEmailBtn = document.querySelector('#copyEmailBtn');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', copyEmailFromDock);
}

// Animated Stat Counter Logic
const statNumbers = document.querySelectorAll('.stat-number');
let animatedStats = false;

function animateCounters() {
  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute('data-target'), 10);
    const suffix = stat.getAttribute('data-suffix') || '';
    let current = 0;
    const increment = Math.ceil(target / 40);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = `${target}${suffix}`;
        clearInterval(timer);
      } else {
        stat.textContent = `${current}${suffix}`;
      }
    }, 35);
  });
}

const heroSection = document.querySelector('.hero');
if (heroSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !animatedStats) {
        animatedStats = true;
        animateCounters();
      }
    },
    { threshold: 0.3 }
  );

  statsObserver.observe(heroSection);
}
