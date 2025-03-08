"use client"

import { useState } from "react";

export default function Sidebar ({isSidebarOpen, toggleSidebar}) {
    return (
        <div className="relative flex">
            <button 
                onClick={toggleSidebar}
                className= {`absolute top-24 transform bg-purple-300 text-white px-2 py-4 rounded-r-md shadow-md hover:bg-blue-600 transition-all duration-200 ${isSidebarOpen ? "left-52" : "left-0"} `}>
                {isSidebarOpen ? "<" : ">"}
            </button>

            {/*Sidebar*/}
            <aside className={`transition-all duration-200 bg-purple-300 text-purple-800 min-h-screen overflow-y-scroll overflow-x-hidden ${isSidebarOpen ? "w-52 min-w-52" : "w-0"}`}>
                {isSidebarOpen && (
                    <>
                        <h2 className="text-lg font-bold px-3 py-2 mt-16">File Explorer</h2>
                        <ul className="mt-4 space-y-1 text-sm">
                            <li className="hover:bg-blue-200 px-3">This will</li>
                            <li className="hover:bg-blue-200 px-3">display</li>
                            <li className="hover:bg-blue-200 px-3">Sheets</li>
                            <li className="hover:bg-blue-200 px-3">Files</li>
                            <li className="hover:bg-blue-200 px-3">Folders</li>
                        </ul>
                    </>
                )}
            </aside>
        </div>
    )
}