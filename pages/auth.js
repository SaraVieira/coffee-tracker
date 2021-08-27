import React, { useState } from 'react'
import { AuthRedirect } from '../hooks/authUser'
import { supabase } from '../utils/initSupabase'

import Layout from '../components/Layout'
import LoginView from '../components/LoginView'

const AuthPage = () => {
  AuthRedirect()

  return (
    <Layout>
      <LoginView />
    </Layout>
  )
}

export default AuthPage
