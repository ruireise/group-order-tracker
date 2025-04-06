import { useRef, useState } from "react";

export default function NewSheetModal({ isOpen, onClose, currentFolder}) {
    const modalRef = useRef(null);
    const [formType, setFormType] = useState("");
    const [formLocation, setFormLocation] = useState(currentFolder);
    const [divider, setDividers] = useState([]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
                isOpen ? "opacity-100 mt-7 pointer-events-auto" : "opacity-0 mt-0 pointer-events-none"
            }`}
            style={{
                visibility: isOpen ? 'visible' : 'hidden', // Ensure the modal is hidden when closed
                pointerEvents:'none', // Disable interaction with background while dragging
            }}
        >
            <div
                ref={modalRef}
                className="relative sm:max-w-lg sm:w-full m-3 sm:mx-auto bg-blue-200 border rounded-lg shadow-lg p-6"
                style={{
                    position: 'absolute',
                    pointerEvents: 'auto', // Always allow interaction with the modal itself
                    userSelect: 'auto',
                }}
            >
                {/* Header with close button */}
                <div
                    className="flex justify-between items-center"
                >
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

                {/*Form type selection */}
                <div className="mt-4">
                    <label htmlFor="formType" className="block text-blue-700 font-bold mb-1">Type</label>
                    <select value={formType}
                        onChange={(e)=> setFormType(e.target.value)}
                        className="w-full rounded-none bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0 mt-4"
                        required
                    >
                        <option value={""} disabled>
                            Select
                        </option>
                        <option value="order">New Order</option>
                        <option value="divider">New Divider</option>
                    </select>
                </div>

                {/* Form Fields */}
                <div className="mt-4 space-y-4">
                    {formType === "order" && (
                        <>
                            <div>
                                <label htmlFor="sheetTitle" className="block text-blue-700 mb-1 font-bold">Title</label>
                                <input
                                    id="orderTitle"
                                    type="text"
                                    className="w-full rounded-none p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                                />
                            </div>

                            <div>
                                <label htmlFor="maxClaimers" className="block text-blue-700 mb-1 font-bold">Max Claimers</label>
                                <span className="text-xs">This can be changed later.</span>
                                <input
                                    id="maxClaimers"
                                    type="text"
                                    className="w-full rounded-none p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                                />
                            </div>

                            <div className="flex justify-center">
                                <button className="w-40 rounded bg-purple-400 p-2 text-white hover:bg-blue-700 font-bold">Create New Order</button>
                            </div>

                            <div className=" space-y-2">
                                <button className="w-full rounded bg-purple-400 p-1 text-white hover:bg-blue-700 font-bold">Upload CSV/Excel</button>
                                <button className="w-full rounded bg-purple-400 p-1 text-white hover:bg-blue-700 font-bold">Import from Google Sheets</button>
                            </div>
                        </>
                    )}
                    {formType === "divider" && (
                        <>
                            <div>
                                <label htmlFor="dividerName" className="block text-blue-700 mb-1 font-bold">
                                    Folder Name
                                </label>
                                <input
                                    id="dividerName"
                                    type="text"
                                    className="w-full rounded-none p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                                />
                            </div>

                            <div className="flex justify-center">
                                <button className="w-40 rounded bg-purple-400 p-2 text-white hover:bg-blue-700 font-bold">
                                    Create Divider
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
