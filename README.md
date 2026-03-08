# 🚀 Wincel Crusit - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, featuring interactive 3D elements, smooth animations, and a seamless user experience.

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, professional design with smooth animations
- 🎭 **Interactive 3D Graphics** - Spline 3D scenes for hero and footer sections
- 📱 **Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
- ⚡ **Performance Optimized** - Lazy loading, code splitting, and image optimization
- 🔒 **Security Hardened** - XSS protection with DOMPurify, secure environment variables
- 📧 **Contact Form** - Integrated EmailJS for seamless communication
- 🎬 **Smooth Animations** - Framer Motion for buttery-smooth transitions
- 🌐 **SEO Ready** - Optimized meta tags and semantic HTML
- 🎯 **Real-time Uptime** - Dynamic page uptime counter in header
- 📊 **Tech Stack Showcase** - Animated marquee with 41+ technologies

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15.3.3 (App Router)
- **UI Library:** React 19.0.0
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4.0
- **Animations:** Framer Motion 12.35.0
- **3D Graphics:** Spline (@splinetool/react-spline)
- **Icons:** Lucide React 0.577.0

### Backend/Services
- **Email Service:** EmailJS 4.4.1
- **Security:** DOMPurify
- **Deployment:** Vercel (optimized)

### Development Tools
- **Linting:** ESLint 9
- **Type Checking:** TypeScript strict mode
- **Package Manager:** npm

## 📦 Installation

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wei-portfolio.git
   cd wei-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

   **How to get EmailJS credentials:**
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create an email service
   - Create an email template
   - Get your public key from Account settings

4. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables in Vercel project settings

3. **Environment Variables on Vercel**
   
   Add these in Settings → Environment Variables:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

4. **Deploy**
   ```bash
   git push origin main
   # Vercel will auto-deploy
   ```

### Manual Deploy via CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

## 📁 Project Structure

```
wei-portfolio/
├── public/
│   ├── Resume/              # Resume PDF file
│   ├── Teckstack/           # Tech stack SVG icons (41 files)
│   ├── Works/               # Portfolio project images
│   ├── tiktok.svg           # TikTok icon
│   └── WwhiteLogo.svg       # Logo
├── src/
│   └── app/
│       ├── app/
│       │   ├── page.tsx              # Main portfolio page
│       │   └── selectedworks.tsx     # Selected works data
│       ├── components/
│       │   ├── About.tsx             # About section
│       │   ├── ClientLayout.tsx      # Client-side layout wrapper
│       │   ├── ContactForm.tsx       # Contact form with EmailJS
│       │   ├── Experience.tsx        # Experience timeline
│       │   ├── FAQ.tsx               # FAQ accordion
│       │   ├── Footer.tsx            # Footer with social links
│       │   ├── FooterSplineBackground.tsx
│       │   ├── Header.tsx            # Main header
│       │   ├── HeroSpline.tsx        # Hero 3D scene
│       │   ├── LoadingSplash.tsx     # Loading screen
│       │   ├── Pricing.tsx           # Pricing section
│       │   ├── SelectedWorkStickyStack.tsx
│       │   ├── Services.tsx          # Services offered
│       │   ├── SidebarNav.tsx        # Sidebar navigation
│       │   ├── TechMarquee.tsx       # Tech stack marquee
│       │   ├── TextRotator.tsx       # Rotating text animation
│       │   ├── TopHeader.tsx         # Top header with uptime
│       │   └── VantaBackground.tsx   # Animated background
│       ├── globals.css               # Global styles
│       └── layout.tsx                # Root layout
├── .env.local                        # Environment variables (not in git)
├── .gitignore                        # Git ignore rules
├── eslint.config.mjs                 # ESLint configuration
├── next.config.ts                    # Next.js configuration
├── package.json                      # Dependencies
├── postcss.config.mjs                # PostCSS configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # This file
```

## 🎨 Sections

- **Hero** - Introduction with 3D Spline animation and rotating job titles
- **Selected Works** - Showcase of portfolio projects with hover effects
- **Services** - Services offered with detailed descriptions
- **About** - Personal information and background
- **Experience** - Professional experience timeline
- **Tech Stack** - Dual-row animated marquee (41 technologies)
- **FAQ** - Frequently asked questions with accordion
- **Contact** - Contact form with Philippine phone validation
- **Footer** - Social links and 3D background

## 🔧 Configuration

### Responsive Behavior
- **Mobile breakpoint:** < 768px
- **Tablet breakpoint:** 768px - 1024px
- **Desktop breakpoint:** > 1024px

### Animation Settings
- **Tech Marquee Speed (Mobile):** 150s duration
- **Tech Marquee Speed (Desktop):** 40s duration
- **Header Toggle:** Location ↔ Uptime every 3 seconds

### Custom Colors
- **Primary Orange:** `#ff5b1a`
- **Background:** Black with gradient overlays
- **Text:** White with opacity variations

## 🔒 Security Features

- ✅ Environment variables properly isolated in `.env.local`
- ✅ DOMPurify sanitization for all form inputs
- ✅ Philippine phone number validation regex
- ✅ Email format validation
- ✅ No hardcoded API keys in source code
- ✅ HttpOnly cookie support (if JWT implemented)

## 🛠️ Scripts

```bash
# Development
npm run dev            # Start dev server with Turbopack

# Production
npm run build          # Build for production
npm start              # Start production server

# Linting
npm run lint           # Run ESLint
```

## 📊 Performance

- ⚡ Lazy loading for Spline 3D scenes
- ⚡ Optimized images with next/image (where applicable)
- ⚡ Code splitting for better bundle sizes
- ⚡ Server-side redirects for faster navigation
- ⚡ Edge-optimized image domains configured

## 🐛 Known Issues & Solutions

### Build Warnings
- Some `<img>` tags could be replaced with `<Image>` for better optimization (non-blocking)

### Browser Compatibility
- Tested on: Chrome, Firefox, Safari, Edge (latest versions)
- 3D Spline scenes require WebGL support

## 🤝 Contributing

While this is a personal portfolio, suggestions and feedback are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for personal use. All rights reserved © 2026 Wincel Crusit.

## 📧 Contact

**Wincel Crusit**
- Email: crusitwincel@gmail.com
- LinkedIn: [linkedin.com/in/wincel-crusit-284364305](https://linkedin.com/in/wincel-crusit-284364305)
- GitHub: [github.com/yourusername](https://github.com)
- TikTok: [@wiwotech](https://tiktok.com/@wiwotech)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Deployment platform
- [Spline](https://spline.design/) - 3D design tool
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [EmailJS](https://www.emailjs.com/) - Email service
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide Icons](https://lucide.dev/) - Icon library

---

Made with ❤️ by Wincel Crusit | © 2026
