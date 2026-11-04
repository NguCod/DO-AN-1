# ARCHITECTURE DESIGN

## 1. System Overview
A full-stack web application consisting of a React-based Frontend, a Python FastAPI Backend, and a PostgreSQL database, integrated with a Large Language Model (LLM) for intelligent customer consultation.

## 2. Technology Stack

| Layer | Technology | Reason |
|---|---|---|
| **Frontend** | React + TypeScript + Vite | Fast development, strong typing, component-based. |
| **Styling** | Tailwind CSS | Rapid UI development, utility-first. |
| **Backend** | Python + FastAPI | High performance, easy async/await support, excellent typing. |
| **Database** | PostgreSQL | Robust relational data management. |
| **ORM** | SQLAlchemy | Pythonic database interaction. |
| **Migrations** | Alembic | Managed database schema evolution. |
| **AI** | OpenAI API (or similar LLM) | State-of-the-art reasoning and natural language capabilities. |
| **Containerization**| Docker + Docker Compose | Consistent environments across development and deployment. |
| **Testing** | Vitest (FE), Pytest (BE), Playwright (E2E) | Industry-standard testing tools. |

## 3. High-Level Architecture (Data Flow)

### 3.1. Standard User Flow (E-commerce)
1. **User** interacts with **Frontend** (React).
2. **Frontend** makes REST API calls via **API Adapter/Service**.
3. **Backend** (FastAPI) receives request $\to$ validates via **Schemas (Pydantic)**.
4. **Backend** interacts with **Database** (PostgreSQL) via **Repositories/ORM**.
5. **Backend** returns **JSON Response** to **Frontend**.

### 3.2. AI Chatbot Flow (Consultation)
1. **User** sends message to **Chatbot UI**.
2. **Frontend** sends message + `conversation_id` to **Backend Chat API**.
3. **Backend** retrieves **Conversation History** and relevant **Business Context** (e.g., product data).
4. **Backend** constructs a **Prompt** (System Prompt + Context + User Prompt).
5. **Backend** calls **LLM API** (e.g., OpenAI).
6. **LLM** generates response $\to$ **Backend** validates/parses (Structured Output).
7. **Backend** saves history $\to$ returns response to **Frontend**.

## 4. Module Decomposition

- **`frontend/`**: SPA (Single Page Application) handling all client-side logic and UI.
- **`backend/`**: Modular FastAPI application.
  - `api/`: Endpoint definitions (Routers).
  - `services/`: Business logic orchestrators.
  - `repositories/`: Data access layer (CRUD).
  - `models/`: SQLAlchemy database models.
  - `schemas/`: Pydantic DTOs (Data Transfer Objects).
  - `ai/`: LLM service, prompt management, and parsing.
- **`02_Data/`**: Source of truth for database design and seed data.
- **`prompts/`**: Versioned system prompts and prompt templates.
- **`docs/`**: Project documentation and contracts.
