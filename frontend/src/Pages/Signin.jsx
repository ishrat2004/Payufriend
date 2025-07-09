import { useState } from "react";
import { BottomWarningComponent } from "../Components/BottomWarningComponent";
import { Button } from "../Components/Button";
import { Heading } from "../Components/Heading";
import { Inputbox } from "../Components/Inputbox";
import { SubHeading } from "../Components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin(){ 
    const [username,setusername]=useState(""); 
    const [password,setPassword]=useState(""); 
    const navigate=useNavigate(); 
    async function sendrequest(){ 
        const response=await axios.post("http://localhost:3000/api/v1/user/signin",{
            username,
            password
        }); 
        localStorage.setItem("token",response.data.token); 
        alert("Successfully Logged In");
        navigate("/dashboard");
    }
    return <div className="bg-slate-300 h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center"> 
          <div className="rounded-lg bg-white w-96 text-center shadow-lg p-4">
              <Heading label="Sign In" />
              <SubHeading label="Enter your credentials to access your account" />
              <Inputbox label="Username" placeholder="johndoe" onChange={(e)=>{
                setusername(e.target.value); 
              }} />
              <Inputbox label="Password" placeholder="********" onChange={(e)=>{ 
                setPassword(e.target.value); 
              }} />
              <div className="mt-4"> 
                <Button onClick={sendrequest} label="Sign In" />
              </div>
              <BottomWarningComponent label="Don't Have an Account?" buttonText={"Sign Up"} to={"/signup"} />
          </div>
        </div>
        
    </div>

}