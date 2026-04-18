# Capernaum Admin System: Enterprise Operational Manual
**Version 3.0 | Production-Ready Demonstration Guide**

Welcome to the definitive architectural and operational guide for the **Capernaum Admin System**. This document provides a granular breakdown of every module and modal within the ecosystem, designed to facilitate a high-stakes client demonstration.

---

## 🏛️ SECTION 1: MAIN ARCHITECTURE (Control Hub)

### 1.1 Command Dashboard
*   **Purpose:** The central nervous system for real-time telemetry and executive decision-making.
*   **Workflow:** Monitor the aggregated "Force Stats" (Active Clients, Revenue, Capacity). Use the "Executive Action Cluster" for rapid navigation to critical tasks.
*   **Interactive Analytics:**
    *   **Revenue Velocity Chart:** Tracks financial throughput vs. historical benchmarks.
    *   **System Health Monitor:** Displays uptime and operation-critical signals.
*   **Example:** Navigate here at the start of a session to identify if the **Aggregated Capacity** (Staff slots) is sufficient for the current **Active Client** count.

### 1.2 Signal Stream (Notifications)
*   **Purpose:** The high-frequency alert relay for system events, security breaches, and operational updates.
*   **Workflow:** Review categorized notifications (System, Account, Security).
*   **Functional Actions:**
    *   **Mark as Resolved:** Clears the alert from the active stream.
    *   **Priority Filtering:** Sift through "Critical" vs "Informational" pings.
*   **Example:** A notification "High Latency in Data Vault" triggers a tactical review of the Secure Data Vault module.

---

## 🤝 SECTION 2: ENTERPRISE CLIENT HUB (Lifecycle Management)

### 2.1 Linkage Matrix (Client Linkage)
*   **Purpose:** Managing the complex web of relationships between diverse client entities.
*   **Workflow:** Use the matrix to link parent corporations to sub-units.
*   **Modals:**
    *   **Entity Linkage Modal:** Allows selecting a Parent ID and child Branch ID to establish a hierarchy.
*   **Example:** Linking "BlueStar Global" (Parent) to "BlueStar Mumbai" (Subsidiary) to ensure unified billing and reporting.

### 2.2 Client Management (Client Portal)
*   **Purpose:** The primary registry for all active corporate partners.
*   **Workflow:** Provision, search, or edit client profiles.
*   **Modals:**
    *   **Client Provisioning Modal:** Enter the "Legal Entity Name", "Assigned Manager", and "SLA Tier".
*   **Example:** To onboard a new vendor, open the **Provisioning Modal**, input "Nexura Tech", select "Strategic Tier", and click **Propagate Record**.

### 2.3 Access Control (Client Credentials)
*   **Purpose:** Secure management of enterprise gateway credentials and API keys.
*   **Workflow:** Securely view or rotate credentials for client portal access.
*   **Modals:**
    *   **Credential Intelligence Modal:** Displays masked credentials with a "Decrypt" (Eye icon) function for legitimate audit.
*   **Example:** Use the **Rotate Key** action to invalidate a legacy API key and issue a new encrypted token for a client.

---

## 🎯 SECTION 3: OPERATIONAL EXCELLENCE (The BPO Engine)

### 3.1 CRM Pipeline
*   **Purpose:** A visual Kanban system for growth and lead acquisition.
*   **Workflow:** Drag-and-drop leads across the funnel stages: *Discovery*, *Verification*, *Negotiation*, *Closed*.
*   **Modals:**
    *   **Lead Intelligence Modal:** Deep-dive into lead identity, deal value, and funnel trajectory.
*   **Example:** Moving "Nexus BPO" from *Negotiation* to *Closed* instantly updates the **Revenue Velocity** on the Dashboard.

### 3.2 QA Forensic Hub
*   **Purpose:** Granular quality auditing for voice and data interactions.
*   **Workflow:** Select a pending audit, review the session details.
*   **Modals:**
    *   **QA Forensic Audit Modal:** Contains an interactive Checks-and-Balances table (Greeting, Solution, Script adherence).
    *   **Recalibration Slider:** Manually override scores based on qualitative nuance.
*   **Example:** If an agent missed a required disclaimer, toggle the "Compliance" switch to *Fail* in the Checks-and-Balances table.

### 3.3 Performance Analytics (Employee Performance)
*   **Purpose:** Analyzing individual agent throughput and quality metrics.
*   **Workflow:** View performance charts showing Target vs. Actual results.
*   **Modals:**
    *   **Operational Target strategy Modal:** Allows administrators to push new KPIs (e.g., increasing the Hourly Call Target).
*   **Example:** If an agent is lagging behind, use the **Target Strategy Modal** to adjust their quota and trigger a "Recalibration Alert" on their dashboard.

### 3.4 Secure Data Vault
*   **Purpose:** Management and playback of forensic recordings and sensitive operational data.
*   **Workflow:** Search for a specific Interaction ID and initiate the secure playback stream.
*   **Modals:**
    *   **Strategic Data Vault Player:** A custom audio interface with a "Precision Progress Thumb" and timestamp telemetry.
*   **Example:** Locate interactions for "Priya Sharma" under UID: V-8812 and play the file to verify the service quality reported in the QA Hub.

