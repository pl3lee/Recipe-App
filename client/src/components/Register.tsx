import { Box, Button, FormControl, Input, InputLabel, Typography } from "@mui/material";
import { useState } from "react";
import Form from "./Form";
const Register:React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // this prevents refresh
    event.preventDefault();

    const data = { username, password }
    const res = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert("Something went wrong")
    } else {
      alert("Successfully registered")
    }

  }
  return (
    <Form title="Register" username={username} setUsername={setUsername} password={password} setPassword={setPassword} onSubmit={onSubmit}/>
  )

}

export default Register;