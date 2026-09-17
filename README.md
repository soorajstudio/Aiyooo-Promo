# 🎬 AI-YOOO Promo — Creative Agency & Startup Showcase

A modern, high-impact promotional landing page crafted for **AI-YOOO**, highlighting bespoke website design, startup MVP development, and creative digital experiences.

Built with fluid responsive typography, curved SVG marquee paths, smooth GSAP animations, and an interactive video showcase.

---

## ✨ Features & Highlights

- **Curved SVG Path Marquee**: Dynamic text path running along a custom Bézier curve (<textPath>) creating a wave marquee effect on scroll.
- **Interactive Video Showcase**: Multi-card video showcase with smooth hover inertia tilt and embedded HTML5 video reels.
- **GSAP & ScrollTrigger Animations**: High-performance scrolling transitions powered by GSAP and ScrollTrigger.
- **Fluid Container Scaling**: Responsive layout utilizing CSS clamp() math to scale seamlessly across desktop, tablet, and mobile displays.
- **Clean & Lightweight Codebase**: Zero bloat, no third-party framework dependencies, and error-free execution.

---

## 📁 Project Structure

`
Aiyooo promo/
├── index.html               # Main promo landing page markup & styling
├── css/
│   └── style.css            # Core stylesheet and layout rules
├── js/
│   └── script.js            # Unified bundle (GSAP, ScrollTrigger, CustomEase + App logic)
├── media/
│   ├── batman.mp4           # Video reel asset 1
│   ├── luca.mp4             # Video reel asset 2
│   └── panda.mp4            # Video reel asset 3
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Pages automated deployment
├── .gitignore               # Git ignore rules
└── README.md                # Project documentation
`

---

## 🚀 Getting Started

### 1. Direct Browser Launch
Double-click [index.html](./index.html) or open it with your browser of choice (Chrome, Edge, Firefox, Safari).

### 2. Local HTTP Server
To serve media and scripts via a local development server:

**Using Python:**
`ash
python -m http.server 8080
`
Then open http://localhost:8080 in your web browser.

**Using VS Code Live Server:**
- Install the **Live Server** extension.
- Right-click index.html and choose **Open with Live Server**.

---

## 🧰 Tech Stack

- **Markup & Styling**: HTML5, CSS3 (CSS Variables, Flexbox, CSS Grid, Fluid Clamp Sizing)
- **Animation**: [GSAP (GreenSock)](https://greensock.com/) + ScrollTrigger + CustomEase
- **Media**: HTML5 Video (<video> autoplay, muted, looping MP4)
