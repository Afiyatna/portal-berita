import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Dashboard(props) {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { title, description, category };
        router.post(route('create.news'), data, {
            onSuccess: () => {
                setShowModal(false);
                setTitle('');
                setDescription('');
                setCategory('');
            },
        });
    };

    const deleteNews = (id) => {
        if (confirm('Are you sure you want to delete this news?')) {
            router.post(route('delete.news'), { id });
        }
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold">Welcome back, {props.auth.user.name}!</h3>
                                    <p className="text-gray-600">Here's the list of news you've created.</p>
                                </div>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-300 font-semibold"
                                >
                                    + Create New Article
                                </button>
                            </div>
                            
                            {props.flash.message && (
                                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md" role="alert">
                                    <p>{props.flash.message}</p>
                                </div>
                            )}

                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Title</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Category</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.myNews && props.myNews.length > 0 ? (
                                            props.myNews.map((news) => (
                                                <tr key={news.id} className="border-b hover:bg-gray-50">
                                                    <td className="py-3 px-4 font-medium">{news.title}</td>
                                                    <td className="py-3 px-4">
                                                        <span className="bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                                                            {news.category}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 flex space-x-2">
                                                        <Link
                                                            href={route('edit.news', { news: news.id })}
                                                            className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => deleteNews(news.id)}
                                                            className="text-sm bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="py-4 px-4 text-center text-gray-500">
                                                    You haven't created any news yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create News Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl">
                        <h2 className="text-2xl font-bold mb-6">Create a New Article</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                                <input
                                    type="text"
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 font-semibold"
                                >
                                    Submit Article
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
