import { useState, useEffect } from 'react';
import { IoMdCopy } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaEdit, FaSave } from "react-icons/fa";
import TypeWriter from './TypeWriter';

const Response = ({ result, onCopy, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [show, setShow] = useState(true);
  const [editedText, setEditedText] = useState(result); // ✅ this stores editable text

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => {
      setEditedText(result);      // ✅ Reset edit text when new result comes
      setShow(true);
      setTypingDone(false);
      setEditMode(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [result]);

  if (!result) return null;

  return (
    <div className=" p-4   h-full">
      <div className="flex justify-end gap-2 mb-2">
        <button onClick={onCopy} title="Copy"><IoMdCopy /></button>
      

        {typingDone && (
          editMode ? (
            <button onClick={() => setEditMode(false)} title="Save Edits">
              
            </button>
          ) : (
            <button onClick={() => setEditMode(true)} title="Edit Text">
              <FaEdit />
            </button>
          )
        )}
      </div>

      {show && (
        <div className="font-book break-words whitespace-pre-wrap overflow-hidden max-w-full mt-2 p-4 text-[15px] text-[#2c2c2c] bg-[#fdfaf5] font-serif leading-relaxed rounded-md shadow-sm">
          {editMode ? (
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)} // ✅ updates live
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              className="w-full bg-transparent outline-none resize-none overflow-hidden min-h-screen"
              placeholder="Edit your text..."
            />
          ) : (
            <TypeWriter text={editedText} speed={5} onDone={() => setTypingDone(true)} />
          )}
        </div>
      )}
    </div>
  );
};

export default Response;
