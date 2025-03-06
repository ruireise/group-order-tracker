"use client"

import React from "react";
import { useState } from "react";
import AddClaimModal from "../components/AddClaimModal";

export default function Sheet(props) {
    const joinerCount = 5; // Make joinercount default to 1 when working with react elements, cannot be less than 1 and can be added onto
    const rowCount = 20; //Make rowCount default 10 when working with react elements, cannot be less than 2 and can be deleted or added onto
  
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <div className="p-14 mt-8 bg-purple-100">

        {/*Buttons on top */}
        <button className="text-md mb-3">🡰 Exit</button>
        <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Sheet Title */}
            <h1 className="text-center md:text-left text-2xl font-bold mb-6 w-full">
                <input type="text" className="text-center md:text-left bg-transparent underline text-purple-900 md:w-[700px] whitespace-normal break-words" defaultValue={"Untitled Sheet"} />
            </h1>

            <button 
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-2 w-28 md:w-36 h-12 mb-4 bg-blue-400 text-white rounded-lg text-sm md:text-lg">
                Add a Claim
            </button>
        </div>
        <AddClaimModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/>

        
        {/* Container for sheet */}
        <div className="overflow-auto max-h-[73vh]">
            <table className="table-auto border-separate w-max min-w-[1200px]">
                {/*Header*/}
                <thead className="sticky bg-purple-300 top-0 z-10">
                    <tr>
                        <th className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold w-[300px]">Item</th>
                        <th className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold w-[50px]">Quantity</th>
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
        </div>
    );
}
  
  
  