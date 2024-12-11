import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <button onClick={handleBack} className="text-blue-500 underline hover:text-blue-700">
            Back
        </button>
    );
};

export default BackButton;