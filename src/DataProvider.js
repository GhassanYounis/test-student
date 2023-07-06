import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";

const StudentContext = createContext(undefined);

const DataProvider = ({children}) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        if (!isLoading) {
            setIsLoading(true);
            await axios.get(`http://localhost:8080/api/students/all?page=${page}`)
                .then(response => {
                    const {content, last} = response.data;
                    setData(prevData => [...prevData, ...content]);
                    setPage(prevPage => prevPage + 1);
                    setHasMore(!last);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setIsLoading(false);
                });
            console.log("welcome")
        }
    };
    useEffect(() => {
            fetchData();
        }
        , []);
    return (
        <StudentContext.Provider value={{data, fetchData, setData, hasMore}}>
            {children}
        </StudentContext.Provider>
    );
}

export {StudentContext, DataProvider};
