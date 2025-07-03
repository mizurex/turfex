import { useState, useRef } from 'react';
import { FaArrowsTurnRight, FaDiamondTurnRight, FaTruckArrowRight, FaTruckPlane, FaTurnUp } from "react-icons/fa6";
import { ChevronDown } from 'lucide-react';
import { FaArrowRight } from 'react-icons/fa';

const ChatInput = ({ onSend }) => {
  const [selectedModel, setSelectedModel] = useState('Gemini');
  const [showOptions, setShowOptions] = useState(false);
  const textareaRef = useRef(null);

  const handleInput = () => {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleSend = () => {
    const text = textareaRef.current?.value;
    if (!text.trim()) return;

    onSend({ text, model: selectedModel });
    textareaRef.current.value = '';
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setShowOptions(false); // hide dropdown after selecting
  };

  return (
    <div className="w-full bg-gray-50 rounded-xl p-4  border border-gray-200">
      <textarea
        ref={textareaRef}
        className="w-full bg-transparent text-black resize-none focus:outline-none"
        rows={1}
        onInput={handleInput}
        placeholder="Write your message..."
      />

      {/* Dropdown */}
   

      {/* Send Button */}
      <div className="flex  items-center mt-4 justify-between">
           <div className="relative inline-block text-left mt-3 ">
        <button
          onClick={() => setShowOptions(!showOptions)}
          type="button"
          className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-black hover:bg-gray-100"
        >
          {selectedModel}
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>

        {showOptions && (
<ul className="absolute z-10 bottom-full font-medium mb-0.5 shadow-gray-400 w-45 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

            <li>
              <button
                className="block w-full px-4 py-2 text-sm text-left cursor-pointer"
                onClick={() => handleModelSelect('Gemini')}
              >
                Gemini
              </button>
            </li>
            <li>
              <button
                className="block w-full px-4 py-2 text-sm text-left text-gray-400 cursor-not-allowed"
                disabled
              >
                GPT-4 (coming soon)
              </button>
            </li>
            <li>
              <button
                className="block w-full px-4 py-2 text-sm text-left text-gray-400 cursor-not-allowed"
                disabled
              >
                Claude (coming soon)
              </button>
            </li>
          </ul>
        )}
      </div>
        <button
          onClick={handleSend}
          className="bg-stone-950 text-white rounded-lg px-5 py-2 cursor-pointer hover:text-black hover:bg-white hover: border border-black"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
