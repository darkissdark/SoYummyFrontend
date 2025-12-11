import * as yup from "yup";

export const signinValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type SignInFormValues = {
  email: string;
  password: string;
};
