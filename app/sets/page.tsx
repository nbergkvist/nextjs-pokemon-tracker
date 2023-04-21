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
            console.log('user', user)
            setUser(user);
        } else {
            router.push("/");
        }
    });
  }, []);

  return (
    <div className="w-full">
      {user && <Sets />}
    </div>
  );
};

export default SetsPage;
