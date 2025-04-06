import { useState } from "react";
import { useRouter } from "next/navigation";

const LABELS_MAP = {
  orderid: "Box ID",
  order_title: "Order Title",
  status: "Order Status",
  public_visibility: "Public Visibility",
  order_type: "Order Type",
  billing_schedule: "Billing Date",
  release_date: "Release Date",
  deadline: "Deadline",
  claimers: "Unique Number of Claimers",
  total_Cost: "Total Cost"
};

export default function OrderWindow({
  title = "Order Title",
  image = null,
  data = {
    orderid: "BX1234",
    order_title: "Sample Order",
    status: "Processing",
    public_visibility: "Public",
    order_type: "Express",
    billing_schedule: "2025-04-03",
    release_date: "2025-04-01",
    deadline: "2025-05-10",
    claimers: "7",
    total_Cost: "$340.00"
  },
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-2xl p-4 w-full" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-purple-300 rounded-lg"></div>
            <h2
              className="text-lg font-semibold text-purple-800 hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                router.push("/workspace/sheet/order");
              }}
            >
              {title}
            </h2>
          </div>
          <button
            className="text-purple-800 text-lg"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="bg-white shadow-inner rounded-2xl p-4 mt-2 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-800">
            {Object.entries(data).map(([key, value]) => (
              <div key={key}>
                <span className="font-medium text-purple-700">{LABELS_MAP[key] || key}:</span> {value}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
