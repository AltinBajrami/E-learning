import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Error from './components/Pages/Error/Error';
import Landing from './components/Pages/Landing/Landing';
import Login from './components/molecules/Forms/Login/Login';
import ForgotPassword from './components/molecules/Forms/ForgotPassword/ForgotPassword';
import Signup from './components/molecules/Forms/Signup/Signup';
import Verify from './components/molecules/Forms/Verify/Verify';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import Events from './components/Pages/Events/Events';
import Projects from './components/Pages/Projects/Projects';
import TaskList from './components/Pages/TaskList/TaskList';
import Services from './components/Pages/Services/Services';
import Notifications from './components/Pages/Notifications/Notifications';
import Chat from './components/Pages/Chat/Chat';
import { AuthProvider } from './contexts/AuthContext';
import './styles/main.scss';
import Contact from './components/Pages/Contact/Contact';
import MyProfile from './components/Pages/Profile/Profile';
import Questions from './components/organisms/Questions/Questions';
import VerifyEmail from './components/Pages/Verify/VerifyEmail';
import ResetPassword from './components/Pages/ResetPassword/ResetPassword';
import AboutUs from './components/Pages/AboutUs/AboutUs';
import DashboardLayout from './DashboardLayout';
import { loader as dashboardLoader } from './DashboardLayout';
import Resources from './components/Pages/Resources/Resources';
import Courses from './components/Pages/Courses/Courses';
import Quizzes from './components/Pages/Quizzes/Quizzes';
import Certifications from './components/Pages/Certifications/Certifications';
import { action as profileAction } from './components/Pages/Profile/Profile';
import LessonDetails from './components/organisms/LessonDetails/LessonDetails';
import Classes from './components/Pages/Classes/Classes';
import { loader as classesLoader } from './components/Pages/Classes/Classes';
import CreateClass from './components/Pages/Classes/CreateClass/CreateClass';
import { action as createClassAction } from './components/Pages/Classes/CreateClass/CreateClass';
import { loader as createClassLoader } from './components/Pages/Classes/CreateClass/CreateClass';
import UpdateClass from './components/Pages/Classes/UpdateClass/UpdateClass';
import { action as updateClassAction } from './components/Pages/Classes/UpdateClass/UpdateClass';
import { loader as updateClassLoader } from './components/Pages/Classes/UpdateClass/UpdateClass';
import EditStudents from './components/Pages/Classes/EditStudents/EditStudents';
import { loader as editStudentsLoader } from './components/Pages/Classes/EditStudents/EditStudents';
import SingleClass from './components/Pages/Classes/SingleClass/SingleClass';
import { loader as singleClassLoader } from './components/Pages/Classes/SingleClass/SingleClass';
import CreateConversation from './components/Pages/Chat/CreateConversation/CreateConversation';
import EditConversation from './components/Pages/Chat/EditConversation/EditConversation';
import CreateQuiz from './components/Pages/Quiz/CreateQuiz/CreateQuiz';
import { loader as createQuizLoader } from './components/Pages/Quiz/CreateQuiz/CreateQuiz';
import AttemptQuiz from './components/Pages/Quiz/AttemptQuiz/AttemptQuiz';
import UpdateQuiz from './components/Pages/Quiz/UpdateQuiz/UpdateQuiz';
import { loader as updateQuizLoader } from './components/Pages/Quiz/UpdateQuiz/UpdateQuiz';
import Community from './components/Pages/Community/Community';
import UploadFile from './components/Pages/UploadPage/UploadFile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'resources',
        element: <Resources />,
      },
      {
        path: 'upload',
        element: <UploadFile />,
      },

      {
        path: 'community',
        element: <Community />,
      },
      {
        path: 'quizzes',
        element: <Quizzes />,
      },
      {
        path: 'courses',
        element: <Courses />,
      },
      {
        path: 'certifications',
        element: <Certifications />,
      },
      {
        path: 'sign-in',
        element: <Login />,
      },
      {
        path: 'sign-up',
        element: <Signup />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'verify',
        element: <Verify />,
      },
      {
        path: 'verify-email',
        element: <VerifyEmail />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
      {
        path: 'about-us',
        element: <AboutUs />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'search',
        element: <LessonDetails />,
      },
      
    ],
  },
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    loader: dashboardLoader,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'chat',
        element: <Chat />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'events',
        element: <Events />,
      },
      {
        path: 'task-list',
        element: <TaskList />,
      },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
      {
        path: 'questions',
        element: <Questions />,
      },
      {
        path: 'my-profile',
        element: <MyProfile />,
        action: profileAction,
      },
      {
        path: 'classes',
        element: <Classes />,
        loader: classesLoader,
      },
      {
        path: 'classes/create',
        element: <CreateClass />,
        action: createClassAction,
        loader: createClassLoader,
      },
      {
        path: 'classes/update/:id',
        element: <UpdateClass />,
        action: updateClassAction,
        loader: updateClassLoader,
      },
      {
        path: 'classes/editStudents/:id',
        element: <EditStudents />,
        loader: editStudentsLoader,
      },
      {
        path: 'classes/:id',
        element: <SingleClass />,
        loader: singleClassLoader,
      },
      {
        path: 'chat/conversation/create',
        element: <CreateConversation />,
      },
      {
        path: 'chat/conversation/edit/:id',
        element: <EditConversation />,
      },
      {
        path: 'create-quiz/:classId',
        element: <CreateQuiz />,
        loader: createQuizLoader,
      },
      {
        path: 'quiz/:id',
        element: <AttemptQuiz />,
      },
      {
        path: 'edit-quiz/:classId/:quizId',
        element: <UpdateQuiz />,
        loader: updateQuizLoader,
      },
    ],
    
  },
  
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
