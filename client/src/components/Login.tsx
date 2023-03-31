import { useState } from "react";
import Form from "./Form";
import { useRouter } from "next/router";
import { AuthContext } from "@/stores/AuthContext";
import { useContext } from "react";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // we use the router to redirect
  const router = useRouter();

  const { login } = useContext(AuthContext);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // this prevents refresh
    event.preventDefault();
    const status = await login(username, password);
    // this redirects to homepage
    if (status == 1) {
      router.push("/");
    } else if (status == -2) {
      alert("Username does not exist");
    } else if (status == -1) {
      alert("Incorrect password");
    } else if (status == -10) {
      alert("Something went wrong");
    }
  };

  return (
    <Form
      title="Login"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
};

export default Login;
