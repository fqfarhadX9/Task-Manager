import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
import TaskView from "./pages/TaskView";
import Layout from "./components/Layout";
import Members from "./pages/Members";
import TaskPage from "./pages/TaskPage";
import CalendarPage from "./pages/CalenderPage";
import Attendance from "./pages/Attendance";
import AdminJoinCode from "./pages/AdminJoinCode";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route 
         path="/task/:id" 
         element={
          <ProtectedRoute>
            <Layout>
             <TaskView />
            </Layout>
          </ProtectedRoute>
         }
        />

        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <Layout>
                <Members />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-join-code"
          element={
            <AdminJoinCode />
          }
        />

        <Route
          path="/my-tasks"
          element={
            <ProtectedRoute>
              <Layout>
                <TaskPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Layout>
                <CalendarPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Layout>
                <Attendance />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
