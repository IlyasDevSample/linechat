import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom' 
import Index from './pages/Index'
import Dashboard from './pages/Dashboard'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/">
    <Route index element={<Index />} />
    <Route path="dashboard" element={<Dashboard />} />
  </Route>,
))

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App