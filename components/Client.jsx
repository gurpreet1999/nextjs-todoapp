"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState,createContext, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";

export const Context=createContext({user:{}})

export const Provider=({children})=>{


const [user,setUser]=useState({})

useEffect(()=>{

  fetch("api/auth/me").then((res)=>{
    return res.json()
  }).then((data)=>{
    if(data.success) setUser(data.user)
  }).catch((err)=>{})
},[])

return <Context.Provider value={{user,setUser}}  >
    {children}
</Context.Provider>


}
export const LogoutBtn=()=>{
    const logoutHandler=async()=>{
      try {
        const res = await fetch("/api/auth/logout");
  
        const data = await res.json();
  
        if (!data.success) toast.error(data.message);
  
        setUser({});
  
        toast.success(data.message);
      } catch (error) {
        return toast.error(error);
      }
    }

    const {user}=useContext(Context)


    return user._id ? (
        <button className="btn" onClick={logoutHandler}>
          Logout
        </button>
      ) : (
        <Link href={"/login"}>Login</Link>
      );
   
}



export const TodoButton = ({ id, completed }) => {
    const router = useRouter();
    const deleteHandler = async (id) => {
      try {
        const res = await fetch(`/api/task/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return toast.error(data.message);
        toast.success(data.message);
        router.refresh();
      } catch (error) {
        return toast.error(error);
      }
    };
    


    const updateHandler = async (id) => {
        try {
          const res = await fetch(`/api/task/${id}`, {
            method: "PUT",
          });
          const data = await res.json();
          if (!data.success) return toast.error(data.message);
          toast.success(data.message);
          router.refresh();
        } catch (error) {
          return toast.error(error);
        }
      };
    
      return (
        <>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => updateHandler(id)}
          />
          <button className="btn" onClick={() => deleteHandler(id)}>
            Delete
          </button>
        </>
      );
    };