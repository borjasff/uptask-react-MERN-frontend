import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alert from "../components/Alert"
import clientAxios from "../config/clientAxios"

export default function ConfirmCount() {
  const [alert, setAlert] = useState({})
  const [countConfirm, setCountConfirm] = useState(false)
  const params = useParams()
  const { id} = params

  useEffect(() => {
    const confirmAccount = async () => {
      try {

        const url = `/users/confirm/${id}`
        const {data} = await clientAxios(url)

        setAlert({
          msg: data.msg,
          error: false
        })
        setCountConfirm(true)
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
        return
      }
    }
    return () => confirmAccount()
  }, [])

  const {msg} =  alert
  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">Confirm account and manage you {''}<span className="text-slate-700">projects</span> </h1>

    <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
      {msg && <Alert alert={alert}/>}
      {countConfirm && ( 
            <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">Login</Link>
      )}
    </div>

</>
  )
}
