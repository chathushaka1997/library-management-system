import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import AppContainer from './components/AppContainer'
import BooksPage from './pages/Books'
import { setNavigate } from './config/navigation'
import CreateBookPage from './pages/CreateBook'
import EditBookPage from './pages/EditBook'

function App() {

  const navigate = useNavigate();
  setNavigate(navigate);

  return (

    <Routes>
      <Route path="/" element={<AppContainer />}>
        <Route index element={<BooksPage />} />
        <Route path="create" element={<CreateBookPage />} />
        <Route path="edit/:id" element={<EditBookPage />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/*  <Route path="/email/verify/:code" element={<VerifyEmail />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset" element={<ResetPassword />} /> */}
    </Routes>
  )
}

export default App
