import Modal from "./Modal";
import '../../styles/createEvent.css'
import { CalendarMonth, NearMe } from "@mui/icons-material";
import { useState } from "react";
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import DateInput from "../Inputs/DateInput"; 
import SubmitButton from '../buttons/SubmitButton'
import axios from "axios";
import { useCookies } from "react-cookie";
import ImageUploader from "../Inputs/FileUploader";

const AddSubEventModal = ({setIsOpen,eventId}) => {
    const [eventName,setEventName] = useState('')
    const [description,setDescription] = useState('')
    var x = new Date()
    const [date,setDate] = useState(`${x.getFullYear()}-${x.getMonth()+1}-${x.getDay()}`)
    const [endDate,setEndDate] = useState(`${x.getFullYear()}-${x.getMonth()+1}-${x.getDay()}`)
    const [fileString,setFileString] = useState('')
    const [cookie] = useCookies() 

   
    return ( <Modal handleClose={()=>setIsOpen(false)}>
        <div className="create-inner-container">
        <h2></h2>
        <ImageUploader setImageString={setFileString}/>
        <FormControl sx={{ m: 1, width: '25ch',color:"#000",borderColor:"rgb(86, 50, 203)" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Event Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={'text'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <NearMe />
                  </IconButton>
                </InputAdornment>
              }
              label="Event name"
              value={eventName }
              onChange={(e)=>setEventName(e.target.value)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch',color:"#000",borderColor:"rgb(86, 50, 203)" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Event Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={'text'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <NearMe />
                  </IconButton>
                </InputAdornment>
              }
              label="Event name"
              value={description }
              onChange={(e)=>setDescription(e.target.value)}
            />
          </FormControl>
        </div>
        <SubmitButton onClick={async ()=>{
          try {
            const response = await axios.post('https://event-management-backend.up.railway.app/api/sub-event/create',{
                name:eventName,
                description:description,
                img: fileString,
                event_id:eventId
            },{
            headers:{
            session_token:cookie.sessionId
          }})      
          console.log({
            name:eventName,
          
            img:fileString,

          });
          
          if(response.status==200){
            setIsOpen(false)
          }
          
        } catch (error) {
          console.log(error);
        }
        }} children={"Submit"} />

    
    </Modal>  );
}
 
export default AddSubEventModal;