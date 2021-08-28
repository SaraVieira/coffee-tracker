import { supabase } from '../initSupabase'

export const getMinimalRoasters = async ({ user }) => {
  const { data: roasters } = await supabase
    .from('roasters')
    .select('id, name')
    .eq('userId', user.id)

  return roasters
}

export const getRoasters = async ({ user }) => {
  const { data: roasters } = await supabase.from('roasters').select('*').eq('userId', user.id)

  return roasters
}
