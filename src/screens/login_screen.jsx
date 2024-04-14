import '../styles/login.css'
import { EmailOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import axios from 'axios';
import { useContext, useState } from "react";
import Event from '../assets/images/amusement3.svg'
import Logo from '../assets/images/logo.png'
import { useCookies } from 'react-cookie';
import { UserContext } from '../context/UserContext';
import { useNavigate, useNavigation } from 'react-router-dom';


const LoginScreen = () => {
    const [showPassword,setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const handleMouseDownPassword = (event) => {

      event.preventDefault();
    };
    const [isLoading,setIsLoading] = useState(false)
    const [cookie,setCookie] = useCookies()
    const {user,setUser} = useContext(UserContext)
    let navigate = useNavigate()
    return <div id="login">
       <div className="left">
        <h1>Cresdays</h1>
        <h3>Uniting crescentians</h3>
        <img src={Event} alt="banner" id="banner_image" />
        <p>Developed by <a href='#'>Shakir</a> and <a href='#'>Zameel</a></p>
       </div>
       <div className="right">
          <img src={Logo} alt='crescent institute logo'/>
        <div className="form">
          <h2>Login</h2>
          <p style={{color:'red'}}>{error}</p>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type='text'
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <EmailOutlined />
                  </IconButton>
                </InputAdornment>
              }
              label="Email"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch',color:"#000",borderColor:"rgb(86, 50, 203)" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              value={password }
              onChange={(e)=>setPassword(e.target.value)}
            />
          </FormControl>
          {isLoading?<p>Loading...</p>: <Button  variant='contained' onClick={async ()=>{
            try {
              setIsLoading(true)
              const response = await axios.post('https://event-management-backend.up.railway.app/api/auth/log-in',{
                email,password
              });
              if(response.status === 200){
                console.log(response.data);
                setCookie('sessionId',response.data.session_token)
                
                try{

                  const userResponse = await axios.post("https://event-management-backend.up.railway.app/api/auth/verify-session",{
                    "session_token": response.data.session_token
                  },)
                  if(userResponse.status===200){
                    console.log(userResponse.data)
                    setUser(userResponse.data)
                    setCookie("name",userResponse.data.name)
                    setCookie("email",userResponse.data.email)
                    setCookie("user_id",userResponse.data._id)
                    setCookie('profile',userResponse.data.profile)
                    setCookie('type',userResponse.data.type)
                    setUser({
                      "name":userResponse.data.name,
                      "email":userResponse.data.email,
                      "user_id":userResponse.data._id,
                      'profile':userResponse.data.profile,
                      'type':userResponse.data.type,
                      "sessionId":response.data.session_token

                    })
                    navigate('/home')

 
                  }
                }catch(err){
                  setIsLoading(false)
                  setError(err.response.data.err_msg)
                }
              }
            } catch (error) {
              setIsLoading(false)
              setError(error.response.data.err_msg);
            }
          }}>
              Submit
          </Button>}
        </div>
       </div>
    </div>;
}
 
export default LoginScreen;



