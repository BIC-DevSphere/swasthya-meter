"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  const handleSocialLogin = async (provider) => {
    await signIn(provider, {
      callbackUrl: `${window.location.origin}/dashboard`,
    });
  };

  return (
    <div className="icon-section flex justify-center gap-5 text-2xl text-gray-600">
      <FaFacebook
        onClick={() => handleSocialLogin("facebook")}
        className="cursor-pointer text-blue-600 transition-transform hover:scale-125"
      />
      <FaGithub
        onClick={() => handleSocialLogin("github")}
        className="cursor-pointer text-gray-800 transition-transform hover:scale-125"
      />
      <FaGoogle
        onClick={() => handleSocialLogin("google")}
        className="cursor-pointer text-red-500 transition-transform hover:scale-125"
      />
    </div>
  );
};

export default SocialLogin;
