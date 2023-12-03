import FormProyect from "../components/FormProyect"

const NewProyect = () => {
  return (
    <>
        <h1 className='text-4xl font-black'>New Proyect</h1>

        <div className='mt-10 flex justify-center'>
            <FormProyect/>
        </div>
    </>
  )
}

export default NewProyect