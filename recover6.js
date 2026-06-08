const fs = require('fs');
const text = fs.readFileSync('view_logs.txt', 'utf16le');

const parts = text.split('\\n');
const fileLines = {};

for (const p of parts) {
  const m = p.match(/^(\d+):\s(.*)$/);
  if (m) {
    let lineNum = parseInt(m[1]);
    let content = m[2];
    content = content.replace(/\\r/g, '').replace(/\\"/g, '"');
    fileLines[lineNum] = content;
  }
}

const keys = Object.keys(fileLines).map(Number).sort((a,b)=>a-b);
console.log('Found ' + keys.length + ' lines total.');
let out = '';
let expected = 1;
for (const k of keys) {
  while (expected < k) {
    out += '\n'; // missing line
    expected++;
  }
  out += fileLines[k] + '\n';
  expected++;
}
fs.writeFileSync('restored_admin_from_view.vue', out, 'utf8');
