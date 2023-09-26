"use client";

import Label from "@/components/atoms/label";
import Dropdownmenu from "@/components/molecules/dropdown-menu";
import FormField from "@/components/molecules/form-field";
import PrimaryDotLoadingButton from "@/components/molecules/primary-dot-loading-button";
import { registerUser } from "@/network/register";
import { delay } from "@/utils/delay";
import { strongEmail, strongPassword } from "@/utils/yup-extra";
import { Formik } from "formik";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import * as Yup from "yup";

type RegisterFormType = {
  displayName: string;
  username: string;
  password: string;
  email: string;
  day: string; // number
  month: string;
  year: string; // number
};

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = Array.from({ length: 31 }, (_, index) => String(index + 1));
  const years = Array.from({ length: 40 }, (_, index) => String(2020 - index));

  const registrationSchema = Yup.object().shape({
    displayName: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),

    username: Yup.string()
      .min(6, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),

    password: strongPassword().required("Required"),

    email: strongEmail().required("Required"),

    day: Yup.string().required("Required"),

    month: Yup.string().required("Required"),

    year: Yup.string().required("Required"),
  });

  function onSubmit(
    values: RegisterFormType,
    setLoadingState: Dispatch<SetStateAction<boolean>>
  ) {
    setError(null);
    (async () => {
      setLoadingState(true);
      await delay(1_000);
      const { day, month, year, ...rest } = values;
      const monthIndex = months.indexOf(month);
      console.log(`day: ${day} and year: ${year}`);
      const dateOfBirth = {
        day: parseInt(day),
        month: monthIndex,
        year: parseInt(month),
      };
      const dto = { ...rest, dateOfBirth };
      const error = await registerUser(dto);
      if (!error) {
        router.push("/auth/verify-email");
      } else {
        setLoadingState(false);
        setError(error.message);
        setTimeout(() => {
          setError(null);
        }, 10_000);
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
        <div className="flex h-fit w-[480px] flex-col items-center">
          <h1 className="text-2xl font-semibold text-white/90">
            Create an account
          </h1>
          {error && (
            <h3 className="mt-2 text-lg font-semibold text-red-400">{error}</h3>
          )}
          <div className="mt-5 h-full w-full">
            <Formik
              initialValues={{
                displayName: "",
                username: "",
                password: "",
                email: "",
                day: "",
                month: "",
                year: "",
              }}
              validationSchema={registrationSchema}
              onSubmit={() => {}}
              validateOnMount={true}
            >
              {({ values, errors, handleChange, handleSubmit, isValid }) => (
                <form onSubmit={handleSubmit} className="h-full w-full">
                  <FormField
                    name="displayName"
                    error={errors.displayName}
                    onChange={handleChange}
                    value={values.displayName}
                  >
                    DISPLAY NAME
                  </FormField>
                  <FormField
                    name="username"
                    error={errors.username}
                    onChange={handleChange}
                    value={values.username}
                  >
                    USERNAME
                  </FormField>
                  <FormField
                    type="password"
                    name="password"
                    error={errors.password}
                    onChange={handleChange}
                    value={values.password}
                  >
                    PASSWORD
                  </FormField>
                  <FormField
                    name="email"
                    error={errors.email}
                    onChange={handleChange}
                    value={values.email}
                  >
                    EMAIL
                  </FormField>
                  <Label>DATE OF BIRTH</Label>
                  <div className="mt-2 flex w-full flex-nowrap justify-start gap-2">
                    <Dropdownmenu
                      placeholder="Month"
                      items={months}
                      fieldName="month"
                      onChange={handleChange}
                      value={values.month}
                    />
                    <Dropdownmenu
                      placeholder="Day"
                      items={days}
                      fieldName="day"
                      onChange={handleChange}
                      value={values.day}
                    />
                    <Dropdownmenu
                      placeholder="Year"
                      items={years}
                      fieldName="year"
                      onChange={handleChange}
                      value={values.year}
                    />
                  </div>
                  <PrimaryDotLoadingButton
                    type="submit"
                    onButtonClicked={(_, setLoadingState) =>
                      isValid && onSubmit(values, setLoadingState)
                    }
                  >
                    Continue
                  </PrimaryDotLoadingButton>
                </form>
              )}
            </Formik>
            <div className="mt-4">
              <Link href="/login" className="text-sm text-link">
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
