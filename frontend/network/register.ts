import { HttpError } from "./http-error";

interface RegisterDto {
  displayName: string;
  username: string;
  password: string;
  email: string;
  dateOfBirth: {
    month: number;
    day: number;
    year: number;
  };
}

export async function registerUser(
  dto: RegisterDto
): Promise<HttpError | null> {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_DOMAIN + "/api/auth/register",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(dto),
      }
    );
    if (!res.ok) 
      return await res.json();
    return null;
  } catch (err) {
    console.error("network failure");
    return { message: "Network Failure" };
  }
}
