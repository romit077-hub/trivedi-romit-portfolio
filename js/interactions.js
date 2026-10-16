/* ==========================================================================
   3D CARD TILT PHYSICS, PROJECT FILTERING & ARCHITECTURE MODAL
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 1. 3D Perspective Tilt & Radial Specular Glare
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5.2;
      const rotateY = ((x - centerX) / centerX) * 5.2;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });

  // 2. Category Filtering for Projects
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-filter');
      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (target === 'all' || category === target) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 3. Project Architecture Modal Data & Controller
  const projectDetails = {
    psxrent: {
      badge: 'Full-Stack Production Platform',
      title: 'PSxRENT — Console & Gear Rental Platform',
      desc: 'A full-stack rental platform tailored for gaming consoles and accessories across Ahmedabad and Gandhinagar, engineered with end-to-end type safety and serverless database scaling.',
      bullets: [
        'Designed normalized Prisma ORM schemas for console tiers, controller bundles, rental durations, and availability windows.',
        'Built custom interactive expandable catalog cards in React & Tailwind CSS with smooth state transitions.',
        'Configured automated database seed scripts and deployed to Vercel with PostgreSQL / Neon backend.'
      ],
      tags: ['Next.js', 'TypeScript', 'Prisma ORM', 'PostgreSQL / Neon', 'Tailwind CSS', 'Vercel']
    },
    neurovault: {
      badge: 'Local AI Knowledge System',
      title: 'NEUROVAULT & SYNAPSE Reasoning Engine',
      desc: 'An AI-driven knowledge synthesis and verification engine executing local quantized LLMs to extract structured claims and flag semantic contradictions across documents.',
      bullets: [
        'Engineered deterministic prompt pipelines running Qwen 2.5 Coder 7B locally via Ollama.',
        'Implemented automated claim-triplet extraction and cross-document contradiction scoring in Python.',
        'Zero external API latency or token cost, optimized for 8GB VRAM RTX 4060 execution.'
      ],
      tags: ['Python', 'Ollama', 'Qwen 2.5 Coder 7B', 'JSON Schema Inference', 'Git']
    },
    dbsentry: {
      badge: 'Autonomous Agent Supervision',
      title: 'Semantic Progress Runtime & DB-Sentry',
      desc: 'Architectural runtime supervisors designed to monitor autonomous AI agents by evaluating true environment state mutations and guarding database transactions.',
      bullets: [
        'Tracks semantic state progression across agent tool calls to detect stagnant loops and hallucinated progress.',
        'DB-Sentry intercepts destructive or malformed SQL queries prior to execution against production schemas.',
        'Provides structured telemetry logs and rollback checkpoints for safe autonomous workflows.'
      ],
      tags: ['AI Agent Supervision', 'Python', 'SQL Guardrails', 'State Telemetry', 'System Architecture']
    },
    vision: {
      badge: 'Computer Vision Pipeline',
      title: 'Real-Time CCTV Surveillance & YOLOv8 Engine',
      desc: 'Formulated for the Gujarat Police Hackathon Innovation Challenge to process multi-camera surveillance streams with real-time object detection and alert indexing.',
      bullets: [
        'Integrated YOLOv8 object detection models with OpenCV video capture pipelines for frame-by-frame analysis.',
        'Built a responsive Streamlit operator dashboard for live feed inspection and timestamped event filtering.',
        'Tuned inference batching for CUDA hardware acceleration.'
      ],
      tags: ['Python', 'YOLOv8', 'OpenCV', 'Streamlit', 'CUDA Acceleration']
    },
    nanobanana: {
      badge: '3D WebGL & Brand Architecture',
      title: 'Nano Banana Emblem & Spatial Web Systems',
      desc: 'A synthesis of geometric logo craftsmanship ("Nano Banana"), interactive campus stall roleplay design ("Multiverse Immigration & Customs"), and 3D WebGL liquid glass interfaces.',
      bullets: [
        'Constructed scalable vector emblems and high-contrast futuristic visual assets.',
        'Engineered real-time Three.js vertex-displaced liquid glass geometry paired with SVG feDisplacementMap refraction.',
        'Maintains 60 FPS rendering with automatic tab-visibility pause and responsive mobile fallbacks.'
      ],
      tags: ['Three.js', 'WebGL', 'SVG Filters', 'Brand Identity', 'Spatial UI']
    },
    android: {
      badge: 'Native Android Engineering',
      title: 'Kotlin JSON-to-SQLite Sync & Media Suite',
      desc: 'Academic and practical Android Studio mobile applications written in Kotlin focusing on asynchronous network synchronization, local persistence, and audio playback.',
      bullets: [
        'Implemented background JSON ingestion via HttpURLConnection and Kotlin Coroutines without blocking the UI thread.',
        'Mapped parsed contact payloads directly into a local SQLite database with custom RecyclerView adapters.',
        'Built a dedicated MP3 media player interface with lifecycle-aware playback controls.'
      ],
      tags: ['Kotlin', 'Android Studio', 'Coroutines', 'SQLite', 'HttpURLConnection']
    }
  };

  const modal = document.getElementById('project-modal');
  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalBullets = document.getElementById('modal-bullets');
  const modalTags = document.getElementById('modal-tags');
  const closeBtn = document.getElementById('modal-close-btn');

  document.querySelectorAll('[data-open-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-open-modal');
      const data = projectDetails[key];
      if (!data || !modal) return;

      modalBadge.textContent = data.badge;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;

      modalBullets.innerHTML = data.bullets.map((b) => `<li>${b}</li>`).join('');
      modalTags.innerHTML = data.tags.map((t) => `<span class="tech-tag">${t}</span>`).join('');

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
