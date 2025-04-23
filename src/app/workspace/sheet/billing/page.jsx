"use client";

import React, { useState } from "react";
import FileExplorerSidebar from "../../components/FileExplorerSidebar";
import BillingCard from "../../components/BillingCard";
import BillingSummaryModal from "../../components/BillingSummaryModal";

export default function Sheet() { 
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);  // ✅ Manage modal state here

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen">
            <div className={`absolute inset-y-0 left-0 transition-transform duration-300 z-50 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <FileExplorerSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </div>

            <div className="flex-grow p-14 mt-12 bg-purple-100 transition-all">
                {/* Top Header */}
                <div className="flex md:flex-row justify-between items-center">
                    <h1 className="text-purple-900 text-center md:text-left text-2xl font-bold mb-6 w-full">
                        Billing
                    </h1>
                </div>

                {/* BillingCard - Clicking it opens the modal */}
                <div className="overflow-auto min-h-[68vh] max-h-[70vh] max-w-[93vw]">
                    <BillingCard onOpen={() => setIsModalOpen(true)} />
                </div>
            </div>

            {/* BillingSummaryModal - Close it using state from Sheet.js */}
            <BillingSummaryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
