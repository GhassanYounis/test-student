import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";
import ImageComponent from "./ImageComponent";
import {StudentContext} from "../DataProvider";

const Student = () => {
    const {setData} = useContext(StudentContext);

    // const location = useLocation();
    // const { student } = location.state;
    const {id} = useParams();
    const [student, setStudent] = useState(null);
    const [image, setImage] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    // Fetch student data based on ID

    useEffect(() => {
        const fetchStudentData = async () => {
            await axios.get(`http://localhost:8080/api/students/student/${id}`)
                .then((response) => {
                    const studentInfo = response.data;
                    setStudent(studentInfo);
                    const blob = new Blob([], {type: 'image/jpeg'});
                    setImage(URL.createObjectURL(blob));
                }
            ).catch(error => {
                console.error('Error fetching student data:', error);
            });

        };

        // Fetch student data only if it hasn't been loaded yet or if the ID has changed
        if (!student || student.id !== id) {
            fetchStudentData();
        }
    }, [id]);


    if (!student) {
        return <div>Loading...</div>; // Replace with your own loading or error message
    }

    async function handleOnEdit(e) {
        e.preventDefault();
        if(isEdit) {
            update(e);
        }
        setIsEdit(!isEdit);
    }

    // Function to handle property changes
    const handlePropertyChange = (event) => {
        const { name, value } = event.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    async function update(event) {
        event.preventDefault();
        if (!student.id) return alert("Student Details Not Found");
        await axios.put("http://localhost:8080/api/students/update", student);
        setData(prevData => {
            return prevData.map(item => {
                if (item.id === student.id) {
                    return {...item, ...student};
                }
                return item;
            });
        });
        // alert("Student Details Updated");
    }

    return (

        <div className="profile-content">
            {/* Display student information */}
            <div className="profile-content_info">
                <p>First Name:
                    {isEdit ?
                        <input
                            type="text"
                            name="firstName"
                            value={student.firstName}
                            onChange={handlePropertyChange}
                            placeholder="first name..."
                            required pattern="[A-Za-z]+"
                        />
                        : student.firstName}</p>

                <p>Last Name:
                    {isEdit ?
                        <input
                            type="text"
                            name="lastName"
                            value={student.lastName}
                            onChange={handlePropertyChange}
                            placeholder="last name..."
                            required
                        />
                        :student.lastName}</p>

                <p>Email: {isEdit ?
                    <input
                        type="email"
                        name="email"
                        value={student.email}
                        onChange={handlePropertyChange}
                        placeholder="email..."
                        required
                    />
                    :student.email}</p>

                <button type="submit" onClick={handleOnEdit}>{isEdit ? "Save" : "Edit"}</button>
            </div>
            <div className="image-container">
                <label className="_label">Edit</label>
                <ImageComponent studentId={id} className={"profile-content_image"}/>
            </div>

            {/*Other JSX */}
        </div>
    );
}

export default Student;
