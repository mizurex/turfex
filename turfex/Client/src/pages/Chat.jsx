// pages/Chat.jsx
import { useState } from 'react';
import ChatInput from '../components/ChatInput';
import Response from '../components/Response';

const Chat = () => {
  const [response, setResponse] = useState('');
  const [loading,setLoading] = useState(false);

  const handleSend = async ({ text }) => {
    
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/api/turfex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text })
      });
      const data = await res.json();
      setResponse(data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Something went wrong.");
    }
  };

  const handleCopy = () => navigator.clipboard.writeText(response);
  const handleSave = () => console.log("Saved:", response);

  return (
   <div className="min-h-screen bg-white text-black flex pr-8 pt-5 gap-8 ml-5 ">
  

  <section className="w-1/2 flex flex-col justify-between px-0.5 ml-0.5 border-r mb-1.5">
    <div className='pt-[250px] text-center pr-5'>
      <h2 className="text-5xl font-light ">What can I help you with?</h2>
      <span className="loading loading-infinity loading-md"></span>
    </div>
   
    

    <div className='px-5 mr-4 mb-1'>
      <ChatInput onSend={handleSend} />
    </div>
  </section>
      <div className="w-1/2 overflow-auto max-h-[98vh] mb-0.5">
    {loading ? (
   <span className="loading loading-dots loading-xs"></span>

    ):(

    <Response result={response} onCopy={handleCopy} onSave={handleSave} />
  
    )}
 </div>
  
</div>

  );
};

export default Chat;
