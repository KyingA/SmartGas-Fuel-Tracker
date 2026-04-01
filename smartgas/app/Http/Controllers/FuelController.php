<?php

namespace App\Http\Controllers;

use App\Models\FuelEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FuelController extends Controller
{
    public function index()
    {
        $entries = FuelEntry::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Dashboard', [
            'entries' => $entries,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'station_name'    => 'required|string|max:255',
            'fuel_type'       => 'required|in:Diesel,Unleaded,Premium',
            'price_per_liter' => 'required|numeric|min:0.01',
        ]);

        FuelEntry::create([
            'user_id'         => Auth::id(),
            'station_name'    => $validated['station_name'],
            'fuel_type'       => $validated['fuel_type'],
            'price_per_liter' => $validated['price_per_liter'],
        ]);

        return redirect()->route('dashboard')
            ->with('success', 'Fuel price logged!');
    }

    public function destroy(FuelEntry $fuelEntry)
    {
        if ($fuelEntry->user_id !== Auth::id()) {
            abort(403);
        }

        $fuelEntry->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Entry deleted.');
    }
}