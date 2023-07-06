import React from 'react';
import './NavigationBar.css'
import {FaList, FaTimes} from "react-icons/fa";
import SearchBox from "./SearchBox";
import AccountProfile from "../student/UserProfile";


export default function NavigationBar({isOpen, handleOpenClick}) {
    const handleClick = () => {
        handleOpenClick(!isOpen);
    }

    return (
        <header className="header-content">
            <button className="menu-button" onClick={handleClick}>
                {isOpen ? <FaList/> : <FaTimes/>}
            </button>
            <SearchBox />
            <AccountProfile />
        </header>
    );
}