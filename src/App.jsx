import { Navigate, Routes, Route} from 'react-router-dom'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import PrivateRoute from './routes/PrivateRoute'
import Dashboard from './pages/admin/Dashboard'
import ManageTask from './pages/admin/ManageTask'
import ManageUsers from './pages/admin/ManageUsers'
import CreateTask from './pages/admin/CreateTask'
import UserDashboard from './pages/user/UserDashboard'
import MyTask from './pages/user/MyTask'
import TaskDetails from './pages/user/TaskDetails'

function App() {
  return (
        <Routes>
            <Route path='/sign-up' element={<Signup />} >
            <Route path='/log-in' element={<Login />} />
           {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]}/>} />
              <Route path='/admin/dashboard' element={<Dashboard />} />
              <Route path='/admin/tasks' element={<ManageTask />} />
              <Route path='/admin/users' element={<ManageUsers />} />
              <Route path='/admin/create-task' element={<CreateTask />} />
            </Route>
            {/* User Routs */}
            <Route>
              <Route path='/user/dashboard' element={<UserDashboard />} />
              <Route path='/user/tasks' element={<MyTask />} />
              <Route path='/user/task-details/:id' element={<TaskDetails />} />
            </Route>
        </Routes>
  )
}

export default App
