import type { Metadata } from "next";
import React from "react";
import CreateTicket from "./create-ticket";

export const metadata: Metadata = {
  title:
    "Create Ticket | Customer Portal",
};

export default function HomePage() {
  return (
    <>
      <CreateTicket />
    </>
  );
}
