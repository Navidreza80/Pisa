// Third party components
import LoginContainer from '@/components/pages/login/container'

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
    <LoginContainer />
  )
}

