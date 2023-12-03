import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from "react-router-dom";

const ProyectContext = createContext();

const ProyectProvider = ({children}) => {

    const [proyects, setProyects] = useState([]);
    const [alert, setAlert] = useState({});
    const [proyect, setProyect] = useState({});
    const [load, setLoad] = useState(false);
    const [modalFormTask, setModalFormTask] = useState(false);
    const [modalDeleteTask, setModalDeleteTask] = useState(false);
    const [task, setTask] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        const getProyects = async () => {
            try {
                const token = localStorage.getItem("token")
                if(!token) return;
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }

                const {data} = await clientAxios("/proyects", config)
                setProyects(data)
            } catch (error) {
                console.log(error)
            }
        }
        getProyects()
    }, [])

    const showAlert = alert => {
        setAlert(alert);

        setTimeout(() => {
            setAlert({});
        }, 5000);
    }

    const submitProyect = async proyect => {
        if(proyect.id){
            await editProyect(proyect)
        }else {
            await newProyect(proyect)
        }

    }

    const editProyect = async proyect => {
        try {
            const token = localStorage.getItem("token")
            if(!token) return;
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const { data } = await clientAxios.put(`/proyects/${proyect.id}`, proyect, config);
            //sinc state
            const proyectsUpdates = proyects.map(proyectState => proyectState._id === data._id ? data : proyectState)
            setProyects(proyectsUpdates);

            //show alert
            setAlert({
                msg: "Proyect update successfully",
                error: false
            })
            setTimeout(() => {
                setAlert({});
                navigate('/proyects')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const newProyect = async proyect => {
        try {
            const token = localStorage.getItem("token")
            if(!token) return;
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const { data } = await clientAxios.post("/proyects", proyect, config);
            setProyects([...proyects, data]);

            setAlert({
                msg: "Proyect saved successfully",
                error: false
            })
            setTimeout(() => {
                setAlert({});
                navigate('/proyects')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const getProyect = async id => {
        setLoad(true);
        try {
            const token = localStorage.getItem("token")
            if(!token) return;
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const {data} = await clientAxios(`/proyects/${id}`, config)
            setProyect(data)
        } catch (error) {
            console.log(error)
        }finally{
            setLoad(false);
        }
    }

    const deleteProyect = async id => {
        try {
            const token = localStorage.getItem("token")
            if(!token) return;
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const {data} = await clientAxios.delete(`/proyects/${id}`, config)
            //sincro state
            const proyectsUpdate = proyects.filter(proyectState => proyectState._id !== id)
            setProyects(proyectsUpdate)
            setAlert({
                msg: "Proyect delete successfully",
                error: false
            })
            setTimeout(() => {
                setAlert({});
                navigate('/proyects')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalTask = () => {
        setModalFormTask(!modalFormTask)
        setTask({})
    }
    const submitTask = async task => {

        if(task?.id){
            await editTask(task)
        } else{
            await createTask(task)
        }
    }
    const createTask = async task => {
        try {
            const token = localStorage.getItem("token")
                if(!token) return;
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }
                const {data} = await clientAxios.post('/tasks', task, config)
                //add task of state
                const proyectUpdate = {...proyect}
                proyectUpdate.tasks = [...proyect.tasks, data]
                setProyect(proyectUpdate)
                setAlert({})
                setModalFormTask(false)
       } catch (error) {
        console.log(error)
       }
    }
    const editTask = async task => {
        try {
            const token = localStorage.getItem("token")
                if(!token) return;
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }
                const {data} = await clientAxios.put(`/tasks/${task.id}`, task, config)

                //add task of state
                const proyectUpdate = {...proyect}
                proyectUpdate.tasks = proyectUpdate.tasks.map( taskState => 
                taskState._id === data._id ? data : taskState )
                setProyect(proyectUpdate)
                setAlert({})
                setModalFormTask(false)
       } catch (error) {
        console.log(error)
       }
    }
    const handleModalEditTask = task => {
        setTask(task)
        setModalFormTask(true)
    }
    const handleModalDeleteTask = task => {
        setTask(task)
        setModalDeleteTask(!modalDeleteTask)
    }
    const deleteTask = async () => {
        try {
            const token = localStorage.getItem("token")
                if(!token) return;
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }
                const {data} = await clientAxios.delete(`/tasks/${task._id}`, config)
                setAlert({
                    msg: data.msg,
                    error: false
                })
                //delete task
                const proyectUpdate = {...proyect}
                proyectUpdate.tasks = proyectUpdate.tasks.filter( taskState => 
                taskState._id !== task._id)
                setProyect(proyectUpdate)
                
                setModalDeleteTask(false)
                setTask({})
                setTimeout(() => {
                    setAlert({})
                }, 4000);
       } catch (error) {
        console.log(error)
       }
    }
    return (
        <ProyectContext.Provider
        value={{
            proyects,
            showAlert,
            alert,
            submitProyect,
            getProyect,
            proyect,
            load,
            deleteProyect,
            modalFormTask,
            handleModalTask,
            submitTask,
            handleModalEditTask,
            task,
            handleModalDeleteTask,
            modalDeleteTask,
            deleteTask

        }}>
            {children}
        </ProyectContext.Provider>
    )
}
export {
    ProyectProvider
}
export default ProyectContext;