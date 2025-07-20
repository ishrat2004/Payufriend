import { CreditCard, Plus, Send, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Actions(){  
    const actions=[{
        icon:Send, label:'Send Money', color:'bg-blue-500', hoverColor: 'hover:bg-blue-600'
    },{ 
        icon:Plus,label:'Add Money', color:'bg-green-500',hoverColor: 'hover:bg-green-600'
    }, 
    { 
        icon:CreditCard,label:'Pay Bills',color:'bg-orange-500',hoverColor: 'hover:bg-orange-600'
    },{ 
        icon:Smartphone,label:'Mobile Recharge' , color:'bg-pink-500', hoverColor: 'hover:bg-pink-600'
    }
]; 
const navigate=useNavigate(); 
    return <div className="bg-white rounded-xl border border-gray-200 p -6 shadow-sm"> 
          <h2 className="text-xl  md:text-3xl font-semibold text-gray-900 mb-6 "> 
            Quick Actions
          </h2> 
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
            { 
                actions.map((action,index)=>(
                    <button 
                    onClick={()=>{ 
                        if(action.label=="Add Money"){ 
                            const type="self"; 
                            const name=localStorage.getItem("username"); 
                            const id=0;
                            navigate("/sendmoney?id="+id+"&name="+name + "&type="+type); 
                        }
                    }}
                    className={`${action.color} ${action.hoverColor} text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex flex-col items-center space-y-2 ` }> 
                        <action.icon className="h-7 w-7"/> 
                        <span className=" text-xl md:text-2xl font-medium text-center"> 
                            {action.label}
                        </span>
                    </button>
                ))
            }
          </div>
    </div>
}