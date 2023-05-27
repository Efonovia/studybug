import { FcGoogle } from "react-icons/fc"
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, } from "firebase/auth"
import { auth } from "../../utils/firebase"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import React from "react";
import { login, signup } from "../../hooks/register.hooks";
import { setUser } from "../../state/state";
import "../../styles/login.css"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import logo from "../../images/logo.svg"
import Navbar from "../../components/app/Navbar";



function Login() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const [userDetails, setUserDetails] = React.useState({
        email: "",
        password: ""
    })
    const googleProvider = new GoogleAuthProvider()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            console.log(result)
            const userData = await signup({
                firstName: result.user.displayName,
                lasName: "",
                email: result.user.email,
                password: "",
                picturePath: result.user.photoURL
            })
            console.log(userData)
            dispatch(setUser({ user: userData.body }))

            navigate("/dashboard", { replace: true })
        } catch (error) {
            console.error(error);
        }
    }

    function handleChange(event) {
        const { value, name } = event.target;
        console.log({ value, name })
        setUserDetails(prevUserDetails => {
            return {
                ...prevUserDetails,
                [name]: value,
            }
        })
    }

    async function submitDetails(e) {
        console.log(userDetails)
        e.preventDefault() 
        handleOpen()
        const response = await login(userDetails)
        if(response.valid) {
            signInWithEmailAndPassword(auth, userDetails.email, userDetails.password)
            .then(userCredentials => {
                console.log(response)
                dispatch(setUser({ user: response.body }))
                navigate("/dashboard", { replace: true })
                console.log(userCredentials)
            }).catch(err => alert(err.message)) //! DISPLAY ERRORS IN A UI FRIENDLY WAY INSTEAD OF ALERT()
        }
    }


    return (
        <>
        <Navbar />
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
        <div className="main">
            <img src={logo} alt=""></img>
            <h1 className="h1">Login</h1>

            <div className="inputs">
            <Box
            component="form"
            sx={{'& > :not(style)': { color: "purple", m: 1, width: '50ch' }, }}
            noValidate
            autoComplete="on">
            <TextField 
            id="filled-basic" 
            label="Email" 
            variant="filled" 
            type="email"
            className="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
            required/></Box>

            <Box
            component="form"
            sx={{'& > :not(style)': { m: 1, width: '50ch' }, }}
            noValidate
            autoComplete="on">
            <TextField 
            id="filled-basic" 
            label="Password" 
            variant="filled" 
            type="password"
            className="password"
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
            required/></Box>
                <div className="problem">

            <p style={{"textAlign": "center", width: "400px"}}>By clicking Log in, you accept StudyBug’s Terms of Service and Privacy Policy</p>
            <Stack spacing={2} direction="row">
                <Button onClick={submitDetails} sx={{bgcolor: "purple"}} className="login-button"variant="contained">Login</Button>
            </Stack>
            <h2 style={{"textAlign": "center", width: "400px"}}>or</h2>
            <Stack spacing={2} direction="row">
                <Button onClick={GoogleLogin} sx={{bgcolor: "purple"}} startIcon={<FcGoogle />} className="login-button"variant="contained">Login with Google</Button>
            </Stack>
                </div>
        </div>

        </div>
        </>
    )
}


export default Login

