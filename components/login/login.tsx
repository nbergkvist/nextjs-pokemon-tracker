import {
    signInWithGoogle,
  } from "@/firebase/auth/auth";
import { Dispatch, SetStateAction } from "react";

type Props ={
    setWaitingForLogin: Dispatch<SetStateAction<boolean>>
}

const Login = (props: Props): JSX.Element => {
  return (
    <div>
      <button onClick={() => signInWithGoogle(props.setWaitingForLogin)}>
        Signin
      </button>
    </div>
  );
};

export default Login;
