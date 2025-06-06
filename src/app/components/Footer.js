export default function Footer() {
    return (
        <footer className="bg-purple-300 w-full p-6 h-auto md:h-52">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center max-w-2xl mx-auto gap-x-16">
            <div className="flex justify-center md:justify-start order-2 md:order-none">
                    <div className="w-16 h-16 bg-gray-400 rounded-md mt-6">
                        Logo
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-start space-y-1 order-1 md:order-none mt-6 md:ml-20">
                    <span>User Support</span>
                    <span>About</span>
                    <span>Terms of Services</span>
                    <span>FAQ</span>
                </div>
            </div>
        </footer>
    );
}
