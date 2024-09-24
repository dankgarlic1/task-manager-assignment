"use client";
import React from "react";
import SigninComponent from "../_components/SigninComponent";

const SigninPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Signin to your Account
        </h1>
        <SigninComponent />
      </div>
    </div>
  );
};

export default SigninPage;
