<!DOCTYPE html>

<html lang="en">
    <head>
        @include('includes.head')
    </head>

    @yield('body')
    <script type="text/javascript">
    var APP_URL = {!! json_encode(url('/')) !!} + '/';
    var csrfToken = "{{ csrf_token() }}";
    </script>    
</html>
