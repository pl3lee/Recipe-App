import * as React from 'react';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';

export default function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"])
  // to logout, simply set access token to empty string and remove userID from local storage
  const logout = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("userID")
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link href='/' component={NextLink} variant="body2" color="secondary">Home</Link>
          <Link href='/create-recipe' component={NextLink} variant="body2" color="secondary">Create Recipe</Link>
          <Link href='/saved-recipes' component={NextLink} variant="body2" color="secondary">Saved Recipes</Link>
          {/* shows login if not logged in and vice versa */}
          {!cookies.access_token ? <Link href='/auth' component={NextLink} variant="body2" color="secondary">Login/Register</Link>: <Button onClick={logout} color="secondary">Logout</Button>}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
