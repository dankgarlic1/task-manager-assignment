"use client";
import React from "react";
import SignupComponent from "../_components/SignupComponent";
type Props = {};

const Signup = (props: Props) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
        <SignupComponent />
      </div>
    </div>
  );
};

export default Signup;
