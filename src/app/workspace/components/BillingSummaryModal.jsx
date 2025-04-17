import { useRef } from "react";

export default function BillingSummaryModal({ isOpen, onClose }) {
    const modalRef = useRef(null);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
                isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}
            style={{
                visibility: isOpen ? "visible" : "hidden",
            }}
        >
            {/* Background Overlay (Click to Close) */}
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

            {/* Modal Container */}
            <div
                ref={modalRef}
                className="relative w-11/12 h-11/12 max-w-6xl max-h-5xl bg-blue-200 rounded-lg shadow-2xl p-8"
            >
                {/* Header with Close Button */}
                <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-xl font-bold text-blue-900">Billing Summary</h2>
                    <button
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-800 text-lg font-bold"
                    >
                        ✖
                    </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 mt-6 overflow-auto h-[75%]">
                    <div className="container mx-auto">
                        <p className="text-gray-700">Billing details will be displayed here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
