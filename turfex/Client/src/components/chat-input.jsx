import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowUp, Paperclip, Mic, Globe, BarChart3, FileText, Bookmark, Image, X } from 'lucide-react';

const ChatInput = ({ onSend }) => {
  const MODELS = [
    { label: 'Gemini 2.5 Flash Lite', value: 'gemini-flash-lite', free: true, icon: '💎' },
    { label: 'GPT-4o', value: 'gpt-4o', free: false },
    { label: 'Claude 3.5 Sonnet', value: 'claude-3.5-sonnet', free: false },
    { label: 'o3-mini', value: 'o3-mini', free: false },
  ];

  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [showOptions, setShowOptions] = useState(false);
  const [text, setText] = useState('');
  const [tone, setTone] = useState('Professional');
  const [showTones, setShowTones] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [length, setLength] = useState('Medium');
  const [level, setLevel] = useState('College');
  const [language, setLanguage] = useState('English');
  const [showPromptTips, setShowPromptTips] = useState(false);

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
      model: selectedModel?.value,
    });
    setText('');
    textareaRef.current.value = '';
    textareaRef.current.style.height = 'auto';
  };

  const handleModelSelect = (model) => {
    if (model.free) {
      setSelectedModel(model);
      setShowOptions(false);
    }
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
      if (!event.target.closest('.prompt-tips-container')) {
        setShowPromptTips(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="w-full bg-white rounded-2xl px-4 py-3 border border-gray-200 shadow-sm">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              className="w-full bg-transparent text-black resize-none focus:outline-none placeholder:text-gray-400 text-[15px] leading-6"
              rows={1}
              value={text}
              onChange={handleInput}
              placeholder="Ask anything"
            />
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowPromptTips(true)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500" 
              title="Web Search"
            >
              <Globe className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500" title="Charts">
              <BarChart3 className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500" title="Documents">
              <FileText className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500" title="Images">
              <Image className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500" title="Upload">
              <Bookmark className="w-4 h-4" />
            </button>
            <button onClick={handleSend} className="rounded-full cursor-pointer p-2 bg-gray-900 hover:bg-gray-800" title="Send">
              <ArrowUp className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="relative" ref={modelRef}>
            <button
              onClick={() => setShowOptions((s) => !s)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
            >
              <span className="text-black">◆</span>
              <span>{selectedModel.label}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {showOptions && (
              <div className="absolute left-0 bottom-full mb-2 w-72 bg-white border rounded-xl shadow-lg overflow-hidden z-20">
                {MODELS.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => handleModelSelect(m)}
                    className={`w-full px-3 py-2 flex items-center justify-between text-left hover:bg-gray-50 ${!m.free ? 'opacity-80 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-black">◆</span>
                      <span className="text-sm text-gray-800">{m.label}</span>
                    </div>
                    {!m.free && (
                      <span className="text-xs bg-amber-100 text-amber-700 rounded-full px-2 py-0.5">Upgrade</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-100 text-orange-700 text-sm font-medium hover:bg-orange-200">
            <Image className="w-4 h-4" />
            <span>Generate Image</span>
          </button>
        </div>
      </div>

      {/* Nano Banana - Image Prompting Tips */}
      {showPromptTips && (
        <div className="prompt-tips-container absolute bottom-full left-0 mb-2 w-full bg-white border rounded-xl shadow-lg p-4 z-30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Nano Banana - Image Prompting Tips</h3>
            <button
              onClick={() => setShowPromptTips(false)}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-2 text-sm text-gray-700 mb-4">
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Describe the scene in full sentences, not keywords.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>For photorealism: shot type, lens, lighting, mood, textures.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>For stickers/illustrations: style, palette, line/shading, transparent background.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>To edit an image: attach it and describe precise changes only.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Use aspect hints like "16:9" or "square" if you care about layout.</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs hover:bg-orange-200">
              Photorealistic
            </button>
            <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs hover:bg-orange-200">
              Sticker
            </button>
            <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs hover:bg-orange-200">
              Product
            </button>
            <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs hover:bg-orange-200">
              Minimalist
            </button>
            <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs hover:bg-orange-200">
              Comic
            </button>
            <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs hover:bg-orange-200">
              Edits
            </button>
          </div>

          <button 
            onClick={() => setShowPromptTips(false)}
            className="mt-3 text-xs text-gray-500 underline hover:text-gray-700"
          >
            Collapse
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
