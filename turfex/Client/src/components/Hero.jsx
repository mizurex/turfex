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
        <div className="flex flex-col justify-center items-center text-center text-black px-4">
          <div className="text-sm font-semibold mb-4 border-b-2 border-black pb-2"> Trusted by 1000+ users </div>
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the future of AI
      </h1>
      <p className="text-lg max-w-xl">
        We are a team of developers who are passionate about creating the best AI tools for our users.
      </p>
    </div>
        
        </>
    )
}