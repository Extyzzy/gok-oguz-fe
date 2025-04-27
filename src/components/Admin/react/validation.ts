export interface InputValidationState {
  errors?: Record<string, string[]>;
}

export interface InputValidation {
  state?: InputValidationState;
}
