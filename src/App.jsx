import { Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import './App.css'
import SideOption from "./pages/SideOption"; 
import Dashbord from "./pages/Dashbord";
import StudentRegister from "./pages/StudentRegister";
import TeacherRegister from "./pages/TeacherRegister";
import TeacherList from "./pages/TeacherList";
import SubjectAdd from "./pages/SubjectAdd";
import SubjectList from "./pages/SubjectList";
import AddSyllabus from "./pages/AddSyllabus";
import SyllabusList from "./pages/SyllabusList";
import Login from "./pages/Auth/LogIn";
import CreateAccount from "./pages/Auth/CreateAccount";


function App() {

  return (
    <>
    <SideOption/>
<Routes>
  <Route path="/" element={<Dashbord/>} />
  <Route path='/home' element={<Home/>}/>
  <Route path="/studentregister" element={<StudentRegister/>} />
  <Route path="/teacher-register"  element={<TeacherRegister/>}/>
  <Route path="/teacherlist" element={<TeacherList/>}/>
  <Route path="/subject-add" element={<SubjectAdd/>} />
  <Route path="/subjectlist" element={<SubjectList/>} />
  <Route path="/addsyllabus" element={<AddSyllabus/>}/>
  <Route path="/syllabuslist" element={<SyllabusList/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/create-account" element={<CreateAccount/>}/>
</Routes>

   
    </>
  )
}

export default App
