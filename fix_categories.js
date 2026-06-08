const fs = require('fs');
let content = fs.readFileSync('src/views/AdminDashboardView.vue', 'utf8');

// Let's replace the categories card and fix the NP pill and draft button in the table
content = content.replace(/<div class="categories-card">/g, '<div class="categories-card" style="background: white; border: 2px solid #000; border-radius: 8px; padding: 1rem;">');

// NP tag in the table row
// Looks like: <span class="badge-np">NP</span>
// Let's change its style to be less heavy and moved to the right
content = content.replace(/<span class="badge-np">NP<\/span>/g, '<span class="badge-np" style="background: #EFEFEF; color: #000; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; border: 1px solid #CCC; margin-left: auto;">NP</span>');

// draft button inside table row
// something like: <span class="status-badge" :class="artigo.status">
content = content.replace(/<span class="status-badge" :class="artigo\.status">/g, '<span class="status-badge" :class="artigo.status" :style="artigo.status === \'rascunho\' ? \'background: #EFEFEF; color: #000; border: 1px solid #CCC;\' : \'\'">');

// Also the user mentioned the logout button 'botão de sair do painel no no menu principal, também está feio'.
// Let's look for a button with text 'SAIR DO PAINEL' or 'Sair'
// The button is likely: <button class="btn-logout mt-auto" @click="handleLogout">
content = content.replace(/<button class="btn-logout[^>]*>([\s\S]*?)<\/button>/g, '<button class="btn-logout mt-auto w-full flex items-center justify-center gap-2" @click="handleLogout" style="background: #FFF; border: 2px solid #000; padding: 12px; color: #000; font-weight: bold; transition: all 0.2s;">$1</button>');

fs.writeFileSync('src/views/AdminDashboardView.vue', content);
console.log('Fixed categories, tags and logout button');
