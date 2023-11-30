import { Link } from "react-router-dom"
import { useState } from "react"
import Alert from "../components/Alert"
import clientAxios from "../config/clientAxios"


export default function ForgotPassword() {

  const [email, setEmail ] = useState('')
  const [ alert, setAlert ] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();

    if ( email === '' || email.length < 6){
      setAlert({ 
        msg: 'Please enter email',
        error: true
      });
      return
    } 
    try {
      const {data} = await clientAxios.post(`/users/forgot-password`, { email})
      setAlert({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
 
  const {msg} = alert
  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">Recober your access and manage you {''}<span className="text-slate-700">proyects</span> </h1>
    {msg && <Alert alert={alert}/>}
    <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg p-10">

      <div className="my-5">
        <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
        <input id="email" type="email" placeholder="Send instructions" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={email} onChange={e => setEmail(e.target.value)}
                />
      </div>
      <input type="submit" value="Send Email" className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
    </form>

    <nav className="lg:flex lg:justify-between">
       <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/register">Don't have an account? Register here</Link>
       <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/forgot-password">Forgot my password</Link>
    </nav>

</>
  )
}
