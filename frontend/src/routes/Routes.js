import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { SignUpAdmin } from '../pages/signUp/signUpAdmin.js';
import { Hello } from '../components/HelloReact';
import MainScreen from '../components/mainScreen.js';
import Login from '../components/login.js';
import { SignUpStudent } from '../pages/signUp/signUpStudent.js';
import SignUpTeacher from '../pages/signUp/SignUpTeacher.js';
import CoursesList from '../pages/studens/coursesList.js';
import SubscribedCourses from '../pages/studens/subcribetCourses.js';
import TeachersList from '../pages/Admins/teachersList.js';
import StudentsList from '../pages/Admins/studentsList.js';
import AdminList from '../pages/Admins/adminList.js';
import ModulesTeacherList from '../pages/teachers/modulesCreatedList.js';
import ModulesList from '../pages/teachers/modulesList.js';
import LearnifyPage from '../pages/landingPage/page.js';
import ProfileSettings from '../pages/Admins/profileSettings.js';
import HomePageTeacher from '../pages/teachers/mainScreen.js';


const AppRoutes = ({ isAuthenticated, setAuthenticated, type }) => {
  const handleLogin = () => {
    setAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/signUp" element={<SignUpAdmin />} />
        <Route path="/signUp-student" element={<SignUpStudent />} />
        <Route path="/signUp-teacher" element={<SignUpTeacher />} />
        <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to={`/${type}/mainScreen`} />} />
        <Route path="/Hello" element={<Hello />} />

        {/* Rotas Protegidas */}
        {isAuthenticated ? (
          <>
            {/* Rota base para o tipo de usuário */}
            <Route path={`/${type}`} element={<Navigate to={`/${type}/mainScreen`} />} />

            {/* Rotas para Admin */}
            {type === 'admin' && (
              <>
                <Route path="admin/mainScreen" element={<MainScreen setAuthenticated={setAuthenticated} />} />
                <Route path="admin/courses" element={<CoursesList />} />
                <Route path="admin/teachers" element={<TeachersList />} />
                <Route path="admin/students" element={<StudentsList />} />
                <Route path="admin/admins" element={<AdminList />} />
                <Route path="admin/module/view" element={<ModulesTeacherList />} />
                <Route path="admin/module/view/all" element={<ModulesList />} />
                <Route path="admin/settings" element={<ProfileSettings />} />
              </>
            )}

            {/* Rotas para Teacher */}
            {type === 'teacher' && (
              <>
                <Route path="teacher/mainScreen" element={<HomePageTeacher setAuthenticated={setAuthenticated} />} />
                <Route path="teacher/module/view" element={<ModulesTeacherList />} />
                {/* <Router path="teacher/home-page-teacher" element={< />} /> */}
              </>
            )}

            {/* Rotas para Student */}
            {type === 'student' && (
              <>
                <Route path="student/mainScreen" element={<MainScreen setAuthenticated={setAuthenticated} />} />
                <Route path="student/courses" element={<CoursesList />} />
                <Route path="student/subscribed-courses" element={<SubscribedCourses />} />
              </>
            )}
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}

        {/* Página de boas-vindas ou página inicial */}
        <Route index element={<LearnifyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
