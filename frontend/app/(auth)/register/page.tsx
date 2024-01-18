"use client";

import Label from "@/components/atoms/label";
import Dropdownmenu from "@/components/molecules/dropdown-menu";
import FormField from "@/components/molecules/form-field";
import PrimaryLoadingButton from "@/components/molecules/primary-dot-loading-button";
import { strongEmail, strongPassword } from "@/lib/yup-extra";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { MouseEvent, useState } from "react";
import * as Yup from "yup";
import AvatarSelection from "@/components/organisms/avatar-selection";
import { useRegistrationMut } from "@/hooks/use-registration-mut";
import { DAYS, MONTHS, YEARS } from "@/lib/constants";

export type RegisterForm = {
  displayName: string;
  username: string;
  password: string;
  email: string;
  day: string;
  month: string;
  year: string;
};

const registrationSchema = Yup.object().shape({
  displayName: Yup.string()
    .min(6, "Too Short!")
    .max(22, "Too Long!")
    .required("Required"),
  username: Yup.string()
    .min(6, "Too Short!")
    .max(12, "Too Long!")
    .required("Required"),
  password: strongPassword().required("Required"),
  email: strongEmail().required("Required"),
  day: Yup.string().required("Required"),
  month: Yup.string().required("Required"),
  year: Yup.string().required("Required"),
});

export default function Register() {
  const [error, setError] = useState<string | null>(null);
  const [onAvatarSelection, switchToAvatarSelection] = useState(false);

  const formik = useFormik({
    initialValues: {
      displayName: "",
      username: "",
      password: "",
      email: "",
      day: "",
      month: "",
      year: "",
    },
    validationSchema: registrationSchema,
    onSubmit: () => {},
    validateOnMount: true,
  });

  const registrationMut = useRegistrationMut({
    onSuccess: () => {
      switchToAvatarSelection(true);
    },
    onError: (error) => setError(error.message),
  });

  function onSubmit(e: MouseEvent<HTMLButtonElement>) {
    setError(null);
    registrationMut.mutate(formik.values);
  }

  return (
    <>
      {!onAvatarSelection ? (
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
                  <h3 className="mt-2 text-lg font-semibold text-red-400">
                    {error}
                  </h3>
                )}
                <div className="mt-5 h-full w-full">
                  <form
                    onSubmit={formik.handleSubmit}
                    className="h-full w-full"
                  >
                    <FormField
                      name="displayName"
                      error={formik.errors.displayName}
                      onChange={formik.handleChange}
                      value={formik.values.displayName}
                    >
                      DISPLAY NAME
                    </FormField>
                    <FormField
                      name="username"
                      error={formik.errors.username}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    >
                      USERNAME
                    </FormField>
                    <FormField
                      type="password"
                      name="password"
                      error={formik.errors.password}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    >
                      PASSWORD
                    </FormField>
                    <FormField
                      name="email"
                      error={formik.errors.email}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    >
                      EMAIL
                    </FormField>
                    <Label>DATE OF BIRTH</Label>
                    <div className="mt-2 flex w-full flex-nowrap justify-start gap-2">
                      <Dropdownmenu
                        placeholder="Month"
                        items={MONTHS}
                        fieldName="month"
                        onChange={formik.handleChange}
                        value={formik.values.month}
                        setFieldValue={formik.setFieldValue}
                      />
                      <Dropdownmenu
                        placeholder="Day"
                        items={DAYS}
                        fieldName="day"
                        onChange={formik.handleChange}
                        value={formik.values.day}
                        setFieldValue={formik.setFieldValue}
                      />
                      <Dropdownmenu
                        placeholder="Year"
                        items={YEARS}
                        fieldName="year"
                        onChange={formik.handleChange}
                        value={formik.values.year}
                        setFieldValue={formik.setFieldValue}
                      />
                    </div>
                    <PrimaryLoadingButton
                      className="mt-5 h-[44px] w-full"
                      type="submit"
                      onClick={onSubmit}
                      disabled={!formik.isValid}
                      onLoading={registrationMut.isPending}
                    >
                      Continue
                    </PrimaryLoadingButton>
                  </form>
                  <div className="mt-4">
                    <Link
                      href="/login"
                      className="cursor-pointer text-sm text-link hover:underline "
                    >
                      Already have an account?
                    </Link>
                  </div>
                </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <AvatarSelection
          email={formik.values.email}
          password={formik.values.password}
        />
      )}
    </>
  );
}
