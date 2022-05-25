import react from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

class EditStudent extends react.Component {

    state = {
        name: '',
        course: '',
        email: '',
        phone: '',
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async componentDidMount() {

        const studentId = this.props.params.id;
        const response = await axios(`http://localhost:8000/api/edit-student/${studentId}`);

        if( response.data.status === 200 ) {
            const student = response.data.student;
            if( student !== null ) {
                this.setState({
                    name: student.name,
                    course: student.course,
                    email: student.email,
                    phone: student.phone,
                });
            } else {
                window.location.href = '/';
            }
        }
    }

    updateStudent = async (e) => {
        e.preventDefault();

        document.getElementById('updateBtn').innerText = 'Updating';
        document.getElementById('updateBtn').disabled = true;
        const studentId = this.props.params.id;
        const response = await axios.patch(`http://localhost:8000/api/update-student/${studentId}`, this.state);
        if( response.data.status === 200 )  {
            console.log(response.data);
            document.getElementById('updateBtn').innerText = 'Update';
            document.getElementById('updateBtn').disabled = false;
        }
    }

    render() {
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
                                <form onSubmit={this.updateStudent}>
                                <div className='form-group mb-3'>
                                        <label>Name</label>
                                        <input type='text' name='name' onChange={this.handleInput} value={this.state.name} className='form-control' />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Course</label>
                                        <input type='text' name='course' onChange={this.handleInput} value={this.state.course} className='form-control' />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Email</label>
                                        <input type='text' name='email' onChange={this.handleInput} value={this.state.email} className='form-control' />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Phone</label>
                                        <input type='text' name='phone' onChange={this.handleInput} value={this.state.phone} className='form-control' />
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
}

export default (props) => <EditStudent {...props} params={useParams()} />;