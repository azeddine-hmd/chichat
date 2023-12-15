export async function uploadAvatar(image: string) {
  const formData = new FormData();
  formData.append('image', image);
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + "/api/upload/avatar", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (!res.ok)
      return await res.json();
    return null;
  } catch (err) {
    console.error("network failure");
    return { message: "Network Failure" };
  }
}
