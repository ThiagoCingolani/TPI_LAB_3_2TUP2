import React from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Protected from "./components/routes/protected/Protected";
import Login from "./components/login/Login"
import Dashboard from "./components/dashboard/Dashboard"


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <Dashboard />
        </Protected>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div className="d-flex flex-column align-items-center">
      {<RouterProvider router={router} />}
    </div>
  );
};

export default App