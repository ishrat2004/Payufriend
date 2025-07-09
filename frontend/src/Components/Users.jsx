import { useEffect, useState } from "react";
import { Inputbox } from "./Inputbox";
import { User } from "./User";
import axios from "axios"; 
export function Users(){ 
    const [users,setusers]=useState([]); 
    const [filter,setfilter]=useState("");
    /// add debounce  
    useEffect(()=>{ 
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter,{ 
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }).then(response=>{ 
            setusers(response.data.user)
        })
    },[filter]) 
    return <div> 
        <div className="font-bold mt-6 text-lg"> 
            Users
            </div>
           <div> 
            <input onChange={(e)=>{
                setfilter(e.target.value); 
            }} placeholder="Search Users... " className="border border-gray-300 rounded-md p-2 mt-2 w-full" type="text"> 
            </input>
           </div>
           <div> 
             {users.map(user=><User user={user} /> )}
           </div>

    </div>
}