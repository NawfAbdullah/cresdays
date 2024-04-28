import { useCookies } from 'react-cookie'
import Leader from '../assets/images/leader.png'
import '../styles/EventScreen.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Bill from '../components/cards/Bill'
import Branch from '../assets/images/branch.png'
import Loader from '../components/Loaders/Loader'
import VolunteerCard from '../components/cards/Volunteer'
import SubmitButton from '../components/buttons/SubmitButton'
import BulkUpload from '../components/modals/BulkUpload'

const SubEventSummary = ({subEvent,eventId,treasurer_id}) => {
    const [cookie] = useCookies()
    const [subSummary,setSubSummary] = useState({})
    const [bills,setBills] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [openModel,setOpenModel] = useState(false)
    const [particpants,setParticipants] = useState([])
 
    useEffect(()=>{

        const getData = async ()=>{
            try{
                setIsLoading(true)
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
                setIsLoading(false)
                if(billRes.status === 200){
                    console.log(billRes.data.bills||billRes.data.your_bills);
                    setBills(billRes.data.bills||billRes.data.your_bills);
                    console.log('dadadadadadaaaaaaaaa');
                    console.log(subEvent)
                    console.log(subSummary);
                }
                const participantResponse = await axios.get(`https://event-management-backend.up.railway.app/api/participant/get-all?event_id=${eventId}&sub_event_id=${subEvent._id}`,{headers:{'session_token':cookie.sessionId}})
                setIsLoading(false)
                console.log('dgrdgesfesssssssssssssssssssssssffffffffffffffffdddddddddd')
                setParticipants(participantResponse.data.participants);
            }catch(err){
                
                console.log(err);
            }
        }
        getData()
        
    },[subEvent,eventId])

    const centerStyle = {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100%'
    }
   
   return ( 
    <>
    {openModel&&<BulkUpload setIsOpen={setOpenModel} eventId={eventId} subEventId={subEvent._id}></BulkUpload>}
   <section id='sub'>
    
        <div className="top left">
            <div className='bulu'>
                <img src={subEvent.img} alt="" />
                <div className="right">
                    <SubmitButton onClick={()=>setOpenModel(true)}> Upload</SubmitButton>
                    <img style={{width:'50px',height:'50px'}} src={Leader} alt="" />
                    <h1>{subEvent.name}</h1>
                    <p className='evm'>Event Manager : {subEvent.event_manager?.name}</p>
                    <p className='desc'>{subEvent.description}</p>
                </div>
            </div>
            <div className="status volun">
                <h4>Volunteers</h4>
                {isLoading?<div style={centerStyle}><Loader /></div> :subSummary.volunteering_team?.members.length>0?subSummary.volunteering_team?.members.map(e=><VolunteerCard volunteer={e} />) :<div style={centerStyle}><img className='bijuku' src={Branch} alt=''/> <p>No members</p></div>}
            </div>
        </div>
        <div className="bottom right">
            <h4>Bills</h4>
           {isLoading?<Loader />:bills.map(bill=><Bill bill={bill} treasurer_id={treasurer_id}/>)}
        </div>

        </section> 
        <div className="participants">
            <table>
                <thead>
                   <tr>

                    <th>Name</th>
                    <th>contact</th>
                    <th>email</th>
                    <th>contact</th>
                    <th>is verified</th>
                   </tr>
                </thead>
                <tbody>
                    {particpants.map(e=><tr>
                        <td>{e.name}</td>
                        <td>{e.contact_no}</td>
                        <td>{e.email}</td>
                        <td>{e.college}</td>
                        <td>{e.is_verified?'verified':'not verified'}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
        </>);
}
 
export default SubEventSummary;

// college
// : 
// "b.s.a"
// contact_no
// : 
// "8899379029"
// email
// : 
// "nawfabu@gmail.com"
// is_self_enrolled
// : 
// false
// is_verified
// : 
// false
// name
// : 
// "nawf"