import { useState, useRef, useEffect } from 'react';
import { ChevronDown, CircleArrowUp, FileSliders } from 'lucide-react';
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
    <div className="w-full bg-white rounded-full px-5 flex justify-center items-center py-3 border border-gray-200 gap-2">
      <textarea
        ref={textareaRef}
        className="w-full bg-transparent text-black resize-none focus:outline-none bg-[#f8fafc]"
        rows={1}
        value={text}
        onChange={handleInput}
        placeholder="Write your message..."
      />

    <button className="bg-black text-white rounded-full cursor-pointer">
      <CircleArrowUp
      onClick={handleSend}
      className="w-8 h-8 hover:text-neutral-500"/>
    </button>
    </div>
  );
};

export default ChatInput;
