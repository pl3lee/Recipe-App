import { Box, Typography, FormControl, InputLabel, Input, Button } from "@mui/material";
import { useState } from "react";
import Form from "./Form";
import { useCookies } from 'react-cookie';
import { useRouter } from "next/router";

const Login:React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  // we use the router to redirect
  const router = useRouter();

  // since we only need the setCookies function
  const [_, setCookies] = useCookies(["access_token"])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // this prevents refresh
    event.preventDefault();

    const data = { username, password }
    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    // we defined our own status codes in the backend
    if (resData.status === -2) {
      alert("Username does not exist")
    } else if (resData.status === -1) {
      alert("Incorrect password")
    } else if (!res.ok) {
      alert("Something went wrong")
    } else {
      alert("Successfully logged in")
      // we need to get the token and userID from the response, and set it in the cookies
      const { token, userID } = resData;
      console.log(userID)
      setCookies("access_token", token)

      window.localStorage.setItem("userID", userID);

      // this redirects to homepage
      router.push("/");
    }

  }
  return (
    <Form title="Login" username={username} setUsername={setUsername} password={password} setPassword={setPassword} onSubmit={onSubmit}/>
  )
}


export default Login;