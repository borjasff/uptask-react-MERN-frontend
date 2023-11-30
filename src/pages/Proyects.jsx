import useProyects from "../hooks/useProyects"

const Proyects = () => {
  const { proyects} = useProyects()
  
  return (
    <>
        <h1 className='text-4xl font-black'>Proyects</h1>

        <div>

        </div>
    </>
  )
}

export default Proyects