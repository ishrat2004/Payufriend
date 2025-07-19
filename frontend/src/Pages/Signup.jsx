import { useState } from "react";
import { BottomWarningComponent } from "../Components/BottomWarningComponent";
import { Button } from "../Components/Button";
import { Heading } from "../Components/Heading";
import { Inputbox } from "../Components/Inputbox";
import { SubHeading } from "../Components/SubHeading";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
export function Signup(){ 
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
         navigate("/signin"); 

    }
    return <div className="bg-slate-300 h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center"> 
          <div className="rounded-lg bg-white w-96 text-center shadow-lg p-4">
              <Heading label="Sign Up" />
              <SubHeading label="Enter your information to create an account" />
              <Inputbox onChange={e=>{setFirstname(e.target.value);  }} label="Firstname" placeholder="John" /> 
              <Inputbox onChange={e=>{setLastname(e.target.value);  }} label="Lastname" placeholder="Doe" />   
              <Inputbox onChange={e=>{setUsername(e.target.value);  }} label="Username" placeholder="johndoe" />
              <Inputbox onChange={e=>{setPassword(e.target.value);  }} label="Password" placeholder="********"/>
              <div className="mt-4"> 
                {validity==="UserAlreadyExists"?<div className="text-red-500">User Already Exists</div>:null}
                {validity==="PasswordTooShort"?<div className="text-red-500">Password Too Short</div>:null}
                
                <Button onClick={sendrequest} label="Sign Up" />
              </div>
              <BottomWarningComponent label="Already Have an Account?" buttonText={"Sign In"} to={"/signin"} />
          </div>
        </div>
        
    </div>

}