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
  
  // Usaremos o 1.5-flash que é o mais estável para contas gratuitas novas
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Analise esta oportunidade e extraia as informações em PORTUGUÊS.
    Traduza se estiver em inglês.
    
    Conteúdo: ${text.slice(0, 10000)}

    Responda APENAS em JSON:
    {
      "title": "Título traduzido",
      "description": "Resumo curto",
      "fullDescription": "HTML formatado profissional",
      "category": "Vagas de Emprego, Bolsas, Editais ou Estudos",
      "type": "Remoto, Híbrido ou Presencial",
      "location": "Cidade ou Continente",
      "deadline": "Prazo"
    }
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text().replace(/```json|```/g, "").trim());
}

export default async function handler(req, res) {
  try {
    const url = String(req.query.url || '').trim()
    if (!url) return res.status(400).json({ error: 'URL necessária.' })

    const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } })
    const html = await response.text()
    const pageText = plainText(html)
    
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: "Chave de IA não configurada na Vercel." });
    }

    try {
      const aiData = await analyzeWithAI("Oportunidade", pageText, apiKey);
      return res.status(200).json({
        ...aiData,
        fullDescription: `${aiData.fullDescription}<p><strong>Fonte:</strong> <a href="${url}" target="_blank">Acessar original</a></p>`,
        link: url
      });
    } catch (aiError) {
      console.error("Erro Gemini:", aiError);
      return res.status(500).json({ 
        error: `O Google recusou o acesso: ${aiError.message}. Verifique se o modelo 'Gemini 1.5 Flash' está ativo no seu AI Studio.` 
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
