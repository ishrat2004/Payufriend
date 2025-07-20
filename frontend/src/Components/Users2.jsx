import { Loader, Search, UserPlus } from "lucide-react";
import { useState } from "react";
import { User } from "./User";
import axios from "axios";
import {useEffect } from "react";
export function Users2(){ 
    const [filter,setfilter]=useState(''); 
    const [isloading,setLoading]=useState(false);
    const [users,setusers]=useState([]); 
    useEffect(()=>{ 
        ///setLoading(true); 
         axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter,{ 
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
         }).then(response=>{
            setusers(response.data.user);
            //setLoading(false);
         })
    },[filter]);
    return <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 "> 
        <div className="mb-6"> 
            <h1 className="text-xl md:text-3xl font-semibold text-gray-900"> Send Money </h1>
        </div> 
        {/* searching starts here  */}
        <div> 
            <div className="flex items-center relative"> 
                <Search className="absolute left-3 transform  text-gray-400 hover:text-gray-600 transition-colors border-none"/>
                <input 
                onChange={(e)=>{setfilter(e.target.value)}}
                placeholder="Search user by name ..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                /> 
            </div> 
            {/* Users list  */} 
            { 
                isloading ? (
          <div className="flex justify-center py-8">
            <div className="rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent">
                <Loader className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600" />
                Loading...
            </div>
          </div>
        ): users.length>0 && filter.length>0 ? ( 
            users.map((user,index)=>(
                <User user={user}/>
            ))
        ):(
            <div className="text-center py-8 text-gray-500"> 
                <UserPlus className="h-12 w-12 mx-auto mb-4 text-gray-300 "/> 
                <p> No Users Found</p> 
                </div>
         )
            }
        </div>
    </div>
}