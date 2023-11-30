import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";

const ProyectContext = createContext();

const ProyectProvider = ({children}) => {

    const [proyects, setProyects] = useState([])
    return (
        <ProyectContext.Provider
        value={{
            proyects
        }}>
            {children}
        </ProyectContext.Provider>
    )
}
export {
    ProyectProvider
}
export default ProyectContext;