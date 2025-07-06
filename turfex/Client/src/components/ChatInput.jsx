import { useState, useRef, useEffect } from 'react';
import { ChevronDown, FileSliders } from 'lucide-react';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from "framer-motion";

const ChatInput = ({ onSend }) => {
  const [selectedModel, setSelectedModel] = useState('Gemini');
  const [showOptions, setShowOptions] = useState(false);
  const [text, setText] = useState('');
  const [tone, setTone] = useState('Professional');
  const [showTones, setShowTones] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [length, setLength] = useState('Medium');
  const [level, setLevel] = useState('College');
  const [language, setLanguage] = useState('English');

  const textareaRef = useRef(null);
  const settingsRef = useRef(null);
  const toneRef = useRef(null);
  const modelRef = useRef(null);

  const handleInput = (e) => {
    const value = e.target.value;
    setText(value);
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleSend = () => {
    if (!text.trim()) return;
    onSend({
      text,
      tone,
      length,
      level,
      language,
    });
    setText('');
    textareaRef.current.value = '';
    textareaRef.current.style.height = 'auto';
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setShowOptions(false);
  };

  const handleSelectTone = (newTone) => {
    setTone(newTone);
    setShowTones(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        settingsRef.current && !settingsRef.current.contains(event.target)
      ) {
        setShowSettings(false);
      }
      if (
        toneRef.current && !toneRef.current.contains(event.target)
      ) {
        setShowTones(false);
      }
      if (
        modelRef.current && !modelRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <div className="relative flex space-x-2 text-left mt-3">

          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className=" mt-0.5 px-3 py-2 rounded-md bg-white hover:bg-gray-100"
            >
              <FileSliders className="h-5 w-5" />
            </button>
            {showSettings && (
               <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 10 }}
  transition={{ duration: 0.2 }}
  className="absolute bottom-full mb-4 w-[320px] rounded-xl bg-white/80 backdrop-blur-md shadow-lg p-5 border border-gray-100 z-50"
>
  <h2 className="text-base font-semibold text-gray-700 mb-4">Response Preferences</h2>

  <div className="space-y-4 text-sm text-gray-600">
    {/* Tone */}
    <div>
      <label className="block mb-1 font-medium text-gray-600">Tone</label>
      <select
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-800 px-4 py-2 text-sm
                   focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300
                   transition-all duration-200 ease-in-out appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3e%3cpath d='M7 7l3-3 3 3m0 6l-3 3-3-3' stroke='%239CA3AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.75rem center',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem' // Ensure text doesn't overlap the custom arrow
        }}
      >
        <option value="professional">Professional</option>
        <option value="frank">Frank</option>
        <option value="academic">Academic</option> {/* Changed 'School' to 'Academic' for professionalism */}
      </select>
    </div>

    {/* Length */}
    <div>
      <label className="block mb-1 font-medium text-gray-600">Response Length</label>
      <select
        value={length}
        onChange={(e) => setLength(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-800 px-4 py-2 text-sm
                   focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300
                   transition-all duration-200 ease-in-out appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3e%3cpath d='M7 7l3-3 3 3m0 6l-3 3-3-3' stroke='%239CA3AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.75rem center',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem'
        }}
      >
        <option value="short">Short</option>
        <option value="medium">Medium</option>
        <option value="long">Long</option>
      </select>
    </div>

    {/* Level */}
    <div>
      <label className="block mb-1 font-medium text-gray-600">Institute Level</label>
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-800 px-4 py-2 text-sm
                   focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300
                   transition-all duration-200 ease-in-out appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3e%3cpath d='M7 7l3-3 3 3m0 6l-3 3-3-3' stroke='%239CA3AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.75rem center',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem'
        }}
      >
        <option value="school">School</option>
        <option value="college">College</option>
        <option value="research">Research</option>
      </select>
    </div>

    {/* Language */}
    <div>
      <label className="block mb-1 font-medium text-gray-600">Language</label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-800 px-4 py-2 text-sm
                   focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300
                   transition-all duration-200 ease-in-out appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3e%3cpath d='M7 7l3-3 3 3m0 6l-3 3-3-3' stroke='%239CA3AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.75rem center',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem'
        }}
      >
        <option value="english">English</option>
        <option value="hindi">Hindi</option>
        <option value="french">French</option>
      </select>
    </div>
  </div>
</motion.div>
            )}
          </div>

          <div className="relative" ref={modelRef}>
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="inline-flex mt-0.5 justify-center items-center rounded-ee-full border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-black hover:bg-gray-100"
            >
              {selectedModel}
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>

            {showOptions && (
              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              className="absolute z-10 bottom-full mt-1 w-48 rounded-md shadow-lg bg-white mb-3.5 ring-opacity-5">
                <li>
                  <button
                    className="block w-full  px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => handleModelSelect('Gemini')}
                  >
                    Gemini 2.0 Flash
                  </button>
                </li>
                <li>
                  <button disabled className="block w-full px-4 py-2 text-left text-gray-400 cursor-not-allowed">
                    GPT-4 (coming soon)
                  </button>
                </li>
                <li>
                  <button disabled className="block w-full px-4 py-2 text-left text-gray-400 cursor-not-allowed">
                    Claude (coming soon)
                  </button>
                </li>
              </motion.ul>
            )}
          </div>
        </div>

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
