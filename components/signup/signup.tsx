"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  signUpUserWithEmailAndPassword,
  getCurrentUser,
} from "@/firebase/auth/auth";

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
        <div>
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id=""
            value={formData["email"]}
            onChange={onFormDataChange}
            className="border border-black block w-full"
          />
        </div>
        <div>
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id=""
            value={formData["password"]}
            onChange={onFormDataChange}
            className="border border-black block w-full"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id=""
            value={formData["confirmPassword"]}
            onChange={onFormDataChange}
            className="border border-black block w-full"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="border border-red-500 mt-4 grow bg-purple text-black"
          >
            back
          </button>
          <button
            type="button"
            onClick={onFormDataSubmit}
            className="border border-red-500 mt-4 grow bg-purple text-black"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
