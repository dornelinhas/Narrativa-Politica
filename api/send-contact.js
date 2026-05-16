export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, subject, message, type } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Nome, e-mail e mensagem são obrigatórios.' });
  }

  const apiKey = process.env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Configuração de e-mail (Resend) não encontrada no servidor.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Site Narrativa Política <onboarding@resend.dev>',
        to: 'contatonarrativapolitica@gmail.com',
        subject: `[Contato Site] ${type?.toUpperCase() || 'MENSAGEM'}: ${subject || 'Sem Assunto'}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 2px solid #1C1C1C; border-radius: 10px;">
            <h2 style="text-transform: uppercase;">Nova Mensagem de Contato</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Tipo:</strong> ${type}</p>
            <p><strong>Assunto:</strong> ${subject}</p>
            <hr style="border: 1px solid #EEE;" />
            <p><strong>Mensagem:</strong></p>
            <div style="background: #F7F7F5; padding: 15px; border-radius: 5px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        `
      })
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, id: data.id });
    } else {
      console.error('Erro detalhado do Resend:', JSON.stringify(data, null, 2));
      // Se for erro de domínio não verificado em conta free, o Resend retorna 403 ou 422
      return res.status(response.status).json({ 
        error: 'Erro no serviço de e-mail.', 
        details: data.message || 'Verifique se o e-mail de destino está verificado no Resend (caso use conta gratuita).' 
      });
    }
  } catch (error) {
    console.error('Erro de servidor ao enviar contato:', error);
    return res.status(500).json({ error: 'Erro interno ao processar o envio.' });
  }
}
