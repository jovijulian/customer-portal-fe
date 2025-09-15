"use client";
import { Metadata } from "next";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DateRangePicker from "@/components/common/DateRangePicker";
import { endpointUrl, httpGet, httpPost } from "../../../helpers";
import moment from "moment";

export const metadata: Metadata = {
    title: "Dashboard | Customer Portal",
};

export default function Dashboard() {
    const searchParams = useSearchParams();
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const currentStartDate = searchParams.get("start_date") || moment().startOf('month').format("YYYY-MM-DD");
    const currentEndDate = searchParams.get("end_date") || moment().endOf('month').format("YYYY-MM-DD");

 
    const handleDatesChange = (dates: { startDate: string | null; endDate: string | null }) => {
        const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

        if (dates.startDate) {
            currentParams.set("start_date", dates.startDate);
        } else {
            currentParams.delete("start_date");
        }
        if (dates.endDate) {
            currentParams.set("end_date", dates.endDate);
        } else {
            currentParams.delete("end_date");
        }
        router.push(`?${currentParams.toString()}`);
    }
    return (
        <div className="p-4 md:p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Dashboard </h1>
                </div>

            </div>

            <div className="w-full">
                <DateRangePicker
                    onDatesChange={handleDatesChange}
                    initialStartDate={searchParams.get("start_date") || moment().startOf('month').format("YYYY-MM-DD")}
                    initialEndDate={searchParams.get("end_date") || moment().endOf('month').format("YYYY-MM-DD")}
                />
            </div>
        </div>
    );
}