import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export const Sidebar = () => {

  const { auth} = useAuth();
  console.log(auth)

  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
        <p className="text-xl font-bold">Hola: {auth.name}</p>

        <Link to="/create-proyect" className="bg-sky-600 w-full p-3 uppercase text-white font-bold block mt-5 text-center rounded-lg">New Proyect</Link>
    </aside>
  )
}
