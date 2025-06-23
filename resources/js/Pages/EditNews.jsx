import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function EditNews({ auth, errors, news }) {
    const { data, setData, post, processing } = useForm({
        title: news.title || '',
        description: news.description || '',
        category: news.category || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('update.news', { news: news.id }), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Article</h2>}
        >
            <Head title={`Edit - ${news.title}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-8">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.title && <p className="text-red-500 text-xs mt-2">{errors.title}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                                    <input
                                        type="text"
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.category && <p className="text-red-500 text-xs mt-2">{errors.category}</p>}
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                                    ></textarea>
                                    {errors.description && <p className="text-red-500 text-xs mt-2">{errors.description}</p>}
                                </div>

                                <div className="flex items-center justify-end space-x-4">
                                    <Link 
                                        href={route('dashboard')}
                                        className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 font-semibold"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 font-semibold disabled:bg-red-400"
                                    >
                                        {processing ? 'Updating...' : 'Update Article'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}