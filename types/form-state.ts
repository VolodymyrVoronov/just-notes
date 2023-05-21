export interface SignInFormState {
  login: string;
  password: string;
}

export interface SignUpFormState extends SignInFormState {
  confirmPassword: string;
}
