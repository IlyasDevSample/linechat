import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom' 
import Index from './pages/Index'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ForgotPassword from './pages/ForgotPassword'
import ConfirmEmail from './pages/ConfirmEmail'
import ResetPassword from './pages/ResetPassword'
import HomeLayout from './layouts/HomeLayout'
import Chat from './pages/Chat'
import Friends from './pages/Friends'
import Groups from './pages/Groups'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/">
    <Route index element={<Index />} />
    <Route path='login' element={<Login />} />
    <Route path='register' element={<Register />}/>
    <Route path='forgot-password' element={<ForgotPassword />}/>
    <Route path='reset-password' element={<ResetPassword />}/>
    <Route path='confirm-email' element={<ConfirmEmail />}/>
    <Route path="home" element={<HomeLayout />} >
      <Route index element={<Navigate to="/home/chat" />} />
      <Route path="chat" element={<Chat />} />
      <Route path="friends" element={<Friends />} />
      <Route path="groups" element={<Groups />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
    </Route>
    <Route path="404" element={<NotFound/>} />
    <Route path="*" element={<Navigate to="/404" replace={true} />} />
  </Route>,
))

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App