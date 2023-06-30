import { serialize } from "cookie";
import mongoose from "mongoose";

import jwt from "jsonwebtoken";
import { TODOUSER } from "@/models/user";



export const connectDB = async () => {
  await mongoose.connect(process.env.MONGOURL);
  console.log(`Database Connected on`);
};


export const cookieSetter = (res, token, set) => {
  res.setHeader(
    "Set-Cookie",
    serialize("token", set ? token : "", {
      path: "/",
      httpOnly: true,
      maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
    })
  );
};

export const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

export const checkAuth = async (req) => {
  const cookie = req.headers.cookie;
  if (!cookie) return null;

  const token = cookie.split("=")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return await TODOUSER.findById(decoded._id);
};