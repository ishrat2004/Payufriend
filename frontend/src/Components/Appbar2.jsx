import { LogOut, Wallet } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export function Appbar2(){ 
    const [showDropDown,setdropdown]=useState(false); 
    const navigate=useNavigate(); 
    function signOut(){ 
      localStorage.removeItem("token"); 
      localStorage.removeItem("username"); 
      navigate("/");
    }
    return <div className="bg-white shadow-sm border-b border-gray-200"> 
          <div>  
            <div className="flex justify-between items-center h-16"> 
              <div className="flex items-center"> 
                {/* Logo and Name */} 
                <div className="bg-blue-600 p-2 rounded-lg mr-3"> 
                    <Wallet className="h-6 w-6 text-white"/> 
                </div> 
                <h1 className=" text-xl md:text-3xl font-bold text-gray"> 
                    PayuFriend
                </h1>
              </div> 
              <div className="relative"> 
                {/* Right side profile */} 
                 <button 
                  onClick={()=>{ 
                    console.log("show man "+ showDropDown); 
                    setdropdown(!showDropDown)}}
                  className="flex cursor-pointer items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors  border-none "
                 > 
                     <div className="text-right hidden md:block">
                        <p className="text-xl md:text-3xl font-medium text-gray-500"> 
                           Ishrat {/* put the name */}
                        </p> 
                     </div> 
                     <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center"> 
                       <span className="text-xl md:text-3xl font-medium text-white"> 
                        I 
                       </span>
                     </div>
                 </button>
                 {/* Dropdown */}
                 {showDropDown && ( <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"> 
                       <div 
                       onClick={()=>{
                            signOut(); 
                        }}
                       className="cursor-pointer flex items-center px-4 py-2 text-xl md:text-2xl text-red-600 hover:bg-gray-100" >  
                         <LogOut className="h-4 w-4 mr-3 "/> 
                         Signout
                        </div>
                    </div>) }
              </div>
             </div> 
          </div>
    </div>
}