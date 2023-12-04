"use client";
import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";

export default function RegisterForm() {
  const [formValues, setFormValues] = useState({});

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues((old) => ({ ...old, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!res.ok) return alert("Register failed");

      setFormValues({});
      return signIn(undefined, { callbackUrl: "/" });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex justify-center items-center ">
      <div className="shadow-md rounded-md p-6 w-full sm:w-96 bg-white">
        <h3 className="text-2xl font-semibold mb-6 text-center">Register</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="John"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              onChange={handleInput}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              onChange={handleInput}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              onChange={handleInput}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm"
              id="confirm"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              onChange={handleInput}
            />
          </div>
          <div className="text-center">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
