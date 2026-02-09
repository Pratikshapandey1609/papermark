
# **Papermark**

### Secure Document Sharing & Analytics Platform

Papermark is a modern document sharing platform developed during my **Full-Stack Developer Internship at InnovexWeb Technology**. The application enables secure document sharing, access control, and engagement tracking using a scalable, production-ready architecture.

🌐 **Live Application:** [https://papermark1-sigma.vercel.app](https://papermark1-sigma.vercel.app)

---

## 🏢 Internship Details

* **Role:** Full-Stack Developer Intern
* **Company:** **InnovexWeb Technology**
* **Project:** Papermark – Document Sharing Platform
* **Tech Responsibility:** Frontend, Backend, Database, Auth, Deployment

---

## 🚀 Project Overview

Papermark allows teams and organizations to share documents securely without email attachments while tracking user engagement and document access. The platform focuses on security, scalability, and real-time analytics.

---

## ✨ Features Implemented

### 📄 Document Sharing

* Secure link-based document sharing
* Support for multiple document formats
* Expiry-based access control

### 🔐 Authentication & Authorization

* Email-based authentication
* OAuth authentication (Google, GitHub)
* Secure session handling using NextAuth

### 📊 Analytics & Tracking

* Document view tracking
* User engagement monitoring
* Viewer activity insights

### 🗂️ Data Rooms

* Organized document collections
* Folder-based management
* Controlled access permissions

### 👥 Team Collaboration

* Team-based document access
* Permission management

### 📧 Email Integration

* SMTP-based email notifications
* Email verification & system alerts

### ☁️ Cloud Storage

* Vercel Blob Storage for secure uploads
* Optimized file handling

---

## 🛠️ Tech Stack

| Category       | Technology              |
| -------------- | ----------------------- |
| Frontend       | Next.js 14 (App Router) |
| Backend        | Next.js API Routes      |
| Authentication | NextAuth.js             |
| Database       | PostgreSQL (Neon)       |
| ORM            | Prisma                  |
| Storage        | Vercel Blob             |
| Email          | SMTP (Gmail / Resend)   |
| Styling        | Tailwind CSS            |
| UI             | Radix UI                |
| Deployment     | Vercel                  |

---

## 📁 Project Structure

```
papermark/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authentication pages
│   ├── api/                # API routes
│   └── layout.tsx
├── components/             # Reusable UI components
├── lib/                    # Utilities & services
│   ├── emails/             # Email templates
│   ├── prisma.ts           # Prisma client
│   └── files/              # File handling
├── pages/                  # NextAuth configuration
├── prisma/                 # Prisma schema
└── public/                 # Static assets
```

---

## ⚙️ Environment Configuration (Production)

### Core

```env
NEXTAUTH_SECRET=********
NEXTAUTH_URL=https://papermark1-sigma.vercel.app
```

### Database (Neon PostgreSQL)

```env
POSTGRES_PRISMA_URL=postgresql://user:password@host/db
POSTGRES_PRISMA_URL_NON_POOLING=postgresql://user:password@host/db
```

### Storage

```env
BLOB_READ_WRITE_TOKEN=********
NEXT_PUBLIC_UPLOAD_TRANSPORT=vercel
```

### Email (SMTP)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=********
SMTP_PASS=********
SEND_EMAILS=true
```

---

## 🚀 Deployment

* **Platform:** Vercel
* **Database:** Neon PostgreSQL
* **Storage:** Vercel Blob
* **Email:** SMTP

The application is fully deployed and production-ready.

---

## 🎯 Learning Outcomes

During this internship project, I gained hands-on experience in:

* Full-stack development using Next.js
* Secure authentication flows
* Database design with Prisma & PostgreSQL
* Cloud storage integration
* Production deployment on Vercel
* Debugging real-world issues (auth, routing, env configs)

---

## 👩‍💻 Developer

**Pratiksha Pandey**
Full-Stack Developer Intern
**InnovexWeb Technology**

---

## 📜 License

MIT License
This project was developed as part of an internship at **InnovexWeb Technology**.

Built with ❤️ using Next.js, Prisma, and modern web technologies.

