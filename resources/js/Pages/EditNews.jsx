import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditNews({ auth, errors, news }) {
    const [image, setImage] = useState(null);
    
    const { data, setData, post, processing } = useForm({
        title: news.title || '',
        description: news.description || '',
        category: news.category || '',
        published_at: news.published_at ? news.published_at.slice(0, 16) : '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('published_at', data.published_at);
        if (image) {
            formData.append('image', image);
        }

        post(route('update.news', { news: news.id }), {
            preserveScroll: true,
            data: formData,
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

                                <div className="mb-4">
                                    <label htmlFor="published_at" className="block text-gray-700 text-sm font-bold mb-2">Publish Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        id="published_at"
                                        value={data.published_at}
                                        onChange={(e) => setData('published_at', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.published_at && <p className="text-red-500 text-xs mt-2">{errors.published_at}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Article Image</label>
                                    {news.image && (
                                        <div className="mb-2">
                                            <img src={`/${news.image}`} alt="Current image" className="w-32 h-32 object-cover rounded" />
                                            <p className="text-xs text-gray-500">Current image</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        accept="image/*"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Accepted formats: JPEG, PNG, JPG, GIF (max 2MB). Leave empty to keep current image.</p>
                                    {errors.image && <p className="text-red-500 text-xs mt-2">{errors.image}</p>}
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                    <ReactQuill
                                        value={data.description}
                                        onChange={val => setData('description', val)}
                                        theme="snow"
                                        style={{ height: '200px', marginBottom: '40px' }}
                                    />
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