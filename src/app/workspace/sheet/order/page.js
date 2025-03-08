"use client"

import React from "react";
import { useRef, useState } from "react";
import AddClaimModal from "../../components/AddClaimModal";
import FileExplorerSidebar from "../../components/FileExplorerSidebar";

export default function Sheet(props) { 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowCount, setRowCount] = useState(10); //Make rowCount default 10
    const [joinerCount, setJoinerCount] = useState(1); //Make joinerCount default to 1
    const [sheetTitle, setSheetTitle] = useState("Untitled");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [claim, setClaim] = useState([]);
    

    //Increases joiner countm affects claims qt + joiner columns
    const addCol = () =>
        setJoinerCount(joinerCount + 1);
    //Decreases joiner count affects claims qt + joiner columns, can't remove if 1 or less
    const removeCol = () =>
        setJoinerCount(joinerCount > 1 ? joinerCount - 1 : joinerCount);
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
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Sheet Title */}
                    <h1 className="text-center md:text-left text-2xl font-bold mb-6 w-full">
                        <input type="text" className="text-center md:text-left bg-transparent underline text-purple-900 md:w-[700px] whitespace-normal break-words" value={sheetTitle} onChange={(e) => setSheetTitle(e.target.value)}/>
                    </h1>

                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="px-3 py-2 w-28 md:w-36 h-12 mb-4 bg-blue-400 text-white rounded-lg text-sm md:text-lg">
                        Add a Claim
                    </button>
                </div>
                <AddClaimModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/>

                <div className="space-x-2 mb-3">
                {/*Column operations */}
                    <button onClick={removeCol} className="px-3 py-2 bg-blue-400 rounded-xl">▬</button>
                    <button onClick={addCol} className="px-3.5 py-2 bg-purple-500 rounded-xl">✚</button>
                </div>
        
                {/* Container for sheet */}
                <div className="overflow-auto min-h-[68vh] max-h-[70vh]">
                    <table className="table-auto border-separate w-max min-w-[1200px]">
                        {/*Header*/}
                        <thead className="sticky bg-purple-300 top-0 z-10">
                            <tr>
                                <th className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold w-[300px]">Item</th>
                                <th className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold w-[50px]">Quantity</th>
                                <th className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold w-[50px]">Leftover Qt.</th>
                                <th className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold w-[50px]">Cost per</th>
  
                                {/* Dynamically create columns for Claim Qt. and Joiner together */}
                                {Array.from({ length: joinerCount }).map((_, index) => (
                                    <React.Fragment key={`dynamic-header-${index}`}>
                                        <th className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold w-[50px]">Claim Qt.</th>
                                        <th className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold w-[150px]">Joiner</th>
                                    </React.Fragment>
                                ))}
                            </tr>
                        </thead>
  
                        {/* Table Body */}
                        <tbody>
                            {Array.from({ length: rowCount }).map((_, rowIdx) => (
                                <tr key={`row-${rowIdx}`}>
                                {/*Items Column*/}
                                    <td className="border-2 border-purple-700 px-2 py-2 min-h-[20px] whitespace-normal break-words">
                                        <input type="text" className="w-full outline-none bg-transparent text-purple-800"/>
                                    </td>
                                    {/*Quantity Column; React element input controls no decimal*/}
                                    <td className="border-2 border-purple-700 px-2 py-2">
                                        <input type="number" className="w-full outline-none bg-transparent text-purple-800" min="1" step="1"/>
                                    </td>
                                    {/*Leftover Quantity Column; React element input controls no decimal*/}
                                    <td className="border-2 border-purple-700 px-2 py-2">
                                        <input type="number" className="w-full outline-none bg-transparent text-purple-800" min="1" step="1"/>
                                    </td>
                                    {/*Cost per Column*/}
                                    <td className="border-2 border-purple-700 px-2 py-2">
                                        <input type="number" className="w-full outline-none bg-transparent text-purple-800" min="0.00" step="0.01" />
                                    </td>
  
                                    {/* Dynamically create inputs for Claim Qt. and Joiner columns togther*/}
                                    {Array.from({ length: joinerCount }).map((_, colIdx) => (
                                        <React.Fragment key={`dynamic-row-${rowIdx}-${colIdx}`}>
                                            {/*Claims Qt. Column; React element input controls no decimal*/}
                                            <td className="border-2 border-purple-700 px-2 py-2">
                                                <input type="number" className="w-full outline-none bg-transparent text-purple-800" min="1" step="1"/>
                                            </td>
                                            {/*Joiner Column*/}
                                            <td className="border-2 border-purple-700 px-2 py-2">
                                                <input type="text" className="w-full outline-none bg-transparent text-purple-800" />
                                            </td>
                                        </React.Fragment>
                                    ))}
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
  
  
  