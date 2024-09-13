import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    })
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)

        if (!formData.email || !formData.password) {
            setError("Please enter both email and password")
            return
        }

        // Here you would typically send the login request to your backend
        console.log('Login attempt:', formData)
        // Reset form after successful submission (in a real app, you'd redirect on successful login)
        setFormData({ email: '', password: '', rememberMe: false })
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <header className="p-4">
                <a href="/" className="text-yellow-500 hover:text-yellow-400 transition-colors inline-flex items-center">
                    <ChevronLeft className="mr-2" />
                    Back to Home
                </a>
            </header>

            <main className="flex-grow flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold text-center mb-8">Log in to Savoria</h1>

                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-gray-800 border-gray-700 text-white"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-gray-800 border-gray-700 text-white"
                                placeholder="Enter your password"
                            />
                        </div>



                        <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                            Log In
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-gray-400">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                            Sign up
                        </a>
                    </p>
                </div>
            </main>

            <footer className="py-6 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} Savoria. All rights reserved.</p>
            </footer>
        </div>
    )
}