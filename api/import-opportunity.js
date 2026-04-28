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

const normalize = (value = '') =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

const getAttributes = (tag = '') => {
  const attrs = {}
  tag.replace(/([^\s=]+)\s*=\s*["']([^"']*)["']/g, (_, key, value) => {
    attrs[key.toLowerCase()] = decodeHtml(value)
    return ''
  })
  return attrs
}

const getMetaMap = (html = '') => {
  const metas = {}
  const tags = html.match(/<meta\b[^>]*>/gi) || []
  tags.forEach((tag) => {
    const attrs = getAttributes(tag)
    const key = attrs.property || attrs.name
    if (key && attrs.content) metas[key.toLowerCase()] = attrs.content
  })
  return metas
}

const firstMatch = (text, patterns) => {
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match?.[1]) return decodeHtml(match[1])
  }
  return ''
}

const detectCategory = (text) => {
  const t = normalize(text)
  if (/\bedital\b|chamada publica|fomento|financiamento/.test(t)) return 'Editais'
  if (/\bbolsa\b|bolsista|scholarship|fellowship/.test(t)) return 'Bolsas'
  if (/artigo|paper|pesquisa|estudo|curso|formacao|capacitacao/.test(t)) return 'Estudos'
  if (/genero|mulher|mulheres|raca|racial/.test(t)) return 'Gênero'
  if (/clima|ambiental|sustentabilidade|amazonia/.test(t)) return 'Clima'
  if (/internacional|global|onu|united nations/.test(t)) return 'Internacional'
  return 'Vagas de Emprego'
}

const detectType = (text) => {
  const t = normalize(text)
  if (/remoto|remote/.test(t)) return 'Remoto'
  if (/hibrido|hybrid/.test(t)) return 'Híbrido'
  if (/presencial|on-site|onsite/.test(t)) return 'Presencial'
  if (/bolsa|fellowship|scholarship/.test(t)) return 'Bolsa'
  if (/edital/.test(t)) return 'Edital'
  return 'Remoto'
}

const detectLocation = (text) => {
  const t = normalize(text)
  if (/remoto|remote|online/.test(t)) return 'Remoto'
  if (/nacional|brasil|brazil/.test(t)) return 'Nacional'
  const places = ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Recife', 'Fortaleza', 'Salvador', 'Belo Horizonte', 'Nordeste']
  return places.find((place) => t.includes(normalize(place))) || ''
}

const detectDeadline = (text) => {
  const t = decodeHtml(text)
  return firstMatch(t, [
    /(?:inscri(?:ç|c)(?:ões|oes)?|prazo|deadline|até|ate)[^.\n]{0,40}?(\d{1,2}\s+de\s+[a-zç]+(?:\s+de\s+\d{4})?)/i,
    /(?:inscri(?:ç|c)(?:ões|oes)?|prazo|deadline|até|ate)[^.\n]{0,40}?(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)/i,
    /(?:fecha|encerra|termina)[^.\n]{0,40}?(\d{1,2}\s+de\s+[a-zç]+(?:\s+de\s+\d{4})?)/i
  ]) || 'Verificar página'
}

const makeSummary = (text) => {
  const clean = plainText(text)
  const sentences = clean.split(/(?<=[.!?])\s+/).filter(sentence => sentence.length > 60)
  const summary = sentences.slice(0, 2).join(' ')
  return summary.slice(0, 420) || clean.slice(0, 300)
}

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
        accept: 'text/html,application/xhtml+xml'
      }
    })

    if (!response.ok) {
      return res.status(response.status).json({ error: `A página respondeu com status ${response.status}.` })
    }

    const html = await response.text()
    const metas = getMetaMap(html)
    const pageText = plainText(html)
    const title =
      metas['og:title'] ||
      metas['twitter:title'] ||
      firstMatch(html, [/<title[^>]*>([^<]+)<\/title>/i]) ||
      'Oportunidade importada'

    const description =
      metas['og:description'] ||
      metas.description ||
      metas['twitter:description'] ||
      makeSummary(html)

    const image = metas['og:image'] || metas['twitter:image'] || ''
    const analysisText = `${title} ${description} ${pageText}`
    const summary = makeSummary(description || pageText)

    return res.status(200).json({
      title,
      description: summary,
      fullDescription: `<p>${escapeHtml(summary)}</p><p><strong>Fonte:</strong> <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">Acessar página original</a></p>`,
      image,
      category: detectCategory(analysisText),
      type: detectType(analysisText),
      link: url,
      location: detectLocation(analysisText),
      deadline: detectDeadline(analysisText)
    })
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Falha ao importar URL.' })
  }
}
