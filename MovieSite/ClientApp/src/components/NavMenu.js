
import React from 'react';
import { Navbar, NavbarBrand, NavItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import UserIcon from "./Images/user.png"
import SearchIcon from "./Images/Search.png"
// import SearchIcon from "./Images/SearchLogo.png"
import './NavMenu.css';
import {ModalWindow} from "./ModalWindow/ModalWindow";
import {AuthenticationPage} from "./AuthenticationPage/AuthenticationPage";
import {MainPopUpMenu} from "./MainPopUpMenu/MainPopUpMenu";

export function NavMenu() {

  const [isLoggedIn] = React.useState(
      Boolean(localStorage.getItem("User"))
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isActive, setIsActive] = React.useState(false);

return (
  <header>
    <Navbar className="he" light>
    {/*<Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>*/}
    {/*  <Container>*/}
          {/*<NavbarBrand tag={Link} to="/">BooMBooK</NavbarBrand>*/}
          <NavbarBrand tag={Link} to="/">
              <div className="funcybtn">
                MovieSite
              </div>

          </NavbarBrand>
          <NavbarBrand tag={Link} to="/Search/">
              <img src={SearchIcon} className="SearchIcon"/>

          </NavbarBrand>

        {/*<NavbarToggler onClick={toggleNavbar} className="mr-2"/>*/}
        {/*<Collapse className="d-sm-inline-flex flex-sm-row-reverse"*/}
          {/*          isOpen={!isCollapsed} navbar>*/}
          <ul className="navbar-nav flex-grow">
            {
              !isLoggedIn &&
              (
                  <NavItem onClick={ ()=> setIsActive(true) }>
                      <img src={UserIcon}
                           className="menuItemIcon center"
                           alt="UserIcon"/>
                    <ModalWindow active = {isActive}
                                 setActive={setIsActive}>
                      <AuthenticationPage/>
                    </ModalWindow>
                  </NavItem>
              )
            }
            {
              isLoggedIn &&
              (
                  <NavItem>
                    <div>
                      <img aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
                           src={UserIcon}
                           className="menuItemIcon center"
                           alt="UserIcon"/>
                           <MainPopUpMenu anchorEl={anchorEl}
                                          handleClose={handleClose}/>
                      {/*<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>*/}
                      {/*  Open Menu*/}
                      {/*</Button>*/}
                      {/*<Menu id="simple-menu"*/}
                      {/*    anchorEl={anchorEl}*/}
                      {/*    keepMounted*/}
                      {/*    open={Boolean(anchorEl)}*/}
                      {/*    onClose={handleClose} >*/}
                      {/*  <MenuItem onClick={handleClose}>Profile</MenuItem>*/}
                      {/*  <MenuItem onClick={handleClose}>My account</MenuItem>*/}
                      {/*  <MenuItem onClick={handleClose}>Logout</MenuItem>*/}
                      {/*</Menu>*/}
                    </div>
                  </NavItem>
              )
            }
          </ul>
        {/*</Collapse>*/}
      {/*</Container>*/}
    </Navbar>
  </header>
);

}
