"use client";
import Login from "@/components/login/login";
import {
  getCurrentUser,
} from "@/firebase/auth/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [waitingForLogin, setWaitingForLogin] = useState<boolean>(true);

  useEffect(() => {
    if (!waitingForLogin) {
      getCurrentUser().then((user) => {
        if (user) {
          router.push("/sets/");
        }
      });
    }
  }, [waitingForLogin]);

  const loginProps = {
    setWaitingForLogin: setWaitingForLogin
  }

  return (
    <div className="w-full">
      <Login {...loginProps} />
    </div>
  );
};

export default Home;
