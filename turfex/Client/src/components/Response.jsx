import { useState, useEffect, useRef } from 'react';
import { IoMdCopy } from "react-icons/io";
import { FaCopy, FaHeart, FaPen } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaEdit, FaSave } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa"; // PDF icon
import { jsPDF } from "jspdf"; // 👈 import jsPDF
import TypeWriter from './TypeWriter';
import { Book, Copy, Delete, Ellipsis, Pen, PenIcon } from 'lucide-react';

const Response = ({ result, onCopy, onSave, editedText, setEditedText }) => {
  const [editMode, setEditMode] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [show, setShow] = useState(true);
  const [showOption,setShowOption] = useState(false);
  const textareaRef = useRef(null);
  const ellipsisRef = useRef(null);

  useEffect(() => {
    if (editMode && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editMode]);

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => {
      setEditedText(result);
      setShow(true);
      setTypingDone(false);
      setEditMode(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [result]);

  useEffect(() => {
    const handleClickOutside = (event)=>{
        if(ellipsisRef.current && !ellipsisRef.current.contains(event.target)){
          setShowOption(false);
        }
    }
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])
  

  const handleShowOptions = ()=>{
    setShowOption(!showOption);
  }

 const handleDownloadPDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const margin = 20;
  const maxLineWidth = 170;

  doc.setFont("Times", "Normal");
  doc.setFontSize(12);
  doc.setTextColor(33, 33, 33); // Dark gray text

  const lines = doc.splitTextToSize(editedText || result, maxLineWidth);

  let currentY = 30;

  doc.text("Turfex AI Result", margin, 20);
  doc.setDrawColor(200);
  doc.line(margin, 22, 190, 22); // underline title

  lines.forEach((line) => {
    if (currentY > 280) {
      doc.addPage();
      currentY = 20;
    }
    doc.text(line, margin, currentY);
    currentY += 7; // line height
  });

  doc.save('turfex-output.pdf');
};


  if (!result) return null;

  return (
    <div className="h-70 px-1 mt-2.5">
      {/* Top Buttons */}
      <div className="flex justify-end gap-2 mb-2">
            {typingDone && (
          editMode ? (
            <button 
            className='flex px-2 py-2 rounded-full justify-center gap-1 items-center shadow-md bg-white'
            onClick={() => setEditMode(false)} title="Save Edits">
             <Book/> Writing
            </button>
          ) : (
            <button className='flex py-1.5 mt-0.5 items-center justify-center gap-1.5 rounded-full shadow-md bg-white px-3 cursor-pointer' onClick={() => setEditMode(true)} title="Edit Text">
              <FaPen /> Edit 
            </button>
          )
        )}
        <div className='mt-2'> 

           <button
          className='flex items-center cursor-pointer justify-center rounded-full px-3  py-1.5  hover:bg-pink-200 shadow-md bg-white'
         onClick={onCopy} title="Copy"><FaCopy /></button>
        </div>
       

     
       
  <div className="relative cursor-pointer mt-2">
  <button
    ref = {ellipsisRef}
    onClick={handleShowOptions}
    className="flex items-center cursor-pointer justify-center px-2 py-1 hover:bg-pink-200 bg-white rounded-full shadow-md transition-all"
  >
    <Ellipsis className="w-5 h-5" />
  </button>


  {showOption && (
<div className=" absolute right-1 mt-2 w-44 rounded-xl bg-white border border-gray-200 shadow-md p-3 space-y-2">
  <button
    
    onClick={handleDownloadPDF}
    className="flex items-center w-full gap-2 px-3 py-2 text-sm text-black rounded-md hover:bg-gray-100 transition"
  >
    <FaFilePdf className="text-red-500" /> Save as PDF
  </button>

  <button
    className="flex items-center w-full gap-2 px-3 py-2 text-sm text-black rounded-md hover:bg-gray-100 transition"
  >
    <Delete className="text-gray-600" /> Delete
  </button>
</div>

  )}
</div>

       
      </div>

   
      {show && (
        <div className="font-outfit prose prose-sm pretty py-5 px-2 break-words whitespace-pre-wrap overflow-hidden max-w-full mt-2  text-[17px] text-black bg-[#fdfaf5]   rounded-md shadow-sm">
          {editMode ? (
            
            <textarea
              ref={textareaRef}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              className="w-full bg-transparent outline-none resize-none overflow-hidden"
              placeholder="Edit your text..."
              style={{ transition: 'height 0.2s ease-in-out' }}
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
