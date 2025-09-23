import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowUp, Paperclip, Mic, Globe, BarChart3, FileText, Bookmark, Image, X, Cpu } from 'lucide-react';

export const ChatInput = ({ onSend }) => {
  const MODELS = [
    { label: 'Gemini 2.5 Flash Lite', value: 'gemini-flash-lite', free: true, icon: '@' },
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
              <span className="text-black"> <Cpu size={16}/></span>
              <span></span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {showOptions && (
              <div className="absolute left-0 bottom-full mb-2 w-56 bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden z-20">
                {MODELS.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => handleModelSelect(m)}
                    className={`w-full px-3 py-2 flex items-center justify-between text-left hover:bg-gray-50 ${!m.free ? 'opacity-80 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-black"><Cpu size={16}/></span>
                      <span className="text-sm text-gray-800">{m.label}</span>
                    </div>
                    {!m.free && (
                      <span className="text-xs bg-amber-100 text-amber-700 rounded-full px-2 py-0.5">soon</span>
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
      {showPromptTips && (
        <div className="prompt-tips-container absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-300 rounded-xl shadow-lg p-4 z-30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Prompting Tips for Study and Better Answers</h3>
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
              <span>Start with your goal. Say what you need and why (e.g., exam prep, project, quick overview).</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Add context. Include subject, level (school/college/pro), and any limits or rules.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Ask for structure. Request an outline, steps, or headings to keep it clear.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Be specific about format. Ask for bullets, a table, code, or examples.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Ask for reasoning. Say “explain step by step” or “show your working.”</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Set depth. Choose quick summary, medium detail, or deep dive.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Share what you know. Paste your notes or attempt and ask to improve it.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Define boundaries. Word limit, tone, citations, or syllabus topics only.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Ask for checks. Request key takeaways, common mistakes, and a short recap.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Follow up. Ask for practice questions or a mini quiz to test yourself.</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs hover:bg-orange-200">
              Summarize chapter
            </button>
            <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs hover:bg-orange-200">
              Explain step-by-step
            </button>
            <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs hover:bg-orange-200">
              Give examples
            </button>
            <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs hover:bg-orange-200">
              Compare concepts
            </button>
            <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs hover:bg-orange-200">
              Make a study plan
            </button>
            <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs hover:bg-orange-200">
              Quiz me
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
