 import { Search, MessageCircle, User, Edit3 } from 'lucide-react';

export function DisplaySection() {
  return (
  <section className="relative bg-white border-1 font-outfit text-black py-2 px-5 rounded-2xl overflow-hidden text-center">


  {/* Background decorative blobs */}
  <div className="absolute top-0 left-0 w-28 h-28 bg-[#D9A299] rounded-br-full z-0"></div>
  <div className="absolute bottom-0 right-0 w-12 h-12 bg-[#D9A299   ] rounded-tl-full z-0 " />

  {/* Lucide Icons as background decorations */}
  <div className="absolute bottom-16 left-10 opacity-10 z-0">
    <MessageCircle className="w-8 h-8 text-red-400" />
  </div>
  <div className="absolute top-20 right-40 opacity-10 z-0">
    <User className="w-8 h-8 text-black" />
  </div>

  {/* Custom mobile-shaped SVG */}
  <svg
    className="absolute bottom-10 right-16 w-72 h-[500px] opacity-5 z-0"
    viewBox="0 0 200 400"
    fill="none"
    stroke="black"
    strokeWidth="1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="1" width="198" height="398" rx="30" />
  </svg>

  {/* Actual content */}
<div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
  
  
  <h2 className="text-3xl font-outfit md:text-5xl font-medium pl-3.5 mb-4">
    Power up your <span className="text-[#27391C]">productivity</span> with Minimal AI.
  </h2>

  <p className="text-lg font-outfit text-gray-500 mb-8">
    Generate responses, summarize documents, all in one distraction-free interface.
  </p>

  

  <button className="bg-[#FAF7F3] font-outfit cursor-pointer hover:bg-amber-50 text-black font-semibold px-6 py-3 rounded-full shadow-md transition">
    Try minimal
  </button>
</div>

</section>

  );
}
