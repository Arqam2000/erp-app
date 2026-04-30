import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Intimation from './pages/Intimation.jsx'
import { LoginProvider } from './context/LoginContext.jsx'
import LineClearance from './pages/LineClearance.jsx'
import EditLineClearance from './pages/EditLineClearance.jsx'
import { Smp } from './pages/Smp.jsx'
import CheckAuthorization from './pages/CheckAuthorization.jsx'
import ProdRegDocument from './pages/ProdRegDocument.jsx'
import AddSmp from './pages/AddSmp.jsx'
import ChkRewSmp from './pages/ChkRewSmp.jsx'
import CloseSmp from './pages/CloseSmp.jsx'
import Dashboard from './pages/Dashboard.jsx'
import LineClearanceToday from './pages/LineClearanceToday.jsx'

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
  {
    path: "/line-clearance",
    element: <LineClearance />
  },
  {
    path: "/edit-line-clearance",
    element: <EditLineClearance />
  },
  {
    path: "/smp",
    element: <Smp />
  },
  {
    path: "/check-authorization",
    element: <CheckAuthorization />
  },
  {
    path: "/product-registration-document",
    element: <ProdRegDocument />
  },
  {
    path: "/add-smp",
    element: <AddSmp />
  },
  {
    path: "/check-smp",
    element: <ChkRewSmp />
  },
  {
    path: "/close-smp",
    element: <CloseSmp />
  },
  {
    path: "/production-status",
    element: <Dashboard />
  },
  {
    path: "/line-clearance-today",
    element: <LineClearanceToday />
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </StrictMode>,
)
