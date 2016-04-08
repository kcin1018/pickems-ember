<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

$api = app('Dingo\Api\Routing\Router');
$api->version('v1', function ($api) {
    header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, PATCH, DELETE');

    $api->group(['namespace' => 'App\Http\Controllers\Api'], function ($api) {
        // Auth
        $api->post('auth/login', 'Auth\AuthController@postLogin');
        $api->post('auth/token-refresh', 'Auth\AuthController@refreshToken');
        $api->post('users', 'UsersController@store');

        // Protected methods (require auth)
        $api->group(['middleware' => 'api.auth'], function ($api) {

        });

        // Public methods
        $api->get('home-stats', 'GeneralController@homeStats');

    });
});

Route::any('{catchall}', function () {
    return view('index');
})->where('catchall', '(.*)');
