
const jwt=require("jsonwebtoken"); 
const { JWT_SECRET } = require("./config");
const authMiddleware=(req,res,next)=>{ 
   const auth_header=req.headers.authorization;
   if(!auth_header || !auth_header.startsWith('Bearer ')){ 
        return res.status(403).json({ 
            message:"No authorization header provided"
        })
   } 
   const token=auth_header.split(' ')[1];

   try{const decoded=jwt.decode(token,JWT_SECRET); 
   req.userId=decoded.userId; 
   next(); 
   }catch(err){ 
     res.status(403).json({ 
        
     })
   }
} 

module.exports={ 
    authMiddleware
}