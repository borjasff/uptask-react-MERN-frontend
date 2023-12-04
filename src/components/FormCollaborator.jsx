import { useState } from "react"
import useProyects from "../hooks/useProyects"
import Alert from "./Alert"

const FormCollaborator = () => {
    const[email, setEmail] = useState("")

    const { alert, showAlert, submitCollaborator} = useProyects();

    const handleSubmit = e => {
        e.preventDefault();
        if(email === ""){
            showAlert({
                msg: "Please enter valid email",
                error: true
            })
            return
        }
        submitCollaborator(email)
    }
    const {msg} = alert;
  return (
    <form
        onSubmit={handleSubmit}
        className="bg-white py-10 px-5 md:1/2 rounded-lg shadow">
        <div className='mb-5'>
            {msg && <Alert alert={alert} />}
            <label htmlFor='email' className='text-gray-700 uppercase font-bold text-sm'>
                Email Collaborator
            </label>
            <input type="email" id="email" placeholder='Email Collaborator' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
                    value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <input value="Find Collaborator" type="submit"
                className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transtion-colors rounded text-sm' />
                                       
    </form>
  )
}

export default FormCollaborator