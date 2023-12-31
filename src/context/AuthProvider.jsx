import { useEffect, useState, createContext } from "react";
//import { useNavigate} from "react-router-dom"
import clientAxios from "../config/clientAxios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth ] = useState({});
    const [charged , setCharged] = useState(true);


    useEffect(() =>{
        //to verify user
        const verifyUser = async () => {
                const token = localStorage.getItem('token');
            if(!token){
                setCharged(false);
                return
            }
            else{
                //config user
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                try {
                    
                    const { data} = await clientAxios('/users/profile', config);

                    setAuth(data);
                    //navigate("/projects");
                    
                } catch (error) {
                    console.log(error);
                } finally{
                setCharged(false);
                }
            }
        }
        verifyUser();
    }, [])

    const logoutAuth = () => {
        setAuth({})
    }
    return (
        <AuthContext.Provider
            value={{
                    auth,
                    setAuth,
                    charged,
                    logoutAuth
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