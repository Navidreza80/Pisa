// Third party components
import Register1 from '@/components/auth/register/register-one'

/**
 * RegisterStepOne - Get user email to send verification code
 * 
 * @page
 * @route /auth/register/step-1
 * 
 * Features:
 * - DarkMode
 * - 4 language support
 * - Responsive
 * 
 */

export default async function RegisterStep1() {
  return (
    <Register1 />
  )
}