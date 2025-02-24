

export default function Footer() {

    return (
        <footer className="bg-purple-300 flex justify-between items-center h-52">
            <div className="flex items-center ml-16">
                <span>
                    Logo
                </span>
            </div>
            <div className="flex flex-col justify-end space-y-2 mr-72">
                <span>
                    User Support
                </span>
                <span>
                    About
                </span>
                <span>
                    Terms of Services
                </span>
                <span>
                    FAQ
                </span>
            </div>
        </footer>
    )
}