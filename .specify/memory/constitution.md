# Acebadminton Constitution

## Sync Impact Report
<!--
Version change: 0.1.0 (Initial)
Added sections: Core Principles, Technical Stack, Development Workflow, Governance
Removed sections: None
-->

## Core Principles

### I. Test-First (NON-NEGOTIABLE)
Tests written, User approved, Tests fail, Then implement. Red-Green-Refactor cycle strictly enforced.

### II. AI-Grounding
Chatbot advice MUST be grounded in DB. NO hallucination. Refuse when information absent.

### III. Security-By-Design
Backend authorization required. API keys hidden. Protection against SQL injection and Prompt injection mandatory.

### IV. Incremental Development
Vibe Coding workflow: Spec -> Design -> AI Code -> Review -> Test -> Commit. Meaningful commits required.

### V. Simplicity
Minimum code solving requirement. No features beyond request. Senior engineer standard.

## Technical Standards

### Database
SQLite used for development. PRISMA ORM for interaction. 100% reproducible via scripts.

### Backend
FastAPI. REST API. Modular structure: api, services, repositories, models, schemas, ai.

### Frontend
React + TypeScript + Vite. Tailwind CSS. Component-based. Accessible.

## Governance

Constitution supersedes all other practices. Amendments require documentation, approval, migration plan. All PRs/reviews must verify compliance.

**Version**: 0.1.0 | **Ratified**: 2026-11-24 | **Last Amended**: 2026-11-24