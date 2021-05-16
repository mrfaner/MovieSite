import React from "react";
import "./MainPopUpMenu.css";
import {Link, NavLink} from 'react-router-dom';
import {Menu, MenuItem} from "@material-ui/core";

export function MainPopUpMenu(props){

    function logOutHandler(){
        localStorage.removeItem("User");
        props.handleClose();
        window.location.assign("/");
    }

    return(
        <Menu id="simple-menu"
              anchorEl={props.anchorEl}
              keepMounted
              open={Boolean(props.anchorEl)}
              onClose={props.handleClose} >
            <NavLink tag={Link} to="/Profile">
                <MenuItem onClick={props.handleClose}>My account</MenuItem>
            </NavLink>
            <NavLink tag={Link} to="/Settings">
                    <MenuItem onClick={props.handleClose}>Settings</MenuItem>
            </NavLink>
            <MenuItem onClick={logOutHandler}>Logout</MenuItem>
        </Menu>
    );
}