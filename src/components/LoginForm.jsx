'use client'

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Button from "@/components/Button";
import InputBox from "@/components/InputBox";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

const LoginForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) {
            toast.error("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            const response = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (response?.ok) {
                router.push("/dashboard");
            } else {
                toast.error(response.error || "Login failed.");
            }
        } catch (error) {
            toast.error(error.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
                <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <InputBox
                        name="email"
                        type="email"
                        content="Enter your email"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="relative mt-1">
                        <InputBox
                            name="password"
                            type={showPassword ? "text" : "password"}
                            content="Enter your password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-[#89CFF0] focus:ring-[#89CFF0]"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                    </label>
                </div>

                <a href="/forget-password" className="text-sm font-medium text-[#89CFF0] hover:text-[#67ADD8]">
                    Forgot Password?
                </a>
            </div>

            <div className="mt-6">
                <Button
                    loading={loading}
                    content="Sign In"
                    className="w-full transform rounded-lg bg-[#89CFF0] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#67ADD8] focus:outline-none focus:ring-2 focus:ring-[#89CFF0] focus:ring-offset-2"
                />
            </div>
        </form>
    );
};

export default LoginForm;