import { supabase } from './initSupabase'

export const getUser = (req) => supabase.auth.api.getUserByCookie(req)
