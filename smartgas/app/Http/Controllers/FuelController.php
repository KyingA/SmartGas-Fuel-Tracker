<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\FuelEntry;

class FuelController extends Controller
{
    public function index()
    {
        $entries = auth()->user()
            ->fuelEntries()
            ->latest()
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
                'price_per_liter' => 'required|numeric|gt:0',
            ]);

            auth()->user()->fuelEntries()->create($validated);

            return redirect()->route('dashboard');
        }

        public function destroy(FuelEntry $fuelEntry)
        {
            abort_if($fuelEntry->user_id !== auth()->id(), 403);

            $fuelEntry->delete();

            return redirect()->route('dashboard');
        }
}