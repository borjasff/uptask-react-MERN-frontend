import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import Alert from "../components/Alert"

export default function ConfirmCount() {
  const [alert, setAlert] = useState({})
  const [countConfirm, setCountConfirm] = useState(false)
  const params = useParams()
  const { id} = params

  useEffect(() => {
    const confirmAccount = async () => {
      try {
       //TODO: MOVE TO client axios
        const url = `http://localhost:4000/api/users/confirm/${id}`
        const {data} = await axios(url)

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
      }
    }
    confirmAccount()
  }, [])

  const {msg} =  alert
  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">Confirm account and manage you {''}<span className="text-slate-700">proyects</span> </h1>

    <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
      {msg && <Alert alert={alert}/>}
      {countConfirm && ( 
            <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">Login</Link>
      )}
    </div>

</>
  )
}
