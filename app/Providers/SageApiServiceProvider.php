<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class SageApiServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('SageApiService', function ($app) {
            return new \App\Services\SageApiService();
        });
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
    }
}
