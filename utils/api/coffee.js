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

export const getCoffeesForRoaster = async ({ currentRoaster }) => {
  const { data } = await supabase
    .from(COFFEE_DB)
    .select('id,name,roast')
    .eq('roaster', currentRoaster.id)

  return data
}

export const removeCoffee = async ({ id }) => {
  const { data } = await supabase.from(COFFEE_DB).delete().match({ id })

  return data
}
