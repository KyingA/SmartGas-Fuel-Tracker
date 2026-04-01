<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FuelController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Updated to use FuelController@index instead of inline closure
Route::get('/dashboard', [FuelController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// SmartGas Fuel Routes (auth protected)
Route::middleware('auth')->group(function () {
    Route::post('/fuel', [FuelController::class, 'store'])->name('fuel.store');
    Route::delete('/fuel/{fuelEntry}', [FuelController::class, 'destroy'])->name('fuel.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';