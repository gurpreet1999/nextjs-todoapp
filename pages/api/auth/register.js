import { asyncError, errorHandler } from "@/middleware/error";
import { TODOUSER } from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import bcrypt from "bcrypt"

const handler=asyncError(async(req,res)=>{
    if (req.method !== "POST")
    return errorHandler(res, 400, "Only POST Method is allowed");

    const {name,email,password}=req.body;
    if (!name || !email || !password)
    return errorHandler(res, 400, "Please enter all fields");

    await connectDB();

    const user=await TODOUSER.findOne({email});

    
        if (user) return errorHandler(res, 400, "User registered with this email");
        const hashedPassword = await bcrypt.hash(password, 10);
    
 let myuser = await TODOUSER.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(myuser._id);

  cookieSetter(res, token, true);

  res.status(201).json({
    success: true,
    message: "Registered Successfully",
    myuser,
  });
    

})

export default handler