import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin | Customer Portal",
};

export default function SignIn() {
  return <SignInForm />;
}
