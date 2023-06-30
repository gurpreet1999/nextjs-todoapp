"use client";

import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { Context } from "../components/Client";

//why we are using router from next navigation
//because task add krn ke baad hume manually page refresh krna padh raha he
//so we wiill do router.refresh()


//hum log isr vi use kr sakte he 
//isse ye fayda hoga ki newtask krne se pehle jitne vi task he woh build time me cdn me store ho jayenge 
//hor hume homepage pe dikhai denge
//jabb vi hum newtask create krmege to on demand --revialidate kr denge with the help of issr
//but but yaha pe ye app me issr kaam nai krga
//because  see agar kise ecommerce website pe jaoge to usska kuch lena dena nai  he user se 
//woh ve product irrespective of user login dikhayega 

//but ye par hum individual user ke task dikha rahe he
//isko hum na hi ssg kr sakte he 
//na hi issr kr sakte he
//ye par sirf ssr kr sdakte he ..bcasue har baar we need dynamic data fetching
//because see suppose 4 task he  and woh cache ho gaye he
//suippose agar dusre id se login kiya to
//esse kese cache wala data dikha de 
// us user ke hisab se uska data fetch krna hoga
//us individual ka jo data he woh show krna hoga






const AddTodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useContext(Context);

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/newtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await res.json();

      if (!data.success) return toast.error(data.message);

      toast.success(data.message);
      router.refresh();
      setTitle("");
      setDescription("");
    } catch (error) {
      return toast.error(error);
    }
  };

  if (!user._id) return redirect("/login");

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Task Title"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Task Description"
          />
          <button type="submit">Add Task</button>
        </form>
      </section>
    </div>
  );
};

export default AddTodoForm;