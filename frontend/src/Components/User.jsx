import { Link, useNavigate } from 'react-router-dom';
import {Button} from './Button.jsx';
import { Send } from 'lucide-react';
export function User({user}){ 
    const navigate=useNavigate(); 
    return <div className='flex justify-between m-3'> 
       <div className="flex">  
         <div className="rounded-full bg-slate-200 h-12 w-12 flex justify-center mt-1 mr-2"> 
            <div className="flex justify-center items-center h-full text-2xl"> 
                {user.firstname[0]}
            </div>
         </div>
         <div className="flex flex-col justify-center h-full"> 
            <div className='text-2xl font-semibold'> 
                {user.firstname} {user.lastname}
            </div> 
         </div>
        </div> 

        <div className='ml-3'> 
        <button onClick={(e)=>{ 
            navigate("/sendmoney?id="+user._id+"&name="+user.firstname);  
        }}  className='flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors' > 
        <Send className='h-5 w-5 md:h-8 md:w-8' />
        <span className='text-2xl md:text-3xl font-medium '> 
            Send
        </span>
        </button>
        </div> 
    </div>
}