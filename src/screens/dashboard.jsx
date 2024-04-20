import { useContext, useState } from "react";
import Profile from "../components/dashboard/Profile";
import {UserContext} from "../context/UserContext";
import { Container } from "@mui/material";
import MyEvent from "../components/dashboard/MyEvents";
import CreateEventModal from "../components/modals/CreateEventModal";
import { AnimatePresence } from "framer-motion";

/* 
Profile
My Events
Invitations
Requests
Calender
*/
const Dashboard = () => {
    const {user,setUser} = useContext(UserContext)
    
    return (
    
    <>
        <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'flex-start',width:'100vw',margin:0}}>
       
       <Container >
           <Profile />
           <div>
                <p>Event Organized</p>
                <p>250</p>
           </div>
           <div className="edit">
               
           </div>
       </Container>
       <MyEvent sessionId={user.sessionId}/>
   </div>
    </>
);
}
 
export default Dashboard;
