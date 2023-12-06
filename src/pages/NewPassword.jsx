import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import clientAxios from "../config/clientAxios"
import Alert from "../components/Alert"


export default function NewPassword() {
  const [passwordChanged, setPasswordChanged] = useState(false)
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})
  const [tokenValid, setTokenValid] = useState(false)
  const params = useParams()

  const {token} = params

  useEffect(()=> {
      const verifyToken = async () => {
        try {
          await clientAxios(`/users/forgot-password/${token}`)
          setTokenValid(true)
        } catch (error) {
          setAlert({
            msg: error.response.data.msg,
            error: true
          })
        }
      }
      verifyToken()
  }, [])

  const handleSubmit = async e => {
      e.preventDefault();

      if(password.length < 6) {
        setAlert({
          msg: "Please enter a valid password with at least 6 characters",
          error: true
        })
        return
      }
      try {
        const url = `/users/forgot-password/${token}`
        const {data} = await clientAxios.post(url, {password})
        setAlert({
          msg: data.msg,
          error: false
        })
        setPasswordChanged(true)
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
    <h1 className="text-sky-600 font-black text-6xl capitalize">Register a new password and manage you {''}<span className="text-slate-700">projects</span> </h1>
    {msg && <Alert alert={alert}/>}
    {tokenValid && (
      <form className="my-10 bg-white shadow rounded-lg p-10"
            onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">New Password</label>
          <input id="password" type="password" placeholder="Registration a new Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={password} onChange={e => {setPassword(e.target.value)}}/>
        </div>
        <input type="submit" value="Save new password " className="bg-sky-700 w-full py-3 mt-5 mb-5 text-white uppercase font-bold rounded hover:bg-sky-800 hover:cursor-pointer" />
      </form>
    )}
          {passwordChanged && ( 
            <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">Login</Link>
      )}

</>
  )
}
