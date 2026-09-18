# 🇩🇪 LingoDeutsch

### **Learn German. Speak Naturally. Powered by AI.**

<p align="center">
  <strong>An AI-powered language learning platform built for real conversations, personalized practice, and continuous learning.</strong>
</p>

<p align="center">

\

</p>

---

## ⚡ What is LingoDeutsch?

**LingoDeutsch** is a full-stack AI-powered German learning platform designed to make language learning feel more like a real conversation than a traditional classroom.

Instead of relying only on repetitive exercises, LingoDeutsch combines:

**AI Conversation · Voice Interaction · Grammar Assistance · Vocabulary · Flashcards · Personalized Learning**

The goal is simple:

> **Help learners understand, speak, and communicate in German more naturally through intelligent interaction.**

---

# 🎯 The Problem

Learning a new language often comes with three major challenges:

* 💬 Limited opportunities for real conversation
* 🧠 Difficulty retaining new vocabulary
* ✍️ Fear of making grammar mistakes

### The approach

LingoDeutsch brings these learning activities together in a single platform where users can:

**Talk → Learn → Get Corrected → Save → Practice → Improve**

---

# 🚀 Core Features

## 🤖 AI German Tutor

An AI-powered conversational tutor designed for practical German practice.

* 🇩🇪 German conversation
* 🔄 English ↔ German translation
* ✍️ Grammar correction
* 📖 Vocabulary explanations
* 🧠 Context-aware responses
* 🎯 Personalized interaction

---

## 🎙️ Voice-Based Learning

Learning shouldn't be limited to typing.

### Speech-to-Text

Users can speak directly with the AI tutor through their microphone.

### Text-to-Speech

German sentences can be spoken aloud for pronunciation and listening practice.

**Voice capabilities include:**

* German speech recognition
* Voice conversations
* Pronunciation playback
* Listening practice
* Flashcard pronunciation

---

## 📚 Smart Vocabulary

Turn conversations into personalized learning material.

Users can save useful German words and expressions directly from their learning experience.

**Features:**

* One-click vocabulary saving
* Personal vocabulary library
* German / English search
* User-specific vocabulary
* Cloud storage

---

## 🎴 Flashcard Mode

A dedicated study mode for reviewing saved vocabulary.

* Previous / Next navigation
* Translation reveal
* Progress tracking
* Pronunciation
* Vocabulary deletion
* Interactive learning experience

---

## 🔐 Secure Authentication

User data is isolated and protected using:

* Supabase Authentication
* Email authentication
* Session management
* Protected routes
* PostgreSQL Row Level Security

Each user can access only their own:

**Vocabulary · Conversations · Messages**

---

# 🧠 How It Works

```text
                  USER
                    │
                    ▼
        ┌─────────────────────┐
        │ React + TypeScript  │
        │     Frontend        │
        └──────────┬──────────┘
                   │
                   │ REST API
                   ▼
        ┌─────────────────────┐
        │   FastAPI Backend   │
        │       Python        │
        └───────┬─────┬───────┘
                │     │
         ┌──────┘     └──────────┐
         ▼                       ▼
 ┌───────────────┐       ┌────────────────┐
 │   Groq API    │       │    Supabase    │
 │   Llama 3.1   │       │   PostgreSQL   │
 └───────────────┘       └────────────────┘
```

### Request Flow

```text
User Input
    ↓
React UI
    ↓
REST API
    ↓
FastAPI
    ↓
AI Processing / Database
    ↓
JSON Response
    ↓
React UI Update
```

---

# 🛠️ Technology Stack

### Frontend

| Technology      | Purpose               |
| --------------- | --------------------- |
| React           | User interface        |
| TypeScript      | Type-safe development |
| TanStack Router | Client-side routing   |
| Tailwind CSS    | Styling               |
| Framer Motion   | UI animations         |
| Sonner          | Notifications         |

### Backend

| Technology | Purpose              |
| ---------- | -------------------- |
| Python     | Backend development  |
| FastAPI    | REST API development |

### AI

| Technology           | Purpose           |
| -------------------- | ----------------- |
| Groq API             | AI inference      |
| Llama 3.1 8B Instant | Conversational AI |

### Database & Authentication

