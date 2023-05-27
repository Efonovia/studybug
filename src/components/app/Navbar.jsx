import React from "react";
import "../../styles/navbar.css"
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/system';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import logo from "../../images/logo.svg"

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: purple;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: purple;
    color: white
  }

  &:focus {
    color: #fff;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: purple;
    color: white;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
  min-width: 400px;
  background-color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  `,
);



function Navbar(props) {
  function SectionTools() {
    return (
      <div>
        <TabsUnstyled
          defaultValue={0}
          selectionFollowsFocus
        >
          <TabsList>
            <Tab onClick={() => (props.homeRef && props.homeRef.current.scrollIntoView({ behavior: 'smooth' })) || navigate("/")}>Home</Tab>
            <Tab onClick={() => (props.featuresRef && props.featuresRef.current.scrollIntoView({ behavior: 'smooth' })) || navigate("/")}>Features</Tab>
            <Tab>Help</Tab>
          </TabsList>
        </TabsUnstyled>
      </div>
    );
  }
  const navigate = useNavigate()

  return <div className="nav">
    <img src={logo} className="logo" alt=""></img>
    <SectionTools />
    <div className="auth">
      <div onClick={() => navigate("/auth/login")}>Login</div>
      <div onClick={() => navigate("/auth/signup")}>Sign up</div>
    </div>
  </div>
}


export default Navbar