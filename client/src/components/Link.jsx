import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Link = () => {
    const { shortId } = useParams(); 

    useEffect(() => {
        const getUrl = async () => {
            console.log(shortId);
            try {
                axios.get(`http://localhost:8000/url/get`, { params: { shortUrl: shortId } })
                    .then((res) => {
                        console.log(res.data);
                        const url = res.data.url.redirectUrl;
                        window.open(res.data.url.redirectUrl , '_blank');
                        window.location.href = '/dashboard';
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                
            }
            catch {
                console.log("error");
            }
        };
        if(shortId){
            getUrl();
        }
        
    }, [shortId]);

    return (
        <div>
            {/* You can add a loading indicator here if desired */}
            <h2>Redirecting...</h2>
        </div>
    );
};

export default Link;
