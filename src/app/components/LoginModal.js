"use client";
import { useState, useEffect, useRef } from "react";

export default function LoginModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden"); // Prevent background interaction
    } else {
      document.body.classList.remove("overflow-hidden");
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
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Dimmed background
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose(); // Close when clicking outside
      }}
    >
      <div
        ref={modalRef}
        className={`relative sm:max-w-lg sm:w-full m-3 sm:mx-auto bg-blue-200 shadow-md border rounded-lg p-20 cursor-auto transform transition-all duration-500 ${
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
        <div className="text-center">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Login / Sign Up</h2>

          <div className="space-y-4">
            <div className="text-blue-800 mb-4 text-lg">
              Simplify your order management now!
            </div>

            {/* Google Sign-In Button */}
            <button className="w-full flex items-center justify-center p-3 bg-purple-400 text-white rounded-lg hover:bg-purple-600 focus:outline-none">
              <img
                src="google-icon.png" // Google Logo URL
                alt="Google Logo"
                className="w-6 h-6 mr-3"
              />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
