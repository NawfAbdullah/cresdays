import axios from "axios";
import {  useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import '../../styles/eventcard.css'
import { useNavigate, useNavigation } from "react-router-dom";
import Loader from "../Loaders/Loader";

const EventCard = ({eventId,sessionId}) => {

    const [isLoading,setIsLoading] = useState(false)
    const [event,setEvent] = useState({ 
        name:'',
        numberOfPeople:0,
        poster:'',
        dept:'',
        start: new Date(),
        end:new Date(),
        coor:'',

    })
    const [cookie] = useCookies()
    let navigate = useNavigate()
    useEffect(()=>{
        const getDate = async ()=>{
            setIsLoading(true);
            try {
                
                const response = await axios.get(`https://event-management-backend.up.railway.app/api/event/get-one?id=${eventId}`,{headers:{
                    'session_token':sessionId
                }});
                if(response.status === 200){
                    console.log(response.data);
                    setEvent({
                        name:response.data.name,
                        start:new Date(response.data.date_from),
                        end:new Date(response.data.date_to??response.data.date_from),
                        poster:response.data.img,
                        dept:response.data.department,
                        coor:response.data.student_coordinator?._id||''
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
    return ( isLoading? <><Loader /><br/> </>:<div className="eventcard" onClick={()=>{
       if(cookie.user_id===event.coor||(cookie.type === 'hod'&&event.dept === cookie.dept)){

           navigate(`/event/${eventId}`)
       } else{
        console.log('busuku');
       }
    }}>
        <img src={event.poster} alt={event.name} />
        <div className="right">
            <h3>{event.name}</h3>
            <p>{event.start.getDate()} {month[event.start.getMonth()]} - {event.start!==event.end&&`${event.end.getDate()} ${month[event.end.getMonth()]}`}</p>
        </div>
    </div> );
}
 
export default EventCard;