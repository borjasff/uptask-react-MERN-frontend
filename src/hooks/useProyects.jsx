import { useContext } from "react";
import ProyectContext from "../context/ProyectProvider";

const useProyects = () => {
    return useContext(ProyectContext)
}

export default useProyects;