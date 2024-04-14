import { useState } from "react";
import { createContext} from "react";
import { useCookies } from "react-cookie";

const UserContext = createContext({user:{name:'',email:'',sessionId:'',contact:'',profile:''},setUser:()=>{}})


const UserProvider = ({children})=>{
    const [cookie] = useCookies(null)
    const [user,setUser] = useState({name:cookie.name,email:cookie.email,sessionId:cookie.sessionId,contact:cookie.contact,profile:''})
    return <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
}


export  {UserContext,UserProvider}