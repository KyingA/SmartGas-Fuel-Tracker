import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-slate-50 pt-6 sm:justify-center sm:pt-0 relative overflow-hidden">
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400 rounded-full blur-[120px]"></div>
                <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-indigo-300 rounded-full blur-[150px]"></div>
            </div>

            <div className="z-10 transition-all duration-700 ease-out transform">
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-blue-600 drop-shadow-sm" />
                </Link>
            </div>

            <div className="z-10 mt-8 w-full overflow-hidden bg-white/80 backdrop-blur-xl border border-white px-8 py-8 shadow-[0_20px_50px_rgba(8,112,184,0.1)] sm:max-w-md sm:rounded-3xl">
                {children}
            </div>
            
            <footer className="z-10 mt-12 text-slate-400 text-sm font-medium">
                &copy; {new Date().getFullYear()} SmartGas. Premium Fuel Tracking.
            </footer>
        </div>
    );
}
