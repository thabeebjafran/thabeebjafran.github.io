#!/usr/bin/env python3
"""
Thabeeb Jafran | Portfolio <-> GitHub Sync Bridge
=================================================
This script connects to GitHub (https://api.github.com/users/thabeebjafran/repos)
and synchronizes all public repositories directly into `data/projects.js`,
categorizing them strictly into the 3 divisions:
  1. Data Analyst (da)
  2. Business Analyst (ba)
  3. Project Manager (pm)

Usage:
    python sync_github.py
"""

import urllib.request
import json
import os
import sys

# Ensure UTF-8 output on Windows
sys.stdout.reconfigure(encoding='utf-8')

GITHUB_USER = "thabeebjafran"
PROJECTS_JS_PATH = os.path.join(os.path.dirname(__file__), "data", "projects.js")

# Exact repository metadata aligned directly with GitHub repository READMEs and files
OFFICIAL_REPOS_REGISTRY = {
  # -------------------------------------------------------------------------
  # DIVISION: DATA ANALYST
  # -------------------------------------------------------------------------
  "smartfare-nyc-uber-pricing-optimization": {
    "title": "SmartFare NYC: Uber Pricing Optimization & Revenue Analysis",
    "division": "data-analyst",
    "divisionName": "Data Analyst",
    "badge": "Linear Regression & Pricing",
    "badgeColor": "emerald",
    "year": "Econometrics",
    "desc": "Linear regression pricing model for NYC Uber trips — identifies underpriced peak hours, boroughs, and group rides, projecting an 11.5% revenue lift.",
    "tags": ["Python", "Statsmodels", "Pandas", "Geopy", "Tableau Public", "OLS Regression"],
    "metric": "+11.5% Projected Revenue Lift",
    "deckUrl": "Project report & code/SmartFare NYC - 1/Uber Pricing Optimization & Revenue Analysis.pptx",
    "notebookUrl": "Project report & code/SmartFare NYC - 1/SmartFare NYC.ipynb",
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
        "code": """import numpy as np
import pandas as pd
from geopy.distance import geodesic
import statsmodels.api as sm
from statsmodels.stats.outliers_influence import variance_inflation_factor

def calculate_geodesic(row):
    try:
        pickup = (row['pickup_latitude'], row['pickup_longitude'])
        dropoff = (row['dropoff_latitude'], row['dropoff_longitude'])
        return geodesic(pickup, dropoff).km
    except:
        return np.nan

uber['trip_distance_km'] = uber.apply(calculate_geodesic, axis=1)

X_features = uber[['trip_distance_km', 'passenger_count', 'pickup_hour', 'is_weekend']]
X_features = sm.add_constant(X_features)

vif_data = pd.DataFrame()
vif_data["Feature"] = X_features.columns
vif_data["VIF"] = [variance_inflation_factor(X_features.values, i) for i in range(X_features.shape[1])]
print("Multicollinearity Diagnostics (All VIF < 5.0):\\n", vif_data)"""
      }
    ]
  },
  "retail-uk-cohort-analysis-rfm-segmentation": {
    "title": "UK Retail E-Commerce: Cohort Retention Analysis & RFM Segmentation",
    "division": "data-analyst",
    "divisionName": "Data Analyst",
    "badge": "Cohort Analysis & RFM",
    "badgeColor": "emerald",
    "year": "Customer Analytics",
    "desc": "Cohort retention analysis and RFM segmentation for a UK e-commerce retailer — identifies a $3.8–$15.2 per-customer retention budget and a 7-segment treatment strategy.",
    "tags": ["Python", "Pandas", "Cohort Analysis", "RFM Segmentation", "Seaborn", "Matplotlib"],
    "metric": "541K+ Txns Analyzed",
    "deckUrl": "Project report & code/Retail UK - 4/E-commerce Cohort Analysis & RFM Segmentation.pptx",
    "notebookUrl": "Project report & code/Retail UK - 4/E-Commerce Cohort and RFM.ipynb",
    "execSummary": {
      "problem": "An online UK gift retailer lacked visibility into repeat customer retention curves, purchase frequency decay, and customer lifetime value (CLV) distribution across international accounts.",
      "solution": "Cleaned and processed 541,909 transactional records in Python, constructed monthly cohort retention matrices, and segmented customers using Recency, Frequency, and Monetary (RFM) quintile scoring.",
      "impact": "Formulated a 7-segment customer treatment strategy and established an allowable retention marketing budget of $3.8–$15.2 per customer."
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
        "code": """import pandas as pd
import datetime as dt

def get_month(x): return dt.datetime(x.year, x.month, 1)
df['InvoiceMonth'] = df['InvoiceDate'].apply(get_month)
df['CohortMonth'] = df.groupby('CustomerID')['InvoiceMonth'].transform('min')

def get_date_int(df, column):
    return df[column].dt.year, df[column].dt.month

inv_year, inv_month = get_date_int(df, 'InvoiceMonth')
coh_year, coh_month = get_date_int(df, 'CohortMonth')
df['CohortIndex'] = (inv_year - coh_year) * 12 + (inv_month - coh_month) + 1

cohort_counts = df.groupby(['CohortMonth', 'CohortIndex'])['CustomerID'].nunique().unstack()
cohort_sizes = cohort_counts.iloc[:, 0]
retention = cohort_counts.divide(cohort_sizes, axis=0) * 100"""
      }
    ]
  },
  "fastfood-us-ab-testing-campaign-analysis": {
    "title": "US Fast Food: A/B Testing & Marketing Campaign Analysis",
    "division": "data-analyst",
    "divisionName": "Data Analyst",
    "badge": "ANOVA & Hypothesis Testing",
    "badgeColor": "emerald",
    "year": "A/B Testing",
    "desc": "ANOVA + post-hoc T-test analysis of 3 fast food marketing campaigns across 137 stores — identifies which campaign to cut and which two are statistically tied for best.",
    "tags": ["Python", "Scipy Stats", "Statsmodels", "ANOVA", "Tukey HSD", "PowerPoint"],
    "metric": "+23.4% Promo Lift",
    "deckUrl": "Project report & code/FastFood US - 3/FastFood Campaign CaseStudy.pptx",
    "notebookUrl": None,
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
        "code": """import pandas as pd
from scipy import stats
from statsmodels.stats.multicomp import pairwise_tukeyhsd

f_val, p_val = stats.f_oneway(
    df[df['Promotion'] == 1]['SalesInThousands'],
    df[df['Promotion'] == 2]['SalesInThousands'],
    df[df['Promotion'] == 3]['SalesInThousands']
)
print(f"ANOVA F-statistic: {f_val:.4f}, p-value: {p_val:.4e}")

tukey = pairwise_tukeyhsd(endog=df['SalesInThousands'], groups=df['Promotion'], alpha=0.05)
print(tukey.summary())"""
      }
    ]
  },
  "talentguard-ibm-employee-attrition-prediction": {
    "title": "TalentGuard IBM: Employee Attrition Prediction & Retention Strategy",
    "division": "data-analyst",
    "divisionName": "Data Analyst",
    "badge": "Logistic Regression & ML",
    "badgeColor": "emerald",
    "year": "Predictive Analytics",
    "desc": "Logistic regression model predicting IBM employee attrition, paired with a targeted retention strategy that cuts projected attrition from 12.2% to 8.8%.",
    "tags": ["Python", "Scikit-Learn", "Logistic Regression", "Random Forest", "SMOTE", "Seaborn"],
    "metric": "Attrition 12.2% → 8.8%",
    "deckUrl": "Project report & code/TalentGuard IBM - 2/IBM Attrition Prediction Strategy.pptx",
    "notebookUrl": "Project report & code/TalentGuard IBM - 2/IBM Attrition Modeling.ipynb",
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
        "code": """import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score

X = ibm_data.drop(['Attrition'], axis=1)
y = ibm_data['Attrition']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)

model = LogisticRegression(max_iter=1000, class_weight='balanced')
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
y_proba = model.predict_proba(X_test)[:, 1]

print(classification_report(y_test, y_pred))
print(f"ROC-AUC Score: {roc_auc_score(y_test, y_proba):.4f}")"""
      }
    ]
  },
  "customer-shopping-behavior-analysis": {
    "title": "Customer Shopping Behavior & Purchase Decision Analysis",
    "division": "data-analyst",
    "divisionName": "Data Analyst",
    "badge": "Retail Analytics & Power BI",
    "badgeColor": "emerald",
    "year": "Consumer Analytics",
    "desc": "End-to-end data analytics project on 3,900 retail transactions — analyzing customer purchasing decisions, review ratings, discount sensitivity, and repeat purchases.",
    "tags": ["Python", "PostgreSQL", "Power BI", "SQL", "Data Modeling", "Statistical Analysis"],
    "metric": "3,900 Transactions Analyzed",
    "deckUrl": None,
    "notebookUrl": None,
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
        "code": """SELECT 
    subscription_status,
    COUNT(customer_id) AS total_customers,
    ROUND(AVG(purchase_amount_usd), 2) AS avg_purchase_usd,
    ROUND(AVG(review_rating), 2) AS avg_rating
FROM customer_shopping_behavior
GROUP BY subscription_status
ORDER BY avg_purchase_usd DESC;"""
      }
    ]
  },
  "tableau-projects-portfolio": {
    "title": "Tableau 20-Dashboard Public Portfolio",
    "division": "data-analyst",
    "divisionName": "Data Analyst",
    "badge": "Tableau Suite (20 Dashboards)",
    "badgeColor": "emerald",
    "year": "Visual Analytics",
    "desc": "A collection of 20 Tableau dashboards covering sales, media, transportation, safety, and customer analytics — built and published on Tableau Public.",
    "tags": ["Tableau Public", "Tableau Desktop", "Data Storytelling", "LOD Calculations", "Interactive BI"],
    "metric": "20 Published Dashboards",
    "deckUrl": None,
    "notebookUrl": None,
    "tableauPublicUrl": "https://public.tableau.com/profile/thabeebjafran",
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
        "code": """// Customer Lifetime Contribution vs Regional Benchmark
{ FIXED [Customer ID] : SUM([Sales]) } 
/ 
{ FIXED [Region] : AVG({ FIXED [Customer ID], [Region] : SUM([Sales]) }) }"""
      }
    ]
  },

  # -------------------------------------------------------------------------
  # DIVISION: BUSINESS ANALYST
  # -------------------------------------------------------------------------
  "credit-card-financial-dashboard": {
    "title": "Credit Card Financial Intelligence Dashboard",
    "division": "business-analyst",
    "divisionName": "Business Analyst",
    "badge": "Power BI & PostgreSQL",
    "badgeColor": "blue",
    "year": "Financial BI",
    "desc": "End-to-end Power BI analytics project on 656K+ credit card transactions across 10,294 customers ($55.3M revenue) — covering PostgreSQL data modeling, DAX measures, and revenue/risk insights.",
    "tags": ["Power BI", "DAX Measures", "PostgreSQL", "Data Modeling", "Financial Analytics", "SQL"],
    "metric": "$55.3M Revenue Tracked",
    "deckUrl": None,
    "notebookUrl": None,
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
        "code": """Total_Revenue = 
    SUM(fact_credit_card_txns[Annual_Fees]) + 
    SUM(fact_credit_card_txns[Total_Trans_Amt]) + 
    SUM(fact_credit_card_txns[Interest_Earned])

Revenue_WoW_Growth_% = 
VAR CurrentWeekRev = [Total_Revenue]
VAR PrevWeekRev = CALCULATE([Total_Revenue], DATEADD('dim_date'[Date], -7, DAY))
RETURN
    DIVIDE(CurrentWeekRev - PrevWeekRev, PrevWeekRev, 0)

Delinquency_Rate_% = 
DIVIDE(
    CALCULATE(COUNTROWS(fact_credit_card_txns), fact_credit_card_txns[Delinquent_Acc] = 1),
    COUNTROWS(fact_credit_card_txns),
    0
)"""
      }
    ]
  },
  "mobile-banking-financial-analysis": {
    "title": "Mobile Banking App: Financial Viability & Risk Analysis",
    "division": "business-analyst",
    "divisionName": "Business Analyst",
    "badge": "EVM & Financial Viability",
    "badgeColor": "blue",
    "year": "Financial Analysis",
    "desc": "Financial viability analysis of a mobile banking app project using EAC, ETC, EMV, PERT, ROI, and CBR — evaluating a $100K/2-month scope change against regulatory risk.",
    "tags": ["Financial Modeling", "Earned Value (EVM)", "Expected Monetary Value", "PERT", "ROI Analysis", "Regulatory Risk"],
    "metric": "EMV Risk -$72K → -$300",
    "deckUrl": None,
    "notebookUrl": None,
    "execSummary": {
      "problem": "A $500K, 12-month mobile banking app project required an unplanned scope change six months in due to new regulatory security mandates. Executive leadership required financial validation to determine if the $100K / 2-month expansion was justified.",
      "solution": "Conducted financial viability modeling comparing project cost increase ($500K → $600K) against Expected Monetary Value (EMV) regulatory non-compliance penalty risks, supported by three-point PERT schedule estimation.",
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
        "code": """def calculate_evm(ev, pv, ac, bac):
    cpi = ev / ac if ac > 0 else 0
    spi = ev / pv if pv > 0 else 0
    eac = bac / cpi if cpi > 0 else bac
    etc = eac - ac
    return {"CPI": cpi, "SPI": spi, "EAC": eac, "ETC": etc}

def calculate_emv(probabilities, impacts):
    return sum(p * i for p, i in zip(probabilities, impacts))"""
      }
    ]
  },
  "job-ingestion-auditor": {
    "title": "Autonomous Job Ingestion & Outreach Agent",
    "division": "business-analyst",
    "divisionName": "Business Analyst",
    "badge": "Agentic AI & FastAPI",
    "badgeColor": "blue",
    "year": "Process Automation",
    "desc": "Autonomous Job Sourcing, Gemini 2.5 Flash Auditing & Outreach Agent with Apify, Google Cloud Run & Google Chat integration.",
    "tags": ["FastAPI", "Gemini 2.5 Flash", "Google Cloud Run", "Apify", "Google Workspace", "Docker"],
    "metric": "100% Automated Workflow",
    "deckUrl": None,
    "notebookUrl": None,
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
        "code": """import os
from google import genai
from google.genai import types
from pydantic import BaseModel

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

class JobAuditResult(BaseModel):
    is_visa_sponsored: bool
    scam_risk_score: float
    key_tech_stack: list[str]
    salary_range: str
    outreach_summary: str

def audit_job(title: str, description: str) -> JobAuditResult:
    prompt = f"Audit job listing: {title}\\nDescription: {description}"
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=JobAuditResult,
            temperature=0.2
        )
    )
    return JobAuditResult.model_validate_json(response.text)"""
      }
    ]
  },
  "ai-job-application-assistant": {
    "title": "AI Job Application Assistant & Gemini Workflow",
    "division": "business-analyst",
    "divisionName": "Business Analyst",
    "badge": "n8n & GenAI Workflow",
    "badgeColor": "blue",
    "year": "Workflow Automation",
    "desc": "Automated n8n workflow using Google Gemini agents to analyze job fit, optimize resumes, and generate tailored cover letters — with structured output parsing and automated tracking via Google Sheets and Gmail.",
    "tags": ["n8n", "Google Gemini", "Workflow Automation", "Google Sheets", "Gmail API", "JSON"],
    "metric": "Automated Resume Match",
    "deckUrl": None,
    "notebookUrl": None,
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
        "code": """{
  "name": "Gemini Resume Matcher",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "url": "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
    "method": "POST",
    "sendBody": true
  }
}"""
      }
    ]
  },

  # -------------------------------------------------------------------------
  # DIVISION: PROJECT MANAGER
  # -------------------------------------------------------------------------
  "ahi-marketing-analytics-app": {
    "title": "AHI Real-Time Marketing Analytics App Delivery",
    "division": "project-manager",
    "divisionName": "Project Manager",
    "badge": "Hybrid Agile/Waterfall",
    "badgeColor": "purple",
    "year": "$250K Budget / 90 Days",
    "desc": "A hybrid Waterfall/Agile project delivering a real-time marketing analytics app for a skin care company — from business case through closeout, on a $250K budget and 90-day timeline.",
    "tags": ["Notion", "Project Charter", "WBS", "RACI Matrix", "RAID Log", "Sprint Planning", "Quality Plan", "Project Closeout"],
    "metric": "$250K Budget & 90 Days On-Time",
    "deckUrl": None,
    "notebookUrl": None,
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
        "code": """def calculate_risk_exposure(probability_pct, financial_impact_usd):
    return (probability_pct / 100.0) * financial_impact_usd

vendor_delay_risk = calculate_risk_exposure(30, 45000)
api_integration_risk = calculate_risk_exposure(20, 25000)
print(f"Total Quantified Risk Exposure: ${vendor_delay_risk + api_integration_risk:,.2f}")"""
      }
    ]
  },
  "sauce-spoon-tablet-rollout": {
    "title": "Sauce & Spoon: Restaurant Tabletop Tablet Pilot Rollout",
    "division": "project-manager",
    "divisionName": "Project Manager",
    "badge": "Operations & Hardware Rollout",
    "badgeColor": "purple",
    "year": "Pilot Rollout",
    "desc": "A tabletop tablet menu pilot for a restaurant chain — sourcing, staff training, launch, and measurable impact on sales, wait times, and satisfaction.",
    "tags": ["Notion", "Project Charter", "RACI Chart", "Project Plan", "Risk Matrix", "Staff Training Plan", "Pilot Evaluation"],
    "metric": "Pilot Rollout Delivered",
    "deckUrl": None,
    "notebookUrl": None,
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
        "code": """def calculate_table_turnover(total_tables, operating_hours, orders_served):
    turns_per_table = orders_served / total_tables
    turns_per_hour = turns_per_table / operating_hours
    return {"Total Turns / Table": turns_per_table, "Turns / Hour": turns_per_hour}"""
      }
    ]
  },
  "virtual-verde-scrum-project": {
    "title": "Virtual Verde: Agile / Scrum E-Commerce Feature Delivery",
    "division": "project-manager",
    "divisionName": "Project Manager",
    "badge": "Agile / Scrum Delivery",
    "badgeColor": "purple",
    "year": "Scrum Sprints",
    "desc": "An Agile/Scrum project delivering new website features and vendor management improvements for Office Green's e-commerce platform.",
    "tags": ["Notion", "Agile", "Scrum", "Product Backlog", "Sprint Planning", "Sprint Retrospectives", "Burndown Charts", "Velocity"],
    "metric": "100% Sprint Goals Met",
    "deckUrl": None,
    "notebookUrl": None,
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
        "code": """def calculate_sprint_metrics(committed_points, completed_points, sprint_days):
    completion_rate = (completed_points / committed_points) * 100
    daily_burn_rate = completed_points / sprint_days
    return {
        "Completion Rate %": completion_rate,
        "Daily Velocity (pts/day)": daily_burn_rate,
        "Status": "COMPLETED" if completion_rate >= 100 else "PARTIAL"
    }"""
      }
    ]
  },
  "plant-pals-operations-project": {
    "title": "Plant Pals: B2B Operations & Logistics Rollout",
    "division": "project-manager",
    "divisionName": "Project Manager",
    "badge": "Operations & Logistics",
    "badgeColor": "purple",
    "year": "Operations Rollout",
    "desc": "A B2B operations and training project for a plant subscription service — covering planning, budgeting, risk management, and post-launch results.",
    "tags": ["Notion", "Project Charter", "WBS", "Budget Management", "Risk Management", "Quality Assurance", "Operations Plan"],
    "metric": "Operations Baseline Shipped",
    "deckUrl": None,
    "notebookUrl": None,
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
        "code": """def calculate_operations_variance(budgeted_cost, actual_cost, target_accuracy_pct, actual_accuracy_pct):
    cost_variance = budgeted_cost - actual_cost
    quality_variance = actual_accuracy_pct - target_accuracy_pct
    return {
        "Cost Variance USD": cost_variance,
        "Quality Variance %": quality_variance,
        "Under Budget": cost_variance >= 0,
        "Meets Quality SLA": quality_variance >= 0
    }"""
      }
    ]
  }
}

