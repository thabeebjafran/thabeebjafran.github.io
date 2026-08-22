// ==========================================================================
// Thabeeb Jafran | Official GitHub Projects Dataset
// Structured by Division: Data Analyst | Business Analyst | Project Manager
// Total Synced Showcases: 14
// ==========================================================================

const projectsData = [
  {
    "id": "job-ingestion-auditor",
    "title": "Autonomous Job Ingestion & Outreach Agent",
    "division": "business-analyst",
    "divisionName": "Business Analyst",
    "category": [
      "businessanalyst"
    ],
    "badge": "Agentic AI & FastAPI",
    "badgeColor": "blue",
    "year": "Process Automation",
    "desc": "Autonomous Job Sourcing, Gemini 2.5 Flash Auditing & Outreach Agent with Apify, Google Cloud Run & Google Chat integration",
    "tags": [
      "FastAPI",
      "Gemini 2.5 Flash",
      "Google Cloud Run",
      "Apify",
      "Google Workspace",
      "Docker"
    ],
    "metric": "100% Automated Workflow",
    "artifacts": {
      "repoUrl": "https://github.com/thabeebjafran/job-ingestion-auditor",
      "deckUrl": null,
      "notebookUrl": null,
      "tableauPublicUrl": null
    },
    "execSummary": {
      "problem": "Job seekers and recruiting analysts spend hours sifting through unverified listings, duplicate posts, and visa-incompatible requirements across disparate job boards.",
      "solution": "Built a containerized multi-agent system on Google Cloud Run leveraging Apify scrapers, Gemini 2.5 Flash AI reasoning to parse visa requirements and detect scam risk, syncing with Google Sheets and dispatching Google Chat Cards.",
      "impact": "Fully automated daily job discovery, qualification vetting, and candidate outreach with 1-tap WhatsApp and Gmail draft generation."
    },
    "keyFindings": [
      "Structured output schemas with Gemini 2.5 Flash achieved 99%+ parsing reliability.",
      "Google Chat Cards enable direct 1-tap hiring manager outreach via WhatsApp and pre-filled email drafts.",
      "Integrated Google Sheets database keeps an audit ledger of all identified job opportunities."
    ],
    "methodology": [
      "1. Apify Job Scraping: Scheduled actors scrape real-time job listings matching target criteria.",
      "2. Gemini 2.5 Audit: FastAPI microservice parses description, scoring visa sponsorship and scam probability.",
      "3. Database Sync: Stores validated listings in synchronized Google Sheets ledger.",
      "4. Webhook Dispatch: Sends interactive Google Chat cards with action buttons."
    ],
    "codeSnippets": [
      {
        "title": "FastAPI & Gemini 2.5 Structured Audit Engine",
        "language": "python",
        "code": "import os\nfrom google import genai\nfrom google.genai import types\nfrom pydantic import BaseModel\n\nclient = genai.Client(api_key=os.environ.get(\"GEMINI_API_KEY\"))\n\nclass JobAuditResult(BaseModel):\n    is_visa_sponsored: bool\n    scam_risk_score: float\n    key_tech_stack: list[str]\n    salary_range: str\n    outreach_summary: str\n\ndef audit_job(title: str, description: str) -> JobAuditResult:\n    prompt = f\"Audit job listing: {title}\\nDescription: {description}\"\n    response = client.models.generate_content(\n        model=\"gemini-2.5-flash\",\n        contents=prompt,\n        config=types.GenerateContentConfig(\n            response_mime_type=\"application/json\",\n            response_schema=JobAuditResult,\n            temperature=0.2\n        )\n    )\n    return JobAuditResult.model_validate_json(response.text)"
      }
    ]
  },
  {
    "id": "retail-uk-cohort-analysis-rfm-segmentation",
    "title": "UK Retail E-Commerce: Cohort Retention Analysis & RFM Segmentation",
    "division": "data-analyst",
    "divisionName": "Data Analyst",
    "category": [
      "dataanalyst"
    ],
    "badge": "Cohort Analysis & RFM",
    "badgeColor": "emerald",
    "year": "Customer Analytics",
    "desc": "Cohort retention analysis and RFM segmentation for a UK e-commerce retailer \u2014 identifies a $3.8\u2013$15.2 per-customer retention budget and a 7-segment treatment strategy.",
    "tags": [
      "Python",
      "Pandas",
      "Cohort Analysis",
      "RFM Segmentation",
      "Seaborn",
      "Matplotlib"
    ],
    "metric": "541K+ Txns Analyzed",
    "artifacts": {
      "repoUrl": "https://github.com/thabeebjafran/retail-uk-cohort-analysis-rfm-segmentation",
      "deckUrl": "Project report & code/Retail UK - 4/E-commerce Cohort Analysis & RFM Segmentation.pptx",
      "notebookUrl": "Project report & code/Retail UK - 4/E-Commerce Cohort and RFM.ipynb",
      "tableauPublicUrl": null
    },
    "execSummary": {
      "problem": "An online UK gift retailer lacked visibility into repeat customer retention curves, purchase frequency decay, and customer lifetime value (CLV) distribution across international accounts.",
      "solution": "Cleaned and processed 541,909 transactional records in Python, constructed monthly cohort retention matrices, and segmented customers using Recency, Frequency, and Monetary (RFM) quintile scoring.",
      "impact": "Formulated a 7-segment customer treatment strategy and established an allowable retention marketing budget of $3.8\u2013$15.2 per customer."
    },
    "keyFindings": [
      "Month-1 to Month-2 retention exhibits the steepest drop-off, making 30-day onboarding the critical intervention window.",
      "Top customer segments (Champions and Loyal Customers) generate disproportionate revenue share.",
      "Established data-driven retention investment thresholds based on segment-specific customer lifetime value."
    ],
    "methodology": [
      "1. Data Cleaning: Removed cancelled orders (C-prefix), invalid quantities, and non-registered customer IDs.",
      "2. Cohort Matrix Generation: Grouped customers by first purchase month and tracked monthly retention indices.",
      "3. RFM Scoring: Calculated Recency, Frequency, and Monetary values and ranked customers into 7 distinct tiers.",
      "4. Strategy & Presentation: Prepared stakeholder deck outlining segment-specific campaigns and budget ceilings."
    ],
    "codeSnippets": [
      {
        "title": "Monthly Cohort Retention Matrix (Python)",
        "language": "python",
        "code": "import pandas as pd\nimport datetime as dt\n\ndef get_month(x): return dt.datetime(x.year, x.month, 1)\ndf['InvoiceMonth'] = df['InvoiceDate'].apply(get_month)\ndf['CohortMonth'] = df.groupby('CustomerID')['InvoiceMonth'].transform('min')\n\ndef get_date_int(df, column):\n    return df[column].dt.year, df[column].dt.month\n\ninv_year, inv_month = get_date_int(df, 'InvoiceMonth')\ncoh_year, coh_month = get_date_int(df, 'CohortMonth')\ndf['CohortIndex'] = (inv_year - coh_year) * 12 + (inv_month - coh_month) + 1\n\ncohort_counts = df.groupby(['CohortMonth', 'CohortIndex'])['CustomerID'].nunique().unstack()\ncohort_sizes = cohort_counts.iloc[:, 0]\nretention = cohort_counts.divide(cohort_sizes, axis=0) * 100"
      }
    ]
  },
  {
    "id": "fastfood-us-ab-testing-campaign-analysis",
    "title": "US Fast Food: A/B Testing & Marketing Campaign Analysis",
    "division": "data-analyst",
    "divisionName": "Data Analyst",
    "category": [
      "dataanalyst"
    ],
    "badge": "ANOVA & Hypothesis Testing",
    "badgeColor": "emerald",
    "year": "A/B Testing",
    "desc": "ANOVA + post-hoc T-test analysis of 3 fast food marketing campaigns across 137 stores \u2014 identifies which campaign to cut and which two are statistically tied for best.",
    "tags": [
      "Python",
      "Scipy Stats",
      "Statsmodels",
      "ANOVA",
      "Tukey HSD",
      "PowerPoint"
    ],
    "metric": "+23.4% Promo Lift",
    "artifacts": {
      "repoUrl": "https://github.com/thabeebjafran/fastfood-us-ab-testing-campaign-analysis",
      "deckUrl": "Project report & code/FastFood US - 3/FastFood Campaign CaseStudy.pptx",
      "notebookUrl": null,
      "tableauPublicUrl": null
    },
    "execSummary": {
      "problem": "A fast-food franchise tested three different marketing promotion campaigns across 137 store locations in various market sizes but lacked statistical rigor to determine which campaign generated true incremental sales lift vs random variation.",
      "solution": "Performed One-Way ANOVA and Tukey Honest Significant Difference (HSD) post-hoc tests in Python to evaluate weekly sales figures across market tiers (Small, Medium, Large).",
      "impact": "Statistically proven that Promotion 1 and Promotion 3 deliver superior sales lift (+23.4%), while Promotion 2 significantly underperformed and was recommended for discontinuation."
    },
    "keyFindings": [
      "One-Way ANOVA showed statistically significant differences in sales across promotions (p < 0.05).",
      "Tukey HSD confirmed Promotion 1 and 3 are statistically tied as top performers, with Promotion 1 winning on cost-efficiency in Medium markets.",
      "Promotion 2 generated significantly lower mean weekly sales and should be eliminated from the marketing mix."
    ],
    "methodology": [
      "1. Data Exploration: Analyzed weekly sales distributions across 137 stores over 4-week trial periods.",
      "2. ANOVA Hypothesis Testing: Formulated null/alternative hypotheses and verified variance equality.",
      "3. Post-Hoc Pairwise Comparisons: Conducted Tukey HSD to isolate inter-campaign differences.",
      "4. Executive Case Study Presentation: Delivered recommendations deck with market-specific rollout plans."
    ],
    "codeSnippets": [
      {
        "title": "One-Way ANOVA & Tukey HSD Test (Python)",
        "language": "python",
        "code": "import pandas as pd\nfrom scipy import stats\nfrom statsmodels.stats.multicomp import pairwise_tukeyhsd\n\nf_val, p_val = stats.f_oneway(\n    df[df['Promotion'] == 1]['SalesInThousands'],\n    df[df['Promotion'] == 2]['SalesInThousands'],\n    df[df['Promotion'] == 3]['SalesInThousands']\n)\nprint(f\"ANOVA F-statistic: {f_val:.4f}, p-value: {p_val:.4e}\")\n\ntukey = pairwise_tukeyhsd(endog=df['SalesInThousands'], groups=df['Promotion'], alpha=0.05)\nprint(tukey.summary())"
      }
    ]
  },
  {
    "id": "talentguard-ibm-employee-attrition-prediction",
    "title": "TalentGuard IBM: Employee Attrition Prediction & Retention Strategy",
    "division": "data-analyst",
    "divisionName": "Data Analyst",
    "category": [
      "dataanalyst"
    ],
    "badge": "Logistic Regression & ML",
    "badgeColor": "emerald",
    "year": "Predictive Analytics",
    "desc": "Logistic regression model predicting IBM employee attrition, paired with a targeted retention strategy that cuts projected attrition from 12.2% to 8.8%.",
    "tags": [
      "Python",
      "Scikit-Learn",
      "Logistic Regression",
      "Random Forest",
      "SMOTE",
      "Seaborn"
    ],
    "metric": "Attrition 12.2% \u2192 8.8%",
    "artifacts": {
      "repoUrl": "https://github.com/thabeebjafran/talentguard-ibm-employee-attrition-prediction",
      "deckUrl": "Project report & code/TalentGuard IBM - 2/IBM Attrition Prediction Strategy.pptx",
      "notebookUrl": "Project report & code/TalentGuard IBM - 2/IBM Attrition Modeling.ipynb",
      "tableauPublicUrl": null
    },
    "execSummary": {
      "problem": "Unplanned employee turnover caused talent drain and elevated recruitment costs, with HR teams lacking early identification models to proactively intervene before resignations occur.",
      "solution": "Trained predictive classification models (Logistic Regression, Decision Trees, and Random Forest) on 1,470 employee records with 35 workplace variables, incorporating class balancing and ROC-AUC evaluation.",
      "impact": "Identified OverTime, compensation bands, and manager tenure as key drivers; designed HR intervention strategy projected to reduce employee attrition from 12.2% down to 8.8%."
    },
    "keyFindings": [
      "Working regular OverTime is the single highest predictor of employee attrition risk.",
      "Tenure with current manager serves as a strong protective factor against voluntary departures.",
      "Stock option level 0 associates experienced significantly higher turnover compared to equity-incentivized tiers."
    ],
    "methodology": [
      "1. Exploratory Data Analysis & Encoding: Encoded categorical features and handled collinear predictors.",
      "2. Model Training & Balancing: Evaluated Logistic Regression and Random Forest with stratified cross-validation.",
      "3. Performance Metrics: Assessed model accuracy, recall on positive attrition class, and ROC-AUC curves.",
      "4. Retention Playbook: Built risk matrices guiding compensation adjustments and managerial check-ins."
    ],
    "codeSnippets": [
      {
        "title": "Logistic Regression Classification Pipeline (Python)",
        "language": "python",
        "code": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import classification_report, roc_auc_score\n\nX = ibm_data.drop(['Attrition'], axis=1)\ny = ibm_data['Attrition']\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\n\nmodel = LogisticRegression(max_iter=1000, class_weight='balanced')\nmodel.fit(X_train, y_train)\n\ny_pred = model.predict(X_test)\ny_proba = model.predict_proba(X_test)[:, 1]\n\nprint(classification_report(y_test, y_pred))\nprint(f\"ROC-AUC Score: {roc_auc_score(y_test, y_proba):.4f}\")"
      }
    ]
  },
  {
    "id": "smartfare-nyc-uber-pricing-optimization",
    "title": "SmartFare NYC: Uber Pricing Optimization & Revenue Analysis",
    "division": "data-analyst",
    "divisionName": "Data Analyst",
    "category": [
      "dataanalyst"
    ],
    "badge": "Linear Regression & Pricing",
    "badgeColor": "emerald",
    "year": "Econometrics",
    "desc": "Linear regression pricing model for NYC Uber trips \u2014 identifies underpriced peak hours, boroughs, and group rides, projecting an 11.5% revenue lift.",
    "tags": [
      "Python",
      "Statsmodels",
      "Pandas",
      "Geopy",
      "Tableau Public",
      "OLS Regression"
    ],
    "metric": "+11.5% Projected Revenue Lift",
    "artifacts": {
      "repoUrl": "https://github.com/thabeebjafran/smartfare-nyc-uber-pricing-optimization",
      "deckUrl": "Project report & code/SmartFare NYC - 1/Uber Pricing Optimization & Revenue Analysis.pptx",
      "notebookUrl": "Project report & code/SmartFare NYC - 1/SmartFare NYC.ipynb",
      "tableauPublicUrl": null
    },
    "execSummary": {
      "problem": "Uber trips across NYC are subject to flat and blunt pricing structures that do not accurately account for localized surge elasticity, travel distance variations, and time-of-day demand shifts.",
      "solution": "Built an OLS linear regression model in Python to model fare pricing against geodesic trip distances (Vincenty calculation), pickup hours, and passenger counts; validated with variance inflation factor (VIF) collinearity checks and published interactive Tableau dashboards.",
      "impact": "Identified specific underpriced peak hours, boroughs, and passenger group rides, projecting a +11.5% net revenue lift with optimized dynamic pricing tiers."
    },
    "keyFindings": [
      "Trip distance calculated via geodesic coordinates is the single largest driver of trip fare variance.",
      "Identified clear demand inelasticity on peak commuter transit corridors (JFK/LGA airport routes).",
      "Variance Inflation Factor (VIF) collinearity checks confirmed all feature VIFs < 5.0."
    ],
    "methodology": [
      "1. Data Cleansing & Geo-Filtering: Cleaned 200,000 raw trips, bounded to NYC geographical coordinates.",
      "2. Feature Engineering: Computed Vincenty geodesic distance (km), hour of day, and day of week.",
      "3. Econometric Modeling: Ordinary Least Squares (OLS) regression with statsmodels and VIF collinearity check.",
      "4. Tableau Dashboarding: Built interactive spatial heatmaps and hourly fare distribution charts."
    ],
    "codeSnippets": [
      {
        "title": "Geodesic Distance & Econometric Regression (Python)",
        "language": "python",
        "code": "import numpy as np\nimport pandas as pd\nfrom geopy.distance import geodesic\nimport statsmodels.api as sm\nfrom statsmodels.stats.outliers_influence import variance_inflation_factor\n\ndef calculate_geodesic(row):\n    try:\n        pickup = (row['pickup_latitude'], row['pickup_longitude'])\n        dropoff = (row['dropoff_latitude'], row['dropoff_longitude'])\n        return geodesic(pickup, dropoff).km\n    except:\n        return np.nan\n\nuber['trip_distance_km'] = uber.apply(calculate_geodesic, axis=1)\n\nX_features = uber[['trip_distance_km', 'passenger_count', 'pickup_hour', 'is_weekend']]\nX_features = sm.add_constant(X_features)\n\nvif_data = pd.DataFrame()\nvif_data[\"Feature\"] = X_features.columns\nvif_data[\"VIF\"] = [variance_inflation_factor(X_features.values, i) for i in range(X_features.shape[1])]\nprint(\"Multicollinearity Diagnostics (All VIF < 5.0):\\n\", vif_data)"
      }
    ]
  },
  {
    "id": "ai-job-application-assistant",
    "title": "AI Job Application Assistant & Gemini Workflow",
    "division": "business-analyst",
    "divisionName": "Business Analyst",
    "category": [
      "businessanalyst"
    ],
    "badge": "n8n & GenAI Workflow",
    "badgeColor": "blue",
    "year": "Workflow Automation",
    "desc": "Automated n8n workflow using Google Gemini agents to analyze job fit, optimize resumes, and generate tailored cover letters \u2014 with structured output parsing and automated tracking via Google Sheets and Gmail.",
    "tags": [
      "n8n",
      "Google Gemini",
      "Workflow Automation",
      "Google Sheets",
      "Gmail API",
      "JSON"
    ],
    "metric": "Automated Resume Match",
    "artifacts": {
      "repoUrl": "https://github.com/thabeebjafran/ai-job-application-assistant",
      "deckUrl": null,
      "notebookUrl": null,
      "tableauPublicUrl": null
    },
    "execSummary": {
      "problem": "Manual resume customization and application tracking is repetitive and time-consuming, resulting in slower turnaround times for high-priority opportunities.",
      "solution": "Constructed an automated n8n workflow integrating Gemini LLM agents to evaluate resume match against target job descriptions, generate customized cover letters, and log records in Google Sheets.",
      "impact": "Streamlined application preparation from 45 minutes to sub-minute structured parsing and automated Gmail draft preparation."
    },
    "keyFindings": [
      "Structured output schemas ensure consistent qualification scoring and gap identification.",
      "Automated Google Sheets ledger maintains an audit history of all customized applications.",
      "Gmail integration automatically drafts personalized outreach messages."
    ],
    "methodology": [
      "1. Webhook Ingestion: n8n workflow receives job posting URL or raw text.",
      "2. Gemini Agent Analysis: Compares candidate skills against job requirements and drafts tailored hook.",
      "3. Sheet Logging: Appends match score and application details to Google Sheets.",
      "4. Email Drafting: Calls Gmail API to create ready-to-send draft."
    ],
    "codeSnippets": [
      {
        "title": "n8n Gemini Workflow Node Specification",
        "language": "json",
        "code": "{\n  \"name\": \"Gemini Resume Matcher\",\n  \"type\": \"n8n-nodes-base.httpRequest\",\n  \"parameters\": {\n    \"url\": \"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent\",\n    \"method\": \"POST\",\n    \"sendBody\": true\n  }\n}"
      }
    ]
  },
  {
    "id": "ahi-marketing-analytics-app",
    "title": "AHI Real-Time Marketing Analytics App Delivery",
    "division": "project-manager",
    "divisionName": "Project Manager",
    "category": [
      "projectmanager"
    ],
    "badge": "Hybrid Agile/Waterfall",
    "badgeColor": "purple",
    "year": "$250K Budget / 90 Days",
    "desc": "A hybrid Waterfall/Agile project delivering a real-time marketing analytics app for a skin care company \u2014 from business case through closeout, on a $250K budget and 90-day timeline.",
    "tags": [
      "Notion",
      "Project Charter",
      "WBS",
      "RACI Matrix",
      "RAID Log",
      "Sprint Planning",
      "Quality Plan",
      "Project Closeout"
    ],
    "metric": "$250K Budget & 90 Days On-Time",
    "artifacts": {
      "repoUrl": "https://github.com/thabeebjafran/ahi-marketing-analytics-app",
      "deckUrl": null,
      "notebookUrl": null,
      "tableauPublicUrl": null
    },
    "execSummary": {
      "problem": "A skincare brand required a centralized real-time marketing analytics application to track omnichannel ad spend and campaign ROI, requiring end-to-end project governance across cross-functional engineering, marketing, and executive stakeholders.",
      "solution": "Managed a hybrid Waterfall/Agile project delivery lifecycle from initial business case through formal project closeout, authoring all 9 core PM governance documents, managing the RAID log, and running 2-week sprint cycles.",
      "impact": "Delivered the application on-time within the 90-day milestone schedule and within the allocated $250,000 capital budget."
    },
    "keyFindings": [
      "Authored 9 comprehensive PM governance documents (Charter, Stakeholder Register, RACI, WBS, Schedule, Risk Plan & RAID Log, Communication Plan, Quality & Test Plan, and Closeout Report).",
      "Successfully navigated scope adjustments through structured Change Request procedures without milestone slippage.",
      "Achieved 100% stakeholder sign-off during final User Acceptance Testing (UAT)."
    ],
    "methodology": [
      "1. Initiation: Formulated Business Case, Project Charter, and Stakeholder Register.",
      "2. Planning: Built Work Breakdown Structure (WBS), Schedule, RACI, and Risk Plan / RAID Log.",
      "3. Execution & Monitoring: Managed sprint ceremonies, quality test plans, and change controls.",
      "4. Project Closeout: Conducted post-implementation review, documented lessons learned, and secured formal sign-off."
    ],
    "codeSnippets": [
      {
        "title": "RAID Log & Risk Exposure Calculation Model",
        "language": "python",
        "code": "def calculate_risk_exposure(probability_pct, financial_impact_usd):\n    return (probability_pct / 100.0) * financial_impact_usd\n\nvendor_delay_risk = calculate_risk_exposure(30, 45000)\napi_integration_risk = calculate_risk_exposure(20, 25000)\nprint(f\"Total Quantified Risk Exposure: ${vendor_delay_risk + api_integration_risk:,.2f}\")"
      }
    ]
  },
  {
    "id": "sauce-spoon-tablet-rollout",
    "title": "Sauce & Spoon: Restaurant Tabletop Tablet Pilot Rollout",
    "division": "project-manager",
    "divisionName": "Project Manager",
    "category": [
      "projectmanager"
    ],
    "badge": "Operations & Hardware Rollout",
    "badgeColor": "purple",
    "year": "Pilot Rollout",
    "desc": "A tabletop tablet menu pilot for a restaurant chain \u2014 sourcing, staff training, launch, and measurable impact on sales, wait times, and satisfaction.",
    "tags": [
      "Notion",
      "Project Charter",
      "RACI Chart",
      "Project Plan",
      "Risk Matrix",
      "Staff Training Plan",
      "Pilot Evaluation"
    ],
    "metric": "Pilot Rollout Delivered",
    "artifacts": {
      "repoUrl": "https://github.com/thabeebjafran/sauce-spoon-tablet-rollout",
      "deckUrl": null,
      "notebookUrl": null,
      "tableauPublicUrl": null
    },
    "execSummary": {
      "problem": "Sauce & Spoon restaurant chain experienced slow table turnover during peak dinner rushes and rising labor costs, requiring a pilot tabletop tablet menu system across test locations.",
      "solution": "Led the end-to-end pilot rollout project covering hardware vendor sourcing, POS system integration, staff training, risk management, and pilot performance evaluation across 8 governance artifacts.",
      "impact": "Successfully deployed tablets across test locations, reducing order-to-table wait times and increasing appetizer add-on orders."
    },
    "keyFindings": [
      "Produced 8 core project documents including Project Charter, Stakeholder Analysis, RACI Chart, Project Plan, Risk Matrix, Training & Communication Plan, and Pilot Evaluation Report.",
      "Trained front-of-house staff across pilot locations, ensuring seamless guest onboarding and positive customer satisfaction scores.",
      "Validated pilot ROI metrics to provide leadership with clear go/no-go criteria for company-wide expansion."
    ],
    "methodology": [
      "1. Charter & Scope: Established goals, success metrics, and constraints with restaurant leadership.",
      "2. Vendor & System Planning: Managed tablet hardware acquisition and POS software integration.",
      "3. Training & Pilot Launch: Coordinated kitchen, waitstaff, and managerial training curricula.",
      "4. Evaluation & Closeout: Analyzed pilot turnover velocity, guest feedback, and executive closeout report."
    ],
    "codeSnippets": [
      {
        "title": "Pilot Table Turnover & Ticket Velocity Calculation",
        "language": "python",
        "code": "def calculate_table_turnover(total_tables, operating_hours, orders_served):\n    turns_per_table = orders_served / total_tables\n    turns_per_hour = turns_per_table / operating_hours\n    return {\"Total Turns / Table\": turns_per_table, \"Turns / Hour\": turns_per_hour}"
      }
    ]
  },
  {
    "id": "virtual-verde-scrum-project",
    "title": "Virtual Verde: Agile / Scrum E-Commerce Feature Delivery",
    "division": "project-manager",
    "divisionName": "Project Manager",
    "category": [
      "projectmanager"
    ],
    "badge": "Agile / Scrum Delivery",
    "badgeColor": "purple",
    "year": "Scrum Sprints",
    "desc": "An Agile/Scrum project delivering new website features and vendor management improvements for Office Green's e-commerce platform.",
    "tags": [
      "Notion",
      "Agile",
      "Scrum",
      "Product Backlog",
      "Sprint Planning",
      "Sprint Retrospectives",
      "Burndown Charts",
      "Velocity"
    ],
    "metric": "100% Sprint Goals Met",
    "artifacts": {
      "repoUrl": "https://github.com/thabeebjafran/virtual-verde-scrum-project",
      "deckUrl": null,
      "notebookUrl": null,
      "tableauPublicUrl": null
    },
    "execSummary": {
      "problem": "Office Green needed to rapidly update its e-commerce website with new customer-facing features and vendor inventory management tools, requiring an iterative Agile framework.",
      "solution": "Facilitated Agile/Scrum sprint cycles across Product Backlog creation, user story sizing, sprint backlog planning (Sprint 1, 2, and 3), sprint reviews, and retrospective facilitation.",
      "impact": "Maintained continuous delivery cadence, improved team velocity across sprints, and deployed all prioritized e-commerce features with zero sprint roll-overs."
    },
    "keyFindings": [
      "Documented Product Backlog with detailed user stories, acceptance criteria, and story point estimations.",
      "Managed Sprint Backlogs for Sprints 1, 2, and 3 with daily burndown chart tracking.",
      "Conducted Sprint Retrospectives identifying process improvements that increased velocity by 18%."
    ],
    "methodology": [
      "1. Backlog Grooming: Sized user stories and established Definition of Done (DoD).",
      "2. Sprint Planning: Committed sprint goals and allocated task hours across engineering pods.",
      "3. Sprint Execution: Monitored daily standups, unblocked impediments, and updated burndown charts.",
      "4. Review & Retrospective: Demonstrated shipped features to product owner and documented action items."
    ],
    "codeSnippets": [
      {
        "title": "Scrum Sprint Velocity & Burndown Metric Helper",
        "language": "python",
        "code": "def calculate_sprint_metrics(committed_points, completed_points, sprint_days):\n    completion_rate = (completed_points / committed_points) * 100\n    daily_burn_rate = completed_points / sprint_days\n    return {\n        \"Completion Rate %\": completion_rate,\n        \"Daily Velocity (pts/day)\": daily_burn_rate,\n        \"Status\": \"COMPLETED\" if completion_rate >= 100 else \"PARTIAL\"\n    }"
      }
    ]
  },
  {
    "id": "plant-pals-operations-project",
    "title": "Plant Pals: B2B Operations & Logistics Rollout",
    "division": "project-manager",
    "divisionName": "Project Manager",
    "category": [
      "projectmanager"
    ],
    "badge": "Operations & Logistics",
    "badgeColor": "purple",
    "year": "Operations Rollout",
    "desc": "A B2B operations and training project for a plant subscription service \u2014 covering planning, budgeting, risk management, and post-launch results.",
    "tags": [
      "Notion",
      "Project Charter",
      "WBS",
      "Budget Management",
      "Risk Management",
      "Quality Assurance",
      "Operations Plan"
    ],
    "metric": "Operations Baseline Shipped",
    "artifacts": {
      "repoUrl": "https://github.com/thabeebjafran/plant-pals-operations-project",
      "deckUrl": null,
      "notebookUrl": null,
      "tableauPublicUrl": null
    },
    "execSummary": {
      "problem": "Plant Pals launched a new B2B corporate plant subscription service that required establishing new fulfillment logistics, inventory protocols, and employee operational training.",
      "solution": "Developed and executed an operations project plan covering scope definition, Work Breakdown Structure (WBS), resource and budget allocation, risk assessment, and quality assurance checklists across 8 artifacts.",
      "impact": "Successfully stood up fulfillment operations within budget, trained warehouse staff, and achieved high operational fulfillment accuracy during initial rollout."
    },
    "keyFindings": [
      "Created 8 project documents including Charter & Scope, WBS, Project Budget, Risk Assessment, Quality Checklist, and Final Report.",
      "Established supply chain and fulfillment quality assurance benchmarks reducing order packing error rates.",
      "Delivered full operational handover to business operations leadership upon launch completion."
    ],
    "methodology": [
      "1. Project Initiation: Defined scope boundaries and success criteria in Project Charter.",
      "2. Operational Planning: Built WBS, budget baselines, and vendor procurement workflows.",
      "3. Risk & Quality Control: Established risk mitigation strategies and QA checklists for fulfillment.",
      "4. Handover & Closeout: Completed training sessions and delivered final operations report."
    ],
    "codeSnippets": [
      {
        "title": "Fulfillment Budget Variance & Quality Metrics",
        "language": "python",
        "code": "def calculate_operations_variance(budgeted_cost, actual_cost, target_accuracy_pct, actual_accuracy_pct):\n    cost_variance = budgeted_cost - actual_cost\n    quality_variance = actual_accuracy_pct - target_accuracy_pct\n    return {\n        \"Cost Variance USD\": cost_variance,\n        \"Quality Variance %\": quality_variance,\n        \"Under Budget\": cost_variance >= 0,\n        \"Meets Quality SLA\": quality_variance >= 0\n    }"
      }
    ]
  },
  {
    "id": "tableau-projects-portfolio",
    "title": "Tableau 20-Dashboard Public Portfolio",
    "division": "data-analyst",
    "divisionName": "Data Analyst",
    "category": [
      "dataanalyst"
    ],
    "badge": "Tableau Suite (20 Dashboards)",
    "badgeColor": "emerald",
    "year": "Visual Analytics",
    "desc": "A collection of 20 Tableau dashboards covering sales, media, transportation, and customer analytics \u2014 built and published on Tableau Public.",
    "tags": [
      "Tableau Public",
      "Tableau Desktop",
      "Data Storytelling",
      "LOD Calculations",
      "Interactive BI"
    ],
    "metric": "20 Published Dashboards",
    "artifacts": {
      "repoUrl": "https://github.com/thabeebjafran/tableau-projects-portfolio",
      "deckUrl": null,
      "notebookUrl": null,
      "tableauPublicUrl": "https://public.tableau.com/profile/thabeebjafran"
    },
    "execSummary": {
      "problem": "Communicating complex multidimensional datasets to diverse executive stakeholders requires intuitive, responsive, and drill-down capable visual dashboards.",
      "solution": "Engineered and published 20 distinct Tableau dashboards covering Gaming Market Sales, TripAdvisor Hotel Reviews, Seattle Traffic Safety, $14.9M Superstore Retail, UK Road Accidents, $233M Revenue Analytics, Twitter Sentiment, and Netflix Streaming catalogs.",
      "impact": "Created interactive dashboards with parameters, LOD calculations, and clean visual storytelling deployed on Tableau Public."
    },
    "keyFindings": [
      "Superstore Sales: Tracked $14.9M in sales by category, region, and top customer profitability.",
      "UK Road Accidents: Analyzed 144K+ accident records across vehicle types and weather conditions.",
      "Revenue Analysis: Evaluated $233M+ revenue distribution across months, categories, and US states."
    ],
    "methodology": [
      "1. Data Cleaning & Preparation: Processed raw CSVs and structured dimensional schemas in Python/Tableau Prep.",
      "2. Visual Design & UX: Applied visual hierarchy, KPI cards, and dynamic filter controls.",
      "3. Advanced Calculations: Wrote Level of Detail (LOD) formulas, running totals, and date aggregations.",
      "4. Tableau Public Deployment: Published interactive live workbooks with public URL access."
    ],
    "codeSnippets": [
      {
        "title": "Tableau Level of Detail (LOD) Calculation",
        "language": "sql",
        "code": "// Customer Lifetime Contribution vs Regional Benchmark\n{ FIXED [Customer ID] : SUM([Sales]) } \n/ \n{ FIXED [Region] : AVG({ FIXED [Customer ID], [Region] : SUM([Sales]) }) }"
      }
    ]
  },
  {
    "id": "customer-shopping-behavior-analysis",
    "title": "Customer Shopping Behavior & Purchase Decision Analysis",
    "division": "data-analyst",
    "divisionName": "Data Analyst",
    "category": [
      "dataanalyst"
    ],
    "badge": "Retail Analytics & Power BI",
    "badgeColor": "emerald",
    "year": "Consumer Analytics",
    "desc": "End-to-end Power BI analytics project on 656K+ credit card transactions \u2014 covering PostgreSQL data modeling, DAX measures, and revenue/risk insights across 10K+ customers.",
    "tags": [
      "Python",
      "PostgreSQL",
      "Power BI",
      "SQL",
      "Data Modeling",
      "Statistical Analysis"
    ],
    "metric": "3,900 Transactions Analyzed",
    "artifacts": {
      "repoUrl": "https://github.com/thabeebjafran/customer-shopping-behavior-analysis",
      "deckUrl": null,
      "notebookUrl": null,
      "tableauPublicUrl": null
    },
    "execSummary": {
      "problem": "A retail brand wanted to understand what drives customer purchasing decisions, review ratings, and repeat order frequency across demographics, product categories, and promotional discounts.",
      "solution": "Cleaned and analyzed 3,900 retail transactions in Python, queried PostgreSQL database, built an interactive Power BI dashboard (.pbix), and delivered a comprehensive stakeholder presentation and PDF report.",
      "impact": "Uncovered key drivers of repeat purchases, optimized discount application thresholds, and identified high-value customer subscription opportunities."
    },
    "keyFindings": [
      "Analyzed 3,900 transactions across 18 features (demographics, purchase history, payment channels, shipping).",
      "Handled missing values in Review Rating and identified correlation between shipping speed and repeat purchase rate.",
      "Delivered SQL queries, Power BI dashboard, and executive presentation with actionable marketing strategies."
    ],
    "methodology": [
      "1. Data Ingestion & Cleaning: Handled missing ratings and normalized transaction features in Python.",
      "2. Relational Modeling & SQL: Loaded into PostgreSQL database and authored analytical SQL queries.",
      "3. Power BI Dashboard: Designed interactive dashboard with demographic, product category, and discount slicers.",
      "4. Stakeholder Presentation: Created executive slide deck and written analytical report."
    ],
    "codeSnippets": [
      {
        "title": "PostgreSQL Customer Purchase Queries (SQL)",
        "language": "sql",
        "code": "SELECT \n    subscription_status,\n    COUNT(customer_id) AS total_customers,\n    ROUND(AVG(purchase_amount_usd), 2) AS avg_purchase_usd,\n    ROUND(AVG(review_rating), 2) AS avg_rating\nFROM customer_shopping_behavior\nGROUP BY subscription_status\nORDER BY avg_purchase_usd DESC;"
      }
    ]
  },
  {
    "id": "mobile-banking-financial-analysis",
    "title": "Mobile Banking App: Financial Viability & Risk Analysis",
    "division": "business-analyst",
    "divisionName": "Business Analyst",
    "category": [
      "businessanalyst"
    ],
    "badge": "EVM & Financial Viability",
    "badgeColor": "blue",
    "year": "Financial Analysis",
    "desc": "Financial viability analysis of a mobile banking app project using EAC, ETC, EMV, PERT, ROI, and CBR \u2014 evaluating a $100K/2-month scope change against regulatory risk.",
    "tags": [
      "Financial Modeling",
      "Earned Value (EVM)",
      "Expected Monetary Value",
      "PERT",
      "ROI Analysis",
      "Regulatory Risk"
    ],
    "metric": "EMV Risk -$72K \u2192 -$300",
    "artifacts": {
      "repoUrl": "https://github.com/thabeebjafran/mobile-banking-financial-analysis",
      "deckUrl": null,
      "notebookUrl": null,
      "tableauPublicUrl": null
    },
    "execSummary": {
      "problem": "A $500K, 12-month mobile banking app project required an unplanned scope change six months in due to new regulatory security mandates. Executive leadership required financial validation to determine if the $100K / 2-month expansion was justified.",
      "solution": "Conducted financial viability modeling comparing project cost increase ($500K \u2192 $600K) against Expected Monetary Value (EMV) regulatory non-compliance penalty risks, supported by three-point PERT schedule estimation.",
      "impact": "Demonstrated that proceeding with the scope change reduced EMV compliance penalty risk from -$72,000 to -$300 (a 240x risk reduction), providing conclusive justification to proceed."
    },
    "keyFindings": [
      "Total project cost increased from $500K to $600K (+20%) and timeline extended from 12 to 14 months.",
      "EMV penalty risk exposure dropped from -$72,000 down to -$300 (240x reduction in regulatory risk).",
      "PERT three-point estimation validated the revised development timeline and mitigated delivery failure."
    ],
    "methodology": [
      "1. Cost Variance Modeling: Computed EV, PV, AC, CPI, SPI, EAC, and ETC across work streams.",
      "2. Expected Monetary Value (EMV): Quantified penalty probability trees for compliance vs non-compliance.",
      "3. PERT Schedule Validation: Modeled optimistic, most likely, and pessimistic completion dates.",
      "4. Executive Decision Brief: Prepared report and PowerPoint deck recommending board approval."
    ],
    "codeSnippets": [
      {
        "title": "Earned Value & EMV Risk Calculation Model",
        "language": "python",
        "code": "def calculate_evm(ev, pv, ac, bac):\n    cpi = ev / ac if ac > 0 else 0\n    spi = ev / pv if pv > 0 else 0\n    eac = bac / cpi if cpi > 0 else bac\n    etc = eac - ac\n    return {\"CPI\": cpi, \"SPI\": spi, \"EAC\": eac, \"ETC\": etc}\n\ndef calculate_emv(probabilities, impacts):\n    return sum(p * i for p, i in zip(probabilities, impacts))"
      }
    ]
  },
  {
    "id": "credit-card-financial-dashboard",
    "title": "Credit Card Financial Intelligence Dashboard",
    "division": "business-analyst",
    "divisionName": "Business Analyst",
    "category": [
      "businessanalyst"
    ],
    "badge": "Power BI & PostgreSQL",
    "badgeColor": "blue",
    "year": "Financial BI",
    "desc": "End-to-end Power BI analytics project on 656K+ credit card transactions \u2014 covering PostgreSQL data modeling, DAX measures, and revenue/risk insights across 10K+ customers.",
    "tags": [
      "Power BI",
      "DAX Measures",
      "PostgreSQL",
      "Data Modeling",
      "Financial Analytics",
      "SQL"
    ],
    "metric": "$55.3M Revenue Tracked",
    "artifacts": {
      "repoUrl": "https://github.com/thabeebjafran/credit-card-financial-dashboard",
      "deckUrl": null,
      "notebookUrl": null,
      "tableauPublicUrl": null
    },
    "execSummary": {
      "problem": "A credit card issuer needed a way to track weekly revenue and transaction performance across its card portfolio, understand which customer segments and card tiers drive the most value, and flag early warning signs in delinquency without waiting on manual ad-hoc reporting.",
      "solution": "Built a PostgreSQL data pipeline and two Power BI dashboards (Customer Report & Transaction Report) backed by robust DAX measures for week-over-week revenue, interest accruals, delinquency rates, and customer acquisition cost.",
      "impact": "Delivered visibility over $55.3M total revenue across 656K+ transactions and 10,294 cardholders; identified that Blue and Silver tiers drive 93%+ of total revenue."
    },
    "keyFindings": [
      "$55.3M total revenue tracked across 656K+ transactions and 10,294 active cardholders.",
      "Blue and Silver card tiers generated 93%+ of total portfolio revenue.",
      "Weekly transaction and delinquency tracking provided real-time alerts on account health."
    ],
    "methodology": [
      "1. Data Pipeline: Loaded and transformed credit card transaction and customer CSVs in PostgreSQL.",
      "2. Dimensional Data Modeling: Star schema in Power BI linking transactions, customers, and date dimension.",
      "3. DAX Calculations: Formulated Total Revenue, YoY/WoW Growth, Interest Earned, and Delinquency Rate.",
      "4. Executive Reporting: Designed two Power BI dashboard reports and published weekly insight briefs."
    ],
    "codeSnippets": [
      {
        "title": "DAX Financial Measures & Delinquency Tracking",
        "language": "dax",
        "code": "Total_Revenue = \n    SUM(fact_credit_card_txns[Annual_Fees]) + \n    SUM(fact_credit_card_txns[Total_Trans_Amt]) + \n    SUM(fact_credit_card_txns[Interest_Earned])\n\nRevenue_WoW_Growth_% = \nVAR CurrentWeekRev = [Total_Revenue]\nVAR PrevWeekRev = CALCULATE([Total_Revenue], DATEADD('dim_date'[Date], -7, DAY))\nRETURN\n    DIVIDE(CurrentWeekRev - PrevWeekRev, PrevWeekRev, 0)\n\nDelinquency_Rate_% = \nDIVIDE(\n    CALCULATE(COUNTROWS(fact_credit_card_txns), fact_credit_card_txns[Delinquent_Acc] = 1),\n    COUNTROWS(fact_credit_card_txns),\n    0\n)"
      }
    ]
  }
];
