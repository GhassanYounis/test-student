import React, {useState, useEffect, useContext} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import StudentCard from "./StudentCard";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import PopUpCreateStudent from "./PopUpCreateStudent";
import { StudentContext } from "../DataProvider.js"

const StudentList = () => {
    const {data, fetchData, setData, hasMore} = useContext(StudentContext);

    const handleEditStudent = (updatedStudent) => {
        setData(prevData => {
            // Find the index of the edited student in the data array
            const index = prevData.findIndex(student => student.id === updatedStudent.id);

            // Update the student data at the specific index in the data array
            if (index !== -1) {
                const newData = [...prevData];
                newData[index] = updatedStudent;
                return newData;
            }

            return prevData;
        });
    };

    return (
        <>
            <PopUpCreateStudent setData={setData}/>
            <InfiniteScroll
                className="student-list"
                dataLength={data.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more items to load.</p>}
                scrollThreshold={0.99} // Adjust the scroll threshold value as needed
            >
                <TransitionGroup component={null}>
                    {data.map((item) => (
                        <CSSTransition key={item.id} timeout={{
                            appear: 1000,
                            enter: 1000,
                            exit: 1000,
                        }} classNames="fade">
                            <StudentCard student={item} onEditStudent={handleEditStudent}/>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </InfiniteScroll>
        </>

    );
}

export default StudentList;
