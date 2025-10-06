
import React, { useState, useEffect } from 'react';

interface ToastProps {
    message: string;
}

const Toast: React.FC<ToastProps & { key: React.Key }> = ({ message }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!message) return null;

    return (
        <div
            className={`fixed bottom-5 right-5 bg-gray-800 text-white py-3 px-5 rounded-lg shadow-lg transition-all duration-300 z-50 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
            <p>{message}</p>
        </div>
    );
};

export default Toast;
