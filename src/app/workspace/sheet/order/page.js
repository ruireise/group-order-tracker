"use client"

import React from "react";
import { useRef, useState } from "react";
import AddClaimModal from "../../components/AddClaimModal";
import FileExplorerSidebar from "../../components/FileExplorerSidebar";
import AddItemModal from "../../components/AddItemModal";

export default function Sheet(props) { 
    const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [sheetTitle, setSheetTitle] = useState("Untitled");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [claim, setClaim] = useState([]);
    
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    
    return (
        <div className="flex h-screen">
            <div className={`absolute inset-y-0 left-0 transition-transform duration-300 z-100 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <FileExplorerSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </div>
            <div className={`flex-grow p-14 mt-8 bg-purple-100 transition-all ${isSidebarOpen ? "ml-0" : "w-full"}`}>

                {/*Buttons on top */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Sheet Title */}
                    <h1 className="text-center md:text-left text-2xl font-bold mb-6 w-full">
                        <input type="text" className="text-center md:text-left bg-transparent underline text-purple-900 md:w-[700px] whitespace-normal break-words" value={sheetTitle} onChange={(e) => setSheetTitle(e.target.value)}/>
                    </h1>

                    <div className="flex gap-4 mb-4">
                    <button 
                        onClick={() => setIsClaimModalOpen(true)}
                        className="px-3 py-2 w-28 md:w-36 h-12 bg-blue-400 hover:bg-purple-700 text-white rounded-lg text-sm md:text-lg"
                    >
                        Add a Claim
                    </button>
                    
                    <button 
                        onClick={() => setIsItemModalOpen(true)}
                        className="px-3 py-2 w-28 md:w-36 h-12 bg-blue-400 hover:bg-purple-700 text-white rounded-lg text-sm md:text-lg"
                    >
                        Add New Item
                    </button>
                </div>

                </div>
                <AddItemModal isOpen={isItemModalOpen} onClose={()=>setIsItemModalOpen(false)}/>
                <AddClaimModal isOpen={isClaimModalOpen} onClose={()=>setIsClaimModalOpen(false)}/>

                {/* Container for sheet */}
                <div className="overflow-auto min-h-[68vh] max-h-[70vh]">
 
                </div>

            </div>
        </div>
    );
}
  
  
  