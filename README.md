# Syncro | Premium Team Task Manager

Syncro is a high-performance, aesthetically stunning Team Task Manager built with Next.js 15, Prisma, and NextAuth. It features a modern dark-themed interface with glassmorphism, real-time stats, and role-based access control.

## 🚀 Features

- **Authentication**: Secure signup and login with NextAuth.js.
- **Project Management**: Create, view, and manage team projects.
- **Task Tracking**: Kanban-style board for task status management.
- **Dashboard**: Real-time stats for tasks, progress, and overdue items.
- **RBAC**: Admin and Member roles with specific permissions.
- **Modern Design**: Premium dark mode, glassmorphism, and smooth animations with Framer Motion.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Auth**: [NextAuth.js v5](https://authjs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Deployment

This project is optimized for [Railway](https://railway.app/).

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd team-task-manager
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root:
   ```env
   DATABASE_URL="your-postgresql-url"
   AUTH_SECRET="your-nextauth-secret"
   ```

4. **Initialize Database**:
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run Locally**:
   ```bash
   npm run dev
   ```

## 📄 License

MIT License
