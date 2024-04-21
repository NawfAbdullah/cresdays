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
import SubEventSummary from "./SubEventSummary";

  

const EventScreen = () => {
    const params = useParams()
    const [event,setEvent] = useState({})
    const [cookie] = useCookies()
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [secNum,setSecNum] = useState(-1)
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
        <div className="list-of-subevents" style={{textAlign:'left'}}>
            <h2>Sub Events</h2>
            {event?.sub_events?.map((e,i)=><div className="sub-event" onClick={()=>setSecNum(i)}>
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
            {secNum==-1?<Summary eventId={params.eventId} eventname={event?.name} eventPic={event?.img} dateFrom = {event?.date_from} dateTo = {event?.date_to}/>:<SubEventSummary subEvent={event?.sub_events[secNum]} eventId={params.eventId}/>}
        </div>
    </section>
     );
}
 
export default EventScreen;