const express=require("express"); 
const userRouter=express.Router(); 
const zod=require("zod"); 
const jwt=require("jsonwebtoken");
const {UserModel, Account}=require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const { use } = require("react");
const SignupSchema=zod.object({ 
    username:zod.string(), 
    password:zod.string(), 
    firstname:zod.string(),
    lastname:zod.string()
})
userRouter.post("/signup",async (req,res)=>{ 
   try{
    const body=req.body; 
    const {success}=SignupSchema.safeParse(body); /// safeParse returns an object with a success property
    if(!success){ 
        res.json({ 
             messgae:"Incorrect inputs"
        })
    }
    const existinguser=await UserModel.findOne({ 
        username:req.body.username
    })
    if(existinguser){ 
        return res.json({ 
            message:"User already exists"
        })
    } 
    /// hash the password 
    const user=await UserModel.create({ 
        username:req.body.username, 
        password:req.body.password, 
        firstname:req.body.firstname,
        lastname:req.body.lastname
    }) 

    const userId=user._id; 
    //---------------------------
    /// we are creating a account for the user initially with some random balance
     const new_account=await Account.create({ 
        userId:userId,
        balance:1+Math.random()*10000
     })
     ///-----------------------------
    const token=jwt.sign({userId},JWT_SECRET);
     res.json({ 
    message:"User created successfully", 
        token:token
    })}catch(err){ 
        res.status(402).json({ 
           msg:"Error in creating user",
        })
    }

}) 

const SigninSchema=zod.object({ 
    username:zod.string(), 
    password:zod.string()
})
userRouter.post("/signin", async (req,res)=>{ 
    const success=SigninSchema.safeParse(req.body); 
    if(!success){ 
        res.json({ 
            message:"Incorrect inputs"
        })
    } 
    const user=await UserModel.findOne({ 
        username:req.body.username,
        password:req.body.password
    }) 
    if(!user){ 
        return res.json({ 
            message:"User not found"
        })
    } 
    const userId=user._id; 
    const token=jwt.sign({userId},JWT_SECRET); 
    res.json({ 
        message:"User signed in successfully", 
        token:token
    })

})

const updated_user_schema=zod.object({ 
    firstname:zod.string().optional(),
    lastname:zod.string().optional(),   
    password:zod.string().optional()
})
userRouter.put("/",authMiddleware,async (req,res)=>{ 
   const body=req.body; 
   const {success}=updated_user_schema.safeParse(body); 
   if(!success){ 
         return res.json({ 
              message:"Incorrect inputs"
         })
   } 
   const updated_user=await UserModel.updateOne({
      _id:req.userId
   },req.body); 
   res.json({ 
    msg:"Details Updated Successfully" 
   })
}) 
   userRouter.get("/bulk",authMiddleware,async (req,res)=>{ 
       const filter=req.query.filter || ""; 
       const users=await UserModel.find({ 
              $or:[{
                 firstname:{ 
                    "$regex":filter
                 }
              },{
                 lastname:{ 
                    "$regex":filter
                 } 
              }]
       }) 
       /// read through the regex and then start 
       res.json({ 
           user:users.map(user=>({ 
              username:user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              _id: user._id
           }) )
       }) 
   })
module.exports=userRouter; 