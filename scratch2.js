const fs = require('fs');

let content = fs.readFileSync('src/views/HomeView.vue', 'utf8');

// Replace large card loading state
content = content.replace(
  '<router-link v-if="filteredPosts.length > 0" :to="`/conteudo/${filteredPosts[0].id}`"',
  '<div v-if="siteContent.isLoading" class="large-card group border-dark bg-white flex-col p-12 justify-center items-center flex-1">\n              <div class="font-sans font-bold text-dark opacity-40 animate-pulse uppercase tracking-widest text-sm">Carregando editorial...</div>\n            </div>\n            <router-link v-else-if="filteredPosts.length > 0" :to="`/conteudo/${filteredPosts[0].id}`"'
);

// Stop mockPosts from showing up when loading
content = content.replace(
  /const displayPosts = computed\(\(\) => \{\r?\n\s+return siteContent\.posts && siteContent\.posts\.length > 0 \? siteContent\.posts : mockPosts\r?\n\}\)/,
  'const displayPosts = computed(() => {\n  if (siteContent.isLoading) return []\n  return siteContent.posts && siteContent.posts.length > 0 ? siteContent.posts : mockPosts\n})'
);

fs.writeFileSync('src/views/HomeView.vue', content);

let articles = fs.readFileSync('src/views/ArticlesView.vue', 'utf8');

articles = articles.replace(
  '<div class="articles-grid-layout">',
  '<div v-if="siteContent.isLoading" class="p-12 text-center text-dark opacity-40 font-black uppercase tracking-widest text-sm animate-pulse">\n              Carregando artigos...\n            </div>\n            <div v-else class="articles-grid-layout">'
);

articles = articles.replace(
  '<div class="news-list-sidebar">',
  '<div v-if="siteContent.isLoading" class="p-8 text-center text-dark opacity-40 font-black uppercase tracking-widest text-sm animate-pulse">\n              Carregando notícias...\n            </div>\n            <div v-else class="news-list-sidebar">'
);

fs.writeFileSync('src/views/ArticlesView.vue', articles);

console.log('Done');
