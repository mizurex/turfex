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
   <div className="min-h-screen bg-[#FFEFEF] text-black flex pl-1.5 pb-1.5 pt-2.5 gap-0.5  ">
   <div className='w-fit h-6'>
     <UserButton/>
   </div>
  <main className="w-[101vh] flex flex-col justify-between px-0.5  border-r   ">
    <section>

       <div className='pt-[160px] text-center px-8 mx-1.5'>
      <h2 className="text-5xl font-light ">What can I help you with?</h2>
      <span className="loading loading-infinity loading-md"></span>
    </div>
    </section>
   
   
  <section>
      

  </section>

    <section>

       <div className='px-10 mb-2.5 '>
      <ChatInput onSend={handleSend} />
    </div>
    </section>
   
  </main>
      <div className="w-1/2 overflow-auto max-h-[98vh] mb-0.5 ml-3.5">
    {loading ? (
   <span className="loading loading-dots loading-xs mt-11"></span>

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
