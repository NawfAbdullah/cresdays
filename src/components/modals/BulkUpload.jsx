import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loader from "../Loaders/Loader";

const BulkUpload = ({setIsOpen,eventId,subEventId}) => { 
    
    const [file, setFile] = useState()
    const [cookie] = useCookies()
    const [isLoading,setIsLoading] = useState(false)
    const [isSuccess,setIsSuccess] = useState(false)
    const [error,setError] = useState('')

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  async function handleSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    const url = 'https://event-management-backend.up.railway.app/api/participant/add-csv';
    const formData = new FormData();
    formData.append('csv_file', file);
    formData.append('event_id',eventId);
    formData.append('sub_event_id',subEventId)
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',     
        session_token:cookie.sessionId
    },
    };
    try{
      const response = await axios.post(url, formData, config)
      setIsLoading(false)
    }catch(err){
      setIsLoading(false)
      console.log(err.response.data);
      setError(err.response.data.err_msg+", It's user number " + (Number(err.response.data.field.split('.')[1])-1).toString())
    }
    }
    return (<Modal handleClose={()=>setIsOpen(false)}>
        {isLoading?<Loader />:<><form onSubmit={handleSubmit}>
          <h1>Upload Participants</h1>
          <p>{error}</p>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form></>}
        </Modal>);
}
 
export default BulkUpload;