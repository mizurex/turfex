// pages/Chat.jsx
import { useState } from 'react';
import ChatInput from '../components/ChatInput';
import Response from '../components/Response';

const Chat = () => {
  const [response, setResponse] = useState('');

  const handleSend = async ({ text }) => {
    try {
      const res = await fetch('http://localhost:3001/api/turfex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text })
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Something went wrong.");
    }
  };

  const handleCopy = () => navigator.clipboard.writeText(response);
  const handleSave = () => console.log("Saved:", response);

  return (
    <div className="min-h-screen bg-white text-black flex px-6 pt-5 gap-10">
      
      <section className="w-1/2 flex flex-col justify-between px-0.5 py-3">
        <div>
          <h2 className="text-5xl font-light mb-10">What can I help you with?</h2>
        </div>
        <div className='flex space-x-6'>
          <button className='border border-black rounded-full'>
            Write me a essay -^
          </button>
           <button className='border border-black rounded-full'>
            Write me a essay -^
          </button>
           <button className='border border-black rounded-full'>
            Write me a essay -^
          </button>
        </div>

        <div>
          <ChatInput onSend={handleSend} />

        </div>
        
      </section>

      <div className="w-1/2 overflow-auto  max-h-[98vh] mb-0.5">
        <Response result={response} onCopy={handleCopy} onSave={handleSave} />
      </div>
    </div>
  );
};

export default Chat;
