export interface User {
  _id: string;
  email: string;
  name: string;
  token: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SigninRequest
  extends Pick<SignupRequest, 'email' | 'password'> {}

export interface SignupResponse {
  email: string;
  name: string;
  token: string;
}

export interface SigninResponse extends SignupResponse {}

export interface SignoutResponse {
  message: string;
}

export interface getMeResponse extends User {}

export interface Word {
  _id: string;
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
  owner: string;
  progress: number;
}

export interface GetAllWordsResponse {
  results: Omit<Word, 'owner' | 'progress'>[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface GetUsersWordsResponse {
  results: Word[];
  totalPages: number;
  page: number;
  perPage: number;
}
