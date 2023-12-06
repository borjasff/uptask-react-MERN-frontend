import { Link } from "react-router-dom"
import { useState } from "react"
import Alert from "../components/Alert"
import clientAxios from "../config/clientAxios"

export default function Register() {
  const [ name, setName] = useState('')
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
  const [ repeatPassword, setRepeatPassword] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();

    if([name, email, password, repeatPassword].includes('')){
      setAlert({
        msg: "All fields are required",
        error: true})

        setTimeout(() => {
          setAlert({
            msg: "",
            error: false})
        }, 4000);
      
      return
      }
      if(password !== repeatPassword){
        setAlert({
          msg: "Passwords are not the same",
          error: true})
  
          setTimeout(() => {
            setAlert({
              msg: "",
              error: false})
          }, 4000);
      }

      if(password.length < 6){
        setAlert({
          msg: "Passwords are very short, add a minimum of 6 characters",
          error: true})
  
          setTimeout(() => {
            setAlert({
              msg: "",
              error: false})
          }, 4000);
          return
      }
      setAlert({});
      //create user in api
      try {

        const {data} = await clientAxios.post(`/users`, {name, email, password})

        setAlert({
          msg: data.msg,
          error: false
        })
        
        setName("");
        setEmail("");
        setPassword("");
        setRepeatPassword("");
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
          })
      }
      

  }
      
  const { msg} = alert;
  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">Register an account and manage you {''}<span className="text-slate-700">projects</span> </h1>

    {msg && <Alert alert={alert}/>}

    <form className="my-10 bg-white shadow rounded-lg p-10" 
    onSubmit={handleSubmit}>

    <div className="my-5">
        <label htmlFor="name" className="uppercase text-gray-600 block text-xl font-bold">Name</label>
        <input id="name" type="text" placeholder="Your name" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
        value={name} onChange={(e) => setName(e.target.value)}/>
      </div>

      <div className="my-5">
        <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
        <input id="email" type="email" placeholder="Registration Email" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
        value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <div className="my-5">
        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
        <input id="password" type="password" placeholder="Registration Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
        value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>

      <div className="my-5">
        <label htmlFor="Password2" className="uppercase text-gray-600 block text-xl font-bold">Repeat Password</label>
        <input id="Password2" type="password" placeholder="Repeat Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
        value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
      </div>

      <input type="submit" value="Create account" className="bg-sky-700 w-full py-3 mt-5 mb-5 text-white uppercase font-bold rounded hover:bg-sky-800 hover:cursor-pointer" />
    </form>

    <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">Have an account? Login</Link>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/forgot-password">Forgot my password</Link>
    </nav>

</>
  )
}
