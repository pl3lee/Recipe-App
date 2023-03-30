import * as React from "react";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useGetUserID } from "@/hooks/useGetUserID";
import { useContext } from "react";
import { AuthContext } from "@/stores/AuthContext";
import { AuthContextInterface } from "@/interfaces/AuthContextInterface";

export default function Navbar(props: any) {
  const { user, logout } = useContext(AuthContext);
  const [userID, setUserID] = useState(useGetUserID());

  const loginRegister = (
    <Button variant="text" component={Link} href="/auth" sx={{color: "white", fontSize:"2em", textTransform: "none"}}>
      Login/Register
    </Button>
  );
  const logoutButton = (
    <Button color="secondary" onClick={logout} sx={{color: "white", fontSize:"2em", textTransform: "none"}}>
      Logout
    </Button>
  );
  const auth = user ? logoutButton : loginRegister;

  return (
    
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "center", gap:"10%", padding:"3vh"}}>
            <Button href="/" component={Link} variant="text" sx={{color: "white", fontSize:"2em", textTransform: "none"}}>
            Home
          </Button>
          {user && <Button
            href="/create-recipe"
            component={Link}
            variant="text"
            sx={{color: "white", fontSize:"2em", textTransform: "none"}}
          >
            Create Recipe
          </Button>}
          {user && (
            <Button
              href="/saved-recipes"
              component={Link}
              variant="text"
              sx={{color: "white", fontSize:"2em", textTransform: "none"}}
            >
              Saved Recipes
            </Button>
          )}
          {auth}
        </Toolbar>
      </AppBar>
    
  );
}
