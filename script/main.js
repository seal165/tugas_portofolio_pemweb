/* =====================================================
   PORTFOLIO — EOLIA SHALBILLAH GADIS SUWANDI (JEY)
   Interactions & animations
   ===================================================== */

(function () {
  'use strict';

  /* ===================================================
     1. NAVBAR — fade in saat load
     =================================================== */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('load', () => {
      navbar.style.opacity = '1';
    });
  }

  /* ===================================================
     2. REVEAL ON SCROLL (IntersectionObserver)
     =================================================== */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, Number(delay));
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: langsung tampilkan
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ===================================================
     3. ACTIVE NAV LINK (based on visible section)
     =================================================== */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              const isMatch = link.getAttribute('href') === `#${id}`;
              link.classList.toggle('is-active', isMatch);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ===================================================
     4. BACK TO TOP BUTTON
     =================================================== */
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===================================================
     5. SMOOTH SCROLL (fallback untuk browser lama)
     =================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = 80; // kompensasi navbar floating
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ===================================================
     6. PROJECTS CATALOG, PREVIEW MODAL & CAROUSEL (5s)
     =================================================== */
  const PROJECTS_DATA = [
    {
      id: 'pupr-banten',
      title: 'Sistem Informasi Layanan Pengujian Bahan Pembangunan',
      category: 'Government Tech / Digitization',
      subtitle: 'UPTD Pengujian Bahan Konstruksi Bangunan Dinas PUPR Banten',
      tags: ['express', 'ejs', 'mysql', 'architecture'],
      description: 'Aplikasi sistem informasi berbasis web end-to-end untuk digitalisasi layanan pengujian bahan bangunan dari pengajuan hingga hasil uji secara online.',
      tasks: [
        'Memimpin analisa kebutuhan sistem dan transformasi alur dari manual/kertas ke sistem digital.',
        'Merancang arsitektur database relasional dan otorisasi role (Pemohon, Verifikator, Penguji, Kepala UPTD).',
        'Mengembangkan REST API backend dan rendering frontend berbasis EJS template.',
        'Membuat modul laporan otomatis dan visualisasi grafik riwayat pengujian.'
      ],
      tech: {
        frontend: 'EJS, Bootstrap, Tailwind CSS',
        backend: 'Node.js, Express.js',
        database: 'MySQL',
        tools: 'VS Code, Git, Postman'
      },
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    {
      id: 'soulcanvas',
      title: 'SoulCanvas — Mood & Time Capsule App',
      category: 'Mobile Application / UI UX',
      subtitle: 'React Native & Expo Mobile Application',
      tags: ['react-native', 'expo', 'mobile'],
      description: 'Aplikasi mobile interaktif untuk refleksi artistik berbasis suasana hati (mood) dan pembuatan kapsul waktu pesan masa depan.',
      tasks: [
        'Merancang UI/UX modern dengan estetika minimalis dan komponen transparan.',
        'Mengimplementasikan gestur sentuh interaktif dan animasi halus menggunakan React Native.',
        'Mengelola penyimpanan data lokal dan sinkronisasi log jurnal harian.'
      ],
      tech: {
        frontend: 'React Native, Expo, Tailwind (NativeWind)',
        backend: 'Node.js',
        database: 'AsyncStorage / SQLite',
        tools: 'Figma, VS Code'
      },
      images: [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    {
      id: 'laporpak',
      title: 'LaporPak — Public Complaint System',
      category: 'Full-Stack Web App',
      subtitle: 'Client-Server Architecture & Role Access Control',
      tags: ['express', 'mysql', 'fullstack'],
      description: 'Sistem pengaduan masyarakat berbasis web untuk pelaporan insiden fasilitas umum dengan otentikasi peran dan pelacakan status laporan.',
      tasks: [
        'Membuat alur pengaduan berbasis tiket status (Pending, Processed, Resolved).',
        'Menulis query MySQL teroptimasi dan manajemen middleware autentikasi JWT.',
        'Membuat dashboard admin untuk tindak lanjut laporan petugas.'
      ],
      tech: {
        frontend: 'HTML5, CSS3, JavaScript',
        backend: 'Express.js',
        database: 'MySQL',
        tools: 'Postman, Git'
      },
      images: [
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    {
      id: 'iot-smart-watering',
      title: 'Smart Automated Plant Watering System',
      category: 'IoT & Embedded System',
      subtitle: 'ESP32 Microcontroller & Blynk Cloud',
      tags: ['iot', 'cpp', 'hardware'],
      description: 'Sistem penyiraman tanaman otomatis berbasis kelembaban tanah dengan pemantauan telemetri real-time melalui smartphone.',
      tasks: [
        'Merancang sirkuit elektronik menggunakan mikrokontroler ESP32, sensor soil moisture, dan modul relay.',
        'Menulis program C++ di Arduino IDE untuk pembacaan ambang batas sensorik.',
        'Mengintegrasikan pemicu otomatisasi dan kontrol jarak jauh via Blynk Cloud App.'
      ],
      tech: {
        frontend: 'Blynk Mobile Dashboard',
        backend: 'C++ (Arduino Framework)',
        database: 'Blynk Cloud Telemetry',
        tools: 'ESP32 Microcontroller, Soil Sensor, Relays'
      },
      images: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1000&q=80'
      ]
    }
  ];

  function initProjectsCatalog() {
    const container = document.getElementById('projects-container');
    const tagsContainer = document.getElementById('project-tags');
    if (!container) return;

    let activeTag = 'all';
    let currentProject = null;
    let currentSlideIndex = 0;
    let slideTimer = null;
    const SLIDE_DURATION = 5000; // 5 Detik

    const allTags = ['all', ...new Set(PROJECTS_DATA.flatMap((p) => p.tags))];

    function renderTags() {
      if (!tagsContainer) return;
      tagsContainer.innerHTML = allTags
        .map(
          (tag) => `
        <button class="tag-btn ${tag === activeTag ? 'active' : ''}" data-tag="${tag}">
          #${tag}
        </button>
      `
        )
        .join('');

      tagsContainer.querySelectorAll('.tag-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          activeTag = btn.dataset.tag;
          renderTags();
          renderProjects();
        });
      });
    }

    function renderProjects() {
      const filtered =
        activeTag === 'all'
          ? PROJECTS_DATA
          : PROJECTS_DATA.filter((p) => p.tags.includes(activeTag));

      container.innerHTML = filtered
        .map(
          (p) => `
        <div class="project-card group" data-id="${p.id}">
          <div class="space-y-2">
            <div class="flex justify-between items-start text-xs font-mono text-slate-400">
              <span class="text-techblue">${p.category}</span>
              <span>${p.images.length} Pages</span>
            </div>
            <h3 class="text-lg font-bold text-white group-hover:text-techblue transition-colors">${p.title}</h3>
            <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">${p.description}</p>
          </div>
          
          <div class="pt-4 flex items-center justify-between border-t border-slate-800/80 mt-4 text-xs font-mono">
            <div class="flex flex-wrap gap-1">
              ${p.tags.slice(0, 3).map((t) => `<span class="text-slate-500">#${t}</span>`).join(' ')}
            </div>
            <span class="text-techblue font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Preview &rarr;
            </span>
          </div>
        </div>
      `
        )
        .join('');

      container.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('click', () => {
          openModal(card.dataset.id);
        });
      });
    }

    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const progressBar = document.getElementById('modal-progress-bar');

    function openModal(projectId) {
      currentProject = PROJECTS_DATA.find((p) => p.id === projectId);
      if (!currentProject || !modal) return;

      document.getElementById('modal-title').textContent = currentProject.title;
      document.getElementById('modal-category').textContent = currentProject.category;
      document.getElementById('modal-subtitle').textContent = currentProject.subtitle;
      document.getElementById('modal-description').textContent = currentProject.description;

      const tasksEl = document.getElementById('modal-tasks');
      tasksEl.innerHTML = currentProject.tasks.map((t) => `<li>${t}</li>`).join('');

      const techEl = document.getElementById('modal-techstack');
      techEl.innerHTML = `
        <div class="p-2 rounded bg-slate-900 border border-slate-800"><span class="text-slate-500 block">Frontend:</span> <span class="text-slate-200">${currentProject.tech.frontend}</span></div>
        <div class="p-2 rounded bg-slate-900 border border-slate-800"><span class="text-slate-500 block">Backend:</span> <span class="text-slate-200">${currentProject.tech.backend}</span></div>
        <div class="p-2 rounded bg-slate-900 border border-slate-800"><span class="text-slate-500 block">Database:</span> <span class="text-slate-200">${currentProject.tech.database}</span></div>
        <div class="p-2 rounded bg-slate-900 border border-slate-800"><span class="text-slate-500 block">Tools:</span> <span class="text-slate-200">${currentProject.tech.tools}</span></div>
      `;

      currentSlideIndex = 0;
      showSlide(currentSlideIndex);
      startAutoSlide();

      modal.classList.add('is-open');
      document.body.classList.add('modal-open');
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('is-open');
      document.body.classList.remove('modal-open');
      stopAutoSlide();
    }

    function showSlide(index) {
      if (!currentProject) return;
      const slidesCount = currentProject.images.length;
      currentSlideIndex = (index + slidesCount) % slidesCount;

      const slideContainer = document.getElementById('modal-slide-container');
      slideContainer.innerHTML = `
        <img src="${currentProject.images[currentSlideIndex]}" alt="Preview ${currentSlideIndex + 1}" class="w-full h-full object-cover transition-all duration-500" />
        <div class="absolute bottom-2 right-3 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono text-slate-300 border border-slate-800">
          Page ${currentSlideIndex + 1} of ${slidesCount}
        </div>
      `;

      const dotsEl = document.getElementById('modal-dots');
      dotsEl.innerHTML = currentProject.images
        .map(
          (_, i) => `
        <button class="w-2 h-2 rounded-full transition-all ${i === currentSlideIndex ? 'bg-techblue w-4' : 'bg-slate-600'}" data-slide="${i}"></button>
      `
        )
        .join('');

      dotsEl.querySelectorAll('button').forEach((dot) => {
        dot.addEventListener('click', () => {
          showSlide(parseInt(dot.dataset.slide));
          restartAutoSlide();
        });
      });

      resetProgressBar();
    }

    function resetProgressBar() {
      if (!progressBar) return;
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      setTimeout(() => {
        progressBar.style.transition = `width ${SLIDE_DURATION}ms linear`;
        progressBar.style.width = '100%';
      }, 50);
    }

    function startAutoSlide() {
      stopAutoSlide();
      resetProgressBar();
      slideTimer = setInterval(() => {
        showSlide(currentSlideIndex + 1);
      }, SLIDE_DURATION);
    }

    function stopAutoSlide() {
      if (slideTimer) clearInterval(slideTimer);
      if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
      }
    }

    function restartAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showSlide(currentSlideIndex - 1);
        restartAutoSlide();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showSlide(currentSlideIndex + 1);
        restartAutoSlide();
      });
    }

    renderTags();
    renderProjects();
  }

  // Jalankan inisialisasi catalog
  initProjectsCatalog();

  /* ===================================================
     7. LOG KONSOLE (personal touch)
     =================================================== */
  console.log(
    '%c// Jey — Create with Purpose',
    'color:#38bdf8; font-family:monospace; font-size:12px; padding:4px 8px;'
  );
})();