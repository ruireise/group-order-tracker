"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AddClaimModal from "../../../components/AddClaimModal";
import AddNewBoxModal from "../../../components/AddNewBoxModal";
import FileExplorerSidebar from "../../../components/FileExplorerSidebar";
import AddItemModal from "../../../components/AddItemModal";
import { client } from "@/utils/supabase/server";
import BoxCard from "../../../components/BoxCard"; // Assuming BoxCard is a component that displays each box

export default function OrderSheetDetails() {
  const { orderid } = useParams();
  const router = useRouter();
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isBoxModalOpen, setIsBoxModalOpen] = useState(false);
  const [sheetTitle, setSheetTitle] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [orderSheets, setOrderSheets] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [originalTitle, setOriginalTitle] = useState("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fetch all order sheets
  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await client.from("order_sheet").select("orderid, order_title");
      if (error) {
        console.error("Error fetching order sheets:", error);
      } else {
        setOrderSheets(data);

        // Find the current sheet based on orderid param
        const currentSheet = data.find(sheet => sheet.orderid === orderid);
        if (currentSheet) {
          setSheetTitle(currentSheet.order_title);
          setOriginalTitle(currentSheet.order_title); // Save the original title for comparison
        }
      }
    };

    fetchOrders();
  }, [orderid]);

  // Fetch boxes for the current order
  useEffect(() => {
    if (!orderid) return;

    const fetchBoxes = async () => {
      const { data, error } = await client
        .from("box")
        .select("boxid, box_name, image")
        .eq("orderid", orderid); // Fetch boxes related to the current order

      if (error) {
        console.error("Error fetching boxes:", error);
      } else {
        setBoxes(data); // Set the fetched boxes
      }
    };

    fetchBoxes();
  }, [orderid]);

  // Optional: Update Supabase when title is changed (onBlur)
  const handleTitleUpdate = async () => {
    if (sheetTitle === originalTitle) return; // Don't update if no change

    const { error } = await client
      .from("order_sheet")
      .update({ order_title: sheetTitle })
      .eq("orderid", orderid);

    if (error) {
      console.error("Failed to update title:", error);
    } else {
      setOriginalTitle(sheetTitle); // Sync the new saved value
    }
  };

  return (
    <div className="flex h-screen">
      <div className={`absolute inset-y-0 left-0 transition-transform duration-300 z-50 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <FileExplorerSidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          mode="orders"
          orderSheets={orderSheets}
          onSelect={() => {}} // not needed for "orders" mode but avoids error
        />
      </div>

      <div className={`flex-grow p-14 mt-8 bg-purple-100 transition-all z-30 ${isSidebarOpen ? "ml-0" : "w-full"}`}>
        {/* Back button */}
        <button
          onClick={() => router.push("/workspace")}
          className="text-blue-600 text-sm mt-6 hover:underline z-40"
        >
          🡸 Workspace
        </button>

        {/* Buttons on top */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Sheet Title */}
          <h1 className="text-center md:text-left text-2xl font-bold mb-6 w-full">
            <input
              type="text"
              className="text-center md:text-left bg-transparent underline text-purple-900 md:w-[700px] whitespace-normal break-words"
              value={sheetTitle}
              onChange={(e) => setSheetTitle(e.target.value)}
              onBlur={handleTitleUpdate} // Save title on blur
            />
          </h1>

          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setIsClaimModalOpen(true)}
              className="px-3 py-2 w-28 md:w-36 h-12 bg-blue-400 hover:bg-purple-700 text-white rounded-lg text-sm md:text-lg"
            >
              Add a Claim
            </button>

            <button
              onClick={() => setIsBoxModalOpen(true)}
              className="px-3 py-2 w-28 md:w-36 h-12 bg-blue-400 hover:bg-purple-700 text-white rounded-lg text-sm md:text-lg"
            >
              Add New Box
            </button>
          </div>
        </div>

        <AddClaimModal isOpen={isClaimModalOpen} onClose={() => setIsClaimModalOpen(false)} />
        <AddNewBoxModal isOpen={isBoxModalOpen} onClose={() => setIsBoxModalOpen(false)} />

        {/* Render Boxes */}
        <div className="overflow-auto min-h-[68vh] max-h-[70vh]">
          <div className="flex flex-col items-center">
            {boxes.map((box) => (
              <BoxCard
                key={box.boxid}
                boxId={box.boxid}
                boxName={box.box_name}
                image={box.image}
                onAddItemOpen={() => setIsItemModalOpen(true)} // Pass function to open "Add Item" modal
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
