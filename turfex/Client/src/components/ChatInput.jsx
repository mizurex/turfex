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

      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2 text-sm">
          <select
            className="border rounded p-2 bg-white"
            onChange={(e) => (moodRef.current = e.target.value)}
          >
            <option value="Casual">Casual</option>
            <option value="Serious">Serious</option>
            <option value="Funny">Funny</option>
          </select>

          <select
            className="border rounded p-2 bg-white"
            onChange={(e) => (actionRef.current = e.target.value)}
          >
            <option value="Formatting">Formatting</option>
            <option value="Improving">Improving</option>
            <option value="Correcting">Correcting</option>
          </select>
        </div>

        <button
          onClick={handleSend}
          className="bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800"
        >
          <FaTurnUp />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
