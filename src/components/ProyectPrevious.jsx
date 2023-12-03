import { Link } from "react-router-dom"

const ProyectPrevious = ({proyect}) => {
    const { name, _id, client} =proyect

  return (
    <div className="border-b p-5 flex">
        
        <p className="flex-1">{name} 
            <span className="text-sm text-gray-500 uppercase">{""} {client}</span>
        </p>
        <Link  to={`${_id}`}
                className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
        >Show Proyect</Link>
    </div>
  )
}

export default ProyectPrevious