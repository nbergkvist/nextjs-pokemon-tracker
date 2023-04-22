"use client";

import {
  getCurrentUser,
  signInUserWithEmailAndPassword,
} from "@/firebase/auth/auth";
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
        <div>
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
        </div>
        <div className="flex gap-3">
        <button
            type="button"
            onClick={() => router.push("/signup")}
            className="border border-red-500 mt-4 grow bg-purple text-black"
          >
            Signup
          </button>
          <button
            type="button"
            onClick={onFormDataSubmit}
            className="border border-red-500 mt-4 grow bg-purple text-black"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
