"use client";

import Set from "@/components/set/set";
import { getCurrentUser } from "@/firebase/auth/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SetPage = () => {
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

  return <>{user && <Set />}</>;
};

export default SetPage;
