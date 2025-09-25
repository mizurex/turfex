import { useState, useEffect, useRef } from 'react';

import { turfexAi } from '../api/turfex';
import { useLocalStorage } from '../lib/hooks/storage';
import { useApiStore } from '../stores/apistore';
import { Airplay, Info, Key, Settings, Trash, X } from 'lucide-react';
import { ChatInput } from '../components/chat-input.jsx';
import ChatResponse from '../components/chat-response.jsx';



const Chat = () => {
  const [response, setResponse] = useState('');
  const [loading,setLoading] = useState(false);
  const [editedText,setEditedText] = useState();
  const [memory, setMemory] = useLocalStorage("chatMemory", []);
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [openSettings, setOpenSettings] = useState(false);
  const {apiKey, setApiKey, clearApiKey ,clearChatMemory,clearNotes} = useApiStore();
  const scrollRef = useRef(null);
  const forceScrollRef = useRef(false);
  const bottomRef = useRef(null);
  const apiKeyInputRef = useRef(null);



  
  const handleSend = async ({ text,tone,length,level,language}) => {
  try {
    setLoading(true);
    forceScrollRef.current = true; 
    const updatedMemory = [...memory, { role: 'user', content: text }];
    setMemory(updatedMemory); 

    const turfAns = await turfexAi(updatedMemory,tone,length,level,language,apiKey);
    setMemory((prev) => [...prev, { role: 'model', content: turfAns }]);
   
  } catch (error) {
   console.error("API Error:", error);
   setMemory((prev) => [...prev, { role: "model", content: "Something went wrong." }]);
  } finally {
    setLoading(false);
  }
};


  const handleCopy = () => navigator.clipboard.writeText(editedText);
  const handleSave = (text) => {
    const content = text || editedText || '';
    if (!content) return;
    const now = new Date().toISOString();
    const firstLine = content.split('\n').find(Boolean) || 'Untitled Note';
    const title = firstLine.trim().slice(0, 60);
    const newNote = { id: String(Date.now()), title, content, createdAt: now, updatedAt: now };
    setNotes([newNote, ...notes]);
  };

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

  const handleAddApiKey = () => {
    const key = apiKeyInputRef.current?.value?.trim();
    if (key) {
      setApiKey(key);
      apiKeyInputRef.current.value = '';
    }
  };

  const handleDeleteApiKey = () => {
    clearApiKey();
  };
  const handleDeleteData=()=>{
    try{
      clearChatMemory();
      clearNotes();
      clearApiKey();
    }catch(error){
      console.error("Error", error);
    }
  }
  const handleOpenSettings = () => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
    setOpenSettings(prev => !prev);
  }
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
  
    <div className="flex items-center fixed top-4 left-0 right-0 justify-between px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl mx-auto w-fit mt-4  transition-all duration-200 ">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-medium text-gray-600">Active</span>
        </div>
        <div className="w-px h-4 bg-gray-200"></div>
        <button className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
          <Airplay className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">Chat</span>
        </button>
      </div>
      <button 
        onClick={handleOpenSettings} 
        className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 ml-3 cursor-pointer"
      >
        <Settings className="w-4 h-4" />
      </button>
    </div>
    {openSettings && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">

        <div className="bg-white shadow-xl w-full max-w-3xl max-h-[100vh]  flex flex-col">

          <div className="sticky top-0  px-6 pt-2 border-b border-gray-200  rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
              <button 
                onClick={handleOpenSettings}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
               <X size={16}/>
              </button>
            </div>
            <div className='px-2 py-4 text-center text-gray-600 font-medium'>
            <h2>Customize your Turfex experience and manage your account settings</h2>
          </div>
          </div>
          
          <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Secure Local Storage</h2>
              <p className="text-gray-600 mb-4">Your API keys are protected and never leave your device</p>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 pt-2 rounded-full flex items-center justify-center flex-shrink-0">
                    <Key className='w-4 h-4'/>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Privacy First</h3>
                    <p className="text-sm text-gray-600">
                      API keys are stored locally in your browser and never sent to our servers. They're used only for direct requests to AI providers.
                    </p>
                  </div>
                  <div className='ml-auto border-l border-gray-200 pl-4'>
                    <h2 className='text-sm font-medium text-gray-900 mb-1'>Clear Data </h2>
                    <p className='text-sm text-gray-600'>This will clear all data from your browser</p>
                    <div className='flex justify-center'>
                        <button onClick={handleDeleteData} className='px-4 mt-3 py-2 border border-gray-600 text-red-600 rounded-lg border-red-500 cursor-pointer text-xs flex items-center'>
                      Delete
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                 Gemini API Key
              </label>
              <div className="flex gap-2">
                <input
                  ref={apiKeyInputRef}
                  type="password"
                  placeholder={apiKey ? "••••••••••••••••••••••••" : "Enter your Gemini API key"}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                />
                {!apiKey &&(
                     <button
                  onClick={handleAddApiKey}
                  className="px-2  bg-black text-white rounded-lg hover:bg-gray-700 text-xs flex items-center"
                >
                  Add Key
                 
                </button>
                )}
             
                {apiKey && (
                  <button
                    onClick={handleDeleteApiKey}
                    className="px-4 py-2 border border-gray-600 text-gray-300 hover:text-red-600 rounded-lg hover:border-red-500 cursor-pointer text-xs flex items-center"
                  >
                   <Trash size={16} className='text-red-500'/>
                
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Get your free API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a>
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  <Info size={16}/>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Quick Guide</h2>
              </div>
              <p className="text-gray-600 mb-4">Everything you need to know about API key management</p>
              
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>API keys are stored securely in your browser's local storage</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>You only need to configure keys for the AI providers you want to use</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Keys are never shared with VT servers - they go directly to AI providers</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>You can update or remove keys at any time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    <div ref={scrollRef} className={`flex-1 w-full flex justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto scroll-smooth custom-scrollbar pt-10`}>
      <div className="w-full sm:w-[90%] lg:w-1/2 py-8 pb-40 space-y-6">
        
          <ChatResponse
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
   
    <div className="w-full flex justify-center bg-white fixed bottom-0 pb-3 z-40">
      <div className="w-full rounded-md sm:w-[80%] md:w-[70%] lg:w-[50%] h-fit ">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  </div>

  );
};

export default Chat;
