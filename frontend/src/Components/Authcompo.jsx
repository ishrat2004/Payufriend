import { CheckCircle } from "lucide-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function Authcompo({authmode,setauthmode}){ 
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");  
    const [validity,setvalidity]=useState("valid"); 
    const navigate=useNavigate(); 
    async function sendrequest(){ 
         const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
          username,
          password,
          firstname,
          lastname
         }) 
         console.log(response.data);
         const temp=response.data.message;
         console.log(temp); 
         if(response.data.message==="Incorrect inputs"){
          setvalidity("PasswordTooShort");
           return;
         }
         else if(response.data.message==="Password too short"){
           return;
         }
         else if(response.data.message==="User already exists"){
          setvalidity("UserAlreadyExists");
           return;
         }
         console.log(response.data.token); 
         localStorage.setItem("token",response.data.token);
         setauthmode("signin"); 

    }
   async function signin_request(){ 
        const response=await axios.post("http://localhost:3000/api/v1/user/signin",{
            username,
            password
        }); 
        if(response.data.message==="Incorrect inputs"){
            alert("Invalid Credentials");
            return;
        }
        else if(response.data.message==="User not found"){
            alert("User not found");
            return;
        }
        localStorage.setItem("token",response.data.token); 
        alert("Successfully Logged In");
        navigate("/dashboard");
    }


    return <div className="w-full lg:w-96 flex items-center justify-center p-8"> 
         <div className="w-full max-w-md"> 
               { 
                !authmode ? <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 animate-slide-in-right ">  
                      <div className="text-center mb-8" > 
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Join Payufriend
                        </h3> 
                        <p className="text-gray-600"> 
                            Start Sending money securely today
                        </p>
                        </div>   
                        <div className="space-y-4 "> 
                          <button 
                          onClick={()=>{
                            setauthmode("signup")
                          }}
                          className="w-full bg-blue-600 text-white rounded-xl py-4 font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 text-lg md:text-xl "> 
                            Create Account
                          </button> 
                          <button
                           onClick={()=>{ 
                            setauthmode("signin");
                           }}
                          className="w-full border border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 text-lg md:text-xl"> 
                            Sign In
                          </button>
                        </div> 
                        <div className="mt-8 pt-6 border-t boder-gray-200">  
                             <div className="flex items-center justify-center space-x-6 text-2xl text-gray-600 ">  
                                 <div className="flex items-center"> 
                                    <CheckCircle className="h-4 w-4 mr-1 text-green-500"/> 
                                    Secure
                                  </div>  
                                  <div className="flex items-center"> 
                                    <CheckCircle className="h-4 w-4 mr-1 text-green-500"/> 
                                    Fast
                                  </div>  
                                  <div className="flex items-center"> 
                                    <CheckCircle className="h-4 w-4 mr-1 text-green-500"/> 
                                    Free
                                  </div>  
                            </div> 
                        </div> 
                    </div>: 
                    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 animate-slide-in-right"> 
                      <div className="flex items-center justify-between mb-6 "> 
                         <h3> 
                            {authmode==="signup" ? <h3> Create Account  </h3>: <h3> Sign in  </h3>} 
                         </h3> 
                         {/*    closure  */} 
                         <button 
                         onClick={()=>{ 
                            setauthmode(null); 
                         }}
                         className="cursor-pointer text-gray-500 bg-white border-none hover:text-gray-600 transition-colors text-2xl"> 
                            ✕
                         </button>
                        </div>   

                        <div className="space-y-4 mb-6 flex-col justify-center ">  
                            {  authmode==="signup" ? <div className="flex justify-center"> 
                            <input  
                             placeholder="First Name" 
                             onChange={e=>{setFirstname(e.target.value);  }}
                             className="w-full text-xl md:text-2xl   bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            </div>
                            :null }
                            { authmode==="signup" ? 
                            <div className="flex justify-center"> 
                            <input  
                            onChange={e=>{setLastname(e.target.value);  }}
                             placeholder="Last Name" 
                             className="w-full text-xl md:text-2xl bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            </div>
                            : null } 
                            
                            <div className="flex justify-center"> 
                            <input  
                            onChange={e=>{setUsername(e.target.value);  }}
                             placeholder="Username" 
                             className="w-full text-xl md:text-2xl bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            </div>
                            <div className="flex justify-center"> 
                            <input  
                            onChange={e=>{setPassword(e.target.value);  }}
                             placeholder="Password" 
                             className="w-full text-xl md:text-2xl bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            </div>
                         </div>     
                         { 
                            authmode==="signup"? 
                            <div> 
                            <button 
                            onClick={sendrequest}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 mb-4 text-lg md:text-xl"> 
                             Create Account
                            </button>
                            {validity==="UserAlreadyExists"?<div className="text-red-500">User Already Exists</div>:null}
                            {validity==="PasswordTooShort"?<div className="text-red-500">Password Too Short</div>:null}
                            <div className="flex justify-center"> 
                            <h3> 
                                Already an account?<span className="cursor-pointer" onClick={()=>{ 
                                    setauthmode("signin");
                                }}> 
                                    Sign In
                                    </span> 
                            </h3>  
                            </div> 
                            </div>  : null
                         }  
                         {  authmode==="signin" ?  
                         <div> 
                         <button 
                         onClick={signin_request}
                         className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 mb-4 text-lg md:text-xl"> 
                             Sign In
                            </button>  
                            <div className="flex justify-center "> 
                            <h3> 
                                Don't have an account?<span className="cursor-pointer" onClick={()=>{ 
                                    setauthmode("signup");
                                }}> 
                                    Create Account
                                    </span> 
                            </h3> 
                            </div>
                           </div> : null  } 
                    </div> 
               }
         </div>
    </div>
}