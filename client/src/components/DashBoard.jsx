import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const DashBoard = () => {
    const [urlInput, setUrlInput] = useState('');
    const [urls, setUrls] = useState([]);
    const userId = Cookies.get('user_Id');

    const handleCreateShortUrl = () => {
        if (!urlInput) return;

        axios.post('http://localhost:8000/url/create', { Url: urlInput, userId })
            .then((res) => {
                console.log(res.data);
                setUrlInput(''); // Clear input after creation
                getAllUrls(); // Refresh the list of URLs
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getAllUrls();
    }, []);

    const getAllUrls = () => {
        axios.get('http://localhost:8000/url/allUrls', { params: { userId } })
            .then((res) => {
                console.log(res.data);
                setUrls(res.data.urls); // Assuming the response has a 'urls' key
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleShortLinkClick = (shortId) => {
        window.location.href = `/link/${shortId}`; // Redirect to /link/:shortId
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">URL Shortener Dashboard</h1>
            <textarea
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter URL to shorten"
                className="w-full p-4 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
                rows="4"
            />
            <button
                onClick={handleCreateShortUrl}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring focus:ring-blue-400"
            >
                Create Short URL
            </button>
            <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-700">Your Shortened URLs:</h2>
            <ul className="list-disc list-inside space-y-4">
                {urls.map((url, index) => (
                    <li key={index} className="border-b pb-3">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => handleShortLinkClick(url.shortUrl)}
                                className="text-blue-600 hover:underline focus:outline-none text-lg font-medium"
                            >
                                {url.shortUrl}
                            </button>
                            <span className="text-gray-600">{url.redirectUrl}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DashBoard;
