import { api } from "@/config";
import { HttpError } from "@/types/http-error";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useUploadAvatarMut({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: HttpError) => void;
}) {
  return useMutation({
    mutationFn: ({email, password, avatar}: {
      email: string;
      password: string;
      avatar: File;
    }) => {
      return api.postForm("/api/auth/upload/avatar", {
        email: email,
        password: password,
        avatar: avatar,
      });
    },
    onSuccess: (data) => onSuccess(),
    onError: (err: AxiosError) => onError(err.response?.data as HttpError),
  });
}
