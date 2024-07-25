import cookie from 'js-cookie';

import { BACKEND_BASE_URL } from '@/app/lib/constants';
import type {
  SigninRequest,
  SigninResponse,
  SignoutResponse,
  SignupRequest,
  SignupResponse,
  getMeResponse,
} from '../lib/definitions';

const headers: HeadersInit = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const cookieOptions: Cookies.CookieAttributes = {
  expires: 7,
  secure: true,
  sameSite: 'Strict',
};

export async function signup(userData: SignupRequest) {
  const response = await fetch(`${BACKEND_BASE_URL}/users/signup`, {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    const data = (await response.json()) as SignupResponse;

    cookie.set('access_token', data.token, cookieOptions);

    return data;
  } else {
    if (response.status === 409) {
      return Promise.reject(
        new Error('Account with this email already exists.')
      );
    }

    if (response.status === 404) {
      return Promise.reject(
        new Error('The requested resource could not be found.')
      );
    }

    return Promise.reject(new Error('An unexpected error occurred.'));
  }
}

export async function signin(userData: SigninRequest) {
  const response = await fetch(`${BACKEND_BASE_URL}/users/signin`, {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    const data = (await response.json()) as SigninResponse;

    cookie.set('access_token', data.token, cookieOptions);

    return data;
  } else {
    const data = (await response.json()) as Error;

    if (
      (response.status === 400 &&
        data.message === "The password isn't valid.") ||
      response.status === 401
    ) {
      return Promise.reject(new Error('Invalid credentials'));
    }

    if (response.status === 404) {
      return Promise.reject(
        Error('The requested resource could not be found.')
      );
    }

    return Promise.reject(Error('An unexpected error occurred.'));
  }
}

export async function signout(token: string) {
  const response = await fetch(`${BACKEND_BASE_URL}/users/signout`, {
    headers: { Authorization: `Bearer ${token}` },
    method: 'POST',
  });

  cookie.remove('access_token');
  cookie.remove('user');

  if (response.ok) {
    const data = (await response.json()) as SignoutResponse;

    return data;
  } else {
    const data = (await response.json()) as Error;
    if (response.status === 401) {
      throw new Error(data.message);
    }

    throw new Error('An unexpected error occurred.');
  }
}

export async function getMe(token: string) {
  const response = await fetch(`${BACKEND_BASE_URL}/users/current`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    const data = (await response.json()) as getMeResponse;
    return data;
  } else {
    throw new Error('Session has expired. Please login again.');
  }
}
