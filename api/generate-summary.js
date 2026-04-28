import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { content, type } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Conteúdo é obrigatório.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY não configurada.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });

    const prompt = `
      Aja como uma estrategista de comunicação política. 
      Crie um resumo provocativo e atraente (subtitle/excerpt) para o seguinte ${type || 'artigo'}.
      O resumo deve ter entre 100 e 200 caracteres e terminar com uma frase que instigue a leitura.
      
      Conteúdo: ${content.replace(/<[^>]*>/g, '').slice(0, 5000)}

      Responda APENAS o texto do resumo, sem aspas.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text().trim();

    return res.status(200).json({ summary });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Falha ao gerar resumo.' });
  }
}
