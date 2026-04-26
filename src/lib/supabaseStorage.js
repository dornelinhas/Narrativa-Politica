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

  console.log('Iniciando upload para o bucket "media"...', fileName)
  const { error } = await supabase.storage.from('media').upload(fileName, file, {
    upsert: true, // Mudado para true para evitar erro de arquivo já existente
    cacheControl: '3600',
    contentType: file.type,
  })

  if (error) {
    console.error('Erro detalhado do Supabase Storage:', error)
    const message = error.message?.toLowerCase() || ''
    if (message.includes('bucket not found')) {
      throw new Error('O bucket "media" não foi encontrado. Certifique-se de que rodou o script SQL de configuração.')
    }
    if (message.includes('row-level security') || message.includes('policy')) {
      throw new Error('Erro de permissão (RLS) no Storage. Verifique se as policies foram criadas no SQL Editor.')
    }
    throw new Error(`Erro no Supabase Storage: ${error.message}`)
  }

  console.log('Upload concluído com sucesso. Gerando URL pública...')

  // Recupera a URL pública imediatamente
  const { data } = supabase.storage.from('media').getPublicUrl(fileName)
  if (!data?.publicUrl) throw new Error('Upload concluído, mas a URL pública não foi gerada.')
  return data.publicUrl
}
