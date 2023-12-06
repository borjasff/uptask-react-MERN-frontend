import FormCollaborator from "../components/FormCollaborator"
import { useEffect } from "react"
import useProjects from "../hooks/useProjects"
import { useParams } from "react-router-dom"
import Alert from "../components/Alert"

const NewCollaborator = () => {

    const { getProject, load, project, collaborator, addCollaborator, alert } = useProjects()
    const params = useParams()

    useEffect(() => {
        getProject(params.id)
    },[])
    if(!project?._id) return <Alert alert={alert}/>
  return (
    <>
        <h1 className="text-4xl font-black" >Add Collaborator of {project.name} Project</h1>

        <div className="mt-10 flex justify-center">
            <FormCollaborator />
        </div>

        {load ? 
            //style to load page while wait loading content
            <div className="border border-slate-300 shadow rounded-md p-4 max-w-sm w-full mx-auto mt-10">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-300 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-300 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-300 rounded"></div>
                    </div>
                    </div>
                </div>
            </div>
    :
      collaborator.data?._id  && ( 
        <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
                  <h2 className="text-center mb-10 text-2xl font-bold ">Result:</h2>

                  <div className="flex justify-between items-center">
                      <p>{collaborator.data.name}</p>

                      <button 
                      onClick={() => addCollaborator({
                        email: collaborator.data.email
                      })}
                        type="button"
                        className="bg-slate-500 py-2 px-5 ml-10 rounded-lg uppercase text-white font-bold text-sm hover:bg-slate-800 "
                      >Add to the Project</button>
                  </div>
            </div>
      </div>)
      }
    </>
  )
}

export default NewCollaborator