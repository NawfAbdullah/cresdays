import '../../styles/bill.css'
import Profile from '../../assets/images/profile.jpg'
import { useCookies } from 'react-cookie';
import { Button, Input } from '@mui/material';
import { useState } from 'react';
import SubmitButton from '../buttons/SubmitButton';

const Bill = ({bill,treasurer_id}) => {
    const [cookie] = useCookies()
    const [message,setMessage] = useState('')
    const colorsMap = {
        'accepted':'#6FC276',
        'rejected':'#ee6b6e',
        'waiting':'	#fffa8e'
    }
    return ( <div className="bill">
        <div className="user_details">
            <img src={bill.uploaded_by.profile||Profile} alt=""/>
            <h4>{bill.uploaded_by.name}</h4>
            <div className="badge" style={{borderColor:colorsMap[bill.status],color:colorsMap[bill.status]}}>{bill.status}</div>
        </div>
        <p>{bill.description}</p>
        <img src={bill.img} alt="" className="main-image" />
        <div>
        {bill.status!== 'waiting'&&<p>Treasurer: {bill.message_from_treasurer}</p>}
        {treasurer_id==cookie.user_id&&<><Input placeholder='Message' onChange={e=>setMessage(e.target.value)} value={message}/> <div className="buttonContainer"><SubmitButton>Approve</SubmitButton><Button type="reset">Reject</Button> </div></>}
        </div>
    </div> );
}
 
export default Bill;