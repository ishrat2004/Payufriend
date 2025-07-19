import { Wallet } from "lucide-react";
import { Appbar } from "../Components/Appbar";
import { Appbar2 } from "../Components/Appbar2";
import { Balance } from "../Components/Balance";
import { Actions } from "../Components/Actions";
import { Users } from "../Components/Users";

export function Dashboard2(){ 
    return <div className="min-h-screen bg-gray-50 ">  
          <Appbar2/> 
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8"> 
              <div className="grid grid-cols-2 lg:grid-cols gap-8">  
                <div className="col-span-2 md:col-span-1"> 
                    <Balance/> 
                </div>
                <div className="col-span-2 md:col-span-1"> 
                <Actions/>
                </div>
              </div>
          </div> 
          <div> 
            <Users/>
          </div>
    </div>
}