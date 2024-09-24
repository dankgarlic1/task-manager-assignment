"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalApi from "../_services/GlobalApi";
import { useRouter } from "next/navigation";

const SigninComponent = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      const response = await GlobalApi.Signin(data); // Make sure this returns a response
      if (response.status == 200) {
        router.push("/signup"); // Navigate to the sign-in page on success
      } else {
        // Handle API errors (optional)
        console.error(response.data.message || "Signin failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("Signin error:", error);
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              as={Input}
              type="email"
              placeholder="Enter your email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              as={Input}
              type="password"
              placeholder="Enter your password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-600"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-purple-700 text-white text-2xl rounded-sm p-4 hover:bg-purple-800"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SigninComponent;
