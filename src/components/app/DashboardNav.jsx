import React from "react";
import BasicTabs from "../../components/app/Tabpanel";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { FcQuestions, FcReadingEbook } from "react-icons/fc";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { auth } from "../../utils/firebase";
import sessionLogo from "../../images/studysession.png"
import logo from "../../images/logo.svg"
import pfp from "../../images/avatar.png"


function DashboardNav(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


    return <div className="dashboard-nav-wrapper">
    <div className="dashboard-nav">
    <img alt="" src={logo}></img>
    <BasicTabs sx={{position: "absolute", left: "100px"}} />
    <SpeedDial
    direction="down"
    ariaLabel="SpeedDial basic example"
    sx={{ position: 'absolute', top: 8, right: 300 }}
    icon={<SpeedDialIcon />}
  >
    <SpeedDialAction
      onClick={props.createNewStudySession}
      key={"session"}
      icon={<FcReadingEbook size={50}/>}
      tooltipTitle={"session"}
    />
    <SpeedDialAction
      key={"notes"}
      icon={<FcQuestions size={50}/>}
      tooltipTitle={"notes"}
    />
    
  </SpeedDial>

  <Avatar sx={{position: "absolute", left: "850px"}} onClick={handleClick} alt="Remy Sharp" src={pfp} />
  <Menu
  id="basic-menu"
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
  MenuListProps={{
    'aria-labelledby': 'basic-button',
  }}
>
  <MenuItem onClick={handleClose}>Profile</MenuItem>
  <MenuItem onClick={handleClose}>settings</MenuItem>
  <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
</Menu>
  </div>
  </div>

}


export default DashboardNav