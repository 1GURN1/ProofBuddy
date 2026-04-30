# ProofBuddy

ProofBuddy is a writing integrity and writing support platform built for two audiences:

- Students get live writing feedback, document versioning, process-log replay, citation checks, and an educational AI-risk panel that explains patterns without accusing the writer.
- Educators get evidence-based review reports that highlight signals worth discussing, compare current work against prior samples, audit citations, and generate follow-up questions grounded in the submission.

The project is intentionally designed around cautious language. It does not try to produce a single "AI verdict." Instead, it surfaces interpretable signals, context, and next-step guidance.

## What the App Does

### Student experience

- Sign up and sign in as a student
- Create and manage writing documents
- Write inside a live editor with automatic analysis after enough content is present
- Save document versions over time
- Capture process-log events for replay and review
- View a full writing report with grammar, style, clarity, mechanics, thesis alignment, paragraph structure, citation checks, and AI-risk education
- Approve, decline, or revoke process-log sharing requests from educators

### Educator experience

- Sign up and sign in as an educator using an institutional email
- Submit an assignment prompt, rubric, student submission, previous writing sample, and course AI policy
- Generate a structured integrity review with prompt alignment observations, writing consistency observations, possible signals with alternative explanations, follow-up questions, and recommended next steps
- Save and review past educator analyses in a dashboard
- Request access to a student's process log through expiring share links

## Product Principles

- No accusation-first design
- No single AI-generated guilt score
- Educational framing for students
- Signal-based review for educators
- Human decision-making stays central

## Tech Stack

### Frontend

- React 19
- React Router 7
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express
- TypeScript
- Supabase
- Google Gemini API

### Supporting services

- Citation verification through the server citation audit service
- SQL migrations under `supabase/migrations`

## Repository Structure

```text
ProofBuddy/
|- client/                  # React + Vite frontend
|  |- src/
|  |  |- components/
|  |  |- pages/
|  |  `- api.js            # Shared frontend API base URL
|- server/                  # Express + TypeScript backend
|  |- src/
|  |  |- config/
|  |  |- middleware/
|  |  |- routes/
|  |  |- services/
|  |  |- types/
|  |  `- utils/
|  `- server.ts
`- supabase/
   `- migrations/          # Database schema and SQL functions
```

## Core Architecture

### Frontend

The frontend is a role-based React app with separate student and educator flows. Routing is defined in `client/src/App.jsx`. Authentication state is stored in local storage for this MVP using keys such as:

- `proofbuddyToken`
- `proofbuddyRole`
- `proofbuddyDocId`

The frontend uses a shared API base in `client/src/api.js`:

- Defaults to `http://localhost:5000`
- Can be overridden with `VITE_API_URL`

### Backend

The backend is an Express API created in `server/src/app.ts` and started from `server/server.ts`.

Main API groups:

- `/api/auth`
- `/api/student`
- `/api/educator`
- `/api/share`

The server uses:

- Supabase auth for authentication
- Supabase tables for documents, reviews, process logs, sharing, and usage tracking
- Gemini for structured JSON analysis
- internal metrics and citation services before LLM calls

## AI Analysis Design

### Student analysis

Student analysis is handled by `server/src/routes/student/analyze.ts`.

It combines:

- local writing metrics
- citation auditing
- one Gemini call for mechanical issues
- one Gemini call for holistic structure and AI-risk education

The result is a report containing:

- metrics and signal densities
- citation findings
- grammar, style, clarity, and mechanics issues
- thesis and structure feedback
- AI-risk narrative and signals
- suggested rewrites

If a `documentId` is included, the report is persisted and usage is tracked.

### Educator analysis

Educator analysis is handled by `server/src/routes/educator/analyze.ts`.

It combines:

- assignment prompt
- student submission
- optional previous writing sample
- rubric
- AI policy
- computed writing metrics
- citation audit findings
- one Gemini call with a strict structured schema

The educator report includes:

- disclaimer text
- attention level: `routine`, `some_signals`, or `several_signals`
- summary
- prompt alignment notes
- writing consistency notes
- possible signals with alternative explanations
- follow-up questions
- recommended next steps

