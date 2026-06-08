const fs = require('fs');
const text = fs.readFileSync('C:/Users/anned/.gemini/antigravity/brain/3fb76b21-82ba-4b97-b4e8-8a2d3ea7c28c/.system_generated/logs/transcript.jsonl', 'utf8');

const lines = text.split('\n');
for (const line of lines) {
  if (line.includes('AdminDashboardView.vue') && line.includes('<original_line>')) {
     fs.writeFileSync('debug.txt', line.substring(0, 1000), 'utf8');
     break;
  }
}
