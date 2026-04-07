<?php

namespace App\Http\Controllers;

use App\Models\FuelEntry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FuelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $entries = $request->user()->fuelEntries()->latest()->get();

        return Inertia::render('Dashboard', [
            'entries' => $entries
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'station_name' => ['required', 'string', 'max:255'],
            'fuel_type' => ['required', 'in:Diesel,Unleaded,Premium'],
            'price_per_liter' => ['required', 'numeric', 'gt:0'],
        ]);

        $request->user()->fuelEntries()->create($validated);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FuelEntry $fuelEntry, Request $request)
    {
        if ($fuelEntry->user_id === $request->user()->id) {
            $fuelEntry->delete();
        }

        return redirect()->back();
    }
}
