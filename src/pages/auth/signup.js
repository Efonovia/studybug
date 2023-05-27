import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import React from "react"
import { FcGoogle } from "react-icons/fc"
import { auth } from "../../utils/firebase"
import { signup } from "../../hooks/register.hooks"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUser } from "../../state/state"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "../../styles/login.css"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import logo from "../../images/logo.svg"
import Navbar from "../../components/app/Navbar";


function Signup() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const [userDetails, setUserDetails] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        picturePath: ""
    })

    const [ user ] = useAuthState(auth) 
    const googleProvider = new GoogleAuthProvider()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            console.log(result)
            const response = await signup({
                firstName: result.user.displayName,
                lastName:  JSON.stringify(Math.floor(Math.random()*10000) + 10),
                email: result.user.email,
                password: "",
                picturePath: result.user.photoURL
            })
            console.log(response)
            dispatch(setUser({ user: response.body }))

            navigate("/dashboard", { replace: true })
        } catch (error) {
            console.error(error);
        }
    }

    function handleChange(event) {
        const { value, name } = event.target;
        setUserDetails(prevUserDetails => {
            return {
                ...prevUserDetails,
                [name]: value,
            }
        })
        console.log(userDetails)
    }

    async function submitDetails(e) {
        console.log(userDetails)
        e.preventDefault()
        handleOpen()
        createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password)
        .then(userCredentials => {
            console.log(userCredentials)
            setUserDetails(prevUserDetails => {
                return {
                    ...prevUserDetails,
                    picturePath: userCredentials.user.photoURL,
                }
            })
            
        })
        .catch(err => {
            console.log(err.message)
            if(err.message === "Firebase: Error (auth/email-already-in-use).") {
                console.log("User already exists. Log in instead")
            }
        })

        const response = await signup(userDetails)
        console.log(response)
        dispatch(setUser({ user: response.body }))
    }

    React.useEffect(() => {
        if(user) {
            
            navigate("/dashboard", { replace: true })
        }
    })

    return (
        <>
            <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
        <Navbar />
        <div className="signup-area">
            <img src={logo} alt=""></img>
            <h1>Signup</h1>

            <div className="inputs">
                <Box
                component="form"
                sx={{'& > :not(style)': { color: "purple", m: 1, width: '50ch' }, }}
                noValidate
                autoComplete="on">
                <TextField 
                id="filled-basic" 
                label="Firstname" 
                variant="filled" 
                type="text"
                className="firstname"
                placeholder="Enter your first name"
                name="firstName"
                onChange={handleChange}
                required/></Box>

                <Box
                component="form"
                sx={{'& > :not(style)': { color: "purple", m: 1, width: '50ch' }, }}
                noValidate
                autoComplete="on">
                <TextField 
                id="filled-basic" 
                label="Lastname" 
                variant="filled" 
                type="text"
                className="lastname"
                placeholder="Enter your last name"
                name="lastName"
                onChange={handleChange}
                required/></Box>

                <Box
                component="form"
                sx={{'& > :not(style)': { color: "purple", m: 1, width: '50ch' }, }}
                noValidate
                autoComplete="on">
                <TextField 
                id="filled-basic" 
                label="Email" 
                variant="filled" 
                type="text"
                className="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                required/></Box>

                <Box
                component="form"
                sx={{'& > :not(style)': { color: "purple", m: 1, width: '50ch' }, }}
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

                <p style={{"textAlign": "center", width: "400px"}}>By clicking Signup, you accept StudyBug’s Terms of Service and Privacy Policy</p>

                <Stack spacing={2} direction="row">
                    <Button onClick={submitDetails} className="login-button"variant="contained">Sign up</Button>
                </Stack>            
            <h2 style={{"textAlign": "center", width: "400px"}}>or</h2>
            <Stack spacing={2} direction="row">
                <Button onClick={GoogleLogin} startIcon={<FcGoogle />} className="login-button"variant="contained">Sign up with Google</Button>
            </Stack>
                </div>

            </div>
        </>
    )
}


export default Signup