import useProjects from "../hooks/useProjects";
const Collaborator = ({collaborator}) => {
  // to delete collaborator
    const { handleModalDeleteCollaborator} = useProjects()
    //and show the collaborator
    const { name, email} = collaborator;
  return (
    <div className="border-b p-5 flex justify-between items-center">
        <div>
            <p>{name}</p>
            <p className="text-sm text-gray-700">{email}</p>
        </div>
        <div>
            <button
                    type="button"
                    onClick={() => handleModalDeleteCollaborator(collaborator)}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="red">
                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
            </button>
        </div>
    </div>
  )
}

export default Collaborator