import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import Alert from './Alert';

const FormProject = () => {
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [entryDate, setEntryDate] = useState("");
    const [client, setClient] = useState("");

    const params = useParams()
    const {showAlert, alert, submitProject, project} = useProjects()

    useEffect(() => {
        if(params.id){
            setId(project._id)
            setName(project.name)
            setDescription(project.description)
            setEntryDate(project.entryDate?.split('T')[0])
            setClient(project.client)


        }
    },[params])

    const handleSubmit = async e => {
        e.preventDefault();

        if([name, description, entryDate, client].includes("")){
            showAlert({
                msg: "All fields are required",
                error: true
            })
            return
        }
        //send data to provider
       await submitProject({id, name, description, entryDate, client})

       setId(null)
       setName("")
       setDescription("")
       setEntryDate("")
       setClient("")

    }
    const { msg} = alert;
  return (
    <form className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
            onSubmit={handleSubmit}>
                {msg && <Alert alert={alert}/>}
        <div className='mb-5'>
            <label htmlFor="name" className='text-gray-700 uppercase font-bold text-sm'>Project Name</label>
            <input id="name" type="text" className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md' placeholder='Project Name'
            value={name}
                    onChange={ e => setName(e.target.value)}/>
        
        </div>
        <div className='mb-5'>
            <label htmlFor="description" className='text-gray-700 uppercase font-bold text-sm'>Description</label>
            <input id="description" type="text" className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md' placeholder='Project Description'
                    value={description}
                    onChange={ e => setDescription(e.target.value)}/>
        
        </div>
        <div className='mb-5'>
            <label htmlFor="entryDate" className='text-gray-700 uppercase font-bold text-sm'>Deadline</label>
            <input id="entryDate" type="date" className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={entryDate}
                    onChange={ e => setEntryDate(e.target.value)}/>
        
        </div>
        <div className='mb-5'>
            <label htmlFor="client" className='text-gray-700 uppercase font-bold text-sm'>Client</label>
            <input id="client" type="text" className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md' placeholder='Client Name'
                    value={client}
                    onChange={ e => setClient(e.target.value)}/>
        
        </div>
        <input type="submit" value={id ? "Update Project" : "Create Project" } className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors' />
    </form>
  )
}

export default FormProject