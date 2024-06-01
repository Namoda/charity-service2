import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import GoogleLogin from '../../components/Social/GoogleLogin';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { login, error, setError, loader, setLoader } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        setError('');
        e.preventDefault();
        const data = new FormData(e.target);
        const formData = Object.fromEntries(data);
        login(formData.email, formData.password)
            .then(() => {
                alert("Login successful");
                navigate('/');
            })
            .catch(err => {
                setError(err.code);
                setLoader(false);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white rounded-lg shadow-lg flex max-w-4xl w-full overflow-hidden">
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-center text-secondary mb-4">Login Here!</h1>
                    <p className="text-center text-gray-500 mb-6">Login And Help Save A World</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <p className="text-center text-red-400 text-lg font-medium">Sign in to your account</p>
                        {error && <p className="text-center text-red-400 text-sm font-medium">{error}</p>}
                        
                        <div className="relative">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full border outline-none rounded-lg border-gray-300 p-4 text-sm shadow-sm focus:border-purple-500"
                                placeholder="Enter email"
                            />
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </span>
                        </div>
                        
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                className="w-full rounded-lg outline-none border border-gray-300 p-4 text-sm shadow-sm focus:border-purple-500"
                                placeholder="Enter password"
                            />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-purple-600 hover:bg-purple-700 px-5 py-3 text-sm font-medium text-white transition-colors duration-300"
                        >
                            Sign in
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            No account? <Link className="underline text-purple-600" to="/register">Sign up</Link>
                        </p>
                    </form>
                    <div className="mt-6">
                        <GoogleLogin />
                    </div>
                </div>
                <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/02/09/43/80/360_F_209438048_bqYPR1SZJx583icNF2fasiwfnttqMZZn.jpg')" }}>
                    {/* Replace the URL with the path to your desired image */}
                </div>
            </div>
        </div>
    );
};

export default Login;
