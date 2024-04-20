import './Buttons.css'
import { Button } from "@mui/material";

const SubmitButton = ({children,onClick}) => {
    return ( <Button variant='contained' onClick={onClick}>{children}</Button> );
}
 
export default SubmitButton;
