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

export async function registerUser(dto: RegisterDto): Promise<boolean> {
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
    return false;

  return true;
}
