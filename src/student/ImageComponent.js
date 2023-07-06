import React, {useState} from 'react';
import {useEffect} from "react";

const ImageComponent = ({studentId, className}) => {
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        return () => {fetch(`http://localhost:8080/api/students/images/2`)
            .then(response => {response.arrayBuffer()
                .then(buffer => {
                    const blob = new Blob([buffer], { type: 'image/jpeg' });
                    setImageData(URL.createObjectURL(blob));
                });
            })

            .catch(error => console.error(error));}
    }, []);

    return (
        <>
            {imageData && <img src={imageData} alt="Image" className={className} />}
        </>
    );
};

export default ImageComponent;