import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import '../../styles/profile.css'
import { AnimatePresence } from "framer-motion";
import CreateEventModal from "../modals/CreateEventModal";
import { useCookies } from "react-cookie";
import ProfilePic from '../../assets/images/profile.jpg'
import SubmitButton from "../buttons/SubmitButton";

const Profile = ({sessionId}) => {
    const {user,setUser} = useContext(UserContext)
    const [cookie] = useCookies()
    const [modalOpen,setModalOpen] = useState(false)
    console.log(

        cookie.profile
    );
    return ( 
    <>
    
        <div style={{position:'absolute'}}>
        <AnimatePresence
                initial={false}    
                onExitComplete={() => null}
            >
            {modalOpen && <CreateEventModal setIsOpen={setModalOpen}/>}
        </AnimatePresence>
        </div>
    <section id="profile">
        <div className="container">
            <img className="profilepic" src={cookie.profile??ProfilePic} alt="" />
            <div className="details">
                <h1>Hi {user.name}</h1>
                <p>{user.type}</p>
            </div>
        </div>
        <SubmitButton onClick={()=>setModalOpen(true)}>Create Event</SubmitButton>
    </section> 
    </>
    );
}
 
export default Profile;