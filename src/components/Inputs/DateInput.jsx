import './inputstyle.css'

const DateInput = ({value,onChange}) => {
    return <input type="date" on onChange={e=>{

        var x = new Date(e.target.value)
        console.log(`${x.getFullYear()}-${x.getMonth()+1}-${x.getDay()}`);
        onChange(`${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}`)
    }}/>;
}
 
export default DateInput;