import React from 'react';
import { Link } from '@inertiajs/react';

const Footer = () => {
    const footerLinks = {
        'News': ['U.S.', 'Conflicts', 'Terrorism', 'Disasters', 'Global Economy', 'Environment', 'Religion', 'Scandals'],
        'Politics': ['Executive', 'Senate', 'House', 'Judiciary', 'Foreign policy', 'Polls', 'Elections'],
        'Entertainment': ['Celebrity News', 'Movies', 'TV News', 'Music News', 'Style News', 'Entertainment Video'],
        'Business': ['Markets', 'Politics', 'Technology', 'Features', 'Business Leaders'],
        'Health': ['Healthy Living', 'Medical Research', 'Mental Health', 'Parenting', 'Children\'s Health'],
        'Contact': ['About', 'Contact Us', 'Careers', 'FAQ', 'Advertise with Us', 'Media Relations', 'Compliance']
    };

    return (
        <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
                    {/* Logo and About Section */}
                    <div className="col-span-2 lg:col-span-1 mb-8 md:mb-0">
                         <h1 className="text-white text-3xl font-bold mb-4">LintasFakta</h1>
                         <p className="text-sm">Your source for the latest news and stories from around the world.</p>
                    </div>

                    {/* Footer Links */}
                    {Object.keys(footerLinks).map(section => (
                        <div key={section}>
                            <h5 className="font-bold text-white uppercase mb-4 text-sm">{section}</h5>
                            <ul className="space-y-2">
                                {footerLinks[section].map(link => (
                                    <li key={link}>
                                        <Link href="#" className="hover:text-white transition-colors duration-300 text-sm">{link}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500 mb-4 md:mb-0">&copy; {new Date().getFullYear()} LintasFakta. All Rights Reserved.</p>
                    <div className="flex space-x-4">
                        <Link href="#" className="hover:text-white"><i className="fab fa-facebook-f"></i>Facebook</Link>
                        <Link href="#" className="hover:text-white"><i className="fab fa-twitter"></i>Twitter</Link>
                        <Link href="#" className="hover:text-white"><i className="fab fa-youtube"></i>Youtube</Link>
                        <Link href="#" className="hover:text-white"><i className="fab fa-linkedin-in"></i>Linkedin</Link>
                    </div>
                </div>
                 <div className="mt-8 text-center text-xs text-gray-600">
                    <p>
                        <Link href="#" className="hover:text-white mx-2">Terms of Use</Link> |
                        <Link href="#" className="hover:text-white mx-2">Privacy Policy</Link> |
                        <Link href="#" className="hover:text-white mx-2">Ad Choices</Link> |
                        <Link href="#" className="hover:text-white mx-2">Advertise</Link> |
                        <Link href="#" className="hover:text-white mx-2">Newsletters</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 