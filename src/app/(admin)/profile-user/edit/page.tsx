import type { Metadata } from "next";
import React from "react";
import Edit from "./edit";

export const metadata: Metadata = {
  title:
    "Edit | Customer Portal",
};

export default function HomePage() {
  return (
    <>
      <Edit />
    </>
  );
}
