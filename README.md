# LingoDeutsch 🇩🇪

AI-Powered German Learning Platform

![React](https://img.shields.io/badge/React-Frontend-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![Supabase](https://img.shields.io/badge/Supabase-Database-success)
![Groq](https://img.shields.io/badge/Groq-LLM-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-blue)

LingoDeutsch is an intelligent German learning platform designed to make language acquisition more interactive, personalized, and practical.

Unlike traditional language learning applications that rely heavily on repetitive exercises, LingoDeutsch combines conversational AI, real-time grammar assistance, pronunciation practice, and personalized vocabulary building into a single learning experience.

The goal is simple:

**Help learners think, speak, and communicate in German naturally through AI-driven interaction.**

---

## Why LingoDeutsch?

Many language learners struggle with three major challenges:

* Lack of real conversation practice
* Difficulty remembering vocabulary
* Fear of making grammar mistakes

LingoDeutsch addresses these challenges by providing an AI tutor that acts as both a language partner and a personal instructor.

Users can chat naturally, receive corrections, build vocabulary collections, practice pronunciation, and review saved words through an integrated flashcard system.

---

# Core Features

## 🤖 AI German Tutor

The AI tutor provides real-time conversational practice and personalized language guidance.

### Capabilities

* German conversation practice
* English → German translation
* German → English translation
* Real-time grammar correction
* Vocabulary explanations
* Beginner-friendly responses
* Context-aware tutoring
* Personalized interactions

---

## 🎙 Voice Learning Experience

Language learning should not be limited to typing.

### Speech-to-Text

Learners can speak directly to the tutor using their microphone.

Features:

* German speech recognition
* Voice-based conversation
* Hands-free learning experience

### Text-to-Speech

The platform can pronounce German sentences aloud.

Features:

* Native browser speech synthesis
* German pronunciation playback
* Flashcard pronunciation support
* Listening practice

---

## 📚 Smart Vocabulary System

Every useful sentence can become a learning opportunity.

Users can save vocabulary directly from AI conversations.

### Vocabulary Features

* One-click vocabulary saving
* Personal vocabulary library
* Cloud storage with Supabase
* User-specific vocabulary collections
* Instant review system

---

## 🎴 Flashcard Study Mode

Saved vocabulary can be reviewed through an interactive flashcard experience.

### Features

* Study Mode
* Previous / Next navigation
* Translation reveal
* Progress tracking
* Vocabulary pronunciation
* Flashcard deletion
* Modern glassmorphism interface

---

## 🔍 Vocabulary Search

Quickly find previously saved words and expressions.

Features:

* German search
* English search
* Instant filtering
* Fast vocabulary lookup

---

# Security & Privacy

Security is a core part of the architecture.

LingoDeutsch uses:

### Authentication

Powered by Supabase Authentication.

Features:

* Email authentication
* Session management
* Protected routes
* Secure login system

### Authorization

Row Level Security (RLS) ensures users can only access their own data.

Protected resources:

* Vocabulary
* Conversations
* Messages

### Data Isolation

User A can never access:

* User B's flashcards
* User B's conversations
* User B's messages

All database access is restricted using PostgreSQL Row Level Security policies.

---

# System Architecture

Frontend
↓
React + TypeScript
↓
TanStack Router
↓
Supabase Authentication
↓
FastAPI Backend
↓
Groq API (Llama 3.1)
↓
Supabase PostgreSQL

---

# Technology Stack

## Frontend

* React
* TypeScript
* TanStack Router
* Tailwind CSS
* Framer Motion
* Sonner

## Backend

* FastAPI
* Python

## AI Infrastructure

* Groq API
* Llama 3.1 8B Instant

## Database

* Supabase PostgreSQL

## Authentication

* Supabase Auth

---

# Database Design

## Vocabulary Table

Stores user vocabulary.

Fields:

* id
* user_id
* german
* english
* created_at

---

## Conversations Table

Stores chat sessions.

Fields:

* id
* user_id
* title
* created_at

---

## Messages Table

Stores conversation messages.

Fields:

* id
* conversation_id
* role
* content
* created_at

---

# Development Journey

LingoDeutsch started as a simple AI German tutor.

Over time, it evolved into a complete language learning platform featuring:

* Authentication
* Secure user management
* AI tutoring
* Voice interaction
* Vocabulary tracking
* Flashcard study mode
* Search functionality
* Conversation persistence architecture

The project continues to evolve toward becoming a full-featured AI language learning ecosystem.

---

# Future Roadmap

## Learning Features

* Daily streaks
* Learning analytics
* Achievement system
* Vocabulary mastery tracking
* Adaptive learning paths

## AI Features

* Personalized lesson plans
* AI-generated quizzes
* Conversation difficulty adjustment
* Pronunciation feedback

## Advanced Learning

* Spaced Repetition System (SRS)
* Exam preparation modules
* Speaking assessments
* Writing evaluations

## Platform Expansion

* Mobile application
* Multi-language support
* Community learning features
* Teacher dashboard

---

# Creator

Kumar Vallepu

Computer Science Engineering (AI & ML)

Building AI-powered educational tools and language learning systems.

---

*"Language learning should feel like a conversation, not a classroom."*
