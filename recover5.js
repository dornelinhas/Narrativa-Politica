const fs = require('fs');
const text = fs.readFileSync('view_logs.txt', 'utf8');
const objMatch = text.match(/{"step_index":.*?"content":"(.*?)"(?:,|}|\.\.\. \[truncated\])/);
if (objMatch) {
  let c = objMatch[1];
  console.log('first match length:', c.length);
}
