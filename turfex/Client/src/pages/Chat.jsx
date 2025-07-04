// pages/Chat.jsx
import { useState, useEffect } from 'react';
import ChatInput from '../components/ChatInput';
import Response from '../components/Response';
import { UserButton } from '@clerk/clerk-react';

const Chat = () => {
  const [response, setResponse] = useState('');
  const [loading,setLoading] = useState(false);
  const [memory,setMemory] = useState([]);
  const [editedText,setEditedText] = useState();


  
  const handleSend = async ({ text }) => {
  try {
    setLoading(true);
    const updatedMemory = [...memory, { role: 'user', content: text }];

  
    const res = await fetch('http://localhost:3001/api/turfex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updatedMemory })
    });

    // Step 3: Get AI's response
    const data = await res.json();

    // Step 4: Add AI's response to memory too
    const finalMemory = [...updatedMemory, { role: 'model', content: data.answer }];

    setMemory(finalMemory); // Save full conversation
    setResponse(data.answer); // Show only latest response
    setLoading(false);
  } catch (error) {
    console.error("Error:", error);
    setResponse("Something went wrong.");
  }
};


  const handleCopy = () => navigator.clipboard.writeText(editedText);
  const handleSave = () => console.log("Saved:", response);

  return (
   <div className="min-h-screen bg-white text-black flex p-3 pt-5 gap-0.5  ">
   <div className='w-fit pl-2'>
     <UserButton/>
   </div>
  <main className="w-[89vh] flex flex-col justify-between px-0.5  border-r mb-1.5  ">
    <section>

       <div className='pt-[160px] text-center pr-5 mr-9'>
      <h2 className="text-5xl font-light ">What can I help you with?</h2>
      <span className="loading loading-infinity loading-md"></span>
    </div>
    </section>
   
   <style>
    {`
      @media (min-width: 640px) {
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
        }
      }
    `}
  </style>
  <section>
      <div className="feature-grid mt-4 w-full pr-16">
    <div className="border border-black rounded-lg bg-gray-50 p-4 shadow-sm flex flex-col items-start">
      <h1 className="font-semibold text-lg mb-1">Strategic content ideas</h1>
      <p className="text-sm text-gray-700">Get SEO-optimized topic suggestions that your audience is searching for.</p>
    </div>
    <div className="border border-black rounded-lg bg-gray-50 p-4 shadow-sm flex flex-col items-start">
      <h1 className="font-semibold text-lg mb-1">AI-powered outlines</h1>
      <p className="text-sm text-gray-700">Generate detailed outlines for your articles in seconds.</p>
    </div>
   
  </div>

  </section>

    <section>

       <div className='px-2  mb-2.5 mr-16'>
      <ChatInput onSend={handleSend} />
    </div>
    </section>
   
  </main>
      <div className="w-1/2 overflow-auto max-h-[98vh] mb-0.5">
    {loading ? (
   <span className="loading loading-dots loading-xs"></span>

    ):(

    <Response 
     result={response} 
  onCopy={handleCopy} 
  onSave={handleSave}
  editedText={editedText}
  setEditedText={setEditedText}
    />
  
    )}
 </div>
  
</div>

  );
};

export default Chat;
