import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";

import SpeedTest from "./speedtest";

export const metadata: Metadata = {
  title:
    "Speed Test | Customer Portal",
};

export default function HomePage() {
  return (
    <>
      <SpeedTest />
    </>
  );
}
