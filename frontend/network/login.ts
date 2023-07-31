import { HttpError } from "./http-error";

export interface LoginDto {
  email: string;
  password: string;
}

export async function loginUser(
  dto: LoginDto,
): Promise<HttpError | null> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + "/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dto),
    });
    if (!res.ok)
      return await res.json();
    return null;
  } catch (err) {
    console.error("network failure");
    return { message: "Network Failure" };
  }
}
