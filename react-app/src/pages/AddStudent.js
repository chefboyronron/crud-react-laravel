import React, {useState} from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert'; // V1

function AddStudent() {

    const navigate = useNavigate();

    const [studentInput, setStudent] = useState({
        name: '',
        course: '',
        email: '',
        phone: '',
        error_list: []
    });

    const handleInput = (e) => {
        setStudent({...studentInput, [e.target.name]: e.target.value});
    }

    const saveStudent = async (e) => {
        e.preventDefault();

        const data = {
            name:studentInput.name,
            course:studentInput.course,
            email:studentInput.email,
            phone:studentInput.phone
        }

        axios.post('http://localhost:8000/api/add-student', data).then((response) => {
            if( response.data.status === 200 )  {
                swal(response.data.message, {
                    buttons: "OK!",
                    icon: 'success',
                    title: 'Success'
                }).then((value) => {
                    switch (value) {
                        default:
                            navigate('/');
                            break;
                    }
                });
            } else {
                setStudent({...studentInput, error_list: response.data.validate_error});
            }
        });
    }

    
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>
                                Add Student
                                <Link to={'/'} className='btn btn-primary btn-sm float-end'>BACK</Link>
                            </h4>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={saveStudent}>
                                <div className='form-group mb-3'>
                                    <label>Name</label>
                                    <input type='text' name='name' onChange={handleInput} value={studentInput.name} className='form-control' />
                                    <span className="text-danger">{studentInput.error_list.name}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Course</label>
                                    <input type='text' name='course' onChange={handleInput} value={studentInput.course} className='form-control' />
                                    <span className="text-danger">{studentInput.error_list.course}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Email</label>
                                    <input type='text' name='email' onChange={handleInput} value={studentInput.email} className='form-control' />
                                    <span className="text-danger">{studentInput.error_list.email}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Phone</label>
                                    <input type='text' name='phone' onChange={handleInput} value={studentInput.phone} className='form-control' />
                                    <span className="text-danger">{studentInput.error_list.phone}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <button type='submit' className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default AddStudent;