
import {ArrowRight, Wallet } from 'lucide-react'
import { useState } from 'react';
import { Authcompo } from '../Components/Authcompo';
export function Home() {
  const [authmode,setauthmode]=useState(null); 
  return (
    <div className=" min-h-screen bg-gray-50 overflow-hidden ">
       <div className='flex flex-col justify-center md:flex-row'> 
            <div className='max-w-2xl justify-center md:pl-20 '> 
              <div className='flex items-center justify-center md:justify-normal animate-fade-in mb-8 *:'> 
                  {/* top brand and logo */} 
                  <div className="bg-blue-600 p-3 rounded-xl mr-4 "> 
                      <Wallet className='text-white h-8 w-8 '/>
                  </div>
                  <h1 className='text-3xl font-bold text-gray-900 '> PayuFriend</h1>
              </div>
              <div className='space-y-6 animate-slide-up'>  
                <h2 className='pl-3 sm:pl-0 text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'> 
                  Send Money 
                  <span className='pl-3 sm:pl-0 block text-blue-600'> 
                    Instantly
                  </span>
                </h2> 
                <p className='pl-3 sm:pl-0  text-xl text-gray-700 leading-relaxed'> 
                  Experience seamless peer-to-peer payments with our secure platform.
                  Send money to anyone,anywhere,anytime with just few clicks 
                </p> 
                <button 
                onClick={()=>setauthmode("signup") }
                className='bg-blue-600 text-xl md:text-2xl text-white px-8 py-4 rounded-xl font-semibold flex items-center
                hover:bg-blue-800 gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg'> 
                  Get Started
                  <ArrowRight className='h-4 w-4'/>
                </button>
              </div>
            </div>
            <div> 
             <Authcompo authmode={authmode} setauthmode={setauthmode}/>
             </div>
        </div>
    </div>
  );
}
