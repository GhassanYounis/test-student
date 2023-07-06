import React, {useState} from 'react';
import {FaPlus} from "react-icons/fa";
import "./StudentStyle.css";



const PopUpCreateStudent = ({setData}) => {
    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const addNewStudent = async (student) => {
        await fetch('http://localhost:8080/api/students', {
            method: 'POST',
            body: JSON.stringify(
                student
            ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setData(prevData => [data, ...prevData])
                console.log(data);
            })
            // setData((posts) => [data, ...posts]);        })
            .catch((err) => {
                console.log(err);
            });
    };

    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleButtonClick = () => {
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
    };

    // Function to handle property changes
    const handlePropertyChange = (event) => {
        const { name, value } = event.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Perform form submission logic here

        // After successful submission, close the form
        setIsFormOpen(false);
    };

    return (
        <>
            <FaPlus className="add-button"
                    title="Add new student"
                    onClick={handleButtonClick}>
                Add New Student
            </FaPlus>

            {isFormOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <form onSubmit={handleFormSubmit}>
                            {/* Form fields and input components go here */}
                            {/* Example: */}
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" id="firstName" name="firstName" required
                                   onChange={handlePropertyChange}
                                   placeholder="First name..."
                            />

                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" required
                                   onChange={handlePropertyChange}
                                   placeholder="Last name..."
                            />

                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required
                                   onChange={handlePropertyChange}
                                   placeholder="Email..."
                            />

                            <button type="submit" onClick={() => addNewStudent(student)}>Submit</button>
                            <button type="button" onClick={handleFormClose}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </>
    );
}

export default PopUpCreateStudent;