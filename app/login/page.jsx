"use client";

//ye client compoment he so ye par hi api cal kr sakte ho
//. ye client side so me ye par env access nai kr sakta hu
//mujhe ye par pura url dalne ka jarirat nai he ...jo default url he usii me app bas /api/auth kr do



import { Context } from '../../components/Client'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';

const page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(Context);
  
    const loginHandler = async (e) => {
      e.preventDefault();
  

      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!data.success) return toast.error(data.message);
        setUser(data.user);
        toast.success(data.message);
      } catch (error) {
        return toast.error(error);
      }
    };
  
    if (user._id) return redirect("/");
  
    return (
      <div className="login">
        <section>
          <form onSubmit={loginHandler}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter Email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter Password"
            />
            <button type="submit">Login</button>
  
            <p>OR</p>
            <Link href={"/register"}>New User</Link>
          </form>
        </section>
      </div>
    );
}

export default page