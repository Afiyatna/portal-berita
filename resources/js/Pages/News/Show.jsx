import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const Show = ({ news, auth }) => {
    return (
        <div className="min-h-screen bg-white text-gray-800 font-sans">
            <Head title={news.title} />
            <Navbar user={auth.user} />

            <div className="container mx-auto px-4 py-12">
                <article>
                    <header className="mb-8 text-center">
                        <div className="mb-4">
                             <Link href="#" className="text-sm font-bold uppercase text-red-600 hover:text-red-700">{news.category}</Link>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">{news.title}</h1>
                        <p className="text-lg text-gray-500">
                            By <span className="font-semibold text-gray-800">{news.author}</span> on {new Date().toLocaleDateString()}
                        </p>
                    </header>

                    <div className="mb-12">
                        <img 
                            src={news.image ? `/${news.image}` : `https://picsum.photos/seed/${news.id}/1200/600`} 
                            alt={news.title}
                            className="w-full h-auto max-h-[600px] object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    
                    <div className="prose lg:prose-xl max-w-4xl mx-auto text-justify">
                        <div dangerouslySetInnerHTML={{ __html: news.description }} />
                    </div>

                </article>
            </div>

            <Footer />
        </div>
    );
};

export default Show; 