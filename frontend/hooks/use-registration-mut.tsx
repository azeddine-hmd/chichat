import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/axios";
import { RegisterForm } from "@/app/(auth)/register/page";
import { HttpError } from "@/network";
import { MONTHS } from "@/lib/constants";
import { AxiosError } from "axios";

export type RegisterDto = {
  displayName: string;
  username: string;
  password: string;
  email: string;
  day: number;
  month: number;
  year: number;
};

export function useRegistrationMut({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: HttpError) => void;
}) {
  return useMutation({
    mutationFn: (values: RegisterForm) => {
      const { day, month, year, ...rest } = values;
      const monthIndex = MONTHS.indexOf(month);
      const dateOfBirth = {
        day: parseInt(day),
        month: monthIndex,
        year: parseInt(year),
      };
      const dto = { ...rest, dateOfBirth };
      return api.post("/api/auth/register", dto);
    },
    onSuccess: () => onSuccess(),
    onError: (err: AxiosError) => onError(err.response?.data as HttpError),
  });
}
