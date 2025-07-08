const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://ishratalikhan004:Ishratkhan22@cluster0.fzscbb3.mongodb.net/paytm-db") 
const Schema=mongoose.Schema;

const UserSchema=new Schema({ 
   username:{ 
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    minLength:3,
    maxLength:30
},
   password:{ 
    type:String,
    required:true,
    minLength:6
   },
   firstname: { 
    type:String,
    trim:true,
    maxLength:50 /// we can add required=true here if needed
   }, 
   lastname:{
    type:String,
    trim:true,
    maxLength:50 /// we can add required=true here if needed
   }
});
const BankSchema=new Schema({ 
    userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true},
    balance:{ 
        type:Number,
        required:true
    }
})
/// for the storing of balance of the user we are storing the money directly in full integer
///Eg- 100.02-> store this as 10002 while returning we can return it as 100.02
///Eg- 886 rs-> stored as 88600 in the db  
const UserModel=mongoose.model("User",UserSchema);
const Account=mongoose.model('Account',BankSchema); 

module.exports={
    UserModel,Account
}