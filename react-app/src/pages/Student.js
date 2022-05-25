import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Student() {

    const [ studentData, setData ] = useState({
        students: [],
        loading: true
    });

    useEffect(()=>{
        axios.get('http://localhost:8000/api/students').then((response)=>{
            if( response.data.status === 200 ) { 
                setData({
                    students: response.data.students,
                    loading: false
                });
            }
        });
    }, []);

    const deleteStudent = (e, studentId) => {
        e.preventDefault();

        const deleteBtn = e.currentTarget;
        deleteBtn.innerText = 'Deleting';
        deleteBtn.disabled = true;

        axios.delete(`http://localhost:8000/api/delete-student/${studentId}`).then((response)=>{
            if( response.data.status === 200 ) {
                swal(response.data.message);
                deleteBtn.closest('tr').remove();
            } else {
                deleteBtn.disabled = false;
            }
        });

    }

    let students_data = '';

    if( studentData.loading === true ) {
        students_data = <tr><td colSpan="7" className='text-center'><h2>Loading...</h2></td></tr>;
    } else {
        students_data = studentData.students.map((student) => {
            return(
                <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.course}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>
                        <Link to={`/edit-student/${student.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteStudent(e, student.id)} className='btn btn-danger btn-sm'>Delete</button>
                    </td>
                </tr>
            )
        });
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>
                                Students
                                <Link to={'/add-student'} className='btn btn-primary btn-sm float-end'>Add Student</Link>
                            </h4>
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered table-striped'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Course</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students_data}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Student;