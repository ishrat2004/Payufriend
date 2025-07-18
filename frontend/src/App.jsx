import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./Pages/Signup"
import { Home } from "./Pages/Home"
import { Signin } from "./Pages/Signin"
import { Dashboard } from "./Pages/Dashboard"
import { SendMoney } from "./Components/SendMoney"


function App() {

  return<div>
        <BrowserRouter> 
         <Routes> 
             <Route path="/home" element={<Home/>} /> 
             <Route path="/signup" element={<Signup/>} /> 
             <Route path="/signin" element={<Signin/>} />
             <Route path="/dashboard" element={<Dashboard/>} />
             <Route path="/sendmoney" element={<SendMoney/>}/>
         </Routes>
        </BrowserRouter>
         
    </div>
  
}

export default App
