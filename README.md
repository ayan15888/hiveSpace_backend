<div align="center">

<!-- Animated Banner -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=200&section=header&text=HiveSpace&fontSize=80&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Multi-Tenant%20SaaS%20Backend%20Platform&descAlignY=60&descSize=20&descColor=a78bfa"/>

<!-- Typing Animation -->
<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=22&pause=1000&color=A78BFA&center=true&vCenter=true&multiline=true&repeat=true&width=650&height=80&lines=🏢+True+Multi-Tenant+SaaS+Architecture;💬+Real-Time+Chat+%2B+Mentions+System;🔐+Role-Based+Access+Control+(RBAC);🚀+Production-Ready+Spring+Boot+%2B+Next.js" alt="Typing SVG" />
</a>

<br/><br/>

<!-- Badges -->
![Java](https://img.shields.io/badge/Java_17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white)

<br/>

![GitHub stars](https://img.shields.io/github/stars/yourusername/hivespace?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/hivespace?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/hivespace?color=a78bfa)
![License](https://img.shields.io/badge/License-MIT-a78bfa?style=flat)

</div>

---

<!-- Contribution Snake Animation -->
<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/platane/snk/output/github-contribution-grid-snake-dark.svg" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/platane/snk/output/github-contribution-grid-snake.svg" />
    <img alt="github-snake" src="https://raw.githubusercontent.com/platane/snk/output/github-contribution-grid-snake-dark.svg" />
  </picture>
</div>

---

## 🌌 What is HiveSpace?

<div align="center">

```
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║   HiveSpace is a production-style multi-tenant SaaS backend         ║
║   that powers modern organizations with projects, real-time         ║
║   chat, mentions, and role-based access — all on one backend.       ║
║                                                                      ║
║      Inspired by:    Slack  •  Notion  •  Jira  •  ClickUp          ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

</div>

> 🏢 **Multi-Tenant** — Each organization gets completely isolated data  
> 👥 **Role-Based** — Owner, Admin, Member access control  
> 💬 **Chat-First** — Org-wide & project-level messaging with `@mentions`  
> 📦 **Subscription-Ready** — FREE / PRO / ENTERPRISE plan architecture  

---

## ✨ Core Features

<div align="center">

| 🏢 Workspace Management | 👤 User & Role System | 📁 Project Collaboration |
|:---:|:---:|:---:|
| Unique slug-based URLs | Owner / Admin / Member | Project-level chat rooms |
| `hivespace.com/startupx` | Secure permission layers | Member assignment |
| Enable / Disable tenants | JWT Authentication (WIP) | Access control per project |

| 💬 Organization Chat | 🔔 Mentions & Notifications | 📦 Subscription Plans |
|:---:|:---:|:---:|
| One chat per workspace | `@username` tagging | FREE / PRO / ENTERPRISE |
| Company-wide broadcasts | Real-time notifications | Feature gating ready |
| Announcements & threads | Added-to-project alerts | Billing integration ready |

</div>

---

## 🗺️ System Architecture

```
                     ┌─────────────────────────────────────┐
                     │         CLIENT  (Next.js 15)         │
                     │   Pages  ·  Components  ·  Hooks     │
                     └──────────────────┬──────────────────┘
                                        │  HTTP / REST
                     ┌──────────────────▼──────────────────┐
                     │          CONTROLLER LAYER            │
                     │   Auth · Tenant · Project · Chat     │
                     └──────────────────┬──────────────────┘
                                        │
                     ┌──────────────────▼──────────────────┐
                     │           SERVICE LAYER              │
                     │    Business Logic  ·  Validation     │
                     └──────────────────┬──────────────────┘
                                        │
                     ┌──────────────────▼──────────────────┐
                     │          REPOSITORY LAYER            │
                     │    Spring Data JPA  ·  Hibernate     │
                     └──────────────────┬──────────────────┘
                                        │
                     ┌──────────────────▼──────────────────┐
                     │     DATABASE  (MySQL / PostgreSQL)   │
                     │     Tenant-isolated via Tenant ID    │
                     └─────────────────────────────────────┘
```

---

## 🧩 Entity Relationship Overview

```
Tenant
 ├── 👤 Users (TenantUser)
 │     └── Roles: OWNER  ·  ADMIN  ·  MEMBER
 ├── 📁 Projects
 │     └── 👥 ProjectMembers
 ├── 💬 ChatRooms
 │     └── 📨 Messages
 │           └── 🔔 Mentions
 └── 📦 Subscription  (FREE · PRO · ENTERPRISE)
```

---

## 🛠️ Tech Stack

<div align="center">

### 🔙 Backend
![Java](https://img.shields.io/badge/Java_17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white)
![Lombok](https://img.shields.io/badge/Lombok-BC4521?style=for-the-badge&logoColor=white)

### 🔜 Frontend
![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### 🗄️ Database & DevTools
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

</div>

---

## 📡 API Reference

<details>
<summary><b>🔐 Authentication Endpoints</b></summary>

<br/>

**Register a User**
```http
POST /api/auth/register
Content-Type: application/json
```
```json
{
  "email": "user@example.com",
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json
```
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```
</details>

<details>
<summary><b>💚 Health Check</b></summary>

<br/>

```http
GET /api/health
```
```json
{
  "status": "UP",
  "timestamp": "2026-03-30T10:15:30",
  "message": "HiveSpace Backend is running smoothly"
}
```
</details>

<details>
<summary><b>🏢 Tenant Endpoints</b></summary>

<br/>

**Create a Tenant**
```http
POST /api/tenants
Authorization: Bearer <token>
Content-Type: application/json
```
```json
{
  "name": "My Organization",
  "slug": "my-org",
  "ownerEmail": "owner@email.com",
  "plan": "FREE",
  "description": "Optional desc"
}
```

**Get Organizations by User**
```http
GET /api/tenants/user/{userId}
Authorization: Bearer <token>
```

**Get Tenant Count**
```http
GET /api/tenants/count/{userId}
Authorization: Bearer <token>
```
</details>

<details>
<summary><b>🏗️ Workspace & Project Endpoints</b></summary>

<br/>

**Create Workspace**
```http
POST /api/workspaces
Authorization: Bearer <token>
Content-Type: application/json
```
```json
{
  "name": "Development Workspace",
  "description": "Optional description",
  "plan": "BASIC",
  "tenantId": "123e4567-e89b-12d3..."
}
```

**Create Project**
```http
POST /api/{tenantSlug}/workspaces/{workspaceId}/projects
Authorization: Bearer <token>
Content-Type: application/json
```
```json
{
  "name": "New Project",
  "description": "Project description",
  "status": "ACTIVE",
  "workspaceId": "123e4567-e89b-12d3..."
}
```

**Get Projects by Workspace**
```http
GET /api/{tenantSlug}/workspaces/{workspaceId}/projects
Authorization: Bearer <token>
```
</details>

---

## 🔐 Multi-Tenancy Strategy

```
┌──────────────────────────────────────────────────────────────┐
│                Single Database Architecture                   │
│                                                              │
│   ┌─────────────────┐          ┌─────────────────┐          │
│   │  Tenant: 🟣      │          │  Tenant: 🔵      │          │
│   │    Google        │          │   StartupX       │          │
│   │                 │          │                  │          │
│   │  ✦ Users        │          │  ✦ Users         │          │
│   │  ✦ Projects     │          │  ✦ Projects      │          │
│   │  ✦ Chats        │          │  ✦ Chats         │          │
│   └─────────────────┘          └─────────────────┘          │
│                                                              │
│         🔒 Isolated via Tenant ID at Repository Layer         │
└──────────────────────────────────────────────────────────────┘
```

✔ **Secure isolation** — Zero cross-tenant data leakage  
✔ **Cost-effective** — Shared infrastructure, lower overhead  
✔ **Scalable** — Tenant ID filtering at the repository level  

---

## 🚀 Roadmap

- [x] ✅ Multi-tenant architecture
- [x] ✅ Role-based access control (Owner / Admin / Member)
- [x] ✅ Organization & project-level chat
- [x] ✅ Mentions system (`@username`)
- [x] ✅ Subscription plan architecture (FREE / PRO / ENTERPRISE)
- [ ] 🔲 JWT Authentication
- [ ] 🔲 Real-time chat (WebSockets)
- [ ] 🔲 Billing & payments integration
- [ ] 🔲 Audit logs per tenant
- [ ] 🔲 Analytics dashboard per tenant
- [ ] 🔲 Email notifications

---

## 🎯 Why HiveSpace Stands Out

<div align="center">

| ❌ Typical Toy Project | ✅ HiveSpace |
|:---|:---|
| Single-user CRUD app | True Multi-Tenant SaaS |
| No roles or permissions | Owner / Admin / Member RBAC |
| No collaboration features | Chat + Mentions + Notifications |
| Simple flat data model | Tenant-isolated entity hierarchy |
| No subscription logic | FREE / PRO / ENTERPRISE ready |
| Backend only | Spring Boot + Next.js Full Stack |

</div>

---

## 👨‍💻 Contributors

<div align="center">

<!-- Auto-generated contributors from contrib.rocks -->
<a href="https://github.com/yourusername/hivespace/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=yourusername/hivespace&max=10&columns=10" />
</a>

<br/><br/>

<!-- Scrolling contributor marquee (right to left) -->
<picture>
  <img src="https://capsule-render.vercel.app/api?type=soft&color=0:0f0c29,100:302b63&height=2&section=header"/>
</picture>

<!-- Marquee scrolling contributor cards -->
<marquee behavior="scroll" direction="left" scrollamount="4" width="100%">
&nbsp;&nbsp;&nbsp;
🧑‍💻 <b>Contributor 1</b> — 🏗️ Architect &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
👩‍💻 <b>Contributor 2</b> — ⚙️ Backend Engineer &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
🧑‍🎨 <b>Contributor 3</b> — 🎨 Frontend Dev &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
👩‍🔬 <b>Contributor 4</b> — 🗄️ Database Architect &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
🧑‍💻 <b>Contributor 5</b> — 🔐 Auth & Security &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
👩‍💻 <b>Contributor 6</b> — 📦 DevOps &nbsp;&nbsp;&nbsp;
</marquee>

<br/>

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/yourusername">
        <img src="https://avatars.githubusercontent.com/u/583231?v=4" width="70px" style="border-radius:50%"/><br/>
        <sub><b>Contributor 1</b></sub>
      </a><br/>
      <sub>🏗️ Architect</sub>
    </td>
    <td align="center">
      <a href="https://github.com/contributor2">
        <img src="https://avatars.githubusercontent.com/u/1024025?v=4" width="70px" style="border-radius:50%"/><br/>
        <sub><b>Contributor 2</b></sub>
      </a><br/>
      <sub>⚙️ Backend</sub>
    </td>
    <td align="center">
      <a href="https://github.com/contributor3">
        <img src="https://avatars.githubusercontent.com/u/810438?v=4" width="70px" style="border-radius:50%"/><br/>
        <sub><b>Contributor 3</b></sub>
      </a><br/>
      <sub>🎨 Frontend</sub>
    </td>
    <td align="center">
      <a href="https://github.com/contributor4">
        <img src="https://avatars.githubusercontent.com/u/4314092?v=4" width="70px" style="border-radius:50%"/><br/>
        <sub><b>Contributor 4</b></sub>
      </a><br/>
      <sub>🗄️ Database</sub>
    </td>
    <td align="center">
      <a href="https://github.com/contributor5">
        <img src="https://avatars.githubusercontent.com/u/6128107?v=4" width="70px" style="border-radius:50%"/><br/>
        <sub><b>Contributor 5</b></sub>
      </a><br/>
      <sub>🔐 Security</sub>
    </td>
  </tr>
</table>

</div>

---

## 📊 Activity Graph

<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=yourusername&bg_color=0f0c29&color=a78bfa&line=7c3aed&point=ffffff&area=true&hide_border=true" width="100%"/>
</div>

---

## 🤝 Contributing

We welcome all contributions! Here's how to get started:

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork locally
git clone https://github.com/yourusername/hivespace.git
cd hivespace

# 3. Create a feature branch
git checkout -b feature/your-amazing-feature

# 4. Make your changes & commit with conventional commits
git commit -m "feat: add amazing feature"

# 5. Push your branch and open a Pull Request
git push origin feature/your-amazing-feature
```

> Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a PR. All contributions are appreciated! 🙌

---

## 📄 License

```
MIT License — free to use, modify, and distribute.
See LICENSE file for full terms.
```

---

<div align="center">

**⭐ If HiveSpace helped you, please star the repo — it means a lot to the team!**

[![GitHub followers](https://img.shields.io/github/followers/yourusername?label=Follow&style=social)](https://github.com/yourusername)
&nbsp;
[![GitHub stars](https://img.shields.io/github/stars/yourusername/hivespace?style=social)](https://github.com/yourusername/hivespace)

<br/>

**Built with ❤️ by the HiveSpace Team**

<!-- Footer Wave -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:24243e,50:302b63,100:0f0c29&height=120&section=footer"/>

</div>
