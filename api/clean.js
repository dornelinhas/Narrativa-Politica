const { supabase } = require('./_lib/supabase')

module.exports = async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('opportunities')
      .select('title, status, sourceUrl')
      .limit(100)
    
    return res.status(200).json({ success: true, count: data ? data.length : 0, data, error })
  } catch(e) {
    return res.status(500).json({ error: e.message })
  }
}
