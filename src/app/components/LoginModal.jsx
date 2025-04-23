"use client";
import { useState, useEffect, useRef } from "react";

export default function LoginModal({ isOpen, onClose }) {
    const modalRef = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
            setIsSignup(false); // Reset to login on modal close
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            onClose();
            setIsTransitioning(false);
        }, 500);
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            style={{
                visibility: isOpen ? "visible" : "hidden",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            <div
                ref={modalRef}
                className={`relative sm:max-w-lg sm:w-full m-3 sm:mx-auto bg-blue-200 shadow-md border rounded-lg p-10 transform transition-all duration-500 ${
                    isOpen && !isTransitioning ? "translate-y-0" : "-translate-y-10"
                }`}
                style={{
                    position: "absolute",
                    zIndex: 50,
                    userSelect: "none",
                    paddingTop: "50px",
                    paddingBottom: "50px",
                }}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg font-bold"
                >
                    ✖
                </button>

                {/* Modal Content */}
                <div className="text-center space-y-6">
                    <h2 className="text-xl font-bold text-blue-900">
                        {isSignup ? "Sign Up" : "Login"}
                    </h2>

                    <div className="text-blue-800 text-lg">
                        Simplify your order management now!
                    </div>

                    <div className="space-y-4">
                        <input
                            required
                            className="w-full p-3 rounded-lg bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                            placeholder="Email"
                        />
                        <input
                            required
                            type="password"
                            className="w-full p-3 rounded-lg bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                            placeholder="Password"
                        />
                        {isSignup && (
                            <input
                                required
                                type="password"
                                className="w-full p-3 rounded-lg bg-transparent border-b-2 border-blue-400 text-blue-700 focus:outline-none focus:ring-0"
                                placeholder="Confirm Password"
                            />
                        )}
                        <button className="w-1/2 mx-auto block p-3 bg-blue-400 text-white rounded-lg hover:bg-purple-600 focus:outline-none">
                            {isSignup ? "Sign Up" : "Log In"}
                        </button>
                    </div>

                    <div className="space-y-2 pt-4">
                        <button className="w-full flex items-center justify-center p-3 bg-purple-400 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
                            <img
                                src="/google-icon.png"
                                alt="Google Logo"
                                className="w-6 h-6 mr-3"
                            />
                            <span>Sign in with Google</span>
                        </button>
                        <button className="w-full flex items-center justify-center p-3 bg-purple-400 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
                            <img
                                src="/discord_logo.jpeg"
                                alt="Discord Logo"
                                className="w-6 h-6 mr-3"
                            />
                            <span>Sign in with Discord</span>
                        </button>
                    </div>

                    <p className="text-blue-800 pt-4">
                        {isSignup ? "Already have an account?" : "New user?"}{" "}
                        <button
                            className="text-purple-800 underline hover:text-purple-400"
                            onClick={() => setIsSignup(!isSignup)}
                        >
                            {isSignup ? "Log in here!" : "Sign up here!"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
