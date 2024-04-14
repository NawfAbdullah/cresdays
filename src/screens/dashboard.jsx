import { useContext } from "react";
import Profile from "../components/dashboard/Profile";
import {UserContext} from "../context/UserContext";

/* 
Profile
My Events
Invitations
Requests
Calender
*/
const Dashboard = () => {
    const {user,setUser} = useContext(UserContext)
    return (<>
    {user.sessionId}
    </>);
}
 
export default Dashboard;
