"use client"

import React from "react";
import { useState } from "react";
import FileExplorerSidebar from "../../components/FileExplorerSidebar";

export default function Sheet(props) { 
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [rowCount, setRowCount] = useState(2); //Make rowCount default 10
    const [sheetTitle, setSheetTitle] = useState("Untitled");
    

    //Increases row count
    const addRow = () =>
        setRowCount(rowCount + 1);
    //Decreases row count if it is greater than 2
    const removeRow = () =>
        setRowCount(rowCount > 2 ? rowCount - 1 : rowCount);
    //Sidebar Open/Close
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen">
            <FileExplorerSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className={`p-14 mt-8 bg-purple-100 transition-all ${isSidebarOpen ? "ml-0" : "w-full"}`}>
                {/*Buttons on top */}
                <button className="text-md mb-3">🡰 Exit</button>
                <div className="flex md:flex-row justify-between items-center">
                    {/* Sheet Title */}
                    <h1 className="text-purple-900 text-center md:text-left text-2xl font-bold mb-6 w-full">
                        [Billing] <input type="text" className="text-center md:text-left bg-transparent md:w-[700px] whitespace-normal break-words" value={sheetTitle} onChange={(e) => setSheetTitle(e.target.value)}/>
                    </h1>
                </div>
        
                {/* Container for sheet */}
                <div className="overflow-auto min-h-[68vh] max-h-[70vh]">
                    <table className="table-auto border-separate w-max min-w-[1200px]">
                        {/*Header*/}
                        <thead className="sticky bg-purple-300 top-0 z-10">
                            <tr>
                                <th className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold w-[200px]">Claimer</th>
                                <th className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold w-[400px]">Claims</th>
                                <th className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold w-[30px]">Total Cost</th>
                                <th className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold w-[30px]">Paid?</th>
                                <th className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold w-[500px]">Notes</th>
                            </tr>
                        </thead>
  
                        {/* Table Body */}
                        <tbody>
                            {Array.from({ length: rowCount }).map((_, rowIdx) => (
                                <tr key={`row-${rowIdx}`}>
                                    {/*Claimer column*/}
                                    <td className="border-2 border-purple-700 px-2 py-2 min-h-[20px] whitespace-normal break-words">
                                        <input type="text" className="w-full outline-none bg-transparent text-purple-800"/>
                                    </td>
                                    {/*Claims column*/}
                                    <td className="border-2 border-purple-700 px-2 py-2">
                                        <textarea className="w-full outline-none bg-transparent text-purple-800" min="1" step="1"/>
                                    </td>
                                    {/*Total Cost column*/}
                                    <td className="border-2 border-purple-700 px-2 py-2">
                                        <input type="number" className="w-full outline-none bg-transparent text-purple-800" min="0.00" step="0.01" />
                                    </td>
                                    {/*Paid? column*/}
                                    <td className="border-2 border-purple-700 px-2 py-2">
                                        <select type="number" className="w-full outline-none bg-transparent text-purple-800" min="0.00" step="0.01">
                                            <option>No</option>
                                            <option>Yes</option>
                                        </select>
                                    </td>
                                    {/*Notes column*/}
                                    <td className="border-2 border-purple-700 px-2 py-2">
                                        <textarea className="w-full outline-none bg-transparent text-purple-800" min="0.00" step="0.01" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={`absolute bottom-6 left-3 flex flex-col space-y-2 transition-all duration-200 ${isSidebarOpen ? "left-[217px]" : "left-2"}`}>
                    {/*Row operations */}
                    <button onClick={removeRow} className="px-3 py-2 bg-blue-400 rounded-xl">▬</button>
                    <button onClick={addRow} className="px-3 py-2 bg-purple-500 rounded-xl">✚</button>
                </div>
            </div>
        </div>
    );
}
  
  
  