# 🌉 Bridge SHM Pro: Next-Gen Structure Intelligence 🚀

![Status](https://img.shields.io/badge/Status-LIVE-success?style=for-the-badge&logo=activitypub)
![Stack](https://img.shields.io/badge/Tech-Next.js_14_|_Tailwind_|_Framer-000000?style=for-the-badge&logo=next.js)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpriyadonthireddy2975%2Fbridge-shm-pro)

> **"The bridge is talking. Are you listening?"** 🎧🏗️

## 🌐 **Live Demo**
**[View Live Dashboard Prototype](https://bridge-shm-pro.vercel.app)**  
*(Note: If the link is not active, click the "Deploy" button above to launch your own instance in minutes!)*

---

## 🔥 **The Mission**

Welcome to the **Bridge SHM Pro** — a cutting-edge, **industrial-grade Structural Health Monitoring dashboard** designed to visualize real-time vibration data from ESP32 sensors. 

We don't do boring charts here. This is **Civil Engineering meets Cyberpunk**. 🦾

### ⚡ **Epic Features**
- 📡 **Real-Time Telemetry**: 500ms ultra-low latency polling from ESP32 / Data API.
- 🎨 **Neon Industrial UI**: Dark-mode first, glassmorphism panels, and reactive glow effects.
- 📈 **Dynamic Visualization**: Live, rolling 60-second vibration history with smooth interpolation.
- 🚨 **Intelligent Alert System**: Automatic "ABNORMAL VIBRATION" detection with pulsating red warnings.
- 📊 **3-Axis Analytics**: Dedicated X / Y / Z cards with RMS (g) and Peak Frequency (Hz) analysis.

---

## 📸 **Visual Experience**

### 🖥️ **Command Center**
*Imagine a screenshot here showing the glowing dashboard with live charts*

### ⚠️ **Critical Alert Mode**
*When vibration exceeds safety thresholds, the entire UI pulses Red to demand immediate attention.*

---

## 🛠️ **Tech Stack (Heavy Artillery)** 

This project is built with the modern web's most powerful tools:

| Tech | Role | Vibe |
|------|------|------|
| **Next.js 14** | Core Framework | ⚡ Blazing Fast |
| **react-dom** | UI Library | ⚛️ Component Power |
| **Tailwind CSS** | Styling Engine | 🎨 Pixel Perfect |
| **Framer Motion** | Animation | 🎬 Cinematic Smoothness |
| **Recharts** | Data Viz | 📉 Professional Grade |
| **Lucide React** | Iconography | 💎 Sharp & Clean |

---

## 🚀 **Quick Start**

Ready to fire it up? Let's go.

### 1. **Clone the Repo**
```bash
git clone https://github.com/YOUR_USERNAME/bridge-shm-pro.git
cd bridge-shm-pro
```

### 2. **Install Dependencies**
```bash
npm install
# Get text-ready to witness greatness
```

### 3. **Ignite the Engine**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) and watch it come alive. 🌟

---

## 🔌 **Hardware Integration (ESP32)**

This dashboard is ready to talk to your hardware. 

1. **Flash your ESP32** with the standard JSON data firmware.
2. **Update the Endpoint**:
   - Open `hooks/useSensorData.ts`
   - Swap `fetch("/api/data")` with `fetch("http://<ESP32_IP>/data")`
3. **Data Format**:
   ```json
   {
     "rx": 0.12, "ry": 0.05, "rz": 0.98,
     "fx": 25, "fy": 10, "fz": 0,
     "status": "NORMAL"
   }
   ```
   
---

## 🤝 **Contributing**

Got an idea to make it even more fire? 🔥
1. Fork it.
2. Branch it (`git checkout -b feature/epic-mode`).
3. Commit it (`git commit -m 'Added more neon'`).
4. Push it (`git push origin feature/epic-mode`).
5. Pull Request it.

---

## 📜 **License**

Distributed under the MIT License. Use it, break it, fix it, build the future. 🌍

---

### *Built with ❤️ and too much caffeine by [Your Name]*
