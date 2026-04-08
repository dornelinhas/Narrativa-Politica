<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-info">
        <h3 class="footer-logo">Narrativa Política</h3>
        <p class="footer-description">
          Uma plataforma dedicada à análise estratégica, mentoria de carreira e curadoria de oportunidades em Relações Internacionais, gênero e política.
        </p>
      </div>
      
      <div class="footer-links">
        <h4>Navegação</h4>
        <ul>
          <li><router-link to="/artigos">Artigos</router-link></li>
          <li><router-link to="/oportunidades">Oportunidades</router-link></li>
          <li><router-link to="/trilhas">Trilhas</router-link></li>
          <li><router-link to="/mentoria">Mentoria</router-link></li>
        </ul>
      </div>

      <div class="footer-contact">
        <h4>Contato</h4>
        <p>Email: contato@narrativapolitica.com.br</p>
        <div class="socials">
          <a href="#" class="social-icon">LinkedIn</a>
          <a href="#" class="social-icon">Instagram</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom container">
      <p>&copy; 2024 Narrativa Política. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--text-main);
  color: white;
  padding: 60px 0 30px;
  margin-top: 80px;
}

.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-logo {
  font-family: var(--font-serif);
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--accent-gold);
}

.footer-description {
  color: rgba(255, 255, 255, 0.7);
  max-width: 400px;
}

h4 {
  font-family: var(--font-serif);
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.footer-links ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.footer-links a:hover {
  color: var(--accent-gold);
}

.footer-contact p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 15px;
}

.socials {
  display: flex;
  gap: 15px;
}

.social-icon {
  font-size: 0.8rem;
  color: var(--accent-coral);
  font-weight: 600;
  text-transform: uppercase;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  text-align: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr;
  }
}
</style>
