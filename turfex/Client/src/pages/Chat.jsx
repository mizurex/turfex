// pages/Chat.jsx
import { useState, useEffect, useRef } from 'react';
import ChatInput from '../components/ChatInput';
import Response from '../components/Response';
import { UserButton } from '@clerk/clerk-react';
import { turfexAi } from '../api/turfex';
import { useLocalStorage } from '../lib/hooks/storage';

const Chat = () => {
  const [response, setResponse] = useState('');
  const [loading,setLoading] = useState(false);
  const [editedText,setEditedText] = useState();
  const [memory, setMemory] = useLocalStorage("chatMemory", []);
  const scrollRef = useRef(null);
  const forceScrollRef = useRef(false);
  const bottomRef = useRef(null);


  
  const handleSend = async ({ text,tone,length,level,language}) => {
  try {
    setLoading(true);
    forceScrollRef.current = true; // ensure we scroll on user send
    const updatedMemory = [...memory, { role: 'user', content: text }];
    setMemory(updatedMemory); // show user message immediately

    const turfAns = await turfexAi(updatedMemory,tone,length,level,language);
    setMemory((prev) => [...prev, { role: 'model', content: turfAns }]);
   
  } catch (error) {
   console.error("API Error:", error);
   setMemory((prev) => [...prev, { role: "model", content: "Something went wrong." }]);
  } finally {
    setLoading(false);
  }
};


  const handleCopy = () => navigator.clipboard.writeText(editedText);
  const handleSave = () => console.log("Saved:", response);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const nearBottom = distanceFromBottom < 100;
    if (forceScrollRef.current || nearBottom) {
      if (bottomRef.current && bottomRef.current.scrollIntoView) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      } else {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      }
      forceScrollRef.current = false;
    }
  }, [memory, loading]);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
    {/* Top bar */}
    <div className="absolute top-2 left-2 z-20">
      <UserButton />
    </div>
    <div ref={scrollRef} className="flex-1 w-full flex justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto scroll-smooth">
      <div className="w-full sm:w-[90%] lg:w-1/2 py-8 pb-28 space-y-6">
        
          <Response
  memory={memory}   
  onCopy={handleCopy}
  onSave={handleSave}
  editedText={editedText}
  setEditedText={setEditedText}
  loading={loading}
/>
        <div ref={bottomRef} />
      </div>
    </div>

    <div className="w-full flex justify-center bg-white fixed bottom-0 pb-3">
      <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[50%] h-fit">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  </div>

  );
};

export default Chat;
