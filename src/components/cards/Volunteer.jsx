import '../../styles/volunteer.css'
import Voluteer from '../../assets/images/volunteer.png'

const VolunteerCard = ({volunteer}) => {
    console.log(volunteer);
    return ( <div className="volunteerCard">
        <img className='profile' src={volunteer.profile||Voluteer} alt="" />
        <p>{volunteer.name}</p>
    </div> );
}
 
export default VolunteerCard;

//<a href="https://www.flaticon.com/free-icons/volunteer" title="volunteer icons">Volunteer icons created by Eucalyp - Flaticon</a>