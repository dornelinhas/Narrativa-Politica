const fs = require('fs');
let c = fs.readFileSync('src/views/AdminDashboardView.vue', 'utf8');
c = c.replace(/import \{ onUnmounted \} from 'vue'/g, '// removed');
c = c.replace(/import { ref, onMounted, onUnmounted, computed, watch } from 'vue'/g, "import { ref, onMounted, onUnmounted, computed, watch } from 'vue'");
fs.writeFileSync('src/views/AdminDashboardView.vue', c, 'utf8');
