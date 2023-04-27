"use client";

import {
  getCurrentUser,
  signInUserWithEmailAndPassword,
} from "@/firebase/auth/auth";
import Button from "@/futureComponentLibrary/button/button";
import Input from "@/futureComponentLibrary/input/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const onFormDataChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormDataSubmit = async () => {
    await signInUserWithEmailAndPassword(formData.email, formData.password);
    router.push("/sets/");
  };

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        router.replace("/sets/");
      }
    });
  }, [router]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="border rounded-xl border-solid border-purple p-4 w-[250px]">
        <Input
          onChange={onFormDataChange}
          label={"Email"}
          type={"email"}
          value={formData["email"]}
          name={"email"}
        />
        <Input
          onChange={onFormDataChange}
          label={"Password"}
          type={"password"}
          value={formData["password"]}
          name={"password"}
        />
        <div className="flex gap-3 mt-4">
          <Button onClick={() => router.push("/signup")} text="Signup" grow />
          <Button onClick={onFormDataSubmit} text="Login" grow />
        </div>
      </div>
    </div>
  );
}

export default Login;
