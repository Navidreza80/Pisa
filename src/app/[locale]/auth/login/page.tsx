// Third party components
import Login from '@/components/auth/login/Login'

/**
 * LoginPage - User login
 * 
 * @page
 * @route /auth/login
 * 
 * Features:
 * - Login user by getting email & password
 * - Responsive
 * - DarkMode
 * - 4 language support
 * 
 */

export default async function LoginPage() {
  return (
    <Login />
  )
}

