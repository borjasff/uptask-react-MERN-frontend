import { BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import ConfirmCount from './pages/ConfirmCount'
import Proyects from './pages/Proyects'
import NewProyect from './pages/NewProyect'
import ProtectedRoute from './layouts/protectedRoute'
import Proyect from './pages/Proyect'
import EditProyect from './pages/EditProyect'
import { AuthProvider } from './context/AuthProvider'
import { ProyectProvider } from './context/ProyectProvider'

function App() {
  

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectProvider>
              <Routes>
                <Route path='/' element={<AuthLayout/>}>
                  <Route index element={<Login/>}/>
                  <Route  path='register' element={<Register/>}/>
                  <Route  path='forgot-password' element={<ForgotPassword/>}/>
                  <Route  path='forgot-password/:token' element={<NewPassword/>}/>
                  <Route  path='confirm/:id' element={<ConfirmCount/>}/>
                </Route>

                <Route path='/proyects' element={<ProtectedRoute/>}>
                    <Route index element={<Proyects/>} />
                    <Route path="create-proyect" element={<NewProyect/>} />
                    <Route path=":id" element={<Proyect/>} />
                    <Route path="edit/:id" element={<EditProyect/>} />
                </Route>

              </Routes>
          </ProyectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
