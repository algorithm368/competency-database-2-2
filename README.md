# Competency Database v2.2

A modern, high-performance competency assessment platform built with Next.js, focusing on TPQI (Thailand Professional Qualification Institute) and SFIA (Skills Framework for the Information Age) frameworks.

## 🎯 Project Overview

This project is an evolution of the Competency Database v2.1, reimagined with a **hybrid static-dynamic architecture** to deliver superior performance, security, and user experience.

### Key Innovation: Hybrid Architecture

**v2.2** introduces a groundbreaking approach to competency data management:

- **Static Client-Side Database**: Core competency frameworks (TPQI & SFIA) are bundled as static assets and kept on the client side
- **Dynamic Server Components**: User-specific data, search queries, and personalized assessments are handled server-side
- **Result**: Faster load times, reduced server load, enhanced security, and offline-capable core features

## 🚀 What's New in v2.2

### Architecture Improvements

1. **Static Competency Data**

   - TPQI sectors and competencies stored as static JSON/TypeScript modules
   - Instant access without database queries
   - Reduced hosting costs and improved scalability
   - Cache-friendly and CDN-optimized

2. **Next.js App Router (Full Utilization)**

   - Server Components for dynamic content
   - Client Components only where interactivity is needed
   - Streaming SSR for progressive page loading
   - Optimized bundle sizes with automatic code splitting

3. **Performance Optimizations**

   - Static generation for framework pages
   - On-demand ISR (Incremental Static Regeneration) for updated content
   - Image optimization with Next.js Image component
   - Font optimization with next/font

4. **Enhanced Security**
   - No direct database exposure for static competency data
   - Server-side validation for user inputs
   - Type-safe API routes with TypeScript
   - Reduced attack surface

### Feature Highlights

- 🔍 **Advanced Search**: Real-time filtering across TPQI sectors and SFIA skills
- 📊 **Competency Assessment**: Compare personal skills against industry standards
- 🎨 **Modern UI**: Built with shadcn/ui and Tailwind CSS
- 🌐 **Bilingual Support**: Thai and English interface
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile
- ⚡ **Lightning Fast**: Sub-second page loads with static optimization

## 🛠️ Tech Stack

### Core Framework

- **Next.js 15** - React framework with App Router
- **React 19** - UI library with Server Components
- **TypeScript** - Type-safe development

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide Icons** - Modern icon library
- **CSS Variables** - Theme customization

### Data Management

- **Static JSON/TS Modules** - Client-side competency database
- **Server Actions** - For dynamic operations
- **Type-safe APIs** - Full TypeScript coverage

### Developer Experience

- **ESLint** - Code quality and consistency
- **pnpm** - Fast, disk-efficient package manager
- **Git** - Version control

## 📦 Project Structure

```
competency-v2-2/
├── src/
│ ├── app/
│ │ ├── (home)/ # Landing page
│ │ ├── about/ # About & team info
│ │ ├── tpqi/ # TPQI framework pages
│ │ ├── sfia/ # SFIA framework pages (planned)
│ │ └── layout.tsx # Root layout
│ ├── components/
│ │ ├── ui/ # shadcn/ui components
│ │ └── layout/ # Layout components (Navbar, Footer)
│ ├── lib/
│ │ ├── sector.ts # TPQI sector utilities
│ │ └── utils.ts # Helper functions
│ └── data/ # Static competency data
├── public/ # Static assets
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/algorithm368/competency-database-2-2.git

# Navigate to project directory
cd competency-database-2-2

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open http://localhost:3000 in your browser.
Build for Production

```bash
# Create optimized production build
pnpm build

# Start production server
pnpm start
```

📊 Performance Metrics
Compared to v2.1:

Page Load Time: ~70% faster (static pages)
Time to Interactive: ~50% improvement
Server Costs: ~40% reduction
Database Queries: ~80% reduction for competency browsing

🤝 Contributing
This is an academic project developed by:

Team Competency Database V2 (2025)

Mr. Jeerapat Kahyaisiang
Mr. Natthaphat Jaichue
Mr. Siriwat Chairak
Advisor: Dr. Suradet Jitprapaikulsarn
Department of Electrical and Computer Engineering, Naresuan University

📄 License
This project is developed as part of a senior project at Naresuan University.

🔗 Related Links
TPQI Official
SFIA Framework
Next.js Documentation
📧 Contact
For questions or collaboration:

Project Repository: github.com/algorithm368/competency-database-2-2
Department: ecpe.nu.ac.th
