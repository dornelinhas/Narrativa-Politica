const fs = require('fs');
const text = fs.readFileSync('C:/Users/anned/.gemini/antigravity/brain/3fb76b21-82ba-4b97-b4e8-8a2d3ea7c28c/.system_generated/logs/transcript.jsonl', 'utf8');

const lines = text.split('\n');
const fileLines = {};

for (const line of lines) {
  if (line.includes('AdminDashboardView.vue') && line.includes('<original_line>')) {
    const match = line.match(/"content":"(.*)/);
    if (match) {
      let content = match[1];
      // Do not strip quotes. Just replace newlines.
      content = content.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      const parts = content.split('\n');
      for (let p of parts) {
        // p might end with a quote or something if it's the last line, so match very loosely
        const m = p.match(/^(\d+):\s(.*)$/);
        if (m) {
          fileLines[parseInt(m[1])] = m[2];
        }
      }
    }
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
  // strip trailing stuff that might be left on the very last line
  let l = fileLines[k];
  if (k === keys[keys.length - 1]) {
    l = l.replace(/".*$/, '');
    l = l.replace(/\\.*$/, '');
  }
  out += l + '\n';
  expected++;
}
fs.writeFileSync('restored_admin_from_view.vue', out, 'utf8');
