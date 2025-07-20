import axios from "axios";
import { Eye, EyeOff, TrendingUp,TrendingDown } from "lucide-react";
import { useState } from "react"

export function Balance(){ 
    const [showbalance , setbalance]=useState(false); 
    const [amount,set_amount]=useState(0);
    async function getbalance(){ 
         const response=await axios.get("http://localhost:3000/api/v1/account/balance",{ 
                 headers:{ 
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                 }
         })
         const rounded_value=Math.round(response.data.balance*100)/100;
         set_amount(rounded_value);
    }
    return <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6">  
    <div className="grid grid-cols-1"> 
        <div className="col-span-1 md:col-span-1">  
        <div className="flex items-center justify-between mb-6"> 
            <h2 className="text-xl  md:text-3xl font-semibold text-gray-900"> 
                Account Balance
            </h2> 
            <button onClick={()=>{ 
                getbalance(); 
                setbalance(!showbalance);

            }} className="p-2 text-gray-400 hover:text-gray-600 transition-colors border-none "> 
                {showbalance ? <EyeOff className="h-4 w-4 "/> : <Eye className="h-4 w-4 " /> }
            </button>
        </div> 
        <div className="col-span-1 md:grid-cols-3 gap-6"> 
            <div className="md:grid-cols-span-2"> 
               <div className="bg-blue-600 rounded-lg p-6 text-white "> 
                <p className="text-blue-100 text-sm md:text-2xl  mb-2 ">  
                    Available Balance 
                </p> 
                <p className="text-xl  md:text-3xl font-bold mb-4"> 
                    {showbalance ?`₹${amount}` : '₹••••••'  }
                </p> 
                <div className="flex items-center justify-center"> 
                    <button className="bg-white text-black bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm md:text-xl font-medium transition-colors border-slate-200"> 
                       Add Money
                    </button> 
                </div>
               </div>
            </div> 
            
        </div>  
       </div>   
    </div>
    </div>
}