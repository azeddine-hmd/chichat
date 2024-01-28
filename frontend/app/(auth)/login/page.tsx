"use client";

import FormField from "@/components/molecules/form-field";
import PrimaryLoadingButton from "@/components/molecules/primary-dot-loading-button";
import { strongEmail } from "@/lib/yup-extra";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config";
import { AxiosError } from "axios";
import { HttpError } from "@/types/http-error"; 
import { delay } from "@/lib/delay";

type LoginForm = {
  email: string;
  password: string;
};

const loginSchema = Yup.object().shape({
  password: Yup.string().min(8, "Too short").required("Required"),
  email: strongEmail().required("Required"),
});

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [onLoading, setOnLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: () => {},
    validateOnMount: true,
  });

  const loginMut = useMutation({
    mutationFn: async (form: LoginForm) => {
      await delay(500);
      return await api.post("/api/auth/login", { ...form });
    },
    onSuccess: () => window.location.assign("/channels/me"),
    onError: (error: AxiosError) => {
      setOnLoading(false);
      setError((error.response?.data as HttpError).message);
    },
  });

  function onSubmit(values: LoginForm) {
    setError(null);
    setOnLoading(true);
    loginMut.mutate(values);
  }

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mb-10 rounded-md bg-gray-600 p-8 shadow-2xl">
        <div className="flex w-[500px] flex-col items-center justify-center">
          <h1 className="w-fit text-2xl font-medium text-white">
            Welcome back!
          </h1>
          <h6 className="text-md mt-2 text-muted">
            We&apos;re excited to see you again!
          </h6>
          {error && (
            <h3 className="mt-2 text-lg font-semibold text-red-400">{error}</h3>
          )}
          <div className="mt-4 flex h-full w-full flex-col items-center justify-start">
            <form onSubmit={formik.handleSubmit} className="h-full w-full">
              <div className="relative">
                <FormField
                  layoutClassName="mb-4"
                  name="email"
                  type="email"
                  error={emailError ? emailError : formik.errors.email}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                >
                  EMAIL
                </FormField>
              </div>
              <div className="relative">
                <FormField
                  name="password"
                  type="password"
                  error={formik.errors.password}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                >
                  PASSWORD
                </FormField>
                <div
                  className="absolute top-[89%] cursor-pointer text-sm text-link hover:underline"
                  onClick={(e) => {
                    if (formik.errors["email"] === "Required") {
                      setEmailError("Email is Required!");
                      setTimeout(() => {
                        setEmailError(null);
                      }, 2_000);
                    }
                  }}
                >
                  Forgot password?
                </div>
              </div>

              <PrimaryLoadingButton
                className="mt-5 h-[44px] w-full animate-none focus:outline focus:outline-4 focus:outline-offset-2 focus:outline-cyan-500"
                type="submit"
                onLoading={onLoading}
                onClick={(e) => formik.isValid && onSubmit(formik.values)}
              >
                Login
              </PrimaryLoadingButton>
            </form>
            <div className="mt-4 w-full text-sm text-muted">
              <h1 className="inline text-muted-field">Need an account? </h1>
              <Link
                href="/register"
                className="inline cursor-pointer text-sm text-link hover:underline"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
