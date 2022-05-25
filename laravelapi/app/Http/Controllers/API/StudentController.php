<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Student;

class StudentController extends Controller
{

    public function index() {
        $student = new Student;
        return response()->json([
            'status' => 200,
            'students' => $student::all()
        ]);
    }

    public function store(Request $request) {

        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3|max:255',
            'course' => 'required|min:2|max:255',
            'email' =>  'required|email|unique:students,email',
            'phone' => 'required|min:10|max:15'
        ]);

        if( $validator->fails() ) {
            return response()->json([
                'validate_error' => $validator->messages()
            ]);
        } else {
            $student = new Student;
            $student->name = $request->input('name');
            $student->course = $request->input('course');
            $student->email = $request->input('email');
            $student->phone = $request->input('phone');
            $student->save();
    
            return response()->json([
                'status' => 200,
                'message' => 'Student Added Successfully.'
            ]);
        }
    }

    public function edit($id) {
        $student = Student::find($id);
        $response = [
            'status' => 400,
            'message' => 'Student not exists.'
        ];
        if( $student ) {
            $response = [
                'status' => 200,
                'student' => $student
            ];
        }
        return response()->json($response);
    }

    public function update( Request $request, $id ) {

        $student = Student::find($id);
        $response = [
            'status' => 400,
            'message' => 'Student not exists.'
        ];

        if( $student ) {

            $validator = Validator::make($request->all(), [
                'name' => 'required|min:3|max:255',
                'course' => 'required|min:2|max:255',
                'email' =>  'required|email|unique:students,email,' . $id,
                'phone' => 'required|min:10|max:15'
            ]);

            if( $validator->fails() ) {
                $response = [
                    'status' => 203,
                    'validate_error' => $validator->messages()
                ];
            } else {
                $student->name = $request->input('name');
                $student->course = $request->input('course');
                $student->email = $request->input('email');
                $student->phone = $request->input('phone');
                $student->update();
        
                $response = [
                    'status' => 200,
                    'message' => 'Student successfully updated.'
                ];
            }

        }

        return response()->json($response);
    }

    public function destroy($id = '') {
        $student = Student::find($id);
        $student->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Student Deleted Successfully.'
        ]);
    }
}
