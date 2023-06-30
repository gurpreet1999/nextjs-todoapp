export const errorHandler=(res,statuscode=500,message="internal server error")=>{
    return res.status(statuscode).json({
  success:false,
  message:message
        
    })
}  



export const asyncError=(passedFunc)=>(req,res)=>{


  return    Promise.resolve(passedFunc(req,res)).catch((err)=>{
       return errorHandler(res,500,err.message)
    })
} 