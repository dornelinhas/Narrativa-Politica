const fs = require('fs');
let content = fs.readFileSync('src/views/ContactView.vue', 'utf8');

// 1. Move the form BEFORE the cards
const formSectionMatch = content.match(/<!-- FORMULÁRIO DE CONTATO -->[\s\S]*?(?=<!-- INFOS DE RODAPÉ)/);
const infosMatch = content.match(/<!-- INFOS DE RODAPÉ -->[\s\S]*?<\/section>/);
const cardsSectionMatch = content.match(/<!-- PREMIUM CARDS DE ENVOLVIMENTO -->[\s\S]*?<\/section>/);

if (formSectionMatch && infosMatch && cardsSectionMatch) {
  const formFull = formSectionMatch[0] + infosMatch[0];
  const cardsFull = cardsSectionMatch[0];
  
  // Remove them from current positions
  content = content.replace(formFull, '');
  content = content.replace(cardsFull, '');
  
  // Insert form then cards after hero
  content = content.replace(/(<\/section>\s*)(?=<!--)/, '$1\n      ' + formFull + '\n\n      ' + cardsFull + '\n');
}

// 2. Fix Email and Socials
content = content.replace(/contato@narrativapolitica\.com\.br/g, 'contato.narrativapolitica@gmail.com');
content = content.replace(/contato@np\.com\.br/g, 'contato.narrativapolitica@gmail.com');

content = content.replace(/<!-- INFOS DE RODAPÉ -->[\s\S]*?(?=<\/div>\n\s*<\/section>)/, 
`<!-- INFOS DE RODAPÉ -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-16">
            <div class="bg-white border-[3px] border-black p-8 rounded-[2rem] flex items-center gap-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
              <div class="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center shrink-0"><Mail :size="28" /></div>
              <div>
                <span class="block text-[10px] font-black uppercase tracking-wider opacity-40 mb-1">E-mail Direto</span>
                <a href="mailto:contato.narrativapolitica@gmail.com" class="font-black text-lg hover:text-[#FF3C82] transition-colors">contato.narrativapolitica@gmail.com</a>
              </div>
            </div>
            <div class="bg-white border-[3px] border-black p-8 rounded-[2rem] flex items-center gap-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
              <div class="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center shrink-0"><Heart :size="28" /></div>
              <div>
                <span class="block text-[10px] font-black uppercase tracking-wider opacity-40 mb-1">Redes Sociais</span>
                <div class="flex gap-4 mt-1">
                   <a href="#" class="font-black text-sm hover:text-[#FF3C82] transition-colors">Instagram</a>
                   <a href="#" class="font-black text-sm hover:text-[#FF3C82] transition-colors">LinkedIn</a>
                   <a href="#" class="font-black text-sm hover:text-[#FF3C82] transition-colors">Twitter</a>
                </div>
              </div>
            </div>
          </div>`);

// 3. Fix colors/styles in Hero
content = content.replace(/background-color: var\(--np-black\);/g, 'background-color: var(--np-rosa); border: 2px solid var(--np-black); color: var(--np-white);');
content = content.replace(/<span class="outlined-text">/g, '<span class="text-preto">');

fs.writeFileSync('src/views/ContactView.vue', content, 'utf8');
console.log('ContactView updated!');
