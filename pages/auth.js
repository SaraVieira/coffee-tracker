import React from 'react'
import { AuthRedirect } from '../hooks/authUser'

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
