import { useRef, useState } from "react";

export default function AddClaimModal({ isOpen, onClose }) {
    const modalRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false); // State to track dragging

    const handleDragStart = (e) => {
        const modal = modalRef.current;
        if (!modal) return;

        // Set the initial drag position using the mouse position
        const offsetX = e.clientX - modal.getBoundingClientRect().left;
        const offsetY = e.clientY - modal.getBoundingClientRect().top;

        // Set dragging state to true
        setIsDragging(true);

        const onDragMove = (moveEvent) => {
        // Update the position of the modal as the mouse moves
            modal.style.left = `${moveEvent.clientX - offsetX}px`;
            modal.style.top = `${moveEvent.clientY - offsetY}px`;
        };

        const onDragEnd = () => {
        // Clean up the event listeners once drag ends
        document.removeEventListener("mousemove", onDragMove);
        document.removeEventListener("mouseup", onDragEnd);

        // Reset dragging state and restore z-index
        setIsDragging(false);
        };

        // Add event listeners to move the modal while dragging
        document.addEventListener("mousemove", onDragMove);
        document.addEventListener("mouseup", onDragEnd);
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
                isOpen ? "opacity-100 mt-7 pointer-events-auto" : "opacity-0 mt-0 pointer-events-none"
            }`}
            style={{
                visibility: isOpen ? 'visible' : 'hidden', // Ensure the modal is hidden when closed
                pointerEvents: isDragging ? 'auto' : 'none', // Disable interaction with background while dragging
            }}
        >
            <div
                ref={modalRef}
                className="relative sm:max-w-lg sm:w-full m-3 sm:mx-auto bg-blue-200 shadow-md border rounded-lg shadow-lg p-6"
                style={{
                    position: 'absolute',
                    pointerEvents: 'auto', // Always allow interaction with the modal itself
                    userSelect: isDragging ? 'none' : 'auto',
                }}
            >
                {/* Header with close button */}
                <div
                    className="flex justify-between items-center cursor-move"
                    onMouseDown={handleDragStart} // Attach drag event to the header
                >
                    <h2 className="text-xl font-bold text-blue-900">Add a Claim</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 text-lg font-bold"
                        style={{ pointerEvents: 'auto' }}
                    >
                    ✖
                    </button>
                </div>

                {/* Form Fields */}
                <div className="mt-4 space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-blue-700 mb-1 font-bold">Your Name/Username</label>
                        <input
                            id="username"
                            type="text"
                            className="w-full rounded-none p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <div className="flex space-x-2">
                        <div className="w-2/3">
                        <label htmlFor="itemName" className="block text-blue-700 mb-1 font-bold">Item Name</label>
                        <input
                            id="itemName"
                            type="text"
                            className="w-full rounded-none p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <div className="w-1/3">
                        <label htmlFor="quantity" className="block text-blue-700 mb-1 font-bold">Quantity</label>
                        <input
                            id="quantity"
                            type="number"
                            className="w-full rounded-none p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                            min="1"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="discordId" className="block text-blue-700 mb-1 font-bold">Discord ID</label>
                    <input
                        id="discordId"
                        type="text"
                        className="w-full rounded-none p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-blue-700 mb-1 font-bold">Email Contact</label>
                    <input
                        id="email"
                        type="email"
                        className="w-full rounded-none p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                    />
                </div>

                <button className="w-full rounded bg-purple-400 p-2 text-white hover:bg-purple-600 font-bold">Submit</button>
            </div>
        </div>
    </div>
    );
}
