"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import { client } from "@/utils/supabase/server";

export default function FileExplorerSidebar({
  isSidebarOpen,
  toggleSidebar,
  mode,
  orderSheets = [],
  onSelect,
  onBack
}) {
  const [dividerList, setDividerList] = useState([]);
  const router = useRouter();
  
  useEffect(() => {
    if (mode === "divider") {
      const fetchDividers = async () => {
        const { data, error } = await client.from("divider").select("dividerid, divider_name");
        if (error) {
          console.error("Error fetching dividers: ", error);
        } else {
          setDividerList(data);
        }
      };

      fetchDividers();
    }
  }, [mode]);

  return (
    <div className="relative flex">
      <button 
        onClick={toggleSidebar}
        className={`absolute top-24 transform bg-purple-300 text-white px-2 py-4 rounded-r-md shadow-md hover:bg-blue-600 transition-all duration-200 ${isSidebarOpen ? "left-52" : "left-0"}`}
      >
        {isSidebarOpen ? "◀" : "▶"}
      </button>

      {/* Sidebar */}
      <aside className={`transition-all duration-200 bg-purple-300 text-purple-800 min-h-screen overflow-y-scroll overflow-x-hidden ${isSidebarOpen ? "w-52 min-w-52" : "w-0"}`}>
        {isSidebarOpen && (
          <>
            <h2 className="text-lg font-bold px-3 py-2 mt-16">File Explorer</h2>

            {/* Show Back Button only in 'divider' mode and when in a specific divider */}
            {mode === "orders" && onBack && (
              <button
                className="text-blue-700 text-sm px-3 py-2 hover:underline"
                onClick={onBack}
              >
                🡸 Back
              </button>
            )}

            <ul className="mt-4 space-y-1 text-sm">
              {mode === "orders" ? (
                // Show order sheets
                orderSheets.length > 0 ? (
                  orderSheets.map((order) => (
                    <li
                      key={order.orderid}
                      className="hover:bg-blue-200 px-3 cursor-pointer"
                      onClick={() => router.push(`/workspace/sheet/order/${order.orderid}`)}
                    >
                      {order.order_title}
                    </li>
                  ))
                ) : (
                  <span className="px-3">No order sheets found.</span>
                )
              ) : (
                // Show dividers
                dividerList.length > 0 ? (
                  dividerList.map((divider) => (
                    <li
                      key={divider.dividerid}
                      className="hover:bg-blue-200 px-3 cursor-pointer"
                      onClick={() => onSelect(divider)}
                    >
                      {divider.divider_name}
                    </li>
                  ))
                ) : (
                  <span className="px-3">Create a divider to get started!</span>
                )
              )}
            </ul>
          </>
        )}
      </aside>
    </div>
  );
}
