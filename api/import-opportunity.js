export default async function handler(req, res) {
  try {
    const url = String(req.query.url || '').trim()
    if (!url || !/^https?:\/\//i.test(url)) {
      return res.status(400).json({ error: 'URL inválida.' })
    }

    const response = await fetch(url, {
      redirect: 'follow',
      headers: {
        'user-agent': 'Mozilla/5.0 (NarrativaPolitica Import Bot)',
        'accept': 'text/html,application/xhtml+xml'
      }
    })

    const html = await response.text()

    const getMeta = (pattern) => {
      const match = html.match(pattern)
      return match?.[1]?.trim() || ''
    }

    const strip = (text) =>
      text
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

    const title =
      getMeta(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["'][^>]*>/i) ||
      getMeta(/<meta[^>]+name=["']twitter:title["'][^>]+content=["']([^"']+)["'][^>]*>/i) ||
      getMeta(/<title[^>]*>([^<]+)<\/title>/i)

    const description =
      getMeta(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["'][^>]*>/i) ||
      getMeta(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i)

    const image =
      getMeta(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i) ||
      getMeta(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i)

    const bodyText = strip(html)
    const category = /bolsa|funda[cç][aã]o|edital|edital/i.test(title + ' ' + description + ' ' + bodyText)
      ? (/edital/i.test(title + ' ' + description + ' ' + bodyText) ? 'Editais' : 'Bolsas')
      : (/vaga|oportunidade|sele[cç][aã]o|processo seletivo/i.test(title + ' ' + description + ' ' + bodyText) ? 'Vagas de Emprego' : 'Educação')

    const type = /bolsa/i.test(title + ' ' + description + ' ' + bodyText)
      ? 'Bolsa'
      : (/edital/i.test(title + ' ' + description + ' ' + bodyText) ? 'Edital' : 'Remoto')

    const excerpt =
      description ||
      bodyText.slice(0, 240)

    return res.status(200).json({
      title: title || 'Oportunidade importada',
      description: excerpt,
      fullDescription: `<p>${excerpt}</p>`,
      image,
      category,
      type,
      link: url,
      location: /remoto/i.test(bodyText) ? 'Remoto' : '',
      deadline: /inscri[cç][aã]o|prazo|até\s+\d+/i.test(bodyText) ? 'Verificar página' : ''
    })
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Falha ao importar URL.' })
  }
}
