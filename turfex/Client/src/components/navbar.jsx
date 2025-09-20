import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApiStore } from '../stores/apistore';

export const Navbar = () => {
  const hasClerk = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
  const { apiKey, setApiKey, clearApiKey } = useApiStore();
  const [open, setOpen] = useState(false);
  const [keyInput, setKeyInput] = useState(apiKey || '');
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const saveKey = () => {
    setApiKey(keyInput.trim());
    setOpen(false);
  };

  const clearAllData = () => {
    try {
      localStorage.removeItem('chatMemory');
      localStorage.removeItem('notes');
      localStorage.removeItem('geminiApiKey');
      clearApiKey();
    } catch (e) {}
    setOpen(false);
  };

  return (
    <nav>
      {/* Edit Your navbar  */}
    </nav>
  );
};
