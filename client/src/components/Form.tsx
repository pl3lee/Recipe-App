import { Box, Typography, FormControl, InputLabel, Input, Button } from "@mui/material";


interface FormProps {
  title: string;
  username: string|null;
  setUsername: (username: string) => void;
  password: string|null;
  setPassword: (password: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}


const Form:React.FC<FormProps> = ({title, username, setUsername, password, setPassword, onSubmit}) => {
  return (
    <Box component="form" autoComplete="off" onSubmit={onSubmit}>
      <>
      <Typography variant="h4">{title}</Typography>
      <FormControl variant="standard">
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input id="username" required onChange={(event) => setUsername(event.target.value)}/>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input id="password" type="password" required onChange={(event) => setPassword(event.target.value)}/>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {title}
      </Button>
      </>
    </Box>
  )
}

export default Form;