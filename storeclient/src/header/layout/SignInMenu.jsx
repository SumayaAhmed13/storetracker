import { Button, Fade, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";
import { Link } from "react-router-dom";


const SignInMenu = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.account);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button onClick={handleClick} color="inherit" sx={{ typography: "h6" }}>
        {" "}
        {user?.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to="/orders">My Orders</MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(signOut()); 
            dispatch(clearBasket());
          }}>
          Logout
        </MenuItem>
      </Menu>
    </>

  );
};

export default SignInMenu;
