import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditStudent() {

    const navigate = useNavigate();
    const { studentId } = useParams();
    const [studentInput, setStudent] = useState([]);
    const [errorInput, setError] = useState([]);

    const handleInput = (e) => {
        setStudent({...studentInput, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/edit-student/${studentId}`).then((response) => {
            const data = response.data;
            if( data.status === 200 ) {
                setStudent(data.student);
            } else {
                swal({
                    title: 'Opps!',
                    text: data.message,
                    icon: 'warning',
                    button: 'Ok'
                });
                navigate('/');
            }
        });
    }, [navigate, studentId]);

    const updateStudent =  (e) => {
        e.preventDefault();

        document.getElementById('updateBtn').innerText = 'Updating';
        document.getElementById('updateBtn').disabled = true;

        const data = {
            name: studentInput.name,
            course: studentInput.course,
            email: studentInput.email,
            phone: studentInput.phone,
        }

        axios.patch(`http://localhost:8000/api/update-student/${studentId}`, data).then((response) => {

            if( response.data.status === 200 )  {
                swal({
                    title: 'Hooray!',
                    text: response.data.message,
                    icon: 'success',
                    button: 'Ok'
                });
                document.getElementById('updateBtn').innerText = 'Update';
                document.getElementById('updateBtn').disabled = false;
                setError([]);
            } else {
                setError(response.data.validate_error);
                document.getElementById('updateBtn').innerText = 'Update';
                document.getElementById('updateBtn').disabled = false;
            }
        });
    }

    return(
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>
                                Edit Student
                                <Link to={'/'} className='btn btn-primary btn-sm float-end'>BACK</Link>
                            </h4>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={updateStudent}>
                            <div className='form-group mb-3'>
                                    <label>Name</label>
                                    <input type='text' name='name' onChange={handleInput} value={studentInput.name} className='form-control' />
                                    <span className="text-danger">{errorInput.name}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Course</label>
                                    <input type='text' name='course' onChange={handleInput} value={studentInput.course} className='form-control' />
                                    <span className="text-danger">{errorInput.course}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Email</label>
                                    <input type='text' name='email' onChange={handleInput} value={studentInput.email} className='form-control' />
                                    <span className="text-danger">{errorInput.email}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Phone</label>
                                    <input type='text' name='phone' onChange={handleInput} value={studentInput.phone} className='form-control' />
                                    <span className="text-danger">{errorInput.phone}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <button type='submit' id="updateBtn" className="btn btn-primary">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditStudent;