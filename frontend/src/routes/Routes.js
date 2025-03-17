import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { SignUpAdmin } from '../components/signUp/signUpAdmin.js';
import { Hello } from '../components/HelloReact';
import MainScreen from '../components/mainScreen.js';
import Login from '../components/login.js';
import { SignUpStudent } from '../components/signUp/signUpStudent.js';
import SignUpTeacher from '../components/signUp/SignUpTeacher.js';
import CoursesList from '../components/pages/studens/coursesList.js';
import SubscribedCourses from '../components/pages/studens/subcribetCourses.js';
import TeachersList from '../components/pages/Admins/teachersList.js';
import StudentsList from '../components/pages/Admins/studentsList.js';
import AdminList from '../components/pages/Admins/adminList.js';
import ModulesTeacherList from '../components/pages/teachers/modulesCreatedList.js';
import ModulesList from '../components/pages/teachers/modulesList.js';

const Layout = ({ setAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token
    setAuthenticated(false);
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f8f8f8' }}>
        <h1>Bem-vindo(a) à Learnify!</h1>
        <button onClick={handleLogout} style={{ padding: '5px 10px' }}>
          Sair
        </button>
      </header>
      <main style={{ padding: '20px' }}>
        <Outlet /> {/* Isso garante que o conteúdo das rotas seja renderizado aqui */}
      </main>
    </div>
  );
};

const AppRoutes = ({ isAuthenticated, setAuthenticated }) => {
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
        <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/mainScreen" />} />
        <Route path="/Hello" element={<Hello />} />

        {/* Rotas Protegidas dentro do Layout */}
        {isAuthenticated ? (
          <Route element={<Layout setAuthenticated={setAuthenticated} />}>
            <Route path="/mainScreen" element={<MainScreen setAuthenticated={setAuthenticated} />} />
            <Route path="/courses" element={<CoursesList />} />
            <Route path="/subscribed-courses" element={<SubscribedCourses />} />
            <Route path="/teachers" element={<TeachersList />} />
            <Route path="/students" element={<StudentsList />} />
            <Route path="/admins" element={<AdminList />} />
            <Route path="/module/view" element={<ModulesTeacherList />} />
            <Route path="/module/view/all" element={<ModulesList />} />
            <Route index element={<p>Selecione uma opção no menu acima.</p>} />
          </Route>
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
