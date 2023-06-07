import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom' 
import Index from './pages/Index'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/">
    <Route index element={<Index />} />
    <Route path='login' element={<Login />} />
    <Route path='register' element={<Register />}/>
    <Route path="dashboard" element={<Dashboard />} />ù
    <Route path="404" element={<NotFound/>} />
    <Route path="*" element={<Navigate to="/404" />} />
  </Route>,
))

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App