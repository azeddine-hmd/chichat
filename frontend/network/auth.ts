import { HttpError } from "./http-error";

export async function authUser(): Promise<HttpError | null> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + "/api/auth/pass", {
      method: "GET",
      credentials: "include",
    });
    if (res.ok)
      return null;
    else
      return await res.json();
  } catch (err) {
    return { message: "Network Failure" };
  }
}
