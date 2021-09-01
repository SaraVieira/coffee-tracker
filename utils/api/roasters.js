import { ROASTERS_DB } from '../constants'
import { supabase } from '../initSupabase'

export const getMinimalRoasters = async ({ user }) => {
  const { data: roasters } = await supabase
    .from(ROASTERS_DB)
    .select('id, name')
    .eq('userId', user.id)

  return roasters
}

export const getRoasters = async ({ user }) => {
  const { data: roasters } = await supabase.from(ROASTERS_DB).select('*').eq('userId', user.id)

  return roasters
}

export const addRoaster = async (roaster) => {
  const { data } = await supabase.from(ROASTERS_DB).insert(roaster)

  return data
}

export const removeRoaster = async ({ id }) => {
  const { data } = await supabase.from(ROASTERS_DB).delete().match({ id })

  return data
}
