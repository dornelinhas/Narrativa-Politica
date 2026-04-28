import { GoogleGenerativeAI } from "@google/generative-ai";

const decodeHtml = (value = '') =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const plainText = (html = '') =>
  decodeHtml(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  )

const analyzeWithAI = async (title, text, apiKey) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Tenta vários modelos por ordem de preferência caso um falhe por cota
  const modelsToTry = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-pro"];
  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const prompt = `
        Analise a seguinte oportunidade e extraia as informações em PORTUGUÊS.
        Se estiver em inglês, TRADUZA.
        
        Título: ${title}
        Conteúdo: ${text.slice(0, 10000)}

        Responda APENAS em JSON:
        {
          "title": "Título traduzido",
          "description": "Resumo curto (200 caracteres)",
          "fullDescription": "HTML formatado profissional com <p>, <ul>, <li>",
          "category": "Escolha: 'Vagas de Emprego', 'Bolsas', 'Editais', 'Estudos'",
          "type": "Escolha: 'Remoto', 'Híbrido', 'Presencial'",
          "location": "Cidade/Estado ou CONTINENTE (ex: Europa, Global) se for fora",
          "deadline": "Prazo exato ou 'ABERTO'"
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const jsonText = response.text().replace(/```json|```/g, "").trim();
      return JSON.parse(jsonText);
    } catch (err) {
      lastError = err;
      console.warn(`Modelo ${modelName} falhou, tentando o próximo...`);
      continue;
    }
  }
  throw lastError;
}

export default async function handler(req, res) {
  try {
    const url = String(req.query.url || '').trim()
    if (!url) return res.status(400).json({ error: 'URL necessária.' })

    const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } })
    const html = await response.text()
    const pageText = plainText(html)
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const aiData = await analyzeWithAI("Oportunidade", pageText, apiKey);
        return res.status(200).json({
          ...aiData,
          fullDescription: `${aiData.fullDescription}<p><strong>Fonte:</strong> <a href="${url}" target="_blank">Acessar original</a></p>`,
          link: url
        });
      } catch (aiError) {
        return res.status(500).json({ error: "A IA do Google ainda está bloqueando sua chave. Verifique o limite no AI Studio." });
      }
    }
    return res.status(500).json({ error: "Chave de IA não configurada." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
