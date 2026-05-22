<template>
  <div class="privacy-brutalist bg-creme">
    <section class="privacy-hero bg-black text-white border-b-thick">
      <div class="container-max text-center">
        <span class="eyebrow-rosa mb-6">DOCUMENTO LEGAL</span>
        <h1 class="display-xl uppercase tracking-tighter">POLÍTICA DE<br/><span class="text-amarelo">PRIVACIDADE</span></h1>
      </div>
    </section>

    <section class="section-padding pb-32">
      <div class="container-max">
        <div class="privacy-card-editorial paper-shadow bg-white border-thick relative">
          <div class="accent-bar-top bg-vermelho"></div>
          
          <div class="privacy-content-padding">
            <div class="prose-brutal">
              <p>A sua privacidade é importante para nós. É política do <strong>Narrativa Política</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Narrativa Política, e outros sites que possuímos e operamos.</p>
              <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>
              <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
              <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
              <p>O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.</p>
              <p>Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</p>
              <p>O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais.</p>

              <h2 class="headline-md mt-12 mb-6 uppercase">COMPROMISSO DO USUÁRIO</h2>
              <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Narrativa Política oferece no site:</p>
              <ul class="list-brutal">
                <li><strong>A)</strong> Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;</li>
                <li><strong>B)</strong> Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou de apologia ao terrorismo ou contra os direitos humanos;</li>
                <li><strong>C)</strong> Não causar danos aos sistemas do Narrativa Política ou de terceiros.</li>
              </ul>

              <p class="effective-date mt-12 border-t-thin pt-6 font-black uppercase text-xs opacity-40">Esta política é efetiva a partir de Abril 2026.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.privacy-brutalist { min-height: 100vh; }

.privacy-hero { padding: 140px 0 100px; position: relative; overflow: hidden; }

.eyebrow-rosa {
  display: inline-block;
  font-family: var(--font-sans);
  font-weight: 900;
  letter-spacing: 6px;
  font-size: 13px;
  color: var(--np-rosa);
  text-transform: uppercase;
}

.privacy-card-editorial { 
  max-width: 960px; 
  margin: -80px auto 0; 
  z-index: 20; 
  position: relative; 
}

.privacy-content-padding {
  padding: 80px;
}

.prose-brutal p {
  font-family: var(--font-sans);
  font-size: 19px;
  line-height: 1.8;
  color: var(--np-black);
  margin-bottom: 32px;
  font-weight: 500;
  opacity: 0.85;
}

.headline-md {
  font-size: 32px;
  font-weight: 900;
  margin-top: 64px;
  margin-bottom: 24px;
  border-left: 12px solid var(--np-amarelo);
  padding-left: 20px;
}

.list-brutal { list-style: none; padding: 0; margin-bottom: 40px; }
.list-brutal li {
  padding: 24px;
  border: var(--border-thin);
  margin-bottom: 16px;
  background: #F9F9F9;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 17px;
  transition: transform 0.2s;
}
.list-brutal li:hover { transform: translateX(8px); border-color: var(--np-rosa); }

.effective-date { 
  margin-top: 64px; 
  border-top: var(--border-thin); 
  padding-top: 32px; 
  font-family: var(--font-display);
  font-weight: 900; 
  text-transform: uppercase; 
  font-size: 14px; 
  opacity: 0.3; 
}

@media (max-width: 1024px) {
  .privacy-content-padding { padding: 60px; }
}

@media (max-width: 768px) {
  .privacy-content-padding { padding: 40px 24px; }
  .privacy-card-editorial { margin-top: -40px; width: calc(100% - 40px); margin-left: 20px; margin-right: 20px; }
  .display-xl { font-size: 44px; }
  .prose-brutal p { font-size: 17px; }
  .headline-md { font-size: 24px; }
}
</style>
