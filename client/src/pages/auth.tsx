import Login from '@/components/Login';
import Register from '@/components/Register';
import * as React from 'react';


export interface AuthProps {
}

const Auth = (props: AuthProps) => {
  return (
    <>
    <Register></Register>
    <Login></Login>
    </>
  );
}

export default Auth