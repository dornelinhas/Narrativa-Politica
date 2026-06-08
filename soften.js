const fs = require('fs');

let content = fs.readFileSync('src/views/AdminDashboardView.vue', 'utf8');

const styleStartIndex = content.indexOf('<style scoped>');
const oldStyle = content.substring(styleStartIndex, content.lastIndexOf('</style>') + 8);

let newStyle = oldStyle
  // Typography overrides
  .replace(/font-family: "Archivo Black";/g, 'font-family: "Syne", sans-serif;')
  .replace(/font-family: "Inter", sans-serif;/g, 'font-family: "Nunito Sans", sans-serif;')
  // Backgrounds
  .replace(/background: #F1F5F9;/g, 'background: #FAFAFA;')
  // Sidebar (black -> light)
  .replace(/\.sidebar-black-fixed \{[^}]+\}/g, '.sidebar-black-fixed { width: 260px; background: rgba(250,250,250,0.85); backdrop-filter: blur(20px); color: #0F0F0F; position: fixed; top: 0; left: 0; bottom: 0; z-index: 100; display: flex; flex-direction: column; padding: 25px 20px; border-right: 1px solid rgba(0,0,0,0.07); overflow-y: auto; }')
  .replace(/\.sidebar-header \{[^}]+\}/g, '.sidebar-header { margin-bottom: 30px; display: flex; flex-direction: column; align-items: flex-start; }')
  .replace(/\.sidebar-nav-stack span \{[^}]+\}/g, '.sidebar-nav-stack span { font-size: 0.75rem; font-weight: 800; color: #6B7280; margin-bottom: 15px; letter-spacing: 1px; display: block; text-transform: uppercase; }')
  .replace(/\.nav-btn \{[^}]+\}/g, '.nav-btn { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; background: transparent; color: #6B7280; font-family: "Nunito Sans", sans-serif; font-size: 0.875rem; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s ease; margin-bottom: 5px; width: 100%; text-align: left; }')
  .replace(/\.nav-btn:hover \{[^}]+\}/g, '.nav-btn:hover { background: rgba(0,0,0,0.03); color: #0F0F0F; transform: translateX(2px); }')
  .replace(/\.nav-btn\.active \{[^}]+\}/g, '.nav-btn.active { background: white; color: #0F0F0F; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }')
  .replace(/\.badge-admin \{[^}]+\}/g, '.badge-admin { background: rgba(138,43,226,0.1); color: #8A2BE2; padding: 4px 10px; border-radius: 50px; font-size: 10px; font-weight: 800; }')
  
  // Logos
  .replace(/\.logo-txt \{[^}]+\}/g, '.logo-txt { font-family: "Syne", sans-serif; font-size: 1.5rem; font-weight: 800; background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f857a4 50%, #ff5858 75%, #007BFF 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }')
  .replace(/\.logo-brutal-white \{[^}]+\}/g, '')

  // Header & Buttons
  .replace(/\.btn-preview-solid \{[^}]+\}/g, '.btn-preview-solid { display: inline-flex; align-items: center; gap: 8px; background: white; color: #0F0F0F; padding: 10px 20px; border-radius: 50px; border: 1.5px solid rgba(0,0,0,0.07); box-shadow: 0 4px 24px rgba(0,0,0,0.04); font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease; }')
  .replace(/\.btn-preview-solid:hover \{[^}]+\}/g, '.btn-preview-solid:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.08); }')
  .replace(/\.header-actions-row \{[^}]+\}/g, '.header-actions-row { display: flex; align-items: center; gap: 15px; }')
  .replace(/\.user-pill-brutal \{[^}]+\}/g, '.user-pill-brutal { display: flex; align-items: center; gap: 12px; background: white; padding: 6px 16px; border-radius: 50px; border: 1.5px solid rgba(0,0,0,0.07); box-shadow: 0 4px 24px rgba(0,0,0,0.04); }')

  // Panels & Cards (Brutal to Premium)
  .replace(/\.editor-card-brutal \{[^}]+\}/g, '.editor-card-brutal { background: white; border: 1px solid rgba(0,0,0,0.07); border-radius: 20px; padding: 40px; box-shadow: 0 4px 24px rgba(0,0,0,0.04); transition: transform 0.2s ease; }')
  .replace(/\.editor-card-brutal:hover \{[^}]+\}/g, '')
  .replace(/\.shadow-solid \{[^}]+\}/g, '')
  .replace(/\.card-label-black \{[^}]+\}/g, '.card-label-black { font-family: "Syne", sans-serif; font-size: 1.5rem; font-weight: 800; color: #0F0F0F; }')
  
  // Film Grain removal
  .replace(/\.film-grain-bg \{[^}]+\}/g, '.film-grain-bg { display: none; }')

  // Metrics Grid
  .replace(/\.metric-card-glass \{[^}]+\}/g, '.metric-card-glass { background: white; border: 1px solid rgba(0,0,0,0.07); padding: 30px; border-radius: 20px; box-shadow: 0 4px 24px rgba(0,0,0,0.04); }')
  .replace(/\.metric-label \{[^}]+\}/g, '.metric-label { font-family: "Nunito Sans", sans-serif; font-size: 0.85rem; font-weight: 700; color: #6B7280; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; }')
  .replace(/\.metric-value \{[^}]+\}/g, '.metric-value { font-family: "Syne", sans-serif; font-size: 2.8rem; font-weight: 800; color: #0F0F0F; line-height: 1.1; margin-bottom: 5px; }')

  // Forms & Inputs
  .replace(/\.input-group label \{[^}]+\}/g, '.input-group label { display: block; font-weight: 700; font-size: 0.85rem; margin-bottom: 8px; color: #0F0F0F; }')
  .replace(/\.input-group input, \.input-group textarea, \.input-group select \{[^}]+\}/g, '.input-group input, .input-group textarea, .input-group select { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1.5px solid rgba(0,0,0,0.07); outline: none; font-family: "Nunito Sans", sans-serif; font-size: 0.9rem; color: #0F0F0F; background: white; transition: border 0.2s; }')
  .replace(/\.input-group input:focus, \.input-group textarea:focus, \.input-group select:focus \{[^}]+\}/g, '.input-group input:focus, .input-group textarea:focus, .input-group select:focus { border-color: #007BFF; }')
  
  // Save Buttons
  .replace(/\.btn-save-brutal \{[^}]+\}/g, '.btn-save-brutal { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f857a4 50%, #ff5858 75%, #007BFF 100%); color: white; padding: 14px 28px; border-radius: 50px; font-family: "Nunito Sans", sans-serif; font-size: 0.9rem; font-weight: 700; cursor: pointer; transition: all 0.25s; border: none; box-shadow: 0 6px 24px rgba(102,126,234,0.4); margin-top: 20px; }')
  .replace(/\.btn-save-brutal:hover \{[^}]+\}/g, '.btn-save-brutal:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(102,126,234,0.5); }')

  // Tables
  .replace(/\.table-brutal \{[^}]+\}/g, '.table-brutal { width: 100%; border-collapse: separate; border-spacing: 0 8px; }')
  .replace(/\.table-brutal th \{[^}]+\}/g, '.table-brutal th { font-family: "Nunito Sans", sans-serif; font-size: 0.8rem; font-weight: 700; color: #6B7280; text-align: left; padding: 0 20px 10px; border-bottom: 1px solid rgba(0,0,0,0.07); }')
  .replace(/\.table-brutal td \{[^}]+\}/g, '.table-brutal td { background: white; padding: 16px 20px; font-size: 0.95rem; border-top: 1px solid rgba(0,0,0,0.04); border-bottom: 1px solid rgba(0,0,0,0.04); }')
  .replace(/\.table-brutal td:first-child \{[^}]+\}/g, '.table-brutal td:first-child { border-left: 1px solid rgba(0,0,0,0.04); border-radius: 12px 0 0 12px; }')
  .replace(/\.table-brutal td:last-child \{[^}]+\}/g, '.table-brutal td:last-child { border-right: 1px solid rgba(0,0,0,0.04); border-radius: 0 12px 12px 0; }')

  // Badges
  .replace(/\.badge-featured \{[^}]+\}/g, '.badge-featured { background: rgba(138,43,226,0.1); color: #8A2BE2; padding: 4px 10px; border-radius: 50px; font-size: 0.75rem; font-weight: 800; }')
  .replace(/\.badge-normal \{[^}]+\}/g, '.badge-normal { background: rgba(0,123,255,0.1); color: #007BFF; padding: 4px 10px; border-radius: 50px; font-size: 0.75rem; font-weight: 800; }')
  
  // Toggles
  .replace(/\.toggle-slider \{[^}]+\}/g, '.toggle-slider { position: relative; width: 44px; height: 24px; background: #E5E7EB; border-radius: 50px; transition: 0.3s; margin-right: 12px; }')
  .replace(/\.toggle-slider::before \{[^}]+\}/g, '.toggle-slider::before { content: ""; position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; background: white; border-radius: 50%; transition: 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }')
  .replace(/\.toggle-brutal-container input:checked \+ \.toggle-slider \{[^}]+\}/g, '.toggle-brutal-container input:checked + .toggle-slider { background: #007BFF; }')
  .replace(/\.toggle-brutal-container input:checked \+ \.toggle-slider::before \{[^}]+\}/g, '.toggle-brutal-container input:checked + .toggle-slider::before { transform: translateX(20px); }')
  .replace(/\.toggle-label \{[^}]+\}/g, '.toggle-label { font-weight: 700; font-size: 0.95rem; color: #0F0F0F; }')

  // General fixes
  .replace(/border: 4px solid #1C1C1C;/g, 'border: 1px solid rgba(0,0,0,0.07);')
  .replace(/border: 3px solid #1C1C1C;/g, 'border: 1px solid rgba(0,0,0,0.07);')
  .replace(/border: 2px solid #1C1C1C;/g, 'border: 1px solid rgba(0,0,0,0.07);')
  .replace(/box-shadow: \d+px \d+px 0px #1C1C1C;/g, 'box-shadow: 0 4px 24px rgba(0,0,0,0.04);')
  .replace(/background: #1C1C1C;/g, 'background: white;')
  .replace(/color: #1C1C1C;/g, 'color: #0F0F0F;')
  .replace(/border-radius: 30px;/g, 'border-radius: 20px;')
  .replace(/#FF6BCA/g, '#007BFF')
  .replace(/#A4CD39/g, '#8A2BE2')
  .replace(/#FFE65A/g, '#FF4D6D')
  ;

content = content.replace(oldStyle, newStyle);

// Also replace the HTML for metric-card-v2 (which I injected) because it has inline styles:
content = content.replace(/style="box-shadow: 4px 4px 0px 0px #000;"/g, 'style="box-shadow: 0 4px 24px rgba(0,0,0,0.04);"');
content = content.replace(/border-2 border-black/g, 'border border-[rgba(0,0,0,0.07)] rounded-[20px]');

fs.writeFileSync('src/views/AdminDashboardView.vue', content, 'utf8');
console.log('CSS updated successfully to match the soft new aesthetic!');
