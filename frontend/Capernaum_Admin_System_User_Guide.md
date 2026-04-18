# Capernaum Admin System: Comprehensive User Guide

Welcome to the **Capernaum Admin System**, an enterprise-grade command center designed for BPO (Business Process Outsourcing), IT operations, and client management. This system provides real-time telemetry into agent performance, client relations, and operational quality.

---

## 1. System Overview
The Capernaum Admin System is a centralized platform to manage the end-to-end lifecycle of business operations. It integrates CRM (Customer Relationship Management), Quality Assurance, Employee Performance, and Secure Data Management into a single, cohesive interface.

---

## 2. Module Breakdown

### 📊 Dashboard (Executive Command Center)
**What it does:** Provides a high-level bird's-eye view of the entire organization's health.
**How it works:** Aggregates data from all other modules (CRM, QA, Personnel) to display real-time KPIs (Key Performance Indicators).
**How to use:**
- Use the **Stats Row** to quickly check active clients, call volumes, and average QA scores.
- Monitor the **Activity Stream** to see live updates on agent accomplishments or critical flags.
- **Example:** If you see the "Avg QA Score" drop below 80%, you should navigate to the QA Hub for a detailed audit.

### 🎯 CRM Pipeline
**What it does:** Manages the sales and client onboarding lifecycle.
**How it works:** Visualizes potential business deals through stages: *New Leads*, *Contacted*, *Negotiation*, and *Closed*.
**How to use:**
- Drag and drop (or update status) to move clients through the funnel.
- Use the **Pipeline Value** metric to forecast upcoming revenue.
- **Example:** A lead "Apex Solutions" is currently in "Negotiation". Once the contract is signed, move it to "Closed" to trigger the onboarding workflow.

### 🎧 QA Hub (Quality Assurance Hub)
**What it does:** Monitors and audits service quality (calls, chats, or tasks).
**How it works:** Uses a "Strategic Quality Audit" interface where evaluators listen to recordings and fill out compliance checksheets.
**How to use:**
- **Audit Logs:** View a list of all recent sessions.
- **Audit Session:** Click "Audit Session" to open the forensic audio interface, listen to the stream, and pass/fail specific compliance markers.
- **Calibration:** Use the **Target Calibration** slider to manually adjust scores based on specific institutional nuances.
- **Example:** If an agent missed the "Mandatory Greeting Protocol," mark it as "Fail" in the checksheet, which will automatically recalculate their Quality Engagement Score.

### 👥 Employee Performance & Master
**What it does:** Manages personnel data and tracks individual productivity.
**How it works:** Stores employee profiles (Department, Role, Salary) and tracks their performance metrics over time.
**How to use:**
- **Employee Performance:** Compare agent throughput against targets.
- **Employee Master:** Use this to add new hires, assign them to departments, and set their system roles.
- **Term:** **Coaching Pulse** — A metric indicating how many coaching sessions an agent has active.

### 🔐 Client Portal & Credentials
**What it does:** Manages secure access and relationship data for your enterprise clients.
**How it works:** Stores client-specific configuration, linkage data, and system credentials.
**How to use:**
- **Client Linkage:** Link specific projects or departments to a client account.
- **Credentials:** Securely manage API keys or portal logins required for client-specific software.

### 📂 Data Vault & Report Upload
**What it does:** Secure repository for operational data and bulk uploads.
**How it works:** Handles large CSV/Excel uploads and stores forensic logs of all system transactions.
**How to use:**
- Use **Daily Report Upload** to sync local operation logs with the cloud system.
- Access the **Data Vault** to retrieve historical records for compliance audits.

---

## 3. Glossary of Terms

| Term | Meaning | Example |
| :--- | :--- | :--- |
| **KPI** | Key Performance Indicator (success metric) | "Handled Calls per Hour" |
| **SLA** | Service Level Agreement (contractual target) | "90% of calls answered in 20 seconds" |
| **Forensic Audit** | A deep-dive review of a single interaction | Listening to a 5-minute call recording |
| **Calibration** | Adjusting a score to ensure fairness | Sliding the QA score from 88 to 92 after review |
| **Coaching Loop** | A scheduled feedback session for an agent | Training an agent on "Active Listening" |
| **Telemetry** | Real-time data transmission and monitoring | Watching the "Active Call" counter change |

---

## 4. Step-by-Step Guide for Clients

**Scenario: You want to audit your project's quality.**

1.  **Login** to the Admin Portal.
2.  Navigate to the **QA Hub** via the sidebar.
3.  Filter the **Engagement Audit Log** by your project name (e.g., "Voice Support Q2").
4.  Locate an audit record and click the **Headphones Icon (Audit Session)**.
5.  Review the **Checksheet** to see why the agent received their score.
6.  If the score seems too harsh, click the **Award Icon (Adjust Parameters)**, slide the **Target Calibration** to the desired number, and provide a **Rationale**.
7.  If the agent needs improvement, click **Schedule Coaching Loop** to book a training session with their team lead.

---

**Scenario: Onboarding a new lead.**

1.  Open the **CRM Pipeline**.
2.  Click **"Add Client"** from the Quick Actions on the Dashboard.
3.  Enter the client details. They will appear in the **New Leads** column.
4.  As discussions progress, move them to **Negotiation**.
5.  Once the partnership is official, move them to **Closed**.
6.  Go to **Client Linkage** to assign service representatives to this new account.

---

## 5. Security & Compliance
- **Audit Logs:** Every action taken in the system (deleting a record, changing a score) is logged with a timestamp and the administrator's ID.
- **Data Encryption:** All sensitive files in the **Data Vault** and **Client Credentials** are encrypted at rest.
- **Role-Based Access:** Standard agents cannot access the **System Settings** or **Employee Master**; these are restricted to "Super Admin" roles.
