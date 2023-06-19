import { twMerge } from "tailwind-merge";

export type FieldInputProps = React.ComponentProps<"input"> & {
  placeholder: string;
};

export default function FieldInput({ className, placeholder, type = "text", ...restProps }: FieldInputProps) {
  return (
    <input
      className={twMerge("h-full w-full cursor-pointer bg-transparent text-2xl text-muted-field focus:outline-none", className)}
      type={type}
      placeholder={placeholder}
      {...restProps}
    />
  );
}
