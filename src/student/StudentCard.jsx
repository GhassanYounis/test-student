import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import ImageComponent from "./ImageComponent";


const StudentCard = ({student, onEditStudent}) => {
    const navigate = useNavigate();
    const handleStudentClick = async (student) => {
        try {
            // Make an AJAX request to fetch the student information from the server
            const response = await axios.get(`http://localhost:8080/api/students/student/${student.id}`);
            const studentInfo = response.data;
            // Pass the student information to the Student component
            navigate(`/students/student/${student.id}`, {state: {student: studentInfo}});

        } catch (error) {
            // Handle any errors that occur during the request
            console.log(error);
        }
    };
    // const getImage = (buffer) => {
    //
    // }
    const fullName = student.firstName + " " + student.lastName;
    return (
        <div className="std-card" onClick={() => handleStudentClick(student)}>
            {/*<img  alt="Profile Image" className="profile-image"/>*/}
            <ImageComponent studentId={student.id} className={"logo"}/>
            <div className="student-info">
                <span className="full-name" onClick={() => console.log("welcome")}>{fullName}</span>
                <span className="email">{student.email}</span>
            </div>
        </div>
    );
}

export default StudentCard;