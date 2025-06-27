<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use Inertia\Inertia;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $news = new NewsCollection(News::OrderByDesc('id')->paginate(8));
        return Inertia::render('Homepage', [
            'title' => "Lintas Fakta",
            'description' => "Selamat Datang Di Cuy Universe News Portal",
            'news' => $news,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;
        $news->author = auth()->user()->email;
        $news->published_at = $request->published_at ? $request->published_at : now();

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/news'), $imageName);
            $news->image = 'images/news/' . $imageName;
        }

        $news->save();
        return redirect()->back()->with('message', 'Berita berhasil dibuat'); 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function show(News $news)
    {
        $myNews = $news::where('author', auth()->user()->email)->get();
        // dd($myNews);
        return Inertia::render('Dashboard', [
            'myNews' => $myNews,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function edit(News $news)
    {
        return Inertia::render('EditNews', [
            'news' => $news
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, News $news)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['title', 'description', 'category']);
        $data['published_at'] = $request->published_at ? $request->published_at : now();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($news->image && file_exists(public_path($news->image))) {
                unlink(public_path($news->image));
            }
            
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/news'), $imageName);
            $data['image'] = 'images/news/' . $imageName;
        }

        $news->update($data);
        
        return to_route('dashboard')->with('message', 'Berita berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $news = News::find($request->id);
        if ($news) {
            $news->delete();
        }
        return to_route('dashboard')->with('message', 'berita berhasil dihapus');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\News  $news
     * @return \Inertia\Response
     */
    public function showNewsDetail(News $news)
    {
        return Inertia::render('News/Show', [
            'news' => $news,
        ]);
    }
}