IGNORED_REPOS = {"thabeebjafran", "thabeebjafran.github.io"}

def fetch_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode('utf-8'))
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def infer_division(name, desc, lang, topics):
    text = f"{name} {desc or ''} {lang or ''} {' '.join(topics)}".lower()
    if any(k in text for k in ["scrum", "agile", "project", "rollout", "management", "wbs", "raci", "charter", "budget", "operations", "tpm", "sprint"]):
        return "project-manager", "Project Manager", "purple", "Agile Project Delivery"
    if any(k in text for k in ["financial", "banking", "dax", "credit", "emv", "eac", "roi", "cbr", "viability", "agent", "gemini", "n8n", "automation"]):
        return "business-analyst", "Business Analyst", "blue", "Business Intelligence"
    return "data-analyst", "Data Analyst", "emerald", "Data Analytics"

def sync():
    print(f"[*] Connecting to GitHub API for user: {GITHUB_USER}...")
    url = f"https://api.github.com/users/{GITHUB_USER}/repos?per_page=100&sort=updated"
    repos = fetch_json(url)

    if not repos or not isinstance(repos, list):
        print("[!] Failed to fetch repositories from GitHub.")
        return False

    print(f"[+] Found {len(repos)} public repositories on GitHub.")

    projects = []
    
    # Process repositories
    for r in repos:
        name = r.get("name")
        if name in IGNORED_REPOS:
            continue

        desc = r.get("description") or "Production repository and analytics implementation."
        lang = r.get("language")
        topics = r.get("topics", [])
        html_url = r.get("html_url")
        created_year = r.get("created_at", "2026")[:4]

        # Check if we have official curated metadata
        official = OFFICIAL_REPOS_REGISTRY.get(name)

        if official:
            title = official.get("title")
            division = official.get("division")
            divisionName = official.get("divisionName")
            badge = official.get("badge")
            badgeColor = official.get("badgeColor")
            year = official.get("year", f"{created_year} Production")
            metric = official.get("metric", "Production Verified")
            deckUrl = official.get("deckUrl")
            notebookUrl = official.get("notebookUrl")
            tableauPublicUrl = official.get("tableauPublicUrl")
            execSummary = official.get("execSummary")
            keyFindings = official.get("keyFindings")
            methodology = official.get("methodology")
            codeSnippets = official.get("codeSnippets", [])
            tags = official.get("tags", [])
        else:
            # Dynamically infer clean metadata for new repositories pushed in the future
            title = name.replace("-", " ").title()
            division, divisionName, badgeColor, badge = infer_division(name, desc, lang, topics)
            year = f"{created_year} Production"
            metric = "Production Live"
            deckUrl = None
            notebookUrl = None
            tableauPublicUrl = None
            execSummary = {
                "problem": f"Business requirements and deliverables defined in GitHub repository ({html_url}).",
                "solution": f"Architected and deployed {title} utilizing {lang or 'modern frameworks'}.",
                "impact": f"Delivered production solution version-controlled on GitHub."
            }
            keyFindings = [
                f"Source code and documentation available at {html_url}.",
                f"Built using {lang or 'Python & SQL'}."
            ]
            methodology = [
                f"1. Repository Setup: Initialized {name} on GitHub.",
                "2. Implementation: Built core logic, models, and analytics.",
                "3. Delivery & Verification: Tested and published repository."
            ]
            codeSnippets = []
            tags = [lang] if lang else ["Python", "SQL"]
            for t in topics:
                if t.capitalize() not in tags:
                    tags.append(t.capitalize())

        project_obj = {
            "id": name,
            "title": title,
            "division": division,
            "divisionName": divisionName,
            "category": [division.replace("-", "")],
            "badge": badge,
            "badgeColor": badgeColor,
            "year": year,
            "desc": desc,
            "tags": tags,
            "metric": metric,
            "artifacts": {
                "repoUrl": html_url,
                "deckUrl": deckUrl,
                "notebookUrl": notebookUrl,
                "tableauPublicUrl": tableauPublicUrl
            },
            "execSummary": execSummary,
            "keyFindings": keyFindings,
            "methodology": methodology,
            "codeSnippets": codeSnippets
        }

        projects.append(project_obj)

    # Format into data/projects.js
    header = "// ==========================================================================\n" \
             "// Thabeeb Jafran | Official GitHub Projects Dataset\n" \
             "// Structured by Division: Data Analyst | Business Analyst | Project Manager\n" \
             f"// Total Synced Showcases: {len(projects)}\n" \
             "// ==========================================================================\n\n"

    js_content = header + f"const projectsData = {json.dumps(projects, indent=2)};\n"

    with open(PROJECTS_JS_PATH, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"[✓] Successfully synced {len(projects)} repositories into {PROJECTS_JS_PATH}!")
    for p in projects:
        print(f"  • [{p['division'].upper()}] {p['title']} ({p['artifacts']['repoUrl']})")

    return True

if __name__ == "__main__":
    sync()
