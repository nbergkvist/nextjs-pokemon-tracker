"use client";
import Login from "@/components/login/login";
import {
  getCurrentUser,
} from "@/firebase/auth/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
      getCurrentUser().then((user) => {
        if (user) {
          router.push("/sets/");
        }
      });
  }, []);

  return (
    <div className="w-full h-full">
      <Login />
    </div>
  );
};

export default Home;
