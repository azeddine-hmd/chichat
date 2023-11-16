"use client";

import FormField from "@/components/molecules/form-field";
import PrimaryDotLoadingButton from "@/components/molecules/primary-dot-loading-button";
import { loginUser } from "@/network/login";
import { delay } from "@/utils/delay";
import { strongEmail } from "@/utils/yup-extra";
import { Formik } from "formik";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import * as Yup from "yup";

type LoginFormType = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const loginSchema = Yup.object().shape({
    password: Yup.string().min(8, "Too short").required("Required"),
    email: strongEmail().required("Required"),
  });

  function onSubmit(
    values: LoginFormType,
    setLoadingState: Dispatch<SetStateAction<boolean>>
  ) {
    setError(null);
    (async () => {
      setLoadingState(true);
      await delay(1_000);
      const error = await loginUser(values);
      if (!error) {
        router.push("/");
      } else {
        setLoadingState(false);
        setError(error.message);
        // setTimeout(() => {
        //   setError(null);
        // }, 10_000);
      }
    })();
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
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={loginSchema}
              onSubmit={() => { }}
              validateOnMount={true}
            >
              {({ values, errors, handleChange, handleSubmit, isValid }) => (
                <form onSubmit={handleSubmit} className="h-full w-full">
                  <div className="relative">
                    <FormField
                      layoutClassName="mb-4"
                      name="email"
                      type="email"
                      error={emailError ? emailError : errors.email}
                      onChange={handleChange}
                      value={values.email}
                    >
                      EMAIL
                    </FormField>
                  </div>
                  <div className="relative">
                    <FormField
                      name="password"
                      type="password"
                      error={errors.password}
                      onChange={handleChange}
                      value={values.password}
                    >
                      PASSWORD
                    </FormField>
                    <div
                      className="absolute top-[89%] cursor-pointer text-sm text-link hover:underline"
                      onClick={(e) => {
                        if (errors["email"] === "Required") {
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

                  <PrimaryDotLoadingButton
                    className="w-full animate-none focus:outline focus:outline-4 focus:outline-offset-2 focus:outline-cyan-500"
                    type="submit"
                    onButtonClicked={(_, setLoadingState) =>
                      isValid && onSubmit(values, setLoadingState)
                    }
                  >
                    Login
                  </PrimaryDotLoadingButton>
                  {
                  }
                </form>
              )}
            </Formik>
            <div className="mt-4 w-full text-sm text-muted">
              <h1 className="inline ">Need an account? </h1>
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
