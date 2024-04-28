import { useEffect, useState } from "react";
import '../../styles/event.css'
import axios from "axios";
import EventCard from "../cards/EventCard";

const MyEvent = ({sessionId}) => {
    const [events,setEvents] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    useEffect(()=>{
        const getData = async ()=>{
            setIsLoading(true);
            try {
                const response = await axios.post('https://event-management-backend.up.railway.app/api/auth/verify-session',{"session_token":sessionId})
                if(response.status===200){
                    setEvents(response.data. events_as_studentcoordinator.concat(response.data.events_as_treasurer,response.data.events_as_eventmanager,response.data.events_as_volunteer,response.data.events_as_hod,response.data.events_as_dean))
                    setIsLoading(false)
                }else{
                    console.log(response.data);
                }
                
            } catch (error) {
                console.log(error);
                setIsLoading(false)
            }

        }
        getData();
    },[])
    return (
    <div className="myevent">
        <h2>My Events</h2>
        {events.map((event)=><EventCard eventId={event} sessionId={sessionId}/>)}
    </div>
    );
}
 
export default MyEvent;