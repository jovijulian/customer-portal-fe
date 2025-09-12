import type { Metadata } from "next";
import React from "react";
import History from "./history";

export const metadata: Metadata = {
  title:
    "History | Customer Portal",
};

export default function HomePage() {
  return (
    <>
      <History />
    </>
  );
}
