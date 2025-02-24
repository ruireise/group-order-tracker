

export default function Navbar() {

    return (
        <nav className="fixed top-0 left-0 w-full bg-purple-300 flex justify-between items-center h-16 z-50">
            <div className="flex items-center ml-4">
                <h1>
                    Group Order Tracker
                </h1>
            </div>
            <div className="flex justify-end space-x-5 mr-4">
            <button className="px-3 py-1.5 text-purple-800 hover:text-white border border-purple-800 rounded-lg hover:bg-purple-800 transition">
                Log In
            </button>
            <button className="px-3 py-1.5 text-white bg-blue-400 rounded-lg hover:bg-blue-600 transition">
                Sign Up
            </button>
            </div>
        </nav>
    )
}