
import { Search, MessageCircle, User, Edit3 } from 'lucide-react';
import { Hero } from '../../components/Hero';
import { Footer } from '../../components/Footer';
import { DisplaySection } from './DisplaySection';
export function HomePage(){
    return(
      <div className="relative h-screen w-full">
      <img 
        src="/hero.png" 
        alt="Hero" 
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex flex-col pt-40  h-full text-center text-black px-4">
        <h1 className="text-4xl font-bold mb-4 text-[#373667]">
          Welcome to the future of AI
        </h1>
        <p className="text-lg  text-[#373667] text-center">
          We are a team of developers who are passionate about creating the best AI tools for our users.
        </p>
      </div>
    </div>

    )
}