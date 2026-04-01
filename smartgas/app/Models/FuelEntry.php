<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FuelEntry extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'station_name',
        'fuel_type',
        'price_per_liter',
    ];

    /**
     * Get the user that owns the fuel entry.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
