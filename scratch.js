const fs = require('fs');
let content = fs.readFileSync('src/store/content.js', 'utf8');

// Replace initial content
content = content.replace(
  /const initialContent = {[\s\S]*?posts: \[[\s\S]*?\],/,
  'const initialContent = {\n  isLoading: true,\n  lastActivity: [],\n  posts: [],'
);

// Add isLoading = false to success block
content = content.replace(
  /siteContent\.settings\[s\.key\] = s\.value\r?\n\s+\}\r?\n\s+\}\)\r?\n\s+\}\r?\n\r?\n\s+return \{ success: true \}/,
  'siteContent.settings[s.key] = s.value\n        }\n      })\n    }\n\n    siteContent.isLoading = false;\n    return { success: true }'
);

// Add isLoading = false to error block
content = content.replace(
  /console\.error\('Erro ao buscar conteúdo:', e\)\r?\n\s+return \{ success: false, error: e\.message \}/,
  'console.error(\'Erro ao buscar conteúdo:\', e)\n    siteContent.isLoading = false;\n    return { success: false, error: e.message }'
);

fs.writeFileSync('src/store/content.js', content);
console.log('Done');
