import { Link } from "@inertiajs/react"
import { useState } from "react"

const Navbar = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navLinks = ["Home", "Posts", "Fashion", "Lifestyle", "Technology", "Sports"]

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <header className="border-b bg-white">
            {/* Top Bar */}
            <div className="bg-gray-100 text-gray-600 text-xs border-b">
                <div className="container mx-auto px-4 flex justify-between items-center h-8">
                    <span>{today}</span>
                    <div className="flex items-center space-x-4">
                        <Link href="#" className="hover:text-red-600">Advertisement</Link>
                        <Link href="#" className="hover:text-red-600">About</Link>
                        <Link href="#" className="hover:text-red-600">Contact</Link>
                        {/* Add Social Icons Here if needed */}
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="text-3xl font-extrabold text-red-600">LintasFakta</Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map(link => (
                            <Link key={link} href={link === 'Home' ? '/' : '#'} className="font-semibold text-gray-700 hover:text-red-600 transition-colors duration-300">
                                {link}
                            </Link>
                        ))}
                    </div>

                    {/* Right side icons and Auth */}
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-600 hover:text-red-600"><i className="fas fa-search"></i></button>

                        <div className="hidden lg:flex items-center space-x-4">
                            {!user ? (
                                <>
                                    <Link href={route('login')} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">Login</Link>
                                    <Link href={route('register')} className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300">Register</Link>
                                </>
                            ) : (
                                <div className="relative">
                                     <Link href={route('dashboard')} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">Dashboard</Link>
                                     <Link href={route('logout')} method="post" as="button" className="ml-4 px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300">Logout</Link>
                                </div>
                            )}
                        </div>
                        
                        {/* Mobile Menu Button */}
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-gray-600 hover:text-red-600">
                            <i className={isMenuOpen ? "fas fa-times text-xl" : "fas fa-bars text-xl"}></i>
                        </button>
                    </div>
                </div>

                 {/* Mobile Menu */}
                 <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden pb-4`}>
                    <div className="flex flex-col space-y-4">
                        {navLinks.map(link => (
                            <Link key={link} href={link === 'Home' ? '/' : '#'} className="font-semibold text-gray-700 hover:text-red-600 transition-colors duration-300">
                                {link}
                            </Link>
                        ))}
                         <div className="border-t pt-4">
                         {!user ? (
                                <>
                                    <Link href={route('login')} className="block w-full text-center px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 mb-2">Login</Link>
                                    <Link href={route('register')} className="block w-full text-center px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300">Register</Link>
                                </>
                            ) : (
                                <>
                                     <Link href={route('dashboard')} className="block w-full text-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 mb-2">Dashboard</Link>
                                     <Link href={route('logout')} method="post" as="button" className="block w-full text-center px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300">Logout</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar