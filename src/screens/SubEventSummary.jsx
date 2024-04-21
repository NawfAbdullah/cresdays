import { useCookies } from 'react-cookie'
import Leader from '../assets/images/leader.png'
import '../styles/EventScreen.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Bill from '../components/cards/Bill'

const SubEventSummary = ({subEvent,eventId}) => {
    const [cookie] = useCookies()
    const [subSummary,setSubSummary] = useState({})
    const [bills,setBills] = useState([])

    useEffect(()=>{

        const getData = async ()=>{
            try{

                console.log(subEvent);
                const response = await axios.get(`https://event-management-backend.up.railway.app/api/event/summary?id=${eventId}`,{headers:{session_token:cookie.sessionId}})
                if(response.status == 200){
                    for (let i = 0; i < response.data.sub_events.length; i++) {
                        if(response.data.sub_events[i]._id==subEvent._id){
                            setSubSummary(response.data.sub_events[i])
                            break
                        }                        
                    }
                }

                const billRes = await axios.get(`https://event-management-backend.up.railway.app/api/bill/get-all?event_id=${eventId}&sub_event_id=${subEvent._id}`,{headers:{'session_token':cookie.sessionId}})
                if(billRes.status === 200){
                    console.log(billRes.data.bills||billRes.data.your_bills);
                    setBills(billRes.data.bills||billRes.data.your_bills);

                }else{

                }
            }catch(err){
                
                console.log(err);
            }
        }
        getData()
    },[])
   
   return ( <section id='sub'>
        <div className="top left">
            <div className='bulu'>
                <img src={subEvent.img} alt="" />
                <div className="right">
                    <img style={{width:'50px',height:'50px'}} src={Leader} alt="" />
                    <h1>{subEvent.name}</h1>
                    <p className='evm'>Event Manager : placeholder</p>
                    <p className='desc'>{subEvent.description}</p>
                </div>
            </div>
            <div className="status">
               {subSummary.volunteering_team?.members.length>0?subSummary.volunteering_team?.members.map(e=><>{e.name}</>) :<div><p>No members yet</p></div>}
            </div>
        </div>
        <div className="bottom right">
           {bills.map(bill=><Bill bill={bill}/>)}
        </div>
        </section> );
}
 
export default SubEventSummary;