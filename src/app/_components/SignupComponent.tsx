"use client";

import React from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalApi from "../_services/GlobalApi";
import { useRouter } from "next/navigation";

const SignupComponent = () => {
  const router = useRouter();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await GlobalApi.Signup(data); // Make sure this returns a response
      if (response.status == 201) {
        router.push("/signin"); // Navigate to the sign-in page on success
      } else {
        // Handle API errors (optional)
        console.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
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
            <label htmlFor="name">Full Name</label>
            <Field name="name" as={Input} placeholder="Enter your name" />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-600"
            />
          </div>

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
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupComponent;
