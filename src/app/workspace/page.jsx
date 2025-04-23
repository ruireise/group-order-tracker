"use client";
import Image from "next/image";
import NewSheetModal from "./components/NewDividerOrderModal";
import { useRef, useState, useEffect } from "react";
import Sidebar from "./components/FileExplorerSidebar";
import OrderWindow from "./components/OrderWindow";
import { client } from "@/utils/supabase/server";

export default function Workspace() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dividerTitle, setDividerTitle] = useState("unnamed divider");
  const [currentDivider, setCurrentDivider] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [orders, setOrders] = useState([]);
  const [sidebarMode, setSidebarMode] = useState("divider"); // 'divider' or 'orders'
  const [isDividerSelected, setIsDividerSelected] = useState(false); // To track if a divider is selected
  
  // Caching the orders for each divider
  const [orderCache, setOrderCache] = useState({});

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const titleInputRef = useRef(null);

  useEffect(() => {
    const savedDividerName = "unnamed divider";
    setDividerTitle(savedDividerName);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (isEditingTitle && titleInputRef.current && !titleInputRef.current.contains(event.target)) {
        setDividerTitle(currentDivider?.divider_name || "unnamed divider");
        setIsEditingTitle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditingTitle, currentDivider]);

  const handleTitleChange = (e) => {
    setDividerTitle(e.target.value);
  };

  const handleSaveTitle = async () => {
    setIsEditingTitle(false);

    if (!currentDivider?.dividerid) {
      console.warn("No divider selected. Select one or create one.");
      return;
    }

    try {
      const { error } = await client
        .from("divider")
        .update({ divider_name: dividerTitle })
        .eq("dividerid", currentDivider.dividerid);

      if (error) {
        console.error("Divider title update failed: ", error);
      } else {
        console.log("Divider title successfully updated.");
        setCurrentDivider((prev) => ({ ...prev, divider_name: dividerTitle }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrdersForDivider = async (dividerid) => {
    // Check if orders for this divider are already cached
    if (orderCache[dividerid]) {
      console.log("Using cached orders for divider:", dividerid);
      setOrders(orderCache[dividerid]);
      return;
    }

    const { data, error } = await client
      .from("order_sheet")
      .select("*")
      .eq("dividerID", dividerid);

    if (error) {
      console.error("Error fetching orders: ", error);
    } else {
      const formattedOrders = data.map((order, index) => ({
        orderid: order.orderid,
        order_title: order.order_title,
        image: "/ruicry.jpg",
        data: {
          orderid: order.orderid,
          order_title: order.order_title,
          status: order.status,
          public_visibility: order.public_visibility ? "Public" : "Private",
          order_type: order.order_type,
          billing_schedule: order.billing_schedule,
          release_date: order.release_date,
          deadline: order.deadline,
          claimers: "0",
          total_Cost: "$0.00",
        },
      }));

      // Cache the orders for the divider
      setOrderCache((prev) => ({
        ...prev,
        [dividerid]: formattedOrders,
      }));

      // Update the state with the fetched orders
      setOrders(formattedOrders);
    }
  };

  return (
    <div className="w-full min-h-screen bg-purple-100 flex">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        mode={sidebarMode}
        orderSheets={orders}
        onSelect={(divider) => {
          setIsDividerSelected(true); // Set divider as selected
          setSidebarMode("orders");
          setDividerTitle(divider.divider_name);
          setCurrentDivider(divider);
          fetchOrdersForDivider(divider.dividerid); // Fetch orders for the selected divider
        }}
        onBack={() => {
          setIsDividerSelected(false); // Reset the divider selection when going back
          setSidebarMode("divider");
          // Don't reset the orders when going back
        }}
      />

      <div className="flex-1 h-full w-full mt-16 flex transition-all duration-300 z-30">
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
              <div ref={titleInputRef} className="flex gap-2 items-center">
                <input
                  value={dividerTitle}
                  onChange={handleTitleChange}
                  autoFocus
                  className="text-2xl font-bold text-purple-800 bg-transparent border-b-2 border-blue-400 focus:outline-none"
                />
                <button
                  onClick={handleSaveTitle}
                  className="bg-transparent hover:bg-blue-200 transition"
                >
                  💾
                </button>
              </div>
            ) : (
              <h1
                className="text-2xl font-bold text-purple-800 cursor-pointer"
                onClick={() => setIsEditingTitle(true)}
              >
                {dividerTitle}
              </h1>
            )}
          </div>

          {/* Content in the container */}
          <div className="container-content">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto h-[70vh] bg-purple-200 p-4 rounded-xl">
              {orders.map((order) => (
                <OrderWindow
                  key={order.orderid}
                  title={order.order_title}
                  image={order.image}
                  data={order.data}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
