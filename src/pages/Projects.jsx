import { useEffect } from "react"
import useProjects from "../hooks/useProjects"
import ProjectPrevious from "../components/ProjectPrevious"
import Alert from "../components/Alert"
import io from "socket.io-client"

let socket;

const Projects = () => {
  const { projects} = useProjects()


//exanple connect to socket io
  /**useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('prueba', projects)

    socket.on('respuesta', (persona) => {
      console.log('desde el frontend', persona)
    })
  })//without dependencies to run all time
**/

  const {msg} = alert
  return (
    <>
        <h1 className='text-4xl font-black'>Projects</h1>
        
        {msg && <Alert alert={alert} /> }
    
        <div className="bg-white shadow mt-10 rounded-lg ">
          {projects.length ? 
              projects.map(project =>(
                  <ProjectPrevious 
                      key={project._id}
                      project={project}
                  />
              ))
          
          : <p className="text-center text-gray-600 uppercase p-5">No hay projectos</p>}
        </div>
    </>
  )
}

export default Projects