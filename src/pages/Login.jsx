import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Alert from "../components/Alert"
import clientAxios from "../config/clientAxios"
import useAuth from "../hooks/useAuth";

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();

  // Navigate
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault();

    if([email, password].includes('')){
      setAlert({
        msg: 'Please enter your email and password',
        error: true
      })
      return
    }
    try {
      const {data} = await clientAxios.post('/users/login', {email, password})
      setAlert({})
      localStorage.setItem('token', data.token)
      setAuth(data);
      navigate("/projects")
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  const { msg } = alert

  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl capitalize">Login and manage your {''} <span className="text-slate-700">projects</span> </h1>

        {msg && <Alert alert={alert} />}

        <form className="my-10 bg-white shadow rounded-lg p-10" 
              onSubmit={handleSubmit}
              >
          <div className="my-5">
            <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input id="email" type="email" placeholder="Registration Email" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
                   value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="my-5">
            <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
            <input id="password" type="password" placeholder="Registration Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
                   value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <input type="submit" value="Login" className="bg-sky-700 w-full py-3 mt-5 mb-5 text-white uppercase font-bold rounded hover:bg-sky-800 hover:cursor-pointer" />
        </form>

        <nav className="lg:flex lg:justify-between">
            <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/register">Don't have an account? Register here</Link>
            <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/forgot-password">Forgot my password</Link>
        </nav>

    </>
    
  )
}
