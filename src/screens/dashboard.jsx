import { useContext, useEffect, useState } from "react";
import Profile from "../components/dashboard/Profile";
import {UserContext} from "../context/UserContext";
import { Container } from "@mui/material";
import MyEvent from "../components/dashboard/MyEvents";
import CreateEventModal from "../components/modals/CreateEventModal";
import { AnimatePresence } from "framer-motion";
import DatePicker from 'react-date-picker';
import '../styles/jujuju.css'
import axios from "axios";
import EventCard from "../components/cards/EventCard";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const {user} = useContext(UserContext)
    const buluku = new Date()
    const [date,setDate] = useState(`${buluku.getFullYear()}-${buluku.getMonth()}-${buluku.getDate()}`)
    const [listOfEvents,setListOfEvents] = useState([])
    const [cookie,addCookie,removeCookie] = useCookies()
    let navigate = useNavigate()
    useEffect(()=>{
        const getData = async ()=>{
            console.log('assshooooooollllllllleeeeeeeee');
            var x = `https://event-management-backend.up.railway.app/api/event/get-on-date?date=${date}&include_sub_events=0`
            console.log(x);
            const response = await axios.get(
                x,
                {headers:{'admin-access-code':'044453c2-e45a-4c5d-91b5-c3c14a483d61'}})
            console.log(response.data);
            if(response.status == 200){
                setListOfEvents(response.data)
            }
        }
        getData()
    },[date])


    return (
    
    <>
    <button className="floating" onClick={()=>{
                            removeCookie("name")
                            removeCookie("email")
                            removeCookie("user_id")
                            removeCookie('profile')
                            removeCookie('type')
                            navigate('/')
    }}>Logout</button>
    <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'flex-start',width:'100vw',margin:0}}>
       <Container >
           <Profile />
           <div className="calendarevents">
            <input type="date" autoFocus onChange={(e)=>setDate(e.target.value)} value={date}/>
            {/* <DatePicker calendarClassName='shakir' onChange={e=>setDate(e)} value={date} isOpen={true} />    */}
            <div className="listOfEventsOnDate">
                {listOfEvents.length==0?<p>No events available</p>: listOfEvents.map(e=><EventCard eventId={e.data._id} sessionId={cookie.sessionId}/>)}
            </div>
           </div>
       </Container>
       <MyEvent sessionId={user.sessionId}/>
   </div>
    </>
);
}
 
export default Dashboard;
