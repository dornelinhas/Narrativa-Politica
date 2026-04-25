// src/lib/supabaseStorage.js
import { supabase } from './supabase'

/**
 * Upload de imagens para o bucket "media" do Supabase.
 * Retorna a URL pública da imagem, pronta para ser salva no banco
 * (por ex.: como siteLogo ou capa de um artigo).
 *
 * @param {File} file   - objeto File selecionado pelo usuário.
 * @param {string} folder - subpasta opcional dentro do bucket (ex.: 'logos').
 * @returns {Promise<string>} URL pública da imagem.
 */
export const uploadImage = async (file, folder = '') => {
  if (!supabase) throw new Error('Supabase não inicializado')
  if (!file) throw new Error('Nenhum arquivo fornecido')

  const extension = file.name.split('.').pop()
  const fileName = `${folder ? folder + '/' : ''}${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 5)}.${extension}`

  const { error } = await supabase.storage.from('media').upload(fileName, file, {
    upsert: false,
    cacheControl: '3600',
    contentType: file.type,
  })
  if (error) throw error

  // Recupera a URL pública imediatamente
  const { publicURL } = supabase.storage.from('media').getPublicUrl(fileName)
  return publicURL
}
