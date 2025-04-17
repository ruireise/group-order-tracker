import { useRef, useState } from "react";

export default function AddItemModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [showSideWindow, setShowSideWindow] = useState(false);

  const handleDragStart = (e) => {
    const modal = modalRef.current;
    if (!modal) return;

    const offsetX = e.clientX - modal.getBoundingClientRect().left;
    const offsetY = e.clientY - modal.getBoundingClientRect().top;
    setIsDragging(true);

    const onDragMove = (moveEvent) => {
      modal.style.left = `${moveEvent.clientX - offsetX}px`;
      modal.style.top = `${moveEvent.clientY - offsetY}px`;
    };

    const onDragEnd = () => {
      document.removeEventListener("mousemove", onDragMove);
      document.removeEventListener("mouseup", onDragEnd);
      setIsDragging(false);
    };

    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragEnd);
  };

  const handleAddMore = () => {
    setAddedItems([...addedItems, { itemName, quantity, price }]);
    setItemName("");
    setQuantity(1);
    setPrice("");
    setShowSideWindow(true);
  };

  const handleSubmit = () => {
    setShowSideWindow(false);
    onClose();
  };

  const handleModalClose = () => {
    setAddedItems([]); 
    setShowSideWindow(false);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
        isOpen ? "opacity-100 mt-7 pointer-events-auto" : "opacity-0 mt-0 pointer-events-none"
      }`}
      style={{
        visibility: isOpen ? "visible" : "hidden",
        pointerEvents: isDragging ? "auto" : "none",
      }}
    >
      <div
        ref={modalRef}
        className="flex relative sm:max-w-lg sm:w-full m-3 sm:mx-auto bg-blue-200 border rounded-lg shadow-lg p-6"
        style={{
          position: "absolute",
          pointerEvents: "auto",
          userSelect: isDragging ? "none" : "auto",
        }}
      >
        <div className="flex flex-col w-full">
          <div
            className="flex justify-between items-center cursor-move"
            onMouseDown={handleDragStart}
          >
            <h2 className="text-xl font-bold text-blue-900">Add New Item</h2>
            <button
              onClick={handleModalClose}
              className="text-gray-500 hover:text-gray-800 text-lg font-bold"
              style={{ pointerEvents: "auto" }}
            >
              ✖
            </button>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-blue-700 mb-1 font-bold">Item Name</label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full rounded-md p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
              />
            </div>

            <div>
              <label className="block text-blue-700 mb-1 font-bold">Quantity</label>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full rounded-md p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
              />
            </div>

            <div>
              <label className="block text-blue-700 mb-1 font-bold">Price per Item</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-md p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleAddMore}
                className="flex-grow rounded-md bg-purple-400 p-2 text-white hover:bg-purple-600 font-bold"
              >
                Add More
              </button>
              <button
                onClick={handleSubmit}
                className="flex-grow rounded-md bg-blue-400 p-2 text-white hover:bg-blue-600 font-bold"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Side window to the right */}
        {showSideWindow && (
          <div className="ml-6 p-4 bg-purple-100 rounded-lg border border-purple-300 w-80 max-h-96 overflow-y-auto">
            <h3 className="text-md font-bold text-purple-700 mb-2">Added Items:</h3>
            <ul className="list-disc pl-5 space-y-1 text-purple-900">
              {addedItems.map((item, index) => (
                <li key={index}>
                  {item.itemName} | x{item.quantity} | ${item.price}
                  {/* Line divider */}
                  <div className="border-t-2 border-blue-200 mt-2"></div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
