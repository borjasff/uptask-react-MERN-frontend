import useProyects from "../hooks/useProyects"
import ProyectPrevious from "../components/ProyectPrevious"

const Proyects = () => {
  const { proyects} = useProyects()

  return (
    <>
        <h1 className='text-4xl font-black'>Proyects</h1>

        <div className="bg-white shadow mt-10 rounded-lg ">
          {proyects.length ? 
              proyects.map(proyect =>(
                  <ProyectPrevious 
                      key={proyect._id}
                      proyect={proyect}
                  />
              ))
          
          : <p className="text-center text-gray-600 uppercase p-5">No hay proyectos</p>}
        </div>
    </>
  )
}

export default Proyects