import { Box, Typography, FormControl, InputLabel, Input, Button } from "@mui/material";
import { useState } from "react";
import Form from "./Form";
import { useRouter } from "next/router";
import { AuthContext } from "@/stores/AuthContext";
import { useContext } from "react";

const Login:React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  // we use the router to redirect
  const router = useRouter();

  
  const { login } = useContext(AuthContext);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // this prevents refresh
    event.preventDefault();
    login(username, password);
    

      // this redirects to homepage
      router.push("/");
    }

  
  return (
    <Form title="Login" username={username} setUsername={setUsername} password={password} setPassword={setPassword} onSubmit={onSubmit}/>
  )
}


export default Login;