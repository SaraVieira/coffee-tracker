import { supabase } from '../initSupabase'

export const getCoffees = async ({ user }) => {
  const { data: coffees } = await supabase
    .from('coffees')
    .select(
      `
  *,
  roaster (
    name,
    website
  ) `
    )
    .eq('user', user.id)

  return coffees
}
