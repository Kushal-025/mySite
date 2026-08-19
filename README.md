# 🚀 Kushal Banerjee — Modern Full-Stack Developer Portfolio

Welcome to my personal developer portfolio! This repository contains a production-ready, full-stack web application built using **React 18**, **Tailwind CSS v4**, **Node.js/Express**, and **MongoDB Atlas Cloud**.

---

## 🌟 Tech Stack & Architecture

```
portfolio/
├── client/                     # ⚛️ Frontend (React + Vite + Tailwind CSS)
│   ├── public/                 # Static assets (images, resume.html)
│   ├── src/
│   │   ├── components/         # Reusable React UI Components
│   │   │   ├── Navbar.jsx      # Glassmorphic Floating Header + Mobile Drawer + Theme Toggle
│   │   │   ├── Hero.jsx        # Animated Headline + Glowing Profile Photo + CTAs
│   │   │   ├── About.jsx       # Tech Stack Badges + Animated Stats
│   │   │   ├── Resume.jsx      # Dual Timeline for Education & Internships
│   │   │   ├── Services.jsx    # 3D Interactive Service Cards
│   │   │   ├── Projects.jsx    # Filterable Showcase with Live Links
│   │   │   ├── Contact.jsx     # Full-Stack Contact Form (Node.js API + MongoDB + EmailJS)
│   │   │   ├── Footer.jsx      # 3-Column Footer with Socials & Quick Links
│   │   │   ├── ScrollProgress.jsx # Top Live Reading Bar
│   │   │   ├── BackToTop.jsx   # Floating Smooth Scroll Button
│   │   │   └── ParticleBackground.jsx # Dynamic Canvas Particle Animation
│   │   ├── App.jsx             # Main Application Container
│   │   ├── main.jsx            # React Root DOM Mount
│   │   └── index.css           # Tailwind CSS directives & custom glow utilities
│   ├── vite.config.js          # Vite Config + API Proxy
│   ├── vercel.json             # Vercel SPA Routing Configuration
│   └── package.json
│
├── server/                     # 🟢 Backend (Node.js + Express + MongoDB)
│   ├── config/
│   │   └── db.js               # Mongoose Cloud Database Connector + DNS Resolver
│   ├── models/
│   │   └── Message.js          # MongoDB Schema for Contact Form submissions
│   ├── routes/
│   │   └── contact.js          # Contact REST API endpoints (POST /api/contact, GET /api/contact)
│   ├── server.js               # Express REST Server on Port 5000 + 24/7 Keep-Alive Engine
│   ├── .env                    # Secret environment credentials (MongoDB URI, Port)
│   └── package.json
│
├── .gitignore                  # Git protection against committing .env or node_modules
├── package.json                # Root package with unified runner scripts
└── README.md                   # Complete Documentation
```

---

## ⚡ Quick Start / Running Locally

### 1. Install Dependencies
Run from the root directory:
```bash
npm run install:all
```
*(Or install inside both folders: `cd client && npm install` & `cd server && npm install`)*

---

### 2. Run the Application
You can run both frontend and backend concurrently or individually:

#### Run Frontend (React Dev Server):
```bash
npm run client
# Starts Vite dev server at http://localhost:5173
```

#### Run Backend (Express API):
```bash
npm run server
# Starts Node.js Express server at http://localhost:5000
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & MongoDB connection status |
| `POST` | `/api/contact` | Submits contact message to MongoDB Atlas database |
| `GET` | `/api/contact` | Retrieves list of all submitted messages (Admin/Testing) |

---

## 🚀 How to Deploy to Production (100% Free)

### 1. Push to GitHub
```bash
git add .
git commit -m "feat: complete full-stack portfolio"
git push origin main
```

### 2. Deploy Frontend on Vercel (Free)
1. Go to [Vercel.com](https://vercel.com/) and import your GitHub repository.
2. Set **Root Directory** to `client`.
3. Set **Framework Preset** to `Vite`.
4. Click **Deploy**.

### 3. Deploy Backend on Render.com (Free 24/7)
1. Go to [Render.com](https://render.com/) → **New Web Service**.
2. Connect your GitHub repository.
3. Set **Root Directory** to `server`.
4. Set **Build Command** to `npm install` and **Start Command** to `node server.js`.
5. Under **Environment Variables**, add:
   - `MONGODB_URI`: `mongodb+srv://kushalbanerjee025_db_user:Kushal2004@cluster0.ubk6zb5.mongodb.net/kushal_portfolio?retryWrites=true&w=majority&appName=Cluster0`
   - `SERVER_URL`: `https://your-render-url.onrender.com` *(enables 24/7 keep-alive)*
6. Click **Deploy Web Service**.

---

## 🛡️ Security Features
- **Input Sanitization & Validation**: Regex email validation on both client and server.
- **Rate Limiting**: Express rate limiting protects the API against spam attacks.
- **CORS Protection**: Secure origin headers for cross-origin API communication.
- **Safe Fallback Mode**: Client gracefully falls back if network connectivity is interrupted.

---

## 👨‍💻 Author
**Kushal Banerjee**  
- **Email**: [kushalbanerjee025@gmail.com](mailto:kushalbanerjee025@gmail.com)  
- **GitHub**: [@Kushal-025](https://github.com/Kushal-025)  
- **LinkedIn**: [Kushal Banerjee](https://www.linkedin.com/in/kushal-banerjee)


- 
