"use client";
import Image from "next/image";
import NewSheetModal from "./components/NewDividerOrderModal";
import { useRef, useState, useEffect } from "react";
import Sidebar from "./components/FileExplorerSidebar";
import OrderWindow from "./components/OrderWindow";

export default function Workspace() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dividerTitle, setDividerTitle] = useState("unnamed divider");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const savedDividerName = "unnamed divider";
    setDividerTitle(savedDividerName);
  }, []);

  const handleTitleChange = (e) => {
    setDividerTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    console.log("Saving divider title to DB:", dividerTitle);
  };

  const mockOrders = [
    {
      orderid: 1,
      order_title: "Shikishi box 8AB",
      image: "/thumbnail1.png",
      data: {
        orderid: "OD-001",
        order_title: "Order #1234",
        status: "Open",
        public_visibility: "Public",
        order_type: "Split",
        billing_schedule: "On-Release",
        release_date: "2025-04-14",
        deadline: "2025-04-10 10:00:00 PM EST",
        claimers: "4",
        total_Cost: "$230"
      }
    },
    {
      orderid: 2,
      order_title: "Order #5678",
      image: "/thumbnail2.png",
      data: {
        orderid: "BX-002",
        order_title: "Order #5678",
        status: "Shipped",
        public_visibility: "Private",
        order_type: "Standard",
        billing_schedule: "2025-04-20",
        release_date: "2025-04-15",
        deadline: "2025-04-25",
        claimers: "2",
        total_Cost: "$650"
      }
    }
  ];

  return (
    <div className="w-full min-h-screen bg-purple-100 flex">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 h-full w-full mt-16 flex transition-all duration-300">
        <main className="flex-1 p-6">
          <div className="flex justify-center mb-6 relative">
            <div className="flex items-center bg-purple-300 shadow-md p-3 rounded-full w-full max-w-3xl">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 border-none bg-purple-100 rounded-full focus:outline-none"
              />
              <span className="ml-2 text-gray-700 text-xl">🔍︎</span>
            </div>

            <div className="absolute right-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 md:px-5 py-3 text-white bg-blue-400 rounded-lg hover:bg-blue-600 transition text-md md:text-lg font-semibold whitespace-nowrap"
              >
                New Divider/Order
              </button>
            </div>
            <NewSheetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </div>

          <div className="flex justify-between items-center mb-4">
            {isEditingTitle ? (
              <input
                value={dividerTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                autoFocus
                className="text-2xl font-bold text-purple-800 bg-transparent border-b-2 border-blue-400 focus:outline-none"
              />
            ) : (
              <h1
                className="text-2xl font-bold text-purple-800 cursor-pointer"
                onClick={() => setIsEditingTitle(true)}
              >
                {dividerTitle}
              </h1>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto h-[70vh] bg-purple-200 p-4 rounded-xl">
            {mockOrders.map((order) => (
              <OrderWindow
                key={order.orderid}
                title={order.order_title}
                image={order.image}
                data={order.data}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
