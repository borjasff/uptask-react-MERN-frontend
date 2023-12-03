import { useParams, Link } from "react-router-dom"
import { useEffect } from "react";
import useProyects from "../hooks/useProyects";
import ModalForm from "../components/ModalForm";
import Task from "../components/Task";
import ModalDeleteTask from "../components/modalDeleteTask";
import Alert from "../components/Alert";

const Proyect = () => {
    const params = useParams();

    const { getProyect, proyect, load, handleModalTask, alert } = useProyects()


    useEffect(() =>{
        getProyect(params.id)
    }, [])
    const { name} = proyect
    const {msg} = alert
  return (
    load ? 
            //style to load page while wait loading content
            <div className="border border-slate-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
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
    :(
        <>
            <div className="flex justify-between">
                <h1 className="font-black text-4xl">{name}</h1>
                <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                    <Link to={`/proyects/edit/${params.id}`} className="uppercase font-bold">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>

                    </Link>
                </div>    
            </div>
            <button onClick={handleModalTask} type="button" className="flex gap-2 items-center text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 hover:bg-sky-600 text-white text-center mt-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                </svg>

                <span>New Task</span>
                </button>

                <p className="font-bold text-xl mt-10">Task of Proyect</p>
                <div className="flex justify-center">
                    <div className="md:1/3 lg:1/4">
                        {msg && <Alert alert={alert}/>}
                    </div>

                </div>
                

                <div className="bg-white shadow rounded-lg mt-10">
                    {proyect.tasks?.length ?
                        proyect.tasks?.map(task => (
                        <Task  
                            key={task._id}
                            task={task}
                        />))
                        : <p className="text-center my-5 p-10">Dont has Task in this proyect</p>}

                </div>
                <ModalForm />
                <ModalDeleteTask/>
        </>
    )
  )
}

export default Proyect