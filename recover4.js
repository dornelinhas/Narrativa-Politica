const fs = require('fs');
const text = fs.readFileSync('view_logs.txt', 'utf8');

// The file view_logs.txt contains JSON lines with escaped \n.
const parts = text.split('\\n');
const fileLines = {};

for (const p of parts) {
  // some parts might contain the literal '\n', so let's match the start of the line
  const m = p.match(/^(\d+):\s(.*)$/);
  if (m) {
    let lineNum = parseInt(m[1]);
    let content = m[2];
    // if there is another \r or something, strip it
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
  let l = fileLines[k];
  // the last line might have some json trailing garbage like ", "tool_calls":...
  // but since we match up to the next \n, if it's the last line of the view_file, it won't match our strict regex unless it's clean!
  // wait, the regex `^(\d+):\s(.*)$` matches the ENTIRE part between two \n's.
  out += l + '\n';
  expected++;
}
fs.writeFileSync('restored_admin_from_view.vue', out, 'utf8');
