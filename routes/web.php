<?php

use Illuminate\Support\Facades\Route;

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

//Route::redirect('/', '/jobs');
// Route::get('/', function () {
//     return route('projectManagers.index');
// });

Auth::routes();

Route::group(['middleware' => ['auth']], function () {
    Route::redirect('/home', '/jobs');
    Route::resource('projectManagers', 'ProjectManagersController');
    Route::post('/jobs/addEmp', 'JobsController@addEmp');
    Route::post('/jobs/removeEmp', 'JobsController@removeEmp');
	Route::post('/jobs/getEmps', 'JobsController@getEmps');
	Route::post('/jobs/saveComment', 'JobsController@saveComment');
	Route::post('/jobs/sendWDToSage', 'JobsController@sendWDToSage');
    Route::post('/jobs/workDiarySave', 'JobsController@workDiarySave');
    Route::get('/jobs/workDiaryData', 'JobsController@workDiaryData');
    Route::get('/jobs/workDiary', 'JobsController@workDiary');
    Route::get('/jobs/workDiaryCols', 'JobsController@workDiaryCols');
    Route::post('/jobs/getEmpDefaultPG', 'JobsController@getEmpDefaultPG');
    Route::post('/jobs/updateEmp', 'JobsController@updateEmp');
    Route::post('/jobs/getEmp', 'JobsController@getEmp');
    Route::resource('jobs', 'JobsController');
    Route::resource('accountants', 'AccountantsController');
    Route::resource('foremen', 'ForemenController');
    Route::resource('employees', 'EmployeesController');
    Route::resource('paygroups', 'PaygroupsController');

    Route::get('/clear/route', 'ConfigController@clearRoute');

});