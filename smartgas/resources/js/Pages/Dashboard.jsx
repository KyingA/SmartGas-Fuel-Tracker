import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Dashboard({ auth, entries }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        station_name: '',
        fuel_type: 'Diesel',
        price_per_liter: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('fuel.store'), {
            onSuccess: () => reset()
        });
    };

    const deleteEntry = (id) => {
        if (confirm('Are you sure you want to delete this fuel entry?')) {
            router.delete(route('fuel.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-gray-800 tracking-tight">
                    SmartGas Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        {/* Form Section */}
                        <div className="md:col-span-1">
                            <div className="bg-white shadow-xl shadow-gray-200/50 rounded-2xl overflow-hidden border border-gray-100 transition-all hover:shadow-2xl">
                                <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700">
                                    <h3 className="text-lg font-semibold text-white">Log Fuel Price</h3>
                                    <p className="text-blue-100 text-sm mt-1">Found a new price? Track it here.</p>
                                </div>
                                
                                <form onSubmit={submit} className="p-6 space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Station Name</label>
                                        <input
                                            type="text"
                                            value={data.station_name}
                                            onChange={e => setData('station_name', e.target.value)}
                                            className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors bg-gray-50"
                                            placeholder="e.g. Shell, Petron"
                                        />
                                        {errors.station_name && <p className="text-rose-500 text-xs mt-1">{errors.station_name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                                        <select
                                            value={data.fuel_type}
                                            onChange={e => setData('fuel_type', e.target.value)}
                                            className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors bg-gray-50"
                                        >
                                            <option value="Diesel">Diesel</option>
                                            <option value="Unleaded">Unleaded</option>
                                            <option value="Premium">Premium</option>
                                        </select>
                                        {errors.fuel_type && <p className="text-rose-500 text-xs mt-1">{errors.fuel_type}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price per Liter</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">₱</span>
                                            </div>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={data.price_per_liter}
                                                onChange={e => setData('price_per_liter', e.target.value)}
                                                className="w-full pl-8 rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors bg-gray-50"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        {errors.price_per_liter && <p className="text-rose-500 text-xs mt-1">{errors.price_per_liter}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full flex justify-center py-2.5 px-4 rounded-xl shadow-md text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition hover:-translate-y-0.5"
                                    >
                                        {processing ? 'Saving...' : 'Save Entry'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* History Table Section */}
                        <div className="md:col-span-2">
                            <div className="bg-white shadow-xl shadow-gray-200/50 rounded-2xl overflow-hidden border border-gray-100">
                                <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                    <h3 className="text-lg leading-6 font-semibold text-gray-900">Price History</h3>
                                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                                        {entries?.length || 0} Entries
                                    </span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Station</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price (₱)</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-100">
                                            {entries && entries.length > 0 ? (
                                                entries.map((entry) => (
                                                    <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {entry.station_name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                                                {entry.fuel_type}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                                                            <span className={parseFloat(entry.price_per_liter) > 90.00 ? 'text-rose-500' : 'text-emerald-500'}>
                                                                {parseFloat(entry.price_per_liter).toFixed(2)}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(entry.created_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button
                                                                onClick={() => deleteEntry(entry.id)}
                                                                className="text-gray-400 hover:text-rose-500 transition-colors"
                                                                title="Delete Entry"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-10 text-center text-sm text-gray-500">
                                                        <div className="flex flex-col items-center justify-center space-y-3">
                                                            <div className="p-3 bg-gray-50 rounded-full">
                                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                                            </div>
                                                            <p>No fuel entries found. Start logging your fuel prices!</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
