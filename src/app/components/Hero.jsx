"use client"
import {useRouter} from "next/navigation";

export default function Hero() {
    const router = useRouter();

    return (
        <section className="flex items-center justify-center min-h-[95vh] px-6 md:px-20 bg-purple-100 mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 min-w-6xl max-w-full">
                <div className="bg-transparent flex items-center justify-center">
                    <img src="/hero_img.png" alt="Hero Image" className="w-[800px] h-auto max-w-full"/>
                </div>

                <div className="flex flex-col items-center md:items-start justify-center">
                    <span className="text-blue-800 text-4xl md:text-5xl text-center md:text-left">
                        Managing group orders with less effort.
                    </span>
    
                    <button className="mt-6 bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition m-6"
                            onClick={() => router.push("/workspace")}>
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </section>
    )
}