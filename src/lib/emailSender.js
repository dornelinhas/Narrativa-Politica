/**
 * Utilitário para envio de e-mails usando a API do Resend.
 * Você precisará adicionar a chave VITE_RESEND_API_KEY no seu Vercel.
 */
export const sendNewsletterEmail = async (subject, htmlContent, toEmails) => {
  const apiKey = import.meta.env.VITE_RESEND_API_KEY
  
  if (!apiKey) {
    console.error('Chave do Resend não configurada!')
    alert('Erro: Chave de API de e-mail não configurada no servidor.')
    return false
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Narrativa Política <contato@narrativapolitica.com.br>',
        to: toEmails, // Lista de e-mails dos seus inscritos
        subject: subject,
        html: htmlContent
      })
    })

    const data = await response.json()
    if (response.ok) {
      return true
    } else {
      console.error('Erro Resend:', data)
      return false
    }
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error)
    return false
  }
}