---

## 🏛️ SECTION 4: INSTITUTIONAL REPOSITORY (Master Data)

### 4.1 Personnel Master (Employee Master)
*   **Purpose:** The definitive registry for the human workforce.
*   **Workflow:** Register, audit, or decommission personnel.
*   **Modals:**
    *   **Identity Audit Modal:** Displays the personnel image, UID, and "Strategic Protocol Role".
    *   **Security Reset Modal:** Triggers a forced password recalibration for the asset.
*   **Example:** When a new agent joins, use the **Register Personnel** button to create their "Institutional Identity".

### 4.2 Departmental Master
*   **Purpose:** Defining the organizational boundaries and departmental structures.
*   **Workflow:** Add new departments (Units) and assign them to specific Clusters.
*   **Modals:**
    *   **Unit Configuration Modal:** Define the unit nomenclature and assign a Department Head.
*   **Example:** Create a new "Global Sales Vector" unit for the regional expansion project.

### 4.3 Role & Permission Matrix
*   **Purpose:** Granular RBAC (Role-Based Access Control) management.
*   **Workflow:** Define security protocols for Roles (Admin, Manager, Agent).
*   **Modals:**
    *   **Protocol Mapping Modal:** Toggle 20+ specific permissions (Read, Write, Delete) for a chosen Role ID.
*   **Example:** Revoke "Full Deletion Rights" from the *Manager* role to ensure institutional data integrity.

### 4.4 Shift Orchestration (Shift Management)
*   **Purpose:** Temporal duty cycle design and workforce assignment.
*   **Workflow:** Create Morning, Afternoon, and Night shifts. Monitor vacancy vs occupancy.
*   **Modals:**
    *   **Duty Cycle Configuration Modal:** Define the Start/End times and maximum buffer capacity.
    *   **Assignment Intelligence Modal:** Link specific personnel to a duty cycle (edit status/reassign).
*   **Example:** If the "Morning Shift" is at 100% capacity, use the **Assignment Modal** to move "Rajesh Kumar" to the "Afternoon Shift".

---

## 🧬 SECTION 5: OPERATIONAL INTELLIGENCE (Forensics & Logging)

### 5.1 Performance Ledger (Daily Report)
*   **Purpose:** Manual or automated ingest of daily performance summaries.
*   **Workflow:** Upload interaction reports via the "Bulk Ingest Gateway".
*   **Modals:**
    *   **Ingest Verification Modal:** Confirms the data schema matches the institutional requirement.
*   **Example:** Uploading the "Mumbai-Unit-Q1-Report.csv" propagates metrics to the Performance Analytics dashboard.

### 5.2 Live Activity Trace (Activity Monitoring)
*   **Purpose:** Real-time surveillance of session authenticity and system state.
*   **Workflow:** Watch the high-frequency stream of "Ping" and "Login" events.
*   **Functional Actions:**
    *   **Force Disconnect:** Terminate a suspicious session immediately.
*   **Example:** Spotting a login from an unexpected IP leads an administrator to use the **Force Disconnect** protocol for that session.

### 5.3 Forensic Audit Trails (Audit Logs)
*   **Purpose:** The immutable history of every administrative action.
*   **Workflow:** Filter logs by Temporal Node (Time), Identity (User), or Module.
*   **Modals:**
    *   **Security Trace Decomposition Modal:** Provides a deep "Operation Intelligence Brief" with high-contrast visibility on the exact change made.
*   **Example:** Searching for "SLA Update" logs reveals which administrator increased the rule threshold, ensuring accountability.

---

## ⚙️ SECTION 6: CORE LOGIC & SECURITY

### 6.1 Identity Settings (Account)
*   **Purpose:** Personal profile and authentication management for the administrator.
*   **Workflow:** Update display nomenclature, contact details, and gateway password.
*   **Example:** Changing the "Public Nomenclature" to "Senior Ops Orchestrator" for better role clarity.

### 6.2 Global Parameters (System Settings)
*   **Purpose:** Defining the universal "Physics" of the application.
*   **Workflow:** Set dark/light modes, update the **Capernaum Gold** branding, and configure email SMTP gateways.
*   **Example:** Switching on "Maintenance Mode" to suspend client gateway access durante a scheduled infrastructure upgrade.

### 6.3 Intelligence Support (Help)
*   **Purpose:** The institutional knowledge base.
*   **Workflow:** Access documentation or initiate a "Tactical Support Ticket".
*   **Example:** A new manager navigates here to learn how to use the **Forensic Audit Trails** for the first time.

---

## 📐 SECTION 7: OPERATIONS GLOSSARY

| Term | Institutional Definition |
| :--- | :--- |
| **Telemetry** | Real-time visual data from a running operation. |
| **Forensic Audit** | A deep, non-repudiable review of a single data point or session. |
| **Asset** | Any personnel or hardware unit registered in the system. |
| **Provisioning** | The act of creating a new digital identity for an entity. |
| **Recalibration** | Manually adjusting tactical targets or compliance scores. |
| **Trace** | A historical record of a system or user event. |

---
**Manual End | Capernaum Strategic Systems Division**
