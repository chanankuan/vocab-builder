export interface User {
  _id: string;
  email: string;
  name: string;
  token: string;
}

export interface UserCookie extends Pick<User, 'name' | 'email'> {}

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

export interface GetWordsResponse {
  results: Word[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface createWordRequest
  extends Pick<Word, 'en' | 'ua' | 'category'> {
  isIrregular?: boolean | null;
}

export interface updateWordRequest extends createWordRequest {}

export interface DeleteWordResponse {
  message: string;
  id: string;
}

export interface UaTask extends Pick<Word, '_id' | 'en'> {
  task: 'ua';
}

export interface EngTask extends Pick<Word, '_id' | 'ua'> {
  task: 'en';
}

export interface GetTasksResponse {
  tasks: (UaTask | EngTask)[];
}

export interface WordsSearchParams {
  keyword: string;
  category: string;
  isIrregular: string;
  page: string;
}

export interface Answer extends Pick<Word, '_id' | 'ua' | 'en'> {
  task: string;
  isDone: boolean;
}

export interface SavedWord extends Pick<Word, '_id' | 'en' | 'ua'> {
  task: 'ua' | 'en';
}

export interface AnswerRequest extends Omit<Answer, 'isDone'> {}

export type NonNullableObject<T> = {
  [K in keyof T]: Exclude<T[K], null | undefined>;
};
