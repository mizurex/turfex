// pages/Chat.jsx
import { useState, useEffect } from 'react';
import ChatInput from '../components/ChatInput';
import Response from '../components/Response';
import { UserButton } from '@clerk/clerk-react';
import { turfexAi } from '../api/turfex';

const Chat = () => {
  const [response, setResponse] = useState('');
  const [loading,setLoading] = useState(false);
  const [memory,setMemory] = useState([]);
  const [editedText,setEditedText] = useState();


  
  const handleSend = async ({ text,tone }) => {
  try {
    setLoading(true);
    const updatedMemory = [...memory, { role: 'user', content: text }];

    const turfAns = await turfexAi(updatedMemory,tone);
    const finalMemory = [...updatedMemory, { role: 'model', content: turfAns }];
    setMemory(finalMemory);
    setResponse(turfAns);
    setLoading(false);
  } catch (error) {
   console.error("API Error:", error);
    setResponse("Something went wrong.");
  }
};


  const handleCopy = () => navigator.clipboard.writeText(editedText);
  const handleSave = () => console.log("Saved:", response);

  return (
  <div className="min-h-screen bg-[#F0E4D3] text-black flex flex-col lg:flex-row ">

  <div className="absolute top-2 left-2 z-20">
  <UserButton />
</div>
 <main className="w-full lg:w-1/2 flex flex-col justify-between border-r border-gray-300">

    <section>

      <div className="pt-[30vh] text-center px-4 sm:px-8">
  <h2 className="text-3xl sm:text-5xl font-light">What can I help you with?</h2>
  <span className="loading loading-infinity loading-md mt-2"></span>
</div>
    </section>
   
   
 

    <section>

       <div className="px-4 sm:px-10 mb-4">
  <ChatInput onSend={handleSend} />
</div>
    </section>
   
  </main>
   <div className="w-full lg:w-1/2 overflow-y-auto max-h-[120vh]  mt-4 lg:mt-0">
  {loading ? (
    <span className="loading loading-dots loading-xs mt-11"></span>
  ) : (
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
