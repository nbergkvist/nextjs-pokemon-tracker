"use client";
import SignUpForm from "@/components/signup/signup";
import { getCurrentUser } from "@/firebase/auth/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SetsPage = () => {
  const router = useRouter();

  useEffect(() => {
      getCurrentUser().then((user) => {
        if (user) {
            router.push("/sets");
        }
    });
  }, []);

  return (
    <div className="w-full">
      <SignUpForm />
    </div>
  );
};

export default SetsPage;
