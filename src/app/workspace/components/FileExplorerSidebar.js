"use client"

import { useState, useEffect } from "react";
import { client } from "@/utils/supabase/server";

export default function FileExplorerSidebar ({isSidebarOpen, toggleSidebar}) {
    const [dividerList, setDividersList] = useState([]);

    useEffect(() => {
        const fetchDividers = async () => {
            const { data, error } = await client.from("divider")
            .select("dividerid, divider_name");

            if (error) {
                crossOriginIsolated.error("Error fetching dividers: ", error);
            } else {
                setDividersList(data);
            }
        };

        fetchDividers();
    }, []);

    return (
        <div className="relative flex">
            <button 
                onClick={toggleSidebar}
                className= {`absolute top-24 transform bg-purple-300 text-white px-2 py-4 rounded-r-md shadow-md hover:bg-blue-600 transition-all duration-200 ${isSidebarOpen ? "left-52" : "left-0"} `}>
                {isSidebarOpen ? "◀" : "▶"}
            </button>

            {/*Sidebar*/}
            <aside className={`transition-all duration-200 bg-purple-300 text-purple-800 min-h-screen overflow-y-scroll overflow-x-hidden ${isSidebarOpen ? "w-52 min-w-52" : "w-0"}`}>
                {isSidebarOpen && (
                    <>
                        <h2 className="text-lg font-bold px-3 py-2 mt-16">File Explorer</h2>
                        <ul className="mt-4 space-y-1 text-sm">
                            {/*Display dividers*/}
                            {dividerList.length > 0 ? (
                                dividerList.map((divider) => (
                                    <li key={divider.dividerid}
                                        className="hover:bg-blue-200 px-3">
                                        <a href={`/divider/${divider.dividerid}`} className="block">
                                            {divider.divider_name}
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <span>Create a divider to get started!</span>
                            )}
                        </ul>
                    </>
                )}
            </aside>
        </div>
    )
}