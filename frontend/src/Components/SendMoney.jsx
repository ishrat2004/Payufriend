import { useSearchParams } from "react-router-dom"
import axios from "axios"; 
import { useState } from "react";
export function SendMoney(){ 
    const [searchParams]=useSearchParams(); 
    const id=searchParams.get("id"); 
    const name=searchParams.get("name"); 
    const type=searchParams.get("type"); 
    console.log("name is " + name);
    console.log("id is " + id);
    console.log("type is " + type);
    const [amount,setamount]=useState(); 
    async function transfer(){ 
        await axios.post("https://payufriend.onrender.com/api/v1/account/transfer",{
            amount:amount,
            to:id
        },{ 
            headers:{ 
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
    }
    async function self_transfer(){ 
        const response=await axios.post("https://payufriend.onrender.com/api/v1/account/add_money",{
            money:amount
        },{ 
            headers:{ 
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }) 
        console.log(response.data);
    }
    return <div className="flex justify-center h-screen bg-gray-100 items-center"> 
      <div className="h-full flex flex-col justify-center "> 
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-4 w-96 bg-white shadow-lg rounded-lg"> 
              <div className="flex flex-col space-y-1.5 p-6 "> 
                <h2 className="text-3xl font-bold text-center ">
                    {type==="self" ? "Add Money" : "Send Money"}
                </h2>
                </div>
            <div className="p-6">    
            <div className="flex items-center space-x-4 "> 
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center"> 
                    <span className="text-2xl text-white"> 
                        {name[0]}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold"> {name}</h3> 
            </div>  
            <div className="space-y-4">  
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="amount" > 
                        Amount(in Rs)
                    </label>
                    <input onChange={(e)=>{ 
                        setamount(e.target.value); 
                    }
                    } type="number" placeholder="Enter Amount" className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm " id="amount" />
                    </div> 
                    <button className="justify-center rounded-md text-2xl font-medium ring-offset-background transition-colors h-12 px-4 py-2 w-full bg-green-500 text-white" onClick={()=>{ 
                        if(type==="self"){ 
                            self_transfer();
                        }
                        else{ 
                            transfer();
                        }
                    }}>  
                        {type==="self" ? "Add Money" : "Initiate Transfer"}
                    </button>
                </div>
            </div> 
            </div>       
      </div>
    </div>
}