import { Link, useNavigate } from 'react-router-dom';
import {Button} from './Button.jsx';
export function User({user}){ 
    const navigate=useNavigate(); 
    return <div className='flex justify-center m-3'> 
       <div className="flex">  
         <div className="rounded-full bg-slate-200 h-12 w-12 flex justify-center mt-1 mr-2"> 
            <div className="flex hustify-center items-center h-full text-2xl"> 
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
        <Button onClick={(e)=>{ 
            navigate("/sendmoney?id="+user._id+"&name="+user.firstname);  
        }} label={"Send Money"}  >
        </Button>
        </div> 
    </div>
}