| Technology     | Purpose             |
| -------------- | ------------------- |
| Supabase       | Backend services    |
| PostgreSQL     | Relational database |
| Supabase Auth  | Authentication      |
| PostgreSQL RLS | Data isolation      |

---

# 🗄️ Database Architecture

### `vocabulary`

Stores vocabulary saved by users.

```text
id
user_id
german
english
created_at
```

### `conversations`

Stores individual conversation sessions.

```text
id
user_id
title
created_at
```

### `messages`

Stores individual messages.

```text
id
conversation_id
role
content
created_at
```

### Relationship

```text
User
 │
 ├── Conversations
 │       │
 │       └── Messages
 │
 └── Vocabulary
```

---

# 🔒 Security

Security and user-data isolation are important parts of the platform.

### Authentication

Supabase Authentication provides:

* Email authentication
* Session management
* Protected routes

### Row Level Security

PostgreSQL RLS policies restrict database access based on the authenticated user.

This ensures:

```text
User A
  ↓
Own conversations
Own messages
Own vocabulary

User B
  ↓
Own conversations
Own messages
Own vocabulary
```

Users cannot access another user's protected application data.

---

# 📸 Product Preview

> Add screenshots of the actual application below.

### 🏠 Landing Page

### 🤖 AI Tutor

### 📚 Vocabulary

### 🎴 Flashcards

### 🔐 Authentication

---

# ⚙️ Getting Started

## Prerequisites

* Node.js / Bun
* Python
* Supabase project
* Groq API credentials

## Clone

```bash
git clone https://github.com/kumar-vallepu/lingodeutsch.git

cd lingodeutsch
```

## Install Frontend Dependencies

```bash
bun install
```

## Environment Configuration

Create the required environment variables for:

```text
Supabase
Groq API
Backend configuration
```

> **Never commit API keys, database credentials, or other secrets to GitHub.**

## Run Frontend

```bash
bun run dev
```

## Run Backend

Navigate to the backend directory and start the FastAPI application using the project's backend configuration.

---

# 📈 Development Journey

LingoDeutsch started as a simple AI German tutor and evolved into a broader learning platform.

### Evolution

```text
AI Tutor
   ↓
Conversation
   ↓
Authentication
   ↓
Persistent Conversations
   ↓
Vocabulary System
   ↓
Flashcards
   ↓
Voice Interaction
   ↓
Personalized Learning
```

The project continues to evolve toward a more complete AI-assisted language learning ecosystem.

---

# 🗺️ Roadmap

### Learning

* [ ] Daily streaks
* [ ] Learning analytics
* [ ] Achievement system
* [ ] Vocabulary mastery
* [ ] Adaptive learning paths

### AI

* [ ] Personalized lesson plans
* [ ] AI-generated quizzes
* [ ] Adaptive conversation difficulty
* [ ] Pronunciation feedback

### Advanced Learning

* [ ] Spaced repetition
* [ ] Exam preparation
* [ ] Speaking assessments
* [ ] Writing evaluation

### Platform

* [ ] Mobile application
* [ ] Multi-language support
* [ ] Community learning
* [ ] Teacher dashboard

---

# 💡 What I Learned

Building LingoDeutsch provided hands-on experience with:

* Full-stack web application development
* React and TypeScript
* REST API design
* FastAPI backend development
* PostgreSQL database design
* Authentication and authorization
* Row Level Security
* AI API integration
* Voice-based interaction
* Frontend ↔ backend communication
* Debugging and iterative development

---

# 👨‍💻 About the Developer

### **Kumar Vallepu**

**B.Tech — Computer Science & Engineering (AI & ML)**

I enjoy building practical applications at the intersection of:

**Web Development × Artificial Intelligence × User Experience**

Currently exploring opportunities to apply these skills in real-world software development environments.

---

## 🌐 Connect

**GitHub:** [kumar-vallepu](https://github.com/kumar-vallepu)

**Live Project:** [LingoDeutsch](https://lingodeutsch.learnai.workers.dev/)

---

<p align="center">

### 🇩🇪 **Language learning should feel like a conversation, not a classroom.**

**Built with React • FastAPI • PostgreSQL • AI**

</p>
