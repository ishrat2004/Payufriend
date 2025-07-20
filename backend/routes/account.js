const express=require("express"); 
const { authMiddleware } = require("../middleware");

const { default: mongoose } = require("mongoose");
const { Account } = require("../db");

const AccountRouter=express.Router(); 

AccountRouter.get("/balance",authMiddleware,async (req,res)=>{ 
    const userId=req.userId; 
    console.log("userId",userId);
    const account_details=await Account.findOne({ 
        userId:userId
    });
     if(!account_details){ 
        console.log("Account not found for userId:", userId);
        res.json({
            message:"Account not found"})
     } 
     res.json({ 
        balance:account_details.balance /// U might req to convert it to decimal 
     })
}) 

AccountRouter.post("/add_money",authMiddleware,async (req,res)=>{ 
       
    const session=await mongoose.startSession(); 
    session.startTransaction(); 
    const userId=req.userId; 
       const account_details=await Account.findOne({ 
        userId:userId
       }).session(session); 
       if(!account_details){ 
           await session.abortTransaction(); 
           res.status(400).json({ 
            msg:"Account not found"
           })
       }
       const money=req.body.money;  
       await Account.updateOne(
        {userId:userId},
        {$inc:{balance: money} }
       ).session(session); 
       await session.commitTransaction(); 
       res.json({ 
        msg:"Money added successfully",
       })

})
AccountRouter.post("/transfer",authMiddleware,async (req,res)=>{ 
    /// initially start a session 
    const session= await mongoose.startSession(); 
    session.startTransaction(); 
        /// from here either everything will be executed or nothing will be executed 
        const { amount,to } = req.body;
        const account=await Account.findOne({ 
            userId:req.userId
        }).session(session); 
        if(!account || account.balance<amount){ 
            await session.abortTransaction(); /// aborting the transaction
            res.status(400).json({ 
                msg:"Insufficient balance or account not found"
            })
        }
        console.log("Account found for userId:", req.userId);
        console.log("Account balance:", account.balance);
        const toAccount=await Account.findOne({ 
            userId:to
        }).session(session); 
        if(!toAccount){ 
            await session.abortTransaction(); /// aborting the transaction
            res.status(400).json({ 
                msg:"Invalid account to transfer"
            })
        }
        console.log("Account found for userId:", to);
        /// performing the transfer 
        await Account.updateOne({userId:req.userId},{$inc:{balance : -amount} }).session(session); 
        await Account.updateOne({userId:to},{ $inc :{balance: amount}}).session(session);
        /// commit the transaction 
        await session.commitTransaction(); 
        res.json({ 
            msg:"Transaction Successful"
        })
})
module.exports=AccountRouter;  

/// Without the trasaction logic if we use conventional if statement to check if balance
/// is sufficient or not it will be bypassed when two concurrent requests are made
/// to transfer money from one account to another.
/// In that case even suff balance not there the money will be transferred
/// Consider balance as 1000
/// 1st request to transfer 1000 to account A
/// 2nd request to transfer 1000 to account B
/// If this are made concurrently then both will check the balance and easily bypass the if state and lead to transfer of 2000
/// Which is not correct 
/// With the transaction logic we ensure that either both will be executed or none will be executed
/// And this will ensure that the balance is not bypassed
/// And the money is not transferred if balance is not sufficient
/// It serially check if the balance is sufficient or not when we make a session 
/// Here the session is trasaction session which has start.abort,commit etc diff methods 