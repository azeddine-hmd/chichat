export function parseSetCookie(cookies: string[]) {
  const cookieMap: { [key: string]: string } = {};
  cookies.forEach((cookie) => {
    const [key, value] = cookie.split(';')[0].split('=');
    cookieMap[key] = value;
  });
  return cookieMap;
}
