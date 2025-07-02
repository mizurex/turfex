import { Search, MessageCircle, User, Edit3 } from 'lucide-react';
export function Hero(){
    return(
        <>
         <div className="relative z-10 bg-white shadow-2xl mt-6 px-10 py-10 w-full max-w-7xl rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="bg-black text-white rounded-full px-5 py-3 text-xs font-bold">turfex</div>
            <span className="font-semibold text-lg text-black mt-0.5">AI</span>
          </div>
          <nav className="flex gap-8 text-sm font-medium text-gray-700">
            <a href="#" className="border-b-2 border-black">About</a>
            <a href="#" className="border-b-2 border-black">Twitter</a>
          </nav>
          <Search className="text-black w-5 h-5" />
        </div>

        {/* Hero Main Content */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <main className="flex flex-col items-start max-w-md mb-10 md:mb-0">
            <h1 className="text-8xl font-extrabold text-black mb-6">Your <strong className='text-yellow-200'>Minimalistic </strong> AI.</h1>
            <p className="text-gray-600 text-sm mb-8">
              Use your favorite model with a clean interface. No clutter, just a focused chat experience.
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-full shadow">
              Start Chatting
            </button>
          </main>

          {/* Phone Preview */}
         
        </div>
      </div>
      {/* Feature Section */}
<section className="w-full max-w-6xl mt-24 px-4">

  
 <h2 className="text-center text-3xl font-bold mb-12 text-black">
  Why Use<span className="relative brush-stroke text-stone-950">Turfex AI?</span> 
</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {/* Feature Item */}
    <div className="flex flex-col items-center text-center bg-[#fffbea] p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="bg-black text-yellow-200 w-14 h-14 flex items-center justify-center rounded-full mb-4">
        <User className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-black">Minimal UI</h3>
      <p className="text-sm text-gray-700">Stay focused with a clean and distraction-free interface tailored for deep conversations.</p>
    </div>

 

    <div className="flex flex-col items-center text-center bg-[#fffbea] p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="bg-black text-yellow-200 w-14 h-14 flex items-center justify-center rounded-full mb-4">
        <Search className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-black">Prompt Precision</h3>
      <p className="text-sm text-gray-700">Get smarter responses with a tailored prompt engine under the hood.</p>
    </div>

   

  

    <div className="flex flex-col items-center text-center bg-[#fffbea] p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="bg-black text-yellow-200 w-14 h-14 flex items-center justify-center rounded-full mb-4">
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
      <div className="mt-12 text-center text-stone-950 text-sm z-10 mb-5">
        No signup, no clutter – just straight-up conversations.
      </div>
        </>
    )
}