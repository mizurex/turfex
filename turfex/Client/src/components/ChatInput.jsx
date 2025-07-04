import { useState, useRef } from 'react';
import { ChevronDown, Settings2 } from 'lucide-react';
import { FaArrowRight, FaSearchMinus } from 'react-icons/fa';

const ChatInput = ({ onSend }) => {
  const [selectedModel, setSelectedModel] = useState('Gemini');
  const [showOptions, setShowOptions] = useState(false);
  const [text, setText] = useState(''); 
  const textareaRef = useRef(null);

  const handleOptions = ()=>{

  }

  const handleInput = (e) => {
    const value = e.target.value;
    setText(value+selectedOption); 
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleSend = () => {
    if (!text.trim()) return;
    onSend({ text, model: selectedModel });
    setText('');
    textareaRef.current.value = '';
    textareaRef.current.style.height = 'auto'; // reset height
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setShowOptions(false);
  };

  return (
    <div className="w-full bg-gray-50 rounded-xl p-4 border border-black">
      <textarea
        ref={textareaRef}
        className="w-full bg-transparent text-black resize-none focus:outline-none"
        rows={1}
        value={text}
        onChange={handleInput}
        placeholder="Write your message..."
      />

      <div className="flex items-center mt-4 justify-between">
        {/* Dropdown */}
        <div className="relative flex space-x-1.5 text-left mt-3">
          <button
            onClick={() => setShowOptions(!showOptions)}
            type="button"
            className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-black hover:bg-gray-100"
          >
            {selectedModel}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>

          {showOptions && (
            <ul className="absolute z-10 bottom-full mb-1 font-medium w-45 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <li>
                <button
                  className="block w-full px-4 py-2 text-left"
                  onClick={() => handleModelSelect('Gemini')}
                >
                  Gemini 2.0 Flash
                </button>
              </li>
              <li>
                <button className="block w-full px-4 py-2 text-left text-gray-400 cursor-not-allowed" disabled>
                  GPT-4 (coming soon)
                </button>
              </li>
              <li>
                <button className="block w-full px-4 py-2 text-left text-gray-400 cursor-not-allowed" disabled>
                  Claude (coming soon)
                </button>
              </li>
            </ul>
          )}
          <div className='pt-2.5'>
            <button onClick={handleOptions}>
              <Settings2 />
            </button>
            
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className={`mt-3 px-5 py-2 rounded-lg border transition-colors duration-200 ${
            text.trim()
              ? 'bg-black text-white hover:bg-white hover:text-black'
              : 'bg-gray-300 text-white cursor-not-allowed'
          }`}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
