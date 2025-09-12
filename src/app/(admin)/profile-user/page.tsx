import type { Metadata } from "next";
import React from "react";
import Profile from "./profile";

export const metadata: Metadata = {
  title:
    "Profile | Customer Portal",
};

export default function HomePage() {
  return (
    <>
      <Profile />
    </>
  );
}
