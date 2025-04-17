import { useEffect, useState } from "react";

export default function NotificationSystem({ message }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            const timeoutId = setTimeout(() => {
                setShow(false); // Hide notification after 10 seconds
            }, 10000);
            return () => clearTimeout(timeoutId);
        }
    }, [message]);

    if (!show) return null;

    return (
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 bg-blue-200 text-purple-600 p-4 rounded-lg">
            {message}
        </div>
    );
}
