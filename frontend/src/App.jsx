import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";
import Bills from "./pages/Bills";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace />;
}

function App() {

  const token = localStorage.getItem("token");

  return (
    <Routes>

      <Route
        path="/login"
        element={
          token
            ? <Navigate to="/dashboard" replace />
            : <Login />
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
<Route
  path="/doctors"
  element={
    <ProtectedRoute>
      <Doctors />
    </ProtectedRoute>
  }
/>

<Route
  path="/patients"
  element={
    <ProtectedRoute>
      <Patients />
    </ProtectedRoute>
  }
/>

<Route
  path="/appointments"
  element={
    <ProtectedRoute>
      <Appointments />
    </ProtectedRoute>
  }
/>

<Route
  path="/prescriptions"
  element={
    <ProtectedRoute>
      <Prescriptions />
    </ProtectedRoute>
  }
/>

<Route
  path="/bills"
  element={
    <ProtectedRoute>
      <Bills />
    </ProtectedRoute>
  }
/>
      <Route
        path="*"
        element={
          <Navigate
            to={token ? "/dashboard" : "/login"}
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;
