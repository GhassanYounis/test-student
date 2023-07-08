import React, {createContext, useContext, useEffect} from 'react';
import {useState} from "react";
import {BrowserRouter as Router, Route, NavLink, Routes, Link} from 'react-router-dom';
import {FaEnvelope, FaHome, FaPeopleArrows, FaUser, FaUsers} from 'react-icons/fa';
import NavigationBar from "./NavigationBar/NavigationBar";
import './style.css'
import Home from "./home/Home";
import Student from "./student/Student";
import StudentList from "./student/StudentList";
import {DataProvider} from "./DataProvider";

function HomePage() {

    return <Home/>;
}

function AboutPage() {
    return <h1>About Page</h1>;
}

function PageNotFound() {
    return <h1>Page not found</h1>
}

function ContactPage() {
    return <h1>Contact Page</h1>;
}

// NavigationBar component
function SideBar({
                     isOpen,
                     selectedItem, setSelectedItem
                 }) {
    const handleItemClick = (itemId) => {
        setSelectedItem(itemId);
    };

    return (
        <nav className="sidebar">

            <ul className="list-style">
                <li>
                    <Link
                        to="/"
                        className={`nav-link ${selectedItem === 1 ? 'selected' : ''}`}
                        onClick={() => handleItemClick(1)}>
                        {isOpen ? <FaHome/> : "Home"}
                    </Link>
                </li>
                <li>
                    <Link
                        to="/students/all"
                        className={`nav-link ${selectedItem === 2 ? 'selected' : ''}`}
                        onClick={() => handleItemClick(2)}>
                        {isOpen ? <FaUsers/> : "Students"}
                    </Link>
                </li>
                <li>
                    <Link
                        to="/about"
                        className={`nav-link ${selectedItem === 3 ? 'selected' : ''}`}
                        onClick={() => handleItemClick(3)}>
                        {isOpen ? <FaUser/> : "About"}
                    </Link>
                </li>
                <li>
                    <Link
                        to="/Contact"
                        className={`nav-link ${selectedItem === 4 ? 'selected' : ''}`}
                        onClick={() => handleItemClick(4)}>
                        {isOpen ? <FaEnvelope/> : "Contact"}
                    </Link>
                </li>
            </ul>

        </nav>
    );
}

function useRoutes(routes) {

    return routes.map((route, index) => (<Route path={route.path} element={route.element} key={index}/>));
}

// App component
export default function App() {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(1);

    const routes = useRoutes([
        {path: '/', element: <HomePage/>},
        {path: '/about', element: <AboutPage/>},
        {path: '/students/student/:id', element: <Student/>},
        {path: '/students/all', element: <StudentList/>},
        {path: '*', element: <PageNotFound/>}
    ])

    return (
        <DataProvider>
            <Router>
                <div className={`container ${isOpen ? 'open' : ''}`}>

                    <div className="nav-bar">
                        <NavigationBar
                            isOpen={isOpen}
                            handleOpenClick={setIsOpen}
                        />
                    </div>
                    <SideBar

                        isOpen={isOpen}
                        handleOpenClick={setIsOpen}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                    />

                    <main className="main-content">
                        <Routes>
                            {routes}
                        </Routes>
                    </main>
                </div>
            </Router>
        </DataProvider>
    );
}
