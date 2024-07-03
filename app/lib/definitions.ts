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

export interface getMeResponse extends SignupResponse {
  _id: string;
}
