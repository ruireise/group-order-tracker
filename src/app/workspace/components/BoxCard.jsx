"use client";

import { useState, useEffect } from "react";
import { client } from "@/utils/supabase/server";
import AddItemModal from "./AddItemModal";

export default function BoxCard({ onAddItemOpen, boxId }) {
  const [boxDetails, setBoxDetails] = useState({
    boxName: "",
    image: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchBoxDetails = async () => {
      if (!boxId) return;

      const { data, error } = await client
        .from("box")
        .select("box_name, image")
        .eq("boxid", boxId)
        .single();

      if (error) {
        console.error("Error fetching box details:", error.message);
      } else {
        setBoxDetails({
          boxName: data.box_name || "Box Name",
          image: data.image || "",
        });
      }
    };

    fetchBoxDetails();
  }, [boxId]);

  useEffect(() => {
    const fetchItems = async () => {
      if (isExpanded && boxId) {
        const { data: itemRows, error: itemError } = await client
          .from("item_row")
          .select("*")
          .eq("boxId", boxId);

        if (itemError) {
          console.error("Error fetching item rows:", itemError.message);
          return;
        }

        const { data: claims, error: claimError } = await client
          .from("claims")
          .select("itemRowId, claim_quantity");

        if (claimError) {
          console.error("Error fetching claims:", claimError.message);
          return;
        }

        const itemsWithLeftovers = itemRows.map((item) => {
          const matchingClaims = claims.filter(
            (c) => c.itemRowId === item.itemRowId
          );
          const claimedQty = matchingClaims.reduce(
            (sum, c) => sum + c.claim_quantity,
            0
          );
          return {
            ...item,
            leftover_quantity: item.max_quantity - claimedQty,
          };
        });

        setItems(itemsWithLeftovers);
      }
    };

    fetchItems();
  }, [isExpanded, boxId]);

  return (
    <div className="w-[70vw] mx-auto bg-white rounded-2xl border-8 border-purple-300 my-6 overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48 bg-gray-100">
        {boxDetails.image ? (
          <img
            src={boxDetails.image}
            alt={boxDetails.boxName}
            className="object-cover object-top w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-purple-200 text-purple-600 transition">
            No Image
          </div>
        )}
        <button
          className="absolute bottom-2 right-2 bg-transparent py-1 px-2 rounded-full hover:bg-blue-300"
          onClick={(e) => {
            e.stopPropagation();
            alert("Magnifying glass clicked");
          }}
        >
          <span className="text-purple-700 text-xl">⛶</span>
        </button>
      </div>

      {/* Info Section */}
      <div className="bg-purple-100 p-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <span className="text-lg font-semibold text-purple-900">
            {boxDetails.boxName}
          </span>
          <span className="text-purple-700 text-xl">
            {isExpanded ? "▲" : "▼"}
          </span>
        </div>

        {isExpanded && (
          <div className="mt-3 space-y-4">
            <button
              onClick={() => setIsItemModalOpen(true)}
              className="mt-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-purple-700"
            >
              Add Item
            </button>
            <AddItemModal
              isOpen={isItemModalOpen}
              onClose={() => setIsItemModalOpen(false)}
              boxId={boxId}
            />

            <div className="bg-white rounded-lg p-4 border border-purple-300">
              {items.length === 0 ? (
                <p className="text-gray-500">No items yet.</p>
              ) : (
                <div className="mt-4">
                  <div className="flex font-semibold text-purple-900 border-b border-purple-300 pb-2">
                    <div className="w-1/3">Item Name</div>
                    <div className="w-1/3">Leftover Quantity</div>
                    <div className="w-1/3">Price Per Item</div>
                  </div>
                  {items.map((item) => (
                    <div
                      key={item.itemRowId}
                      className="flex py-2 border-b last:border-b-0 border-gray-200"
                    >
                      <div className="w-1/3">{item.item_name}</div>
                      <div className="w-1/3">{item.leftover_quantity}</div>
                      <div className="w-1/3">${item.price_per_item.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
