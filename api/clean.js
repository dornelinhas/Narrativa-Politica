const { supabase } = require('./_lib/supabase')

module.exports = async function handler(req, res) {
  try {
    const { data, error, count } = await supabase
      .from('opportunities')
      .delete()
      .eq('status', 'rejected')
      .select()
    
    return res.status(200).json({ success: true, deletedCount: data ? data.length : 0, error })
  } catch(e) {
    return res.status(500).json({ error: e.message })
  }
}
