import { formatDate } from "../helpers/formatDate";
import useProyects from "../hooks/useProyects";

const Task = ({task}) => {
    const { handleModalEditTask, handleModalDeleteTask } = useProyects()
    const { name, description, priority, entryDate, state , _id} = task;
  return (
    <div className="border-b p-5 flex justify-between items-center">
        <div>
            <p className="mb-2 text-xl">{name}</p>
            <p className="mb-2 text-sm text-gray-500 uppercase">{description}</p>
            <p className="mb-2 text-SM">{formatDate(entryDate)}</p>
            <p className="mb-2 text-gray-600">Priority: {priority}</p>
        </div>  
        <div className="flex gap-2 ">
            <button 
                    onClick={() => handleModalEditTask(task) }
                    className="bg-indigo-600 px-4 py-3 uppercase font-bold text-sm rounded-lg text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
            </button>
            {state ? (
                <button className="bg-sky-600 px-4 py-3 uppercase font-bold text-sm rounded-lg text-white">
                    Complete
                </button>)
                :(
                <button className="bg-gray-600 px-4 py-3 uppercase font-bold text-sm rounded-lg text-white">
                    Incomplete
                </button>
            )}
            
            
            <button
                    onClick={() => handleModalDeleteTask(task)}
                    className="bg-red-600 px-4 py-3 uppercase font-bold text-sm rounded-lg text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
        </div>
        
    </div>
  )
}

export default Task