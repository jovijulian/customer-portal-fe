import type { Metadata } from "next";
import React from "react";
import ChangePassword from "./change-password";

export const metadata: Metadata = {
  title:
    "Change Password | Customer Portal",
};

export default function HomePage() {
  return (
    <>
      <ChangePassword />
    </>
  );
}
