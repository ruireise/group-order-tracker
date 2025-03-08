"use client"
import Image from "next/image";
import NewSheetModal from "./components/NewSheetModal";
import { useRef, useState } from "react";


export default function Workspace() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="w-full min-h-screen bg-purple-100 flex">
            {/* Pushes the elements down instead of the entire screen */}
            <div className="h-full w-full mt-16 flex">
            {/* Sidebar */}
            <aside className="flex flex-col justify-between lg:w-52 w-52 min-w-[200px] bg-purple-300 p-4 shadow-md h-[92vh]">

                <ul className="space-y-6 text-gray-600">
                    <li className="hover:bg-blue-200 px-3 py-1">In Progress</li>
                    <li className="hover:bg-blue-200 px-3 py-1">Completed</li>
                    <li className="hover:bg-blue-200 px-3 py-1">Archived</li>
                </ul>
                
                <div className="flex mb-8 justify-center">
                    <button 
                        onClick={()=>setIsModalOpen(true)}
                        className="px-3 md:px-5 py-3 md:py-3 text-white bg-blue-400 rounded-lg hover:bg-blue-600 transition text-md md:text-lg font-semibold">
                        New Folder/Sheet
                    </button>
                <NewSheetModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6">
                {/* Search Bar */}
                <div className="flex items-center bg-purple-300 shadow-md p-3 rounded-lg max-w-3xl mx-auto mb-6">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-2 py-1 border rounded-full bg-purple-100 focus:outline-none"
                    />
                </div>

                {/* Document Board (Placeholder Boxes) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[75vh] bg-purple-200 p-4 rounded-xl">
                    {Array.from({ length: 17 }).map((_, i) => (
                        <div key={i} className="relative p-8 h-44 flex items-center justify-center">
                            <Image src="/folders.png" alt="folder" width={300} height={250} className="object-cover max-w-none"/>
                            <span className="bottom-3 left-12 absolute text-white">Folder {i + 1}</span>
                        </div>
                    ))}
                </div>
            </main>
            </div>
        </div>
    );
}
