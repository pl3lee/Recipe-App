import * as React from "react";
import Link from "@mui/material/Link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { AuthContext } from "@/stores/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const loginRegister = (
    <Button
      variant="text"
      component={Link}
      href="/auth"
      sx={{ color: "white", fontSize: "max(24px, 2vw)", textTransform: "none" }}
    >
      Login/Register
    </Button>
  );
  const logoutButton = (
    <Button
      color="secondary"
      onClick={logout}
      sx={{ color: "white", fontSize: "max(24px, 2vw)", textTransform: "none" }}
    >
      Logout
    </Button>
  );
  const auth = user ? logoutButton : loginRegister;

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "center", gap: "10%", padding: "3vh" }}>
        <Button
          href="/"
          component={Link}
          variant="text"
          sx={{
            color: "white",
            fontSize: "max(24px, 2vw)",
            textTransform: "none",
          }}
        >
          Home
        </Button>
        {user && (
          <Button
            href="/create-recipe"
            component={Link}
            variant="text"
            sx={{
              color: "white",
              fontSize: "max(24px, 2vw)",
              textTransform: "none",
            }}
          >
            Create Recipe
          </Button>
        )}
        {user && (
          <Button
            href="/saved-recipes"
            component={Link}
            variant="text"
            sx={{
              color: "white",
              fontSize: "max(24px, 2vw)",
              textTransform: "none",
            }}
          >
            Saved Recipes
          </Button>
        )}
        {auth}
      </Toolbar>
    </AppBar>
  );
}
