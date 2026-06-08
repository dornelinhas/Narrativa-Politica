const { supabase } = require('./_lib/supabase')

module.exports = async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('opportunities')
      .select('status')
    
    if (error) throw error
    
    const statusCounts = {}
    for (const d of data) {
      statusCounts[d.status] = (statusCounts[d.status] || 0) + 1
    }
    
    return res.status(200).json({ statusCounts, total: data.length })
  } catch(e) {
    return res.status(500).json({ error: e.message })
  }
}
