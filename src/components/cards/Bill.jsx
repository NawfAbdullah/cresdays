import '../../styles/bill.css'
import Profile from '../../assets/images/profile.jpg'

const Bill = ({bill}) => {
    return ( <div className="bill">
        <div className="user_details">
            <img src={bill.uploaded_by.profile||Profile} alt=""/>
            <h4>{bill.uploaded_by.name}</h4>
        </div>
        <p>{bill.description}</p>
        <img src={bill.img} alt="" className="main-image" />
        <div>
        {bill.status!== 'waiting'&&<p>Treasurer: {bill.message_from_treasurer}</p>}
        </div>
    </div> );
}
 
export default Bill;

// amount
// : 
// 300
// bill_responded_date
// : 
// "2024-04-19T17:48:52.925Z"

// bill_uploaded_date
// : 
// "2024-04-15T18:39:24.575Z"
// description
// : 
// "gulu gulu gulu"
// img
// : 
// "https://cisc-media.s3.ap-south-1.amazonaws.com/bill-img/61ebd7c7-5b68-4d94-8d5c-35e3d9334b93.png"
// is_hard_copy_submitted
// : 
// false
// message_from_treasurer
// : 
// "nice"
// status
// : 
// "accepted"
// uploaded_by
// : 
// {_id: '661d4687a6bf29c2b58cfcb9', type: 'studentcoordinator', email: 'coor@gmail.com', name: 'Nawf', profile: null}
// _id
// : 
// "6622aaae1f246d9d88bf82fd"