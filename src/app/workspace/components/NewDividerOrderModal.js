"use client"

import { useState } from "react";
import { client } from "@/utils/supabase/server";
import { v4 as uuidv4 } from 'uuid';
import NotificationSystem from "@/app/components/NotificationSystem";

const dummyUserID = '3abe6cde-b3c8-4887-a699-7198ad94cbb5';

export default function NewSheetModal({ isOpen, onClose, currentFolder }) {
    const [formType, setFormType] = useState("");
    const [formLocation, setFormLocation] = useState(currentFolder);
    const [dividerName, setDividerName] = useState("untitled divider");
    const [message, setMessage] = useState("");
    const [orderTitle, setOrderTitle] = useState(""); 
    const [publicVisibility, setPublicVisibility] = useState(true); 
    const [orderType, setOrderType] = useState("");
    const [billingSchedule, setBillingSchedule] = useState(""); 
    const [releaseDate, setReleaseDate] = useState(""); 
    const [deadline, setDeadline] = useState("");

    // Reset form fields when modal closes
    const resetFormFields = () => {
        setFormType("");
        setDividerName("untitled divider");
        setOrderTitle("");
        setPublicVisibility(true);
        setOrderType("");
        setBillingSchedule("");
        setReleaseDate("");
        setDeadline("");
    };

    const handleDividerCreation = async () => {
        if (!dividerName.trim()) return;

        const { error } = await client.from("divider").insert({
            divider_name: dividerName,
            userid: dummyUserID,
        });

        if (error) {
            console.error("Unable to create divider", error);
        } else {
            setMessage(`Successfully created divider: ${dividerName}`);
            onClose(); 
            resetFormFields();
        }
    };

    const handleOrderCreation = async () => {
        if (!orderTitle.trim() || !orderType || !billingSchedule || !releaseDate || !deadline) {
            console.error("All fields are required.");
            return;
        }
    
        const { error } = await client.from("order_sheet").insert({
            order_title: orderTitle,
            userid: dummyUserID,
            status: "Open",
            public_visibility: publicVisibility,
            dividerID: 6,
            order_type: orderType, 
            billing_schedule: billingSchedule, 
            release_date: releaseDate,
            deadline: deadline,
        });
    
        if (error) {
            console.error("Unable to create order", error);
        } else {
            console.log(`Successfully created order: ${orderTitle}`);
            setMessage(`Successfully created order: ${orderTitle}`);
            onClose();
            resetFormFields();
        }
    };

    return (
        <>
            {/* Notification system */}
            <NotificationSystem message={message} /> 

            <div
                className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
                    isOpen ? "opacity-100 mt-7 pointer-events-auto" : "opacity-0 mt-0 pointer-events-none"
                }`}
                style={{
                    visibility: isOpen ? 'visible' : 'hidden',
                    pointerEvents: 'none',
                }}
            >
                <div
                    className="relative sm:max-w-lg sm:w-full m-3 sm:mx-auto bg-blue-200 border rounded-lg shadow-lg p-6"
                    style={{
                        position: 'absolute',
                        pointerEvents: 'auto',
                        userSelect: 'auto',
                    }}
                >
                    {/* Header with close button */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-blue-900">
                            {formType === "divider" ? "New Divider" : formType === "order" ? "New Order" : "Select an Action"}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-800 text-lg font-bold"
                            style={{ pointerEvents: 'auto' }}
                        >
                            ✖
                        </button>
                    </div>

                    {/* Form type selection */}
                    <div className="mt-4">
                        <label htmlFor="formType" className="block text-blue-700 font-bold mb-1">Type</label>
                        <select value={formType}
                            onChange={(e) => setFormType(e.target.value)}
                            className="w-full rounded-md p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0 mt-4"
                            required
                        >
                            <option value={""} disabled>
                                Select
                            </option>
                            <option value="order">New Order</option>
                            <option value="divider">New Divider</option>
                        </select>
                    </div>

                    {/* Order Form Fields */}
                    {formType === "order" && (
                        <div>
                            <div className="mt-4">
                                <label htmlFor="orderTitle" className="block text-blue-700 mb-1 font-bold">Title</label>
                                <input
                                    id="orderTitle"
                                    type="text"
                                    className="w-full rounded-md p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                                    value={orderTitle}
                                    onChange={(e) => setOrderTitle(e.target.value)}
                                />
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                            {/* Public Visibility */}
                            <div>
                                <label htmlFor="publicVisibility" className="block text-blue-700 mb-1 font-bold">Public Visibility</label>
                                <select
                                    id="publicVisibility"
                                    value={publicVisibility}
                                    onChange={(e) => setPublicVisibility(e.target.value === "true")}
                                    className="w-full rounded-md p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                                >
                                    <option value={true}>Public</option>
                                    <option value={false}>Private</option>
                                </select>
                            </div>

                            {/* Order Type */}
                            <div>
                                <label htmlFor="orderType" className="block text-blue-700 mb-1 font-bold">Order Type</label>
                                <select
                                    id="orderType"
                                    value={orderType}
                                    onChange={(e) => setOrderType(e.target.value)}
                                    className="w-full rounded-md p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                                >
                                    <option value="">Select Order Type</option>
                                    <option value="Split">Split</option>
                                    <option value="Group Order">Group Order</option>
                                </select>
                            </div>

                            {/* Billing Schedule */}
                            <div>
                                <label htmlFor="billingSchedule" className="block text-blue-700 mb-1 font-bold">Billing Schedule</label>
                                <select
                                    id="billingSchedule"
                                    value={billingSchedule}
                                    onChange={(e) => setBillingSchedule(e.target.value)}
                                    className="w-full rounded-md p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                                >
                                    <option value="">Select Billing Schedule</option>
                                    <option value="Up Front">Up Front</option>
                                    <option value="On-Release">On-Release</option>
                                    <option value="On-Hand">On-Hand</option>
                                </select>
                            </div>

                            {/* Release Date */}
                            <div>
                                <label htmlFor="releaseDate" className="block mb-1 text-blue-700 font-bold">Release Date</label>
                                <input
                                    id="releaseDate"
                                    type="date"
                                    className="w-full rounded-md p-1.5 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                                    value={releaseDate}
                                    onChange={(e) => setReleaseDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="deadline" className="block mb-1 text-blue-700 font-bold">Deadline</label>
                                <input
                                    id="deadline"
                                    type="datetime-local"
                                    className="w-full rounded-md p-1.5 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-center col-span-2">
                                <button
                                    onClick={handleOrderCreation}
                                    className="w-40 rounded-xl bg-purple-400 p-2 text-white hover:bg-blue-700 font-bold">
                                    Create New Order
                                </button>
                            </div>
                            

                            <div className="space-y-2 col-span-2">
                                <button className="w-full rounded-xl bg-purple-400 p-1 text-white hover:bg-blue-700 font-bold">Upload CSV/Excel</button>
                                <button className="w-full rounded-xl bg-purple-400 p-1 text-white hover:bg-blue-700 font-bold">Import from Google Sheets</button>
                            </div>
                        </div>
                        </div>
                    )}

                    {/* Divider Form */}
                    {formType === "divider" && (
                        <div className="mt-4 space-y-4">
                            <div>
                                <label htmlFor="dividerName" className="block text-blue-700 mb-1 font-bold">
                                    Divider Name
                                </label>
                                <input
                                    id="dividerName"
                                    type="text"
                                    className="w-full rounded-md p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                                    value={dividerName}
                                    onChange={(e) => setDividerName(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-center">
                                <button
                                    onClick={handleDividerCreation}
                                    className="w-40 rounded-xl bg-purple-400 p-2 text-white hover:bg-blue-700 font-bold">
                                    Create Divider
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
