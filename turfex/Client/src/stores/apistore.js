import { create } from 'zustand';

export const useApiStore = create((set) => ({
    apiKey: localStorage.getItem("geminiApiKey") || "",
    setApiKey: (key) => {
      localStorage.setItem("geminiApiKey", key);
      set({ apiKey: key });
    },
    clearApiKey: () => {
      localStorage.removeItem("geminiApiKey");
      set({ apiKey: "" });
    },
  }));




