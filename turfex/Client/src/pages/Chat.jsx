// pages/Chat.jsx
import { useState } from 'react';
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

    // Step 1: Add the user message to memory
    const updatedMemory = [...memory, { role: 'user', content: text }];

    // Step 2: Send memory (conversation so far) to the backend
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
   <div className="min-h-screen bg-white text-black flex pr-8 pt-5 gap-8  ">
   <div className='w-fit pl-2'>
     <UserButton/>
   </div>
  <section className="w-[89vh] flex flex-col justify-between px-0.5  border-r mb-1.5  ">
    <div className='pt-[250px] text-center pr-5 mr-9'>
      <h2 className="text-5xl font-light ">What can I help you with?</h2>
      <span className="loading loading-infinity loading-md"></span>
    </div>
   
    

    <div className='px-2  mb-2.5 mr-9'>
      <ChatInput onSend={handleSend} />
     
    </div>
  </section>
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
