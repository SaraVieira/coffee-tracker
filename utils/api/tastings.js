import { COFFEE_DB, TASTINGS_DB } from '../constants'
import { supabase } from '../initSupabase'

export const getTastings = async ({ user }) => {
  const { data: tastings } = await supabase
    .from(TASTINGS_DB)
    .select(
      `
      *,
      roaster (
        id,
        name,
        website
      ),
      coffee (
        id,
        name
      )
  `
    )
    .eq('user', user.id)

  return tastings
}

export const addTasting = async (tasting) => {
  const { data } = await supabase.from(TASTINGS_DB).insert(tasting)
  return data
}

export const getTastingsForCoffee = async ({ currentCoffee, user }) => {
  const { data } = await supabase
    .from(TASTINGS_DB)
    .select('id,name,liked')
    .eq('coffee', currentCoffee.id)
    .eq('user', user.id)

  return data
}

export const getRoastersForTasting = async ({ currentCoffee }) => {
  const { data } = await supabase.from(TASTINGS_DB).select('id,name').eq('coffee', currentCoffee.id)

  return data
}

export const removeTasting = async ({ id }) => {
  const { data } = await supabase.from(TASTINGS_DB).delete().match({ id })

  return data
}
