# Lucas Pinheiro - Portfolio

A modern, responsive portfolio website built with **React**, **TypeScript**, **Vite**, **Framer Motion**, and **Tailwind CSS**.

## Features

✨ **Modern Stack**

- React 18 with TypeScript
- Vite for fast development and optimized builds
- Tailwind CSS for utility-first styling
- Framer Motion for smooth animations

🎨 **Design**

- Dark/Light mode toggle with localStorage persistence
- Fully responsive design (mobile-first)
- Smooth scroll animations on scroll
- Interactive project gallery
- Animated skill badges

📱 **Sections**

- **Hero**: Eye-catching introduction with animated title
- **About**: Bio and professional background
- **Skills**: Technology stack with hover animations
- **Projects**: Portfolio with image galleries and GitHub links
- **Contact**: Social links and contact information

## Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   └── Contact.tsx
├── data/               # Portfolio data
│   └── portfolio.ts    # Easily editable content
├── types/              # TypeScript interfaces
│   └── index.ts
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles

assets/                 # Project images (existing)
│   ├── todoList/
│   ├── igniteshoes/
│   ├── motorly/
│   ├── flowPay/
│   └── remindImg/

img/                    # Hero image
├── Retrato profissional de jovem com gravata.png
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Server runs at `http://localhost:5173`

### Build

```bash
npm run build
```

Optimized build is generated in the `dist/` folder.

### Preview Build

```bash
npm run preview
```

## Editing Content

All portfolio content is centralized in `src/data/portfolio.ts`. Edit:

- **Bio & Title**: Profile information
- **Skills**: Technology icons and names
- **Projects**: Project details, descriptions, galleries, and GitHub links
- **Social Links**: Contact information
- **Tagline**: Motivational text

## Technologies Used

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Utilities**: react-intersection-observer for scroll triggers

## Migration Notes

This portfolio was migrated from a vanilla HTML/CSS/JavaScript implementation to a modern React + TypeScript stack.

**Original files** (backed up in `.old-portfolio-backup/`):

- `script.js` → React components in `src/components/`
- `styles.css` → Tailwind CSS in `src/index.css`
- `index.html` → Vite template in root `index.html`

**Improvements in new version**:

- Component-based architecture for better maintainability
- TypeScript for type safety
- Framer Motion for advanced animations
- Dark mode with system preference detection
- Significantly reduced CSS/JS bundle with Vite optimization
- Improved accessibility and semantic HTML

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2025 Lucas Pinheiro. All rights reserved.

## Contact

- 📧 Email: pinheiro.dev29@gmail.com
- 📞 Phone: +55 (85) 98118-9814
- 💼 LinkedIn: [lucaschavesp](https://www.linkedin.com/in/lucaschavesp)
- 💻 GitHub: [LucasC-Pinheiro](https://github.com/LucasC-Pinheiro)
- 📷 Instagram: [@lukaspinheiiro](https://www.instagram.com/lukaspinheiiro/)
