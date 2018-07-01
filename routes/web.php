<?php

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

Route::group(['prefix' => LaravelLocalization::setLocale()], function()
{
    /** Authenticate Route */
    Auth::routes();
    Route::get('/auth/{provider}', 'Auth\LoginController@redirectToProvider');
    Route::get('/callback/{provider}', 'Auth\LoginController@handleProviderCallback');
    /** Profile Route */
    Route::group(['middleware' => 'auth'], function () {
        Route::get('/account', 'UserController@account')->name('users.account');
        Route::get('/update-password', 'UserController@updatePassword')->name('users.password');
    });

    Route::get('/', 'SiteController@index')->name('home');

    /** Package GROUP ROUTE **/
    Route::group(['prefix' => 'packages'], function () {
        Route::get('/', ['uses' => 'PackageController@index'])->name('packages');
        Route::get('category/{slug}', ['uses' => 'BlogController@category'])->name('packages.category')
            ->where('slug', '[a-z0-9\-]+');
        Route::get('{slug}', ['uses' => 'PackageController@post'])->name('packages.post')
            ->where('slug', '[a-z0-9\-]+');
    });

    /** BLOG GROUP ROUTE **/
    Route::group(['prefix' => 'blog'], function() {

        Route::get('/', ['as' => 'blog', 'uses' => 'BlogController@index']);
        Route::get('category/{slug}', ['as' => 'blog.category', 'uses' => 'BlogController@category'])
            ->where('slug', '[a-z0-9\-]+');
        Route::get('/{slug}', ['as' => 'blog.post', 'uses' => 'BlogController@post'])
            ->where('slug', '[a-z0-9\-]+');

    });

    /** Tutorial GROUP ROUTE **/
    Route::group(['prefix' => 'tutorials'], function() {

        Route::get('/', ['as' => 'tutorials', 'uses' => 'TutorialController@index']);
        Route::get('category/{slug}', ['as' => 'tutorials.category', 'uses' => 'TutorialController@category'])
            ->where('slug', '[a-z0-9\-]+');
        Route::get('/{slug}', ['as' => 'tutorials.post', 'uses' => 'TutorialController@post'])
            ->where('slug', '[a-z0-9\-]+');

    });

});

/** Voyager ROUTE **/
Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});
