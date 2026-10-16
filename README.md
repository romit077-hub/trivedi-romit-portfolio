# Trivedi Romit — 3D & Liquid Glass Portfolio

A production-tuned **3D WebGL & Optical Liquid Glass Portfolio** engineered for zero-configuration deployment on **GitHub** and **Vercel**.

## Architecture Highlights
- **3D WebGL Core (`js/webgl-scene.js`)**: Real-time Three.js `MeshPhysicalMaterial` icosahedron with multi-frequency trigonometric vertex displacement, orbiting liquid droplets, and depth particle field.
- **Optical Liquid Glass (`css/style.css`)**: Hardware-accelerated `backdrop-filter: blur(26px) saturate(190%)`, multi-layered specular inset borders, and inline SVG `<feTurbulence>` + `<feDisplacementMap>` refraction.
- **Interactive 3D Card Physics (`js/interactions.js`)**: Cursor-tracked `perspective(1000px) rotateX() rotateY()` transforms, radial glare coordinates, category filtering (`All`, `Full-Stack`, `AI & Runtimes`, `3D, Brand & Mobile`), and an interactive Architecture Deep-Dive Modal.
- **Vercel Production Config (`vercel.json`)**: Pre-configured clean URLs, security headers, and immutable asset caching.

---

## Project Structure
```text
.
├── index.html            # Main portfolio entry point (Hero, Projects, Studies, Stack, Interests, Contact)
├── vercel.json           # Vercel zero-build static configuration & caching headers
├── .gitignore            # Standard Git ignore rules
├── assets/
│   └── favicon.svg       # Custom liquid gradient vector icon
├── css/
│   └── style.css         # Liquid glassmorphism, 3D tilt variables & responsive layout
└── js/
    ├── webgl-scene.js    # Three.js 3D liquid orb, droplets & starfield pipeline
    └── interactions.js   # 3D card tilt physics, project filter & architecture modal
```

---

## Step-by-Step: Upload to GitHub & Deploy on Vercel

### Method A: Direct Web Upload (No Terminal Required)
1. **Unzip** `trivedi-romit-3d-liquid-portfolio.zip` on your computer.
2. Go to [GitHub — New Repository](https://github.com/new) and create a repository (e.g., `trivedi-romit-portfolio`).
3. Click **"uploading an existing file"** on the repository setup screen.
4. Drag and drop **all unzipped files and folders** (`index.html`, `vercel.json`, `.gitignore`, `README.md`, `assets/`, `css/`, `js/`) directly into the browser window.
5. Click **"Commit changes"**.
6. Go to [Vercel Dashboard](https://vercel.com/new), click **"Import"** next to your new GitHub repository, leave Framework Preset as **"Other"**, and click **"Deploy"**.

### Method B: Git CLI Upload
```bash
unzip trivedi-romit-3d-liquid-portfolio.zip -d trivedi-romit-portfolio
cd trivedi-romit-portfolio
git init
git add .
git commit -m "feat: initial 3D liquid glass portfolio release"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
Then import the repository in **Vercel** and click **Deploy**.
