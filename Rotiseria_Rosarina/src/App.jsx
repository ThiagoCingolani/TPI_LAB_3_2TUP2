import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Protected from "./components/routes/protected/Protected";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/register/Register";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected allowedRoles={["Sysadmin", "Admin", "User"]}>
          <Dashboard />
        </Protected>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register/>,
    }
  ]);

  return (
    <div className="d-grid">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
