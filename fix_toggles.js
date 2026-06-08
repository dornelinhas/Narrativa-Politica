const fs = require('fs');
let content = fs.readFileSync('src/views/AdminDashboardView.vue', 'utf8');

const regex = /<label class="toggle-brutal-container">\s*<input type="checkbox" v-model="(.*?)" \/>\s*<span class="toggle-slider"><\/span>\s*<span class="toggle-label">(.*?)<\/span>\s*<\/label>/g;

content = content.replace(regex, (match, p1, p2) => {
  return '<label class="checkbox-container">\n  <input type="checkbox" v-model="' + p1 + '" />\n  <span class="checkmark"></span>\n  <span class="check-label font-bold text-dark">' + p2 + '</span>\n</label>';
});

fs.writeFileSync('src/views/AdminDashboardView.vue', content);
console.log('Replaced toggles successfully.');
