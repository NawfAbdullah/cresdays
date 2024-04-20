import axios from "axios";
import {  useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import '../../styles/eventcard.css'
import { useNavigate, useNavigation } from "react-router-dom";

const EventCard = ({eventId,sessionId}) => {

    // const {user} = useContext(UserContext)
    const [cookie] = useCookies()
    const [isLoading,setIsLoading] = useState(false)
    const [event,setEvent] = useState({ 
        name:'',
        numberOfPeople:0,
        poster:'',
        dept:'',
        start: new Date(),
        end:new Date()
    })
    let navigate = useNavigate()
    useEffect(()=>{
        const getDate = async ()=>{
            setIsLoading(true);
            try {
                
                const response = await axios.get(`https://event-management-backend.up.railway.app/api/event/get-one?id=${eventId}`,{headers:{
                    'session_token':sessionId
                }});
                if(response.status === 200){
                    setEvent({
                        name:response.data.name,
                        start:new Date(response.data.date_from),
                        end:new Date(response.data.date_to??response.data.date_from),
                        poster:response.data.img,
                        dept:response.data.department
                    })
                    setIsLoading(false)
                }else{
                    console.log(response.body);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getDate();

    },[eventId])
    var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    return ( isLoading? <>loading</>:<div className="eventcard" onClick={()=>{
        navigate(`/event/${eventId}`)
    }}>
        <img src={event.poster} alt={event.name} />
        <div className="right">
            <h3>{event.name}</h3>
            <p>{event.start.getDate()} {month[event.start.getMonth()]} - {event.start!==event.end&&`${event.end.getDate()} ${month[event.end.getMonth()]}`}</p>
        </div>
    </div> );
}
 
export default EventCard;