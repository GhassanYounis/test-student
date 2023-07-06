import React, { useRef, useState} from 'react';
import {
    FaSearch,
    FaTimes,
} from "react-icons/fa";
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";

const suggestionsList = [
    {'id':1, 'firstName':'Ghassan', 'lastName': 'Younus'},
    {'id':2, 'firstName':'Mohammed', 'lastName': 'Maher'},
];




export default function SearchBox() {

    const [wordEntered, setWordEntered] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const searchInputRef = useRef(null);

    const navigate = useNavigate();

    const handleStudentClick = async (student) => {
        setWordEntered(student.firstName + " " + student.lastName)
        setSuggestions([]);

        try {
            // Make an AJAX request to fetch the student information from the server
            const response = await axios.get(`http://localhost:8080/api/students/student/${student.id}`);
            const studentInfo = response.data;

            // Pass the student information to the Student component
            navigate(`/students/student/${student.id}`, { state: { student: studentInfo } });

        } catch (error) {
            // Handle any errors that occur during the request
            console.log(error);
        }
    };

    function handleOnFocus(e) {
        setIsFocus(true);
    }

    const handleSearchData = (e) => {
        const searchWord = e.target.value;
        setWordEntered(searchWord);
        const newFilter = suggestionsList.filter((value) => {
            return value.firstName.toLowerCase().includes(searchWord.toLowerCase());
        })
        setSuggestions(newFilter);
    };



    return (
        <form className="search-container" >
            <div className="search-box">
                <input
                    id="in"
                    type="text"
                    autoComplete="off"
                    placeholder="Search..."
                    className="search-input"
                    value={wordEntered}
                    onChange={handleSearchData}
                    onClick={handleOnFocus}
                    ref={searchInputRef}
                />
                {isFocus&&searchInputRef.current.value.length > 0  && <FaTimes className="search-clear" onClick={() => {
                    setWordEntered("");
                    searchInputRef.current.focus();
                }}/>}
            </div>

            <div className="search-icon">
                <FaSearch/>
            </div>
            <div  onBlur={() => alert("welco")}>
                {wordEntered && suggestions.length > 0 && (
                    <ul className="suggestions-list" >
                        {suggestions.slice(0, 10).map((suggestion, index) => (
                            <li
                                onClick={() => handleStudentClick(suggestion)}
                                key={index}
                            >
                                {suggestion.firstName + " " + suggestion.lastName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </form>
    );
}


