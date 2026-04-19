// Shared navigation component
function renderNav(activePage = '', theme = 'dark') {
  const isLight = theme === 'light';
  const navClass = isLight ? 'navbar light' : 'navbar';
  const logoClass = isLight ? 'logo light' : 'logo';
  const btnClass = activePage === 'envolva' ? 'nav-btn active' : 'nav-btn';

  const pages = [
    { href: 'trilhas.html', label: 'Movimento', key: 'movimento' },
    { href: 'artigos.html', label: 'Artigos', key: 'artigos' },
    { href: '#', label: 'Radar ▾', key: 'radar' },
    { href: '#', label: 'Sobre', key: 'sobre' },
  ];

  return `
  <nav class="${navClass}">
    <a href="artigos.html" class="${logoClass}">
      <div class="logo-mark">
        <svg width="52" height="44" viewBox="0 0 52 44">
          <rect x="2" y="2" width="7" height="7" rx="1" fill="#FF2D78"/>
          <rect x="11" y="2" width="7" height="7" rx="1" fill="#F5E000"/>
          <rect x="2" y="11" width="7" height="7" rx="1" fill="#1B8FFF"/>
          <rect x="43" y="2" width="7" height="7" rx="1" fill="#AAFF00"/>
          <rect x="43" y="11" width="7" height="7" rx="1" fill="#FF7A00"/>
          <rect x="43" y="35" width="7" height="7" rx="1" fill="#FF2D78"/>
          <rect x="34" y="35" width="7" height="7" rx="1" fill="#F5E000"/>
          <text x="26" y="30" font-family="'Barlow Condensed', sans-serif" font-weight="900" font-size="28" fill="${isLight ? '#0A0A0A' : '#FFFFFF'}" text-anchor="middle">NP</text>
        </svg>
      </div>
      <span class="logo-name">A BANCADA<br>DE IMPACTO</span>
    </a>
    <ul class="nav-links">
      ${pages.map(p => `
        <li><a href="${p.href}" class="nav-link ${activePage === p.key ? 'active' : ''}">${p.label}</a></li>
      `).join('')}
    </ul>
    <a href="apoie.html" class="${btnClass}">Envolva-se</a>
    <a href="painel-aluno.html" class="nav-avatar">A</a>
  </nav>`;
}

function renderFooter(theme = 'dark') {
  const isLight = theme === 'light';
  const logoClass = isLight ? 'logo light' : 'logo';
  return `
  <footer class="footer">
    <a href="artigos.html" class="${logoClass}">
      <div class="logo-mark">
        <svg width="52" height="44" viewBox="0 0 52 44">
          <rect x="2" y="2" width="7" height="7" rx="1" fill="#FF2D78"/>
          <rect x="11" y="2" width="7" height="7" rx="1" fill="#F5E000"/>
          <rect x="2" y="11" width="7" height="7" rx="1" fill="#1B8FFF"/>
          <rect x="43" y="2" width="7" height="7" rx="1" fill="#AAFF00"/>
          <rect x="43" y="11" width="7" height="7" rx="1" fill="#FF7A00"/>
          <rect x="43" y="35" width="7" height="7" rx="1" fill="#FF2D78"/>
          <rect x="34" y="35" width="7" height="7" rx="1" fill="#F5E000"/>
          <text x="26" y="30" font-family="'Barlow Condensed', sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle">NP</text>
        </svg>
      </div>
      <span class="logo-name">A BANCADA<br>DE IMPACTO</span>
    </a>
    <ul class="nav-links" style="margin-left:40px;">
      <li><a href="trilhas.html" class="nav-link">Movimento</a></li>
      <li><a href="artigos.html" class="nav-link">Artigos</a></li>
      <li><a href="#" class="nav-link">Radar ▾</a></li>
      <li><a href="#" class="nav-link">Sobre</a></li>
    </ul>
    <a href="apoie.html" class="nav-btn" style="margin-left:auto;">Envolva-se</a>
    <a href="painel-aluno.html" class="nav-avatar">A</a>
  </footer>`;
}
