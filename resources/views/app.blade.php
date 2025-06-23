@php
    $cwd = getcwd();
    $cssName = basename(glob($cwd . '/build/assets/*.css')[0], '.css');
    $jsName = basename(glob($cwd . '/build/assets/*.js')[0], '.js');
    $css = asset('/build/assets/' . $cssName . '.css');
    $js = asset('/build/assets/' . $jsName . '.js');
@endphp

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        
        <!-- Font Awesome -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        
        {{-- nyalakan kode ini untuk melakukan perubahan dalam kodingan --}}
        <!-- @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"]) -->
        
        {{-- nyalakan kode ini untuk mendeploy --}}
        <link rel="stylesheet" href="{{ $css }}" id="css">
        <script type="module" src="{{ $js }}" id="js"></script>
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
