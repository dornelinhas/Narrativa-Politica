/* ============================================================
   NARRATIVA POLÍTICA — Main JavaScript
   ============================================================ */

/* ── NAV BUILDER ─────────────────────────────────────────── */
function buildNav(activePage = '') {
  const pages = [
    { href: 'index.html',         label: 'Home'        },
    { href: 'pages/sobre.html',   label: 'Sobre'       },
    { href: 'pages/servicos.html',label: 'Serviços'    },
    { href: 'pages/projetos.html',label: 'Projetos'    },
    { href: 'pages/trilhas.html', label: 'Trilhas'     },
    { href: 'pages/blog.html',    label: 'Blog'        },
    { href: 'pages/oportunidades.html', label: 'Oportunidades' },
  ];

  // Detect if we are inside /pages/ subfolder
  const inPages = window.location.pathname.includes('/pages/');

  function resolveHref(href) {
    if (!inPages) return href;
    if (href === 'index.html') return '../index.html';
    return href.replace('pages/', '');
  }

  const links = pages.map(p => {
    const isActive = window.location.pathname.endsWith(p.href.replace('pages/', ''));
    return `<a href="${resolveHref(p.href)}" class="${isActive ? 'active' : ''}">${p.label}</a>`;
  }).join('');

  const logoHref = inPages ? '../index.html' : 'index.html';
  const ctaHref  = inPages ? 'sobre.html' : 'pages/sobre.html';

  document.getElementById('navbar').innerHTML = `
    <div class="container">
      <a href="${logoHref}" class="nav-logo">
        <div class="logo-icon">NP</div>
        Narrativa Política
      </a>
      <nav class="nav-links">
        ${links}
        <a href="${ctaHref}" class="btn-outline" style="padding:8px 20px;border-radius:50px;border:1.5px solid rgba(0,0,0,.1);font-size:.875rem;font-weight:700;">Contato</a>
      </nav>
      <div class="hamburger" id="hamburger" onclick="toggleMenu()">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;

  document.getElementById('mobile-menu').innerHTML = `${links}
    <a href="${ctaHref}" style="display:block;padding:14px 0;font-weight:700;">Entre em Contato →</a>
  `;
}

function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

/* ── FOOTER BUILDER ──────────────────────────────────────── */
function buildFooter() {
  const inPages = window.location.pathname.includes('/pages/');
  function r(href) {
    if (!inPages) return href;
    if (href === 'index.html') return '../index.html';
    return href.replace('pages/', '');
  }

  document.getElementById('footer').innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">Narrativa Política</div>
          <p class="footer-tagline">Transformando Teoria Econômica em Impacto. Especializada em Economia de Dados, ONGs, Liderança e Gênero.</p>
          <div class="social-links">
            <a href="#" class="social-link" title="Instagram">📷</a>
            <a href="#" class="social-link" title="LinkedIn">💼</a>
            <a href="#" class="social-link" title="Twitter/X">🐦</a>
            <a href="#" class="social-link" title="YouTube">▶</a>
            <a href="#" class="social-link" title="Spotify">🎙</a>
          </div>
        </div>
        <div>
          <p class="footer-col-title">Navegação</p>
          <div class="footer-links">
            <a href="${r('index.html')}">Home</a>
            <a href="${r('pages/sobre.html')}">Sobre Mim</a>
            <a href="${r('pages/projetos.html')}">Projetos & Métricas</a>
            <a href="${r('pages/blog.html')}">Blog & Artigos</a>
          </div>
        </div>
        <div>
          <p class="footer-col-title">Serviços</p>
          <div class="footer-links">
            <a href="${r('pages/servicos.html')}">Mentoria</a>
            <a href="${r('pages/servicos.html')}">Palestras</a>
            <a href="${r('pages/servicos.html')}">Consultoria Política</a>
            <a href="${r('pages/trilhas.html')}">Trilhas de Liderança</a>
          </div>
        </div>
        <div>
          <p class="footer-col-title">Recursos</p>
          <div class="footer-links">
            <a href="${r('pages/oportunidades.html')}">Oportunidades</a>
            <a href="${r('pages/trilhas.html')}">Trilha Gratuita</a>
            <a href="#">Newsletter</a>
            <a href="#">Política de Privacidade</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">© ${new Date().getFullYear()} Narrativa Política. Todos os direitos reservados.</p>
        <p class="footer-copy">Feito com ♥ para transformar o mundo</p>
      </div>
    </div>
  `;
}

/* ── SCROLL REVEAL ───────────────────────────────────────── */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── COUNTER ANIMATION ───────────────────────────────────── */
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const suffix = el.dataset.suffix || '';
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString('pt-BR') + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString('pt-BR') + suffix;
    }
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        animateCounter(el, parseInt(el.dataset.count), 2200);
        observer.unobserve(el);
      }
    });
  }, { threshold: .5 });
  counters.forEach(c => observer.observe(c));
}

/* ── NEWSLETTER ──────────────────────────────────────────── */
function handleNewsletter(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const input = e.target.querySelector('input');
  btn.textContent = 'Inscrito! ✓';
  btn.style.background = '#1DD1A1';
  input.value = '';
  setTimeout(() => { btn.textContent = 'Inscrever-me'; btn.style.background = ''; }, 3000);
}

/* ── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  buildFooter();
  initReveal();
  initCounters();

  // Newsletter forms
  document.querySelectorAll('.newsletter-form').forEach(f => {
    f.addEventListener('submit', handleNewsletter);
  });

  // Close mobile menu on link click
  document.querySelectorAll('#mobile-menu a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('mobile-menu').classList.remove('open'));
  });
});
