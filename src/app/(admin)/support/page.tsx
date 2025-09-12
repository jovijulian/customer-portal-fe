import type { Metadata } from "next";
import React from "react";
import Support from "./support";

export const metadata: Metadata = {
  title:
    "Support | Customer Portal",
};

export default function HomePage() {
  return (
    <>
      <Support />
    </>
  );
}
