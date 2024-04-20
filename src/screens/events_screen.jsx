/*

SubEvents
    Bills
    Participants
    Add Participants
    Upload bills
Organizers

*/

import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import '../styles/EventScreen.css'
import SubmitButton from "../components/buttons/SubmitButton";
import { Summary } from "./Summary";
import CreateEventModal from "../components/modals/CreateEventModal";
import { AnimatePresence } from "framer-motion";
import AddSubEventModal from "../components/modals/AddSubEventModal";

  

const EventScreen = () => {
    const params = useParams()
    const [event,setEvent] = useState({})
    const [cookie] = useCookies()
    const [isModalOpen,setIsModalOpen] = useState(false)
    useEffect(()=>{
        const getData = async ()=>{
            const response = await axios.get(`https://event-management-backend.up.railway.app/api/event/get-one?id=${params.eventId}`,{headers:{
                session_token: cookie.sessionId
            }})
            console.log(response.data);
            setEvent(response.data);
        }
        getData()
    },[])
    return (
    <section id="event">
        <div style={{position:'absolute'}}>
        <AnimatePresence
                initial={false}    
                onExitComplete={() => null}
            >
            {isModalOpen && <AddSubEventModal setIsOpen={setIsModalOpen} eventId={params.eventId}/>}
        </AnimatePresence>
        </div>
        <div className="list-of-subevents">
            {event?.sub_events?.map(e=><div className="sub-event">
            <img src={e.img} alt="" />
            <div className="right">
                <h3>{e.name}</h3>
                <p>{e?.description.slice(0,80)}</p>
            </div>
        </div>)}
            <div className="create-sub-event-container">
                <SubmitButton onClick={()=>setIsModalOpen(true)}>Add SubEvent</SubmitButton>
            </div>
        </div>
        <div className="mainscreen">
            <Summary eventId={params.eventId} eventname={event?.name} eventPic={event?.img} dateFrom = {event?.date_from} dateTo = {event?.date_to}/>
        </div>
    </section>
     );
}
 
export default EventScreen;