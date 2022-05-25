import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Student extends React.Component {

    state = {
        students: [],
        loading: true
    }

    async componentDidMount() {
        const response = await axios.get('http://localhost:8000/api/students');
        if( response.data ) {
            this.setState({
                students: response.data.students,
                loading: false
            })
        }
    }

    async deleteStudent(e, studentId) {
        e.preventDefault();
        const deleteBtn = e.currentTarget;
        deleteBtn.innerText = 'Deleting';
        deleteBtn.disabled = true;

        console.log(deleteBtn);

        const response = await axios.delete(`http://localhost:8000/api/delete-student/${studentId}`);
        if( response.data.status === 200 ) {
            console.log(response.data); 
            deleteBtn.closest('tr').remove();
        } else {
            deleteBtn.disabled = false;
        }

    }

    render() {

        let students_data = '';

        if( this.state.loading === true ) {
            students_data = <tr><td colSpan="7"><h2>Loading...</h2></td></tr>;
        } else {
            students_data = this.state.students.map((student) => {
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
                            <button type="button" onClick={(e) => this.deleteStudent(e, student.id)} className='btn btn-danger btn-sm'>Delete</button>
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
}

export default Student;