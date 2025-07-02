import { useState, useRef } from 'react';
import { FaTurnUp } from "react-icons/fa6";

const ChatInput = ({ onSend }) => {
 
  const textareaRef = useRef(null);


  const handleInput = () => {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleSend = () => {
    const text = textareaRef.current?.value;
    if (!text.trim()) return;
    onSend({ text });
     textareaRef.current.value = '';
  };

  return (
    <div className="w-full bg-gray-50 rounded-xl p-4 border border-gray-200">
      <textarea
        ref={textareaRef}
        className="w-full bg-transparent text-black resize-none focus:outline-none"
        rows={1}
        onInput={handleInput}
        placeholder="Write your message..."
      />

      <div className="flex  justify-end items-center mt-4">
        
        <button
          onClick={handleSend}
          className="bg-stone-950 text-yellow-200 rounded-lg px-4 py-2 cursor-pointer hover:text-white"
        >
          <FaTurnUp />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
