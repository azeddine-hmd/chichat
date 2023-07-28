"use client";

import Label from "@/components/atoms/label";
import Dropdownmenu from "@/components/molecules/dropdown-menu";
import FormField from "@/components/molecules/form-field";
import PrimaryDotLoadingButton from "@/components/molecules/primary-dot-loading-button";
import { registerUser } from "@/network/register";
import { delay } from "@/utils/delay";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import * as Yup from "yup";

type RegisterFormType = {
  displayName: string;
  username: string;
  password: string;
  email: string;
  day: number;
  month: string;
  year: number;
};

export default function Login() {
  const router = useRouter();
  const [netError, setNetError] = useState<string | null>(null);
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

    password: Yup.string()
      .min(8, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),

    email: Yup.string().email("Invalid email").required("Required"),
  });

  function onSubmit(
    values: RegisterFormType,
    setLoadingState: Dispatch<SetStateAction<boolean>>
  ) {
    (async () => {
      setLoadingState(true);
      await delay(1_000);
      const { day, month, year, ...rest } = values;
      const monthIndex = months.indexOf(month);
      const dateOfBirth = { day: day, month: monthIndex, year: year };
      const dto = { ...rest, dateOfBirth };
      const success = await registerUser(dto);
      if (success)
        router.push("/auth/verify-email");
      else {
        setLoadingState(false);
        setNetError('something went wrong!');
        setTimeout(() => {
          setNetError(null);
        }, 2_000);
      }
    })();
  }

  return (
    <div className="flex h-fit w-[480px] flex-col items-center rounded-md bg-gray-600 p-8 shadow-lg">
      <h1 className="text-2xl font-semibold text-white/90">
        Create an account
      </h1>
      {netError &&
        <h3>
          {netError}
        </h3>
      }
      <div className="mt-5 h-full w-full">
        <Formik
          initialValues={{
            displayName: "",
            username: "",
            password: "",
            email: "",
            day: 1,
            month: "January",
            year: 2000,
          }}
          validationSchema={registrationSchema}
          onSubmit={() => {}}
          validateOnMount={true}
        >
          {({
            values,
            errors,
            handleChange,
            isSubmitting,
            handleSubmit,
            isValid,
          }) => (
            <form onSubmit={handleSubmit}>
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
              <div className="flex w-full flex-nowrap justify-start gap-2">
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
                disabled={isSubmitting}
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
  );
}
