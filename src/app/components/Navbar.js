"use client"
import {useState} from "react";
import {useRouter} from "next/navigation"
import LoginModal from "./LoginModal";

export default function Navbar() {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-purple-300 flex justify-between items-center h-16 z-50">
            <div className="flex items-center ml-4">
                <h1 className="cursor-pointer" 
                    onClick={()=> router.push("/")}>
                    Group Order Tracker
                </h1>
            </div>
            <div className="flex justify-end space-x-5 mr-4">
            <button 
                onClick={()=>setIsModalOpen(true)}
                className="px-3 py-1.5 text-white border-white rounded-lg bg-blue-400 hover:bg-purple-800 transition">
                Log In/Sign Up
            </button>
            <LoginModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/>
            </div>
        </nav>
    )
}