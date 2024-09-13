import { useState } from 'react'
import { ChevronLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { VERIFY_EMAIL } from '@/graphql/mutations/user.mutations'
import { useMutation } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom';

export default function VerificationEmailPage() {
  const [verificationCode, setVerificationCode] = useState('')
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending')
  const [verifyEmail, { loading }] = useMutation(VERIFY_EMAIL);
  const { email } = useParams<{ email: string }>(); 
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verificationCode || !email) {
      setVerificationStatus('error');
      return;
    }

    try {
      const { data } = await verifyEmail({ variables: { input: { verificationCode, email } } });

      if (data?.verifyEmail) {
        setVerificationStatus('success');
        setTimeout(() => {
          navigate('/login');
        },500);
      } else {
        setVerificationStatus('error');
      }
    } catch (error) {
      console.log('Error verifying email:', error);
      setVerificationStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4">
        <a href="/signup" className="text-yellow-500 hover:text-yellow-400 transition-colors inline-flex items-center">
          <ChevronLeft className="mr-2" />
          Back to Signup
        </a>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">Verify Your Email</h1>

          {verificationStatus === 'pending' && (
            <Alert className="mb-6 bg-yellow-500 text-gray-900 border-yellow-600">
              <AlertTitle className="text-gray-900">Verification Required</AlertTitle>
              <AlertDescription>
                Please enter the 6-digit code sent to your email address.
              </AlertDescription>
            </Alert>
          )}

          {verificationStatus === 'success' && (
            <Alert className="mb-6 bg-green-500 text-white border-green-600">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your email has been successfully verified. You can now log in to your account.
              </AlertDescription>
            </Alert>
          )}

          {verificationStatus === 'error' && (
            <Alert className="mb-6 bg-red-500 text-white border-red-600">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                The verification code is incorrect. Please try again or request a new code.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                type="text"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
              disabled={verificationCode.length !== 6 || loading}
            >
             {loading ? <Loader2 className='animate-spin'/> : 'Verify Email'} 
            </Button>
          </form>

          {verificationStatus === 'success' && (
            <div className="mt-4">
              <a href="/login">
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                  Go to Login
                </Button>
              </a>
            </div>
          )}

          <p className="mt-6 text-center text-gray-400">
            Didn't receive an email? Check your spam folder or contact our support team.
          </p>
        </div>
      </main>

      <footer className="py-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Savoria. All rights reserved.</p>
      </footer>
    </div>
  )
}
