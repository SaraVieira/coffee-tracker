import { COFFEE_DB } from '../constants'
import { supabase } from '../initSupabase'

export const getCoffees = async ({ user }) => {
  const { data: coffees } = await supabase
    .from(COFFEE_DB)
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

export const addCoffee = async (coffee) => {
  const { data } = await supabase.from(COFFEE_DB).insert(coffee)
  return data
}
