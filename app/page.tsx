"use client";
import {
  getCurrentUser,
  signInWithGoogle,
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

  return (
    <div className="w-full">
      <button onClick={() =>signInWithGoogle(setWaitingForLogin)}>Signin</button>
      <br />
    </div>
  );
};

export default Home;
