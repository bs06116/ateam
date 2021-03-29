<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
// use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // View::composer('layouts.base', function ($view) {
        //     $action = app('request')->route()->getAction();

        //     $controller = class_basename($action['controller']);

        //     list($controller, $action) = explode('@', $controller);

        //     $view->with(compact('controller', 'action'));
        // });

        app('view')->composer('includes.sidebar', function ($view) {
            $action = app('request')->route()->getAction();

            $controller = class_basename($action['controller']);

            list($controller, $action) = explode('@', $controller);

            $view->with(compact('controller', 'action'));
        });

        // Sharing Data With All Views
        // View::share('key', 'value');

    }
}
