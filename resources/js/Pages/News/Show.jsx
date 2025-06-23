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
                            src={`https://picsum.photos/seed/${news.id}/1200/600`} 
                            alt={news.title}
                            className="w-full h-auto max-h-[600px] object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    
                    <div className="prose lg:prose-xl max-w-4xl mx-auto text-justify">
                        <p className="lead text-xl text-gray-600 mb-8">{news.description}</p>
                        
                        {/* Placeholder for more content if available */}
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>
                        <p>Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>
                        <p>Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam. Sorbi in harmonig, neque sed.</p>
                    </div>

                </article>
            </div>

            <Footer />
        </div>
    );
};

export default Show; 