export interface Register {
  name: string;
  email: string;
  password: string;
}

export interface Login extends Pick<Register, 'email' | 'password'> {}