## Authentication and Roles

Authentication routes live in `server/src/routes/auth/index.ts`.

Supported flows:

- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `POST /api/auth/signout`
- `GET /api/auth/me`
- `PATCH /api/auth/me`

Role behavior:

- Students and educators are stored in the `users` table
- Educator signup checks for blocked non-institutional email domains
- Educators can update their institution name after signup

## Main API Surface

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `POST /api/auth/signout`
- `GET /api/auth/me`
- `PATCH /api/auth/me`

### Student

- `GET /api/student/usage`
- `GET /api/student/documents`
- `POST /api/student/documents`
- `GET /api/student/documents/:id`
- `PATCH /api/student/documents/:id`
- `DELETE /api/student/documents/:id`
- `GET /api/student/documents/:id/versions`
- `POST /api/student/documents/:id/versions`
- `POST /api/student/documents/:id/process-log/events`
- `GET /api/student/documents/:id/process-log`
- `POST /api/student/analyze`
- process-log sharing routes under `/api/student/process-log-requests`

### Educator

- `GET /api/educator/reviews`
- `POST /api/educator/analyze-submission`
- process-log sharing routes under `/api/educator/process-log-requests`

### Public share links

- `GET /api/share/:token`

This endpoint is intentionally public and only returns safe preview data for consent and access workflows.

## Database

Supabase migrations are stored in:

- `supabase/migrations/00001_initial_schema.sql`
- `supabase/migrations/00002_core_schema.sql`
- `supabase/migrations/00003_share_access_logs.sql`
- `supabase/migrations/00004_process_log_functions.sql`
- `supabase/migrations/00005_add_user_tier.sql`

These migrations cover the core tables and helpers for:

- users and institutions
- documents and versions
- process logs
- student analyses
- educator reviews
- process-log share requests and access logs
- usage tracking
- user tier support

## Environment Variables

The backend requires the following environment variables:

```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_gemini_api_key
```

The frontend supports:

```env
VITE_API_URL=http://localhost:5000
```

Notes:

- `PORT` defaults to `5000` if omitted
- `GEMINI_API_KEY` is optional until analysis features are used, but required for LLM-backed routes

## Local Development

### 1. Install dependencies

```bash
cd client
npm install
cd ../server
npm install
```

### 2. Configure environment

- Create a server `.env` file with the variables above
- Optionally create a client `.env` file with `VITE_API_URL`

### 3. Run the backend

```bash
cd server
npm run dev
```

This starts the API on `http://localhost:5000` by default.

### 4. Run the frontend

```bash
cd client
npm run dev
```

Vite typically serves the frontend at `http://localhost:5173`.

## Key Frontend Routes

### Public

- `/`
- `/students`
- `/educators`
- `/auth`

### Student

- `/student`
- `/student/setup`
- `/student/editor`
- `/student/ai-detail`
- `/student/replay`
- `/student/share-requests`
- `/student/report`

### Educator

- `/educator`
- `/educator/course-setup`
- `/educator/intake`
- `/educator/report`
- `/educator/process-log`

## Notable Implementation Details

- Student analysis begins after roughly 30 words in the editor
- Process-log events are queued client-side and flushed to the backend in batches
- Document versions are created on save
- Educator reports are persisted and listed on the dashboard
- Share-token access is logged server-side
- Report language is structured to avoid certainty and overclaiming

## Current Status

This repository includes:

- a working React frontend
- a role-based authentication flow
- student document workflows
- live student analysis
- educator submission analysis
- Supabase-backed persistence
- process-log sharing infrastructure

The project still has MVP-style traits, including local-storage session handling on the client and development-oriented assumptions in parts of the flow, but the core product loops are implemented.

## Recommended Next Improvements

- Move client auth state from local storage to a stronger session strategy
- Add a root-level workspace script for starting client and server together
- Add API and UI test coverage
- Add a checked-in `.env.example` for both client and server
- Document Supabase schema entities in more detail
- Add deployment instructions

## License

No license file is currently included in this repository. Add one before public distribution if needed.
