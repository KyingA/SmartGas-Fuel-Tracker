import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Create Account</h1>
                <p className="text-slate-500 font-medium">Join SmartGas and start tracking prices</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="name" value="Full Name" className="font-semibold text-slate-700" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50/50 focus:border-blue-500 focus:ring-blue-500 transition-all font-medium"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email Address" className="font-semibold text-slate-700" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50/50 focus:border-blue-500 focus:ring-blue-500 transition-all font-medium"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
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
                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50/50 focus:border-blue-500 focus:ring-blue-500 transition-all font-medium"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className="font-semibold text-slate-700"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50/50 focus:border-blue-500 focus:ring-blue-500 transition-all font-medium"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="pt-4">
                    <PrimaryButton 
                        className="w-full flex justify-center py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 transition-all border-none" 
                        disabled={processing}
                    >
                        Create Account
                    </PrimaryButton>
                </div>

                <div className="text-center pt-6 border-t border-slate-100">
                    <p className="text-sm text-slate-500 font-medium">
                        Already have an account?{' '}
                        <Link
                            href={route('login')}
                            className="text-blue-600 font-bold hover:text-blue-800 transition-all"
                        >
                            Log in here
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
