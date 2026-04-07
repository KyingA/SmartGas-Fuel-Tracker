import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Welcome Back</h1>
                <p className="text-slate-500 font-medium">Access your fuel tracker dashboard</p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-emerald-600 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="Email Address" className="font-semibold text-slate-700" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50/50 focus:border-blue-500 focus:ring-blue-500 outline-none transition-all"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" className="font-semibold text-slate-700" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50/50 focus:border-blue-500 focus:ring-blue-500 outline-none transition-all"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center group cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            className="rounded-md border-slate-300 text-blue-600 shadow-sm focus:ring-blue-500 cursor-pointer"
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-slate-500 group-hover:text-slate-700 transition-colors">
                            Stay signed in
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline transition-all"
                        >
                            Forgot Password?
                        </Link>
                    )}
                </div>

                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full flex justify-center py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 transition-all border-none" 
                        disabled={processing}
                    >
                        Log In
                    </PrimaryButton>
                </div>

                <div className="text-center pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-500 font-medium">
                        Don't have an account?{' '}
                        <Link
                            href={route('register')}
                            className="text-blue-600 font-bold hover:text-blue-800 transition-all"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
