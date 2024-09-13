import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';

const useAuth = () => {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        setUser({ name: 'John Doe', email: 'john@example.com' });
    }, []);

    return { user, logout: () => setUser(null) };
};

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logout } = useAuth();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={`fixed w-full z-20 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 shadow-lg' : 'bg-transparent'}`}>
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <a href="/" className="text-2xl font-bold text-yellow-500">Savoria</a>
                    <nav className="hidden md:flex space-x-6">
                        <a href="#home" className="hover:text-yellow-500 transition-colors">Home</a>
                        <a href="#products" className="hover:text-yellow-500 transition-colors">Products</a>
                        <a href="#promo" className="hover:text-yellow-500 transition-colors">Promo</a>
                        <a href="#about" className="hover:text-yellow-500 transition-colors">About</a>
                        <a href="#contact" className="hover:text-yellow-500 transition-colors">Contact</a>
                    </nav>
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="https://i.pinimg.com/236x/dc/4a/a2/dc4aa2d94c7f32d281e8b28abbfa017c.jpg" alt={user.name} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuItem className="flex-col items-start">
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-xs text-gray-500">{user.email}</div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={logout}>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Button variant="outline" className="text-yellow-500 hover:bg-yellow-400  transition-colors bg-transparent border-none"><a href="/login">Login</a></Button>
                                <Button className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition-colors"><a href="/signup">Sign up</a></Button>
                            </>
                        )}
                    </div>
                    <button className="md:hidden text-yellow-500" onClick={toggleSidebar}>
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* Sidebar */}
            <div className={`fixed inset-0 bg-gray-900 z-30 transform ${isSidebarOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                <div className="flex justify-end p-4">
                    <button onClick={closeSidebar} className="text-yellow-500">
                        <X size={24} />
                    </button>
                </div>
                <nav className="flex flex-col items-center">
                    {
                        user && <>
                         <Avatar className="h-16 w-16 mx-auto mb-2">
                                <AvatarImage src="https://i.pinimg.com/236x/dc/4a/a2/dc4aa2d94c7f32d281e8b28abbfa017c.jpg" alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-400">{user.email}</div>
                        </>
                    }
                    <div className='space-y-6 flex flex-col my-6 items-center'>
                    <a href="#home" className="text-xl hover:text-yellow-500 transition-colors" onClick={closeSidebar}>Home</a>
                    <a href="#products" className="text-xl hover:text-yellow-500 transition-colors" onClick={closeSidebar}>Products</a>
                    <a href="#promo" className="text-xl hover:text-yellow-500 transition-colors" onClick={closeSidebar}>Promo</a>
                    <a href="#about" className="text-xl hover:text-yellow-500 transition-colors" onClick={closeSidebar}>About</a>
                    <a href="#contact" className="text-xl hover:text-yellow-500 transition-colors" onClick={closeSidebar}>Contact</a></div>
                    {user ? (
                        <div className="text-center">
                            <Button variant={'default'} className="mt-2 bg-yellow-500" onClick={logout}>Log out</Button>
                        </div>
                    ) : (
                        <>
                            <Button className="w-48 mb-4 bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition-colors"><a href="/signup">Sign up</a></Button>
                            <Button variant="outline" className="w-48 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 transition-colors"><a href="/login">Login</a></Button>
                        </>
                    )}
                </nav>
            </div>
        </>
    );
};

export default Header;