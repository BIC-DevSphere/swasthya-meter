'use client'

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Button from "@/components/Button";
import InputBox from "@/components/InputBox";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const handleRegister = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.target);
        const fullName = formData.get('fullName');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (!email || !fullName || !password || !confirmPassword) {
            toast.error("All fields are required.");
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            setLoading(false);
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/auth/signup', {
                fullName,
                email,
                password,
            });
            setLoading(false);

            if (response?.statusText === 'OK') {
                toast.success("Account created successfully!");
                router.push("/signin");
            } else {
                toast.error(response?.data?.error || "Registration failed.");
            }
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.error || "An error occurred.");
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-4">
                <div className="relative">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <InputBox
                        name="fullName"
                        type="text"
                        content="Enter your full name"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

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

                <div className="relative">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <div className="relative mt-1">
                        <InputBox
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            content="Re-enter your password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <Button
                    loading={loading}
                    content="Create Account"
                    className="w-full transform rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />
            </div>
        </form>
    );
};

export default RegisterForm;