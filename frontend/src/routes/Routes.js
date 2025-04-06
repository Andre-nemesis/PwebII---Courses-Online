import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { SignUpAdmin } from '../pages/signUp/signUpAdmin.js';
import { Hello } from '../components/HelloReact';
import MainScreen from '../components/mainScreen.js';
import Login from '../components/login.js';
import { SignUpStudent } from '../pages/signUp/signUpStudent.js';
import CoursesList from '../pages/students/coursesList.js';
import SubscribedCourses from '../pages/students/subcribetCourses.js';
import TeachersList from '../pages/Admins/teachersList.js';
import StudentsList from '../pages/Admins/studentsList.js';
import HomePage from '../pages/students/studentMainScreen.js';
import AdminList from '../pages/Admins/adminList.js';
import ModulesTeacherList from '../pages/teachers/modulesCreatedList.js';
import ModulesList from '../pages/teachers/modulesList.js';
import LearnifyPage from '../pages/landingPage/page.js';
import ProfileSettings from '../components/profileSettings.js';
import MainScreenTeacher from '../pages/teachers/mainScreen.js';
import { isTokenExpired } from '../service/auth.js';
import AdminMainScreen from '../pages/Admins/AdminMainScreen.js';
import CourseDetails from '../pages/ModulesCourse.js';
import ResetPassword from '../pages/resetPassword.js';
import NewPassword from '../pages/newPassword.js';


const AppRoutes = ({ isAuthenticated, setAuthenticated, type, role }) => {
  const handleLogin = () => {
    setAuthenticated(true);
  };

  const getBasePath = () => {
    if (type === 'admin' && role === 'content_manager') {
      return 'manager';
    }
    return type; 
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/signUp" element={<SignUpAdmin />} />
        <Route path="/verify-email" element={<ResetPassword />} />
        <Route path="/reset-password/:id" element={<NewPassword />} />
        <Route path="/signUp-student" element={<SignUpStudent />} />
        <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to={`/${getBasePath()}/mainScreen`} />} />
        <Route path="/Hello" element={<Hello />} />

        {/* Rotas Protegidas */}
        {isAuthenticated && !isTokenExpired() ? (
          <>
            {/* Rota base para o tipo de usuário */}
            <Route path={`/${getBasePath()}`} element={<Navigate to={`/${getBasePath()}/mainScreen`} />} />

            {/* Rotas para Admin */}
            {type === 'admin' && role === 'admin' && (
              <>
                <Route path="admin/mainScreen" element={<AdminMainScreen />} />
                <Route path="admin/courses" element={<CoursesList />} />
                <Route path="admin/teachers" element={<TeachersList />} />
                <Route path="admin/students" element={<StudentsList />} />
                <Route path="admin/admins" element={<AdminList />} />
                <Route path="admin/module/view" element={<ModulesTeacherList userRole={type} admRole={role} />} />
                <Route path="admin/module/view/all" element={<ModulesList userRole={type} adminRole={role} />} />
                <Route path="admin/settings" element={<ProfileSettings userRole={type} roleAdmin={role} />} />
                <Route path="admin/courses/:id/modules" element={<CourseDetails />} />
              </>
            )}

            {/* Rotas para Content Manager */}
            {type === 'admin' && role === 'content_manager' && (
              <>
                <Route path="manager/mainScreen" element={<MainScreen userRole={type} roleAdm={role} />} />
                <Route path="manager/courses" element={<CoursesList />} />
                <Route path="manager/module/view" element={<ModulesTeacherList userRole={type} admRole={role} />} />
                <Route path="manager/settings" element={<ProfileSettings userRole={type} roleAdmin={role} />} />
              </>
            )}

            {/* Rotas para Teacher */}
            {type === 'teacher' && (
              <>
                <Route path="teacher/mainScreen" element={<MainScreen userRole={type} roleAdm={role} />} />
                <Route path="teacher/module/view" element={<ModulesList userRole={type} />} />
                <Route path="teacher/course/view" element={<CoursesList userRole={type} />} />
                <Route path="teacher/settings" element={<ProfileSettings userRole={type} />} />
              </>
            )}

            {/* Rotas para Student */}
            {type === 'student' && (
              <>
                <Route path="student/mainScreen" element={<HomePage userRole={type} />} />
                <Route path="student/courses" element={<CoursesList />} />
                <Route path="student/subscribed-courses" element={<SubscribedCourses />} />
                <Route path="student/settings" element={<ProfileSettings userRole={type} />} />
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