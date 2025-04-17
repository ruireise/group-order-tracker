"use client";

export default function BillingCard({ onOpen }) {
    return (
        <div 
            className="min-h-10 max-w-[93vw] w-auto rounded-md bg-purple-400 cursor-pointer hover:bg-blue-600"
            onClick={onOpen}
        >
            <span className="flex items-center p-4 text-xl text-purple-100">
                Billing Period date to date
            </span>
        </div>
    );
}
