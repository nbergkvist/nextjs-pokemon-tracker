"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  signUpUserWithEmailAndPassword,
  getCurrentUser,
} from "@/firebase/auth/auth";
import Input from "@/futureComponentLibrary/input/input";
import Button from "@/futureComponentLibrary/button/button";

function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onFormDataChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormDataSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
    } else {
      await signUpUserWithEmailAndPassword(formData.email, formData.password);
      router.push("/");
    }
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
        <Input
          onChange={onFormDataChange}
          label={"Confirm Password"}
          type={"password"}
          value={formData["confirmPassword"]}
          name={"confirmPassword"}
        />
        <div className="flex gap-3 mt-4">
          <Button onClick={() => router.push("/")} text="Back" grow />
          <Button onClick={onFormDataSubmit} text="Submit" grow />
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
