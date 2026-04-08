# Narrativa Política - Site Institucional

Este é o site institucional e plataforma de conteúdo da **Narrativa Política**, desenvolvido com Vue.js 3 e Vite.

## 🚀 Como Rodar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 16 ou superior recomendada).

### Passo a Passo

1. **Abra o terminal** na pasta do projeto:
   `C:\Users\anned\Downloads\NarrativaPolitica`

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acesse o site**:
   O terminal mostrará um endereço (geralmente `http://localhost:5173`). Clique ou copie e cole no seu navegador.

---

## 📂 Estrutura de Pastas

- `src/assets`: Estilos globais e variáveis de design (cores, fontes).
- `src/components`: Componentes reutilizáveis como Header e Footer.
- `src/data`: Dados do site (Artigos, Oportunidades, Trilhas) em formato JSON para fácil edição.
- `src/router`: Configuração de navegação entre as páginas.
- `src/views`: As páginas principais do site (Home, Artigos, Oportunidades, etc.).

---

## 🎨 Design & Estética
- **Tipografia**: `Playfair Display` (Serifada elegante) para títulos e `Montserrat` (Moderna) para o corpo de texto.
- **Cores**: Uma paleta "Girly Sophisticated" com tons de Rosa Blush, Ouro, Coral e Azul Petróleo.
- **Responsividade**: Totalmente adaptado para celulares, tablets e computadores.

---

## 🔮 Sugestões de Melhorias Futuras

1. **Painel Administrativo**: Criar uma área logada para cadastrar novos artigos e oportunidades sem mexer no código.
2. **Banco de Dados Real**: Substituir os arquivos JSON por um banco de dados (como Supabase ou Firebase) para gerenciar o conteúdo dinamicamente.
3. **Newsletter**: Integração com serviços como Mailchimp para capturar leads interessados em mentoria.
4. **Sistema de Login**: Área exclusiva para mentoradas acessarem materiais restritos das Trilhas.

---

## 🌐 Como Publicar (Deploy)

Quando estiver pronto para colocar o site no ar, você pode usar:

1. **Vercel** ou **Netlify**:
   - Conecte seu repositório do GitHub.
   - O deploy é automático sempre que você atualizar o código.
2. **GitHub Pages**:
   - Configure o repositório para servir a partir da branch `gh-pages` ou pasta `docs`.

---
Desenvolvido com ❤️ para Narrativa Política.
