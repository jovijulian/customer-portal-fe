import type { Metadata } from "next";
import React from "react";
import Tracking from "./tracking";

export const metadata: Metadata = {
  title:
    "Tracking | Customer Portal",
};

export default function HomePage() {
  return (
    <>
      <Tracking />
    </>
  );
}
