import { useState } from 'react';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LOGIN } from '@/graphql/mutations/user.mutations';
import { useMutation } from '@apollo/client';
import { toast } from '@/hooks/use-toast';

export default function LoginPage() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [login,{loading}] = useMutation(LOGIN,{refetchQueries:['GET_USER']});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!formData.email || !formData.password) {
            setError("Please enter both email and password");
            return;
        }

        try {
          await login({ variables: { input: formData } });
          window.location.href = '/';
                setFormData({ email: '', password: '' });
        } catch (error) {
            console.error('Login error:', error);
            toast({
                title: "Error",
                description: 'Incorrect credentials',
                variant: 'destructive'
            });
        }
    };

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

                        <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" disabled={loading}>
                        {loading ? <Loader2 className='animate-spin size-5' /> : 'Login'}
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
    );
}
