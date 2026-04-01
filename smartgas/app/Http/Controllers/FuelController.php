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

    // =============================================
    // Member B — dagdag mo dito yung store() method
    // at destroy() method pagkatapos ng index()
    // =============================================
}