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
  const { user, logout } = useContext(AuthContext)
  const [userID, setUserID] = useState(useGetUserID());

  
  const loginRegister = (
    <Button color="secondary" href="/auth">
      Login/Register
    </Button>
  );
  const logoutButton = <Button color="secondary" onClick={logout}>Logout</Button>
  const auth = user ? logoutButton: loginRegister;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" component={NextLink} variant="body2" color="secondary">Home</Link>
          <Link
            href="/create-recipe"
            component={NextLink}
            variant="body2"
            color="secondary"
          >Create Recipe</Link>
          {user && <Link
            href="/saved-recipes"
            component={NextLink}
            variant="body2"
            color="secondary"
          >Saved Recipes</Link>}
        {auth}
        </Toolbar>
      </AppBar>
    </Box>
  );
}


