import React from "react";
import RegisterForm from "@/components/RegisterForm";
import SocialLogin from "@/components/SocialLogin";
import Link from "next/link";

const RegisterPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
                    <div className="grid md:grid-cols-2">
                        {/* Left Side - Hero Section */}
                        <div className="relative hidden md:block">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#5A9EC1] to-[#4A8DAB]"></div>
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-6">
                              <h1 className="text-4xl font-semibold tracking-[3.34px] text-white sm:text-5xl xl:text-6xl">
                                  Welcome to SwasthaMeter
                              </h1>
                              <p className="mt-4 max-w-lg text-lg text-blue-100 opacity-90">
                                  Your trusted companion in managing your health and wellness journey. Stay informed, stay healthy.
                              </p>
                              <div className="mt-6">
                                  <a href="#learn-more" className="text-xl font-semibold text-white bg-[#1D72A3] hover:bg-[#166C88] px-6 py-3 rounded-lg transition-colors duration-300">
                                      Learn More
                                  </a>
                              </div>
                          </div>
                      </div>


                        {/* Right Side - Registration Form */}
                        <div className="p-8 sm:p-12">
                            <div className="mx-auto max-w-md">
                                <div className="text-center md:text-left">
                                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                        Create Your Account
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Start your journey with us today
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <RegisterForm />

                                    <div className="mt-8">
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-200"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="bg-white px-4 text-gray-500">
                                                    Or continue with
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <SocialLogin />
                                        </div>
                                    </div>

                                    <p className="mt-8 text-center text-sm text-gray-600">
                                        Already have an account?{' '}
                                        <Link
                                            href="/signin"
                                            className="font-medium text-blue-600 hover:text-blue-500"
                                        >
                                            Sign in instead
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;