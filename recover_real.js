const fs = require('fs');

function extract() {
    const linesFound = {};
    const text = fs.readFileSync('C:/Users/anned/.gemini/antigravity/brain/3fb76b21-82ba-4b97-b4e8-8a2d3ea7c28c/.system_generated/logs/transcript.jsonl', 'utf8');
    const lines = text.split('\n');
    
    for (const line of lines) {
        // Strict match for File Path
        if (line.includes('File Path: `file:///C:/Users/anned/Downloads/NarrativaPolitica/src/views/AdminDashboardView.vue`') && line.includes('<original_line>')) {
            const match = line.match(/"content":"(.*?)(?:"}|$|\.\.\. \[truncated\])/);
            if (match) {
                const contentStr = match[1];
                let content;
                try {
                    content = JSON.parse('"' + contentStr + '"');
                } catch (e) {
                    content = contentStr.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
                }
                
                for (const p of content.split('\n')) {
                    const m = p.match(/^(\d+):\s(.*)$/);
                    if (m) {
                        linesFound[parseInt(m[1])] = m[2];
                    }
                }
            }
        }
    }
    
    const keys = Object.keys(linesFound).map(Number).sort((a,b)=>a-b);
    if (keys.length === 0) {
        console.log("No lines found!");
        return;
    }
    
    console.log(`Found ${keys.length} lines. Max line: ${keys[keys.length-1]}`);
    
    let out = '';
    let expected = 1;
    for (const k of keys) {
        while (expected < k) {
            out += '\n';
            expected++;
        }
        out += linesFound[k] + '\n';
        expected++;
    }
    
    fs.writeFileSync('restored_admin.vue', out, 'utf8');
}

extract();
