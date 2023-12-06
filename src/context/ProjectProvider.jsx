import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import io from "socket.io-client";

let socket;

const ProjectContext = createContext();

const ProjectProvider = ({children}) => {

    const [projects, setProjects] = useState([]);
    const [alert, setAlert] = useState({});
    const [project, setProject] = useState({});
    const [load, setLoad] = useState(false);
    const [modalFormTask, setModalFormTask] = useState(false);
    const [modalDeleteTask, setModalDeleteTask] = useState(false);
    const [collaborator, setCollaborator] = useState({});
    const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);
    const [searcher, setSearcher] = useState(false);
    const [task, setTask] = useState({})

    const navigate = useNavigate()
    const {auth} = useAuth()

    useEffect(() => {
        const getProjects = async () => {
            try {
                const token = localStorage.getItem("token")
                if(!token) return;
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }

                const {data} = await clientAxios("/projects", config)
                setProjects(data)
            } catch (error) {
                console.log(error)
            }
        }
        getProjects()
    }, [auth])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    }, [])

    const showAlert = alert => {
        setAlert(alert);

        setTimeout(() => {
            setAlert({});
        }, 5000);
    }

    const submitProject = async project => {
        if(project.id){
            await editProject(project)
        }else {
            await newProject(project)
        }

    }

    const editProject = async project => {
        try {
            const token = localStorage.getItem("token")
            if(!token) return;
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const { data } = await clientAxios.put(`/projects/${project.id}`, project, config);
            //sinc state
            const projectsUpdates = projects.map(projectState => projectState._id === data._id ? data : projectState)
            setProjects(projectsUpdates);

            //show alert
            setAlert({
                msg: "Project update successfully",
                error: false
            })
            setTimeout(() => {
                setAlert({});
                navigate('/projects')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const newProject = async project => {
        try {
            const token = localStorage.getItem("token")
            if(!token) return;
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const { data } = await clientAxios.post("/projects", project, config);
            setProjects([...projects, data]);

            setAlert({
                msg: "Project saved successfully",
                error: false
            })
            setTimeout(() => {
                setAlert({});
                navigate('/projects')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const getProject = async id => {
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
            const {data} = await clientAxios(`/projects/${id}`, config)
            setProject(data)
        } catch (error) {
            navigate('/projects')
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, 3000);
        }finally{
            setLoad(false);
        }
    }

    const deleteProject = async id => {
        try {
            const token = localStorage.getItem("token")
            if(!token) return;
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const {data} = await clientAxios.delete(`/projects/${id}`, config)
            //sincro state
            const projectsUpdate = projects.filter(projectState => projectState._id !== id)
            setProjects(projectsUpdate)
            setAlert({
                msg: "Project delete successfully",
                error: false
            })
            setTimeout(() => {
                setAlert({});
                navigate('/projects')
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
                
                //add task of state, now, it will be added to socket io
                //const projectUpdate = {...project}
                //projectUpdate.tasks = [...project.tasks, data]
                //setProject(projectUpdate)
                setAlert({})
                setModalFormTask(false)

                //Socket IO
                socket.emit('new task', data)
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


                setAlert({})
                setModalFormTask(false)

                //socket
                socket.emit('update task', data)
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
                
                setModalDeleteTask(false)
                
                //socket
                socket.emit('delete Task', task)

                setTask({})
                setTimeout(() => {
                    setAlert({})
                }, 4000);

       } catch (error) {
        console.log(error)
       }
    }

    const submitCollaborator = async email => {
        setLoad(true)
        try {
            const token = localStorage.getItem("token")
            if(!token) return;
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }
                const data = await clientAxios.post(`/projects/collaborators`, {email}, config)
                setCollaborator(data)
                setAlert({})
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        } finally{
            setLoad(false)
        }
    }

    const addCollaborator = async email => {
        try {
            const token = localStorage.getItem("token")
            if(!token) return;
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }
                const {data} = await clientAxios.post(`/projects/collaborators/${project._id}`, email, config)
                setAlert({
                    msg: data.msg,
                    error: false
                })
                setCollaborator({})
                setAlert({})
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    const handleModalDeleteCollaborator = (collaborator) => {
        setModalDeleteCollaborator(!modalDeleteCollaborator)
        setCollaborator(collaborator)
    }
    const deleteCollaborator = async () => {
        try {
            const token = localStorage.getItem("token")
            if(!token) return;
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }
                const {data} = await clientAxios.post(`/projects/delete-collaborator/${project._id}`, {id: collaborator._id}, config)

                const projectUpdate = {...project}

                projectUpdate.collaborators = projectUpdate.collaborators.filter(collaboratorState => collaboratorState._id !== collaborator._id)

                setProject(projectUpdate)

                setAlert({
                    msg: data.msg,
                    error: false
                })
                setCollaborator({})
                setModalDeleteCollaborator(false)

                setTimeout(() =>{
                    setAlert({})
                }, 4000)

                 }catch (error) {
                    setAlert({
                        msg: error.response.data.msg,
                        error: true
                    })
                }
    }

    const completeTask = async id => {
        try {
            const token = localStorage.getItem("token")
            if(!token) return;
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }
                const {data} = await clientAxios.post(`/tasks/state/${id}`, {}, config)

                    setTask({})
                    setAlert({})
                    //socket
                    socket.emit('change state', data)
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleSearcher = () => {
        setSearcher(!searcher)
    }

    //socket io
    const submitTaskSProject = (task) => {
        //add task of state
        const projectUpdate = {...project}
        projectUpdate.tasks = [...project.tasks, task]
        setProject(projectUpdate)
    }
    const deleteTaskSProject = task => {
        //delete task
        const projectUpdate = {...project}
        projectUpdate.tasks = projectUpdate.tasks.filter( taskState => 
        taskState._id !== task._id)
        setProject(projectUpdate)
    }
    const editTaskSProject = task => {
        //add task of state
        const projectUpdate = {...project}
        projectUpdate.tasks = projectUpdate.tasks.map( taskState => 
        taskState._id === task._id ? task : taskState )
        setProject(projectUpdate)
    }
    const changeTaskSProject = task => {
        //change task of state
        const projectUpdate = {... project}
        projectUpdate.tasks = projectUpdate.tasks.map( taskState => 
            taskState._id === task._id ? task : taskState)
            setProject(projectUpdate)
    }
    const logoutProjects = () => {
        setProjects([])
        setProject({})
        setAlert({})
    }
    return (
        <ProjectContext.Provider
        value={{
            projects,
            showAlert,
            alert,
            submitProject,
            getProject,
            project,
            load,
            deleteProject,
            modalFormTask,
            handleModalTask,
            submitTask,
            handleModalEditTask,
            task,
            handleModalDeleteTask,
            modalDeleteTask,
            deleteTask,
            submitCollaborator,
            collaborator,
            addCollaborator,
            handleModalDeleteCollaborator,
            modalDeleteCollaborator,
            deleteCollaborator,
            completeTask,
            handleSearcher,
            searcher,
            submitTaskSProject,
            deleteTaskSProject,
            editTaskSProject,
            changeTaskSProject,
            logoutProjects,
        }}>

            {children}

        </ProjectContext.Provider>
    )
}
export {
    ProjectProvider
}
export default ProjectContext;