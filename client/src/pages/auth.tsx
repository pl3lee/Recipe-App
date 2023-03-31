import Login from '@/components/Login';
import Register from '@/components/Register';
import { Stack } from '@mui/material';
import * as React from 'react';


export interface AuthProps {
}

const Auth = (props: AuthProps) => {
  return (
    <Stack direction="row">
    <Register></Register>
    <Login></Login>
    </Stack>
  );
}

export default Auth