import json
import re
import sys

def extract_view_file_content(filepath):
    lines_found = {}
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            if 'view_file' in line and 'AdminDashboardView.vue' in line and '<original_line>' in line:
                # Find the "content":"..." part manually
                match = re.search(r'"content":"(.*?)("}|$|\.\.\. \[truncated\])', line)
                if match:
                    content_str = match.group(1)
                    # unescape the json string
                    try:
                        # Add quotes around it to make it a valid json string
                        content = json.loads('"' + content_str + '"')
                    except Exception as e:
                        # Fallback simple unescape
                        content = content_str.replace('\\n', '\n').replace('\\r', '\r').replace('\\"', '"').replace('\\\\', '\\')
                    
                    for p in content.split('\n'):
                        m = re.match(r'^(\d+):\s(.*)$', p)
                        if m:
                            lines_found[int(m.group(1))] = m.group(2)
    
    if not lines_found:
        print("No lines found!")
        return
        
    keys = sorted(lines_found.keys())
    print(f"Found {len(keys)} lines. Max line: {keys[-1]}")
    
    with open('restored_admin.vue', 'w', encoding='utf-8') as f:
        expected = 1
        for k in keys:
            while expected < k:
                f.write('\n')
                expected += 1
            f.write(lines_found[k] + '\n')
            expected += 1

extract_view_file_content(r'C:\Users\anned\.gemini\antigravity\brain\3fb76b21-82ba-4b97-b4e8-8a2d3ea7c28c\.system_generated\logs\transcript.jsonl')
