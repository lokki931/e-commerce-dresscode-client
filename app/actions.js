'use server';
import { cookies } from 'next/headers';
export async function setCookiesHeader(token) {
  if (!token) {
    return;
  }
  cookies().set({
    name: 'access-token',
    value: token,
    httpOnly: true,
    path: '/',
  });
}
export async function getCookiesHeader() {
  const cookieStore = cookies();
  const token = cookieStore.get('access-token');
  return token?.value;
}
export async function deleteCookiesHeader() {
  cookies().delete('access-token');
}
