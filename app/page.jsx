import React, { Suspense } from 'react'
import Form from "./addTodoForm";
import { TodoItem } from '@/components/ServerComponents';
import {cookies} from "next/headers"
import { redirect } from 'next/navigation';
import Todos from './todos';

//mene ye wale component ko client nai banaya balki form mene client se manga ke render kiya
//jabki login page direct client component bna diya
//because ye wale component me hume data vi dikhana he server se ..
//thatswhyt

//server component me agar data fetch krna
// he to hume pura url likhna hoga
//see ye se header me cookie nai ja sakti he becasue he server component he
//but agar hum crenditials:true 
//krnege to header me populate ho jayegi humari cookie
//but onbe more method==


// const fetchTodo = async (token) => {
//   try {
//     const res = await fetch(`${process.env.URL}/api/mytask`, {
//       cache: "no-cache",
//       headers: {
//         cookie: `token=${token}`,
//       },
//     });
//     const data = await res.json();

//     if (!data.success) return [];

//     return data.tasks;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };


//ye jitna fetching wala kaam ab me dusri file me krunga because mujhe suspense use krna he
//taki hum suspense ke andar wrap kr sake 





const page = async () => {

  // const token=cookies().get("token")?.value
  // if(!token) return redirect("/")


  return (
    <div className="container">
    <Form />

    <Suspense fallback={<div>loading...</div>}>
      <Todos />
    </Suspense>
  </div>
  )
}

export default page