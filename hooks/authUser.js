import { useEffect, useState, createContext, useContext } from 'react'
import { supabase } from '../utils/initSupabase'
import { useRouter } from 'next/router'

export const signOut = async () => {
  await supabase.auth.signOut()
}

export const RequireAuth = () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth')
    }
  }, [user, router])
}

export const AuthRedirect = () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/profile')
    }
  }, [user, router])
}

export const UserContext = createContext()

async function updateProfile() {
  try {
    const user = supabase.auth.user()

    const updates = {
      id: user.id,
      username: user.user_metadata.full_name,
      avatar_url: user.user_metadata.avatar_url,
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').insert(updates)

    if (error) {
      throw error
    }
  } catch (error) {
    alert(error.message)
  }
}

export const UserContextProvider = (props) => {
  const [session, setSession] = useState(false)
  const [user, setUser] = useState(false)
  const { push } = useRouter()

  useEffect(() => {
    const session = supabase.auth.session()
    setSession(session)
    setUser(session?.user ?? false)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const user = session?.user
      setSession(session)
      setUser(session?.user ?? false)
      if (user) {
        fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json())

        let { error, status } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single()

        push('/dashboard')
        if (error && status === 406) {
          await updateProfile(user)
        }
      }
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  const value = {
    session,
    user,
  }
  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }
  return context
}

const AuthUser = () => {
  const { user } = useUser()
  return user
}

export default AuthUser
