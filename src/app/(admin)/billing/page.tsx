import type { Metadata } from "next";
import React from "react";
import Billing from "./billing";

export const metadata: Metadata = {
  title:
    "Billing | Customer Portal",
};

export default function HomePage() {
  return (
    <>
      <Billing />
    </>
  );
}
