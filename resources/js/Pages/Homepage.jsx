import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Paginator from '@/Components/Homepage/Paginator';
import Footer from '@/Components/Footer';

export default function Homepage(props) {
    const { news } = props;
    const mainNews = news.data[0];
    const recentNews = news.data.slice(1, 5); // 4 news for the side
    const topStories = news.data.slice(5); // The rest for top stories

    return (
        <div className='min-h-screen bg-white text-gray-800 font-sans'>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />

            <div className="container mx-auto px-4 py-8">
                {/* Top Section: Main News and Recent News */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    
                    {/* Main News */}
                    {mainNews && (
                        <div className="lg:col-span-2 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                             <img src={`https://picsum.photos/seed/${mainNews.id}/800/600`} alt={mainNews.title} className="w-full h-96 object-cover"/>
                            <div className="p-6">
                                <Link href={`/news/${mainNews.id}`} className="hover:text-red-600 transition-colors duration-300">
                                    <h1 className="text-4xl font-bold leading-tight mb-4">{mainNews.title}</h1>
                                </Link>
                                <p className="text-gray-600 mb-4">{mainNews.description}</p>
                                <div className="text-sm text-gray-500">
                                    <span>By {mainNews.author}</span>
                                    <span className="mx-2">•</span>
                                    <span>{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Recent News */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold border-b-4 border-red-500 pb-2">Recent News</h2>
                        {recentNews.map((item) => (
                             <div key={item.id} className="flex items-start space-x-4 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 group">
                                <img src={`https://picsum.photos/seed/${item.id}/150/150`} alt={item.title} className="w-24 h-24 object-cover rounded-md"/>
                                <div>
                                    <span className="text-xs bg-red-500 text-white font-semibold px-2 py-1 rounded-full uppercase">{item.category}</span>
                                    <Link href={`/news/${item.id}`} className="mt-2 block font-semibold text-lg leading-tight group-hover:text-red-600">{item.title}</Link>
                                    <p className="text-sm text-gray-500 mt-1">By {item.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Stories Section */}
                <div>
                    <h2 className="text-3xl font-bold border-b-4 border-red-500 pb-2 mb-8">Top Stories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {topStories.map((story) => (
                            <div key={story.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
                                 <img src={`https://picsum.photos/seed/${story.id}/600/400`} alt={story.title} className="w-full h-56 object-cover"/>
                                <div className="p-6">
                                    <span className="text-xs bg-blue-500 text-white font-semibold px-2 py-1 rounded-full uppercase">{story.category}</span>
                                    <Link href={`/news/${story.id}`}>
                                        <h3 className="mt-4 text-2xl font-semibold leading-tight group-hover:text-red-600 transition-colors duration-300">{story.title}</h3>
                                    </Link>
                                    <p className="mt-2 text-gray-600">{story.description.substring(0, 100)}...</p>
                                     <div className="text-sm text-gray-500 mt-4">
                                        <span>By {story.author}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Paginator */}
                <div className='flex justify-center items-center mt-12'>
                    <Paginator meta={props.news.meta} />
                </div>
            </div>
            <Footer />
        </div>
    );
}