"use client";
import Sets from "@/components/sets/sets";
import { getCurrentUser } from "@/firebase/auth/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SetsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<{}>();

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/");
      }
    });
  }, []);

  return <>{user && <Sets />}</>;
};

export default SetsPage;
