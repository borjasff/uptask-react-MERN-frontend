import { useEffect, useState, createContext } from "react";
import { useNavigate} from "react-router-dom"
import clientAxios from "../config/clientAxios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth ] = useState({});
    const [charged , setCharged] = useState(true);

    useEffect(() =>{
        const verifyUser = async () => {
                const token = localStorage.getItem('token');
            if(!token){
                setCharged(false);
                return
            }
            else{

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                try {
                    const { data} = await clientAxios('/users/profile', config);

                    setAuth(data);
                    navigate("/proyects");
                    
                } catch (error) {
                    console.log(error);
                } finally{
                setCharged(false);
                }
            }
        }
        verifyUser();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                    auth,
                    setAuth,
                    charged
                }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;