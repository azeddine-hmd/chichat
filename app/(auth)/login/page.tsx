import FieldInput from "@/components/atoms/field-input";
import Label from "@/components/atoms/label";
import PrimaryButton from "@/components/molecules/primary-button";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex w-[500px] flex-col items-center justify-center rounded-md bg-gray-600 p-8 shadow-lg">
      <h1 className="text-2xl font-medium text-white">Welcome back!</h1>
      <h6 className="text-md mt-2 text-muted">
        We&apos;re excited to see you again!
      </h6>
      <div className="mt-4 flex w-full flex-col items-center justify-start">
        <Label>
          EMAIL <span className="text-red-500">*</span>
        </Label>
        <FieldInput
          className="text-md mb-5 h-10 w-full bg-gray-850 p-2 text-foreground"
          placeholder=""
        ></FieldInput>
        <Label>
          PASSWORD <span className="text-red-500">*</span>
        </Label>
        <FieldInput
          className="text-md mb-5 h-10 w-full bg-gray-850 p-2 text-foreground"
          placeholder=""
          type="password"
        ></FieldInput>
        <PrimaryButton className="text-md mt-5 flex h-[44px] items-center justify-center bg-primary font-medium text-white transition-all duration-300 ease-in-out hover:bg-primary/80 hover:transition-all hover:duration-300 active:bg-primary/60 ">
          Log In
        </PrimaryButton>
        <div className="mt-4 w-full text-sm text-muted">
          <h1 className="inline ">Need an account? </h1>
          <Link href="/register" className="inline text-sm text-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
