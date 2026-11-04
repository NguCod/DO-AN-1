# COURSE REQUIREMENTS EXTRACT

## 1. Overview
- **Course:** Đồ án 1 - Chatbot AI + CSDL + Vibe Coding
- **Format:** Project-Based Learning (PBL)
- **Duration:** 10 weeks (40 periods)
- **Group Size:** 3–5 students

## 2. Core Deliverables (End of Semester)
- **Web Chatbot Application:** LLM API integration, intuitive UI, smooth interaction.
- **Relational Database:** Normalized tables, data integrity, clear query processes.
- **Secure Backend:** Query & AI orchestration, hidden API keys, injection protection.
- **Documentation & Deployment:** Versioned system prompts, test cases, Git repo, and demo video.

## 3. Weekly Milestones & Requirements

### Phase 1: Analysis & Data
- **Week 1: Project Kickoff & Requirement Analysis**
  - **Tasks:** Problem selection, User analysis, Use Case definition, 5–8 User Stories, $\ge$ 15 sample questions.
  - **Roles:** Leader, Data, AI, Backend, Frontend/QA.
  - **Deliverables:** `01_Project_Proposal.md`, Use Case diagram, 15 sample questions list.
- **Week 2: Data Preparation & DB Design**
  - **Tasks:** Data collection/cleaning, ERD design, Table/PK/FK/Index design, $\ge$ 3 business queries.
  - **Deliverables:** `02_Data/` folder, ERD, `schema.sql`, `data_dictionary.xlsx`.

### Phase 2: AI Foundation
- **Week 3: AI API Integration & Prompt Design**
  - **Tasks:** LLM API integration (token/context/temp/timeout management), System Prompt design, Chat REST API, secure API key management.
  - **Deliverables:** Chatbot prototype via Backend, `system_prompt_v1.md`, 20-question test table.
- **Week 4: AI & DB Connection**
  - **Tasks:** Full loop (UI $\to$ Backend $\to$ DB $\to$ Prompt $\to$ Response), context-aware prompting (no hallucination), controlled query execution.
  - **Deliverables:** Backend-DB connected, data flow diagram, API Contract, short demo video.

### Phase 3: Product Development
- **Week 5: Controlled Vibe Coding & MVP**
  - **Tasks:** Vibe Coding workflow (Spec $\to$ Design $\to$ AI Code $\to$ Review $\to$ Test $\to$ Commit), UI completion (chat, loading, history, errors).
  - **Deliverables:** Stable MVP, Git repo with meaningful commits, `README.md`.
- **Week 6: Testing & AI Quality Evaluation**
  - **Tasks:** $\ge$ 30 standard test questions (correct, multi-condition, edge cases), error classification (data, retrieval, prompt, expression), Prompt upgrade to v2.
  - **Deliverables:** `test_cases.csv`, test report, `system_prompt_v2.md`, comparison table.

### Phase 4: Technical Refinement
- **Week 7: RAG Expansion OR Business Optimization**
  - **Advanced (RAG):** Chunking, embedding, vector DB, source citation.
  - **Basic (DB):** Complex query optimization, multi-criteria filtering, context management.
  - **Deliverables:** Working extension module, technical comparison report.
- **Week 8: Security, Cost & Stability**
  - **Tasks:** Security testing (SQLi, Prompt Injection), backend authorization, stability (timeout, retry, rate limiting, logging), cost estimation (100 vs 1000 turns).
  - **Deliverables:** Security test report, Security Checklist, API cost estimation table.

### Phase 5: Deployment & Documentation
- **Week 9: Demo Deployment & Documentation**
  - **Tasks:** Deploy to Local/Docker/Cloud, full regression testing, code freeze, demo video.
  - **Deliverables:** Git release tag, installation guide, slides, demo video.
- **Week 10: Demo & Defense**
  - **Tasks:** Live demo with real DB, technical Q&A (SQL, Prompt, AI code, Security).
  - **Deliverables:** Complete Git repo, DB, Prompt v2, full report, backup video.

## 4. Grading Rubric (Key Criteria)
- **Database:** Accurate queries, legitimate data source, 100% reproducible via script.
- **AI Quality:** Data-grounded answers, refusal when info is missing, Prompt v2 management.
- **Vibe Coding:** Clear module decomposition, good review/debug, deep code understanding.
- **Testing:** $\ge$ 30 diverse test cases, SQL/regression comparison data.
- **Security:** Backend authorization, hidden keys, protection against SQLi & Prompt Injection.
