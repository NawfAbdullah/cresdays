import Modal from "./Modal";
import '../../styles/createEvent.css'
import { CalendarMonth, NearMe } from "@mui/icons-material";
import { useState } from "react";
import EventCard from "../cards/EventCard";
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import DateInput from "../Inputs/DateInput"; 
import SubmitButton from '../buttons/SubmitButton'
import axios from "axios";
import { useCookies } from "react-cookie";
import ImageUploader from "../Inputs/FileUploader";

const CreateEventModal = ({setIsOpen}) => {
    const [eventName,setEventName] = useState('')
    const [department,setDepartment] = useState('')
    var x = new Date()
    const [date,setDate] = useState(`${x.getFullYear()}-${x.getMonth()+1}-${x.getDay()}`)
    const [endDate,setEndDate] = useState(`${x.getFullYear()}-${x.getMonth()+1}-${x.getDay()}`)
    const [fileString,setFileString] = useState('')
    const [cookie] = useCookies() 
    function getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setFileString(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
   }
   
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
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={department}
                label="Department"
                onChange={(value)=>{console.log(value.target.value); setDepartment(value.target.value)}}
            >
                <MenuItem value={'cse'}>CSE</MenuItem>
                <MenuItem value={'Biotech'}>Biotech</MenuItem>
                <MenuItem value={'ece'}>ECE</MenuItem>
                <MenuItem value={'mech'}>Mech</MenuItem>
            </Select>
            </FormControl>

            <div className="datefield">
                <DateInput value={date} onChange={(e)=>{
                  console.log(e);
                  setDate(e)}}/>
                <DateInput value={endDate} onChange={(e)=>setEndDate(e)}/>
            </div>
         
        </div>
        <SubmitButton onClick={async ()=>{
          try {
            
            const response = await axios.post('https://event-management-backend.up.railway.app/api/event/create',{
              name:eventName,
              date_from:date,
              date_to:(date==endDate||endDate==`${x.getFullYear()}-${x.getMonth()+1}-${x.getDay()}`)?null:endDate,
              img:fileString,
            department:department
          },{headers:{
            session_token:cookie.sessionId
          }})
          
          console.log({
            name:eventName,
            date_from:date,
            date_to:(date==endDate||endDate==`${x.getFullYear()}-${x.getMonth()+1}-${x.getDay()}`)?null:endDate,
            img:fileString,
            department:department
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
 
export default CreateEventModal;