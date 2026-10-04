# CrevoSys 2.0

<p align="center">
  <img src="/public/gradient.webp" alt="CrevoSys Banner" width="100%" style="border-radius: 12px; max-height: 280px; object-fit: cover;" />
</p>

<p align="center">
  <strong>Next-Generation Digital Agency Web Platform</strong>
  <br />
  Engineered with Next.js 15, React 19, TypeScript, Tailwind CSS v4, GSAP, and Framer Motion.
</p>

<p align="center">
  <a href="https://github.com/crevosys-official/crevosys_2.0">
    <img src="https://img.shields.io/badge/Next.js-15.3.6-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-6.0.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </a>
  <a href="https://gsap.com/">
    <img src="https://img.shields.io/badge/GSAP-3.13-88CE02?style=for-the-badge&logo=greensock" alt="GSAP" />
  </a>
</p>

---

## 🌟 Overview

**CrevoSys 2.0** is the official web application of **CrevoSys**, a modern full-service digital craftsmanship agency delivering scalable web and mobile applications, UI/UX design systems, AI workflow automation, and performance marketing.

The platform provides a luxury, dark-themed digital experience featuring fluid 3D animations, masked typographic transitions, butter-smooth inertial scrolling, and interactive team showcases.

---

## ✨ Key Features

- **Cinematic 3D Hero Experience**: GSAP-powered headline reveal animations, perspective parallax drift, and reactive atmospheric glow effects.
- **Interactive 3D Squad Showcase**: Dynamic profile cards with synchronized GSAP 3D kinetic typography transitions, directional character stagger, and responsive sizing.
- **Inertial Smooth Scrolling**: Powered by [Lenis](https://github.com/darkroomengineering/lenis) for a fluid, momentum-based user experience.
- **Dedicated Service Architecture**: Comprehensive deep-dive pages for:
  - 💻 Full-Stack Software Development
  - 🎨 UI/UX Design Systems & Prototyping
  - ⚡ AI Workflow Automation & Architecture
  - 📈 Digital Marketing & Brand Strategy
- **Case Studies & Portfolio Stack**: Interactive stacked cards with case study previews, live tech tags, and project modals.
- **Founders & Origin Showcase**: Leadership spotlight, live performance metrics, and organizational timeline.
- **Contact & Inquiry Pipeline**: Asynchronous contact forms integrated with **Resend** and interactive notifications via **Sonner**.
- **Dark Mode Aesthetic**: Curated obsidian/zinc color schemes with bespoke gradients, glassmorphism, and custom brand fonts (*HeadingNow*, *Bebas Neue*, *Anton*, and *Inter Tight*).

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + PostCSS |
| **Motion & Animation** | [GSAP 3](https://gsap.com/) (`@gsap/react`), [Framer Motion](https://www.framer.com/motion/) |
| **Smooth Scrolling** | [Lenis](https://lenis.darkroom.engineering/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/), [Sonner](https://sonner.emilkowal.ski/) |
| **Email API** | [Resend](https://resend.com/) |

---

## 📂 Project Structure

```text
crevosys_2.0/
├── public/                     # Static assets (images, team portraits, brand assets)
│   ├── assets/fonts/           # Custom web fonts (HeadingNow variants)
│   └── Team/                   # High-res team member photography
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── about/              # About CrevoSys (Founders, Stats, The Squad, Vision)
│   │   ├── api/contact/        # Serverless contact submission route via Resend
│   │   ├── contact/            # Interactive contact page
│   │   ├── services/           # Service deep-dive routes
│   │   │   ├── automation/     # AI Automation & Workflows
│   │   │   ├── design/         # UI/UX & Design Systems
│   │   │   ├── development/    # Full-Stack Engineering
│   │   │   └── marketing/      # Digital Marketing & Growth
│   │   ├── team/               # Team directory page
│   │   ├── globals.css         # Tailwind v4 configuration, theme tokens, & fonts
│   │   ├── layout.tsx          # Root layout with Lenis provider & Preloader
│   │   ├── not-found.tsx       # Custom 404 error page
│   │   └── page.tsx            # Main Homepage
│   ├── components/
│   │   ├── contact/            # Contact layouts & submission forms
│   │   ├── layout/             # Global Navbar, Footer, Navigation
│   │   ├── sections/           # Modular homepage & page sections
│   │   │   ├── About.tsx       # About teaser
│   │   │   ├── Faq.tsx         # Frequently Asked Questions accordion
│   │   │   ├── GetTouch.tsx    # Conversion CTA section
│   │   │   ├── Hero.tsx        # High-impact animated Hero
│   │   │   ├── Projects.tsx    # Sticky stacked case studies
│   │   │   ├── Services.tsx    # Interactive service cards
│   │   │   ├── TeamSquadSection.tsx # 3D kinetic squad showcase
│   │   │   ├── Testimonials.tsx# Client reviews & testimonials
│   │   │   └── technology.tsx  # Technology matrix showcase
│   │   ├── team/               # Team layouts & components
│   │   └── ui/                 # Reusable buttons, badges, modals, sonner toasts
│   ├── data/                   # Structured static data & copy
│   ├── lib/                    # Shared utilities, Lenis config, styling helpers
│   └── types/                  # Global TypeScript type definitions
├── next.config.ts              # Next.js build & remote image configuration
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler configuration
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js**: `v18.18.0` or higher (Node 20+ recommended)
- **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/crevosys-official/crevosys_2.0.git
   cd crevosys_2.0
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # Resend API Key for contact form submissions
   RESEND_API_KEY=your_resend_api_key_here
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Runs the Next.js development server with hot-reload |
| **Build** | `npm run build` | Compiles and builds the production bundle |
| **Start** | `npm run start` | Starts the Next.js production server |
| **Lint** | `npm run lint` | Runs ESLint checks across the codebase |

---

## 🌐 Deployment

The application is optimized for zero-configuration continuous deployment on **Vercel**:

1. Push your changes to GitHub.
2. Import the repository into the [Vercel Dashboard](https://vercel.com).
3. Ensure the environment variables (e.g., `RESEND_API_KEY`) are added under **Project Settings $\to$ Environment Variables**.
4. Deploy!

Alternatively, deploy using the Vercel CLI:
```bash
npx vercel --prod
```

---

## 👥 Core Leadership & Team

- **MD Abu Sahid** – *Chief Executive Officer (CEO) • MERN Stack & UI/UX*
- **Joyant Sheikhar** – *Chief Technology Officer (CTO) • Software Developer*
- **Abid Shahriar** – *Chief Operating Officer (COO) • Web Developer*

---

## 📄 License & Ownership

© 2026 **CrevoSys**. All rights reserved.  
Proprietary software engineered by CrevoSys.

lsof -i :3000 -i :3001