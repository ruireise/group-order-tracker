export default function Hero() {

    return (
        <section className="flex items-center justify-center min-h-[95vh] px-6 md:px-20 bg-purple-100 mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 w-full max-w-5xl">
                <div className="bg-purple-300 h-80 w-full max-w-80 mx-auto flex items-center justify-center">
                    <span className="text-gray-700">Image</span>
                </div>

                <div className="flex flex-col items-center md:items-start justify-center">
                    <span className="text-blue-800 text-4xl md:text-5xl text-center md:text-left">
                        Simplifying order management for the lazy ones.
                    </span>
    
                    <button className="mt-6 bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-800">
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </section>
    )
}