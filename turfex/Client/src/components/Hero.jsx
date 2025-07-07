import { SignUp, useClerk, useUser } from '@clerk/clerk-react';
import { Search, MessageCircle, User, Edit3, LaptopMinimal, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { Signup } from './SignUp';
export function Hero(){
    const navigate = useNavigate();
    const{isSignedIn} = useUser();
    const {redirectToSignIn} = useClerk();
    const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  const rotate = useTransform(scrollYProgress, [2, 0], ["-12deg", "0deg"]);
  const scale = useTransform(scrollYProgress, [0, 3], [0, 4]);


    const handleOnclick =()=>{
        if(!isSignedIn){
          navigate("/signup")
  
        }
        else{
          navigate("/chat")
        }
     
    }
    

    return(
        <>
         <div className="font-outfit relative z-10 bg-white shadow-2xl mt-6 px-10 py-10 w-full max-w-7xl rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className=" text-black rounded-full px-8 py-5 text-xl font-res font-bold">minimal ai</div>
           
          </div>
         
       
        </div>

        {/* Hero Main Content */}
        <div className=" items-center px-10">
          {/* Text Content */}
          <main className=" mx-28 md:mb-0">
            <span className="text-8xl font-extralight text-black mb-6">Your <strong className='text-[#27391C]'>Minimalistic </strong> AI.</span>
            <p className="text-gray-600 text-xl mb-2 mt-7 px-6">
              Use your favorite model with a clean interface. No clutter, just a focused chat experience.
            </p>
           
          
            
          </main>

           <div className='mt-27 '></div>
         
        </div>
      </div>
      <div className='mr-[150vh]'>
         <button 
    onClick={handleOnclick}
    className="bg-[#DCC5B2] hover:bg-red-600 hover:text-black cursor-pointer text-[#27391C] font-outfit text-lg font-bold py-3 px-6 rounded-b-full shadow transform  origin-left"
  >
    Try For Free
  </button>
      </div>
      {/*  Display Image section*/}
          <div ref={ref} className="flex justify-center w-full mt-10">
      <motion.img
        src="/chatUi.png"
        alt="Chat UI Preview"
        style={{ rotate, scale }}
        className="rounded-xl shadow-xl w-full max-w-5xl"
      />
    </div>
       
      {/* Feature Section */}
      
<section className="w-full max-w-6xl mt-24 px-4">

  
 <h2 className="text-center text-3xl font-medium font-outfit mb-12 pt-3.5 mt-5 text-black">
  <span className="relative brush-stroke text-stone-950 mt-2.5">Why Use minimal?</span> 
</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {/* Feature Item */}
    <div className="flex flex-col items-center text-center bg-[#fffbea] p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="bg-black text-[#D9A299] w-14 h-14 flex items-center justify-center rounded-full mb-4">
        <LaptopMinimal className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-black">Minimal UI</h3>
      <p className="text-sm text-gray-700">Stay focused with a clean and distraction-free interface tailored for deep conversations.</p>
    </div>
       <div className="absolute bottom-16 left-10 opacity-10 z-0">
        <MessageCircle className="w-6 h-6 text-black" />
      </div>
 

    <div className="flex flex-col items-center text-center bg-[#fffbea] p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="bg-black text-[#D9A299] w-14 h-14 flex items-center justify-center rounded-full mb-4">
        <Target className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-black">Prompt Precision</h3>
      <p className="text-sm text-gray-700">Get smarter responses with a tailored prompt engine under the hood.</p>
    </div>

   

  

    <div className="flex flex-col items-center text-center bg-[#fffbea] p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="bg-black text-[#D9A299] w-14 h-14 flex items-center justify-center rounded-full mb-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2 text-black">Privacy First</h3>
      <p className="text-sm text-gray-700">No tracking. Just your conversation, your way.</p>
    </div>
  </div>
</section>


      {/* CTA Text Below Card */}
      <div className="mt-12 text-center text-stone-950 text-lg font-outfit z-10 mb-5">
        No signup, no clutter - just straight-up conversations.
      </div>
        </>
    )
}