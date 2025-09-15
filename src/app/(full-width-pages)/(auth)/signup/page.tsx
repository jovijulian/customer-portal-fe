import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Singup | Customer Portal",

};

export default function SignUp() {
  return <SignUpForm />;
}
