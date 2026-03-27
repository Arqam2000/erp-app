import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Intimation from './pages/Intimation.jsx'
import { LoginProvider } from './context/LoginContext.jsx'

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [
    //   {
    //     path: "",
    //     Component: Home,
    //   },
    // ]
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/intimation",
    element: <Intimation />
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </StrictMode>,
)
