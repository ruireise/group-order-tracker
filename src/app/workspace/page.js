


export default function Workspace() {
    return (
        <div className="w-full min-h-[92vh] bg-purple-100 flex mt-16">
            {/* Sidebar */}
            <aside className="w-60 bg-purple-300 p-4 shadow-md h-[90vh]">
                <button className="px-5 py-3 text-white bg-blue-400 rounded-lg hover:bg-blue-600 transitiontext-xl font-semibold mb-6">New Folder</button>

                <ul className="space-y-6 text-gray-600">
                    <li>In Progress</li>
                    <li>Completed</li>
                    <li>Archived</li>
                </ul>
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
                <div className="grid grid-cols-4 gap-4 overflow-y-auto max-h-[75vh] bg-purple-200 p-4 rounded-xl">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-md h-44 flex items-center justify-center">
                            <span className="text-gray-400">Document {i + 1}</span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
