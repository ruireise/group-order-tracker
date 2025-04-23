"use client";
import { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { client } from "@/utils/supabase/server";

export default function AddNewBoxModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [boxName, setBoxName] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const params = useParams();
  const orderId = params?.orderid;

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

  const handleModalClose = () => {
    setBoxName("");
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose();
  };

  const handleClearFile = () => {
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!boxName || !orderId) return;

    const { data, error } = await client.from("box").insert([
      {
        box_name: boxName,
        orderid: orderId,
        image: null,
      },
    ]);

    if (error) {
      console.error("Insert error:", error.message);
    } else {
      console.log("Inserted box:", data);
    }

    handleModalClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setBoxName("");
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [isOpen]);

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
            <h2 className="text-xl font-bold text-blue-900">Add New Box</h2>
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
              <label className="block text-blue-700 mb-1 font-bold">Box Name</label>
              <input
                type="text"
                value={boxName}
                onChange={(e) => setBoxName(e.target.value)}
                className="w-full rounded-md p-2 bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                required
              />
            </div>

            <div>
              <label className="block text-blue-700 mb-1 font-bold">Box Image</label>
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full p-2 rounded-md bg-transparent text-blue-700 border-b-2 border-blue-400"
                />
                {imageFile && (
                  <button
                    onClick={handleClearFile}
                    className="text-sm bg-transparent text-purple-700 px-2 py-1 rounded cursor-pointer"
                  >
                    ✖
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="rounded-md bg-purple-400 px-6 py-2 text-white hover:bg-blue-600 font-bold"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
