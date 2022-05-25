import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Student from './pages/Student';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Student />} />
      <Route path='/add-student' element={<AddStudent />} />
      <Route path='/edit-student/:id' element={<EditStudent />} />
    </Routes>
  );
}

export default App;
