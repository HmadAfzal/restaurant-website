import { useState } from 'react';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SIGNUP } from '@/graphql/mutations/user.mutations';
import { useMutation } from '@apollo/client';
import { useToast } from '@/hooks/use-toast';

export default function SignupPage() {
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<string[]>([]);
    
    const [signup, { loading, error: signupError }] = useMutation(SIGNUP);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: string[] = [];

        if (!formData.username) newErrors.push("Username is required");
        if (!formData.email) newErrors.push("Email is required");
        if (!formData.password) newErrors.push("Password is required");
        if (formData.password !== formData.confirmPassword) newErrors.push("Passwords do not match");

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await signup({ variables: { input: formData } });
            window.location.href = `/verify/${formData?.email}`;
            setFormData({ username: '', email: '', password: '', confirmPassword: '' });
            setErrors([]);
        } catch (error) {
            console.log('Signup error:', signupError);
            toast({
                title: "Faliure",
                description: signupError?.message || "An unexpected error occurred.",
                variant: 'destructive',
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
                    <h1 className="text-3xl font-bold text-center mb-8">Sign Up for Savoria</h1>

                    {errors.length > 0 && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertDescription>
                                <ul className="list-disc list-inside">
                                    {errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                className="bg-gray-800 border-gray-700 text-white"
                                placeholder="Enter your username"
                            />
                        </div>

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
                                placeholder="Create a password"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="bg-gray-800 border-gray-700 text-white"
                                placeholder="Confirm your password"
                            />
                        </div>

                        <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" disabled={loading}>
                            {loading ? <Loader2 className='animate-spin size-5' /> : 'Sign Up'}
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-gray-400">
                        Already have an account?{' '}
                        <a href="/login" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                            Log in
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
