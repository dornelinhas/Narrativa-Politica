const ALLOWED_TAGS = new Set([
  'A',
  'B',
  'BR',
  'CODE',
  'DIV',
  'EM',
  'FIGCAPTION',
  'FIGURE',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'HR',
  'I',
  'IMG',
  'LI',
  'OL',
  'P',
  'PRE',
  'SPAN',
  'STRONG',
  'SUB',
  'SUP',
  'UL',
  'BLOCKQUOTE'
])

const ALLOWED_ATTRS = {
  A: ['href', 'title', 'target', 'rel'],
  IMG: ['src', 'alt', 'title', 'width', 'height', 'loading']
}

const SAFE_URL_PATTERN = /^(https?:|mailto:|tel:|\/|#)/i

const sanitizeUrl = (value = '') => {
  const raw = String(value || '').trim()
  if (!raw) return ''
  return SAFE_URL_PATTERN.test(raw) ? raw : ''
}

const walkAndSanitize = (root) => {
  const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT)
  const toRemove = []

  while (treeWalker.nextNode()) {
    const node = treeWalker.currentNode
    const tag = node.tagName?.toUpperCase()

    if (!ALLOWED_TAGS.has(tag)) {
      toRemove.push(node)
      continue
    }

    for (const attr of Array.from(node.attributes || [])) {
      const attrName = attr.name.toLowerCase()
      const attrValue = attr.value
      const allowedAttrs = ALLOWED_ATTRS[tag] || []

      if (attrName.startsWith('on') || attrName === 'style') {
        node.removeAttribute(attr.name)
        continue
      }

      if (!allowedAttrs.includes(attr.name) && !allowedAttrs.includes(attrName)) {
        node.removeAttribute(attr.name)
        continue
      }

      if ((tag === 'A' && attrName === 'href') || (tag === 'IMG' && attrName === 'src')) {
        const safe = sanitizeUrl(attrValue)
        if (!safe) {
          node.removeAttribute(attr.name)
          continue
        }
        node.setAttribute(attr.name, safe)
      }
    }

    if (tag === 'A') {
      const href = node.getAttribute('href')
      if (href && !href.startsWith('#') && !href.startsWith('/')) {
        node.setAttribute('target', '_blank')
        node.setAttribute('rel', 'noopener noreferrer')
      }
    }
  }

  for (const node of toRemove) {
    const fragment = document.createDocumentFragment()
    while (node.firstChild) fragment.appendChild(node.firstChild)
    node.replaceWith(fragment)
  }
}

export const sanitizeHtml = (html = '') => {
  const value = String(html || '')
  if (!value.trim()) return ''
  if (typeof document === 'undefined') return value

  const parser = new DOMParser()
  const doc = parser.parseFromString(`<div>${value}</div>`, 'text/html')
  const root = doc.body.firstElementChild
  if (!root) return ''

  walkAndSanitize(root)
  return root.innerHTML
}

