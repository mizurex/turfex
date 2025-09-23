import { create } from 'zustand';

export const useApiStore = create((set) => ({
    apiKey: localStorage.getItem("geminiApiKey") || "",
    chatMemory : localStorage.getItem("chatMemory") || [],
    notes : localStorage.getItem("notes") || [],
    setApiKey: (key) => {
      localStorage.setItem("geminiApiKey", key);
      set({ apiKey: key });
    },
    clearApiKey: () => {
      localStorage.removeItem("geminiApiKey");
      set({ apiKey: "" });
    },
    clearChatMemory: () => {
      localStorage.removeItem("chatMemory");
      set({ chatMemory: [] });
    },
    clearNotes: () => {
      localStorage.removeItem("notes");
      set({ notes: [] });
    },
  }));




