<?php

use App\Http\Controllers\NewsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\News;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [NewsController::class, 'index']);
Route::get('/news/{news}', [NewsController::class, 'showNewsDetail'])->name('news.show');
Route::post('/news', [NewsController::class, 'store'])->middleware(['auth', 'verified'])->name('create.news');
Route::get('/news', [NewsController::class, 'show'])->middleware(['auth', 'verified'])->name('my.news');
Route::get('/news/{news}/edit', [NewsController::class, 'edit'])->middleware(['auth', 'verified'])->name('edit.news');
Route::post('/news/{news}', [NewsController::class, 'update'])->middleware(['auth', 'verified'])->name('update.news');
Route::delete('/news/delete', [NewsController::class, 'destroy'])->middleware(['auth', 'verified'])->name('delete.news');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', function () {
    // Ambil berita milik user yang sedang login
    $myNews = News::where('author', auth()->user()->email)->orderByDesc('id')->get();
    
    // Kirim 'myNews' sebagai props ke halaman Dashboard
    return Inertia::render('Dashboard', [
        'myNews' => $myNews
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
});

require __DIR__.'/auth.php';
